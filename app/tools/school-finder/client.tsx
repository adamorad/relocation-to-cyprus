"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── data ──────────────────────────────────────────────────────────────────────

interface School {
  name: string;
  branch?: string;
  city: string;
  curricula: string[];
  ageRange: string;
  fees: string;
  type: string;
  notes: string;
}

const SCHOOLS: School[] = [
  {
    name: "The Grammar School",
    branch: "Limassol branch",
    city: "Limassol",
    curricula: ["British", "GCSE", "A-Level"],
    ageRange: "4-18",
    fees: "EUR 6,000–14,000/yr",
    type: "Private day",
    notes:
      "Long-established British school. Strong academics and sports.",
  },
  {
    name: "Heritage Private School",
    city: "Limassol",
    curricula: ["British", "IB"],
    ageRange: "3-18",
    fees: "EUR 7,000–16,000/yr",
    type: "Private day",
    notes:
      "IB Diploma Programme. Large expat community. Strong pastoral care.",
  },
  {
    name: "Pascal English School",
    city: "Limassol",
    curricula: ["British", "GCSE", "A-Level"],
    ageRange: "11-18",
    fees: "EUR 5,000–9,000/yr",
    type: "Private day",
    notes:
      "Secondary only. Strong academic results. Popular with local and expat families.",
  },
  {
    name: "Logos School of English Education",
    city: "Limassol",
    curricula: ["British"],
    ageRange: "3-18",
    fees: "EUR 4,500–8,000/yr",
    type: "Private day",
    notes: "Established all-through school. Nurturing environment.",
  },
  {
    name: "Foley's School",
    city: "Limassol",
    curricula: ["British"],
    ageRange: "4-11",
    fees: "EUR 4,000–7,000/yr",
    type: "Private day",
    notes: "Primary school only. Known for small class sizes.",
  },
  {
    name: "Neue Deutsche Schule Limassol",
    city: "Limassol",
    curricula: ["German", "IB"],
    ageRange: "4-18",
    fees: "EUR 5,000–10,000/yr",
    type: "Private day",
    notes:
      "German curriculum with IB option. Growing community. Bilingual German/English.",
  },
  {
    name: "Russian International School (RISE)",
    city: "Limassol",
    curricula: ["Russian", "IB"],
    ageRange: "4-18",
    fees: "EUR 4,000–9,000/yr",
    type: "Private day",
    notes:
      "Russian-language instruction alongside English. IB option available.",
  },
  {
    name: "Montessori School Limassol",
    city: "Limassol",
    curricula: ["Montessori"],
    ageRange: "3-6",
    fees: "EUR 3,000–5,000/yr",
    type: "Alternative preschool",
    notes: "Preschool only. Small, internationally-minded community.",
  },
  {
    name: "International School of Paphos (ISP)",
    city: "Paphos",
    curricula: ["British", "GCSE", "A-Level"],
    ageRange: "3-18",
    fees: "EUR 5,000–11,000/yr",
    type: "Private day",
    notes:
      "The main international school in Paphos. Popular with expat families in the region.",
  },
  {
    name: "Silver Birch International School",
    city: "Paphos",
    curricula: ["British"],
    ageRange: "3-11",
    fees: "EUR 4,500–7,500/yr",
    type: "Private day",
    notes: "Primary years only. Small class sizes. Nurturing environment.",
  },
  {
    name: "Paphos Waldorf School",
    city: "Paphos",
    curricula: ["Waldorf"],
    ageRange: "4-12",
    fees: "EUR 3,000–6,000/yr",
    type: "Alternative",
    notes:
      "Holistic Waldorf education. Small, community-oriented. Bilingual Greek/English.",
  },
  {
    name: "Lycee Francais de Nicosie",
    city: "Paphos",
    curricula: ["French"],
    ageRange: "4-18",
    fees: "EUR 5,000–11,000/yr",
    type: "Private day",
    notes: "French curriculum. Accredited by the French Ministry of Education.",
  },
  {
    name: "Larnaca English School",
    city: "Larnaca",
    curricula: ["British", "GCSE"],
    ageRange: "4-16",
    fees: "EUR 4,000–8,000/yr",
    type: "Private day",
    notes:
      "Main English-language school in Larnaca. Well-regarded by the expat community.",
  },
  {
    name: "Ayia Napa International School",
    city: "Ayia Napa",
    curricula: ["British"],
    ageRange: "4-16",
    fees: "EUR 4,000–7,500/yr",
    type: "Private day",
    notes:
      "Serves the eastern Cyprus expat community around Famagusta district.",
  },
];

// ── filter helpers ────────────────────────────────────────────────────────────

const CITIES = ["All", "Limassol", "Paphos", "Larnaca", "Ayia Napa"] as const;
type City = (typeof CITIES)[number];

const CURRICULA_OPTIONS = [
  "British",
  "IB",
  "German",
  "French",
  "Russian",
  "Waldorf",
  "Montessori",
] as const;
type Curriculum = (typeof CURRICULA_OPTIONS)[number];

