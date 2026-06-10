"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── types ────────────────────────────────────────────────────────────────────

type EmploymentType = "employed" | "self-employed" | "company-owner";

type CountryKey =
  | "UK"
  | "USA"
  | "Germany"
  | "Netherlands"
  | "France"
  | "Israel"
  | "South Africa"
  | "Australia"
  | "Canada"
  | "Portugal"
  | "Spain"
  | "UAE"
  | "Sweden"
  | "Switzerland"
  | "Other";

interface TaxResult {
  incomeTax: number;
  socialHealth: number;
  dividendTax: number;
  totalTax: number;
  effectiveRate: number;
}

// ── tax calculation helpers ──────────────────────────────────────────────────

function applyBands(
  income: number,
  bands: Array<{ upTo: number; rate: number }>,
): number {
  let tax = 0;
  let prev = 0;
  for (const { upTo, rate } of bands) {
    if (income <= prev) break;
    const slice = Math.min(income, upTo) - prev;
    tax += slice * rate;
    prev = upTo;
  }
  return tax;
}

// Returns effective income tax for source country (EUR)
function calcSourceIncomeTax(
  country: CountryKey,
  grossIncome: number,
  employmentType: EmploymentType,
  manualRate: number,
): number {
  if (country === "UAE") return 0;

  if (country === "Other") {
    return grossIncome * (manualRate / 100);
  }

  switch (country) {
    case "UK": {
      // Personal allowance £12,570 ≈ EUR14,600; bands approximated in EUR
      const bands = [
        { upTo: 14_600, rate: 0 },
        { upTo: 58_000, rate: 0.2 },
        { upTo: 145_000, rate: 0.4 },
        { upTo: Infinity, rate: 0.45 },
      ];
      return applyBands(grossIncome, bands);
    }

    case "USA": {
      // Approximate effective federal+state blended rates
      if (grossIncome <= 80_000) return grossIncome * 0.22;
      if (grossIncome <= 150_000) return grossIncome * 0.22 + (grossIncome - 80_000) * 0.08;
      if (grossIncome <= 300_000) return 80_000 * 0.22 + 70_000 * 0.3 + (grossIncome - 150_000) * 0.32;
      return 80_000 * 0.22 + 70_000 * 0.3 + 150_000 * 0.32 + (grossIncome - 300_000) * 0.35;
    }

    case "Germany": {
      // Approximated progressive + solidarity
      if (grossIncome <= 10_908) return 0;
      if (grossIncome <= 62_000) return grossIncome * 0.25;
      if (grossIncome <= 120_000) return grossIncome * 0.35;
      if (grossIncome <= 200_000) return grossIncome * 0.42;
      return grossIncome * 0.45;
    }

    case "Netherlands": {
      const bands = [
        { upTo: 73_000, rate: 0.3707 },
        { upTo: Infinity, rate: 0.495 },
      ];
      return applyBands(grossIncome, bands);
    }

    case "France": {
      const bands = [
        { upTo: 11_000, rate: 0 },
        { upTo: 28_000, rate: 0.11 },
        { upTo: 82_000, rate: 0.3 },
        { upTo: 168_000, rate: 0.41 },
        { upTo: Infinity, rate: 0.45 },
      ];
      return applyBands(grossIncome, bands);
    }

    case "Israel": {
      if (grossIncome <= 80_000) return grossIncome * 0.25;
      if (grossIncome <= 150_000) return grossIncome * 0.3;
      if (grossIncome <= 250_000) return grossIncome * 0.38;
      return grossIncome * 0.5;
    }

    case "South Africa": {
      if (grossIncome <= 50_000) return grossIncome * 0.2;
      if (grossIncome <= 100_000) return grossIncome * 0.3;
      if (grossIncome <= 200_000) return grossIncome * 0.38;
      return grossIncome * 0.45;
    }

    case "Australia": {
      // AUD approximated to EUR (1 AUD ≈ 0.6 EUR)
      const eurToAud = 1 / 0.6;
      const aud = grossIncome * eurToAud;
      let taxAud = 0;
      if (aud <= 18_200) taxAud = 0;
      else if (aud <= 45_000) taxAud = (aud - 18_200) * 0.19;
      else if (aud <= 120_000) taxAud = 5_092 + (aud - 45_000) * 0.325;
      else if (aud <= 180_000) taxAud = 29_467 + (aud - 120_000) * 0.37;
      else taxAud = 51_667 + (aud - 180_000) * 0.45;
      return taxAud * 0.6; // convert back to EUR
    }

    case "Canada": {
      if (grossIncome <= 80_000) return grossIncome * 0.28;
      if (grossIncome <= 150_000) return grossIncome * 0.33;
      return 150_000 * 0.33 + (grossIncome - 150_000) * 0.43;
    }

    case "Portugal": {
      // Standard NHR not applicable for new arrivals since 2024; standard rate
      const bands = [
        { upTo: 7_703, rate: 0.1325 },
        { upTo: 11_623, rate: 0.18 },
        { upTo: 16_472, rate: 0.23 },
        { upTo: 21_321, rate: 0.26 },
        { upTo: 27_146, rate: 0.3288 },
        { upTo: 39_791, rate: 0.37 },
        { upTo: 51_997, rate: 0.435 },
        { upTo: 81_199, rate: 0.45 },
        { upTo: Infinity, rate: 0.48 },
      ];
      return applyBands(grossIncome, bands);
    }

    case "Spain": {
      const bands = [
        { upTo: 12_450, rate: 0.19 },
        { upTo: 20_200, rate: 0.24 },
        { upTo: 35_200, rate: 0.3 },
        { upTo: 60_000, rate: 0.37 },
        { upTo: 300_000, rate: 0.45 },
        { upTo: Infinity, rate: 0.47 },
      ];
      return applyBands(grossIncome, bands);
    }

    case "Sweden": {
      // Municipal ~32% + state above ~54k EUR
      if (grossIncome <= 54_000) return grossIncome * 0.32;
      return 54_000 * 0.32 + (grossIncome - 54_000) * 0.52;
    }

    case "Switzerland": {
      // Federal + cantonal average
      if (grossIncome <= 50_000) return grossIncome * 0.2;
      if (grossIncome <= 100_000) return grossIncome * 0.27;
      if (grossIncome <= 200_000) return grossIncome * 0.33;
      return grossIncome * 0.35;
    }

    default:
      return grossIncome * (manualRate / 100);
  }
}

