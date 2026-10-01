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

/**
 * A responsive image in two widths (800w for cards, 1600w for heroes).
 * `alt` is omitted for decorative images (topic illustrations).
 */
export type SiteImage = {
	src: string;
	srcSmall: string;
	width: number;
	height: number;
	alt?: string;
};

/** Topic spot illustration (transparent WebP) at /images/topics/{slug}-{w}.webp. */
const topicImage = (slug: string, height: number): SiteImage => ({
	src: `/images/topics/${slug}-1600.webp`,
	srcSmall: `/images/topics/${slug}-800.webp`,
	width: 1600,
	height,
});

export type Topic = {
	slug: TopicSlug;
	name: string;
	/** Compact label for chips and tight menus. */
	shortName: string;
	/** One plain sentence, used as the hub intro and card text. */
	description: string;
	icon: IconName;
	/** Spot illustration shown on the hub header and homepage card. */
	image?: SiteImage;
};

export const TOPICS: ReadonlyArray<Topic> = [
	{
		slug: "health",
		name: "Health",
		shortName: "Health",
		description:
			"GeSY, doctors, pharmacies, insurance and what to do in an emergency.",
		icon: "healthcare",
		image: topicImage("health", 1067),
	},
	{
		slug: "getting-around",
		name: "Getting around",
		shortName: "Getting around",
		description:
			"Buses, driving, licences, car hire, airports and ferries across Cyprus.",
		icon: "transport",
		image: topicImage("getting-around", 901),
	},
	{
		slug: "home-and-bills",
		name: "Home & bills",
		shortName: "Home & bills",
		description:
			"Renting a home, utilities, internet, recycling, water and solar.",
		icon: "home",
		image: topicImage("home-and-bills", 1067),
	},
	{
		slug: "money-and-paperwork",
		name: "Money & paperwork",
		shortName: "Money & paperwork",
		description:
			"Banking, tax returns, social insurance, residence permits and running a business.",
		icon: "paperwork",
		image: topicImage("money-and-paperwork", 1067),
	},
	{
		slug: "food-and-shopping",
		name: "Food & shopping",
		shortName: "Food & shopping",
		description:
			"Markets, international groceries, food delivery and eating like a local.",
		icon: "shopping",
		image: topicImage("food-and-shopping", 1067),
	},
	{
		slug: "family-and-schools",
		name: "Family & schools",
		shortName: "Family & schools",
		description:
			"Schools, nurseries, activities for children and family paperwork.",
		icon: "school",
		image: topicImage("family-and-schools", 1067),
	},
	{
		slug: "community-and-leisure",
		name: "Community & leisure",
		shortName: "Community",
		description:
			"Meeting people, sport, culture, the outdoors and learning Greek.",
		icon: "community",
		image: topicImage("community-and-leisure", 1067),
	},
	{
		slug: "moving-here",
		name: "Moving to Cyprus",
		shortName: "Moving here",
		description:
			"Visas, residency routes, tax status, buying property and planning the move.",
		icon: "suitcase",
		image: topicImage("moving-here", 1067),
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

/**
 * Open Graph / Twitter share metadata using a topic's share image ({slug}-og.jpg)
 * (falls back to the site default). Page-level `openGraph` replaces the root
 * one, so this also restores `siteName` and `locale`.
 */
export function topicShareMetadata(
	topic: Topic,
	{
		title,
		description,
		url,
	}: { title: string; description: string; url: string },
) {
	const image = topic.image
		? {
				// Flattened 1200x630 JPEG on the sky colour: the hub illustration
				// is transparent and some platforms render alpha as black.
				url: `https://realcy.app${topic.image.src.replace("-1600.webp", "-og.jpg")}`,
				width: 1200,
				height: 630,
				alt: `${topic.name} in Cyprus`,
			}
		: {
				url: "https://realcy.app/og-default.webp",
				width: 1200,
				height: 630,
				alt: "RealCy.app: Living in Cyprus",
			};
	return {
		openGraph: {
			type: "website" as const,
			locale: "en_GB",
			siteName: "RealCy.app",
			title,
			description,
			url,
			images: [image],
		},
		twitter: {
			card: "summary_large_image" as const,
			title,
			description,
			images: [image.url],
		},
	};
}
