#!/usr/bin/env node
// House rules gate. Scans app/, components/, lib/ and public/llms.txt.
//
// Rules:
//   em-dash      U+2014 anywhere
//   emoji        Unicode emoji (glyphs in house-rules.allow.json "emojiGlyphs" are ignored)
//   nicosia      the word Nicosia, except {file, context, count} entries in
//                house-rules.allow.json "nicosia" (context = trimmed text window of
//                30 characters either side of the match, whitespace normalised)
//   relocation-guide  the label "Relocation guide"
//   hex-class    hard-coded hex colour inside a Tailwind class, e.g. text-[#35cdc4]
//                (app/globals.css is exempt; it defines the theme)
//
// Pre-existing violations live in house-rules.baseline.json as
// {rule: {file: {sha1(trimmed line): count}}}. CI fails when a line hash is new
// or its count went up. Editing a baselined line changes its hash, so it must
// be cleaned. Burn the baseline down in later phases.
//
// Usage:
//   node scripts/qa/house-rules.mjs                    check, fail on new violations
//   node scripts/qa/house-rules.mjs --update-baseline  rewrite baseline (per-line hashes)
//   node scripts/qa/house-rules.mjs --update-nicosia   regenerate the Nicosia allowlist
import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const HERE = dirname(fileURLToPath(import.meta.url));
const ALLOW_PATH = join(HERE, "house-rules.allow.json");
const BASELINE_PATH = join(HERE, "house-rules.baseline.json");

const SCAN_DIRS = ["app", "components", "lib"];
const SCAN_FILES = ["public/llms.txt"];
const EXTS = new Set([
	".ts",
	".tsx",
	".js",
	".jsx",
	".mjs",
	".css",
	".md",
	".mdx",
	".txt",
	".json",
]);
const EXCLUDE = (rel) =>
	rel === "lib/data/listings.json" ||
	// Generated subset of listings.json (scripts/gen-visible-listings.mjs).
	rel === "lib/data/listings.visible.json" ||
	rel
		.split("/")
		.some((p) => p === "node_modules" || p === "archive" || p === ".next");

const RULES = {
	"em-dash": { re: /\u2014/u, label: "em dash (U+2014)" },
	emoji: {
		// biome-ignore lint/suspicious/noMisleadingCharacterClass: variation selector and keycap are matched on purpose
		re: /[\p{Extended_Pictographic}\p{Emoji_Presentation}\u{FE0F}\u{20E3}]/u,
		label: "emoji",
	},
	nicosia: { re: /Nicosia/i, label: "Nicosia outside allowlist" },
	"relocation-guide": {
		re: /Relocation guide/,
		label: 'label "Relocation guide"',
	},
	"hex-class": {
		re: /\[#[0-9a-fA-F]{3,8}\]/,
		label: "hard-coded hex colour in class",
	},
};
const RULE_NAMES = Object.keys(RULES);

function walk(dir, acc = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		const rel = relative(ROOT, p).split("\\").join("/");
		if (EXCLUDE(rel)) continue;
		const st = statSync(p);
		if (st.isDirectory()) walk(p, acc);
		else if (EXTS.has(name.slice(name.lastIndexOf(".")))) acc.push(rel);
	}
	return acc;
}

const files = [];
for (const d of SCAN_DIRS)
	if (existsSync(join(ROOT, d))) walk(join(ROOT, d), files);
for (const f of SCAN_FILES) if (existsSync(join(ROOT, f))) files.push(f);

const readJson = (p, fallback) =>
	existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback;
const allow = readJson(ALLOW_PATH, { emojiGlyphs: [], nicosia: [] });
const emojiGlyphs = new Set(allow.emojiGlyphs ?? []);
const WINDOW = 30;
const norm = (t) => t.replace(/\s+/g, " ").trim();
const sha = (t) => createHash("sha1").update(t).digest("hex");
const nicosiaAllowed = new Map(); // `${file}\t${context}` -> allowed count
for (const e of allow.nicosia ?? [])
	nicosiaAllowed.set(`${e.file}\t${e.context}`, e.count ?? 1);
// Punctuation that cleanup edits swap or drop (em dash for comma, etc.) is
// folded into whitespace before the window is cut, so those edits keep the
// context stable.
const nicosiaContexts = (line) => {
	const t = norm(line.replace(/[\u2014,;:()]/g, " "));
	return [...t.matchAll(/Nicosia/gi)].map((m) =>
		t
			.slice(Math.max(0, m.index - WINDOW), m.index + m[0].length + WINDOW)
			.trim(),
	);
};
const updateNicosia = process.argv.includes("--update-nicosia");
const updateBaseline = process.argv.includes("--update-baseline");

// hits[rule][file] = [{line, text, count}]
const hits = Object.fromEntries(RULE_NAMES.map((r) => [r, {}]));
const nicosiaFound = new Map(); // `${file}\t${context}` -> {file, context, count}
const nicosiaSeen = new Map(); // running count while scanning

function add(rule, file, line, text, count = 1) {
	if (!hits[rule][file]) hits[rule][file] = [];
	hits[rule][file].push({
		line,
		text: text.trim().slice(0, 160),
		hash: sha(text.trim()),
		count,
	});
}
const countMatches = (re, line) =>
	[...line.matchAll(new RegExp(re.source, `${re.flags.replace("g", "")}g`))]
		.length;

