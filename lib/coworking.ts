/**
 * Coworking Spaces section content.
 *
 * Covers coworking, managed office and notable café-friendly venues across
 * Cyprus. Curation focuses on relevance to remote workers, freelancers and
 * founders relocating to the island.
 *
 * Sources: venue websites, Google Maps listings, Impact Hub Limassol,
 * WorkHub Paphos, and expat community reports. Prices, WiFi speeds and
 * availability change — always verify directly before committing.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type CoworkSpaceType = "coworking" | "managed-office" | "cafe-friendly";

export type NoiseLevel = "quiet" | "moderate" | "lively";

export type CoworkSpace = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: CoworkSpaceType;
  /** Day pass price in EUR, if available. */
  dayPassEuros?: number;
  /** Monthly hot-desk price in EUR. */
  monthlyHotDesk?: number;
  /** Monthly dedicated desk price in EUR. */
  monthlyDedicatedDesk?: number;
  /** Measured or advertised WiFi speed in Mbps. */
  wifiMbps?: number;
  noiseLevel: NoiseLevel;
  amenities: string[];
  why: string;
  /** ISO date string (YYYY-MM-DD) of last known data verification. */
  verifiedDate: string;
  website?: string;
};

export type CoworkTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Type metadata
// ---------------------------------------------------------------------------

export const ALL_COWORK_TYPES: ReadonlyArray<CoworkSpaceType> = [
  "coworking",
  "managed-office",
  "cafe-friendly",
];

export const COWORK_TYPE_LABEL: Record<CoworkSpaceType, string> = {
  coworking: "Coworking",
  "managed-office": "Managed Office",
  "cafe-friendly": "Café Workspace",
};

