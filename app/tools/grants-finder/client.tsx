"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Sector =
  | "tech"
  | "hospitality"
  | "manufacturing"
  | "energy"
  | "agri"
  | "research"
  | "retail"
  | "general";

type CompanySize = "micro" | "sme" | "large";

type GrantStatus = "open" | "closed" | "rolling";

type Grant = {
  name: string;
  adminBody: string;
  targetSectors: Sector[];
  maxAmountEuros: number | null;
  coveragePercent: number | null;
  eligibility: string;
  deadline: string;
  status: GrantStatus;
  companySizes: CompanySize[];
  url: string;
  description: string;
};

const SECTOR_LABELS: Record<Sector, string> = {
  tech: "Technology",
  hospitality: "Hospitality & Tourism",
  manufacturing: "Manufacturing",
  energy: "Renewable Energy",
  agri: "Agriculture & Food",
  research: "Research & Innovation",
  retail: "Retail & Services",
  general: "All Sectors",
};

const ALL_SECTORS: Sector[] = ["tech", "hospitality", "manufacturing", "energy", "agri", "research", "retail", "general"];
const ALL_SIZES: CompanySize[] = ["micro", "sme", "large"];

const SIZE_LABELS: Record<CompanySize, string> = {
  micro: "Micro (<10 employees, <€2M turnover)",
  sme: "SME (<250 employees, <€50M turnover)",
  large: "Large Enterprise",
};

