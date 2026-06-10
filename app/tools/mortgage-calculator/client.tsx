"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── types ────────────────────────────────────────────────────────────────────

interface AmortRow {
  year: number;
  openingBalance: number;
  annualInterest: number;
  annualPrincipal: number;
  closingBalance: number;
}

// ── maths ────────────────────────────────────────────────────────────────────

function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number,
): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function buildAmortization(
  principal: number,
  annualRate: number,
  years: number,
): AmortRow[] {
  const r = annualRate / 100 / 12;
  const monthlyPayment = calcMonthlyPayment(principal, annualRate, years);
  const rows: AmortRow[] = [];
  let balance = principal;

  for (let y = 1; y <= years; y++) {
    const openingBalance = balance;
    let annualInterest = 0;
    let annualPrincipal = 0;

    for (let m = 0; m < 12; m++) {
      const interestCharge = balance * r;
      const principalCharge = Math.min(monthlyPayment - interestCharge, balance);
      annualInterest += interestCharge;
      annualPrincipal += principalCharge;
      balance = Math.max(balance - principalCharge, 0);
    }

    rows.push({
      year: y,
      openingBalance,
      annualInterest,
      annualPrincipal,
      closingBalance: balance,
    });
  }

  return rows;
}

// ── formatting ───────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-IE");
}

