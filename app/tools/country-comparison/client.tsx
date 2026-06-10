"use client";

import Link from "next/link";
import { useState } from "react";

type Country =
  | "Cyprus"
  | "Portugal"
  | "Malta"
  | "Greece"
  | "Spain"
  | "Italy";

interface CountryData {
  corpTax: string;
  topIncomeTax: string;
  specialRegime: string;
  specialRegimeTax: string;
  nonDomYears: string;
  avgPropPrice: string;
  monthlyCost: string;
  euVisaNonEU: string;
  cryptoFriendly: string;
  englishSpoken: string;
  climate: string;
}

const DATA: Record<Country, CountryData> = {
  Cyprus: {
    corpTax: "12.5%",
    topIncomeTax: "35%",
    specialRegime: "Non-dom",
    specialRegimeTax: "0% divs",
    nonDomYears: "17 yrs",
    avgPropPrice: "€2,800",
    monthlyCost: "€2,000",
    euVisaNonEU: "Yes / D7",
    cryptoFriendly: "Yes",
    englishSpoken: "High",
    climate: "★★★★★",
  },
  Portugal: {
    corpTax: "21%",
    topIncomeTax: "48%",
    specialRegime: "NHR / IFICI",
    specialRegimeTax: "20% flat",
    nonDomYears: "10 yrs",
    avgPropPrice: "€2,900",
    monthlyCost: "€2,200",
    euVisaNonEU: "Yes / D7",
    cryptoFriendly: "Partial",
    englishSpoken: "Medium",
    climate: "★★★★",
  },
  Malta: {
    corpTax: "15%",
    topIncomeTax: "35%",
    specialRegime: "Global Res",
    specialRegimeTax: "15% flat",
    nonDomYears: "N/A",
    avgPropPrice: "€4,500",
    monthlyCost: "€2,500",
    euVisaNonEU: "Yes",
    cryptoFriendly: "Yes",
    englishSpoken: "High",
    climate: "★★★★",
  },
  Greece: {
    corpTax: "22%",
    topIncomeTax: "44%",
    specialRegime: "Non-dom",
    specialRegimeTax: "7% flat",
    nonDomYears: "15 yrs",
    avgPropPrice: "€2,000",
    monthlyCost: "€1,800",
    euVisaNonEU: "No",
    cryptoFriendly: "No",
    englishSpoken: "Low",
    climate: "★★★★",
  },
  Spain: {
    corpTax: "25%",
    topIncomeTax: "47%",
    specialRegime: "Beckham",
    specialRegimeTax: "24% flat",
    nonDomYears: "6 yrs",
    avgPropPrice: "€1,800",
    monthlyCost: "€1,900",
    euVisaNonEU: "Yes / D",
    cryptoFriendly: "No",
    englishSpoken: "Low",
    climate: "★★★★",
  },
  Italy: {
    corpTax: "24%",
    topIncomeTax: "43%",
    specialRegime: "Impatriates",
    specialRegimeTax: "50% exempt",
    nonDomYears: "5 yrs",
    avgPropPrice: "€1,700",
    monthlyCost: "€2,000",
    euVisaNonEU: "Yes / Nomad",
    cryptoFriendly: "Partial",
    englishSpoken: "Low",
    climate: "★★★★",
  },
};

const ALL_COUNTRIES: Country[] = [
  "Cyprus",
  "Portugal",
  "Malta",
  "Greece",
  "Spain",
  "Italy",
];

interface MetricDef {
  key: keyof CountryData;
  label: string;
  note?: string;
}

const METRICS: MetricDef[] = [
  {
    key: "corpTax",
    label: "Corporate tax rate",
    note: "Standard headline rate",
  },
  { key: "topIncomeTax", label: "Top income tax rate" },
  { key: "specialRegime", label: "Special tax regime name" },
  { key: "specialRegimeTax", label: "Special regime benefit" },
  { key: "nonDomYears", label: "Regime duration" },
  { key: "avgPropPrice", label: "Avg property €/sqm" },
  { key: "monthlyCost", label: "Monthly cost (1 person, mid)" },
  { key: "euVisaNonEU", label: "EU visa for non-EU nationals" },
  { key: "cryptoFriendly", label: "Crypto tax treatment" },
  { key: "englishSpoken", label: "English proficiency" },
  { key: "climate", label: "Climate rating" },
];

