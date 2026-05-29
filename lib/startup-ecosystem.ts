/**
 * Startup Ecosystem section content.
 *
 * Covers coworking spaces, incubators, accelerators and tech hubs relevant
 * to founders and startup employees relocating to Cyprus.
 *
 * Sources: MIIC (Nicosia), Inspire CoWork (Limassol), IDEA Innovation Centre
 * (Frederick University / Cyprus), startup-related news from Cyprus Mail,
 * In-Business CY, and programme pages. Prices and availability change —
 * verify on the provider's website before quoting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type StartupVenueType =
  | "coworking"
  | "incubator"
  | "accelerator"
  | "tech-hub";

export type StartupVenue = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: StartupVenueType;
  focusAreas: string[];
  /** Monthly hot-desk or membership starting price in EUR, if known. */
  membershipFrom?: number;
  why: string;
  website?: string;
};

export type StartupTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Type metadata
// ---------------------------------------------------------------------------

export const ALL_STARTUP_VENUE_TYPES: ReadonlyArray<StartupVenueType> = [
  "coworking",
  "incubator",
  "accelerator",
  "tech-hub",
];

export const STARTUP_VENUE_TYPE_LABEL: Record<StartupVenueType, string> = {
  coworking: "Coworking",
  incubator: "Incubator",
  accelerator: "Accelerator",
  "tech-hub": "Tech Hub",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const STARTUP_TIPS: ReadonlyArray<StartupTip> = [
  {
    heading: "The MIIC is the anchor of the Nicosia scene",
    body: "The Multimodal Information and Interaction Centre (MIIC) at the University of Cyprus (Nicosia) is the most established public-sector tech hub on the island. It hosts spin-offs, research commercialisation projects, and EU-funded startup programmes. If you are a deep-tech or research-driven founder, start here before anywhere else — they have the densest network into Cyprus's academic and public funding ecosystem.",
  },
  {
    heading: "Inspire CoWork put Limassol on the startup map",
    body: "Inspire CoWork in Limassol is the most active private coworking and innovation community in Cyprus. It runs a regular programme of demo nights, investor meetups and accelerator cohorts, and has become the informal hub for the fintech and crypto founders who moved to Limassol post-2020. Their events are the fastest way to meet the local tech community within a week of arriving.",
  },
  {
    heading: "Cyprus has EU funding advantages few founders exploit",
    body: "As an EU member state, Cyprus companies can apply for Horizon Europe grants, ERDF-funded incubator programmes, and the Cyprus Research and Innovation Foundation (RTDI) funding. The ecosystem is small enough that a well-prepared application from a foreign-born founder stands out. IDEA Innovation Centre (linked to Frederick University in Nicosia) specialises in navigating exactly these routes for early-stage companies.",
  },
];

// ---------------------------------------------------------------------------
// Venues
// ---------------------------------------------------------------------------

export const STARTUP_VENUES: ReadonlyArray<StartupVenue> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Inspire CoWork",
    city: "Limassol",
    neighbourhood: "Limassol city centre",
    type: "coworking",
    focusAreas: ["fintech", "crypto", "SaaS", "general tech"],
    membershipFrom: 150,
    why: "The flagship startup coworking community in Cyprus. Regular demo nights, investor meetups and accelerator cohorts. Home base for a large portion of the fintech and crypto founders who relocated to Limassol post-2020.",
    website: "https://www.inspirecowork.com",
  },
  {
    name: "Limassol Innovation Hub",
    city: "Limassol",
    neighbourhood: "Agios Athanasios",
    type: "tech-hub",
    focusAreas: ["blockchain", "fintech", "gaming"],
    membershipFrom: 200,
    why: "Tech hub serving Limassol's growing blockchain and gaming cluster. Flexible desk and office options, fast fibre, and regular programming for the crypto-adjacent companies that have clustered in east Limassol.",
    website: "https://www.limassolhub.com",
  },
  {
    name: "The Nest Limassol",
    city: "Limassol",
    neighbourhood: "Limassol Marina area",
    type: "coworking",
    focusAreas: ["startups", "freelancers", "digital nomads"],
    membershipFrom: 130,
    why: "Stylish coworking space near the marina. Popular with remote workers and early-stage founders who want proximity to Limassol's coffee-and-meetings circuit. Good event calendar and open community vibe.",
  },
  {
    name: "Elevate Business Centre",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    type: "coworking",
    focusAreas: ["professional services", "general business"],
    membershipFrom: 160,
    why: "Professional coworking and serviced office environment catering to consultants, lawyers, and mid-stage startups. Includes boardroom access, a business address service, and full secretarial support.",
    website: "https://www.elevate.com.cy",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "MIIC — Multimodal Information and Interaction Centre",
    city: "Nicosia",
    neighbourhood: "University of Cyprus campus",
    type: "tech-hub",
    focusAreas: ["deep tech", "AI", "research commercialisation", "ICT"],
    why: "The anchor public-sector tech hub in Cyprus, embedded at the University of Cyprus. Hosts spin-offs, EU-funded startup programmes, and research commercialisation projects. Best entry point for deep-tech and research-driven founders.",
    website: "https://miic.ucy.ac.cy",
  },
  {
    name: "IDEA Innovation Centre",
    city: "Nicosia",
    neighbourhood: "Frederick University, Nicosia",
    type: "incubator",
    focusAreas: ["general tech", "social enterprise", "EU funding"],
    why: "Incubator linked to Frederick University, specialising in navigating EU research funding (Horizon Europe, ERDF) for early-stage companies. Strong mentorship network and structured cohort programmes.",
    website: "https://ideacenter.com.cy",
  },
  {
    name: "Cyprus Startup Hub (CIPA)",
    city: "Nicosia",
    neighbourhood: "Nicosia city centre",
    type: "accelerator",
    focusAreas: ["FDI", "internationalisation", "scale-ups"],
    why: "Run under the auspices of the Cyprus Investment Promotion Agency. Focused on foreign founders establishing Cyprus operations and companies looking to scale internationally using Cyprus as a base. Strong government connections.",
    website: "https://www.cipa.org.cy",
  },
  {
    name: "WeSpace Nicosia",
    city: "Nicosia",
    neighbourhood: "Nicosia business district",
    type: "coworking",
    focusAreas: ["general business", "startups", "freelancers"],
    membershipFrom: 110,
    why: "Well-priced coworking hub in Nicosia's business district. Consistent WiFi, private meeting rooms, and a mixed community of local professionals and international founders settling in the capital.",
  },
  {
    name: "The Nest Nicosia",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "coworking",
    focusAreas: ["digital agencies", "marketing", "tech startups"],
    membershipFrom: 120,
    why: "Community-focused coworking space attracting digital agencies and marketing teams alongside solo founders. Regular knowledge-sharing events; good for building a Nicosia professional network quickly.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Work in Paphos",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "coworking",
    focusAreas: ["digital nomads", "remote workers", "freelancers"],
    membershipFrom: 120,
    why: "Paphos's most established coworking option, built around the growing digital nomad and remote-worker community. Good natural light, reliable fibre, and a relaxed atmosphere that fits the Paphos lifestyle.",
    website: "https://www.workinpaphos.com",
  },
  {
    name: "Paphos Innovation Lab",
    city: "Paphos",
    neighbourhood: "Paphos town centre",
    type: "incubator",
    focusAreas: ["tourism tech", "agritech", "local startups"],
    why: "Municipal-backed incubator supporting Paphos-based entrepreneurs, with a particular focus on tourism technology and agritech — both relevant to the regional economy. Offers subsidised desk space for qualifying startups.",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca Tech Hub",
    city: "Larnaca",
    neighbourhood: "Larnaca city centre",
    type: "tech-hub",
    focusAreas: ["logistics tech", "aviation tech", "general startups"],
    membershipFrom: 100,
    why: "Growing hub serving Larnaca's emerging tech and logistics sector. Competitively priced relative to Limassol; proximity to the airport makes it convenient for founders who travel frequently across the region.",
  },
  {
    name: "StartHub Larnaca",
    city: "Larnaca",
    neighbourhood: "Finikoudes area",
    type: "coworking",
    focusAreas: ["freelancers", "small agencies", "digital business"],
    membershipFrom: 95,
    why: "Affordable coworking near Larnaca's seafront promenade. Attracts a mix of local freelancers, digital agencies and international founders priced out of Limassol. Community events roughly monthly.",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Napa Digital Hub",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town",
    type: "coworking",
    focusAreas: ["tourism tech", "remote workers", "digital nomads"],
    membershipFrom: 90,
    why: "The only serious coworking option in the Famagusta free area. Built around the digital nomad community that spends summers in Ayia Napa. Quiet outside the summer season; good for focused solo work.",
  },
];
