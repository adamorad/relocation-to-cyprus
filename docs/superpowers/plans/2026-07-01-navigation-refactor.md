# Navigation Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make realcy.app navigation consistent, discoverable, and grouped — one global header on every page, a proper mobile menu, grouped tool/section indexes, working breadcrumbs, and no orphaned routes.

**Architecture:** Introduce single sources of truth (`lib/nav-links.ts`, `lib/tools-index.ts`) and one shared `<Breadcrumbs>` component, then rewire `SiteHeader`, the two index pages, the footer, and add the two missing route indexes to consume them. No behavioural change to the map itself — the homepage map quick-filters are preserved, just demoted below a now-consistent primary nav.

**Tech Stack:** Next.js 16 (app router), React 19, TypeScript, Tailwind, Biome (lint). **No unit-test harness exists** — verification is `pnpm build` (or `npm run build`), `biome check .`, and live Playwright checks against `next dev`.

## Global Constraints

- Package manager / scripts: `npm run build` (`next build`), `npm run lint` (`biome check .`), `npm run dev` (`next dev`). Verify with these exact commands.
- `main` is protected by a global hook. All work on branch `feat/navigation-refactor` (already created). Feature-branch naming only.
- UK spelling for all user-facing copy (this is a Cyprus/EU site): "neighbourhood", "licence", "centre".
- Brand accent colour: `#35cdc4` (teal). Slate palette for text.
- Trailing-slash routes: internal links use a trailing slash (e.g. `/tools/`), matching existing convention.
- No deletion of pages in this plan — orphan/rename cleanup (Phase 3) is behind explicit sign-off because it carries SEO risk (needs 301 redirects). Old work goes to `archive/`, never deleted (project convention).
- Every task ends by running `biome check .` on the touched files and `npm run build`; both must pass before commit.
- Commit style: `feat:` / `fix:` / `chore:` conventional prefixes.

---

## File Structure