// Social/health contributions by country (approximate employee/self-emp portion)
function calcSourceSocial(
  country: CountryKey,
  grossIncome: number,
  employmentType: EmploymentType,
): number {
  if (country === "UAE") return 0;
  if (country === "Other") return 0;

  switch (country) {
    case "UK":
      // NI: 8% on 12,570–50,270; 2% above
      return Math.min(Math.max(grossIncome - 12_570, 0), 50_270 - 12_570) * 0.08 +
        Math.max(grossIncome - 50_270, 0) * 0.02;
    case "USA":
      return Math.min(grossIncome, 160_200) * 0.0765; // FICA
    case "Germany":
      return Math.min(grossIncome, 87_600) * 0.2; // approx employee share
    case "Netherlands":
      return Math.min(grossIncome, 66_000) * 0.2775;
    case "France":
      return grossIncome * (employmentType === "employed" ? 0.22 : 0.35);
    case "Israel":
      return Math.min(grossIncome, 110_000) * 0.12;
    case "South Africa":
      return Math.min(grossIncome, 15_000) * 0.01; // nominal UIF cap
    case "Australia":
      return grossIncome * 0.02; // Medicare levy
    case "Canada":
      return Math.min(grossIncome, 66_000) * 0.0595; // CPP
    case "Portugal":
      return Math.min(grossIncome, 100_000) * (employmentType === "employed" ? 0.11 : 0.214);
    case "Spain":
      return Math.min(grossIncome, 54_000) * (employmentType === "employed" ? 0.064 : 0.306);
    case "Sweden":
      return grossIncome * (employmentType === "employed" ? 0.07 : 0.2857);
    case "Switzerland":
      return Math.min(grossIncome, 88_200) * 0.053; // AHV employee share
    default:
      return 0;
  }
}

