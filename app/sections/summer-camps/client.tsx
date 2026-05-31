"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  SUMMER_CAMPS,
  SUMMER_CAMP_TIPS,
  type City,
  type SummerCamp,
} from "@/lib/summer-camps";

type CampType = "all" | "day" | "residential";

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
  type,
  label,
  selected,
  onClick,
}: {
  type: CampType;
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
          ? "bg-[#35cdc4] text-white border border-[#35cdc4]"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

function FocusBadge({ area }: { area: string }) {
  return (
    <span className="rounded-full bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 text-[10px] font-medium">
      {area}
    </span>
  );
}

function CampCard({ camp }: { camp: SummerCamp }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900">{camp.name}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {camp.city}
            {camp.neighbourhood ? ` · ${camp.neighbourhood}` : ""}
          </p>
        </div>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
            camp.type === "residential"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-teal-50 text-teal-700 border-teal-200"
          }`}
        >
          {camp.type === "residential" ? "Residential" : "Day camp"}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
        <span>
          <span className="font-semibold text-slate-700">Ages: </span>
          {camp.ageFrom}–{camp.ageTo} yrs
        </span>
        <span>
          <span className="font-semibold text-slate-700">Languages: </span>
          {camp.languages.join(", ")}
        </span>
        {camp.weeklyFeeApprox !== undefined && (
          <span>
            <span className="font-semibold text-slate-700">~</span>
            €{camp.weeklyFeeApprox}/week
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {camp.focusAreas.map((area) => (
          <FocusBadge key={area} area={area} />
        ))}
      </div>

      <p className="mt-2 text-slate-700 leading-relaxed text-[13px]">
        {camp.why}
      </p>

      {camp.website && (
        <a
          href={camp.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[11px] font-semibold text-amber-700 hover:text-amber-900"
        >
          Website ↗
        </a>
      )}
    </article>
  );
}

export default function SummerCampsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<CampType>("all");

  const visible = SUMMER_CAMPS.filter(
    (c) =>
      (cityFilter === "All" || c.city === cityFilter) &&
      (typeFilter === "all" || c.type === typeFilter),
  );

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-800 transition-colors">← Home</Link>
        {" / "}
        <Link href="/sections" className="hover:text-slate-800 transition-colors">
          Explore
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Family &amp; Children
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Summer Camps in Cyprus — Day and Residential
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          Day camps and residential programmes for children across Cyprus —
          sports, watersports, STEM, arts, and adventure, from June through
          August.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Planning tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SUMMER_CAMP_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <p className="font-semibold text-sm text-slate-900">
                {tip.heading}
              </p>
              <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* City filter */}
      <div className="mb-3">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
          City
        </p>
        <div className="flex flex-wrap gap-2">
          {(["All", ...ALL_CITIES] as const).map((c) => (
            <CityChip
              key={c}
              city={c}
              selected={cityFilter === c}
              onClick={() => setCityFilter(c)}
            />
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
          Camp type
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { type: "all", label: "All camps" },
              { type: "day", label: "Day camps" },
              { type: "residential", label: "Residential" },
            ] as const
          ).map(({ type, label }) => (
            <TypeChip
              key={type}
              type={type}
              label={label}
              selected={typeFilter === type}
              onClick={() => setTypeFilter(type)}
            />
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {visible.length} camp{visible.length === 1 ? "" : "s"}
        {cityFilter !== "All" ? ` in ${cityFilter}` : " across Cyprus"}
        {typeFilter !== "all"
          ? ` · ${typeFilter === "residential" ? "Residential" : "Day camps"}`
          : ""}
      </p>

      {/* Card grid */}
      {visible.length === 0 ? (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-100 px-4 py-6 text-center">
          No camps match your filters. Try a different city or type.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((camp) => (
            <CampCard key={`${camp.name}-${camp.city}`} camp={camp} />
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-slate-500">
        Prices, dates and availability change each year — always verify directly
        with the camp before booking. Cyprus temperatures in July–August
        regularly exceed 38°C; check each camp&apos;s heat management policy
        before enrolling young children.
      </p>

      <p className="mt-6 text-xs">
        <Link href="/" className="text-slate-500 underline hover:text-slate-800">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
