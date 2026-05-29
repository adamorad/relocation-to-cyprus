/**
 * Childcare & Nurseries section content.
 *
 * Curation: entries selected for relevance to expat families — English or
 * bilingual provision, proximity to expat-heavy neighbourhoods, and
 * year-round / full-day options. Fees and availability change; always
 * verify directly with the nursery before relying on figures here.
 *
 * Regulatory note: nurseries in Cyprus are licensed and inspected by the
 * Ministry of Education, Culture, Sport and Youth (MOEC) and the Social
 * Welfare Services. The MOEC inspection is the closest equivalent to
 * Ofsted in the UK.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type Nursery = {
  name: string;
  city: City;
  neighbourhood?: string;
  /** Minimum age accepted, in months. */
  ageRangeFrom: number;
  /** Maximum age accepted, in years. */
  ageRangeTo: number;
  languagesOffered: string[];
  /** Approximate annual fee in EUR; undefined = on request. */
  annualFeeFrom?: number;
  /** Whether full-day (up to 17:00 or later) sessions are available. */
  fullDay: boolean;
  why: string;
  website?: string;
};

export type ChildcareTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const CHILDCARE_TIPS: ReadonlyArray<ChildcareTip> = [
  {
    heading: "MOEC inspection = the Cyprus Ofsted",
    body: "All licensed nurseries in Cyprus are inspected by the Ministry of Education, Culture, Sport and Youth (MOEC) and the Social Welfare Services. Ask the nursery for their most recent inspection report before enrolling — reputable settings will share it readily. Unlicensed childminders exist but have no regulatory oversight.",
  },
  {
    heading: "Term-time vs year-round provision",
    body: "Many nurseries in Cyprus follow a September–June academic calendar, leaving families needing cover in July and August. Before committing, confirm whether the nursery operates year-round or closes over summer — and if it closes, whether they can recommend a holiday club or summer camp for continuity.",
  },
  {
    heading: "Morning-only vs full-day ratio",
    body: "A significant proportion of Cyprus nurseries were originally set up as morning-only (08:00–13:00) settings. Full-day places (to 17:00 or later) are in higher demand and shorter supply, especially in Paphos and Larnaca. If both parents work full-time, confirm full-day availability explicitly — do not assume it from a website.",
  },
  {
    heading: "September waiting lists fill early",
    body: "Popular bilingual and English-language nurseries in Limassol and Nicosia fill their September intake by January or February of the same year. If you are planning a move for September, contact nurseries in October–December for the following academic year. Arriving in Cyprus in August and expecting a September place in a top setting is almost always too late.",
  },
];

// ---------------------------------------------------------------------------
// Nurseries
// ---------------------------------------------------------------------------

