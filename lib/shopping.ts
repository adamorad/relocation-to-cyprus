/**
 * Shopping section content. Consumed by components/ShoppingPanel.tsx.
 *
 * Curation philosophy: chains and venues are verified against 2026 operating
 * information. Sunday closures, siesta hours, and online-shopping tips are
 * relevant to relocators setting up daily life. Verify before publishing —
 * this is editorial guidance, not a directory.
 */

import type { City } from "@/lib/food";

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
    heading: "Sunday closures",
    body: "Almost all retail — including supermarkets — is closed on Sundays. Petrol stations and some convenience kiosks stay open. Plan your weekly shop for Friday or Saturday.",
  },
  {
    heading: "Siesta hours",
    body: "Independent shops typically close 13:00–16:00 on weekdays. Malls and large supermarkets operate continuously. If you need a hardware store at 14:00, you'll likely find it shut.",
  },
  {
    heading: "Cash vs card",
    body: "Major chains and malls are card-friendly. Smaller independent shops, street markets, and kiosks often prefer or require cash. Carry €20–30 when going to a Laiki Agora or local bakery.",
  },
  {
    heading: "Price expectations",
    body: "Everyday groceries — bread, dairy, local produce — are cheaper than Northern Europe. Imported goods, electronics, and clothing are roughly on par with the UK, or 10–20% above German prices.",
  },
  {
    heading: "Tipping at shops",
    body: "No tipping culture at retail shops. At delis and bakery counters where staff assist you, rounding up to the nearest euro is appreciated but not expected.",
  },
  {
    heading: "VAT (ΦΠΑ) receipts",
    body: "Cyprus VAT is 19% (standard) / 9% (food and hotels). Always ask for a receipt ('Μπορώ να πάρω απόδειξη;') — receipts are required by law and help you track spending while you settle in.",
  },
];

// ---------------------------------------------------------------------------
// Supermarkets — Record<City, Store[]> because chains appear in all cities
// ---------------------------------------------------------------------------

