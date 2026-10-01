/**
 * Halal & Kosher Finder section content.
 *
 * Curation: only venues confirmed outside RealCy (own site, Chabad listing or
 * a public business listing) are listed; entries that could not be found were
 * removed after the 2026-10-01 fact-check. Note: kosher
 * certification in Cyprus is administered by the Chabad of Cyprus and the
 * Rabbinate; halal certification follows EU halal standards. Always verify
 * current certification status directly with the venue before relying on it
 * for religious requirements.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type VenueType = "restaurant" | "butcher" | "bakery" | "grocery";
export type Certification = "halal" | "kosher" | "both";

export type HalalKosherVenue = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: VenueType;
  certification: Certification;
  cuisine?: string;
  why: string;
  phone?: string;
  website?: string;
  openingHours?: string;
};

export type DietaryTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Filter values
// ---------------------------------------------------------------------------

export const ALL_VENUE_TYPES: ReadonlyArray<VenueType> = [
  "restaurant",
  "butcher",
  "bakery",
  "grocery",
];

export const VENUE_TYPE_LABEL: Record<VenueType, string> = {
  restaurant: "Restaurants",
  butcher: "Butchers",
  bakery: "Bakeries",
  grocery: "Grocery Stores",
};

export const ALL_CERTIFICATIONS: ReadonlyArray<Certification> = [
  "halal",
  "kosher",
  "both",
];

export const CERTIFICATION_LABEL: Record<Certification, string> = {
  halal: "Halal",
  kosher: "Kosher",
  both: "Halal & Kosher",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const DIETARY_TIPS: ReadonlyArray<DietaryTip> = [
  {
    heading: "Ask locally for halal butchers and restaurants",
    body: "We have not yet confirmed any halal venue in a public business listing, so none are listed here. Ask at your local mosque or community group for current halal butchers, grocers and restaurants, and check certification with each one before you rely on it.",
  },
  {
    heading: "Kosher options are concentrated around Limassol's Jewish community",
    body: "Cyprus has an established Jewish community centred mainly in Limassol, supported by Chabad of Cyprus. Certified kosher restaurants and food products are available in Limassol, with the Chabad house providing information on current kosher availability.",
  },
  {
    heading: "EU labelling laws apply: look for the certified symbols",
    body: "Cyprus follows EU food labelling standards. Kosher products carry the Rabbinate or Chabad certification symbol. Halal products typically display one of the recognised European halal certification marks. Supermarket ranges vary by branch, so check the label rather than relying on a dedicated section.",
  },
  {
    heading: "Online kosher delivery services available",
    body: "For certified kosher packaged goods and products that are not available locally, several Israeli and UK-based online kosher delivery services ship to Cyprus. The Chabad of Cyprus (chabadcyprus.com) maintains an updated list of local resources and can connect new residents with the kosher supply network.",
  },
];

// ---------------------------------------------------------------------------
// Venues
// ---------------------------------------------------------------------------

export const HALAL_KOSHER_VENUES: ReadonlyArray<HalalKosherVenue> = [
  // ── Kosher ────────────────────────────────────────────────────────────────
  {
    name: "Chabad of Limassol kosher shop",
    city: "Limassol",
    neighbourhood: "Chabad of Limassol, 5 Porfyriou Dikaiou",
    type: "grocery",
    certification: "kosher",
    why: "A small kosher shop (makolet) inside the Chabad of Limassol centre. Ask Chabad for current stock and opening times before a special trip.",
    website: "https://chabadlimassol.com/en/c/food/",
  },
  {
    name: "Chabad-supervised kosher restaurants",
    city: "Limassol",
    type: "restaurant",
    certification: "kosher",
    why: "Chabad of Limassol supervises kosher restaurants in the city, Allenby Kosher among them, and lists the current ones on its food page.",
    website: "https://chabadlimassol.com/en/c/food/",
  },
];
