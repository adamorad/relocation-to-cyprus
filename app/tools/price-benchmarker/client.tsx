"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { LISTINGS } from "@/lib/listingsData";

// ---------------------------------------------------------------------------
// Price extraction helpers
// ---------------------------------------------------------------------------

/**
 * Parse a priceRange string such as:
 *   "€460,000 +VAT"
 *   "€390,000 – €405,000 +VAT"
 *   "From €320,000"
 * Returns the lower-bound numeric value, or null if unparseable.
 */
function extractMinPrice(raw: string | null | undefined): number | null {
  if (!raw) return null;
  // Remove currency symbol, commas, "+VAT", "From", whitespace noise
  const cleaned = raw.replace(/€/g, "").replace(/,/g, "").replace(/\+VAT/gi, "").replace(/from/gi, "");
  // For a range like "390000 – 405000", take the first number
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number.parseFloat(match[1]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

// ---------------------------------------------------------------------------
// Statistics helpers
// ---------------------------------------------------------------------------

function median(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (idx - lo) * (sorted[hi] - sorted[lo]);
}

// ---------------------------------------------------------------------------
// Benchmark data builder
// ---------------------------------------------------------------------------

type CityStats = {
  city: string;
  count: number;
  min: number;
  max: number;
  average: number;
  median: number;
  p25: number;
  p75: number;
};

const MIN_DATA_POINTS = 5;

const CITY_NOTES: Record<string, string> = {
  Limassol:
    "Limassol has the widest price range in Cyprus — from affordable inland to ultra-luxury seafront.",
  Paphos: "Paphos offers strong value. Most developments are in the comfortable mid-range.",
  Larnaca:
    "Larnaca is the most affordable coastal city — significant growth potential.",
  "Ayia Napa":
    "Ayia Napa prices are driven by luxury resort demand. Mid-range options are limited.",
  Nicosia:
    "Nicosia is the capital — land-locked but affordable. Primarily a local buyer market.",
};

function buildCityStats(): Record<string, CityStats> {
  const grouped: Record<string, number[]> = {};

  for (const listing of LISTINGS) {
    const price = extractMinPrice(listing.priceRange);
    if (price === null) continue;
    const city = listing.regionCity;
    if (!grouped[city]) grouped[city] = [];
    grouped[city].push(price);
  }

  const result: Record<string, CityStats> = {};
  for (const [city, prices] of Object.entries(grouped)) {
    if (prices.length < MIN_DATA_POINTS) continue;
    const sorted = [...prices].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, v) => acc + v, 0);
    result[city] = {
      city,
      count: sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      average: sum / sorted.length,
      median: median(sorted),
      p25: percentile(sorted, 25),
      p75: percentile(sorted, 75),
    };
  }
  return result;
}

const CITY_STATS = buildCityStats();

// ---------------------------------------------------------------------------
// Percentile rank of a value in the distribution
// ---------------------------------------------------------------------------

