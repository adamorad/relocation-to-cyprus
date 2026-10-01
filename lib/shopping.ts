/**
 * Shopping section content. Its former panel component is archived in archive/homepage-map/.
 *
 * Curation philosophy: chains and venues are verified against 2026 operating
 * information. Sunday opening, siesta hours, and online-shopping tips are
 * relevant to relocators setting up daily life. Checked against store, mall,
 * municipal and tax sources on 2026-10-01; this is editorial guidance, not a
 * directory.
 */

import { ALL_CITIES, type City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type Store = {
  name: string;
  neighbourhood?: string;
  why: string;
  /** Budget band: 1=€ (budget), 2=€€ (mid), 3=€€€ (premium). */
  tier: 1 | 2 | 3;
  website?: string;
};

export type Mall = {
  name: string;
  city: City;
  neighbourhood?: string;
  /** Comma-separated anchor stores / what's there. */
  anchors: string;
  why: string;
  mapsQuery: string;
};

export type Market = {
  name: string;
  city: City;
  neighbourhood?: string;
  when: string;
  what: string;
  mapsQuery: string;
};

export type OnlineResource = {
  name: string;
  url: string;
  category: "delivery" | "comparison" | "classifieds" | "marketplace";
  tip: string;
};

export type ShoppingTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// About tips
// ---------------------------------------------------------------------------

export const SHOPPING_TIPS: ReadonlyArray<ShoppingTip> = [
  {
    heading: "Sunday opening",
    body: "Most supermarkets and malls open on Sundays, usually later in the morning, and some smaller independent shops close. Opening hours on public holidays vary.",
  },
  {
    heading: "Siesta hours",
    body: "From mid-June to the end of August some independent shops close from 14:00 to 17:00, and some close on Wednesday and Saturday afternoons all year. Malls and large supermarkets operate continuously. If you need a hardware store at 14:00, you'll likely find it shut.",
  },
  {
    heading: "Cash vs card",
    body: "Major chains and malls are card-friendly. Smaller independent shops, street markets, and kiosks often prefer or require cash. Carry €20–30 when going to a Laiki Agora or local bakery.",
  },
  {
    heading: "Price expectations",
    body: "Everyday groceries (bread, dairy, local produce) are cheaper than Northern Europe. Imported goods, electronics, and clothing are roughly on par with the UK, or 10–20% above German prices.",
  },
  {
    heading: "Tipping at shops",
    body: "No tipping culture at retail shops. At delis and bakery counters where staff assist you, rounding up to the nearest euro is appreciated but not expected.",
  },
  {
    heading: "VAT (ΦΠΑ) receipts",
    body: "Cyprus VAT is 19% standard, 9% for restaurants and hotels, and 5% for most food in shops. Fresh fruit and vegetables are at 0% until the end of 2026. Always ask for a receipt ('Μπορώ να πάρω απόδειξη;'). Receipts are required by law and help you track spending while you settle in.",
  },
];

// ---------------------------------------------------------------------------
// Supermarkets: Record<City, Store[]> because chains appear in all cities
// ---------------------------------------------------------------------------

export const SUPERMARKETS: Record<City, Store[]> = {
  Limassol: [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Several Limassol branches (see the store locator)",
      why: "The premium Cypriot chain. Widest selection on the island: imported cheeses, gluten-free range, sushi counter, in-store bakery. The go-to for relocators who want familiar Western brands.",
      tier: 3,
      website: "https://www.alphamega.com.cy",
    },
    {
      name: "Lidl Cyprus",
      neighbourhood: "Multiple Limassol locations",
      why: "German budget chain. Weekly specials include non-food items. Strong own-brand products at low prices. Best for pantry staples and household goods.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
    {
      name: "Sklavenitis",
      neighbourhood: "Germasogeia / Marina area",
      why: "Greek supermarket chain that took over the Carrefour stores in Cyprus in 2017 and the Papantoniou chain in 2024. Mid-range, strong deli section, good range of Greek products.",
      tier: 2,
    },
    {
      name: "Metro Supermarkets",
      neighbourhood: "Agias Fylaxeos and Mouttagiaka",
      why: "Cypriot supermarket chain with a good imported range. No membership needed.",
      tier: 2,
      website: "https://www.metro.com.cy",
    },
  ],
  Paphos: [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Paphos central / Kato Paphos",
      why: "Same premium range as Limassol branches. The best-stocked single store in Paphos for imported brands.",
      tier: 3,
      website: "https://www.alphamega.com.cy",
    },
    {
      name: "Lidl Cyprus",
      neighbourhood: "Multiple Paphos locations",
      why: "Best-value chain in Paphos for everyday items. Check the weekly non-food specials: kitchenware, tools, and seasonal goods appear often.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
    {
      name: "Sklavenitis",
      neighbourhood: "Kings Avenue Mall and Kato Paphos",
      why: "Greek supermarket chain that bought Papantoniou in 2024; the Paphos stores reopened as Sklavenitis in 2025. Mid-range, strong deli section, good range of Greek products.",
      tier: 2,
    },
  ],
  Larnaca: [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Larnaca, including Metropolis Mall",
      why: "Largest branch in the Larnaca district. Full product range including fresh fish, bakery, and a wine section.",
      tier: 3,
      website: "https://www.alphamega.com.cy",
    },
    {
      name: "Lidl Cyprus",
      neighbourhood: "Multiple Larnaca locations",
      why: "Budget option. Strong for dry goods, cleaning products, and the rotating middle-aisle non-food specials.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
  ],
  "Ayia Napa": [
    {
      name: "Lidl Cyprus",
      neighbourhood: "Paralimni",
      why: "Budget option for the east. Paralimni branch is well-stocked for the area.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
  ],
};

// ---------------------------------------------------------------------------
// Malls: flat array with city field for filter; single-location venues
// ---------------------------------------------------------------------------

export const MALLS: ReadonlyArray<Mall> = [
  {
    name: "My Mall Limassol",
    city: "Limassol",
    neighbourhood: "Franklin Roosevelt Avenue, west Limassol (by the new port)",
    anchors: "Zara, Pull&Bear, Marks & Spencer, ice rink, bowling, food court",
    why: "Limassol's main shopping destination. Two floors, fully climate-controlled. The ice rink and bowling make it a full-evening outing.",
    mapsQuery: "My Mall Limassol Cyprus",
  },
  {
    name: "Kings Avenue Mall",
    city: "Paphos",
    neighbourhood: "Northern entrance to Kato Paphos (Apostolou Pavlou and Tombs of the Kings Avenue)",
    anchors: "Zara, H&M, Marks & Spencer, Sklavenitis, 6-screen cinema",
    why: "Paphos's main mall. Compact but well-curated. Walkable from the Kato Paphos hotel strip. Good mix of fashion and daily-essentials anchor stores.",
    mapsQuery: "Kings Avenue Mall Paphos Cyprus",
  },
  {
    name: "Metropolis Mall",
    city: "Larnaca",
    neighbourhood: "5 European Union Avenue, Larnaca",
    anchors: "Zara, H&M, Pull&Bear, Alphamega, cinema, food court",
    why: "Larnaca's main mall, opened in September 2021. Modern layout with an Alphamega hypermarket anchor, open on Sundays. The cinema and food court make it a destination visit, not just a shopping run.",
    mapsQuery: "Metropolis Mall Larnaca Cyprus",
  },
];

// ---------------------------------------------------------------------------
// Markets: flat array with city field for filter
// ---------------------------------------------------------------------------

export const MARKETS: ReadonlyArray<Market> = [
  {
    name: "Limassol Municipal Market (Agora)",
    city: "Limassol",
    neighbourhood: "Old Town, Saripolou",
    when: "Mon–Sat 06:00–15:00",
    what: "Fresh fruit, vegetables, meat, fish, olives, halloumi, dried herbs, Cypriot spoon sweets. Cheaper than supermarkets for produce.",
    mapsQuery: "Limassol Municipal Market Old Town Cyprus",
  },
  {
    name: "Limassol Saturday Farmers Market",
    city: "Limassol",
    neighbourhood: "Thirotou Georgiou, next to the municipal market",
    when: "Saturday mornings, from about 06:00",
    what: "Organic and smallholder producers. Seasonal fruit, vegetables, eggs, honey, preserved foods. Smaller than the Agora but more direct-from-farmer.",
    mapsQuery: "Limassol Saturday Farmers Market Cyprus",
  },
  {
    name: "Larnaca Municipal Market",
    city: "Larnaca",
    neighbourhood: "Larnaca centre (the rebuilt market by Zouhouri)",
    when: "Mon–Sat 07:00–19:00 (to 18:00 Nov–Feb); open-air farmers' market Sat 06:00–13:30",
    what: "Vegetables, fruit, herbs, dairy. Smaller than the Limassol markets but convenient for daily fresh produce without driving to a large supermarket.",
    mapsQuery: "Larnaca Municipal Market Cyprus",
  },
  {
    name: "Paphos Municipal Market",
    city: "Paphos",
    neighbourhood: "Agoras Street, Paphos old town (Ktima)",
    when: "Monday to Saturday, morning to early afternoon (check hours with Paphos Municipality)",
    what: "Local produce, halloumi, olives, herbs. Compact but authentically local. Avoid tourist souvenir stalls near the entrance; the real market is inside.",
    mapsQuery: "Paphos Municipal Market Cyprus",
  },
  {
    name: "Paralimni Laiki Agora",
    city: "Ayia Napa",
    neighbourhood: "Paralimni town centre",
    when: "Weekly market in the town centre; check the day with Paralimni Municipality",
    what: "Fresh produce, seasonal citrus (the east is known for oranges and lemons in winter), olives. More local and less tourist-facing than Ayia Napa centre.",
    mapsQuery: "Paralimni Laiki Agora market Cyprus",
  },
];

// ---------------------------------------------------------------------------
// Online shopping — city-independent
// ---------------------------------------------------------------------------

export const ONLINE_RESOURCES: ReadonlyArray<OnlineResource> = [
  {
    name: "Amazon.co.uk",
    url: "https://www.amazon.co.uk",
    category: "delivery",
    tip: "Use Amazon UK, not .com or .de. Amazon UK ships most items to Cyprus directly. Typical delivery 3–7 working days. The UK is outside the EU, so every order is an import: 19% VAT applies whatever the value, plus possible customs duty and a courier handling fee unless Amazon charges VAT at checkout.",
  },
  {
    name: "AliExpress",
    url: "https://www.aliexpress.com",
    category: "delivery",
    tip: "Very cheap but delivery to Cyprus takes 3–6 weeks. Useful for accessories, phone cases, small electronics, and kitchenware where speed is not critical. Since July 2021 every parcel from outside the EU carries Cyprus VAT, usually charged at checkout on AliExpress.",
  },
  {
    name: "Skroutz.com.cy",
    url: "https://www.skroutz.com.cy",
    category: "comparison",
    tip: "Greek/Cypriot price comparison engine. Covers electronics, home goods, and books from Cyprus-based retailers. Check here before buying in-store — often cheaper with delivery included.",
  },
  {
    name: "Bazaraki.com",
    url: "https://www.bazaraki.com",
    category: "classifieds",
    tip: "The dominant Cypriot classifieds site — equivalent to Gumtree. Best for second-hand furniture, appliances, and cars when setting up a new home. Also has new-goods listings from small retailers.",
  },
  {
    name: "Facebook Marketplace (Cyprus)",
    url: "https://www.facebook.com/marketplace",
    category: "classifieds",
    tip: "Active in Cyprus, especially Limassol. Good for second-hand furniture and electronics from expats leaving. Search in both English and Greek for wider results. Meet in public for transactions.",
  },
  {
    name: "eBay (UK/EU sellers)",
    url: "https://www.ebay.co.uk",
    category: "marketplace",
    tip: "Search for EU or UK sellers specifically. Delivery from UK sellers to Cyprus typically 5–10 days. Good for brand-name electronics and hard-to-find items. Avoid US sellers — shipping is disproportionately expensive.",
  },
];

// ---------------------------------------------------------------------------
// Flat list for the /sections/shopping/ directory
// ---------------------------------------------------------------------------

export type ShopKind = "supermarket" | "market" | "mall";

export const ALL_SHOP_KINDS: ReadonlyArray<ShopKind> = [
  "supermarket",
  "market",
  "mall",
];

export const SHOP_KIND_LABEL: Record<ShopKind, string> = {
  supermarket: "Supermarkets",
  market: "Markets",
  mall: "Malls",
};

/** Budget band labels for the 1–3 `tier` field (see `Store`). */
export const TIER_LABEL: Record<Store["tier"], string> = {
  1: "€ budget",
  2: "€€ mid-range",
  3: "€€€ premium",
};

export type ShopEntry =
  | ({ kind: "supermarket"; city: City } & Store)
  | ({ kind: "market" } & Market)
  | ({ kind: "mall" } & Mall);

/** Supermarkets (per city), markets and malls in one list, by city. */
export const SHOP_ENTRIES: ReadonlyArray<ShopEntry> = ALL_CITIES.flatMap(
  (city): ShopEntry[] => [
    ...SUPERMARKETS[city].map(
      (s): ShopEntry => ({ kind: "supermarket", city, ...s }),
    ),
    ...MARKETS.filter((m) => m.city === city).map(
      (m): ShopEntry => ({ kind: "market", ...m }),
    ),
    ...MALLS.filter((m) => m.city === city).map(
      (m): ShopEntry => ({ kind: "mall", ...m }),
    ),
  ],
);
