"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  CO_LIVING_LISTINGS,
  CO_LIVING_TIPS,
  type City,
} from "@/lib/co-living";

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

export default function CoLivingPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");

  const filtered = CO_LIVING_LISTINGS.filter(
    (s) => cityFilter === "All" || s.city === cityFilter,
  );

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
          Co-Living
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
          Co-Living &amp; Serviced Apartments in Cyprus
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-2xl">
          Month-to-month furnished spaces with utilities and WiFi included —
          for digital nomads, relocators, and professionals who want flexibility
          before committing to a long-term lease.
        </p>
      </header>

      {/* Tips section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Co-living vs renting</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CO_LIVING_TIPS.map((tip) => (
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

      {/* City filter */}
      <section className="mb-8">
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
      </section>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} space{filtered.length !== 1 ? "s" : ""}
        {cityFilter !== "All" ? ` in ${cityFilter}` : " across all cities"}
      </p>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
          No co-living spaces listed for {cityFilter} yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((space) => (
            <article
              key={`${space.name}-${space.city}`}
              className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col text-xs"
            >
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-900">{space.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {space.city}
                  {space.neighbourhood ? ` · ${space.neighbourhood}` : ""}
                </p>
                <p className="mt-3 text-slate-700 leading-relaxed">
                  {space.why}
                </p>
                {space.includes.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                      Included
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {space.includes.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-[10px] text-teal-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <p className="font-bold text-sm text-slate-900">
                  €{space.monthlyFrom.toLocaleString()}
                  {space.monthlyTo !== space.monthlyFrom
                    ? `–€${space.monthlyTo.toLocaleString()}`
                    : ""}
                  <span className="font-normal text-slate-500 text-[10px]">
                    {" "}
                    / month
                  </span>
                </p>
                {space.website && (
                  <a
                    href={space.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold text-amber-700 hover:text-amber-900"
                  >
                    View ↗
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
