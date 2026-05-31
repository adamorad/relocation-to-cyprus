"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  LAWYER_TIPS,
  PROPERTY_LAWYERS,
  type City,
  type PropertyLawyer,
} from "@/lib/property-lawyers";

function CityChip({
  city,
  selected,
  onClick,
}: {
  city: City | "All";
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
          aria-pressed={selected}
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-slate-900 text-white border border-slate-900"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {city}
    </button>
  );
}

function SpecChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
          aria-pressed={selected}
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-amber-700 text-white border border-amber-700"
          : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
      }`}
    >
      {label}
    </button>
  );
}

const ALL_SPECIALIZATIONS = [
  "conveyancing",
  "title deed transfer",
  "new-build contracts",
  "foreign buyer representation",
  "mortgage assistance",
  "due diligence",
  "title deed disputes",
  "off-plan purchases",
  "PR by investment",
  "resale properties",
  "Council of Ministers approval",
  "commercial property",
  "inheritance and succession",
  "buy-to-let",
  "short-term rental registration",
] as const;

function LawyerCard({ lawyer }: { lawyer: PropertyLawyer }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
            {lawyer.name}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {lawyer.firm}
          </p>
        </div>
        <span className="flex-shrink-0 rounded-full bg-teal-50 border border-teal-200 text-[#35cdc4] text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
          {lawyer.city}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700 leading-relaxed">{lawyer.why}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {lawyer.specializations.map((s) => (
          <span
            key={s}
            className="rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        <span className="text-slate-500">
          <span className="font-semibold text-slate-700">Languages:</span>{" "}
          {lawyer.languages.join(", ")}
        </span>
        {lawyer.website && (
          <a
            href={lawyer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-700 hover:text-amber-900"
          >
            Website ↗
          </a>
        )}
        {lawyer.phone && (
          <a
            href={`tel:${lawyer.phone}`}
            className="font-semibold text-slate-700 hover:text-slate-900"
          >
            {lawyer.phone}
          </a>
        )}
      </div>
    </div>
  );
}

export default function PropertyLawyersPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [specFilter, setSpecFilter] = useState<string | "All">("All");

  const visible = PROPERTY_LAWYERS.filter((l) => {
    const cityMatch = cityFilter === "All" || l.city === cityFilter;
    const specMatch =
      specFilter === "All" ||
      l.specializations.some((s) =>
        s.toLowerCase().includes(specFilter.toLowerCase()),
      );
    return cityMatch && specMatch;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-800 transition-colors">← Home</Link>
        {" / "}
        <Link href="/explore" className="hover:text-slate-800 transition-colors">
          Explore
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Professional Services
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Property Lawyers in Cyprus — Vetted Directory
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
          Conveyancing solicitors experienced with foreign buyers, title deed
          transfers, and new-build contracts across all Cyprus cities.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          This is a directory, not legal advice. Always verify Bar Association
          registration and fee structures directly with the firm.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3">
          Before you engage a property lawyer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LAWYER_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm"
            >
              <p className="font-bold text-slate-900 text-sm">{tip.heading}</p>
              <p className="mt-1.5 text-slate-700 leading-relaxed text-xs">
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* City filter */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(["All", ...ALL_CITIES] as const).map((c) => (
          <CityChip
            key={c}
            city={c}
            selected={cityFilter === c}
            onClick={() => setCityFilter(c)}
          />
        ))}
      </div>

      {/* Specialization filter */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        <SpecChip
          label="All specializations"
          selected={specFilter === "All"}
          onClick={() => setSpecFilter("All")}
        />
        {ALL_SPECIALIZATIONS.map((s) => (
          <SpecChip
            key={s}
            label={s}
            selected={specFilter === s}
            onClick={() => setSpecFilter(s === specFilter ? "All" : s)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400 mb-4">
        Showing {visible.length} lawyer{visible.length !== 1 ? "s" : ""}
        {cityFilter !== "All" ? ` in ${cityFilter}` : ""}
        {specFilter !== "All" ? ` · ${specFilter}` : ""}
      </p>

      {/* Card grid */}
      {visible.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
          No lawyers match the selected filters. Try removing a filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((lawyer) => (
            <LawyerCard key={`${lawyer.name}-${lawyer.firm}`} lawyer={lawyer} />
          ))}
        </div>
      )}
    </main>
  );
}