// Cyprus income tax bands
function calcCyprusIncomeTax(income: number): number {
  const bands = [
    { upTo: 19_500, rate: 0 },
    { upTo: 28_000, rate: 0.2 },
    { upTo: 36_300, rate: 0.25 },
    { upTo: 60_000, rate: 0.3 },
    { upTo: Infinity, rate: 0.35 },
  ];
  return applyBands(income, bands);
}

// Cyprus GeSY (healthcare)
function calcCyprusGesy(income: number, employmentType: EmploymentType): number {
  const rate = employmentType === "employed" ? 0.0265 : 0.04;
  return Math.min(income, 180_000) * rate;
}

// ── main calculation ─────────────────────────────────────────────────────────

interface CalcInput {
  country: CountryKey;
  employmentType: EmploymentType;
  grossIncome: number;
  salaryPct: number; // 0-100, only used for company-owner
  manualRate: number;
}

interface Comparison {
  source: TaxResult;
  cyprusStandard: TaxResult;
  cyprusNonDom: TaxResult;
}

function calculate(input: CalcInput): Comparison {
  const { country, employmentType, grossIncome, salaryPct, manualRate } = input;

  // ── Source country ──
  const srcIncomeTax = calcSourceIncomeTax(country, grossIncome, employmentType, manualRate);
  const srcSocial = calcSourceSocial(country, grossIncome, employmentType);
  const srcTotalTax = srcIncomeTax + srcSocial;

  const source: TaxResult = {
    incomeTax: srcIncomeTax,
    socialHealth: srcSocial,
    dividendTax: 0,
    totalTax: srcTotalTax,
    effectiveRate: grossIncome > 0 ? srcTotalTax / grossIncome : 0,
  };

  // ── Cyprus Standard ──
  let cypStdIncomeTax: number;
  let cypStdSocial: number;
  let cypStdDividend: number;

  if (employmentType === "company-owner") {
    const salaryAmount = grossIncome * (salaryPct / 100);
    const dividendAmount = grossIncome * (1 - salaryPct / 100);
    const corporateTax = dividendAmount * 0.125; // 12.5% corporate tax on profit portion
    const netDividend = dividendAmount - corporateTax;

    cypStdIncomeTax = calcCyprusIncomeTax(salaryAmount);
    cypStdSocial = calcCyprusGesy(salaryAmount, "employed");
    // Standard: SDC 17% on dividends
    cypStdDividend = netDividend * 0.17 + corporateTax;
  } else {
    cypStdIncomeTax = calcCyprusIncomeTax(grossIncome);
    cypStdSocial = calcCyprusGesy(grossIncome, employmentType);
    cypStdDividend = 0;
  }

  const cypStdTotal = cypStdIncomeTax + cypStdSocial + cypStdDividend;
  const cyprusStandard: TaxResult = {
    incomeTax: cypStdIncomeTax,
    socialHealth: cypStdSocial,
    dividendTax: cypStdDividend,
    totalTax: cypStdTotal,
    effectiveRate: grossIncome > 0 ? cypStdTotal / grossIncome : 0,
  };

  // ── Cyprus Non-Dom ──
  let cypNdIncomeTax: number;
  let cypNdSocial: number;
  let cypNdDividend: number;

  if (employmentType === "company-owner") {
    const salaryAmount = grossIncome * (salaryPct / 100);
    const dividendAmount = grossIncome * (1 - salaryPct / 100);
    const corporateTax = dividendAmount * 0.125;
    const netDividend = dividendAmount - corporateTax;

    cypNdIncomeTax = calcCyprusIncomeTax(salaryAmount);
    cypNdSocial = calcCyprusGesy(salaryAmount, "employed");
    // Non-dom: SDC exempt on dividends, only corporate tax
    cypNdDividend = corporateTax;
    // GeSY on dividends for non-dom (2.65% if employed structure, capped)
    const gesyOnDividend = Math.min(netDividend, Math.max(180_000 - salaryAmount, 0)) * 0.0265;
    cypNdDividend += gesyOnDividend;
  } else {
    cypNdIncomeTax = calcCyprusIncomeTax(grossIncome);
    cypNdSocial = calcCyprusGesy(grossIncome, employmentType);
    cypNdDividend = 0;
  }

  const cypNdTotal = cypNdIncomeTax + cypNdSocial + cypNdDividend;
  const cyprusNonDom: TaxResult = {
    incomeTax: cypNdIncomeTax,
    socialHealth: cypNdSocial,
    dividendTax: cypNdDividend,
    totalTax: cypNdTotal,
    effectiveRate: grossIncome > 0 ? cypNdTotal / grossIncome : 0,
  };

  return { source, cyprusStandard, cyprusNonDom };
}

