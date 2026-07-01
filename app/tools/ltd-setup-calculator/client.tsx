"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── types ────────────────────────────────────────────────────────────────────

type Directors = "1" | "2" | "3+";
type ResidentDirector = "yes" | "no";
type RegisteredAddress = "yes" | "no";
type Turnover = "under50k" | "50k-200k" | "200k-500k" | "500k+";
type VatNeed = "yes" | "no" | "notsure";
type BusinessType = "tech" | "consulting" | "trading" | "holding";

interface CostRange {
  low: number;
  high: number;
}

// ── cost data ─────────────────────────────────────────────────────────────────

const SETUP_COSTS: CostRange = { low: 1500, high: 2400 };

const REGISTERED_ADDRESS_ANNUAL: CostRange = { low: 600, high: 1200 };

const BOOKKEEPING_MONTHLY: Record<Turnover, CostRange> = {
  "under50k": { low: 100, high: 200 },
  "50k-200k": { low: 200, high: 400 },
  "200k-500k": { low: 400, high: 800 },
  "500k+": { low: 400, high: 800 },
};

const AUDIT_ANNUAL: Record<Turnover, CostRange> = {
  "under50k": { low: 1200, high: 2000 },
  "50k-200k": { low: 1800, high: 3000 },
  "200k-500k": { low: 3000, high: 5000 },
  "500k+": { low: 3000, high: 5000 },
};

const ANNUAL_RETURN: CostRange = { low: 350, high: 350 };
const CIPA_LEVY: CostRange = { low: 350, high: 350 };
const NOMINEE_DIRECTOR: CostRange = { low: 800, high: 1500 };
const COMPANY_SEAL: CostRange = { low: 30, high: 50 };

// ── formatting ────────────────────────────────────────────────────────────────

function fmtRange(low: number, high: number): string {
  if (low === high) return "€" + Math.round(low).toLocaleString("en-IE");
  return (
    "€" +
    Math.round(low).toLocaleString("en-IE") +
    " – €" +
    Math.round(high).toLocaleString("en-IE")
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
              value === opt.value
                ? "bg-[#35cdc4] text-slate-900 border-[#35cdc4]"
                : "bg-white border-slate-200 text-slate-700 hover:border-[#35cdc4]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CostRow({
  label,
  low,
  high,
  note,
  highlight,
}: {
  label: string;
  low: number;
  high: number;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <tr
      className={`border-t border-slate-100 ${highlight ? "bg-amber-50" : "hover:bg-slate-50"}`}
    >
      <td className="px-3 py-2.5 text-slate-700">
        {label}
        {note && (
          <span className="ml-1 text-[10px] text-slate-400 italic">{note}</span>
        )}
      </td>
      <td className="px-3 py-2.5 text-right text-slate-600 font-mono text-xs">
        €{Math.round(low).toLocaleString("en-IE")}
      </td>
      <td className="px-3 py-2.5 text-right text-slate-800 font-mono text-xs font-semibold">
        €{Math.round(high).toLocaleString("en-IE")}
      </td>
    </tr>
  );
}

