/**
 * Community Gardens & Urban Farming section content.
 * Consumed by app/sections/community-gardens/page.tsx.
 *
 * NOTE: Community gardening is an emerging scene in Cyprus. Many of these
 * initiatives are small, volunteer-run, or municipality pilots — availability,
 * membership status, and contact details change frequently. Verify all details
 * directly with the organisation before acting.
 *
 * Data reflects best available information as of 2026. Where specific details
 * are uncertain, this is noted in the `why` field.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type GardenType =
  | "community-garden"
  | "allotment"
  | "urban-farm"
  | "rooftop-garden";

export type CommunityGarden = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: GardenType;
  openToNewMembers: boolean;
  annualFeeApprox?: number;
  produce: string[];
  why: string;
  contact?: string;
  website?: string;
};

export type GardenTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const GARDEN_TIPS: ReadonlyArray<GardenTip> = [
  {
    heading: "Water management is the critical variable",
    body: "Cyprus receives under 500mm of rain per year, almost all of it between November and March. Summer gardening without irrigation is not viable — expect to water daily or install a drip system. Water costs and water rights matter here in a way they simply do not in northern Europe. Most community gardens share irrigation infrastructure and set rules about usage windows to avoid peak-hour pressure drops.",
  },
  {
    heading: "The Mediterranean growing calendar is inverted",
    body: "In Cyprus, the productive growing seasons are autumn–winter (October–April) and a short window in early spring. The European idea of 'growing season = summer' does not apply. Tomatoes, courgettes, aubergines and peppers are typically planted in March for a May–June harvest, then again in August for an October harvest. Leafy greens, brassicas and root vegetables grow best through the winter months. Joining a local garden with experienced Cypriot growers is the fastest way to internalise this calendar shift.",
  },
  {
    heading: "Municipality pilot programmes are the entry point",
    body: "Several Cyprus municipalities — particularly Nicosia, Limassol and Larnaca — have launched urban growing pilots in the last few years, often on underused public land. These are usually the easiest way to access an allotment plot as a new resident: fees are subsidised, waiting lists are shorter than private schemes, and the municipality provides basic infrastructure. Check directly with your municipality's environment or green-spaces department for current availability.",
  },
  {
    heading: "Vertical gardens and balcony growing are increasingly common",
    body: "Given the shortage of horizontal growing space in urban Cyprus, vertical gardens on apartment balconies and building facades have become a practical alternative. Growing bags, wall planters, and compact raised beds on balconies are well-suited to the climate. The Nicosia and Limassol urban farming communities have active online groups (Facebook and Instagram) where residents share balcony growing advice specifically calibrated for the Cypriot climate.",
  },
];

// ---------------------------------------------------------------------------
// All garden types
// ---------------------------------------------------------------------------

export const ALL_GARDEN_TYPES: ReadonlyArray<GardenType> = [
  "community-garden",
  "allotment",
  "urban-farm",
  "rooftop-garden",
];

export const GARDEN_TYPE_LABEL: Record<GardenType, string> = {
  "community-garden": "Community Garden",
  allotment: "Allotment",
  "urban-farm": "Urban Farm",
  "rooftop-garden": "Rooftop Garden",
};

// ---------------------------------------------------------------------------
// Gardens
// ---------------------------------------------------------------------------

export const COMMUNITY_GARDENS: ReadonlyArray<CommunityGarden> = [
  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Nicosia Municipality Community Garden (Engomi)",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "allotment",
    openToNewMembers: true,
    annualFeeApprox: 80,
    produce: ["tomatoes", "peppers", "courgettes", "herbs", "leafy greens"],
    why: "One of Nicosia Municipality's urban greening pilot projects. Small allotment plots on public land with shared water access. Fees are subsidised and the scheme is open to city residents. Contact the municipality's green-spaces office for the current waiting list — availability fluctuates.",
    contact: "Nicosia Municipality — environment / green spaces department",
    website: "https://www.nicosia.org.cy",
  },
  {
    name: "The Nicosia Urban Farm (Strovolos)",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    type: "urban-farm",
    openToNewMembers: false,
    produce: [
      "microgreens",
      "herbs",
      "salad leaves",
      "seasonal vegetables",
    ],
    why: "Small private urban farm in Strovolos that grows microgreens and seasonal produce for local restaurants and a weekly box scheme. Not a public allotment, but they have periodically offered volunteer days and growing workshops — search @nicosiaorganicfarm on Instagram for current programmes. Membership slots are limited.",
    contact: "Search @nicosiaorganicfarm on Instagram",
  },
  {
    name: "Pedieos River Linear Park Growing Plots",
    city: "Nicosia",
    neighbourhood: "Pedieos River Park",
    type: "community-garden",
    openToNewMembers: true,
    annualFeeApprox: 50,
    produce: ["herbs", "flowers", "seasonal vegetables"],
    why: "A small community garden initiative along the Pedieos River park. Primarily volunteer-run. Growing plots are informal and community-managed rather than formally allocated. Good entry point for connecting with Nicosia's growing expat gardening community.",
  },

  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Limassol Rooftop Collective",
    city: "Limassol",
    neighbourhood: "Limassol city centre",
    type: "rooftop-garden",
    openToNewMembers: true,
    annualFeeApprox: 120,
    produce: ["herbs", "tomatoes", "peppers", "edible flowers", "microgreens"],
    why: "A community of Limassol apartment dwellers who have converted rooftop and balcony spaces into productive growing areas. Runs regular meetups and knowledge-sharing sessions. Particularly useful for new residents who have a balcony and want to start growing in the Cypriot climate without a full plot.",
    contact: "Search @limassolrooftopgarden on Instagram",
  },
  {
    name: "Mesa Geitonia Community Garden",
    city: "Limassol",
    neighbourhood: "Mesa Geitonia",
    type: "allotment",
    openToNewMembers: true,
    annualFeeApprox: 90,
    produce: ["citrus", "vegetables", "herbs", "olive trees"],
    why: "Neighbourhood-level allotment garden in Limassol's Mesa Geitonia district. Run cooperatively by residents. The site has mature citrus trees alongside annual vegetable plots. More established than most Limassol initiatives — some members have been growing here for several years.",
  },
  {
    name: "Limassol Municipality Green Spaces Pilot",
    city: "Limassol",
    neighbourhood: "Various locations",
    type: "community-garden",
    openToNewMembers: true,
    produce: ["seasonal vegetables", "herbs", "ornamental edibles"],
    why: "Limassol Municipality has been piloting community growing spaces on underused municipal land since 2023. Specific sites and availability change — contact the municipality's environment department directly for current locations and how to register interest.",
    contact: "Limassol Municipality — environment department",
    website: "https://www.limassolmunicipal.com.cy",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca Permaculture Garden",
    city: "Larnaca",
    neighbourhood: "Larnaca outskirts",
    type: "community-garden",
    openToNewMembers: true,
    annualFeeApprox: 60,
    produce: [
      "permaculture mixed produce",
      "herbs",
      "fruit trees",
      "vegetables",
    ],
    why: "Small but active permaculture-focused community garden on the outskirts of Larnaca. Run by an English-speaking group with a mix of Cypriot and expat members. Follows permaculture design principles — no synthetic inputs, companion planting, water harvesting. Good for new residents interested in sustainable growing methods.",
    contact: "Search @larnacapermaculture on Instagram",
  },
  {
    name: "Larnaca Salt Lake Growing Initiative",
    city: "Larnaca",
    neighbourhood: "Near Larnaca Salt Lake",
    type: "urban-farm",
    openToNewMembers: false,
    produce: ["halophyte herbs", "salt-tolerant vegetables", "microgreens"],
    why: "An experimental urban farming project studying salt-tolerant growing near the Larnaca salt lake. Not a public allotment scheme, but worth following for events and workshops — particularly interesting for anyone researching Mediterranean climate growing techniques. Membership is currently closed but they run open days.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos Community Vegetable Garden (Kato Paphos)",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "community-garden",
    openToNewMembers: true,
    annualFeeApprox: 70,
    produce: ["tomatoes", "aubergines", "peppers", "herbs", "courgettes"],
    why: "A resident-run community garden in Kato Paphos. Predominantly English-speaking membership given the large expat population in the area. Good for new arrivals to Paphos who want both growing space and a social connection with the local expat community.",
  },
  {
    name: "Paphos Allotment Association",
    city: "Paphos",
    neighbourhood: "Paphos inland",
    type: "allotment",
    openToNewMembers: true,
    annualFeeApprox: 100,
    produce: [
      "full kitchen garden crops",
      "fruit trees",
      "vines",
      "olive trees",
    ],
    why: "The most established allotment-style growing association in the Paphos district. Plots are larger than the municipal gardens and include some permanent crops (fruit trees, established vines). Waiting list exists but is typically shorter than comparable UK allotment associations. Annual fee includes water access.",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Ayia Napa Green Project",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa hinterland",
    type: "community-garden",
    openToNewMembers: true,
    annualFeeApprox: 50,
    produce: ["herbs", "vegetables", "edible flowers"],
    why: "A small municipality-supported growing project in the hinterland of Ayia Napa, primarily serving year-round residents rather than tourists. Very small scale — fewer than 20 plots — but a good community project for residents who stay through the winter months. Contact the Ayia Napa municipality for current status.",
    contact: "Ayia Napa Municipality",
  },
];