// ── formatting ───────────────────────────────────────────────────────────────

function fmtEur(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-IE");
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

// ── sub-components ───────────────────────────────────────────────────────────

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label}
        </label>
        <span className="text-sm font-bold text-slate-900">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#35cdc4]"
      />
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{min.toLocaleString("en-IE")}</span>
        <span>{max.toLocaleString("en-IE")}</span>
      </div>
    </div>
  );
}

function ComparisonTable({
  grossIncome,
  result,
  showDividends,
  sourceLabel,
}: {
  grossIncome: number;
  result: Comparison;
  showDividends: boolean;
  sourceLabel: string;
}) {
  const savingStd = result.source.totalTax - result.cyprusStandard.totalTax;
  const savingNd = result.source.totalTax - result.cyprusNonDom.totalTax;

  const rows: Array<{
    label: string;
    source: string;
    std: string;
    nd: string;
    highlight?: "source" | "std" | "nd";
  }> = [
    {
      label: "Gross income",
      source: fmtEur(grossIncome),
      std: fmtEur(grossIncome),
      nd: fmtEur(grossIncome),
    },
    {
      label: "Income tax",
      source: fmtEur(result.source.incomeTax),
      std: fmtEur(result.cyprusStandard.incomeTax),
      nd: fmtEur(result.cyprusNonDom.incomeTax),
    },
    {
      label: "Social / health",
      source: fmtEur(result.source.socialHealth),
      std: fmtEur(result.cyprusStandard.socialHealth),
      nd: fmtEur(result.cyprusNonDom.socialHealth),
    },
    ...(showDividends
      ? [
          {
            label: "Dividend / corp tax",
            source: fmtEur(result.source.dividendTax),
            std: fmtEur(result.cyprusStandard.dividendTax),
            nd: fmtEur(result.cyprusNonDom.dividendTax),
          },
        ]
      : []),
    {
      label: "Total tax",
      source: fmtEur(result.source.totalTax),
      std: fmtEur(result.cyprusStandard.totalTax),
      nd: fmtEur(result.cyprusNonDom.totalTax),
    },
    {
      label: "Effective rate",
      source: fmtPct(result.source.effectiveRate),
      std: fmtPct(result.cyprusStandard.effectiveRate),
      nd: fmtPct(result.cyprusNonDom.effectiveRate),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-xs min-w-[480px]">
        <thead>
          <tr className="bg-slate-50 text-slate-500 uppercase tracking-wide text-[10px]">
            <th className="px-3 py-3 text-left font-semibold w-36"></th>
            <th className="px-3 py-3 text-right font-semibold">{sourceLabel}</th>
            <th className="px-3 py-3 text-right font-semibold bg-teal-50 text-teal-700">
              Cyprus Standard
            </th>
            <th className="px-3 py-3 text-right font-semibold bg-teal-50 text-teal-700">
              Cyprus Non-Dom
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-3 py-2.5 font-medium text-slate-600">{row.label}</td>
              <td className="px-3 py-2.5 text-right text-slate-700">{row.source}</td>
              <td className="px-3 py-2.5 text-right text-slate-700 bg-teal-50/40">{row.std}</td>
              <td className="px-3 py-2.5 text-right text-slate-700 bg-teal-50/40">{row.nd}</td>
            </tr>
          ))}
          {/* Saving row */}
          <tr className="border-t-2 border-slate-200 bg-slate-50 font-semibold">
            <td className="px-3 py-3 text-slate-700 text-xs">Est. annual saving</td>
            <td className="px-3 py-3 text-right text-slate-400 text-xs">—</td>
            <td className="px-3 py-3 text-right text-xs">
              <span
                className={
                  savingStd > 0
                    ? "text-teal-600 font-bold"
                    : savingStd < 0
                    ? "text-red-500 font-bold"
                    : "text-slate-500"
                }
              >
                {savingStd > 0 ? "+" : ""}
                {fmtEur(savingStd)}
              </span>
            </td>
            <td className="px-3 py-3 text-right text-xs">
              <span
                className={
                  savingNd > 0
                    ? "text-teal-600 font-bold"
                    : savingNd < 0
                    ? "text-red-500 font-bold"
                    : "text-slate-500"
                }
              >
                {savingNd > 0 ? "+" : ""}
                {fmtEur(savingNd)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const COUNTRIES: CountryKey[] = [
  "UK",
  "USA",
  "Germany",
  "Netherlands",
  "France",
  "Israel",
  "South Africa",
  "Australia",
  "Canada",
  "Portugal",
  "Spain",
  "UAE",
  "Sweden",
  "Switzerland",
  "Other",
];

const COUNTRY_NOTES: Partial<Record<CountryKey, string>> = {
  USA: "US rates are approximate federal + average state blended. Actual state taxes vary significantly.",
  Australia: "AUD rates converted to EUR at approx. 0.60 exchange rate. Medicare levy included.",
  Portugal: "Standard progressive rates shown. Former NHR regime (flat 20%) closed to new applicants from Jan 2024.",
  UAE: "UAE has no personal income tax.",
};

export default function TaxSavingsCalculatorClient() {
  const [country, setCountry] = useState<CountryKey>("UK");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("employed");
  const [grossIncome, setGrossIncome] = useState(80_000);
  const [salaryPct, setSalaryPct] = useState(40);
  const [manualRate, setManualRate] = useState(30);

  const result = useMemo(
    () =>
      calculate({
        country,
        employmentType,
        grossIncome,
        salaryPct,
        manualRate,
      }),
    [country, employmentType, grossIncome, salaryPct, manualRate],
  );

  const showDividends = employmentType === "company-owner";
  const countryNote = COUNTRY_NOTES[country];

  const savingNd = result.source.totalTax - result.cyprusNonDom.totalTax;

  return (
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      {/* breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo;{" "}
        <span className="text-slate-900">Cyprus Tax Savings Calculator</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Tax
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Cyprus Tax Savings Calculator
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Compare your current country&apos;s tax burden against Cyprus Standard and
          Non-Dom regimes. See your estimated annual saving at a glance.
        </p>
      </header>

      {/* inputs */}
      <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-8 flex flex-col gap-6">
        <h2 className="text-sm font-bold text-slate-800 -mb-2">Your details</h2>

        {/* Country */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Current country of residence
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryKey)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {countryNote && (
            <p className="text-[11px] text-slate-500 italic">{countryNote}</p>
          )}
        </div>

        {/* Manual rate for "Other" */}
        {country === "Other" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Your effective income tax rate (%)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                max={70}
                step={0.5}
                value={manualRate}
                onChange={(e) => setManualRate(Number(e.target.value))}
                className="w-28 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
              />
              <span className="text-sm text-slate-600">% effective rate</span>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Social contributions not included for &quot;Other&quot; — enter your combined effective rate if preferred.
            </p>
          </div>
        )}

        {/* Employment type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Employment type
          </label>
          <div className="flex gap-2 flex-wrap">
            {(
              [
                { value: "employed", label: "Employed" },
                { value: "self-employed", label: "Self-employed" },
                { value: "company-owner", label: "Company owner (dividends)" },
              ] as Array<{ value: EmploymentType; label: string }>
            ).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setEmploymentType(value)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  employmentType === value
                    ? "bg-[#35cdc4] text-slate-900"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#35cdc4]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Income slider */}
        <SliderRow
          label="Annual gross income (EUR)"
          value={grossIncome}
          min={10_000}
          max={500_000}
          step={5_000}
          display={fmtEur(grossIncome)}
          onChange={setGrossIncome}
        />

        {/* Salary vs dividend split (company owner only) */}
        {showDividends && (
          <div className="flex flex-col gap-1.5 p-4 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Income split: salary vs dividends
              </label>
              <span className="text-sm font-bold text-slate-900">
                {salaryPct}% salary / {100 - salaryPct}% dividends
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={salaryPct}
              onChange={(e) => setSalaryPct(Number(e.target.value))}
              className="w-full accent-[#35cdc4]"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% salary (all dividends)</span>
              <span>100% salary</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Cyprus corporate tax: 12.5% on profits. Non-dom: no SDC (17%) on dividends.
            </p>
          </div>
        )}
      </section>

      {/* Highlight saving callout */}
      {savingNd > 0 && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-4">
          <div className="text-3xl font-bold text-teal-600">{fmtEur(savingNd)}</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              estimated annual tax saving with Cyprus Non-Dom
            </p>
            <p className="text-xs text-slate-600">
              vs. {country} — at {fmtEur(grossIncome)} gross income
            </p>
          </div>
        </div>
      )}
      {savingNd <= 0 && (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-sm text-slate-600">
            At this income level, Cyprus may not offer a lower tax burden than {country}.
            Try adjusting the income or employment type.
          </p>
        </div>
      )}

      {/* Comparison table */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3">Tax comparison</h2>
        <ComparisonTable
          grossIncome={grossIncome}
          result={result}
          showDividends={showDividends}
          sourceLabel={country}
        />
      </section>

      {/* Why Cyprus info box */}
      <aside className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-2">Why Cyprus?</p>
        <ul className="space-y-1.5 text-xs leading-relaxed">
          <li>
            <span className="font-semibold text-teal-700">Non-Dom regime:</span>{" "}
            Exempt from Special Defence Contribution (SDC) — 17% dividend tax
            and 30% interest tax — for 17 years after obtaining non-dom status.
          </li>
          <li>
            <span className="font-semibold text-teal-700">12.5% corporate tax:</span>{" "}
            One of the lowest in the EU. Companies pay 12.5% on net profits.
          </li>
          <li>
            <span className="font-semibold text-teal-700">No inheritance tax:</span>{" "}
            Cyprus abolished inheritance tax in 2000.
          </li>
          <li>
            <span className="font-semibold text-teal-700">No capital gains tax</span>{" "}
            on disposal of securities (shares, bonds, etc.). CGT applies only
            to immovable property in Cyprus.
          </li>
          <li>
            <span className="font-semibold text-teal-700">Income tax relief:</span>{" "}
            New residents with foreign-source employment income may qualify for a
            50% income tax exemption on earnings above €100,000 (five-year new
            resident relief).
          </li>
        </ul>
      </aside>

      {/* Illustrative note */}
      <aside className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Simplified illustration</p>
        <p>
          This tool uses approximate effective tax rates for illustration purposes. Actual
          tax liability depends on your personal circumstances, deductions, tax treaties,
          residency status, and applicable law. Always consult a Cyprus-qualified accountant
          and legal adviser before making relocation decisions.
        </p>
      </aside>

      {/* Next steps */}
      <aside className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Related tools
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/tax-residency-planner/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Tax Residency Planner →
          </Link>
          <Link
            href="/tools/double-tax-treaty-finder/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Double Tax Treaty Finder →
          </Link>
          <Link
            href="/tools/freelancer-vs-company/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Freelancer vs Company →
          </Link>
        </div>
      </aside>

      {/* Disclaimer */}
      <aside className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>General information only — not legal, tax, or financial advice.</p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          &larr; Back to Tools
        </Link>
      </p>
    </main>
  );
}
