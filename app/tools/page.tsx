import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyprus Relocation Tools — RealCy.app",
  description:
    "Free interactive tools for Cyprus relocators: rent vs buy calculator, visa pathway finder, tax residency planner, social insurance calculator, banking fee comparison, and more.",
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
  {
    href: "/tools/rent-vs-buy-calculator/",
    title: "Rent vs Buy Calculator",
    description:
      "Compare the true total cost of renting versus buying in Cyprus over your time horizon, accounting for mortgage payments, property appreciation, and the opportunity cost of your down payment.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/neighborhood-comparison/",
    title: "Neighbourhood Comparison",
    description:
      "Side-by-side comparison of Limassol, Paphos, Larnaca, Nicosia, and Ayia Napa across 10 metrics including rent, property prices, schools, nightlife, and cost of living.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
  {
    href: "/tools/meu1-tracker/",
    title: "MEU1 Registration Tracker",
    description:
      "An interactive step-by-step checklist for EU citizens registering their residence in Cyprus. Track your progress through all required documents and appointments.",
    tag: "Bureaucracy",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    href: "/tools/visa-pathway-finder/",
    title: "Visa Pathway Finder",
    description:
      "Answer two questions to find your recommended Cyprus visa or registration route. Covers EU citizens, Digital Nomad Visa, Permanent Residency by Investment, work permits, and more.",
    tag: "Visas",
    tagColor: "bg-green-100 text-green-800",
  },
  {
    href: "/tools/tax-residency-planner/",
    title: "Cyprus 60-Day Tax Residency Planner",
    description:
      "Check whether you qualify for Cyprus tax residency under the 183-day rule or the 60-day rule. See which conditions pass or fail in real time.",
    tag: "Tax",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    href: "/tools/social-insurance-calculator/",
    title: "Cyprus Social Insurance Calculator",
    description:
      "Calculate your Social Insurance and GeSY contributions based on 2025 rates. Full breakdown for employed and self-employed, including employer contributions.",
    tag: "Social Insurance",
    tagColor: "bg-teal-100 text-teal-800",
  },
  {
    href: "/tools/banking-fee-comparison/",
    title: "Cyprus Banking Fee Comparison",
    description:
      "Compare fees and features across Bank of Cyprus, Hellenic Bank, AstroBank, Revolut, and Wise. Highlights the best value in each category.",
    tag: "Banking",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/tax-filing-calendar/",
    title: "Cyprus Annual Tax Filing Calendar",
    description:
      "All key Cyprus tax deadlines in a monthly view. Colour-coded by urgency. Filter by individual or company. Current month highlighted.",
    tag: "Tax",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    href: "/tools/double-tax-treaty-finder/",
    title: "Double Tax Treaty Finder",
    description:
      "Check whether Cyprus has a tax treaty with your home country and what it means for your income, dividends, interest, and capital gains.",
    tag: "Tax",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    href: "/tools/freelancer-vs-company/",
    title: "Freelancer vs Company Calculator",
    description:
      "Compare operating as a self-employed freelancer versus a Cyprus limited company on take-home pay, tax obligations, and administrative burden.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/grants-finder/",
    title: "Cyprus Grants & Incentives Finder",
    description:
      "Find available grants, subsidies, and incentives for businesses, startups, and individuals relocating or investing in Cyprus.",
    tag: "Business",
    tagColor: "bg-orange-100 text-orange-800",
  },
  {
    href: "/tools/health-insurance-comparison/",
    title: "Cyprus Health Insurance Comparison",
    description:
      "Compare private health insurance plans in Cyprus by coverage, premium, deductible, and network. Understand what GeSY covers versus what requires top-up insurance.",
    tag: "Healthcare",
    tagColor: "bg-red-100 text-red-800",
  },
  {
    href: "/tools/flight-connectivity/",
    title: "Cyprus Flight Connectivity",
    description:
      "Explore 40+ direct routes from Larnaca (LCA) and Paphos (PFO) airports. Search by destination, filter by airport and season. See airlines, flight times, and frequency at a glance.",
    tag: "Travel",
    tagColor: "bg-sky-100 text-sky-800",
  },
  {
    href: "/tools/events-calendar/",
    title: "Cyprus Annual Events & Festivals",
    description:
      "30+ annual festivals and cultural events across Cyprus in a 12-month calendar. Filter by type (carnival, wine, music, religious) or city. Highlights: Limassol Carnival, Kataklysmos, and Wine Festival.",
    tag: "Lifestyle",
    tagColor: "bg-rose-100 text-rose-800",
  },
  {
    href: "/tools/isp-comparison/",
    title: "Internet & Mobile Provider Comparison",
    description:
      "Compare home broadband (Cyta, Epic, Primetel, Cablenet) and mobile carriers on speed, price, contract terms, eSIM, and city coverage.",
    tag: "Connectivity",
    tagColor: "bg-teal-100 text-teal-800",
  },
  {
    href: "/tools/visa-renewal-reminder/",
    title: "Visa & Document Renewal Reminder",
    description:
      "Track expiry dates for your ARC, passport, visa, health insurance, and driving licence. Colour-coded alerts at 30 and 90 days. Stores data in your browser — nothing sent to a server.",
    tag: "Visas",
    tagColor: "bg-green-100 text-green-800",
  },
  {
    href: "/tools/mortgage-calculator/",
    title: "Mortgage Calculator",
    description:
      "Calculate monthly payments, total interest, and an amortization schedule for a Cyprus property purchase. Covers standard LTV limits for residents and non-residents.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/budget-builder/",
    title: "Monthly Budget Builder",
    description:
      "Estimate your monthly living costs in Cyprus by city, household size, and lifestyle. Covers rent, groceries, dining, transport, utilities, and entertainment.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
{
    href: "/tools/country-comparison/",
    title: "Country Comparison",
    description:
      "Compare Cyprus against Portugal, Malta, Greece, Spain and Italy across corporate tax, income tax, special regimes, property prices, cost of living, and visa options.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
  {
    href: "/tools/rental-yield-calculator/",
    title: "Rental Yield Calculator",
    description:
      "Calculate gross yield, net yield, annual cash flow, and total return for a Cyprus buy-to-let investment. Includes appreciation and expense modelling over up to 15 years.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/relocation-tracker/",
    title: "Relocation Progress Tracker",
    description:
      "A 32-task checklist covering pre-move planning, arrival week, month one, and settling in. Persistent progress saved in your browser.",
    tag: "Checklists",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    href: "/tools/development-comparison/",
    title: "Development Comparison",
    description:
      "Select up to 3 Cyprus new-build developments and compare them side by side on price, location, specs, developer, and available bedrooms.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
  {
    href: "/tools/price-benchmarker/",
    title: "Property Price Benchmarker",
    description:
      "See how a property's asking price compares to other developments in the same Cyprus city — based on real listings data.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
  {
    href: "/tools/tax-savings-calculator/",
    title: "Cyprus Tax Savings Calculator",
    description:
      "Compare your current country's income tax burden against Cyprus Standard and Non-Dom regimes. Enter your income, employment type, and country to see your estimated annual tax saving at a glance.",
    tag: "Tax",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    href: "/tools/relocation-cost-estimator/",
    title: "Relocation Cost Estimator",
    description:
      "Calculate your one-time moving costs to Cyprus — flights, shipping containers, car import, pet fees, rental deposits, furnishing, and legal fees. Get a full itemised breakdown with low/midpoint/high ranges and a 10% contingency buffer.",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/tools/ltd-setup-calculator/",
    title: "Cyprus Ltd Setup Cost Calculator",
    description:
      "Estimate the one-time registration costs and annual running costs of a Cyprus limited company based on your specific situation — directors, residency, turnover, VAT, and business type.",
    tag: "Business",
    tagColor: "bg-orange-100 text-orange-800",
  },
  {
    href: "/tools/neighbourhood-explorer/",
    title: "Neighbourhood Explorer",
    description:
      "Explore and compare neighbourhoods across Cyprus cities. Filter by vibe, beach access, expat density, schools, and value for money to find your ideal area.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
  {
    href: "/tools/weather-climate/",
    title: "Cyprus Weather & Climate",
    description:
      "Explore Cyprus weather month by month — temperatures, sea warmth, rain days, and UV index. Compare Cyprus climate against London, Amsterdam, Berlin, New York, Toronto, and more.",
    tag: "Lifestyle",
    tagColor: "bg-rose-100 text-rose-800",
  },
  {
    href: "/tools/school-finder/",
    title: "International School Finder",
    description:
      "Find and compare international schools in Cyprus. Filter by city, curriculum (British, IB, German, French, Waldorf, Montessori), and age group to shortlist the right options for your family.",
    tag: "Family",
    tagColor: "bg-pink-100 text-pink-800",
  },
  {
    href: "/tools/pet-import-checklist/",
    title: "Cyprus Pet Import Checklist",
    description:
      "Generate a personalised checklist for importing your dog, cat, bird, or other pet into Cyprus. Covers microchipping, rabies titre tests, health certificates, and arrival procedures based on your pet type and country of origin.",
    tag: "Lifestyle",
    tagColor: "bg-rose-100 text-rose-800",
  },
  {
    href: "/tools/drivers-licence-exchange/",
    title: "Driver's Licence Exchange",
    description:
      "Find out if you can directly exchange your foreign driving licence in Cyprus or whether you need to take theory and practical tests. Includes costs, required documents, and step-by-step guidance.",
    tag: "Bureaucracy",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    href: "/tools/gesy-registration/",
    title: "GeSY Registration Guide",
    description:
      "Step-by-step wizard for registering with Cyprus's General Healthcare System (GeSY). Covers prerequisites, online and in-person registration options, GP selection, co-payments table, family registration, and an interactive contribution calculator with all 2025 employment-status rates.",
    tag: "Healthcare",
    tagColor: "bg-red-100 text-red-800",
  },
  {
    href: "/tools/rental-price-trends/",
    title: "Cyprus Rental Price Trends",
    description:
      "Track how apartment rents have changed across Limassol, Paphos, Larnaca, and Ayia Napa since 2021. Interactive SVG line chart for 1BR, 2BR, and 3BR units with city toggles, hover tooltips, and year-on-year comparison table.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-800",
  },
];

const SITE_URL = "https://realcy.app";

export default function ToolsIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
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
    </>
  );
}
