/**
 * Hotels section content. Consumed by components/HotelsPanel.tsx.
 *
 * Booking links run through bookingUrl() / hotelsComUrl() helpers so affiliate
 * IDs can be injected in one place when the affiliate programmes are activated.
 *
 * Curation: properties selected for relevance to relocators — quality, location,
 * and suitability for extended stays. Prices and availability change; always
 * verify on the booking platform before quoting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type HotelCategory =
  | "adults-only"
  | "family"
  | "boutique"
  | "luxury"
  | "budget"
  | "beach";

export type Hotel = {
  name: string;
  city: City;
  category: HotelCategory;
  neighbourhood?: string;
  stars?: 3 | 4 | 5;
  why: string;
  /** Full Booking.com property URL — always pass through bookingUrl(). */
  bookingCom?: string;
  /** Full Hotels.com property URL — always pass through hotelsComUrl(). */
  hotelsCom?: string;
  /** Official hotel website. */
  website?: string;
};

export type HotelTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Affiliate URL helpers — inject IDs here when programmes are activated
// ---------------------------------------------------------------------------

/** Booking.com affiliate: append `?aid=YOUR_AID` when ready. */
export function bookingUrl(url: string): string {
  return url;
}

/** Hotels.com affiliate: append `?pos=HCOM_XX&locale=en_US` when ready. */
export function hotelsComUrl(url: string): string {
  return url;
}

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------

export const ALL_HOTEL_CATEGORIES: ReadonlyArray<HotelCategory> = [
  "adults-only",
  "family",
  "boutique",
  "luxury",
  "budget",
  "beach",
];

