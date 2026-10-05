/**
 * Art Galleries, Museums & Cultural Venues section content.
 *
 * Research sources: Cyprus Tourism Organisation, Nicosia Municipality,
 * Limassol Municipal Arts Centre, Cyprus Museum official site, local press.
 * Admission prices and hours change — verify before visiting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type VenueType =
  | "gallery"
  | "museum"
  | "cultural-centre"
  | "theatre"
  | "cinema";

export type CulturalVenue = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: VenueType;
  englishSupport: boolean;
  admissionEuros?: number;
  highlights: string;
  why: string;
  website?: string;
};

export type CultureTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Type metadata for labels and filters
// ---------------------------------------------------------------------------

export const ALL_VENUE_TYPES: ReadonlyArray<VenueType> = [
  "gallery",
  "museum",
  "cultural-centre",
  "theatre",
  "cinema",
];

export const VENUE_TYPE_LABEL: Record<VenueType, string> = {
  gallery: "Art Gallery",
  museum: "Museum",
  "cultural-centre": "Cultural Centre",
  theatre: "Theatre",
  cinema: "Cinema",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export const CULTURE_TIPS: ReadonlyArray<CultureTip> = [
  {
    heading: "Most museums are closed on Mondays",
    body: "Virtually all state and municipal museums in Cyprus follow the standard Mediterranean schedule — closed Mondays, open Tuesday through Sunday. A few also close for a midday break (13:00–15:00). Always check the venue's website before travelling, especially in low season.",
  },
  {
    heading: "Limassol has the most active contemporary art scene",
    body: "Limassol has emerged as Cyprus's contemporary art hub, with a cluster of independent galleries around the Old Town and the redeveloped port area. The city hosts regular openings, art fairs, and the Limassol Municipal Arts Centre (LIMART) anchors a year-round cultural programme.",
  },
];

// ---------------------------------------------------------------------------
// Venues
// ---------------------------------------------------------------------------

export const CULTURAL_VENUES: ReadonlyArray<CulturalVenue> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Limassol Municipal Arts Centre (LIMART)",
    city: "Limassol",
    neighbourhood: "Agiou Andreou Street, Old Town",
    type: "gallery",
    englishSupport: true,
    admissionEuros: 2,
    highlights: "Contemporary Cypriot and international art, annual open-call exhibition, residency programme",
    why: "The hub of Limassol's contemporary art scene. LIMART occupies a restored neoclassical building and runs a year-round programme of exhibitions, installations, and public events. The annual open-call exhibition is one of the most important shows in the Cypriot art calendar.",
  },
  {
    name: "Limassol Archaeological Museum",
    city: "Limassol",
    neighbourhood: "Vyronos Street",
    type: "museum",
    englishSupport: true,
    admissionEuros: 2.5,
    highlights: "Bronze Age pottery, Kourion finds, Amathus excavation artefacts, sculpture collection",
    why: "Covers the rich archaeological heritage of the Limassol district, from Neolithic to Byzantine periods. The Kourion and Amathus collections are the highlights — both ancient city-kingdoms within driving distance of Limassol. Well-labelled in English.",
    website: "https://www.mcw.gov.cy",
  },
  {
    name: "Limassol Medieval Castle Museum",
    city: "Limassol",
    neighbourhood: "Limassol Old Town, seafront",
    type: "museum",
    englishSupport: true,
    admissionEuros: 4.5,
    highlights: "Medieval history exhibition, Richard the Lionheart and Berengaria of Navarre connection, armour and coins",
    why: "The castle where Richard I of England married Berengaria in 1191 — one of the most historically resonant sites in Cyprus. The medieval museum inside covers the Frankish, Venetian and Ottoman periods. The rooftop offers the best views of Limassol Old Town.",
    website: "https://www.mcw.gov.cy",
  },
  {
    name: "Gallery Artgora",
    city: "Limassol",
    neighbourhood: "Old Town",
    type: "gallery",
    englishSupport: true,
    highlights: "Established and emerging Cypriot contemporary artists, sculpture, mixed media",
    why: "One of Limassol's longest-running independent galleries, focused on Cypriot contemporary artists. The space hosts regular openings and represents artists whose work engages with Mediterranean identity and landscape.",
  },
  {
    name: "Rialto Theatre",
    city: "Limassol",
    neighbourhood: "Agiou Andreou Street, Old Town",
    type: "theatre",
    englishSupport: true,
    admissionEuros: 15,
    highlights: "Main city theatre, international visiting companies, Limassol International Festival",
    why: "Limassol's principal performing arts venue. The programme includes theatre, dance, classical music, and international touring shows. Many productions are in English or have English surtitles. The annual Limassol International Festival in June–July brings major international acts.",
    website: "https://www.rialto.com.cy",
  },
  {
    name: "K-Cineplex Limassol",
    city: "Limassol",
    neighbourhood: "My Mall, 285 Franklin Roosevelt Avenue",
    type: "cinema",
    englishSupport: true,
    admissionEuros: 9,
    highlights: "Cinema in My Mall, Hollywood releases in original English",
    why: "Cinema in My Mall, west Limassol by the new port. Hollywood films screen in original English with Greek subtitles, not dubbed. Check current screens, showtimes and prices on the cinema's website. Located in My Mall for easy parking.",
    website: "https://www.kcineplex.com.cy",
  },
  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Paphos Archaeological Museum",
    city: "Paphos",
    neighbourhood: "Grivas Dighenis Avenue",
    type: "museum",
    englishSupport: true,
    admissionEuros: 2.5,
    highlights: "Hellenistic and Roman finds from Nea Paphos, terracotta figurines, glass, coins",
    why: "Essential context for visitors to the Paphos World Heritage Site. The collection covers the Hellenistic and Roman periods when Paphos was the capital of Roman Cyprus — the period represented by the famous Paphos mosaics.",
    website: "https://www.mcw.gov.cy",
  },
  {
    name: "Paphos Medieval Fort",
    city: "Paphos",
    neighbourhood: "Kato Paphos harbour",
    type: "museum",
    englishSupport: true,
    admissionEuros: 2.5,
    highlights: "Lusignan-era fort, harbour views, historical exhibition",
    why: "The Byzantine, Lusignan and Ottoman fort dominating Paphos harbour. Small exhibition inside traces the fort's history. The real draw is the location — directly on the harbour with views across the bay. The site of the annual Paphos Aphrodite Opera Festival in September.",
    website: "https://www.mcw.gov.cy",
  },
  {
    name: "Technopolis 20 Cultural Centre",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "cultural-centre",
    englishSupport: true,
    admissionEuros: 0,
    highlights: "Contemporary art exhibitions, Paphos 2017 European Capital of Culture legacy programming",
    why: "A post-industrial cultural space that emerged from Paphos's time as European Capital of Culture in 2017. The programme mixes contemporary art, experimental music, and community events. Free entry for most exhibitions.",
    website: "https://www.technopolis20.com",
  },
  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Pierides Museum (Larnaca)",
    city: "Larnaca",
    neighbourhood: "Zenon Kitieos Street, city centre",
    type: "museum",
    englishSupport: true,
    admissionEuros: 3,
    highlights: "Cypriot artefacts spanning the Neolithic to Byzantine-Medieval periods",
    why: "A private archaeological collection housed in a 19th-century colonial-style family mansion in the town centre and run by the Bank of Cyprus Cultural Foundation, covering roughly 9,000 years of Cypriot history.",
    website: "https://www.boccf.org/en-gb/homepage/museums-collections2/mouseio-pieride/",
  },
  {
    name: "Larnaca Archaeological Museum",
    city: "Larnaca",
    neighbourhood: "Kalogreon Square",
    type: "museum",
    englishSupport: true,
    admissionEuros: 2.5,
    highlights: "Phoenician and Archaic Kition finds, Bronze Age materials, classical pottery",
    why: "The state archaeological museum for the Larnaca district, covering Kition — the ancient Phoenician city on which modern Larnaca stands. The Kition excavation finds are the centrepiece.",
    website: "https://www.mcw.gov.cy",
  },
  {
    name: "Municipal Gallery of Larnaca",
    city: "Larnaca",
    neighbourhood: "Europe Square",
    type: "gallery",
    englishSupport: true,
    admissionEuros: 0,
    highlights: "Rotating exhibitions of Cypriot contemporary art, permanent collection of 20th-century works",
    why: "The main public gallery in Larnaca with a rotating programme of contemporary Cypriot exhibitions. Free entry. Smaller than LIMART in Limassol but a good first introduction to the local art scene.",
  },
];
