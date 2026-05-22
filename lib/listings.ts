/**
 * Server-safe accessors for listing data. Used by the static pages at
 * /listings/[slug] and /regions/[name] (called inside generateStaticParams).
 */
import { LISTINGS, LISTINGS_BY_REGION, type EnrichedListing } from "./listingsData";

export function allListings(): EnrichedListing[] {
  return LISTINGS;
}

export function listingBySlug(slug: string): EnrichedListing | undefined {
  return LISTINGS.find((l) => l.slug === slug);
}

export function listingsForRegion(regionName: string): EnrichedListing[] {
  return LISTINGS_BY_REGION[regionName] ?? [];
}

export function allSlugs(): string[] {
  return LISTINGS.map((l) => l.slug);
}

/** Slugified region name → original region name lookup. */
export const REGION_SLUGS: Record<string, string> = {
  paphos: "Paphos",
  limassol: "Limassol",
  larnaca: "Larnaca",
  nicosia: "Nicosia",
  "ayia-napa": "Ayia Napa",
};

export function regionFromSlug(slug: string): string | undefined {
  return REGION_SLUGS[slug];
}
