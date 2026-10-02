/**
 * Health, transport and schools figures checked against primary sources.
 * Single source of truth for the guides, tools and directories that quote
 * them. Each constant names its source and the date it was checked.
 */

export type FactSource = { label: string; url: string };

/** Formats euros: "€1,234", or "€66.90" when the amount has cents. */
export function eur(amount: number): string {
	const cents = !Number.isInteger(amount);
	return `€${amount.toLocaleString("en-GB", {
		minimumFractionDigits: cents ? 2 : 0,
		maximumFractionDigits: 2,
	})}`;
}

/** Date the figures in this file were last checked. */
export const HEALTH_TRANSPORT_CHECKED = "2026-10-02";

// ---------------------------------------------------------------------------
// GeSY co-payments
// ---------------------------------------------------------------------------

/** GeSY co-payment per A&E visit, in euros. KDP 36/2019 Annex I. Checked 2026-10-02. */
export const GESY_AE_COPAY = 10;

/** GeSY co-payment per prescribed pharmaceutical item, in euros. KDP 36/2019 Annex I. Checked 2026-10-02. */
export const GESY_RX_ITEM_COPAY = 1;

/** GeSY annual co-payment cap per person, in euros. KDP 36/2019 Annex III. Checked 2026-10-02. */
export const GESY_ANNUAL_CAP = 150;

/** GeSY annual cap for under-21s, minimum-income recipients and low-income pensioners. KDP 36/2019 Annex III. Checked 2026-10-02. */
export const GESY_ANNUAL_CAP_REDUCED = 75;

// ---------------------------------------------------------------------------
// Driving licence conversion
// ---------------------------------------------------------------------------

/** Ordinary driving licence fee, in euros. Road Transport Department, Ordinary driving licences page and TOM 7D note. Checked 2026-10-02. */
export const LICENCE_FEE = 40;

/** Age from which a medical certificate is required for a conversion. RTD Foreign Driving Licence Conversion page. Checked 2026-10-02. */
export const LICENCE_MEDICAL_AGE = 70;

// ---------------------------------------------------------------------------
// Airport taxi fixed fares (per taxi, up to 4 passengers, luggage and VAT included)
// ---------------------------------------------------------------------------

type DayNight = { day: number; night: number };

/** Night rate hours for airport fixed fares. KDP 79/2021. Checked 2026-10-02. */
export const TAXI_NIGHT_HOURS = "20:30 to 06:00";

/** Larnaca Airport fixed taxi fares, in euros. KDP 79/2021 (in force 1 March 2021). Checked 2026-10-02. */
export const LCA_TAXI = {
	larnacaCentre: { day: 15, night: 15 },
	ayiaNapa: { day: 50, night: 60 },
	protaras: { day: 55, night: 65 },
	limassol: { day: 55, night: 65 },
	paphos: { day: 105, night: 125 },
} as const satisfies Record<string, DayNight>;

/** Paphos Airport fixed taxi fares, in euros. KDP 79/2021 (in force 1 March 2021). Checked 2026-10-02. */
export const PFO_TAXI = {
	katoPaphos: { day: 20, night: 25 },
	chloraka: { day: 25, night: 30 },
	coralBay: { day: 35, night: 40 },
	limassol: { day: 60, night: 70 },
	larnaca: { day: 105, night: 125 },
} as const satisfies Record<string, DayNight>;

/** "€55 / €65" style day and night pair. */
export function dayNight(fare: DayNight): string {
	return fare.day === fare.night
		? eur(fare.day)
		: `${eur(fare.day)} / ${eur(fare.night)}`;
}

// ---------------------------------------------------------------------------
// Buses
// ---------------------------------------------------------------------------

/** Limassol city buses (EMEL), in euros. limassolbuses.com/tickets. Checked 2026-10-02. */
export const LIMASSOL_BUS = { single: 2, night: 3, monthly: 45 } as const;

/** Paphos city buses (OSYPA, Pafos Buses), in euros. pafosbuses.com/tickets. Checked 2026-10-02. */
export const PAPHOS_BUS = {
	single: 2,
	night: 3,
	monthlyPersonalised: 50,
	monthlyAnonymous: 60,
} as const;

/** Larnaca city buses (Cyprus Public Transport), in euros, fares from 3 August 2026. publictransport.com.cy cash tickets page. Checked 2026-10-02. */
export const LARNACA_BUS = {
	singleCash: 2.7,
	singleCard: 2,
	nightCash: 4.7,
	nightCard: 3.5,
	monthlyPersonalised: 66.9,
	monthlyAnonymous: 93.6,
} as const;

/** InterCity Buses one-way fares, in euros, from 1 April 2025. intercity-buses.com ticket prices. Checked 2026-10-02. */
export const INTERCITY_FARE = {
	limassolLarnaca: 5,
	limassolPaphos: 5,
	larnacaAyiaNapa: 5,
	larnacaPaphos: 10,
	ayiaNapaPaphos: 10,
	min: 5,
	max: 10,
} as const;

/** Limassol Airport Express fares, in euros. limassolairportexpress.eu. Checked 2026-10-02. */
export const AIRPORT_EXPRESS_FARE = { adult: 10, child: 5 } as const;

// ---------------------------------------------------------------------------
// International school tuition, 2026-27, per year (excludes registration, deposit, books, uniform)
// ---------------------------------------------------------------------------

type FeeRange = { from: number; to: number };

/** The Heritage Private School (Palodia), Early Years to Year 13. Heritage 2026-27 fee sheets. Checked 2026-10-02. */
export const FEES_HERITAGE: FeeRange = { from: 7020, to: 13200 };

/** Foley's School, Limassol, Years 1 to 13. Foley's 2026-27 fee structure PDFs. Checked 2026-10-02. */
export const FEES_FOLEYS: FeeRange = { from: 8400, to: 12600 };

