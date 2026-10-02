# Changes

## Unreleased

- Sponsored spots (Phase 5): the three units sold on /advertise/ are now built and placed: Featured at the top of each directory (after the filters), "Sponsored by" under the header of guides and topic hubs. They are configured in `lib/sponsors.ts` (empty, typed by slug, with start and end dates evaluated at build) and render nothing until a sponsor is added; links use rel="sponsored" and fire a `sponsor_click` GA4 event. Directories without a sponsor show a quiet "Want your business featured here?" link to /advertise/. How-to: `docs/sponsors.md`.
- Newsletter removed for good: the email form, EmailBox and the `NEWSLETTER_ENABLED` switch moved to archive/, with their docs.
- Property area (Phase 4a): new /property/ hub collecting new developments (photo preview with city filter), developers, the buying guides, property tools, property lawyers and management, and saved developments. Property items leave the everyday topic hubs (rent vs buy and buying vs renting stay on Home & bills too) and use Home > Property breadcrumbs. One "Property" link replaces New developments and Developers in the More menu, mobile menu and footer. Site-wide and homepage metadata no longer describe the site as new-build real estate, and the homepage listings ItemList is gone. No URL changes.
- Listings: the 33 hidden listings no longer ship in any page, JS chunk or image folder (`lib/data/listings.visible.json`, regenerated with `pnpm data:listings`; hidden image folders moved to archive/). Listing pages link to the developer's page instead of a Google search; prices use one format ("€1,650,000 + VAT", "Price on request"); names are title case everywhere; /listings/ reads ?city= and shows 24 at a time with every listing link in the HTML.
- Merged /sections/public-transport/ into /guides/getting-around-cyprus-no-car/ (the guide URL survives on Search Console data: 4 clicks / 471 impressions vs 0 / 340). The guide gains a "Buses city by city" block (table of operators and airport links, plus a card per city for Limassol, Paphos, Larnaca and Ayia Napa with key routes and tips), rendered by `components/CityBusesBlock.tsx` from `lib/city-buses.ts`; every fare comes from `lib/facts/health-transport.ts`. New sources: Limassol Airport Express and KDP 79/2021 airport taxi fares. The directory URL 308s to the guide (`vercel.json`, both slash forms), is removed from the sections index, topic map, hubs, sitemap, search, llms.txt and the axe page list; its page and data are in `archive/`.
- Fact-check (Phase 3): every high-stakes claim was checked against official sources on 1 and 2 October 2026 and corrected where wrong. Guides show "Last checked" and a Sources list (`components/ui/SourcesNote.tsx`); tools and directories show the same note. Corrected figures live in one place: `lib/facts/tax.ts` (2026 tax reform, SDC, social insurance, GeSY, minimum wage, residence permits, property VAT and transfer fees), `lib/facts/health-transport.ts` (GeSY co-payments, licence exchange, airport taxis and buses, school fees) and `lib/facts/rents.ts` (Bazaraki median asking rents, 1 October 2026, used by the city pages, guides and rent tools).
  - Medical: strong codeine is not sold in Cyprus; oral contraceptives, antibiotic eye drops and antibiotics need a prescription.
  - Immigration now points to the Migration Department (Deputy Ministry of Migration and International Protection); dead CRMD links removed.
  - Calculators fixed: tax-savings (2026 exemptions, social insurance), social insurance (monthly cap), sole-trader vs Ltd (2026 bands, IP Box, self-employed SI and GeSY), relocation cost (transfer fees), rent vs buy (mortgage ends at its term), tax residency (more than 183 days), filing calendar (31 October 2026 deadline).
  - Removed entries that could not be found anywhere: 13 schools, 3 car rental firms, most halal and international grocery listings, Rous, Toni Patisserie, Carrefour mentions; claims that could not be confirmed now point readers to the official office instead of stating a figure.
