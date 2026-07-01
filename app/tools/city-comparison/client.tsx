"use client";

import Link from "next/link";
import { useState } from "react";

type City = "Limassol" | "Paphos" | "Larnaca" | "Nicosia" | "Ayia Napa";

interface CityData {
  avgRent2bed: number;
  propertyPriceM2: number;
  internationalSchools: number;
  beachMinutes: number;
  airportMinutes: number;
  nightlifeRating: number;
  expatsRating: number;
  costOfLivingIndex: number;
  winterTemp: number;
  summerTemp: number;
}

const DATA: Record<City, CityData> = {
  Limassol: {
    avgRent2bed: 1700,
    propertyPriceM2: 4200,
    internationalSchools: 8,
    beachMinutes: 5,
    airportMinutes: 50,
    nightlifeRating: 5,
    expatsRating: 5,
    costOfLivingIndex: 100,
    winterTemp: 14,
    summerTemp: 33,
  },
  Paphos: {
    avgRent2bed: 1100,
    propertyPriceM2: 2600,
    internationalSchools: 5,
    beachMinutes: 5,
    airportMinutes: 15,
    nightlifeRating: 3,
    expatsRating: 4,
    costOfLivingIndex: 75,
    winterTemp: 14,
    summerTemp: 31,
  },
  Larnaca: {
    avgRent2bed: 1050,
    propertyPriceM2: 2200,
    internationalSchools: 4,
    beachMinutes: 5,
    airportMinutes: 10,
    nightlifeRating: 2,
    expatsRating: 3,
    costOfLivingIndex: 72,
    winterTemp: 13,
    summerTemp: 33,
  },
  Nicosia: {
    avgRent2bed: 1100,
    propertyPriceM2: 2000,
    internationalSchools: 6,
    beachMinutes: 45,
    airportMinutes: 35,
    nightlifeRating: 3,
    expatsRating: 3,
    costOfLivingIndex: 78,
    winterTemp: 11,
    summerTemp: 36,
  },
  "Ayia Napa": {
    avgRent2bed: 950,
    propertyPriceM2: 1900,
    internationalSchools: 1,
    beachMinutes: 2,
    airportMinutes: 40,
    nightlifeRating: 4,
    expatsRating: 2,
    costOfLivingIndex: 68,
    winterTemp: 13,
    summerTemp: 32,
  },
};

const ALL_CITIES: City[] = ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa"];

type MetricKey = keyof CityData;

interface MetricDef {
  key: MetricKey;
  label: string;
  format: (v: number) => string;
  lowerIsBetter?: boolean;
}

const METRICS: MetricDef[] = [
  { key: "avgRent2bed", label: "Avg Rent 2-bed", format: (v) => `€${v.toLocaleString()}`, lowerIsBetter: true },
  { key: "propertyPriceM2", label: "Property Price / m²", format: (v) => `€${v.toLocaleString()}`, lowerIsBetter: true },
  { key: "internationalSchools", label: "International Schools", format: (v) => `${v}` },
  { key: "beachMinutes", label: "Beach (drive, min)", format: (v) => `${v} min`, lowerIsBetter: true },
  { key: "airportMinutes", label: "Airport (drive, min)", format: (v) => `${v} min`, lowerIsBetter: true },
  { key: "nightlifeRating", label: "Nightlife (1–5)", format: (v) => "★".repeat(v) + "☆".repeat(5 - v) },
  { key: "expatsRating", label: "Expat Community (1–5)", format: (v) => "★".repeat(v) + "☆".repeat(5 - v) },
  { key: "costOfLivingIndex", label: "Cost of Living (Limassol=100)", format: (v) => `${v}`, lowerIsBetter: true },
  { key: "winterTemp", label: "Winter Avg Temp", format: (v) => `${v}°C` },
  { key: "summerTemp", label: "Summer Avg Temp", format: (v) => `${v}°C` },
];

function getCellColor(
  cities: City[],
  metric: MetricDef,
  city: City,
): string {
  const values = cities.map((c) => DATA[c][metric.key]);
  const val = DATA[city][metric.key];
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) return "";

  let isBest: boolean;
  let isWorst: boolean;

  if (metric.lowerIsBetter) {
    isBest = val === min;
    isWorst = val === max;
  } else {
    isBest = val === max;
    isWorst = val === min;
  }

  if (isBest) return "bg-green-50 text-green-800 font-semibold";
  if (isWorst) return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-800";
}

export default function CityComparisonClient() {
  const [selected, setSelected] = useState<Set<City>>(
    new Set(["Limassol", "Paphos", "Larnaca"]),
  );

  const toggleCity = (city: City) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(city)) {
        if (next.size <= 2) return prev; // keep minimum 2
        next.delete(city);
      } else {
        if (next.size >= 5) return prev; // max 5
        next.add(city);
      }
      return next;
    });
  };

  const selectedCities = ALL_CITIES.filter((c) => selected.has(c));

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <nav className="text-xs text-slate-500 mb-6 flex gap-3">
        <Link href="/" className="hover:text-slate-900">← Home</Link>
        <span className="text-slate-300">|</span>
        <Link href="/tools" className="hover:text-slate-900">
          ← All Tools
        </Link>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Tools
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          City Comparison
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Compare key metrics across Cyprus cities side by side. Select 2–5
          cities to compare. Color coding: green = best, amber = middle, red =
          relative worst per row.
        </p>
      </header>

      <section className="mb-6">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
          Select cities (2–5)
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_CITIES.map((city) => {
            const isSelected = selected.has(city);
            return (
              <button
                key={city}
                onClick={() => toggleCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  isSelected
                    ? "border-[#35cdc4] text-white"
                    : "border-slate-200 text-slate-600 bg-white hover:border-slate-400"
                }`}
                style={isSelected ? { backgroundColor: "#35cdc4" } : {}}
              >
                {city}
              </button>
            );
          })}
        </div>
      </section>

      <section className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-3 text-left text-slate-500 font-semibold uppercase tracking-wide w-48">
                Metric
              </th>
              {selectedCities.map((city) => (
                <th
                  key={city}
                  className="px-3 py-3 text-center font-bold text-slate-800"
                >
                  {city}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS.map((metric) => (
              <tr key={metric.key} className="border-t border-slate-100">
                <td className="px-3 py-2 text-slate-600 font-medium">
                  {metric.label}
                </td>
                {selectedCities.map((city) => (
                  <td
                    key={city}
                    className={`px-3 py-2 text-center ${getCellColor(selectedCities, metric, city)}`}
                  >
                    {metric.format(DATA[city][metric.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <aside className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">About this data</p>
        <p>
          Values are approximate averages based on publicly available data and
          local market research as of 2025–2026. Rental prices vary by exact
          location, building age, and furnishing. Ratings are relative to other
          Cyprus cities, not European or global benchmarks. Always verify with
          local property agents and recent listings before making relocation
          decisions.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools" className="underline hover:text-slate-900">
          ← All Tools
        </Link>
      </p>

      <aside className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Next steps</p>
        <div className="flex flex-wrap gap-3">

<Link href="/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Browse new developments on the map →</Link>
          <Link href="/sections/property-lawyers/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Find a property lawyer →</Link>
          <Link href="/guides/family-neighborhoods-guide/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: Family Neighbourhoods Guide →</Link>
          <Link href="/guides/cost-of-living/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: Cost of Living by City →</Link>
        </div>
      </aside>
    </main>
  );
}
