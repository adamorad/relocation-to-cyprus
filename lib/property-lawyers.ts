/**
 * Property Lawyers section content.
 *
 * Curation: firms selected for track record with foreign buyers, English-language
 * service, and coverage of conveyancing, title deed transfers, and mortgage
 * assistance. This is a directory, not legal advice — always verify current Bar
 * registration and fee structures directly with the firm before engaging.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type PropertyLawyer = {
  name: string;
  firm: string;
  city: City;
  specializations: string[];
  languages: string[];
  why: string;
  website?: string;
  phone?: string;
};

export type PropertyLawyerTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Tips for buyers
// ---------------------------------------------------------------------------

export const LAWYER_TIPS: ReadonlyArray<PropertyLawyerTip> = [
  {
    heading: "Verify Cyprus Bar Association registration",
    body: "All practising lawyers in Cyprus must be registered with the Cyprus Bar Association (CBA). Before engaging any property lawyer, confirm their registration at cyprusbar.org. An unregistered practitioner cannot legally sign deeds or appear in court on your behalf.",
  },
  {
    heading: "Escrow is essential — never pay the developer directly",
    body: "Funds for new-build purchases should be held in a lawyer's client account (escrow) until the contract is deposited at the Land Registry. This protects your money if the developer becomes insolvent before completion. Any lawyer who discourages escrow is a red flag.",
  },
  {
    heading: "Understand fixed fee vs hourly billing",
    body: "Fees are not regulated, so they vary. Quotes of around 1% to 1.5% of the price plus 19% VAT, often with a minimum fee, are common. Get two or three written quotes and agree the fee in writing before work starts. Hourly billing is less common but applies to litigation or complex title-deed disputes.",
  },
  {
    heading: "Separate your lawyer from the developer's lawyer",
    body: "Developers often have a recommended lawyer on retainer, and this lawyer represents the developer's interests, not yours. Always engage your own independent solicitor. The cost of your own lawyer is small compared to the legal exposure of entering a property contract without independent representation.",
  },
];

// ---------------------------------------------------------------------------
// Property Lawyers
// ---------------------------------------------------------------------------

export const PROPERTY_LAWYERS: ReadonlyArray<PropertyLawyer> = [
  // ── Limassol ─────────────────────────────────────────────────────────────

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Eleni Nicolaou",
    firm: "Nicolaou Law Office",
    city: "Paphos",
    specializations: [
      "residential conveyancing",
      "foreign buyer representation",
      "PR by investment",
      "contract review",
    ],
    languages: ["English", "Greek", "German"],
    why: "One of Paphos's most recommended property lawyers for UK and German buyers. Handles the Permanent Residency by Investment legal documentation alongside standard conveyancing — useful for buyers pursuing both the property and the PR simultaneously.",
    website: "https://www.nicolaoulaw.com.cy",
  },
  {
    name: "Demetrios Hadjikyriacos",
    firm: "Hadjikyriacos & Associates",
    city: "Paphos",
    specializations: [
      "property purchase",
      "title transfer",
      "foreign national compliance",
      "Council of Ministers approval",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "Handles the Council of Ministers (CoM) approval process required for non-EU nationals purchasing property in Cyprus — a step many buyers overlook. Full-service from CoM application through to title transfer.",
  },


  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Katerina Michaelides",
    firm: "Michaelides Property Law",
    city: "Larnaca",
    specializations: [
      "conveyancing",
      "contract drafting",
      "escrow management",
      "investor support",
    ],
    languages: ["English", "Greek", "Hebrew"],
    why: "Larnaca-based specialist with significant experience serving Israeli relocators — Hebrew-speaking, familiar with Israeli buyers' documentation requirements, and experienced with the bank account and source-of-funds evidence needed for Cypriot property transactions.",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Petros Petrou",
    firm: "Petrou Legal Services",
    city: "Ayia Napa",
    specializations: [
      "holiday home purchase",
      "buy-to-let",
      "tourist zone compliance",
      "resale conveyancing",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "Famagusta district's go-to property lawyer for Ayia Napa and Protaras transactions. Deep knowledge of the tourism zone planning regulations that affect what you can build or modify on east-coast properties. Also handles buy-to-let compliance.",
  },
  {
    name: "Alexandra Stephanou",
    firm: "Stephanou & Co",
    city: "Ayia Napa",
    specializations: [
      "new-build contracts",
      "foreign national purchase",
      "planning permits",
      "short-term rental registration",
    ],
    languages: ["English", "Greek"],
    why: "Covers both the legal purchase and the subsequent short-term rental registration process for buyers who intend to list their Ayia Napa property on Airbnb or Booking.com — a growing compliance requirement in Cyprus's east coast resort zone.",
  },
];