const GRANTS: ReadonlyArray<Grant> = [
  {
    name: "ARIF — Restart and Recovery Innovation Fund",
    adminBody: "Research and Innovation Foundation (RIF)",
    targetSectors: ["tech", "research", "manufacturing", "general"],
    maxAmountEuros: 200000,
    coveragePercent: 50,
    eligibility: "Cyprus-registered SMEs, startups and research organisations. Must have a Cyprus TIC and be operating for at least 12 months.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://www.research.org.cy",
    description: "Supports R&D-driven businesses to develop innovative products, services and processes. Funded under the Recovery and Resilience Plan.",
  },
  {
    name: "IDEA — Business Idea Competition for Startups",
    adminBody: "Research and Innovation Foundation (RIF)",
    targetSectors: ["tech", "research", "general"],
    maxAmountEuros: 50000,
    coveragePercent: 80,
    eligibility: "Early-stage startups and entrepreneurs at concept or MVP stage. At least one founder must be resident in Cyprus.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro"],
    url: "https://www.research.org.cy",
    description: "Pre-seed funding for innovative business ideas. High coverage rate of up to 80%. Primarily targets tech and deep-tech startups.",
  },
  {
    name: "INNOVATE — Innovate for Competitiveness",
    adminBody: "Research and Innovation Foundation (RIF)",
    targetSectors: ["tech", "manufacturing", "research", "general"],
    maxAmountEuros: 1000000,
    coveragePercent: 50,
    eligibility: "Cyprus-registered SMEs with a demonstrable R&D component and market readiness. Partnerships with research institutions preferred.",
    deadline: "2025-09-30",
    status: "closed",
    companySizes: ["sme"],
    url: "https://www.research.org.cy",
    description: "Supports innovation and technology transfer. Up to €1M for collaborative R&D projects between businesses and research organisations.",
  },
  {
    name: "MECIT Digital Transformation Subsidy",
    adminBody: "Ministry of Energy, Commerce and Industry (MECIT)",
    targetSectors: ["tech", "manufacturing", "retail", "general"],
    maxAmountEuros: 100000,
    coveragePercent: 50,
    eligibility: "Cypriot SMEs pursuing digital transformation. Must be registered and operating in Cyprus.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://www.mcit.gov.cy",
    description: "Supports SME digitisation: ERP systems, e-commerce, cybersecurity, cloud adoption and digital marketing investments.",
  },
  {
    name: "MECIT Green Business Programme",
    adminBody: "Ministry of Energy, Commerce and Industry (MECIT)",
    targetSectors: ["energy", "manufacturing", "general"],
    maxAmountEuros: 200000,
    coveragePercent: 40,
    eligibility: "Cyprus-registered businesses investing in green practices, energy efficiency, and circular economy. All sizes eligible.",
    deadline: "2025-12-31",
    status: "closed",
    companySizes: ["micro", "sme", "large"],
    url: "https://www.mcit.gov.cy",
    description: "Incentivises environmentally responsible business practices: energy audits, renewable energy installation, waste reduction, sustainable supply chains.",
  },
  {
    name: "Renewable Energy Subsidy Scheme (RES)",
    adminBody: "Cyprus Energy Regulatory Authority (CERA)",
    targetSectors: ["energy"],
    maxAmountEuros: 500000,
    coveragePercent: 30,
    eligibility: "Businesses installing solar PV, wind, biomass or other RES systems in Cyprus. Commercial and industrial applications.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme", "large"],
    url: "https://www.cera.org.cy",
    description: "Feed-in tariff and capital grants for renewable energy installations. Part of Cyprus's National Energy and Climate Plan (NECP) targets.",
  },
  {
    name: "INTERREG Med — Blue Mediterranean Platform",
    adminBody: "EU INTERREG Mediterranean Programme",
    targetSectors: ["hospitality", "agri", "energy", "general"],
    maxAmountEuros: 300000,
    coveragePercent: 85,
    eligibility: "Organisations in EU Mediterranean coastal regions (including Cyprus). Requires a transnational project partnership with at least 3 countries.",
    deadline: "2026-03-31",
    status: "closed",
    companySizes: ["micro", "sme", "large"],
    url: "https://interreg-med.eu",
    description: "Cross-border cooperation for sustainable development in the Mediterranean. Covers blue economy, sustainable tourism, and climate resilience.",
  },
  {
    name: "INTERREG VI-A Greece-Cyprus 2021-2027",
    adminBody: "EU INTERREG Greece-Cyprus Programme",
    targetSectors: ["tech", "energy", "agri", "research", "general"],
    maxAmountEuros: 500000,
    coveragePercent: 80,
    eligibility: "Organisations in Cyprus and eligible Greek regions. Partnership with Greek counterpart required. Public bodies, NGOs, research orgs and businesses eligible.",
    deadline: "2025-10-15",
    status: "closed",
    companySizes: ["micro", "sme", "large"],
    url: "https://www.greece-cyprus.eu",
    description: "Joint Greece-Cyprus programme covering smart growth, green transition, cross-border cooperation and cultural/tourism development.",
  },
  {
    name: "Cyprus SME Competitiveness Grant",
    adminBody: "Deputy Ministry of Research, Innovation and Digital Policy",
    targetSectors: ["manufacturing", "tech", "retail", "general"],
    maxAmountEuros: 250000,
    coveragePercent: 45,
    eligibility: "SMEs registered and operating in Cyprus for at least 2 years. Must demonstrate impact on competitiveness, exports or employment.",
    deadline: "2025-11-30",
    status: "closed",
    companySizes: ["micro", "sme"],
    url: "https://www.digitalpolicy.gov.cy",
    description: "Broad competitiveness support for Cypriot SMEs. Covers equipment, process improvement, certification, quality management and market access.",
  },
  {
    name: "Agri-Food Innovation Fund (AIFUND)",
    adminBody: "Ministry of Agriculture, Rural Development and Environment",
    targetSectors: ["agri"],
    maxAmountEuros: 150000,
    coveragePercent: 60,
    eligibility: "Agricultural businesses, food processors and agri-tech startups. Must be operating in Cyprus with activities in primary production or processing.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://www.moa.gov.cy",
    description: "Supports innovation in Cyprus's agri-food sector: precision farming, food safety, organic certification, vertical farming and export development.",
  },
  {
    name: "Rural Development Programme — Business Support",
    adminBody: "Ministry of Agriculture, Rural Development and Environment (EAFRD)",
    targetSectors: ["agri", "hospitality", "general"],
    maxAmountEuros: 400000,
    coveragePercent: 50,
    eligibility: "Businesses and agricultural holdings in rural areas of Cyprus. Strong preference for projects that create local employment.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://www.moa.gov.cy",
    description: "EU-funded rural development support. Covers diversification of agricultural activity, agro-tourism, rural infrastructure and village business development.",
  },
  {
    name: "Tourism Competitiveness and Sustainability Grant",
    adminBody: "Deputy Ministry of Tourism",
    targetSectors: ["hospitality"],
    maxAmountEuros: 300000,
    coveragePercent: 40,
    eligibility: "Hotels, agro-tourism operators, tour operators and hospitality businesses registered in Cyprus. Minimum 2 years of operation.",
    deadline: "2025-08-31",
    status: "closed",
    companySizes: ["micro", "sme", "large"],
    url: "https://www.visitcyprus.com",
    description: "Supports tourism product quality improvement, sustainability certification, accessible tourism investment, and digital marketing for Cyprus tourism businesses.",
  },
  {
    name: "Horizon Europe — EIC Accelerator",
    adminBody: "European Innovation Council (European Commission)",
    targetSectors: ["tech", "research", "energy", "general"],
    maxAmountEuros: 2500000,
    coveragePercent: 70,
    eligibility: "Deep-tech startups and scale-ups from EU member states (including Cyprus). Must target breakthrough innovation. Open to individuals and incorporated companies.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://eic.ec.europa.eu/eic-funding/eic-accelerator_en",
    description: "The EU's flagship deep-tech startup funding programme. Up to €2.5M grant + up to €15M equity investment. Highly competitive (3-5% success rate).",
  },
  {
    name: "Horizon Europe — SME Instrument (Step 1)",
    adminBody: "European Innovation Council (European Commission)",
    targetSectors: ["tech", "research", "manufacturing", "general"],
    maxAmountEuros: 50000,
    coveragePercent: 100,
    eligibility: "EU SMEs with innovative high-growth potential. Cyprus-registered entities are fully eligible. No partnership requirement for Phase 1.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://eic.ec.europa.eu",
    description: "€50K feasibility study grant for SMEs with breakthrough ideas. 100% coverage. Good entry point into EU innovation funding ecosystem.",
  },
  {
    name: "Digital Economy and Society Investment Plan",
    adminBody: "Deputy Ministry of Research, Innovation and Digital Policy",
    targetSectors: ["tech", "retail", "general"],
    maxAmountEuros: 75000,
    coveragePercent: 60,
    eligibility: "Micro and small businesses investing in digital tools. Businesses must be registered and operating in Cyprus.",
    deadline: "2026-06-30",
    status: "open",
    companySizes: ["micro"],
    url: "https://www.digitalpolicy.gov.cy",
    description: "Vouchers and grants for micro-businesses to adopt digital tools: websites, accounting software, digital payments, online marketing and cybersecurity.",
  },
  {
    name: "Employment Incentive Scheme — Hiring Support",
    adminBody: "Human Resources Development Authority (HRDA)",
    targetSectors: ["general"],
    maxAmountEuros: 30000,
    coveragePercent: 50,
    eligibility: "Cyprus-registered businesses hiring unemployed persons or persons from vulnerable groups. Valid employment contract required.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme", "large"],
    url: "https://www.hrdauth.org.cy",
    description: "Subsidy of up to 50% of wages for 6-12 months when hiring unemployed or disadvantaged workers. Also covers training costs.",
  },
  {
    name: "HRDA Training Grants for Employers",
    adminBody: "Human Resources Development Authority (HRDA)",
    targetSectors: ["general"],
    maxAmountEuros: 20000,
    coveragePercent: 60,
    eligibility: "All Cyprus-registered employers with at least one employee. Training must relate to business operations and be approved in advance.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme", "large"],
    url: "https://www.hrdauth.org.cy",
    description: "Reimburses up to 60% of approved training costs. Covers external courses, certifications, language training and professional development programmes.",
  },
  {
    name: "EIF — COSME Loan Guarantee Facility",
    adminBody: "European Investment Fund / Bank of Cyprus",
    targetSectors: ["general"],
    maxAmountEuros: null,
    coveragePercent: null,
    eligibility: "SMEs in Cyprus seeking business loans. Access via participating banks (Bank of Cyprus, Hellenic Bank). No minimum operation period.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["micro", "sme"],
    url: "https://www.eif.org",
    description: "EIF-backed loan guarantees that reduce collateral requirements for SME lending. Accessed through Cypriot banks — ask your bank about EU-backed SME loan products.",
  },
  {
    name: "InvestCyprus Incentive Package",
    adminBody: "Invest Cyprus (Cyprus Investment Promotion Agency)",
    targetSectors: ["tech", "energy", "manufacturing", "research", "general"],
    maxAmountEuros: null,
    coveragePercent: null,
    eligibility: "Foreign investors and international companies establishing or expanding operations in Cyprus. Various incentives available depending on investment size and sector.",
    deadline: "rolling",
    status: "rolling",
    companySizes: ["sme", "large"],
    url: "https://www.investcyprus.org.cy",
    description: "Package of fiscal incentives, fast-track licensing, and support services for foreign direct investment into Cyprus. Tailored by sector and investment size.",
  },
];

