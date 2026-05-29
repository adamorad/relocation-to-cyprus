/**
 * Summer Camps section content.
 *
 * Curation: camps selected for relevance to expat families — English or
 * bilingual provision, organised activities, and reliable year-on-year
 * operation. Prices and dates change annually; always verify directly
 * with the camp before booking.
 *
 * Note: Cyprus summer camps run mainly June–August. Residential camps
 * are almost all located in the Troodos mountain area for cooler temperatures.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type SummerCamp = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: "day" | "residential";
  focusAreas: string[];
  /** Minimum age, in years. */
  ageFrom: number;
  /** Maximum age, in years. */
  ageTo: number;
  /** Approximate weekly fee in EUR; undefined = on request. */
  weeklyFeeApprox?: number;
  languages: string[];
  why: string;
  website?: string;
};

export type SummerCampTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const SUMMER_CAMP_TIPS: ReadonlyArray<SummerCampTip> = [
  {
    heading: "Book by March for July–August",
    body: "The most popular day camps — particularly those run by international schools — open registration in January and fill by late March. If you are planning a summer that includes July or August camp weeks, register your interest before Christmas and confirm your booking as soon as the registration window opens. Waiting lists are the norm at the best camps.",
  },
  {
    heading: "Residential camps book out fastest",
    body: "There are only a handful of residential camps in Cyprus, most of them in the Troodos mountains. These fill much faster than day camps because demand from across the island converges on a small number of beds. Residential slots for July open in November of the prior year at several providers. If a residential experience matters to your family, treat the booking like a popular hotel — first-come, first-served.",
  },
  {
    heading: "Weekly flexibility varies widely",
    body: "Some day camps require a full summer commitment or minimum of four consecutive weeks. Others allow you to book single weeks or split weeks, which is useful for families travelling during the summer. Always confirm the minimum booking unit before paying a deposit. International school holiday clubs tend to be most flexible; specialist sports camps tend to require longer blocks.",
  },
  {
    heading: "Check the sunscreen and water policy",
    body: "Cyprus summer temperatures routinely exceed 38°C, and outdoor activities for children require careful heat management. Before enrolling, confirm: the camp's sun protection policy (hats and SPF mandatory, shade available, outdoor activity times), the water break frequency, and whether the camp moves entirely indoors during the hottest hours (noon to 15:00). Reputable camps follow clear protocols; improvised programmes may not.",
  },
];

// ---------------------------------------------------------------------------
// Summer Camps
// ---------------------------------------------------------------------------

