/**
 * "Buses city by city" block on /guides/getting-around-cyprus-no-car/.
 *
 * Moved from the retired /sections/public-transport/ directory (data archived
 * in archive/lib/public-transport.ts). Every fare comes from
 * lib/facts/health-transport.ts; route numbers other than 425, 612 and 613,
 * frequencies and tips are carried over from the directory unchanged in
 * substance.
 */

import {
	AIRPORT_EXPRESS_FARE,
	dayNight,
	eur,
	type FactSource,
	INTERCITY_FARE,
	LARNACA_BUS,
	LCA_TAXI,
	PAPHOS_BUS,
	PFO_TAXI,
	SRC,
} from "@/lib/facts/health-transport";

export const CITY_BUSES_ID = "buses-city-by-city";
export const CITY_BUSES_TITLE = "Buses city by city";

export type CityBuses = {
	city: "Limassol" | "Paphos" | "Larnaca" | "Ayia Napa";
	operator: string;
	/** Operator ticket page; omitted where no official page could be checked. */
	operatorSource?: FactSource;
	cityBus: string;
	intercity: string;
	airportBus: string;
	airportTaxi: string;
	keyRoutes: ReadonlyArray<string>;
	tips: ReadonlyArray<string>;
};

export const CITY_BUSES: ReadonlyArray<CityBuses> = [
	{
		city: "Limassol",
		operator: "EMEL",
		operatorSource: SRC.limassolBuses,
		cityBus:
			"More than 30 routes cover most residential and commercial areas: every 20 to 40 minutes on main routes, every 60 minutes or more in the suburbs, with fewer buses on Sundays. The seafront corridor is well served; inland areas less so.",
		intercity: `InterCity Buses to Larnaca and to Paphos, ${eur(INTERCITY_FARE.limassolLarnaca)} one way, from the old port area.`,
		airportBus: `Limassol Airport Express from Larnaca and Paphos airports, ${eur(AIRPORT_EXPRESS_FARE.adult)} (children ${eur(AIRPORT_EXPRESS_FARE.child)})`,
		airportTaxi: `From Larnaca ${dayNight(LCA_TAXI.limassol)}; from Paphos ${dayNight(PFO_TAXI.limassol)}`,
		keyRoutes: [
			"Route 30: seafront and tourist strip to the city centre",
			"Route 17: old port to Germasogeia",
			"Route 20: city centre to Polemidia and the university",
		],
		tips: [
			"The EMEL app or Google Maps shows live bus positions on Limassol routes.",
			"Monthly passes are loaded onto a smart card sold at the EMEL office near the old port.",
		],
	},
	{
		city: "Paphos",
		operator: "OSYPA (Pafos Buses)",
		operatorSource: SRC.paphosBuses,
		cityBus:
			"A smaller network than Limassol's, covering Kato Paphos, the town centre and Chloraka every 30 to 60 minutes. Night tickets are sold after 21:00 on some routes. Suburban coverage is patchy.",
		intercity: `InterCity Buses to Limassol ${eur(INTERCITY_FARE.limassolPaphos)}; a Larnaca, Limassol and Paphos route reaches Larnaca for ${eur(INTERCITY_FARE.larnacaPaphos)}.`,
		airportBus: `Routes 612 and 613, ${eur(PAPHOS_BUS.single)}, year-round`,
		airportTaxi: `Kato Paphos ${dayNight(PFO_TAXI.katoPaphos)}`,
		keyRoutes: [
			"Routes 612 and 613: Paphos Airport to the Tombs of the Kings and Karavella stations",
			"Route 610: Kato Paphos harbour to the town centre",
			"Route 630: town centre towards Chloraka",
		],
		tips: [
			"The Akamas villages are not served by regular buses, so a car is needed there.",
			"Around the harbour Kato Paphos is flat and compact, so walking and cycling are realistic alternatives to the bus.",
		],
	},
	{
		city: "Larnaca",
		operator: "Cyprus Public Transport",
		operatorSource: SRC.larnacaBuses,
		cityBus:
			"Covers the city centre, Finikoudes, the airport and the main residential areas every 30 to 60 minutes. Check late-evening services before relying on them. Suburbs need a car.",
		intercity: `InterCity Buses to Limassol ${eur(INTERCITY_FARE.limassolLarnaca)} and to Ayia Napa ${eur(INTERCITY_FARE.larnacaAyiaNapa)}, from near the old port and seafront.`,
		airportBus: `Route 425, ${eur(LARNACA_BUS.singleCash)} cash or ${eur(LARNACA_BUS.singleCard)} by Motion card`,
		airportTaxi: `Larnaca centre ${dayNight(LCA_TAXI.larnacaCentre)}`,
		keyRoutes: [
			"Route 425: Larnaca Airport to the city centre and Finikoudes",
			"Route 410: city centre to Drosia and the residential north",
			"Route 480: city centre to the Salt Lake and Hala Sultan Tekke",
		],
		tips: [
			"The Finikoudes seafront is a short walk from the bus terminal, so there is no need for a taxi into town.",
			"Flat, sea-level streets make Larnaca the easiest Cypriot city to cycle for everyday errands.",
		],
	},
	{
		city: "Ayia Napa",
		operator: "OSEA",
		cityBus:
			"A basic network covering the town centre, Nissi Bay and Cape Greco, every 30 to 60 minutes in peak season and far less often from October to April.",
		intercity: `InterCity Buses to Larnaca ${eur(INTERCITY_FARE.larnacaAyiaNapa)}. Local buses link Ayia Napa with Paralimni and Protaras. Direct buses to Limassol are very limited.`,
		airportBus:
			"No direct airport bus listed; pre-book a transfer for late arrivals",
		airportTaxi: `From Larnaca: Ayia Napa ${dayNight(LCA_TAXI.ayiaNapa)}, Protaras ${dayNight(LCA_TAXI.protaras)}`,
		keyRoutes: [
			"Route 701: Ayia Napa to Nissi Beach",
			"Route 704: Ayia Napa to Cape Greco and Protaras",
			"Route 711: town centre loop",
		],
		tips: [
			"The resort area is small enough to walk or cycle by day; many visitors never use a bus.",
			"Bolt works here, but few drivers are on the road outside summer and after midnight; local taxis are the main on-demand option.",
			"Paralimni and Protaras make better year-round bases than Ayia Napa town, with more reliable everyday services.",
			"Timetables change between April and November, so check the current one before you travel.",
		],
	},
];
