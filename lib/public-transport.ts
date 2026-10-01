/**
 * Public Transport section content.
 *
 * Cyprus is a car-dominant country. Public transport exists but is limited
 * in frequency, coverage, and reliability, especially outside the main
 * cities. This file summarises what is available city by city and sets
 * realistic expectations for relocators.
 *
 * Data reflects 2025/26 service levels. Route numbers and operators change;
 * verify current schedules at publictransport.com.cy before travelling.
 */

import {
  AIRPORT_EXPRESS_FARE,
  dayNight,
  eur,
  INTERCITY_FARE,
  LARNACA_BUS,
  LCA_TAXI,
  LIMASSOL_BUS,
  PAPHOS_BUS,
  PFO_TAXI,
} from "@/lib/facts/health-transport";
import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type TransportInfo = {
  city: City;
  intercityBus: string;
  intraCityBus: string;
  taxiApp: string;
  boltAvailable: boolean;
  busMonthlyPass?: number;
  keyRoutes: string[];
  verdict: string;
  tips: string[];
};

export type TransportTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// City-by-city transport breakdown
// ---------------------------------------------------------------------------

export const TRANSPORT_INFO: Record<City, TransportInfo> = {
  Limassol: {
    city: "Limassol",
    intercityBus: `InterCity Buses: services to Larnaca and Paphos, ${eur(INTERCITY_FARE.limassolLarnaca)} one way. Intercity terminal at the old port area.`,
    intraCityBus: "EMEL (intra-city): 30+ routes covering most residential and commercial areas. Frequency: every 20–40 minutes on main routes, every 60+ minutes on suburban routes. 06:00–22:00 weekdays, reduced service Sundays.",
    taxiApp: `Bolt is the primary app. Local taxi firms also operate; Limassol Taxi is the main licensed dispatcher. Airport taxis charge fixed fares to Limassol: ${eur(LCA_TAXI.limassol.day)} (night ${eur(LCA_TAXI.limassol.night)}) from Larnaca and ${eur(PFO_TAXI.limassol.day)} (night ${eur(PFO_TAXI.limassol.night)}) from Paphos.`,
    boltAvailable: true,
    busMonthlyPass: LIMASSOL_BUS.monthly,
    keyRoutes: [
      "Route 30 — Seafront / Tourist Strip to City Centre",
      "Route 17 — Old Port to Germasogeia",
      "Route 20 — City Centre to Polemidia / University",
      `InterCity Buses: Limassol to Paphos (${eur(INTERCITY_FARE.limassolPaphos)})`,
      `InterCity Buses: Limassol to Larnaca (${eur(INTERCITY_FARE.limassolLarnaca)})`,
    ],
    verdict: "The most functional public transport network of the cities covered here. The seafront corridor is well-served; suburbs and inland areas less so. Bolt is genuinely reliable in the city. A car is still needed for schools, shopping centres, and coastal villages.",
    tips: [
      "The EMEL app (or Google Maps) shows real-time bus positions for Limassol routes.",
      "Monthly passes are loaded onto a smart card — buy from the EMEL office near the old port.",
      "Bolt surge pricing applies Friday and Saturday nights — pre-book or allow extra budget.",
      `The Limassol Airport Express runs from Larnaca and Paphos airports to Limassol (${eur(AIRPORT_EXPRESS_FARE.adult)}, children ${eur(AIRPORT_EXPRESS_FARE.child)}).`,
    ],
  },

  Paphos: {
    city: "Paphos",
    intercityBus: `InterCity Buses: to Limassol ${eur(INTERCITY_FARE.limassolPaphos)}; a Larnaca–Limassol–Paphos route runs to Larnaca for ${eur(INTERCITY_FARE.larnacaPaphos)}.`,
    intraCityBus: "OSYPA (Pafos Buses, intra-city): smaller network than Limassol. Covers Kato Paphos, Paphos town centre, and Chlorakas. Frequency: every 30–60 minutes. Night tickets are sold after 21:00 on some routes. Patchy suburban coverage.",
    taxiApp: `Bolt operates in Paphos with reasonable coverage. Local taxi firms available for airport transfers. Paphos Airport to Kato Paphos is a fixed ${eur(PFO_TAXI.katoPaphos.day)} (${eur(PFO_TAXI.katoPaphos.night)} at night).`,
    boltAvailable: true,
    busMonthlyPass: PAPHOS_BUS.monthlyPersonalised,
    keyRoutes: [
      "Routes 612 and 613: Paphos Airport to Tombs of the Kings and Karavella stations",
      "Route 610 — Kato Paphos Harbour to Town Centre",
      "Route 630 — Town Centre to Chlorakas / Coral Bay direction",
      `InterCity Buses: Paphos to Limassol (${eur(INTERCITY_FARE.limassolPaphos)})`,
    ],
    verdict: "Functional within the Kato Paphos tourist corridor, thin elsewhere. The village lifestyle that attracts many Paphos relocators is almost entirely car-dependent. Bolt availability is decent in the main areas but sparse in northern Paphos and the villages.",
    tips: [
      `OSYPA routes 612 and 613 run to Paphos Airport year-round (${eur(PAPHOS_BUS.single)}), the cheapest way to arrive without a rental.`,
      "Coral Bay and the Akamas villages are not served by regular buses — a car is mandatory for those areas.",
      "Paphos is flat and compact around the harbour — walking and cycling are realistic alternatives to the bus within Kato Paphos.",
    ],
  },

  Larnaca: {
    city: "Larnaca",
    intercityBus: `InterCity Buses: to Limassol ${eur(INTERCITY_FARE.limassolLarnaca)}, to Ayia Napa ${eur(INTERCITY_FARE.larnacaAyiaNapa)}. Terminal near the old port / seafront.`,
    intraCityBus: "Cyprus Public Transport (intra-city): moderate network covering the city centre, Finikoudes area, airport, and main residential zones. Frequency: every 30–60 minutes. Service ends ~21:00.",
    taxiApp: `Bolt is active in Larnaca. Licensed airport taxis charge fixed fares. Airport to Larnaca centre is ${dayNight(LCA_TAXI.larnacaCentre)}.`,
    boltAvailable: true,
    busMonthlyPass: LARNACA_BUS.monthlyPersonalised,
    keyRoutes: [
      "Route 425 — Larnaca Airport to City Centre / Finikoudes",
      "Route 410 — City Centre to Drosia / residential north",
      "Route 480 — City Centre to Salt Lake / Hala Sultan Tekke",
      `InterCity Buses: Larnaca to Limassol (${eur(INTERCITY_FARE.limassolLarnaca)})`,
    ],
    verdict: "The airport connection is the standout strength — Route 425 runs frequently and cheaply. City-centre coverage is reasonable; suburbs require a car. Larnaca is compact enough that cycling is viable for many errands in the flat centre.",
    tips: [
      "The Finikoudes seafront promenade area is walkable from the bus terminal — no need for a taxi into town.",
      "Larnaca has the best cycle-friendly terrain in Cyprus — flat, sea-level, and relatively quiet roads.",
    ],
  },

  "Ayia Napa": {
    city: "Ayia Napa",
    intercityBus: `InterCity Buses: to Larnaca ${eur(INTERCITY_FARE.larnacaAyiaNapa)}. Local buses link Ayia Napa with Paralimni and Protaras. Very limited direct services to Limassol.`,
    intraCityBus: "OSEA (intra-city): basic network covering Ayia Napa town centre, Nissi Bay, and Cape Greco. Frequency: every 30–60 minutes in peak season; significantly reduced October–April.",
    taxiApp: "Bolt works in Ayia Napa but driver availability is limited outside summer. Local taxis are the primary on-demand option. Many resort transfers are pre-booked private transfers.",
    boltAvailable: true,
    busMonthlyPass: undefined,
    keyRoutes: [
      "Route 701 — Ayia Napa to Nissi Beach",
      "Route 704 — Ayia Napa to Cape Greco / Protaras",
      `InterCity Buses: Ayia Napa to Larnaca (${eur(INTERCITY_FARE.larnacaAyiaNapa)})`,
      "Route 711 — Ayia Napa Town Centre loop",
    ],
    verdict: "Highly seasonal. In July–August, the bus network within Ayia Napa and to Nissi Beach is functional for tourists. Outside peak season, service drops dramatically. For permanent residents (a small number), a car is not optional — it is essential.",
    tips: [
      "The resort area is small enough to walk or cycle during the day — many visitors never use a bus.",
      "Pre-book an airport transfer from Larnaca if arriving late at night; Bolt availability is unreliable after midnight.",
      "Paralimni and Protaras are better bases for year-round residents than Ayia Napa town, with more reliable everyday services.",
      "Bus schedules change significantly between April (start of season) and November (end of season) — always check current timetables.",
    ],
  },
};