function formatAmount(amount: number | null): string {
  if (amount === null) return "Varies";
  if (amount >= 1000000) return `€${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `€${(amount / 1000).toFixed(0)}K`;
  return `€${amount}`;
}

export default function GrantsFinderPage() {
  const [selectedSector, setSelectedSector] = useState<Sector | "all">("all");
  const [selectedSize, setSelectedSize] = useState<CompanySize | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<GrantStatus | "all">("all");

  const filtered = useMemo(() => {
    return GRANTS.filter((g) => {
      const matchesSector = selectedSector === "all" || g.targetSectors.includes(selectedSector);
      const matchesSize = selectedSize === "all" || g.companySizes.includes(selectedSize);
      const matchesStatus = selectedStatus === "all" || g.status === selectedStatus;
      return matchesSector && matchesSize && matchesStatus;
    });
  }, [selectedSector, selectedSize, selectedStatus]);

  const statusColors: Record<GrantStatus, string> = {
    open: "bg-emerald-100 text-emerald-700",
    rolling: "bg-blue-100 text-blue-700",
    closed: "bg-slate-100 text-slate-500",
  };

  const statusLabels: Record<GrantStatus, string> = {
    open: "Open",
    rolling: "Rolling",
    closed: "Closed",
  };

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        {" › "}
        <span className="text-slate-900">Cyprus Business Grants Finder</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Tools
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Business Grants Finder
        </h1>
        <p className="mt-3 text-lg text-slate-600 leading-relaxed">
          Browse {GRANTS.length} active and recently active grant programmes for businesses in Cyprus.
          Filter by sector, company size, and status.
        </p>
      </header>

      {/* Filters */}
      <div className="space-y-4 mb-6">
        {/* Sector filter */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Sector</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSector("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selectedSector === "all"
                  ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                  : "bg-white text-slate-600 border-slate-300 hover:border-[#35cdc4]"
              }`}
            >
              All Sectors
            </button>
            {ALL_SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSector(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedSector === s
                    ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                    : "bg-white text-slate-600 border-slate-300 hover:border-[#35cdc4]"
                }`}
              >
                {SECTOR_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Size + Status filter */}
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Company Size</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSize("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedSize === "all"
                    ? "bg-slate-700 text-white border-slate-700"
                    : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                }`}
              >
                Any size
              </button>
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-colors ${
                    selectedSize === s
                      ? "bg-slate-700 text-white border-slate-700"
                      : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                  }`}
                >
                  {s === "micro" ? "Micro" : s === "sme" ? "SME" : "Large"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Status</p>
            <div className="flex gap-2">
              {(["all", "open", "rolling", "closed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    selectedStatus === s
                      ? "bg-slate-700 text-white border-slate-700"
                      : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                  }`}
                >
                  {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-500 mb-5">
        Showing {filtered.length} of {GRANTS.length} programmes
      </p>

      {/* Grant cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No grants match your current filters. Try broadening your search.
          </div>
        )}
        {filtered.map((g) => (
          <div key={g.name} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[g.status]}`}>
                    {statusLabels[g.status]}
                  </span>
                  {g.targetSectors.map((s) => (
                    <span key={s} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {SECTOR_LABELS[s]}
                    </span>
                  ))}
                </div>
                <h2 className="font-bold text-slate-900 text-base leading-snug">{g.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{g.adminBody}</p>
              </div>
              <div className="flex gap-4 shrink-0 text-right">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Max Grant</p>
                  <p className="font-bold text-[#35cdc4] text-lg">{formatAmount(g.maxAmountEuros)}</p>
                </div>
                {g.coveragePercent !== null && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Coverage</p>
                    <p className="font-bold text-slate-700 text-lg">{g.coveragePercent}%</p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-3">{g.description}</p>

            <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Eligibility</p>
                <p className="text-slate-600 text-xs leading-relaxed">{g.eligibility}</p>
              </div>
              <div>
                <div className="mb-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Deadline</p>
                  <p className="text-slate-700 text-xs font-semibold">
                    {g.deadline === "rolling" ? "Rolling / ongoing" : g.deadline}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Company sizes</p>
                  <div className="flex gap-1 flex-wrap">
                    {g.companySizes.map((s) => (
                      <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                        {s === "sme" ? "SME" : s.charAt(0).toUpperCase() + s.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {g.url && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#35cdc4] hover:text-[#2ba8a0] font-semibold underline"
                >
                  Official source →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <aside className="mt-10 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Important notice</p>
        <p>
          Grant programmes open and close frequently. Amounts, coverage percentages and deadlines
          change. Always verify current status and eligibility criteria directly at the official
          source before investing time in an application. This directory is for research purposes
          and was last updated in 2025.
        </p>
      </aside>

      {/* Back */}
      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools" className="underline hover:text-slate-900">
          ← Back to Tools
        </Link>
      </p>

      <aside className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Next steps</p>
        <div className="flex flex-wrap gap-3">

<Link href="/guides/trade-licenses-cyprus/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: Trade Licences in Cyprus →</Link>          <Link href="/sections/accountants/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Find an accountant →</Link>
        </div>
      </aside>
    </main>
  );
}
