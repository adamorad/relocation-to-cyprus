"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type CoverageCity = "Limassol" | "Paphos" | "Larnaca" | "Nicosia" | "Ayia Napa" | "Island-wide";

type BroadbandISP = {
  name: string;
  type: "fibre" | "cable" | "vdsl";
  maxSpeedDown: number; // Mbps
  maxSpeedUp: number; // Mbps
  monthlyPrice: number; // €
  contractMonths: number;
  setupFee: number; // €
  coverage: CoverageCity[];
  englishSupport: boolean;
  notes: string;
  website: string;
};

type MobileCarrier = {
  name: string;
  unlimitedDataPlan: number; // €/mo
  prepay10GBCost: number; // €
  coverage: number; // percent
  eSIM: boolean;
  internationalRoaming: boolean;
  notes: string;
  website: string;
};

const BROADBAND: BroadbandISP[] = [
  {
    name: "Cyta (Cytanet)",
    type: "fibre",
    maxSpeedDown: 1000,
    maxSpeedUp: 1000,
    monthlyPrice: 49,
    contractMonths: 12,
    setupFee: 0,
    coverage: ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa"],
    englishSupport: true,
    notes: "State-owned incumbent. Largest coverage including rural areas. VDSL widely available; FTTH (fibre-to-the-home) rolling out fast in urban centres. Reliable customer service with English support. Bundle discounts available with Cyta mobile (MTN partnership). 1 Gbps symmetrical available in covered FTTH areas.",
    website: "https://www.cyta.com.cy",
  },
  {
    name: "Epic",
    type: "fibre",
    maxSpeedDown: 1000,
    maxSpeedUp: 1000,
    monthlyPrice: 45,
    contractMonths: 12,
    setupFee: 0,
    coverage: ["Limassol", "Paphos", "Larnaca", "Nicosia"],
    englishSupport: true,
    notes: "Private telecoms company offering competitive fibre speeds in major cities. Generally regarded as slightly more agile than Cyta on pricing and customer support. Strong presence in Limassol and Nicosia. FTTH available in urban areas with 1 Gbps speeds. No Ayia Napa coverage. Bundle with Epic mobile for additional savings.",
    website: "https://www.epic.com.cy",
  },
  {
    name: "Primetel",
    type: "fibre",
    maxSpeedDown: 500,
    maxSpeedUp: 500,
    monthlyPrice: 42,
    contractMonths: 12,
    setupFee: 25,
    coverage: ["Limassol", "Larnaca", "Nicosia"],
    englishSupport: true,
    notes: "Third-largest provider, operating in the main cities only. Competitive pricing with no contract options available (higher monthly rate). TV bundle (Primetel TV) popular with expat households wanting international channels. Fibre coverage more limited than Cyta or Epic; check availability at your specific address before signing.",
    website: "https://www.primetel.com.cy",
  },
  {
    name: "Cablenet",
    type: "cable",
    maxSpeedDown: 1000,
    maxSpeedUp: 500,
    monthlyPrice: 39,
    contractMonths: 12,
    setupFee: 30,
    coverage: ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa"],
    englishSupport: true,
    notes: "Cable-based provider (DOCSIS 3.1) delivering some of the fastest real-world download speeds in Cyprus. Highly regarded for consistency and actual speeds versus advertised. Island-wide cable network including tourist areas. Upload speeds are asymmetric on the cable technology (lower than download). Strong reputation among remote workers and gamers for low latency.",
    website: "https://www.cablenet.com.cy",
  },
];

const MOBILE: MobileCarrier[] = [
  {
    name: "Cyta (MTN Cyprus)",
    unlimitedDataPlan: 22,
    prepay10GBCost: 12,
    coverage: 98,
    eSIM: true,
    internationalRoaming: true,
    notes: "Largest network coverage including rural and mountain areas. The Cyta and MTN networks are now operated together. Best for those spending time outside the main cities. Unlimited plans start at €22/mo; family plans available. Good roaming across EU (standard EU roaming rules apply). eSIM available.",
    website: "https://www.mtn.com.cy",
  },
  {
    name: "Epic",
    unlimitedDataPlan: 20,
    prepay10GBCost: 10,
    coverage: 95,
    eSIM: true,
    internationalRoaming: true,
    notes: "Strong urban coverage with competitive pricing. The cheapest unlimited data option at €20/mo. Slightly lower rural coverage than Cyta/MTN. 5G available in parts of Limassol and Nicosia. eSIM available. EU roaming included. Popular among expats for value-for-money.",
    website: "https://www.epic.com.cy",
  },
  {
    name: "Primetel Mobile",
    unlimitedDataPlan: 25,
    prepay10GBCost: 15,
    coverage: 90,
    eSIM: false,
    internationalRoaming: true,
    notes: "Smallest of the three mobile operators. Coverage focused on urban areas and main roads; gaps in rural and mountain areas. No eSIM currently. Better known for broadband than mobile. Worth considering for bundle deals if you are already using Primetel broadband. EU roaming included.",
    website: "https://www.primetel.com.cy",
  },
];