function percentileRankOf(price: number, city: string): number {
  // Recompute from raw listings for accuracy
  const prices: number[] = [];
  for (const listing of LISTINGS) {
    if (listing.regionCity !== city) continue;
    const p = extractMinPrice(listing.priceRange);
    if (p !== null) prices.push(p);
  }
  if (prices.length === 0) return 0;
  const below = prices.filter((p) => p < price).length;
  return Math.round((below / prices.length) * 100);
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function fmt(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PriceBenchmarkerClient() {
  const availableCities = Object.keys(CITY_STATS).sort();

  const [selectedCity, setSelectedCity] = useState<string>(
    availableCities.includes("Limassol") ? "Limassol" : availableCities[0] ?? "",
  );
  const [priceInput, setPriceInput] = useState<string>("");

  const stats = selectedCity ? CITY_STATS[selectedCity] : null;

  const userPrice = useMemo(() => {
    const raw = priceInput.replace(/[€,\s]/g, "");
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [priceInput]);

  const pctRank = useMemo(() => {
    if (userPrice === null || !selectedCity) return null;
    return percentileRankOf(userPrice, selectedCity);
  }, [userPrice, selectedCity]);

  // Width of the marker on the percentile bar (clamped)
  const markerLeft = pctRank !== null ? Math.min(Math.max(pctRank, 0), 98) : null;

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span>Property Price Benchmarker</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Research
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Property Price Benchmarker
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          See how your property&apos;s asking price compares to similar
          developments in the same region.
        </p>
      </header>

      {/* Inputs */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* City selector */}
          <div>
            <label
              htmlFor="city-select"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              City / Region
            </label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
            >
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city} ({CITY_STATS[city].count} listings)
                </option>
              ))}
            </select>
          </div>

          {/* Price input */}
          <div>
            <label
              htmlFor="price-input"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Your property price (€)
            </label>
            <input
              id="price-input"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 450000"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
            />
          </div>
        </div>
      </section>

      {/* Results — only shown when stats available */}
      {stats && (
        <>
          {/* Percentile result */}
          {userPrice !== null && pctRank !== null ? (
            <section className="mb-6">
              <div className="bg-slate-900 text-white rounded-xl p-6">
                <p className="text-base leading-relaxed">
                  Your price of{" "}
                  <span className="font-bold text-[#35cdc4]">
                    {fmt(userPrice)}
                  </span>{" "}
                  is above{" "}
                  <span className="font-bold text-[#35cdc4]">
                    {pctRank}%
                  </span>{" "}
                  of the{" "}
                  <span className="font-semibold">{stats.count}</span>{" "}
                  developments in{" "}
                  <span className="font-semibold">{selectedCity}</span> in our
                  database.
                </p>

                {/* Percentile bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Cheapest</span>
                    <span>Most expensive</span>
                  </div>
                  <div className="relative h-3 bg-slate-700 rounded-full overflow-visible">
                    {/* Gradient fill up to marker */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-400 to-[#35cdc4]"
                      style={{ width: `${markerLeft}%` }}
                    />
                    {/* Marker pin */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#35cdc4] shadow-md"
                      style={{ left: `${markerLeft}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{fmt(stats.min)}</span>
                    <span>{fmt(stats.max)}</span>
                  </div>
                </div>

                {/* Position label */}
                <p className="mt-4 text-sm text-slate-300">
                  {pctRank >= 75
                    ? "Your price is in the top quarter — premium or luxury segment for this city."
                    : pctRank >= 50
                      ? "Your price is above the median — upper mid-range for this city."
                      : pctRank >= 25
                        ? "Your price is below the median — competitive mid-range for this city."
                        : "Your price is in the bottom quarter — among the most affordable options in this city."}
                </p>
              </div>
            </section>
          ) : (
            <section className="mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-600">
                Enter a price above to see where it sits in the distribution.
              </div>
            </section>
          )}

          {/* Stats table */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              {selectedCity} — Price Distribution
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="text-left font-semibold px-4 py-2.5 rounded-tl-lg">
                      Metric
                    </th>
                    <th className="text-right font-semibold px-4 py-2.5 rounded-tr-lg">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Min (lowest listed)", value: stats.min },
                    { label: "25th percentile", value: stats.p25 },
                    { label: "Median (50th percentile)", value: stats.median },
                    { label: "Average", value: stats.average },
                    { label: "75th percentile", value: stats.p75 },
                    { label: "Max (highest listed)", value: stats.max },
                  ].map((row, i) => (
                    <tr
                      key={row.label}
                      className={
                        i % 2 === 0
                          ? "bg-white border-b border-slate-100"
                          : "bg-slate-50 border-b border-slate-100"
                      }
                    >
                      <td className="px-4 py-2.5 text-slate-700">{row.label}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-semibold text-slate-900">
                        {fmt(row.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Based on {stats.count} listed developments in our database.
              Excludes unlisted or off-market properties.
            </p>
          </section>

          {/* City note */}
          {CITY_NOTES[selectedCity] && (
            <section className="mb-6">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">
                  About {selectedCity}:{" "}
                </span>
                {CITY_NOTES[selectedCity]}
              </div>
            </section>
          )}
        </>
      )}

      {/* Next steps */}
      <aside className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-semibold text-slate-900 mb-2">Next steps</p>
        <p className="text-sm text-slate-600 mb-4">
          Use the benchmarker alongside the rent vs buy calculator and
          neighbourhood comparison to build a complete picture.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/rent-vs-buy-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Rent vs Buy Calculator
          </Link>
          <Link
            href="/tools/neighborhood-comparison/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Neighbourhood Comparison
          </Link>
        </div>
      </aside>

      {/* Disclaimer */}
      <aside className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          Prices are extracted from publicly listed development data and are
          indicative only. Prices vary by unit, floor, and negotiation. This
          tool does not constitute financial or investment advice. Always verify
          directly with the developer or agent.
        </p>
      </aside>

      {/* Back link */}
      <Link href="/tools/" className="underline hover:text-slate-900 text-sm">
        &larr; Back to Tools
      </Link>
    </main>
  );
}
