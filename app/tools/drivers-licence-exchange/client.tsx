"use client";

import Link from "next/link";
import { useState } from "react";

// ── data ─────────────────────────────────────────────────────────────────────

type LicenceCategory = "car" | "motorcycle" | "both" | "other";

type ExchangeType = "direct" | "tests" | null;

interface CountryOption {
  value: string;
  label: string;
  group: "eu_eea" | "uk" | "bilateral" | "other";
}

const EU_EEA_COUNTRIES: CountryOption[] = [
  { value: "AT", label: "Austria", group: "eu_eea" },
  { value: "BE", label: "Belgium", group: "eu_eea" },
  { value: "BG", label: "Bulgaria", group: "eu_eea" },
  { value: "HR", label: "Croatia", group: "eu_eea" },
  { value: "CZ", label: "Czech Republic", group: "eu_eea" },
  { value: "DK", label: "Denmark", group: "eu_eea" },
  { value: "EE", label: "Estonia", group: "eu_eea" },
  { value: "FI", label: "Finland", group: "eu_eea" },
  { value: "FR", label: "France", group: "eu_eea" },
  { value: "DE", label: "Germany", group: "eu_eea" },
  { value: "GR", label: "Greece", group: "eu_eea" },
  { value: "HU", label: "Hungary", group: "eu_eea" },
  { value: "IE", label: "Ireland", group: "eu_eea" },
  { value: "IT", label: "Italy", group: "eu_eea" },
  { value: "LV", label: "Latvia", group: "eu_eea" },
  { value: "LT", label: "Lithuania", group: "eu_eea" },
  { value: "LU", label: "Luxembourg", group: "eu_eea" },
  { value: "MT", label: "Malta", group: "eu_eea" },
  { value: "NL", label: "Netherlands", group: "eu_eea" },
  { value: "PL", label: "Poland", group: "eu_eea" },
  { value: "PT", label: "Portugal", group: "eu_eea" },
  { value: "RO", label: "Romania", group: "eu_eea" },
  { value: "SK", label: "Slovakia", group: "eu_eea" },
  { value: "SI", label: "Slovenia", group: "eu_eea" },
  { value: "ES", label: "Spain", group: "eu_eea" },
  { value: "SE", label: "Sweden", group: "eu_eea" },
  { value: "NO", label: "Norway", group: "eu_eea" },
  { value: "IS", label: "Iceland", group: "eu_eea" },
  { value: "LI", label: "Liechtenstein", group: "eu_eea" },
];

const UK_COUNTRIES: CountryOption[] = [
  { value: "GB", label: "United Kingdom", group: "uk" },
];

const BILATERAL_COUNTRIES: CountryOption[] = [
  { value: "US", label: "USA (all 50 states)", group: "bilateral" },
  { value: "CA", label: "Canada (all provinces)", group: "bilateral" },
  { value: "AU", label: "Australia", group: "bilateral" },
  { value: "NZ", label: "New Zealand", group: "bilateral" },
  { value: "CH", label: "Switzerland", group: "bilateral" },
  { value: "JP", label: "Japan", group: "bilateral" },
  { value: "KR", label: "South Korea", group: "bilateral" },
  { value: "AE", label: "UAE", group: "bilateral" },
  { value: "IL", label: "Israel", group: "bilateral" },
];

const ALL_COUNTRIES = [
  ...EU_EEA_COUNTRIES,
  ...UK_COUNTRIES,
  ...BILATERAL_COUNTRIES,
];

function getGroup(
  countryValue: string,
): "eu_eea" | "uk" | "bilateral" | "other" {
  const found = ALL_COUNTRIES.find((c) => c.value === countryValue);
  return found ? found.group : "other";
}

// ── cost calculation ──────────────────────────────────────────────────────────

function calcCost(
  group: "eu_eea" | "uk" | "bilateral" | "other",
  category: LicenceCategory,
): { breakdown: { label: string; amount: string }[]; total: string } | null {
  if (group === "other") return null;

  const breakdown: { label: string; amount: string }[] = [];
  let total = 0;

  if (group === "eu_eea" || group === "bilateral") {
    if (category === "car") {
      breakdown.push({ label: "Car licence (B)", amount: "€24" });
      total += 24;
    } else if (category === "motorcycle") {
      breakdown.push({ label: "Motorcycle licence (A)", amount: "€12" });
      total += 12;
    } else if (category === "both") {
      breakdown.push({ label: "Car licence (B)", amount: "€24" });
      breakdown.push({ label: "Motorcycle licence (A)", amount: "€12" });
      total += 36;
    } else {
      breakdown.push({ label: "Exchange fee", amount: "€24" });
      total += 24;
    }
  } else if (group === "uk") {
    // UK only covers car
    breakdown.push({ label: "Car licence (B)", amount: "€24" });
    total += 24;
  }

  breakdown.push({
    label: "Medical certificate (approx.)",
    amount: "€15–30",
  });

  return {
    breakdown,
    total: `€${total} + medical`,
  };
}

// ── document checklist ────────────────────────────────────────────────────────

