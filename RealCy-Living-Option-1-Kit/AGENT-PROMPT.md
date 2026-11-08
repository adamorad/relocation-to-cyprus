# Redesign RealCy around Living in Cyprus
Implement the supplied approved Option 1 in the existing site. This request authorizes code changes, not deployment.

First inspect repository instructions, framework, router, existing content/API/CMS, authentication, search, saved items, tools and tests. Do not switch frameworks. Read START-HERE.md, DESIGN-SPEC.md, ASSET-MAP.md and QA-CHECKLIST.md. Open references/approved-desktop.png and references/mobile-companion.png visually. Use styles/ and content/ as integration inputs.

Product goal: useful everyday information for people living in Cyprus, including current residents and newcomers. Prioritize healthcare, transport, home/bills, paperwork, shopping and community. Preserve existing property/relocation resources through appropriate navigation, but remove their dominance from the homepage. Do not delete working routes or data.

Implement reusable header, illustrated hero and search, six topic cards, three useful-guide cards, local-area panel, tools strip and existing footer. Match the approved screenshot's blue illustrated identity, rounded navy sans typography, white cards and spacing. No beige/serif redesign. All content, controls and cards must be semantic HTML; never use the full screenshot as the webpage.

Use the supplied text-free hero asset. Keep text and search outside image pixels. Use the supplied brand consistently or retain the existing production logo if exact approved branding already exists. Use the included line SVGs as accessible functional fallbacks; do not claim they reproduce the painted category art. Reuse real licensed site/CMS photography for guides and city cards. Never crop mockup UI or publish generated landmarks as verified geography.

Map navigation, topic cards, guide cards, city selector and tools to real existing routes/content. Fill content/route-map.template.json with actual paths. Null fields are intentional and MUST NOT ship as dead links, hash anchors or invented endpoints. Implement search over available published content using the existing service. Preserve URLs, SEO, analytics and existing auth/save behavior. If auth/save does not exist, omit those affordances instead of inventing fake functionality. Report missing routes/content; do not fabricate guide bodies or medical/legal advice.

Mobile-first: 20px gutters, >=16px body, 1.5 line-height, >=44px targets. Headline 34-40px, no forced desktop breaks. Hero illustration under copy, compact height; search full width. Topics 2 columns at >=360px, 1 at narrower widths if required; guide cards become readable horizontal rows, then area panel, then tools stacked. At desktop: six topics across, guides plus area at roughly 70/30, tools horizontal. Use CSS intrinsic sizing, not screenshot coordinates.

Verify at360/390/430/768/1024/1440px, compare screenshots, correct wrapping and illustration crops. Check focus, keyboard menu handling, labels, search results/empty/error/loading states, contrast, real routes and reduced motion. Run the relevant existing lint/type/build tests. Deliver a concise summary, test results and remaining gaps. Do not publish without a separate request.
