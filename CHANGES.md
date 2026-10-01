# Changes

## Unreleased

- New site header: logo, Daily life, Places, Guides, Tools and Saved links, a desktop "More" menu and an accessible mobile menu. There is no sign-in because the site has no accounts.
- Manrope is now the site-wide font. The legacy Lora and DM Sans CSS variables are remapped to it.
- New "Living in Cyprus" homepage: hero search that goes to /explore/, six topic cards, guide cards, a "Your local area" panel for Limassol, Paphos, Larnaca and Ayia Napa, and a tools strip.
- The old homepage map moved to `archive/homepage-map/`. `MapNavProvider` and the Google Maps preconnects were removed from the layout. See `docs/homepage-map-archive.md`.
- Nicosia was removed from the nav, footer and the /regions/ list. The 33 Nicosia new-build listings and the 9 developers that had only Nicosia listings are hidden from every page and the sitemap. The data stays in `lib/data/listings.json`.
- /regions/nicosia/ is now a redirect to /regions/ (noindex).
- About 127 Nicosia directory entries and Nicosia city blocks, filter chips and table rows were removed from the sections, tools (city comparison, events calendar, ISP comparison, price benchmarker) and guides. Four Nicosia-located events were removed from the events calendar.
- Nicosia is kept only where it names a hospital, government office, embassy, university or district fact. Schools in Nicosia were removed from the guides.
- The listing save heart moved from the archived map panel to the listing detail page. The "Back to the map" links are now "Back to home", and the shortlist empty state and city-comparison link point to /listings/.

- Interior pages are restyled to the Living in Cyprus look: sections, tools, guides, listings, regions, developers, about, contact, privacy, advertise, explore, shortlist and the hub pages, including the shared components they use.
- Guide articles have their own typography (`.guide-body`), scoped to the prose so embedded calculators keep their own styles.
- Decorative arrows were removed from links and buttons.
- Chart colours are standardised across the tools, and the rental price trends chart now uses distinct colours for each city.
- The weather chart keeps a 700 unit minimum width so its labels stay at least 12px on phones, and its tooltip follows the scrolled chart.
- /explore/ search now matches word stems and prefixes, so "pharmacy" finds the pharmacy guide and "movi" finds "Moving".
- An accessibility pass took automated colour-contrast violations from 1484 to 0 across 31 pages.

### Known gaps and follow-ups

- Painted category and guide illustrations and real city and guide photos are missing. The photo slots are in `lib/home-content.ts`.
- Developer-written descriptions inside `lib/data/listings.json` still mention Nicosia (about 14 listing pages and 3 developer pages).
- The bundled listings data still contains the hidden Nicosia listings. Removing them from the bundle is a follow-up.
- The kit's "Useful contacts" tool does not exist. It is mapped to the emergency contacts guide.
- Unused Google Maps dependencies should be removed: `@googlemaps/markerclusterer`, `@vis.gl/react-google-maps` and `@types/google.maps`.
- A Safari 17+ and iOS smoke test is needed, because the mobile menu uses `inert`.

## 2026-06-10 — 10 new tools (PRs #71–81)

- `school-finder`: International School Finder — filter by city, curriculum, and age group (#71)
- `ltd-setup-calculator`: Cyprus Ltd Setup Cost Calculator — one-time and annual company costs (#72)
- `weather-climate`: Cyprus Weather & Climate — monthly data with SVG chart vs home cities (#73)
- `drivers-licence-exchange`: Driver's Licence Exchange — direct exchange vs test requirements by country (#74)
- `neighbourhood-explorer`: Neighbourhood Explorer — browse areas by vibe, beach, expat density (#75)
- `tax-savings-calculator`: Cyprus Tax Savings Calculator — Non-Dom vs Standard vs home country (#76)
- `pet-import-checklist`: Cyprus Pet Import Checklist — personalised checklist by pet type and origin (#77)
- `relocation-cost-estimator`: Relocation Cost Estimator — itemised one-time move cost with contingency (#78)
- `rental-price-trends`: Cyprus Rental Price Trends — SVG charts 2021–2025 by city and bedroom count (#79)
- `gesy-registration`: GeSY Registration Guide — step-by-step wizard with 2025 contribution calculator (#80)
- All 10 tools wired into tools index, sitemap, and explore search (#81)

## 2026-06-09 — SEO overhaul + audit fixes (PRs #52–58)

### Data & calculation fixes (PR #52)
- `rent-vs-buy-calculator`: removed double-counted purchasePrice in netBuyCost
- `social-insurance-calculator`: self-employed SI rate 15.6% → 16.6% (2025 rate)
- `grants-finder`: marked 6 closed grants; dynamic GRANTS.length count
- `flight-connectivity`: removed Moscow/St. Petersburg; annotated Kyiv as suspended
- `tax-filing-calendar`: fixed getDaysUntil year-rollover; TD6 taxpayer → company
- `events-calendar`: Christmas Markets city fixed; Green Monday month corrected
- `double-tax-treaty-finder`: corrected treaty count to "~57 countries"

### Broken filters & functional bugs (PR #53)
- `wineries/client`: wired "Restaurant on site" filter chip
- `health-insurance-comparison`: coverageType filter now active
- `freelancer-vs-company`: removed dead soleTraderScore variable
- `tax-residency-planner`: clamped sliders to prevent days > 365
- `AppShell`: Schools + Healthcare in DESKTOP_NAV; mobile "More" → /explore/
- `ShoppingPanel`: Ayia Napa tip gated behind city filter
- `RegionListingsPanel`: energy-efficiency filter derived from actual listing data

### Navigation & UX (PR #54)
- `id="main"` added to 4 pages missing it
- Trailing slashes on all explore CATEGORIES hrefs and search result links
- Breadcrumbs fixed in 11 section clients (→ /sections/ not /)
- Tool breadcrumbs fixed in 2 tools missing /tools/ level

### SEO metadata (PR #55)
- explore/page.tsx and guides/page.tsx split into server wrappers + client components
- Both pages export proper title, description, openGraph, canonical metadata

### Polish & dead code (PR #56)
- Deleted dead ageLabel function, unused TypeChip prop, dead vdsl union
- Fixed InterGlobal duplicate URL; stale dev comment removed
- Renamed local ImageGallery → ListingImageStrip in ListingPanel
- Fixed breadcrumb labels and /sections/ back-links in 3 section clients

### Google Maps API key (PR #57)
- Added NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to GitHub Actions CI build env
- Eliminates "For development purposes only" watermark on live map

### SEO structured data & internal linking (PR #58)
- FAQPage JSON-LD added to all 29 section pages
- BreadcrumbList JSON-LD added to all 29 sections, 16 tools, and index pages
- Stale "coming soon" metadata replaced site-wide
- SectionRelatedGuides component: curated 3–4 related guides on every section page
- Guide detail pages: "More guides in this category" cross-link block
- Organization + WebSite SearchAction schema on homepage
- Explore deep-link: ?q= URL param wired up with Suspense boundary
- /explore/ added to sitemap; all tool index hrefs have trailing slashes

## Earlier
- Initial scaffold (2026-05-22).
- Add `public/llms.txt` (2026-05-30).
