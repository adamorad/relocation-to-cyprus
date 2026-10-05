/**
 * Immigration Lawyers section content.
 *
 * Curation: firms whose own website describes immigration services (office
 * address and services quoted from the firm's page, fetched 2026-10-05).
 * Languages, fees and quality are NOT verified; Bar registration is NOT
 * verified. Not an endorsement. This is a directory, not legal advice.
 * always verify current Bar registration and fees directly with the firm.
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
  /** Omitted when not verified on the firm's own site. */
  languages?: string[];
  why: string;
  website?: string;
  /** Editorial verification notes (not rendered). */
  notes?: string;
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
  {
    name: "George K. Konstantinou Law Firm",
    firm: "Office: Gladstonos 55, Roussos Center Point, 5th floor, Office 5E, Limassol 3040",
    city: "Limassol",
    specializations: ["pr-by-investment", "work-permits", "citizenship"],
    why: "Limassol firm whose site lists residency by investment, immigration permits, permanent residence permits, employment rules, citizenship applications and visas.",
    website: "https://gk-lawfirm.com/practice-areas/immigration-law/",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
  {
    name: "A. Georgiou Law Office",
    firm: "Office: 1 Chrysanthou Mylona, Megaro Panayides, 2nd Floor, Office 1, Limassol",
    city: "Limassol",
    specializations: ["citizenship", "family-reunification"],
    why: "Limassol firm whose site lists citizenship applications, immigration permits and family permits, and temporary and permanent residence permits.",
    website: "https://ageorgioulaw.com/immigration-and-citizenship/",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
  {
    name: "Philippou Law Firm (Polycarpos Philippou & Associates LLC)",
    firm: "Office: Onisiforou Center, 2nd & 3rd Floor, 8011 Paphos",
    city: "Paphos",
    specializations: ["pr-by-investment", "citizenship"],
    why: "Paphos firm whose site lists permanent residence by investment, temporary residence, EU residency, EU Blue Card and naturalisation.",
    website: "https://philippoulaw.com/service/immigration/",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
  {
    name: "Andreas Demetriades & Co LLC",
    firm: "Office: Tryfonos Court, Nikolaou I. Nikolaidi Ave 16, 3rd Floor, Paphos 8010",
    city: "Paphos",
    specializations: ["pr-by-investment"],
    why: "Paphos firm whose site lists applications for temporary and permanent residency, including investment-based residency.",
    website: "https://www.demetriadeslaw.com/permanent-residency-programme-immigration-services/",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
  {
    name: "Nicos Papacleovoulou LLC (Cyprus Law Chambers)",
    firm: "Office: 3 Alkiviades Street, 8011 Paphos",
    city: "Paphos",
    specializations: [],
    why: "Paphos firm whose site lists immigration and relocation legal services, including route assessment, document planning and application preparation.",
    website: "https://www.papacleovoulou.com/services-1/immigration-law",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
  {
    name: "George A. Vasiliou LLC",
    firm: "Office: 22 Arch Makarios III Ave., Makaria center, Office 402, 4th Floor, 6017 Larnaca",
    city: "Larnaca",
    specializations: ["work-permits"],
    why: "Larnaca firm whose site lists permanent and temporary residence, employment permits and visas.",
    website: "https://gvasilioulaw.com/legal-practices/immigration/",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
  {
    name: "AK Law Firm",
    firm: "Office: The Square, 33 Konstantinou Palaiologou Street, Larnaca 6036",
    city: "Larnaca",
    specializations: ["work-permits"],
    why: "Larnaca firm whose site lists applications for immigration permits, permanent residence permits and visas, and work authorisations.",
    website: "https://akfirm.law/services/immigration-services/",
    notes: "Office and services quoted from the firm's own page, fetched 2026-10-05. Bar registration UNVERIFIED. Languages and fees UNVERIFIED.",
  },
];
