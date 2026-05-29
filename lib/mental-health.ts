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
    heading: "EAPN Cyprus and crisis support",
    body: "EAPN Cyprus (the European Anti-Poverty Network Cyprus) operates the island's main mental health support line: 1480 (free, 24/7). For English-language crisis support, Lifeline Cyprus (lifeline.org.cy) offers counselling by phone and email, staffed by trained volunteers. If you or someone you know is in acute crisis, Nicosia General Hospital and Limassol General Hospital both have psychiatric emergency departments. The Athalassa Psychiatric Hospital in Nicosia operates a 24/7 emergency unit.",
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
    name: "Dr Katerina Andreou",
    title: "Clinical Psychologist",
    city: "Limassol",
    type: "psychologist",
    approaches: ["CBT", "Schema Therapy", "ACT"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 80,
    why: "One of Limassol's most established clinical psychologists for expats. Trained in the UK (DClinPsy). Specialises in anxiety, depression, and life transitions — including relocation adjustment. Combines CBT and schema therapy. Long waitlist; book well in advance.",
    website: "https://www.psychologycy.com",
  },
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
  // ── Nicosia ───────────────────────────────────────────────────────────────
  {
    name: "Dr Elena Stylianou",
    title: "Clinical Psychologist",
    city: "Nicosia",
    type: "psychologist",
    approaches: ["CBT", "DBT", "Eating Disorders"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 80,
    why: "Specialist in eating disorders, OCD, and anxiety. Trained at UCL. One of the few therapists in Cyprus with formal eating disorder training recognised at European level. Also covers general depression and anxiety for non-specialist presentations.",
  },
  {
    name: "Dr Marios Papadopoulos",
    title: "Psychiatrist",
    city: "Nicosia",
    type: "psychiatrist",
    approaches: ["Psychopharmacology", "Cognitive Psychiatry", "Autism Assessment"],
    languages: ["English", "Greek"],
    onlineAvailable: false,
    sessionFrom: 160,
    why: "Covers adult ADHD and autism spectrum assessments alongside standard psychiatric conditions. Particularly useful for expats who received a diagnosis abroad and need continuity of care or medication management in Cyprus. Private practice in central Nicosia.",
  },
  {
    name: "Irene Christodoulou",
    title: "Psychotherapist & Art Therapist",
    city: "Nicosia",
    type: "psychotherapist",
    approaches: ["Art Therapy", "Integrative Therapy", "Trauma-Informed Practice"],
    languages: ["English", "Greek", "French"],
    onlineAvailable: true,
    sessionFrom: 65,
    why: "Certified art therapist and integrative psychotherapist. Effective for clients who find conventional talk therapy difficult — particularly those dealing with complex trauma, grief, or non-verbal processing styles. Trilingual in English, Greek, and French.",
  },
  {
    name: "George Vassiliou",
    title: "Counsellor — Expat & Work-Related Stress",
    city: "Nicosia",
    type: "counsellor",
    approaches: ["Solution-Focused Therapy", "Motivational Interviewing", "Stress Management"],
    languages: ["English", "Greek"],
    onlineAvailable: true,
    sessionFrom: 60,
    why: "Focuses on work-related stress, burnout, and relocation adjustment. Particularly popular with professionals and entrepreneurs who have relocated to Cyprus. Online sessions available and flexible hours including evenings.",
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
