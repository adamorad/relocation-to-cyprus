/**
 * The one reviewed mapping of every guide, directory and live tool to a
 * primary topic (plus up to two secondary topics and the cities it is
 * specific to). Human-readable copy: docs/topics-mapping.md, regenerated with
 * `node scripts/gen-topics-mapping.mjs`. Completeness is asserted at build
 * time by `assertTopicMapComplete()` (lib/topic-map-check.ts, called from
 * app/sitemap.ts), so an unmapped or misspelt item fails `pnpm build`.
 *
 * Server-side only (imports all guide content). Client components receive
 * slim props computed from these helpers.
 */

import { GUIDES } from "./guides";
import { SECTIONS_INDEX } from "./sections-index";
import { TOOLS } from "./tools-index";
import {
	type CitySlug,
	hubHref,
	type Topic,
	type TopicSlug,
	topicBySlug,
} from "./topics";

export type ItemType = "guide" | "directory" | "tool";

export type TopicAssignment = {
	topic: TopicSlug;
	/** Secondary topics (max 2). The item is also listed on those hubs. */
	also?: ReadonlyArray<TopicSlug>;
	/** Cities the item is specific to. Empty or absent means island-wide. */
	cities?: ReadonlyArray<CitySlug>;
	/** One-line reason, given for non-obvious choices (shown in the docs table). */
	why?: string;
};

// ---------------------------------------------------------------------------
// Directories: SECTIONS_INDEX plus the five routes de-listed in Phase 3C
// (b0899d2). The de-listed ones keep a topic (breadcrumb and "More on" on
// their own page) but stay out of hubs, indexes, other pages' cross-links and
// the sitemap, as before.
// ---------------------------------------------------------------------------

export type DirectoryEntry = {
	slug: string;
	name: string;
	description: string;
	listed: boolean;
};

const UNLISTED_DIRECTORIES: ReadonlyArray<Omit<DirectoryEntry, "listed">> = [
	{
		slug: "co-living",
		name: "Co-Living & Serviced Apartments",
		description:
			"Month-to-month co-living options for digital nomads and new arrivals.",
	},
	{
		slug: "community-gardens",
		name: "Community Gardens",
		description:
			"Allotment schemes and urban farming initiatives, plus growing calendar tips for Cyprus's climate.",
	},
	{
		slug: "ev-charging",
		name: "EV Charging Stations",
		description:
			"Public EV charging points by city with charger type and operator details.",
	},
	{
		slug: "registered-address",
		name: "Registered Address Providers",
		description:
			"Registered address and virtual office providers for Cyprus-incorporated companies.",
	},
	{
		slug: "rooftop-bars",
		name: "Rooftop & Sea View Bars",
		description:
			"Rooftop and sea-view venues across the island with price ranges and reservation notes.",
	},
];

export const DIRECTORIES: ReadonlyArray<DirectoryEntry> = [
	...SECTIONS_INDEX.map((s) => ({
		slug: s.slug,
		name: s.name,
		description: s.description,
		listed: true,
	})),
	...UNLISTED_DIRECTORIES.map((d) => ({ ...d, listed: false })),
];

// ---------------------------------------------------------------------------
// Guides (87)
// ---------------------------------------------------------------------------

