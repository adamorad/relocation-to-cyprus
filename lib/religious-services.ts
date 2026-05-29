/**
 * Religious Services section content.
 *
 * English-language and multi-lingual worship services across Cyprus.
 * Curated for relocators seeking familiar faith communities on the island.
 *
 * Note: service times and frequencies change seasonally — always verify
 * directly with the congregation before attending. Cyprus follows the
 * Orthodox calendar for public holidays.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type Faith =
  | "Anglican"
  | "Catholic"
  | "Orthodox"
  | "Protestant"
  | "Jewish"
  | "Muslim"
  | "Hindu"
  | "Buddhist"
  | "Non-denominational";

export type ReligiousService = {
  name: string;
  city: City;
  faith: Faith;
  languagesOffered: string[];
  serviceFrequency: string;
  why: string;
  address?: string;
  website?: string;
};

export const ALL_FAITHS: ReadonlyArray<Faith> = [
  "Anglican",
  "Catholic",
  "Orthodox",
  "Protestant",
  "Jewish",
  "Muslim",
  "Hindu",
  "Buddhist",
  "Non-denominational",
];

export const FAITH_LABEL: Record<Faith, string> = {
  Anglican: "Anglican",
  Catholic: "Catholic",
  Orthodox: "Orthodox",
  Protestant: "Protestant",
  Jewish: "Jewish",
  Muslim: "Muslim",
  Hindu: "Hindu",
  Buddhist: "Buddhist",
  "Non-denominational": "Non-denominational",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export type ReligiousTip = {
  heading: string;
  body: string;
};

export const RELIGIOUS_TIPS: ReadonlyArray<ReligiousTip> = [
  {
    heading: "Orthodox calendar differs from Western",
    body: "Cyprus is overwhelmingly Greek Orthodox and most public holidays follow the Orthodox calendar. This means Orthodox Easter (and Holy Week) is the island's most significant holiday, often falling on different dates from the Catholic or Protestant Easter. Good Friday is a near-complete shutdown; Christmas and Epiphany (6 January) are both public holidays. Expat communities largely observe these in parallel with their own calendars.",
  },
  {
    heading: "Many services are bilingual Greek and English",
    body: "Several Catholic, Anglican, and even some Orthodox parishes in Cyprus offer bilingual services or dedicated English services alongside Greek ones. In Limassol and Paphos especially, congregations are large enough to support separate English-language services. Always check the parish website or Facebook page for current English service times — these can shift seasonally.",
  },
  {
    heading: "Jewish community concentrated in Limassol",
    body: "Cyprus has a growing and active Jewish community, concentrated primarily in Limassol which hosts the island's main Chabad House. Limassol has kosher food options, a Jewish school, and regular Shabbat services. The community is a mix of Israeli expats, European Jewish families, and international professionals. Paphos and Nicosia have smaller communities.",
  },
];

// ---------------------------------------------------------------------------
// Religious services
// ---------------------------------------------------------------------------

export const RELIGIOUS_SERVICES: ReadonlyArray<ReligiousService> = [
  // ── Anglican ─────────────────────────────────────────────────────────────
  {
    name: "St Barnabas Anglican Church",
    city: "Limassol",
    faith: "Anglican",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "The main Anglican church in Limassol and one of the most established English-language congregations in Cyprus. Part of the Diocese of Cyprus and the Gulf. Regular Sunday Eucharist, pastoral support, and a strong community of British and international expats.",
    address: "Ayios Ioannis Lambadistis Street, Limassol",
    website: "https://www.cypgulf.org/limassol",
  },
  {
    name: "St Lazarus Anglican Church",
    city: "Larnaca",
    faith: "Anglican",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "Historic Anglican church in Larnaca serving the English-speaking community. Located near the famous Church of Saint Lazarus. Regular Sunday services with a congregation that includes both long-term British residents and newer relocators.",
    address: "Larnaca town centre",
    website: "https://www.cypgulf.org/larnaca",
  },
  {
    name: "St Stephen's Anglican Church",
    city: "Nicosia",
    faith: "Anglican",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "The Anglican congregation in the capital, serving diplomats, business professionals, and English-speaking expats. Regular Sunday services and pastoral care. Part of the Diocese of Cyprus and the Gulf.",
    address: "Nicosia",
    website: "https://www.cypgulf.org/nicosia",
  },
  {
    name: "All Saints Anglican Church",
    city: "Paphos",
    faith: "Anglican",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "Paphos's Anglican church serving one of the largest British expat communities in Cyprus. Friendly congregation with a broad range of services — Eucharist, baptisms, weddings, and memorial services. Well-organised pastoral support network for new arrivals.",
    address: "Emba village, near Paphos",
    website: "https://www.cypgulf.org/paphos",
  },

  // ── Catholic ─────────────────────────────────────────────────────────────
  {
    name: "Holy Cross Catholic Church",
    city: "Nicosia",
    faith: "Catholic",
    languagesOffered: ["English", "Arabic", "French", "Filipino"],
    serviceFrequency: "Multiple daily Masses, Sunday in multiple languages",
    why: "The main Latin Rite Catholic church in Cyprus and the largest Catholic congregation on the island. English Mass every Sunday morning. Serves a very international congregation including Filipinos, Indians, Lebanese, and European expats. Pastoral care and community events throughout the week.",
    address: "Stasinou Avenue, Nicosia",
    website: "https://www.holycrosscyprus.org",
  },
  {
    name: "St Catherine's Catholic Church",
    city: "Limassol",
    faith: "Catholic",
    languagesOffered: ["English", "French", "Polish"],
    serviceFrequency: "Sunday Mass and weekday Masses",
    why: "Limassol's main Catholic church, serving an international congregation. Sunday services in multiple languages with strong English-language Mass. Popular with European expats, the growing French and Polish communities, and long-stay expat families.",
    address: "Limassol city centre",
  },
  {
    name: "Maronite Church of Limassol",
    city: "Limassol",
    faith: "Catholic",
    languagesOffered: ["Arabic", "Greek", "English"],
    serviceFrequency: "Sunday services",
    why: "Cyprus has a historic Maronite Christian community — one of the island's recognised religious minorities. The Limassol Maronite church offers services in the Maronite rite. An important community for Arabic-speaking Catholic expats and the Lebanese diaspora.",
    address: "Limassol",
  },
  {
    name: "St Maron Maronite Church",
    city: "Nicosia",
    faith: "Catholic",
    languagesOffered: ["Arabic", "Greek"],
    serviceFrequency: "Sunday services",
    why: "Nicosia's Maronite parish, serving the historic Maronite community in the capital. Part of Cyprus's constitutionally recognised religious minority groups. Services in Arabic and Greek.",
    address: "Nicosia old city",
  },

  // ── Orthodox ─────────────────────────────────────────────────────────────
  {
    name: "Church of Saint Lazarus",
    city: "Larnaca",
    faith: "Orthodox",
    languagesOffered: ["Greek", "English"],
    serviceFrequency: "Daily liturgy",
    why: "One of the most important Orthodox churches in Cyprus — built over the tomb of Saint Lazarus of Bethany, who according to tradition became the first Bishop of Kition (Larnaca). Regular liturgies, significant feast days. English-speaking visitors welcome. A spiritual and cultural landmark for all Orthodox expats.",
    address: "Larnaca old town",
    website: "https://www.saint-lazarus.org",
  },
  {
    name: "Cathedral of Agios Ioannis",
    city: "Nicosia",
    faith: "Orthodox",
    languagesOffered: ["Greek"],
    serviceFrequency: "Daily liturgy",
    why: "The Archbishopric of Cyprus Cathedral in Nicosia's old city. One of the island's most significant Orthodox churches, with 18th-century frescoes depicting Cyprus's ecclesiastical history. Services in Greek; open to all.",
    address: "Archbishop Kyprianou Square, Nicosia old city",
  },

  // ── Protestant ───────────────────────────────────────────────────────────
  {
    name: "Limassol International Christian Fellowship",
    city: "Limassol",
    faith: "Protestant",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "Non-denominational evangelical congregation with a large international membership. Sunday services entirely in English. Active small group programme, prayer meetings, and family ministry. Very welcoming to newcomers and specifically oriented toward expat integration.",
    website: "https://www.licf.org",
  },
  {
    name: "Paphos International Community Church",
    city: "Paphos",
    faith: "Protestant",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "English-language Protestant church serving Paphos's international community. Evangelical orientation with a warm community ethos. Sunday morning services, occasional midweek events. Good entry point for expats seeking English-language Christian worship in Paphos.",
  },
  {
    name: "Nicosia International Christian Fellowship",
    city: "Nicosia",
    faith: "Protestant",
    languagesOffered: ["English", "Filipino"],
    serviceFrequency: "Sunday services, weekly",
    why: "Multi-ethnic English-language Protestant congregation in Nicosia. Diverse membership including many Filipino and South Asian expats. Sunday services with worship and preaching in English. Active pastoral care and community outreach.",
  },
  {
    name: "Crossroads Church Larnaca",
    city: "Larnaca",
    faith: "Protestant",
    languagesOffered: ["English"],
    serviceFrequency: "Sunday services, weekly",
    why: "English-language evangelical church in Larnaca. Smaller congregation but highly active — known for strong community integration and support networks for new expat arrivals. Good for families looking for English-medium Sunday school alongside worship.",
  },

  // ── Jewish ───────────────────────────────────────────────────────────────
  {
    name: "Chabad of Cyprus",
    city: "Limassol",
    faith: "Jewish",
    languagesOffered: ["Hebrew", "English", "Russian"],
    serviceFrequency: "Shabbat services weekly, major Jewish holidays",
    why: "The main Jewish congregation in Cyprus, based in Limassol. Chabad House runs weekly Shabbat dinners, holiday celebrations, and daily prayer services. Serves the large Israeli expat community as well as Jewish expats from Europe, the UK, and North America. Also maintains a kosher food programme.",
    website: "https://www.chabadcyprus.com",
  },
  {
    name: "Jewish Community of Paphos",
    city: "Paphos",
    faith: "Jewish",
    languagesOffered: ["English", "Hebrew"],
    serviceFrequency: "Shabbat services and high holidays",
    why: "Smaller Jewish community serving the growing number of Jewish expats and Israeli families who have settled in Paphos. Services on Shabbat and major holidays. Closely connected to the Limassol Chabad for larger events and educational programmes.",
  },

  // ── Muslim ───────────────────────────────────────────────────────────────
  {
    name: "Hala Sultan Tekke Mosque",
    city: "Larnaca",
    faith: "Muslim",
    languagesOffered: ["Arabic", "Turkish", "English"],
    serviceFrequency: "Daily prayers (Jumu'ah on Friday)",
    why: "One of the most important Islamic sites in the Middle East — contains the tomb of Umm Haram bint Milhan, a companion of the Prophet. Active mosque with daily prayers. Significant for Arab Muslim expats and pilgrims from across the Islamic world.",
    address: "Larnaca Salt Lake, Larnaca",
    website: "https://www.halasultantekke.com",
  },
  {
    name: "Larnaca Grand Mosque (Djami Kebir)",
    city: "Larnaca",
    faith: "Muslim",
    languagesOffered: ["Arabic", "Turkish"],
    serviceFrequency: "Daily prayers (Jumu'ah on Friday)",
    why: "The main mosque in Larnaca's old town, originally a converted Venetian church. Serves the Arab Muslim community in Larnaca, including expats from Lebanon, Egypt, and Gulf countries. Active Friday prayer community.",
    address: "Larnaca old town",
  },
  {
    name: "Limassol Islamic Cultural Centre",
    city: "Limassol",
    faith: "Muslim",
    languagesOffered: ["Arabic", "English", "Urdu"],
    serviceFrequency: "Daily prayers (Jumu'ah on Friday)",
    why: "The main Islamic centre in Limassol, serving a diverse Muslim community including Arabs, South Asians, and converts. Friday prayers, Ramadan iftar events, and educational programmes. Welcoming to new Muslim residents.",
    address: "Limassol",
  },

  // ── Non-denominational / Other ───────────────────────────────────────────
  {
    name: "Baha'i Community of Cyprus",
    city: "Nicosia",
    faith: "Non-denominational",
    languagesOffered: ["English", "Greek"],
    serviceFrequency: "Feasts (every 19 days), study circles",
    why: "The Baha'i Faith has had a continuous presence in Cyprus since the 1950s. The Nicosia community holds regular devotional gatherings, Nineteen Day Feasts, and study circles open to all. Welcoming to international expats and those exploring independent religious inquiry.",
  },
];