export default function CountryComparisonClient() {
  const [visible, setVisible] = useState<Set<Country>>(
    new Set(ALL_COUNTRIES),
  );

  const toggleCountry = (country: Country) => {
    if (country === "Cyprus") return; // Cyprus always visible
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(country)) {
        if (next.size <= 2) return prev; // keep at least Cyprus + 1
        next.delete(country);
      } else {
        next.add(country);
      }
      return next;
    });
  };

  const visibleCountries = ALL_COUNTRIES.filter((c) => visible.has(c));

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
        &rsaquo; <span>Country Comparison</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Research
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus vs Europe
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
          Compare Cyprus against Portugal, Malta, Greece, Spain and Italy across
          corporate tax, income tax, special regimes, property prices, cost of
          living, and visa options.
        </p>
        <p className="mt-2 text-xs text-slate-500 italic">
          All figures are indicative. Verify with a local advisor.
        </p>
      </header>

      {/* Country toggle chips */}
      <section className="mb-6">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
          Toggle countries
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_COUNTRIES.map((country) => {
            const isVisible = visible.has(country);
            const isCyprus = country === "Cyprus";
            return (
              <button
                key={country}
                type="button"
                onClick={() => toggleCountry(country)}
                disabled={isCyprus}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  isCyprus
                    ? "border-[#35cdc4] bg-[#35cdc4] text-slate-900 cursor-default"
                    : isVisible
                      ? "border-slate-400 bg-slate-800 text-white hover:bg-slate-700"
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-400"
                }`}
              >
                {country}
                {isCyprus && (
                  <span className="ml-1 text-[10px] opacity-70">★</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 py-3 text-left text-slate-500 font-semibold uppercase tracking-wide min-w-[160px]">
                Metric
              </th>
              {visibleCountries.map((country) => {
                const isCyprus = country === "Cyprus";
                return (
                  <th
                    key={country}
                    className={`px-3 py-3 text-center font-bold min-w-[90px] ${
                      isCyprus
                        ? "text-[#35cdc4] border-l-2 border-r-2 border-[#35cdc4]"
                        : "text-slate-800"
                    }`}
                  >
                    {country}
                    {isCyprus && (
                      <span className="block text-[9px] font-normal text-slate-500 mt-0.5">
                        highlighted
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {METRICS.map((metric, idx) => (
              <tr
                key={metric.key}
                className={`border-t border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-3 py-2.5 text-slate-700 font-medium leading-snug">
                  {metric.label}
                  {metric.note && (
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {metric.note}
                    </span>
                  )}
                </td>
                {visibleCountries.map((country) => {
                  const isCyprus = country === "Cyprus";
                  return (
                    <td
                      key={country}
                      className={`px-3 py-2.5 text-center align-middle ${
                        isCyprus
                          ? "border-l-2 border-r-2 border-[#35cdc4] font-semibold text-slate-900"
                          : "text-slate-700"
                      }`}
                    >
                      {DATA[country][metric.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Cyprus non-dom note */}
      <aside className="mb-6 p-4 bg-teal-50 border border-[#35cdc4] rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">
          Cyprus Non-Dom explained
        </p>
        <p>
          Cyprus non-dom status grants{" "}
          <strong>0% tax on dividends and interest</strong> for up to{" "}
          <strong>17 years</strong> for qualifying individuals. Combined with
          the 12.5% corporate tax rate, it is one of the most efficient
          structures available within the EU.
        </p>
      </aside>

      {/* Next steps */}
      <aside className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Next steps
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/tax-residency-planner/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Cyprus Tax Residency Planner →
          </Link>
          <Link
            href="/tools/visa-pathway-finder/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Visa Pathway Finder →
          </Link>
          <Link
            href="/tools/double-tax-treaty-finder/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Double Tax Treaty Finder →
          </Link>
        </div>
      </aside>

      {/* Disclaimer */}
      <aside className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          All data is indicative and based on publicly available information as
          of 2025–2026. Tax rates, regime conditions, and visa rules change
          frequently. Always verify with a qualified local tax advisor or lawyer
          before making relocation decisions.
        </p>
      </aside>

      <Link
        href="/tools/"
        className="underline hover:text-slate-900 text-sm text-slate-600"
      >
        &larr; Back to Tools
      </Link>
    </main>
  );
}
