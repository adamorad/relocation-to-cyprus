"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

interface Inputs {
  monthlyRent: number;
  purchasePrice: number;
  downPaymentPct: number;
  mortgageRate: number;
  investmentReturn: number;
  horizon: number;
  rentIncrease: number;
  appreciation: number;
}

interface YearRow {
  year: number;
  rentTotal: number;
  buyTotal: number;
  rentCumulative: number;
  buyCumulative: number;
  homeEquity: number;
  netBuyCost: number;
}

function calcMortgagePayment(
  principal: number,
  annualRate: number,
  years: number,
): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

function runModel(inputs: Inputs): YearRow[] {
  const {
    monthlyRent,
    purchasePrice,
    downPaymentPct,
    mortgageRate,
    investmentReturn,
    horizon,
    rentIncrease,
    appreciation,
  } = inputs;

  const downPayment = purchasePrice * (downPaymentPct / 100);
  const loanAmount = purchasePrice - downPayment;
  const mortgageTerm = 25;
  const monthlyMortgage = calcMortgagePayment(loanAmount, mortgageRate, mortgageTerm);

  // Buying upfront costs: assume 5% (transfer fees + legal)
  const upfrontCosts = purchasePrice * 0.05;

  const rows: YearRow[] = [];

  let rentCumulative = 0;
  let buyCumulative = upfrontCosts + downPayment;
  // Opportunity cost: the down payment + upfront costs could have been invested
  let missedInvestment = downPayment + upfrontCosts;

  let currentRent = monthlyRent;

  for (let y = 1; y <= horizon; y++) {
    // Rent side: this year's rent payments
    const rentThisYear = currentRent * 12;
    rentCumulative += rentThisYear;
    currentRent *= 1 + rentIncrease / 100;

    // Buy side: mortgage payments this year
    const mortgageThisYear = monthlyMortgage * 12;
    buyCumulative += mortgageThisYear;

    // Property value at end of year
    const homeValue = purchasePrice * Math.pow(1 + appreciation / 100, y);

    // Remaining loan balance
    const r = mortgageRate / 100 / 12;
    const n = mortgageTerm * 12;
    const paymentsMade = Math.min(y * 12, n);
    let loanBalance = 0;
    if (paymentsMade < n && r > 0) {
      loanBalance =
        loanAmount *
        ((Math.pow(1 + r, n) - Math.pow(1 + r, paymentsMade)) /
          (Math.pow(1 + r, n) - 1));
    }

    const homeEquity = homeValue - loanBalance;

    // Opportunity cost of invested down payment
    missedInvestment *= 1 + investmentReturn / 100;

    // Net buy cost = cumulative payments + opportunity cost of down payment - equity gained
    const netBuyCost = buyCumulative + (missedInvestment - (downPayment + upfrontCosts)) - homeEquity + purchasePrice;

    rows.push({
      year: y,
      rentTotal: rentThisYear,
      buyTotal: mortgageThisYear,
      rentCumulative,
      buyCumulative: netBuyCost,
      homeEquity,
      netBuyCost,
    });
  }

  return rows;
}

function fmt(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-IE");
}