function TotalRow({ label, low, high }: { label: string; low: number; high: number }) {
  return (
    <tr className="border-t-2 border-slate-300 bg-slate-50">
      <td className="px-3 py-3 font-bold text-slate-900">{label}</td>
      <td className="px-3 py-3 text-right font-bold text-slate-700 font-mono text-xs">
        €{Math.round(low).toLocaleString("en-IE")}
      </td>
      <td className="px-3 py-3 text-right font-bold text-slate-900 font-mono text-xs">
        €{Math.round(high).toLocaleString("en-IE")}
      </td>
    </tr>
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
        className={`text-lg font-bold leading-tight ${accent ? "text-[#35cdc4]" : "text-slate-900"}`}
      >
        {value}
      </p>
      {sub && <p className="text-[10px] text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function LtdSetupCalculatorClient() {
  const [directors, setDirectors] = useState<Directors>("1");
  const [residentDirector, setResidentDirector] =
    useState<ResidentDirector>("yes");
  const [registeredAddress, setRegisteredAddress] =
    useState<RegisteredAddress>("yes");
  const [turnover, setTurnover] = useState<Turnover>("under50k");
  const [vatNeed, setVatNeed] = useState<VatNeed>("notsure");
  const [businessType, setBusinessType] = useState<BusinessType>("tech");
  const [includePayroll, setIncludePayroll] = useState(false);
  const [includeSeal, setIncludeSeal] = useState(false);

  const costs = useMemo(() => {
    // One-time setup
    const setupLow = SETUP_COSTS.low;
    const setupHigh = SETUP_COSTS.high;

    // Annual costs
    const bookkeepingMonthly = BOOKKEEPING_MONTHLY[turnover];
    const bookkeepingAnnualLow = bookkeepingMonthly.low * 12;
    const bookkeepingAnnualHigh = bookkeepingMonthly.high * 12;

    const audit = AUDIT_ANNUAL[turnover];
    const annualReturnLow = ANNUAL_RETURN.low;
    const annualReturnHigh = ANNUAL_RETURN.high;
    const cipaLow = CIPA_LEVY.low;
    const cipaHigh = CIPA_LEVY.high;

    const addressLow =
      registeredAddress === "yes" ? REGISTERED_ADDRESS_ANNUAL.low : 0;
    const addressHigh =
      registeredAddress === "yes" ? REGISTERED_ADDRESS_ANNUAL.high : 0;

    const nomineeLow =
      residentDirector === "no" ? NOMINEE_DIRECTOR.low : 0;
    const nomineeHigh =
      residentDirector === "no" ? NOMINEE_DIRECTOR.high : 0;

    const payrollMonthlyLow = includePayroll ? 50 : 0;
    const payrollMonthlyHigh = includePayroll ? 100 : 0;
    const payrollAnnualLow = payrollMonthlyLow * 12;
    const payrollAnnualHigh = payrollMonthlyHigh * 12;

    // One-time extras
    const sealLow = includeSeal ? COMPANY_SEAL.low : 0;
    const sealHigh = includeSeal ? COMPANY_SEAL.high : 0;

    const annualLow =
      bookkeepingAnnualLow +
      audit.low +
      annualReturnLow +
      cipaLow +
      addressLow +
      nomineeLow +
      payrollAnnualLow;

    const annualHigh =
      bookkeepingAnnualHigh +
      audit.high +
      annualReturnHigh +
      cipaHigh +
      addressHigh +
      nomineeHigh +
      payrollAnnualHigh;

    const year1Low = setupLow + sealLow + annualLow;
    const year1High = setupHigh + sealHigh + annualHigh;

    return {
      setup: { low: setupLow + sealLow, high: setupHigh + sealHigh },
      bookkeepingAnnual: { low: bookkeepingAnnualLow, high: bookkeepingAnnualHigh },
      bookkeepingMonthly,
      audit,
      annualReturn: ANNUAL_RETURN,
      cipa: CIPA_LEVY,
      address: { low: addressLow, high: addressHigh },
      nominee: { low: nomineeLow, high: nomineeHigh },
      payrollAnnual: { low: payrollAnnualLow, high: payrollAnnualHigh },
      seal: { low: sealLow, high: sealHigh },
      annualTotal: { low: annualLow, high: annualHigh },
      year1Total: { low: year1Low, high: year1High },
      monthlyEquivalent: {
        low: annualLow / 12,
        high: annualHigh / 12,
      },
    };
  }, [
    turnover,
    registeredAddress,
    residentDirector,
    includePayroll,
    includeSeal,
  ]);

  // Derive VAT note
  const vatNote = useMemo(() => {
    if (vatNeed === "yes") return "VAT registration required (mandatory above €15,600/yr turnover). Typically no extra cost if your accountant handles it.";
    if (turnover !== "under50k" && vatNeed !== "no")
      return "VAT registration is likely required at your expected turnover level (threshold: €15,600/yr).";
    return null;
  }, [vatNeed, turnover]);

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
        <span className="text-slate-900">Cyprus Ltd Setup Calculator</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Business
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Cyprus Ltd Setup Cost Calculator
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Estimate the one-time registration costs and annual running costs of a
          Cyprus limited company based on your specific situation.
        </p>
      </header>

      {/* inputs */}
      <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-8 flex flex-col gap-6">
        <h2 className="text-sm font-bold text-slate-800 -mb-2">
          Your company profile
        </h2>

        <RadioGroup<Directors>
          label="Number of directors"
          options={[
            { value: "1", label: "1 director" },
            { value: "2", label: "2 directors" },
            { value: "3+", label: "3+ directors" },
          ]}
          value={directors}
          onChange={setDirectors}
        />

        <RadioGroup<ResidentDirector>
          label="Will you be a resident director in Cyprus?"
          options={[
            { value: "yes", label: "Yes — I live / will live in Cyprus" },
            { value: "no", label: "No — need a nominee director" },
          ]}
          value={residentDirector}
          onChange={setResidentDirector}
        />

        <RadioGroup<RegisteredAddress>
          label="Need a registered address service?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No (I have a Cyprus address)" },
          ]}
          value={registeredAddress}
          onChange={setRegisteredAddress}
        />

        <RadioGroup<Turnover>
          label="Expected annual company turnover"
          options={[
            { value: "under50k", label: "Under €50k" },
            { value: "50k-200k", label: "€50k – €200k" },
            { value: "200k-500k", label: "€200k – €500k" },
            { value: "500k+", label: "€500k+" },
          ]}
          value={turnover}
          onChange={setTurnover}
        />

        <RadioGroup<VatNeed>
          label="Need VAT registration?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "notsure", label: "Not sure" },
          ]}
          value={vatNeed}
          onChange={setVatNeed}
        />

        <RadioGroup<BusinessType>
          label="Business type (affects accounting complexity)"
          options={[
            { value: "tech", label: "Tech / IT / Software" },
            { value: "consulting", label: "Consulting / Professional" },
            { value: "trading", label: "Trading / E-commerce" },
            { value: "holding", label: "Holding / Investment" },
          ]}
          value={businessType}
          onChange={setBusinessType}
        />

        {/* optional toggles */}
        <div>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            Optional extras
          </p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includePayroll}
                onChange={(e) => setIncludePayroll(e.target.checked)}
                className="w-4 h-4 accent-[#35cdc4]"
              />
              <span className="text-sm text-slate-700">
                Include payroll service (€50–100/mo extra) — if paying yourself
                a salary
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeSeal}
                onChange={(e) => setIncludeSeal(e.target.checked)}
                className="w-4 h-4 accent-[#35cdc4]"
              />
              <span className="text-sm text-slate-700">
                Include company seal (€30–50 one-time)
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* VAT note */}
      {vatNote && (
        <aside className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700">
          <span className="font-semibold text-slate-900">VAT note: </span>
          {vatNote}
        </aside>
      )}

      {/* summary stat cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <StatCard
          label="Year 1 total"
          value={fmtRange(costs.year1Total.low, costs.year1Total.high)}
          sub="setup + first year running costs"
          accent
        />
        <StatCard
          label="Year 2+ annual"
          value={fmtRange(costs.annualTotal.low, costs.annualTotal.high)}
          sub="ongoing running costs per year"
        />
        <StatCard
          label="Monthly equivalent"
          value={fmtRange(costs.monthlyEquivalent.low, costs.monthlyEquivalent.high)}
          sub="year 2+ annual ÷ 12"
        />
      </section>

      {/* cost breakdown table */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3">
          Detailed cost breakdown
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wide">
                <th className="px-3 py-2 text-left font-semibold">Cost item</th>
                <th className="px-3 py-2 text-right font-semibold">Low (€)</th>
                <th className="px-3 py-2 text-right font-semibold">High (€)</th>
              </tr>
            </thead>
            <tbody>
              {/* one-time */}
              <tr className="bg-orange-50">
                <td
                  colSpan={3}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-700"
                >
                  One-Time Setup Costs
                </td>
              </tr>
              <CostRow
                label="CIPA registration + stamp duty"
                low={700}
                high={900}
                note="one-time"
              />
              <CostRow
                label="Legal / corporate lawyer"
                low={800}
                high={1500}
                note="M&A drafting, registration"
              />
              {includeSeal && (
                <CostRow
                  label="Company seal"
                  low={COMPANY_SEAL.low}
                  high={COMPANY_SEAL.high}
                  note="one-time"
                />
              )}
              <TotalRow
                label="Total setup"
                low={costs.setup.low}
                high={costs.setup.high}
              />

              {/* annual */}
              <tr className="bg-teal-50">
                <td
                  colSpan={3}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700"
                >
                  Annual Ongoing Costs
                </td>
              </tr>
              {registeredAddress === "yes" && (
                <CostRow
                  label="Registered address service"
                  low={REGISTERED_ADDRESS_ANNUAL.low}
                  high={REGISTERED_ADDRESS_ANNUAL.high}
                  note="per year"
                />
              )}
              <CostRow
                label="Bookkeeping / accounting"
                low={costs.bookkeepingAnnual.low}
                high={costs.bookkeepingAnnual.high}
                note={`€${costs.bookkeepingMonthly.low}–${costs.bookkeepingMonthly.high}/mo × 12`}
              />
              <CostRow
                label="Statutory audit (mandatory)"
                low={costs.audit.low}
                high={costs.audit.high}
                note="required for all CY companies"
              />
              <CostRow
                label="Annual return to Registrar"
                low={ANNUAL_RETURN.low}
                high={ANNUAL_RETURN.high}
                note="per year"
              />
              <CostRow
                label="CIPA annual levy"
                low={CIPA_LEVY.low}
                high={CIPA_LEVY.high}
                note="per year"
              />
              {residentDirector === "no" && (
                <CostRow
                  label="Nominee director service"
                  low={NOMINEE_DIRECTOR.low}
                  high={NOMINEE_DIRECTOR.high}
                  note="non-resident only"
                />
              )}
              {includePayroll && (
                <CostRow
                  label="Payroll service"
                  low={costs.payrollAnnual.low}
                  high={costs.payrollAnnual.high}
                  note="€50–100/mo × 12"
                />
              )}
              <TotalRow
                label="Annual total (year 2+)"
                low={costs.annualTotal.low}
                high={costs.annualTotal.high}
              />

              {/* year 1 grand total */}
              <tr className="border-t-2 border-orange-300 bg-orange-50">
                <td className="px-3 py-3 font-bold text-orange-900">
                  Year 1 Grand Total
                </td>
                <td className="px-3 py-3 text-right font-bold text-orange-800 font-mono text-xs">
                  €{Math.round(costs.year1Total.low).toLocaleString("en-IE")}
                </td>
                <td className="px-3 py-3 text-right font-bold text-orange-900 font-mono text-xs">
                  €{Math.round(costs.year1Total.high).toLocaleString("en-IE")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cyprus tax advantages */}
      <aside className="mb-6 p-5 bg-teal-50 border border-teal-200 rounded-xl">
        <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700 mb-3">
          Why Cyprus? Key Tax Advantages
        </p>
        <ul className="flex flex-col gap-2">
          {[
            {
              icon: "💼",
              text: "12.5% corporate tax — lowest in the EU",
            },
            {
              icon: "💰",
              text: "0% dividend tax for non-dom shareholders (17% SDC exemption)",
            },
            {
              icon: "🔬",
              text: "IP Box: 2.5% effective rate on qualifying IP income",
            },
            {
              icon: "📈",
              text: "0% capital gains tax (except Cyprus immovable property)",
            },
            {
              icon: "🌍",
              text: "EU-compliant with a full double-tax treaty network",
            },
          ].map((item) => (
            <li key={item.text} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 shrink-0">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* breakeven note */}
      <aside className="mb-6 p-4 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Breakeven note</p>
        <p>
          A Cyprus Ltd typically becomes cost-efficient for annual profits above
          approximately <strong>€35,000–50,000</strong> after all fees. Below
          this threshold, the compliance overhead may outweigh the tax savings.
        </p>
      </aside>

      {/* optional banking info */}
      <aside className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">
          Optional: Corporate Banking
        </p>
        <p>
          Not included above. Typical options: Bank of Cyprus / Hellenic Bank
          (€0–100/mo account fees) or Revolut Business (from €0/mo). Opening a
          traditional bank account can take 2–6 months for new companies.
        </p>
      </aside>

      {/* next steps */}
      <aside className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Related tools
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/sole-trader-vs-ltd/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Sole Trader vs Ltd →
          </Link>
          <Link
            href="/tools/tax-residency-tracker/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Tax Residency Planner →
          </Link>
          <Link
            href="/tools/social-insurance-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Social Insurance Calculator →
          </Link>
        </div>
      </aside>

      {/* disclaimer */}
      <aside className="mt-4 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          Fees are market estimates for 2025 and are provided for illustrative
          purposes only — not legal, tax, or financial advice. Actual costs vary
          by service provider, company complexity, and circumstances. Request
          quotes from 2–3 licensed fiduciaries before making decisions.
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