const BASE_DOCUMENTS = [
  "Valid original foreign driving licence (both sides if card format)",
  "Valid passport or EU ID card",
  "2 recent passport photos (45×35 mm, white background)",
  "Medical certificate (eye test + GP declaration of fitness) — cost approx. €15–30",
  "Proof of Cyprus residence (utility bill, bank statement, or municipality registration)",
  "Completed application form (available at District Transport Department)",
  "Payment of applicable fee",
];

const EU_CITIZEN_DOCS = [
  "MEU1 certificate (EU citizens)",
];

const NON_EU_DOCS = [
  "ARC card (Alien Registration Certificate)",
];

const TRANSLATION_NOTE =
  "Certified translation of licence (required if not issued in Latin alphabet or Greek — EU documents are exempt)";

function getDocuments(
  group: "eu_eea" | "uk" | "bilateral" | "other",
  countryValue: string,
): string[] {
  const isEuCitizen = group === "eu_eea";
  const needsTranslation =
    group === "bilateral" &&
    ["JP", "KR", "AE", "IL"].includes(countryValue);

  const docs = [...BASE_DOCUMENTS];

  if (isEuCitizen) {
    docs.push(EU_CITIZEN_DOCS[0]);
  } else {
    docs.push(NON_EU_DOCS[0]);
    if (needsTranslation) {
      docs.push(TRANSLATION_NOTE);
    }
  }

  if (group === "other") {
    docs.push(TRANSLATION_NOTE);
  }

  return docs;
}

// ── process steps ─────────────────────────────────────────────────────────────

function getSteps(
  group: "eu_eea" | "uk" | "bilateral" | "other",
): string[] {
  if (group === "other") {
    return [
      "You may drive on your valid foreign licence for up to 6 months from establishing Cyprus residency.",
      "Enrol in a Cyprus-approved driving school (recommended: €40–60/lesson, typically 5–15 lessons needed).",
      "Apply for a learner's permit at the District Transport Department.",
      "Book and pass the theory test (available in Greek, English, Russian, Turkish) — fee €17.",
      "Book and pass the practical driving test — fee €34.",
      "Upon passing, collect your Cyprus driving licence from the District Transport Department.",
    ];
  }

  return [
    "Gather all required documents listed below.",
    "Book an appointment at your nearest District Transport Department (Limassol, Larnaca, or Paphos).",
    "Attend your appointment and submit your original foreign licence along with all documents.",
    "Your foreign licence will be surrendered and returned to the issuing country's authority.",
    "Your Cyprus driving licence will be issued within approximately 4–6 weeks.",
  ];
}

// ── sub-components ────────────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <li
      className="flex items-start gap-3 cursor-pointer group"
      onClick={() => setChecked((v) => !v)}
    >
      <span
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked
            ? "bg-emerald-500 border-emerald-500"
            : "border-slate-300 group-hover:border-emerald-400"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 12 12"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 6l3 3 5-5"
            />
          </svg>
        )}
      </span>
      <span
        className={`text-sm leading-relaxed transition-colors ${
          checked ? "line-through text-slate-400" : "text-slate-700"
        }`}
      >
        {text}
      </span>
    </li>
  );
}