export const GUIDE_TOPICS: Record<string, TopicAssignment> = {
	// Health
	"gesy-registration-guide": { topic: "health", also: ["money-and-paperwork"] },
	"pharmacies-medication": { topic: "health" },
	"dental-care-guide": { topic: "health" },
	"emergency-services-guide": { topic: "health" },
	"healthcare-in-cyprus": { topic: "health", also: ["moving-here"] },
	"private-health-insurance-cyprus": {
		topic: "health",
		also: ["money-and-paperwork"],
	},
	"air-quality-allergens": {
		topic: "health",
		also: ["home-and-bills"],
		why: "Old category Environment; the practical advice is about allergies and breathing.",
	},

	// Getting around
	"driving-licence-conversion": {
		topic: "getting-around",
		also: ["money-and-paperwork"],
	},
	"car-import-registration": {
		topic: "getting-around",
		also: ["moving-here"],
	},
	"airport-transfers-guide": { topic: "getting-around" },
	"cycling-guide": {
		topic: "getting-around",
		also: ["community-and-leisure"],
	},
	"ferry-routes-guide": { topic: "getting-around" },
	"road-safety-driving": { topic: "getting-around" },
	"long-term-car-rental-cyprus": {
		topic: "getting-around",
		why: "Old category Lifestyle; it is about getting a car for daily use.",
	},
	"getting-around-cyprus-no-car": { topic: "getting-around" },

	// Home & bills
	"utilities-setup-guide": { topic: "home-and-bills" },
	"solar-energy-guide": {
		topic: "home-and-bills",
		why: "Old category Environment; it is about cutting the electricity bill.",
	},
	"water-quality-scarcity": {
		topic: "home-and-bills",
		why: "Old category Environment; tap water, filters and supply at home.",
	},
	"waste-recycling-guide": {
		topic: "home-and-bills",
		why: "Old category Environment; bins and collections are a household chore.",
	},
	"earthquake-preparedness": {
		topic: "home-and-bills",
		why: "Old category Environment; preparing the home and household.",
	},
	"wildfire-risk-guide": {
		topic: "home-and-bills",
		why: "Old category Environment; preparing the home, alerts and insurance.",
	},
	"environmental-impact-guide": {
		topic: "home-and-bills",
		also: ["community-and-leisure"],
		why: "Sustainable living is mostly household habits (energy, water, waste).",
	},
	"rental-transition-guide": {
		topic: "home-and-bills",
		also: ["moving-here"],
		why: "Old category Property; it is about renting a home, not buying.",
	},

	// Money & paperwork
	"banking-in-cyprus": { topic: "money-and-paperwork" },
	"taxes-for-expats": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "How tax works for residents day to day, including non-dom status; also a moving decision.",
	},
	"cyprus-tax-return-filing": { topic: "money-and-paperwork" },
	"self-employed-tax-cyprus": { topic: "money-and-paperwork" },
	"vat-registration-guide": { topic: "money-and-paperwork" },
	"crypto-tax-cyprus": { topic: "money-and-paperwork" },
	"ip-box-regime": {
		topic: "money-and-paperwork",
		why: "Business tax for people already running a company here.",
	},
	"company-types-comparison": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Work and business admin sits in Money & paperwork (there is no Work topic).",
	},
	"corporate-bank-account-guide": { topic: "money-and-paperwork" },
	"hiring-in-cyprus": {
		topic: "money-and-paperwork",
		why: "Work and business admin sits in Money & paperwork.",
	},
	"ip-registration-cyprus": {
		topic: "money-and-paperwork",
		why: "Work and business admin sits in Money & paperwork.",
	},
	"trade-licenses-cyprus": {
		topic: "money-and-paperwork",
		why: "Work and business admin sits in Money & paperwork.",
	},
	"working-in-cyprus-employee-rights": {
		topic: "money-and-paperwork",
		why: "Contracts, pay and leave for employees; no separate Work topic.",
	},
	"yellow-slip-meu1-guide": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Residency admin that people already living here also need (renewals, changes).",
	},
	"permanent-residency-5year": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Applied for after five years living here, so it is resident paperwork.",
	},
	"citizenship-naturalization": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Applied for after years of residence, so it is resident paperwork.",
	},
	"cost-of-living": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Monthly household budgets are useful to residents; also listed for movers.",
	},
	"property-taxes-2026": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Property taxes apply to owners every year; the Property area comes in Phase 4.",
	},
	"cyprus-mortgage-foreigners": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Mortgage is a money question; Property area comes in Phase 4.",
	},
	"buying-vs-renting-cyprus": {
		topic: "money-and-paperwork",
		also: ["home-and-bills", "moving-here"],
		why: "A money decision about the home; Property area comes in Phase 4.",
	},
	"rental-income-tax-cyprus": {
		topic: "money-and-paperwork",
		why: "Landlord tax; Property area comes in Phase 4.",
	},
	"airbnb-short-term-rental-cyprus": {
		topic: "money-and-paperwork",
		why: "Licence, VAT and tax for owners letting short term; Property area comes in Phase 4.",
	},

	// Food & shopping
	"cypriot-cuisine-guide": {
		topic: "food-and-shopping",
		also: ["community-and-leisure"],
	},
	"food-delivery-apps": { topic: "food-and-shopping" },
	"home-cooking-ingredients": { topic: "food-and-shopping" },
	"restaurant-reservations": {
		topic: "food-and-shopping",
		also: ["community-and-leisure"],
	},
	"coffee-culture-guide": {
		topic: "food-and-shopping",
		also: ["community-and-leisure"],
	},

	// Family & schools
	"international-vs-public-school": { topic: "family-and-schools" },
	"schools-in-cyprus": { topic: "family-and-schools" },
	"international-school-fees-cyprus": { topic: "family-and-schools" },
	"universities-in-cyprus": { topic: "family-and-schools" },
	"sen-guide": { topic: "family-and-schools" },
	"child-registration-guide": {
		topic: "family-and-schools",
		also: ["money-and-paperwork"],
	},
	"maternity-paternity-rights": {
		topic: "family-and-schools",
		also: ["money-and-paperwork"],
	},
	"family-neighborhoods-guide": {
		topic: "family-and-schools",
		also: ["home-and-bills", "moving-here"],
		why: "Old category Lifestyle; written for families choosing an area.",
	},
	"getting-married-in-cyprus": {
		topic: "family-and-schools",
		also: ["money-and-paperwork"],
		why: "Family life event; the steps are civil paperwork.",
	},

	// Community & leisure
	"language-learning-cyprus": { topic: "community-and-leisure" },
	"cultural-etiquette-guide": { topic: "community-and-leisure" },
	"hiking-trails-guide": { topic: "community-and-leisure" },
	"beach-guide-by-district": { topic: "community-and-leisure" },
	"climate-zones-seasonal": {
		topic: "community-and-leisure",
		also: ["moving-here"],
		why: "Old category Environment; month-by-month living and what to do, so leisure first.",
	},

	// Moving to Cyprus
	"residency-and-visas": { topic: "moving-here" },
	"digital-nomad-visa-guide": { topic: "moving-here" },
	"work-permits-non-eu": { topic: "moving-here" },
	"startup-visa-ict": { topic: "moving-here" },
	"company-formation-visa": { topic: "moving-here" },
	"family-reunification-guide": {
		topic: "moving-here",
		also: ["family-and-schools"],
	},
	"cyprus-schengen-guide": { topic: "moving-here" },
	"cyprus-company-formation": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Mostly read by people setting up a company to move (the owner's brief).",
	},
	"arrival-checklist": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
	},
	"cyprus-vs-portugal": { topic: "moving-here" },
	"best-areas-to-live-cyprus": {
		topic: "moving-here",
		also: ["home-and-bills"],
	},
	"retiring-in-cyprus": { topic: "moving-here" },
	"moving-to-cyprus-from-uk": { topic: "moving-here" },
	"moving-to-cyprus-from-israel": { topic: "moving-here" },
	"moving-to-cyprus-from-germany": { topic: "moving-here" },
	"moving-to-cyprus-with-pets": {
		topic: "moving-here",
		why: "Pet import rules apply once, at the move; vets are in Health.",
	},
	"buying-process": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Buyers here are mostly people moving; the Property area comes in Phase 4.",
	},
	"off-plan-buying-guide": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Property buying; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
	"new-development-buying-guide": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Property buying; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
	"title-deed-status-guide": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Property buying; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
	"property-lawyers-cyprus": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Property buying; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
};

