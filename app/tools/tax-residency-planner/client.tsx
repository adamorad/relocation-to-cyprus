"use client";

import { useState } from "react";
import Link from "next/link";

type Condition = {
  label: string;
  pass: boolean;
  detail: string;
};

type Recommendation = "183-day" | "60-day-qualified" | "60-day-marginal" | "not-qualifying";

function getRecommendation(
  daysInCyprus: number,
  daysInOtherCountry: number,
  hasPermanentHome: boolean,
  hasBusinessOrEmployment: boolean,
  isTaxResidentElsewhere: boolean
): { type: Recommendation; title: string; description: string } {
  if (daysInCyprus >= 183) {
    return {
      type: "183-day",
      title: "183-Day Rule — Clear Qualification",
      description:
        "You have spent 183 or more days in Cyprus this year. You qualify as a Cyprus tax resident under the straightforward 183-day test. No further conditions apply. File your TD1 by 31 July of the following year.",
    };
  }

  if (daysInCyprus >= 60) {
    const conditionsMet =
      daysInOtherCountry <= 183 &&
      hasPermanentHome &&
      hasBusinessOrEmployment &&
      !isTaxResidentElsewhere;

    if (conditionsMet) {
      return {
        type: "60-day-qualified",
        title: "60-Day Rule — Qualified",
        description:
          "You meet all four conditions for the 60-day tax residency rule. You are likely tax resident in Cyprus for this year. Maintain a detailed day diary and ensure all four conditions are documented. Consult a Cyprus tax accountant before filing.",
      };
    }

    return {
      type: "60-day-marginal",
      title: "60-Day Rule — Marginal: Seek Advice",
      description:
        "You meet the minimum 60 days in Cyprus but one or more supporting conditions are not met. Your tax residency status is not straightforward. You should consult a Cyprus tax accountant before making any residency claim.",
    };
  }

  return {
    type: "not-qualifying",
    title: "Not Qualifying as Cyprus Tax Resident This Year",
    description:
      "You have spent fewer than 60 days in Cyprus, which means you cannot qualify under either the 183-day or the 60-day rule. You will not be a Cyprus tax resident for this calendar year. If you intend to qualify next year, plan your travel accordingly.",
  };
}

