// Rent levels: the single dated dataset used by guides, city pages
// (lib/regions.ts) and the rent tools. Re-sample through the same Bazaraki
// filter pages and replace the whole snapshot at once; never mix samples.

export type RentCity = "Limassol" | "Paphos" | "Larnaca" | "Ayia Napa";
export type Bedrooms = 1 | 2 | 3;

/** One district and bedroom count from the sample. */
export type RentCell = {
	/** Median asking rent, EUR per month. */
	median: number;
	/** 25th percentile asking rent (lower edge of the middle half). */
	p25: number;
	/** 75th percentile asking rent (upper edge of the middle half). */
	p75: number;
	/** Number of listings in the sample. */
	n: number;
	/** False when the sample is too small to publish a figure. */
	reliable: boolean;
};

/** ISO date the Bazaraki listings were sampled. Source: Bazaraki, checked 2026-10-01. */
export const RENT_SAMPLED_ON = "2026-10-01";

/** Human form of RENT_SAMPLED_ON for running text. Source: Bazaraki, checked 2026-10-01. */
export const RENT_SAMPLED_LABEL = "1 October 2026";

/** Month form for "in October 2026" phrasing. Source: Bazaraki, checked 2026-10-01. */
export const RENT_MONTH_LABEL = "October 2026";

/** Short name of the source for inline citations. Source: Bazaraki, checked 2026-10-01. */
export const RENT_SOURCE_NAME = "Bazaraki";

/** Bazaraki long-term apartment rentals search (filter by bedrooms and district). Checked 2026-10-01. */
export const RENT_SOURCE_URL =
	"https://www.bazaraki.com/real-estate-to-rent/apartments-flats/";

/** Which Bazaraki district each site city maps to. Source: Bazaraki district filters, checked 2026-10-01. */
export const RENT_DISTRICT: Record<RentCity, string> = {
	Limassol: "Limassol district",
	Paphos: "Paphos district",
	Larnaca: "Larnaca district",
	"Ayia Napa":
		"Famagusta free area (Ayia Napa, Protaras, Paralimni and villages)",
};

/**
 * Median asking rents with the middle half (25th to 75th percentile), from
 * every live Bazaraki "Apartments, flats" long-term rental listing by district
 * and bedroom count, deduplicated by listing ID. Asking rents, furnished and
 * unfurnished mixed, district-wide. Source: Bazaraki, checked 2026-10-01.
 * Ayia Napa 1-bed (n=12) and 3-bed (n=11) are too small to publish.
 */
export const RENTS: Record<RentCity, Record<Bedrooms, RentCell>> = {
	Limassol: {
		1: { median: 1500, p25: 1275, p75: 2000, n: 341, reliable: true },
		2: { median: 2200, p25: 1800, p75: 3000, n: 1292, reliable: true },
		3: { median: 2700, p25: 2100, p75: 4500, n: 860, reliable: true },
	},
	Paphos: {
		1: { median: 1000, p25: 850, p75: 1200, n: 59, reliable: true },
		2: { median: 1500, p25: 1200, p75: 2000, n: 172, reliable: true },
		3: { median: 2275, p25: 1800, p75: 2784, n: 52, reliable: true },
	},
	Larnaca: {
		1: { median: 850, p25: 700, p75: 1000, n: 144, reliable: true },
		2: { median: 1200, p25: 950, p75: 1350, n: 494, reliable: true },
		3: { median: 1375, p25: 1100, p75: 1700, n: 76, reliable: true },
	},
	"Ayia Napa": {
		1: { median: 675, p25: 0, p75: 0, n: 12, reliable: false },
		2: { median: 1100, p25: 780, p75: 1400, n: 41, reliable: true },
		3: { median: 1500, p25: 1050, p75: 5300, n: 11, reliable: false },
	},
};

/** Formats a euro amount as "€1,200". */
export function eur(value: number): string {
	return `€${value.toLocaleString("en-GB")}`;
}

/** Median asking rent rounded to the nearest €50, for running text. Source: Bazaraki, checked 2026-10-01. */
export function rentMedian(city: RentCity, beds: Bedrooms): string {
	return eur(Math.round(RENTS[city][beds].median / 50) * 50);
}

/** Middle half as "€1,800–€3,000". Source: Bazaraki, checked 2026-10-01. */
export function rentRange(city: RentCity, beds: Bedrooms): string {
	const c = RENTS[city][beds];
	return `${eur(c.p25)}–${eur(c.p75)}`;
}

/** How much higher one city's 2-bed median is than another's, in whole per cent. */
export function rentPremiumPct(city: RentCity, over: RentCity): number {
	return Math.round((RENTS[city][2].median / RENTS[over][2].median - 1) * 100);
}

/** The citation line to use everywhere. Source: Bazaraki, checked 2026-10-01. */
export function rentCitation(city: RentCity, beds: Bedrooms): string {
	return `Median asking rent, Bazaraki long-term apartment listings by district, sampled ${RENT_SAMPLED_LABEL} (n = ${RENTS[city][beds].n.toLocaleString("en-GB")}). Asking rents; agreed rents are often lower.`;
}

/** General citation line for tables covering several cells. Source: Bazaraki, checked 2026-10-01. */
export const RENT_CITATION_GENERAL = `Median asking rent, Bazaraki long-term apartment listings by district, sampled ${RENT_SAMPLED_LABEL}. Asking rents; agreed rents are often lower.`;

/**
 * Cross-check: the Real Estate Registration Council president, quoted by
 * Cyprus Mail on 23 July 2026, gave two-bedroom rents of about €1,400–€1,500
 * in Limassol and €700–€800 in Larnaca and Paphos (likely agreed rents).
 * Source: Cyprus Mail, checked 2026-10-01.
 */
export const RENT_AGREED_NOTE =
	"Agreed rents are often lower than asking rents: in July 2026 the Real Estate Registration Council put typical two-bedroom rents at about €1,400–€1,500 in Limassol and €700–€800 in Larnaca and Paphos (Cyprus Mail).";

/** Cyprus Mail article with the RERC figures. Checked 2026-10-01. */
export const RENT_AGREED_SOURCE_URL =
	"https://cyprus-mail.com/2026/07/23/limassol-remains-cyprus-most-expensive-city-for-renters";

/** Source list for SourcesNote and guide `sources`. Checked 2026-10-01. */
export const RENT_SOURCES = [
	{
		label: "Bazaraki: long-term apartment rentals by district and bedrooms",
		url: RENT_SOURCE_URL,
	},
	{
		label:
			"Cyprus Mail: Limassol remains Cyprus' most expensive city for renters (23 July 2026)",
		url: RENT_AGREED_SOURCE_URL,
	},
] as const;
