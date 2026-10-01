#!/usr/bin/env node
/**
 * Generates docs/CONTENT-INVENTORY.md — a single reference of every piece of
 * content on realcy.app (guides, tools, directories, regions, listings), so we
 * can check what already exists before creating anything new.
 *
 * Run:  node scripts/gen-content-inventory.mjs
 * It re-reads the lib/ data files each time, so the inventory stays current.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => {
	try {
		return readFileSync(join(ROOT, p), "utf8");
	} catch {
		return "";
	}
};

const field = (block, key) => {
	// matches  key: "value"  (value may sit on the next line, no escaped quotes expected)
	const m = block.match(new RegExp(`${key}:\\s*\\n?\\s*"([^"]*)"`));
	return m ? m[1] : "";
};

/** Split a file's records by an anchor key, returning per-record text blocks. */
function records(text, anchorKey) {
	const re = new RegExp(`${anchorKey}:\\s*"([^"]+)"`, "g");
	const starts = [];
	let m;
	while ((m = re.exec(text))) starts.push(m.index);
	return starts.map((s, i) => ({
		anchor: text.slice(s).match(new RegExp(`${anchorKey}:\\s*"([^"]+)"`))[1],
		block: text.slice(s, starts[i + 1] ?? text.length),
	}));
}

// ── Guides (main + batches) ───────────────────────────────────────────────────
// guides.ts + every lib/guides-batch*.ts (auto-discovered so new batches are never missed)
const batchFiles = readdirSync(join(ROOT, "lib"))
	.filter((f) => /^guides-batch.*\.ts$/.test(f))
	.sort();
const guideText =
	read("lib/guides.ts") + batchFiles.map((f) => read(`lib/${f}`)).join("");
const guides = records(guideText, "slug")
	.filter((r) => /\btitle:/.test(r.block) && /\bcategory:/.test(r.block))
	.map((r) => ({
		slug: r.anchor,
		title: field(r.block, "title"),
		category: field(r.block, "category"),
		description: field(r.block, "description"),
	}))
	.filter((g) => g.title);

