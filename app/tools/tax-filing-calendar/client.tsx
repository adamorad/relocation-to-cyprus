"use client";

import { useState } from "react";
import Link from "next/link";

type TaxpayerType = "individual" | "company" | "both";

type Deadline = {
  id: string;
  month: number; // 1-12
  day: number;
  title: string;
  formRef: string;
  description: string;
  taxpayer: TaxpayerType;
};

const DEADLINES: Deadline[] = [
  {
    id: "td7",
    month: 3,
    day: 31,
    title: "Employer Payroll Return",
    formRef: "TD7",
    description:
      "Employer's annual payroll return (TD7) for the previous year. Required for all Cyprus-registered employers.",
    taxpayer: "company",
  },
  {
    id: "td1-self-assess",
    month: 3,
    day: 31,
    title: "Self-Assessment — Income over €19,500",
    formRef: "TD1",
    description:
      "For individuals whose annual income exceeded €19,500 in the previous year. Filed on paper by 31 March; electronic filing deadline is 31 July.",
    taxpayer: "individual",
  },
  {
    id: "audited-accounts",
    month: 4,
    day: 30,
    title: "Audited Accounts Submission",
    formRef: "–",
    description:
      "Companies with turnover over €70,000 must submit audited financial accounts for the previous year to the Tax Department.",
    taxpayer: "company",
  },
  {
    id: "td1-electronic",
    month: 7,
    day: 31,
    title: "Individual Income Tax Return — Electronic",
    formRef: "TD1",
    description:
      "Electronic filing deadline for individual income tax return (TD1) for the previous calendar year. This is the standard deadline for most employed and self-employed individuals.",
    taxpayer: "individual",
  },
  {
    id: "td4-provisional-1",
    month: 7,
    day: 31,
    title: "Company Provisional Tax — 1st Instalment",
    formRef: "TD4",
    description:
      "First instalment of provisional corporation tax for the current year. Based on your provisional tax return (TD6) estimate. Half of total provisional tax due.",
    taxpayer: "company",
  },
  {
    id: "td6",
    month: 9,
    day: 30,
    title: "Provisional Tax Return + 2nd Instalment",
    formRef: "TD6",
    description:
      "Submission of the provisional tax return (TD6) and payment of the second instalment. If your actual income differs from the provisional estimate, revise and adjust.",
    taxpayer: "both",
  },
  {
    id: "td4-final",
    month: 12,
    day: 31,
    title: "Provisional Tax — 3rd Instalment",
    formRef: "–",
    description:
      "Final provisional tax instalment payment for the current year. Failure to pay at least 75% of the actual tax due results in an additional 10% charge.",
    taxpayer: "both",
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getUrgencyClass(daysUntil: number): string {
  if (daysUntil < 0) return "bg-slate-100 border-slate-200 text-slate-400";
  if (daysUntil <= 30) return "bg-red-50 border-red-200 text-red-900";
  if (daysUntil <= 60) return "bg-amber-50 border-amber-200 text-amber-900";
  return "bg-emerald-50 border-emerald-200 text-emerald-900";
}

function getUrgencyBadge(daysUntil: number): { text: string; class: string } {
  if (daysUntil < 0) {
    return { text: "Passed", class: "bg-slate-200 text-slate-500" };
  }
  if (daysUntil === 0) {
    return { text: "Today", class: "bg-red-500 text-white" };
  }
  if (daysUntil <= 30) {
    return { text: `${daysUntil}d`, class: "bg-red-500 text-white" };
  }
  if (daysUntil <= 60) {
    return { text: `${daysUntil}d`, class: "bg-amber-500 text-white" };
  }
  return { text: `${daysUntil}d`, class: "bg-emerald-500 text-white" };
}

function getDaysUntil(month: number, day: number, today: Date): number {
  const year = today.getFullYear();
  let target = new Date(year, month - 1, day);
  if (target < today) {
    // If deadline has passed this year, it's in the past
    return Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
  return Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function taxpayerLabel(type: TaxpayerType): string {
  if (type === "individual") return "Individual";
  if (type === "company") return "Company";
  return "Individual & Company";
}

function taxpayerBadgeClass(type: TaxpayerType): string {
  if (type === "individual") return "bg-teal-100 text-teal-800";
  if (type === "company") return "bg-blue-100 text-blue-800";
  return "bg-purple-100 text-purple-800";
}

export default function TaxFilingCalendarPage() {
  const [filter, setFilter] = useState<TaxpayerType | "all">("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredDeadlines = DEADLINES.filter((d) => {
    if (filter === "all") return true;
    return d.taxpayer === filter || d.taxpayer === "both";
  });

  // Group by month
  const byMonth: Record<number, Deadline[]> = {};
  for (let m = 1; m <= 12; m++) {
    const items = filteredDeadlines.filter((d) => d.month === m);
    if (items.length > 0) byMonth[m] = items;
  }

  const currentMonth = today.getMonth() + 1; // 1-indexed

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        ›{" "}
        <Link href="/tools" className="hover:text-slate-900">Tools</Link>{" "}
        › <span className="text-slate-900">Tax Filing Calendar</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Interactive Tool
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          Cyprus Annual Tax Filing Calendar
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          All key Cyprus tax deadlines for the current year. Current month is highlighted.
          Deadlines are colour-coded by urgency.
        </p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-5 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          Within 30 days
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          31–60 days
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          More than 60 days
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
          Passed
        </span>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "individual", "company"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors capitalize ${
              filter === f
                ? "bg-teal-500 border-teal-500 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {f === "all" ? "All deadlines" : f === "individual" ? "Individual" : "Company"}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="space-y-4">
        {Object.entries(byMonth).map(([monthStr, deadlines]) => {
          const month = Number(monthStr);
          const isCurrentMonth = month === currentMonth;

          return (
            <div
              key={month}
              className={`rounded-xl border overflow-hidden ${
                isCurrentMonth ? "border-teal-400 ring-2 ring-teal-400 ring-offset-1" : "border-slate-200"
              }`}
            >
              <div
                className={`px-5 py-3 flex items-center gap-2 ${
                  isCurrentMonth ? "bg-teal-500 text-white" : "bg-slate-900 text-white"
                }`}
              >
                <h2 className="font-semibold text-sm">{MONTH_NAMES[month - 1]}</h2>
                {isCurrentMonth && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-white text-teal-700 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <div className="divide-y divide-slate-100">
                {deadlines.map((deadline) => {
                  const daysUntil = getDaysUntil(deadline.month, deadline.day, today);
                  const urgency = getUrgencyClass(daysUntil);
                  const badge = getUrgencyBadge(daysUntil);

                  return (
                    <div key={deadline.id} className={`p-5 border-l-4 ${urgency}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-base font-bold">
                              {deadline.day} {MONTH_NAMES[month - 1]}
                            </span>
                            {deadline.formRef !== "–" && (
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                                {deadline.formRef}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${taxpayerBadgeClass(
                                deadline.taxpayer
                              )}`}
                            >
                              {taxpayerLabel(deadline.taxpayer)}
                            </span>
                          </div>
                          <p className="font-semibold text-sm mb-1">{deadline.title}</p>
                          <p className="text-xs leading-relaxed opacity-80">
                            {deadline.description}
                          </p>
                        </div>
                        <span
                          className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-full ${badge.class}`}
                        >
                          {badge.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {filteredDeadlines.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No deadlines found for this filter.
        </div>
      )}

      <aside className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Important notice</p>
        <p>
          Deadlines change year to year and depend on your specific tax situation.
          Verify all deadlines with a Cyprus accountant. Late filing penalties apply
          — typically 5% of the tax due, with additional interest. Dates shown apply
          to electronic submissions where applicable; paper deadlines may differ.
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

<Link href="/guides/taxes-for-expats/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: Taxes for Expats in Cyprus →</Link>          <Link href="/sections/accountants/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Find a tax advisor →</Link>
        </div>
      </aside>
    </main>
  );
}
