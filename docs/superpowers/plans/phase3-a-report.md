# Phase 3A Report — Tool Slug Renames with Meta-refresh Redirect Stubs

**Date:** 2026-07-01
**Branch:** feat/navigation-phase3
**Commit:** b2ef073

---

## Renames performed

| Old slug | New slug | Files updated |
|---|---|---|
| `neighborhood-comparison` | `city-comparison` | `city-comparison/page.tsx`, `city-comparison/client.tsx` (H1 + export name), stub `neighborhood-comparison/page.tsx`, `lib/tools-index.ts` (href + title), `app/sitemap.ts`, `app/tools/relocation-checklist/client.tsx` (×2), `app/tools/price-benchmarker/client.tsx`, `app/guides/[slug]/page.tsx` (×5) |
| `relocation-cost-estimator` | `relocation-cost-calculator` | `relocation-cost-calculator/page.tsx` (canonical, OG URL, import name, function name), `relocation-cost-calculator/client.tsx` (export name), stub `relocation-cost-estimator/page.tsx`, `lib/tools-index.ts`, `app/sitemap.ts`, `components/HomeHub.tsx` |
| `relocation-tracker` | `relocation-checklist` | `relocation-checklist/page.tsx` (canonical, OG URL, function name), stub `relocation-tracker/page.tsx`, `lib/tools-index.ts`, `app/sitemap.ts` |
| `tax-residency-planner` | `tax-residency-tracker` | `tax-residency-tracker/page.tsx` (canonical, OG URL, function name), `tax-residency-tracker/client.tsx` (export name), stub `tax-residency-planner/page.tsx`, `lib/tools-index.ts`, `app/sitemap.ts`, `app/layout.tsx`, `app/tools/tax-savings-calculator/client.tsx`, `app/tools/country-comparison/client.tsx`, `app/tools/ltd-setup-calculator/client.tsx`, `app/tools/mortgage-calculator/client.tsx`, `app/tools/relocation-checklist/client.tsx`, `app/guides/[slug]/page.tsx` |

---

## Sitemap change

`app/sitemap.ts` TOOL_SLUGS updated: four old slugs replaced with four new slugs. Stubs are noindex and do not appear in the sitemap.

---

## Grep-clean confirmation

```
grep -rn "tools/neighborhood-comparison|tools/relocation-cost-estimator|tools/relocation-tracker|tools/tax-residency-planner" app/ lib/ components/
```

**Result: zero matches** (no stale internal links). Old slug references exist only as stub directory page.tsx files (content points to new paths).

---

## Build result

`npm run build` → **✓ Compiled successfully in 17.3s**

All 8 routes generated (4 new + 4 stub):
- `/tools/city-comparison` ○ (static)
- `/tools/neighborhood-comparison` ○ (static — stub, noindex)
- `/tools/relocation-cost-calculator` ○ (static)
- `/tools/relocation-cost-estimator` ○ (static — stub, noindex)
- `/tools/relocation-checklist` ○ (static)
- `/tools/relocation-tracker` ○ (static — stub, noindex)
- `/tools/tax-residency-tracker` ○ (static)
- `/tools/tax-residency-planner` ○ (static — stub, noindex)

---

## Concerns

- **Biome formatting errors (pre-existing):** `biome check` reports 421 errors across the codebase, all pre-existing (tab vs space indentation inherited from prior commits). None introduced by this PR. Build passes cleanly.
- **city-comparison/client.tsx display text:** One instance of "Neighborhood Comparison" (US spelling) was in the H1; updated to "City Comparison". The description text already used "Neighbourhood" (UK). No other US-spelling "neighborhood" copy remains in user-facing output.
