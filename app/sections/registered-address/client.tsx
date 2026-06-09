"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  REGISTERED_ADDRESS_TIPS,
  REGISTERED_ADDRESS_PROVIDERS,
  type City,
} from "@/lib/registered-address";

// ---------------------------------------------------------------------------
// Chip helper
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
// Page
// ---------------------------------------------------------------------------

export default function RegisteredAddressPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");

  const visible = REGISTERED_ADDRESS_PROVIDERS.filter(
    (p) => cityFilter === "All" || p.city === cityFilter,
  );

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/sections" className="hover:text-slate-800">
          ← Directories
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Business Setup
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Registered Address Providers in Cyprus
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          Every Cyprus company legally needs a registered address. These
          providers offer the registered office service — with or without mail
          forwarding.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        {REGISTERED_ADDRESS_TIPS.map((tip) => (
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
      <div className="flex flex-wrap gap-1.5 mb-6">
        {(["All", ...ALL_CITIES] as const).map((c) => (
          <CityChip
            key={c}
            city={c}
            selected={cityFilter === c}
            onClick={() => setCityFilter(c)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {visible.length === 0
          ? "No providers found for this city."
          : `${visible.length} provider${visible.length === 1 ? "" : "s"}`}
      </p>

      {/* Card grid */}
      {visible.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((provider) => (
            <li
              key={provider.name}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-bold text-sm text-slate-900">
                  {provider.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {provider.city}
                  {provider.neighbourhood
                    ? ` · ${provider.neighbourhood}`
                    : ""}
                </p>
              </div>

              {provider.pricePerYear != null && (
                <p className="text-xs font-semibold text-teal-700">
                  €{provider.pricePerYear} / year
                </p>
              )}

              <p className="text-xs text-slate-700 leading-relaxed flex-1">
                {provider.why}
              </p>

              {/* What's included */}
              <ul className="mt-1 space-y-0.5">
                {provider.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 text-[11px] text-slate-600"
                  >
                    <span className="text-teal-500 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-[11px] font-semibold text-amber-700 hover:text-amber-900"
                >
                  Website ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <aside className="mt-10 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 max-w-2xl">
        <p className="font-semibold text-slate-800 mb-1">Disclaimer</p>
        <p className="leading-relaxed">
          This is a general directory, not legal advice. Prices and service
          inclusions change frequently. Always verify directly with the
          provider before signing. For company formation or ongoing compliance,
          consult a Cyprus-licensed advocate or accountant.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to Explore
        </Link>
      </p>
    </main>
  );
}
