#!/usr/bin/env node
// House rules gate. Scans app/, components/, lib/ and public/llms.txt.
//
// Rules:
//   em-dash      U+2014 anywhere
//   emoji        Unicode emoji (glyphs in house-rules.allow.json "emojiGlyphs" are ignored)
//   nicosia      the word Nicosia, except exact lines in house-rules.allow.json "nicosia"
//   relocation-guide  the label "Relocation guide"
//   hex-class    hard-coded hex colour inside a Tailwind class, e.g. text-[#35cdc4]
//                (app/globals.css is exempt; it defines the theme)
//
// Pre-existing violations live in house-rules.baseline.json as per-file line
// counts per rule. CI fails only when a file has MORE violating lines of a rule
// than its baseline. Burn the baseline down in later phases.
//
// Usage:
//   node scripts/qa/house-rules.mjs                    check, fail on new violations
//   node scripts/qa/house-rules.mjs --update-baseline  rewrite baseline (counts only)
//   node scripts/qa/house-rules.mjs --update-nicosia   regenerate the Nicosia allowlist
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
const nicosiaAllowed = new Set(
	(allow.nicosia ?? []).map((e) => `${e.file}\t${e.text}`),
);
const updateNicosia = process.argv.includes("--update-nicosia");
const updateBaseline = process.argv.includes("--update-baseline");

// hits[rule][file] = [{line, text}]
const hits = Object.fromEntries(RULE_NAMES.map((r) => [r, {}]));
const nicosiaFound = [];

function add(rule, file, line, text) {
	if (!hits[rule][file]) hits[rule][file] = [];
	hits[rule][file].push({ line, text: text.trim().slice(0, 160) });
}

for (const file of files) {
	const lines = readFileSync(join(ROOT, file), "utf8").split(/\r?\n/);
	lines.forEach((line, i) => {
		const n = i + 1;
		if (RULES["em-dash"].re.test(line)) add("em-dash", file, n, line);
		if (RULES.emoji.re.test(line)) {
			const rest = [...line].filter(
				(ch) => RULES.emoji.re.test(ch) && !emojiGlyphs.has(ch),
			);
			if (rest.length) add("emoji", file, n, line);
		}
		if (RULES.nicosia.re.test(line)) {
			nicosiaFound.push({ file, text: line.trim() });
			if (!nicosiaAllowed.has(`${file}\t${line.trim()}`))
				add("nicosia", file, n, line);
		}
		if (RULES["relocation-guide"].re.test(line))
			add("relocation-guide", file, n, line);
		if (file !== "app/globals.css" && RULES["hex-class"].re.test(line))
			add("hex-class", file, n, line);
	});
}

if (updateNicosia) {
	const seen = new Set();
	const list = nicosiaFound
		.filter((e) => {
			const k = `${e.file}\t${e.text}`;
			if (seen.has(k)) return false;
			seen.add(k);
			return true;
		})
		.sort(
			(a, b) => a.file.localeCompare(b.file) || a.text.localeCompare(b.text),
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

const current = Object.fromEntries(
	RULE_NAMES.map((r) => [
		r,
		Object.fromEntries(
			Object.entries(hits[r])
				.map(([f, v]) => [f, v.length])
				.sort(([a], [b]) => a.localeCompare(b)),
		),
	]),
);

if (updateBaseline) {
	// Nicosia is governed by the allowlist, not the baseline.
	const base = { ...current, nicosia: {} };
	writeFileSync(
		BASELINE_PATH,
		`${JSON.stringify({ note: "Pre-existing violations (lines per file per rule). CI fails only when a count goes up. Lower numbers as copy is cleaned up.", rules: base }, null, "\t")}\n`,
	);
	console.log(`Wrote baseline to ${relative(ROOT, BASELINE_PATH)}.`);
}

const baseline = readJson(BASELINE_PATH, { rules: {} }).rules;
const sum = (o) => Object.values(o ?? {}).reduce((a, b) => a + b, 0);

console.log(`House rules: scanned ${files.length} files.\n`);
console.log("rule                total  baseline  new");
let failed = false;
const failures = [];
for (const r of RULE_NAMES) {
	const total = sum(current[r]);
	const baseTotal = sum(baseline[r]);
	let newCount = 0;
	for (const [file, count] of Object.entries(current[r])) {
		const over = count - (baseline[r]?.[file] ?? 0);
		if (over > 0) {
			newCount += over;
			failures.push({ rule: r, file, over, lines: hits[r][file] });
		}
	}
	if (newCount) failed = true;
	console.log(
		`${r.padEnd(19)} ${String(total).padStart(5)}  ${String(baseTotal).padStart(8)}  ${String(newCount).padStart(3)}`,
	);
}

if (failed) {
	console.log(
		"\nNew violations (file has more violating lines than its baseline):",
	);
	for (const f of failures) {
		console.log(
			`\n[${RULES[f.rule].label}] ${f.file}: ${f.over} over baseline`,
		);
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
