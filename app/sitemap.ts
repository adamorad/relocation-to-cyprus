import type { MetadataRoute } from "next";
import { DEVELOPERS } from "@/lib/developers";
import { GUIDES } from "@/lib/guides";
import { allListings } from "@/lib/listings";
import { REGIONS } from "@/lib/regions";
import { SECTIONS_INDEX } from "@/lib/sections-index";

const TOOL_SLUGS = [
	"rent-vs-buy-calculator",
	"city-comparison",
	"meu1-tracker",
	"visa-pathway-finder",
	"tax-residency-tracker",
	"social-insurance-calculator",
	"banking-fee-comparison",
	"tax-filing-calendar",
	"double-tax-treaty-finder",
	"sole-trader-vs-ltd",
	"health-insurance-comparison",
	"flight-connectivity",
	"events-calendar",
	"isp-comparison",
	"visa-renewal-reminder",
	"grants-finder",
	"budget-builder",
	"mortgage-calculator",
	"country-comparison",
	"rental-yield-calculator",
	"relocation-checklist",
	"development-comparison",
	"price-benchmarker",
	"tax-savings-calculator",
	"relocation-cost-calculator",
	"neighbourhood-explorer",
	"weather-climate",
	"school-finder",
	"pet-import-checklist",
	"drivers-licence-exchange",
	"gesy-registration",
	"rental-price-trends",
];

export const dynamic = "force-static";

const SITE_URL = "https://realcy.app";

export default function sitemap(): MetadataRoute.Sitemap {
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
		...REGIONS.map((r) => ({
			url: `${SITE_URL}/regions/${r.slug}/`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: 0.9,
		})),
		...GUIDES.map((g) => ({
			url: `${SITE_URL}/guides/${g.slug}/`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
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