export const SUMMER_CAMPS: ReadonlyArray<SummerCamp> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Rainbow International School Summer Camp",
    city: "Limassol",
    neighbourhood: "Polemidia",
    type: "day",
    focusAreas: ["multi-activity", "sports", "arts & crafts", "swimming"],
    ageFrom: 4,
    ageTo: 14,
    weeklyFeeApprox: 280,
    languages: ["English"],
    why: "One of the most popular day camps in Limassol, run by Rainbow International School on its own campus. English-medium, structured timetable, swimming sessions in the school pool. Flexible single-week bookings available. One of the first to fill in Limassol.",
    website: "https://www.rainbowschool.com.cy",
  },
  {
    name: "Limassol Football Summer Academy",
    city: "Limassol",
    neighbourhood: "Agios Athanasios",
    type: "day",
    focusAreas: ["football", "multi-sport"],
    ageFrom: 5,
    ageTo: 14,
    weeklyFeeApprox: 180,
    languages: ["English", "Greek"],
    why: "Intensive football training academy running July and August. UEFA-licensed coaches; daily technical sessions in the morning and tactical games in the afternoon. English-speaking coaching staff. Popular with families wanting structured sport rather than a general activity camp.",
  },
  {
    name: "Camp Cyprus — Limassol",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    type: "day",
    focusAreas: [
      "swimming",
      "arts & crafts",
      "drama",
      "coding",
      "outdoor games",
    ],
    ageFrom: 3,
    ageTo: 12,
    weeklyFeeApprox: 260,
    languages: ["English", "Greek", "Russian"],
    why: "Trilingual general activity day camp running the full summer. Unusually broad age range (from 3 years). Popular with the Russian-speaking expat community as well as British and Israeli families. Air-conditioned indoor programme during peak heat hours.",
  },
  {
    name: "Troodos Adventure Residential Camp",
    city: "Limassol",
    neighbourhood: "Platres, Troodos Mountains",
    type: "residential",
    focusAreas: ["hiking", "rock climbing", "team building", "nature"],
    ageFrom: 9,
    ageTo: 16,
    weeklyFeeApprox: 650,
    languages: ["English", "Greek"],
    why: "Residential camp at altitude in the Troodos mountains — much cooler than the coast in July and August. Week-long sessions covering hiking, low-ropes team challenges, and nature study. Dormitory accommodation; campers cook one meal per day as part of the programme. Books out by February.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos Watersports Summer Camp",
    city: "Paphos",
    neighbourhood: "Coral Bay",
    type: "day",
    focusAreas: ["windsurfing", "kayaking", "snorkelling", "swimming"],
    ageFrom: 7,
    ageTo: 16,
    weeklyFeeApprox: 220,
    languages: ["English", "Greek"],
    why: "Marine-focused day camp based at Coral Bay. Mornings on the water (kayaking, snorkelling, supervised windsurfing for older groups), afternoons in the shade with beach games. One of the most popular summer options in Paphos given the beach setting.",
  },
  {
    name: "Olympic Lagoon Kids' Summer Club",
    city: "Paphos",
    neighbourhood: "Chlorakas",
    type: "day",
    focusAreas: ["swimming", "sports", "arts & crafts", "water park"],
    ageFrom: 3,
    ageTo: 12,
    weeklyFeeApprox: 300,
    languages: ["English", "Greek"],
    why: "Run on the grounds of the Olympic Lagoon Resort, this day camp gives children access to the resort's water park and supervised pools. Premium option in Paphos — higher price reflects the facilities. Popular with non-guests who purchase a summer club pass.",
    website: "https://www.olympicholidays.com",
  },
  {
    name: "Paphos Tennis & Sports Camp",
    city: "Paphos",
    neighbourhood: "Coral Bay Tennis Club",
    type: "day",
    focusAreas: ["tennis", "football", "swimming", "multi-sport"],
    ageFrom: 6,
    ageTo: 15,
    weeklyFeeApprox: 190,
    languages: ["English"],
    why: "Multi-sport camp anchored by tennis coaching at the Coral Bay Tennis Club. Morning technical sessions followed by recreational sport and swimming in the afternoon. English-medium throughout. Single-week bookings accepted.",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca International School Summer Programme",
    city: "Larnaca",
    neighbourhood: "Drosia",
    type: "day",
    focusAreas: ["STEM", "arts", "sports", "swimming"],
    ageFrom: 4,
    ageTo: 14,
    weeklyFeeApprox: 250,
    languages: ["English"],
    why: "English-medium summer programme run by the International School of Larnaca on its own campus. Structured STEM workshops alongside sports and creative activities. Highly regarded by the Larnaca expat community — one of the first choices for English-speaking families in the city.",
  },
  {
    name: "Sea & Sun Day Camp Larnaca",
    city: "Larnaca",
    neighbourhood: "Mackenzie Beach",
    type: "day",
    focusAreas: ["beach activities", "sports", "arts & crafts"],
    ageFrom: 5,
    ageTo: 13,
    weeklyFeeApprox: 170,
    languages: ["Greek", "English"],
    why: "Affordable bilingual day camp near Mackenzie Beach. Morning structured activities, afternoon beach time with lifeguard-supervised swimming. Good value option in Larnaca; flexible weekly bookings. Popular with local and expat families alike.",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "English School Nicosia — Summer Programme",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "day",
    focusAreas: ["academic enrichment", "sports", "arts", "technology"],
    ageFrom: 5,
    ageTo: 16,
    weeklyFeeApprox: 290,
    languages: ["English"],
    why: "Summer programme on the English School campus. Blends light academic enrichment with sports and creative activities. Widely regarded as the most academically credible summer programme in Nicosia. Books out quickly due to the school's reputation.",
    website: "https://www.englishschool.ac.cy",
  },
  {
    name: "Troodos Residential Scout Camp",
    city: "Nicosia",
    neighbourhood: "Kakopetria, Troodos",
    type: "residential",
    focusAreas: ["scouting", "hiking", "team building", "nature crafts"],
    ageFrom: 8,
    ageTo: 17,
    weeklyFeeApprox: 420,
    languages: ["Greek", "English"],
    why: "Cyprus Scout Association residential camp in the cool Troodos forest above Kakopetria. Traditional scout programme — hiking, fire craft, nature identification, team leadership challenges. English-speaking groups available on request. Good for building resilience and independence.",
  },
  {
    name: "Mindlab Summer STEM Intensive — Nicosia",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "day",
    focusAreas: ["coding", "robotics", "3D design", "electronics"],
    ageFrom: 7,
    ageTo: 15,
    weeklyFeeApprox: 240,
    languages: ["English", "Greek"],
    why: "Week-long STEM intensive covering robotics, Python basics and 3D design. Air-conditioned indoor environment — ideal for the hottest weeks. Popular with tech-oriented families. Runs in July and August; book early as groups cap at 12 students.",
  },
  {
    name: "Ayia Napa Junior Surf & Swim Camp",
    city: "Ayia Napa",
    neighbourhood: "Nissi Bay",
    type: "day",
    focusAreas: ["surfing", "swimming", "snorkelling", "beach sports"],
    ageFrom: 8,
    ageTo: 16,
    weeklyFeeApprox: 210,
    languages: ["English", "Greek"],
    why: "Based at Nissi Bay, Cyprus's most famous beach. Daily surf and SUP lessons, supervised snorkelling, beach volleyball. Smaller and more informal than the Limassol or Nicosia camps — good for families staying in the Ayia Napa area for the summer who want structured daily activity for their children.",
  },
];
