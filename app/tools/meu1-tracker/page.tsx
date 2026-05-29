"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface ChecklistItem {
  id: string;
  label: string;
  note: string;
}

const ITEMS: ChecklistItem[] = [
  {
    id: "passport",
    label: "Valid Passport or EU National ID",
    note:
      "Must be in date. Cyprus Civil Registry accepts the original; bring certified copies. Non-EU citizens: passport only (ID cards not accepted).",
  },
  {
    id: "accommodation",
    label: "Proof of Accommodation",
    note:
      "A signed and stamped rental lease or property deed. Hotel invoices are not accepted. The lease must be in your name or your name must be listed.",
  },
  {
    id: "health_insurance",
    label: "Proof of Health Insurance or GeSY Registration",
    note:
      "Either a private health insurance policy valid in Cyprus, or proof you have enrolled in GeSY (the Cyprus General Healthcare System) at hio.org.cy.",
  },
  {
    id: "funds",
    label: "Proof of Sufficient Funds or Employment",
    note:
      "3–6 months of bank statements showing sufficient income (typically €30,000+/year for self-sufficient applicants), or an employment contract or payslips if employed in Cyprus.",
  },
  {
    id: "meu1_form",
    label: "Completed MEU1 Application Form",
    note:
      "Download the MEU1 form from crmd.moi.gov.cy. Fill in all fields in block capitals. Do not sign until instructed by the officer at your appointment.",
  },
  {
    id: "appointment",
    label: "Appointment Booked at Civil Registry (crmd.moi.gov.cy)",
    note:
      "Book online at crmd.moi.gov.cy. Appointment slots fill 2–3 weeks in advance — book as early as possible. Print the confirmation email and bring it to the appointment.",
  },
  {
    id: "attend",
    label: "Attend Civil Registry Appointment",
    note:
      "Arrive 10–15 minutes early with all original documents AND copies. The officer will verify documents, stamp your form, and issue a receipt. Processing typically takes 2–4 weeks after the appointment.",
  },
  {
    id: "certificate",
    label: "Receive EU Registration Certificate",
    note:
      "The Registration Certificate (formerly called the Yellow Slip, now issued in blue) confirms your right of residence. Keep this safe — it is required for opening a bank account, registering with GeSY, and other official processes.",
  },
];

const STORAGE_KEY = "meu1-tracker-v1";

export default function Meu1TrackerPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

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

  const doneCount = ITEMS.filter((i) => checked[i.id]).length;
  const total = ITEMS.length;
  const pct = Math.round((doneCount / total) * 100);

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
          MEU1 Registration Tracker
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          An interactive checklist for EU citizens registering their residence
          in Cyprus (MEU1 / EU Registration Certificate). Check off each step
          as you complete it — progress is saved in your browser.
        </p>
      </header>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-700">
            Progress: {doneCount} of {total} steps complete
          </p>
          <span
            className="text-sm font-bold"
            style={{ color: "#35cdc4" }}
          >
            {pct}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: "#35cdc4" }}
          />
        </div>
        {pct === 100 && (
          <p className="mt-2 text-xs font-semibold text-green-700">
            All steps complete — you should have your EU Registration Certificate.
          </p>
        )}
      </section>

      <ol className="space-y-3">
        {ITEMS.map((item, idx) => {
          const isDone = mounted ? !!checked[item.id] : false;
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  isDone
                    ? "border-green-200 bg-green-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isDone
                        ? "border-green-500 bg-green-500"
                        : "border-slate-300"
                    }`}
                  >
                    {isDone && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Step {idx + 1}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isDone
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isDone ? "Done" : "Pending"}
                      </span>
                    </div>
                    <p
                      className={`text-sm font-semibold mt-0.5 ${
                        isDone ? "text-green-800 line-through decoration-green-400" : "text-slate-900"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <aside className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">EU citizens only</p>
        <p>
          This checklist covers EU citizens registering under the EU Freedom of
          Movement. Non-EU citizens require a separate Alien Registration
          Certificate (ARC) process and, depending on your residency status,
          either a Digital Nomad Visa or Permanent Residency permit. See the{" "}
          <Link
            href="/guides/residency-and-visas"
            className="underline text-amber-700 hover:text-amber-900"
          >
            Residency &amp; Visas guide
          </Link>{" "}
          for full non-EU details.
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
