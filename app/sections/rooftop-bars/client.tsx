"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_VIEW_TYPES,
  VIEW_BAR_TIPS,
  VIEW_BARS,
  VIEW_TYPE_LABEL,
  type City,
  type ViewType,
} from "@/lib/rooftop-bars";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function priceStr(range: 1 | 2 | 3 | 4): string {
  return "€".repeat(range);
}

// ---------------------------------------------------------------------------
// City Chip
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

// ---------------------------------------------------------------------------
// View Type Chip
// ---------------------------------------------------------------------------

function ViewTypeChip({
  viewType,
  selected,
  onClick,
}: {
  viewType: ViewType | "All";
  selected: boolean;
  onClick: () => void;
}) {
  const label =
    viewType === "All" ? "All Views" : VIEW_TYPE_LABEL[viewType];
  return (
    <button
      type="button"
      onClick={onClick}
          aria-pressed={selected}
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-[#35cdc4] text-white border border-[#35cdc4]"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Bar Card
// ---------------------------------------------------------------------------

function ViewBarCard({ bar }: { bar: (typeof VIEW_BARS)[number] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-slate-900 leading-snug">{bar.name}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {bar.city}
            {bar.neighbourhood ? ` · ${bar.neighbourhood}` : ""}
          </p>
        </div>
        <span className="flex-shrink-0 text-xs font-semibold text-amber-700">
          {priceStr(bar.priceRange)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
          {VIEW_TYPE_LABEL[bar.viewType]}
        </span>
        {bar.reservationRequired && (
          <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
            Reservation required
          </span>
        )}
        {bar.cocktailsFrom !== undefined && (
          <span className="rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
            Cocktails from €{bar.cocktailsFrom}
          </span>
        )}
      </div>

      <p className="text-slate-700 leading-relaxed text-xs">{bar.why}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold mt-1">
        {bar.website && (
          <a
            href={bar.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#35cdc4] hover:text-teal-700"
          >
            Website ↗
          </a>
        )}
        {bar.instagram && (
          <a
            href={bar.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800"
          >
            Instagram ↗
          </a>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RooftopBarsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [viewFilter, setViewFilter] = useState<ViewType | "All">("All");

  const filtered = VIEW_BARS.filter(
    (bar) =>
      (cityFilter === "All" || bar.city === cityFilter) &&
      (viewFilter === "All" || bar.viewType === viewFilter),
  );

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-14">
      {/* Back nav */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">← Home</Link>
        {" / "}
        <Link href="/" className="hover:text-slate-900">
          ← Explore
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Cyprus Lifestyle
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Rooftop &amp; Sea View Bars in Cyprus
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
          The best elevated and waterfront bars across Cyprus — for sundowners,
          cocktail evenings, and getting a feel for the city from above.
          {" "}
          {VIEW_BARS.length} venues across all five cities.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VIEW_BAR_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs"
            >
              <p className="font-bold text-sm text-slate-900 mb-1.5">
                {tip.heading}
              </p>
              <p className="text-slate-700 leading-relaxed">{tip.body}</p>
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

      {/* View type filter */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        {(["All", ...ALL_VIEW_TYPES] as const).map((v) => (
          <ViewTypeChip
            key={v}
            viewType={v}
            selected={viewFilter === v}
            onClick={() => setViewFilter(v)}
          />
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-100 px-4 py-6 text-center">
          No bars match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bar) => (
            <ViewBarCard key={`${bar.name}-${bar.city}`} bar={bar} />
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-slate-500">
        Prices and reservation policies change seasonally. Always verify
        directly with the venue before visiting.
      </p>
    </main>
  );
}
