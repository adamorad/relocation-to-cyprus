import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { REGIONS, regionBySlug } from "@/lib/regions";
import { listingsForRegion } from "@/lib/listings";

const SITE_URL = "https://adamorad.github.io/relocation-to-cyprus";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function generateStaticParams() {
  return REGIONS.map((r) => ({ name: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const r = regionBySlug(name);
  if (!r) return {};
  return {
    title: `${r.name} new developments — buy or relocate to ${r.name}, Cyprus`,
    description: r.oneLiner + " " + r.intro.slice(0, 120) + "…",
    alternates: { canonical: `/regions/${r.slug}/` },
    openGraph: {
      title: `${r.name} — Cyprus new developments`,
      description: r.oneLiner,
      url: `${SITE_URL}/regions/${r.slug}/`,
      type: "article",
    },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const r = regionBySlug(name);
  if (!r) notFound();
  const listings = listingsForRegion(r.name).slice(0, 24);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${r.name} new developments`,
    description: r.oneLiner,
    author: { "@type": "Organization", name: "Cyprus New Developments" },
    publisher: { "@type": "Organization", name: "Cyprus New Developments" },
    datePublished: "2026-05-22",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/regions/${r.slug}/` },
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        › <span className="text-slate-900">{r.name}</span>
      </nav>

      <header>
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
          Region guide
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          {r.name}, Cyprus
        </h1>
        <p className="mt-3 text-lg text-slate-700">{r.oneLiner}</p>
      </header>

      <section className="mt-8 prose prose-slate max-w-none">
        <p className="text-slate-700 leading-relaxed">{r.intro}</p>
        {r.sections.map((s) => (
          <div key={s.heading} className="mt-6">
            <h2 className="text-xl font-bold mb-2">{s.heading}</h2>
            <p className="text-slate-700 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>

      {listings.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">
            New developments in {r.name} ({listingsForRegion(r.name).length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {listings.map((l) => (
              <Link
                key={l.slug}
                href={`/listings/${l.slug}/`}
                className="block rounded-lg border border-slate-200 bg-white hover:border-slate-900 hover:shadow-md transition-all overflow-hidden"
              >
                {l.images?.[0] ? (
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      // biome-ignore lint/performance/noImgElement: static export
                      src={`${BASE}${l.images[0]}`}
                      alt={l.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="p-3">
                  <div className="font-semibold text-sm line-clamp-2">
                    {l.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {l.location ?? r.name}
                  </div>
                  <div className="text-amber-700 text-sm font-semibold mt-1.5">
                    {l.priceRange ?? "—"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
