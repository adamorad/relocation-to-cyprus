"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  PROPERTY_MANAGERS,
  PROPERTY_MANAGEMENT_TIPS,
  type City,
} from "@/lib/property-management";

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

export default function PropertyManagementPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");

  const filtered = PROPERTY_MANAGERS.filter(
    (m) => cityFilter === "All" || m.cities.includes(cityFilter),
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
          Property Management
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
          Property Management Companies in Cyprus
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-2xl">
          Licensed property managers across Limassol, Paphos, Larnaca, and
          Nicosia — for non-resident owners who need trusted local management
          of their Cyprus investment.
        </p>
      </header>

      {/* Tips section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">What to check before you engage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROPERTY_MANAGEMENT_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs"
            >
              <p className="font-bold text-sm text-slate-900">{tip.heading}</p>
              <p className="mt-1.5 text-slate-700 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-slate-700">
          <span className="font-semibold text-slate-900">Verify any agent: </span>
          The Cyprus Real Estate Agents Registration Council (RERA) register is
          searchable at{" "}
          <a
            href="https://realestate.gov.cy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 underline font-semibold"
          >
            realestate.gov.cy
          </a>
          . Always cross-check the company AND individual agent name before
          signing any management agreement.
        </div>
      </section>

      {/* City filter */}
      <section className="mb-8">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Filter by city served
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
        {filtered.length} compan{filtered.length !== 1 ? "ies" : "y"}
        {cityFilter !== "All" ? ` serving ${cityFilter}` : " island-wide"}
      </p>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
          No property managers listed for {cityFilter} yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((manager) => (
            <article
              key={manager.name}
              className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col text-xs"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-sm text-slate-900">
                    {manager.name}
                  </p>
                  {manager.licensedByRERA && (
                    <span className="flex-shrink-0 rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                      RERA Licensed
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {manager.cities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-slate-700 leading-relaxed">
                  {manager.why}
                </p>
              </div>
              {manager.website && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <a
                    href={manager.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold text-amber-700 hover:text-amber-900"
                  >
                    Website ↗
                  </a>
                </div>
              )}
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
