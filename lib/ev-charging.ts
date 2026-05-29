/**
 * EV Charging section content.
 *
 * Cyprus's public charging network is growing rapidly. As of 2025 there
 * are approximately 200 public charge points, concentrated in Limassol
 * and Nicosia. Fast DC chargers are still sparse outside those two cities.
 * Home charging via a Type 2 wall box is strongly recommended.
 *
 * Data reflects 2025/26 network information. Operators add and move
 * chargers frequently — always verify with the operator's app or
 * PlugShare before a long-distance journey.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type ChargerType = "Type2-AC" | "CCS-DC" | "CHAdeMO";

export type EVCharger = {
  name: string;
  operator: string;
  city: City;
  location: string;
  chargerTypes: ChargerType[];
  maxKw: number;
  numberOfPoints: number;
  cost: string;
  why: string;
  mapsLink?: string;
};

export type EVTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Type metadata
// ---------------------------------------------------------------------------

export const ALL_CHARGER_TYPES: ReadonlyArray<ChargerType> = [
  "Type2-AC",
  "CCS-DC",
  "CHAdeMO",
];

export const CHARGER_TYPE_LABEL: Record<ChargerType, string> = {
  "Type2-AC": "Type 2 AC (up to 22 kW)",
  "CCS-DC": "CCS DC Fast Charge",
  CHAdeMO: "CHAdeMO DC",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const EV_TIPS: ReadonlyArray<EVTip> = [
  {
    heading: "~200 public chargers on the island (2025)",
    body: "Cyprus had approximately 200 public charge points as of 2025, with the number growing steadily. The density is reasonable in Limassol and Nicosia but thin in Paphos and almost absent in villages and rural areas. Plan longer journeys carefully, especially westward toward the Akamas Peninsula.",
  },
  {
    heading: "Fast DC chargers still sparse outside the main cities",
    body: "CCS DC fast chargers (50 kW+) are concentrated in Limassol, Nicosia, and Larnaca. Paphos has a small number; Ayia Napa has very few outside resort sites. If you drive a vehicle that only accepts CCS rapid charging, you need to plan routes around the known hub locations.",
  },
  {
    heading: "Home charging is strongly recommended",
    body: "Given the public network limitations, installing a Type 2 wall box at home (or arranging with your landlord) is strongly advised. A 7 kW home charger costs €600–€1,200 installed; many EVs will be fully charged overnight. The EAC (Electricity Authority of Cyprus) runs a home charging incentive scheme — check eac.com.cy for current grants.",
  },
  {
    heading: "EAC rolling out a new public network",
    body: "The state electricity authority EAC has been actively expanding its public EV infrastructure since 2024, adding chargers at supermarkets, shopping malls, municipal car parks, and highway rest areas. This is the fastest-growing part of the Cypriot charging network and new sites are added monthly.",
  },
];

// ---------------------------------------------------------------------------
// Charging locations
// ---------------------------------------------------------------------------

export const EV_CHARGERS: ReadonlyArray<EVCharger> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "EAC Limassol Marina Charger",
    operator: "EAC",
    city: "Limassol",
    location: "Limassol Marina, Old Port area",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 4,
    cost: "~€0.35/kWh via EAC app",
    why: "Well-located fast charger at the upscale marina development. Good for a top-up while dining at the marina restaurants. CCS fast charge gets most EVs to 80% in under an hour.",
    mapsLink: "https://maps.google.com/?q=Limassol+Marina+EV+Charging",
  },
  {
    name: "Verbund Limassol My Mall",
    operator: "Verbund",
    city: "Limassol",
    location: "My Mall Limassol, Anexartisias Street",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 6,
    cost: "~€0.38/kWh via Verbund app",
    why: "Shopping mall chargers — charge while you shop. My Mall is Limassol's main mall. Covered parking, good connector variety, and a reliable Verbund network with an English-language app.",
    mapsLink: "https://maps.google.com/?q=My+Mall+Limassol+EV+Charging",
  },
  {
    name: "EAC Limassol City Centre",
    operator: "EAC",
    city: "Limassol",
    location: "Municipal car park, Limassol city centre",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 4,
    cost: "~€0.30/kWh via EAC app",
    why: "Convenient for running city-centre errands. AC chargers suitable for topping up during a 1–2 hour visit to Old Town or the government offices nearby.",
    mapsLink: "https://maps.google.com/?q=Limassol+City+Centre+EV+Charging",
  },
  {
    name: "Tesla Supercharger Limassol",
    operator: "Tesla",
    city: "Limassol",
    location: "Germasogeia tourist strip area",
    chargerTypes: ["CCS-DC"],
    maxKw: 150,
    numberOfPoints: 8,
    cost: "Tesla pricing — billed per kWh to Tesla account",
    why: "The fastest charge in Limassol. Open to non-Tesla vehicles (CCS) since the network opened to third parties. V3 Superchargers at up to 150 kW make this the best rapid-charge option on the island.",
    mapsLink: "https://maps.google.com/?q=Tesla+Supercharger+Limassol",
  },
  {
    name: "EAC Jumbo Limassol",
    operator: "EAC",
    city: "Limassol",
    location: "Jumbo hypermarket, Limassol ring road",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 4,
    cost: "~€0.35/kWh via EAC app",
    why: "Practical location at one of Limassol's largest hypermarkets. Top up while doing a big shop. Good connector availability and reliable uptime — Jumbo is a key anchor location for the EAC network.",
    mapsLink: "https://maps.google.com/?q=Jumbo+Limassol+EV+Charging",
  },
  {
    name: "IONITY Limassol Hub",
    operator: "IONITY",
    city: "Limassol",
    location: "Limassol motorway service area (A1)",
    chargerTypes: ["CCS-DC"],
    maxKw: 150,
    numberOfPoints: 4,
    cost: "~€0.79/kWh without plan; lower with IONITY Passport subscription",
    why: "Pan-European IONITY fast charger at the main highway service area. Critical for east–west highway journeys. High power output and reliable uptime typical of the IONITY network.",
    mapsLink: "https://maps.google.com/?q=IONITY+Limassol",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "EAC Nicosia The Mall of Cyprus",
    operator: "EAC",
    city: "Nicosia",
    location: "The Mall of Cyprus, Egkomi",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 8,
    cost: "~€0.35/kWh via EAC app",
    why: "The most-used charging hub in Nicosia. Eight points at Cyprus's largest mall means availability is generally good even at peak times. Mixed AC and DC options for different dwell times.",
    mapsLink: "https://maps.google.com/?q=Mall+of+Cyprus+EV+Charging",
  },
  {
    name: "Tesla Supercharger Nicosia",
    operator: "Tesla",
    city: "Nicosia",
    location: "Strovolos, near major retail area",
    chargerTypes: ["CCS-DC"],
    maxKw: 150,
    numberOfPoints: 6,
    cost: "Tesla pricing — billed per kWh to Tesla account",
    why: "The capital's fastest charger. Open to CCS vehicles. Strategically placed near the Strovolos retail corridor — useful for combining a charge with errands or lunch.",
    mapsLink: "https://maps.google.com/?q=Tesla+Supercharger+Nicosia",
  },
  {
    name: "Verbund Nicosia Hilton",
    operator: "Verbund",
    city: "Nicosia",
    location: "Hilton Nicosia, Archbishop Makarios III Avenue",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 4,
    cost: "~€0.38/kWh via Verbund app",
    why: "Hotel-based charger accessible to non-guests. Useful for those attending business meetings or events at the Hilton or nearby embassies. Reserve via the Verbund app.",
    mapsLink: "https://maps.google.com/?q=Hilton+Nicosia+EV+Charging",
  },
  {
    name: "EAC Nicosia Old City Lot",
    operator: "EAC",
    city: "Nicosia",
    location: "Eleftheria Square municipal car park",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 6,
    cost: "~€0.30/kWh via EAC app",
    why: "Centrally located in the newly refurbished Eleftheria Square area. Walk to the Old City walled district, government offices, or the main shopping street while the car charges. Best AC stop in central Nicosia.",
    mapsLink: "https://maps.google.com/?q=Eleftheria+Square+Nicosia+EV",
  },
  {
    name: "EAC Nicosia Strovolos Mall",
    operator: "EAC",
    city: "Nicosia",
    location: "Strovolos retail park",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 4,
    cost: "~€0.35/kWh via EAC app",
    why: "Shopping-while-charging at the main Strovolos retail zone. Covered bays, good availability outside weekends. One of the more reliable EAC nodes in the Nicosia network.",
    mapsLink: "https://maps.google.com/?q=Strovolos+Mall+Nicosia+EV",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "EAC Larnaca Airport",
    operator: "EAC",
    city: "Larnaca",
    location: "Larnaca International Airport departures car park",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 6,
    cost: "~€0.35/kWh via EAC app",
    why: "Critical location for anyone flying in or out. Charge on arrival at the airport if you have rental time before pick-up, or maintain range before a departure. The 50 kW DC option is fast enough for a meaningful top-up during a coffee.",
    mapsLink: "https://maps.google.com/?q=Larnaca+Airport+EV+Charging",
  },
  {
    name: "Verbund Finikoudes Larnaca",
    operator: "Verbund",
    city: "Larnaca",
    location: "Finikoudes promenade public car park",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 4,
    cost: "~€0.38/kWh via Verbund app",
    why: "Seafront charging on the famous palm-lined promenade. Walk the waterfront while the car charges. Good for a 1–2 hour top-up — the 22 kW AC adds roughly 80–100 km of range in that time for most EVs.",
    mapsLink: "https://maps.google.com/?q=Finikoudes+Larnaca+EV+Charging",
  },
  {
    name: "EAC Larnaca Mall",
    operator: "EAC",
    city: "Larnaca",
    location: "Metropolis Mall, Larnaca",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 4,
    cost: "~€0.35/kWh via EAC app",
    why: "The main shopping mall charger in Larnaca. Reliable EAC infrastructure with both AC and DC options. Convenient for those living in east Larnaca or driving between Larnaca and Limassol on the coastal road.",
    mapsLink: "https://maps.google.com/?q=Metropolis+Mall+Larnaca+EV",
  },
  {
    name: "EAC Larnaca Salt Lake Area",
    operator: "EAC",
    city: "Larnaca",
    location: "Salt Lake road / Hala Sultan Tekke vicinity",
    chargerTypes: ["Type2-AC"],
    maxKw: 11,
    numberOfPoints: 2,
    cost: "~€0.30/kWh via EAC app",
    why: "A slower destination charger useful for visitors to the Salt Lake and the historic Hala Sultan Tekke mosque. Slower 11 kW output — best used as a top-up during a longer visit rather than a primary charge.",
    mapsLink: "https://maps.google.com/?q=Hala+Sultan+Tekke+Larnaca+EV",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "EAC Paphos Kings Avenue Mall",
    operator: "EAC",
    city: "Paphos",
    location: "Kings Avenue Mall, Kato Paphos",
    chargerTypes: ["Type2-AC", "CCS-DC"],
    maxKw: 50,
    numberOfPoints: 4,
    cost: "~€0.35/kWh via EAC app",
    why: "The primary charging location in Paphos. Kings Avenue Mall is the main shopping anchor in Kato Paphos — the DC fast charger gets you back on the road quickly. Good availability on weekdays.",
    mapsLink: "https://maps.google.com/?q=Kings+Avenue+Mall+Paphos+EV",
  },
  {
    name: "Verbund Paphos Harbour",
    operator: "Verbund",
    city: "Paphos",
    location: "Paphos Old Harbour car park",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 2,
    cost: "~€0.38/kWh via Verbund app",
    why: "Scenic location at the old harbour, next to the medieval Paphos Castle. Two AC chargers — limited points so arrive early or check availability on the app. Ideal for a harbour walk while charging.",
    mapsLink: "https://maps.google.com/?q=Paphos+Harbour+EV+Charging",
  },
  {
    name: "Tesla Supercharger Paphos",
    operator: "Tesla",
    city: "Paphos",
    location: "Kato Paphos commercial area",
    chargerTypes: ["CCS-DC"],
    maxKw: 150,
    numberOfPoints: 4,
    cost: "Tesla pricing — billed per kWh to Tesla account",
    why: "The fastest charger in Paphos, open to all CCS vehicles. Critical for EV drivers heading from Limassol to Paphos or onward to the Akamas Peninsula (which has no public chargers). A strategic stop for any western route.",
    mapsLink: "https://maps.google.com/?q=Tesla+Supercharger+Paphos",
  },
  {
    name: "EAC Aphrodite Hills Resort",
    operator: "EAC",
    city: "Paphos",
    location: "Aphrodite Hills Resort, Kouklia",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 4,
    cost: "~€0.35/kWh via EAC app",
    why: "Destination charger at the resort complex. Primarily used by hotel guests and golf visitors, but accessible to the public. Useful if you are visiting the area or en route between Limassol and Paphos via the A6 highway.",
    mapsLink: "https://maps.google.com/?q=Aphrodite+Hills+EV+Charging",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "EAC Ayia Napa Town Centre",
    operator: "EAC",
    city: "Ayia Napa",
    location: "Ayia Napa municipal car park, town square",
    chargerTypes: ["Type2-AC"],
    maxKw: 22,
    numberOfPoints: 2,
    cost: "~€0.35/kWh via EAC app",
    why: "The primary public charger in Ayia Napa. Two points — limited but sufficient given the small permanent EV population. Most relevant for visitors or those day-tripping from Larnaca or Limassol.",
    mapsLink: "https://maps.google.com/?q=Ayia+Napa+Town+EV+Charging",
  },
  {
    name: "Nissi Beach Resort Charger",
    operator: "Private (resort)",
    city: "Ayia Napa",
    location: "Nissi Beach Resort, Nissi Bay",
    chargerTypes: ["Type2-AC"],
    maxKw: 11,
    numberOfPoints: 2,
    cost: "Complimentary for hotel guests; enquire for visitor access",
    why: "Destination charger at one of Ayia Napa's flagship resorts. Primarily for guests but worth enquiring about access. The 11 kW AC output is suitable for an overnight charge during a longer resort stay.",
    mapsLink: "https://maps.google.com/?q=Nissi+Beach+Resort+Ayia+Napa",
  },
];
