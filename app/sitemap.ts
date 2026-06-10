import type { MetadataRoute } from "next";
import { allListings } from "@/lib/listings";
import { REGIONS } from "@/lib/regions";
import { GUIDES } from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { DEVELOPERS } from "@/lib/developers";

const TOOL_SLUGS = [
  "rent-vs-buy-calculator",
  "neighborhood-comparison",
  "meu1-tracker",
  "visa-pathway-finder",
  "tax-residency-planner",
  "social-insurance-calculator",
  "banking-fee-comparison",
  "tax-filing-calendar",
  "double-tax-treaty-finder",
  "freelancer-vs-company",
  "health-insurance-comparison",
  "flight-connectivity",
  "events-calendar",
  "isp-comparison",
  "visa-renewal-reminder",
  "grants-finder",
];

export const dynamic = "force-static";

const SITE_URL = "https://realcy.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy/`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/explore/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
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
    { url: `${SITE_URL}/sections/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    ...SECTIONS_INDEX.map((s) => ({
      url: `${SITE_URL}/sections/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/tools/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    ...TOOL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/tools/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/developers/`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...DEVELOPERS.map((d) => ({
      url: `${SITE_URL}/developers/${d.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
