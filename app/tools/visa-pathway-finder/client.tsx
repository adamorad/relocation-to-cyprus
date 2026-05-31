"use client";

import Link from "next/link";
import { useState } from "react";

type CitizenshipStatus = "eu" | "non-eu" | null;
type EuPurpose = "employment" | "self-employed" | "self-sufficient" | "retired" | null;
type NonEuPurpose =
  | "remote-work"
  | "cyprus-employer"
  | "investment"
  | "retired"
  | "student"
  | null;

interface Pathway {
  name: string;
  description: string;
  keyRequirement: string;
  processingTime: string;
  guideSlug?: string;
  guideLabel?: string;
  officialLink?: string;
  officialLabel?: string;
}

const EU_PATHWAYS: Record<NonNullable<EuPurpose>, Pathway> = {
  employment: {
    name: "EU Registration Certificate (MEU1) — Employed",
    description:
      "EU citizens working in Cyprus do not need a visa. After 90 days, you must register your residence at the Civil Registry. As an employed person you present your employment contract.",
    keyRequirement:
      "Employment contract with a Cyprus-registered employer, proof of accommodation, valid EU passport or ID.",
    processingTime: "2–4 weeks after appointment",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Book at crmd.moi.gov.cy",
  },
  "self-employed": {
    name: "EU Registration Certificate (MEU1) — Self-Employed",
    description:
      "EU citizens running their own business in Cyprus register via the MEU1 process. You need to demonstrate genuine economic activity — typically via a company registration, tax registration (TIC), or freelance income evidence.",
    keyRequirement:
      "Proof of self-employment (company registration or freelance contracts), accommodation, health insurance or GeSY registration, sufficient funds.",
    processingTime: "2–4 weeks after appointment",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Book at crmd.moi.gov.cy",
  },
  "self-sufficient": {
    name: "EU Registration Certificate (MEU1) — Self-Sufficient",
    description:
      "EU citizens who are financially independent (not working in Cyprus) can register by proving sufficient funds to support themselves without recourse to Cyprus's social welfare system.",
    keyRequirement:
      "Bank statements showing approximately €30,000–€40,000/year income from abroad, comprehensive private health insurance, proof of accommodation.",
    processingTime: "2–4 weeks after appointment",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Book at crmd.moi.gov.cy",
  },
  retired: {
    name: "EU Registration Certificate (MEU1) — Retired",
    description:
      "EU retired citizens follow the self-sufficient MEU1 route. Pension income qualifies as proof of sufficient funds. Cyprus has no minimum pension threshold for EU citizens, but €2,000–€3,000/month is typically sufficient in practice.",
    keyRequirement:
      "Proof of pension income, comprehensive private health insurance (recommended in addition to GeSY), proof of accommodation.",
    processingTime: "2–4 weeks after appointment",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Book at crmd.moi.gov.cy",
  },
};

const NON_EU_PATHWAYS: Record<NonNullable<NonEuPurpose>, Pathway> = {
  "remote-work": {
    name: "Digital Nomad Visa",
    description:
      "Cyprus's Digital Nomad Visa (DNV) is designed for non-EU nationals who work remotely for foreign employers or serve non-Cypriot clients as freelancers. Issued for 1 year, renewable up to 3 years. Covers spouse and dependent children.",
    keyRequirement:
      "Minimum net monthly income of €3,500 (€4,200 with a spouse, +15% per dependent child). Employment contract or freelance contracts with non-Cyprus clients. No working for Cyprus-based employers.",
    processingTime: "5–8 weeks from full application",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://www.mfa.gov.cy/mfa/mfa2016.nsf/All/0E3FE0BDC725C79AC22587100025B77E",
    officialLabel: "Apply at mfa.gov.cy",
  },
  "cyprus-employer": {
    name: "Work Permit (Employment Visa, Category E)",
    description:
      "Non-EU nationals who have a job offer from a Cyprus-registered employer need a work permit. The employer usually initiates the application with the Department of Labour. The process involves demonstrating no suitable EU candidate was available for the role.",
    keyRequirement:
      "Job offer from a Cyprus employer, employer demonstrates labour market test (proof no EU candidate was available), clean criminal record, medical certificate.",
    processingTime: "2–4 months (employer-led application)",
    officialLink: "https://www.mlsi.gov.cy/mlsi/dl/dl.nsf/index_en/index_en?OpenDocument",
    officialLabel: "Labour Department (mlsi.gov.cy)",
  },
  investment: {
    name: "Permanent Residency by Investment (Category F / Reg 6(2))",
    description:
      "Non-EU nationals who purchase qualifying Cyprus real estate can obtain Permanent Residency. No minimum stay is required once granted. Does not directly lead to citizenship (a separate 7-year naturalisation track applies).",
    keyRequirement:
      "Purchase of a newly-built residential property for at least €300,000 (ex-VAT), paid from a Cypriot bank account. Annual income of at least €50,000 from outside Cyprus (+€15,000 per spouse, +€10,000 per child).",
    processingTime: "6–12 months",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Civil Registry (crmd.moi.gov.cy)",
  },
  retired: {
    name: "Permanent Residency by Income (Category F / Self-Sufficient)",
    description:
      "Non-EU retirees or financially independent individuals can obtain Permanent Residency by demonstrating stable income from abroad. Property purchase of at least €300,000 is still required unless applying under a long-stay visa.",
    keyRequirement:
      "Annual income of at least €50,000 from outside Cyprus (pension, investments, rental income), property purchase of €300,000+, comprehensive health insurance.",
    processingTime: "6–12 months",
    guideSlug: "residency-and-visas",
    guideLabel: "Residency & Visas guide",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Civil Registry (crmd.moi.gov.cy)",
  },
  student: {
    name: "Student Visa / Temporary Residence Permit",
    description:
      "Non-EU students enrolled at a recognised Cyprus university or educational institution can obtain a Temporary Residence Permit for the duration of their studies. Most applications are coordinated through the institution.",
    keyRequirement:
      "Acceptance letter from a recognised Cyprus institution, proof of sufficient funds to cover tuition and living costs, comprehensive health insurance.",
    processingTime: "4–8 weeks",
    officialLink: "https://crmd.moi.gov.cy",
    officialLabel: "Civil Registry (crmd.moi.gov.cy)",
  },
};

