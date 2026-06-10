"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

interface Inputs {
  purchasePrice: number;
  monthlyRent: number;
  managementFeePct: number;
  annualMaintenance: number;
  vacancyRatePct: number;
  appreciationPct: number;
  horizon: 5 | 10 | 15;
}

interface YearRow {
  year: number;
  cumRentIncome: number;
  propertyValue: number;
  cumTotalGain: number;
}

interface Results {
  grossYieldPct: number;
  annualExpenses: number;
  netYieldPct: number;
  annualCashFlow: number;
  breakEvenYears: number | null;
  totalReturnAtHorizon: number;
  annualisedReturnPct: number;
  rows: YearRow[];
  propertyTax: number;
}

function runModel(inputs: Inputs): Results {
  const {
    purchasePrice,
    monthlyRent,
    managementFeePct,
    annualMaintenance,
    vacancyRatePct,
    appreciationPct,
    horizon,
  } = inputs;

  const annualRent = monthlyRent * 12;
  const propertyTax = purchasePrice * 0.001; // 0.1% of purchase price
  const managementFee = annualRent * (managementFeePct / 100);
  const vacancyLoss = annualRent * (vacancyRatePct / 100);
  const annualExpenses = managementFee + annualMaintenance + propertyTax + vacancyLoss;

  const grossYieldPct = (annualRent / purchasePrice) * 100;
  const netYieldPct = ((annualRent - annualExpenses) / purchasePrice) * 100;
  const annualCashFlow = annualRent - annualExpenses;

  const breakEvenYears =
    annualCashFlow > 0 ? purchasePrice / annualCashFlow : null;

  const appreciationGain =
    purchasePrice * Math.pow(1 + appreciationPct / 100, horizon) - purchasePrice;
  const cumulativeCashFlow = annualCashFlow * horizon;
  const totalReturnAtHorizon = cumulativeCashFlow + appreciationGain;
  const totalGainRatio = totalReturnAtHorizon / purchasePrice;
  const annualisedReturnPct =
    totalGainRatio > -1
      ? (Math.pow(1 + totalGainRatio, 1 / horizon) - 1) * 100
      : -100;

  const rows: YearRow[] = [];
  for (let y = 1; y <= horizon; y++) {
    const cumRentIncome = annualCashFlow * y;
    const propertyValue =
      purchasePrice * Math.pow(1 + appreciationPct / 100, y);
    const appreciationGainY = propertyValue - purchasePrice;
    const cumTotalGain = cumRentIncome + appreciationGainY;
    rows.push({ year: y, cumRentIncome, propertyValue, cumTotalGain });
  }

  return {
    grossYieldPct,
    annualExpenses,
    netYieldPct,
    annualCashFlow,
    breakEvenYears,
    totalReturnAtHorizon,
    annualisedReturnPct,
    rows,
    propertyTax,
  };
}

function fmt(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-IE");
}

function fmtPct(n: number, dp = 1): string {
  return n.toFixed(dp) + "%";
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
  note,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label}
        </label>
        <span className="text-sm font-bold text-slate-900 tabular-nums">
          {display}
        </span>
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
        <span>
          {typeof min === "number" && min >= 1000
            ? "€" + min.toLocaleString("en-IE")
            : min}
        </span>
        <span>
          {typeof max === "number" && max >= 1000
            ? "€" + max.toLocaleString("en-IE")
            : max}
        </span>
      </div>
      {note && <p className="text-[10px] text-slate-500 -mt-0.5">{note}</p>}
    </div>
  );
}

