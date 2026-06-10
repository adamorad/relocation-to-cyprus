"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  label: string;
  link?: { href: string; text: string };
}

interface Phase {
  id: string;
  title: string;
  tasks: Task[];
}

const PHASES: Phase[] = [
  {
    id: "phase1",
    title: "Phase 1 — Pre-Move Planning",
    tasks: [
      {
        id: "p1_visa",
        label: "Decide on visa / residency route",
        link: { href: "/tools/visa-pathway-finder/", text: "Visa Pathway Finder" },
      },
      {
        id: "p1_tax_rule",
        label: "Research the 60-day vs 183-day tax residency rule",
        link: { href: "/tools/tax-residency-planner/", text: "Tax Residency Planner" },
      },
      {
        id: "p1_treaty",
        label: "Check your country's double tax treaty with Cyprus",
        link: { href: "/tools/double-tax-treaty-finder/", text: "Double Tax Treaty Finder" },
      },
      {
        id: "p1_city",
        label: "Research which city suits your lifestyle",
        link: { href: "/tools/neighborhood-comparison/", text: "Neighbourhood Comparison" },
      },
      {
        id: "p1_budget",
        label: "Estimate your monthly budget",
        link: { href: "/tools/budget-builder/", text: "Budget Builder" },
      },
      {
        id: "p1_docs",
        label: "Start gathering apostilled documents (birth cert, criminal record, marriage cert if relevant)",
      },
      {
        id: "p1_bank",
        label: "Set up a Cyprus-accessible bank or fintech (Revolut / Wise) before you arrive",
        link: { href: "/guides/banking-in-cyprus/", text: "Banking in Cyprus Guide" },
      },
      {
        id: "p1_schools",
        label: "Research schools if relocating with children",
        link: { href: "/guides/international-vs-public-school/", text: "Schools Guide" },
      },
      {
        id: "p1_pets",
        label: "Arrange pet import paperwork if needed",
        link: { href: "/guides/moving-to-cyprus-with-pets/", text: "Moving with Pets Guide" },
      },
      {
        id: "p1_scout",
        label: "Book a scouting trip to your shortlisted cities",
      },
    ],
  },
  {
    id: "phase2",
    title: "Phase 2 — Arrival Week",
    tasks: [
      {
        id: "p2_bank",
        label: "Open a Cyprus bank account",
        link: { href: "/guides/banking-in-cyprus/", text: "Banking in Cyprus Guide" },
      },
      {
        id: "p2_sim",
        label: "Get a Cypriot SIM card (Cyta, Epic, or Primetel)",
        link: { href: "/tools/isp-comparison/", text: "ISP Comparison" },
      },
      {
        id: "p2_tic",
        label: "Register at the Tax Department (TIC number)",
        link: { href: "/guides/taxes-for-expats/", text: "Taxes for Expats Guide" },
      },
      {
        id: "p2_rental",
        label: "Find and sign a rental contract",
        link: { href: "/sections/long-term-rentals/", text: "Long-Term Rentals" },
      },
      {
        id: "p2_meu1",
        label: "Start MEU1 / ARC application (EU citizens)",
        link: { href: "/tools/meu1-tracker/", text: "MEU1 Tracker" },
      },
      {
        id: "p2_car",
        label: "Register your vehicle or rent a car",
        link: { href: "/guides/car-import-registration/", text: "Car Import & Registration Guide" },
      },
      {
        id: "p2_hospital",
        label: "Locate nearest hospital and pharmacy",
        link: { href: "/sections/specialist-doctors/", text: "Specialist Doctors" },
      },
      {
        id: "p2_expat",
        label: "Join a local expat community",
        link: { href: "/sections/expat-communities/", text: "Expat Communities" },
      },
    ],
  },
  {
    id: "phase3",
    title: "Phase 3 — Month 1",
    tasks: [
      {
        id: "p3_gesy",
        label: "Register for GeSY (national healthcare)",
        link: { href: "/guides/gesy-registration-guide/", text: "GeSY Registration Guide" },
      },
      {
        id: "p3_tax_decl",
        label: "File a tax residency declaration with the Tax Department",
      },
      {
        id: "p3_licence",
        label: "Convert or exchange driving licence",
        link: { href: "/guides/driving-licence-conversion/", text: "Driving Licence Conversion Guide" },
      },
      {
        id: "p3_utilities",
        label: "Set up utilities (electricity, internet)",
        link: { href: "/guides/utilities-setup-guide/", text: "Utilities Setup Guide" },
      },
      {
        id: "p3_school_reg",
        label: "Register children at school",
        link: { href: "/guides/child-registration-guide/", text: "Child Registration Guide" },
      },
      {
        id: "p3_accountant",
        label: "Find a local accountant if self-employed / company",
        link: { href: "/sections/accountants/", text: "Find an Accountant" },
      },
      {
        id: "p3_insurance",
        label: "Get private health insurance if not on GeSY",
        link: { href: "/tools/health-insurance-comparison/", text: "Health Insurance Comparison" },
      },
      {
        id: "p3_renewal",
        label: "Track visa / ARC renewal date",
        link: { href: "/tools/visa-renewal-reminder/", text: "Visa Renewal Reminder" },
      },
    ],
  },
  {
    id: "phase4",
    title: "Phase 4 — Settling In",
    tasks: [
      {
        id: "p4_language",
        label: "Start language lessons (Greek basics go a long way)",
        link: { href: "/guides/language-learning-cyprus/", text: "Language Learning in Cyprus" },
      },
      {
        id: "p4_explore",
        label: "Explore your neighbourhood and local markets",
        link: { href: "/sections/farmers-markets/", text: "Farmers Markets" },
      },
      {
        id: "p4_gym",
        label: "Find a gym or sports club",
        link: { href: "/sections/fitness-wellness/", text: "Fitness & Wellness" },
      },
      {
        id: "p4_tax_return",
        label: "File your first Cyprus tax return",
        link: { href: "/tools/tax-filing-calendar/", text: "Tax Filing Calendar" },
      },
      {
        id: "p4_property",
        label: "Consider long-term property purchase",
        link: { href: "/tools/rent-vs-buy-calculator/", text: "Rent vs Buy Calculator" },
      },
      {
        id: "p4_pr",
        label: "Review 5-year permanent residency timeline",
        link: { href: "/guides/permanent-residency-5year/", text: "Permanent Residency Guide" },
      },
    ],
  },
];