export const NOISE_LEVEL_LABEL: Record<NoiseLevel, string> = {
  quiet: "Quiet",
  moderate: "Moderate",
  lively: "Lively",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const COWORK_TIPS: ReadonlyArray<CoworkTip> = [
  {
    heading: "Buy a day pass before committing to a monthly plan",
    body: "Nearly every coworking space in Cyprus sells day passes. Spend two or three days at a space before paying a monthly fee — the community, noise level and actual WiFi speeds are impossible to judge from photos. Spaces that look premium online can be quiet to the point of isolation; others have an active community that makes the subscription worth it for the networking alone.",
  },
  {
    heading: "Verify WiFi with a speed test on your first visit",
    body: "Advertised WiFi speeds in Cyprus rarely match measured speeds during peak hours. Run a speed test (fast.com or speedtest.net) at the desk you plan to work from, at the time of day you normally work. Symmetric upload and download speeds matter for video calls — a 300 Mbps download with 20 Mbps upload will bottleneck you on heavy Zoom days. Several Limassol spaces have fibre to the building but shared bandwidth that degrades mid-morning.",
  },
  {
    heading: "Ask explicitly about phone call and video call booths",
    body: "Open-plan coworking is unsuitable for back-to-back video calls without sound-isolated booths or phone rooms. Before signing up, ask how many call booths exist, whether they can be reserved or are first-come-first-served, and what the policy is. Managed office suites and newer coworking spaces tend to have adequate booth provision; converted apartments and café-style spaces often have none.",
  },
  {
    heading: "Café vs dedicated desk — know what you actually need",
    body: "If your work requires deep focus, a café-friendly venue (even a good one) will cost you productivity through ambient noise, unreliable seating, and the social pressure of long stays. A dedicated desk at a proper coworking space, even if more expensive, pays for itself in output. Conversely, if you only need to be out of your apartment two or three days a week, a day pass rotation across two or three good café workspaces is often cheaper and more energising than a fixed desk subscription.",
  },
];

// ---------------------------------------------------------------------------
// Spaces
// ---------------------------------------------------------------------------

export const COWORK_SPACES: ReadonlyArray<CoworkSpace> = [
  // ── Limassol ─────────────────────────────────────────────────────────────
  {
    name: "Inspire CoWork",
    city: "Limassol",
    neighbourhood: "Limassol city centre",
    type: "coworking",
    dayPassEuros: 25,
    monthlyHotDesk: 150,
    monthlyDedicatedDesk: 250,
    wifiMbps: 500,
    noiseLevel: "moderate",
    amenities: [
      "Phone booths",
      "Meeting rooms",
      "Event space",
      "Kitchen",
      "Printing",
      "24/7 access",
    ],
    why: "The most community-active coworking space in Cyprus. Regular demo nights, investor meetups and startup events. Fast fibre, solid phone booths, and a well-maintained kitchen. The default starting point for any tech founder arriving in Limassol.",
    verifiedDate: "2026-01-15",
    website: "https://www.inspirecowork.com",
  },
  {
    name: "Impact Hub Limassol",
    city: "Limassol",
    neighbourhood: "Limassol Marina area",
    type: "coworking",
    dayPassEuros: 30,
    monthlyHotDesk: 180,
    monthlyDedicatedDesk: 280,
    wifiMbps: 300,
    noiseLevel: "moderate",
    amenities: [
      "Phone booths",
      "Meeting rooms",
      "Events programme",
      "Mentorship network",
      "Kitchen",
      "Bike storage",
    ],
    why: "Global Impact Hub brand with a Limassol chapter. Good for founders who want access to the international Impact Hub network alongside their local desk. The events and mentorship programme are the main differentiators over a standard cowork.",
    verifiedDate: "2026-01-20",
    website: "https://hub.cy",
  },
  {
    name: "Elevate Business Centre",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    type: "managed-office",
    dayPassEuros: 35,
    monthlyHotDesk: 160,
    monthlyDedicatedDesk: 300,
    wifiMbps: 400,
    noiseLevel: "quiet",
    amenities: [
      "Private offices",
      "Boardroom (bookable)",
      "Receptionist",
      "Mail handling",
      "Printing",
      "Business address service",
    ],
    why: "Professional managed office environment catering to consultants, legal professionals and mid-stage startups. The quietest and most corporate-feeling option in Limassol — suitable for client-facing roles where ambient noise matters.",
    verifiedDate: "2026-01-10",
    website: "https://www.elevate.com.cy",
  },
  {
    name: "The Nest Limassol",
    city: "Limassol",
    neighbourhood: "Limassol city centre",
    type: "coworking",
    dayPassEuros: 20,
    monthlyHotDesk: 130,
    monthlyDedicatedDesk: 220,
    wifiMbps: 200,
    noiseLevel: "moderate",
    amenities: [
      "Meeting rooms",
      "Kitchen",
      "Outdoor terrace",
      "Printing",
      "Locker storage",
    ],
    why: "Well-priced option in central Limassol with a relaxed atmosphere. The outdoor terrace is a strong asset in the mild weather months. WiFi is adequate for most solo work; heavy video-call users should verify peak-hour speeds.",
    verifiedDate: "2026-01-15",
  },
  {
    name: "Starbucks Limassol (Anexartisias)",
    city: "Limassol",
    neighbourhood: "Old Town",
    type: "cafe-friendly",
    wifiMbps: 80,
    noiseLevel: "lively",
    amenities: ["Power outlets", "WiFi", "All-day menu"],
    why: "The most reliable laptop-friendly café in central Limassol. Consistent WiFi, ample power points, and tolerant of long stays on weekday mornings. Gets crowded and loud by midday; best for short focused sessions before 11am.",
    verifiedDate: "2026-01-20",
  },
  {
    name: "Guaba Beach Bar (co-work hours)",
    city: "Limassol",
    neighbourhood: "Molos seafront",
    type: "cafe-friendly",
    wifiMbps: 50,
    noiseLevel: "moderate",
    amenities: ["Sea view", "Power outlets", "WiFi", "Full menu"],
    why: "Open-air workspace option on the Limassol seafront. Genuinely productive on weekday mornings (quiet before the lunch crowd). WiFi is serviceable; the sea view and fresh air are the main productivity argument.",
    verifiedDate: "2026-01-15",
  },

  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "WeSpace Nicosia",
    city: "Nicosia",
    neighbourhood: "Nicosia business district",
    type: "coworking",
    dayPassEuros: 18,
    monthlyHotDesk: 110,
    monthlyDedicatedDesk: 190,
    wifiMbps: 300,
    noiseLevel: "moderate",
    amenities: [
      "Phone booths",
      "Meeting rooms",
      "Kitchen",
      "Printing",
      "24/7 access",
    ],
    why: "Best value coworking in Nicosia. Well-maintained space with a mixed community of local professionals and international founders. Consistently fast WiFi and good phone booth availability. The 24/7 access card is worth it for late-evening sprints.",
    verifiedDate: "2026-01-18",
  },
  {
    name: "The Nest Nicosia",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "coworking",
    dayPassEuros: 20,
    monthlyHotDesk: 120,
    monthlyDedicatedDesk: 200,
    wifiMbps: 250,
    noiseLevel: "quiet",
    amenities: [
      "Meeting rooms",
      "Kitchen",
      "Printing",
      "Locker storage",
      "Bike parking",
    ],
    why: "Quiet, residential-feel coworking in Engomi — the professional suburb of Nicosia. Suits heads-down solo work better than networking. Strong overlap with the digital agency and freelance community in the capital.",
    verifiedDate: "2026-01-12",
  },
  {
    name: "Coffeeholic Nicosia",
    city: "Nicosia",
    neighbourhood: "Stasikratous Street",
    type: "cafe-friendly",
    wifiMbps: 60,
    noiseLevel: "moderate",
    amenities: ["Power outlets", "WiFi", "Specialty coffee", "Light food"],
    why: "One of Nicosia's best specialty coffee shops and a reliable laptop-work venue. Stasikratous Street is the centre of Nicosia's young professional scene. Best for half-day sessions; genuinely good coffee.",
    verifiedDate: "2026-01-20",
  },

  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "WorkHub Paphos",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "coworking",
    dayPassEuros: 20,
    monthlyHotDesk: 130,
    monthlyDedicatedDesk: 210,
    wifiMbps: 300,
    noiseLevel: "quiet",
    amenities: [
      "Phone booths",
      "Meeting rooms",
      "Kitchen",
      "Printing",
      "Outdoor area",
    ],
    why: "The most complete coworking offering in Paphos. Good phone booths, reliable fibre, and a calm working environment suited to deep work. The outdoor area is excellent in the mild Paphos climate eight months of the year.",
    verifiedDate: "2026-01-18",
    website: "https://www.workhubpaphos.com",
  },
  {
    name: "Work in Paphos",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "coworking",
    dayPassEuros: 18,
    monthlyHotDesk: 120,
    monthlyDedicatedDesk: 195,
    wifiMbps: 200,
    noiseLevel: "quiet",
    amenities: ["Meeting room", "Kitchen", "Printing", "Sea-facing terrace"],
    why: "Popular with the digital nomad community that has settled in Paphos. Relaxed atmosphere, sea-facing terrace for breaks, and a community of international remote workers. Good option for a week-long trial before committing to Paphos long-term.",
    verifiedDate: "2026-01-15",
    website: "https://www.workinpaphos.com",
  },
  {
    name: "Café Oasis Paphos",
    city: "Paphos",
    neighbourhood: "Paphos harbour",
    type: "cafe-friendly",
    wifiMbps: 40,
    noiseLevel: "lively",
    amenities: ["WiFi", "Power outlets", "Harbour view", "All-day menu"],
    why: "Harbour-view café that's become a de-facto laptop venue for remote workers in Paphos. WiFi is modest; best suited for light work or calls during the morning session before the tourist lunch crowd arrives.",
    verifiedDate: "2026-01-20",
  },

  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Larnaca Tech Hub",
    city: "Larnaca",
    neighbourhood: "Larnaca city centre",
    type: "coworking",
    dayPassEuros: 15,
    monthlyHotDesk: 100,
    monthlyDedicatedDesk: 170,
    wifiMbps: 200,
    noiseLevel: "quiet",
    amenities: [
      "Meeting rooms",
      "Kitchen",
      "Printing",
      "24/7 access",
      "Phone booth",
    ],
    why: "The most affordable coworking option among Cyprus's main cities. Quiet and functional; well-suited to logistics, shipping, and aviation-adjacent companies based near the airport. Growing community of international founders.",
    verifiedDate: "2026-01-10",
  },
  {
    name: "StartHub Larnaca",
    city: "Larnaca",
    neighbourhood: "Finikoudes area",
    type: "coworking",
    dayPassEuros: 15,
    monthlyHotDesk: 95,
    monthlyDedicatedDesk: 160,
    wifiMbps: 150,
    noiseLevel: "moderate",
    amenities: [
      "Meeting rooms",
      "Kitchen",
      "Outdoor seating",
      "Events space",
      "Printing",
    ],
    why: "Affordable and centrally located near Larnaca's seafront promenade. Attracts freelancers and digital agencies alongside startup founders. Monthly events keep the community active. Best for those who want Larnaca living without Limassol prices.",
    verifiedDate: "2026-01-12",
  },

  // ── Ayia Napa ─────────────────────────────────────────────────────────────
  {
    name: "Napa Digital Hub",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town",
    type: "coworking",
    dayPassEuros: 15,
    monthlyHotDesk: 90,
    monthlyDedicatedDesk: 150,
    wifiMbps: 150,
    noiseLevel: "quiet",
    amenities: [
      "Meeting room",
      "Kitchen",
      "Air conditioning",
      "Printing",
      "Outdoor deck",
    ],
    why: "The only proper coworking space in Ayia Napa. Very quiet outside July–August. Good for digital nomads who want a summer base on Cyprus's best beaches while maintaining a productive work setup. Rates are the lowest on the island.",
    verifiedDate: "2026-01-08",
  },
];
