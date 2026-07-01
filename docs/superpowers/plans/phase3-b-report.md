# Phase 3B Report — Sole Trader vs Ltd Merge

## Merge Design

Two existing tools merged into a single tabbed page at `/tools/sole-trader-vs-ltd/`. The new page renders a client-side tab switcher that conditionally mounts one of two pre-existing, self-contained calculator components. No calculator logic was rewritten.

## Exact Default-Export Names Imported

| Source file | Default export name |
|---|---|
| `app/tools/freelancer-vs-company/client.tsx` | `FreelancerVsCompanyPage` |
| `app/tools/ltd-setup-calculator/client.tsx` | `LtdSetupCalculatorClient` |

Both take zero props.

## Files Created

- `app/tools/sole-trader-vs-ltd/client.tsx` — `"use client"` tab switcher (`useState<"takehome"|"setup">`), filter-chip tab buttons styled with `rounded-full`/`bg-slate-900 text-white` active state.
- `app/tools/sole-trader-vs-ltd/page.tsx` — server page with metadata (`title`, `description`, `alternates.canonical`), JSON-LD BreadcrumbList (4-crumb: Home → Explore → Tools → Sole Trader vs Ltd), Breadcrumbs component, H1/intro, and `<SoleTraderVsLtdClient />`.
- `docs/superpowers/plans/phase3-b-report.md` — this file.

## Files Modified

| File | Change |
|---|---|
| `app/tools/freelancer-vs-company/page.tsx` | Replaced with meta-refresh redirect stub → `/tools/sole-trader-vs-ltd/` |
| `app/tools/ltd-setup-calculator/page.tsx` | Replaced with meta-refresh redirect stub → `/tools/sole-trader-vs-ltd/` |
| `lib/tools-index.ts` | Removed `freelancer-vs-company` and `ltd-setup-calculator` entries; added `sole-trader-vs-ltd`. TOOLS count: 33 → 32. |
| `app/sitemap.ts` | `TOOL_SLUGS`: removed `freelancer-vs-company` and `ltd-setup-calculator`; added `sole-trader-vs-ltd`. |
| `app/tools/ltd-setup-calculator/client.tsx` | Updated related-tools link: `/tools/freelancer-vs-company/` → `/tools/sole-trader-vs-ltd/` |
| `app/tools/tax-savings-calculator/client.tsx` | Updated related-tools link: `/tools/freelancer-vs-company/` → `/tools/sole-trader-vs-ltd/` |
| `app/guides/[slug]/page.tsx` | Updated both `freelancer-vs-company` tool-slug entries → `sole-trader-vs-ltd` |

## Internal Links Repointed

All `/tools/freelancer-vs-company/` and `/tools/ltd-setup-calculator/` href links in `app/`, `lib/`, and `components/` were repointed to `/tools/sole-trader-vs-ltd/`. Post-change grep confirms the only remaining references to the old paths are:
- Component import statements in `app/tools/sole-trader-vs-ltd/client.tsx` (allowed — these are module imports, not link hrefs).

## Biome Status (Authored Files)

`npx @biomejs/biome check` on all 6 authored/edited files: **No errors**. Two stub page files were auto-fixed on the `--write` pass (minor formatting); second run reports "No fixes applied."

## Build Result

`npm run build` — **passed**. 484 static pages generated. Routes confirmed in output:
- `○ /tools/sole-trader-vs-ltd` ✓
- `○ /tools/freelancer-vs-company` ✓ (stub redirect)
- `○ /tools/ltd-setup-calculator` ✓ (stub redirect)

## TOOLS Count

32 (was 33 — removed 2 entries, added 1).

## Concerns

None blocking. The two embedded client components each contain their own internal `<main id="main">` wrapper and internal breadcrumb/header — these render inside the tabbed view. This is cosmetically redundant (two `<main>` elements, duplicate breadcrumbs) but functionally correct and matches the task requirement to reuse existing components without rewriting them. A future cleanup pass could strip the inner headers/wrappers from each client component now that they live in a parent page.
