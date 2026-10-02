/**
 * Halal & Kosher Finder section content.
 *
 * Curation: only venues confirmed outside RealCy are listed. Each halal entry
 * has a current listing (own website, a delivery platform or a review site
 * with reviews from 2025 or 2026) and halal evidence (the venue's own name or
 * site, or a halal directory such as Zabihah); `sourceUrl` points at that
 * evidence. Entries that could not be found were removed after the
 * 2026-10-01 fact-check, and the halal list was rebuilt on 2026-10-02. Note: kosher
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
  /** Street address, only when a cited source states it. */
  address?: string;
  type: VenueType;
  certification: Certification;
  cuisine?: string;
  why: string;
  phone?: string;
  website?: string;
  /** Listing that confirms the venue operates and is halal or kosher. */
  sourceUrl?: string;
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
    heading: "Halal food is mostly Arabic and Middle Eastern kitchens",
    body: "The halal venues listed here are mainly Syrian, Lebanese and Arabic restaurants and takeaways in Limassol, Larnaca, Paphos and Ayia Napa, plus one halal butcher in Paphos. Their halal status comes from the venue itself or from a halal directory, not from a certificate we have seen, so ask each one before you rely on it. Some also serve alcohol.",
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
  // -- Halal --------------------------------------------------------------
  {
    name: "Syrian Restaurant (Syrian Arab Friendship Club)",
    city: "Limassol",
    address: "3 Iliados Street, Germasogeia",
    type: "restaurant",
    certification: "halal",
    cuisine: "Syrian",
    why: "Long-running Syrian meze restaurant, also known as the Syrian Arab Friendship Club. Zabihah lists it as halal. It is busy at weekends, so book ahead.",
    website: "https://www.syrianrestaurantlimassol.com.cy/",
    sourceUrl:
      "https://www.zabihah.com/restaurants/ca20c038-7767-11ef-95ae-6045bdeb9f57/syrian-arab-friendship-club-limassol-cyprus",
  },
  {
    name: "Cairo Food Halal",
    city: "Limassol",
    address: "189 Christodoulou Chatzipavlou Street",
    type: "restaurant",
    certification: "halal",
    cuisine: "Arabic",
    why: "Arabic kitchen trading under a halal name, with shawarma, kafta and falafel. Listed for delivery on Wolt.",
    sourceUrl: "https://wolt.com/en/cyp/limassol/restaurant/cairo",
  },
  {
    name: "Watar Ziryab",
    city: "Larnaca",
    address: "Mehmet Ali 5, first floor",
    type: "restaurant",
    certification: "halal",
    cuisine: "Middle Eastern",
    why: "Middle Eastern restaurant whose own website says it serves halal food.",
    website: "https://www.watarziryab-cyprus.com/",
    sourceUrl: "https://www.watarziryab-cyprus.com/",
  },
  {
    name: "Maqam Al-Sultan",
    city: "Larnaca",
    neighbourhood: "Finikoudes seafront",
    address: "Agkyras 7",
    type: "restaurant",
    certification: "halal",
    cuisine: "Lebanese",
    why: "Lebanese meze restaurant near the seafront. Zabihah lists it as halal on the staff's verbal assurance and shows an open issue report, and alcohol is served. Ask before you order.",
    website: "https://maqamalsultan.com/",
    sourceUrl:
      "https://www.zabihah.com/restaurants/2bf3d3b7-c6b1-44ea-8079-c327fd864302/maqam-al-sultan-larnaka-larnaka",
  },
  {
    name: "Helen Take Away",
    city: "Paphos",
    address: "Neapoleos 17",
    type: "restaurant",
    certification: "halal",
    cuisine: "Arabic",
    why: "Small Arabic takeaway known for shawarma, listed on Google as serving Arabic halal food.",
    sourceUrl:
      "https://wanderlog.com/place/details/3956601/helen-take-awayarabic-halal-food",
  },
  {
    name: "Lemar (Arabic Halal Fast Food)",
    city: "Paphos",
    address: "Eleftheriou Venizelou 6",
    type: "restaurant",
    certification: "halal",
    cuisine: "Syrian",
    why: "Syrian fast food near the old town that describes itself as halal, with a small shop selling halal meat and groceries. On Wolt as Lemar Tavern Halal.",
    sourceUrl:
      "https://wanderlog.com/place/details/12483648/lemar-arabic-halal-fast-food",
  },
  {
    name: "Amir Butchery Halal",
    city: "Paphos",
    address: "Arch. Makariou III Avenue 1e",
    type: "butcher",
    certification: "halal",
    why: "Halal butcher selling lamb, goat, beef and chicken, with delivery through Wolt.",
    sourceUrl: "https://wolt.com/en/cyp/paphos/venue/amir-butchery",
  },
  {
    name: "ZAATAR Food Arts",
    city: "Ayia Napa",
    neighbourhood: "Nissi Avenue",
    address: "Sotou Chatziprokopiou 2, by the Nissi Avenue traffic lights",
    type: "restaurant",
    certification: "halal",
    cuisine: "Lebanese and Syrian",
    why: "Lebanese and Syrian grill near Nissi Beach. Its listed name includes the Arabic word for halal, and a local Ayia Napa guide lists it as halal-certified.",
    website: "https://www.zaatarfoodarts.com/",
    sourceUrl:
      "https://restaurantguru.com/Zaatar-food-and-arts-project-Ayia-Napa-2",
  },

  // -- Kosher -------------------------------------------------------------
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