// ---------------------------------------------------------------------------
// General tips
// ---------------------------------------------------------------------------

export const TRANSPORT_TIPS: ReadonlyArray<TransportTip> = [
  {
    heading: "Cyprus runs on cars",
    body: "Public transport is a complement, not a substitute. Most expat families run at least one car. Infrastructure, school locations, supermarkets, and social life are built around the assumption of a car. If you are coming from a city with a metro, adjust your expectations significantly.",
  },
  {
    heading: "Bus unreliable in rural areas",
    body: "Villages — and there are many beautiful ones worth considering for relocation — typically have no scheduled bus service at all. Even suburban areas of the main cities have hourly or less-frequent services. Living outside the main corridors means a car is non-negotiable.",
  },
  {
    heading: "Bolt works in all main cities",
    body: "Bolt (the European ride-hailing app) operates across all four cities covered here and is the most reliable on-demand option. Download it before you arrive. Uber does not operate in Cyprus.",
  },
  {
    heading: "Taxi fixed airport rates",
    body: `Taxis from Larnaca and Paphos airports charge fixed fares set by law, per taxi for up to 4 passengers with luggage included. Larnaca Airport to central Larnaca is ${eur(LCA_TAXI.larnacaCentre.day)}; to Limassol ${eur(LCA_TAXI.limassol.day)} (${eur(LCA_TAXI.limassol.night)} at night). Paphos Airport to Kato Paphos is ${eur(PFO_TAXI.katoPaphos.day)} (${eur(PFO_TAXI.katoPaphos.night)} at night); to Limassol ${eur(PFO_TAXI.limassol.day)} (${eur(PFO_TAXI.limassol.night)} at night).`,
  },
  {
    heading: "The intercity bus network is good value",
    body: `InterCity Buses coaches are clean, air-conditioned, punctual on the main routes, and cheap at ${eur(INTERCITY_FARE.min)}–${eur(INTERCITY_FARE.max)} one way. The Limassol–Paphos corridor is frequent and convenient for occasional trips. Check intercity-buses.com for current timetables.`,
  },
];
