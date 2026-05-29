/**
 * Long-term rental listings for Cyprus. Covers the main rental platforms
 * and residential areas across all five cities.
 *
 * Price ranges are indicative as of 2026; verify current rates on
 * bazaraki.com, spitogatos.cy, and prime-property.com.cy before quoting.
 */

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
  monthlyFrom: number;
  monthlyTo: number;
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
// Rental listings (12–15 real-or-realistic entries across all cities)
// ---------------------------------------------------------------------------

export const RENTAL_LISTINGS: ReadonlyArray<RentalListing> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Germasogeia Modern Apartment",
    city: "Limassol",
    neighbourhood: "Germasogeia tourist strip",
    type: "apartment",
    bedroomsFrom: 2,
    bedroomsTo: 3,
    monthlyFrom: 1400,
    monthlyTo: 2200,
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
    monthlyFrom: 700,
    monthlyTo: 1100,
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
    monthlyFrom: 3500,
    monthlyTo: 6000,
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
    monthlyFrom: 1100,
    monthlyTo: 1700,
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
    monthlyFrom: 750,
    monthlyTo: 1400,
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
    monthlyFrom: 900,
    monthlyTo: 1500,
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
    monthlyFrom: 1500,
    monthlyTo: 2800,
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
    monthlyFrom: 700,
    monthlyTo: 1300,
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
    monthlyFrom: 900,
    monthlyTo: 1600,
    furnished: "both",
    petFriendly: true,
    why: "Mackenzie is Larnaca's most popular residential beach area — promenade cafes, a sandy beach, and a relaxed atmosphere. Newer apartment buildings with pools available. Strong long-stay community of digital nomads.",
    website: "https://www.spitogatos.cy/en/rent/apartment/larnaca/mackenzie/",
  },

  // ── Nicosia ──────────────────────────────────────────────────────────────
  {
    name: "Engomi Apartment",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "apartment",
    bedroomsFrom: 2,
    bedroomsTo: 3,
    monthlyFrom: 900,
    monthlyTo: 1500,
    furnished: "both",
    petFriendly: true,
    why: "Engomi is Nicosia's most established upscale residential area — tree-lined streets, proximity to embassies, good schools, and the Hilton. Popular with corporate relocators and diplomats. Solid long-term rental supply.",
    website: "https://www.bazaraki.com/real-estate/nicosia/engomi/",
  },
  {
    name: "Strovolos Modern Apartment",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    type: "apartment",
    bedroomsFrom: 2,
    bedroomsTo: 3,
    monthlyFrom: 800,
    monthlyTo: 1300,
    furnished: "both",
    petFriendly: true,
    why: "Strovolos is Nicosia's largest suburb — excellent schools, supermarkets, and business parks. New-build complexes with modern finishes and parking at lower rates than Engomi. Best value family apartment area in the capital.",
    website: "https://www.spitogatos.cy/en/rent/apartment/nicosia/strovolos/",
  },
  {
    name: "Nicosia Old Town Studio",
    city: "Nicosia",
    neighbourhood: "Old Walled City",
    type: "studio",
    bedroomsFrom: 0,
    bedroomsTo: 1,
    monthlyFrom: 550,
    monthlyTo: 900,
    furnished: "furnished",
    petFriendly: false,
    why: "Renovated heritage studios within the old walled city walls. Characterful, walkable, and the cheapest furnished option in any Cyprus city. Good WiFi, walking distance to government offices — ideal for solo relocators on a budget.",
    website: "https://www.bazaraki.com/real-estate/nicosia/old-city/",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Ayia Napa Residential Apartment",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town",
    type: "apartment",
    bedroomsFrom: 1,
    bedroomsTo: 2,
    monthlyFrom: 600,
    monthlyTo: 1100,
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
