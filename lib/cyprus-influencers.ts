/**
 * Cyprus influencers section content.
 *
 * Operator-verified Instagram and TikTok accounts about life in Cyprus.
 * Follower counts are rounded and change; CHECKED_AT is when they were read.
 * Not sponsored or endorsed.
 */

export const CHECKED_AT = "2026-10-03";
export const CHECKED_AT_LABEL = "3 October 2026";
export const CHECKED_AT_SHORT = "Oct 2026";

export type Platform = "Instagram" | "TikTok";

export const ALL_PLATFORMS: ReadonlyArray<Platform> = ["Instagram", "TikTok"];

export type PlatformAccount = {
  handle: string;
  followers: string;
};

export type Influencer = {
  name: string;
  category: string;
  city: string;
  language: string;
  why: string;
  instagram?: PlatformAccount;
  tiktok?: PlatformAccount;
};

export const INFLUENCERS: ReadonlyArray<Influencer> = [
  {
    name: "Visit Cyprus",
    category: "Official and news",
    city: "Island-wide",
    language: "English",
    why: "Official account of the Deputy Ministry of Tourism.",
    instagram: { handle: "visitcypruscom", followers: "122K" },
  },
  {
    name: "Cyprus Mail",
    category: "Official and news",
    city: "Island-wide",
    language: "English",
    why: "English-language daily newspaper covering Cyprus news.",
    instagram: { handle: "cyprusmail_official", followers: "28K" },
  },
  {
    name: "in-cyprus / Philenews (English)",
    category: "Official and news",
    city: "Island-wide",
    language: "English",
    why: "English-language news from the Phileleftheros group.",
    instagram: { handle: "en.philenews", followers: "17K" },
  },
  {
    name: "Kathimerini Cyprus",
    category: "Official and news",
    city: "Island-wide",
    language: "Greek",
    why: "Greek-language daily news, plus food and wine features.",
    instagram: { handle: "kathimerini_cy", followers: "13K" },
  },
  {
    name: "Limassol, Cyprus",
    category: "Places and things to do",
    city: "Limassol",
    language: "Greek and English",
    why: "Photos, places and local happenings around Limassol.",
    instagram: { handle: "limassolcy", followers: "39K" },
  },
  {
    name: "Limassol Cyprus | Limassol Carnival",
    category: "Places and things to do",
    city: "Limassol",
    language: "English",
    why: "Limassol tour-guide style account, including carnival season.",
    instagram: { handle: "limassolcyp", followers: "9.6K" },
  },
  {
    name: "Paphos Life",
    category: "Places and things to do",
    city: "Paphos",
    language: "English",
    why: "Hidden gems, hotspots and local favourites in Paphos.",
    instagram: { handle: "paphos_life", followers: "3.9K" },
  },
  {
    name: "Cyprus Adventures",
    category: "Places and things to do",
    city: "Island-wide",
    language: "English",
    why: "Hidden spots and travel tips around the island.",
    tiktok: { handle: "cyprus_adventures", followers: "41K" },
  },
  {
    name: "Anastasiia (Nastia on the Island)",
    category: "Expat life",
    city: "Island-wide",
    language: "English",
    why: "Cyprus life, local tips, events and things to do.",
    instagram: { handle: "nastiaontheisland", followers: "3.3K" },
    tiktok: { handle: "nastiaontheisland", followers: "5.6K" },
  },
  {
    name: "Melona",
    category: "Expat life",
    city: "Island-wide",
    language: "German",
    why: "A German who moved to Cyprus alone, posting about expat life.",
    instagram: { handle: "melinamelona", followers: "11K" },
  },
  {
    name: "Cypriot Way",
    category: "Culture and language",
    city: "Island-wide",
    language: "English and Greek",
    why: "Cypriot memes and humour: a quick way into local culture.",
    tiktok: { handle: "cypriotway", followers: "55K" },
  },
  {
    name: "My Cypriot Self",
    category: "Culture and language",
    city: "Island-wide",
    language: "English and Greek",
    why: "Short lessons on Cypriot Greek for people who cannot follow the dialect.",
    tiktok: { handle: "my.cypriot.self", followers: "3K" },
  },
  {
    name: "Sketching Cyprus",
    category: "Culture and language",
    city: "Island-wide",
    language: "English",
    why: "Illustrations and sketches of Cyprus life and places.",
    instagram: { handle: "sketchingcy", followers: "13K" },
  },
  {
    name: "World Food 360",
    category: "Food and restaurants",
    city: "Island-wide",
    language: "Greek",
    why: "Restaurant spots in Cyprus (and Greece).",
    instagram: { handle: "world_food360", followers: "126K" },
    tiktok: { handle: "world_food360", followers: "87K" },
  },
  {
    name: "Charis Eats Quality",
    category: "Food and restaurants",
    city: "Island-wide",
    language: "English",
    why: "A foodie couple reviewing restaurants across Cyprus.",
    instagram: { handle: "chariseatsquality", followers: "34K" },
  },
  {
    name: "My Food Case Cyprus",
    category: "Food and restaurants",
    city: "Island-wide",
    language: "Greek and English",
    why: "Recommendations of local restaurants.",
    instagram: { handle: "myfoodcase_cy", followers: "22K" },
    tiktok: { handle: "myfoodcase_cy", followers: "14K" },
  },
  {
    name: "Feedmecy",
    category: "Food and restaurants",
    city: "Island-wide",
    language: "English",
    why: "Cyprus restaurant reviews: breakfast to dinner.",
    instagram: { handle: "feedmecy", followers: "15K" },
  },
  {
    name: "Yummy Cyprus",
    category: "Food and restaurants",
    city: "Island-wide",
    language: "English",
    why: "Daily food reels from places around Cyprus.",
    instagram: { handle: "yummy_cyprus", followers: "11K" },
  },
  {
    name: "Limassol Food",
    category: "Food and restaurants",
    city: "Limassol",
    language: "English",
    why: "Limassol food and restaurant picks.",
    instagram: { handle: "limassol.food", followers: "4.6K" },
  },
  {
    name: "Afrodite's Kitchen (Christina Loucas)",
    category: "Cooking",
    city: "Island-wide",
    language: "English",
    why: "Author of the cookbook Cyprus Cuisine; Cypriot recipes.",
    instagram: { handle: "afroditeskitchen", followers: "15K" },
  },
  {
    name: "Paola Papacosta",
    category: "Cooking",
    city: "Island-wide",
    language: "English",
    why: "Easy family recipes and eating out in Cyprus.",
    instagram: { handle: "cypriotandproud", followers: "14K" },
  },
  {
    name: "Funda Savant",
    category: "Cooking",
    city: "Island-wide",
    language: "English",
    why: "Cyprus-based pastry chef sharing family recipes.",
    instagram: { handle: "fun_karlaa", followers: "26K" },
  },
];

export const ALL_CATEGORIES: ReadonlyArray<string> = Array.from(
  new Set(INFLUENCERS.map((i) => i.category)),
);

export const instagramUrl = (handle: string) =>
  `https://www.instagram.com/${handle}/`;
export const tiktokUrl = (handle: string) =>
  `https://www.tiktok.com/@${handle}`;

export const followersLabel = (followers: string) =>
  `${followers} followers (${CHECKED_AT_SHORT})`;

export const SEO_TITLE = `${INFLUENCERS.length} Cyprus Influencers to Follow on Instagram and TikTok`;

export const SEO_DESCRIPTION = `${INFLUENCERS.length} verified Instagram and TikTok accounts about Cyprus: news, places, expat life, language, food and cooking. Follower counts checked on ${CHECKED_AT_LABEL}.`;

export const NOTE = `Not sponsored or endorsed. Follower counts checked on ${CHECKED_AT_LABEL} and will change.`;
