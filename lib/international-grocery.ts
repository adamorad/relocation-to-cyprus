/**
 * International & Specialty Grocery Stores section content.
 *
 * Curation: specialty supermarkets, ethnic food stores, and import shops
 * serving expat communities across Cyprus. Only stores confirmed outside
 * RealCy (a public business listing or the shop's own page) are listed;
 * entries that could not be found were removed after the 2026-10-01
 * fact-check. Hours and availability change, so check before visiting.
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
    heading: "Larnaca for Middle Eastern products",
    body: "Larnaca has the strongest selection of Middle Eastern and Arabic food products, driven by its large Arab expat and Lebanese-Cypriot communities. Lebanese, Syrian, and Egyptian pantry staples (tahini, pomegranate molasses, freekeh, dried limes, halal spices) are most reliably stocked here.",
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
    name: "Asian Food Market",
    city: "Limassol",
    neighbourhood: "Omonias 36B, Limassol",
    specializes: ["Asian"],
    priceLevel: 2,
    why: "Asian grocery on Omonias Street (listed on Facebook as Asian Food Market Xiu Yuehong). Check stock and opening hours before a special trip.",
  },
];
