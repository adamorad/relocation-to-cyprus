"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type ProviderType = "local" | "international" | "public";

type InsuranceProvider = {
  name: string;
  type: ProviderType;
  coverageRegion: string;
  annualPremiumSingle30yo: number | null;
  annualPremiumFamily4: number | null;
  maternity: boolean;
  dental: boolean;
  preExistingCovered: boolean;
  gesyCompatible: boolean;
  directBillingCyprusHospitals: boolean;
  keyNote: string;
  website: string;
};

const PROVIDERS: ReadonlyArray<InsuranceProvider> = [
  {
    name: "GeSY (Public Healthcare)",
    type: "public",
    coverageRegion: "Cyprus only",
    annualPremiumSingle30yo: 0,
    annualPremiumFamily4: 0,
    maternity: true,
    dental: false,
    preExistingCovered: true,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Universal public health system. Free at point of care for all legal residents. Excellent baseline — covers GP, specialists, most hospital care. No dental or vision. Wait times for non-emergency specialist appointments can be 4–8 weeks. Most relocators use GeSY + supplemental private insurance.",
    website: "https://www.gesy.org.cy",
  },
  {
    name: "AXA PPP / AXA Health",
    type: "international",
    coverageRegion: "Worldwide",
    annualPremiumSingle30yo: 1400,
    annualPremiumFamily4: 4800,
    maternity: true,
    dental: true,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Strong international coverage and established direct billing network at major Cypriot private hospitals (Apollonion, Aretaeio, Iasis). Maternity cover after 10-month waiting period. Pre-existing conditions excluded on standard plan; declared-condition cover available at premium. Good for people who split time between Cyprus and Europe.",
    website: "https://www.axa.com",
  },
  {
    name: "Bupa International",
    type: "international",
    coverageRegion: "Worldwide (excl. USA on standard plan)",
    annualPremiumSingle30yo: 1800,
    annualPremiumFamily4: 5800,
    maternity: true,
    dental: true,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Premium international insurer with a strong reputation for claim handling. 24/7 English-speaking helpline. Dental included in comprehensive plans. Maternity cover after 12 months. USA coverage available as add-on — important for frequent travellers. Higher premiums but reliable for complex medical situations.",
    website: "https://www.bupaglobal.com",
  },
  {
    name: "Cigna Global",
    type: "international",
    coverageRegion: "Worldwide (incl. USA)",
    annualPremiumSingle30yo: 1600,
    annualPremiumFamily4: 5200,
    maternity: true,
    dental: true,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Highly customisable modular plan — start with core cover and add dental, maternity, and mental health separately. Competitive for under-40s. Good online portal and claims app. USA cover included on Silver/Gold/Platinum tiers. Strong choice for tech workers relocating from the US or serving US clients.",
    website: "https://www.cignahealthbenefits.com",
  },
  {
    name: "Allianz Care",
    type: "international",
    coverageRegion: "Worldwide",
    annualPremiumSingle30yo: 1500,
    annualPremiumFamily4: 5000,
    maternity: true,
    dental: true,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Part of Allianz Global group. Solid worldwide cover with competitive family premiums. Maternity cover from day one on some plans (after 10-month waiting period on others — confirm at quote stage). Mental health cover included. Good for families. Dental available as optional add-on on standard plan.",
    website: "https://www.allianzcare.com",
  },
  {
    name: "InterGlobal (now part of AXA)",
    type: "international",
    coverageRegion: "Worldwide",
    annualPremiumSingle30yo: 1300,
    annualPremiumFamily4: 4400,
    maternity: false,
    dental: false,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Now integrated into AXA's international portfolio. Historically competitive on premiums for healthy individuals. Maternity and dental available as optional extras at additional cost. Good for young, healthy individuals who want solid hospital cover without the extras.",
    website: "https://www.axa.com",
  },
  {
    name: "Laiki Asfalistiki (Local Cyprus)",
    type: "local",
    coverageRegion: "Cyprus only",
    annualPremiumSingle30yo: 650,
    annualPremiumFamily4: 2200,
    maternity: true,
    dental: false,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Major local insurer. Most competitive premiums for Cyprus-only coverage. Ideal as a top-up to GeSY for faster private specialist access and private room hospitalisation. Direct billing at most Cypriot private hospitals. No international coverage. Good choice if you rarely travel or have international coverage through an employer.",
    website: "https://www.laikiasfalistiki.com.cy",
  },
  {
    name: "CNP Asfalistiki (Cyprus)",
    type: "local",
    coverageRegion: "Cyprus + EU emergency",
    annualPremiumSingle30yo: 750,
    annualPremiumFamily4: 2500,
    maternity: true,
    dental: true,
    preExistingCovered: false,
    gesyCompatible: true,
    directBillingCyprusHospitals: true,
    keyNote: "Local insurer with wider EU emergency coverage. Dental included in comprehensive plans. Good balance of cost and coverage for Cyprus-based workers who occasionally travel within Europe. Not suitable as standalone for frequent international travellers. English-language customer service available.",
    website: "https://www.cnpasfalistiki.com.cy",
  },
];