export const SUPERMARKETS: Record<City, Store[]> = {
  Limassol: [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Polemidia / Germasogeia / Ayios Athanasios",
      why: "The premium Cypriot chain. Widest selection on the island — imported cheeses, gluten-free range, sushi counter, in-store bakery. The go-to for relocators who want familiar Western brands.",
      tier: 3,
      website: "https://www.alphamega.com.cy",
    },
    {
      name: "Lidl Cyprus",
      neighbourhood: "Multiple Limassol locations",
      why: "German budget chain. Weekly rotating specials ('Bazaar week') include non-food items. Strong own-brand products at low prices. Best for pantry staples and household goods.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
    {
      name: "Sklavenitis",
      neighbourhood: "Germasogeia / Marina area",
      why: "Greek supermarket chain that entered Cyprus in 2021. Mid-range, strong deli section, good Greek-import range. Usually less crowded than Alphamega.",
      tier: 2,
    },
    {
      name: "Papantoniou",
      neighbourhood: "Multiple Limassol locations",
      why: "Long-established Cypriot family chain. Good local produce, Cypriot cheeses, and cured meats. Cheaper than Alphamega for basics. Strong fresh-fish counter at larger branches.",
      tier: 2,
    },
    {
      name: "Metro Cash & Carry",
      neighbourhood: "Limassol industrial area",
      why: "Wholesale / bulk. Membership required but easy to obtain. Useful for bulk non-perishables, catering quantities, and cleaning supplies — not for a regular weekly shop.",
      tier: 2,
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
      why: "Best-value chain in Paphos for everyday items. Check the weekly non-food specials — kitchenware, tools, and seasonal goods appear often.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
    {
      name: "Papantoniou",
      neighbourhood: "Paphos centre",
      why: "Reliable local chain, solid fresh-produce section. Good for Cypriot specialties not found in international chains.",
      tier: 2,
    },
  ],
  Larnaca: [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Larnaca / Aradippou",
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
    {
      name: "Papantoniou",
      neighbourhood: "Larnaca centre / Drosia",
      why: "Well-established Cypriot chain. Strong deli and local-brand range.",
      tier: 2,
    },
  ],
  Nicosia: [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Strovolos / Latsia / Nicosia Mall",
      why: "Multiple large branches in the capital. Best for premium imports and hard-to-find brands. The Nicosia Mall branch has a large food hall.",
      tier: 3,
      website: "https://www.alphamega.com.cy",
    },
    {
      name: "Lidl Cyprus",
      neighbourhood: "Multiple Nicosia locations",
      why: "Budget-focused. Nicosia branches tend to be well-stocked for a capital-city Lidl.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
    {
      name: "Sklavenitis",
      neighbourhood: "Strovolos / Engomi",
      why: "Greek-import chain. Strong bakery section and a wider Greek-brand range than Alphamega.",
      tier: 2,
    },
    {
      name: "Papantoniou",
      neighbourhood: "Multiple Nicosia locations",
      why: "Cypriot family chain well-represented in the capital. Good for local produce and Cypriot dairy.",
      tier: 2,
    },
  ],
  "Ayia Napa": [
    {
      name: "Alphamega Hypermarket",
      neighbourhood: "Paralimni / Protaras",
      why: "Closest large hypermarket to Ayia Napa. The Paralimni branch covers the Famagusta district for premium shopping.",
      tier: 3,
      website: "https://www.alphamega.com.cy",
    },
    {
      name: "Lidl Cyprus",
      neighbourhood: "Paralimni",
      why: "Budget option for the east. Paralimni branch is well-stocked for the area.",
      tier: 1,
      website: "https://www.lidl.com.cy",
    },
    {
      name: "Papantoniou",
      neighbourhood: "Ayia Napa / Paralimni",
      why: "Local chain with presence in the Famagusta district. Reliable for daily shopping when based in the east long-term.",
      tier: 2,
    },
  ],
};

// ---------------------------------------------------------------------------
// Malls — flat array with city field for filter; single-location venues
// ---------------------------------------------------------------------------

export const MALLS: ReadonlyArray<Mall> = [
  {
    name: "My Mall Limassol",
    city: "Limassol",
    neighbourhood: "Polemidia",
    anchors: "H&M, Zara, Pull&Bear, MediaMarkt, 8-screen cinema, 20+ food-court options",
    why: "Limassol's main shopping destination. Two floors, fully climate-controlled. The MediaMarkt is the best electronics store in the city. The cinema makes it a full-evening outing.",
    mapsQuery: "My Mall Limassol Cyprus",
  },
  {
    name: "The Mall of Cyprus",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    anchors: "Marks & Spencer, Zara, Mango, Next, H&M, Foot Locker, MediaMarkt, Carrefour, 8-screen cinema",
    why: "Largest mall on the island — 130+ stores. The only Marks & Spencer food hall in Cyprus is here. If you can only visit one mall, this is it. Ample parking, full day out.",
    mapsQuery: "The Mall of Cyprus Nicosia",
  },
  {
    name: "Kings Avenue Mall",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    anchors: "Zara, H&M, Marks & Spencer food section, Alphamega, cinema",
    why: "Paphos's main mall. Compact but well-curated. Walkable from the Kato Paphos hotel strip. Good mix of fashion and daily-essentials anchor stores.",
    mapsQuery: "Kings Avenue Mall Paphos Cyprus",
  },
  {
    name: "Metropolis Mall",
    city: "Larnaca",
    neighbourhood: "Mackenzie / Larnaca south",
    anchors: "Zara, H&M, Pull&Bear, Carrefour, cinema, food court",
    why: "Larnaca's main mall, opened 2020. Modern layout with a large Carrefour hypermarket anchor. The cinema and food court make it a destination visit, not just a shopping run.",
    mapsQuery: "Metropolis Mall Larnaca Cyprus",
  },
];

// ---------------------------------------------------------------------------
// Markets — flat array with city field for filter
// ---------------------------------------------------------------------------

export const MARKETS: ReadonlyArray<Market> = [
  {
    name: "Limassol Municipal Market (Agora)",
    city: "Limassol",
    neighbourhood: "Old Town, Saripolou",
    when: "Mon–Sat 06:00–14:00; Fri until 18:00",
    what: "Fresh fruit, vegetables, meat, fish, olives, halloumi, dried herbs, Cypriot spoon sweets. Cheaper than supermarkets for produce. The Friday afternoon session is the busiest.",
    mapsQuery: "Limassol Municipal Market Old Town Cyprus",
  },
  {
    name: "Limassol Saturday Farmers Market",
    city: "Limassol",
    neighbourhood: "Makarios III Avenue area (rotates)",
    when: "Saturdays 07:00–13:00",
    what: "Organic and smallholder producers. Seasonal fruit, vegetables, eggs, honey, preserved foods. Smaller than the Agora but more direct-from-farmer.",
    mapsQuery: "Limassol Saturday Farmers Market Cyprus",
  },
  {
    name: "Nicosia Municipal Market",
    city: "Nicosia",
    neighbourhood: "Old city, near Omeriye Mosque",
    when: "Mon–Sat 06:00–14:00",
    what: "Produce, meat, fish, spices. The old-city atmosphere is part of the visit. Go early (before 09:00) for the freshest fish.",
    mapsQuery: "Nicosia Municipal Market Old Town Cyprus",
  },
  {
    name: "Larnaca Laiki Agora",
    city: "Larnaca",
    neighbourhood: "Ermou Street, Larnaca centre",
    when: "Tue, Thu, Sat 06:00–13:00",
    what: "Vegetables, fruit, herbs, dairy. Smaller than Limassol or Nicosia markets but convenient for daily fresh produce without driving to a large supermarket.",
    mapsQuery: "Larnaca Laiki Agora Market Cyprus",
  },
  {
    name: "Paphos Municipal Market",
    city: "Paphos",
    neighbourhood: "Agoras Street, Paphos centre",
    when: "Mon–Sat 06:30–14:00",
    what: "Local produce, halloumi, olives, herbs. Compact but authentically local. Avoid tourist souvenir stalls near the entrance — the real market is inside.",
    mapsQuery: "Paphos Municipal Market Cyprus",
  },
  {
    name: "Paralimni Laiki Agora",
    city: "Ayia Napa",
    neighbourhood: "Paralimni town centre",
    when: "Wed and Sat 07:00–13:00",
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
    tip: "Use Amazon UK, not .com or .de. Amazon UK ships most items to Cyprus directly. Typical delivery 3–7 working days. Items above €22 in declared value may attract VAT (19%) at customs — factor this into pricing.",
  },
  {
    name: "AliExpress",
    url: "https://www.aliexpress.com",
    category: "delivery",
    tip: "Very cheap but delivery to Cyprus takes 3–6 weeks. Useful for accessories, phone cases, small electronics, and kitchenware where speed is not critical. Items under €22 typically clear customs without extra charges.",
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
    tip: "Active in Cyprus, especially Limassol and Nicosia. Good for second-hand furniture and electronics from expats leaving. Search in both English and Greek for wider results. Meet in public for transactions.",
  },
  {
    name: "eBay (UK/EU sellers)",
    url: "https://www.ebay.co.uk",
    category: "marketplace",
    tip: "Search for EU or UK sellers specifically. Delivery from UK sellers to Cyprus typically 5–10 days. Good for brand-name electronics and hard-to-find items. Avoid US sellers — shipping is disproportionately expensive.",
  },
];
