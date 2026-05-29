/**
 * Schools section content. Consumed by components/SchoolsPanel.tsx.
 *
 * Curation: international and private schools selected for relevance to
 * relocating families — curriculum, city coverage, language of instruction,
 * and suitability for non-Greek-speaking children. Fees are estimates based
 * on publicly available information; always confirm directly with the school.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type SchoolCurriculum =
  | "british"
  | "ib"
  | "american"
  | "bilingual"
  | "greek-private";

export type School = {
  name: string;
  city: City;
  neighbourhood?: string;
  curriculum: SchoolCurriculum;
  ageRange: string;
  annualFeeFrom: number;
  annualFeeTo: number;
  languageOfInstruction: "english" | "bilingual" | "greek";
  studentBody?: string;
  why: string;
  tip?: string;
  website?: string;
};

export type SchoolTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Curriculum metadata
// ---------------------------------------------------------------------------

export const ALL_SCHOOL_CURRICULA: ReadonlyArray<SchoolCurriculum> = [
  "british",
  "ib",
  "american",
  "bilingual",
  "greek-private",
];

export const SCHOOL_CURRICULUM_LABEL: Record<SchoolCurriculum, string> = {
  british: "British (IGCSE / A-levels)",
  ib: "IB (International Baccalaureate)",
  american: "American",
  bilingual: "Bilingual (Greek / English)",
  "greek-private": "Greek Private",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export const SCHOOL_TIPS: ReadonlyArray<SchoolTip> = [
  {
    heading: "Apply before you arrive",
    body: "Waitlists at the top Limassol schools — particularly Heritage and Foley's — can run 6–18 months for primary-year places. Start the application process as soon as your move is confirmed, even if you don't have a Cypriot address yet.",
  },
  {
    heading: "Mid-year intake varies by school",
    body: "Some schools (notably Foley's and ISP Paphos) will take pupils mid-year if places exist; others align intake strictly with September. Always call the admissions office and ask — the answer changes year to year.",
  },
  {
    heading: "Ask about the student body",
    body: "The percentage of internationally mobile versus locally Cypriot pupils matters a lot for English immersion and cultural fit. Schools like Heritage (Limassol) skew heavily international; others like Pascal are majority Cypriot. Neither is wrong — know what you're choosing.",
  },
  {
    heading: "Fee ranges are estimates",
    body: "Very few Cyprus private schools publish full fee schedules publicly. The figures here are based on available information and parent reports, and will vary by year group. Always request a full fee schedule (including registration, uniforms, and activity fees) from the school directly.",
  },
  {
    heading: "GCSEs vs IB — know the difference",
    body: "The majority of English-curriculum schools in Cyprus offer British GCSEs and A-levels. The International Baccalaureate (IB Diploma) is rarer — The Falcon School in Nicosia is the clearest example. If IB is a priority for university applications, confirm the school's specific pathway before enrolling.",
  },
];

// ---------------------------------------------------------------------------
// Schools
// ---------------------------------------------------------------------------

export const SCHOOLS: ReadonlyArray<School> = [
  // ── Limassol ────────────────────────────────────────────────────────────
  {
    name: "The Heritage Private School",
    city: "Limassol",
    neighbourhood: "Polemidia",
    curriculum: "british",
    ageRange: "3–18",
    annualFeeFrom: 9500,
    annualFeeTo: 16000,
    languageOfInstruction: "english",
    studentBody:
      "~800 pupils, majority international (Russian, Israeli, British, Lebanese).",
    why: "The flagship international school for Limassol's large expat community. Strong UK university placement record, well-resourced facilities, and a genuinely diverse student body. Covers nursery through to A-levels within one campus.",
    tip: "Primary years are heavily oversubscribed — apply 6–18 months before your intended start date. Secondary intake has more flexibility.",
    website: "https://www.heritageschool.ac.cy",
  },
  {
    name: "Foley's International School",
    city: "Limassol",
    neighbourhood: "Limassol centre",
    curriculum: "british",
    ageRange: "3–18",
    annualFeeFrom: 8000,
    annualFeeTo: 14000,
    languageOfInstruction: "english",
    studentBody: "Mixed international and Cypriot pupils.",
    why: "Long-established British-curriculum school in central Limassol. Offers IGCSE and A-levels with consistent results. Smaller than Heritage, which means more individual attention in secondary years. A strong second option if Heritage is full.",
    tip: "Mid-year intake is considered on a case-by-case basis — worth calling admissions directly if you're arriving outside September.",
    website: "https://www.foleys.ac.cy",
  },
  {
    name: "The Junior School",
    city: "Limassol",
    neighbourhood: "Limassol",
    curriculum: "british",
    ageRange: "Nursery–11",
    annualFeeFrom: 8000,
    annualFeeTo: 12000,
    languageOfInstruction: "english",
    studentBody: "International and Cypriot mix.",
    why: "Primary-only British curriculum school that naturally feeds pupils into Heritage or Foley's for secondary. Strong pastoral care, English immersion from nursery, and a smaller community feel. A good first port of call for families arriving with young children.",
    website: "https://www.thejuniorschool.com.cy",
  },
  {
    name: "Pascal Private School Limassol",
    city: "Limassol",
    neighbourhood: "Multiple campuses",
    curriculum: "bilingual",
    ageRange: "4–18",
    annualFeeFrom: 5000,
    annualFeeTo: 9000,
    languageOfInstruction: "bilingual",
    studentBody: "Majority Cypriot with a growing international intake.",
    why: "Part of the well-regarded Pascal group, the most affordable full-range option in Limassol. Teaching is in both Greek and English, making it a good fit for families who want their children to learn Greek alongside a rigorous academic programme. Strong secondary provision.",
    tip: "The bilingual model requires some Greek from day one — best suited to children who will pick up Greek naturally (ages 4–8) or families planning a long-term stay.",
    website: "https://www.pascal.ac.cy",
  },

  // ── Paphos ───────────────────────────────────────────────────────────────
  {
    name: "The International School of Paphos",
    city: "Paphos",
    neighbourhood: "Chlorakas",
    curriculum: "british",
    ageRange: "3–18",
    annualFeeFrom: 5000,
    annualFeeTo: 9000,
    languageOfInstruction: "english",
    studentBody: "Predominantly international — British, Russian, other EU.",
    why: "The primary destination for expat families in Paphos. Smaller and more affordable than its Limassol equivalents, with a tighter community feel. Teaches IGCSE and A-levels and has produced consistent university placement results. The Chlorakas location is convenient for most of north Paphos.",
    tip: "Class sizes are smaller here than in Limassol — often an advantage for children who need more support adjusting to a new country.",
    website: "https://www.isp.ac.cy",
  },
  {
    name: "Logos Multilingual Private School (Paphos)",
    city: "Paphos",
    neighbourhood: "Paphos",
    curriculum: "bilingual",
    ageRange: "4–18",
    annualFeeFrom: 4500,
    annualFeeTo: 8000,
    languageOfInstruction: "bilingual",
    studentBody: "Mixed Cypriot and international.",
    why: "Part of the Logos group, a well-established Cypriot private school network with multiple campuses. Teaching balances Greek and English across all year groups. One of the more affordable full-range options in Paphos with good academic structure for secondary pupils.",
    website: "https://www.logos.ac.cy",
  },

  // ── Larnaca ──────────────────────────────────────────────────────────────
  {
    name: "American Academy Larnaca",
    city: "Larnaca",
    neighbourhood: "Larnaca",
    curriculum: "bilingual",
    ageRange: "6–18",
    annualFeeFrom: 4500,
    annualFeeTo: 8500,
    languageOfInstruction: "bilingual",
    studentBody: "Mix of Cypriot, expat, and diaspora families.",
    why: "The most academically established school in Larnaca, with a long track record in secondary education. Despite the name, the programme is bilingual (Greek/English) rather than American-curriculum. One of the few Larnaca schools consistently able to absorb non-Greek-speaking pupils at secondary level.",
    tip: "The 'American' name refers to its founding heritage, not the curriculum. Expect GCE O-levels / equivalent, not SATs or APs.",
    website: "https://www.aa.ac.cy",
  },
  {
    name: "Larnaca International School",
    city: "Larnaca",
    neighbourhood: "Larnaca",
    curriculum: "british",
    ageRange: "3–16",
    annualFeeFrom: 4000,
    annualFeeTo: 7500,
    languageOfInstruction: "english",
    studentBody: "Small school, mix of expat and Cypriot families.",
    why: "A smaller English-language school serving Larnaca's expat community through to IGCSE level. Lower fees than Limassol equivalents. For A-levels, pupils typically transfer to a Nicosia or Limassol school at 16. A good option for primary and lower secondary years in Larnaca.",
    website: "https://www.lis.ac.cy",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "The Falcon School",
    city: "Nicosia",
    neighbourhood: "Nicosia",
    curriculum: "ib",
    ageRange: "4–18",
    annualFeeFrom: 6500,
    annualFeeTo: 11000,
    languageOfInstruction: "english",
    studentBody: "Mix of diplomatic, expat, and Cypriot families.",
    why: "One of the very few IB-authorised schools on the island, making it particularly attractive to internationally mobile families whose children may need to continue in the IB system in another country. Also offers British curriculum in lower years. Nicosia's best option for IB Diploma students.",
    tip: "The IB Diploma is recognised by universities worldwide and offers genuine portability — a major advantage if your relocation may not be permanent.",
    website: "https://www.falconschool.ac.cy",
  },
  {
    name: "Pascal Private School Nicosia",
    city: "Nicosia",
    neighbourhood: "Central Nicosia",
    curriculum: "bilingual",
    ageRange: "4–18",
    annualFeeFrom: 5000,
    annualFeeTo: 9000,
    languageOfInstruction: "bilingual",
    studentBody: "Primarily Cypriot with some expat intake.",
    why: "Same group as the Limassol campus — reliable bilingual education across the full age range. A practical option for families settling in Nicosia who want a known brand and affordable fees. The central Nicosia location is convenient for working parents.",
    website: "https://www.pascal.ac.cy",
  },
  {
    name: "The International School of Cyprus (Nicosia)",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    curriculum: "british",
    ageRange: "3–18",
    annualFeeFrom: 7000,
    annualFeeTo: 12000,
    languageOfInstruction: "english",
    studentBody: "International-majority, particularly diplomatic community.",
    why: "One of Nicosia's most established British-curriculum schools, with a strong reputation for secondary education and university preparation. Located in Strovolos, which puts it in a central and accessible part of the capital. Popular with embassies and international organisations.",
    website: "https://www.isc.ac.cy",
  },
  {
    name: "G.C. School of Careers",
    city: "Nicosia",
    neighbourhood: "Nicosia",
    curriculum: "british",
    ageRange: "11–18",
    annualFeeFrom: 5000,
    annualFeeTo: 8000,
    languageOfInstruction: "english",
    studentBody: "Mix of Cypriot and expat, secondary only.",
    why: "A secondary-specialist school focused specifically on IGCSE and A-level preparation. Strong subject range at A-level, with a track record in UK university applications. A good option for families arriving with older children (11+) who need an established academic pathway.",
    tip: "Secondary-only means no primary provision — plan accordingly if you have younger children who will eventually need to transfer here.",
    website: "https://www.gc.ac.cy",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "International School of Ayia Napa",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa",
    curriculum: "british",
    ageRange: "3–16",
    annualFeeFrom: 4000,
    annualFeeTo: 7000,
    languageOfInstruction: "english",
    studentBody: "Small school serving the southeast coast.",
    why: "The main English-language option for families in the Ayia Napa / Protaras area. Small school with lower fees than Limassol equivalents. Covers through to IGCSE; for A-levels, pupils would typically need to board or relocate. Best suited to primary and lower secondary.",
    website: "https://www.isan.ac.cy",
  },
  {
    name: "Famagusta Academy",
    city: "Ayia Napa",
    neighbourhood: "Paralimni",
    curriculum: "bilingual",
    ageRange: "6–18",
    annualFeeFrom: 3500,
    annualFeeTo: 6500,
    languageOfInstruction: "bilingual",
    studentBody: "Predominantly local Cypriot with some expat intake.",
    why: "A bilingual school serving the Ayia Napa and Paralimni area through to secondary level. One of the more affordable options island-wide. The bilingual model and strong local community make it a good fit for families committed to long-term settlement in the southeast.",
  },
];
