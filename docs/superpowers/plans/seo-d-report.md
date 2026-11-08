# SEO Tier 1–2 D-Report: Sitemap lastmod, noindex shortlist, dynamic guide count

**Branch:** `feat/seo-tier1-2`  
**Commit:** `54e8ef6`  
**Build:** Passed (static export, all pages pre-rendered)  
**Date:** 2026-07-05

---

## 1. Sitemap — real lastmod + missing pages

**File:** `app/sitemap.ts`

**Changes:**
- Guide URLs now use `new Date(g.dateModified)` instead of `now`, giving each guide its own per-item `<lastmod>` value sourced from `GuideInfo.dateModified`.
- Added three missing top-level pages immediately after the per-guide entries:
  - `/regions/` — changeFrequency: monthly, priority: 0.6
  - `/listings/` — changeFrequency: monthly, priority: 0.6
  - `/advertise/` — changeFrequency: monthly, priority: 0.6

**Verification (out/sitemap.xml):**
- All three new pages confirmed present in built output.
- Distinct `<lastmod>` values observed: `2026-05-29T00:00:00.000Z`, `2026-06-18T00:00:00.000Z`, `2026-07-05T00:00:00.000Z` (guide-specific dates from `dateModified`), plus build-time date for non-guide pages. Varied lastmods confirmed — not all identical.

---

## 2. noindex `/my-shortlist/`

**Files changed:**
- `app/my-shortlist/page.tsx` — replaced with a server component that exports:
  ```ts
  export const metadata: Metadata = {
      title: "Saved Shortlist — RealCy.app",
      robots: { index: false, follow: true },
  };
  ```
  Renders `<ShortlistClient />`.
- `app/my-shortlist/client.tsx` — new file; the original `"use client"` component (renamed from page.tsx, default export renamed to `ShortlistClient`).
- `app/robots.ts` — added `disallow: "/my-shortlist/"` to the robots rules.

**Verification:** `out/my-shortlist/index.html` contains `noindex` meta tag. Confirmed.

---

## 3. Dynamic guide count

**Real guide count:** 74 guides (confirmed by `grep -c "datePublished:" lib/guides.ts`).

**Files changed:**
- `app/layout.tsx` — added `const GUIDE_COUNT = GUIDES.length;` after `TOOL_COUNT`. Replaced three hardcoded `"68 in-depth guides"` strings (description, openGraph.description, twitter.description) with template literals interpolating `${GUIDE_COUNT}`.
- `app/page.tsx` — added `const GUIDE_COUNT = GUIDES.length;`. Replaced two hardcoded `68 in-depth guides` strings (metadata description, orgJsonLd description).

All five occurrences of the stale `68` count replaced across both files.

---

## Build Result

`npm run build` — PASSED. All pages pre-rendered as static export (no errors).

---

## Commit

Hash: `54e8ef6`  
Message: `seo: real sitemap lastmod + missing pages, noindex shortlist, dynamic guide count`  
Files committed: `app/sitemap.ts`, `app/my-shortlist/page.tsx`, `app/my-shortlist/client.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`

---

## Concerns

- The `const GUIDE_COUNT = GUIDES.length;` declaration is placed before the side-effect import `import "./globals.css";` in `layout.tsx` (a pre-existing pattern with `TOOL_COUNT`). Biome does not error on this; it's a minor import-ordering oddity but functionally correct.
- Guide `dateModified` values top out at `2026-07-05` — if guides are updated without bumping `dateModified`, the sitemap lastmod will lag. This is expected behaviour and requires editorial discipline, not a code fix.
- `/advertise/` page does not yet exist as a route in the app; the sitemap entry is added as requested for future-proofing.
