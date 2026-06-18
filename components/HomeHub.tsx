"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Globe, Home, TrendingUp, Users } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";

const TOOL_COUNT = 33;

type FeaturedGuide = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

type HomeHubProps = {
  totalListings: number;
  totalGuides: number;
  totalSections: number;
  featuredGuides: FeaturedGuide[];
};

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let rafId: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, target, duration]);
  return count;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const CATEGORY_COLOR: Record<string, string> = {
  tax: "text-[#C4733A]",
  immigration: "text-[#35cdc4]",
  property: "text-[#C4733A]",
  business: "text-[#C4733A]",
  lifestyle: "text-[#35cdc4]",
  healthcare: "text-[#35cdc4]",
};

const TASK_TILES = [
  {
    num: "01",
    heading: "Visas & registration",
    description: "EU, Digital Nomad, or Permanent Residency",
    Icon: Globe,
    href: "/tools/visa-pathway-finder/",
  },
  {
    num: "02",
    heading: "Find a property",
    description: "Compare renting vs buying and browse 260+ new builds",
    Icon: Home,
    href: "/tools/rent-vs-buy-calculator/",
  },
  {
    num: "03",
    heading: "Tax & finances",
    description: "Calculate your savings under the Cyprus Non-Dom regime",
    Icon: TrendingUp,
    href: "/tools/tax-savings-calculator/",
  },
  {
    num: "04",
    heading: "Schools & healthcare",
    description: "Find international schools and register with GeSY",
    Icon: Users,
    href: "/tools/school-finder/",
  },
];

const FEATURED_TOOLS = [
  {
    name: "Tax Savings Calculator",
    description: "Compare your current tax liability against Cyprus Non-Dom",
    tag: "Tax",
    href: "/tools/tax-savings-calculator/",
  },
  {
    name: "Relocation Cost Estimator",
    description: "Full itemised moving budget",
    tag: "Finance",
    href: "/tools/relocation-cost-estimator/",
  },
  {
    name: "Social Insurance Calculator",
    description: "2025 SI and GeSY rates",
    tag: "Finance",
    href: "/tools/social-insurance-calculator/",
  },
  {
    name: "Visa Pathway Finder",
    description: "Your recommended visa route",
    tag: "Visas",
    href: "/tools/visa-pathway-finder/",
  },
  {
    name: "GeSY Registration Guide",
    description: "Step-by-step healthcare",
    tag: "Healthcare",
    href: "/tools/gesy-registration/",
  },
  {
    name: "Monthly Budget Builder",
    description: "Costs by city and lifestyle",
    tag: "Finance",
    href: "/tools/budget-builder/",
  },
];

const CITIES = [
  {
    name: "Limassol",
    href: "/regions/limassol/",
    gradient: "from-[#0F3552] via-[#1A5E7A] to-[#2A9E9A]",
    pill: "From €1,100/mo",
    sub: "Business hub · Seafront",
  },
  {
    name: "Paphos",
    href: "/regions/paphos/",
    gradient: "from-[#4A1E3C] via-[#7A3E50] to-[#B4623A]",
    pill: "From €700/mo",
    sub: "Old town · Quieter pace",
  },
  {
    name: "Larnaca",
    href: "/regions/larnaca/",
    gradient: "from-[#0F3D28] via-[#1C6644] to-[#3EA87A]",
    pill: "From €750/mo",
    sub: "Airport · Affordable",
  },
  {
    name: "Ayia Napa",
    href: "/regions/ayia-napa/",
    gradient: "from-[#8C3A10] via-[#C4682A] to-[#E8A832]",
    pill: "From €900/mo",
    sub: "Beach · Summer season",
  },
];

