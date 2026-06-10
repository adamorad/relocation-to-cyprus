import type { Metadata } from "next";
import Link from "next/link";
import { DEVELOPERS } from "@/lib/developers";

const SITE_URL = "https://realcy.app";

export const metadata: Metadata = {
  title: "Cyprus Property Developers — New Build Projects | RealCy.app",
  description:
    "Browse all 62 property developers active in Cyprus. View their new-build projects, regions, and pricing across Paphos, Limassol, Larnaca, and more.",
  alternates: { canonical: "/developers/" },
  openGraph: {
    title: "Cyprus Property Developers — New Build Projects | RealCy.app",
    description:
      "Browse all 62 property developers active in Cyprus. View their new-build projects, regions, and pricing across Paphos, Limassol, Larnaca, and more.",
    url: `${SITE_URL}/developers/`,
    type: "website",
  },
};

export default function DevelopersIndexPage() {
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
          › <span>Developers</span>
        </nav>

        <header className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold mb-2">
            Property developers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Cyprus Developers
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            {DEVELOPERS.length} developers behind{" "}
            {DEVELOPERS.reduce((n, d) => n + d.listings.length, 0)} new-build
            projects across Cyprus.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEVELOPERS.map((dev) => {
            const regions = Array.from(
              new Set(dev.listings.map((l) => l.regionCity)),
            ).sort();
            return (
              <Link
                key={dev.slug}
                href={`/developers/${dev.slug}/`}
                className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-900 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {dev.logo ? (
                    // biome-ignore lint/performance/noImgElement: static export
                    <img
                      src={dev.logo}
                      alt={`${dev.name} logo`}
                      className="h-10 w-10 rounded object-contain bg-slate-50 border border-slate-100 shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded bg-slate-100 shrink-0 flex items-center justify-center text-slate-400 text-xs font-bold">
                      {dev.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-slate-900 line-clamp-2 leading-tight">
                      {dev.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {dev.listings.length}{" "}
                      {dev.listings.length === 1 ? "project" : "projects"}
                    </div>
                  </div>
                </div>
                {regions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {regions.map((r) => (
                      <span
                        key={r}
                        className="text-[10px] bg-slate-100 text-slate-600 rounded px-2 py-0.5"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-10">
          <Link href="/tools/" className="underline hover:text-slate-900">
            ← Back to Tools
          </Link>
        </div>
      </main>
    </>
  );
}
