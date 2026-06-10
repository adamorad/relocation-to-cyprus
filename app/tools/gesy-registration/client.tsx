"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── types ─────────────────────────────────────────────────────────────────────

type EmploymentStatus =
  | "employed"
  | "self-employed"
  | "pensioner"
  | "employed-abroad"
  | "non-working"
  | "student";

// ── contribution rates (2025) ─────────────────────────────────────────────────

const RATES: Record<EmploymentStatus, number> = {
  employed: 0.0265,
  "self-employed": 0.04,
  pensioner: 0.0265,
  "employed-abroad": 0.017,
  "non-working": 0.017,
  student: 0.017,
};

const EMPLOYER_RATE = 0.029;
const GESY_CAP = 180_000;

const STATUS_LABELS: Record<EmploymentStatus, string> = {
  employed: "Employed by Cyprus company",
  "self-employed": "Self-employed in Cyprus",
  pensioner: "Pensioner (Cyprus pension)",
  "employed-abroad": "Employed abroad, residing in Cyprus",
  "non-working": "Non-working resident",
  student: "Student",
};

// ── formatting ─────────────────────────────────────────────────────────────────

function fmtEur(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-IE");
}

function fmtEurDec(n: number): string {
  return (
    "€" +
    n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}

// ── accordion step ─────────────────────────────────────────────────────────────

function AccordionStep({
  stepNum,
  title,
  acknowledged,
  onAcknowledge,
  children,
}: {
  stepNum: number;
  title: string;
  acknowledged: boolean;
  onAcknowledge: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            acknowledged
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {acknowledged ? "✓" : stepNum}
        </span>
        <span className="font-semibold text-slate-800 flex-1">{title}</span>
        <span className="text-slate-400 text-lg">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 bg-white border-t border-slate-100">
          {children}
          {!acknowledged && (
            <button
              type="button"
              onClick={onAcknowledge}
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors"
            >
              Mark as read ✓
            </button>
          )}
          {acknowledged && (
            <p className="mt-4 text-xs text-emerald-600 font-semibold">
              ✓ Acknowledged
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── pill ───────────────────────────────────────────────────────────────────────

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-[11px] font-semibold rounded-full border border-teal-200">
      {children}
    </span>
  );
}

// ── info box ───────────────────────────────────────────────────────────────────

function InfoBox({
  color,
  title,
  children,
}: {
  color: "blue" | "amber" | "red" | "emerald";
  title?: string;
  children: React.ReactNode;
}) {
  const map = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    red: "bg-red-50 border-red-200 text-red-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  return (
    <div className={`my-3 p-3 rounded-lg border text-xs leading-relaxed ${map[color]}`}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      {children}
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export default function GeSYClient() {
  const [status, setStatus] = useState<EmploymentStatus>("employed");
  const [income, setIncome] = useState(60_000);
  const [acknowledged, setAcknowledged] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const taxableIncome = useMemo(() => Math.min(income, GESY_CAP), [income]);
  const annualContrib = useMemo(
    () => taxableIncome * RATES[status],
    [taxableIncome, status],
  );
  const monthlyContrib = useMemo(() => annualContrib / 12, [annualContrib]);
  const annualEmployer = useMemo(
    () => (status === "employed" ? taxableIncome * EMPLOYER_RATE : 0),
    [taxableIncome, status],
  );
  const monthlyEmployer = useMemo(
    () => annualEmployer / 12,
    [annualEmployer],
  );

  const ack = (i: number) =>
    setAcknowledged((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });

  const allDone = acknowledged.every(Boolean);

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
        &rsaquo; <span className="text-slate-900">GeSY Registration Guide</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-red-700 font-bold">
          Healthcare
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          GeSY Registration Guide
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Cyprus&rsquo;s universal healthcare system covers GP visits, specialists,
          hospitals, and prescriptions at low cost. Follow the 5 steps below to
          register and activate your coverage.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* left: wizard steps */}
        <div className="flex-1 flex flex-col gap-3">

          {/* progress bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span>
              <span>{acknowledged.filter(Boolean).length} / 5 steps read</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(acknowledged.filter(Boolean).length / 5) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step 1 */}
          <AccordionStep
            stepNum={1}
            title="Pre-requisites"
            acknowledged={acknowledged[0]}
            onAcknowledge={() => ack(0)}
          >
            <p className="text-sm text-slate-700 mb-3">
              Before you can register with GeSY, make sure you have all of the
              following:
            </p>
            <ul className="text-sm text-slate-700 space-y-2 mb-3">
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  <strong>Legal right to reside in Cyprus</strong> — ARC card,
                  MEU1 certificate, work permit, or student visa
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  <strong>Cypriot Tax Identification Number (TIN / ΑΦΜ)</strong>{" "}
                  — required to create your GeSY account
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  <strong>Valid ID or passport</strong>
                </span>
              </li>
            </ul>
            <InfoBox color="amber" title="Missing a TIN?">
              Visit your nearest Tax Department office. Bring:{" "}
              <strong>passport</strong> + <strong>proof of Cyprus address</strong>{" "}
              (utility bill or bank statement dated within 3 months).
            </InfoBox>
          </AccordionStep>

          {/* Step 2 */}
          <AccordionStep
            stepNum={2}
            title="How to register"
            acknowledged={acknowledged[1]}
            onAcknowledge={() => ack(1)}
          >
            <p className="text-sm text-slate-700 mb-3">
              You can register online or in person:
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-800 mb-1">
                  Option A — Online (recommended)
                </p>
                <p>
                  Go to{" "}
                  <a
                    href="https://beneficiary.gesy.org.cy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 underline hover:text-teal-800"
                  >
                    beneficiary.gesy.org.cy
                  </a>{" "}
                  and create an account using your TIN. The process takes
                  approximately 10 minutes.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-800 mb-1">
                  Option B — In person
                </p>
                <p>
                  Visit a District GeSY Office in{" "}
                  <Pill>Limassol</Pill> <Pill>Paphos</Pill>{" "}
                  <Pill>Larnaca</Pill>. Bring your TIN, ID/passport, and
                  residency document.
                </p>
              </div>
            </div>
            <InfoBox color="blue" title="Employed workers — check with HR first">
              Your employer may register you automatically through their payroll
              system. Check with your HR department before registering
              independently to avoid duplicate entries.
            </InfoBox>
          </AccordionStep>

          {/* Step 3 */}
          <AccordionStep
            stepNum={3}
            title="Choose your Personal Doctor (GP)"
            acknowledged={acknowledged[2]}
            onAcknowledge={() => ack(2)}
          >
            <p className="text-sm text-slate-700 mb-3">
              After registering, you must select a GeSY-registered Personal
              Doctor (PD). Without a PD, you cannot get referrals to
              specialists.
            </p>
            <ul className="text-sm text-slate-700 space-y-2 mb-3">
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  Search for doctors at{" "}
                  <a
                    href="https://beneficiary.gesy.org.cy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 underline hover:text-teal-800"
                  >
                    beneficiary.gesy.org.cy
                  </a>{" "}
                  under &ldquo;Find Personal Doctor&rdquo;
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  You can change your PD{" "}
                  <strong>twice per year for free</strong>; additional changes
                  cost <strong>€10</strong>
                </span>
              </li>
            </ul>
            <InfoBox color="emerald" title="Tip from expats">
              Ask expat friends or neighbours for GP recommendations — quality
              varies significantly between practices. Local Facebook groups and
              expat forums are a good source of up-to-date reviews.
            </InfoBox>
          </AccordionStep>

          {/* Step 4 */}
          <AccordionStep
            stepNum={4}
            title="Co-payments — what you pay at point of care"
            acknowledged={acknowledged[3]}
            onAcknowledge={() => ack(3)}
          >
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wide text-left">
                    <th className="px-3 py-2 font-semibold">Service</th>
                    <th className="px-3 py-2 font-semibold text-right">
                      Your cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["GP visit (your Personal Doctor)", "€6"],
                    ["Specialist visit (with GP referral)", "€18"],
                    ["Accident & Emergency", "€0"],
                    ["Hospital admission (medically necessary)", "€0"],
                    ["Prescription (per item)", "€0.50 – €3"],
                    ["Dental", "NOT covered*"],
                    ["Eye tests / glasses", "NOT covered*"],
                  ].map(([service, cost]) => (
                    <tr
                      key={service}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-3 py-2 text-slate-700">{service}</td>
                      <td
                        className={`px-3 py-2 text-right font-semibold ${
                          cost.startsWith("NOT")
                            ? "text-red-500"
                            : "text-teal-600"
                        }`}
                      >
                        {cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InfoBox color="amber" title="* Dental & optical gaps">
              GeSY does not cover routine dental or optical care. Consider a
              private supplementary plan — typically{" "}
              <strong>€50–120/month for a family</strong> covering dental +
              optical.
            </InfoBox>
          </AccordionStep>

          {/* Step 5 */}
          <AccordionStep
            stepNum={5}
            title="Family registration"
            acknowledged={acknowledged[4]}
            onAcknowledge={() => ack(4)}
          >
            <ul className="text-sm text-slate-700 space-y-2 mb-3">
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  <strong>Children under 18:</strong> free registration, linked
                  to parent&rsquo;s account
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  <strong>Spouse / partner:</strong> must register independently
                  with their own TIN and employment details
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500 mt-0.5">✔</span>
                <span>
                  <strong>Parents / other dependants:</strong> must register
                  independently — each person needs their own GeSY account
                </span>
              </li>
            </ul>
            <InfoBox color="blue">
              Every family member needs their own Personal Doctor selected after
              registration — children can use a paediatrician as their PD.
            </InfoBox>
          </AccordionStep>

          {/* all done banner */}
          {allDone && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-sm text-emerald-800 font-semibold text-center">
              All 5 steps acknowledged — you&rsquo;re ready to register with GeSY!
            </div>
          )}

          {/* covered / not covered */}
          <section className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <h2 className="text-sm font-bold text-slate-800 mb-3">
              What GeSY covers
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <p className="font-semibold text-emerald-700 mb-2 uppercase tracking-wide">
                  Covered
                </p>
                <ul className="space-y-1">
                  {[
                    "GP visits",
                    "Specialist consultations (with referral)",
                    "Hospital care (medically necessary)",
                    "Maternity & childbirth",
                    "Mental health (limited sessions)",
                    "Prescriptions (subsidised)",
                    "Some physiotherapy",
                  ].map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <span className="text-emerald-500">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-red-600 mb-2 uppercase tracking-wide">
                  Not covered
                </p>
                <ul className="space-y-1">
                  {[
                    "Dental (except emergency extractions)",
                    "Routine optical / glasses",
                    "Cosmetic procedures",
                    "Most alternative therapies",
                    "Some specialist treatments",
                  ].map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <span className="text-red-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <InfoBox color="amber">
              <strong>Recommendation:</strong> Consider a private supplementary
              plan for dental + optical — typically €50–120/month for a family.
            </InfoBox>
          </section>
        </div>

        {/* right: contribution calculator */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-8 p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <h2 className="text-sm font-bold text-slate-800 mb-4">
              Contribution Calculator
            </h2>

            {/* employment status */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-2">
                Employment status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EmploymentStatus)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {(Object.keys(STATUS_LABELS) as EmploymentStatus[]).map(
                  (s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* income slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  {status === "pensioner" ? "Annual pension" : "Annual income"}
                </label>
                <span className="text-sm font-bold text-slate-900">
                  {fmtEur(income)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={200_000}
                step={1_000}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-[#35cdc4]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>€0</span>
                <span>€200,000</span>
              </div>
              {income > GESY_CAP && (
                <p className="mt-1 text-[10px] text-amber-600">
                  GeSY contribution capped at €180,000 taxable income
                </p>
              )}
            </div>

            {/* results */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                  Your monthly contribution
                </p>
                <p className="text-2xl font-bold" style={{ color: "#35cdc4" }}>
                  {fmtEurDec(monthlyContrib)}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {(RATES[status] * 100).toFixed(2)}% of gross income
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                  Your annual contribution
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {fmtEurDec(annualContrib)}
                </p>
              </div>

              {status === "employed" && (
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                    Employer also pays
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {fmtEurDec(monthlyEmployer)}
                    <span className="text-xs text-slate-400 font-normal">
                      /mo
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {fmtEurDec(annualEmployer)}/yr (2.90% of gross)
                  </p>
                </div>
              )}
            </div>

            {/* rate table */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                2025 contribution rates
              </p>
              <table className="w-full text-[11px]">
                <tbody>
                  {(
                    [
                      ["Employed", "2.65%"],
                      ["Self-employed", "4.00%"],
                      ["Pensioner", "2.65%"],
                      ["Employed abroad / non-working", "1.70%"],
                    ] as [string, string][]
                  ).map(([label, rate]) => (
                    <tr key={label} className="border-t border-slate-100">
                      <td className="py-1 text-slate-600">{label}</td>
                      <td className="py-1 text-right font-semibold text-slate-800">
                        {rate}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-slate-200">
                    <td className="py-1 text-slate-500 italic">
                      Max taxable income
                    </td>
                    <td className="py-1 text-right font-semibold text-slate-800">
                      €180,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[10px] text-slate-400 leading-relaxed">
              Example: at €60,000 income, an employee pays ~€133/mo (€1,590/yr)
              and gains access to the full GeSY system.
            </p>
          </div>
        </aside>
      </div>

      {/* disclaimer */}
      <aside className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          General information only — not legal, tax, or financial advice.
          Contribution rates and co-payment amounts are based on 2025 GeSY
          rules and may change. Always verify current rates at{" "}
          <a
            href="https://www.gesy.org.cy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-900"
          >
            gesy.org.cy
          </a>
          .
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
