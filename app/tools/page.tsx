import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyprus Relocation Tools — RealCy.app",
  description:
    "Interactive tools for planning your move to Cyprus: rent vs buy calculator, city comparison, MEU1 registration tracker, and visa pathway finder.",
  alternates: { canonical: "/tools/" },
};

const TOOLS = [
  {
    href: "/tools/rent-vs-buy-calculator",
    title: "Rent vs Buy Calculator",
    description:
      "Compare the true total cost of renting versus buying in Cyprus over your time horizon, accounting for mortgage payments, property appreciation, and the opportunity cost of your down payment.",
    tag: "Finance",
  },
  {
    href: "/tools/neighborhood-comparison",
    title: "Neighborhood Comparison",
    description:
      "Side-by-side comparison of Limassol, Paphos, Larnaca, Nicosia, and Ayia Napa across 10 metrics including rent, property prices, schools, nightlife, and cost of living.",
    tag: "Research",
  },
  {
    href: "/tools/meu1-tracker",
    title: "MEU1 Registration Tracker",
    description:
      "An interactive step-by-step checklist for EU citizens registering their residence in Cyprus. Track your progress through all required documents and appointments.",
    tag: "Bureaucracy",
  },
  {
    href: "/tools/visa-pathway-finder",
    title: "Visa Pathway Finder",
    description:
      "Answer two questions to find your recommended Cyprus visa or registration route. Covers EU citizens, Digital Nomad Visa, Permanent Residency by Investment, work permits, and more.",
    tag: "Visas",
  },
];

export default function ToolsPage() {
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
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Plan your move.
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Free tools to help you make better decisions about relocating to
          Cyprus — from financial modelling to visa navigation.
        </p>
      </header>

      <ul className="space-y-4">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-[#35cdc4] hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                      {tool.tag}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-[#35cdc4] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <span className="text-slate-300 group-hover:text-[#35cdc4] text-xl mt-0.5 transition-colors shrink-0">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs text-slate-600">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
