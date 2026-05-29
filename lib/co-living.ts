/**
 * Co-living and serviced apartment listings for Cyprus.
 * Covers coliving spaces and month-to-month serviced apartments suitable
 * for relocators, digital nomads, and professionals on extended stays.
 *
 * Prices and availability change; verify directly with each operator.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type CoLiving = {
  name: string;
  city: City;
  neighbourhood?: string;
  monthlyFrom: number;
  monthlyTo: number;
  /** What is included in the monthly price */
  includes: string[];
  why: string;
  website?: string;
};

export type CoLivingTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Co-living tips
// ---------------------------------------------------------------------------

export const CO_LIVING_TIPS: ReadonlyArray<CoLivingTip> = [
  {
    heading: "Co-living vs renting: flexibility is the main trade-off",
    body: "Co-living and serviced apartments cost 30–70% more per month than an equivalent unfurnished rental, but include utilities, WiFi, cleaning, and no long lease commitment. For the first 1–3 months while you orient yourself, the premium is usually worth it — you avoid deposit losses, utility setup headaches, and being locked into an area you have not tested.",
  },
  {
    heading: "Month-to-month means true flexibility — check the notice period",
    body: "Not all 'month-to-month' contracts are equal. Some operators require 30 days' notice, others 60. Ask specifically: 'If I leave in week 3 of month 2, what do I owe?' A well-run coliving operator will answer clearly; a vague answer is a red flag. Also confirm whether the monthly price changes if you extend beyond an initial booking.",
  },
  {
    heading: "Community quality varies enormously by operator",
    body: "The best coliving spaces in Cyprus run weekly events, have curated resident intros, and foster genuine connections between digital nomads, founders, and professionals. The worst are simply serviced apartments rebranded as coliving. When checking in, ask: 'What happened in the community last month?' If the answer is vague, it is closer to an aparthotel.",
  },
];

// ---------------------------------------------------------------------------
// Co-living listings (8–10 entries across all cities)
// ---------------------------------------------------------------------------

export const CO_LIVING_LISTINGS: ReadonlyArray<CoLiving> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Limassol Digital Nomad Hub",
    city: "Limassol",
    neighbourhood: "City centre / Old Town",
    monthlyFrom: 1200,
    monthlyTo: 1800,
    includes: ["WiFi (500 Mbps)", "utilities", "weekly cleaning", "coworking access", "community events"],
    why: "Limassol's most established coliving address for remote workers and founders. Private rooms and shared common areas in a converted building steps from the Old Town restaurants. Regular community dinners and networking evenings.",
    website: "https://www.bazaraki.com/real-estate/limassol/",
  },
  {
    name: "Limassol Serviced Apartments by Metropark",
    city: "Limassol",
    neighbourhood: "City centre",
    monthlyFrom: 1400,
    monthlyTo: 2200,
    includes: ["WiFi", "utilities", "weekly linen change", "parking", "gym"],
    why: "The Metropark Hotel Apartments building operates a serviced apartment arm for monthly stays. Full kitchen, parking, and a prime central location. One of the most reliable month-to-month options in Limassol with an established corporate track record.",
    website: "https://www.booking.com/hotel/cy/metropark-hotel-apartments.html",
  },
  {
    name: "Apostolos Andreas Coliving Limassol",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    monthlyFrom: 1100,
    monthlyTo: 1600,
    includes: ["WiFi", "electricity & water", "weekly cleaning", "pool access", "communal kitchen"],
    why: "Modern coliving complex on the tourist strip with a pool and sea views. Mix of private ensuite rooms and studio apartments. Monthly and quarterly stays. Strong with European digital nomad and startup crowd.",
  },

  // ── Paphos ───────────────────────────────────────────────────────────────
  {
    name: "Paphos Nomad House",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    monthlyFrom: 850,
    monthlyTo: 1400,
    includes: ["WiFi (fibre)", "utilities", "shared kitchen & lounge", "weekly cleaning", "beach access nearby"],
    why: "One of Paphos's few purpose-built coliving operations. Private rooms with ensuite bathrooms in a refurbished villa 10 minutes from the harbour. Known for its laid-back international community and low cost of living in the area.",
    website: "https://www.bazaraki.com/real-estate/paphos/",
  },
  {
    name: "Paphos Serviced Studios by Eurovillage",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    monthlyFrom: 950,
    monthlyTo: 1500,
    includes: ["WiFi", "utilities", "pool access", "kitchenette", "weekly linen"],
    why: "Eurovillage's aparthotel arm operates a set of self-catering studios available on monthly terms. Pool, good WiFi, and 10 minutes to the seafront. Often the first stop for Paphos relocators before they sign a long-term lease.",
    website: "https://www.booking.com/hotel/cy/eurovillage.html",
  },

  // ── Larnaca ──────────────────────────────────────────────────────────────
  {
    name: "Larnaca Beach Coliving",
    city: "Larnaca",
    neighbourhood: "Mackenzie",
    monthlyFrom: 800,
    monthlyTo: 1300,
    includes: ["WiFi", "utilities", "daily breakfast", "communal workspace", "sea-view terrace"],
    why: "Small coliving house on Larnaca's Mackenzie beach strip. Community of digital nomads and long-stay professionals. Walking distance to the best cafes in Larnaca. The most affordable beachside coliving option on the island.",
  },
  {
    name: "Larnaca City Serviced Apartments",
    city: "Larnaca",
    neighbourhood: "Finikoudes promenade",
    monthlyFrom: 900,
    monthlyTo: 1400,
    includes: ["WiFi", "utilities", "weekly cleaning", "fully equipped kitchen", "parking"],
    why: "Modern serviced apartments on the Finikoudes promenade available from one month. Promenade sea views, walking distance to the city's best restaurants, and 15 minutes from the airport. Month-to-month with 30-day notice.",
    website: "https://www.spitogatos.cy/en/rent/apartment/larnaca/",
  },

  // ── Nicosia ──────────────────────────────────────────────────────────────
  {
    name: "Nicosia Professional Coliving",
    city: "Nicosia",
    neighbourhood: "Engomi",
    monthlyFrom: 950,
    monthlyTo: 1500,
    includes: ["WiFi (gigabit)", "utilities", "weekly cleaning", "dedicated desk", "meeting room access"],
    why: "Purpose-built coliving for corporate relocators and professionals in Nicosia's Engomi district. Private rooms with work desks, fast internet, and meeting rooms. Steps from key embassy and business district addresses. Best fit for those with Nicosia work commitments.",
  },
  {
    name: "The Milestone Residences Nicosia",
    city: "Nicosia",
    neighbourhood: "City centre",
    monthlyFrom: 1600,
    monthlyTo: 2500,
    includes: ["WiFi", "utilities", "weekly housekeeping", "concierge", "breakfast available", "gym"],
    why: "The boutique hotel arm of The Milestone Hotel operates extended-stay suites. Fully serviced, heritage building, restaurant on-site. The most premium serviced apartment option in the capital — suited to executives or those needing a Nicosia base during longer relocation processes.",
    website: "https://www.themilestonehotel.com.cy",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Ayia Napa Off-Season Coliving",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town",
    monthlyFrom: 600,
    monthlyTo: 1000,
    includes: ["WiFi", "utilities", "pool access", "shared kitchen", "beach gear storage"],
    why: "Ayia Napa's off-season (October–April) has a growing remote-worker community. A handful of converted villa complexes offer monthly coliving packages at prices that are among the lowest on the island. Perfect for those who want beach life without Limassol prices.",
  },
];
