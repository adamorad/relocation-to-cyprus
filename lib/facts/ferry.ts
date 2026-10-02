/**
 * Cyprus to Greece passenger ferry figures checked against the operator's
 * published 2026 timetable and price list and the Shipping Deputy Ministry
 * announcement. Single source of truth for the ferry routes guide.
 */

import type { FactSource } from "./health-transport";

/** Date the figures in this file were last checked. */
export const FERRY_CHECKED = "2026-10-02";

/** Operator of the Limassol to Piraeus passenger link. Scandro Holding homepage. Checked 2026-10-02. */
export const FERRY_OPERATOR = "Scandro Holding";

/** Vessel used in 2026. Scandro Holding homepage; Shipping Deputy Ministry announcement of 16 April 2026. Checked 2026-10-02. */
export const FERRY_VESSEL = "AF Marina";

/** First sailing of the 2026 season (from Limassol). Shipping Deputy Ministry announcement of 16 April 2026; AF Marina Schedule of Sailings 2026. Checked 2026-10-02. */
export const FERRY_2026_FIRST = "29 May 2026";

/** Last sailing of the 2026 season (Piraeus to Limassol). Shipping Deputy Ministry announcement of 16 April 2026; AF Marina Schedule of Sailings 2026. Checked 2026-10-02. */
export const FERRY_2026_LAST = "1 September 2026";

/** Date 2026 bookings opened, a guide to when the next season's bookings may open. Shipping Deputy Ministry announcement of 16 April 2026. Checked 2026-10-02. */
export const FERRY_2026_BOOKINGS_OPENED = "22 April 2026";

/** Scheduled crossing time in hours, each way, direct with no intermediate calls (e.g. Limassol 13:00 Tuesday, Piraeus 20:00 Wednesday). AF Marina Schedule of Sailings 2026. Checked 2026-10-02. */
export const FERRY_CROSSING_HOURS = 31;

/** Hours before departure that embarkation opens (it closes 1 hour before). Scandro Holding timetable page. Checked 2026-10-02. */
export const FERRY_EMBARK_OPENS_HOURS = 4;

/** Port taxes per adult per one-way trip, in euros. Scandro Holding 2026 price list. Checked 2026-10-02. */
export const FERRY_ADULT_TAX = 36.08;

/** One-way adult fares including port taxes, in euros. Scandro Holding 2026 price list. Checked 2026-10-02. */
export const FERRY_ADULT_ONE_WAY = {
	/** Reclining "Airbus" seat. */
	seat: 41.08,
	/** First-class cabin, per person, four sharing. */
	cabinQuad: 66.08,
	/** First-class cabin, per person, two sharing. */
	cabinDouble: 71.08,
	/** First-class cabin, sole occupancy. */
	cabinSingle: 76.08,
} as const;

/** One-way accompanied vehicle fares including taxes, in euros. Scandro Holding 2026 price list. Checked 2026-10-02. */
export const FERRY_VEHICLE_ONE_WAY = {
	/** Car up to 5 m. */
	car: 134.05,
	motorcycle: 92.92,
	/** Motorhome up to 5 m. */
	motorhome: 140.63,
	bicycle: 0,
} as const;

/** Maximum vehicle length accepted, in metres. Scandro Holding FAQ 2026. Checked 2026-10-02. */
export const FERRY_MAX_VEHICLE_M = 5;

/** One-way fare for a pet (dogs and cats only) travelling in a pet-friendly cabin, in euros. Scandro Holding 2026 price list. Checked 2026-10-02. */
export const FERRY_PET_ONE_WAY = 50;

/** Number of pet-friendly cabins on board. Scandro Holding pets page. Checked 2026-10-02. */
export const FERRY_PET_CABINS = 8;

/** Maximum pet weight, in kilograms. Scandro Holding pets page. Checked 2026-10-02. */
export const FERRY_PET_MAX_KG = 40;

/** Days before departure that vehicle ticket sales close. Scandro Holding 2026 price list notes. Checked 2026-10-02. */
export const FERRY_VEHICLE_SALES_CLOSE_DAYS = 7;

/** Primary sources for the ferry routes guide: official first, then the operator, then news. */
export const FERRY_SOURCES: ReadonlyArray<FactSource> = [
	{
		label:
			"Ministry of Foreign Affairs: legal points of entry and travel to the areas in the north",
		url: "https://www.gov.cy/mfa/en/documents/important-information-concerning-travel-to-the-turkish-occupied-area-of-cyprus/",
	},
	{
		label: "Scandro Holding: 2026 timetable (AF Marina schedule of sailings)",
		url: "https://scandroholding.com/timetable/",
	},
	{
		label: "Scandro Holding: 2026 price list",
		url: "https://scandroholding.com/price-list/",
	},
	{
		label: "Scandro Holding: vehicle transport terms and procedures",
		url: "https://scandroholding.com/vehicle-transport-terms-and-procedures/",
	},
	{
		label:
			"Cyprus Shipping News: Shipping Deputy Ministry announcement of the 2026 season (16 April 2026)",
		url: "https://cyprusshippingnews.com/2026/04/16/press-conference-of-the-shipping-deputy-ministry-on-the-cyprus-greece-maritime-passenger-connection/",
	},
];
