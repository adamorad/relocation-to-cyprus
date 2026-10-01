#!/usr/bin/env node
// Accessibility gate. Serves out/ with an in-process static server, opens a
// fixed sample of pages at 390 and 1440 px with Playwright and runs axe-core
// (wcag2a + wcag2aa). Fails on moderate, serious or critical violations that are not in
// scripts/qa/axe.baseline.json.
//
// Usage:
//   node scripts/qa/axe.mjs                    run the gate
//   node scripts/qa/axe.mjs --update-baseline  record current moderate/serious/critical findings
//   node scripts/qa/axe.mjs --urls /a/,/b/     override the sample (debugging)
import {
	createReadStream,
	existsSync,
	mkdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "out");
const BASELINE_PATH = join(
	dirname(fileURLToPath(import.meta.url)),
	"axe.baseline.json",
);
const REPORT_DIR = join(ROOT, "qa-reports");

const SAMPLE = [
	"/",
	"/guides/",
	"/guides/residency-and-visas/",
	"/guides/cost-of-living/",
	"/guides/gesy-registration-guide/",
	"/sections/",
	"/sections/accountants/",
	"/sections/specialist-doctors/",
	"/sections/public-transport/",
	"/tools/",
	"/tools/mortgage-calculator/",
	"/tools/budget-builder/",
	"/tools/visa-pathway-finder/",
	"/listings/",
	"/listings/20-oceanic_garden/",
	"/developers/",
	"/developers/admare-property/",
	"/regions/",
	"/regions/limassol/",
	"/moving-to-cyprus/",
	"/explore/",
	"/explore/?q=pharmacy",
];
const WIDTHS = [390, 1440];
const BLOCKING = new Set(["moderate", "serious", "critical"]);

const argv = process.argv.slice(2);
const updateBaseline = argv.includes("--update-baseline");
const urlsArg = argv.indexOf("--urls");
const urls = urlsArg >= 0 ? argv[urlsArg + 1].split(",") : SAMPLE;

if (!existsSync(OUT)) {
	console.error("out/ not found. Run `pnpm build` first.");
	process.exit(2);
}

const MIME = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".mjs": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".txt": "text/plain; charset=utf-8",
	".xml": "application/xml",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".webp": "image/webp",
	".avif": "image/avif",
	".ico": "image/x-icon",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".wasm": "application/wasm",
	".pf_meta": "application/octet-stream",
	".pf_index": "application/octet-stream",
	".pf_fragment": "application/octet-stream",
	".pagefind": "application/octet-stream",
};

function resolveFile(pathname) {
	const clean = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
	let p = join(OUT, clean);
	if (!p.startsWith(OUT)) return null;
	if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
	else if (!existsSync(p) && existsSync(`${p}.html`)) p = `${p}.html`;
	return existsSync(p) && statSync(p).isFile() ? p : null;
}

const server = createServer((req, res) => {
	let pathname;
	try {
		pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
	} catch {
		res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
		return res.end("bad request");
	}
	const file = resolveFile(pathname);
	if (!file) {
		const nf = join(OUT, "404.html");
		res.writeHead(404, { "content-type": MIME[".html"] });
		return existsSync(nf)
			? createReadStream(nf).pipe(res)
			: res.end("not found");
	}
	res.writeHead(200, {
		"content-type": MIME[extname(file)] ?? "application/octet-stream",
	});
	createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = await import("playwright");
const { default: AxeBuilder } = await import("@axe-core/playwright");

const browser = await chromium.launch();
const findings = []; // {url,width,rule,impact,nodes,help}
const errors = [];
for (const width of WIDTHS) {
	const ctx = await browser.newContext({
		viewport: { width, height: width < 800 ? 844 : 900 },
	});
	// Only the local server is reachable: nothing leaves the machine.
	await ctx.route(
		(u) => !u.href.startsWith(base),
		(r) => r.abort(),
	);
	for (const url of urls) {
		const page = await ctx.newPage();
		try {
			const resp = await page.goto(base + url, { waitUntil: "load" });
			if (!resp || resp.status() >= 400)
				errors.push(`${url} @${width}: HTTP ${resp?.status()}`);
			await page.waitForTimeout(600);
			if (url.startsWith("/explore/?q="))
				await page.waitForSelector(
					"[data-search-state]:not([data-search-state='loading'])",
					{ timeout: 10000 },
				);
			const result = await new AxeBuilder({ page })
				.withTags(["wcag2a", "wcag2aa"])
				.analyze();
			for (const v of result.violations)
				findings.push({
					url,
					width,
					rule: v.id,
					impact: v.impact,
					nodes: v.nodes.length,
					help: v.help,
					sample: v.nodes[0]?.target?.join(" ") ?? "",
				});
		} catch (e) {
			errors.push(`${url} @${width}: ${e.message.split("\n")[0]}`);
		} finally {
			await page.close();
		}
	}
	await ctx.close();
}
await browser.close();
server.close();

const key = (f) => `${f.url}|${f.rule}`;
const blocking = findings.filter((f) => BLOCKING.has(f.impact));

if (updateBaseline) {
	const entries = [
		...new Map(
			blocking.map((f) => [
				key(f),
				{ url: f.url, rule: f.rule, impact: f.impact, help: f.help },
			]),
		).values(),
	].sort((a, b) => key(a).localeCompare(key(b)));
	writeFileSync(
		BASELINE_PATH,
		`${JSON.stringify({ note: "Known moderate/serious/critical axe findings (url + rule). CI fails on anything not listed. Remove entries as they are fixed.", findings: entries }, null, "\t")}\n`,
	);
	console.log(`Wrote ${entries.length} baseline entries.`);
}
const baseline = new Set(
	(existsSync(BASELINE_PATH)
		? JSON.parse(readFileSync(BASELINE_PATH, "utf8")).findings
		: []
	).map(key),
);
const fresh = blocking.filter((f) => !baseline.has(key(f)));

console.log(
	`Axe: ${urls.length} URLs x ${WIDTHS.length} widths (wcag2a, wcag2aa).`,
);
const pad = (s, n) => String(s).padEnd(n);
if (findings.length) {
	console.log(
		`\n${pad("url", 40)} ${pad("w", 5)} ${pad("impact", 9)} ${pad("rule", 26)} ${pad("nodes", 5)} status`,
	);
	for (const f of findings.sort(
		(a, b) => a.url.localeCompare(b.url) || a.width - b.width,
	)) {
		const status = !BLOCKING.has(f.impact)
			? "info"
			: baseline.has(key(f))
				? "baselined"
				: "NEW";
		console.log(
			`${pad(f.url, 40)} ${pad(f.width, 5)} ${pad(f.impact, 9)} ${pad(f.rule, 26)} ${pad(f.nodes, 5)} ${status}`,
		);
	}
} else console.log("\nNo violations at all.");
const counts = (imp) => findings.filter((f) => f.impact === imp).length;
console.log(
	`\nTotals (url x width x rule): critical ${counts("critical")}, serious ${counts("serious")}, moderate ${counts("moderate")}, minor ${counts("minor")}. New blocking: ${fresh.length}.`,
);
if (errors.length) {
	console.log("\nPage errors:");
	for (const e of errors) console.log(`  ${e}`);
}
mkdirSync(REPORT_DIR, { recursive: true });
writeFileSync(
	join(REPORT_DIR, "axe.json"),
	`${JSON.stringify({ findings, errors }, null, 2)}\n`,
);
if (fresh.length || errors.length) {
	console.log("\nFAIL");
	process.exit(1);
}
console.log("\nOK");
