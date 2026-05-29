/**
 * Rooftop & Sea View Bars section content.
 * Consumed by app/sections/rooftop-bars/page.tsx.
 *
 * Curation: venues are selected for view quality, cocktail culture and
 * relevance to relocators exploring Cyprus nightlife and social scenes.
 * Prices and reservation policies change seasonally — verify before quoting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type ViewType = "sea" | "rooftop" | "both";

export type ViewBar = {
  name: string;
  city: City;
  neighbourhood?: string;
  viewType: ViewType;
  /** Price range: 1=€ (<€10 cocktail), 2=€€ (€10–18), 3=€€€ (€18–28), 4=€€€€ (>€28). */
  priceRange: 1 | 2 | 3 | 4;
  cocktailsFrom?: number;
  reservationRequired: boolean;
  why: string;
  instagram?: string;
  website?: string;
};

export type ViewBarTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const VIEW_BAR_TIPS: ReadonlyArray<ViewBarTip> = [
  {
    heading: "Sunset is the golden window",
    body: "Most rooftop and sea-view bars in Cyprus hit their peak in the hour before and after sunset — typically 19:00–21:00 from May to October. The light bounces off the Med and the terraces fill fast. Arrive 30–45 minutes early or you will be waiting at the bar.",
  },
  {
    heading: "Reserve ahead in summer",
    body: "From June through September, almost every rooftop bar worth going to requires a reservation — and many enforce a minimum spend per table. Call or DM on Instagram at least 24–48 hours before you go. Walk-ins are possible at quieter shoulder-season venues, but do not count on it for a Friday or Saturday evening.",
  },
  {
    heading: "Limassol has the most density",
    body: "Limassol Marina and Limassol Old Town have the highest concentration of rooftop and sea-view venues on the island. If bar-hopping is the goal, Limassol makes the most sense as a base: you can walk between the Marina strip, the Old Port area, and the Old Town in under 20 minutes.",
  },
];

// ---------------------------------------------------------------------------
// All view types
// ---------------------------------------------------------------------------

export const ALL_VIEW_TYPES: ReadonlyArray<ViewType> = ["sea", "rooftop", "both"];

export const VIEW_TYPE_LABEL: Record<ViewType, string> = {
  sea: "Sea View",
  rooftop: "Rooftop",
  both: "Rooftop & Sea",
};

// ---------------------------------------------------------------------------
// Venues
// ---------------------------------------------------------------------------

