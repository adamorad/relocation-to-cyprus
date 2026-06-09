"use client";

import { useState } from "react";
import Link from "next/link";

type EmploymentType = "employed" | "self-employed";

// 2025 Cyprus Social Insurance rates
const EMPLOYED_RATES = {
  employee: {
    socialInsurance: 0.083,
    gesy: 0.0265,
  },
  employer: {
    socialInsurance: 0.083,
    redundancyFund: 0.012,
    holidayFund: 0.08,
    industrialTraining: 0.005,
    socialCohesion: 0.02,
    gesy: 0.029,
  },
};

// Self-employed: 16.6% SI on insurable earnings, capped at €54,864/yr (2025 rate)
const SELF_EMPLOYED_SI_RATE = 0.166;
const SELF_EMPLOYED_GESY_RATE = 0.0265;
const SELF_EMPLOYED_MAX_ANNUAL = 54864;

function formatEur(value: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

type BreakdownRow = {
  label: string;
  rate: string;
  monthly: number;
  annual: number;
  side: "employee" | "employer" | "self";
  color?: string;
};

function BreakdownTable({
  rows,
  title,
  colorClass,
}: {
  rows: BreakdownRow[];
  title: string;
  colorClass: string;
}) {
  const totalMonthly = rows.reduce((s, r) => s + r.monthly, 0);
  const totalAnnual = rows.reduce((s, r) => s + r.annual, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className={`px-5 py-3 ${colorClass}`}>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-2 font-medium text-slate-600 text-xs">Contribution</th>
              <th className="text-right px-3 py-2 font-medium text-slate-600 text-xs">Rate</th>
              <th className="text-right px-3 py-2 font-medium text-slate-600 text-xs">Monthly</th>
              <th className="text-right px-5 py-2 font-medium text-slate-600 text-xs">Annual</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-2.5 text-slate-700">{row.label}</td>
                <td className="px-3 py-2.5 text-right text-slate-500">{row.rate}</td>
                <td className="px-3 py-2.5 text-right font-medium text-slate-800">
                  {formatEur(row.monthly)}
                </td>
                <td className="px-5 py-2.5 text-right font-medium text-slate-800">
                  {formatEur(row.annual)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 border-t border-slate-200">
              <td colSpan={2} className="px-5 py-3 font-bold text-slate-900 text-sm">
                Total
              </td>
              <td className="px-3 py-3 text-right font-bold text-slate-900">
                {formatEur(totalMonthly)}
              </td>
              <td className="px-5 py-3 text-right font-bold text-slate-900">
                {formatEur(totalAnnual)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  monthly,
  annual,
  colorClass,
}: {
  label: string;
  monthly: number;
  annual: number;
  colorClass: string;
}) {
  return (
    <div className={`rounded-xl p-5 border ${colorClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold">{formatEur(monthly)}<span className="text-sm font-normal opacity-70">/mo</span></p>
      <p className="text-sm opacity-70 mt-0.5">{formatEur(annual)}/yr</p>
    </div>
  );
}

export default function SocialInsuranceCalculatorPage() {
  const [employmentType, setEmploymentType] = useState<EmploymentType>("employed");
  const [grossMonthly, setGrossMonthly] = useState(3500);
  const [cyprusRegistered, setCyprusRegistered] = useState(true);

  const annualSalary = grossMonthly * 12;

  let employeeRows: BreakdownRow[] = [];
  let employerRows: BreakdownRow[] = [];
  let selfRows: BreakdownRow[] = [];

  if (employmentType === "employed") {
    const eSI = grossMonthly * EMPLOYED_RATES.employee.socialInsurance;
    const eGESY = grossMonthly * EMPLOYED_RATES.employee.gesy;

    employeeRows = [
      {
        label: "Social Insurance (SI)",
        rate: "8.3%",
        monthly: eSI,
        annual: eSI * 12,
        side: "employee",
      },
      {
        label: "GeSY (General Healthcare)",
        rate: "2.65%",
        monthly: eGESY,
        annual: eGESY * 12,
        side: "employee",
      },
    ];

    if (cyprusRegistered) {
      const erSI = grossMonthly * EMPLOYED_RATES.employer.socialInsurance;
      const erRedundancy = grossMonthly * EMPLOYED_RATES.employer.redundancyFund;
      const erHoliday = grossMonthly * EMPLOYED_RATES.employer.holidayFund;
      const erTraining = grossMonthly * EMPLOYED_RATES.employer.industrialTraining;
      const erCohesion = grossMonthly * EMPLOYED_RATES.employer.socialCohesion;
      const erGESY = grossMonthly * EMPLOYED_RATES.employer.gesy;

      employerRows = [
        { label: "Social Insurance (SI)", rate: "8.3%", monthly: erSI, annual: erSI * 12, side: "employer" },
        { label: "Redundancy Fund", rate: "1.2%", monthly: erRedundancy, annual: erRedundancy * 12, side: "employer" },
        { label: "Holiday Fund", rate: "8.0%", monthly: erHoliday, annual: erHoliday * 12, side: "employer" },
        { label: "Industrial Training", rate: "0.5%", monthly: erTraining, annual: erTraining * 12, side: "employer" },
        { label: "Social Cohesion Fund", rate: "2.0%", monthly: erCohesion, annual: erCohesion * 12, side: "employer" },
        { label: "GeSY (General Healthcare)", rate: "2.90%", monthly: erGESY, annual: erGESY * 12, side: "employer" },
      ];
    }
  } else {
    // Self-employed: cap insurable earnings
    const cappedAnnual = Math.min(annualSalary, SELF_EMPLOYED_MAX_ANNUAL);
    const cappedMonthly = cappedAnnual / 12;

    const siMonthly = cappedMonthly * SELF_EMPLOYED_SI_RATE;
    const gesyMonthly = grossMonthly * SELF_EMPLOYED_GESY_RATE;

    selfRows = [
      {
        label: "Social Insurance (SI)",
        rate: "15.6%",
        monthly: siMonthly,
        annual: siMonthly * 12,
        side: "self",
      },
      {
        label: "GeSY (General Healthcare)",
        rate: "2.65%",
        monthly: gesyMonthly,
        annual: gesyMonthly * 12,
        side: "self",
      },
    ];
  }

  const employeeTotalMonthly = employeeRows.reduce((s, r) => s + r.monthly, 0);
  const employeeTotalAnnual = employeeTotalMonthly * 12;
  const employerTotalMonthly = employerRows.reduce((s, r) => s + r.monthly, 0);
  const employerTotalAnnual = employerTotalMonthly * 12;
  const selfTotalMonthly = selfRows.reduce((s, r) => s + r.monthly, 0);
  const selfTotalAnnual = selfTotalMonthly * 12;

  const isCapped = employmentType === "self-employed" && annualSalary > SELF_EMPLOYED_MAX_ANNUAL;

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        ›{" "}
        <Link href="/tools" className="hover:text-slate-900">Tools</Link>{" "}
        › <span className="text-slate-900">Social Insurance Calculator</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Interactive Tool
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          Cyprus Social Insurance Calculator
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Calculate your Social Insurance and GeSY contributions based on 2025 rates.
          Adjust your salary and employment type to see a full breakdown.
        </p>
      </header>

      {/* Inputs */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 space-y-5">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
          Your Details
        </h2>

        {/* Employment type */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">
            Employment type
          </label>
          <div className="flex rounded-lg overflow-hidden border border-slate-200 w-fit">
            {(["employed", "self-employed"] as EmploymentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setEmploymentType(type)}
                className={`px-5 py-2 text-sm font-medium capitalize transition-colors ${
                  employmentType === type
                    ? "bg-teal-500 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                } ${type === "self-employed" ? "border-l border-slate-200" : ""}`}
              >
                {type === "employed" ? "Employed" : "Self-Employed"}
              </button>
            ))}
          </div>
        </div>

        {/* Salary slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">
              Gross monthly {employmentType === "employed" ? "salary" : "income"}
            </label>
            <span className="text-sm font-bold text-slate-900">
              {formatEur(grossMonthly)}<span className="text-slate-500 font-normal">/mo</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={100}
            value={grossMonthly}
            onChange={(e) => setGrossMonthly(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>€0</span>
            <span>€20,000</span>
          </div>
        </div>

        {isCapped && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
            SI is capped at {formatEur(SELF_EMPLOYED_MAX_ANNUAL / 12)}/mo ({formatEur(SELF_EMPLOYED_MAX_ANNUAL)}/yr insurable earnings). Income above this cap is not subject to Social Insurance.
          </div>
        )}

        {/* Cyprus-registered employer (employed only) */}
        {employmentType === "employed" && (
          <div className="flex items-center justify-between gap-4 pt-1">
            <label className="text-sm font-medium text-slate-700 flex-1">
              Is your employer Cyprus-registered?
            </label>
            <div className="flex rounded-lg overflow-hidden border border-slate-200">
              <button
                onClick={() => setCyprusRegistered(true)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  cyprusRegistered ? "bg-teal-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setCyprusRegistered(false)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors border-l border-slate-200 ${
                  !cyprusRegistered ? "bg-teal-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Summary cards */}
      <div className={`grid gap-4 mb-6 ${employmentType === "employed" && cyprusRegistered ? "grid-cols-2" : "grid-cols-1"}`}>
        {employmentType === "employed" ? (
          <>
            <SummaryCard
              label="Your contributions (employee)"
              monthly={employeeTotalMonthly}
              annual={employeeTotalAnnual}
              colorClass="bg-teal-50 border-teal-200 text-teal-900"
            />
            {cyprusRegistered && (
              <SummaryCard
                label="Employer contributions"
                monthly={employerTotalMonthly}
                annual={employerTotalAnnual}
                colorClass="bg-slate-50 border-slate-200 text-slate-900"
              />
            )}
          </>
        ) : (
          <SummaryCard
            label="Your total contributions (self-employed)"
            monthly={selfTotalMonthly}
            annual={selfTotalAnnual}
            colorClass="bg-teal-50 border-teal-200 text-teal-900"
          />
        )}
      </div>

      {/* Breakdown tables */}
      <div className="space-y-4">
        {employmentType === "employed" ? (
          <>
            <BreakdownTable
              rows={employeeRows}
              title="Employee Contributions"
              colorClass="bg-teal-50 text-teal-900"
            />
            {cyprusRegistered && employerRows.length > 0 && (
              <BreakdownTable
                rows={employerRows}
                title="Employer Contributions (Cyprus-registered)"
                colorClass="bg-slate-50 text-slate-700"
              />
            )}
          </>
        ) : (
          <BreakdownTable
            rows={selfRows}
            title="Self-Employed Contributions"
            colorClass="bg-teal-50 text-teal-900"
          />
        )}
      </div>

      <aside className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Important notice</p>
        <p>
          Rates change annually. Verify current rates at{" "}
          <a
            href="https://www.socialinsurance.gov.cy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 underline"
          >
            socialinsurance.gov.cy
          </a>{" "}
          before filing. GeSY rates are set by the Health Insurance Organisation and
          may differ from the figures shown. This tool provides general information
          only and is not a substitute for professional advice.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools" className="underline hover:text-slate-900">
          ← Back to Tools
        </Link>
      </p>

      <aside className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Next steps</p>
        <div className="flex flex-wrap gap-3">

<Link href="/guides/hiring-in-cyprus/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: Hiring in Cyprus →</Link>          <Link href="/sections/accountants/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Find an accountant →</Link>
        </div>
      </aside>
    </main>
  );
}
