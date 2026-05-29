/**
 * Wineries & Wine Tourism section content.
 *
 * Research sources: Cyprus Wine Products Council, wineries' own sites,
 * Cyprus Tourism Organisation wine route listings, Wine Routes of Cyprus.
 * Tasting availability and opening hours change seasonally — verify before visiting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type Winery = {
  name: string;
  city: City;
  /** Village name if not in the city centre (most Troodos wineries are in villages). */
  village?: string;
  grapeVarieties: string[];
  tastingAvailable: boolean;
  tourAvailable: boolean;
  restaurantOnSite: boolean;
  /** Price band: 1=budget (tastings free or <€5), 2=mid (€5–15), 3=premium (>€15). */
  priceRange: 1 | 2 | 3;
  why: string;
  website?: string;
};

export type WineTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export const WINE_TIPS: ReadonlyArray<WineTip> = [
  {
    heading: "Commandaria is the world's oldest named wine still in production",
    body: "Commandaria has been produced continuously in the Troodos foothills since at least 1191, when Richard I served it at his wedding feast. It is a sweet amber wine made from sun-dried Xynisteri and Mavro grapes — and it holds a Protected Designation of Origin limited to 14 specific villages. Any bottle labelled Commandaria must come from this designated zone.",
  },
  {
    heading: "Maratheftiko and Xynisteri are the key local varietals",
    body: "The two indigenous grapes to know: Maratheftiko is a red variety producing deep, tannic wines with good ageing potential — think dark fruit and spice. Xynisteri is the white workhorse of Cyprus, producing fresh, mineral-driven wines well suited to the island's seafood. Seek out bottles featuring these rather than the international varieties.",
  },
  {
    heading: "The wine village route runs through the Troodos foothills",
    body: "The Krasochoria (wine villages) route links Omodos, Arsos, Lofou, Kilani, Vouni, and Kyperounta — all within 45 minutes of Limassol. Most wineries welcome visitors without appointments during summer. The route is best driven as a full-day loop from Limassol, ideally with a meze lunch in Omodos village.",
  },
  {
    heading: "Best visited October–November, after harvest",
    body: "The vendange (harvest) runs through September and into early October. Visiting in late October or November means seeing the winemaking process in action, tasting freshly pressed juice, and often meeting the winemakers themselves. This is also when many wineries hold harvest festivals (harvest fairs) open to the public.",
  },
];

// ---------------------------------------------------------------------------
// Wineries
// ---------------------------------------------------------------------------

