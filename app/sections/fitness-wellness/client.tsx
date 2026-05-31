"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_FITNESS_TYPES,
  FITNESS_TYPE_LABEL,
  FITNESS_TIPS,
  FITNESS_VENUES,
  type City,
  type FitnessType,
} from "@/lib/fitness-wellness";

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

function TypeChip({
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
          ? "bg-slate-900 text-white border border-slate-900"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

export default function FitnessWellnessPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<FitnessType | "All">("All");

  const filtered = FITNESS_VENUES.filter(
    (v) =>
      (cityFilter === "All" || v.city === cityFilter) &&
      (typeFilter === "All" || v.type === typeFilter),
  );

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">← Home</Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Fitness &amp; Wellness
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Gyms, Fitness Studios &amp; Wellness in Cyprus
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
          From CrossFit boxes to yoga studios, padel clubs, and hotel spas —
          a curated directory of fitness and wellness venues for relocators
          across all five cities.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
          Fitness in Cyprus — what to know
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FITNESS_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm"
            >
              <p className="font-bold text-slate-900">{tip.heading}</p>
              <p className="mt-1.5 text-slate-600 leading-relaxed text-xs">
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="mb-6 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            City
          </p>
          <div className="flex flex-wrap gap-1.5">
            <CityChip
              city="All"
              selected={cityFilter === "All"}
              onClick={() => setCityFilter("All")}
            />
            {ALL_CITIES.map((c) => (
              <CityChip
                key={c}
                city={c}
                selected={cityFilter === c}
                onClick={() => setCityFilter(c)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Type
          </p>
          <div className="flex flex-wrap gap-1.5">
            <TypeChip
              label="All types"
              selected={typeFilter === "All"}
              onClick={() => setTypeFilter("All")}
            />
            {ALL_FITNESS_TYPES.map((t) => (
              <TypeChip
                key={t}
                label={FITNESS_TYPE_LABEL[t]}
                selected={typeFilter === t}
                onClick={() => setTypeFilter(t)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length === 0
          ? "No venues match the current filters."
          : `${filtered.length} venue${filtered.length === 1 ? "" : "s"}`}
      </p>

      {/* Card grid */}
      {filtered.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((venue) => (
            <li
              key={`${venue.name}-${venue.city}`}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">
                  {venue.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {venue.city}
                  {venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
                  {" · "}
                  <span className="text-teal-600 font-semibold">
                    {FITNESS_TYPE_LABEL[venue.type]}
                  </span>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {venue.why}
              </p>

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
                {venue.monthlyFrom !== undefined && (
                  <span>
                    Monthly from{" "}
                    <span className="font-semibold text-slate-700">
                      €{venue.monthlyFrom}
                    </span>
                  </span>
                )}
                {venue.dropInFrom !== undefined && (
                  <span>
                    Drop-in from{" "}
                    <span className="font-semibold text-slate-700">
                      €{venue.dropInFrom}
                    </span>
                  </span>
                )}
                {venue.englishSpoken && (
                  <span className="text-teal-600 font-semibold">
                    English spoken
                  </span>
                )}
              </div>

              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold text-amber-700 hover:text-amber-900"
                >
                  Website ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Footer nav */}
      <p className="mt-12 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
