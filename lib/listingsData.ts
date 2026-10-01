import rawListings from "./data/listings.json";
import {
  CITIES,
  districtForLonLat,
  HIDDEN_CLASSIFIER_CITIES,
  project,
} from "./cyprusData";

export type Offer = {
  unit?: string;
  title?: string;
  price?: string | null;
  "price per m²"?: string | null;
  pricePerM2?: string | null;
  bedrooms?: string | null;
  bathrooms?: string | null;
  "living area"?: string | null;
  "plot/land"?: string | null;
  floor?: string | null;
  parking?: string | null;
  note?: string | null;
  description?: string | null;
  features?: Record<string, string>;
};

export type ImageGallery = {
  title: string;
  images: string[];
};

export type Listing = {
  title: string;
  id: number;
  slug: string;
  url: string | null;
  priceRange: string | null;
  pricePerM2: string | null;
  location: string | null;
  lat: number;
  lng: number;
  logo?: string | null;
  headerImage?: string | null;
  images?: string[];
  imageGalleries?: ImageGallery[];
  developer:
    | {
        name?: string;
        address?: string;
        logo?: string;
        url_slug?: string;
        description?: string;
      }
    | null;
  agents:
    | string[]
    | Array<{ name?: string; logo?: string; contacts?: unknown }>;
  specs: Record<string, string>;
  features: string[];
  offers: Offer[];
  nearby: Record<string, string>;
  brochures: string[] | Array<{ name?: string; url?: string }>;
  description: string | null;
  videoUrl?: string | null;
  contacts?: {
    phone?: string[];
    whatsapp?: string;
    email?: string;
  };
};

export type EnrichedListing = Listing & {
  regionCity: string;
  /** [x, z] in three.js scene space. */
  scenePos: readonly [number, number];
};

// Classifier positions include the hidden (non-public) cities so that listings
// near them are classified correctly and then hidden, never misassigned.
// Order matches the original city list (hidden entry first).
const CITY_SCENE_POSITIONS = [...HIDDEN_CLASSIFIER_CITIES, ...CITIES].map((c) => {
  const [px, py] = project(c.lon, c.lat);
  return { name: c.name, x: px, z: -py };
});

function nearestCity(x: number, z: number): string {
  let bestName = CITY_SCENE_POSITIONS[0].name;
  let bestD = Number.POSITIVE_INFINITY;
  for (const c of CITY_SCENE_POSITIONS) {
    const dx = c.x - x;
    const dz = c.z - z;
    const d = dx * dx + dz * dz;
    if (d < bestD) {
      bestD = d;
      bestName = c.name;
    }
  }
  return bestName;
}

const all = rawListings as unknown as Listing[];

/**
 * Owner rule: Nicosia is intentionally excluded from RealCy.app. Listings
 * classified into a hidden classifier city (lib/cyprusData.ts
 * HIDDEN_CLASSIFIER_CITIES) are kept in lib/data/listings.json (reversible)
 * but hidden from every page. This is the single place listings are hidden:
 * LISTINGS, LISTINGS_BY_REGION, developers, the sitemap, static params and
 * every tool all derive from the filtered LISTINGS below.
 */
const HIDDEN_REGION_CITIES: ReadonlySet<string> = new Set(
  HIDDEN_CLASSIFIER_CITIES.map((c) => c.name),
);

export function isHiddenListing(l: Pick<EnrichedListing, "regionCity">): boolean {
  return HIDDEN_REGION_CITIES.has(l.regionCity);
}

export const LISTINGS: EnrichedListing[] = all
  .filter((l) => typeof l.lat === "number" && typeof l.lng === "number")
  .map((l) => {
    const [px, py] = project(l.lng, l.lat);
    const x = px;
    const z = -py;
    // Prefer real district; fall back to nearest city for points just outside
    // every district polygon (e.g., coastal listings near a boundary).
    const region = districtForLonLat(l.lng, l.lat) ?? nearestCity(x, z);
    return { ...l, scenePos: [x, z] as const, regionCity: region };
  })
  .filter((l) => !isHiddenListing(l));

export const LISTINGS_BY_REGION: Record<string, EnrichedListing[]> = (() => {
  const m: Record<string, EnrichedListing[]> = {};
  for (const c of CITIES) m[c.name] = [];
  for (const l of LISTINGS) {
    if (!m[l.regionCity]) m[l.regionCity] = [];
    m[l.regionCity].push(l);
  }
  return m;
})();