export const WINERIES: ReadonlyArray<Winery> = [
  // ── Limassol district — Troodos foothills ─────────────────────────────────
  {
    name: "LOEL Winery",
    city: "Limassol",
    village: "Limassol (city winery)",
    grapeVarieties: ["Xynisteri", "Mavro", "Maratheftiko", "Cabernet Sauvignon"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 1,
    why: "One of Cyprus's largest wine producers, based in Limassol itself. LOEL produces a wide range including the well-regarded Ambelida and Nefeli labels. Tours of the production facility run year-round and give an excellent overview of the modern Cypriot wine industry.",
    website: "https://www.loel.com.cy",
  },
  {
    name: "Keo Winery",
    city: "Limassol",
    village: "Limassol (city winery)",
    grapeVarieties: ["Xynisteri", "Mavro", "Cabernet Sauvignon", "Shiraz"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 1,
    why: "Cyprus's most famous wine brand, also the producer of Commandaria St. John. KEO's Limassol winery is one of the oldest operational wineries on the island. The guided tour covers the history of winemaking in Cyprus and includes tastings of the full range.",
    website: "https://www.keo.com.cy",
  },
  {
    name: "Zambartas Winery",
    city: "Limassol",
    village: "Agios Amvrosios",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Lefkada", "Shiraz"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 2,
    why: "Boutique family winery in the Troodos foothills, run by father and son Marc and Akis Zambartas. Among the most critically acclaimed Cypriot producers, known for showcasing indigenous varieties with a modern winemaking approach. Book tastings in advance.",
    website: "https://www.zambartas.com",
  },
  {
    name: "Vouni Panayia Winery",
    city: "Paphos",
    village: "Panayia",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Spourtiko", "Promara"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 2,
    why: "High-altitude winery in the Paphos hills, one of the highest in Cyprus at around 1,100m. Specialises in indigenous Cypriot varieties rarely found elsewhere, including the white Promara. The elevation produces wines with notable freshness and acidity.",
    website: "https://www.vounipanayia.com.cy",
  },
  {
    name: "Tsiakkas Winery",
    city: "Limassol",
    village: "Pelendri",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Cabernet Sauvignon", "Merlot"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 2,
    why: "Family winery in the Commandaria zone at Pelendri, producing both table wines and Commandaria. The Tsiakkas Commandaria is considered one of the finest expressions of the style. High-altitude vineyards above 800m produce wines with exceptional aromatic complexity.",
    website: "https://www.tsiakkas.com.cy",
  },
  {
    name: "Kyperounda Winery",
    city: "Limassol",
    village: "Kyperounta",
    grapeVarieties: ["Xynisteri", "Maratheftiko", "Cabernet Sauvignon", "Chardonnay"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: true,
    priceRange: 2,
    why: "One of Cyprus's most visited wineries, situated at 1,400m in Kyperounta village — the highest point in the Troodos wine route. The tasting room and restaurant have panoramic mountain views. The Petritis range is particularly well regarded.",
    website: "https://www.kyperounda.com",
  },
  {
    name: "Argyrides Winery",
    city: "Limassol",
    village: "Omodos",
    grapeVarieties: ["Xynisteri", "Maratheftiko", "Grenache", "Shiraz"],
    tastingAvailable: true,
    tourAvailable: false,
    restaurantOnSite: false,
    priceRange: 1,
    why: "Small family winery in Omodos, the most tourist-visited wine village in Cyprus. Accessible location in the village square makes it ideal for a drop-in tasting on the Krasochoria route. Honest, well-made wines at fair prices.",
  },
  {
    name: "Gerolemo Winery",
    city: "Limassol",
    village: "Omodos",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Shiraz"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: true,
    priceRange: 2,
    why: "One of the standout boutique producers in Omodos. The Gerolemo tasting room and restaurant in the village is a popular stopping point on any Troodos wine tour. Strong focus on Maratheftiko — the flagship red of Cyprus.",
    website: "https://www.gerolemo.com",
  },
  {
    name: "Vasa Winery",
    city: "Limassol",
    village: "Vasa Koilaniou",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Lefkada"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 1,
    why: "Small winery in the quiet village of Vasa Koilaniou, one of the designated Commandaria villages. Family-run with a personal touch — the winemaker often conducts tastings personally. Excellent value for serious indigenous varieties.",
  },
  {
    name: "Constantinou Winery",
    city: "Paphos",
    village: "Stroumpi",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Cabernet Sauvignon", "Merlot"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: true,
    priceRange: 2,
    why: "One of the leading wineries in the Paphos region, based in Stroumpi village. Modern facilities, a full range from indigenous to international varieties, and a restaurant serving traditional Cypriot food paired with estate wines. A good anchor for a Paphos hills wine day.",
    website: "https://www.constantiou-winery.com",
  },
  {
    name: "Vasilikon Winery",
    city: "Paphos",
    village: "Kathikas",
    grapeVarieties: ["Xynisteri", "Maratheftiko", "Cabernet Franc", "Shiraz"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 2,
    why: "Boutique winery in Kathikas village in the Paphos hills, producing wines from estate vineyards at 600m. The Vasilikon Xynisteri is consistently one of the best whites in Cyprus. The tasting room has views over the valley towards the Akamas.",
    website: "https://www.vasilikon.com.cy",
  },
  {
    name: "Ezousa Winery",
    city: "Paphos",
    village: "Polemi",
    grapeVarieties: ["Xynisteri", "Maratheftiko", "Cabernet Sauvignon"],
    tastingAvailable: true,
    tourAvailable: false,
    restaurantOnSite: false,
    priceRange: 1,
    why: "Small winery in the Paphos hills named after the Ezousa river valley. Focus on estate-grown Xynisteri and Maratheftiko. Informal, affordable tastings — a good addition to a Kathikas–Polemi wine route day.",
  },
  {
    name: "Linos Winery",
    city: "Limassol",
    village: "Lofou",
    grapeVarieties: ["Maratheftiko", "Xynisteri", "Shiraz"],
    tastingAvailable: true,
    tourAvailable: false,
    restaurantOnSite: true,
    priceRange: 2,
    why: "Winery and traditional taverna in the beautiful preserved village of Lofou. The combination of good wine and meze in an authentic setting is hard to beat. Lofou itself is one of the most photogenic villages in Cyprus.",
  },
  {
    name: "Kamanterena Winery",
    city: "Limassol",
    village: "Agios Constantinos",
    grapeVarieties: ["Maratheftiko", "Lefkada", "Xynisteri"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 2,
    why: "Named after the Camanterena (commander's road) used by Crusaders heading to Commandaria territory. A new-generation Cypriot producer focused exclusively on indigenous varieties. The Maratheftiko is powerful and age-worthy.",
  },
  {
    name: "Sofocleous Winery",
    city: "Larnaca",
    village: "Tochni",
    grapeVarieties: ["Commandaria", "Maratheftiko", "Xynisteri"],
    tastingAvailable: true,
    tourAvailable: true,
    restaurantOnSite: false,
    priceRange: 1,
    why: "One of the Commandaria zone producers accessible from Larnaca. Family winery in the village of Tochni producing traditional Commandaria alongside table wines. Good entry point to understanding Commandaria production from a smaller, personal producer.",
  },
];
