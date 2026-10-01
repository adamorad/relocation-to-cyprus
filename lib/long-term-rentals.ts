/**
 * Long-term rental listings for Cyprus. Covers the main rental platforms
 * and residential areas across all four cities.
 *
 * Apartment price ranges come from lib/facts/rents.ts: the middle half
 * (25th to 75th percentile) of Bazaraki district asking rents for the
 * bedroom counts listed. Villas, townhouses and studios were not sampled,
 * so they carry no figure. Verify current rates on the portals.
 */

import { type Bedrooms, RENTS } from "@/lib/facts/rents";
import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type RentalType = "apartment" | "villa" | "studio" | "townhouse";
export type FurnishedStatus = "furnished" | "unfurnished" | "both";

export type RentalListing = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: RentalType;
  bedroomsFrom: number;
  bedroomsTo: number;
  /** 25th to 75th percentile of district asking rents (apartments only); absent when not sampled. */
  monthlyFrom?: number;
  monthlyTo?: number;
  furnished: FurnishedStatus;
  petFriendly: boolean;
  why: string;
  website?: string;
};

export type RentalTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Rental tips
// ---------------------------------------------------------------------------

export const RENTAL_TIPS: ReadonlyArray<RentalTip> = [
  {
    heading: "Negotiate at least 3 months before moving",
    body: "Landlords in Cyprus list high and expect negotiation. Approaching 3–6 months ahead — especially outside peak summer — gives you leverage for a 5–15% reduction and a longer lease term at a fixed rate.",
  },
  {
    heading: "Verify what is included in the monthly price",
    body: "Most Cypriot rentals quote a bare rent figure. Community fees (koinos logos), electricity, water, and internet are typically extras. Ask for a written breakdown before signing — electricity alone can add €150–€400/month in summer.",
  },
  {
    heading: "Use a registered estate agent or reputable portal",
    body: "The main portals are bazaraki.com (largest classifieds), spitogatos.cy (agency listings), and prime-property.com.cy (curated international focus). Always verify the agent holds a RICS Cyprus licence — unlicensed agents are common and have no legal accountability.",
  },
  {
    heading: "Factor in the deposit and advance rent",
    body: "Standard practice in Cyprus is two months' deposit plus one month's rent in advance, paid by bank transfer from a Cypriot account. Have €5,000–€10,000 liquid and a CY-IBAN ready before your search. Landlords can and do reject applicants without local banking.",
  },
];

// ---------------------------------------------------------------------------
// Rental listings
// ---------------------------------------------------------------------------

/**
 * District asking-rent range for apartments with `from` to `to` bedrooms:
 * the lowest 25th percentile to the highest 75th percentile among the
 * reliable Bazaraki cells. Empty when no reliable cell exists.
 */
function districtAskingRange(
  city: City,
  from: number,
  to: number,
): { monthlyFrom: number; monthlyTo: number } | Record<string, never> {
  const cells = ([1, 2, 3] as Bedrooms[])
    .filter((b) => b >= from && b <= to)
    .map((b) => RENTS[city][b])
    .filter((c) => c.reliable && c.p25 > 0 && c.p75 > 0);
  if (cells.length === 0) return {};
  return {
    monthlyFrom: Math.min(...cells.map((c) => c.p25)),
    monthlyTo: Math.max(...cells.map((c) => c.p75)),
  };
}

