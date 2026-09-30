# Living in Cyprus Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition RealCy.app from "Cyprus relocation portal" to "living in Cyprus" (residents and expats first, movers second) without changing any URL or losing existing rankings.

**Architecture:** Copy, metadata, homepage structure and navigation change. No slug, route or guide-body changes except one new hub page for the relocation content. Work happens in the clean git worktree `../rtc-living` (branch `feat/living-in-cyprus`, from `origin/main`) because the main checkout has many unrelated uncommitted edits.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Biome (`npm run lint`), Vercel deploy on merge to `main`. There is no unit test framework in this repo (`package.json` scripts are dev, build, start, lint), so verification is `tsc --noEmit`, `npm run lint`, `npm run build`, and grep/node checks of the built HTML.

**Spec:** Positioning and copy were agreed in the 2026-09-30 session (Search Console review). Data behind it: 51% of clicks come from inside Cyprus; top pages are pharmacies, car rental, ferries, expat communities, recycling, halal/kosher, mental health; "moving to Cyprus" queries rank at positions 50 to 78 with no clicks. The copy in this plan is the spec.

## Global Constraints

- No em dash characters in any new or changed text, code comment or doc. Use commas, colons, periods or parentheses.
- No emojis anywhere. No generic AI filler patterns (icon-emoji combos, cookie-cutter cards).
- Never add Nicosia to the map, filters or navigation.
- Site name stays "RealCy.app". No URL, slug, canonical or route is renamed or removed.
- Guide page titles and bodies are not changed by this plan (they were just optimised for search).
- Work on the feature branch `feat/living-in-cyprus`; `main` is protected. Do not touch the uncommitted edits in the main checkout.
- New homepage and hub copy must state only facts already on the site.

## Review Focus

- Any internal link in the new homepage groups that points to a guide or section slug that does not exist (404 on the most visible page).
- `SITUATIONS` type change breaking the existing "planning a move" cards (`tool` field is required today).
- JSON-LD in `app/page.tsx` and `app/layout.tsx` becoming invalid JSON after string edits.
- The mobile navigation drawer (`PrimaryNav.tsx`) overflowing or losing focus handling when a link is added.
- The homepage title losing "Relocation" and falling outside the 50 to 60 character range Google displays.
- The new hub page missing from `sitemap.xml`, so it never gets crawled.
- Em dashes reintroduced by copy pasted from existing strings.

---

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `app/layout.tsx` | Modify | Site-wide tagline, default description, OG text, footer lines |
| `app/page.tsx` | Modify | Homepage title, description, JSON-LD, hidden heading text |
| `components/HomeHub.tsx` | Modify | Hero stat label, new "living" situation groups, section headings, newsletter copy |
| `components/PrimaryNav.tsx` | Modify | Drawer link to the new hub |
| `lib/nav-links.ts` | Modify | Shared nav list gets the hub link |
| `app/moving-to-cyprus/page.tsx` | Create | Hub for relocation guides (immigration, tax, property, business) |
| `app/sitemap.ts` | Modify | Include the hub |
| `app/guides/page.tsx` | Modify | Guides index title and description |
| `app/about/page.tsx` | Modify | About copy |
| `public/llms.txt` | Modify | Intro and section headings |

---

### Task 1: Baseline in the clean worktree

**Files:** none changed

**Interfaces:**
- Produces: a passing baseline build and a recorded "before" count of the word "relocation".

- [ ] **Step 1: Confirm the worktree** (already created)

```bash
cd /Users/adammorad/repos/rtc-living && git branch --show-current && git status --short | head
```
Expected: `feat/living-in-cyprus`, clean tree (the `node_modules` symlink is untracked; do not commit it).

