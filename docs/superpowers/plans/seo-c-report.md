# SEO: WebApplication Structured Data — Implementation Report

**Branch:** `feat/seo-tier1-2`
**Date:** 2026-07-05

## Approach

Used a shared helper (`lib/tool-schema.ts`) rather than hand-editing 31 files with duplicated literals. The helper exports `toolWebAppJsonLd(slug: string): object | null`, which looks up the tool in `TOOLS` by href, maps `category` → `applicationCategory`, and returns the full WebApplication schema object (or `null` for unknown slugs). Each `page.tsx` imports the helper and renders one additional `<script type="application/ld+json">` tag with the same `// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD` comment pattern as the existing BreadcrumbList script.

A Python script patched all 31 real tool pages in one pass. The 7 noindex redirect stub pages (neighborhood-comparison, relocation-cost-estimator, relocation-tracker, tax-residency-planner, freelancer-vs-company, ltd-setup-calculator, gesy-registration) were left untouched.

## Files Changed

- `lib/tool-schema.ts` — new shared helper (created)
- `app/tools/<slug>/page.tsx` — 31 files patched (import + second `<script>`)

## Tool Pages Given WebApplication Schema

**31 / 31** real tool pages.

## applicationCategory Distribution

| Category | Count | Tools |
|---|---|---|
| `FinanceApplication` | 17 | All Tax & Contributions, Property & Rent, Cost & Budget tools; sole-trader-vs-ltd (override) |
| `TravelApplication` | 8 | All Location & Living tools; events-calendar (override) |
| `BusinessApplication` | 6 | All Visa & Residency tools; relocation-checklist, grants-finder |

Category override logic applied for:
- `events-calendar` → TravelApplication (Lifestyle, not business)
- `tax-filing-calendar` → FinanceApplication (Tax, not generic tracker)
- `sole-trader-vs-ltd` → FinanceApplication (financial comparison, not generic business tool)

## Verification

- `biome check lib/tool-schema.ts app/tools/mortgage-calculator/page.tsx` → no errors
- `npm run build` → completed with no errors; all 31 tool pages statically generated
- Confirmed `"WebApplication"` present in built HTML for all 31 slugs (grep of `out/tools/*/index.html`)
- Sample from `out/tools/mortgage-calculator/index.html`:
  - `BreadcrumbList` (existing) ✓
  - `WebApplication` with `applicationCategory: "FinanceApplication"` ✓

## Build Result

`npm run build` — passed, no errors, 31 tool pages built as static content.

## Commit Hash

See git log on `feat/seo-tier1-2` for the commit `seo: add WebApplication structured data to tool pages`.

## Concerns

None blocking. The pre-existing 96 biome errors in other project files are unrelated to this change (confirmed by running biome on the new/patched files individually — zero errors).
