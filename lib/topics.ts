import type { IconName } from "@/components/icons/Icon";

/**
 * The eight topics that organise every guide, directory and tool. Each topic
 * has a hub page at `hubHref(topic)`. The item-to-topic mapping lives in
 * `lib/topic-map.ts` (reviewed in docs/topics-mapping.md).
 *
 * Client-safe: imported by the header, so keep it free of content data.
 */

export const TOPIC_SLUGS = [
	"health",
	"getting-around",
	"home-and-bills",
	"money-and-paperwork",
	"food-and-shopping",
	"family-and-schools",
	"community-and-leisure",
	"moving-here",
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export type Topic = {
	slug: TopicSlug;
	name: string;
	/** Compact label for chips and tight menus. */
	shortName: string;
	/** One plain sentence, used as the hub intro and card text. */
	description: string;
	icon: IconName;
};

export const TOPICS: ReadonlyArray<Topic> = [
	{
		slug: "health",
		name: "Health",
		shortName: "Health",
		description:
			"GeSY, doctors, pharmacies, insurance and what to do in an emergency.",
		icon: "healthcare",
	},
	{
		slug: "getting-around",
		name: "Getting around",
		shortName: "Getting around",
		description:
			"Buses, driving, licences, car hire, airports and ferries across Cyprus.",
		icon: "transport",
	},
	{
		slug: "home-and-bills",
		name: "Home & bills",
		shortName: "Home & bills",
		description:
			"Renting a home, utilities, internet, recycling, water and solar.",
		icon: "home",
	},
	{
		slug: "money-and-paperwork",
		name: "Money & paperwork",
		shortName: "Money & paperwork",
		description:
			"Banking, tax returns, social insurance, residence permits and running a business.",
		icon: "paperwork",
	},
	{
		slug: "food-and-shopping",
		name: "Food & shopping",
		shortName: "Food & shopping",
		description:
			"Markets, international groceries, food delivery and eating like a local.",
		icon: "shopping",
	},
	{
		slug: "family-and-schools",
		name: "Family & schools",
		shortName: "Family & schools",
		description:
			"Schools, nurseries, activities for children and family paperwork.",
		icon: "school",
	},
	{
		slug: "community-and-leisure",
		name: "Community & leisure",
		shortName: "Community",
		description:
			"Meeting people, sport, culture, the outdoors and learning Greek.",
		icon: "community",
	},
	{
		slug: "moving-here",
		name: "Moving to Cyprus",
		shortName: "Moving here",
		description:
			"Visas, residency routes, tax status, buying property and planning the move.",
		icon: "suitcase",
	},
];

const BY_SLUG = new Map<string, Topic>(TOPICS.map((t) => [t.slug, t]));

export function isTopicSlug(v: string | null | undefined): v is TopicSlug {
	return typeof v === "string" && BY_SLUG.has(v);
}

export function topicBySlug(slug: string): Topic | undefined {
	return BY_SLUG.get(slug);
}

/** Hub URL: "/{slug}/", except Moving here which keeps /moving-to-cyprus/. */
export function hubHref(topic: Topic | TopicSlug): string {
	const slug = typeof topic === "string" ? topic : topic.slug;
	return slug === "moving-here" ? "/moving-to-cyprus/" : `/${slug}/`;
}

/** The seven topics with a hub at /{slug}/ (the dynamic [topic] route). */
export const DAILY_TOPICS: ReadonlyArray<Topic> = TOPICS.filter(
	(t) => t.slug !== "moving-here",
);

/** The four city pages used for city filters and "Explore by city". */
export const CITY_SLUGS = [
	"limassol",
	"paphos",
	"larnaca",
	"ayia-napa",
] as const;
export type CitySlug = (typeof CITY_SLUGS)[number];
export const CITY_NAME: Record<CitySlug, string> = {
	limassol: "Limassol",
	paphos: "Paphos",
	larnaca: "Larnaca",
	"ayia-napa": "Ayia Napa",
};

export function isCitySlug(v: string | null | undefined): v is CitySlug {
	return typeof v === "string" && Object.hasOwn(CITY_NAME, v);
}
