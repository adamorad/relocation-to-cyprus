# Phase 3C Report — Navigation Refactor

**Date:** 2026-07-01
**Branch:** feat/navigation-phase3

---

## C1 — GeSY Tool Folded into Guide

- `app/tools/gesy-registration/page.tsx` replaced with meta-refresh redirect stub pointing to `/guides/gesy-registration-guide/`.
- `app/tools/gesy-registration/client.tsx` confirmed imported only by the old page.tsx; `git rm`'d (now dead code).
- `lib/tools-index.ts`: removed gesy-registration entry. **TOOLS.length: 32 → 31**.
- `app/sitemap.ts`: removed `"gesy-registration"` from `TOOL_SLUGS`.
- `components/HomeHub.tsx`: repointed `FEATURED_TOOLS` href from `/tools/gesy-registration/` → `/guides/gesy-registration-guide/`.
- Stale-link grep after changes: zero hits in `app/`, `lib/`, `components/` outside stub dir.

## C2 — 5 Near-Zero Sections De-Listed

Removed from `SECTIONS_INDEX` in `lib/sections-index.ts`:
- `co-living` (Property & Housing)
- `registered-address` (Business)
- `ev-charging` (Active Living)
- `rooftop-bars` (Food & Drink)
- `community-gardens` (Environment — sole member)

`"Environment"` category removed from `SECTION_CATEGORIES` (zero members after community-gardens removal). **SECTIONS_INDEX.length: 29 → 24.**

**De-coupled pages check:** None of the 5 de-listed pages (`app/sections/{co-living,registered-address,ev-charging,rooftop-bars,community-gardens}/page.tsx` or `client.tsx`) imported `SECTIONS_INDEX`. No de-coupling needed; all pages remain live and build cleanly.

## C3 — Stale Tool Counts Fixed

Found "33 relocation tools" in 3 files:
- `app/layout.tsx` (3 occurrences — description, og:description, twitter:description) → changed to **31**
- `app/page.tsx` (2 occurrences — page metadata description and org JSON-LD) → changed to **31**
- `components/HomeHub.tsx` — hardcoded `const TOOL_COUNT = 33` → changed to **31**

`TOOL_COUNT` in layout.tsx is derived (`TOOLS.length`) — left as-is.

## Build & Lint

- `npm run build`: **✓ Compiled successfully.** 484/484 static pages generated.
- `/tools/gesy-registration/` builds as a stub (static).
- All 5 de-listed section pages still generated (unreachable via index but live by URL).
- Biome on 7 authored files: **no errors, no remaining fixes needed** (7 files checked clean).

## Final Counts

- **TOOLS.length: 31**
- **SECTIONS_INDEX.length: 24**

## Concerns

None. All changes were mechanical and build passed cleanly.
