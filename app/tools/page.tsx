import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyprus Relocation Tools — RealCy.app",
  description:
    "Free interactive tools for Cyprus relocators: tax residency planner, social insurance calculator, banking fee comparison, and tax filing calendar.",
  alternates: { canonical: "/tools/" },
};

const TOOLS = [
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
];

export default function ToolsIndexPage() {
  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        › <span className="text-slate-900">Tools</span>
      </nav>

      <header className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Interactive Tools
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
          Cyprus Relocation Tools
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Free, interactive calculators and planners for the most common questions
          when relocating to Cyprus.
        </p>
      </header>

      <div className="grid gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 ${tool.tagColor}`}
                >
                  {tool.tag}
                </span>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {tool.title}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-slate-300 group-hover:text-teal-400 transition-colors text-xl mt-1">
                →
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
          Cyprus Tax Department, Social Insurance Services, and a local accountant
          before making decisions.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