const TOTAL_TASKS = PHASES.reduce((sum, p) => sum + p.tasks.length, 0);
const STORAGE_KEY = "realcy_relocation_v1";

export default function RelocationTrackerClient() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    phase1: true,
    phase2: false,
    phase3: false,
    phase4: false,
  });
  const [mounted, setMounted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecked(JSON.parse(saved) as Record<string, boolean>);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const togglePhase = (phaseId: string) => {
    setExpanded((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const resetAll = () => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConfirmReset(false);
  };

  const totalDone = PHASES.reduce(
    (sum, phase) => sum + phase.tasks.filter((t) => checked[t.id]).length,
    0,
  );
  const overallPct = Math.round((totalDone / TOTAL_TASKS) * 100);

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
        &rsaquo; <span>Relocation Progress Tracker</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Checklists
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Relocation Progress Tracker
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Track your relocation journey from planning to settling in. Check off
          each task as you complete it — progress is saved in your browser.
        </p>
      </header>

      {/* Overall progress */}
      <section className="mb-8 p-5 bg-white border border-slate-200 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-700">
            Overall progress
          </p>
          <span className="text-sm font-bold" style={{ color: "#35cdc4" }}>
            {mounted ? totalDone : 0} of {TOTAL_TASKS} tasks complete
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${mounted ? overallPct : 0}%`,
              backgroundColor: "#35cdc4",
            }}
          />
        </div>
        {mounted && overallPct === 100 && (
          <p className="mt-2 text-xs font-semibold text-green-700">
            All tasks complete — welcome to Cyprus!
          </p>
        )}

        <div className="mt-4 flex justify-end">
          {confirmReset ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600">Reset all progress?</span>
              <button
                type="button"
                onClick={resetAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                Yes, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
            >
              Reset all
            </button>
          )}
        </div>
      </section>

      {/* Phase accordions */}
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const phaseDone = phase.tasks.filter((t) => checked[t.id]).length;
          const phaseTotal = phase.tasks.length;
          const phasePct = Math.round((phaseDone / phaseTotal) * 100);
          const isOpen = expanded[phase.id];

          return (
            <div
              key={phase.id}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              {/* Phase header / toggle */}
              <button
                type="button"
                onClick={() => togglePhase(phase.id)}
                className="w-full text-left px-5 py-4 bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900">
                      {phase.title}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${mounted ? phasePct : 0}%`,
                            backgroundColor: "#35cdc4",
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {mounted ? phaseDone : 0} / {phaseTotal}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              {/* Task list */}
              {isOpen && (
                <ul className="border-t border-slate-100 divide-y divide-slate-100">
                  {phase.tasks.map((task) => {
                    const isDone = mounted ? !!checked[task.id] : false;
                    return (
                      <li key={task.id} className={isDone ? "bg-green-50" : "bg-white"}>
                        <div className="flex items-start gap-3 px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => toggle(task.id)}
                            aria-label={isDone ? `Uncheck: ${task.label}` : `Check: ${task.label}`}
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isDone
                                ? "border-green-500 bg-green-500"
                                : "border-slate-300 hover:border-[#35cdc4]"
                            }`}
                          >
                            {isDone && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm leading-snug ${
                                isDone
                                  ? "text-slate-400 line-through decoration-slate-300"
                                  : "text-slate-800"
                              }`}
                            >
                              {task.label}
                            </p>
                            {task.link && (
                              <Link
                                href={task.link.href}
                                className="mt-1 inline-block text-xs font-semibold text-[#35cdc4] hover:text-teal-600 underline underline-offset-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {task.link.text} →
                              </Link>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <aside className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Next steps
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/visa-pathway-finder/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Find your visa route →
          </Link>
          <Link
            href="/tools/budget-builder/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Build your budget →
          </Link>
          <Link
            href="/tools/neighborhood-comparison/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Compare cities →
          </Link>
        </div>
      </aside>

      <aside className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          This checklist provides general guidance only and is not legal, tax,
          or financial advice. Requirements vary by nationality and residency
          route — always verify with the Cyprus Tax Department, Civil Registry,
          and a qualified local adviser before making decisions.
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
