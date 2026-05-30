"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_RENTAL_TYPES,
  RENTAL_LISTINGS,
  RENTAL_TIPS,
  RENTAL_TYPE_LABEL,
  FURNISHED_LABEL,
  type City,
  type RentalType,
  type FurnishedStatus,
} from "@/lib/long-term-rentals";

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

function FilterChip({
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

const ALL_FURNISHED: ReadonlyArray<FurnishedStatus> = [
  "furnished",
  "unfurnished",
  "both",
];

export default function LongTermRentalsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<RentalType | "All">("All");
  const [furnishedFilter, setFurnishedFilter] = useState<
    FurnishedStatus | "All"
  >("All");

  const filtered = RENTAL_LISTINGS.filter((r) => {
    if (cityFilter !== "All" && r.city !== cityFilter) return false;
    if (typeFilter !== "All" && r.type !== typeFilter) return false;
    if (furnishedFilter !== "All") {
      if (furnishedFilter === "furnished" && r.furnished === "unfurnished")
        return false;
      if (furnishedFilter === "unfurnished" && r.furnished === "furnished")
        return false;
    }
    return true;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
      {/* Back nav */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          ← Explore
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Long-Term Rentals
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
          Long-Term Rentals in Cyprus
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-2xl">
          Monthly furnished and unfurnished rentals across all five cities —
          from city-centre studios to seafront villas. Real areas, real price
          ranges, and links to the main Cypriot rental portals.
        </p>
      </header>

      {/* Tips section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Before you search</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {RENTAL_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs"
            >
              <p className="font-bold text-sm text-slate-900">{tip.heading}</p>
              <p className="mt-1.5 text-slate-700 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="mb-8 space-y-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
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
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Property type
          </p>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              label="All types"
              selected={typeFilter === "All"}
              onClick={() => setTypeFilter("All")}
            />
            {ALL_RENTAL_TYPES.map((t) => (
              <FilterChip
                key={t}
                label={RENTAL_TYPE_LABEL[t]}
                selected={typeFilter === t}
                onClick={() => setTypeFilter(t)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Furnished
          </p>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              label="All"
              selected={furnishedFilter === "All"}
              onClick={() => setFurnishedFilter("All")}
            />
            {ALL_FURNISHED.map((f) => (
              <FilterChip
                key={f}
                label={FURNISHED_LABEL[f]}
                selected={furnishedFilter === f}
                onClick={() => setFurnishedFilter(f)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
        {cityFilter !== "All" ? ` in ${cityFilter}` : " across all cities"}
      </p>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
          No listings match the current filters. Try widening the city or type
          filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((listing) => (
            <article
              key={`${listing.name}-${listing.neighbourhood ?? ""}`}
              className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col text-xs"
            >
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-900">
                  {listing.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {listing.city}
                  {listing.neighbourhood ? ` · ${listing.neighbourhood}` : ""}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 capitalize">
                    {RENTAL_TYPE_LABEL[listing.type]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {listing.bedroomsFrom === 0 && listing.bedroomsTo <= 1
                      ? "Studio / 1-bed"
                      : listing.bedroomsFrom === listing.bedroomsTo
                        ? `${listing.bedroomsFrom} bed`
                        : `${listing.bedroomsFrom}–${listing.bedroomsTo} bed`}
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    {FURNISHED_LABEL[listing.furnished]}
                  </span>
                  {listing.petFriendly && (
                    <span className="rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                      Pet-friendly
                    </span>
                  )}
                </div>
                <p className="mt-3 text-slate-700 leading-relaxed">
                  {listing.why}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <p className="font-bold text-sm text-slate-900">
                  €{listing.monthlyFrom.toLocaleString()}
                  {listing.monthlyTo !== listing.monthlyFrom
                    ? `–€${listing.monthlyTo.toLocaleString()}`
                    : ""}
                  <span className="font-normal text-slate-500 text-[10px]">
                    {" "}
                    / month
                  </span>
                </p>
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold text-amber-700 hover:text-amber-900"
                  >
                    Browse listings ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-12 text-xs text-slate-600">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
