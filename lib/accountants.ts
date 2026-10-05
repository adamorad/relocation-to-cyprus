/**
 * Accountants & Tax Advisors section content.
 *
 * Curation: firms selected for documented experience with the non-dom regime,
 * expat individual returns, VAT, corporate tax, and crypto tax. This is a
 * directory, not tax advice — always verify ICPAC membership and current fee
 * structures directly with the firm before engaging.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type AccountantSpecialization =
  | "non-dom"
  | "vat"
  | "corporate"
  | "expat-individual"
  | "crypto";

/** Filter values on the page: the five specializations plus registered office providers. */
export type AccountantFilter = AccountantSpecialization | "registered-office";

/**
 * Registered office and company secretary providers. Merged in from the
 * retired /sections/registered-address/ directory (Phase 3A). Every Cyprus
 * company must have a registered office in Cyprus (Companies Law, Cap. 113).
 * Prices are annual fees as of early 2026; verify directly with each provider.
 */
export type RegisteredOfficeProvider = {
  name: string;
  city: City;
  neighbourhood?: string;
  /** Annual fee in EUR, if publicly listed. */
  pricePerYear?: number;
  /** What is included in the package. */
  includes: string[];
  why: string;
  website?: string;
};

export type Accountant = {
  name: string;
  firm: string;
  city: City;
  specializations: AccountantSpecialization[];
  languages: string[];
  why: string;
  website?: string;
};

export type AccountantTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Specialization metadata
// ---------------------------------------------------------------------------

export const ALL_ACCOUNTANT_SPECIALIZATIONS: ReadonlyArray<AccountantSpecialization> =
  ["non-dom", "vat", "corporate", "expat-individual", "crypto"];

export const ACCOUNTANT_SPEC_LABEL: Record<AccountantFilter, string> = {
  "non-dom": "Non-Dom",
  vat: "VAT",
  corporate: "Corporate",
  "expat-individual": "Expat Individual",
  crypto: "Crypto",
  "registered-office": "Registered office",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const ACCOUNTANT_TIPS: ReadonlyArray<AccountantTip> = [
  {
    heading: "Verify ICPAC membership before engaging",
    body: "All qualified accountants practising in Cyprus must be members of the Institute of Certified Public Accountants of Cyprus (ICPAC). Check the firm's membership at icpac.org.cy before signing an engagement letter. An unqualified preparer cannot sign official tax submissions or represent you before the Cyprus Tax Department.",
  },
  {
    heading: "Ask specifically about non-dom application experience",
    body: "Non-domiciled status is not automatic — it must be applied for correctly each year, and the criteria for the 60-day rule are audited more strictly each cycle. When interviewing an accountant, ask how many non-dom returns they filed in the previous tax year and what proportion were subject to Tax Department queries. Experience here is measurable.",
  },
  {
    heading: "Fee ranges: €400–€900/year for an individual non-dom return",
    body: "A standard non-domiciled individual tax return (TD1) with the non-dom declaration runs €400–€900 per year from a reputable firm. Significantly lower quotes suggest either limited experience or that the non-dom declaration is billed separately. Significantly higher suggests premium positioning — confirm what additional services justify the premium.",
  },
  {
    heading: "Register for GeSY and social contributions correctly",
    body: "Cypriot tax residents pay GeSY (healthcare) contributions of 2.65% on most income types including dividends and rental income. Many relocators, advised only on income tax, miss the GeSY registration — and discover a backlog of unpaid contributions at renewal time. Confirm your accountant covers GeSY calculations and registration explicitly.",
  },
  // Registered office (merged from the retired registered-address directory).
  {
    heading: "Registered address is a legal requirement for every Cyprus Ltd",
    body: "Under the Cyprus Companies Law (Cap. 113), every Cyprus-registered company must have a registered office in Cyprus at all times. This is not optional: it is the address recorded at the Registrar of Companies, where official correspondence and legal notices are served. Failure to maintain a valid registered address can lead to the company being struck off. A virtual office or registered address provider satisfies this requirement fully.",
  },
  {
    heading: "Not all providers include mail forwarding: check before signing",
    body: "Many providers include the registered address only (collecting mail for inspection or forwarding is a separate, often paid-extra service). If your company will regularly receive physical correspondence from banks, the tax department or government agencies, confirm that mail scanning and forwarding is included, and ask how quickly mail is forwarded. Some low-cost providers scan and email; others courier a bundle monthly.",
  },
];

// ---------------------------------------------------------------------------
// Accountants
// ---------------------------------------------------------------------------

export const ACCOUNTANTS: ReadonlyArray<Accountant> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Yiannis Papageorgiou",
    firm: "Papageorgiou Tax & Advisory",
    city: "Limassol",
    specializations: ["non-dom", "expat-individual", "corporate", "crypto"],
    languages: ["English", "Greek", "Russian"],
    why: "Limassol-based practice specialising in non-dom applications and crypto tax for high-net-worth relocators. One of the early adopters of crypto tax guidance in Cyprus — has handled classification questions on DeFi income, staking rewards, and NFT disposals at a time when the Tax Department guidance is still evolving. Non-dom annual return fee clearly quoted upfront.",
    website: "https://www.papageorgioutax.com.cy",
  },


  // ── Paphos ────────────────────────────────────────────────────────────────

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Theodora Kyriacou",
    firm: "Kyriacou Tax & Compliance",
    city: "Larnaca",
    specializations: ["non-dom", "crypto", "expat-individual", "corporate"],
    languages: ["English", "Greek", "Arabic"],
    why: "Specialist in non-dom applications combined with crypto asset portfolios. Arabic-speaking team serves MENA relocators with mixed investment income — particularly relevant for UAE and Lebanese buyers who arrive in Cyprus with significant crypto holdings and need a coherent treatment across all asset classes.",
    website: "https://www.kyriakoutax.com.cy",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Giorgos Economou",
    firm: "Economou Accounting Services",
    city: "Ayia Napa",
    specializations: ["expat-individual", "non-dom", "vat"],
    languages: ["English", "Greek", "Russian"],
    why: "One of the few qualified ICPAC accountants based in Ayia Napa, which avoids the need for east-coast residents to travel to Larnaca for routine filings. Handles non-dom individual returns, VAT registration for short-term rental operators, and standard expat compliance for the Famagusta district.",
  },
];

