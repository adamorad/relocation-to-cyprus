/**
 * Healthcare section content. Consumed by components/HealthcarePanel.tsx.
 *
 * Curation: venues selected for relevance to relocators — English-speaking
 * staff, GeSY participation, and suitability for expat healthcare needs.
 * Prices and availability change; always verify directly with the venue.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type HealthcareType =
  | "hospital"
  | "gp-clinic"
  | "dental"
  | "specialist"
  | "pharmacy";

export type HealthcareVenue = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: HealthcareType;
  /** For specialist type, e.g. "Oncology", "Cardiology" */
  specialty?: string;
  /** Participates in the public GeSY system */
  gesyAccepted: boolean;
  englishSpoken: boolean;
  /** Starting consultation fee in EUR */
  consultationFrom?: number;
  /** Editorial 2-3 sentences */
  why: string;
  phone?: string;
  website?: string;
};

export type HealthcareTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Type metadata
// ---------------------------------------------------------------------------

export const ALL_HEALTHCARE_TYPES: ReadonlyArray<HealthcareType> = [
  "hospital",
  "gp-clinic",
  "dental",
  "specialist",
  "pharmacy",
];

export const HEALTHCARE_TYPE_LABEL: Record<HealthcareType, string> = {
  hospital: "Hospital",
  "gp-clinic": "GP Clinic",
  dental: "Dental",
  specialist: "Specialist",
  pharmacy: "Pharmacy",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export const HEALTHCARE_TIPS: ReadonlyArray<HealthcareTip> = [
  {
    heading: "GeSY vs private: the decision framework",
    body: "GeSY (the national health system) is free but slower; private clinics are faster and typically €15–50 per consultation. Most expats use both: GeSY for routine and non-urgent care, private for faster access and specialist appointments. The combination gives you full coverage without paying twice for everything.",
  },
  {
    heading: "Register for GeSY on arrival",
    body: "Registering for GeSY costs nothing and provides emergency coverage even if you already have private international insurance. Do it within the first weeks of arriving — you'll need your ARC (Alien Registration Certificate) and a Cypriot tax number (TIC). Registration is done online at the GeSY portal.",
  },
  {
    heading: "English-speaking doctors",
    body: "Most private hospital staff speak English fluently — it's the default working language in private healthcare. GP clinics vary: some are entirely English-speaking, others mix Greek and English. Always check before booking. The venues listed here have been confirmed as English-friendly.",
  },
  {
    heading: "Dental savings",
    body: "Dental costs in Cyprus are 40–60% lower than in the UK or Germany. A routine clean runs €60–80, a composite filling €80–120, and a dental implant €800–1,200 (versus £2,000–3,000 in the UK). Many relocators specifically plan dental work around their first year in Cyprus.",
  },
  {
    heading: "Health insurance for Cyprus",
    body: "International health plans from AXA, Bupa, Cigna, and Allianz all cover Cyprus. Get quotes before arriving — pre-existing conditions are easier to include on a new policy than added later. Note: if you're employed in Cyprus, GeSY contributions (2.65% of salary) are deducted at source, so factor this into your net-pay calculations.",
  },
];

// ---------------------------------------------------------------------------
// Healthcare venues
// ---------------------------------------------------------------------------

export const HEALTHCARE_VENUES: ReadonlyArray<HealthcareVenue> = [
  // ── Private Hospitals ────────────────────────────────────────────────────
  {
    name: "Mediterranean Hospital",
    city: "Limassol",
    type: "hospital",
    gesyAccepted: false,
    englishSpoken: true,
    why: "Full A&E, maternity, cardiology, and oncology. The main private hospital used by expats in Limassol. English-speaking staff throughout. Most international insurance accepted. Emergency walk-ins possible without appointment.",
    website: "https://www.mediterraneanhospital.com.cy",
  },
  {
    name: "Apollonion Private Hospital",
    city: "Nicosia",
    type: "hospital",
    gesyAccepted: false,
    englishSpoken: true,
    why: "One of Nicosia's leading private hospitals. Full specialist services, modern imaging, English-speaking consultants. Commonly used by the diplomatic and business community in the capital.",
    website: "https://www.apollonion.com",
  },
  {
    name: "Aretaeion Hospital",
    city: "Nicosia",
    type: "hospital",
    gesyAccepted: false,
    englishSpoken: true,
    why: "Established private hospital in central Nicosia. Strong cardiology and surgical departments. Accepts most international health insurance plans.",
    website: "https://www.aretaeio.com",
  },
  {
    name: "Iasis Hospital",
    city: "Paphos",
    type: "hospital",
    gesyAccepted: false,
    englishSpoken: true,
    why: "The main private hospital serving the Paphos district. Full A&E, maternity, and most specialist services. Conveniently close to Paphos city centre.",
    website: "https://www.iasishospital.com",
  },

  // ── Public Hospitals (GeSY) ──────────────────────────────────────────────
  {
    name: "Limassol General Hospital",
    city: "Limassol",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "The main public hospital for the Limassol district under GeSY. Free or low-cost for registered GeSY users. A&E and most specialist services available. Longer wait times than private but solid infrastructure.",
  },
  {
    name: "Nicosia General Hospital",
    city: "Nicosia",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "The largest public hospital in Cyprus. Full specialist departments. Free for GeSY-registered patients with a GP referral. English spoken in most departments.",
    website: "https://www.moh.gov.cy",
  },
  {
    name: "Paphos General Hospital",
    city: "Paphos",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "Public hospital serving the Paphos district under GeSY. Free A&E and most specialist referrals for registered users. Recommended for non-urgent specialist consultations where the wait time is acceptable.",
  },
  {
    name: "Larnaca General Hospital",
    city: "Larnaca",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "Public hospital for the Larnaca district. GeSY-registered patients pay minimal co-payments. Functional and well-staffed for routine care and emergencies.",
  },

  // ── GP Clinics ───────────────────────────────────────────────────────────
  {
    name: "Limassol Medical Centre",
    city: "Limassol",
    type: "gp-clinic",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 25,
    why: "Multi-doctor GP practice in central Limassol. GeSY registered — free or minimal co-payment for registered patients. English-speaking GPs. Good for families needing a regular family doctor.",
  },
  {
    name: "Paphos Medical Centre",
    city: "Paphos",
    type: "gp-clinic",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 25,
    why: "Established GP group practice in Paphos. GeSY registered. English-speaking doctors familiar with expat patient profiles. Reasonable wait times outside summer peak.",
  },
  {
    name: "Nicosia Family Clinic",
    city: "Nicosia",
    type: "gp-clinic",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 30,
    why: "Central Nicosia GP practice. GeSY registered. Multilingual staff. Good for professionals needing a reliable GP in the capital without travelling to a hospital.",
  },
  {
    name: "Larnaca Clinic",
    city: "Larnaca",
    type: "gp-clinic",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 20,
    why: "Well-regarded GP clinic in Larnaca city centre. GeSY registered. English-speaking. Efficient appointment booking.",
  },

  // ── Dental ───────────────────────────────────────────────────────────────
  {
    name: "Dental Excellence Limassol",
    city: "Limassol",
    type: "dental",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 60,
    why: "Modern dental practice in Limassol with English-speaking dentists. Full range of treatments. Prices 40–50% below UK equivalents. Routine clean €60–80, composite filling €80–120. Commonly recommended by expat community.",
  },
  {
    name: "Paphos Dental Clinic",
    city: "Paphos",
    type: "dental",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 55,
    why: "Established dental practice in Kato Paphos. English-speaking. Competitive pricing. Implant work at half the cost of UK private dentists. Popular with long-stay expats for all dental needs.",
  },
  {
    name: "Smile Dental Nicosia",
    city: "Nicosia",
    type: "dental",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 60,
    why: "City-centre Nicosia dental clinic. English-speaking dentists, modern equipment. Strong reputation in the professional expat community.",
  },
  {
    name: "Larnaca Dental Studio",
    city: "Larnaca",
    type: "dental",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 50,
    why: "Affordable dental care in Larnaca. English-speaking staff. Routine work and cosmetic treatments at significantly lower prices than Western Europe.",
  },

  // ── Specialist ───────────────────────────────────────────────────────────
  {
    name: "German Oncology Centre",
    city: "Nicosia",
    type: "specialist",
    specialty: "Oncology",
    gesyAccepted: false,
    englishSpoken: true,
    why: "Cyprus's leading private oncology centre, affiliated with German Cancer Research Center protocols. Attracts patients from across the region. Important for expats with cancer history or ongoing treatment needs.",
    website: "https://www.germanoncology.com.cy",
  },
  {
    name: "Heart Institute",
    city: "Limassol",
    type: "specialist",
    specialty: "Cardiology",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 80,
    why: "Dedicated cardiology centre in Limassol. Full cardiac diagnostics, stress testing, and intervention. Used by the Four Seasons and Mediterranean Hospital as a referral destination.",
  },
  {
    name: "Kypros Fertility Clinic",
    city: "Limassol",
    type: "specialist",
    specialty: "Fertility",
    gesyAccepted: false,
    englishSpoken: true,
    why: "One of Cyprus's leading fertility clinics. Well-regarded for IVF. Cyprus is a destination for fertility treatment tourism given EU standards at significantly lower cost than the UK or Germany.",
    website: "https://www.kypros.org",
  },

  // ── Pharmacy ─────────────────────────────────────────────────────────────
  {
    name: "Pharmacy Savvidis",
    city: "Limassol",
    type: "pharmacy",
    gesyAccepted: true,
    englishSpoken: true,
    why: "Large central Limassol pharmacy. GeSY registered — subsidised prescriptions for registered patients. Wide stock including many medications available over-the-counter that require a prescription elsewhere in Europe.",
  },
];