export default function VisaPathwayFinderPage() {
  const [citizenship, setCitizenship] = useState<CitizenshipStatus>(null);
  const [euPurpose, setEuPurpose] = useState<EuPurpose>(null);
  const [nonEuPurpose, setNonEuPurpose] = useState<NonEuPurpose>(null);

  const reset = () => {
    setCitizenship(null);
    setEuPurpose(null);
    setNonEuPurpose(null);
  };

  let pathway: Pathway | null = null;
  if (citizenship === "eu" && euPurpose) {
    pathway = EU_PATHWAYS[euPurpose];
  } else if (citizenship === "non-eu" && nonEuPurpose) {
    pathway = NON_EU_PATHWAYS[nonEuPurpose];
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <nav className="text-xs text-slate-500 mb-6 flex gap-3">
        <Link href="/" className="hover:text-slate-900">← Home</Link>
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
          Cyprus Visa Pathway Finder
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Answer two questions to find the recommended visa or registration
          route for your situation. Each result includes the key requirement,
          processing time, and a link to the relevant guide.
        </p>
      </header>

      <div className="space-y-6">
        {/* Q1 */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-slate-800">
              Q1 · What is your citizenship status?
            </p>
            {citizenship && (
              <button
                onClick={reset}
                className="text-xs text-slate-400 hover:text-slate-700 underline"
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {(["eu", "non-eu"] as CitizenshipStatus[]).map((opt) => (
              <button
                key={opt!}
                onClick={() => {
                  setCitizenship(opt);
                  setEuPurpose(null);
                  setNonEuPurpose(null);
                }}
                className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-semibold transition-colors ${
                  citizenship === opt
                    ? "border-[#35cdc4] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
                style={citizenship === opt ? { backgroundColor: "#35cdc4", borderColor: "#35cdc4" } : {}}
              >
                {opt === "eu" ? "EU Citizen" : "Non-EU Citizen"}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 — EU */}
        {citizenship === "eu" && (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-bold text-slate-800 mb-3">
              Q2 · What will you be doing in Cyprus?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(["employment", "self-employed", "self-sufficient", "retired"] as EuPurpose[]).map(
                (opt) => {
                  const labels: Record<NonNullable<EuPurpose>, string> = {
                    employment: "Employed",
                    "self-employed": "Self-employed",
                    "self-sufficient": "Self-sufficient",
                    retired: "Retired",
                  };
                  return (
                    <button
                      key={opt!}
                      onClick={() => setEuPurpose(opt)}
                      className={`py-3 px-4 rounded-lg border-2 text-sm font-semibold transition-colors text-center ${
                        euPurpose === opt
                          ? "text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                      style={
                        euPurpose === opt
                          ? { backgroundColor: "#35cdc4", borderColor: "#35cdc4" }
                          : {}
                      }
                    >
                      {labels[opt!]}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Q2 — Non-EU */}
        {citizenship === "non-eu" && (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-bold text-slate-800 mb-3">
              Q2 · What will you do in Cyprus?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(["remote-work", "cyprus-employer", "investment", "retired", "student"] as NonEuPurpose[]).map(
                (opt) => {
                  const labels: Record<NonNullable<NonEuPurpose>, string> = {
                    "remote-work": "Remote work for foreign employer",
                    "cyprus-employer": "Work for Cyprus employer",
                    investment: "Investment / wealth",
                    retired: "Retired",
                    student: "Student",
                  };
                  return (
                    <button
                      key={opt!}
                      onClick={() => setNonEuPurpose(opt)}
                      className={`py-3 px-4 rounded-lg border-2 text-sm font-semibold transition-colors text-left ${
                        nonEuPurpose === opt
                          ? "text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                      style={
                        nonEuPurpose === opt
                          ? { backgroundColor: "#35cdc4", borderColor: "#35cdc4" }
                          : {}
                      }
                    >
                      {labels[opt!]}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Result */}
        {pathway && (
          <div className="p-5 rounded-xl border-2 border-[#35cdc4] bg-white">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: "#35cdc4" }}>
              Recommended pathway
            </p>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              {pathway.name}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {pathway.description}
            </p>
            <dl className="space-y-3 mb-4">
              <div>
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                  Key Requirement
                </dt>
                <dd className="text-sm text-slate-800">{pathway.keyRequirement}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                  Processing Time
                </dt>
                <dd className="text-sm text-slate-800">{pathway.processingTime}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3">
              {pathway.guideSlug && (
                <Link
                  href={`/guides/${pathway.guideSlug}`}
                  className="inline-block text-sm font-semibold px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: "#35cdc4" }}
                >
                  {pathway.guideLabel || "Read the guide"} →
                </Link>
              )}
              {pathway.officialLink && (
                <a
                  href={pathway.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-700 hover:border-slate-400"
                >
                  {pathway.officialLabel || "Official site"} ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <aside className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">Not legal advice</p>
        <p>
          This tool provides general guidance only. Immigration rules change
          frequently — always verify current requirements with the Cyprus Civil
          Registry and Migration Department (crmd.moi.gov.cy) or a qualified
          immigration lawyer before making decisions.
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
