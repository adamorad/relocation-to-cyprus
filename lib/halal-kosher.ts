/**
 * Halal & Kosher Finder section content.
 *
 * Curation: restaurants, butchers, bakeries, and grocery stores with verified
 * or community-trusted halal or kosher status across Cyprus. Note: kosher
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
    heading: "Halal availability is strongest in Larnaca and Nicosia",
    body: "Larnaca and Nicosia have the largest Muslim and Arab expat communities in Cyprus, which means the widest selection of halal restaurants, halal butchers, and halal grocery stores. Larnaca in particular has a concentrated area near the marina with multiple Arabic and halal dining options.",
  },
  {
    heading: "Kosher options are concentrated around Limassol's Jewish community",
    body: "Cyprus has an established Jewish community centred mainly in Limassol, supported by Chabad of Cyprus. Certified kosher restaurants and food products are available in Limassol, with the Chabad house providing information on current kosher availability. The Jewish community in Nicosia also supports some kosher options.",
  },
  {
    heading: "EU labelling laws apply — look for the certified symbols",
    body: "Cyprus follows EU food labelling standards. Kosher products carry the Rabbinate or Chabad certification symbol. Halal products typically display one of the recognised European halal certification marks. In supermarkets, the kosher and halal sections are growing as demand from expat communities increases.",
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
  // ── Halal Restaurants ─────────────────────────────────────────────────────
  {
    name: "Al-Diwan",
    city: "Larnaca",
    neighbourhood: "Finikoudes, central Larnaca",
    type: "restaurant",
    certification: "halal",
    cuisine: "Lebanese",
    why: "A well-regarded Lebanese restaurant near Larnaca's seafront promenade. Full halal menu with authentic mezze, grilled meats, and Lebanese flatbreads baked on-site. Popular with the Arab expat community and widely recommended as Larnaca's best halal dining option.",
    phone: "+357 24 650 600",
  },
  {
    name: "Istanbul Restaurant",
    city: "Nicosia",
    neighbourhood: "Strovolos, Nicosia",
    type: "restaurant",
    certification: "halal",
    cuisine: "Turkish",
    why: "An authentic Turkish restaurant in Nicosia with a fully halal kitchen. Serves doner, kebabs, pide, and Turkish breakfast. Popular with the Turkish Cypriot community who live south of the buffer zone and with Muslim residents of Nicosia.",
  },
  {
    name: "Babylon Shawarma",
    city: "Limassol",
    neighbourhood: "Agios Nikolaos, central Limassol",
    type: "restaurant",
    certification: "halal",
    cuisine: "Middle Eastern",
    why: "A fast-casual shawarma and falafel spot in Limassol with a certified halal kitchen. Popular with the city's Arab and Muslim expat community for quick lunches. Chicken shawarma and falafel wraps are particularly good.",
  },
  {
    name: "Arabesque",
    city: "Nicosia",
    neighbourhood: "Engomi, Nicosia",
    type: "restaurant",
    certification: "halal",
    cuisine: "Arabic",
    why: "A sit-down Arabic restaurant in Nicosia's expat-heavy Engomi neighbourhood. Full mezze menu, grilled meat platters, and traditional Arabic sweets. One of the few halal restaurants in Nicosia where the full menu — not just selected dishes — is certified halal.",
  },
  {
    name: "Taste of Pakistan",
    city: "Limassol",
    neighbourhood: "Central Limassol",
    type: "restaurant",
    certification: "halal",
    cuisine: "Pakistani",
    why: "Serving the Pakistani expat community and others seeking South Asian halal food in Limassol. Reliable curries, biryanis, and tandoor-cooked breads. A community-oriented restaurant where the food is authentically prepared rather than adapted for tourist palates.",
  },
  {
    name: "Al-Salam",
    city: "Larnaca",
    neighbourhood: "Central Larnaca",
    type: "restaurant",
    certification: "halal",
    cuisine: "Egyptian / Arabic",
    why: "An Egyptian-owned restaurant serving halal Egyptian and Arabic food in central Larnaca. Known for its hearty koshary, ful medames, and grilled kofta. An affordable halal lunch option popular with working expats.",
  },

  // ── Kosher Restaurants ────────────────────────────────────────────────────
  {
    name: "Chabad Cyprus Kosher Dining",
    city: "Limassol",
    neighbourhood: "Germasogeia, Limassol",
    type: "restaurant",
    certification: "kosher",
    cuisine: "Jewish / Israeli",
    why: "Operated by Chabad of Cyprus, the primary kosher dining resource for the Jewish community in Cyprus. Certified kosher meals, Shabbat dinners on request, and holiday dining available by reservation. Essential contact point for new Jewish residents establishing their kosher food supply.",
    website: "https://www.chabadcyprus.com",
  },
  {
    name: "Hummus Bar",
    city: "Limassol",
    neighbourhood: "Old Town, Limassol",
    type: "restaurant",
    certification: "kosher",
    cuisine: "Israeli / Mediterranean",
    why: "An Israeli-style hummus and mezze restaurant in Limassol's Old Town with kosher certification. The hummus, shakshuka, and sabich are made to Israeli standards. Very popular with the large Israeli expat community in Limassol.",
  },

  // ── Halal Butchers ────────────────────────────────────────────────────────
  {
    name: "Halal Meat Shop — Larnaca",
    city: "Larnaca",
    neighbourhood: "Central Larnaca",
    type: "butcher",
    certification: "halal",
    why: "Larnaca's most established halal butcher, supplying the city's Muslim community with certified halal beef, lamb, and chicken. Fresh cuts available daily; can prepare special cuts on request. Whole animal purchases available for Eid.",
    phone: "+357 24 625 400",
  },
  {
    name: "Al-Razi Halal Butcher",
    city: "Nicosia",
    neighbourhood: "Pallouriotissa, Nicosia",
    type: "butcher",
    certification: "halal",
    why: "A long-established halal butcher in Nicosia serving the capital's Muslim community. Certified halal beef, lamb, goat, and chicken. Stocks whole carcasses for community events and can source specific cuts on order.",
  },
  {
    name: "Halal Butcher Limassol",
    city: "Limassol",
    neighbourhood: "Omonia area, Limassol",
    type: "butcher",
    certification: "halal",
    why: "Central Limassol's most accessible halal butcher. Full range of halal meats including minced meat, chicken portions, and lamb cuts. Popular with the Arab expat community in the Omonia area and the wider Muslim population of Limassol.",
  },

  // ── Kosher Butchers ───────────────────────────────────────────────────────
  {
    name: "Kosher Meats Cyprus",
    city: "Limassol",
    neighbourhood: "Germasogeia, Limassol",
    type: "butcher",
    certification: "kosher",
    why: "The primary certified kosher meat supplier for Cyprus's Jewish community. Supplies kosher beef and chicken with Rabbinate certification. Pre-orders recommended as stock is limited; delivers to customers across Cyprus. Contact via Chabad of Cyprus for current availability.",
    website: "https://www.chabadcyprus.com",
  },

  // ── Halal Bakeries ────────────────────────────────────────────────────────
  {
    name: "Arabian Bakery",
    city: "Larnaca",
    neighbourhood: "Central Larnaca",
    type: "bakery",
    certification: "halal",
    cuisine: "Arabic",
    why: "A traditional Arabic bakery in Larnaca baking fresh Arabic flatbreads, ka'ak biscuits, and Arabic pastries daily. All products halal. The fresh pita bread is baked multiple times a day and is significantly better than supermarket alternatives.",
  },
  {
    name: "Middle East Bakery",
    city: "Nicosia",
    neighbourhood: "Strovolos, Nicosia",
    type: "bakery",
    certification: "halal",
    cuisine: "Middle Eastern",
    why: "A Nicosia bakery specialising in Lebanese and Arabic baked goods — man'oushe, lahmajoun, sesame rolls, and ma'amoul cookies. Halal operation. Popular for weekend breakfasts with the Arab community.",
  },

  // ── Halal Grocery Stores ──────────────────────────────────────────────────
  {
    name: "Al-Baraka Halal Supermarket",
    city: "Larnaca",
    neighbourhood: "Central Larnaca",
    type: "grocery",
    certification: "halal",
    why: "A comprehensive halal supermarket in Larnaca stocking halal packaged goods, frozen halal meats, Arabic pantry staples, and imported halal-certified products. One of the most complete halal grocery options in Cyprus for stocking a household pantry.",
    openingHours: "Mon–Sun 08:00–21:00",
  },
  {
    name: "Islamic Food Store",
    city: "Nicosia",
    neighbourhood: "Pallouriotissa, Nicosia",
    type: "grocery",
    certification: "halal",
    why: "A grocery store focused on halal-certified packaged goods, grains, and pantry items for Nicosia's Muslim community. Good selection of halal canned goods, halal instant noodles, and cooking ingredients. Doubles as a community gathering point.",
  },

  // ── Kosher Grocery Stores ─────────────────────────────────────────────────
  {
    name: "Kosher Corner at Alphamega",
    city: "Limassol",
    neighbourhood: "Germasogeia, Limassol",
    type: "grocery",
    certification: "kosher",
    why: "Alphamega's Germasogeia branch in Limassol maintains a dedicated kosher section stocking imported Israeli kosher products, kosher wines, and certified packaged goods. The most accessible in-supermarket kosher section in Cyprus. Stock varies seasonally and increases around Jewish holidays.",
  },
  {
    name: "Kosher Products — Chabad Store",
    city: "Limassol",
    neighbourhood: "Germasogeia, Limassol",
    type: "grocery",
    certification: "kosher",
    why: "A small kosher grocery operated by or affiliated with Chabad of Cyprus. Stocks essential certified kosher products including wine, olive oil, pasta, and preserved foods. The go-to resource for newly arrived Jewish residents establishing kosher kitchens.",
    website: "https://www.chabadcyprus.com",
  },
];
