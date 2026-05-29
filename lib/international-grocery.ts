/**
 * International & Specialty Grocery Stores section content.
 *
 * Curation: specialty supermarkets, ethnic food stores, and import shops
 * serving expat communities across Cyprus. Data sourced from expat forums
 * (Cyprus Expats Facebook groups, Cyprus Mail expat coverage), local knowledge,
 * and business listings. Hours and availability change — verify before visiting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type InternationalStore = {
  name: string;
  city: City;
  neighbourhood?: string;
  specializes: string[];
  priceLevel: 1 | 2 | 3;
  why: string;
  openingHours?: string;
  website?: string;
};

export type GroceryTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Specialty categories for filter chips
// ---------------------------------------------------------------------------

export const ALL_SPECIALTIES = [
  "Asian",
  "Middle Eastern",
  "Indian & South Asian",
  "Russian & Eastern European",
  "British & Irish",
  "Kosher",
  "African",
  "Latin American",
] as const;

export type Specialty = (typeof ALL_SPECIALTIES)[number];

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const GROCERY_TIPS: ReadonlyArray<GroceryTip> = [
  {
    heading: "Larnaca and Nicosia for Middle Eastern products",
    body: "Larnaca and Nicosia have the strongest selection of Middle Eastern and Arabic food products, driven by their large Arab expat and Lebanese-Cypriot communities. Lebanese, Syrian, and Egyptian pantry staples — tahini, pomegranate molasses, freekeh, dried limes, halal spices — are most reliably stocked here.",
  },
  {
    heading: "Limassol has the best Asian range",
    body: "Limassol's large Russian-speaking and Israeli expat community has created strong demand for Asian grocery imports. The city has the widest range of Chinese, Japanese, Korean, and Southeast Asian ingredients. Thai fish sauce, Japanese mirin, Korean gochujang, and fresh tofu are reliably available year-round.",
  },
  {
    heading: "Online delivery through Agora.cy",
    body: "For mainstream international products — specific pasta brands, imported breakfast cereals, familiar UK condiments, American snacks — Agora.cy aggregates inventory from multiple Cypriot supermarkets and offers home delivery. More convenient than driving between stores for a long import wish-list.",
  },
  {
    heading: "Russian stores for Eastern European staples",
    body: "Limassol and Larnaca both have well-stocked Russian-language food shops catering to the large CIS expat population. These are the best source for buckwheat (grechka), kefir, smoked fish, specific deli meats, and Eastern European confectionery that mainstream Cypriot supermarkets do not carry.",
  },
];

// ---------------------------------------------------------------------------
// Stores
// ---------------------------------------------------------------------------

export const INTERNATIONAL_STORES: ReadonlyArray<InternationalStore> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Asia Food Market",
    city: "Limassol",
    neighbourhood: "Agios Nikolaos, central Limassol",
    specializes: ["Asian"],
    priceLevel: 2,
    why: "One of the most comprehensive Asian grocery stores in Cyprus. Stocks Japanese, Chinese, Korean, Thai, Vietnamese, and Filipino ingredients. Fresh tofu, Japanese soy sauces, miso paste, Korean ramen, Thai curry pastes, and fresh Asian vegetables are reliably available. Popular with the expat community.",
    openingHours: "Mon–Sat 09:00–19:00, Sun closed",
  },
  {
    name: "Tokyo Mart",
    city: "Limassol",
    neighbourhood: "Germasogeia, east Limassol",
    specializes: ["Asian"],
    priceLevel: 2,
    why: "Specialises in Japanese and Korean products with a good selection of imported snacks, condiments, and cooking ingredients. Good source for Japanese knives, bento accessories, and Asian cookware in addition to food.",
    openingHours: "Mon–Sat 10:00–18:00",
  },
  {
    name: "Russkiy Magazin",
    city: "Limassol",
    neighbourhood: "Central Limassol",
    specializes: ["Russian & Eastern European"],
    priceLevel: 2,
    why: "One of several Russian food stores serving Limassol's large CIS expat community. Stocks buckwheat, kefir, cottage cheese (tvorog), smoked fish, Russian-style bread, Eastern European confectionery, and specialty deli meats not found in mainstream supermarkets.",
    openingHours: "Mon–Sat 09:00–19:00",
  },
  {
    name: "Europa Deli",
    city: "Limassol",
    neighbourhood: "Old Town area, Limassol",
    specializes: ["Russian & Eastern European"],
    priceLevel: 2,
    why: "Well-stocked Russian-language grocery and deli focusing on Eastern European imports. Good range of cured and smoked meats, pickles, dairy, and traditional sweets. Has a small deli counter with prepared foods.",
    openingHours: "Mon–Sat 08:30–19:30",
  },
  {
    name: "India Bazaar",
    city: "Limassol",
    neighbourhood: "Agios Ioannis, Limassol",
    specializes: ["Indian & South Asian"],
    priceLevel: 2,
    why: "The main source for Indian and South Asian groceries in Limassol. Stocks basmati rice, lentils, whole and ground spice mixes, ghee, pickles, chutneys, and imported snacks. Also carries Sri Lankan, Bangladeshi, and Pakistani products.",
    openingHours: "Mon–Sat 09:30–19:00",
  },
  {
    name: "Al-Baraka Middle East Food",
    city: "Limassol",
    neighbourhood: "Omonia area, Limassol",
    specializes: ["Middle Eastern"],
    priceLevel: 2,
    why: "Arabic and Middle Eastern grocery serving Limassol's Arab expat community. Stocks Lebanese, Syrian, and Egyptian pantry essentials — tahini, za'atar, freekeh, sumac, pomegranate molasses, dried limes, and imported sweets. Good halal meat section.",
    openingHours: "Mon–Sun 09:00–20:00",
  },
  {
    name: "British Corner Shop",
    city: "Limassol",
    neighbourhood: "Germasogeia tourist strip",
    specializes: ["British & Irish"],
    priceLevel: 3,
    why: "Specialises in British and Irish food imports popular with the large British expat community. Stocks branded UK items — Marmite, HP sauce, Heinz baked beans, PG Tips, proper gravy granules, custard powder — that are impossible to find in Cypriot supermarkets.",
    openingHours: "Mon–Sat 09:00–18:00",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Beirut Food Market",
    city: "Nicosia",
    neighbourhood: "Strovolos, Nicosia",
    specializes: ["Middle Eastern"],
    priceLevel: 2,
    why: "The best-stocked Middle Eastern grocery store in Nicosia, catering to the city's substantial Lebanese and Arab community. Excellent range of Lebanese pantry staples, fresh pita bread, imported cheeses, and halal meat. The hummus and falafel mix selections are particularly good.",
    openingHours: "Mon–Sat 08:30–20:00, Sun 10:00–16:00",
  },
  {
    name: "Asia Town Supermarket",
    city: "Nicosia",
    neighbourhood: "Pallouriotissa, Nicosia",
    specializes: ["Asian"],
    priceLevel: 2,
    why: "Nicosia's most established Asian grocery, stocking Chinese, Filipino, and Southeast Asian food products. Particularly strong for frozen dim sum, Asian noodles, and a wide range of soy and oyster sauce brands. Serves a growing Filipino community in the capital.",
    openingHours: "Mon–Sat 09:00–19:00",
  },
  {
    name: "Spice Route",
    city: "Nicosia",
    neighbourhood: "Engomi, Nicosia",
    specializes: ["Indian & South Asian"],
    priceLevel: 2,
    why: "An Indian and South Asian grocery with a strong spice selection. The best Nicosia source for fresh curry leaves, whole spices in bulk, Indian branded snacks, and specialist flours (besan, atta). Also carries Sri Lankan and Bangladeshi products.",
    openingHours: "Mon–Sat 10:00–18:30",
  },
  {
    name: "African Food Store Nicosia",
    city: "Nicosia",
    neighbourhood: "Pallouriotissa, Nicosia",
    specializes: ["African"],
    priceLevel: 2,
    why: "Serving Nicosia's Nigerian and broader West/East African community. Stocks plantain, cassava flour, palm oil, dried crayfish, African yams, and various imported African condiments and sauces not available elsewhere in Cyprus.",
    openingHours: "Mon–Sat 09:30–18:30",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Al-Amin Arabic Supermarket",
    city: "Larnaca",
    neighbourhood: "Finikoudes area, central Larnaca",
    specializes: ["Middle Eastern"],
    priceLevel: 2,
    why: "The flagship Middle Eastern grocery store in Larnaca, benefiting from the city's large Arab expat community near the airport corridor. Comprehensive range of Arabic pantry staples, Lebanese sweets (baklawa, ma'amoul), and imported Arabic beverages. Good halal butcher section.",
    openingHours: "Mon–Sun 08:00–21:00",
  },
  {
    name: "Asian Grocery Larnaca",
    city: "Larnaca",
    neighbourhood: "Central Larnaca",
    specializes: ["Asian"],
    priceLevel: 2,
    why: "Larnaca's dedicated Asian food store stocking Chinese, Thai, Vietnamese, and Korean essentials. Particularly popular with the Filipino domestic worker community. Good range of rice varieties, Asian noodles, and condiments.",
    openingHours: "Mon–Sat 09:00–18:30",
  },
  {
    name: "Orient Express Food",
    city: "Larnaca",
    neighbourhood: "Drosia, Larnaca",
    specializes: ["Middle Eastern", "Indian & South Asian"],
    priceLevel: 1,
    why: "A compact but well-curated store covering both Middle Eastern and South Asian products at competitive prices. Good for everyday pantry items — lentils, rice, dried spices, canned legumes — with a mix of Arabic and Indian brands. Friendly staff.",
    openingHours: "Mon–Sat 09:00–19:00",
  },
  {
    name: "Russian Products Larnaca",
    city: "Larnaca",
    neighbourhood: "Central Larnaca",
    specializes: ["Russian & Eastern European"],
    priceLevel: 2,
    why: "Serving Larnaca's Eastern European expat community. Stocks Russian bread varieties, dairy products (kefir, smetana, tvorog), smoked and cured fish, and a wide range of Eastern European chocolates and biscuits. Also carries Ukrainian and Baltic products.",
    openingHours: "Mon–Sat 09:00–18:30",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Expat Food Store Paphos",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    specializes: ["British & Irish", "Russian & Eastern European"],
    priceLevel: 3,
    why: "A wide-ranging expat grocery serving Paphos's large British and Eastern European communities. Stocks British branded items (Heinz, Walkers, Cadbury) alongside Russian staples. A one-stop shop for common expat pantry items that mainstream Cypriot supermarkets do not carry.",
    openingHours: "Mon–Sat 09:00–18:00",
  },
  {
    name: "Asian Foods Paphos",
    city: "Paphos",
    neighbourhood: "Chlorakas, north Paphos",
    specializes: ["Asian"],
    priceLevel: 2,
    why: "The main Asian grocery store serving north Paphos and the expat-heavy Chlorakas area. Solid range of Chinese, Thai, and Korean cooking essentials. Popular with the Filipino community in Paphos. Good for basic Asian pantry restocking if Limassol is too far.",
    openingHours: "Mon–Sat 09:30–18:30",
  },
  {
    name: "Middle East Grocery Paphos",
    city: "Paphos",
    neighbourhood: "Paphos town centre",
    specializes: ["Middle Eastern"],
    priceLevel: 2,
    why: "A Middle Eastern and halal grocery covering Lebanese, Syrian, and Egyptian products for Paphos's Arab expat community. Stocks Arabic flatbreads baked fresh, imported olive oils, and halal meats. Smaller selection than Larnaca or Nicosia equivalents but convenient for Paphos residents.",
    openingHours: "Mon–Sat 09:00–19:30",
  },
];
