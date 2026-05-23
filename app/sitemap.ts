import type { MetadataRoute } from "next";
import { allListings } from "@/lib/listings";
import { REGIONS } from "@/lib/regions";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

const SITE_URL = "https://realcy.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
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
  ];
}