- Merged and retired pages (Phase 3A, owner-approved). Each retired URL now returns a permanent redirect from `vercel.json` (`permanent: true`, which Vercel serves as 308), for both the `/x/` and `/x` forms. Every internal link was repointed to the survivor, and the retired pages no longer build:
  - /guides/relocation-checklist/ to /guides/arrival-checklist/ (new Before you move, Month 1 and First 90 days sections). The /tools/relocation-checklist/ tracker stays and is retitled "Cyprus Relocation Progress Tracker: 32 Tasks, Plan to Settled".
  - /guides/non-dom-status-guide/ to /guides/taxes-for-expats/ (new "Non-dom status" section and three FAQs).
  - /guides/international-vs-public-school/ to /guides/schools-in-cyprus/ (new "Public or international school?" section). The fees guide and school finder are unchanged.
  - /guides/family-neighborhoods-guide/ to /guides/best-areas-to-live-cyprus/ (a "For families" paragraph in each city block).
  - /guides/environmental-impact-guide/ to /guides/waste-recycling-guide/ (new "Beyond the bins" section).
  - /guides/corporate-bank-account-guide/ to /guides/banking-in-cyprus/ (new "Company accounts" section).
  - /guides/off-plan-buying-guide/ to /guides/new-development-buying-guide/ (five off-plan sections).
  - /sections/registered-address/ to /sections/accountants/ (registered office providers behind a "Registered office" filter).
  - /tools/freelancer-vs-company/ and /tools/ltd-setup-calculator/ to /tools/sole-trader-vs-ltd/ (their two calculators now live in that tool's folder, code unchanged).
  - /tools/gesy-registration/ to /guides/gesy-registration-guide/; /tools/neighborhood-comparison/ to /tools/city-comparison/; /tools/relocation-cost-estimator/ to /tools/relocation-cost-calculator/; /tools/relocation-tracker/ to /tools/relocation-checklist/; /tools/tax-residency-planner/ to /tools/tax-residency-tracker/. These replace the old meta-refresh stub pages.
- Retired guide entries are kept in `archive/lib/guides-retired-phase3.ts`; the stub pages, the registered-address page and its data are in `archive/`.
- Not done (dropped after Search Console review): co-living into long-term rentals, rooftop bars into Where to Eat, community gardens into volunteering, and restaurant reservations into the Cypriot cuisine guide. Those pages are unchanged.
- School finder: removed the "Lycee Francais de Nicosie" entry (a Nicosia school labelled Paphos) and the now-empty French filter.
- Guide prose can link to the Moving to Cyprus hub with `[text](/moving-to-cyprus/)`.
- `pnpm qa:links` now also runs `scripts/qa/check-redirects.mjs`, which fails the build check if any page, the sitemap or llms.txt links to a redirect source, if a retired URL still has a page in out/, or if a redirect target is missing or itself redirected.
- Advertise page reworked around sponsored top spots: top of a directory (Featured, from €80/month), top of a guide (from €200/month) and top of a topic hub (price on request), with a preview of the sponsored unit, labelling rules and booking steps. Newsletter sponsorship removed (there is no newsletter yet). `SponsorSlot` gains a `preview` mode.
- Homepage "Your local area": the city dropdown and Go button are removed; the four city cards below it do the same job.
- Footer redesigned: brand line ("Everyday life in Cyprus, made easier") with the newsletter signup in a card beside it, then Topics, Cities (plus All cities) and Explore columns; About, Advertise, Contact, Privacy and Sitemap move to the bottom row with the copyright. The "Featured developments" listing strip and the guide/directory/tool counts are removed from the footer, and the footer no longer describes the site as new-build real estate. Signup field and button are 44px tall.
- Newsletter sign-up hidden everywhere (footer card, guide and listing EmailBoxes) behind `NEWSLETTER_ENABLED` in `lib/newsletter.ts`. The form never sent addresses anywhere (they stayed in the visitor's own browser) and the promised checklist was never delivered; it returns once it posts to a real email service.
- Saved removed from the header, the mobile menu and /explore/. The /my-shortlist/ page and listing save buttons still work (Saved returns inside the Property area in Phase 4).
- Topics: every guide, directory and tool now belongs to one of eight topics (Health, Getting around, Home & bills, Money & paperwork, Food & shopping, Family & schools, Community & leisure, Moving to Cyprus), defined in `lib/topics.ts` and mapped in `lib/topic-map.ts`. The full mapping, with reasons for the less obvious choices, is in `docs/topics-mapping.md` (generated by `node scripts/gen-topics-mapping.mjs`). `pnpm build` fails if any guide, directory or tool is unmapped.
- New topic hubs at /health/, /getting-around/, /home-and-bills/, /money-and-paperwork/, /food-and-shopping/, /family-and-schools/ and /community-and-leisure/, with a city filter (`?city=`), guides, local directories, tools and links to the four city pages. /moving-to-cyprus/ is now the Moving to Cyprus hub on the same layout (same URL). Hubs are in the sitemap and in search as a new "Topics" group.
- Header: "Topics" menu (the eight hubs), Cities, Guides, Tools, search and More (Local directories, New developments, Developers, About, Advertise). "Daily life" and "Places" are gone. The mobile menu lists the topics at the top.
- Homepage topic cards now show all eight topics and link to their hubs. The footer has Topics, Cities and Site columns; the newsletter and featured developments strip are unchanged.
- Guides, directories and tools show a "More on {topic}" block (same-topic guides, directories and tools plus a link to the hub), replacing the old related blocks. Their breadcrumbs are now Home > {Topic} > {Item}, and the guide label above the title is the topic name.
- /guides/, /sections/ and /tools/ filter by topic (`?topic=`, primary topic only) instead of the old categories. A linked `?topic=` or `?city=` filter (indexes, Where to Eat, Supermarkets & Markets) is applied before the first paint, so the page no longer jumps after loading. A `?topic=` with nothing on that index, or an unknown topic, shows a short note and a link to everything instead of the full list.
- The retired guide, directory and tool category lists and the unused tool tags were removed. The `category` fields that authors, embeds, tool structured data and the content inventory script still read stay in the data.
- The five de-listed directories (co-living, community gardens, EV charging, registered address, rooftop bars) have a topic for their own breadcrumb but stay out of hubs, indexes and the sitemap.
- /explore/ now browses by topic below the search: each topic links to its hub and lists its directories, built from `lib/topics.ts` and the topic map. The old category list (with links to de-listed directories and "All Relocation Guides" labels) moved to `archive/app/explore/categories.ts`.
- City pages are now "Living in {City}" daily-life guides (Limassol, Paphos, Larnaca, Ayia Napa): areas, getting around, healthcare, schools and childcare, beaches and things to do, a monthly costs table, FAQs, practical notes and "Explore {City} by topic" cards that open each topic hub filtered to the city. Buyer content is kept in the data (`property` in `lib/regions.ts`) but not shown until the Property area exists. Only existing facts were used.
- New directories: Where to Eat in Cyprus (/sections/food/, 40 places) and Supermarkets, Markets & Malls in Cyprus (/sections/shopping/, 22 places), both under Food & shopping, with a linkable `?city=` filter. They are in the directories index, the Food & shopping hub, the sitemap and search.
- Images: a 16:9 hero for each city page (also its share image), photo city cards on the homepage, a painted illustration for each of the eight topics (hub headers and homepage topic cards) and a hero for three guides (getting around without a car, pharmacies and medication, utilities setup), all WebP at 800 and 1600 px. The homepage guide cards show those three guide images.
- Topic hubs, /moving-to-cyprus/, Where to Eat and Supermarkets, Markets & Malls now have a share image (the topic illustration) and the site name in their Open Graph tags.
- Link prefetching no longer downloads hub illustrations and city or guide heroes on the page that links to them (about 1 MB on pages with the footer). The footer Sitemap link is a plain link.
- CI also checks that `docs/topics-mapping.md` matches the topic map (`pnpm qa:topics`).

- New site header: logo, primary links and Saved, a desktop "More" menu and an accessible mobile menu. There is no sign-in because the site has no accounts.
- Manrope is now the site-wide font. The legacy Lora and DM Sans CSS variables are remapped to it.
- New "Living in Cyprus" homepage: hero search that goes to /explore/, topic cards, guide cards, a "Your local area" panel for Limassol, Paphos, Larnaca and Ayia Napa, and a tools strip.
- The old homepage map moved to `archive/homepage-map/`. `MapNavProvider` and the Google Maps preconnects were removed from the layout. See `docs/homepage-map-archive.md`.
- Nicosia was removed from the nav, footer and the /regions/ list. The 33 Nicosia new-build listings and the 9 developers that had only Nicosia listings are hidden from every page and the sitemap. The data stays in `lib/data/listings.json`.
- /regions/nicosia/ is now a redirect to /regions/ (noindex).
- About 127 Nicosia directory entries and Nicosia city blocks, filter chips and table rows were removed from the sections, tools (city comparison, events calendar, ISP comparison, price benchmarker) and guides. Four Nicosia-located events were removed from the events calendar.
- Nicosia is kept only where it names a hospital, government office, embassy, university or district fact. Schools in Nicosia were removed from the guides.
- The listing save heart moved from the archived map panel to the listing detail page. The "Back to the map" links are now "Back to home", and the shortlist empty state and city-comparison link point to /listings/.
- Listing and developer names that were stored in ALL CAPS are now shown in title case (for example "Lemonmaria Developers"). Known acronyms such as HKCY, MAWJ, CHYC and GPA, initials and names with numbers keep their capitals.
- Listing prices now show as `€1,650,000 + VAT` instead of `€1.650.000 +VAT`. The data files are unchanged.
- Hub titles were renamed to "Cities", "Practical tools" and "Local directories".
- Quality gates run on every pull request (`.github/workflows/ci.yml`): type check, build, an internal link check over `out/`, a house-rules scan and an axe accessibility run on a sample of 22 pages at 390 and 1440 px. See `docs/qa.md`.
- The house-rules scan (em dash, emoji, Nicosia, "Relocation guide", hard-coded hex colours in classes) compares against a committed baseline, so only new violations fail. Existing violations are counted per rule in `scripts/qa/house-rules.baseline.json` for later clean-up.
- Site search now uses a Pagefind index built from the exported site (`pnpm build` runs `pagefind --site out`). /explore/ became the search results page with results grouped and filterable by type (guides, directories, tools, cities, listings, developers), and still accepts `?q=`.
- The header has a search icon link to /explore/ and the mobile menu has a search box. Navigation padding was tightened slightly between 768 and 1023 px to make room.
- Five tool pages were missing the `id="main"` target for the skip link; they now have it.

- Interior pages are restyled to the Living in Cyprus look: sections, tools, guides, listings, regions, developers, about, contact, privacy, advertise, explore, shortlist and the hub pages, including the shared components they use.
- Guide articles have their own typography (`.guide-body`), scoped to the prose so embedded calculators keep their own styles.
- Decorative arrows were removed from links and buttons.
- Chart colours are standardised across the tools, and the rental price trends chart now uses distinct colours for each city.
- The weather chart keeps a 700 unit minimum width so its labels stay at least 12px on phones, and its tooltip follows the scrolled chart.
- /explore/ search now matches word stems and prefixes, so "pharmacy" finds the pharmacy guide and "movi" finds "Moving".
- An accessibility pass took automated colour-contrast violations from 1484 to 0 across 31 pages.

- Phase 1 design system: shared components in `components/ui/` (Container, PageHeader, Breadcrumbs, Section, Card with icon, text, photo, row and logo options, Badge, Chip and ChipGroup, Button and ButtonLink, Callout, DataTable, StatCard, InfoCards, EmailBox, SponsorSlot) and page templates in `components/templates/` (Hub, Article, Directory, Tool and City). See `docs/design-system.md`.
- Every page family now uses the templates: guides, directories, tools, cities, listings, developers, hubs, About, Advertise, Contact, Privacy, search, the shortlist and the 404 page.
- Pages use only two widths: reading (about 720px) and wide (1280px, aligned with the header, homepage and footer).
- There is one breadcrumb style (Home › Section › Page) with matching BreadcrumbList data, and the scattered "Back to" links are gone.
- Each page has at most one email form. Guides rely on the footer form instead of an in-article one.
- /listings/ has a city filter that can be linked with `?city=` and a "Show more" button. City pages link to their filtered list.
- Listing pages link to the developer's page, and the save heart sits next to the listing title. The developers index shows each developer's logo.
- The About page was rewritten to describe only what the site offers today.
- The Advertise page counts guides, tools and directories from the site data, so they always match.
- Page titles no longer repeat the RealCy.app brand.
- Guides show their category as the label above the title instead of "Relocation guide".
- Filter chips, buttons, cards and comparison highlights use one style across the site, with no traffic-light colours for neutral comparisons.
- /tools/sole-trader-vs-ltd/ has one header, one disclaimer and one set of next steps for both of its tools.
- `node scripts/qa/axe.mjs --all` runs a full-site accessibility audit plus overflow and page-structure checks (not part of CI).

### Known gaps and follow-ups

- Only three guides have a hero image; the other guides and the directory pages have none yet.
- Topic illustrations are transparent WebP; some platforms show a transparent share image on a dark background.
- Many existing guide and tool descriptions still contain em dashes, and hubs now surface them widely (Phase 3 content pass).
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