export const HOTEL_CATEGORY_LABEL: Record<HotelCategory, string> = {
  "adults-only": "Adults Only",
  family: "Family",
  boutique: "Boutique & Design",
  luxury: "Luxury",
  budget: "Budget & Aparthotels",
  beach: "Beach Resorts",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export const HOTEL_TIPS: ReadonlyArray<HotelTip> = [
  {
    heading: "Negotiate long-stay rates",
    body: "If you're staying 4+ weeks, call the hotel directly and ask for a monthly rate. Most properties — especially aparthotels — will discount 20–35% off the rack rate for a guaranteed long stay.",
  },
  {
    heading: "Aparthotel vs standard hotel",
    body: "For stays over 3 weeks, an aparthotel with a kitchen and washing machine saves significantly on food and laundry costs. Many Cypriot aparthotels are designed precisely for this use case.",
  },
  {
    heading: "Shoulder season pricing",
    body: "Prices drop sharply after mid-September when the tourist season ends. Spring (March–May) is mild, uncrowded, and significantly cheaper than summer — ideal timing for a house-hunting trip.",
  },
  {
    heading: "WiFi for remote work",
    body: "\"Free WiFi\" varies wildly across Cyprus. Ask for actual speeds before booking. City-centre aparthotels in residential buildings often have fibre; tourist-strip hotels can be slow in peak season.",
  },
  {
    heading: "Adults Only for couples",
    body: "If you're relocating as a couple without children, adults-only properties are quieter, better-staffed in off-season, and increasingly the premium choice in Cyprus. Paphos has the strongest selection.",
  },
  {
    heading: "Parking and car rental",
    body: "City-centre hotels typically charge €10–20 / day for parking; most beach resorts include it. Factor this in — Cyprus essentially requires a car for daily life outside the city centres.",
  },
];

// ---------------------------------------------------------------------------
// Hotels
// ---------------------------------------------------------------------------

export const HOTELS: ReadonlyArray<Hotel> = [
  // ── Adults Only ──────────────────────────────────────────────────────────
  {
    name: "Almyra",
    city: "Paphos",
    category: "adults-only",
    neighbourhood: "Kato Paphos waterfront",
    stars: 5,
    why: "Sleek adults-only property right on the Paphos seafront. Contemporary design, infinity pool overlooking the sea, and a renowned spa. One of Cyprus's best-regarded boutique luxury stays.",
    bookingCom: "https://www.booking.com/hotel/cy/almyra.html",
    website: "https://www.thanoshotels.com/almyra",
  },
  {
    name: "Columbia Beach Resort",
    city: "Paphos",
    category: "adults-only",
    neighbourhood: "Pissouri Bay",
    stars: 5,
    why: "Secluded adults-only resort in Pissouri Bay between Limassol and Paphos. Suite-only, whitewashed Cycladic architecture, private beach. One of the quietest luxury options on the island.",
    bookingCom: "https://www.booking.com/hotel/cy/columbia-beach-resort.html",
    website: "https://www.columbiabeachresort.com",
  },
  {
    name: "The Londa",
    city: "Limassol",
    category: "adults-only",
    neighbourhood: "Germasogeia tourist strip",
    stars: 5,
    why: "Boutique adults-only hotel on the Limassol tourist strip. Intimate scale (60 suites), rooftop bar with sea views, Art Deco-inflected design. Good base for exploring the city.",
    bookingCom: "https://www.booking.com/hotel/cy/the-londa-hotel.html",
    website: "https://www.londa.com.cy",
  },
  {
    name: "Elysium Resort",
    city: "Paphos",
    category: "adults-only",
    neighbourhood: "Kato Paphos",
    stars: 5,
    why: "Large Byzantine-inspired resort. Adults-only policy (except holidays), multiple pools, extensive spa. Strong value for a 5-star Paphos property — consistently well-reviewed.",
    bookingCom: "https://www.booking.com/hotel/cy/elysium-resort-and-spa.html",
    website: "https://www.elysiumhotel.com",
  },

  // ── Family ───────────────────────────────────────────────────────────────
  {
    name: "Olympic Lagoon Resort",
    city: "Paphos",
    category: "family",
    neighbourhood: "Chlorakas, north Paphos",
    stars: 5,
    why: "Purpose-built family resort with a water park, kids clubs for all ages, and a supervised teen zone. Enormous lagoon pools. One of the top family picks on the island.",
    bookingCom: "https://www.booking.com/hotel/cy/olympic-lagoon-resort.html",
    website: "https://www.olympicholidays.com/olympic-lagoon-resort-paphos",
  },
  {
    name: "Capo Bay Hotel",
    city: "Ayia Napa",
    category: "family",
    neighbourhood: "Protaras / Fig Tree Bay",
    stars: 4,
    why: "Long-standing family favourite on Fig Tree Bay — ranked among Cyprus's best beaches. Shallow, calm waters ideal for young children. Kids club, multiple pools, easy walk to the beach.",
    bookingCom: "https://www.booking.com/hotel/cy/capo-bay.html",
    website: "https://www.capobay.com",
  },
  {
    name: "Golden Bay Beach Hotel",
    city: "Larnaca",
    category: "family",
    neighbourhood: "Dekelia Road, north Larnaca",
    stars: 5,
    why: "Cyprus's longest beachfront hotel (over 300m of private sandy beach). Large family rooms, supervised kids club, non-motorised watersports included. 20 minutes from Larnaca Airport.",
    bookingCom: "https://www.booking.com/hotel/cy/golden-bay-beach.html",
    website: "https://www.goldenbay.com.cy",
  },
  {
    name: "Crowne Plaza Limassol",
    city: "Limassol",
    category: "family",
    neighbourhood: "Germasogeia tourist strip",
    stars: 5,
    why: "IHG's flagship Cyprus property. Large rooms with connecting options for families, direct beach access, and a kids club in season. Good central location for day trips across the island.",
    bookingCom: "https://www.booking.com/hotel/cy/crowne-plaza-limassol.html",
    website: "https://www.cplimassolhotel.com",
  },
  {
    name: "Coral Beach Hotel & Resort",
    city: "Paphos",
    category: "family",
    neighbourhood: "Coral Bay, north Paphos",
    stars: 5,
    why: "Set directly on Coral Bay, one of Paphos's best family beaches. Dedicated kids' facilities, extensive pool complex, and a long stretch of sand. Popular with families doing extended stays.",
    bookingCom: "https://www.booking.com/hotel/cy/coral-beach-hotel-resort.html",
    website: "https://www.coral.com.cy",
  },

  // ── Boutique & Design ────────────────────────────────────────────────────
  {
    name: "Annabelle",
    city: "Paphos",
    category: "boutique",
    neighbourhood: "Kato Paphos harbour",
    stars: 5,
    why: "Legendary Paphos property — lush tropical gardens, the most beautiful pool setting in the city, and a genuinely personal level of service. Feels boutique despite its size.",
    bookingCom: "https://www.booking.com/hotel/cy/annabelle.html",
    website: "https://www.thanoshotels.com/annabelle",
  },
  {
    name: "15 Boutique Hotel",
    city: "Limassol",
    category: "boutique",
    neighbourhood: "Limassol Old Town",
    stars: 4,
    why: "Converted heritage building in Limassol's restored Old Town. 15 individually designed rooms, rooftop terrace overlooking the castle, walking distance to the best restaurants in the city.",
    bookingCom: "https://www.booking.com/hotel/cy/15-boutique-hotel.html",
    website: "https://www.15boutiquehotel.com",
  },
  {
    name: "The Milestone Hotel",
    city: "Nicosia",
    category: "boutique",
    neighbourhood: "Nicosia city centre",
    stars: 5,
    why: "The capital's most characterful hotel — housed in a restored 1920s building with contemporary interiors. Only 20 suites. Restaurant highly regarded. Best option for a long stay in Nicosia.",
    bookingCom: "https://www.booking.com/hotel/cy/the-milestone.html",
    website: "https://www.themilestonehotel.com.cy",
  },
  {
    name: "Curium Palace Hotel",
    city: "Limassol",
    category: "boutique",
    neighbourhood: "Limassol city centre",
    stars: 4,
    why: "Mid-century heritage hotel right in Limassol's city centre. Recently renovated, rooftop bar, walking distance to the Municipal Gardens and Old Town. More character than the tourist-strip chains.",
    bookingCom: "https://www.booking.com/hotel/cy/curium-palace.html",
    website: "https://www.curiumpalace.com",
  },

  // ── Luxury ───────────────────────────────────────────────────────────────
  {
    name: "Anassa",
    city: "Paphos",
    category: "luxury",
    neighbourhood: "Neo Chorio, Akamas Peninsula",
    stars: 5,
    why: "Consistently ranked one of the top hotels in the Eastern Mediterranean. Isolated on the Akamas Peninsula, Greco-Roman architecture, thalasso spa, and exceptional service. Cyprus at its most refined.",
    bookingCom: "https://www.booking.com/hotel/cy/anassa.html",
    website: "https://www.thanoshotels.com/anassa",
  },
  {
    name: "Four Seasons Hotel Limassol",
    city: "Limassol",
    category: "luxury",
    neighbourhood: "Agios Tychonas, east Limassol",
    stars: 5,
    why: "Flagship luxury property on the Limassol seafront. Private beach, five restaurants, and the quality standards expected of the brand. Popular with business travellers relocating via Limassol.",
    bookingCom: "https://www.booking.com/hotel/cy/four-seasons.html",
    website: "https://www.fourseasons-cyprus.com",
  },
  {
    name: "Parklane, a Luxury Collection Resort & Spa",
    city: "Limassol",
    category: "luxury",
    neighbourhood: "Agios Tychonas, east Limassol",
    stars: 5,
    why: "Marriott's Luxury Collection property, next door to Four Seasons. Larger resort footprint, three beach sections, and one of the best spa facilities in Cyprus. Strong choice for a longer luxury stay.",
    bookingCom: "https://www.booking.com/hotel/cy/parklane.html",
    website: "https://www.parklanecyprus.com",
  },
  {
    name: "Hilton Nicosia",
    city: "Nicosia",
    category: "luxury",
    neighbourhood: "Engomi, west Nicosia",
    stars: 5,
    why: "The benchmark business and luxury hotel in the capital. Large pool, well-equipped gym, multiple restaurants. A reliable base for those with frequent Nicosia meetings during the relocation process.",
    bookingCom: "https://www.booking.com/hotel/cy/hilton-cyprus.html",
    website: "https://www.hilton.com/en/hotels/lcanihi-hilton-nicosia",
  },
  {
    name: "Amathus Beach Hotel",
    city: "Limassol",
    category: "luxury",
    neighbourhood: "Agios Tychonas, east Limassol",
    stars: 5,
    why: "Established luxury resort on Limassol's hotel strip. Long stretch of private beach, thalasso spa, and a dedicated adults-only pool area within the larger resort. Good long-stay packages available.",
    bookingCom: "https://www.booking.com/hotel/cy/amathus-beach-hotel.html",
    website: "https://www.amathus-hotels.com",
  },

  // ── Budget & Aparthotels ─────────────────────────────────────────────────
  {
    name: "Metropark Hotel Apartments",
    city: "Limassol",
    category: "budget",
    neighbourhood: "Limassol city centre",
    stars: 3,
    why: "City-centre aparthotel popular with business travellers and relocators. Studio and one-bedroom apartments with full kitchen, weekly cleaning, and parking. Walking distance to central Limassol. Excellent long-stay value.",
    bookingCom: "https://www.booking.com/hotel/cy/metropark-hotel-apartments.html",
  },
  {
    name: "Eurovillage Aparthotel",
    city: "Paphos",
    category: "budget",
    neighbourhood: "Kato Paphos",
    stars: 3,
    why: "Well-priced aparthotel in Kato Paphos with self-catering studios and apartments. Pool, good WiFi, 10-minute walk to the seafront. Popular with relocators arriving in Paphos for an extended house-hunt.",
    bookingCom: "https://www.booking.com/hotel/cy/eurovillage.html",
  },
  {
    name: "Palm Beach Hotel & Bungalows",
    city: "Larnaca",
    category: "budget",
    neighbourhood: "Voroklini, north Larnaca",
    stars: 4,
    why: "Good-value beachfront option north of Larnaca. Bungalow accommodation suits longer stays. Short drive to Larnaca Airport — convenient for arrivals who need a base while flat-hunting. Often heavily discounted in low season.",
    bookingCom: "https://www.booking.com/hotel/cy/palm-beach.html",
    website: "https://www.palmbeachhotel.com.cy",
  },
  {
    name: "Centrum Hotel",
    city: "Nicosia",
    category: "budget",
    neighbourhood: "Nicosia old city",
    stars: 3,
    why: "No-frills, centrally located hotel in Nicosia's old city. Clean rooms, breakfast included, walking distance to all government offices — useful for visa and registration appointments. Best budget choice in the capital.",
    bookingCom: "https://www.booking.com/hotel/cy/centrum.html",
  },

  // ── Beach Resorts ─────────────────────────────────────────────────────────
  {
    name: "Aphrodite Hills Resort",
    city: "Paphos",
    category: "beach",
    neighbourhood: "Kouklia, inland Paphos",
    stars: 5,
    why: "Clifftop resort overlooking Aphrodite's Rock. Not directly on the beach (a shuttle runs down), but the most comprehensive resort on the island: championship golf, tennis academy, spa, and multiple restaurants.",
    bookingCom: "https://www.booking.com/hotel/cy/aphrodite-hills-resort.html",
    website: "https://www.aphroditehills.com",
  },
  {
    name: "St Raphael Resort & Marina",
    city: "Limassol",
    category: "beach",
    neighbourhood: "Mouttagiaka, east Limassol",
    stars: 5,
    why: "Limassol's most complete beach resort — long private sandy beach, full marina, three pools, tennis, and watersports. Great for families or couples who want everything on-site.",
    bookingCom: "https://www.booking.com/hotel/cy/st-raphael-resort-marina.html",
    website: "https://www.straphael.com",
  },
  {
    name: "Adams Beach Hotel",
    city: "Ayia Napa",
    category: "beach",
    neighbourhood: "Ayia Napa town",
    stars: 5,
    why: "Ayia Napa's premier beach resort. Direct beach access on one of Cyprus's most famous coastlines. Multiple pools, spa, and watersports. Best value when booked in the shoulder season (May or September).",
    bookingCom: "https://www.booking.com/hotel/cy/adams-beach.html",
    website: "https://www.adamsbeachhotel.com",
  },
  {
    name: "Atlantica Miramare Beach",
    city: "Limassol",
    category: "beach",
    neighbourhood: "Germasogeia tourist strip",
    stars: 4,
    why: "Mid-range beach resort on Limassol's tourist strip. Good-sized private beach, multiple pools, family rooms available. Consistent quality and a well-known brand across Cyprus. Reliable choice without the 5-star price tag.",
    bookingCom: "https://www.booking.com/hotel/cy/atlantica-miramare-beach.html",
    website: "https://www.atlanticahotels.com/hotels/cyprus/miramare-beach",
  },
  {
    name: "Nissi Beach Resort",
    city: "Ayia Napa",
    category: "beach",
    neighbourhood: "Nissi Bay",
    stars: 4,
    why: "Directly on Nissi Bay — Cyprus's most photographed beach (white sand, turquoise water, rock arch). The resort itself is lively in summer; out of season it's quieter and excellent value. Book well ahead for peak dates.",
    bookingCom: "https://www.booking.com/hotel/cy/nissi-beach-resort.html",
    website: "https://www.nissi-beach.com",
  },
];
