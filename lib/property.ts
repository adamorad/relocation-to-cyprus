/**
 * The guides, tools and directories that live in the Property area
 * (/property/) instead of an everyday topic. Each one is mapped to
 * `topic: "property"` in lib/topic-map.ts; `topicMapProblems()`
 * (lib/topic-map-check.ts, run by `pnpm build` and `pnpm qa:topics`) fails
 * when a slug here matches no guide, tool or directory, or when this list and
 * the mapping disagree.
 *
 * Plain data (no JSX, no listing data) so the Node-run mapping check can load
 * it. The hub page builds its cards from these slugs.
 */

/** Hub section an item is shown in on /property/. */
export type PropertySection = "guides" | "tools" | "professionals";

export type PropertyItemRef = {
	type: "guide" | "directory" | "tool";
	slug: string;
	section: PropertySection;
};

export const PROPERTY_ITEMS: ReadonlyArray<PropertyItemRef> = [
	// Buying guides
	{ type: "guide", slug: "buying-process", section: "guides" },
	{ type: "guide", slug: "new-development-buying-guide", section: "guides" },
	{ type: "guide", slug: "title-deed-status-guide", section: "guides" },
	{ type: "guide", slug: "property-taxes-2026", section: "guides" },
	{ type: "guide", slug: "cyprus-mortgage-foreigners", section: "guides" },
	{ type: "guide", slug: "buying-vs-renting-cyprus", section: "guides" },
	{
		type: "guide",
		slug: "airbnb-short-term-rental-cyprus",
		section: "guides",
	},
	{ type: "guide", slug: "rental-income-tax-cyprus", section: "guides" },

	// Property tools
	{ type: "tool", slug: "mortgage-calculator", section: "tools" },
	{ type: "tool", slug: "rental-yield-calculator", section: "tools" },
	{ type: "tool", slug: "rent-vs-buy-calculator", section: "tools" },
	{ type: "tool", slug: "development-comparison", section: "tools" },
	{ type: "tool", slug: "price-benchmarker", section: "tools" },

	// Professionals: the two directories and the guide to choosing a lawyer
	{ type: "directory", slug: "property-lawyers", section: "professionals" },
	{ type: "directory", slug: "property-management", section: "professionals" },
	{ type: "guide", slug: "property-lawyers-cyprus", section: "professionals" },
];
