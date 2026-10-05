/**
 * Mental health services directory for Cyprus.
 * Consumed by app/sections/mental-health-services/page.tsx.
 *
 * Curation: English-speaking therapists, psychologists, psychotherapists,
 * and psychiatrists across Cyprus, curated for expats and relocators.
 * Session prices and availability change — verify directly with providers.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";
export { ALL_CITIES } from "@/lib/food";

export type ProviderType =
  | "psychologist"
  | "psychotherapist"
  | "psychiatrist"
  | "counsellor";

export type MentalHealthProvider = {
  name: string;
  title: string;
  city: City;
  type: ProviderType;
  approaches: string[];
  languages: string[];
  onlineAvailable: boolean;
  sessionFrom?: number;
  why: string;
  website?: string;
};

export const ALL_PROVIDER_TYPES: ReadonlyArray<ProviderType> = [
  "psychologist",
  "psychotherapist",
  "psychiatrist",
  "counsellor",
];

export const PROVIDER_TYPE_LABEL: Record<ProviderType, string> = {
  psychologist: "Psychologist",
  psychotherapist: "Psychotherapist",
  psychiatrist: "Psychiatrist",
  counsellor: "Counsellor",
};

// ---------------------------------------------------------------------------
// Relocator tips
// ---------------------------------------------------------------------------

export type MentalHealthTip = {
  heading: string;
  body: string;
};

export const MENTAL_HEALTH_TIPS: ReadonlyArray<MentalHealthTip> = [
  {
    heading: "Psychologist vs psychiatrist in Cyprus",
    body: "In Cyprus, psychologists (holders of a university psychology degree + postgraduate training) provide talking therapy but cannot prescribe medication. Psychiatrists are medical doctors who specialise in mental health and can prescribe. Psychotherapists hold specific modality training (CBT, psychodynamic, etc.) and often overlap with psychologists. For medication management or complex diagnoses, start with a psychiatrist; for ongoing talk therapy, a psychologist or psychotherapist is usually the right first call.",
  },
  {
    heading: "Online sessions are now standard",
    body: "Most English-speaking therapists in Cyprus now offer fully remote sessions via video call, and many have structured their practices around a hybrid model. This matters for expats who move between cities, travel frequently, or live in areas with limited local options (Paphos, Larnaca). Session quality is widely reported as equivalent to in-person by both clients and therapists. Look for providers who list secure video platforms (Zoom, Doxy.me) rather than consumer apps.",
  },
  {
    heading: "Typical session costs",
    body: "A standard 50-minute session with an English-speaking therapist in Cyprus runs €60–100. Psychiatrist consultations (first appointment) are typically €120–180; follow-up medication reviews €80–120. Some counsellors offer sliding-scale fees (€40–60) for clients who declare financial hardship. Private health insurance plans rarely cover more than 10–15 sessions per year; check your policy carefully. GeSY covers some mental health services via GP referral, but the number of GeSY-registered English-speaking therapists is still limited.",
  },
  {
    heading: "Crisis support",
    body: "If you or someone else is in immediate danger, call 112 (emergency services, free, 24/7) or go to the nearest hospital emergency department. For emotional support with loneliness, a psychological crisis or thoughts of suicide, call 116 123, the emotional support line run by SPAVO. According to SPAVO, it is staffed Monday to Friday, 8:30 to 16:00, so it is not available at night or at weekends; outside those hours call 112 or go to an emergency department.",
  },
  {
    heading: "Relocation depression and expat-specific issues",
    body: "Relocation depression is underdiagnosed and often shows up 3–9 months after the move — after the initial excitement fades and the practical reality of building a new life sets in. Common presentations include loss of identity, disconnection from the local culture, grief for the life left behind, and relationship strain. Several therapists on this list have specific experience with expat adjustment issues. If your presenting issue centres on the move itself, lead with that context — it shapes the therapeutic approach significantly.",
  },
];

// ---------------------------------------------------------------------------
// Mental Health Providers
// ---------------------------------------------------------------------------

export const MENTAL_HEALTH_PROVIDERS: ReadonlyArray<MentalHealthProvider> = [
  // ── Limassol ──────────────────────────────────────────────────────────────
  {
    name: "Maria Economidou",
    title: "Psychotherapist & Couples Therapist",
    city: "Limassol",
    type: "psychotherapist",
    approaches: ["Integrative Psychotherapy", "Emotionally Focused Therapy", "Couples Therapy"],
    languages: ["English", "Greek", "Russian"],
    onlineAvailable: true,
    sessionFrom: 70,
    why: "Specialises in couples and relationship therapy alongside individual work. Particularly experienced with expat couples navigating the stress of relocation, cross-cultural relationships, and work-life imbalance. Offers both in-person and remote sessions.",
  },
  {
    name: "Dr Panayiotis Stavrou",
    title: "Psychiatrist",
    city: "Limassol",
    type: "psychiatrist",
    approaches: ["Psychopharmacology", "Brief Psychotherapy", "ADHD Assessment"],
    languages: ["English", "Greek"],
    onlineAvailable: false,
    sessionFrom: 150,
    why: "Private psychiatrist in Limassol covering depression, anxiety disorders, ADHD (adult diagnosis), bipolar disorder, and PTSD. Trained in Athens and the UK. In-person consultations only. Well-regarded for thorough diagnostic assessments and non-rushed medication reviews.",
  },
  {
    name: "Anna Petrou",
    title: "Counsellor & EMDR Therapist",
    city: "Limassol",
    type: "counsellor",
    approaches: ["EMDR", "Person-Centred Therapy", "Trauma Therapy"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 65,
    why: "EMDR-certified therapist working with trauma, grief, and post-relocation anxiety. Competitive pricing and online availability make her accessible to expats across Cyprus. Good starting point for trauma-related presentations before escalating to a clinical psychologist.",
  },
  {
    name: "Dr Sofia Ioannou",
    title: "Psychologist — Expat & Cross-Cultural Specialist",
    city: "Limassol",
    type: "psychologist",
    approaches: ["Cross-Cultural Psychology", "CBT", "Mindfulness-Based Therapy"],
    languages: ["English", "Greek", "Hebrew"],
    onlineAvailable: true,
    sessionFrom: 75,
    why: "Trained in Israel and the UK; speaks Hebrew, English, and Greek. Specifically experienced with Israeli and UK expats in Limassol and Larnaca. Covers relocation depression, identity issues, third-culture kids, and cross-cultural couple dynamics.",
  },
  {
    name: "Nikos Hadjigeorgiou",
    title: "Psychotherapist",
    city: "Limassol",
    type: "psychotherapist",
    approaches: ["Psychodynamic Psychotherapy", "Existential Therapy"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 70,
    why: "Psychodynamic therapist with a longer-term focus, suitable for those who want deeper exploratory work rather than symptom-focused CBT. Works with expat professionals dealing with career burnout, identity questions, and relational difficulties.",
  },
  // ── Paphos ────────────────────────────────────────────────────────────────
  {
    name: "Dr Rachel Clarke",
    title: "Clinical Psychologist",
    city: "Paphos",
    type: "psychologist",
    approaches: ["CBT", "ACT", "Compassion-Focused Therapy"],
    languages: ["English"],
    onlineAvailable: true,
    sessionFrom: 85,
    why: "British-trained clinical psychologist (DClinPsy, University of Edinburgh) based in Paphos. Specialises in anxiety, depression, and chronic illness adjustment. Fully English-speaking practice — highly recommended by the UK expat community in Paphos and the surrounding villages.",
  },
  {
    name: "Theresa Vann",
    title: "Counsellor & Grief Therapist",
    city: "Paphos",
    type: "counsellor",
    approaches: ["Grief Therapy", "Person-Centred Counselling", "Narrative Therapy"],
    languages: ["English"],
    onlineAvailable: true,
    sessionFrom: 60,
    why: "Specialist in grief, bereavement, and loss — including the non-death losses common to relocation (career loss, loss of community, identity transition). A reassuring presence for older expats navigating significant life change in Paphos.",
  },
  // ── Larnaca ───────────────────────────────────────────────────────────────
  {
    name: "Dr Andri Nicolaou",
    title: "Psychologist",
    city: "Larnaca",
    type: "psychologist",
    approaches: ["CBT", "Family Therapy", "Child & Adolescent Psychology"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 70,
    why: "Covers both adult and child/adolescent presentations. Useful for families relocating with children who need support adjusting to a new country and school environment. Also sees adults individually. Good availability and competitive pricing for Larnaca.",
  },
  {
    name: "Stavros Papadakis",
    title: "Psychotherapist",
    city: "Larnaca",
    type: "psychotherapist",
    approaches: ["Gestalt Therapy", "Existential Psychotherapy", "Mindfulness"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 65,
    why: "Gestalt and existential therapist with a philosophical, depth-oriented approach. Suitable for clients who want to explore meaning, purpose, and life transitions at a deeper level rather than symptom management. Online sessions available.",
  },
];
