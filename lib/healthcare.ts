/**
 * Healthcare section content. Its former panel component is archived in archive/homepage-map/.
 *
 * Venues without a recorded source were removed (REA-120). Prices and
 * availability change; always verify directly with the venue.
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
  /** Participates in the public GeSY system; omitted when not verified */
  gesyAccepted?: boolean;
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
    body: "GeSY (the national health system) is funded by contributions and has low co-payments, for example €6 per specialist visit, €10 per A&E visit and €1 per prescribed item, capped at €150 a year per person (€75 for under-21s and some low-income groups). Private clinics set their own fees; ask before booking. Waiting times for some specialists can be longer in the public system than in private care.",
  },
  {
    heading: "Register for GeSY on arrival",
    body: "Registration is done through the GeSY portal at gesy.org.cy. Check the registration page there for the current requirements.",
  },
  {
    heading: "English-speaking doctors",
    body: "Most private hospital staff speak English fluently, and it's the default working language in private healthcare. GP clinics vary: some are entirely English-speaking, others mix Greek and English. Always check before booking.",
  },
  {
    heading: "Dental savings",
    body: "Indicative dental prices from provider quotes: a routine clean runs €60–80, a composite filling €80–120, and a dental implant €800–1,200. Prices vary by clinic; ask for a written quote before treatment.",
  },
  {
    heading: "Health insurance for Cyprus",
    body: "Check the insurer's policy schedule for Cyprus coverage and get quotes before arriving. If you are employed in Cyprus, GeSY contributions are deducted from salary, so factor this into your net-pay calculations.",
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
    englishSpoken: true,
    why: "Private hospital in Limassol. Check services, insurance acceptance and GeSY participation with the hospital directly.",
    website: "https://www.mediterraneanhospital.com.cy",
  },
  {
    name: "Iasis Hospital",
    city: "Paphos",
    type: "hospital",
    englishSpoken: true,
    why: "Private hospital in Paphos. Check services, insurance acceptance and GeSY participation with the hospital directly.",
    website: "https://www.iasishospital.com",
  },

  // ── Public Hospitals (GeSY) ──────────────────────────────────────────────
  {
    name: "Limassol General Hospital",
    city: "Limassol",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "The main public hospital for the Limassol district under GeSY. Low co-payment for GeSY beneficiaries (no co-payment for inpatient care, €10 per A&E visit). A&E and most specialist services available. Longer wait times than private but solid infrastructure.",
  },
  {
    name: "Paphos General Hospital",
    city: "Paphos",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "Public hospital serving the Paphos district under GeSY. A&E costs €10 per visit; specialist referrals €6 per visit. Recommended for non-urgent specialist consultations where the wait time is acceptable.",
  },
  {
    name: "Larnaca General Hospital",
    city: "Larnaca",
    type: "hospital",
    gesyAccepted: true,
    englishSpoken: true,
    why: "Public hospital for the Larnaca district. GeSY-registered patients pay minimal co-payments. Functional and well-staffed for routine care and emergencies.",
  },

  // ── Specialist ───────────────────────────────────────────────────────────
  {
    name: "German Oncology Centre",
    city: "Limassol",
    type: "specialist",
    specialty: "Oncology",
    englishSpoken: true,
    why: "Private oncology centre in Limassol. Contact the centre directly for services and fees.",
    website: "https://www.germanoncology.com.cy",
  },
  {
    name: "Kypros Fertility Clinic",
    city: "Limassol",
    type: "specialist",
    specialty: "Fertility",
    englishSpoken: true,
    why: "Fertility clinic in Limassol. Contact the clinic directly for services and fees.",
    website: "https://www.kypros.org",
  },
];