function StepItem({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#35cdc4] text-slate-900 flex items-center justify-center text-xs font-bold">
        {n}
      </span>
      <span className="text-sm text-slate-700 leading-relaxed pt-0.5">
        {text}
      </span>
    </li>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function DriversLicenceExchangeClient() {
  const [countryValue, setCountryValue] = useState("");
  const [category, setCategory] = useState<LicenceCategory>("car");

  const group = countryValue ? getGroup(countryValue) : null;
  const exchangeType: ExchangeType =
    group === null
      ? null
      : group === "other"
      ? "tests"
      : "direct";

  const cost = group && exchangeType === "direct" ? calcCost(group, category) : null;
  const documents = group ? getDocuments(group, countryValue) : [];
  const steps = group ? getSteps(group) : [];

  const isUkBilateralCategoryNote =
    group === "uk" && (category === "motorcycle" || category === "both" || category === "other");

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
        &rsaquo; <span className="text-slate-900">Driver&rsquo;s Licence Exchange</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-purple-700 font-bold">
          Bureaucracy
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Driver&rsquo;s Licence Exchange
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Find out whether you can directly exchange your foreign driving licence
          in Cyprus or need to take tests. Get a personalised checklist and cost
          estimate.
        </p>
      </header>

      {/* step 1 — country selector */}
      <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-5">
        <h2 className="text-sm font-bold text-slate-800 mb-1">
          Step 1 — Where was your licence issued?
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Select your country. If your country isn&rsquo;t listed, choose &ldquo;Other
          country&rdquo; at the bottom.
        </p>

        <select
          value={countryValue}
          onChange={(e) => setCountryValue(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
        >
          <option value="">— Select your country —</option>
          <optgroup label="EU / EEA countries (direct exchange, no test)">
            {EU_EEA_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="United Kingdom (direct exchange, no test)">
            {UK_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Bilateral agreement countries (direct exchange, no test)">
            {BILATERAL_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="All other countries (tests required)">
            <option value="OTHER">Other country (not listed above)</option>
          </optgroup>
        </select>

        <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
          Countries in the &ldquo;bilateral agreement&rdquo; group have a specific agreement
          with Cyprus allowing direct licence exchange without retesting.
        </p>
      </section>

      {/* step 2 — category */}
      {countryValue && (
        <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-5">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Step 2 — What licence category do you hold?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                { value: "car", label: "Car (B)", sub: "Standard car" },
                {
                  value: "motorcycle",
                  label: "Motorcycle (A)",
                  sub: "Motorbike",
                },
                { value: "both", label: "Both B + A", sub: "Car & bike" },
                { value: "other", label: "Other", sub: "C, D, etc." },
              ] as { value: LicenceCategory; label: string; sub: string }[]
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCategory(opt.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                  category === opt.value
                    ? "border-[#35cdc4] bg-teal-50 text-slate-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                }`}
              >
                {opt.label}
                <span className="text-[10px] font-normal text-slate-500 mt-0.5">
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* step 3 — result */}
      {group && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Step 3 — Your personalised result
          </h2>

          {/* status badge */}
          <div
            className={`flex items-center gap-4 p-5 rounded-xl border-2 mb-5 ${
              exchangeType === "direct"
                ? "bg-emerald-50 border-emerald-300"
                : "bg-amber-50 border-amber-300"
            }`}
          >
            <span
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                exchangeType === "direct"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {exchangeType === "direct" ? "✓" : "!"}
            </span>
            <div>
              <p
                className={`text-lg font-bold ${
                  exchangeType === "direct"
                    ? "text-emerald-800"
                    : "text-amber-800"
                }`}
              >
                {exchangeType === "direct"
                  ? "Direct Exchange — No Test Required"
                  : "Tests Required"}
              </p>
              <p className="text-sm text-slate-600 mt-0.5">
                {exchangeType === "direct"
                  ? "You can exchange your licence directly at the District Transport Department."
                  : "Your country does not have a bilateral agreement with Cyprus. You must pass theory and practical tests."}
              </p>
            </div>
          </div>

          {/* UK category note */}
          {isUkBilateralCategoryNote && (
            <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-slate-700">
              <p className="font-semibold text-slate-900 mb-1">Note for UK licence holders</p>
              <p>
                The UK bilateral agreement covers car licences (Category B). For
                motorcycle (A), commercial vehicle (C), or bus (D) categories,
                please confirm current requirements directly with the Cyprus Road
                Transport Department.
              </p>
            </div>
          )}

          {/* timeline + cost */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                Estimated timeline
              </p>
              <p className="text-xl font-bold text-slate-900">
                {exchangeType === "direct" ? "4–6 weeks" : "3–6 months"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {exchangeType === "direct"
                  ? "From appointment to licence receipt"
                  : "Including test waiting times"}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                Estimated cost
              </p>
              {exchangeType === "direct" && cost ? (
                <>
                  <p className="text-xl font-bold text-slate-900">{cost.total}</p>
                  <ul className="mt-2 space-y-0.5">
                    {cost.breakdown.map((item) => (
                      <li
                        key={item.label}
                        className="flex justify-between text-[11px] text-slate-500"
                      >
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.amount}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-slate-900">€350–750+</p>
                  <ul className="mt-2 space-y-0.5 text-[11px] text-slate-500">
                    <li className="flex justify-between">
                      <span>Theory test</span>
                      <span className="font-semibold">€17</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Practical test</span>
                      <span className="font-semibold">€34</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Driving lessons (5–15 lessons)</span>
                      <span className="font-semibold">€300–700</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Medical certificate</span>
                      <span className="font-semibold">€15–30</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* step-by-step process */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl mb-5">
            <h3 className="text-sm font-bold text-slate-800 mb-4">
              Step-by-step process
            </h3>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <StepItem key={i} n={i + 1} text={step} />
              ))}
            </ol>
          </div>

          {/* required documents checklist */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl mb-5">
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              Required documents checklist
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Click each item to mark it as gathered.
            </p>
            <ul className="space-y-3">
              {documents.map((doc) => (
                <CheckItem key={doc} text={doc} />
              ))}
            </ul>
          </div>

          {/* office locations */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-5">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              District Transport Department offices
            </p>
            <ul className="space-y-1 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-[#35cdc4]">&#8227;</span>
                Limassol District Transport Department
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#35cdc4]">&#8227;</span>
                Larnaca District Transport Department
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#35cdc4]">&#8227;</span>
                Paphos District Transport Department
              </li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-400">
              All offices open weekday mornings. Check MCIT website for current
              hours and appointment availability.
            </p>
          </div>

          {/* official confirmation note */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-slate-700">
            <p className="font-semibold text-slate-900 mb-1">
              Always confirm before your appointment
            </p>
            <p>
              Requirements can change. Always verify current requirements with
              the Cyprus Road Transport Department (MCIT) before attending your
              appointment.
            </p>
          </div>
        </section>
      )}

      {/* disclaimer */}
      <aside className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          General information only — not legal, tax, or financial advice.
          Regulations and fees are subject to change. Always confirm current
          requirements with official Cyprus authorities before taking action.
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
