"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  WINERIES,
  WINE_TIPS,
  type City,
} from "@/lib/wineries";

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

const PRICE_LABEL: Record<1 | 2 | 3, string> = {
  1: "€ Budget",
  2: "€€ Mid",
  3: "€€€ Premium",
};

export default function WineriesPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [tastingFilter, setTastingFilter] = useState<boolean | "All">("All");

  const filtered = WINERIES.filter((winery) => {
    const cityMatch = cityFilter === "All" || winery.city === cityFilter;
    const tastingMatch =
      tastingFilter === "All" || winery.tastingAvailable === tastingFilter;
    return cityMatch && tastingMatch;
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
          Wine Tourism
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Wineries & Wine Tourism in Cyprus — From Commandaria Country
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          The Troodos foothills produce some of the Mediterranean's most
          distinctive wines. Indigenous varieties, ancient traditions, and a
          wine route through some of Cyprus's most beautiful villages.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        {WINE_TIPS.map((tip) => (
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

      {/* Tasting filter */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        <CityChip
          label="All wineries"
          selected={tastingFilter === "All"}
          onClick={() => setTastingFilter("All")}
        />
        <CityChip
          label="Tasting available"
          selected={tastingFilter === true}
          onClick={() => setTastingFilter(true)}
        />
        <CityChip
          label="Restaurant on site"
          selected={tastingFilter === "All"}
          onClick={() => {}}
        />
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} {filtered.length !== 1 ? "wineries" : "winery"} shown
        {cityFilter !== "All" ? ` in ${cityFilter} district` : ""}
        {tastingFilter === true ? " · tastings available" : ""}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-5 py-4">
          No wineries found for the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((winery) => (
            <article
              key={`${winery.name}-${winery.city}`}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">
                  {winery.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {winery.city} district
                  {winery.village ? (
                    <>
                      <span className="mx-1 text-slate-300">·</span>
                      {winery.village}
                    </>
                  ) : null}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700">
                  {PRICE_LABEL[winery.priceRange]}
                </span>
                {winery.tastingAvailable && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#35cdc4]/10 text-[#2aada5]">
                    Tastings
                  </span>
                )}
                {winery.tourAvailable && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700">
                    Tours
                  </span>
                )}
                {winery.restaurantOnSite && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-green-50 text-green-700">
                    Restaurant
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                <span className="font-medium">Grapes: </span>
                {winery.grapeVarieties.join(", ")}
              </p>

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {winery.why}
              </p>

              {winery.website && (
                <a
                  href={winery.website}
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
