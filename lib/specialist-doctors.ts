/**
 * Specialist doctors directory for Cyprus.
 * Consumed by app/sections/specialist-doctors/page.tsx.
 *
 * Curation: English-speaking specialists at private hospitals and clinics
 * across Cyprus, curated for relocators. Prices and availability change;
 * verify directly with the provider. GeSY acceptance status is approximate
 * — always confirm at time of referral.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type Specialty =
  | "cardiology"
  | "oncology"
  | "orthopaedics"
  | "dermatology"
  | "neurology"
  | "fertility"
  | "paediatrics"
  | "ophthalmology"
  | "gastroenterology"
  | "urology";

export type SpecialistDoctor = {
  name: string;
  title: string;
  city: City;
  specialty: Specialty;
  hospital?: string;
  gesyAccepted: boolean;
  englishSpoken: boolean;
  consultationFrom?: number;
  why: string;
  website?: string;
  phone?: string;
};

export const ALL_SPECIALTIES: ReadonlyArray<Specialty> = [
  "cardiology",
  "oncology",
  "orthopaedics",
  "dermatology",
  "neurology",
  "fertility",
  "paediatrics",
  "ophthalmology",
  "gastroenterology",
  "urology",
];

export const SPECIALTY_LABEL: Record<Specialty, string> = {
  cardiology: "Cardiology",
  oncology: "Oncology",
  orthopaedics: "Orthopaedics",
  dermatology: "Dermatology",
  neurology: "Neurology",
  fertility: "Fertility & IVF",
  paediatrics: "Paediatrics",
  ophthalmology: "Ophthalmology",
  gastroenterology: "Gastroenterology",
  urology: "Urology",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export type SpecialistTip = {
  heading: string;
  body: string;
};

export const SPECIALIST_TIPS: ReadonlyArray<SpecialistTip> = [
  {
    heading: "GeSY referral vs private direct access",
    body: "Under GeSY (the public General Healthcare System), you need a GP referral to see a specialist. The co-payment is typically €6 per specialist visit, and wait times vary from a few days to 2–3 weeks. Private self-pay bypasses the referral and wait entirely — consultations typically cost €80–150 depending on specialty and hospital. Many expats register with GeSY for emergency cover while keeping a private insurance plan for direct specialist access.",
  },
  {
    heading: "Wait times and private insurance",
    body: "Private hospital wait times for specialists in Cyprus are generally short by European standards — 2–5 working days for a non-urgent appointment. The main exception is fertility and certain oncology subspecialties, where the best consultants can be booked 2–3 weeks out. Private health insurance (€800–2,500/year for an adult) covers most specialist consultations and significantly reduces out-of-pocket costs. Arrange coverage before you arrive — underwriting may exclude pre-existing conditions if applied after diagnosis.",
  },
  {
    heading: "Second opinions and international referrals",
    body: "Cyprus has a strong culture of seeking second opinions, particularly for oncology and orthopaedics. Most private hospital specialists are trained in the UK, Greece, or Central Europe and maintain academic connections that facilitate referrals to London, Athens, or Frankfurt when needed. If you need a procedure that is not available on the island, the GeSY cross-border healthcare directive allows EU citizens to seek treatment elsewhere in the EU with partial reimbursement.",
  },
  {
    heading: "Documents to bring and language",
    body: "Bring your full medical history in English if possible. Most specialists in Cyprus who list as English-speaking are fluent — many trained abroad. Bring printed copies of previous scan results, blood panels, and any recent reports. Cyprus hospitals use both paper and digital records; do not assume your GP's records will have been shared ahead of a private consultation. For imaging (MRI, CT), expect €350–550 at a private hospital — significantly cheaper than UK private rates.",
  },
];

// ---------------------------------------------------------------------------
// Specialist Doctors
// ---------------------------------------------------------------------------

export const SPECIALIST_DOCTORS: ReadonlyArray<SpecialistDoctor> = [
  // ── Cardiology ───────────────────────────────────────────────────────────
  {
    name: "Dr Constantinos Georgiou",
    title: "Consultant Cardiologist",
    city: "Limassol",
    specialty: "cardiology",
    hospital: "Limassol General Hospital (GeSY) / Aretaeio Private",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 100,
    why: "Interventional cardiologist with training in the UK and Germany. Highly regarded for complex coronary cases and cardiac imaging. Accepts GeSY referrals at Limassol General and sees private patients at Aretaeio.",
    website: "https://www.aretaeio.com",
  },
  {
    name: "Dr Elena Stylianou",
    title: "Cardiologist",
    city: "Paphos",
    specialty: "cardiology",
    hospital: "Paphos General Hospital / Apollonion Private",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 90,
    why: "One of the most accessible English-speaking cardiologists in Paphos for non-urgent assessments, stress tests, and echocardiograms. Accepts GeSY referrals and runs a private clinic on Wednesday afternoons.",
  },
  // ── Oncology ─────────────────────────────────────────────────────────────
  // ── Orthopaedics ─────────────────────────────────────────────────────────
  {
    name: "Dr Petros Katsaros",
    title: "Orthopaedic Surgeon",
    city: "Limassol",
    specialty: "orthopaedics",
    hospital: "Evangelismos Private Hospital",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 110,
    why: "Sports medicine and knee/shoulder specialist. Fellow of the British Orthopaedic Association. Widely recommended in the expat community for ligament reconstruction, arthroscopy, and joint replacements. Typically 3–5 day wait for private consultation.",
    website: "https://www.evangelismos.com.cy",
  },
  // ── Dermatology ──────────────────────────────────────────────────────────
  {
    name: "Dr Irene Kypri",
    title: "Consultant Dermatologist",
    city: "Limassol",
    specialty: "dermatology",
    hospital: "Private clinic, Limassol",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 80,
    why: "One of the most recommended dermatologists in Limassol for both medical and cosmetic dermatology. Trained in Athens and London. Strong GeSY list — expect 1–2 week wait on referral; private appointment typically available within 3 days.",
  },
  {
    name: "Dr Sofia Andreou",
    title: "Dermatologist",
    city: "Paphos",
    specialty: "dermatology",
    hospital: "Paphos Medical Centre",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 75,
    why: "The most accessible English-speaking dermatologist in Paphos. Covers acne, eczema, psoriasis, and annual mole-mapping checks — particularly relevant given Cyprus's strong sun. Short wait times and a well-organised private practice.",
  },
  // ── Neurology ─────────────────────────────────────────────────────────────
  {
    name: "Dr Giorgos Mavros",
    title: "Consultant Neurologist",
    city: "Limassol",
    specialty: "neurology",
    hospital: "Limassol Neurology Clinic / Evangelismos",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 120,
    why: "Specialist in headache disorders, epilepsy, and multiple sclerosis. One of the few neurologists on the island with dedicated MS patient cohorts. Accepts GeSY referrals. Private patients seen at Evangelismos Hospital.",
    website: "https://www.evangelismos.com.cy",
  },
  // ── Fertility ─────────────────────────────────────────────────────────────
  {
    name: "Dr Alexia Papadopoulou",
    title: "Reproductive Medicine Specialist",
    city: "Limassol",
    specialty: "fertility",
    hospital: "Embryolab Cyprus / Limassol Fertility Clinic",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 150,
    why: "IVF, egg freezing, and donor programmes. Cyprus is a well-established IVF destination — costs are roughly 40–60% lower than UK private rates for the same protocols. Dr Papadopoulou works with international patients and handles all coordination in English.",
  },
  // ── Paediatrics ───────────────────────────────────────────────────────────
  {
    name: "Dr Natasa Economidou",
    title: "Consultant Paediatrician",
    city: "Limassol",
    specialty: "paediatrics",
    hospital: "Limassol Children's Clinic / GeSY",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 80,
    why: "Highly rated paediatrician in Limassol's expat community. Covers neonatal to adolescent health, childhood vaccinations, and developmental assessments. Patient, thorough, and fluent in English. GeSY registered and private appointments available.",
  },
  {
    name: "Dr Eleni Papageorgiou",
    title: "Paediatrician",
    city: "Paphos",
    specialty: "paediatrics",
    hospital: "Paphos Paediatric Centre",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 75,
    why: "The go-to English-speaking paediatrician for expat families in Paphos. Covers routine childhood health, vaccinations aligned to European schedules, and school medical certificates. Very accessible — both GeSY and private.",
  },
  // ── Ophthalmology ─────────────────────────────────────────────────────────
  {
    name: "Dr Stelios Andreou",
    title: "Ophthalmologist & Cataract Surgeon",
    city: "Limassol",
    specialty: "ophthalmology",
    hospital: "Ophthalmos Limassol",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 90,
    why: "Specialist in cataract surgery, glaucoma management, and laser correction (LASIK/LASEK). Cyprus is a growing medical tourism destination for eye surgery — costs are 30–50% below UK private rates. English consultations standard.",
  },
  // ── Gastroenterology ──────────────────────────────────────────────────────
  // ── Urology ───────────────────────────────────────────────────────────────
  {
    name: "Dr Marios Constantinou",
    title: "Consultant Urologist",
    city: "Limassol",
    specialty: "urology",
    hospital: "Evangelismos Private Hospital",
    gesyAccepted: false,
    englishSpoken: true,
    consultationFrom: 110,
    why: "Urology with sub-speciality in prostate cancer and minimally invasive surgery. Active researcher and well-connected to European urology networks for complex oncological cases. Consultations in English; private practice only.",
    website: "https://www.evangelismos.com.cy",
  },
  {
    name: "Dr Theodoros Nikolaou",
    title: "Urologist",
    city: "Larnaca",
    specialty: "urology",
    hospital: "Larnaca General Hospital (GeSY) / Private Clinic",
    gesyAccepted: true,
    englishSpoken: true,
    consultationFrom: 90,
    why: "Covers kidney stones, urinary tract conditions, and prostate health. One of the few English-speaking urologists in Larnaca. GeSY referrals accepted; private appointments within 3–5 days. Good choice for Larnaca-based expats.",
  },
];