/** The Grammar School Limassol (secondary only), non-Cypriot pupils. Grammar School 2026-27 INT fee sheet. Checked 2026-10-02. */
export const FEES_GRAMMAR_LIMASSOL: FeeRange = { from: 8700, to: 10650 };

/** The Grammar School Limassol, Cypriot citizens. Grammar School 2026-27 CYP fee sheet. Checked 2026-10-02. */
export const FEES_GRAMMAR_LIMASSOL_CYPRIOT: FeeRange = { from: 7800, to: 9800 };

/** The International School of Paphos, Pre-Reception to Year 13. ISP 2026-27 fee sheet. Checked 2026-10-02. */
export const FEES_ISP: FeeRange = { from: 4815, to: 9515 };

/** The American Academy Larnaca, Junior and Senior School. AAL 2026-27 tuition PDFs. Checked 2026-10-02. */
export const FEES_AMERICAN_ACADEMY_LARNACA: FeeRange = { from: 4130, to: 7470 };

/** "€7,020 to €13,200" */
export function feeRange(range: FeeRange): string {
	return `${eur(range.from)} to ${eur(range.to)}`;
}

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------

/** Primary sources cited by the fact-check, for SourcesNote and guide `sources`. */
export const SRC = {
	gesyCopay: {
		label: "KDP 36/2019, GeSY co-payment regulations (Official Gazette)",
		url: "https://www.cylaw.org/KDP/data/2019_1_36.pdf",
	},
	medicinesPriceList: {
		label: "Pharmaceutical Services, Ministry of Health: medicines price list",
		url: "https://www.moh.gov.cy/moh/phs/phs.nsf/pricelist_el/pricelist_el",
	},
	nonPrescriptionRule: {
		label: "KDP 98/2019, non-prescription medicines in the price list",
		url: "https://www.cylaw.org/KDP/data/2019_1_98.pdf",
	},
	solpadeine: {
		label: "Pharmaceutical Services product register: Solpadeine",
		url: "https://www.phs.moh.gov.cy/human-search/view.xhtml?id=2200173",
	},
	licenceConversion: {
		label: "Road Transport Department: Foreign Driving Licence Conversion",
		url: "https://www.mcw.gov.cy/mcw/rtd/rtd.nsf/All/AA805A89E5ED997BC225781C00296BCF?OpenDocument",
	},
	airportTaxiFares: {
		label: "KDP 79/2021, airport taxi fixed fares (Official Gazette)",
		url: "https://www.cylaw.org/KDP/data/2021_1_79.pdf",
	},
	larnacaBuses: {
		label: "Cyprus Public Transport: ticket prices",
		url: "https://www.publictransport.com.cy/cms/page/cash-tickets",
	},
	limassolBuses: {
		label: "EMEL Limassol buses: tickets",
		url: "https://limassolbuses.com/tickets/",
	},
	paphosBuses: {
		label: "OSYPA Pafos Buses: tickets",
		url: "https://www.pafosbuses.com/tickets",
	},
	paphosAirportBuses: {
		label: "OSYPA Pafos Buses: Pafos airport bus routes",
		url: "https://www.pafosbuses.com/pafos-airport-bus-routes",
	},
	intercity: {
		label: "InterCity Buses: ticket prices",
		url: "https://intercity-buses.com/en/ticket-prices-2/",
	},
	airportExpress: {
		label: "Limassol Airport Express",
		url: "https://limassolairportexpress.eu/",
	},
	schoolRegister: {
		label: "Ministry of Education: registered private secondary schools",
		url: "https://sch.cy/mc/360/el_idiotika_mesi_geniki.pdf",
	},
	heritageFees: {
		label: "The Heritage Private School: fees",
		url: "https://www.heritageschool.ac.cy/admissions/fees",
	},
	foleysFees: {
		label: "Foley's School: 2026-27 secondary fee structure",
		url: "https://foleysschool.com/wp-content/uploads/2026/01/Fee-Structure-2026-27-Secondary-Education.pdf",
	},
	grammarFees: {
		label: "The Grammar School: 2026-27 fees (international pupils)",
		url: "https://grammarschool.com.cy/wp-content/uploads/2026-2027-INT.pdf",
	},
	ispFees: {
		label: "The International School of Paphos: 2026-27 fees",
		url: "https://www.paphosinternationalschool.com/wp-content/uploads/2026/02/School-Fees-2026-2027-_-Primary-Secondary.pdf",
	},
	aalFees: {
		label: "The American Academy Larnaca: 2026-27 senior school fees",
		url: "https://www.academy.ac.cy/wp-content/uploads/2026/01/Tuition-fees-SS-2026-27.pdf",
	},
	advocatesLaw: {
		label: "Advocates Law, Cap. 2 (CyLaw)",
		url: "https://www.cylaw.org/nomoi/enop/non-ind/0_2/full.html",
	},
	astra: {
		label: "Astra Car Rentals",
		url: "https://www.astracarrentals.com/",
	},
	autohellasCyprus: {
		label: "Autohellas: Cyprus (Hertz, Firefly, Thrifty)",
		url: "https://www.autohellas.gr/en/brands-activities/international-activity/cyprus/",
	},
	rifCalls: {
		label: "Research and Innovation Foundation: open calls",
		url: "https://www.research.org.cy/en/",
	},
	fundingPortal: {
		label: "Cyprus Government: funding programmes portal",
		url: "https://www.fundingprogrammesportal.gov.cy/en/",
	},
	investEu: {
		label: "European Commission: EU-supported loans and guarantees",
		url: "https://single-market-economy.ec.europa.eu/access-finance/policy-areas/eu-supported-loans-guarantees-and-equity-investments_en",
	},
} as const satisfies Record<string, FactSource>;
