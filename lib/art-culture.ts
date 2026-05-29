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
    heading: "Cyprus Museum in Nicosia is the most important historical collection",
    body: "The Cyprus Museum on Museum Street in Nicosia is the island's national archaeological museum and the single most important collection for understanding Cypriot history. Artefacts span from the Neolithic period through the Roman era. If you visit one museum in Cyprus, make it this one.",
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
  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Cyprus Museum",
    city: "Nicosia",
    neighbourhood: "Museum Street, Nicosia centre",
    type: "museum",
    englishSupport: true,
    admissionEuros: 4.5,
    highlights: "Neolithic figurines, Bronze Age artefacts, Enkomi collection, terracotta warriors from Agia Irini",
    why: "The national archaeological museum of Cyprus — the single most important collection on the island. Founded in 1882, it holds the finest artefacts from excavations across Cyprus spanning 8,000 years. Essential for understanding the island's layered history.",
    website: "https://www.cyclotourism.org/index.php/en/sightseeing/museum/129-cy-museum",
  },
  {
    name: "Leventis Municipal Museum of Nicosia",
    city: "Nicosia",
    neighbourhood: "Hippocratos Street, Laiki Geitonia",
    type: "museum",
    englishSupport: true,
    admissionEuros: 0,
    highlights: "5,000 years of Nicosia history, maps, coins, textiles, photography archives",
    why: "Free admission and one of Cyprus's most visitor-friendly museums. Charts the full history of Nicosia from antiquity to the present. Beautifully presented in a restored building in the old town. Winner of the Council of Europe Museum Prize.",
    website: "https://www.leventisnicosia.org.cy",
  },
  {
    name: "State Gallery of Contemporary Art",
    city: "Nicosia",
    neighbourhood: "Stasinos Avenue",
    type: "gallery",
    englishSupport: true,
    admissionEuros: 0,
    highlights: "Permanent collection of Cypriot artists from 1940s to present, rotating international exhibitions",
    why: "The official state gallery for modern Cypriot art. Free entry, rotating exhibitions of both historical and contemporary Cypriot work, and an important permanent collection tracing the development of art on the island through the 20th century.",
    website: "https://www.mcw.gov.cy/mcw/DA/DA.nsf/DMLen_mofa/DMLen_mofa?OpenDocument",
  },
  {
    name: "Byzantine Museum and Art Galleries",
    city: "Nicosia",
    neighbourhood: "Archbishop Makarios III Cultural Foundation",
    type: "museum",
    englishSupport: true,
    admissionEuros: 5,
    highlights: "Over 200 Byzantine icons, frescoes removed from Kyrenia churches, illuminated manuscripts",
    why: "Houses the most important collection of Byzantine art in Cyprus. The rescued icons from churches in the occupied north are particularly significant. Housed in the Archbishop Makarios III Cultural Foundation complex near the Archbishop's Palace.",
    website: "https://www.makariosfoundation.org.cy",
  },
  {
    name: "Hamam Omerye (Cultural Centre)",
    city: "Nicosia",
    neighbourhood: "Tyllirias Square, old town",
    type: "cultural-centre",
    englishSupport: true,
    admissionEuros: 12,
    highlights: "14th-century Lusignan monastery converted to Ottoman hammam, functioning bath and exhibition space",
    why: "A beautifully restored 14th-century building that functions as both a traditional hammam and a cultural exchange space. Run jointly by the UN and both communities in Cyprus. The space hosts cultural events, photography exhibitions, and is an architectural highlight of the walled city.",
    website: "https://www.hamamomerye.com",
  },
  {
    name: "Nicosia Municipal Theatre",
    city: "Nicosia",
    neighbourhood: "Mouseiou Street, Nicosia centre",
    type: "theatre",
    englishSupport: false,
    highlights: "Main stage productions, visiting international companies, Nicosia Festival",
    why: "The principal theatre in the Cypriot capital with a full programme of drama, opera, and dance. Most productions are in Greek, though international visiting companies perform in English. The building itself is a fine example of 1960s Cypriot architecture.",
    website: "https://www.thoc.org.cy",
  },
  {
    name: "Cine Studio (Nicosia)",
    city: "Nicosia",
    neighbourhood: "Nicosia old town",
    type: "cinema",
    englishSupport: true,
    admissionEuros: 8,
    highlights: "Art-house and international cinema, film festival screenings",
    why: "Nicosia's art-house cinema, showing independent and international films in original language with Greek subtitles. The programme includes retrospectives and director seasons. One of the few venues in Cyprus for non-Hollywood releases.",
  },
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
    website: "https://www.limart.org.cy",
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
    neighbourhood: "My Mall, Polemidia",
    type: "cinema",
    englishSupport: true,
    admissionEuros: 9,
    highlights: "8-screen multiplex, all Hollywood releases in original English, IMAX-equivalent screen",
    why: "The main multiplex cinema in Limassol. All Hollywood films screen in original English (Greek subtitles only — not dubbed). Good seating, reliable air conditioning, and a full snack bar. Located in My Mall for easy parking.",
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
    name: "Pierides Museum",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "museum",
    englishSupport: true,
    admissionEuros: 3,
    highlights: "Private collection of Cypriot antiquities spanning 6,000 years, Chalcolithic to Byzantine",
    why: "The Pierides family's private collection is one of the finest in Cyprus — assembled over 170 years and spanning the full arc of Cypriot civilisation. Smaller and more intimate than the Cyprus Museum, with excellent English curation.",
    website: "https://www.pierides-museum.com",
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
    highlights: "Chalcolithic, Bronze Age, Geometric, and Archaic period Cypriot artefacts",
    why: "The original Pierides collection — the Larnaca branch of this legendary private museum. Housed in a 1920s building in the town centre, it covers the pre-historic and early historic periods with excellent English-language curation.",
    website: "https://www.pierides-museum.com",
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