const COVERAGE_CITIES: CoverageCity[] = ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa", "Island-wide"];

const TYPE_LABEL = {
  fibre: "Fibre (FTTH)",
  cable: "Cable",
  vdsl: "VDSL",
};

const TYPE_COLOR = {
  fibre: "bg-teal-100 text-teal-800",
  cable: "bg-blue-100 text-blue-800",
  vdsl: "bg-amber-100 text-amber-800",
};

export default function ISPComparisonPage() {
  const [tab, setTab] = useState<"broadband" | "mobile">("broadband");
  const [cityFilter, setCityFilter] = useState<CoverageCity | null>(null);

  const filteredBroadband = useMemo(() => {
    if (!cityFilter || cityFilter === "Island-wide") return BROADBAND;
    return BROADBAND.filter((isp) =>
      isp.coverage.includes(cityFilter) || isp.coverage.includes("Island-wide")
    );
  }, [cityFilter]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/tools/" className="hover:text-slate-900">Tools</Link>
        {" "}&rsaquo;{" "}
        <span className="text-slate-900">ISP Comparison</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">Interactive Tool</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Internet & Mobile Providers in Cyprus
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Compare home broadband and mobile carriers. Cyprus has fast internet — 1 Gbps fibre is available in urban areas for under €50/month.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("broadband")}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm border transition-colors ${
            tab === "broadband"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"
          }`}
        >
          Home Broadband
        </button>
        <button
          onClick={() => setTab("mobile")}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm border transition-colors ${
            tab === "mobile"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"
          }`}
        >
          Mobile
        </button>
      </div>

      {tab === "broadband" && (
        <>
          {/* City filter */}
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Filter by city coverage</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCityFilter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  cityFilter === null
                    ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
              >
                All areas
              </button>
              {COVERAGE_CITIES.filter(c => c !== "Island-wide").map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(cityFilter === c ? null : c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    cityFilter === c
                      ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Broadband table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Provider</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Type</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Max Down</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Max Up</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Price/mo</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Contract</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Setup fee</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-700">English</th>
                </tr>
              </thead>
              <tbody>
                {filteredBroadband.map((isp, i) => (
                  <tr key={isp.name} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-4 py-3">
                      <a href={isp.website} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#35cdc4]">
                        {isp.name}
                      </a>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isp.coverage.join(", ")}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${TYPE_COLOR[isp.type]}`}>
                        {TYPE_LABEL[isp.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">{isp.maxSpeedDown} Mbps</td>
                    <td className="px-4 py-3 text-right text-slate-700">{isp.maxSpeedUp} Mbps</td>
                    <td className="px-4 py-3 text-right font-bold text-[#35cdc4]">€{isp.monthlyPrice}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{isp.contractMonths} mo</td>
                    <td className="px-4 py-3 text-right text-slate-700">{isp.setupFee === 0 ? "Free" : `€${isp.setupFee}`}</td>
                    <td className="px-4 py-3 text-center">{isp.englishSupport ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="mt-6 space-y-4">
            {filteredBroadband.map((isp) => (
              <div key={isp.name} className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900 mb-1">{isp.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{isp.notes}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "mobile" && (
        <>
          {/* Mobile table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Carrier</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Unlimited plan</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Prepay 10 GB</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Coverage</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-700">eSIM</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-700">EU Roaming</th>
                </tr>
              </thead>
              <tbody>
                {MOBILE.map((carrier, i) => (
                  <tr key={carrier.name} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-4 py-3">
                      <a href={carrier.website} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#35cdc4]">
                        {carrier.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-[#35cdc4]">€{carrier.unlimitedDataPlan}/mo</td>
                    <td className="px-4 py-3 text-right text-slate-700">€{carrier.prepay10GBCost}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">{carrier.coverage}%</td>
                    <td className="px-4 py-3 text-center">{carrier.eSIM ? "✓" : "—"}</td>
                    <td className="px-4 py-3 text-center">{carrier.internationalRoaming ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="mt-6 space-y-4">
            {MOBILE.map((carrier) => (
              <div key={carrier.name} className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900 mb-1">{carrier.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{carrier.notes}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>Plans and prices change frequently. Verify at provider websites before signing. Prices shown are indicative for 2025 entry-level packages at the highest advertised speed tier — actual available speeds depend on your specific address and infrastructure type.</p>
      </div>

      <p className="mt-6 text-sm">
        <Link href="/tools/" className="text-[#35cdc4] hover:underline">
          &larr; Back to tools
        </Link>
      </p>
    </main>
  );
}
