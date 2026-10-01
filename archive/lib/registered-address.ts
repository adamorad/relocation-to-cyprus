/**
 * Registered Address Providers section content.
 *
 * Every Cyprus company (Ltd / LTD) is legally required to have a registered
 * address in Cyprus. This section lists real providers offering a registered
 * office address service, with or without mail forwarding.
 *
 * Sources: provider websites, Cyprus Bar Association, Cyprus Company Law
 * (Cap. 113), expat forums, and company formation service listings.
 * Prices are annual fees as of early 2026 — verify directly with each
 * provider before committing.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type RegisteredAddressProvider = {
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

export type RegisteredAddressTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const REGISTERED_ADDRESS_TIPS: ReadonlyArray<RegisteredAddressTip> = [
  {
    heading: "Registered address is a legal requirement for every Cyprus Ltd",
    body: "Under the Cyprus Companies Law (Cap. 113), every Cyprus-registered company must have a registered office in Cyprus at all times. This is not optional — it is the address recorded at the Registrar of Companies, where official correspondence and legal notices are served. Failure to maintain a valid registered address can lead to the company being struck off. A virtual office or registered address provider satisfies this requirement fully.",
  },
  {
    heading: "Not all providers include mail forwarding — check before signing",
    body: "Many providers include the registered address only (collecting mail for inspection or forwarding is a separate, often paid-extra service). If your company will regularly receive physical correspondence from banks, the tax department or government agencies, confirm that mail scanning and forwarding is included, and ask how quickly mail is forwarded. Some low-cost providers scan and email; others courier a bundle monthly.",
  },
];

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------

export const REGISTERED_ADDRESS_PROVIDERS: ReadonlyArray<RegisteredAddressProvider> =
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
      name: "Cyfield Corporate Services",
      city: "Limassol",
      neighbourhood: "Limassol Marina area",
      pricePerYear: 300,
      includes: [
        "Registered office address",
        "Mail scanning and forwarding",
        "Registrar of Companies filings",
      ],
      why: "Boutique corporate services firm focused on company formation and ongoing compliance. Transparent annual pricing and responsive email support — good fit for solo founders and small international teams.",
      website: "https://www.cyfield.com.cy",
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
      why: "One of Cyprus's largest law and corporate services firms. Their registered office service comes with integrated access to legal, tax and banking introduction services — worth the premium for complex structures.",
      website: "https://www.neocleous.com",
    },
    {
      name: "Papafides Business Advisors",
      city: "Limassol",
      neighbourhood: "Limassol city centre",
      pricePerYear: 280,
      includes: [
        "Registered office address",
        "Mail receipt and forwarding",
        "Annual return filing",
      ],
      why: "Mid-range corporate services provider with a clean track record. Includes annual return filing in the package, which removes one common admin task from founders managing their own compliance.",
      website: "https://www.papafides.com",
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
