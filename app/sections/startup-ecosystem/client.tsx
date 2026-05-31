"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_STARTUP_VENUE_TYPES,
  STARTUP_TIPS,
  STARTUP_VENUES,
  STARTUP_VENUE_TYPE_LABEL,
  type City,
  type StartupVenueType,
} from "@/lib/startup-ecosystem";

// ---------------------------------------------------------------------------
// Chip helpers
// ---------------------------------------------------------------------------

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
          ? "bg-teal-600 text-white border border-teal-600"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StartupEcosystemPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<StartupVenueType | "All">("All");

  const visible = STARTUP_VENUES.filter(
    (v) =>
      (cityFilter === "All" || v.city === cityFilter) &&
      (typeFilter === "All" || v.type === typeFilter),
  );

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-800">
          ← Explore
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Startup Ecosystem
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Startup Ecosystem
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          Coworking spaces, incubators, accelerators and tech hubs across
          Cyprus — with focus areas and membership pricing.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        {STARTUP_TIPS.map((tip) => (
          <div
            key={tip.heading}
            className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs"
          >
            <p className="font-bold text-sm text-slate-900 mb-1.5">
              {tip.heading}
            </p>
            <p className="text-slate-700 leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </section>

      {/* City filter */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {(["All", ...ALL_CITIES] as const).map((c) => (
          <CityChip
            key={c}
            city={c}
            selected={cityFilter === c}
            onClick={() => setCityFilter(c)}
          />
        ))}
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <TypeChip
          label="All types"
          selected={typeFilter === "All"}
          onClick={() => setTypeFilter("All")}
        />
        {ALL_STARTUP_VENUE_TYPES.map((t) => (
          <TypeChip
            key={t}
            label={STARTUP_VENUE_TYPE_LABEL[t]}
            selected={typeFilter === t}
            onClick={() => setTypeFilter(t)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {visible.length === 0
          ? "No venues match these filters."
          : `${visible.length} venue${visible.length === 1 ? "" : "s"}`}
      </p>

      {/* Card grid */}
      {visible.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((venue) => (
            <li
              key={venue.name}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-teal-700 bg-teal-50 rounded px-1.5 py-0.5 mb-1">
                  {STARTUP_VENUE_TYPE_LABEL[venue.type]}
                </span>
                <p className="font-bold text-sm text-slate-900">{venue.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {venue.city}
                  {venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
                </p>
              </div>

              {venue.focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {venue.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {venue.why}
              </p>

              <div className="flex items-center justify-between mt-1">
                {venue.membershipFrom != null ? (
                  <p className="text-[11px] text-slate-500">
                    From{" "}
                    <span className="font-semibold text-slate-800">
                      €{venue.membershipFrom}/mo
                    </span>
                  </p>
                ) : (
                  <span />
                )}
                {venue.website && (
                  <a
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-amber-700 hover:text-amber-900"
                  >
                    Website ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-12 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to Explore
        </Link>
      </p>
    </main>
  );
}