function CheckRow({ label, pass, detail }: Condition) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <span
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
          pass ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}
      >
        {pass ? "✓" : "✗"}
      </span>
      <div>
        <p className={`text-sm font-medium ${pass ? "text-slate-800" : "text-slate-500"}`}>
          {label}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
  highlight,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
  highlight?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className={`text-sm font-bold ${highlight ?? "text-slate-900"}`}>
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <label className="text-sm font-medium text-slate-700 flex-1">{label}</label>
      <div className="flex rounded-lg overflow-hidden border border-slate-200">
        <button
          onClick={() => onChange(true)}
          className={`px-4 py-1.5 text-sm font-medium transition-colors ${
            value
              ? "bg-teal-500 text-white"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => onChange(false)}
          className={`px-4 py-1.5 text-sm font-medium transition-colors border-l border-slate-200 ${
            !value
              ? "bg-teal-500 text-white"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default function TaxResidencyPlannerPage() {
  const [daysInCyprus, setDaysInCyprus] = useState(75);
  const [daysInOtherCountry, setDaysInOtherCountry] = useState(120);
  const [hasPermanentHome, setHasPermanentHome] = useState(true);
  const [hasBusinessOrEmployment, setHasBusinessOrEmployment] = useState(true);
  const [isTaxResidentElsewhere, setIsTaxResidentElsewhere] = useState(false);

  const qualifies183 = daysInCyprus >= 183;

  const sixtyDayConditions: Condition[] = [
    {
      label: "At least 60 days in Cyprus",
      pass: daysInCyprus >= 60,
      detail: `You have entered ${daysInCyprus} days. Minimum required: 60.`,
    },
    {
      label: "No more than 183 days in any single other country",
      pass: daysInOtherCountry <= 183,
      detail: `You entered ${daysInOtherCountry} days in one other country. Maximum allowed: 183.`,
    },
    {
      label: "Permanent residence in Cyprus (rented or owned)",
      pass: hasPermanentHome,
      detail: "You must maintain a home available to you in Cyprus throughout the year.",
    },
    {
      label: "Business activity or employment based in Cyprus",
      pass: hasBusinessOrEmployment,
      detail:
        "You must carry on business, hold employment, or hold an office in a Cyprus-resident entity.",
    },
    {
      label: "Not tax resident in any other country this year",
      pass: !isTaxResidentElsewhere,
      detail:
        "You must not be a tax resident in any other jurisdiction during the same calendar year.",
    },
  ];

  const sixtyDayAllPass = sixtyDayConditions.every((c) => c.pass);

  const recommendation = getRecommendation(
    daysInCyprus,
    daysInOtherCountry,
    hasPermanentHome,
    hasBusinessOrEmployment,
    isTaxResidentElsewhere
  );

  const recColors: Record<Recommendation, string> = {
    "183-day": "bg-emerald-50 border-emerald-200 text-emerald-900",
    "60-day-qualified": "bg-teal-50 border-teal-200 text-teal-900",
    "60-day-marginal": "bg-amber-50 border-amber-200 text-amber-900",
    "not-qualifying": "bg-red-50 border-red-200 text-red-900",
  };

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        ›{" "}
        <Link href="/tools" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        › <span className="text-slate-900">Tax Residency Planner</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Interactive Tool
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          Cyprus 60-Day Tax Residency Planner
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Adjust the sliders to see whether you qualify for Cyprus tax residency under
          the 183-day rule or the more complex 60-day rule. Results update instantly.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <section className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Your Days
            </h2>
            <SliderField
              label="Days spent in Cyprus this year"
              value={daysInCyprus}
              min={0}
              max={365 - daysInOtherCountry}
              unit="days"
              highlight={
                daysInCyprus >= 183
                  ? "text-emerald-600"
                  : daysInCyprus >= 60
                  ? "text-teal-600"
                  : "text-red-600"
              }
              onChange={setDaysInCyprus}
            />
            <SliderField
              label="Days in any single other country"
              value={daysInOtherCountry}
              min={0}
              max={365 - daysInCyprus}
              unit="days"
              highlight={
                daysInOtherCountry > 183 ? "text-red-600" : "text-slate-900"
              }
              onChange={setDaysInOtherCountry}
            />
            {daysInCyprus + daysInOtherCountry > 183 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Combined days in Cyprus + other country: {daysInCyprus + daysInOtherCountry}. The 183-day threshold is a key test — spending more than 183 days in another country will disqualify the 60-day rule.
              </p>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-1">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Your Situation
            </h2>
            <YesNoField
              label="Do you have a permanent home in Cyprus?"
              value={hasPermanentHome}
              onChange={setHasPermanentHome}
            />
            <YesNoField
              label="Do you have business or employment in Cyprus?"
              value={hasBusinessOrEmployment}
              onChange={setHasBusinessOrEmployment}
            />
            <YesNoField
              label="Are you tax resident elsewhere this year?"
              value={isTaxResidentElsewhere}
              onChange={setIsTaxResidentElsewhere}
            />
          </div>
        </section>

        {/* Results */}
        <section className="space-y-4">
          {/* 183-day result */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  qualifies183
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {qualifies183 ? "✓" : "✗"}
              </span>
              <h3 className="text-sm font-semibold text-slate-900">183-Day Rule</h3>
            </div>
            <p className="text-xs text-slate-500 pl-7">
              {qualifies183
                ? `You have spent ${daysInCyprus} days in Cyprus — above the 183-day threshold. You qualify.`
                : `You have spent ${daysInCyprus} days in Cyprus. You need ${183 - daysInCyprus} more days to qualify under this rule.`}
            </p>
          </div>

          {/* 60-day checklist */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  sixtyDayAllPass
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {sixtyDayAllPass ? "✓" : "✗"}
              </span>
              <h3 className="text-sm font-semibold text-slate-900">60-Day Rule Conditions</h3>
            </div>
            <div>
              {sixtyDayConditions.map((c) => (
                <CheckRow key={c.label} {...c} />
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div
            className={`border rounded-xl p-5 ${recColors[recommendation.type]}`}
          >
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
              Recommendation
            </p>
            <h3 className="font-bold text-base mb-2">{recommendation.title}</h3>
            <p className="text-sm leading-relaxed">{recommendation.description}</p>
          </div>
        </section>
      </div>

      <aside className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Important notice</p>
        <p>
          Cyprus Tax Department has tightened audit on 60-day claims. Maintain a day
          diary with proof of presence (boarding passes, hotel receipts, card
          transactions). Consult a Cyprus tax accountant before filing. This tool
          provides general information only and is not tax advice.
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
