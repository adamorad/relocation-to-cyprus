import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEVELOPERS, developerBySlug, allDeveloperSlugs } from "@/lib/developers";

const SITE_URL = "https://realcy.app";

export function generateStaticParams() {
  return allDeveloperSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dev = developerBySlug(slug);
  if (!dev) return {};
  const desc =
    dev.description?.slice(0, 160) ??
    `${dev.name} — Cyprus property developer with ${dev.listings.length} new-build projects.`;
  return {
    title: `${dev.name} — Cyprus New Developments`,
    description: desc,
    alternates: { canonical: `/developers/${dev.slug}/` },
    openGraph: {
      title: `${dev.name} — Cyprus New Developments`,
      description: desc,
      url: `${SITE_URL}/developers/${dev.slug}/`,
      type: "website",
    },
  };
}

export default async function DeveloperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dev = developerBySlug(slug);
  if (!dev) notFound();

  const regions = Array.from(
    new Set(dev.listings.map((l) => l.regionCity)),
  ).sort();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Developers",
        item: `${SITE_URL}/developers/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dev.name,
        item: `${SITE_URL}/developers/${dev.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
        <nav className="text-xs text-slate-600 mb-6">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>{" "}
          ›{" "}
          <Link href="/developers/" className="hover:text-slate-900">
            Developers
          </Link>{" "}
          › <span>{dev.name}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            {dev.logo ? (
              // biome-ignore lint/performance/noImgElement: static export
              <img
                src={dev.logo}
                alt={`${dev.name} logo`}
                className="h-16 w-16 rounded-lg object-contain bg-slate-50 border border-slate-200 shrink-0"
              />
            ) : null}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold mb-1">
                Property developer
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                {dev.name}
              </h1>
            </div>
          </div>

          {dev.description ? (
            <p className="text-slate-700 leading-relaxed mt-3">
              {dev.description}
            </p>
          ) : null}
        </header>

        {regions.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-3">
              Active regions
            </h2>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <span
                  key={r}
                  className="text-sm bg-slate-100 text-slate-700 rounded-lg px-3 py-1"
                >
                  {r}
                </span>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Projects ({dev.listings.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dev.listings.map((l) => (
              <Link
                key={l.slug}
                href={`/listings/${l.slug}/`}
                className="block rounded-xl border border-slate-200 bg-white hover:border-slate-900 hover:shadow-md transition-all overflow-hidden"
              >
                {l.images?.[0] ? (
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    {/* biome-ignore lint/performance/noImgElement: static export */}
                    <img
                      src={l.images[0]}
                      alt={l.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="p-3">
                  <div className="font-semibold text-sm text-slate-900 line-clamp-2">
                    {l.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {l.location ?? l.regionCity}
                  </div>
                  <div className="text-amber-700 text-sm font-semibold mt-1.5">
                    {l.priceRange ?? "—"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Next steps
          </p>
          <p className="text-sm text-slate-600 mb-4">
            Browse all developers or explore listings by region.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/developers/"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
            >
              All developers
            </Link>
            <Link
              href="/listings/"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
            >
              Browse all listings
            </Link>
          </div>
        </aside>

        <aside className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs text-amber-800">
            <strong>Disclaimer:</strong> Developer information and project
            details are sourced from publicly available listings. Always verify
            directly with the developer before making any purchase decisions.
          </p>
        </aside>

        <div className="mt-6">
          <Link href="/developers/" className="underline hover:text-slate-900">
            ← Back to Developers
          </Link>
        </div>
      </main>
    </>
  );
}