// ---------------------------------------------------------------------------
// Registered office providers (merged from /sections/registered-address/)
// ---------------------------------------------------------------------------

export const REGISTERED_OFFICE_PROVIDERS: ReadonlyArray<RegisteredOfficeProvider> =
  [
    // ── Limassol ───────────────────────────────────────────────────────────
    {
      name: "Totalserve Management Ltd",
      city: "Limassol",
      neighbourhood: "Limassol business district",
      pricePerYear: 350,
      includes: [
        "Registered office address",
        "Mail receipt and forwarding",
        "Company secretary",
        "Director services available",
      ],
      why: "One of Cyprus's most established corporate service providers, with a full range of company formation, registered office and ongoing compliance services. Well-recognised address for international counterparties.",
      website: "https://www.totalserve.eu",
    },
    {
      name: "Elias Neocleous & Co LLC",
      city: "Limassol",
      neighbourhood: "Limassol seafront",
      pricePerYear: 500,
      includes: [
        "Registered office address",
        "Full secretarial services",
        "Legal and tax advisory access",
        "Mail and courier handling",
      ],
      why: "One of Cyprus's largest law and corporate services firms. Their registered office service comes with integrated access to legal, tax and banking introduction services, worth the premium for complex structures.",
      website: "https://www.neocleous.com",
    },
    {
      name: "BDO Cyprus",
      city: "Limassol",
      neighbourhood: "Limassol centre",
      pricePerYear: 450,
      includes: [
        "Registered office address",
        "Company secretary",
        "Accounting and audit available",
        "Tax compliance advisory",
      ],
      why: "Global Big Four-adjacent firm (BDO network). Suitable for companies that want accounting, audit and registered office under one roof. Premium pricing reflects full professional services access.",
      website: "https://www.bdo.com.cy",
    },


    // ── Paphos ─────────────────────────────────────────────────────────────
    {
      name: "Paphos Corporate Services",
      city: "Paphos",
      neighbourhood: "Paphos town",
      pricePerYear: 220,
      includes: [
        "Registered office address",
        "Mail forwarding",
        "Company filing assistance",
      ],
      why: "Reliable registered address provider in Paphos, suitable for companies whose founders are based in the Paphos area and prefer a locally managed service. Smaller client base means faster personal response.",
    },

    // ── Larnaca ────────────────────────────────────────────────────────────
    {
      name: "LCA Business Services",
      city: "Larnaca",
      neighbourhood: "Larnaca city centre",
      pricePerYear: 200,
      includes: [
        "Registered office address",
        "Mail receipt and forwarding",
        "VAT registration assistance",
      ],
      why: "Larnaca-based corporate services firm with competitive pricing. Useful for companies tied to Larnaca Airport, logistics, or shipping sectors. Includes VAT registration assistance, which is often a separate fee elsewhere.",
    },
  ];
