#!/usr/bin/env node
// Redirect gate. Reads the `redirects` in vercel.json and checks the built
// site in out/ against them, so a retired URL can never be linked internally
// and only work because of the 301:
//   - every redirect is permanent, its destination ends with "/", and both the
//     "/x/" and "/x" forms of each source are present;
//   - no source still has a page in out/ (the retired route left the build);
//   - every destination exists in out/ and is not itself a source (no chains);
//   - no internal href or meta refresh in out/**/*.html, no <loc> in
//     out/sitemap.xml and no URL in out/llms.txt points at a source.
// Runs as part of `pnpm qa:links` (scripts/qa/check-links.mjs imports it) and
// standalone: node scripts/qa/check-redirects.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** "/guides/x" and "/guides/x/" both normalise to "/guides/x/". */
const norm = (p) => (p.endsWith("/") ? p : `${p}/`);

function walk(dir, acc = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p, acc);
		else acc.push(p);
	}
	return acc;
}

function hasPage(out, urlPath) {
	const clean = urlPath.replace(/\/$/, "");
	return (
		existsSync(join(out, clean, "index.html")) ||
		existsSync(join(out, `${clean}.html`))
	);
}

/** Internal path of a URL found in built output, or null if external. */
function internalPath(raw) {
	let u = raw.trim().replace(/&amp;/g, "&");
	if (/^(mailto:|tel:|sms:|javascript:|data:|blob:|#)/i.test(u)) return null;
	if (/^(https?:)?\/\//i.test(u)) {
		const m = u.match(
			/^(?:https?:)?\/\/(?:www\.)?realcy\.app(\/[^\s"'<>)]*)?/i,
		);
		if (!m) return null;
		u = m[1] || "/";
	}
	if (!u.startsWith("/")) return null;
	u = u.split("#")[0].split("?")[0];
	try {
		return decodeURI(u);
	} catch {
		return u;
	}
}

export function checkRedirects({ root = ROOT, out = join(ROOT, "out") } = {}) {
	const problems = [];
	const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
	const redirects = config.redirects ?? [];
	const sources = new Map(); // normalised source -> destination
	const rawSources = new Set();

	for (const r of redirects) {
		rawSources.add(r.source);
		if (r.permanent !== true)
			problems.push(`${r.source}: redirect is not permanent`);
		if (!r.destination?.startsWith("/") || !r.destination.endsWith("/"))
			problems.push(
				`${r.source}: destination ${r.destination} must be an internal path ending in "/"`,
			);
		sources.set(norm(r.source), r.destination);
	}
	for (const s of sources.keys()) {
		const bare = s.replace(/\/$/, "");
		if (!rawSources.has(s) || !rawSources.has(bare))
			problems.push(`${bare}: needs both "${s}" and "${bare}" as sources`);
		if (hasPage(out, s))
			problems.push(`${s}: retired URL still has a page in out/`);
	}
	for (const [s, d] of sources) {
		if (sources.has(norm(d)))
			problems.push(`${s}: redirects to ${d}, which is itself redirected`);
		else if (!hasPage(out, d))
			problems.push(`${s}: destination ${d} has no page in out/`);
	}

	// Internal references in the built output.
	const hits = new Map(); // source -> Set(files)
	const hit = (path, where) => {
		if (path === null) return;
		const n = norm(path);
		if (!sources.has(n)) return;
		if (!hits.has(n)) hits.set(n, new Set());
		hits.get(n).add(where);
	};
	const HREF = /<(?:a|link)\b[^>]*?\shref\s*=\s*("([^"]*)"|'([^']*)')/gi;
	const REFRESH =
		/<meta\b[^>]*http-equiv\s*=\s*["']?refresh["']?[^>]*content\s*=\s*["'][^"']*url\s*=\s*([^"';]+)/gi;
	const files = existsSync(out) ? walk(out) : [];
	for (const f of files) {
		const rel = `/${f
			.slice(out.length + 1)
			.split("\\")
			.join("/")}`;
		if (f.endsWith(".html")) {
			const html = readFileSync(f, "utf8");
			for (const m of html.matchAll(HREF))
				hit(internalPath(m[2] ?? m[3] ?? ""), rel);
			for (const m of html.matchAll(REFRESH)) hit(internalPath(m[1]), rel);
		} else if (rel === "/sitemap.xml") {
			for (const m of readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g))
				hit(internalPath(m[1]), rel);
		} else if (rel === "/llms.txt") {
			for (const m of readFileSync(f, "utf8").matchAll(
				/https?:\/\/(?:www\.)?realcy\.app\/[^\s)>"']*/g,
			))
				hit(internalPath(m[0]), rel);
		}
	}
	for (const [s, where] of [...hits].sort(([a], [b]) => a.localeCompare(b))) {
		const list = [...where].sort();
		problems.push(
			`${s} (redirects to ${sources.get(s)}) is still linked from ${list.length} file(s): ${list.slice(0, 5).join(", ")}${list.length > 5 ? ", ..." : ""}`,
		);
	}
	return { redirects: redirects.length, sources: sources.size, problems };
}

export function reportRedirects(result) {
	console.log(
		`Redirect check: ${result.redirects} vercel.json redirects (${result.sources} retired URLs).`,
	);
	if (result.problems.length === 0) {
		console.log("No links to retired URLs; every redirect is valid.");
		return 0;
	}
	console.log(`${result.problems.length} redirect problem(s):`);
	for (const p of result.problems) console.log(`  ${p}`);
	return 1;
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	if (!existsSync(join(ROOT, "out"))) {
		console.error("out/ not found. Run `pnpm build` first.");
		process.exit(2);
	}
	process.exit(reportRedirects(checkRedirects()));
}
