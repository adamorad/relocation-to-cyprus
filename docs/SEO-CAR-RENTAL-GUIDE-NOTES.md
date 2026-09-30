# SEO notes: /guides/long-term-car-rental-cyprus/

Branch: `feat/seo-car-rental-guide`. Goal: move from positions 9 to 12 into the top 5 for "long term car rental cyprus", "monthly car rental cyprus", "long term car hire cyprus" and the Limassol/Larnaca/Paphos variants (Search Console, 3 months: 174 clicks, 5,835 impressions, 3% CTR).

## What changed

Title and description (`lib/guides.ts`)
- Title: "Long-Term Car Rental Cyprus 2026: Monthly Hire Rates" (adds the "hire" wording; renders as "... · RealCy.app").
- Description rewritten to about 155 characters, leading with the head query, covering "monthly car hire", the rate range, the three cities and rent vs buy. The old one was over 250 characters and would be truncated in results.
- `dateModified` set to 2026-09-30.

Guide body
- First section renamed "Monthly car rental vs daily hire: they are different products" and opens with a definition sentence using "long-term car rental", "monthly car rental" and "long-term car hire".
- New sections: "Cheapest long-term car rental in Cyprus: how to lower the monthly rate", "Long-term car rental in Limassol", "... in Larnaca", "... in Paphos", "Long-term car leasing vs monthly rental". All figures reuse numbers already in the guide; no new prices or company names were added.
- Three new FAQs (city availability, cheapest, hire vs leasing). They feed the FAQPage JSON-LD.
- New sections link out to getting-around-cyprus-no-car, airport-transfers-guide, best-areas-to-live-cyprus, car-import-registration and driving-licence-conversion.

Internal links added to this guide (natural anchor text)
- cost-of-living (transport section), arrival-checklist (week 3-4), driving-licence-conversion, car-import-registration, road-safety-driving, moving-to-cyprus-from-uk, airport-transfers-guide, getting-around-cyprus-no-car (three places, one replacing a bare slug mention).
- Already linked from the public-transport directory via `lib/section-related-guides.ts`; unchanged.

Renderer (`app/guides/[slug]/page.tsx`)
- `renderBody` now supports `[anchor text](/guides/slug/)` in guide bodies, in addition to bare `/guides/slug/` paths (which render the path itself as the link text). Only internal /guides, /tools and /sections paths are matched. Existing bodies are unaffected.

Not changed: `docs/CONTENT-INVENTORY.md` is auto-generated (`scripts/gen-content-inventory.mjs`); re-run it to refresh the title/description row. No Nicosia additions to any map, filter or navigation.

## Owner must fact-check

New content
1. Limassol has no airport; taxi times of about 55-70 min from Larnaca and 45-55 min from Paphos (taken from the airport-transfers guide).
2. Larnaca section: "international chains are present at the airport" and "airport desks do not always match late flight arrivals" (general statements, verify with providers).
3. Paphos section: claim that some providers allow one-way returns between cities, sometimes for a fee. Well established in the industry but not confirmed for Cyprus operators.
4. Leasing section: that operational leasing suits stays of a year or more and carries early-termination charges. Confirm with a leasing company.
5. Cheapest section restates existing rate ranges (15-25% for longer contracts, 15-30% for local operators, 230-380 EUR for older compacts). These are unsourced in the original guide.

Pre-existing claims in the guide that were left as they were but should be verified before pushing for rankings
- Provider names: Auto Union, Christodoulou Rentals, Astra Car Rental, "Thrifty Cyprus", Intercar, Autohellas, and "Sunseeker (managed rental vehicles via their property business)", which looks doubtful.
- Per-city operator locations (Auto Union in Limassol, Astra in Limassol and Larnaca).
- All monthly rate bands, excess amounts (500-2,000 EUR), 2,000 km allowance and 0.08-0.15 EUR/km excess charge, 1,500-3,000 EUR card limit, VAT 19%.
- The description previously said "350-900 EUR/month" while the body says 300-950; the new description uses 300-950 to match the body.

## Suggested next steps (not done)
- Add a real quote or price date stamp once the owner has verified rates; fresh, dated pricing is the strongest ranking signal available for this query.
- Re-check Search Console after 4-6 weeks for the city queries; consider a dedicated page only if those queries plateau.
