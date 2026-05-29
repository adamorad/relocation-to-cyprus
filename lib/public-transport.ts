/**
 * Public Transport section content.
 *
 * Cyprus is a car-dominant country. Public transport exists but is limited
 * in frequency, coverage, and reliability — especially outside the two main
 * cities. This file summarises what is available city by city and sets
 * realistic expectations for relocators.
 *
 * Data reflects 2025/26 service levels. Route numbers and operators change;
 * verify current schedules at publictransport.com.cy before travelling.
 */

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
    intercityBus: "OSYPA (intercity): hourly services to Nicosia (€4, ~1h 15m), Larnaca (€4, ~1h), and Paphos (€4, ~1h). Intercity terminal at the old port area.",
    intraCityBus: "EMEL (intra-city): 30+ routes covering most residential and commercial areas. Frequency: every 20–40 minutes on main routes, every 60+ minutes on suburban routes. 06:00–22:00 weekdays, reduced service Sundays.",
    taxiApp: "Bolt is the primary app. Local taxi firms also operate — Limassol Taxi is the main licensed dispatcher. Airport taxis use fixed-zone rates (~€45 to the city centre from Paphos, ~€55 from Larnaca).",
    boltAvailable: true,
    busMonthlyPass: 30,
    keyRoutes: [
      "Route 30 — Seafront / Tourist Strip to City Centre",
      "Route 17 — Old Port to Germasogeia",
      "Route 20 — City Centre to Polemidia / University",
      "OSYPA Intercity — Limassol to Nicosia (hourly, 1h 15m)",
      "OSYPA Intercity — Limassol to Paphos (hourly, 1h)",
      "OSYPA Intercity — Limassol to Larnaca (hourly, 1h)",
    ],
    verdict: "The most functional public transport network in Cyprus after Nicosia. The seafront corridor is well-served; suburbs and inland areas less so. Bolt is genuinely reliable in the city. A car is still needed for schools, shopping centres, and coastal villages.",
    tips: [
      "The EMEL app (or Google Maps) shows real-time bus positions for Limassol routes.",
      "Monthly passes are loaded onto a smart card — buy from the EMEL office near the old port.",
      "Bolt surge pricing applies Friday and Saturday nights — pre-book or allow extra budget.",
      "The airport bus (Express 1) runs between Larnaca Airport and Limassol bus terminal roughly every hour.",
    ],
  },

  Nicosia: {
    city: "Nicosia",
    intercityBus: "OSYPA (intercity): frequent connections to Limassol (€4, ~1h 15m), Larnaca (€3, ~45m), and Paphos (€5.50, ~2h). Main intercity terminal near Solomos Square.",
    intraCityBus: "OSEL (intra-city): extensive network of 30+ routes. Frequency: every 15–30 minutes on main corridors during peak hours. Covers most residential suburbs. 06:00–23:00 weekdays, reduced on Sundays.",
    taxiApp: "Bolt is active and reliable. EasyTaxi also operates in Nicosia. Licensed taxi ranks at Solomos Square and near major hotels.",
    boltAvailable: true,
    busMonthlyPass: 28,
    keyRoutes: [
      "Route 20 — City Centre to Strovolos",
      "Route 24 — Nicosia to Larnaca Airport (direct express)",
      "Route 65 — City Centre to Engomi / Embassy district",
      "OSYPA Intercity — Nicosia to Limassol (hourly, 1h 15m)",
      "OSYPA Intercity — Nicosia to Larnaca (every 30–45 min, 45m)",
      "OSYPA Intercity — Nicosia to Paphos (2–3 per day, 2h)",
    ],
    verdict: "Best-served city on the island. The OSEL network is dense enough that a car-free day is manageable for central errands. Bolt is reliable. Still, the lack of any rail or rapid transit means a car is necessary for most families with children in school.",
    tips: [
      "The Nicosia intercity bus terminal is a short walk from Solomos Square — easy to combine with errands in the Old Town.",
      "Route 24 to Larnaca Airport is the most practical airport transfer for Nicosia residents (€3, about 45 minutes).",
      "Bus frequency drops significantly between 13:00 and 15:30 (siesta hours) — plan accordingly.",
      "Bolt surge pricing is common Thursday–Saturday evenings in the Makarios Avenue restaurant/bar district.",
    ],
  },

  Paphos: {
    city: "Paphos",
    intercityBus: "OSYPA (intercity): 1–2 per hour to Limassol (€4, ~1h). Limited direct services to Nicosia (2–3 per day, ~2h). No direct Paphos–Larnaca intercity bus — change at Limassol.",
    intraCityBus: "OSPA (intra-city): smaller network than Limassol or Nicosia. Covers Kato Paphos, Paphos town centre, and Chlorakas. Frequency: every 30–60 minutes. Service ends ~20:00. Patchy suburban coverage.",
    taxiApp: "Bolt operates in Paphos with reasonable coverage. Local taxi firms available for airport transfers. Paphos Airport to Kato Paphos is approximately €20–€25 by metered taxi.",
    boltAvailable: true,
    busMonthlyPass: 25,
    keyRoutes: [
      "Route 615 — Paphos Airport to Kato Paphos / Town Centre",
      "Route 610 — Kato Paphos Harbour to Town Centre",
      "Route 630 — Town Centre to Chlorakas / Coral Bay direction",
      "OSYPA Intercity — Paphos to Limassol (hourly, 1h)",
      "OSYPA Intercity — Paphos to Nicosia (2–3 per day, 2h)",
    ],
    verdict: "Functional within the Kato Paphos tourist corridor, thin elsewhere. The village lifestyle that attracts many Paphos relocators is almost entirely car-dependent. Bolt availability is decent in the main areas but sparse in northern Paphos and the villages.",
    tips: [
      "The airport bus (Route 615) is the best way to arrive without a rental — runs until late.",
      "Coral Bay and the Akamas villages are not served by regular buses — a car is mandatory for those areas.",
      "Long-distance Paphos buses to Nicosia are infrequent; always book the OSYPA ticket at the terminal the morning before.",
      "Paphos is flat and compact around the harbour — walking and cycling are realistic alternatives to the bus within Kato Paphos.",
    ],
  },

  Larnaca: {
    city: "Larnaca",
    intercityBus: "OSYPA (intercity): frequent services to Nicosia (every 30–45 min, €3, ~45m) and Limassol (hourly, €4, ~1h). Terminal near the old port / seafront.",
    intraCityBus: "ZINONAS (intra-city): moderate network covering the city centre, Finikoudes area, airport, and main residential zones. Frequency: every 30–60 minutes. Service ends ~21:00.",
    taxiApp: "Bolt is active in Larnaca. Licensed airport taxis use fixed-rate zones. Airport to Larnaca centre is approximately €15–€20.",
    boltAvailable: true,
    busMonthlyPass: 25,
    keyRoutes: [
      "Route 425 — Larnaca Airport to City Centre / Finikoudes",
      "Route 410 — City Centre to Drosia / residential north",
      "Route 480 — City Centre to Salt Lake / Hala Sultan Tekke",
      "OSYPA Intercity — Larnaca to Nicosia (every 30–45 min, 45m)",
      "OSYPA Intercity — Larnaca to Limassol (hourly, 1h)",
    ],
    verdict: "The airport connection is the standout strength — Route 425 runs frequently and cheaply. City-centre coverage is reasonable; suburbs require a car. Larnaca is compact enough that cycling is viable for many errands in the flat centre.",
    tips: [
      "The intercity bus to Nicosia is excellent value for commuters or those with government appointments.",
      "The Finikoudes seafront promenade area is walkable from the bus terminal — no need for a taxi into town.",
      "Larnaca has the best cycle-friendly terrain in Cyprus — flat, sea-level, and relatively quiet roads.",
      "Night buses do not operate — plan any late evening out with Bolt or a taxi home in mind.",
    ],
  },

  "Ayia Napa": {
    city: "Ayia Napa",
    intercityBus: "OSYPA (intercity): connections to Larnaca (every 1–2 hours, €3, ~45m) and Paralimni / Protaras (frequent, €2, ~15m). Very limited direct services to Limassol or Nicosia.",
    intraCityBus: "EKAN (intra-city): basic network covering Ayia Napa town centre, Nissi Bay, and Cape Greco. Frequency: every 30–60 minutes in peak season; significantly reduced October–April.",
    taxiApp: "Bolt works in Ayia Napa but driver availability is limited outside summer. Local taxis are the primary on-demand option. Many resort transfers are pre-booked private transfers.",
    boltAvailable: true,
    busMonthlyPass: undefined,
    keyRoutes: [
      "Route 701 — Ayia Napa to Nissi Beach",
      "Route 704 — Ayia Napa to Cape Greco / Protaras",
      "OSYPA Intercity — Ayia Napa to Larnaca (hourly in season, 45m)",
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
    body: "Bolt (the European ride-hailing app) operates across all five cities covered here and is the most reliable on-demand option. Download it before you arrive. Uber does not operate in Cyprus.",
  },
  {
    heading: "Taxi fixed airport rates",
    body: "Taxis from Larnaca and Paphos airports use fixed-rate zones — ask for the rate card before getting in. Larnaca Airport to central Larnaca is €15–€20; to Limassol ~€55; to Nicosia ~€45. Paphos Airport to Kato Paphos is ~€20; to Limassol ~€45.",
  },
  {
    heading: "The intercity bus network is good value",
    body: "OSYPA intercity coaches are clean, air-conditioned, punctual on the main routes, and cheap at €3–€6 per trip. The Larnaca–Nicosia and Limassol–Paphos corridors are frequent and convenient for occasional trips. Download the publictransport.com.cy app for live timetables.",
  },
];
