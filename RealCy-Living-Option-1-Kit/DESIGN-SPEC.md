# Design contract
## Authority and direction
Approved desktop Option 1 is authoritative. Mobile companion is a derived reference; written mobile spacing wins over image artifacts. Product premise: Everyday life in Cyprus, made easier. Not a holiday booking site or relocation/property funnel. Keep the friendly lived-in illustrated hero: groceries, pharmacy, dog, cafe and neighborhood. No suitcases.

## Order and desktop geometry
Content maximum 1280px, centered. Header ~72px with brand, Daily life / Places / Guides / Tools and existing saved/auth controls. Hero total ~380-440px including header, full-width pale cyan scenic background. Left55% copy and search; detailed artwork right. H1 max760px; avoid image/text collision. Topics immediately below with 24-32px top space: six equal cards, 12px gaps. Main section: guide content ~70%, local area ~30%,24px gap. Three guides across, local area has city selector and2x2 cards. Bottom fullwidth rounded pale-blue tools strip. Preserve existing footer below the preview's fold; do not treat screenshot height as page height.

## Typography
Rounded sans; suggested Manrope (not an exact identified font), existing compatible font acceptable. No font binaries included; use a licensed self-hosted distribution. Navy #0B2145, muted #506580. H1 desktop56-68px/1.05 weight800, mobile34-40px/1.12. H2 28-32px/1.15 weight750+. Body >=16px/1.5; mobile avoid small card descriptions. UI labels16px weight600. Space heading/description12px; section spacing32px mobile,40px desktop. Never fix text heights or truncate essential titles.

## Surfaces and palette
White and pale sky #E8F8FF, stronger panel #D8F3FC. Primary #087F98 with white text, hover #066D83. The button shade is intentionally darker than the earlier proposed bright teal to support contrast. Border #D9E5EF, navy ink #0B2145. Corners: cards16px, panels24px, inputs12px. Very subtle shadows. Warm colors only in illustration. No decorative arrows, generic floating blobs, serif headings or heavy gradients.

## Mobile
20px gutters, 16px only below360px. Copy in normal document flow, not placed over detailed artwork. Hero image180-220px tall below copy; focus on right-hand neighborhood. Search full width with visible label (may be visually hidden if equivalent accessible label is supplied), field and button each>=48px. Topic grid2 columns with enough height for natural label wraps; fall back to1 at narrow widths. Three guides as stacked horizontal image/text rows, then local area, tools, footer. All6 categories and4 cities remain accessible. Header shows logo and menu, with existing account/saved links inside menu. No sticky elements covering content.

## Interactions
Search submits meaningful existing search; no placeholder alert. Search by published guides/places/tools and handle no-results/loading/error. Whole cards are links with no nested buttons. City selector navigates or filters in accordance with current site; card links are independent. Tool destinations must exist. Mobile menu supports Escape and returns focus. Decorative illustrations alt=""; informative city photos receive accurate alt text. Focus rings always visible. Body contrast>=4.5:1, large text>=3:1, target sizes>=44px. Respect prefers-reduced-motion. Reserve image aspect ratios and lazy load below-fold assets.

## Existing content
Discover actual routes/content from repository, not historical guesses. Preserve medical/legal content accuracy and current sources; this kit only supplies short interface copy and example article titles, not substantive advice. Match proposed guide titles to existing articles; adjust minimally when a real title differs. Existing property resources can remain discoverable without controlling the homepage.
