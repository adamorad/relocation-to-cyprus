"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_ACCOUNTANT_SPECIALIZATIONS,
  ACCOUNTANT_TIPS,
  ACCOUNTANTS,
  ACCOUNTANT_SPEC_LABEL,
  type Accountant,
  type AccountantSpecialization,
  type City,
} from "@/lib/accountants";

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

function SpecChip({
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
          ? "bg-amber-700 text-white border border-amber-700"
          : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
      }`}
    >
      {label}
    </button>
  );
}

function AccountantCard({ accountant }: { accountant: Accountant }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
            {accountant.name}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {accountant.firm}
          </p>
        </div>
        <span className="flex-shrink-0 rounded-full bg-teal-50 border border-teal-200 text-[#35cdc4] text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
          {accountant.city}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700 leading-relaxed">
        {accountant.why}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {accountant.specializations.map((s) => (
          <span
            key={s}
            className="rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5"
          >
            {ACCOUNTANT_SPEC_LABEL[s]}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        <span className="text-slate-500">
          <span className="font-semibold text-slate-700">Languages:</span>{" "}
          {accountant.languages.join(", ")}
        </span>
        {accountant.website && (
          <a
            href={accountant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-700 hover:text-amber-900"
          >
            Website ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function AccountantsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [specFilter, setSpecFilter] = useState<
    AccountantSpecialization | "All"
  >("All");

  const visible = ACCOUNTANTS.filter((a) => {
    const cityMatch = cityFilter === "All" || a.city === cityFilter;
    const specMatch =
      specFilter === "All" || a.specializations.includes(specFilter);
    return cityMatch && specMatch;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-800 transition-colors">← Home</Link>
        {" / "}
        <Link href="/sections" className="hover:text-slate-800 transition-colors">
          Directories
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Professional Services
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Accountants &amp; Tax Advisors in Cyprus
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
          ICPAC-registered accountants with proven experience in the
          non-domiciled regime, expat individual returns, corporate tax, VAT,
          and crypto.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          This is a directory, not tax advice. Always verify ICPAC membership
          and fee structures directly with the firm.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3">
          Before you engage an accountant
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACCOUNTANT_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm"
            >
              <p className="font-bold text-slate-900 text-sm">{tip.heading}</p>
              <p className="mt-1.5 text-slate-700 leading-relaxed text-xs">
                {tip.body}
              </p>
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

      {/* Specialization filter */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        <SpecChip
          label="All specializations"
          selected={specFilter === "All"}
          onClick={() => setSpecFilter("All")}
        />
        {ALL_ACCOUNTANT_SPECIALIZATIONS.map((s) => (
          <SpecChip
            key={s}
            label={ACCOUNTANT_SPEC_LABEL[s]}
            selected={specFilter === s}
            onClick={() => setSpecFilter(s === specFilter ? "All" : s)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400 mb-4">
        Showing {visible.length} accountant{visible.length !== 1 ? "s" : ""}
        {cityFilter !== "All" ? ` in ${cityFilter}` : ""}
        {specFilter !== "All" ? ` · ${ACCOUNTANT_SPEC_LABEL[specFilter]}` : ""}
      </p>

      {/* Card grid */}
      {visible.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
          No accountants match the selected filters. Try removing a filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((accountant) => (
            <AccountantCard
              key={`${accountant.name}-${accountant.firm}`}
              accountant={accountant}
            />
          ))}
        </div>
      )}
    </main>
  );
}
