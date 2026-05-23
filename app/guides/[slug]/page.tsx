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
    author: { "@type": "Organization", name: "Cyprus New Developments" },
    publisher: { "@type": "Organization", name: "Cyprus New Developments" },
    datePublished: "2026-05-22",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/${g.slug}/` },
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <nav className="text-xs text-slate-500 mb-6">
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

      <aside className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-slate-700">
        This is general information, not legal or tax advice. Cyprus rules
        change frequently — verify with the relevant Cypriot government
        department and a local advisor before acting.
      </aside>

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
