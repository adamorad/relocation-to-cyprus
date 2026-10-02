/**
 * Server-only accessors for listing data. Used by the static pages at
 * /listings/[slug] and /regions/[name] (called inside generateStaticParams).
 * Never import this module from a client component: it reads the full
 * lib/data/listings.json (hidden listings included) for the staleness guard.
 */
import rawListings from "./data/listings.json";
import visibleListings from "./data/listings.visible.json";
import { isVisibleRecord } from "./listingRegion";
import {
	type EnrichedListing,
	LISTINGS,
	LISTINGS_BY_REGION,
} from "./listingsData";

// Build-time guard: the committed visible subset must equal the source data
// filtered by the current rule, so a data or classifier change that forgot to
// regenerate it fails the build instead of shipping stale or hidden listings.
if (
	JSON.stringify(
		(rawListings as Array<{ lat?: unknown; lng?: unknown }>).filter(
			isVisibleRecord,
		),
	) !== JSON.stringify(visibleListings)
) {
	throw new Error(
		"lib/data/listings.visible.json is stale. Run: pnpm data:listings",
	);
}

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
	"ayia-napa": "Ayia Napa",
};

export function regionFromSlug(slug: string): string | undefined {
	return REGION_SLUGS[slug];
}
