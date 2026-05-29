import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyprus Relocation Tools — RealCy.app",
  description:
    "Free interactive tools for relocating to Cyprus: calculators, planners, trackers, and comparison tables covering tax, visas, finance, lifestyle, and connectivity.",
  alternates: { canonical: "/tools/" },
};

type Tool = {
  href: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
};

const TOOLS: Tool[] = [
  // TL1 — Tools 1–4
  {
    href: "/tools/rent-vs-buy-calculator",
    title: "Rent vs Buy Calculator",
    description:
      "Compare the true total cost of renting versus buying in Cyprus over your time horizon, accounting for mortgage payments, property appreciation, and the opportunity cost of your down payment.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/neighborhood-comparison",
    title: "Neighbourhood Comparison",
    description:
      "Side-by-side comparison of Limassol, Paphos, Larnaca, Nicosia, and Ayia Napa across 10 metrics including rent, property prices, schools, nightlife, and cost of living.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
  {
    href: "/tools/meu1-tracker",
    title: "MEU1 Registration Tracker",
    description:
      "An interactive step-by-step checklist for EU citizens registering their residence in Cyprus. Track your progress through all required documents and appointments.",
    tag: "Bureaucracy",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    href: "/tools/visa-pathway-finder",
    title: "Visa Pathway Finder",
    description:
      "Answer two questions to find your recommended Cyprus visa or registration route. Covers EU citizens, Digital Nomad Visa, Permanent Residency by Investment, work permits, and more.",
    tag: "Visas",
    tagColor: "bg-green-100 text-green-800",
  },
  // TL2 — Tools 5–8
  {
    href: "/tools/tax-residency-planner",
    title: "Cyprus 60-Day Tax Residency Planner",
    description:
      "Check whether you qualify for Cyprus tax residency under the 183-day rule or the 60-day rule. See which conditions pass or fail in real time.",
    tag: "Tax",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    href: "/tools/social-insurance-calculator",
    title: "Cyprus Social Insurance Calculator",
    description:
      "Calculate your Social Insurance and GeSY contributions based on 2025 rates. Full breakdown for employed and self-employed, including employer contributions.",
    tag: "Social Insurance",
    tagColor: "bg-teal-100 text-teal-800",
  },
  {
    href: "/tools/banking-fee-comparison",
    title: "Cyprus Banking Fee Comparison",
    description:
      "Compare fees and features across Bank of Cyprus, Hellenic Bank, AstroBank, Revolut, and Wise. Highlights the best value in each category.",
    tag: "Banking",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/tax-filing-calendar",
    title: "Cyprus Annual Tax Filing Calendar",
    description:
      "All key Cyprus tax deadlines in a monthly view. Colour-coded by urgency. Filter by individual or company. Current month highlighted.",
    tag: "Tax",
    tagColor: "bg-amber-100 text-amber-800",
  },
  // TL3 — Tools 9–12
  {
    href: "/tools/school-fee-estimator",
    title: "Cyprus School Fee Estimator",
    description:
      "Estimate international school fees across Limassol, Paphos, Larnaca, and Nicosia. Filter by curriculum (British, American, IB), year group, and city to see realistic annual costs.",
    tag: "Education",
    tagColor: "bg-pink-100 text-pink-800",
  },
  {
    href: "/tools/property-transfer-calculator",
    title: "Property Transfer Fee Calculator",
    description:
      "Calculate Cyprus property transfer fees, immovable property tax, and stamp duty on any purchase price. Includes VAT exemption scenarios for first-time buyers.",
    tag: "Property",
    tagColor: "bg-orange-100 text-orange-800",
  },
  {
    href: "/tools/moving-cost-estimator",
    title: "Relocation Cost Estimator",
    description:
      "Build a complete relocation budget from scratch. Covers shipping containers, flights, temporary accommodation, agency fees, utility deposits, and first-month living costs.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/gesy-eligibility-checker",
    title: "GeSY Eligibility & Contribution Checker",
    description:
      "Find out whether you are eligible for Cyprus's public healthcare system (GeSY), what contribution rate applies to you, and what is covered versus what requires top-up insurance.",
    tag: "Healthcare",
    tagColor: "bg-red-100 text-red-800",
  },
  // TL4 — Tools 13–16 (this batch)
  {
    href: "/tools/flight-connectivity",
    title: "Cyprus Flight Connectivity",
    description:
      "Explore 40+ direct routes from Larnaca (LCA) and Paphos (PFO) airports. Search by destination, filter by airport and season. See airlines, flight times, and frequency at a glance.",
    tag: "Travel",
    tagColor: "bg-sky-100 text-sky-800",
  },
  {
    href: "/tools/events-calendar",
    title: "Cyprus Annual Events & Festivals",
    description:
      "30+ annual festivals and cultural events across Cyprus in a 12-month calendar. Filter by type (carnival, wine, music, religious) or city. Highlights: Limassol Carnival, Kataklysmos, and Wine Festival.",
    tag: "Lifestyle",
    tagColor: "bg-rose-100 text-rose-800",
  },
  {
    href: "/tools/isp-comparison",
    title: "Internet & Mobile Provider Comparison",
    description:
      "Compare home broadband (Cyta, Epic, Primetel, Cablenet) and mobile carriers (Cyta/MTN, Epic, Primetel) on speed, price, contract terms, eSIM, and city coverage.",
    tag: "Connectivity",
    tagColor: "bg-teal-100 text-teal-800",
  },
  {
    href: "/tools/visa-renewal-reminder",
    title: "Visa & Document Renewal Reminder",
    description:
      "Track expiry dates for your ARC, passport, visa, health insurance, and driving licence. Colour-coded alerts at 30 and 90 days. Stores data in your browser — nothing sent to a server.",
    tag: "Visas",
    tagColor: "bg-green-100 text-green-800",
  },
];

export default function ToolsIndexPage() {
  return (
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">Tools</span>
      </nav>

      <header className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Interactive Tools
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Cyprus Relocation Tools
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Free calculators, planners, and trackers for the most common
          questions when relocating to Cyprus.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-[#35cdc4] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span
                  className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2.5 ${tool.tagColor}`}
                >
                  {tool.tag}
                </span>
                <h2 className="text-base font-bold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">
                  {tool.title}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors text-xl mt-1">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <aside className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          These tools provide general information only and are not legal, tax, or
          financial advice. Rates and rules change frequently — always verify with the
          Cyprus Tax Department, Civil Registry, and a local accountant before making
          decisions.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          &larr; Back to the map
        </Link>
      </p>
    </main>
  );
}
