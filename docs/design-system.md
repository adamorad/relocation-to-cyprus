# Design system

Every page on RealCy.app is built from the shared components in `components/ui/` and one of the page templates in `components/templates/`. The homepage (`components/home/*`) is the visual reference: white cards with a 16px radius and a 1px `border-line`, icon tiles on sky backgrounds, navy (`text-ink`) headings, primary `#087f98` buttons with white text, sky panels and the Manrope font.

A live showcase of every component and template is at `/design-system/` (noindex, not in the sitemap or search). Check it after changing a component.

## Building a new page

1. Pick the template that matches the page type (see below). The template renders the page's only `<main id="main">`, the PageHeader and the width.
2. Keep `page.tsx` a server component: metadata, JSON-LD and the template call live there. Put only the interactive part (filters, calculator state) in a `client.tsx`.
3. Pass `header={{ breadcrumbs, eyebrow, title, intro }}`. Breadcrumbs always start with `{ label: "Home", href: "/" }`, then the hub, then the page (no href on the last item). The component also emits the BreadcrumbList JSON-LD, so never hand-write one.
4. Build the body from `Section`, `Card`/`CardGrid`, `DataTable`, `StatCard`, `Callout` and `ButtonLink`. Do not add page-specific colours, widths or chip and button styles.
5. Set the title without the brand: the layout template appends " · RealCy.app". Pages that must show a different OG title use `title: { absolute }`.
6. Run the gates (`docs/qa.md`): `pnpm build`, `pnpm qa:links`, `pnpm qa:rules`, `pnpm qa:axe`, and `node scripts/qa/axe.mjs --all` after layout changes.

## Templates (`components/templates/`)

| Template | Use for | Width | Notes |
| --- | --- | --- | --- |
| `HubTemplate` | Index pages (guides, tools, directories, cities, listings, developers) | wide | Band header, optional `sponsor` (paid unit, topic hubs and /property/), optional `filters` (ChipGroup), card grid as children. |
| `ArticleTemplate` | Guides, long text pages | reading body | Optional `toc` (right rail on wide screens, block on mobile), `related`, `legal`, `share`, `sponsor` (paid unit under the header). |
| `DirectoryTemplate` | Directories under /sections/ | wide | Filters first (client component), entries as text Cards, `info` tips as collapsible cards, `notice` Callout, `related`. Required `slug` (or `null` in demos) picks the Featured sponsor, which the client renders with `<DirectoryFeatured />` after its filters; unsold directories end with a quiet Advertise line. |
| `ToolTemplate` | Calculators, checklists, comparisons | reading (calculators) or wide (tables, two-column tools) | Inputs in `ToolPanel`, results as StatCard/DataTable, `nextSteps` buttons, `disclaimer` (legal Callout). One disclaimer and one next-steps block per page. |
| `TopicHub` | Topic hubs (/{topic}/ and /moving-to-cyprus/) | wide | Server component on HubTemplate: band header (Home > Topic, eyebrow "Topic", H1 topic name), city ChipGroup (`?city=`), Sections "Guides", "Local directories", "Tools", then "Explore by city". Items come from `itemsForTopic()`; Pagefind type `topic`. |
| `CityTemplate` | /regions/{city}/ | wide | Band header, `contents` nav, Sections, a `cta` linking to `/listings/?city={slug}`. |

`MoreOnTopic` (`components/templates/MoreOnTopic.tsx`) is the cross-link block for every guide, directory and tool: pass it as the template's `related`, e.g. `related={<MoreOnTopic type="guide" slug={g.slug} />}`. It shows up to six listed items with the same primary topic (same city first, the item itself and any `exclude` hrefs left out) and a "Browse {Topic}" link to the hub. Tools pass their Next steps hrefs as `exclude`. Do not add other related blocks next to it.

## Topics

Topics are defined in `lib/topics.ts` and every guide, directory and tool is mapped in `lib/topic-map.ts` (one primary topic, up to two secondary topics, specific cities). Item pages build their middle breadcrumb with `topicCrumb(type, slug)` (Home > {Topic} > {Item}). Hubs list primary items first, then items with the topic as a secondary topic. Index pages (/guides/, /sections/, /tools/) filter with `TopicIndexClient` (`?topic=`). URL filters follow the static-export pattern: the server renders every item, the client reads `window.location.search` after hydration and writes changes back with `history.replaceState`. When adding a guide, directory or tool, add its mapping and run `node scripts/gen-topics-mapping.mjs`; the build fails otherwise.

`TemplateMain` is the shared `<main>` wrapper (`pagefindType` adds the Pagefind body and type filter; types: guide, directory, tool, city, topic, listing, developer, page). Redirect stubs, the homepage and the `/design-system/` page are the only pages that do not use PageHeader.

## Components (`components/ui/`)

- `Container`: `width="reading"` (max-w-3xl) or `"wide"` (1280px), padding `px-5 md:px-8`. These are the only two page widths; never add a page-level `max-w-*` wrapper.
- `PageHeader`: breadcrumbs, eyebrow (small uppercase primary label), H1, intro, `meta` line, `actions` (button row under the intro) and `titleAction` (a compact control such as the save heart, beside the H1 on every width). `variant="band"` gives the full-width sky background used on hubs.
- `Breadcrumbs`: `›` separator, last item `aria-current="page"`, absolute https://realcy.app URLs in the JSON-LD. `components/Breadcrumbs.tsx` re-exports it for old imports.
- `Section`: H2, optional description and action, consistent spacing and anchor offset.
- `Card` with `CardGrid`/`CardGridItem`: variants `icon`, `text`, `photo` (16:9 lazy image) and `row`. Optional `logo` (`{ src, alt, initial }`) shows a 48px logo tile, with the initial as fallback; `LogoTile` is exported for logos outside cards. With `href` the whole card is one link; without it, it is an `<article>` and may have a `footer` with contact links. Never nest links or buttons in a linked card.
- `Badge`: neutral by default; `success`, `warning` and `danger` only for real states (open/closed, deadlines).
- `Chip` and `ChipGroup`: the one filter-chip style (selected `bg-primary text-white`, unselected white with `border-line`), 44px tall, `aria-pressed`, labelled group. Use `Chip` directly for multi-select.
- `Button` and `ButtonLink`: `primary`, `secondary`, `ghost`; sizes `md` and `lg`; `fullWidth`. External links open in a new tab.
- `Callout`: `info`, `warning`, `legal` (disclaimers).
- `DataTable` and `StatCard`: tables sit in a focusable, labelled scroll region so phones never scroll the page sideways.
- `InfoCards`: collapsible `<details>` cards for tips and FAQs.
- `SponsorSlot`: the paid unit sold on /advertise/ (Featured or Sponsored by). Renders nothing without data; live units link with `rel="sponsored noopener noreferrer"` and fire `sponsor_click`; `preview` is the non-link mock-up. Data and scheduling: `lib/sponsors.ts`, `docs/sponsors.md`.
- Icons come from `components/icons/Icon.tsx`.

## Rules

- Two widths only (`Container`), one breadcrumb style, one `<main id="main">` and one H1 per page, headings in order.
- Colours come from the theme tokens and `lib/chart-colors.ts` for charts. No traffic-light red, amber or green for neutral comparisons; highlight a best value with `bg-sky-strong text-ink`. Semantic colours are for real good or bad states (deadlines, completed checklist items, warnings, form errors).
- 44px minimum touch targets, visible focus, AA contrast.
- No em dashes or emojis in new copy, no "Relocation guide" label, never add Nicosia, and no URL or slug changes. `pnpm qa:rules` enforces the text rules against a baseline.