export default function HomeHub({ totalListings, totalGuides, totalSections, featuredGuides }: HomeHubProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const { ref: taskRef, visible: taskVisible } = useInView();
  const { ref: toolsRef, visible: toolsVisible } = useInView();

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStatsTriggered(true); observer.disconnect(); }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const listingsCount = useCountUp(totalListings, 1600, statsTriggered);
  const toolsCount    = useCountUp(TOOL_COUNT,    1400, statsTriggered);
  const guidesCount   = useCountUp(totalGuides,   1500, statsTriggered);
  const dirsCount     = useCountUp(totalSections, 1300, statsTriggered);

  return (
    <div>

      {/* ── Section 1: Stats ─────────────────────────────────────── */}
      <section ref={statsRef} className="bg-[#1C1917] py-12 md:py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-0">

            {/* Dominant stat */}
            <div className="md:w-1/2 md:border-r md:border-white/10 md:pr-14">
              <p className="font-[family-name:var(--font-lora)] leading-none tabular-nums
                            text-[clamp(72px,14vw,140px)] font-semibold text-white">
                {listingsCount}<span className="text-[#35cdc4]">+</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-3">
                New builds listed
              </p>
            </div>

            {/* Three smaller stats */}
            <div className="md:w-1/2 md:pl-14 mt-8 md:mt-0 grid grid-cols-3 md:grid-cols-1 gap-6 md:gap-7">
              {[
                { count: toolsCount,  label: "Planning tools" },
                { count: guidesCount, label: "Relocation guides" },
                { count: dirsCount,   label: "Service directories" },
              ].map(({ count, label }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-lora)] text-4xl md:text-5xl font-semibold text-white tabular-nums leading-none">
                    {count}<span className="text-[#35cdc4]">+</span>
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-2">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Task Entry ─────────────────────────────────── */}
      <section className="hub-warm pt-14 pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#C4733A] font-semibold">
                Where to start
              </p>
              <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-lora)] text-[#1C1917] mt-1.5">
                Find what you need
              </h2>
            </div>
          </div>

          {/* Numbered editorial rows */}
          <div ref={taskRef} className={`divide-y divide-[#E8E2D9] ${taskVisible ? "stagger-visible" : ""}`}>
            {TASK_TILES.map(({ num, heading, description, Icon, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-6 py-5 -mx-6 px-6 hover:bg-[#F0EAE0] transition-colors"
              >
                <span aria-hidden="true" className="font-[family-name:var(--font-lora)] text-3xl font-medium text-[#D4C9BC] w-10 flex-shrink-0 tabular-nums leading-none group-hover:text-[#C4733A] transition-colors">
                  {num}
                </span>
                <Icon className="w-4 h-4 text-slate-400 flex-shrink-0 hidden sm:block" />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-[#1C1917] group-hover:text-[#1C1917]">
                    {heading}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">{description}</p>
                </div>
                <span className="text-xs font-semibold text-[#35cdc4] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Featured Tools ─────────────────────────────── */}
      <section className="hub-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400 font-semibold">
                Most used
              </p>
              <h2 className="text-xl md:text-2xl font-[family-name:var(--font-lora)] text-[#1C1917] mt-1">
                Calculators &amp; planners
              </h2>
            </div>
            <Link href="/tools/" className="text-xs font-semibold text-[#35cdc4] hover:underline flex-shrink-0 ml-4">
              All {TOOL_COUNT} tools →
            </Link>
          </div>

          <div ref={toolsRef} className={`flex flex-col gap-3 ${toolsVisible ? "stagger-visible" : ""}`}>
            {/* Featured wide banner */}
            <Link
              href={FEATURED_TOOLS[0].href}
              className="group flex items-center justify-between gap-6 border border-[#E8E2D9] rounded-xl p-6 hover:border-[#35cdc4] hover:shadow-sm transition-all bg-white"
            >
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#C4733A] border border-[#E8E2D9] px-2 py-0.5 rounded-full">
                  {FEATURED_TOOLS[0].tag}
                </span>
                <p className="font-[family-name:var(--font-lora)] text-xl text-[#1C1917] mt-2.5 group-hover:text-[#35cdc4] transition-colors">
                  {FEATURED_TOOLS[0].name}
                </p>
                <p className="text-sm text-slate-500 mt-1">{FEATURED_TOOLS[0].description}</p>
              </div>
              <span className="text-sm font-semibold text-[#35cdc4] flex-shrink-0">Try it →</span>
            </Link>

            {/* Compact 5-tool strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {FEATURED_TOOLS.slice(1).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group border border-[#E8E2D9] border-l-4 border-l-[#C4733A] rounded-xl p-4 hover:border-[#35cdc4] hover:shadow-sm transition-all bg-[#FAF7F2] flex flex-col gap-2"
                >
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    {tool.tag}
                  </span>
                  <p className="text-xs font-semibold text-[#1C1917] leading-snug group-hover:text-[#35cdc4] transition-colors">
                    {tool.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: City Cards ─────────────────────────────────── */}
      <section className="hub-warm py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400 font-semibold">Cities</p>
            <h2 className="text-xl md:text-2xl font-[family-name:var(--font-lora)] text-[#1C1917] mt-1">
              Choose your city
            </h2>
            <p className="text-sm text-[#8C7E70] mt-1.5">
              Four very different moves — pick the one that fits your life.
            </p>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CITIES.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-b ${city.gradient} flex flex-col justify-between p-5 aspect-[3/4]`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E\")" }}
                />
                <span className="self-end text-[10px] font-semibold text-white/90 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full relative z-10">
                  {city.pill}
                </span>
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-white">
                    {city.name}
                  </p>
                  <p className="text-xs text-white/65 mt-0.5">{city.sub}</p>
                  <p className="text-xs font-semibold text-white/75 mt-3 group-hover:text-white transition-colors">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile scroll */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-2 -mx-6 px-6 sm:hidden">
            {CITIES.map((city) => (
              <Link
                key={`m-${city.href}`}
                href={city.href}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-b ${city.gradient} flex flex-col justify-between p-5 snap-start flex-shrink-0 w-[68vw] aspect-[3/4]`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E\")" }}
                />
                <span className="self-end text-[10px] font-semibold text-white/90 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full relative z-10">
                  {city.pill}
                </span>
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-white">{city.name}</p>
                  <p className="text-xs text-white/65 mt-0.5">{city.sub}</p>
                  <p className="text-xs font-semibold text-white/75 mt-3">Explore →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Guides ─────────────────────────────────────── */}
      <section className="hub-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400 font-semibold">
                Essential reading
              </p>
              <h2 className="text-xl md:text-2xl font-[family-name:var(--font-lora)] text-[#1C1917] mt-1">
                From the guides
              </h2>
            </div>
            <Link href="/guides/" className="text-xs font-semibold text-[#35cdc4] hover:underline flex-shrink-0 ml-4">
              All {totalGuides} guides →
            </Link>
          </div>

          {/* Magazine split: featured left + list right */}
          <div className="grid md:grid-cols-[5fr_7fr] gap-6 md:gap-8">
            {/* Featured guide */}
            {featuredGuides[0] && (
              <Link
                href={`/guides/${featuredGuides[0].slug}/`}
                className="group bg-[#FAF7F2] border border-[#E8E2D9] rounded-xl p-7 flex flex-col justify-between min-h-[280px] hover:border-[#35cdc4] transition-colors"
              >
                <div>
                  <p className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${CATEGORY_COLOR[featuredGuides[0].category] ?? "text-slate-500"}`}>
                    {featuredGuides[0].category}
                  </p>
                  <p className="font-[family-name:var(--font-lora)] text-xl font-medium text-[#1C1917] mt-3 leading-snug group-hover:text-[#35cdc4] transition-colors">
                    {featuredGuides[0].title}
                  </p>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-3">
                    {featuredGuides[0].description}
                  </p>
                </div>
                <p className="text-xs font-semibold text-[#35cdc4] mt-6">Read the guide →</p>
              </Link>
            )}

            {/* Remaining 5 guides as rows */}
            <div className="divide-y divide-[#E8E2D9]">
              {featuredGuides.slice(1).map((guide) => {
                if (!guide) return null;
                return (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}/`}
                    className="group flex items-start justify-between gap-4 py-4 hover:bg-[#FAF7F2] -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="min-w-0">
                      <p className={`text-[9px] uppercase tracking-[0.18em] font-semibold ${CATEGORY_COLOR[guide.category] ?? "text-slate-500"}`}>
                        {guide.category}
                      </p>
                      <p className="text-sm font-[family-name:var(--font-lora)] font-medium text-[#1C1917] mt-1 leading-snug group-hover:text-[#35cdc4] transition-colors line-clamp-2">
                        {guide.title}
                      </p>
                    </div>
                    <span className="text-[#35cdc4] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Email Capture ──────────────────────────────── */}
      <section className="bg-[#1C1917] py-14">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#35cdc4] font-semibold">
              Monthly update
            </p>
            <h2 className="font-[family-name:var(--font-lora)] text-2xl md:text-3xl font-medium text-white mt-2 leading-snug">
              Get the monthly Cyprus relocation update
            </h2>
            <p className="text-sm text-white/50 mt-3 leading-relaxed">
              One email per month. New guides, regulatory changes, and tool updates for
              people planning a Cyprus move.
            </p>
          </div>
          <div className="bg-white/8 border border-white/10 rounded-xl p-6">
            <EmailCapture source="homepage" />
          </div>
        </div>
      </section>

      {/* ── Advertise strip ──────────────────────────────────────── */}
      <section className="bg-[#1C1917] py-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#35cdc4] font-semibold">
            Work with us
          </p>
          <p className="text-lg md:text-xl font-medium text-white max-w-xl leading-snug" style={{ fontFamily: "var(--font-lora)" }}>
            Reach people actively planning a Cyprus move
          </p>
          <p className="text-sm text-white/50 max-w-md">
            Featured listings, guide sponsorship, and newsletter placement — for law firms, accountants, and healthcare providers.
          </p>
          <Link
            href="/advertise/"
            className="mt-1 inline-block px-6 py-2.5 rounded-lg bg-[#35cdc4] text-slate-900 text-sm font-semibold hover:bg-teal-300 transition-colors"
          >
            See advertising options →
          </Link>
        </div>
      </section>

      {/* ── Section 7: Search CTA ─────────────────────────────────── */}
      <section className="hub-warm py-10 border-t border-[#E8E2D9]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[#1C1917]">Can't find what you're looking for?</p>
            <p className="text-sm text-[#8C7E70] mt-0.5">Search across guides, tools, and directories.</p>
          </div>
          <Link
            href="/explore/"
            className="inline-flex items-center gap-2 bg-[#35cdc4] hover:bg-[#2ab8af] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            Search everything →
          </Link>
        </div>
      </section>

    </div>
  );
}