// ---------------------------------------------------------------------------
// Directories (29 routes under /sections/)
// ---------------------------------------------------------------------------

export const DIRECTORY_TOPICS: Record<string, TopicAssignment> = {
	"specialist-doctors": { topic: "health" },
	"mental-health-services": { topic: "health" },
	"veterinary-services": {
		topic: "health",
		why: "Pet health care; there is no Pets topic and people look for vets next to doctors.",
	},

	"public-transport": { topic: "getting-around" },
	"ev-charging": {
		topic: "getting-around",
		also: ["home-and-bills"],
	},

	"long-term-rentals": {
		topic: "home-and-bills",
		also: ["moving-here"],
		why: "Old category Property & Housing; renting a home is daily life.",
	},
	"property-management": {
		topic: "home-and-bills",
		also: ["money-and-paperwork"],
		why: "Managing a home you own; Property area comes in Phase 4.",
	},
	"co-living": {
		topic: "home-and-bills",
		also: ["moving-here"],
		why: "Furnished monthly housing, mostly used on arrival.",
	},

	accountants: { topic: "money-and-paperwork" },
	"registered-address": {
		topic: "money-and-paperwork",
		why: "Company admin service.",
	},
	coworking: {
		topic: "money-and-paperwork",
		also: ["community-and-leisure"],
		why: "Work sits in Money & paperwork (no Work topic); also a place to meet people.",
	},
	"startup-ecosystem": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Business support for founders; no Work topic.",
	},

	"farmers-markets": { topic: "food-and-shopping" },
	"international-grocery": { topic: "food-and-shopping" },
	"halal-kosher": { topic: "food-and-shopping" },
	food: {
		topic: "food-and-shopping",
		cities: ["limassol", "paphos", "larnaca", "ayia-napa"],
		why: "Restored from the archived homepage Food panel.",
	},
	shopping: {
		topic: "food-and-shopping",
		cities: ["limassol", "paphos", "larnaca", "ayia-napa"],
		why: "Restored from the archived homepage Shopping panel.",
	},

	"childcare-nurseries": { topic: "family-and-schools" },
	"after-school-activities": {
		topic: "family-and-schools",
		also: ["community-and-leisure"],
	},
	"summer-camps": { topic: "family-and-schools" },

	"expat-communities": { topic: "community-and-leisure" },
	"religious-services": { topic: "community-and-leisure" },
	volunteering: { topic: "community-and-leisure" },
	"art-culture": { topic: "community-and-leisure" },
	"sports-clubs": { topic: "community-and-leisure" },
	"fitness-wellness": {
		topic: "community-and-leisure",
		also: ["health"],
		why: "Gyms and studios are leisure; wellness also listed under Health.",
	},
	wineries: {
		topic: "community-and-leisure",
		also: ["food-and-shopping"],
		why: "Tasting visits are a day out; also listed under Food & shopping.",
	},
	"rooftop-bars": {
		topic: "community-and-leisure",
		also: ["food-and-shopping"],
	},
	"community-gardens": { topic: "community-and-leisure" },

	"immigration-lawyers": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
	},
	"property-lawyers": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Conveyancing for buyers; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
};

