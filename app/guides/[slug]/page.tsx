import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "@/lib/guides";

const SITE_URL = "https://realcy.app";

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    author: { "@type": "Organization", name: "RealCy.app" },
    publisher: { "@type": "Organization", name: "RealCy.app" },
    datePublished: "2026-05-22",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/${g.slug}/` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Map", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides/`,
      },
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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd, faqJsonLd]),
        }}
      />
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        ›{" "}
        <Link href="/guides/" className="hover:text-slate-900">
          Guides
        </Link>{" "}
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
      </header>

      <article className="mt-8 prose prose-slate max-w-none">
        {g.sections.map((s) => (
          <section key={s.heading} className="mt-6">
            <h2 className="text-xl font-bold mb-2">{s.heading}</h2>
            <p className="text-slate-700 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </article>

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

      <aside className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-slate-700">
        This is general information, not legal or tax advice. Cyprus rules
        change frequently — verify with the relevant Cypriot government
        department and a local advisor before acting.
      </aside>

      <p className="mt-10 text-xs text-slate-600">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
