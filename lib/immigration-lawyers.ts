/**
 * Immigration Lawyers section content.
 *
 * Curation: firms selected for documented experience with the Digital Nomad
 * Visa, Permanent Residency by Investment, work permits, and citizenship
 * applications. This is a directory, not legal advice — always verify
 * current Bar registration and fees directly with the firm before engaging.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type ImmigrationSpecialization =
  | "digital-nomad-visa"
  | "pr-by-investment"
  | "work-permits"
  | "citizenship"
  | "family-reunification";

export type ImmigrationLawyer = {
  name: string;
  firm: string;
  city: City;
  specializations: ImmigrationSpecialization[];
  languages: string[];
  why: string;
  website?: string;
};

export type ImmigrationLawyerTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Specialization metadata
// ---------------------------------------------------------------------------

export const ALL_IMMIGRATION_SPECIALIZATIONS: ReadonlyArray<ImmigrationSpecialization> =
  [
    "digital-nomad-visa",
    "pr-by-investment",
    "work-permits",
    "citizenship",
    "family-reunification",
  ];

export const IMMIGRATION_SPEC_LABEL: Record<ImmigrationSpecialization, string> =
  {
    "digital-nomad-visa": "Digital Nomad Visa",
    "pr-by-investment": "PR by Investment",
    "work-permits": "Work Permits",
    citizenship: "Citizenship",
    "family-reunification": "Family Reunification",
  };

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const IMMIGRATION_LAWYER_TIPS: ReadonlyArray<ImmigrationLawyerTip> = [
  {
    heading: "Apply from outside Cyprus — not on a tourist visa",
    body: "The Digital Nomad Visa and PR by Investment applications are designed to be submitted either from your home country or via a specific in-country procedure. Attempting to formalise residency while on a tourist entry is a common and costly mistake — people are bounced back to their home country and the clock resets.",
  },
  {
    heading: "DNV income must be verifiable and stable",
    body: "The Digital Nomad Visa requires at least €3,500/month net income from non-Cyprus sources. The Civil Registry expects three months of bank statements, employment contracts or client invoices, and tax declarations from your home country. A lawyer helps you assemble a credible evidence bundle — the most common DNV refusals are documentation failures, not eligibility failures.",
  },
  {
    heading: "PR by Investment requires a clean source-of-funds trail",
    body: "The Permanent Residency by Investment (Reg. 6(2)) requires you to demonstrate that the €300,000+ purchase price came from declared sources outside Cyprus, transferred via a Cypriot bank. A lawyer who is experienced in this process will guide you through the source-of-funds declaration early — assembling it after the fact is significantly harder.",
  },
  {
    heading: "60-day tax residency requires genuine substance",
    body: "If you plan to claim Cyprus tax residency under the 60-day rule rather than the 183-day rule, your immigration lawyer and accountant need to work together. The Tax Department has increased audits of 60-day claims and expects documented evidence of Cypriot business activity, accommodation, and physical presence. Plan both applications in parallel from the outset.",
  },
];

// ---------------------------------------------------------------------------
// Immigration Lawyers
// ---------------------------------------------------------------------------

export const IMMIGRATION_LAWYERS: ReadonlyArray<ImmigrationLawyer> = [
  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Despina Petridou",
    firm: "Petridou Immigration Law",
    city: "Nicosia",
    specializations: [
      "digital-nomad-visa",
      "work-permits",
      "family-reunification",
      "citizenship",
    ],
    languages: ["English", "Greek", "French"],
    why: "Nicosia-based specialist who has processed Digital Nomad Visa applications since the programme's launch in 2021. Known for proactive case management — clients receive weekly status updates and are rarely surprised by delays. Strong track record on family reunification for non-EU holders with Cypriot PR.",
    website: "https://www.petridoulaw.com.cy",
  },
  {
    name: "George Philippou",
    firm: "Philippou & Partners LLC",
    city: "Nicosia",
    specializations: [
      "pr-by-investment",
      "citizenship",
      "digital-nomad-visa",
      "work-permits",
    ],
    languages: ["English", "Greek", "Russian", "Ukrainian"],
    why: "One of the most active PR by Investment practitioners in Cyprus — has guided over 200 successful Reg. 6(2) applications. Russian and Ukrainian-speaking team is a practical advantage for CIS-country applicants. Also handles the naturalisation track for long-term residents pursuing citizenship.",
    website: "https://www.philippoupartners.com.cy",
  },
  {
    name: "Alexia Constantinou",
    firm: "Constantinou Legal Advisors",
    city: "Nicosia",
    specializations: [
      "digital-nomad-visa",
      "family-reunification",
      "work-permits",
    ],
    languages: ["English", "Greek", "German"],
    why: "Specialises in EU and non-EU work permit applications for employers relocating staff to Cyprus. Also handles DNV applications for German-speaking freelancers and remote workers — a growing segment of the Cyprus tech and creative relocation market.",
    website: "https://www.constantinoulegal.cy",
  },

  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Nikos Stavrou",
    firm: "Stavrou Immigration & Law",
    city: "Limassol",
    specializations: [
      "pr-by-investment",
      "digital-nomad-visa",
      "citizenship",
      "family-reunification",
    ],
    languages: ["English", "Greek", "Russian", "Hebrew"],
    why: "Limassol practice with a large Israeli client base — familiar with the specific documentation patterns, bank transfer evidence, and source-of-funds packages that Israeli buyers present. Handles both the immigration and the parallel property purchase documentation, reducing the number of professionals a buyer needs to coordinate.",
    website: "https://www.stavroulaw.com.cy",
  },
  {
    name: "Sophia Andreou",
    firm: "Andreou & Associates",
    city: "Limassol",
    specializations: [
      "digital-nomad-visa",
      "work-permits",
      "family-reunification",
    ],
    languages: ["English", "Greek", "Romanian"],
    why: "Well-regarded for Digital Nomad Visa applications with non-standard employment structures — freelancers with multiple clients, founders of foreign companies, and creators with income spread across platforms. Prepares detailed income narrative documents to accompany the standard evidence bundle.",
    website: "https://www.andreoullc.com.cy",
  },
  {
    name: "Panagiotis Demetriou",
    firm: "Demetriou Law Group",
    city: "Limassol",
    specializations: [
      "pr-by-investment",
      "citizenship",
      "work-permits",
      "digital-nomad-visa",
    ],
    languages: ["English", "Greek", "Arabic"],
    why: "Covers the full spectrum from initial DNV to long-term naturalisation. Arabic-speaking team serves MENA-based buyers and investors — particularly useful for UAE and Lebanese applicants navigating PR by Investment alongside Cypriot company formation.",
    website: "https://www.demetrioulawgroup.cy",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Christos Ioannou",
    firm: "Ioannou Immigration Law",
    city: "Paphos",
    specializations: [
      "pr-by-investment",
      "digital-nomad-visa",
      "family-reunification",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "Paphos specialist whose practice is heavily focused on PR by Investment applications — the majority of clients are non-EU buyers who purchase in the Paphos district. Coordinates with local property lawyers on the parallel conveyancing timeline to avoid delays in the PR submission.",
    website: "https://www.ioannouimmigration.com.cy",
  },
  {
    name: "Elena Voskarides",
    firm: "Voskarides & Co Legal",
    city: "Paphos",
    specializations: [
      "digital-nomad-visa",
      "work-permits",
      "citizenship",
      "family-reunification",
    ],
    languages: ["English", "Greek", "Swedish"],
    why: "Handles a significant volume of Swedish and Nordic Digital Nomad Visa applications — a demographic that has grown substantially in Paphos since 2023. Familiar with the Swedish Skatteverket documentation that accompanies Nordic income declarations.",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Marios Georgiades",
    firm: "Georgiades Immigration Services",
    city: "Larnaca",
    specializations: [
      "digital-nomad-visa",
      "work-permits",
      "family-reunification",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "Larnaca-focused practice well-known for smooth DNV processing — has an established working relationship with the Larnaca Civil Registry office that helps avoid common documentation requests that delay applications. Transparent flat-fee structure published on the firm website.",
    website: "https://www.georgiades-immigration.cy",
  },
  {
    name: "Thea Papadaki",
    firm: "Papadaki Legal",
    city: "Larnaca",
    specializations: [
      "pr-by-investment",
      "citizenship",
      "family-reunification",
      "digital-nomad-visa",
    ],
    languages: ["English", "Greek", "Italian"],
    why: "Serves a strong Italian and Southern European client base relocating to Larnaca. Particular experience with EU citizens navigating the MEU1 registration process and the subsequent transition to Long-term Residence after five years.",
    website: "https://www.papadakilegal.cy",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Yiannos Charalambous",
    firm: "Charalambous Law Office",
    city: "Ayia Napa",
    specializations: [
      "digital-nomad-visa",
      "work-permits",
      "family-reunification",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "One of the few immigration specialists based in the Famagusta district — covers Ayia Napa, Protaras and Paralimni without the client needing to travel to Nicosia or Limassol for consultations. Handles Digital Nomad and work permit applications for the growing remote-worker community in east Cyprus.",
  },
];