// ---------------------------------------------------------------------------
// Tools (31 live tools; redirect stubs are not mapped)
// ---------------------------------------------------------------------------

export const TOOL_TOPICS: Record<string, TopicAssignment> = {
	"health-insurance-comparison": {
		topic: "health",
		also: ["money-and-paperwork"],
	},

	"flight-connectivity": {
		topic: "getting-around",
		also: ["moving-here"],
	},
	"drivers-licence-exchange": {
		topic: "getting-around",
		also: ["money-and-paperwork"],
	},

	"isp-comparison": { topic: "home-and-bills" },
	"rental-price-trends": {
		topic: "home-and-bills",
		also: ["moving-here"],
		why: "Rent levels matter most to tenants; Property area comes in Phase 4.",
	},
	"neighbourhood-explorer": {
		topic: "home-and-bills",
		also: ["moving-here"],
		why: "Choosing an area to live in; the homepage presents it as Compare areas.",
	},

	"banking-fee-comparison": { topic: "money-and-paperwork" },
	"social-insurance-calculator": { topic: "money-and-paperwork" },
	"tax-filing-calendar": { topic: "money-and-paperwork" },
	"sole-trader-vs-ltd": { topic: "money-and-paperwork" },
	"grants-finder": { topic: "money-and-paperwork" },
	"meu1-tracker": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
	},
	"visa-renewal-reminder": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Renewals (ARC, passport, licence) are resident paperwork.",
	},
	"tax-residency-tracker": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Day counting is a yearly task for residents who travel.",
	},
	"double-tax-treaty-finder": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
	},
	"budget-builder": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Monthly household budget; the homepage presents it as the cost of living planner.",
	},
	"rent-vs-buy-calculator": {
		topic: "money-and-paperwork",
		also: ["home-and-bills", "moving-here"],
	},
	"mortgage-calculator": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
	},
	"rental-yield-calculator": {
		topic: "money-and-paperwork",
		also: ["moving-here"],
		why: "Investment maths; Property area comes in Phase 4.",
	},

	"school-finder": { topic: "family-and-schools" },

	"events-calendar": { topic: "community-and-leisure" },
	"weather-climate": {
		topic: "community-and-leisure",
		also: ["moving-here"],
		why: "Month-by-month weather and sea temperature, so leisure first.",
	},

	"visa-pathway-finder": { topic: "moving-here" },
	"country-comparison": { topic: "moving-here" },
	"city-comparison": {
		topic: "moving-here",
		also: ["home-and-bills"],
	},
	"relocation-checklist": { topic: "moving-here" },
	"relocation-cost-calculator": { topic: "moving-here" },
	"tax-savings-calculator": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "Compares your home country with Cyprus, a pre-move question.",
	},
	"pet-import-checklist": { topic: "moving-here" },
	"development-comparison": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "New-build buying; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
	"price-benchmarker": {
		topic: "moving-here",
		also: ["money-and-paperwork"],
		why: "New-build buying; parked in Moving to Cyprus until the Phase 4 Property area.",
	},
};

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

