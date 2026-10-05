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
	// lastModified is set only where a real last-changed date exists (guides:
	// dateModified). Listings, developers, sections, tools, regions and hubs
	// carry no per-item date, so lastmod is omitted rather than set to the
	// build time.
	return [
		{
			url: `${SITE_URL}/`,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/about/`,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/contact/`,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/privacy/`,
			changeFrequency: "yearly" as const,
			priority: 0.3,
		},
		{
			url: `${SITE_URL}/explore/`,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/guides/`,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		...DAILY_TOPICS.map((t) => ({
			url: `${SITE_URL}${hubHref(t)}`,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})),
		{
			url: `${SITE_URL}/moving-to-cyprus/`,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		...REGIONS.map((r) => ({
			url: `${SITE_URL}/regions/${r.slug}/`,
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
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/property/`,
			changeFrequency: "weekly" as const,
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/listings/`,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/advertise/`,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		...allListings().map((l) => ({
			url: `${SITE_URL}/listings/${l.slug}/`,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})),
		{
			url: `${SITE_URL}/sections/`,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		...SECTIONS_INDEX.map((s) => ({
			url: `${SITE_URL}/sections/${s.slug}/`,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		{
			url: `${SITE_URL}/tools/`,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		...TOOL_SLUGS.map((slug) => ({
			url: `${SITE_URL}/tools/${slug}/`,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		{
			url: `${SITE_URL}/developers/`,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		...DEVELOPERS.map((d) => ({
			url: `${SITE_URL}/developers/${d.slug}/`,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
	];
}