const AGE_GROUPS = [
  { label: "All ages", value: "all" },
  { label: "Early years (3-6)", value: "early" },
  { label: "Primary (5-11)", value: "primary" },
  { label: "Secondary (11-18)", value: "secondary" },
] as const;
type AgeGroup = (typeof AGE_GROUPS)[number]["value"];

function ageRangeOverlaps(schoolRange: string, group: AgeGroup): boolean {
  if (group === "all") return true;
  const [lo, hi] = schoolRange.split("-").map(Number);
  if (group === "early") return lo <= 6 && hi >= 3;
  if (group === "primary") return lo <= 11 && hi >= 5;
  if (group === "secondary") return lo <= 18 && hi >= 11;
  return true;
}

// ── city badge colour map ─────────────────────────────────────────────────────

const CITY_COLOURS: Record<string, string> = {
  Limassol: "bg-blue-100 text-blue-800",
  Paphos: "bg-purple-100 text-purple-800",
  Larnaca: "bg-orange-100 text-orange-800",
  "Ayia Napa": "bg-green-100 text-green-800",
};

// ── sub-components ────────────────────────────────────────────────────────────

function CurriculumPill({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
      {label}
    </span>
  );
}

function SchoolCard({ school }: { school: School }) {
  const cityColour = CITY_COLOURS[school.city] ?? "bg-slate-100 text-slate-700";
  return (
    <article className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* name + badges */}
      <div>
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {school.name}
          {school.branch && (
            <span className="font-normal text-slate-500 text-sm">
              {" "}
              — {school.branch}
            </span>
          )}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${cityColour}`}
          >
            {school.city}
          </span>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
            {school.type}
          </span>
        </div>
      </div>

      {/* curriculum pills */}
      <div className="flex flex-wrap gap-1">
        {school.curricula.map((c) => (
          <CurriculumPill key={c} label={c} />
        ))}
      </div>

      {/* age + fees */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-600">
        <span>
          <span className="font-semibold text-slate-800">Ages:</span>{" "}
          {school.ageRange}
        </span>
        <span>
          <span className="font-semibold text-slate-800">Fees:</span>{" "}
          {school.fees}
        </span>
      </div>

      {/* notes */}
      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
        {school.notes}
      </p>
    </article>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function SchoolFinderClient() {
  const [city, setCity] = useState<City>("All");
  const [curricula, setCurricula] = useState<Set<Curriculum>>(new Set());
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("all");

  function toggleCurriculum(c: Curriculum) {
    setCurricula((prev) => {
      const next = new Set(prev);
      if (next.has(c)) {
        next.delete(c);
      } else {
        next.add(c);
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      if (city !== "All" && s.city !== city) return false;
      if (
        curricula.size > 0 &&
        !s.curricula.some((c) => curricula.has(c as Curriculum))
      )
        return false;
      if (!ageRangeOverlaps(s.ageRange, ageGroup)) return false;
      return true;
    });
  }, [city, curricula, ageGroup]);

  return (
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      {/* breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">International School Finder</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Family
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          International School Finder
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Find and compare international schools in Cyprus. Filter by city,
          curriculum, and age group to shortlist the right options for your
          family.
        </p>
      </header>

      {/* filters */}
      <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-6 flex flex-col gap-5">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider -mb-1">
          Filters
        </h2>

        {/* city */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            City
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  city === c
                    ? "bg-[#35cdc4] text-slate-900"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#35cdc4]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* curriculum */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Curriculum{" "}
            <span className="text-slate-400 normal-case font-normal">
              (select multiple)
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {CURRICULA_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCurriculum(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  curricula.has(c)
                    ? "bg-teal-600 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-teal-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* age group */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Age group
          </p>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setAgeGroup(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  ageGroup === value
                    ? "bg-[#35cdc4] text-slate-900"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#35cdc4]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* clear filters */}
        {(city !== "All" || curricula.size > 0 || ageGroup !== "all") && (
          <button
            type="button"
            onClick={() => {
              setCity("All");
              setCurricula(new Set());
              setAgeGroup("all");
            }}
            className="self-start text-xs text-slate-500 underline hover:text-slate-900"
          >
            Clear all filters
          </button>
        )}
      </section>

      {/* result count */}
      <p className="text-sm text-slate-600 mb-4">
        Showing{" "}
        <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
        school{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* school grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {filtered.map((school) => (
            <SchoolCard key={school.name} school={school} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-500 text-sm bg-slate-50 rounded-xl border border-slate-200 mb-8">
          No schools match the current filters.{" "}
          <button
            type="button"
            onClick={() => {
              setCity("All");
              setCurricula(new Set());
              setAgeGroup("all");
            }}
            className="underline hover:text-slate-900"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* fees info box */}
      <aside className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">About fees</p>
        <p>
          Fees are indicative for 2025. Contact schools directly for current fee
          schedules and availability. Some schools charge registration and
          capital levy fees on top of tuition.
        </p>
      </aside>

      {/* disclaimer */}
      <aside className="mt-4 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          General information only — not legal, tax, or financial advice. This
          list is curated but not exhaustive. Several smaller and local private
          schools are not included. Always verify details directly with each
          school before making any decisions.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          &larr; Back to Tools
        </Link>
      </p>
    </main>
  );
}