- [ ] **Step 2: Run the baseline**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -5 && npm run build 2>&1 | tail -5
```
Expected: tsc silent, build completes. Record any pre-existing lint errors and do not fix them here.

- [ ] **Step 3: Record the "before" count**

```bash
grep -rn -i "relocation" app/layout.tsx app/page.tsx components/HomeHub.tsx app/guides/page.tsx app/about/page.tsx public/llms.txt | wc -l
```
Save the number for the PR description.

---

### Task 2: Site-wide metadata and footer (`app/layout.tsx`)

**Files:**
- Modify: `app/layout.tsx` (about lines 47, 63, 82, 88, 95, 120, 367)

**Interfaces:**
- Produces: `SITE_TAGLINE`, used by `title.default` for every page without its own title.

- [ ] **Step 1: Change the values**
  - `SITE_TAGLINE` becomes `"Living in Cyprus: Guides, Directories & New Builds"`.
  - Default `description` becomes: `` `Practical help for life in Cyprus: guides, 30+ service directories, ${GUIDE_COUNT} in-depth guides, planning tools and new-build listings on an interactive map.` ``
  - The OpenGraph and Twitter `description` values become: `` `Your guide to living in Cyprus: practical guides, 30+ service directories, planning tools, and new-build real estate.` ``
  - OG image `alt` becomes `"RealCy.app: Living in Cyprus"`.
  - The footer blurb under the RealCy.app wordmark becomes: `Your guide to living in Cyprus: practical guides, curated directories, interactive tools and new-build real estate.`
  - The footer copyright line ends `independent guide to living in Cyprus.` instead of the relocation portal wording.
  - Leave the "Get the free Cyprus Relocation Checklist" block unchanged (it is a lead magnet for movers).

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
git diff -U0 app/layout.tsx | grep '^+' | grep -cP "\x{2014}"
```
Expected: tsc silent; the count is `0`.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx && git commit -m "seo: reposition site-wide metadata and footer to living in Cyprus"
```

---

### Task 3: Homepage metadata, structured data, hero label and newsletter

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/HomeHub.tsx` (stat label about line 277, newsletter about lines 593 to 597)

- [ ] **Step 1: `app/page.tsx`**
  - `metadata.title.absolute` becomes `"RealCy.app: Living in Cyprus, Guides, Tools & New Builds"` (56 characters).
  - `metadata.description` becomes: `` `Practical help for life in Cyprus: pharmacies, ferries, car rental, GESY, recycling and more. Plus new-build listings, planning tools and ${GUIDE_COUNT} guides.` ``
  - `websiteJsonLd.description` becomes `"Independent guide to everyday life in Cyprus: practical guides, service directories, new-build listings and planning tools."`
  - `orgJsonLd.description` becomes: `` `Independent guide to living in Cyprus: new-build real estate, 30+ service directories, 31 planning tools, and ${GUIDE_COUNT} in-depth guides.` ``
  - The `sr-only` paragraph becomes `Living in Cyprus: Guides, Directories, New Developments and Tax Tools | RealCy.app`.

- [ ] **Step 2: `components/HomeHub.tsx`**
  - Stat label `"Relocation guides"` becomes `"Practical guides"`.
  - Newsletter heading becomes `Get the monthly Cyprus update`.
  - Newsletter body becomes `One email per month. New guides, rule changes and tool updates for people living in or moving to Cyprus.`

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
grep -o '<title>[^<]*' .next/server/app/index.html
node -e "const h=require('fs').readFileSync('.next/server/app/index.html','utf8');const m=[...h.matchAll(/<script type=\"application\/ld\+json\"[^>]*>(.*?)<\/script>/gs)];m.forEach(x=>JSON.parse(x[1]));console.log('jsonld ok',m.length)"
```
Expected: the title reads `RealCy.app: Living in Cyprus, Guides, Tools & New Builds`; `jsonld ok` with at least 1 block.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/HomeHub.tsx && git commit -m "seo: reposition homepage metadata, JSON-LD, hero label and newsletter copy"
```

---

### Task 4: Homepage "What do you need help with?" groups

**Files:**
- Modify: `components/HomeHub.tsx` (`Situation` type about line 72, `SITUATIONS` about line 80, selector section about lines 295 to 370)

**Interfaces:**
- Consumes: existing `SITUATIONS` and its render block.
- Produces: `LIVING_GROUPS: Situation[]` (new) and `MOVING_GROUPS: Situation[]` (the old `SITUATIONS`, content unchanged).

- [ ] **Step 1: Make `tool` optional and rename**

```ts
type Situation = {
	num: string;
	label: string;
	desc: string;
	guides: SituationGuide[];
	tool?: { label: string; href: string };
};
```
Rename the existing `SITUATIONS` constant to `MOVING_GROUPS`. In the render block, wrap the tool link in `{s.tool && (...)}`.

- [ ] **Step 2: Add `LIVING_GROUPS`** with five groups (num `01` to `05`), each with 3 to 4 links. Confirm every href in Step 4.

