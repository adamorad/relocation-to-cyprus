/**
 * Developer data layer — groups all listings by developer name.
 */
import { LISTINGS, type EnrichedListing } from "@/lib/listingsData";

export type Developer = {
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  listings: EnrichedListing[];
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const DEVELOPERS: Developer[] = (() => {
  const map = new Map<string, Developer>();

  for (const listing of LISTINGS) {
    const devName = listing.developer?.name;
    if (!devName) continue;

    const slug = slugify(devName);
    if (!map.has(slug)) {
      map.set(slug, {
        name: devName,
        slug,
        logo: listing.developer?.logo ?? undefined,
        description: listing.developer?.description ?? undefined,
        listings: [],
      });
    }
    map.get(slug)!.listings.push(listing);
  }

  return Array.from(map.values()).sort(
    (a, b) => b.listings.length - a.listings.length,
  );
})();

export function developerBySlug(slug: string): Developer | undefined {
  return DEVELOPERS.find((d) => d.slug === slug);
}

export function allDeveloperSlugs(): string[] {
  return DEVELOPERS.map((d) => d.slug);
}
