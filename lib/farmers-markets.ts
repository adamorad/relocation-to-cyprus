/**
 * Farmers Markets & Local Produce section content.
 *
 * Curation: municipal markets, weekly laiki agorai (people's markets), and
 * regular farmers markets across Cyprus. Data sourced from Cyprus Municipality
 * websites, Cyprus Agrotourism Company listings, and local knowledge. Opening
 * times and days can change seasonally — verify before visiting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type FarmersMarket = {
  name: string;
  city: City;
  location: string;
  dayOfWeek: string;
  hours: string;
  produces: string[];
  why: string;
  parkingNotes?: string;
};

export type MarketTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// All days of the week that markets operate (for filter chips)
// ---------------------------------------------------------------------------

export const ALL_MARKET_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type MarketDay = (typeof ALL_MARKET_DAYS)[number];

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const MARKET_TIPS: ReadonlyArray<MarketTip> = [
  {
    heading: "Arrive early for best selection",
    body: "Most market vendors sell out of premium items — fresh halloumi, seasonal berries, the best tomatoes — by 09:00. Arriving at opening time (usually 06:00–07:00) gives you first pick and the chance to talk to growers directly.",
  },
  {
    heading: "Haggling is mildly acceptable",
    body: "Light price negotiation is tolerated, especially when buying in larger quantities or near the end of market day. Aggressive haggling is considered rude. Asking 'kalitero timi' (a better price) for a box of produce is fine; pushing hard on single items is not.",
  },
  {
    heading: "Cash is preferred",
    body: "Most stalls at laiki agorai and smaller farmers markets are cash only. A few of the larger municipal market vendors now accept card, but bring €20–30 in small notes to be safe. ATMs are usually near the market area.",
  },
  {
    heading: "Seasonal produce differs from Northern Europe",
    body: "Cyprus's produce calendar runs differently: tomatoes, courgettes, peppers, and watermelons peak June–September; citrus (oranges, lemons, mandarins) is excellent November–February; strawberries appear February–April; table grapes ripen August–October. The outdoor laiki agorai track the seasons closely — what is piled high is what is in season and cheap.",
  },
];

// ---------------------------------------------------------------------------
// Markets
// ---------------------------------------------------------------------------

export const FARMERS_MARKETS: ReadonlyArray<FarmersMarket> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Limassol Municipal Market (Agora)",
    city: "Limassol",
    location: "Kanigos Square, Limassol Old Town",
    dayOfWeek: "Monday",
    hours: "06:00–13:00",
    produces: ["vegetables", "fruit", "olives", "halloumi", "herbs", "eggs"],
    why: "The historic covered municipal market in the heart of Limassol's Old Town. A permanent structure housing dedicated stalls for produce, dairy, meat, and deli goods. Excellent for fresh halloumi direct from village producers and a wide range of local herbs.",
    parkingNotes:
      "Street parking on nearby side streets; Anexartisias St car park is 5-minute walk.",
  },
  {
    name: "Limassol Laiki Agora — Agios Ioannis",
    city: "Limassol",
    location: "Agios Ioannis neighbourhood, central Limassol",
    dayOfWeek: "Wednesday",
    hours: "06:00–13:00",
    produces: [
      "seasonal vegetables",
      "citrus",
      "tomatoes",
      "local honey",
      "olives",
    ],
    why: "The main Wednesday street market for central Limassol residents. Dozens of small grower stalls selling seasonal produce at wholesale-adjacent prices. One of the best spots to buy local Cypriot tomatoes in summer and citrus in winter.",
    parkingNotes: "Arrive before 07:30 to find street parking nearby.",
  },
  {
    name: "Limassol Laiki Agora — Germasogeia",
    city: "Limassol",
    location: "Germasogeia, east Limassol",
    dayOfWeek: "Saturday",
    hours: "06:00–13:00",
    produces: ["fruit", "vegetables", "local bread", "herbs", "dried legumes"],
    why: "Serving the expat-heavy eastern suburbs of Limassol. Good range of produce with a mix of Cypriot growers and small vendors. Saturday timing makes it the most accessible market for working families.",
    parkingNotes: "Dedicated market car park available nearby.",
  },
  {
    name: "Limassol Organic Farmers Market — Dasoupolis",
    city: "Limassol",
    location: "Dasoupolis Park, Limassol",
    dayOfWeek: "Saturday",
    hours: "08:00–13:00",
    produces: [
      "organic vegetables",
      "natural honey",
      "artisan bread",
      "homemade preserves",
      "cold-pressed olive oil",
    ],
    why: "A smaller, curated organic market with verified growers. Prices are higher than the laiki agora but produce is certified organic and traceable. Popular with the expat community and foodies. Some vendors offer home-made carob products unique to Cyprus.",
    parkingNotes: "Free parking in the park car park; fills up by 09:30 on busy Saturdays.",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Nicosia Municipal Market",
    city: "Nicosia",
    location: "Diocletian Street, Nicosia Old City (inside the Venetian walls)",
    dayOfWeek: "Monday",
    hours: "06:00–14:00",
    produces: [
      "vegetables",
      "fruit",
      "halloumi",
      "fresh herbs",
      "village sausages",
      "olives",
    ],
    why: "The most historic covered market in Cyprus, built in the 1930s under British administration. Inside the Venetian walls of Nicosia, it has a permanent arcade of stalls. Best range of village-made products (loukanika sausages, fresh anari cheese) in the capital.",
    parkingNotes:
      "Parking within the old city is limited; use the Eleftheria Square car park and walk.",
  },
  {
    name: "Nicosia Laiki Agora — Engomi",
    city: "Nicosia",
    location: "Engomi, west Nicosia",
    dayOfWeek: "Wednesday",
    hours: "06:00–13:00",
    produces: ["seasonal produce", "citrus", "potatoes", "onions", "greens"],
    why: "The most convenient weekly market for residents of Engomi and Strovolos. A no-frills street market with competitive prices from small producers. Good source for bulk citrus in winter months.",
    parkingNotes: "Street parking available early; limited after 08:00.",
  },
  {
    name: "Nicosia Laiki Agora — Latsia",
    city: "Nicosia",
    location: "Latsia, south-east Nicosia",
    dayOfWeek: "Friday",
    hours: "06:00–13:00",
    produces: ["vegetables", "fruit", "eggs", "dried herbs", "legumes"],
    why: "Serving the southern Nicosia suburbs. Particularly strong for dried goods — lentils, chickpeas, dried herbs — and seasonal vegetables. A reliable source for local farm eggs.",
    parkingNotes: "Adequate street and off-street parking near the market.",
  },
  {
    name: "Nicosia Farmers Market — Strovolos",
    city: "Nicosia",
    location: "Strovolos Municipal Park, Nicosia",
    dayOfWeek: "Saturday",
    hours: "07:00–13:00",
    produces: [
      "organic produce",
      "honey",
      "village bread",
      "local wine",
      "carob syrup",
    ],
    why: "A weekend farmers market popular with young Nicosia families. Vendors include small-scale organic growers, artisan food producers, and beekeepers. The carob products (syrup, flour, chocolate) are a Cyprus specialty worth discovering here.",
    parkingNotes: "Strovolos Municipal Park has its own car park.",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca Municipal Market",
    city: "Larnaca",
    location: "Ermou Street, central Larnaca",
    dayOfWeek: "Monday",
    hours: "06:00–13:30",
    produces: ["vegetables", "fruit", "fish", "olives", "halloumi", "herbs"],
    why: "Larnaca's historic covered municipal market, one of the oldest in Cyprus. The fish section is particularly good — Larnaca's position on the coast means fresh daily catches from the salt lake fisheries. Also excellent for fresh herbs and village produce.",
    parkingNotes: "On-street parking on Ermou Street; early morning has reasonable availability.",
  },
  {
    name: "Larnaca Laiki Agora — Drosia",
    city: "Larnaca",
    location: "Drosia neighbourhood, Larnaca",
    dayOfWeek: "Thursday",
    hours: "06:00–13:00",
    produces: ["vegetables", "citrus", "local honey", "seasonal fruit"],
    why: "The main Thursday produce market for Larnaca residents. Straightforward, affordable, and well-stocked with seasonal produce from the Larnaca region farms. Particularly known for good-value bulk citrus in winter.",
    parkingNotes: "Street parking available; market takes up most of the road so plan time.",
  },
  {
    name: "Larnaca Saturday Farmers Market",
    city: "Larnaca",
    location: "Finikoudes Promenade area, Larnaca",
    dayOfWeek: "Saturday",
    hours: "07:00–13:00",
    produces: [
      "organic vegetables",
      "artisan olive oil",
      "flavoured olives",
      "preserves",
      "fresh bread",
    ],
    why: "A growing artisan-focused Saturday market on Larnaca's famous palm-lined promenade. Vendors tend toward small-batch and premium products — flavoured olive oils, spiced olives, homemade jams, organic herbs. A pleasant morning outing combined with a seafront walk.",
    parkingNotes: "Finikoudes seafront parking fills early on weekends; arrive before 08:00.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos Municipal Market",
    city: "Paphos",
    location: "Agoras Street, Kato Paphos",
    dayOfWeek: "Monday",
    hours: "06:00–13:00",
    produces: [
      "vegetables",
      "fruit",
      "halloumi",
      "anari cheese",
      "village bread",
      "olives",
    ],
    why: "The main covered market in Paphos, located in the heart of Kato Paphos near the archaeological site. Good mix of Paphos region produce — the district produces excellent citrus, almonds, and carobs. Village producers often sell their own halloumi here.",
    parkingNotes: "Municipal car park on Apostolou Pavlou Ave is a 5-minute walk.",
  },
  {
    name: "Paphos Laiki Agora — Chlorakas",
    city: "Paphos",
    location: "Chlorakas, north Paphos",
    dayOfWeek: "Tuesday",
    hours: "06:00–13:00",
    produces: ["seasonal vegetables", "herbs", "citrus", "potatoes", "onions"],
    why: "Serving the large expat community in northern Paphos. Straightforward produce market with good prices on everyday vegetables and seasonal fruit. Popular with both Cypriot locals and British expats who have settled in the area.",
    parkingNotes: "Adequate parking near the market area.",
  },
  {
    name: "Paphos Saturday Artisan Market",
    city: "Paphos",
    location: "Kennedy Square, Paphos town",
    dayOfWeek: "Saturday",
    hours: "08:00–14:00",
    produces: [
      "organic herbs",
      "local honey",
      "handmade preserves",
      "cold-pressed olive oil",
      "dried fruit",
      "carob products",
    ],
    why: "A well-established Saturday artisan market in central Paphos, combining farmers and craft vendors. Particularly strong for honey and olive oil from the Paphos hills. One of the most tourist-accessible markets in Cyprus without losing its authentic character.",
    parkingNotes: "Kennedy Square has paid parking; arrive early for a free street space.",
  },
];