// ── sub-components ────────────────────────────────────────────────────────────

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
        <span>
          {step < 1 ? min.toFixed(1) : min.toLocaleString("en-IE")}
          {label.toLowerCase().includes("rate") ||
          label.toLowerCase().includes("%")
            ? "%"
            : ""}
        </span>
        <span>
          {step < 1 ? max.toFixed(1) : max.toLocaleString("en-IE")}
          {label.toLowerCase().includes("rate") ||
          label.toLowerCase().includes("%")
            ? "%"
            : ""}
        </span>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className="text-2xl font-bold"
        style={accent ? { color: "#35cdc4" } : undefined}
      >
        {value}
      </p>
      {sub && <p className="text-[10px] text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const TERM_OPTIONS = [10, 15, 20, 25] as const;
type Term = (typeof TERM_OPTIONS)[number];

export default function MortgageCalculatorClient() {
  const [price, setPrice] = useState(400_000);
  const [downPct, setDownPct] = useState(30);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState<Term>(20);

  const loanAmount = useMemo(() => price * (1 - downPct / 100), [price, downPct]);

  const monthlyPayment = useMemo(
    () => calcMonthlyPayment(loanAmount, rate, term),
    [loanAmount, rate, term],
  );

  const totalRepaid = useMemo(() => monthlyPayment * term * 12, [monthlyPayment, term]);
  const totalInterest = useMemo(() => totalRepaid - loanAmount, [totalRepaid, loanAmount]);

  const amortization = useMemo(
    () => buildAmortization(loanAmount, rate, term),
    [loanAmount, rate, term],
  );

  // Build display rows: first 5, ellipsis row, last year
  const tableRows = useMemo(() => {
    if (term <= 6) return amortization;
    const first5 = amortization.slice(0, 5);
    const last = amortization[amortization.length - 1];
    return { first5, last, middle: term - 6 };
  }, [amortization, term]);

  const isShort = Array.isArray(tableRows);

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      {/* breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span>Mortgage Calculator</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Finance
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Mortgage Calculator
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
          Estimate your monthly repayment, total interest, and amortization
          schedule for a Cyprus property purchase.
        </p>
      </header>

      {/* Cyprus context box */}
      <aside className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">Cyprus mortgage context</p>
        <p>
          Non-residents: max 70% LTV. Residents: up to 80%. Current market
          rates: 3.5–5.5% for a standard mortgage. Rates vary by bank, currency
          (EUR), and applicant profile.
        </p>
      </aside>

      {/* inputs */}
      <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-8 flex flex-col gap-6">
        <h2 className="text-sm font-bold text-slate-800 -mb-2">Your inputs</h2>

        <SliderRow
          label="Property price"
          value={price}
          min={50_000}
          max={2_000_000}
          step={10_000}
          display={fmt(price)}
          onChange={setPrice}
        />

        <SliderRow
          label="Down payment %"
          value={downPct}
          min={20}
          max={70}
          step={1}
          display={`${downPct}% — ${fmt(price * (downPct / 100))}`}
          onChange={setDownPct}
        />

        <SliderRow
          label="Annual interest rate"
          value={rate}
          min={2.0}
          max={9.0}
          step={0.1}
          display={`${rate.toFixed(1)}%`}
          onChange={setRate}
        />

        {/* loan term buttons */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Loan term
          </label>
          <div className="flex gap-2 flex-wrap">
            {TERM_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  term === t
                    ? "bg-[#35cdc4] text-slate-900"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#35cdc4]"
                }`}
              >
                {t} yr
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* summary stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Loan amount"
          value={fmt(loanAmount)}
          sub="price − down payment"
        />
        <StatCard
          label="Monthly payment"
          value={fmt(monthlyPayment)}
          sub={`${term} yr term`}
          accent
        />
        <StatCard
          label="Total repaid"
          value={fmt(totalRepaid)}
          sub="principal + interest"
        />
        <StatCard
          label="Total interest"
          value={fmt(totalInterest)}
          sub="cost of borrowing"
        />
      </section>

      {/* amortization table */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3">
          Amortization summary
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wide">
                <th className="px-3 py-2 text-left font-semibold">Year</th>
                <th className="px-3 py-2 text-right font-semibold">
                  Balance (open)
                </th>
                <th className="px-3 py-2 text-right font-semibold">
                  Annual interest
                </th>
                <th className="px-3 py-2 text-right font-semibold">
                  Annual principal
                </th>
              </tr>
            </thead>
            <tbody>
              {isShort
                ? tableRows.map((row) => (
                    <AmortTableRow key={row.year} row={row} />
                  ))
                : (() => {
                    const { first5, last, middle } = tableRows as {
                      first5: AmortRow[];
                      last: AmortRow;
                      middle: number;
                    };
                    return (
                      <>
                        {first5.map((row) => (
                          <AmortTableRow key={row.year} row={row} />
                        ))}
                        <tr className="border-t border-slate-100 bg-slate-50">
                          <td
                            colSpan={4}
                            className="px-3 py-2 text-slate-400 italic text-center"
                          >
                            … {middle} years remaining
                          </td>
                        </tr>
                        <AmortTableRow row={last} />
                      </>
                    );
                  })()}
            </tbody>
          </table>
        </div>
      </section>

      {/* next steps */}
      <aside className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Next steps
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/rent-vs-buy-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Rent vs Buy Calculator →
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Browse the property map →
          </Link>
          <Link
            href="/tools/tax-residency-planner/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Tax Residency Planner →
          </Link>
        </div>
      </aside>

      {/* disclaimer */}
      <aside className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          This calculator is for illustrative purposes only and does not
          constitute financial advice. Actual mortgage rates, LTV limits, fees,
          and eligibility criteria vary by bank and applicant profile. Always
          consult a licensed mortgage adviser and your chosen bank before making
          financial decisions.
        </p>
      </aside>

      <Link href="/tools/" className="underline hover:text-slate-900 text-xs">
        ← Back to Tools
      </Link>
    </main>
  );
}

// ── helper table row ──────────────────────────────────────────────────────────

function AmortTableRow({ row }: { row: AmortRow }) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50">
      <td className="px-3 py-2 font-medium text-slate-700">Year {row.year}</td>
      <td className="px-3 py-2 text-right text-slate-700">
        {fmt(row.openingBalance)}
      </td>
      <td className="px-3 py-2 text-right text-amber-700">
        {fmt(row.annualInterest)}
      </td>
      <td className="px-3 py-2 text-right" style={{ color: "#35cdc4" }}>
        {fmt(row.annualPrincipal)}
      </td>
    </tr>
  );
}
