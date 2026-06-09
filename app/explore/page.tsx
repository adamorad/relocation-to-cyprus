"use client";

import Link from "next/link";
import { useState } from "react";
import { GUIDES, GUIDE_CATEGORY_LABEL } from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";

type ToolEntry = { name: string; slug: string; tag: string; description: string };

const TOOLS_LIST: ToolEntry[] = [
  { name: "Rent vs Buy Calculator", slug: "rent-vs-buy-calculator", tag: "Finance", description: "Compare renting vs buying in Cyprus over your time horizon." },
  { name: "Neighbourhood Comparison", slug: "neighborhood-comparison", tag: "Research", description: "Side-by-side comparison of all five cities across 10 metrics." },
  { name: "MEU1 Registration Tracker", slug: "meu1-tracker", tag: "Bureaucracy", description: "Interactive checklist for EU citizens registering residence in Cyprus." },
  { name: "Visa Pathway Finder", slug: "visa-pathway-finder", tag: "Visas", description: "Find your recommended Cyprus visa or registration route." },
  { name: "60-Day Tax Residency Planner", slug: "tax-residency-planner", tag: "Tax", description: "Check whether you qualify for Cyprus tax residency." },
  { name: "Social Insurance Calculator", slug: "social-insurance-calculator", tag: "Tax", description: "Calculate social insurance and GeSY contributions." },
  { name: "Banking Fee Comparison", slug: "banking-fee-comparison", tag: "Banking", description: "Compare fees across Cypriot banks and neo-banks." },
  { name: "Tax Filing Calendar", slug: "tax-filing-calendar", tag: "Tax", description: "All key Cyprus tax deadlines in a monthly calendar view." },
  { name: "Double Tax Treaty Finder", slug: "double-tax-treaty-finder", tag: "Tax", description: "Check Cyprus tax treaties with 65+ countries." },
  { name: "Freelancer vs Company", slug: "freelancer-vs-company", tag: "Finance", description: "Compare sole trader vs Cyprus Ltd on take-home pay." },
  { name: "Grants & Incentives Finder", slug: "grants-finder", tag: "Business", description: "Find available grants and subsidies for Cyprus businesses." },
  { name: "Health Insurance Comparison", slug: "health-insurance-comparison", tag: "Healthcare", description: "Compare private health insurance plans available in Cyprus." },
  { name: "Flight Connectivity", slug: "flight-connectivity", tag: "Travel", description: "Direct routes from Larnaca and Paphos airports." },
  { name: "Events & Festivals Calendar", slug: "events-calendar", tag: "Lifestyle", description: "30+ annual festivals across Cyprus in a 12-month calendar." },
  { name: "ISP & Mobile Comparison", slug: "isp-comparison", tag: "Connectivity", description: "Compare broadband and mobile carriers by speed and price." },
  { name: "Visa Renewal Reminder", slug: "visa-renewal-reminder", tag: "Visas", description: "Track expiry dates for ARC, passport, visa, and driving licence." },
];

type SectionItem = { name: string; href: string };
type Category = { title: string; items: SectionItem[] };

const CATEGORIES: Category[] = [
  {
    title: "Property & Housing",
    items: [
      { name: "Long-Term Rentals", href: "/sections/long-term-rentals/" },
      { name: "Co-Living", href: "/sections/co-living/" },
      { name: "Property Management", href: "/sections/property-management/" },
    ],
  },
  {
    title: "Legal & Professional",
    items: [
      { name: "Property Lawyers", href: "/sections/property-lawyers/" },
      { name: "Immigration Lawyers", href: "/sections/immigration-lawyers/" },
      { name: "Accountants", href: "/sections/accountants/" },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Startup Ecosystem", href: "/sections/startup-ecosystem/" },
      { name: "Registered Address", href: "/sections/registered-address/" },
      { name: "Coworking", href: "/sections/coworking/" },
    ],
  },
  {
    title: "Family & Education",
    items: [
      { name: "Childcare & Nurseries", href: "/sections/childcare-nurseries/" },
      { name: "After-School Activities", href: "/sections/after-school-activities/" },
      { name: "Summer Camps", href: "/sections/summer-camps/" },
    ],
  },
  {
    title: "Healthcare",
    items: [
      { name: "Specialist Doctors", href: "/sections/specialist-doctors/" },
      { name: "Mental Health Services", href: "/sections/mental-health-services/" },
      { name: "Veterinary Services", href: "/sections/veterinary-services/" },
    ],
  },
  {
    title: "Active Living",
    items: [
      { name: "Fitness & Wellness", href: "/sections/fitness-wellness/" },
      { name: "Sports Clubs", href: "/sections/sports-clubs/" },
      { name: "EV Charging", href: "/sections/ev-charging/" },
    ],
  },
  {
    title: "Getting Around",
    items: [{ name: "Public Transport", href: "/sections/public-transport/" }],
  },
  {
    title: "Community",
    items: [
      { name: "Expat Communities", href: "/sections/expat-communities/" },
      { name: "Religious Services", href: "/sections/religious-services/" },
      { name: "Volunteering", href: "/sections/volunteering/" },
    ],
  },
  {
    title: "Arts & Culture",
    items: [
      { name: "Art & Culture", href: "/sections/art-culture/" },
      { name: "Wineries", href: "/sections/wineries/" },
    ],
  },
  {
    title: "Food & Drink",
    items: [
      { name: "Farmers Markets", href: "/sections/farmers-markets/" },
      { name: "International Grocery", href: "/sections/international-grocery/" },
      { name: "Halal & Kosher", href: "/sections/halal-kosher/" },
      { name: "Rooftop Bars", href: "/sections/rooftop-bars/" },
    ],
  },
  {
    title: "Environment",
    items: [{ name: "Community Gardens", href: "/sections/community-gardens/" }],
  },
  {
    title: "Guides",
    items: [{ name: "All Relocation Guides", href: "/guides/" }],
  },
  {
    title: "Interactive Tools",
    items: [{ name: "All Relocation Tools", href: "/tools/" }],
  },
];

