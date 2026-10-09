/**
 * Property management companies in Cyprus.
 * Covers property managers across Limassol, Paphos, and Larnaca.
 *
 * REA-156: register status of each name is NOT yet verified (see factcheck
 * REA-150 report), so licensedByRERA stays false until each name is checked
 * at https://ktimatomesites.com/agents/.
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
    heading: "Check the company's registration before signing anything",
    body: "Under the Real Estate Agents Law 71(I)/2010, anyone acting as an intermediary in selling, buying or letting property (leases over one month) must be registered with the Council of Real Estate Agents. Pure management work is not clearly covered by that law, so ask the company what it is licensed for. The Council's register is at ktimatomesites.com/agents: cross-check the company's name AND the individual agent's name before engaging. Unregistered operators are outside the Council's disciplinary process.",
  },
  {
    heading: "Understand what 'property management' covers — it varies widely",
    body: "Cyprus property management contracts range from basic rent collection only to full-service management including maintenance coordination, tenant finding, utility management, annual property inspections, and tax filing assistance. Fees are not regulated and quotes vary, so get 2-3 written quotes. Get a written scope of services before signing, and check in writing what is excluded, such as major repairs above a stated limit, legal disputes, and owner insurance.",
  },
  {
    heading: "Non-resident owners: rental income must be declared in Cyprus",
    body: "If you are a non-resident owner renting your Cyprus property, rental income arising in Cyprus must be declared locally. Confirm the current rules with the Cyprus Tax Department (tax.gov.cy) or a Cyprus accountant. A good property manager will either handle this or work alongside your accountant. Ask specifically: 'Do you provide monthly rental statements and an annual summary for my tax filing?' Managers who cannot produce clear documentation create audit risk for you.",
  },
  {
    heading: "Inspect the property in person or via a trusted local agent before any management agreement",
    body: "Property management companies are incentivised to sign management agreements quickly. Before signing, inspect the property's current condition, check the title deed status and who owns the property before letting, and ask for a statement of any unpaid common-expense charges.",
  },
];

// ---------------------------------------------------------------------------
// Property management companies
// REA-156: removed entries with unverified existence or no official website
// (Paphos Property Management Ltd, Larnaca Property Services, Remax, Century 21,
// Prime Property) per REA-150 B11/B12. Re-add only with a verified source.
// ---------------------------------------------------------------------------

export const PROPERTY_MANAGERS: ReadonlyArray<PropertyManager> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Aristo Developers Property Management",
    cities: ["Limassol", "Paphos"],
    why: "The property management arm of Aristo Developers, a Cyprus developer, handles apartments and villas in Limassol and Paphos. Check its scope of services with the company.",
    licensedByRERA: false,
    website: "https://www.aristodevelopers.com",
  },
  {
    name: "DOM Real Estate",
    cities: ["Limassol"],
    why: "Limassol-based agency with a property management division. Handles tenant finding, rent collection, maintenance coordination, and annual property reviews. Ask the company which languages it works in.",
    licensedByRERA: false,
    website: "https://www.dom.com.cy",
  },
  {
    name: "Ledra Estates",
    cities: ["Limassol"],
    why: "Limassol-based agency. Management services including lease preparation, tenant vetting, utility transfers, and maintenance contractor network.",
    licensedByRERA: false,
    website: "https://www.ledraestates.com",
  },

  // ── Paphos ───────────────────────────────────────────────────────────────
  {
    name: "Pafilia Property Management",
    cities: ["Paphos"],
    why: "The management arm of Pafilia, a Paphos developer. Handles complexes throughout the Paphos region. Most relevant to owners of units within Pafilia-built developments.",
    licensedByRERA: false,
    website: "https://www.pafilia.com",
  },

  // ── Island-wide / multi-city ──────────────────────────────────────────────
  {
    name: "Danos — Property & Facilities Management",
    cities: ["Limassol", "Larnaca", "Paphos"],
    why: "Real estate consultancy with a property and facilities management division, listed for Limassol, Larnaca and Paphos. Check the company's own site for its accreditations and services.",
    licensedByRERA: false,
    website: "https://www.danos.com.cy",
  },
];
