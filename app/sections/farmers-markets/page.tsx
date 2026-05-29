"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_MARKET_DAYS,
  FARMERS_MARKETS,
  MARKET_TIPS,
  type City,
  type MarketDay,
} from "@/lib/farmers-markets";

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

function DayChip({
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
          ? "bg-amber-700 text-white border border-amber-700"
          : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
      }`}
    >
      {label}
    </button>
  );
}

export default function FarmersMarketsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [dayFilter, setDayFilter] = useState<MarketDay | "All">("All");

  const visible = FARMERS_MARKETS.filter((m) => {
    const matchCity = cityFilter === "All" || m.city === cityFilter;
    const matchDay = dayFilter === "All" || m.dayOfWeek === dayFilter;
    return matchCity && matchDay;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          ← Map
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Food &amp; Dining
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Farmers Markets &amp; Local Produce in Cyprus
        </h1>
        <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
          Weekly laiki agorai, municipal covered markets, and organic farmers
          markets across Cyprus — the best places to buy directly from local
          growers. Seasonal produce, fresh halloumi, village honey, and artisan
          food products at prices that reflect Cyprus's agricultural heritage.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Market tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MARKET_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm"
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
            Day of the week
          </p>
          <div className="flex flex-wrap gap-2">
            <DayChip
              label="Any day"
              selected={dayFilter === "All"}
              onClick={() => setDayFilter("All")}
            />
            {ALL_MARKET_DAYS.map((day) => (
              <DayChip
                key={day}
                label={day}
                selected={dayFilter === day}
                onClick={() => setDayFilter(day)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {visible.length === 0
          ? "No markets match your filters."
          : `${visible.length} market${visible.length === 1 ? "" : "s"} found`}
      </p>

      {/* Market cards */}
      {visible.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((market) => (
            <article
              key={`${market.name}-${market.city}`}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {market.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {market.city}
                  {" · "}
                  <span className="text-amber-700 font-semibold">
                    {market.dayOfWeek}
                  </span>
                  {" · "}
                  {market.hours}
                </p>
              </div>

              <p className="text-[12px] text-slate-500 leading-relaxed">
                {market.location}
              </p>

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {market.why}
              </p>

              {/* Produces tags */}
              <div className="flex flex-wrap gap-1 mt-1">
                {market.produces.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-green-50 border border-green-200 text-green-800 text-[10px] px-2 py-0.5 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {market.parkingNotes && (
                <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 mt-1 leading-relaxed">
                  <span className="font-semibold text-slate-600">Parking:</span>{" "}
                  {market.parkingNotes}
                </p>
              )}
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