| label | desc | links |
|---|---|---|
| Getting around | Cars, ferries and airport transfers | `/guides/long-term-car-rental-cyprus/`, `/guides/ferry-routes-guide/`, `/guides/airport-transfers-guide/`, `/guides/getting-around-cyprus-no-car/` |
| Health and medicine | Pharmacies, GESY and care | `/guides/pharmacies-medication/`, `/guides/gesy-registration-guide/`, `/guides/dental-care-guide/`, `/sections/mental-health-services/` |
| Food and community | Halal, kosher and expat groups | `/sections/halal-kosher/`, `/sections/expat-communities/`, `/sections/co-living/` |
| Home and property | New builds, developers and renting | `/developers/`, `/guides/best-areas-to-live-cyprus/`, `/guides/buying-process/` |
| Everyday admin | Recycling, safety and local rules | `/guides/waste-recycling-guide/`, `/guides/wildfire-risk-guide/`, plus up to two more slugs found with `grep -n "slug:" lib/guides*.ts` (paternity leave, birth certificate or TD1) if they exist |

Set `tool` only where a real tool exists in `lib/`; otherwise omit it.

- [ ] **Step 3: Render both lists.** Change the heading `What kind of move are you planning?` to `What do you need help with?` and render `LIVING_GROUPS` in the existing grid. Below it add a second block with the eyebrow `Planning a move` and the heading `Moving to Cyprus?` rendering `MOVING_GROUPS` with the same card markup. Extract the card into a `SituationCard` function in the same file so both grids share it.

