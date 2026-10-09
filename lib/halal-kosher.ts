/**
 * Halal & Kosher Finder section content.
 *
 * Curation: only venues confirmed outside RealCy are listed. Each halal entry
 * has a current listing (own website, a delivery platform or a review site
 * with reviews from 2025 or 2026) and halal evidence (the venue's own name or
 * site, or a halal directory such as Zabihah); `sourceUrl` points at that
 * evidence. Entries that could not be found were removed after the
 * 2026-10-01 fact-check, and the halal list was rebuilt on 2026-10-02. Always verify
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
    body: "Cyprus has an established Jewish community centred mainly in Limassol, supported by Chabad of Cyprus. Chabad of Limassol lists a kosher grocery and kosher restaurants on its food page; it does not state which authority supervises them, so ask Chabad.",
  },
  {
    heading: "Check the certifier's mark on the pack",
    body: "Cyprus follows EU food labelling rules, which do not regulate kosher or halal marks. Look for the certifier's mark on the pack, and ask the shop who certifies it. Supermarket ranges vary by branch.",
  },
  {
    heading: "Kosher resources in Limassol",
    body: "Chabad of Limassol keeps a food page listing a kosher grocery and restaurants at chabadlimassol.com/en/c/food. Check it for current availability.",
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
    why: "Long-running Syrian meze restaurant, also known as the Syrian Arab Friendship Club. Zabihah lists it as halal. It is busy at weekends, so book ahead. Halal status not independently verified.",
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
    why: "Arabic kitchen trading under a halal name, with shawarma, kafta and falafel. Listed for delivery on Wolt. Halal status not independently verified.",
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
    why: "Small Arabic takeaway known for shawarma, listed on Google as serving Arabic halal food. Halal status not independently verified.",
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
    why: "Syrian fast food near the old town that describes itself as halal, with a small shop selling halal meat and groceries. On Wolt as Lemar Tavern Halal. Halal status not independently verified.",
    sourceUrl:
      "https://wanderlog.com/place/details/12483648/lemar-arabic-halal-fast-food",
  },
  {
    name: "Amir Butchery Halal",
    city: "Paphos",
    address: "Arch. Makariou III Avenue 1e",
    type: "butcher",
    certification: "halal",
    why: "Halal butcher selling lamb, goat, beef and chicken, with delivery through Wolt. Halal status not independently verified.",
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
    why: "Lebanese and Syrian grill near Nissi Beach. Its listed name includes the Arabic word for halal, and a local Ayia Napa guide lists it as halal-certified. Halal status not independently verified.",
    website: "https://www.zaatarfoodarts.com/",
    sourceUrl:
      "https://restaurantguru.com/Zaatar-food-and-arts-project-Ayia-Napa-2",
  },

  // -- Kosher -------------------------------------------------------------
  {
    name: "Kosher Limassol (grocery)",
    city: "Limassol",
    address: "Porfuriou Dikaiou 5, 3095 Limassol",
    type: "grocery",
    certification: "kosher",
    why: "Kosher grocery listed on the Chabad of Limassol food page, which does not name its supervising authority. Ask Chabad for current stock and opening times before a special trip. Delivers via Wolt.",
    phone: "+357 95 167764",
    website: "https://chabadlimassol.com/en/c/food/",
  },
  {
    name: "Kosher restaurants listed by Chabad of Limassol",
    city: "Limassol",
    type: "restaurant",
    certification: "kosher",
    why: "Chabad of Limassol's food page lists kosher restaurants, Allenby among them (tagged Mehadrin), described as under reliable supervision. Allenby phone: +357 25363770.",
    website: "https://chabadlimassol.com/en/c/food/",
  },
];