type SearchResult =
  | { kind: "guide"; title: string; slug: string; category: string; description: string }
  | { kind: "tool"; name: string; slug: string; tag: string; description: string }
  | { kind: "section"; name: string; slug: string; category: string; description: string };

export default function ExplorePage() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const results: SearchResult[] = q.length < 2 ? [] : [
    ...GUIDES
      .filter((g) => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.slug.includes(q))
      .map((g): SearchResult => ({
        kind: "guide",
        title: g.title,
        slug: g.slug,
        category: GUIDE_CATEGORY_LABEL[g.category],
        description: g.description,
      })),
    ...TOOLS_LIST
      .filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q))
      .map((t): SearchResult => ({ kind: "tool", ...t })),
    ...SECTIONS_INDEX
      .filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
      .map((s): SearchResult => ({ kind: "section", ...s })),
  ];

  const guideResults = results.filter((r) => r.kind === "guide") as Extract<SearchResult, { kind: "guide" }>[];
  const toolResults = results.filter((r) => r.kind === "tool") as Extract<SearchResult, { kind: "tool" }>[];
  const sectionResults = results.filter((r) => r.kind === "section") as Extract<SearchResult, { kind: "section" }>[];

  return (
    <main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        &rsaquo; <span className="text-slate-900">Explore</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Site Directory
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Explore RealCy.app
        </h1>
        <p className="mt-3 text-slate-700 leading-relaxed">
          Everything you need to plan your move to Cyprus — organised by category.
        </p>
      </header>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24" aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, tools, sections…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#35cdc4] focus:border-transparent"
            aria-label="Search all content"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-lg leading-none"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      {q.length >= 2 ? (
        results.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-slate-500 text-sm">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-slate-400 text-xs mt-1">Try a different term, or browse by category below.</p>
            <button type="button" onClick={() => setQuery("")} className="mt-4 text-xs text-[#35cdc4] underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-8 mb-10">
            {guideResults.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Guides ({guideResults.length})
                </h2>
                <ul className="space-y-2">
                  {guideResults.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/guides/${r.slug}/`} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:border-[#35cdc4] hover:shadow-sm transition-all group">
                        <span className="flex-shrink-0 inline-block text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 mt-0.5">{r.category}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">{r.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{r.description}</p>
                        </div>
                        <span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {toolResults.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Tools ({toolResults.length})
                </h2>
                <ul className="space-y-2">
                  {toolResults.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/tools/${r.slug}/`} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:border-[#35cdc4] hover:shadow-sm transition-all group">
                        <span className="flex-shrink-0 inline-block text-[10px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5 mt-0.5">{r.tag}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">{r.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{r.description}</p>
                        </div>
                        <span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {sectionResults.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Directories ({sectionResults.length})
                </h2>
                <ul className="space-y-2">
                  {sectionResults.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/sections/${r.slug}/`} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:border-[#35cdc4] hover:shadow-sm transition-all group">
                        <span className="flex-shrink-0 inline-block text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 mt-0.5">{r.category}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">{r.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{r.description}</p>
                        </div>
                        <span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <button type="button" onClick={() => setQuery("")} className="text-xs text-slate-400 underline hover:text-slate-700">
              Clear search — browse by category
            </button>
          </div>
        )
      ) : (
        /* Category grid — shown when no search query */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-white border border-slate-200 rounded-xl p-5"
            >
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                {category.title}
              </h2>
              <ul className="space-y-1.5">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-700 hover:text-[#35cdc4] transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="text-slate-300 group-hover:text-[#35cdc4] transition-colors text-xs">
                        →
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          &larr; Back to the map
        </Link>
      </p>
    </main>
  );
}