- [ ] **Step 4: Verify every link resolves**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
node -e "
const fs=require('fs');
const src=fs.readFileSync('components/HomeHub.tsx','utf8');
const hrefs=[...src.matchAll(/href: \"(\/[^\"]+)\"/g)].map(m=>m[1]).filter(h=>/^\/(guides|sections|developers|tools)\//.test(h));
const miss=[...new Set(hrefs)].filter(h=>!fs.existsSync('.next/server/app'+h.replace(/\/$/,'')+'.html'));
console.log('checked',new Set(hrefs).size,'missing',miss);
"
```
Expected: `missing []`. Fix any wrong slug before continuing. (The `/developers/` index may be `developers.html`; confirm the check treats it correctly.)

- [ ] **Step 5: Commit**

```bash
git add components/HomeHub.tsx && git commit -m "feat(home): living-in-Cyprus situation groups, moving groups kept below"
```

---

### Task 5: Navigation and the Moving to Cyprus hub

**Files:**
- Create: `app/moving-to-cyprus/page.tsx`
- Modify: `components/PrimaryNav.tsx` (`DRAWER_LINKS`)
- Modify: `lib/nav-links.ts` (`PRIMARY_NAV`)
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `GUIDES` from `lib/guides` (fields `slug`, `title`, `description`, `category`).
- Produces: route `/moving-to-cyprus/`.

- [ ] **Step 1: Create the hub page**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

const CATEGORIES = ["immigration", "tax", "property", "business"] as const;

export const metadata: Metadata = {
	title: "Moving to Cyprus: Visas, Tax and Property Guides",
	description:
		"Guides for planning a move to Cyprus: visas and residency, tax, buying property and setting up a business.",
	alternates: { canonical: "/moving-to-cyprus/" },
};

export default function MovingToCyprusPage() {
	return (
		<main className="max-w-5xl mx-auto px-6 py-12">
			<h1 className="text-3xl md:text-4xl font-bold">Moving to Cyprus</h1>
			<p className="mt-3 text-slate-700 max-w-2xl">
				Planning a move? Start with residency and tax, then property and
				business. Already here? See the everyday guides on the homepage.
			</p>
			{CATEGORIES.map((cat) => {
				const guides = GUIDES.filter((g) => g.category === cat);
				if (guides.length === 0) return null;
				return (
					<section key={cat} className="mt-10">
						<h2 className="text-xl font-semibold capitalize">{cat}</h2>
						<ul className="mt-3 grid md:grid-cols-2 gap-x-8 gap-y-2">
							{guides.map((g) => (
								<li key={g.slug}>
									<Link
										href={`/guides/${g.slug}/`}
										className="text-[#0f6d67] hover:underline"
									>
										{g.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				);
			})}
		</main>
	);
}
```
Confirm the `GuideCategory` type includes these four values (`grep -n "GuideCategory" lib/guides.ts`); if not, use the real values. The page should also render inside the site shell the other pages use (check how `app/about/page.tsx` wraps its content and match it).

- [ ] **Step 2: Add the link.** Append `{ label: "Moving to Cyprus", href: "/moving-to-cyprus/" }` to `DRAWER_LINKS` in `PrimaryNav.tsx` and to `PRIMARY_NAV` in `lib/nav-links.ts`.

- [ ] **Step 3: Sitemap.** Open `app/sitemap.ts`, follow its existing pattern for static pages, and add `/moving-to-cyprus/`.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
ls .next/server/app/moving-to-cyprus.html
grep -rl "moving-to-cyprus" .next/server/app/sitemap* | head -2
```
Expected: the page file exists and the sitemap output contains the URL. Then run `npm run dev`, load `/` at 390px width, open the drawer, confirm the new link is visible and reachable by keyboard, and Escape closes it.

- [ ] **Step 5: Commit**

```bash
git add app/moving-to-cyprus components/PrimaryNav.tsx lib/nav-links.ts app/sitemap.ts
git commit -m "feat(nav): add Moving to Cyprus hub and nav link"
```

---

### Task 6: Guides index, About page and llms.txt

**Files:**
- Modify: `app/guides/page.tsx`, `app/about/page.tsx`, `public/llms.txt`

- [ ] **Step 1: Guides index.** `title` becomes `"Cyprus Guides for Residents and Newcomers | RealCy.app"`. `description` becomes `"Practical Cyprus guides: healthcare, transport, food, everyday admin, plus visas, tax, property and business setup for people planning a move."` Keep the canonical unchanged.
- [ ] **Step 2: About.** Keep the H1. Replace the intro paragraph with: `RealCy.app makes everyday life in Cyprus easier to find, compare and plan. We started with new-build real estate and grew into practical guides for people who already live here and for those planning the move.` In "What you can do today", replace the phrase about step-by-step relocation guides with `practical guides on healthcare, transport, residency, taxes and cost of living`.
- [ ] **Step 3: llms.txt.** Rewrite the first summary line to describe a guide to living in Cyprus (residents first, relocation second). Rename each heading beginning `## Relocation Guides` to `## Guides`, keeping the category text that follows. Update the pharmacy and car rental entries to the new titles.
- [ ] **Step 4: Verify**

```bash
git diff -U0 | grep '^+' | grep -cP "\x{2014}"
grep -c "^## Relocation Guides" public/llms.txt
```
Expected: `0` and `0`.

- [ ] **Step 5: Commit**

```bash
git add app/guides/page.tsx app/about/page.tsx public/llms.txt
git commit -m "seo: reposition guides index, about page and llms.txt"
```

---

### Task 7: Final checks, PR and deploy

- [ ] **Step 1: Full verification**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -5 && npm run build 2>&1 | tail -5
git diff origin/main..HEAD | grep '^+' | grep -cP "\x{2014}"
git diff origin/main..HEAD | grep '^+' | grep -ci "nicosia"
```
Expected: build passes, lint shows no new errors versus the Task 1 baseline, both counts `0`.

- [ ] **Step 2: Open the PR** with the before and after "relocation" counts from Task 1 and screenshots of the homepage at desktop and 390px width.
- [ ] **Step 3: After merge**, poll production until the homepage `<title>` shows the new text, then check that `/`, `/moving-to-cyprus/` and `/guides/` return 200.
- [ ] **Step 4: Measurement plan** (Search Console, same 3-month view)

| When | Check | Success looks like |
|---|---|---|
| Week 2 | Homepage and `/guides/` impressions and position | No drop beyond normal daily variation |
| Week 4 | Ferry, pharmacy and car rental guide CTR (the earlier changes) | Higher than 0.75%, 1.6% and 3.0% |
| Week 8 | Clicks from Cyprus and overall CTR, excluding the develta pages | Growth in resident-type queries; no loss on "moving to" queries that already get clicks |

- [ ] **Step 5: Rollback.** If homepage or `/guides/` impressions fall sharply for more than two weeks, revert the PR. All changes are copy plus one new page, so a revert restores the previous state.

## Open decisions for the owner

1. Nav: this plan adds "Moving to Cyprus" to the drawer only. Promoting "Guides" into the header bar would replace a map category (Food, Shopping or Healthcare) and needs a decision.
2. The repo and folder name `relocation-to-cyprus` stay as they are; only public copy changes.
3. The "Get the free Cyprus Relocation Checklist" footer lead magnet stays as a mover-focused offer. Say if you want a resident-focused second magnet.
4. The main checkout has uncommitted edits to `app/about/page.tsx`, `app/guides/page.tsx`, `app/guides/GuidesClient.tsx` and other files this plan also touches. Those edits are not in the worktree, so decide whether to commit or discard them before this branch merges, or expect conflicts.
