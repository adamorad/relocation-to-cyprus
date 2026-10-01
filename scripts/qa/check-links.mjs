#!/usr/bin/env node
// Internal link checker. Crawls every HTML file in out/ and verifies that
// each internal href (and local img src) resolves to a file in out/.
// Respects trailingSlash: true (path/ -> path/index.html). No network.
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "out");
const REPORT_DIR = join(ROOT, "qa-reports");

if (!existsSync(OUT)) {
	console.error("out/ not found. Run `pnpm build` first.");
	process.exit(2);
}

function walk(dir, acc = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		const st = statSync(p);
		if (st.isDirectory()) walk(p, acc);
		else acc.push(p);
	}
	return acc;
}

const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const known = new Set(
	files.map(
		(f) =>
			`/${posix.normalize(
				f
					.slice(OUT.length + 1)
					.split("\\")
					.join("/"),
			)}`,
	),
);

function exists(urlPath) {
	// urlPath is decoded, absolute, no query/hash.
	if (known.has(urlPath)) return true;
	if (urlPath.endsWith("/")) return known.has(`${urlPath}index.html`);
	// A path without trailing slash that is a directory with index.html.
	return known.has(`${urlPath}/index.html`) || known.has(`${urlPath}.html`);
}

const ATTR =
	/<(a|img|source)\b[^>]*?\s(href|src)\s*=\s*("([^"]*)"|'([^']*)')/gi;
const BASE_TAG = /<base\b/i;

function pageUrl(file) {
	let rel = `/${file
		.slice(OUT.length + 1)
		.split("\\")
		.join("/")}`;
	if (rel.endsWith("/index.html")) rel = rel.slice(0, -"index.html".length);
	return rel;
}

const broken = new Map(); // key target -> Set(pages)
let checked = 0;
let pages = 0;

for (const file of htmlFiles) {
	const page = pageUrl(file);
	// Skip Next internal error shells and the 404 page is still checked.
	pages++;
	const html = readFileSync(file, "utf8");
	if (BASE_TAG.test(html))
		console.warn(
			`warn: <base> tag in ${page}; relative links may resolve differently`,
		);
	for (const m of html.matchAll(ATTR)) {
		const tag = m[1].toLowerCase();
		const attr = m[2].toLowerCase();
		if (tag === "a" && attr !== "href") continue;
		if ((tag === "img" || tag === "source") && attr !== "src") continue;
		let raw = (m[4] ?? m[5] ?? "").trim().replace(/&amp;/g, "&");
		if (!raw || raw.startsWith("#")) continue;
		if (/^(mailto:|tel:|sms:|javascript:|data:|blob:)/i.test(raw)) continue;
		if (/^(https?:)?\/\//i.test(raw)) {
			// Same-origin absolute URLs are treated as internal.
			const u = raw.replace(/^https?:/i, "");
			if (/^\/\/(www\.)?realcy\.app(\/|$)/i.test(u))
				raw = u.replace(/^\/\/(www\.)?realcy\.app/i, "") || "/";
			else continue;
		}
		raw = raw.split("#")[0].split("?")[0];
		if (!raw) continue;
		let target;
		try {
			target = raw.startsWith("/")
				? decodeURI(raw)
				: decodeURI(
						posix.resolve(page.endsWith("/") ? page : posix.dirname(page), raw),
					);
		} catch {
			target = raw;
		}
		checked++;
		if (!exists(target)) {
			if (!broken.has(target)) broken.set(target, new Set());
			broken.get(target).add(page);
		}
	}
}

const rows = [...broken.entries()].map(([target, set]) => ({
	target,
	pages: [...set].sort(),
}));
rows.sort((a, b) => a.target.localeCompare(b.target));

console.log(
	`Link check: ${pages} HTML files, ${checked} internal references checked.`,
);
if (rows.length === 0) {
	console.log("No broken internal links.");
} else {
	console.log(`${rows.length} broken target(s):`);
	for (const r of rows) {
		console.log(`  ${r.target}`);
		for (const p of r.pages.slice(0, 5)) console.log(`      linked from ${p}`);
		if (r.pages.length > 5)
			console.log(`      ... and ${r.pages.length - 5} more page(s)`);
	}
}
mkdirSync(REPORT_DIR, { recursive: true });
writeFileSync(
	join(REPORT_DIR, "links.json"),
	`${JSON.stringify({ pages, checked, broken: rows }, null, 2)}\n`,
);
process.exit(rows.length ? 1 : 0);