export const toolSlug = (href: string) =>
	href.replace(/^\/tools\//, "").replace(/\/$/, "");

const MAPS: Record<ItemType, Record<string, TopicAssignment>> = {
	guide: GUIDE_TOPICS,
	directory: DIRECTORY_TOPICS,
	tool: TOOL_TOPICS,
};

export function getAssignment(
	type: ItemType,
	slug: string,
): TopicAssignment | undefined {
	return MAPS[type][slug];
}

function topicOf(type: ItemType, slug: string): Topic {
	const a = MAPS[type][slug];
	const t = a ? topicBySlug(a.topic) : undefined;
	if (!t)
		throw new Error(
			`No topic mapped for ${type} "${slug}": add it to lib/topic-map.ts`,
		);
	return t;
}

/** Primary topic slug of an item; throws a clear error when unmapped. */
export const primaryTopic = (type: ItemType, slug: string): TopicSlug =>
	topicOf(type, slug).slug;

export const getTopicForGuide = (slug: string) => topicOf("guide", slug);
export const getTopicForSection = (slug: string) => topicOf("directory", slug);
export const getTopicForTool = (slug: string) => topicOf("tool", slug);

/** Middle breadcrumb for an item page: { label: topic name, href: hub }. */
export function topicCrumb(type: ItemType, slug: string) {
	const t = topicOf(type, slug);
	return { label: t.name, href: hubHref(t) };
}

/** A guide, directory or tool reduced to what cards and filters need. */
export type TopicItem = {
	type: ItemType;
	slug: string;
	href: string;
	title: string;
	description: string;
	topic: TopicSlug;
	also: TopicSlug[];
	cities: CitySlug[];
	/** False for the de-listed directories (never shown on other pages). */
	listed: boolean;
};

function toItem(
	type: ItemType,
	slug: string,
	href: string,
	title: string,
	description: string,
	listed = true,
): TopicItem {
	const a = MAPS[type][slug];
	if (!a)
		throw new Error(
			`No topic mapped for ${type} "${slug}": add it to lib/topic-map.ts`,
		);
	return {
		type,
		slug,
		href,
		title,
		description,
		topic: a.topic,
		also: [...(a.also ?? [])],
		cities: [...(a.cities ?? [])],
		listed,
	};
}

let cache: TopicItem[] | null = null;

/** Every mapped item, in data order: guides, then directories, then tools. */
export function allTopicItems(): TopicItem[] {
	if (cache) return cache;
	cache = [
		...GUIDES.map((g) =>
			toItem("guide", g.slug, `/guides/${g.slug}/`, g.title, g.description),
		),
		...DIRECTORIES.map((d) =>
			toItem(
				"directory",
				d.slug,
				`/sections/${d.slug}/`,
				d.name,
				d.description,
				d.listed,
			),
		),
		...TOOLS.map((t) =>
			toItem("tool", toolSlug(t.href), t.href, t.title, t.description),
		),
	];
	return cache;
}

export type TopicItems = {
	guides: TopicItem[];
	directories: TopicItem[];
	tools: TopicItem[];
};

/**
 * Items for a hub: listed items whose primary topic matches first, then items
 * that have it as a secondary topic.
 */
export function itemsForTopic(topic: TopicSlug | Topic): TopicItems {
	const slug = typeof topic === "string" ? topic : topic.slug;
	const listed = allTopicItems().filter((i) => i.listed);
	const ordered = [
		...listed.filter((i) => i.topic === slug),
		...listed.filter((i) => i.topic !== slug && i.also.includes(slug)),
	];
	return {
		guides: ordered.filter((i) => i.type === "guide"),
		directories: ordered.filter((i) => i.type === "directory"),
		tools: ordered.filter((i) => i.type === "tool"),
	};
}

/**
 * Up to `limit` listed items with the same primary topic as the given item,
 * mixing guides, directories and tools, same city first, excluding the item
 * itself and any `exclude` hrefs.
 */
export function moreOnTopic(
	type: ItemType,
	slug: string,
	{ limit = 6, exclude = [] }: { limit?: number; exclude?: string[] } = {},
): { topic: Topic; items: TopicItem[] } {
	const topic = topicOf(type, slug);
	const self = allTopicItems().find((i) => i.type === type && i.slug === slug);
	const skip = new Set(exclude.map((h) => (h.endsWith("/") ? h : `${h}/`)));
	const pool = allTopicItems().filter(
		(i) =>
			i.listed &&
			i.topic === topic.slug &&
			!(i.type === type && i.slug === slug) &&
			!skip.has(i.href),
	);
	const cities = self?.cities ?? [];
	const sameCity = (i: TopicItem) =>
		cities.length > 0 && i.cities.some((c) => cities.includes(c));
	const byType: Record<ItemType, TopicItem[]> = {
		guide: [],
		directory: [],
		tool: [],
	};
	for (const i of [
		...pool.filter(sameCity),
		...pool.filter((i) => !sameCity(i)),
	]) {
		byType[i.type].push(i);
	}
	// Round-robin across types so a guide shows directories and tools too.
	const order: ItemType[] =
		type === "guide"
			? ["guide", "directory", "tool"]
			: type === "directory"
				? ["guide", "directory", "tool"]
				: ["guide", "tool", "directory"];
	const items: TopicItem[] = [];
	while (items.length < limit && order.some((t) => byType[t].length > 0)) {
		for (const t of order) {
			const next = byType[t].shift();
			if (next && items.length < limit) items.push(next);
		}
	}
	return { topic, items };
}
