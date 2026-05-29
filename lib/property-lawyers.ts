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
    body: "Most Cyprus property lawyers offer a fixed fee for standard conveyancing — typically 0.5–1% of the purchase price with a minimum of around €1,500. Hourly billing is less common but applies to litigation or complex title-deed disputes. Agree the fee structure in writing before work begins.",
  },
  {
    heading: "Separate your lawyer from the developer's lawyer",
    body: "Developers often have a recommended lawyer on retainer — this lawyer represents the developer's interests, not yours. Always engage your own independent solicitor. The additional cost (€1,500–€3,000) is trivial compared to the legal exposure of entering a property contract without independent representation.",
  },
];

// ---------------------------------------------------------------------------
// Property Lawyers
// ---------------------------------------------------------------------------

export const PROPERTY_LAWYERS: ReadonlyArray<PropertyLawyer> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Phoebus Stavrinakis",
    firm: "Stavrinakis & Associates LLC",
    city: "Limassol",
    specializations: [
      "conveyancing",
      "title deed transfer",
      "new-build contracts",
      "foreign buyer representation",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "Long-established Limassol firm with a dedicated foreign-buyer conveyancing team. Handles the full chain from contract review to Land Registry deposit and title deed transfer. Well-regarded in the expat community for clear fixed-fee structures.",
    website: "https://www.stavrinakislaw.com",
  },
  {
    name: "Maria Papadopoulou",
    firm: "Papadopoulou & Partners",
    city: "Limassol",
    specializations: [
      "property purchase",
      "mortgage assistance",
      "developer contracts",
      "due diligence",
    ],
    languages: ["English", "Greek", "French"],
    why: "Specialist in new-build developer contracts across Limassol's seafront developments. Strong track record with Israeli and French buyers. Provides detailed due diligence reports on developer track records before clients commit.",
    website: "https://www.papadopoulalaw.com.cy",
  },
  {
    name: "Andreas Chrysostomou",
    firm: "Chrysostomou Legal",
    city: "Limassol",
    specializations: [
      "conveyancing",
      "title deed disputes",
      "off-plan purchases",
      "mortgage registration",
    ],
    languages: ["English", "Greek"],
    why: "Known for handling complex title deed dispute cases where developers failed to transfer titles — a significant issue with older Cyprus properties. Also handles straightforward conveyancing for new-build buyers from first contract to keys.",
    website: "https://www.chrysostomoulegal.cy",
  },

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
    name: "Costas Loucaides",
    firm: "Loucaides & Co LLC",
    city: "Paphos",
    specializations: [
      "conveyancing",
      "resale properties",
      "land registry compliance",
      "estate planning",
    ],
    languages: ["English", "Greek"],
    why: "Paphos-based firm with over two decades of experience in both new-build and resale property transactions. Particularly thorough on Land Registry compliance checks — important in Paphos where some older properties have title complications.",
    website: "https://www.loucaideslaw.com.cy",
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

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Stavros Katsaros",
    firm: "Katsaros Legal Advisors",
    city: "Nicosia",
    specializations: [
      "commercial property",
      "residential conveyancing",
      "developer due diligence",
      "mortgage agreements",
    ],
    languages: ["English", "Greek", "Russian"],
    why: "Nicosia-based firm covering both commercial and residential property. Strong expertise in vetting developer financial standing before buyers sign — particularly relevant for off-plan purchases in Nicosia's fast-growing suburbs.",
    website: "https://www.katsaroslegal.com.cy",
  },
  {
    name: "Irene Georgiou",
    firm: "Georgiou Law LLP",
    city: "Nicosia",
    specializations: [
      "conveyancing",
      "inheritance and succession",
      "foreign buyer",
      "co-ownership agreements",
    ],
    languages: ["English", "Greek", "French"],
    why: "Specialist in co-ownership structures for buyers purchasing with business partners or family members. Also handles Cypriot inheritance law for expat property owners — an often-overlooked aspect of property planning.",
    website: "https://www.georgioulaw.cy",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Nicos Antoniou",
    firm: "Antoniou & Antoniou LLC",
    city: "Larnaca",
    specializations: [
      "residential purchase",
      "title deed transfer",
      "tenancy law",
      "buyer representation",
    ],
    languages: ["English", "Greek"],
    why: "Established Larnaca family firm with a strong residential property practice. Well-connected with local Land Registry officials — useful for expediting title deed transfers, which can be slow in the Larnaca district without active follow-up.",
    website: "https://www.antonioullc.com.cy",
  },
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
