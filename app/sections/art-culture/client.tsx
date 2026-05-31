"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_VENUE_TYPES,
  CULTURAL_VENUES,
  CULTURE_TIPS,
  VENUE_TYPE_LABEL,
  type City,
  type VenueType,
} from "@/lib/art-culture";

function CityChip({
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

export default function ArtCulturePage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<VenueType | "All">("All");

  const filtered = CULTURAL_VENUES.filter((venue) => {
    const cityMatch = cityFilter === "All" || venue.city === cityFilter;
    const typeMatch = typeFilter === "All" || venue.type === typeFilter;
    return cityMatch && typeMatch;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Back nav */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">← Home</Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Art & Culture
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Art Galleries, Museums & Cultural Venues in Cyprus
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          From the Cyprus Museum's 8,000 years of artefacts to Limassol's
          thriving contemporary galleries — the cultural institutions worth
          knowing as a new resident.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        {CULTURE_TIPS.map((tip) => (
          <div
            key={tip.heading}
            className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm"
          >
            <p className="font-bold text-slate-900">{tip.heading}</p>
            <p className="mt-1.5 text-slate-700 leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </section>

      {/* City filter */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(["All", ...ALL_CITIES] as const).map((c) => (
          <CityChip
            key={c}
            label={c}
            selected={cityFilter === c}
            onClick={() => setCityFilter(c)}
          />
        ))}
      </div>

      {/* Type filter */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        {(["All", ...ALL_VENUE_TYPES] as const).map((t) => (
          <CityChip
            key={t}
            label={t === "All" ? "All Types" : VENUE_TYPE_LABEL[t]}
            selected={typeFilter === t}
            onClick={() => setTypeFilter(t)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} venue{filtered.length !== 1 ? "s" : ""} shown
        {cityFilter !== "All" ? ` in ${cityFilter}` : ""}
        {typeFilter !== "All" ? ` · ${VENUE_TYPE_LABEL[typeFilter]}` : ""}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-5 py-4">
          No venues found for the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((venue) => (
            <article
              key={`${venue.name}-${venue.city}`}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">
                  {venue.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {venue.city}
                  {venue.neighbourhood ? (
                    <>
                      <span className="mx-1 text-slate-300">·</span>
                      {venue.neighbourhood}
                    </>
                  ) : null}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#35cdc4]/10 text-[#2aada5]">
                  {VENUE_TYPE_LABEL[venue.type]}
                </span>
                {venue.admissionEuros !== undefined && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700">
                    {venue.admissionEuros === 0
                      ? "Free entry"
                      : `€${venue.admissionEuros}`}
                  </span>
                )}
                {venue.englishSupport && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700">
                    English
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                {venue.highlights}
              </p>

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {venue.why}
              </p>

              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 mt-auto"
                >
                  Website ↗
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
