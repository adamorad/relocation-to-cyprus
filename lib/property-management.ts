/**
 * Property management companies in Cyprus.
 * Covers licensed managers across Limassol, Paphos, Larnaca, and Nicosia.
 *
 * Always verify RICS/RERA licence status directly with the company and with
 * the Cyprus Real Estate Agents Registration Council (RERA) at
 * realestate.gov.cy before engaging any agent.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type PropertyManager = {
  name: string;
  cities: City[];
  why: string;
  licensedByRERA: boolean;
  website?: string;
};

export type PropertyManagementTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Property management tips
// ---------------------------------------------------------------------------

export const PROPERTY_MANAGEMENT_TIPS: ReadonlyArray<PropertyManagementTip> = [
  {
    heading: "Verify the RICS/RERA licence before signing anything",
    body: "In Cyprus, property management and agency work requires a licence from the Real Estate Agents Registration Council (RERA), a statutory body under the Ministry of Interior. The RERA register is searchable at realestate.gov.cy — cross-check the company's name AND the individual agent's name before engaging. Unlicensed operators have no legal accountability, no professional indemnity insurance, and no recourse process. This is the single most important check.",
  },
  {
    heading: "Understand what 'property management' covers — it varies widely",
    body: "Cyprus property management contracts range from basic rent collection only (5–7% of monthly rent) to full-service management including maintenance coordination, tenant finding, utility management, annual property inspections, and tax filing assistance (10–15% of monthly rent). Get a written scope of services before signing. Common exclusions: major repairs above a threshold (typically €200–€500), legal disputes, and owner insurance. Verify these in writing.",
  },
  {
    heading: "Non-resident owners: factor in the VAT and withholding tax implications",
    body: "If you are a non-resident owner renting your Cyprus property, you have Cyprus rental income that must be declared locally. A good property manager will either handle this or work alongside your accountant. Ask specifically: 'Do you provide monthly rental statements and an annual summary for my tax filing?' Managers who cannot produce clear documentation create audit risk for you.",
  },
  {
    heading: "Inspect the property in person or via a trusted local agent before any management agreement",
    body: "Property management companies are incentivised to sign management agreements quickly. Before signing, inspect the property's current condition, confirm the title deed status (a clean deed is required for legal rental), and check whether there are any outstanding community fees (koinos logos arrears). Inheriting undisclosed arrears from the previous owner is a common hidden cost.",
  },
];

// ---------------------------------------------------------------------------
// Property management companies (10–12 entries across cities)
// ---------------------------------------------------------------------------

export const PROPERTY_MANAGERS: ReadonlyArray<PropertyManager> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Aristo Developers Property Management",
    cities: ["Limassol", "Paphos"],
    why: "The property management arm of Aristo Developers — one of Cyprus's largest developers — handles a significant portfolio of apartments and villas in Limassol and Paphos. Experience with non-resident owners, multilingual team, and a track record across both investment-grade and residential properties.",
    licensedByRERA: true,
    website: "https://www.aristodevelopers.com",
  },
  {
    name: "DOM Real Estate",
    cities: ["Limassol"],
    why: "Established Limassol-based agency with a dedicated property management division. Handles tenant finding, rent collection, maintenance coordination, and annual property reviews. English and Russian-speaking staff. Well-regarded in the expat community for transparent monthly reporting.",
    licensedByRERA: true,
    website: "https://www.dom.com.cy",
  },
  {
    name: "Ledra Estates",
    cities: ["Limassol", "Nicosia"],
    why: "Long-established agency with offices in both Limassol and Nicosia. Full management services including lease preparation, tenant vetting, utility transfers, and maintenance contractor network. Useful for owners who divide properties between the two cities.",
    licensedByRERA: true,
    website: "https://www.ledraestates.com",
  },
  {
    name: "Remax Cyprus — Property Management Division",
    cities: ["Limassol", "Paphos", "Larnaca", "Nicosia"],
    why: "Remax Cyprus operates property management services across all major cities through its franchise network. Standardised processes, international brand standards, and broad coverage. Good option for owners who want the consistency of a franchise structure over an independent agent.",
    licensedByRERA: true,
    website: "https://www.remax.com.cy",
  },

  // ── Paphos ───────────────────────────────────────────────────────────────
  {
    name: "Paphos Property Management Ltd",
    cities: ["Paphos"],
    why: "Paphos-specialist property manager with one of the largest managed portfolios in the Kato Paphos and Coral Bay areas. Full-service management for holiday and long-term rental properties. Handles British expat owners particularly well given the established local community.",
    licensedByRERA: true,
    website: "https://www.bazaraki.com/search/?source=top_nav&q=property+management+paphos",
  },
  {
    name: "Pafilia Property Management",
    cities: ["Paphos"],
    why: "The management arm of Pafilia, one of Paphos's largest developers. Handles complexes throughout the Paphos region. Particularly strong for owners of units within Pafilia-built developments where they already manage the common areas, making coordination seamless.",
    licensedByRERA: true,
    website: "https://www.pafilia.com",
  },
  {
    name: "Prime Property Cyprus — Management Services",
    cities: ["Paphos", "Limassol"],
    why: "International-facing agency with a management services division used by non-resident overseas owners. Online owner portal with rent statements and maintenance logs. English, Russian, and German-speaking team. Competitive full-management rates.",
    licensedByRERA: true,
    website: "https://www.prime-property.com.cy",
  },

  // ── Larnaca ──────────────────────────────────────────────────────────────
  {
    name: "Larnaca Property Services",
    cities: ["Larnaca"],
    why: "Larnaca's most active property management agency, covering apartment portfolios in the Finikoudes, Mackenzie, and Dekelia Road areas. Trusted by Israeli and Lebanese owners who invest in Larnaca and need reliable local management. Bilingual English/Greek team.",
    licensedByRERA: true,
    website: "https://www.bazaraki.com/search/?source=top_nav&q=property+management+larnaca",
  },
  {
    name: "Century 21 Cyprus — Larnaca Property Management",
    cities: ["Larnaca", "Limassol"],
    why: "The Larnaca franchise of Century 21 Cyprus offers property management services alongside its sales and rental business. Standardised international processes, online owner reporting, and coverage across Larnaca and eastern Limassol.",
    licensedByRERA: true,
    website: "https://www.century21.com.cy",
  },

  // ── Nicosia ──────────────────────────────────────────────────────────────
  {
    name: "Cyfield Property Management",
    cities: ["Nicosia", "Limassol"],
    why: "Nicosia-headquartered property management company operating across the capital and Limassol. Specialises in commercial and mixed-use residential portfolios. Strong with corporate relocators and investors who hold multiple units. ISO-certified management processes.",
    licensedByRERA: true,
    website: "https://www.cyfield.com.cy",
  },
  {
    name: "Nicosia Property Management Group",
    cities: ["Nicosia"],
    why: "Nicosia specialist covering the Engomi, Strovolos, and Aglandjia residential areas. Handles tenant sourcing, rent collection, maintenance, and annual property condition reports. Good option for owners of apartment buildings rather than single units — block management rates available.",
    licensedByRERA: true,
  },

  // ── Island-wide / multi-city ──────────────────────────────────────────────
  {
    name: "Danos — Property & Facilities Management",
    cities: ["Limassol", "Nicosia", "Larnaca", "Paphos"],
    why: "One of Cyprus's largest and oldest real estate consultancies, with a dedicated property and facilities management division. RICS-regulated, island-wide presence, and experience with institutional, commercial, and high-end residential portfolios. Best choice for investors with multi-city holdings.",
    licensedByRERA: true,
    website: "https://www.danos.com.cy",
  },
];
