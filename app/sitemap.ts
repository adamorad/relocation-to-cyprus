import type { MetadataRoute } from "next";
import { DEVELOPERS } from "@/lib/developers";
import { GUIDES } from "@/lib/guides";
import { allListings } from "@/lib/listings";
import { REGIONS } from "@/lib/regions";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";
import { toolSlug } from "@/lib/topic-map";
import { assertTopicMapComplete } from "@/lib/topic-map-check";
import { DAILY_TOPICS, hubHref } from "@/lib/topics";

/** Every live tool, from lib/tools-index.ts (the tools index and topic map use the same list). */
const TOOL_SLUGS = TOOLS.map((t) => toolSlug(t.href));

export const dynamic = "force-static";

const SITE_URL = "https://realcy.app";

export default function sitemap(): MetadataRoute.Sitemap {
	// Fails the build when a guide, directory or tool has no topic.
	assertTopicMapComplete();
	const now = new Date();
	return [
		{
			url: `${SITE_URL}/`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/about/`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/contact/`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/privacy/`,
			lastModified: now,
			changeFrequency: "yearly" as const,
			priority: 0.3,
		},
		{
			url: `${SITE_URL}/explore/`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/guides/`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		...DAILY_TOPICS.map((t) => ({
			url: `${SITE_URL}${hubHref(t)}`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})),
		{
			url: `${SITE_URL}/moving-to-cyprus/`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		...REGIONS.map((r) => ({
			url: `${SITE_URL}/regions/${r.slug}/`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: 0.9,
		})),
		...GUIDES.map((g) => ({
			url: `${SITE_URL}/guides/${g.slug}/`,
			lastModified: new Date(g.dateModified),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
		{
			url: `${SITE_URL}/regions/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/listings/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/advertise/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		...allListings().map((l) => ({
			url: `${SITE_URL}/listings/${l.slug}/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})),
		{
			url: `${SITE_URL}/sections/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		...SECTIONS_INDEX.map((s) => ({
			url: `${SITE_URL}/sections/${s.slug}/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		{
			url: `${SITE_URL}/tools/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		...TOOL_SLUGS.map((slug) => ({
			url: `${SITE_URL}/tools/${slug}/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		{
			url: `${SITE_URL}/developers/`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		...DEVELOPERS.map((d) => ({
			url: `${SITE_URL}/developers/${d.slug}/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
	];
}
