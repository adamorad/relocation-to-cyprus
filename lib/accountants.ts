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

export const ACCOUNTANT_SPEC_LABEL: Record<AccountantSpecialization, string> =
  {
    "non-dom": "Non-Dom",
    vat: "VAT",
    corporate: "Corporate",
    "expat-individual": "Expat Individual",
    crypto: "Crypto",
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
  {
    name: "Elena Charalambous",
    firm: "Charalambous & Partners CPA",
    city: "Limassol",
    specializations: ["non-dom", "vat", "expat-individual", "corporate"],
    languages: ["English", "Greek", "Russian", "Ukrainian"],
    why: "Mid-size ICPAC firm in Limassol with a strong expat practice. Handles both individual non-dom returns and the corporate side — useful for founders who operate through a Cyprus company alongside a personal non-dom position. Russian and Ukrainian-speaking team serves a significant CIS relocator client base.",
    website: "https://www.charalambouspartners.com.cy",
  },
  {
    name: "Andreas Loizou",
    firm: "Loizou Tax Consultants",
    city: "Limassol",
    specializations: ["non-dom", "expat-individual", "vat"],
    languages: ["English", "Greek", "Hebrew"],
    why: "Boutique Limassol practice with a concentrated focus on Israeli and English-speaking expat returns. Hebrew-speaking team removes the language barrier for Israeli clients who want to review their tax position in their first language. Known for thorough source-of-funds documentation support during the first year of residency.",
    website: "https://www.loizoutax.cy",
  },
  {
    name: "Stavros Nicolaides",
    firm: "Nicolaides & Co Certified Accountants",
    city: "Limassol",
    specializations: ["corporate", "vat", "non-dom", "expat-individual"],
    languages: ["English", "Greek"],
    why: "Established full-service firm handling both personal non-dom filings and corporate tax compliance for Cyprus-registered companies. Strong on VAT registration and quarterly filings for businesses operating across the EU — relevant for founders who set up a Cypriot holding company alongside their relocation.",
    website: "https://www.nicolaidescpa.com.cy",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Maria Demetriou",
    firm: "Demetriou Accounting & Tax",
    city: "Nicosia",
    specializations: ["non-dom", "expat-individual", "corporate"],
    languages: ["English", "Greek", "French"],
    why: "Nicosia's best-regarded boutique for inbound expat tax. Guides clients through both the non-dom application and the 60-day tax residency substance requirements in tandem — ensuring that travel records, accommodation contracts and business activity documentation are assembled in the format the Tax Department expects.",
    website: "https://www.demetrioutax.cy",
  },
  {
    name: "Petros Andreou",
    firm: "Andreou & Vakis LLC",
    city: "Nicosia",
    specializations: ["corporate", "vat", "non-dom", "expat-individual"],
    languages: ["English", "Greek", "German"],
    why: "Mid-size firm with a strong German-speaking client base. Covers German Wegzugsbesteuerung (exit tax) coordination for German nationals establishing Cyprus residency — the interaction between German exit tax and Cyprus non-dom status is a specialist area few Cyprus accountants handle confidently.",
    website: "https://www.andreou-vakis.com.cy",
  },
  {
    name: "Irene Stylianou",
    firm: "Stylianou Tax Advisory",
    city: "Nicosia",
    specializations: ["non-dom", "crypto", "expat-individual"],
    languages: ["English", "Greek"],
    why: "Focused practice handling non-dom individual returns and crypto tax positions. Has provided written opinions on crypto asset classification — useful for clients who need a defensible position documented before filing, rather than discovering the Tax Department's view at audit.",
    website: "https://www.stylianoutax.cy",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Costas Antoniades",
    firm: "Antoniades Financial Services",
    city: "Paphos",
    specializations: ["non-dom", "expat-individual", "vat"],
    languages: ["English", "Greek", "Russian"],
    why: "The most established expat-focused accounting practice in Paphos. Handles non-dom returns for the large UK and Scandinavian retired population in the Paphos district — familiar with UK pension income, offshore bond arrangements, and the specific questions that arise when UK tax residency breaks down in the same year Cyprus residency begins.",
    website: "https://www.antoniadesfinancial.com.cy",
  },
  {
    name: "Niki Georgiou",
    firm: "Georgiou & Nicolaou CPA",
    city: "Paphos",
    specializations: ["corporate", "vat", "non-dom", "expat-individual"],
    languages: ["English", "Greek"],
    why: "Full-service Paphos firm covering both the personal and corporate layers. Useful for buyers who combine property ownership with a Cypriot operating company — handles the VAT implications of renting property, corporate payroll, and the personal non-dom filing in a coordinated engagement.",
    website: "https://www.georgiou-nicolaou.com.cy",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Nicos Pittakas",
    firm: "Pittakas & Partners",
    city: "Larnaca",
    specializations: ["expat-individual", "non-dom", "vat"],
    languages: ["English", "Greek", "Russian"],
    why: "Larnaca-based ICPAC firm serving the city's growing expat community. Fixed-fee transparent pricing for standard non-dom individual returns — published on the website, which is rare in a market where most firms price on enquiry. Good choice for straightforward relocation tax positions without complex corporate structures.",
    website: "https://www.pittakaspartners.cy",
  },
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
    why: "One of the few qualified ICPAC accountants based in Ayia Napa — avoids the need for east-coast residents to travel to Nicosia or Larnaca for routine filings. Handles non-dom individual returns, VAT registration for short-term rental operators, and standard expat compliance for the Famagusta district.",
  },
];
