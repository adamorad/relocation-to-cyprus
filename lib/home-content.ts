import type { IconName } from "@/components/icons/Icon";
import { hubHref, TOPICS, type TopicSlug } from "./topics";

/**
 * Homepage copy and routes. Derived from the Living Option 1 kit
 * (content/home.json) plus the real route map. Every href is an existing
 * static route.
 */

export const HOME_HERO = {
	headline: "Everyday life in Cyprus, made easier.",
	subtitle: "Local knowledge for feeling at home.",
	searchLabel: "Search guides, places and tools",
	searchPlaceholder: "What do you need help with?",
	searchButton: "Search",
} as const;

export type HomeTopic = {
	id: string;
	title: string;
	description: string;
	icon: IconName;
	href: string;
};

export const HOME_TOPICS_HEADING = "What are you looking for?";

/** Short homepage blurbs per topic; name, icon and hub link come from lib/topics. */
const HOME_TOPIC_BLURB: Record<TopicSlug, string> = {
	health: "Doctors, clinics and health services.",
	"getting-around": "Buses, driving and transport tips.",
	"home-and-bills": "Utilities, internet and everyday services.",
	"money-and-paperwork": "Banking, tax and official processes.",
	"food-and-shopping": "Supermarkets, local food and daily essentials.",
	"family-and-schools": "Schools, nurseries and activities for children.",
	"community-and-leisure": "Meet people, sport and local life.",
	"moving-here": "Visas, residency and planning the move.",
};

/** The eight topic cards, each linking to its hub. */
export const HOME_TOPICS: ReadonlyArray<HomeTopic> = TOPICS.map((t) => ({
	id: t.slug,
	title: t.name,
	description: HOME_TOPIC_BLURB[t.slug],
	icon: t.icon,
	href: hubHref(t),
}));

export const HOME_GUIDES_HEADING = "Useful for everyday life";
export const HOME_GUIDES_SUBTITLE =
	"Practical guides to help you settle in and make the most of life in Cyprus.";

/** Guide slugs shown on the homepage. Title and description come from GUIDES. */
export const HOME_GUIDE_SLUGS: ReadonlyArray<{
	slug: string;
	icon: IconName;
	/** Optional image path. When absent a neutral icon panel is rendered. */
	photo?: string;
}> = [
	{ slug: "pharmacies-medication", icon: "healthcare" },
	{ slug: "utilities-setup-guide", icon: "home" },
	{ slug: "getting-around-cyprus-no-car", icon: "transport" },
];

export const HOME_AREA = {
	heading: "Your local area",
	subtitle: "Explore practical information for your city.",
} as const;

export type HomeCity = {
	name: string;
	href: string;
	/** Optional photo path. When absent a neutral pin panel is rendered. */
	photo?: string;
	/** Accurate alt text, used only when a photo is supplied. */
	photoAlt?: string;
};

export const HOME_CITIES: ReadonlyArray<HomeCity> = [
	{ name: "Limassol", href: "/regions/limassol/" },
	{ name: "Paphos", href: "/regions/paphos/" },
	{ name: "Larnaca", href: "/regions/larnaca/" },
	{ name: "Ayia Napa", href: "/regions/ayia-napa/" },
];

export const HOME_TOOLS_HEADING = "Practical tools";
export const HOME_TOOLS_SUBTITLE =
	"Helpful tools to make everyday life simpler.";

export const HOME_TOOLS: ReadonlyArray<{
	id: string;
	title: string;
	description: string;
	icon: IconName;
	href: string;
}> = [
	{
		id: "cost",
		title: "Cost of living planner",
		description: "Get a clearer picture of your monthly costs.",
		icon: "budget",
		href: "/tools/budget-builder/",
	},
	{
		id: "compare",
		title: "Compare areas",
		description: "Explore different cities and find the right fit for you.",
		icon: "map",
		href: "/tools/neighbourhood-explorer/",
	},
	{
		id: "contacts",
		title: "Emergency contacts",
		description: "Key phone numbers and services you might need.",
		icon: "phone",
		href: "/guides/emergency-services-guide/",
	},
];
