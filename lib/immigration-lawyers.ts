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
    heading: "Apply within three months of arriving in Cyprus",
    body: "A Digital Nomad application is made at the Migration Department's central offices within three months of arriving in Cyprus, entering on a visa only if your nationality needs one. A permanent residence (PR by Investment) application can be lodged in person or through an authorised representative, and lodging it does not give you a right to stay while it is examined.",
  },
  {
    heading: "DNV income must be verifiable and stable",
    body: "The Digital Nomad Visa requires at least €3,500/month net income from non-Cyprus sources. The Migration Department expects three months of bank statements, employment contracts or client invoices, and tax declarations from your home country. A lawyer helps you assemble a credible evidence bundle: the most common DNV refusals are documentation failures, not eligibility failures.",
  },
  {
    heading: "PR by Investment requires a clean source-of-funds trail",
    body: "The Permanent Residency by Investment (Reg. 6(2)) requires you to demonstrate that the €300,000+ purchase price came from declared sources and was transferred to Cyprus from abroad, from your own (or your spouse's) bank account. A lawyer who is experienced in this process will guide you through the source-of-funds declaration early, because assembling it after the fact is significantly harder.",
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

  // ── Limassol ─────────────────────────────────────────────────────────────

  // ── Paphos ────────────────────────────────────────────────────────────────
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
    why: "One of the few immigration specialists based in the Famagusta district. Covers Ayia Napa, Protaras and Paralimni without the client needing to travel to Limassol for consultations. Handles Digital Nomad and work permit applications for the growing remote-worker community in east Cyprus.",
  },
];