type FilterState = {
  coverageType: "all" | "individual" | "family";
  maternity: boolean | null;
  preExisting: boolean | null;
  providerType: "all" | "local" | "international" | "public";
};

const FEATURE_KEYS = [
  { key: "maternity", label: "Maternity" },
  { key: "dental", label: "Dental" },
  { key: "preExistingCovered", label: "Pre-existing" },
  { key: "gesyCompatible", label: "GeSY top-up" },
  { key: "directBillingCyprusHospitals", label: "Direct billing CY" },
] as const;

export default function HealthInsuranceComparisonPage() {
  const [filters, setFilters] = useState<FilterState>({
    coverageType: "all",
    maternity: null,
    preExisting: null,
    providerType: "all",
  });

  const filtered = useMemo(() => {
    return PROVIDERS.filter((p) => {
      if (filters.coverageType === "individual" && p.annualPremiumSingle30yo === null) return false;
      if (filters.coverageType === "family" && p.annualPremiumFamily4 === null) return false;
      if (filters.maternity === true && !p.maternity) return false;
      if (filters.preExisting === true && !p.preExistingCovered) return false;
      if (filters.providerType !== "all" && p.type !== filters.providerType) return false;
      return true;
    });
  }, [filters]);

  const typeColors: Record<ProviderType, string> = {
    public: "bg-slate-100 text-slate-600",
    local: "bg-blue-100 text-blue-700",
    international: "bg-[#35cdc4]/20 text-[#1a8f88]",
  };

  const typeLabels: Record<ProviderType, string> = {
    public: "Public",
    local: "Local",
    international: "International",
  };

  function premiumDisplay(amount: number | null): string {
    if (amount === null) return "—";
    if (amount === 0) return "Free";
    return `€${amount.toLocaleString()}/yr`;
  }

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        {" › "}
        <span className="text-slate-900">Health Insurance Comparison</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Tools
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Private Health Insurance for Cyprus
        </h1>
        <p className="mt-3 text-lg text-slate-600 leading-relaxed">
          Compare 8 insurance providers including GeSY as a baseline. Filter by your needs,
          then get a personal quote from your shortlist.
        </p>
      </header>

      {/* GeSY highlight box */}
      <div className="mb-6 p-4 bg-[#35cdc4]/10 border border-[#35cdc4]/30 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">How GeSY fits in</p>
        <p>
          All legal residents in Cyprus are eligible for GeSY (the public General Healthcare System).
          It costs nothing extra — contributions come from employer/employee taxes. For most relocators,
          GeSY handles everyday healthcare and emergencies, while a private policy speeds up specialist
          access and adds dental/maternity cover. You don&apos;t have to choose one or the other.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-slate-700 text-sm mb-4">Filter providers</h2>
        <div className="flex flex-wrap gap-6">
          {/* Coverage type */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Coverage for</p>
            <div className="flex gap-2">
              {(["all", "individual", "family"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilters({ ...filters, coverageType: t })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    filters.coverageType === t
                      ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                      : "bg-white text-slate-600 border-slate-300 hover:border-[#35cdc4]"
                  }`}
                >
                  {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Provider type */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Provider type</p>
            <div className="flex gap-2">
              {(["all", "public", "local", "international"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilters({ ...filters, providerType: t })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    filters.providerType === t
                      ? "bg-slate-700 text-white border-slate-700"
                      : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Maternity */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Maternity cover</p>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters({ ...filters, maternity: null })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  filters.maternity === null
                    ? "bg-slate-700 text-white border-slate-700"
                    : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                }`}
              >
                Any
              </button>
              <button
                onClick={() => setFilters({ ...filters, maternity: true })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  filters.maternity === true
                    ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                    : "bg-white text-slate-600 border-slate-300 hover:border-[#35cdc4]"
                }`}
              >
                Required
              </button>
            </div>
          </div>

          {/* Pre-existing */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Pre-existing conditions</p>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters({ ...filters, preExisting: null })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  filters.preExisting === null
                    ? "bg-slate-700 text-white border-slate-700"
                    : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                }`}
              >
                Any
              </button>
              <button
                onClick={() => setFilters({ ...filters, preExisting: true })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  filters.preExisting === true
                    ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                    : "bg-white text-slate-600 border-slate-300 hover:border-[#35cdc4]"
                }`}
              >
                Covered
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-500 mb-5">
        Showing {filtered.length} of {PROVIDERS.length} providers
      </p>

      {/* Comparison table — desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Provider</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Coverage</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Single (30yo)</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Family (4)</th>
              {FEATURE_KEYS.map((f) => (
                <th key={f.key} className="text-center px-3 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.name} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${typeColors[p.type]}`}>
                      {typeLabels[p.type]}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{p.coverageRegion}</td>
                <td className="px-4 py-3 text-right font-bold text-[#35cdc4]">
                  {premiumDisplay(p.annualPremiumSingle30yo)}
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-700">
                  {premiumDisplay(p.annualPremiumFamily4)}
                </td>
                {FEATURE_KEYS.map((f) => (
                  <td key={f.key} className="px-3 py-3 text-center">
                    {(p[f.key] as boolean) ? (
                      <span className="text-emerald-500 text-base">✓</span>
                    ) : (
                      <span className="text-slate-300 text-base">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4 mb-6">
        {filtered.map((p) => (
          <div key={p.name} className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-bold text-slate-900">{p.name}</h2>
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${typeColors[p.type]}`}>
                  {typeLabels[p.type]}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Single/yr</p>
                <p className="font-bold text-[#35cdc4]">{premiumDisplay(p.annualPremiumSingle30yo)}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">{p.coverageRegion}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {FEATURE_KEYS.map((f) => (
                <span
                  key={f.key}
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    (p[f.key] as boolean)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {f.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{p.keyNote}</p>
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-[#35cdc4] hover:text-[#2ba8a0] font-semibold underline"
              >
                Visit website →
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Detail notes — desktop only (shown below table) */}
      <div className="hidden md:block space-y-3 mb-8">
        <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Provider notes</h2>
        {filtered.map((p) => (
          <div key={`note-${p.name}`} className="bg-white border border-slate-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-900 text-sm">{p.name}</span>
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#35cdc4] hover:text-[#2ba8a0] font-semibold underline"
                >
                  Website →
                </a>
              )}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{p.keyNote}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <aside className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          Premiums shown are approximate 2025 estimates for a healthy non-smoker at indicated age
          brackets. Actual premiums depend on age, health history, chosen deductible, optional riders,
          and the specific plan tier. Waiting periods, exclusions and benefit limits vary significantly
          between plans. Always obtain a personal quote and read the policy terms before purchasing.
          We are not insurance brokers and do not receive commission from any provider listed here.
        </p>
      </aside>

      {/* Back */}
      <p className="mt-8 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>

      <aside className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Next steps</p>
        <div className="flex flex-wrap gap-3">

<Link href="/guides/gesy-registration-guide/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: GeSY Registration Guide →</Link>          <Link href="/sections/specialist-doctors/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Find a specialist doctor →</Link>
        </div>
      </aside>
    </main>
  );
}