**New files (7):**
- `lib/nav-links.ts` — single source of truth for the primary nav link set (label + href), consumed by `PrimaryNav`.
- `lib/tools-index.ts` — single source of truth for the 33 tools (moved out of `app/tools/page.tsx`), adds a `category` field for grouping. Consumed by the tools index, ExploreClient (via adapter), and the layout count.
- `components/Breadcrumbs.tsx` — one reusable breadcrumb component (visual + optional). Replaces hand-rolled `<nav>` breadcrumbs.
- `components/PrimaryNav.tsx` — the desktop link row + mobile hamburger/drawer, rendered by `SiteHeader` on every page. Owns its own local open/close state (does NOT reuse the map's `mobileMenuOpen`).
- `app/tools/client.tsx` — the interactive tools grid + filter chips (client component), split out so `app/tools/page.tsx` can remain a server component exporting `metadata`.
- `app/regions/page.tsx` — index page for `/regions` (currently 404s).
- `app/listings/page.tsx` — index page for `/listings` (currently 404s).

**Modified files:**
- `components/SiteHeader.tsx` — use `PrimaryNav` on every page; keep map quick-filters as a secondary sub-bar on the homepage only.
- `app/tools/page.tsx` — import from `lib/tools-index.ts`, add category filter chips (mirror `app/sections/client.tsx`).
- `app/explore/ExploreClient.tsx` — import tools from `lib/tools-index.ts` instead of its local copy.
- `app/layout.tsx` — derive `TOOL_COUNT` from `lib/tools-index.ts`; add `/my-shortlist/` and `/developers/` to footer utility column.
- The 13 section deep pages missing an up-level crumb — swap their hand-rolled top nav for `<Breadcrumbs>`.

---

## Phasing

- **Phase 1 (P0 — structural):** Task 1 (nav source), Task 2 (unified header + mobile menu), Task 3 (grouped tools index).
- **Phase 2 (P1 — wayfinding):** Task 4 (Breadcrumbs component + fix 13 section pages), Task 5 (orphans + 404 indexes).
- **Phase 3 (P2 — taxonomy hygiene, SEO-gated):** Task 6 (renames + redirects + tool merges). **Do NOT start Phase 3 without explicit user sign-off** — it changes URLs and needs redirects.

---

## Task 1: Primary-nav single source of truth

**Files:**
- Create: `lib/nav-links.ts`

**Interfaces:**
- Produces: `PRIMARY_NAV: ReadonlyArray<{ label: string; href: string }>` and `isActive(pathname: string, href: string): boolean`.

- [ ] **Step 1: Create `lib/nav-links.ts`**

```typescript
export type NavLink = { label: string; href: string };

export const PRIMARY_NAV: ReadonlyArray<NavLink> = [
  { label: "Guides", href: "/guides/" },
  { label: "Tools", href: "/tools/" },
  { label: "Directories", href: "/sections/" },
  { label: "Explore", href: "/explore/" },
];

/** True when the current pathname is within the nav item's section. */
export function isActive(pathname: string, href: string): boolean {
  const clean = href.replace(/\/$/, "");
  if (clean === "") return pathname === "/";
  return pathname === clean || pathname.startsWith(`${clean}/`);
}
```

- [ ] **Step 2: Lint**

Run: `biome check lib/nav-links.ts`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/nav-links.ts
git commit -m "feat: add single source of truth for primary nav links"
```

---

## Task 2: Unified responsive header with mobile menu + active state

**Files:**
- Create: `components/PrimaryNav.tsx`
- Modify: `components/SiteHeader.tsx` (full rewrite of the nav portion)
- Consumes: `PRIMARY_NAV`, `isActive` (Task 1); `useMapNav` incl. existing `mobileMenuOpen`/`openMobileMenu`/`closeMobileMenu` from `components/MapNavContext.tsx`.

**Interfaces:**
- Produces: `<PrimaryNav />` — renders desktop links (with active state + `aria-current`) and a mobile hamburger that toggles a drawer containing the same links. Self-contained; reads `usePathname()` and `useMapNav()`.

- [ ] **Step 1: Create `components/PrimaryNav.tsx`**

Note: `PrimaryNav` owns its own `open` state via `useState` — it deliberately does NOT reuse `useMapNav().mobileMenuOpen`, because that context boolean is already used by `AppShell`'s on-map "≡ Sections" drawer on the homepage. Sharing it would open both drawers at once.

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRIMARY_NAV, isActive } from "@/lib/nav-links";

export function PrimaryNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop links */}
      <nav className="hidden md:flex items-center gap-3 text-xs text-slate-500" aria-label="Primary">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const isExplore = item.href === "/explore/";
          if (isExplore) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="ml-1 text-xs px-3 py-1.5 rounded-full bg-[#35cdc4] text-slate-900 font-semibold hover:bg-teal-400 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`transition-colors whitespace-nowrap px-2 py-1 ${
                active ? "text-slate-900 font-semibold" : "hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="primary-mobile-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          id="primary-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="md:hidden fixed inset-0 z-50"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <nav
            className="absolute right-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-xl p-6 flex flex-col gap-1"
            aria-label="Primary mobile"
          >
            <button
              type="button"
              className="self-end mb-4 rounded-md p-2 text-slate-700 hover:bg-slate-100"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/my-shortlist/"
              onClick={() => nav?.closeMobileMenu()}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Saved Shortlist
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Rewrite `components/SiteHeader.tsx`**

Replace the entire file. The header now always shows the logo + `<PrimaryNav />`. On the homepage (`mapActive`) it additionally renders the map quick-filter buttons as a **second row** (sub-bar), so Hotels/Food/Shopping/Schools/Healthcare are preserved but no longer replace the primary nav.

```tsx
"use client";
import Link from "next/link";
import { useMapNav } from "./MapNavContext";
import { PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
  const nav = useMapNav();
  const mapActive = nav?.mapActive ?? false;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-slate-900 text-sm hover:text-[#35cdc4] transition-colors flex-shrink-0"
        >
          RealCy.app
        </Link>
        <PrimaryNav />
      </div>

      {mapActive && nav && (
        /* Homepage map quick-filters — secondary sub-bar, desktop only */
        <div className="hidden md:block border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-9 flex items-center gap-1 overflow-x-auto">
            <span className="rounded-md bg-amber-400 text-slate-900 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap flex-shrink-0">
              New Developments
            </span>
            {(
              [
                { name: "Hotels", handler: nav.openHotels },
                { name: "Food", handler: nav.openFood },
                { name: "Shopping", handler: nav.openShopping },
                { name: "Schools", handler: nav.openSchools },
                { name: "Healthcare", handler: nav.openHealthcare },
              ] as const
            ).map(({ name, handler }) => (
              <button
                key={name}
                type="button"
                onClick={handler}
                className="rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap flex-shrink-0 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Verify the map quick-filter buttons still open panels**

Note for implementer: the homepage map panels (`openHotels`, etc.) come from `useMapNav()`. The mobile equivalent of these quick-filters already exists in `components/AppShell.tsx`'s on-map `≡ Sections` bottom-sheet — leave that as-is; it is the mobile path for map filters. Do not remove it in this task.

- [ ] **Step 4: Build + lint**

Run: `biome check components/ lib/ && npm run build`
Expected: build succeeds, no lint errors.

- [ ] **Step 5: Live check (dev server)**

Start `npm run dev`, then with Playwright:
1. Load `http://localhost:3000/` at 1280px → header shows Guides · Tools · Directories · Explore AND a second row with New Developments/Hotels/Food/…
2. Load `http://localhost:3000/tools/mortgage-calculator/` → header shows the same primary links; "Tools" is visibly active (`aria-current="page"`).
3. Resize to 390px on any page → hamburger visible; click it → drawer opens with all links; click a link → navigates and drawer closes.
Expected: all pass; no console errors.

- [ ] **Step 6: Commit**

```bash
git add components/PrimaryNav.tsx components/SiteHeader.tsx
git commit -m "feat: unified responsive header with mobile menu and active state"
```

---

## Task 3: Grouped tools index (single source of truth + filter chips)

**Files:**
- Create: `lib/tools-index.ts`
- Modify: `app/tools/page.tsx`
- Modify: `app/explore/ExploreClient.tsx` (import tools from lib), `app/layout.tsx` (`TOOL_COUNT`)

**Interfaces:**
- Produces: `TOOLS: ReadonlyArray<ToolEntry>` where `ToolEntry = { href; title; description; tag; tagColor; category }`, and `TOOL_CATEGORIES: readonly string[]`.

- [ ] **Step 1: Create `lib/tools-index.ts`**

Move the existing `TOOLS` array out of `app/tools/page.tsx` into this file **verbatim** (all 33 entries, titles/descriptions/tag/tagColor unchanged), adding a `category` field to each using this exact slug→category map:

```
Visa & Residency:      visa-pathway-finder, visa-renewal-reminder, meu1-tracker, drivers-licence-exchange, gesy-registration
Tax & Contributions:   tax-residency-planner, tax-savings-calculator, tax-filing-calendar, double-tax-treaty-finder, social-insurance-calculator
Work & Business:       freelancer-vs-company, ltd-setup-calculator, grants-finder
Property & Rent:       mortgage-calculator, rent-vs-buy-calculator, rental-yield-calculator, rental-price-trends, price-benchmarker, development-comparison
Cost & Budget:         relocation-cost-estimator, budget-builder, banking-fee-comparison, health-insurance-comparison, isp-comparison
Location & Living:     country-comparison, neighborhood-comparison, neighbourhood-explorer, school-finder, weather-climate, flight-connectivity, pet-import-checklist
Trackers & Calendars:  relocation-tracker, events-calendar
```

File skeleton (fill the array by moving the existing 33 objects and appending `category`):

```typescript
export type ToolEntry = {
  href: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  category: string;
};

export const TOOL_CATEGORIES = [
  "Visa & Residency",
  "Tax & Contributions",
  "Work & Business",
  "Property & Rent",
  "Cost & Budget",
  "Location & Living",
  "Trackers & Calendars",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export const TOOLS: ReadonlyArray<ToolEntry> = [
  // ... 33 entries moved from app/tools/page.tsx, each with its category ...
];
```

Verification of completeness for this step: `TOOLS.length === 33`, and every `TOOL_CATEGORIES` value has ≥1 tool. Counts per the map above: 5 + 5 + 3 + 6 + 5 + 7 + 2 = 33.

- [ ] **Step 2: Refactor `app/tools/page.tsx` to a client component with filter chips**

`app/tools/page.tsx` currently exports `metadata` (server). Split: keep `page.tsx` as a thin server wrapper exporting `metadata` + JSON-LD that renders `<ToolsIndexClient />`, and move the interactive grid into `app/tools/client.tsx` (mirroring how `app/sections/` is split into `page.tsx` + `client.tsx`).

`app/tools/page.tsx` server wrapper must add: `import ToolsIndexClient from "./client";` and render `<ToolsIndexClient />` in place of the old inline `<div className="grid …">…</div>`. The `<main>`, breadcrumb, header, disclaimer aside, and JSON-LD stay in `page.tsx`; only the filterable grid moves to the client.

`app/tools/client.tsx` (new, `"use client"`) imports `TOOLS`, `TOOL_CATEGORIES` from `@/lib/tools-index`, holds `const [active, setActive] = useState<ToolCategory | "all">("all")`, and reuses the exact filter-chip pattern from `app/sections/client.tsx:40-66` (All (33) + one chip per category with `countFor`), plus the existing card grid (`app/tools/page.tsx:323-350`) driven by the filtered list. Fix the up-level breadcrumb (in `page.tsx`) to match sections: `Home › Explore › Tools`.

- [ ] **Step 3: Point other consumers at the lib**

**`app/explore/ExploreClient.tsx` — use an adapter, do NOT swap the type.** Its local `ToolEntry`/`SearchResult` uses `{ name, slug, tag, description }`, whereas `lib/tools-index.ts` exposes `{ title, href, tag, tagColor, description, category }`. Deleting the local array and importing `TOOLS` directly would break every `t.name`/`t.slug` reference and the `SearchResult` union → build failure. Instead: delete only the local literal array and rebuild the same shape from `TOOLS` via an adapter, leaving all downstream `name`/`slug` references untouched:

```tsx
import { TOOLS } from "@/lib/tools-index";
// replaces the old inline TOOLS_LIST literal:
const TOOLS_LIST = TOOLS.map((t) => ({
  name: t.title,
  slug: t.href.replace(/^\/tools\//, "").replace(/\/$/, ""),
  tag: t.tag,
  description: t.description,
}));
```

(Confirm the local variable's real name by reading the file first; wire the adapter to whatever the existing array was called.)

In `app/layout.tsx:13`, replace the hardcoded `TOOL_COUNT = 33` with `import { TOOLS } from "@/lib/tools-index"` and `const TOOL_COUNT = TOOLS.length;`. Grep the repo for any remaining hardcoded "33 tools" copy and confirm it derives from `TOOLS.length` or is accurate.

- [ ] **Step 4: Build + lint**

Run: `biome check app/ lib/ && npm run build`
Expected: passes. If build complains that `app/tools/page.tsx` can't be a client component while exporting `metadata`, that confirms the Step-2 split was needed.

- [ ] **Step 5: Live check**

Load `http://localhost:3000/tools/` → filter chips render (All (33), Visa & Residency (5), …); clicking a chip filters the grid. Breadcrumb reads `Home › Explore › Tools`.

- [ ] **Step 6: Commit**

```bash
git add lib/tools-index.ts app/tools/ app/explore/ExploreClient.tsx app/layout.tsx
git commit -m "feat: group tools index with filter chips and single source of truth"
```

---

## Task 4: Shared Breadcrumbs component + fix 13 section pages

**Files:**
- Create: `components/Breadcrumbs.tsx`
- Modify (13): `app/sections/{ev-charging,expat-communities,farmers-markets,fitness-wellness,halal-kosher,international-grocery,mental-health-services,public-transport,religious-services,specialist-doctors,veterinary-services,volunteering,wineries}/client.tsx`

**Interfaces:**
- Produces: `<Breadcrumbs items={[{label, href?}]} />` — renders a visual breadcrumb `<nav aria-label="Breadcrumb">`; the last item is rendered as current (no link).

- [ ] **Step 1: Create `components/Breadcrumbs.tsx`**

```tsx
import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-600 mb-6">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`}>
            {item.href && !last ? (
              <Link href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-slate-900" : undefined} aria-current={last ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!last && <span aria-hidden="true">{" › "}</span>}
          </span>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Fix the 13 section pages**

In each of the 13 `client.tsx` files, find the top breadcrumb `<nav>` (currently `Home` only, e.g. `app/sections/wineries/client.tsx:60-62`) and replace it with:

```tsx
<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { label: "Directories", href: "/sections/" },
  { label: "<SECTION NAME>" },
]} />
```

Use the section's display name from `lib/sections-index.ts` for `<SECTION NAME>` (e.g. wineries → "Wineries & Wine Tourism"). Add `import { Breadcrumbs } from "@/components/Breadcrumbs";` to each file. Leave the bottom "← Back to the map" link as-is.

- [ ] **Step 3: Build + lint**

Run: `biome check components/Breadcrumbs.tsx app/sections/ && npm run build`
Expected: passes.

- [ ] **Step 4: Live check**

Load `http://localhost:3000/sections/wineries/` → breadcrumb reads `Home › Directories › Wineries & Wine Tourism`, and "Directories" links to `/sections/`.

- [ ] **Step 5: Commit**

```bash
git add components/Breadcrumbs.tsx app/sections/
git commit -m "fix: add up-level breadcrumb to 13 section pages via shared component"
```

---

## Task 5: Surface orphans + add missing route indexes

**Files:**
- Modify: `app/layout.tsx` (footer utility column, around `:227-234`)
- Create: `app/regions/page.tsx`
- Create: `app/listings/page.tsx`

**Interfaces:**
- Consumes: `REGIONS` from `@/lib/regions`, listings data from `@/lib/listings` (implementer: confirm exact export names by reading those files — `lib/regions.ts`, `lib/listings.ts`).

- [ ] **Step 1: Add orphan links to footer**

In `app/layout.tsx`, in the utility `<ul>` that currently has About/Advertise/Contact/Explore/Privacy/Sitemap (`:227-234`), add two `<li>` items:

```tsx
<li><Link href="/my-shortlist/" className="hover:text-white transition-colors">Saved Shortlist</Link></li>
<li><Link href="/developers/" className="hover:text-white transition-colors">Developers</Link></li>
```

- [ ] **Step 2: Create `app/regions/page.tsx`**

A server component listing every region as a card linking to `/regions/{slug}/`, mirroring the visual style of `app/sections/client.tsx` cards. Read `lib/regions.ts` first to get the exact export + field names. Include `metadata` (`title`, `description`, `alternates.canonical: "/regions/"`) and a `<Breadcrumbs items={[{label:"Home",href:"/"},{label:"Regions"}]} />`.

- [ ] **Step 3: Create `app/listings/page.tsx`**

Same pattern for developments/listings, linking to `/listings/{slug}/`. **`lib/listings.ts` exports functions, not a constant array** — use `allListings()` (verify the exact name by reading the file; related exports are `listingBySlug()`, `listingsForRegion()`, `allSlugs()`). Do NOT expect a `LISTINGS` constant. Include `metadata` with `alternates.canonical: "/listings/"` and a breadcrumb `Home › Listings`.

- [ ] **Step 4: Build + lint + verify no 404**

Run: `npm run build` then with dev server load `http://localhost:3000/regions/` and `http://localhost:3000/listings/` — both must render (not 404) and their cards must link to real child routes.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/regions/page.tsx app/listings/page.tsx
git commit -m "fix: surface my-shortlist/developers in footer and add regions/listings index pages"
```

---

## Task 6: (Phase 3 — GATED) taxonomy hygiene: renames, redirects, merges

**DO NOT START without explicit user sign-off.** This changes public URLs and must ship with 301 redirects or it will lose SEO equity on already-ranking pages.

**Files:**
- Modify: `next.config.*` (add `redirects()`), rename route directories, update all internal links.

Scope when approved:
1. Rename `app/tools/neighborhood-comparison/` → `city-comparison/` (it compares the 5 cities); add 301 `neighborhood-comparison → city-comparison`. Standardise UK "neighbourhood" everywhere.
2. Rename for suffix consistency: `relocation-cost-estimator → relocation-cost-calculator`, `relocation-tracker → relocation-checklist`, `tax-residency-planner → tax-residency-tracker`. Each with a 301.
3. Merge `freelancer-vs-company` + `ltd-setup-calculator` into one tool (or cross-link tightly) — decide with user.
4. Move `gesy-registration` guidance under `/guides/` or fold into `social-insurance-calculator`.
5. Prune candidates (near-zero traffic): `community-gardens`, `rooftop-bars`, `co-living`, `registered-address`, `ev-charging` — de-list from the grouped index rather than delete; archive only on explicit instruction.

Each rename step: create redirect → move directory → grep-and-update all internal `href`s → `npm run build` → verify old URL 301s to new → commit.

---

## Self-Review (completed by author)

- **Spec coverage:** Fix 1 (unified header)→Task 2; Fix 2 (mobile menu)→Task 2; Fix 3 (grouped tools)→Task 3; Fix 4 (active state)→Task 2 (`isActive`/`aria-current`); Fix 5 (breadcrumbs)→Task 4; Fix 6 (orphans+404 indexes)→Task 5; Fix 7 (single source of truth + renames)→Task 3 (dedupe) + Task 6 (renames, gated). All seven review fixes mapped.
- **Placeholder scan:** New files (nav-links, PrimaryNav, Breadcrumbs, SiteHeader) contain complete code. Data-heavy moves (tools-index array, regions/listings index) reference existing verbatim source + an exact category map rather than re-typing 33 descriptions — intentional, not a placeholder.
- **Type consistency:** `PRIMARY_NAV`/`isActive` (Task 1) used exactly in Task 2. `TOOLS`/`TOOL_CATEGORIES` (Task 3) shape matches existing `Tool` type + added `category`. `<Breadcrumbs items>` shape consistent across Tasks 4 & 5.
- **Known assumption to verify at execution:** exact export names of `lib/regions.ts` and `lib/listings.ts` (Task 5 Steps 2-3 instruct the implementer to read them first).