// ── Tools ─────────────────────────────────────────────────────────────────────
const tools = records(read("lib/tools-index.ts"), "href").map((r) => ({
	slug: r.anchor.replace(/^\/tools\//, "").replace(/\/$/, ""),
	title: field(r.block, "title"),
	category: field(r.block, "category"),
	description: field(r.block, "description"),
}));

// ── Directories / Sections ────────────────────────────────────────────────────
const sections = records(read("lib/sections-index.ts"), "slug").map((r) => ({
	slug: r.anchor,
	name: field(r.block, "name"),
	category: field(r.block, "category"),
	description: field(r.block, "description"),
}));
// sections order is {name, slug,...} so name sits BEFORE slug — re-parse by name
const sectionsByName = records(read("lib/sections-index.ts"), "name")
	.filter((r) => /slug:/.test(r.block))
	.map((r) => ({
		name: r.anchor,
		slug: field(r.block, "slug"),
		category: field(r.block, "category"),
		description: field(r.block, "description"),
	}))
	.filter((s) => s.slug);

// ── Regions ───────────────────────────────────────────────────────────────────
const regions = records(read("lib/regions.ts"), "slug").map((r) => ({
	slug: r.anchor,
	name: field(r.block, "name"),
	oneLiner: field(r.block, "oneLiner"),
}));

// ── Listings (count only) ─────────────────────────────────────────────────────
// The data file also holds listings hidden from the site (see isHiddenListing in
// lib/listingsData.ts). This script cannot import TypeScript, so the hidden
// count is a fixed note and the total is labelled as including them.
const HIDDEN_LISTINGS = 33;
const listingsCount = (read("lib/data/listings.json").match(/"slug":/g) || [])
	.length;
const listingsLabel = `${listingsCount} listings in data, ${HIDDEN_LISTINGS} of them hidden from the site`;

// ── Planned roadmap (cross-checked against existing guide slugs) ───────────────
const existing = new Set(guides.map((g) => g.slug));
const PLANNED = [
	["rental-income-tax-cyprus", "Rental income tax for Cyprus landlords 2026"],
	["buying-vs-renting-cyprus", "Buying vs renting in Cyprus 2026"],
	["private-health-insurance-cyprus", "Private health insurance in Cyprus 2026"],
	["moving-to-cyprus-from-germany", "Moving to Cyprus from Germany 2026"],
	["cyprus-tax-return-filing", "How to file your Cyprus tax return (TD1) 2026"],
	["working-in-cyprus-employee-rights", "Working in Cyprus: employee rights 2026"],
	["getting-around-cyprus-no-car", "Getting around Cyprus without a car"],
	["getting-married-in-cyprus", "Getting married in Cyprus as a foreigner"],
	["international-school-fees-cyprus", "International school fees in Cyprus 2026"],
].filter(([slug]) => !existing.has(slug));

// ── Render ─────────────────────────────────────────────────────────────────────
const groupBy = (arr, key) => {
	const m = new Map();
	for (const x of arr) {
		const k = x[key] || "(uncategorised)";
		if (!m.has(k)) m.set(k, []);
		m.get(k).push(x);
	}
	return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
};
const esc = (s) => (s || "").replace(/\|/g, "\\|");
const today = new Date().toISOString().slice(0, 10);

let md = `# RealCy.app — Content Inventory

_Auto-generated by \`scripts/gen-content-inventory.mjs\` on ${today}. **Do not edit by hand** — re-run the script to refresh. Use this to check what already exists before creating new content._

**Totals:** ${guides.length} guides · ${tools.length} tools · ${sectionsByName.length} directories · ${regions.length} regions · ${listingsLabel}

- Guides live at \`/guides/{slug}\` · tools at \`/tools/{slug}\` · directories at \`/sections/{slug}\` · regions at \`/regions/{slug}\`
- Source of truth: \`lib/guides.ts\` (+ \`guides-batch1.ts\`, \`guides-batch2.ts\`), \`lib/tools-index.ts\`, \`lib/sections-index.ts\`, \`lib/regions.ts\`, \`lib/data/listings.json\`

---

## Guides (${guides.length})
`;
for (const [cat, items] of groupBy(guides, "category")) {
	md += `\n### ${cat} (${items.length})\n\n| Slug | Title | Description |\n|---|---|---|\n`;
	for (const g of items.sort((a, b) => a.slug.localeCompare(b.slug)))
		md += `| \`${g.slug}\` | ${esc(g.title)} | ${esc(g.description)} |\n`;
}

md += `\n---\n\n## Tools (${tools.length})\n`;
for (const [cat, items] of groupBy(tools, "category")) {
	md += `\n### ${cat} (${items.length})\n\n| Slug | Title | Description |\n|---|---|---|\n`;
	for (const t of items.sort((a, b) => a.slug.localeCompare(b.slug)))
		md += `| \`${t.slug}\` | ${esc(t.title)} | ${esc(t.description)} |\n`;
}

md += `\n---\n\n## Directories / Sections (${sectionsByName.length})\n`;
for (const [cat, items] of groupBy(sectionsByName, "category")) {
	md += `\n### ${cat} (${items.length})\n\n| Slug | Name | Description |\n|---|---|---|\n`;
	for (const s of items.sort((a, b) => a.slug.localeCompare(b.slug)))
		md += `| \`${s.slug}\` | ${esc(s.name)} | ${esc(s.description)} |\n`;
}

md += `\n---\n\n## Regions (${regions.length})\n\n| Slug | Name | One-liner |\n|---|---|---|\n`;
for (const r of regions)
	md += `| \`${r.slug}\` | ${esc(r.name)} | ${esc(r.oneLiner)} |\n`;

md += `\n---\n\n## Listings (${listingsLabel})\n\nNew-development property listings at \`/listings/{slug}\`, generated from \`lib/data/listings.json\`. Not enumerated here (too many); query that file directly.\n`;

md += `\n---\n\n## Planned content — NOT yet created (SEO roadmap)\n\nProposed guides from the SEO content plan that do not yet exist. Slugs are provisional. Remove/update as they are built (the generator drops any whose slug already exists in Guides above).\n\n`;
if (PLANNED.length === 0) {
	md += `_All roadmap items have been created._\n`;
} else {
	md += `| Provisional slug | Working title |\n|---|---|\n`;
	for (const [slug, title] of PLANNED) md += `| \`${slug}\` | ${title} |\n`;
}
md += `\nAlso pending (non-guide): quick-win expansions of existing guides (waste-recycling, long-term-car-rental, pharmacies-medication); internal-linking template enhancement (make in-prose guide/tool mentions clickable).\n`;

writeFileSync(join(ROOT, "docs/CONTENT-INVENTORY.md"), md);
console.log(
	`Wrote docs/CONTENT-INVENTORY.md — ${guides.length} guides, ${tools.length} tools, ${sectionsByName.length} directories, ${regions.length} regions, ${listingsLabel}, ${PLANNED.length} planned.`,
);
