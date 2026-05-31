"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_SPORTS,
  SPORTS_CLUBS,
  SPORTS_TIPS,
  type City,
} from "@/lib/sports-clubs";

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

export default function SportsClubsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [sportFilter, setSportFilter] = useState<string>("All");

  const filtered = SPORTS_CLUBS.filter((club) => {
    const cityMatch = cityFilter === "All" || club.city === cityFilter;
    const sportMatch = sportFilter === "All" || club.sport === sportFilter;
    return cityMatch && sportMatch;
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
          Sports & Recreation
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Sports & Recreation Clubs in Cyprus
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          Tennis, padel, golf, sailing, running, rugby and more — across all five
          cities. Most clubs have strong expat memberships and English-speaking
          coaches.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        {SPORTS_TIPS.map((tip) => (
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

      {/* Sport filter */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        {(["All", ...ALL_SPORTS] as const).map((s) => (
          <CityChip
            key={s}
            label={s}
            selected={sportFilter === s}
            onClick={() => setSportFilter(s)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} club{filtered.length !== 1 ? "s" : ""} shown
        {cityFilter !== "All" ? ` in ${cityFilter}` : ""}
        {sportFilter !== "All" ? ` · ${sportFilter}` : ""}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-5 py-4">
          No clubs found for the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((club) => (
            <article
              key={`${club.name}-${club.city}`}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">
                  {club.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {club.city}
                  <span className="mx-1 text-slate-300">·</span>
                  <span className="text-[#35cdc4] font-semibold">
                    {club.sport}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                    club.level === "competitive"
                      ? "bg-red-100 text-red-700"
                      : club.level === "beginner"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {club.level}
                </span>
                {club.englishWelcome && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700">
                    English welcome
                  </span>
                )}
                {club.annualFeeApprox !== undefined && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700">
                    ~€{club.annualFeeApprox}/yr
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {club.why}
              </p>

              {club.website && (
                <a
                  href={club.website}
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
