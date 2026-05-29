/**
 * Veterinary services directory for Cyprus.
 * Consumed by app/sections/veterinary-services/page.tsx.
 *
 * Curation: English-friendly vet clinics with coverage across all major
 * cities. Emergency and 24h availability noted where confirmed. Verify
 * opening hours and on-call arrangements directly — these change.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type VetService =
  | "routine"
  | "emergency"
  | "specialist"
  | "dentistry"
  | "exotic";

export type VetClinic = {
  name: string;
  city: City;
  neighbourhood?: string;
  services: VetService[];
  englishSpoken: boolean;
  emergency24h: boolean;
  why: string;
  phone?: string;
  website?: string;
};

export const ALL_VET_SERVICES: ReadonlyArray<VetService> = [
  "routine",
  "emergency",
  "specialist",
  "dentistry",
  "exotic",
];

export const VET_SERVICE_LABEL: Record<VetService, string> = {
  routine: "Routine Care",
  emergency: "Emergency",
  specialist: "Specialist",
  dentistry: "Dental",
  exotic: "Exotic Animals",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export type VetTip = {
  heading: string;
  body: string;
};

export const VET_TIPS: ReadonlyArray<VetTip> = [
  {
    heading: "Get pet insurance before you arrive",
    body: "Pet insurance in Cyprus is available from providers including Interamerican, CNP Cyprialife, and international pet insurers (Petplan, Many Pets). Premiums for a dog run €300–700/year depending on breed, age, and coverage level. Critically, pre-existing conditions diagnosed before the policy starts will be excluded — so insure your pet before the first Cyprus vet visit, not after. Emergency hospitalisation and surgery costs in Cyprus can run €800–2,500+; insurance makes this manageable.",
  },
  {
    heading: "Emergency vet costs and what to expect",
    body: "Out-of-hours emergency vet calls in Cyprus typically attract a call-out fee of €80–150 on top of treatment costs. Overnight monitoring can add €200–400 per night. Complex surgery (broken limb, gastric torsion, foreign body removal) runs €800–2,500 depending on complexity and the clinic. Nicosia has the most comprehensive emergency vet provision; in Paphos and Larnaca, after-hours cover is patchy — keep the number of the nearest 24/7 clinic saved before you need it.",
  },
  {
    heading: "GeSY does not cover pets",
    body: "Cyprus's General Healthcare System covers humans only. There is no public or subsidised veterinary care system — all vet costs are private. Routine annual check-ups and vaccinations typically cost €60–120; dental cleaning under anaesthesia €300–600 depending on the extent of the work. Factor these costs into your relocation budget, particularly if you have multiple pets or an older animal with existing health needs.",
  },
  {
    heading: "Annual vaccinations and pet passport renewal",
    body: "Cyprus requires annual or triennial (depending on manufacturer) rabies vaccinations for dogs and cats. Your Cyprus vet will issue or update your EU pet passport at each vaccination. Keep the passport current — it is your pet's official travel document for any future EU travel and is required for re-entry to most EU countries. If your pet arrived on a non-EU health certificate (e.g., from the UK or Israel), your Cyprus vet will issue a new EU pet passport at the first appointment.",
  },
];

// ---------------------------------------------------------------------------
// Vet Clinics
// ---------------------------------------------------------------------------

export const VET_CLINICS: ReadonlyArray<VetClinic> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Limassol Veterinary Clinic",
    city: "Limassol",
    neighbourhood: "Agios Athanasios",
    services: ["routine", "emergency", "specialist", "dentistry"],
    englishSpoken: true,
    emergency24h: true,
    why: "One of Limassol's most comprehensive veterinary practices. English-speaking staff, full diagnostic suite (ultrasound, digital X-ray, in-house blood lab), specialist consultants visiting regularly, and 24/7 emergency cover. The first recommendation for most expats arriving in Limassol with pets.",
    phone: "+357 25 370 370",
  },
  {
    name: "Animal Care Veterinary Clinic",
    city: "Limassol",
    neighbourhood: "Mesa Geitonia",
    services: ["routine", "emergency", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Well-established Limassol clinic with a strong reputation for routine care, post-operative follow-up, and dental procedures. English-speaking vets throughout. Out-of-hours emergency cover is on-call (call ahead); same-day appointments usually available for routine cases.",
    phone: "+357 25 311 234",
  },
  {
    name: "Petmed Veterinary Centre",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    services: ["routine", "specialist", "exotic"],
    englishSpoken: true,
    emergency24h: false,
    why: "Specialist-led practice covering both small animals and exotic pets (reptiles, birds, small mammals). One of the few clinics in Cyprus with documented experience treating exotic species. Useful for relocators arriving with unusual pets. Good online booking system.",
    website: "https://www.petmedcy.com",
  },
  {
    name: "Dr Elias Clinic",
    city: "Limassol",
    neighbourhood: "Polemidia",
    services: ["routine", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Neighbourhood practice in Polemidia, popular with local expat families for routine check-ups, vaccinations, and preventative dental care. Warm and unhurried consultation style. Limited specialist capability — refers complex cases to Limassol Vet Clinic.",
    phone: "+357 25 395 800",
  },
  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "AniCura Nicosia Veterinary Clinic",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    services: ["routine", "emergency", "specialist", "dentistry"],
    englishSpoken: true,
    emergency24h: true,
    why: "Part of the AniCura European specialist veterinary network. Nicosia's most advanced veterinary facility — digital imaging, endoscopy, orthopaedic surgery, and neurology referral capability. Fluent English throughout. The island's best option for complex surgical and specialist cases.",
    website: "https://www.anicura.com/cy",
    phone: "+357 22 519 900",
  },
  {
    name: "Nicovets Veterinary Centre",
    city: "Nicosia",
    neighbourhood: "Agios Dometios",
    services: ["routine", "emergency", "dentistry"],
    englishSpoken: true,
    emergency24h: true,
    why: "Full-service clinic in west Nicosia with 24/7 emergency cover. Covers all routine care, dentistry, and emergency trauma. English-speaking staff. Well-reviewed by the expat community in Nicosia for responsive emergency service and good after-hours communication.",
    phone: "+357 22 778 800",
  },
  {
    name: "Cyprus Animal Hospital",
    city: "Nicosia",
    neighbourhood: "Latsia",
    services: ["routine", "emergency", "specialist", "dentistry", "exotic"],
    englishSpoken: true,
    emergency24h: true,
    why: "The most comprehensive animal hospital in Cyprus. Visiting orthopaedic, ophthalmology, and oncology specialists. Covers exotic animals including reptiles. ICU facility for post-operative monitoring. International patient coordinator for pets arriving from abroad with complex medical histories.",
    phone: "+357 22 517 999",
  },
  {
    name: "Petropolis Vet",
    city: "Nicosia",
    neighbourhood: "Makedonitissa",
    services: ["routine", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Friendly neighbourhood practice in north Nicosia. Straightforward routine care, vaccinations, dental checks, and prescription refills. Good for straightforward pet care without the wait times of the larger referral hospitals.",
    phone: "+357 22 312 200",
  },
  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos Veterinary Services",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    services: ["routine", "emergency", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "The main recommended English-speaking clinic for expats in Kato Paphos. Covers routine care, dental procedures, and minor emergencies during office hours. Out-of-hours cover is on-call — response time typically 30–60 minutes. First port of call for most pet owners in central Paphos.",
    phone: "+357 26 935 420",
  },
  {
    name: "VetCare Paphos",
    city: "Paphos",
    neighbourhood: "Universal area",
    services: ["routine", "specialist", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Modern clinic with visiting specialists in ophthalmology and orthopaedics (monthly). Well-equipped for diagnostics — digital X-ray and ultrasound on-site. English-speaking throughout. Good choice for clients who want slightly better diagnostics than a basic practice without driving to Limassol.",
    phone: "+357 26 943 170",
  },
  {
    name: "Coral Bay Animal Clinic",
    city: "Paphos",
    neighbourhood: "Coral Bay",
    services: ["routine", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Convenient for expats living in the Coral Bay and Chlorakas areas north of Paphos. Covers routine appointments, vaccinations, and dental check-ups. Small but efficient practice; longer emergency cases referred to Paphos Veterinary Services or Limassol.",
    phone: "+357 26 621 505",
  },
  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca Animal Clinic",
    city: "Larnaca",
    neighbourhood: "Mackenzie area",
    services: ["routine", "emergency", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "The most recommended English-speaking vet clinic in Larnaca among the expat community. Routine care, vaccinations, dentistry, and minor surgery. On-call emergency cover — call the clinic number for after-hours direction. Short waiting times and consistent care.",
    phone: "+357 24 625 600",
  },
  {
    name: "PetPlus Larnaca",
    city: "Larnaca",
    neighbourhood: "Drosia",
    services: ["routine", "exotic", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "One of the few clinics in Larnaca with experience treating exotic animals (birds, tortoises, small mammals). Covers routine small animal care alongside the exotic specialty. Good option for owners of non-standard pets arriving in Cyprus.",
    phone: "+357 24 818 490",
  },
  {
    name: "Larnaca Veterinary Centre",
    city: "Larnaca",
    neighbourhood: "Aradippou",
    services: ["routine", "specialist", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Larger practice covering Larnaca's eastern suburbs. Visiting specialist (orthopaedics, soft tissue surgery) one day per week. Digital X-ray and ultrasound on-site. Good alternative if the Mackenzie clinic has a wait, particularly for surgical referrals.",
    phone: "+357 24 532 500",
  },
  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "East Cyprus Vet",
    city: "Ayia Napa",
    neighbourhood: "Paralimni",
    services: ["routine", "emergency", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "The main English-speaking veterinary practice serving Ayia Napa, Protaras, and the Paralimni area. Covers routine care and emergencies during extended hours. Out-of-hours on-call service — call the main number for direction. The nearest alternative for complex cases is the AniCura network in Nicosia (45 min drive).",
    phone: "+357 23 722 000",
  },
  {
    name: "Famagusta District Animal Clinic",
    city: "Ayia Napa",
    neighbourhood: "Deryneia",
    services: ["routine", "dentistry"],
    englishSpoken: true,
    emergency24h: false,
    why: "Budget-friendly routine care clinic covering the Deryneia and north Famagusta free area. Vaccinations, pet passport updates, and basic dental check-ups. Lower consultation fees than the Nicosia and Limassol clinics. Good for keeping costs down on routine annual care.",
    phone: "+357 23 741 111",
  },
];