export const RENTAL_LISTINGS: ReadonlyArray<RentalListing> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Germasogeia Modern Apartment",
    city: "Limassol",
    neighbourhood: "Germasogeia tourist strip",
    type: "apartment",
    bedroomsFrom: 2,
    bedroomsTo: 3,
    ...districtAskingRange("Limassol", 2, 3),
    furnished: "both",
    petFriendly: false,
    why: "Prime tourist-strip location walking distance to the sea. New-build complexes with pools and gym. Popular with relocators wanting walkable city life. Browse current listings on bazaraki.com.",
    website: "https://www.bazaraki.com/real-estate/limassol/germasogeia/",
  },
  {
    name: "Limassol Old Town Studio",
    city: "Limassol",
    neighbourhood: "Old Town / Anexartisias",
    type: "studio",
    bedroomsFrom: 0,
    bedroomsTo: 1,
    furnished: "furnished",
    petFriendly: true,
    why: "Converted traditional buildings in the restored Old Town. Walkable to restaurants, the castle, and the Municipal Gardens. Often furnished and available month-to-month. Best value furnished option in central Limassol.",
    website: "https://www.bazaraki.com/real-estate/limassol/old-town/",
  },
  {
    name: "Agios Tychonas Seafront Villa",
    city: "Limassol",
    neighbourhood: "Agios Tychonas",
    type: "villa",
    bedroomsFrom: 3,
    bedroomsTo: 5,
    furnished: "furnished",
    petFriendly: true,
    why: "Premium seafront villas east of the city, near Four Seasons and Parklane. Private pools, sea views, gated communities. Ideal for families needing space and privacy. Listed on prime-property.com.cy and spitogatos.cy.",
    website: "https://www.prime-property.com.cy/rent/villa/limassol/",
  },
  {
    name: "Mesa Geitonia Family Apartment",
    city: "Limassol",
    neighbourhood: "Mesa Geitonia",
    type: "apartment",
    bedroomsFrom: 2,
    bedroomsTo: 3,
    ...districtAskingRange("Limassol", 2, 3),
    furnished: "both",
    petFriendly: true,
    why: "Residential area popular with young families and professionals. Good schools nearby, easy access to the highway, quieter than the tourist strip. Better value per square metre than the seafront.",
    website: "https://www.spitogatos.cy/en/rent/apartment/limassol/",
  },

  // ── Paphos ───────────────────────────────────────────────────────────────
  {
    name: "Kato Paphos Apartment",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "apartment",
    bedroomsFrom: 1,
    bedroomsTo: 2,
    ...districtAskingRange("Paphos", 1, 2),
    furnished: "both",
    petFriendly: true,
    why: "Kato Paphos is the expat hub of Paphos — walking distance to the harbour, restaurants, and supermarkets. Well-furnished apartments with pools available at strong value versus Limassol. Paphos has the island's best overall expat rental market.",
    website: "https://www.bazaraki.com/real-estate/paphos/kato-paphos/",
  },
  {
    name: "Chlorakas Townhouse",
    city: "Paphos",
    neighbourhood: "Chlorakas",
    type: "townhouse",
    bedroomsFrom: 2,
    bedroomsTo: 3,
    furnished: "both",
    petFriendly: true,
    why: "Family-friendly residential suburb north of Paphos. Modern townhouse complexes with shared pools and communal gardens. Quiet, green, and well-connected to international schools in the area.",
    website: "https://www.spitogatos.cy/en/rent/townhouse/paphos/chlorakas/",
  },
  {
    name: "Peyia Village Villa",
    city: "Paphos",
    neighbourhood: "Peyia / Coral Bay",
    type: "villa",
    bedroomsFrom: 3,
    bedroomsTo: 4,
    furnished: "furnished",
    petFriendly: true,
    why: "Hillside villas above Coral Bay with sea views and private pools. Peyia is popular with British expats for its established community, English-speaking services, and proximity to one of Paphos's best beaches.",
    website: "https://www.bazaraki.com/real-estate/paphos/peyia/",
  },

  // ── Larnaca ──────────────────────────────────────────────────────────────
  {
    name: "Larnaca City Centre Apartment",
    city: "Larnaca",
    neighbourhood: "City centre / Finikoudes",
    type: "apartment",
    bedroomsFrom: 1,
    bedroomsTo: 2,
    ...districtAskingRange("Larnaca", 1, 2),
    furnished: "both",
    petFriendly: false,
    why: "The most affordable city-centre rental market among major Cyprus cities. The Finikoudes promenade area has a good mix of modern and renovated stock. 10–15 minutes from the airport makes it a popular first landing point.",
    website: "https://www.bazaraki.com/real-estate/larnaca/",
  },
  {
    name: "Mackenzie Beach Area Apartment",
    city: "Larnaca",
    neighbourhood: "Mackenzie",
    type: "apartment",
    bedroomsFrom: 1,
    bedroomsTo: 3,
    ...districtAskingRange("Larnaca", 1, 3),
    furnished: "both",
    petFriendly: true,
    why: "Mackenzie is Larnaca's most popular residential beach area — promenade cafes, a sandy beach, and a relaxed atmosphere. Newer apartment buildings with pools available. Strong long-stay community of digital nomads.",
    website: "https://www.spitogatos.cy/en/rent/apartment/larnaca/mackenzie/",
  },


  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Ayia Napa Residential Apartment",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town",
    type: "apartment",
    bedroomsFrom: 1,
    bedroomsTo: 2,
    ...districtAskingRange("Ayia Napa", 1, 2),
    furnished: "furnished",
    petFriendly: true,
    why: "Ayia Napa's year-round residential stock is surprisingly affordable outside tourist season. Off-season (October–April) rents drop significantly. Great beach access and growing remote-worker community. Long-stay discounts common.",
    website: "https://www.bazaraki.com/real-estate/famagusta/ayia-napa/",
  },
];

export const ALL_RENTAL_TYPES: ReadonlyArray<RentalType> = [
  "apartment",
  "villa",
  "studio",
  "townhouse",
];

export const RENTAL_TYPE_LABEL: Record<RentalType, string> = {
  apartment: "Apartment",
  villa: "Villa",
  studio: "Studio",
  townhouse: "Townhouse",
};

export const FURNISHED_LABEL: Record<FurnishedStatus, string> = {
  furnished: "Furnished",
  unfurnished: "Unfurnished",
  both: "Both",
};
