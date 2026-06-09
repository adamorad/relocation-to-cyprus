import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, guideBySlug, type GuideCategory } from "@/lib/guides";
import { AUTHORS, CATEGORY_AUTHOR } from "@/lib/authors";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";
import { EmailCapture } from "@/components/EmailCapture";
import { ShareBar } from "@/components/ShareBar";

const SITE_URL = "https://realcy.app";

const toId = (h: string) =>
  h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const GUIDE_CATEGORY_SECTIONS: Record<GuideCategory, string[]> = {
  immigration: ["immigration-lawyers", "expat-communities"],
  tax: ["accountants"],
  business: ["accountants", "coworking", "startup-ecosystem"],
  property: ["property-lawyers", "long-term-rentals", "property-management"],
  family: ["childcare-nurseries", "after-school-activities", "expat-communities"],
  healthcare: ["specialist-doctors", "mental-health-services"],
  transport: ["public-transport"],
  lifestyle: ["expat-communities", "fitness-wellness", "sports-clubs"],
  environment: [],
};

const GUIDE_CATEGORY_TOOLS: Record<GuideCategory, Array<{ slug: string; title: string }>> = {
  immigration: [
    { slug: "visa-pathway-finder", title: "Visa Pathway Finder" },
    { slug: "meu1-tracker", title: "MEU1 Registration Tracker" },
    { slug: "visa-renewal-reminder", title: "Visa & Document Renewal Reminder" },
  ],
  tax: [
    { slug: "tax-residency-planner", title: "60-Day Tax Residency Planner" },
    { slug: "tax-filing-calendar", title: "Annual Tax Filing Calendar" },
    { slug: "double-tax-treaty-finder", title: "Double Tax Treaty Finder" },
    { slug: "freelancer-vs-company", title: "Freelancer vs Company Calculator" },
  ],
  business: [
    { slug: "freelancer-vs-company", title: "Freelancer vs Company Calculator" },
    { slug: "grants-finder", title: "Grants & Incentives Finder" },
    { slug: "banking-fee-comparison", title: "Banking Fee Comparison" },
  ],
  property: [
    { slug: "rent-vs-buy-calculator", title: "Rent vs Buy Calculator" },
    { slug: "neighborhood-comparison", title: "Neighbourhood Comparison" },
  ],
  family: [
    { slug: "neighborhood-comparison", title: "Neighbourhood Comparison" },
    { slug: "health-insurance-comparison", title: "Health Insurance Comparison" },
  ],
  healthcare: [
    { slug: "health-insurance-comparison", title: "Health Insurance Comparison" },
    { slug: "social-insurance-calculator", title: "Social Insurance Calculator" },
  ],
  transport: [
    { slug: "flight-connectivity", title: "Flight Connectivity" },
    { slug: "neighborhood-comparison", title: "Neighbourhood Comparison" },
  ],
  lifestyle: [
    { slug: "events-calendar", title: "Annual Events & Festivals" },
    { slug: "neighborhood-comparison", title: "Neighbourhood Comparison" },
  ],
  environment: [
    { slug: "neighborhood-comparison", title: "Neighbourhood Comparison" },
  ],
};

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}/` },
    openGraph: {
      title: g.title,
      description: g.description,
      url: `${SITE_URL}/guides/${g.slug}/`,
      type: "article",
      ...(g.heroImage && {
        images: [{ url: `${SITE_URL}${g.heroImage}`, width: 1200, height: 630, alt: g.title }],
      }),
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();

  const relatedTools = GUIDE_CATEGORY_TOOLS[g.category] ?? [];
  const relatedSectionSlugs = GUIDE_CATEGORY_SECTIONS[g.category] ?? [];
  const relatedSections = relatedSectionSlugs
    .map((slug) => SECTIONS_INDEX.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const canonicalUrl = `${SITE_URL}/guides/${g.slug}/`;
  const author = AUTHORS[CATEGORY_AUTHOR[g.category]] ?? AUTHORS.team;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    author: { "@type": "Person", name: author.name, jobTitle: author.role },
    publisher: {
      "@type": "Organization",
      name: "RealCy.app",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 },
    },
    datePublished: "2026-05-22",
    dateModified: "2026-05-31",
    ...(g.heroImage && { image: `${SITE_URL}${g.heroImage}` }),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/${g.slug}/` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Map", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides/` },
      { "@type": "ListItem", position: 3, name: g.title },
    ],
  };
  const faqJsonLd =
    g.faqs && g.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: g.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: g.sections.map((s) => ({
            "@type": "Question",
            name: s.heading,
            acceptedAnswer: { "@type": "Answer", text: s.body },
          })),
        };

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10">
      <MetaPixelEvent event="ViewContent" params={{ content_name: g.title, content_category: "guide" }} />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd, faqJsonLd]),
        }}
      />
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        ›{" "}
        <Link href="/guides/" className="hover:text-slate-900">Guides</Link>{" "}
        › <span className="text-slate-900">{g.title}</span>
      </nav>

      <header>
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
          Relocation guide
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {g.title}
        </h1>
        <p className="mt-3 text-base text-slate-600">{g.description}</p>
        <p className="mt-3 text-xs text-slate-400">
          By <span className="font-semibold text-slate-600">{author.name}</span>
          {" · "}{author.role}
          {" · "}Last reviewed May 2026
        </p>
      </header>

      {g.heroImage && (
        <div className="mt-6 rounded-xl overflow-hidden">
          <img
            src={g.heroImage}
            alt={g.title}
            className="w-full aspect-[2/1] object-cover"
            loading="eager"
            fetchPriority="high"
            width={1200}
            height={630}
          />
        </div>
      )}

      <ShareBar url={canonicalUrl} title={g.title} guideSlug={g.slug} />

      {g.sections.length > 2 && (
        <nav aria-label="In this guide" className="mt-6 mb-2 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">In this guide</p>
          <ol className="space-y-1 list-decimal list-inside">
            {g.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${toId(s.heading)}`} className="text-amber-700 hover:text-amber-900 hover:underline">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <article className="mt-8 prose prose-slate max-w-none">
        {g.sections.map((s) => (
          <section key={s.heading} id={toId(s.heading)} className="mt-6">
            <h2 className="text-xl font-bold mb-2">{s.heading}</h2>
            <p className="text-slate-700 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </article>

      {relatedTools.length > 0 && (
        <aside className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <p className="text-[10px] font-semibold text-teal-800 uppercase tracking-wider mb-3">Related tools</p>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}/`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-teal-200 text-teal-700 hover:bg-teal-700 hover:text-white transition-colors"
              >
                {t.title} →
              </Link>
            ))}
          </div>
        </aside>
      )}

      {relatedSections.length > 0 && (
        <aside className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-[10px] font-semibold text-indigo-800 uppercase tracking-wider mb-3">Related directories</p>
          <div className="flex flex-wrap gap-2">
            {relatedSections.map((s) => (
              <Link
                key={s.slug}
                href={`/sections/${s.slug}/`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-colors"
              >
                {s.name} →
              </Link>
            ))}
          </div>
        </aside>
      )}

      {(g.category === "immigration" || g.category === "tax" || g.category === "property") && (
        <aside className="mt-6 p-5 bg-slate-900 rounded-xl text-white">
          <p className="text-sm font-semibold mb-1">Get the free Cyprus Relocation Checklist</p>
          <p className="text-xs text-slate-400">Week-by-week guide for your first month. Free.</p>
          <EmailCapture compact />
        </aside>
      )}

      {g.faqs && g.faqs.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
          <dl className="space-y-4">
            {g.faqs.map((faq) => (
              <details key={faq.q} className="group border border-slate-200 rounded-lg">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-semibold text-sm text-slate-900 list-none hover:bg-slate-50">
                  {faq.q}
                  <span className="ml-3 text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-sm text-slate-700 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </dl>
        </section>
      ) : null}

      <aside className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-slate-700">
        This is general information, not legal or tax advice. Cyprus rules
        change frequently — verify with the relevant Cypriot government
        department and a local advisor before acting.
      </aside>

      <p className="mt-10 text-xs text-slate-600">
        <Link href="/guides/" className="underline hover:text-slate-900">
          ← All guides
        </Link>
      </p>
    </main>
  );
}
