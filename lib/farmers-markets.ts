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
  /** Display label, e.g. "Saturday" or "Monday to Saturday". */
  dayOfWeek: string;
  /** Days the market runs, for the day filter (defaults to [dayOfWeek]). */
  days?: ReadonlyArray<string>;
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
    location: "Saripolou Square / Kanari Street, Old Town",
    dayOfWeek: "Monday to Saturday",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hours: "06:00–15:00 (check with Limassol Municipality)",
    produces: ["vegetables", "fruit", "olives", "halloumi", "herbs", "eggs"],
    why: "The historic covered municipal market in the heart of Limassol's Old Town. A permanent structure housing dedicated stalls for produce, dairy, meat, and deli goods. Excellent for fresh halloumi direct from village producers and a wide range of local herbs.",
    parkingNotes:
      "Street parking on nearby side streets; Anexartisias St car park is 5-minute walk.",
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


  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca Municipal Market",
    city: "Larnaca",
    location: "Larnaca centre (the rebuilt market by Zouhouri)",
    dayOfWeek: "Monday to Saturday",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hours: "07:00–19:00 (to 18:00 Nov–Feb); open-air farmers' market Saturday 06:00–13:30",
    produces: ["vegetables", "fruit", "fish", "olives", "halloumi", "herbs"],
    why: "Larnaca's covered municipal market, rebuilt and reopened in the town centre. The fish section is good. Also excellent for fresh herbs and village produce.",
    parkingNotes: "On-street parking on Ermou Street; early morning has reasonable availability.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos Municipal Market",
    city: "Paphos",
    location: "Agoras Street, Paphos old town (Ktima)",
    dayOfWeek: "Monday to Saturday",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hours: "Morning to early afternoon (check with Paphos Municipality)",
    produces: [
      "vegetables",
      "fruit",
      "halloumi",
      "anari cheese",
      "village bread",
      "olives",
    ],
    why: "The main covered market in Paphos, in the old town (Ktima) by Kennedy Square. Good mix of Paphos region produce: the district produces excellent citrus, almonds, and carobs. Village producers often sell their own halloumi here.",
  },
];
