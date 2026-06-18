import type { Metadata } from "next";
import Link from "next/link";
import AppShell from "@/components/AppShell";

const SITE_URL = "https://realcy.app";
const title = "Advertise on RealCy.app — Reach People Relocating to Cyprus";
const description =
  "Reach a targeted audience of people actively planning a move to Cyprus. Featured directory listings, guide sponsorship, and newsletter placement for law firms, accountants, healthcare providers, and other professional services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/advertise/" },
  openGraph: { title, description, url: `${SITE_URL}/advertise/`, type: "website" },
};

const TIERS = [
  {
    name: "Featured Listing",
    price: "From €80/month",
    ideal: "Property lawyers, immigration specialists, accountants, insurance brokers",
    description:
      "Your firm appears at the top of the relevant service directory — highlighted with a Featured badge, your logo, an extended description, and a direct link to your website. Standard listings have no badge and lower visibility.",
    includes: [
      "Priority placement in your category",
      "Logo and extended description",
      "Direct link to your website",
      "Monthly click report",
    ],
  },
  {
    name: "Guide Sponsorship",
    price: "From €200/month",
    ideal: "Law firms, accountants, health insurance providers, banks",
    description:
      "Exclusive sponsorship of a single guide — one sponsor per guide. Your firm appears at the top of the guide with logo and tagline, seen by readers who are actively researching the exact topic your service covers.",
    includes: [
      "Exclusive placement (one sponsor per guide)",
      "Logo and tagline above the guide body",
      "Monthly reader count report",
      "Right of first renewal",
    ],
  },
  {
    name: "Newsletter Sponsorship",
    price: "From €300/send",
    ideal: "Professional services, property developers, financial advisors",
    description:
      "One sponsor per monthly email. Placement includes a short paragraph, logo, and link — sent to subscribers who have explicitly opted in to Cyprus relocation updates.",
    includes: [
      "Exclusive placement per issue",
      "Logo, short copy, and link",
      "Subscriber count disclosed before booking",
      "Plain-text and HTML variants",
    ],
  },
];

const STATS = [
  { value: "40,000+", label: "People reached by our Meta campaign" },
  { value: "IL · UK · DE · FR", label: "Primary audience countries" },
  { value: "70+", label: "Guides and planning tools" },
  { value: "30+", label: "Service directories" },
];

export default function AdvertisePage() {
  return (
    <>
      <AppShell />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero */}
        <section className="bg-[#1C1917] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#35cdc4] font-semibold mb-3">
              Advertise with RealCy
            </p>
            <h1
              className="text-3xl md:text-4xl font-medium text-white leading-tight"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Reach people actively planning a move to Cyprus
            </h1>
            <p className="text-sm text-white/60 mt-4 leading-relaxed max-w-xl mx-auto">
              RealCy.app is an independent portal for Cyprus relocation — guides, tools, and service
              directories used by people researching immigration, property, tax, and healthcare
              before they move.
            </p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-b border-[#EBE8E3] bg-white">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-2xl font-semibold text-[#1C1917]"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C4733A] font-semibold mb-2">
              Why this audience
            </p>
            <h2
              className="text-2xl font-medium text-[#1C1917]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              High intent. Nowhere else to go.
            </h2>
            <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
              <p>
                People relocating to Cyprus need a property lawyer, an accountant, a healthcare
                provider, and a bank — typically within the first three months of arriving. They are
                actively searching, they have money to spend, and they have no existing local
                relationships to lean on.
              </p>
              <p>
                RealCy.app is where they do that research. The guides on property law, tax, GeSY
                registration, and visas are written for exactly the moment when someone is deciding
                which firms to contact. A featured listing in the right directory is a direct
                introduction at the right time.
              </p>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-14 bg-white border-t border-[#EBE8E3]">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-2">
              Placement options
            </p>
            <h2
              className="text-2xl font-medium text-[#1C1917]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Three ways to be visible
            </h2>

            <div className="mt-8 space-y-6">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.name}
                  className="border border-[#EBE8E3] rounded-xl p-6 bg-[#FAFAF8]"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-base font-semibold text-[#1C1917]">{tier.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{tier.ideal}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#35cdc4] whitespace-nowrap">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">{tier.description}</p>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {tier.includes.map((item) => (
                      <li key={item} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <span className="text-[#35cdc4] mt-0.5">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-[#1C1917]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="text-2xl font-medium text-white"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Get in touch
            </h2>
            <p className="text-sm text-white/60 mt-3 max-w-md mx-auto leading-relaxed">
              Send us a short note about your firm and the placement you have in mind. We will share
              current traffic numbers for the relevant directory or guide and confirm availability.
            </p>
            <a
              href="mailto:hello@realcy.app"
              className="inline-block mt-6 px-7 py-3 rounded-lg bg-[#35cdc4] text-slate-900 text-sm font-semibold hover:bg-teal-300 transition-colors"
            >
              hello@realcy.app
            </a>
            <p className="text-[10px] text-white/30 mt-4">
              We typically respond within one business day.
            </p>
          </div>
        </section>

        {/* Footer nav */}
        <div className="py-8 border-t border-[#EBE8E3] bg-[#FAFAF8]">
          <div className="max-w-3xl mx-auto px-6 flex gap-6 text-xs text-slate-400">
            <Link href="/" className="hover:text-[#35cdc4] transition-colors">
              Home
            </Link>
            <Link href="/guides/" className="hover:text-[#35cdc4] transition-colors">
              Guides
            </Link>
            <Link href="/tools/" className="hover:text-[#35cdc4] transition-colors">
              Tools
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