export default function RentalYieldCalculatorClient() {
  const [inputs, setInputs] = useState<Inputs>({
    purchasePrice: 350000,
    monthlyRent: 1200,
    managementFeePct: 8,
    annualMaintenance: 1500,
    vacancyRatePct: 5,
    appreciationPct: 3,
    horizon: 10,
  });

  const set =
    <K extends keyof Inputs>(key: K) =>
    (v: Inputs[K]) =>
      setInputs((prev) => ({ ...prev, [key]: v }));

  const results = useMemo(() => runModel(inputs), [inputs]);

  const {
    grossYieldPct,
    annualExpenses,
    netYieldPct,
    annualCashFlow,
    breakEvenYears,
    totalReturnAtHorizon,
    annualisedReturnPct,
    rows,
    propertyTax,
  } = results;

  const horizonOptions: Array<5 | 10 | 15> = [5, 10, 15];

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
        &rsaquo; <span>Rental Yield Calculator</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Finance Tools
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Rental Yield Calculator
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
          Calculate gross yield, net yield, annual cash flow, and total return
          for a Cyprus buy-to-let investment. Models appreciation and expenses
          over up to 15 years.
        </p>
      </header>

      {/* Inputs */}
      <section className="p-5 bg-slate-50 rounded-xl border border-slate-200 mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-5">
          Property inputs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SliderInput
            label="Purchase price"
            value={inputs.purchasePrice}
            onChange={set("purchasePrice")}
            min={100000}
            max={1500000}
            step={5000}
            display={"€" + inputs.purchasePrice.toLocaleString("en-IE")}
          />
          <SliderInput
            label="Monthly rent"
            value={inputs.monthlyRent}
            onChange={set("monthlyRent")}
            min={500}
            max={5000}
            step={50}
            display={"€" + inputs.monthlyRent.toLocaleString("en-IE") + "/mo"}
          />
          <SliderInput
            label="Management fee"
            value={inputs.managementFeePct}
            onChange={set("managementFeePct")}
            min={0}
            max={15}
            step={0.5}
            display={fmtPct(inputs.managementFeePct)}
            note="Typical letting agent fee"
          />
          <SliderInput
            label="Annual maintenance"
            value={inputs.annualMaintenance}
            onChange={set("annualMaintenance")}
            min={0}
            max={5000}
            step={100}
            display={"€" + inputs.annualMaintenance.toLocaleString("en-IE")}
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Property tax (IPT)
              </label>
              <span className="text-sm font-bold text-slate-900 tabular-nums">
                {fmt(propertyTax)}/yr
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              0.1% of purchase price — calculated automatically
            </p>
          </div>
          <SliderInput
            label="Vacancy rate"
            value={inputs.vacancyRatePct}
            onChange={set("vacancyRatePct")}
            min={0}
            max={20}
            step={1}
            display={fmtPct(inputs.vacancyRatePct)}
          />
          <SliderInput
            label="Annual appreciation"
            value={inputs.appreciationPct}
            onChange={set("appreciationPct")}
            min={0}
            max={8}
            step={0.5}
            display={fmtPct(inputs.appreciationPct)}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Investment horizon
            </label>
            <div className="flex gap-2">
              {horizonOptions.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => set("horizon")(h)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    inputs.horizon === h
                      ? "bg-[#35cdc4] text-slate-900 border-[#35cdc4]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#35cdc4]"
                  }`}
                >
                  {h} yr
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary card */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-4">
          Results summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Gross yield
            </p>
            <p className="text-2xl font-bold" style={{ color: "#35cdc4" }}>
              {fmtPct(grossYieldPct)}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Net yield
            </p>
            <p
              className={`text-2xl font-bold ${netYieldPct >= 0 ? "text-slate-900" : "text-red-600"}`}
            >
              {fmtPct(netYieldPct)}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Annual cash flow
            </p>
            <p
              className={`text-2xl font-bold ${annualCashFlow >= 0 ? "text-slate-900" : "text-red-600"}`}
            >
              {fmt(annualCashFlow)}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Break-even
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {breakEvenYears !== null
                ? breakEvenYears <= 99
                  ? `${Math.ceil(breakEvenYears)} yr`
                  : "100+ yr"
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Annual expenses
            </p>
            <p className="text-xl font-bold text-slate-900">
              {fmt(annualExpenses)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Management + maintenance + IPT + vacancy
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Total return ({inputs.horizon} yr)
            </p>
            <p
              className={`text-xl font-bold ${totalReturnAtHorizon >= 0 ? "text-slate-900" : "text-red-600"}`}
            >
              {fmt(totalReturnAtHorizon)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Cash flow income + appreciation gain
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              Annualised return
            </p>
            <p
              className={`text-xl font-bold ${annualisedReturnPct >= 0 ? "text-slate-900" : "text-red-600"}`}
            >
              {fmtPct(annualisedReturnPct)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              IRR approximation over {inputs.horizon} years
            </p>
          </div>
        </div>
      </section>

      {/* Year-by-year table */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3">
          Year-by-year projection
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wide">
                <th className="px-3 py-2.5 text-left font-semibold">Year</th>
                <th className="px-3 py-2.5 text-right font-semibold">
                  Cum. rent income
                </th>
                <th className="px-3 py-2.5 text-right font-semibold">
                  Property value
                </th>
                <th className="px-3 py-2.5 text-right font-semibold">
                  Cum. total gain
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.year}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-2 font-medium text-slate-700">
                    Year {row.year}
                  </td>
                  <td
                    className={`px-3 py-2 text-right tabular-nums ${row.cumRentIncome >= 0 ? "text-slate-700" : "text-red-600"}`}
                  >
                    {fmt(row.cumRentIncome)}
                  </td>
                  <td
                    className="px-3 py-2 text-right tabular-nums"
                    style={{ color: "#35cdc4" }}
                  >
                    {fmt(row.propertyValue)}
                  </td>
                  <td
                    className={`px-3 py-2 text-right tabular-nums font-semibold ${row.cumTotalGain >= 0 ? "text-slate-900" : "text-red-600"}`}
                  >
                    {fmt(row.cumTotalGain)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* IPT context box */}
      <aside className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-2">
          Cyprus IPT &amp; rental tax notes
        </p>
        <p>
          Cyprus IPT (Immovable Property Tax) is assessed by local
          municipalities and is typically 0.1–0.2% of the government-assessed
          value, which is usually below market price. Non-resident landlords pay
          income tax on rental income at progressive rates. Verify current rates
          with a Cyprus accountant.
        </p>
      </aside>

      {/* Next steps */}
      <aside className="mb-8 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Next steps
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sections/property-management/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Find a property manager &rarr;
          </Link>
          <Link
            href="/guides/buying-process/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Read: Buying Process Guide &rarr;
          </Link>
          <Link
            href="/tools/rent-vs-buy-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Rent vs Buy Calculator &rarr;
          </Link>
        </div>
      </aside>

      {/* Disclaimer */}
      <aside className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          This calculator provides general estimates for illustrative purposes
          only and does not constitute financial or tax advice. Yields, expenses,
          and appreciation rates vary significantly by location and property
          type. Always verify IPT rates, rental income tax obligations, and
          market conditions with a qualified Cyprus accountant before making
          investment decisions.
        </p>
      </aside>

      <Link href="/tools/" className="underline hover:text-slate-900 text-sm">
        &larr; Back to Tools
      </Link>
    </main>
  );
}
