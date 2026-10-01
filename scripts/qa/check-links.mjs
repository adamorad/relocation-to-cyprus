#!/usr/bin/env node
// Internal link checker. Crawls every HTML file in out/ and verifies that
// each internal href (and local img src) and meta-refresh target resolves to a
// file in out/, and that same-page #anchors match an element id.
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
const META_REFRESH = /<meta\b[^>]*http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi;
const META_CONTENT = /\bcontent\s*=\s*("([^"]*)"|'([^']*)')/i;
const ANY_ID = /\sid\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/gi;

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

const brokenAnchors = new Map(); // page -> Set(#id)

function resolveTarget(rawIn, page) {
	let raw = rawIn.trim().replace(/&amp;/g, "&");
	if (!raw) return null;
	if (/^(mailto:|tel:|sms:|javascript:|data:|blob:)/i.test(raw)) return null;
	if (/^(https?:)?\/\//i.test(raw)) {
		// Same-origin absolute URLs are treated as internal.
		const u = raw.replace(/^https?:/i, "");
		if (/^\/\/(www\.)?realcy\.app(\/|$)/i.test(u))
			raw = u.replace(/^\/\/(www\.)?realcy\.app/i, "") || "/";
		else return null;
	}
	raw = raw.split("#")[0].split("?")[0];
	if (!raw) return null;
	try {
		return raw.startsWith("/")
			? decodeURI(raw)
			: decodeURI(
					posix.resolve(page.endsWith("/") ? page : posix.dirname(page), raw),
				);
	} catch {
		return raw;
	}
}

function checkTarget(target, page) {
	checked++;
	if (!exists(target)) {
		if (!broken.has(target)) broken.set(target, new Set());
		broken.get(target).add(page);
	}
}

for (const file of htmlFiles) {
	const page = pageUrl(file);
	pages++;
	const html = readFileSync(file, "utf8");
	if (BASE_TAG.test(html))
		console.warn(
			`warn: <base> tag in ${page}; relative links may resolve differently`,
		);
	const ids = new Set();
	for (const m of html.matchAll(ANY_ID)) ids.add(m[2] ?? m[3] ?? m[4] ?? "");
	for (const m of html.matchAll(ATTR)) {
		const tag = m[1].toLowerCase();
		const attr = m[2].toLowerCase();
		if (tag === "a" && attr !== "href") continue;
		if ((tag === "img" || tag === "source") && attr !== "src") continue;
		const rawAttr = (m[4] ?? m[5] ?? "").trim().replace(/&amp;/g, "&");
		if (tag === "a" && rawAttr.startsWith("#")) {
			// Same-page anchor: must match an element id. A bare "#" is ignored.
			if (rawAttr === "#") continue;
			let id = rawAttr.slice(1);
			try {
				id = decodeURIComponent(id);
			} catch {}
			checked++;
			if (id !== "top" && !ids.has(id)) {
				if (!brokenAnchors.has(page)) brokenAnchors.set(page, new Set());
				brokenAnchors.get(page).add(`#${id}`);
			}
			continue;
		}
		const target = resolveTarget(rawAttr, page);
		if (target !== null) checkTarget(target, page);
	}
	for (const tagM of html.matchAll(META_REFRESH)) {
		const c = tagM[0].match(META_CONTENT);
		const content = c?.[2] ?? c?.[3] ?? "";
		const u = content.match(/url\s*=\s*['"]?([^'";]+)/i);
		if (!u) continue;
		const target = resolveTarget(u[1], page);
		if (target !== null) checkTarget(target, page);
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
if (brokenAnchors.size) {
	console.log(
		`${brokenAnchors.size} page(s) with same-page anchors that match no id:`,
	);
	for (const [page, set] of [...brokenAnchors].sort(([a], [b]) =>
		a.localeCompare(b),
	))
		console.log(`  ${page}  ${[...set].join(" ")}`);
}
mkdirSync(REPORT_DIR, { recursive: true });
writeFileSync(
	join(REPORT_DIR, "links.json"),
	`${JSON.stringify(
		{
			pages,
			checked,
			broken: rows,
			brokenAnchors: [...brokenAnchors].map(([page, set]) => ({
				page,
				anchors: [...set],
			})),
		},
		null,
		2,
	)}\n`,
);
process.exit(rows.length || brokenAnchors.size ? 1 : 0);
