/**
 * Expat Communities section content.
 *
 * Curated list of Facebook groups, WhatsApp communities, Meetup groups,
 * Telegram channels, and forums for expats in Cyprus. Focused on the
 * communities most active and useful for relocators.
 *
 * Note: Group membership counts and URLs change frequently — verify before
 * publishing. Facebook groups are the primary social infrastructure for
 * expats in Cyprus.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type Platform =
  | "Facebook"
  | "WhatsApp"
  | "Meetup"
  | "Telegram"
  | "Forum";

export type ExpatCommunity = {
  name: string;
  city: City | "Island-wide";
  platform: Platform;
  nationalityFocus?: string;
  sizeApprox?: string;
  why: string;
  url?: string;
};

export const ALL_PLATFORMS: ReadonlyArray<Platform> = [
  "Facebook",
  "WhatsApp",
  "Meetup",
  "Telegram",
  "Forum",
];

export const PLATFORM_LABEL: Record<Platform, string> = {
  Facebook: "Facebook Group",
  WhatsApp: "WhatsApp",
  Meetup: "Meetup",
  Telegram: "Telegram",
  Forum: "Forum",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export type CommunityTip = {
  heading: string;
  body: string;
};

export const COMMUNITY_TIPS: ReadonlyArray<CommunityTip> = [
  {
    heading: "Facebook groups are the primary social infrastructure",
    body: "Unlike most EU countries where expat life runs through apps and coworking spaces, Cyprus expat communities are built overwhelmingly on Facebook groups. Even non-Facebook users will need to join at least one city group for rental leads, service recommendations, and event invites. These groups are genuinely active — expect 10–30 posts a day in the major ones.",
  },
  {
    heading: "Join city-specific AND nationality groups",
    body: "The most useful setup is to join the general English-speaking group for your city (for local questions, recommendations, and events) plus the nationality-specific group most relevant to you (for bureaucratic advice from people who went through exactly your immigration path). The two serve different purposes and complement each other.",
  },
  {
    heading: "In-person meetups are most active in Limassol",
    body: "Limassol has the largest and most diverse expat population in Cyprus — estimates put the international community at 30–40% of the city's residents. Organised in-person meetups, language exchanges, and networking events happen weekly. Paphos has a strong British expat social scene. Nicosia and Larnaca are quieter but active.",
  },
  {
    heading: "Ask before you arrive",
    body: "Most major groups allow posts before you relocate. Use this — the collective knowledge in these groups (rental prices, lawyer recommendations, school reviews, visa experiences) is significantly more current than any guide. The community is generally helpful to newcomers asking good questions.",
  },
];

// ---------------------------------------------------------------------------
// Communities
// ---------------------------------------------------------------------------

export const EXPAT_COMMUNITIES: ReadonlyArray<ExpatCommunity> = [
  // ── General / All nationalities ──────────────────────────────────────────
  {
    name: "Expats in Cyprus",
    city: "Island-wide",
    platform: "Facebook",
    sizeApprox: "80,000+ members",
    why: "The largest general expat group covering all of Cyprus. Questions range from visa bureaucracy to restaurant recommendations. A good starting point before joining city-specific groups.",
    url: "https://www.facebook.com/groups/expatscyprus",
  },
  {
    name: "Expats in Limassol",
    city: "Limassol",
    platform: "Facebook",
    sizeApprox: "35,000+ members",
    why: "The main English-language community group for Limassol. Active daily with rental listings, service recommendations, event announcements, and general city life questions. Essential for anyone moving to Limassol.",
    url: "https://www.facebook.com/groups/expatsinlimassol",
  },
  {
    name: "Expats in Paphos",
    city: "Paphos",
    platform: "Facebook",
    sizeApprox: "25,000+ members",
    why: "Paphos's main expat group. Strong British presence but genuinely international. Good for rental and property leads, local service recommendations, and connecting with the Paphos community before you arrive.",
    url: "https://www.facebook.com/groups/expatsinpaphos",
  },
  {
    name: "Expats in Larnaca",
    city: "Larnaca",
    platform: "Facebook",
    sizeApprox: "15,000+ members",
    why: "Larnaca's central expat community. Smaller and friendlier in tone than the Limassol group. Particularly useful for the airport-adjacent neighbourhoods and the growing digital nomad population in the city.",
    url: "https://www.facebook.com/groups/expatsInLarnaca",
  },
  {
    name: "Expats in Nicosia",
    city: "Nicosia",
    platform: "Facebook",
    sizeApprox: "12,000+ members",
    why: "The capital's expat group. More business- and bureaucracy-oriented than the coastal city groups, reflecting Nicosia's role as the admin and embassy hub. Good for government office recommendations and EU registration questions.",
    url: "https://www.facebook.com/groups/expatsinnicosia",
  },
  {
    name: "Expats in Ayia Napa & Famagusta",
    city: "Ayia Napa",
    platform: "Facebook",
    sizeApprox: "5,000+ members",
    why: "Smaller but active group covering the east coast. Useful for understanding the very different pace and social scene of Cyprus's tourist hub outside peak season.",
  },
  // ── British ──────────────────────────────────────────────────────────────
  {
    name: "British Expats in Cyprus",
    city: "Island-wide",
    platform: "Facebook",
    nationalityFocus: "British",
    sizeApprox: "45,000+ members",
    why: "The largest nationality-specific group on the island. Strong focus on post-Brexit bureaucracy — ARC applications, pet import, driving licence exchange, S1 healthcare. Invaluable for UK passport holders navigating non-EU status.",
    url: "https://www.facebook.com/groups/britishexpatsincyprus",
  },
  {
    name: "British in Paphos",
    city: "Paphos",
    platform: "Facebook",
    nationalityFocus: "British",
    sizeApprox: "18,000+ members",
    why: "Paphos has the longest-established British expat community in Cyprus. This group covers everything from the British Legion to NHS equivalents, and has decades of collective local knowledge.",
    url: "https://www.facebook.com/groups/britishinpaphos",
  },
  // ── Israeli ──────────────────────────────────────────────────────────────
  {
    name: "Israelis in Cyprus — ישראלים בקפריסין",
    city: "Island-wide",
    platform: "Facebook",
    nationalityFocus: "Israeli",
    sizeApprox: "60,000+ members",
    why: "The main Israeli expat group covering the whole island. Posted in Hebrew and English. Covers relocation logistics, tax treaty questions, kosher food, Hebrew schools, and social events. One of the most active nationality groups in Cyprus.",
    url: "https://www.facebook.com/groups/israeliincyprus",
  },
  {
    name: "Israelis in Limassol — ישראלים בלימסול",
    city: "Limassol",
    platform: "Facebook",
    nationalityFocus: "Israeli",
    sizeApprox: "30,000+ members",
    why: "Limassol has one of the largest Israeli communities outside Israel. This group is essential for Limassol-specific questions: neighbourhood recommendations, Hebrew-speaking services, and social meetups. Very active.",
  },
  {
    name: "Israeli Community Cyprus",
    city: "Limassol",
    platform: "Telegram",
    nationalityFocus: "Israeli",
    why: "Telegram channel used alongside the Facebook group for faster Q&A and urgent announcements within the Israeli community. Good for real-time updates on bureaucracy changes and community events.",
  },
  // ── Russian-speaking ─────────────────────────────────────────────────────
  {
    name: "Русские на Кипре (Russians in Cyprus)",
    city: "Island-wide",
    platform: "Facebook",
    nationalityFocus: "Russian-speaking",
    sizeApprox: "40,000+ members",
    why: "The main Russian-language expat group covering all of Cyprus. Russian-speaking communities are large and well-organised in Limassol especially. Covers housing, schooling, services, and social life.",
    url: "https://www.facebook.com/groups/russianscyprus",
  },
  {
    name: "Лимассол: наши люди (Limassol Russian Community)",
    city: "Limassol",
    platform: "Telegram",
    nationalityFocus: "Russian-speaking",
    why: "Active Telegram channel for Russian speakers in Limassol. Used for quick recommendations, buying/selling, and local news. Limassol has a substantial Russian-speaking business community that has grown significantly since 2022.",
  },
  // ── Other nationalities ──────────────────────────────────────────────────
  {
    name: "Germans in Cyprus — Deutsche in Zypern",
    city: "Island-wide",
    platform: "Facebook",
    nationalityFocus: "German",
    sizeApprox: "8,000+ members",
    why: "The main German-language community group. Useful for German tax treaty questions, finding German-speaking accountants, and connecting with a smaller but active community concentrated in Paphos and Limassol.",
  },
  {
    name: "French Community Cyprus",
    city: "Island-wide",
    platform: "Facebook",
    nationalityFocus: "French",
    sizeApprox: "6,000+ members",
    why: "The French-language expat group for Cyprus. French presence is growing, particularly in Limassol's tech and finance sectors. Good for finding French-speaking services and the Alliance Française network.",
  },
  // ── Interest-based / professional ────────────────────────────────────────
  {
    name: "Digital Nomads Cyprus",
    city: "Island-wide",
    platform: "Facebook",
    sizeApprox: "12,000+ members",
    why: "The main group for remote workers and digital nomads on the Digital Nomad Visa or working independently. Strong on coworking recommendations, visa application experiences, and tax residency questions from a remote-work perspective.",
    url: "https://www.facebook.com/groups/digitalnomadscyprus",
  },
  {
    name: "Cyprus Nomads",
    city: "Limassol",
    platform: "Meetup",
    why: "Regular in-person meetups for remote workers, freelancers, and digital nomads in Limassol. Monthly events at coworking spaces and cafes. One of the more active in-person networking groups outside the nationality communities.",
  },
  {
    name: "InterNations Cyprus",
    city: "Island-wide",
    platform: "Meetup",
    why: "InterNations runs organised expat networking events across Cyprus — Limassol, Nicosia, and Paphos. Monthly gatherings with a professional networking slant. Paid membership but useful for structured social events when you first arrive.",
    url: "https://www.internations.org/cyprus-expats",
  },
  {
    name: "Limassol Expat Meetup",
    city: "Limassol",
    platform: "Meetup",
    why: "Informal monthly meetup for English-speaking expats in Limassol. Rotating venues — bars, restaurants, rooftop spaces. No agenda, no pitch, just social. One of the easiest ways to meet people in your first month.",
    url: "https://www.meetup.com/limassol-expats",
  },
  {
    name: "Cyprus Expat Forum",
    city: "Island-wide",
    platform: "Forum",
    why: "The longest-running English-language expat forum for Cyprus. Slower than Facebook but searchable, and the archives contain years of detailed visa, banking, and housing threads that Facebook's search cannot find. Good for deep research before posting.",
    url: "https://www.cyprusexpat.co.uk",
  },
  {
    name: "Expat.com Cyprus",
    city: "Island-wide",
    platform: "Forum",
    why: "Expat.com's Cyprus forum has active threads on residency, banking, taxes, and daily life. International community — not just British-focused. Good for getting a second opinion on bureaucratic questions.",
    url: "https://www.expat.com/forum/viewforum.php?id=297",
  },
];
