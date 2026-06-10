"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LISTINGS } from "@/lib/listingsData";
import type { EnrichedListing } from "@/lib/listingsData";

const MAX_SELECTED = 3;

function getBedrooms(listing: EnrichedListing): string {
  const beds = new Set<string>();
  for (const offer of listing.offers) {
    const b =
      offer.bedrooms ??
      (offer.features as Record<string, string> | undefined)?.bedrooms ??
      null;
    if (b) beds.add(b);
  }
  if (beds.size === 0) return "—";
  return (
    Array.from(beds)
      .sort()
      .map((b) => `${b} bed`)
      .join(", ")
  );
}

function spec(listing: EnrichedListing, key: string): string {
  return listing.specs[key] ?? "—";
}

const ROW_LABELS: { label: string; key: string }[] = [
  { label: "Developer", key: "__developer" },
  { label: "Location", key: "__location" },
  { label: "Price Range", key: "__priceRange" },
  { label: "Bedrooms", key: "__bedrooms" },
  { label: "Pool", key: "Pool" },
  { label: "Parking", key: "Parking" },
  { label: "Energy Efficiency", key: "Energy Efficiency" },
  { label: "Pet-friendly", key: "Pet-friendly" },
  { label: "Photovoltaic", key: "Photovoltaic" },
  { label: "View", key: "View" },
  { label: "Completion", key: "Construction period" },
];

function getCellValue(listing: EnrichedListing, key: string): string {
  if (key === "__developer") return listing.developer?.name ?? "—";
  if (key === "__location") return listing.location ?? listing.regionCity ?? "—";
  if (key === "__priceRange") return listing.priceRange ?? "—";
  if (key === "__bedrooms") return getBedrooms(listing);
  return spec(listing, key);
}

export default function DevelopmentComparisonClient() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<EnrichedListing[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return LISTINGS.filter(
      (l) =>
        !selected.some((s) => s.id === l.id) &&
        (l.title.toLowerCase().includes(q) ||
          (l.location ?? "").toLowerCase().includes(q) ||
          l.regionCity.toLowerCase().includes(q)),
    ).slice(0, 12);
  }, [query, selected]);

  function addListing(listing: EnrichedListing) {
    if (selected.length >= MAX_SELECTED) return;
    setSelected((prev) => [...prev, listing]);
    setQuery("");
  }

  function removeListing(id: number) {
    setSelected((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">Development Comparison</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Research
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Compare Cyprus Developments
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Select up to 3 new-build developments and compare them side by side.
        </p>
      </header>

      {/* Search box */}
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            selected.length >= MAX_SELECTED
              ? "Maximum 3 developments selected"
              : "Search by name or location…"
          }
          disabled={selected.length >= MAX_SELECTED}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35cdc4] disabled:bg-slate-50 disabled:text-slate-400"
        />
        {results.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
            {results.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => addListing(l)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900">{l.title}</span>
                  <span className="ml-2 text-slate-500 text-xs">
                    {l.location ?? l.regionCity}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selected.map((l) => (
            <span
              key={l.id}
              className="inline-flex items-center gap-1.5 bg-[#35cdc4] text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              {l.title}
              <button
                type="button"
                onClick={() => removeListing(l.id)}
                aria-label={`Remove ${l.title}`}
                className="leading-none hover:opacity-70 transition-opacity"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Empty state */}
      {selected.length === 0 && (
        <div className="mt-10 text-center py-16 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl">
          Search and select up to 3 developments to compare
        </div>
      )}

      {/* Comparison table */}
      {selected.length > 0 && (
        <>
          {/* Desktop: table layout */}
          <div className="hidden md:block overflow-x-auto mt-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-36">
                    &nbsp;
                  </th>
                  {selected.map((l) => (
                    <th
                      key={l.id}
                      className="py-3 px-4 text-left text-slate-900 font-bold border-b-2 border-[#35cdc4]"
                    >
                      <div className="leading-snug">{l.title}</div>
                      <div className="text-xs font-normal text-slate-500 mt-0.5">
                        {l.location ?? l.regionCity}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROW_LABELS.map(({ label, key }, i) => (
                  <tr
                    key={key}
                    className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                  >
                    <td className="py-2.5 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {label}
                    </td>
                    {selected.map((l) => (
                      <td
                        key={l.id}
                        className="py-2.5 px-4 text-slate-800 text-sm"
                      >
                        {getCellValue(l, key)}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* More info row */}
                <tr className="bg-slate-50">
                  <td className="py-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    &nbsp;
                  </td>
                  {selected.map((l) => (
                    <td key={l.id} className="py-3 px-4">
                      <Link
                        href={`/listings/${l.slug}/`}
                        className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors inline-block"
                      >
                        More info &rarr;
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden mt-4 space-y-6">
            {selected.map((l) => (
              <div
                key={l.id}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <div className="bg-slate-900 px-4 py-3">
                  <p className="text-white font-bold text-sm">{l.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {l.location ?? l.regionCity}
                  </p>
                </div>
                <dl className="divide-y divide-slate-100">
                  {ROW_LABELS.map(({ label, key }) => (
                    <div key={key} className="flex px-4 py-2.5 gap-4">
                      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 flex-shrink-0 pt-0.5">
                        {label}
                      </dt>
                      <dd className="text-sm text-slate-800">
                        {getCellValue(l, key)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                  <Link
                    href={`/listings/${l.slug}/`}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors inline-block"
                  >
                    More info &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Next steps */}
      {selected.length > 0 && (
        <aside className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">
            Ready to dig deeper?
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/listings/"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
            >
              Browse all listings
            </Link>
            <Link
              href="/tools/rent-vs-buy-calculator/"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
            >
              Rent vs Buy Calculator
            </Link>
          </div>
        </aside>
      )}

      <aside className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          Development data is for general research only. Prices, specs, and
          availability change frequently. Always verify directly with the
          developer or agent before making any decisions.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          &larr; Back to Tools
        </Link>
      </p>
    </main>
  );
}