export const VIEW_BARS: ReadonlyArray<ViewBar> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Breeze Rooftop Bar",
    city: "Limassol",
    neighbourhood: "Limassol Marina",
    viewType: "both",
    priceRange: 3,
    cocktailsFrom: 16,
    reservationRequired: true,
    why: "Atop the Four Seasons Hotel, this is the benchmark rooftop experience in Limassol — panoramic sea view, well-trained bar team, and cocktails that justify the price tag. Popular with the finance and tech expat crowd.",
    website: "https://www.fourseasons-cyprus.com",
  },
  {
    name: "Roof Garden at The Londa",
    city: "Limassol",
    neighbourhood: "Germasogeia tourist strip",
    viewType: "both",
    priceRange: 3,
    cocktailsFrom: 15,
    reservationRequired: true,
    why: "Adults-only rooftop on The Londa boutique hotel. Unobstructed sea view from a small, well-curated terrace. One of the quieter high-end options on the tourist strip — fewer tables means better service.",
    website: "https://www.londa.com.cy",
  },
  {
    name: "Guaba Beach Bar",
    city: "Limassol",
    neighbourhood: "Limassol seafront, near the Marina",
    viewType: "sea",
    priceRange: 2,
    cocktailsFrom: 12,
    reservationRequired: false,
    why: "Probably the most social beach-level sea-view bar in Limassol. Daybeds, a DJ stage, and a long cocktail menu. Not a rooftop, but the sunset view across the Med from the deck is genuinely good and it is far more relaxed about walk-ins.",
    instagram: "https://www.instagram.com/guababeachbar/",
  },
  {
    name: "Seventy Seven Sky Bar",
    city: "Limassol",
    neighbourhood: "Limassol Old Town",
    viewType: "both",
    priceRange: 3,
    cocktailsFrom: 15,
    reservationRequired: true,
    why: "High-floor bar with a full panorama over Limassol Old Town and the sea. The cocktail menu changes seasonally and the interiors have a strong design sensibility. A regular on local 'best rooftop' lists.",
    instagram: "https://www.instagram.com/77skybar/",
  },
  {
    name: "Babylon Rooftop",
    city: "Limassol",
    neighbourhood: "Limassol city centre",
    viewType: "rooftop",
    priceRange: 2,
    cocktailsFrom: 11,
    reservationRequired: false,
    why: "More casual city rooftop than the marina strip options. Good city views (less sea), affordable cocktails, and a lively young crowd. Easier to get into without a reservation mid-week.",
    instagram: "https://www.instagram.com/babylonlimassol/",
  },
  {
    name: "The Island Bar",
    city: "Limassol",
    neighbourhood: "Old Port, Limassol",
    viewType: "sea",
    priceRange: 2,
    cocktailsFrom: 11,
    reservationRequired: false,
    why: "Waterfront bar right at the Old Port with direct sea views. Relaxed atmosphere, live music some evenings, and prices noticeably gentler than the Marina strip. A neighbourhood favourite.",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Mosaic Rooftop Bar at Almyra",
    city: "Paphos",
    neighbourhood: "Kato Paphos waterfront",
    viewType: "both",
    priceRange: 3,
    cocktailsFrom: 15,
    reservationRequired: true,
    why: "The most polished rooftop in Paphos — infinity-pool-adjacent terrace on the Almyra hotel. The sea view stretches to the Paphos lighthouse and at sunset it is difficult to beat in the city. Adults-only property.",
    website: "https://www.thanoshotels.com/almyra",
  },
  {
    name: "Roof at Annabelle",
    city: "Paphos",
    neighbourhood: "Kato Paphos harbour",
    viewType: "both",
    priceRange: 3,
    cocktailsFrom: 16,
    reservationRequired: true,
    why: "The Annabelle's rooftop terrace overlooks the Paphos harbour and the castle. Mature, relaxed atmosphere compared to trendier venues. Excellent martinis. One of the most classically beautiful sea views in Paphos.",
    website: "https://www.thanoshotels.com/annabelle",
  },
  {
    name: "Seagull Rooftop",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    viewType: "sea",
    priceRange: 2,
    cocktailsFrom: 12,
    reservationRequired: false,
    why: "Mid-priced rooftop with a clear sea view toward the Paphos coastline. More accessible than the hotel options — good for a casual evening drink rather than a full cocktail evening.",
  },
  {
    name: "Ithaki Rooftop Cocktail Bar",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    viewType: "rooftop",
    priceRange: 2,
    cocktailsFrom: 11,
    reservationRequired: false,
    why: "Popular with younger expats and tourists in Kato Paphos. Reliable cocktail menu, good city and partial sea views. Does get busy in peak summer — arrive early for a terrace table.",
    instagram: "https://www.instagram.com/ithaki_paphos/",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Finikoudes Terrace",
    city: "Larnaca",
    neighbourhood: "Finikoudes promenade",
    viewType: "sea",
    priceRange: 2,
    cocktailsFrom: 10,
    reservationRequired: false,
    why: "Larnaca's most recognisable sea-view drinking spot — the palm-lined Finikoudes promenade has several bars with open terraces right on the sea. Casual, very walkable, and a classic spot to watch the plane approaches over the bay.",
  },
  {
    name: "Radisson Blu Rooftop",
    city: "Larnaca",
    neighbourhood: "Larnaca town centre",
    viewType: "both",
    priceRange: 3,
    cocktailsFrom: 14,
    reservationRequired: true,
    why: "The best high-rise rooftop view in Larnaca — the city is low-rise so the hotel floor gives a genuine panorama over the salt lake, the town, and the sea. Surprisingly underrated compared to Limassol equivalents.",
  },
  {
    name: "Art Bar Rooftop",
    city: "Larnaca",
    neighbourhood: "Larnaca old town",
    viewType: "rooftop",
    priceRange: 2,
    cocktailsFrom: 10,
    reservationRequired: false,
    why: "Creative, arty rooftop in Larnaca's old town district. Smaller and more personal than the hotel bars. Regular live music events. Good choice for a laid-back evening with local residents rather than tourists.",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Skyline Bar at Hilton Nicosia",
    city: "Nicosia",
    neighbourhood: "Engomi, west Nicosia",
    viewType: "rooftop",
    priceRange: 3,
    cocktailsFrom: 14,
    reservationRequired: false,
    why: "The capital is landlocked, so 'sea view' is off the menu — but the Hilton rooftop gives the best panoramic city view in Nicosia, stretching toward the Pentadaktylos mountains. The most reliably excellent bar in the city.",
    website: "https://www.hilton.com/en/hotels/lcanihi-hilton-nicosia",
  },
  {
    name: "Barolo Rooftop Lounge",
    city: "Nicosia",
    neighbourhood: "Nicosia city centre",
    viewType: "rooftop",
    priceRange: 2,
    cocktailsFrom: 11,
    reservationRequired: false,
    why: "City-centre rooftop bar popular with the Nicosia professional crowd. Extensive wine list alongside cocktails. No sea view but solid city panorama and a more local atmosphere than the hotel alternatives.",
    instagram: "https://www.instagram.com/barolonicosiaofficial/",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Napa Hills Beach Club",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa coastline",
    viewType: "sea",
    priceRange: 2,
    cocktailsFrom: 12,
    reservationRequired: false,
    why: "Ayia Napa's beach clubs are more about the sea-level sea view than rooftop drama — and Napa Hills does it well. Turquoise water, rock formations, sundowners. Better in shoulder season when the summer crowds thin.",
    instagram: "https://www.instagram.com/napahillsbeachclub/",
  },
  {
    name: "Kermia Beach Bungalow Hotel Bar",
    city: "Ayia Napa",
    neighbourhood: "Protaras coast",
    viewType: "sea",
    priceRange: 2,
    cocktailsFrom: 10,
    reservationRequired: false,
    why: "Quieter sea-view bar on the Protaras coastline, aimed at a more relaxed crowd. Good value cocktails and one of the clearest water views in the east of the island. Popular with families during the day, couples in the evening.",
  },
  {
    name: "Level Up Sky Bar",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town centre",
    viewType: "both",
    priceRange: 2,
    cocktailsFrom: 12,
    reservationRequired: true,
    why: "A genuine rooftop-with-sea-view option in Ayia Napa town — rare at this price point. Views extend over the town toward the bay. Gets busy in peak season so the reservation requirement is real.",
    instagram: "https://www.instagram.com/levelupayianapa/",
  },
];
