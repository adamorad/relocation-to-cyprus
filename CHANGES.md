# Changes

## Unreleased

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
