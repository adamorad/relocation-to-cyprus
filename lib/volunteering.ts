/**
 * Volunteering section content.
 *
 * Volunteer opportunities for expats in Cyprus. Includes local NGOs,
 * animal shelters, environmental organisations, community projects,
 * and social welfare groups that actively welcome international volunteers.
 *
 * Note: volunteer programmes and contact details change — verify directly
 * with the organisation before committing time. Most organisations welcome
 * sporadic help as well as regular commitments.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type VolunteerFocus =
  | "animals"
  | "environment"
  | "children"
  | "elderly"
  | "refugees"
  | "community"
  | "arts"
  | "sport";

export type TimeCommitment = "ad-hoc" | "weekly" | "monthly";

export type VolunteerOrg = {
  name: string;
  city: City | "Island-wide";
  focus: VolunteerFocus;
  languages: string[];
  timeCommitment: TimeCommitment;
  why: string;
  website?: string;
};

export const ALL_FOCUS_AREAS: ReadonlyArray<VolunteerFocus> = [
  "animals",
  "environment",
  "children",
  "elderly",
  "refugees",
  "community",
  "arts",
  "sport",
];

export const FOCUS_LABEL: Record<VolunteerFocus, string> = {
  animals: "Animals",
  environment: "Environment",
  children: "Children & Youth",
  elderly: "Elderly",
  refugees: "Refugees & Asylum",
  community: "Community",
  arts: "Arts & Culture",
  sport: "Sport",
};

export const TIME_COMMITMENT_LABEL: Record<TimeCommitment, string> = {
  "ad-hoc": "Ad-hoc / One-off",
  weekly: "Weekly",
  monthly: "Monthly",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export type VolunteerTip = {
  heading: string;
  body: string;
};

export const VOLUNTEER_TIPS: ReadonlyArray<VolunteerTip> = [
  {
    heading: "Volunteering is the fastest path to integration",
    body: "For expats in Cyprus, volunteering is one of the most effective ways to build genuine local connections outside the expat bubble. Working alongside Cypriot volunteers in animal shelters, environmental clean-ups, or community events creates relationships that Facebook groups and expat meetups rarely replicate. Many expats cite their volunteer network as their closest social circle within a year of moving.",
  },
  {
    heading: "Most organisations welcome sporadic help",
    body: "Unlike some countries where volunteering requires long-term commitments and formal onboarding, many Cyprus NGOs and community organisations actively welcome one-off help — for beach clean-ups, event days, fundraising drives, and seasonal shelter work. If your schedule is irregular as you settle in, 'ad-hoc' volunteering is a perfectly valid entry point. Regular weekly roles are available but not mandatory.",
  },
  {
    heading: "Limassol has the most organised programmes",
    body: "The most structured volunteering infrastructure is concentrated in Limassol. Limassol has a large and active NGO sector, partly driven by its international population. Paphos has strong environmental and animal welfare volunteering. Larnaca has a growing community of animal-rescue volunteers and beach conservation groups.",
  },
];

// ---------------------------------------------------------------------------
// Organisations
// ---------------------------------------------------------------------------

export const VOLUNTEER_ORGS: ReadonlyArray<VolunteerOrg> = [
  // ── Animals ──────────────────────────────────────────────────────────────
  {
    name: "Cyprus Animal Party (KIKA)",
    city: "Island-wide",
    focus: "animals",
    languages: ["Greek", "English"],
    timeCommitment: "ad-hoc",
    why: "Grassroots animal welfare organisation that coordinates island-wide rescue and rehoming. Volunteers help with transport, temporary fostering, and fundraising events. Strong social media community — easy to connect and offer help on a flexible basis.",
  },
  {
    name: "Paphos Animal Welfare Society (PAWS Paphos)",
    city: "Paphos",
    focus: "animals",
    languages: ["English", "Greek"],
    timeCommitment: "weekly",
    why: "Paphos's main animal welfare charity. Runs a busy rehoming centre and relies heavily on volunteer dog walkers, cat socialisation helpers, and event assistants. Long-established British expat volunteer base — excellent for newcomers to Paphos looking to integrate.",
    website: "https://pawsdogshelter.com",
  },
  {
    name: "Larnaca Animal Welfare (LAW)",
    city: "Larnaca",
    focus: "animals",
    languages: ["English", "Greek"],
    timeCommitment: "ad-hoc",
    why: "Community group focused on the large stray cat and dog population in the Larnaca area. Volunteers assist with TNR (trap-neuter-return) programmes, temporary fostering, and rehoming events. Good for expats who want flexible, practical animal welfare work.",
  },

  // ── Environment ──────────────────────────────────────────────────────────
  {
    name: "Cyprus Wildlife Society",
    city: "Island-wide",
    focus: "environment",
    languages: ["Greek", "English"],
    timeCommitment: "monthly",
    why: "One of Cyprus's leading wildlife conservation organisations. Volunteer opportunities include sea turtle monitoring (May–September), bird ringing surveys, invasive species removal, and nature trail maintenance. Popular with expats who want to engage with Cyprus's exceptional natural environment.",
  },
  {
    name: "AKTI Project (Marine Conservation)",
    city: "Limassol",
    focus: "environment",
    languages: ["Greek", "English"],
    timeCommitment: "monthly",
    why: "AKTI focuses on marine and coastal conservation in Cyprus — plastic pollution removal, beach clean-ups, citizen science surveys, and environmental education. Organises regular community clean-up days open to all volunteers. Good for expats wanting to engage with Cyprus's coastal ecosystems.",
    website: "https://www.akti.org.cy",
  },

  // ── Children & Youth ─────────────────────────────────────────────────────
  {
    name: "Anastasio, Limassol Youth Sports",
    city: "Limassol",
    focus: "sport",
    languages: ["Greek", "English"],
    timeCommitment: "weekly",
    why: "Runs youth sports programmes in Limassol's less affluent districts. Volunteers with coaching, English teaching, or general sports backgrounds assist with after-school sessions for children aged 6–16. Good integration opportunity for expats with sports or education backgrounds.",
  },

  // ── Elderly ──────────────────────────────────────────────────────────────

  // ── Refugees & Asylum ────────────────────────────────────────────────────

  // ── Arts & Culture ───────────────────────────────────────────────────────
  {
    name: "Rialto Theatre Volunteer Programme",
    city: "Limassol",
    focus: "arts",
    languages: ["Greek", "English"],
    timeCommitment: "ad-hoc",
    why: "Limassol's main cultural venue actively recruits volunteers for events, festivals, and productions. Volunteer ushers, event assistants, and front-of-house helpers get access to performances while contributing to Cyprus's arts scene. Flexible, event-by-event commitment.",
    website: "https://www.rialto.com.cy",
  },
  {
    name: "Pafos European Capital of Culture Legacy",
    city: "Paphos",
    focus: "arts",
    languages: ["Greek", "English"],
    timeCommitment: "monthly",
    why: "Paphos was European Capital of Culture in 2017 and the legacy programmes continue. Community arts and cultural preservation projects run throughout the year with volunteer opportunities for those interested in heritage, local art, and community engagement.",
  },
];
