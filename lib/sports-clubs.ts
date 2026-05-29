/**
 * Sports & Recreation Clubs section content.
 *
 * Research sources: club websites, Cyprus Sports Organisation listings,
 * Cyprus Tennis Federation, Cyprus Sailing Federation, local expat forums.
 * Fees and schedules change — verify directly with clubs before acting.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type SportsClub = {
  name: string;
  city: City;
  sport: string;
  level: "beginner" | "recreational" | "competitive" | "all";
  englishWelcome: boolean;
  annualFeeApprox?: number;
  why: string;
  website?: string;
};

export type SportsTip = {
  heading: string;
  body: string;
};

// ---------------------------------------------------------------------------
// All sports represented in the data (for filter chips)
// ---------------------------------------------------------------------------

export const ALL_SPORTS: ReadonlyArray<string> = [
  "Tennis",
  "Padel",
  "Golf",
  "Sailing",
  "Running",
  "Football",
  "Rugby",
  "Swimming",
  "Cycling",
  "Triathlon",
  "Martial Arts",
  "Cricket",
  "Basketball",
  "Equestrian",
  "Yoga & Fitness",
];

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export const SPORTS_TIPS: ReadonlyArray<SportsTip> = [
  {
    heading: "Most clubs are welcoming to expats",
    body: "Cyprus has a large, well-established expat community and most sports clubs actively recruit international members. Showing up at a session and introducing yourself is the norm — cold emails are rarely necessary.",
  },
  {
    heading: "Tennis and padel infrastructure is excellent",
    body: "Cyprus has invested heavily in tennis and padel facilities. Most clubs have multiple lit courts, coaching programmes, and regular leagues. Padel in particular has boomed since 2021 — new courts are opening across all cities.",
  },
  {
    heading: "Sailing from Limassol and St. Raphael Marina",
    body: "Limassol Marina and St. Raphael Marina are the main sailing hubs on the island. Both have active yacht clubs running weekly races and cruising rallies. The sailing season runs year-round thanks to the climate, with racing leagues most active October–May.",
  },
  {
    heading: "Hash House Harriers run monthly",
    body: "The Cyprus Hash House Harriers (Cyprus H3) organise monthly hashing runs across the island — a social running and orienteering tradition popular with expats globally. A great way to explore the countryside and meet people quickly.",
  },
];

// ---------------------------------------------------------------------------
// Clubs
// ---------------------------------------------------------------------------

export const SPORTS_CLUBS: ReadonlyArray<SportsClub> = [
  // ── Tennis ────────────────────────────────────────────────────────────────
  {
    name: "Limassol Sporting Club (Tennis)",
    city: "Limassol",
    sport: "Tennis",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 600,
    why: "The largest and most established tennis facility in Limassol. Multiple clay and hard courts, resident pros, junior academy, and active adult leagues. Very expat-friendly with English-speaking coaches.",
    website: "https://www.limassolsportingclub.com",
  },
  {
    name: "Nicosia Tennis Club",
    city: "Nicosia",
    sport: "Tennis",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 550,
    why: "The oldest tennis club in Cyprus, founded in 1925. Well-maintained clay and hard courts in the centre of Nicosia. Hosts national tournaments and has strong social tennis on weekends.",
    website: "https://www.nicosiatennisclub.com",
  },
  {
    name: "Aphrodite Hills Tennis Academy",
    city: "Paphos",
    sport: "Tennis",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 700,
    why: "Part of the Aphrodite Hills Resort complex. Professional-grade facilities with resident coaches, a high-performance programme for juniors, and social tennis for adults. Beautiful setting above Kouklia.",
    website: "https://www.aphroditehills.com/sport/tennis",
  },
  {
    name: "Larnaca Tennis Club",
    city: "Larnaca",
    sport: "Tennis",
    level: "recreational",
    englishWelcome: true,
    annualFeeApprox: 480,
    why: "Central Larnaca club with clay courts, coaching, and a welcoming social atmosphere. Smaller than the Limassol or Nicosia clubs but easier to integrate into — strong expat membership.",
  },
  {
    name: "Paphos Tennis Club",
    city: "Paphos",
    sport: "Tennis",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 450,
    why: "Club-level tennis in Kato Paphos. Friendly mix of local and expat players, regular league play, and coaching for beginners. Good entry point for new arrivals in Paphos.",
  },
  // ── Padel ─────────────────────────────────────────────────────────────────
  {
    name: "Padel Cyprus (Limassol)",
    city: "Limassol",
    sport: "Padel",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 400,
    why: "One of the largest padel facilities in Cyprus with multiple covered courts in Limassol. Regular tournaments, coaching clinics, and a well-organised app-based booking system. Fast-growing membership.",
    website: "https://www.padelcyprus.com",
  },
  {
    name: "Pafiakos Padel Club",
    city: "Paphos",
    sport: "Padel",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 380,
    why: "Leading padel facility in the Paphos area. Modern courts, regular social sessions, and organised beginner programmes. The Paphos expat community has made this a natural social hub.",
  },
  {
    name: "SmashPadel Nicosia",
    city: "Nicosia",
    sport: "Padel",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 420,
    why: "Modern padel centre in Nicosia with coaching from certified instructors. Popular with the business community for after-work games. Court booking available via app.",
  },
  // ── Golf ──────────────────────────────────────────────────────────────────
  {
    name: "Secret Valley Golf Club",
    city: "Paphos",
    sport: "Golf",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 1800,
    why: "18-hole championship course designed by Tony Jacklin in a dramatic volcanic valley setting. One of Cyprus's top courses. Membership includes access to the driving range and regular competitions.",
    website: "https://www.secretvalleygolf.com",
  },
  {
    name: "Aphrodite Hills Golf Club",
    city: "Paphos",
    sport: "Golf",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 2500,
    why: "Clifftop 18-hole course with sea views, designed by Cabell B. Robinson. One of the best courses in the Eastern Mediterranean. The resort setting means full practice facilities and a pro shop.",
    website: "https://www.aphroditehills.com/golf",
  },
  {
    name: "Elea Golf Club",
    city: "Paphos",
    sport: "Golf",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 2200,
    why: "Jack Nicklaus Signature course at Elea Estate. Challenging 18-hole layout in a residential golf community. Cyprus's newest championship course with excellent teaching academy.",
    website: "https://www.eleagolfclub.com",
  },
  {
    name: "Minthis Hills Golf Club",
    city: "Paphos",
    sport: "Golf",
    level: "recreational",
    englishWelcome: true,
    annualFeeApprox: 1600,
    why: "9-hole course in the Troodos foothills above Paphos. Lower membership cost than the resort courses, relaxed atmosphere, and a social club with regular competitions for expat golfers.",
    website: "https://www.minthis.com",
  },
  // ── Sailing ───────────────────────────────────────────────────────────────
  {
    name: "Limassol Nautical Club",
    city: "Limassol",
    sport: "Sailing",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 800,
    why: "The primary sailing and motorboat club in Limassol, based at the old port. Active racing calendar, dinghies and keelboats, and a strong social programme. English is widely spoken.",
    website: "https://www.lnc.com.cy",
  },
  {
    name: "St. Raphael Marina Sailing",
    city: "Limassol",
    sport: "Sailing",
    level: "recreational",
    englishWelcome: true,
    annualFeeApprox: 600,
    why: "Sailing and cruising activities based out of St. Raphael Marina in east Limassol. Strong cruising fleet, regular social sails, and RYA-certified courses for newcomers to sailing.",
    website: "https://www.straphael.com",
  },
  {
    name: "Paphos Aphrodite Sailing Club",
    city: "Paphos",
    sport: "Sailing",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 650,
    why: "Active sailing club based at Paphos harbour. Friendly membership, weekly racing, and cruising rallies to nearby Greek islands in summer. Ideal for sailors relocating to the Paphos area.",
  },
  // ── Running ───────────────────────────────────────────────────────────────
  {
    name: "Limassol Running Club",
    city: "Limassol",
    sport: "Running",
    level: "all",
    englishWelcome: true,
    why: "The main English-speaking running community in Limassol. Regular group runs along the seafront and in the Troodos foothills, WhatsApp coordination, and organised participation in Cyprus races. Free to join.",
    website: "https://www.limassolrunningclub.com",
  },
  {
    name: "Cyprus Hash House Harriers",
    city: "Limassol",
    sport: "Running",
    level: "recreational",
    englishWelcome: true,
    why: "Monthly social hashing runs (running and orienteering combined with beer and socialising) across the island. One of the oldest expat social clubs in Cyprus. Runs in different locations each month — check the Facebook group.",
  },
  {
    name: "Nicosia Running Club",
    city: "Nicosia",
    sport: "Running",
    level: "all",
    englishWelcome: true,
    why: "Active running community in Nicosia with regular morning and evening group runs. Regular participation in the Cyprus Marathon and other island races. Free to join via Facebook group.",
  },
  // ── Rugby ─────────────────────────────────────────────────────────────────
  {
    name: "Limassol RFC",
    city: "Limassol",
    sport: "Rugby",
    level: "competitive",
    englishWelcome: true,
    annualFeeApprox: 350,
    why: "The main rugby union club in Limassol and one of the strongest in Cyprus. Competes in the national league. Predominantly expat membership — English is the working language of training. Touch rugby sessions for those returning to the sport.",
    website: "https://www.limassolrfc.com",
  },
  {
    name: "Nicosia RFC",
    city: "Nicosia",
    sport: "Rugby",
    level: "competitive",
    englishWelcome: true,
    annualFeeApprox: 350,
    why: "Capital city rugby club with an expat-heavy playing membership. Trains twice weekly in the winter league season. Social events and touring history make this a good entry point for the Nicosia expat community.",
  },
  // ── Football ──────────────────────────────────────────────────────────────
  {
    name: "Limassol Expat Football League",
    city: "Limassol",
    sport: "Football",
    level: "recreational",
    englishWelcome: true,
    why: "Informal 5-a-side and 7-a-side league organised by the expat community. Multiple age and ability groups. Matches on weekday evenings and Saturday mornings at public pitches across Limassol.",
  },
  {
    name: "Nicosia International FC",
    city: "Nicosia",
    sport: "Football",
    level: "recreational",
    englishWelcome: true,
    why: "Mixed expat and local recreational football club in Nicosia. Sunday league format, multiple skill levels, social events after games. Welcoming to new arrivals — contact via Facebook.",
  },
  // ── Triathlon & Cycling ───────────────────────────────────────────────────
  {
    name: "Limassol Triathlon Club",
    city: "Limassol",
    sport: "Triathlon",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 250,
    why: "Active triathlon club covering swim, bike and run training across the Limassol area. Strong participation in the annual Limassol Triathlon. Open water swim sessions at Dasoudi Beach in summer.",
  },
  {
    name: "Cyprus Cycling Federation (Nicosia)",
    city: "Nicosia",
    sport: "Cycling",
    level: "competitive",
    englishWelcome: true,
    why: "The national cycling federation runs group rides and organises road races across Cyprus. The Troodos mountains provide excellent training ground. Affiliated clubs in all major cities.",
    website: "https://www.cycling.org.cy",
  },
  // ── Cricket ───────────────────────────────────────────────────────────────
  {
    name: "Limassol Cricket Club",
    city: "Limassol",
    sport: "Cricket",
    level: "recreational",
    englishWelcome: true,
    annualFeeApprox: 200,
    why: "The main cricket club in Cyprus, with a British expat membership. Sunday matches in season, a small but active social programme, and a grass pitch. Cyprus's oldest expat sports club.",
  },
  // ── Swimming ──────────────────────────────────────────────────────────────
  {
    name: "Larnaca Swimming Club",
    city: "Larnaca",
    sport: "Swimming",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 400,
    why: "Municipal pool-based swimming club with lanes for adult lap swimming, coached squads for competitive swimmers, and a learn-to-swim programme for children. One of the most active clubs in the Larnaca area.",
  },
  // ── Equestrian ────────────────────────────────────────────────────────────
  {
    name: "Limassol Horse Riding Club",
    city: "Limassol",
    sport: "Equestrian",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 1200,
    why: "BHS-affiliated riding club in the hills above Limassol. Lessons for beginners through to advanced dressage and showjumping. English-speaking instructors. Hacking trails in the surrounding countryside.",
  },
  // ── Yoga & Fitness ────────────────────────────────────────────────────────
  {
    name: "Paphos Yoga & Wellness Studio",
    city: "Paphos",
    sport: "Yoga & Fitness",
    level: "all",
    englishWelcome: true,
    annualFeeApprox: 600,
    why: "Well-regarded yoga studio in Kato Paphos with classes in English. Hatha, Vinyasa, and Yin yoga, plus Pilates and meditation workshops. Popular with the British expat community in Paphos.",
  },
];
