/**
 * After-School Activities section content.
 *
 * Curation: activities selected for accessibility to expat families —
 * English-friendly coaches or instructors, locations near expat
 * neighbourhoods, and consistent year-round schedules. Fees and
 * schedules change seasonally; verify directly before enrolling.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type ActivityType =
  | "sport"
  | "music"
  | "art"
  | "language"
  | "stem"
  | "dance"
  | "martial-arts"
  | "swimming";

export type AfterSchoolActivity = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: ActivityType;
  /** Minimum age accepted, in years. */
  ageRangeFrom: number;
  /** Maximum age accepted, in years. */
  ageRangeTo: number;
  languagesOffered: string[];
  /** Approximate weekly fee in EUR; undefined = on request. */
  weeklyFeeApprox?: number;
  why: string;
  website?: string;
};

export type ActivityTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const ALL_ACTIVITY_TYPES: ReadonlyArray<ActivityType> = [
  "swimming",
  "sport",
  "martial-arts",
  "dance",
  "music",
  "art",
  "language",
  "stem",
];

export const ACTIVITY_TYPE_LABEL: Record<ActivityType, string> = {
  swimming: "Swimming",
  sport: "Sport",
  "martial-arts": "Martial Arts",
  dance: "Dance",
  music: "Music",
  art: "Art & Craft",
  language: "Languages",
  stem: "STEM & Coding",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const ACTIVITY_TIPS: ReadonlyArray<ActivityTip> = [
  {
    heading: "Outdoor season extends your options",
    body: "Cyprus's climate means many outdoor sports (football, tennis, athletics) run almost year-round with minimal disruption. Indoor activities like swimming and martial arts are open 12 months. The only disruption is usually the two-week Christmas break and a short Easter halt — not the long summer shutdown families experience in northern Europe.",
  },
  {
    heading: "Trial classes are the norm",
    body: "Most clubs and academies in Cyprus offer a free trial lesson or a discounted first month. Always take the trial — class quality and coach communication style vary considerably even within the same sport. It is also the best way to gauge whether the session language (Greek vs English) will suit your child.",
  },
  {
    heading: "Ask about competition and grading pathways",
    body: "If your child is serious about a discipline, ask whether the club competes in the national federation and whether coaches are licensed by the Cyprus Sports Organisation (KOA). For swimming, look for affiliation with the Cyprus Swimming Federation. For martial arts, check for World Taekwondo or IJF judo affiliation. Hobby clubs and competitive clubs often look similar from the outside.",
  },
];

// ---------------------------------------------------------------------------
// Activities
// ---------------------------------------------------------------------------

export const AFTER_SCHOOL_ACTIVITIES: ReadonlyArray<AfterSchoolActivity> = [
  // ── Swimming ──────────────────────────────────────────────────────────────
  {
    name: "Limassol Swimming Club",
    city: "Limassol",
    neighbourhood: "Municipal Pool, Neapolis",
    type: "swimming",
    ageRangeFrom: 4,
    ageRangeTo: 18,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 18,
    why: "One of the oldest and most competitive swimming clubs in Cyprus. Trains at the Limassol Municipal Pool. Coaches are nationally certified; the club competes in the Cyprus Swimming Federation calendar. Good pathway from beginner to competition level.",
  },
  {
    name: "Poseidon Swimming Academy Paphos",
    city: "Paphos",
    neighbourhood: "Paphos Municipal Pool, Kato Paphos",
    type: "swimming",
    ageRangeFrom: 4,
    ageRangeTo: 16,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 20,
    why: "Paphos-based academy with English-speaking head coach. Mixed-ability groups from beginners to squad. Trains at the Paphos Municipal Pool, which is covered and heated — year-round sessions unaffected by weather.",
  },
  {
    name: "Aphrodite Swim School",
    city: "Limassol",
    neighbourhood: "Yermasoyia",
    type: "swimming",
    ageRangeFrom: 3,
    ageRangeTo: 14,
    languagesOffered: ["English", "Greek", "Russian"],
    weeklyFeeApprox: 22,
    why: "Trilingual swim school catering heavily to Limassol's expat population. Small-group lessons (max 6 per lane), water confidence focus for the youngest age groups. Private lessons also available.",
  },
  {
    name: "Larnaca Swimming Club",
    city: "Larnaca",
    neighbourhood: "Larnaca Municipal Pool",
    type: "swimming",
    ageRangeFrom: 5,
    ageRangeTo: 18,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 16,
    why: "The main competitive swimming club in Larnaca, affiliated with the Cyprus Swimming Federation. Affordable fees and a well-structured pathway from learn-to-swim through to senior squad competition.",
  },

  // ── Sport ─────────────────────────────────────────────────────────────────
  {
    name: "Limassol Football Academy",
    city: "Limassol",
    neighbourhood: "Various pitches, east Limassol",
    type: "sport",
    ageRangeFrom: 5,
    ageRangeTo: 16,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 20,
    why: "Structured football academy with UEFA-licensed coaching staff. Age-grouped sessions, match days, and a clear pathway into local league football. The English-language coaching makes it one of the top picks for expat kids.",
  },
  {
    name: "Paphos Tennis Academy",
    city: "Paphos",
    neighbourhood: "Coral Bay Tennis Club",
    type: "sport",
    ageRangeFrom: 5,
    ageRangeTo: 18,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 25,
    why: "Tennis coaching at the Coral Bay club, run by a certified LTA-level coach. Individual and group lessons. Good for beginners; more advanced players can access the club's tournament calendar and national federation pathway.",
  },
  {
    name: "Nicosia Rugby Club Juniors",
    city: "Nicosia",
    neighbourhood: "GSP Stadium area",
    type: "sport",
    ageRangeFrom: 5,
    ageRangeTo: 16,
    languagesOffered: ["English"],
    weeklyFeeApprox: 15,
    why: "The main junior rugby programme in Cyprus, run almost entirely in English and popular with the British expat community in Nicosia. Mixed nationality groups; sessions focus on fun and fundamentals at younger ages.",
    website: "https://www.nicosiarugby.com",
  },
  {
    name: "Larnaca Cycling Club — Youth Programme",
    city: "Larnaca",
    neighbourhood: "Larnaca Salt Lake area",
    type: "sport",
    ageRangeFrom: 8,
    ageRangeTo: 16,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 12,
    why: "Youth cycling sessions around the flat terrain of the Larnaca Salt Lake and beach promenade. Safe, car-free routes make this one of the most accessible outdoor sport options for younger children in Larnaca.",
  },

  // ── Martial Arts ──────────────────────────────────────────────────────────
  {
    name: "Shotokan Karate Cyprus — Limassol Dojo",
    city: "Limassol",
    neighbourhood: "Agios Nikolaos",
    type: "martial-arts",
    ageRangeFrom: 5,
    ageRangeTo: 16,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 14,
    why: "Established Shotokan karate club with WKF-affiliated grading. Classes taught in English and Greek. Mixed ability groups; children's classes run two evenings per week with monthly gradings for motivated students.",
  },
  {
    name: "Paphos Judo Academy",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "martial-arts",
    ageRangeFrom: 5,
    ageRangeTo: 15,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 16,
    why: "IJF-affiliated judo academy covering juniors in Paphos. Small class sizes, qualified dan-grade instructors, and national competition participation for those who want it. Good confidence and discipline focus for younger children.",
  },
  {
    name: "Nicosia Taekwondo Centre",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    type: "martial-arts",
    ageRangeFrom: 4,
    ageRangeTo: 17,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 14,
    why: "World Taekwondo-affiliated centre in Nicosia. Structured belt system, national and international competition pathway, and flexible scheduling. One of the most active martial arts clubs in the capital.",
  },

  // ── Dance ─────────────────────────────────────────────────────────────────
  {
    name: "Limassol Dance Academy",
    city: "Limassol",
    neighbourhood: "Mesa Geitonia",
    type: "dance",
    ageRangeFrom: 3,
    ageRangeTo: 18,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 18,
    why: "Comprehensive dance academy covering ballet, contemporary, jazz and Greek traditional dance. RAD-affiliated ballet examinations available. Popular with expat and local families. Annual showcase performance.",
    website: "https://www.limassolacademy.com",
  },
  {
    name: "Paphos School of Dance",
    city: "Paphos",
    neighbourhood: "Paphos town centre",
    type: "dance",
    ageRangeFrom: 4,
    ageRangeTo: 16,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 16,
    why: "English-language dance school in Paphos covering ballet, hip-hop and musical theatre. Smaller classes than the larger Limassol academies — suits children who prefer a less competitive environment.",
  },

  // ── Music ─────────────────────────────────────────────────────────────────
  {
    name: "Limassol Music School",
    city: "Limassol",
    neighbourhood: "Limassol town centre",
    type: "music",
    ageRangeFrom: 5,
    ageRangeTo: 18,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 24,
    why: "State-affiliated music school offering piano, guitar, violin, drums and voice. ABRSM-compatible examinations available. One of the most structured music education environments in Cyprus. Waiting list for the most popular instruments.",
  },
  {
    name: "Nicosia Conservatoire — Junior Programme",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "music",
    ageRangeFrom: 5,
    ageRangeTo: 18,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 28,
    why: "The most academically rigorous music education in Cyprus for children. Individual instrument tuition plus music theory. ABRSM and Trinity examinations. Recommended for families where a child shows genuine musical aptitude.",
  },
  {
    name: "Larnaca Music & Arts Centre",
    city: "Larnaca",
    neighbourhood: "Larnaca town",
    type: "music",
    ageRangeFrom: 5,
    ageRangeTo: 16,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 20,
    why: "Community music centre offering group and individual lessons in piano, guitar, and ukulele. More informal than the larger conservatoires — better suited to children exploring music as a hobby. English-speaking tutors available.",
  },

  // ── Art ───────────────────────────────────────────────────────────────────
  {
    name: "Paphos Art Workshop for Kids",
    city: "Paphos",
    neighbourhood: "Paphos town",
    type: "art",
    ageRangeFrom: 4,
    ageRangeTo: 14,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 15,
    why: "Creative art studio running weekly sessions in drawing, painting, and mixed media. English-speaking tutors. Small groups of 6–8 children. Popular with expat families as a gentle social integration activity.",
  },

  // ── STEM & Coding ─────────────────────────────────────────────────────────
  {
    name: "Code Island Cyprus — Limassol",
    city: "Limassol",
    neighbourhood: "Limassol city centre",
    type: "stem",
    ageRangeFrom: 7,
    ageRangeTo: 16,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 22,
    why: "Coding and STEM academy with a structured curriculum (Scratch, Python, robotics). English-medium instruction. Well-reviewed by expat parents for keeping up with international coding curricula. Weekend and after-school slots available.",
    website: "https://www.codeisland.com.cy",
  },
  {
    name: "Mindlab Nicosia",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "stem",
    ageRangeFrom: 6,
    ageRangeTo: 15,
    languagesOffered: ["Greek", "English"],
    weeklyFeeApprox: 20,
    why: "STEM-focused programme covering robotics, logic, and basic programming. Nicosia's most established coding club for children. Groups are kept small to ensure individual attention. Summer intensive programme also available.",
  },

  // ── Languages ─────────────────────────────────────────────────────────────
  {
    name: "Paphos Language Centre — Children's Greek",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "language",
    ageRangeFrom: 5,
    ageRangeTo: 14,
    languagesOffered: ["English", "Greek"],
    weeklyFeeApprox: 12,
    why: "Structured Greek as a second language for expat children. Small groups, communicative method, and content linked to daily life in Cyprus. Popular with newly-arrived families wanting to help their children integrate at school.",
  },
  {
    name: "Limassol French Institute — Junior Classes",
    city: "Limassol",
    neighbourhood: "Limassol town centre",
    type: "language",
    ageRangeFrom: 6,
    ageRangeTo: 16,
    languagesOffered: ["French", "English"],
    weeklyFeeApprox: 18,
    why: "DELF Junior examination preparation alongside conversational French for children. Run by the Alliance Française affiliate in Limassol. Good option for French-speaking families or those aiming at a French university pathway.",
  },
];