for (const file of files) {
	const lines = readFileSync(join(ROOT, file), "utf8").split(/\r?\n/);
	lines.forEach((line, i) => {
		const n = i + 1;
		const dashes = countMatches(RULES["em-dash"].re, line);
		if (dashes) add("em-dash", file, n, line, dashes);
		if (RULES.emoji.re.test(line)) {
			const rest = [...line].filter(
				(ch) => RULES.emoji.re.test(ch) && !emojiGlyphs.has(ch),
			);
			if (rest.length) add("emoji", file, n, line, rest.length);
		}
		for (const context of nicosiaContexts(line)) {
			const key = `${file}\t${context}`;
			const entry = nicosiaFound.get(key) ?? { file, context, count: 0 };
			entry.count++;
			nicosiaFound.set(key, entry);
			const seen = (nicosiaSeen.get(key) ?? 0) + 1;
			nicosiaSeen.set(key, seen);
			// Occurrences beyond the allowed count are violations.
			if (seen > (nicosiaAllowed.get(key) ?? 0)) add("nicosia", file, n, line);
		}
		const rg = countMatches(RULES["relocation-guide"].re, line);
		if (rg) add("relocation-guide", file, n, line, rg);
		if (file !== "app/globals.css") {
			const hx = countMatches(RULES["hex-class"].re, line);
			if (hx) add("hex-class", file, n, line, hx);
		}
	});
}

if (updateNicosia) {
	const list = [...nicosiaFound.values()].sort(
		(a, b) =>
			a.file.localeCompare(b.file) || a.context.localeCompare(b.context),
	);
	writeFileSync(
		ALLOW_PATH,
		`${JSON.stringify({ ...allow, nicosia: list }, null, "\t")}\n`,
	);
	console.log(
		`Wrote ${list.length} Nicosia allowlist entries to ${relative(ROOT, ALLOW_PATH)}.`,
	);
	process.exit(0);
}

// current[rule][file][hash] = count
const current = Object.fromEntries(
	RULE_NAMES.map((r) => [
		r,
		Object.fromEntries(
			Object.entries(hits[r])
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([f, v]) => {
					const m = {};
					for (const h of v) {
						m[h.hash] = (m[h.hash] ?? 0) + h.count;
					}
					return [f, Object.fromEntries(Object.entries(m).sort())];
				}),
		),
	]),
);

if (updateBaseline) {
	// Nicosia is governed by the allowlist, not the baseline.
	const base = { ...current, nicosia: {} };
	writeFileSync(
		BASELINE_PATH,
		`${JSON.stringify({ note: "Pre-existing violations as {rule: {file: {sha1(trimmed line): count}}}. CI fails when a line hash is new or its count rises, so editing a baselined line forces it to be cleaned.", rules: base }, null, "\t")}\n`,
	);
	console.log(`Wrote baseline to ${relative(ROOT, BASELINE_PATH)}.`);
}

const baseline = readJson(BASELINE_PATH, { rules: {} }).rules;
const sumFile = (o) => Object.values(o ?? {}).reduce((a, b) => a + b, 0);
const sum = (o) => Object.values(o ?? {}).reduce((a, f) => a + sumFile(f), 0);

console.log(`House rules: scanned ${files.length} files.\n`);
console.log("rule                total  baseline  new");
let failed = false;
const failures = [];
for (const r of RULE_NAMES) {
	const total = sum(current[r]);
	const baseTotal = sum(baseline[r]);
	let newCount = 0;
	for (const [file, byHash] of Object.entries(current[r])) {
		const over = {};
		for (const [h, count] of Object.entries(byHash)) {
			const d = count - (baseline[r]?.[file]?.[h] ?? 0);
			if (d > 0) over[h] = d;
		}
		const n = Object.values(over).reduce((a, b) => a + b, 0);
		if (n) {
			newCount += n;
			failures.push({
				rule: r,
				file,
				over: n,
				lines: hits[r][file].filter((l) => over[l.hash]),
			});
		}
	}
	if (newCount) failed = true;
	console.log(
		`${r.padEnd(19)} ${String(total).padStart(5)}  ${String(baseTotal).padStart(8)}  ${String(newCount).padStart(3)}`,
	);
}

if (failed) {
	console.log(
		"\nNew violations (line not in the baseline, or more occurrences than baselined):",
	);
	for (const f of failures) {
		console.log(`\n[${RULES[f.rule].label}] ${f.file}: ${f.over} new`);
		for (const l of f.lines.slice(0, 8))
			console.log(`  ${f.file}:${l.line}  ${l.text}`);
		if (f.lines.length > 8)
			console.log(`  ... ${f.lines.length - 8} more line(s) in this file`);
	}
	mkdirSync(join(ROOT, "qa-reports"), { recursive: true });
	writeFileSync(
		join(ROOT, "qa-reports", "house-rules.json"),
		`${JSON.stringify(failures, null, 2)}\n`,
	);
	console.log(
		"\nFAIL: fix the new violations (do not add to the baseline unless the owner agrees).",
	);
	process.exit(1);
}
console.log("\nOK: no new violations beyond the baseline.");
