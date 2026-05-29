/**
 * Fitness & Wellness section content.
 *
 * Data covers gyms, CrossFit boxes, yoga/pilates studios, padel clubs,
 * swimming pools, martial arts, and wellness spas across Cyprus.
 * Prices are approximate 2025/26 monthly rates in EUR.
 * Always verify opening hours and current pricing before visiting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type FitnessType =
  | "gym"
  | "crossfit"
  | "yoga"
  | "pilates"
  | "swimming"
  | "padel"
  | "martial-arts"
  | "wellness-spa";

export type FitnessVenue = {
  name: string;
  city: City;
  neighbourhood?: string;
  type: FitnessType;
  monthlyFrom?: number;
  dropInFrom?: number;
  englishSpoken: boolean;
  why: string;
  website?: string;
};

export type FitnessTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// Type metadata
// ---------------------------------------------------------------------------

export const ALL_FITNESS_TYPES: ReadonlyArray<FitnessType> = [
  "gym",
  "crossfit",
  "yoga",
  "pilates",
  "swimming",
  "padel",
  "martial-arts",
  "wellness-spa",
];

export const FITNESS_TYPE_LABEL: Record<FitnessType, string> = {
  gym: "Gym / Weight Training",
  crossfit: "CrossFit",
  yoga: "Yoga",
  pilates: "Pilates",
  swimming: "Swimming",
  padel: "Padel",
  "martial-arts": "Martial Arts",
  "wellness-spa": "Wellness & Spa",
};

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

export const FITNESS_TIPS: ReadonlyArray<FitnessTip> = [
  {
    heading: "Beat the heat — train early",
    body: "From June to September, outdoor workouts are only comfortable between 5 and 9 am. Temperatures routinely exceed 35°C by mid-morning, making outdoor running or cycling genuinely dangerous midday. Plan your schedule accordingly, or stick to air-conditioned facilities.",
  },
  {
    heading: "Most gyms are well air-conditioned",
    body: "Quality is higher than you might expect. The main gym chains and independent studios are properly air-conditioned and well-equipped. Expect monthly fees of €30–€70 for a standard gym, with premium branded gyms or CrossFit boxes charging €80–€130.",
  },
  {
    heading: "Padel is exploding in Cyprus",
    body: "Padel has grown faster in Cyprus than almost any other sport. New courts open regularly across all major cities — Limassol alone has several dedicated clubs. It's social, highly accessible for beginners, and court time is typically €10–€15 per person per hour.",
  },
  {
    heading: "Sea swimming is year-round",
    body: "The Mediterranean stays above 20°C from May through November, and open-water swimmers go year-round. There are no paid entry beaches in Cyprus — all beaches are public and free. Early morning swims along Limassol's seafront or Paphos's harbour are a daily ritual for many expats.",
  },
];

// ---------------------------------------------------------------------------
// Venues
// ---------------------------------------------------------------------------

export const FITNESS_VENUES: ReadonlyArray<FitnessVenue> = [
  // ── Limassol — Gyms ───────────────────────────────────────────────────────
  {
    name: "Fitness First Limassol",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    type: "gym",
    monthlyFrom: 65,
    dropInFrom: 10,
    englishSpoken: true,
    why: "Large commercial gym on the tourist strip with full weight floor, cardio machines, group classes, and a sauna. One of the most expat-friendly gyms in Cyprus — English is the default language at the desk.",
    website: "https://www.fitnessfirst.com.cy",
  },
  {
    name: "World Gym Limassol",
    city: "Limassol",
    neighbourhood: "Agios Athanasios",
    type: "gym",
    monthlyFrom: 55,
    dropInFrom: 8,
    englishSpoken: true,
    why: "Franchise gym with solid free-weight section, machines, and functional training area. Popular with the expat tech and finance crowd. Multiple membership tiers available including off-peak options.",
    website: "https://www.worldgym.com.cy",
  },
  {
    name: "O2 Fitness Center",
    city: "Limassol",
    neighbourhood: "Neapolis",
    type: "gym",
    monthlyFrom: 45,
    dropInFrom: 7,
    englishSpoken: true,
    why: "Well-regarded independent gym near the university campus. Genuine free-weight area, group classes included in membership, and no long-term contract required. Good value for those in central Limassol.",
  },
  // ── Limassol — CrossFit ───────────────────────────────────────────────────
  {
    name: "CrossFit Limassol",
    city: "Limassol",
    neighbourhood: "Industrial zone",
    type: "crossfit",
    monthlyFrom: 110,
    dropInFrom: 20,
    englishSpoken: true,
    why: "One of Cyprus's original CrossFit affiliates. Large box with full rig, assault bikes, rowers, and outdoor space. Coaching in English as standard. Strong community of expats and locals.",
    website: "https://www.crossfitlimassol.com",
  },
  {
    name: "CrossFit Valor Limassol",
    city: "Limassol",
    neighbourhood: "Germasogeia",
    type: "crossfit",
    monthlyFrom: 100,
    dropInFrom: 18,
    englishSpoken: true,
    why: "Newer box on the tourist strip — well-equipped and programming focused on athletes of all levels. Drop-in friendly, which makes it convenient for those still settling on a home area before committing to a membership.",
  },
  // ── Limassol — Yoga / Pilates ─────────────────────────────────────────────
  {
    name: "Yoga at the Marina",
    city: "Limassol",
    neighbourhood: "Old Port / Marina",
    type: "yoga",
    monthlyFrom: 80,
    dropInFrom: 15,
    englishSpoken: true,
    why: "Boutique studio inside the Limassol Marina precinct. Classes are mostly in English given the international clientele. Hatha, vinyasa, and yin offerings. Beautiful setting — some classes have sea views.",
  },
  {
    name: "Move Studio Limassol",
    city: "Limassol",
    neighbourhood: "Neapolis",
    type: "pilates",
    monthlyFrom: 90,
    dropInFrom: 18,
    englishSpoken: true,
    why: "Reformer and mat pilates studio popular with Limassol's expat community. Small class sizes, English-speaking instructors, and a clean modern space. Booking required — classes fill quickly.",
  },
  // ── Limassol — Padel ──────────────────────────────────────────────────────
  {
    name: "Padel Club Limassol",
    city: "Limassol",
    neighbourhood: "Agios Ioannis",
    type: "padel",
    dropInFrom: 12,
    englishSpoken: true,
    why: "One of Limassol's largest dedicated padel facilities with multiple courts, a small gym, and coaching sessions. Open evenings until late. Court booking via app. Active expat league running most months.",
  },
  {
    name: "PadelX Limassol",
    city: "Limassol",
    neighbourhood: "Pareklishia",
    type: "padel",
    dropInFrom: 10,
    englishSpoken: true,
    why: "Newer padel venue south of Limassol with four covered courts, lighting for evening play, and beginner clinics on weekends. Good for families and first-timers.",
  },
  // ── Limassol — Wellness ───────────────────────────────────────────────────
  {
    name: "St Raphael Spa",
    city: "Limassol",
    neighbourhood: "Mouttagiaka",
    type: "wellness-spa",
    dropInFrom: 70,
    englishSpoken: true,
    why: "Full-service spa at the St Raphael Resort. Treatments include deep tissue, sports massage, facials, and a hydrotherapy suite. Day passes available for non-hotel guests. One of the better hotel spas on the island.",
    website: "https://www.straphael.com/spa",
  },

  // ── Nicosia — Gyms ────────────────────────────────────────────────────────
  {
    name: "Holmes Place Nicosia",
    city: "Nicosia",
    neighbourhood: "Engomi",
    type: "gym",
    monthlyFrom: 75,
    dropInFrom: 12,
    englishSpoken: true,
    why: "Premium gym chain with Nicosia's most complete facility — 25m pool, sauna, group fitness studio, climbing wall section, and full weights floor. Expensive relative to local independents but the most comprehensive setup in the capital.",
    website: "https://www.holmesplace.com.cy",
  },
  {
    name: "Training Lab Nicosia",
    city: "Nicosia",
    neighbourhood: "City centre",
    type: "gym",
    monthlyFrom: 50,
    dropInFrom: 8,
    englishSpoken: true,
    why: "Serious independent gym popular with the Nicosia office crowd. Good powerlifting setup, coaching optional, and flexible short-term memberships. Quieter than the hotel-adjacent gyms.",
  },
  // ── Nicosia — CrossFit ────────────────────────────────────────────────────
  {
    name: "CrossFit Nicosia",
    city: "Nicosia",
    neighbourhood: "Strovolos",
    type: "crossfit",
    monthlyFrom: 105,
    dropInFrom: 18,
    englishSpoken: true,
    why: "Long-established affiliate with a large member base. Classes run from early morning through evening. Bilingual coaching. Part of the Cyprus CrossFit competition circuit.",
    website: "https://www.crossfitnicosia.com",
  },
  // ── Nicosia — Yoga ────────────────────────────────────────────────────────
  {
    name: "The Yoga Room Nicosia",
    city: "Nicosia",
    neighbourhood: "Makedonitissa",
    type: "yoga",
    monthlyFrom: 70,
    dropInFrom: 12,
    englishSpoken: true,
    why: "Established studio in the north of the city. A wide class schedule (ashtanga, restorative, kids yoga) taught in English and Greek. Friendly to newcomers and expats without a car — accessible by bus from the city centre.",
  },
  // ── Nicosia — Swimming ────────────────────────────────────────────────────
  {
    name: "Eleftheria Municipal Pool",
    city: "Nicosia",
    neighbourhood: "City centre",
    type: "swimming",
    monthlyFrom: 30,
    dropInFrom: 4,
    englishSpoken: false,
    why: "The main public pool in Nicosia. Inexpensive, 50m lanes, and open most of the year. Busy at peak times but the best value swimming option in the capital. Some English spoken at reception.",
  },
  // ── Nicosia — Padel ───────────────────────────────────────────────────────
  {
    name: "Padel Nicosia Club",
    city: "Nicosia",
    neighbourhood: "Aglandjia",
    type: "padel",
    dropInFrom: 12,
    englishSpoken: true,
    why: "Purpose-built padel complex with eight courts, a coaching team, and a small social bar area. Active leagues and open play sessions. One of the most active padel communities on the island.",
  },

  // ── Paphos — Gyms ─────────────────────────────────────────────────────────
  {
    name: "Paphos Fitness Gymnasium",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "gym",
    monthlyFrom: 45,
    dropInFrom: 7,
    englishSpoken: true,
    why: "Long-running independent gym in the Kato Paphos tourist area. Well-maintained equipment, personal trainers available, and English is standard given the neighbourhood's international mix.",
  },
  {
    name: "Aphrodite Hills Fitness Centre",
    city: "Paphos",
    neighbourhood: "Kouklia",
    type: "gym",
    monthlyFrom: 70,
    dropInFrom: 15,
    englishSpoken: true,
    why: "Gym within the Aphrodite Hills resort complex. Premium equipment and a pool available for day passes. Open to non-residents. One of the better-equipped facilities in the Paphos region.",
    website: "https://www.aphroditehills.com/sport-and-fitness",
  },
  // ── Paphos — Yoga / Pilates ───────────────────────────────────────────────
  {
    name: "Paphos Yoga Centre",
    city: "Paphos",
    neighbourhood: "Kato Paphos",
    type: "yoga",
    monthlyFrom: 60,
    dropInFrom: 12,
    englishSpoken: true,
    why: "One of Paphos's most established yoga studios. Primarily English-language classes catering to the large British and European expat community. Hatha, vinyasa, and meditation. Outdoor class options in spring and autumn.",
  },
  // ── Paphos — Padel ────────────────────────────────────────────────────────
  {
    name: "Paphos Padel Club",
    city: "Paphos",
    neighbourhood: "Universal",
    type: "padel",
    dropInFrom: 10,
    englishSpoken: true,
    why: "Well-established padel venue popular with Paphos's expat community. Four covered courts, coaching clinics, and a social scene. Courts book quickly in the evening — reserve 24 hours in advance.",
  },
  // ── Paphos — Wellness ─────────────────────────────────────────────────────
  {
    name: "Anassa Thalasso Spa",
    city: "Paphos",
    neighbourhood: "Neo Chorio",
    type: "wellness-spa",
    dropInFrom: 120,
    englishSpoken: true,
    why: "Arguably the finest spa in Cyprus. The thalasso circuit at Anassa uses heated seawater pools, scrubs, and traditional treatments. Day spa access available for non-hotel guests by reservation. Worth the splurge.",
    website: "https://www.thanoshotels.com/anassa/spa",
  },

  // ── Larnaca — Gyms ────────────────────────────────────────────────────────
  {
    name: "Larnaca Fitness Club",
    city: "Larnaca",
    neighbourhood: "City centre",
    type: "gym",
    monthlyFrom: 40,
    dropInFrom: 6,
    englishSpoken: true,
    why: "Central Larnaca gym with solid equipment and a loyal membership. Good value by Cyprus standards. English widely spoken. Useful for those arriving via Larnaca Airport and house-hunting in the area.",
  },
  // ── Larnaca — CrossFit ────────────────────────────────────────────────────
  {
    name: "CrossFit Larnaca",
    city: "Larnaca",
    neighbourhood: "Drosia",
    type: "crossfit",
    monthlyFrom: 95,
    dropInFrom: 15,
    englishSpoken: true,
    why: "The main CrossFit affiliate serving Larnaca. Friendly box culture, English-language coaching, and regular community events. Smaller than the Limassol or Nicosia boxes but well-run.",
  },
  // ── Larnaca — Pilates ─────────────────────────────────────────────────────
  {
    name: "Core Pilates Larnaca",
    city: "Larnaca",
    neighbourhood: "Finikoudes area",
    type: "pilates",
    monthlyFrom: 75,
    dropInFrom: 14,
    englishSpoken: true,
    why: "Reformer and mat pilates studio near the Larnaca palm promenade. Popular with the area's established British expat community. Classes in English. Small group sizes mean good instructor attention.",
  },
  // ── Larnaca — Swimming ────────────────────────────────────────────────────
  {
    name: "Larnaca Municipal Swimming Pool",
    city: "Larnaca",
    neighbourhood: "Larnaca bay",
    type: "swimming",
    monthlyFrom: 25,
    dropInFrom: 3,
    englishSpoken: false,
    why: "Public 25m indoor pool open year-round. Low-cost lane swimming, good for maintaining a training routine. Limited English at reception — bring a Greek-speaking friend for the first signup visit.",
  },

  // ── Ayia Napa — Gym / Wellness ────────────────────────────────────────────
  {
    name: "Nissi Beach Fitness",
    city: "Ayia Napa",
    neighbourhood: "Nissi Bay",
    type: "gym",
    monthlyFrom: 50,
    dropInFrom: 10,
    englishSpoken: true,
    why: "Gym within the Nissi Beach resort area, open to non-guests. Outdoor and indoor equipment, sea views from the cardio deck, and a good atmosphere. Most useful for those staying in Ayia Napa during a scouting trip.",
  },
  {
    name: "Adams Beach Spa",
    city: "Ayia Napa",
    neighbourhood: "Ayia Napa town",
    type: "wellness-spa",
    dropInFrom: 60,
    englishSpoken: true,
    why: "Full spa at the Adams Beach Hotel. Day passes available. Good for a recovery day between viewings — sports massage and thalassotherapy treatments available. English spoken throughout.",
    website: "https://www.adamsbeachhotel.com/spa",
  },
];