export const NURSERIES: ReadonlyArray<Nursery> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Busy Bees International Nursery Limassol",
    city: "Limassol",
    neighbourhood: "Agios Athanasios",
    ageRangeFrom: 3,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 5500,
    fullDay: true,
    why: "Part of the well-known UK franchise, offering structured English-medium learning with a play-based curriculum. Strong parent community, MOEC-licensed, and popular with expat families on the east Limassol side.",
    website: "https://www.busybees.com",
  },
  {
    name: "Kiddie Kingdom Nursery",
    city: "Limassol",
    neighbourhood: "Mesa Geitonia",
    ageRangeFrom: 6,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 4800,
    fullDay: true,
    why: "Long-established Limassol nursery with good outdoor play space and a bilingual Greek-English approach. Known for warm, family-like atmosphere and flexible hours to suit working parents.",
  },
  {
    name: "Rainbow International School Nursery",
    city: "Limassol",
    neighbourhood: "Polemidia",
    ageRangeFrom: 2,
    ageRangeTo: 6,
    languagesOffered: ["English"],
    annualFeeFrom: 6200,
    fullDay: true,
    why: "Nursery and reception section attached to Rainbow International School. English-only curriculum from age 2. Smooth transition into the school's primary years. Waiting list applies from January for September starts.",
    website: "https://www.rainbowschool.com.cy",
  },
  {
    name: "The English Nursery Limassol",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    ageRangeFrom: 18,
    ageRangeTo: 5,
    languagesOffered: ["English"],
    annualFeeFrom: 5800,
    fullDay: true,
    why: "Purely English-medium setting catering specifically to expat families in the Germasogeia tourist strip area. Small class sizes, EYFS-influenced curriculum, and an established parent network.",
  },
  {
    name: "Little Stars Nursery",
    city: "Limassol",
    neighbourhood: "Zakaki",
    ageRangeFrom: 3,
    ageRangeTo: 6,
    languagesOffered: ["Greek", "English"],
    annualFeeFrom: 3900,
    fullDay: true,
    why: "More affordable full-day option in west Limassol. Bilingual setting with good outdoor facilities. Popular with families who want Greek immersion alongside English. Year-round operation.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos English Nursery School",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    ageRangeFrom: 18,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 4600,
    fullDay: true,
    why: "One of the most established English-language nurseries in Paphos. Serves the large expat community in Kato Paphos. Strong emphasis on outdoor play and social development. Well-regarded by long-term residents.",
  },
  {
    name: "Busy Bees International Nursery Paphos",
    city: "Paphos",
    neighbourhood: "Chlorakas",
    ageRangeFrom: 3,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 5400,
    fullDay: true,
    why: "The Paphos branch of the UK franchise, located in the expat-popular Chlorakas area. Consistent curriculum with the Limassol branch, making it straightforward for families moving between the two cities.",
    website: "https://www.busybees.com",
  },
  {
    name: "Little Footprints Nursery",
    city: "Paphos",
    neighbourhood: "Universal",
    ageRangeFrom: 6,
    ageRangeTo: 5,
    languagesOffered: ["English", "Greek", "Russian"],
    annualFeeFrom: 4200,
    fullDay: false,
    why: "Trilingual nursery popular with the Russian-speaking and British expat communities in Universal, Paphos. Morning-only sessions; after-school wraparound is bookable separately at extra cost.",
  },
  {
    name: "Happy Faces Nursery Paphos",
    city: "Paphos",
    neighbourhood: "Peyia",
    ageRangeFrom: 3,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 3800,
    fullDay: false,
    why: "Community-oriented nursery serving the Coral Bay and Peyia area. Smaller setting with a personal atmosphere. Good option for families based in north Paphos who want to avoid the morning drive into town.",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "International School of Larnaca — Early Years",
    city: "Larnaca",
    neighbourhood: "Drosia",
    ageRangeFrom: 2,
    ageRangeTo: 6,
    languagesOffered: ["English"],
    annualFeeFrom: 5600,
    fullDay: true,
    why: "Early Years section of the International School of Larnaca. English-only setting, EYFS-based curriculum, smooth feeder into the school's primary years. MOEC-licensed, strong reputation among the Larnaca expat community.",
  },
  {
    name: "Treasure Island Nursery",
    city: "Larnaca",
    neighbourhood: "Mackenzie Beach area",
    ageRangeFrom: 6,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 4000,
    fullDay: true,
    why: "Friendly bilingual nursery in a convenient Larnaca location near the beach road. Full-day provision available. Popular with mixed expat and local families who want English immersion without full international school fees.",
  },
  {
    name: "Sunflower Nursery Larnaca",
    city: "Larnaca",
    neighbourhood: "Aradippou",
    ageRangeFrom: 3,
    ageRangeTo: 6,
    languagesOffered: ["Greek", "English"],
    annualFeeFrom: 3400,
    fullDay: false,
    why: "Lower-cost bilingual option in the Aradippou district, east of Larnaca. Morning-only; popular with families where one parent is home in the afternoon. Year-round operation with a summer club available.",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "The English School Nicosia — Nursery",
    city: "Nicosia",
    neighbourhood: "Engomi",
    ageRangeFrom: 3,
    ageRangeTo: 5,
    languagesOffered: ["English"],
    annualFeeFrom: 6500,
    fullDay: true,
    why: "Nursery section affiliated with one of Cyprus's most academically regarded private schools. English-medium, small groups, and a direct feeder track into the primary school. High demand — register well in advance.",
    website: "https://www.englishschool.ac.cy",
  },
  {
    name: "Junior Academy Nicosia",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    ageRangeFrom: 18,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 5000,
    fullDay: true,
    why: "Well-established Nicosia nursery with a structured bilingual programme and extended-day provision to 18:00. Popular with dual-income professional families. Good facilities including a sensory room and music curriculum.",
  },
  {
    name: "Bright Beginnings Nursery",
    city: "Nicosia",
    neighbourhood: "Latsia",
    ageRangeFrom: 3,
    ageRangeTo: 5,
    languagesOffered: ["English", "Greek"],
    annualFeeFrom: 3600,
    fullDay: false,
    why: "More affordable bilingual nursery on the western side of Nicosia. Morning sessions with optional lunch club. MOEC-licensed. Good option for families on a tighter budget who still want English-medium provision.",
  },
  {
    name: "Kids First International Nursery",
    city: "Nicosia",
    neighbourhood: "Aglandjia",
    ageRangeFrom: 6,
    ageRangeTo: 6,
    languagesOffered: ["English", "Greek", "French"],
    annualFeeFrom: 5200,
    fullDay: true,
    why: "Trilingual setting in the Aglandjia suburb of Nicosia, popular with EU institution families and French-speaking expats. Full-day provision, qualified staff with international education backgrounds.",
  },
];
