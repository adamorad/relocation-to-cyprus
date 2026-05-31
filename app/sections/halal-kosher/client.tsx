"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CERTIFICATIONS,
  ALL_CITIES,
  ALL_VENUE_TYPES,
  CERTIFICATION_LABEL,
  DIETARY_TIPS,
  HALAL_KOSHER_VENUES,
  VENUE_TYPE_LABEL,
  type Certification,
  type City,
  type VenueType,
} from "@/lib/halal-kosher";

const CERTIFICATION_COLOR: Record<Certification, string> = {
  halal: "bg-green-50 border-green-200 text-green-800",
  kosher: "bg-blue-50 border-blue-200 text-blue-800",
  both: "bg-purple-50 border-purple-200 text-purple-800",
};

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

function FilterChip({
  label,
  selected,
  onClick,
  colorClass,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  colorClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
          aria-pressed={selected}
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors border ${
        selected ? colorClass : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

export default function HalalKosherPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [certFilter, setCertFilter] = useState<Certification | "All">("All");
  const [typeFilter, setTypeFilter] = useState<VenueType | "All">("All");

  const visible = HALAL_KOSHER_VENUES.filter((v) => {
    const matchCity = cityFilter === "All" || v.city === cityFilter;
    const matchCert =
      certFilter === "All" ||
      v.certification === certFilter ||
      v.certification === "both";
    const matchType = typeFilter === "All" || v.type === typeFilter;
    return matchCity && matchCert && matchType;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition-colors">← Home</Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Food &amp; Dining
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Halal &amp; Kosher Food in Cyprus
        </h1>
        <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
          Certified halal restaurants, butchers, and grocery stores — and kosher
          dining, meat suppliers, and certified products across Cyprus. A guide
          for Muslim and Jewish residents finding food that meets their dietary
          requirements.
        </p>
        <p className="mt-3 text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
          Always verify current certification directly with the venue before
          relying on it for religious requirements. Certifications can change.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          What to know before you search
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DIETARY_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm"
            >
              <p className="font-bold text-slate-900 mb-1">{tip.heading}</p>
              <p className="text-slate-700 leading-relaxed">{tip.body}</p>
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
          <div className="flex flex-wrap gap-2">
            <CityChip
              label="All cities"
              selected={cityFilter === "All"}
              onClick={() => setCityFilter("All")}
            />
            {ALL_CITIES.map((city) => (
              <CityChip
                key={city}
                label={city}
                selected={cityFilter === city}
                onClick={() => setCityFilter(city)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Certification
          </p>
          <div className="flex flex-wrap gap-2">
            <CityChip
              label="All"
              selected={certFilter === "All"}
              onClick={() => setCertFilter("All")}
            />
            {ALL_CERTIFICATIONS.map((cert) => (
              <FilterChip
                key={cert}
                label={CERTIFICATION_LABEL[cert]}
                selected={certFilter === cert}
                onClick={() => setCertFilter(cert)}
                colorClass={CERTIFICATION_COLOR[cert]}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Type
          </p>
          <div className="flex flex-wrap gap-2">
            <CityChip
              label="All types"
              selected={typeFilter === "All"}
              onClick={() => setTypeFilter("All")}
            />
            {ALL_VENUE_TYPES.map((t) => (
              <CityChip
                key={t}
                label={VENUE_TYPE_LABEL[t]}
                selected={typeFilter === t}
                onClick={() => setTypeFilter(t)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {visible.length === 0
          ? "No venues match your filters."
          : `${visible.length} venue${visible.length === 1 ? "" : "s"} found`}
      </p>

      {/* Venue cards */}
      {visible.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((venue) => (
            <article
              key={`${venue.name}-${venue.city}`}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {venue.name}
                  </h3>
                  <span
                    className={`rounded-full border text-[10px] px-2 py-0.5 font-semibold shrink-0 ${CERTIFICATION_COLOR[venue.certification]}`}
                  >
                    {CERTIFICATION_LABEL[venue.certification]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {venue.city}
                  {venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
                  {" · "}
                  <span className="capitalize">{venue.type}</span>
                  {venue.cuisine ? ` · ${venue.cuisine}` : ""}
                </p>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {venue.why}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 border-t border-slate-100 pt-2 mt-1">
                {venue.phone && (
                  <a
                    href={`tel:${venue.phone}`}
                    className="text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    {venue.phone}
                  </a>
                )}
                {venue.website && (
                  <a
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-900 font-semibold"
                  >
                    Website ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Footer nav */}
      <p className="mt-12 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900 transition-colors">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