function NumInput({
  label,
  value,
  onChange,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white focus-within:border-[#35cdc4]">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full outline-none text-slate-900 text-sm bg-transparent"
        />
        {suffix && <span className="text-slate-400 text-sm shrink-0">{suffix}</span>}
      </div>
    </div>
  );
}

export default function RentVsBuyPage() {
  const [inputs, setInputs] = useState<Inputs>({
    monthlyRent: 1400,
    purchasePrice: 300000,
    downPaymentPct: 30,
    mortgageRate: 4.5,
    investmentReturn: 6,
    horizon: 10,
    rentIncrease: 3,
    appreciation: 4,
  });

  const set = (key: keyof Inputs) => (v: number) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const rows = useMemo(() => runModel(inputs), [inputs]);

  const breakEvenYear = rows.find((r) => r.buyCumulative < r.rentCumulative)?.year ?? null;

  const lastRow = rows[rows.length - 1];

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <nav className="text-xs text-slate-500 mb-6 flex gap-3">
        <Link href="/" className="hover:text-slate-900">
          ← Map
        </Link>
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
          Rent vs Buy Calculator
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Compare the true cost of renting versus buying property in Cyprus
          over your chosen time horizon, accounting for mortgage costs,
          investment returns on your down payment, and property appreciation.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="col-span-full text-sm font-bold text-slate-800 mb-1">
          Your inputs
        </h2>
        <NumInput label="Monthly Rent" value={inputs.monthlyRent} onChange={set("monthlyRent")} suffix="€" min={0} step={50} />
        <NumInput label="Purchase Price" value={inputs.purchasePrice} onChange={set("purchasePrice")} suffix="€" min={0} step={5000} />
        <NumInput label="Down Payment" value={inputs.downPaymentPct} onChange={set("downPaymentPct")} suffix="%" min={5} max={100} step={1} />
        <NumInput label="Mortgage Rate" value={inputs.mortgageRate} onChange={set("mortgageRate")} suffix="%" min={0} max={20} step={0.1} />
        <NumInput label="Investment Return on Saved Capital" value={inputs.investmentReturn} onChange={set("investmentReturn")} suffix="%" min={0} max={30} step={0.5} />
        <NumInput label="Time Horizon" value={inputs.horizon} onChange={set("horizon")} suffix="years" min={1} max={30} step={1} />
        <NumInput label="Annual Rent Increase" value={inputs.rentIncrease} onChange={set("rentIncrease")} suffix="%" min={0} max={20} step={0.5} />
        <NumInput label="Annual Property Appreciation" value={inputs.appreciation} onChange={set("appreciation")} suffix="%" min={-5} max={20} step={0.5} />
      </section>

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Break-even Year</p>
          <p className="text-2xl font-bold" style={{ color: "#35cdc4" }}>
            {breakEvenYear ? `Year ${breakEvenYear}` : "Not within horizon"}
          </p>
          <p className="text-xs text-slate-500 mt-1">when buying becomes cheaper</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Rent Total ({inputs.horizon}yr)
          </p>
          <p className="text-2xl font-bold text-amber-600">
            {fmt(lastRow.rentCumulative)}
          </p>
          <p className="text-xs text-slate-500 mt-1">cumulative rent paid</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Buy Net Cost ({inputs.horizon}yr)
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {fmt(lastRow.buyCumulative)}
          </p>
          <p className="text-xs text-slate-500 mt-1">after equity &amp; opportunity cost</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3">Year-by-year comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wide">
                <th className="px-3 py-2 text-left font-semibold">Year</th>
                <th className="px-3 py-2 text-right font-semibold">Cumulative Rent</th>
                <th className="px-3 py-2 text-right font-semibold">Buy Net Cost</th>
                <th className="px-3 py-2 text-right font-semibold">Home Equity</th>
                <th className="px-3 py-2 text-right font-semibold">Rent vs Buy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const rentAhead = row.rentCumulative > row.buyCumulative;
                return (
                  <tr key={row.year} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-700">Year {row.year}</td>
                    <td className="px-3 py-2 text-right text-amber-700">{fmt(row.rentCumulative)}</td>
                    <td className="px-3 py-2 text-right text-slate-700">{fmt(row.buyCumulative)}</td>
                    <td className="px-3 py-2 text-right" style={{ color: "#35cdc4" }}>{fmt(row.homeEquity)}</td>
                    <td className="px-3 py-2 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          rentAhead
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {rentAhead ? "Buy ahead" : "Rent ahead"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">Cyprus market assumptions note</p>
        <p>
          Based on Cyprus market assumptions. Does not include transfer fees
          (typically 3–8%), legal costs (~€2,000–4,000), or renovation. The
          model assumes a 25-year mortgage term, 5% upfront costs, and that the
          alternative to the down payment is invested at your stated return.
          Verify current mortgage rates with your bank. This calculator is for
          illustrative purposes only and does not constitute financial advice.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools" className="underline hover:text-slate-900">
          ← All Tools
        </Link>
      </p>
    </main>
  );
}
