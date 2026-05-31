"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_COWORK_TYPES,
  COWORK_TIPS,
  COWORK_SPACES,
  COWORK_TYPE_LABEL,
  NOISE_LEVEL_LABEL,
  type City,
  type CoworkSpaceType,
  type NoiseLevel,
} from "@/lib/coworking";

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
// Noise level badge
// ---------------------------------------------------------------------------

const NOISE_COLOR: Record<NoiseLevel, string> = {
  quiet: "bg-green-50 text-green-700",
  moderate: "bg-amber-50 text-amber-700",
  lively: "bg-orange-50 text-orange-700",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CoworkingPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<CoworkSpaceType | "All">("All");

  const visible = COWORK_SPACES.filter(
    (s) =>
      (cityFilter === "All" || s.city === cityFilter) &&
      (typeFilter === "All" || s.type === typeFilter),
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
          Coworking
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Coworking Spaces in Cyprus
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          Directory with day-pass prices, monthly rates and WiFi speeds.
          Covers coworking, managed offices and café-friendly workspaces.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        {COWORK_TIPS.map((tip) => (
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
        {ALL_COWORK_TYPES.map((t) => (
          <TypeChip
            key={t}
            label={COWORK_TYPE_LABEL[t]}
            selected={typeFilter === t}
            onClick={() => setTypeFilter(t)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {visible.length === 0
          ? "No spaces match these filters."
          : `${visible.length} space${visible.length === 1 ? "" : "s"}`}
      </p>

      {/* Card grid */}
      {visible.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((space) => (
            <li
              key={space.name}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-teal-700 bg-teal-50 rounded px-1.5 py-0.5">
                      {COWORK_TYPE_LABEL[space.type]}
                    </span>
                    <span
                      className={`inline-block text-[10px] font-semibold rounded px-1.5 py-0.5 ${NOISE_COLOR[space.noiseLevel]}`}
                    >
                      {NOISE_LEVEL_LABEL[space.noiseLevel]}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-slate-900">
                    {space.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {space.city}
                    {space.neighbourhood ? ` · ${space.neighbourhood}` : ""}
                  </p>
                </div>
              </div>

              {/* Pricing row */}
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-600">
                {space.dayPassEuros != null && (
                  <span>
                    Day:{" "}
                    <span className="font-semibold text-slate-800">
                      €{space.dayPassEuros}
                    </span>
                  </span>
                )}
                {space.monthlyHotDesk != null && (
                  <span>
                    Hot desk:{" "}
                    <span className="font-semibold text-slate-800">
                      €{space.monthlyHotDesk}/mo
                    </span>
                  </span>
                )}
                {space.monthlyDedicatedDesk != null && (
                  <span>
                    Dedicated:{" "}
                    <span className="font-semibold text-slate-800">
                      €{space.monthlyDedicatedDesk}/mo
                    </span>
                  </span>
                )}
                {space.wifiMbps != null && (
                  <span>
                    WiFi:{" "}
                    <span className="font-semibold text-slate-800">
                      {space.wifiMbps} Mbps
                    </span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {space.why}
              </p>

              {/* Amenities */}
              {space.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {space.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] text-slate-400">
                  Verified {space.verifiedDate}
                </p>
                {space.website && (
                  <a
                    href={space.website}
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
