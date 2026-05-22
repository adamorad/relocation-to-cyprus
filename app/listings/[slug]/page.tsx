import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allListings, listingBySlug } from "@/lib/listings";

const SITE_URL = "https://adamorad.github.io/relocation-to-cyprus";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function generateStaticParams() {
  return allListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) return {};
  const heroImage = l.images?.[0]
    ? `${SITE_URL}${BASE}${l.images[0]}`
    : undefined;
  const desc =
    l.description?.slice(0, 160) ??
    `${l.title} — new-build development in ${l.location ?? l.regionCity}, Cyprus. ${l.priceRange ?? "Price on request"}.`;
  return {
    title: `${l.title} — ${l.location ?? l.regionCity}`,
    description: desc,
    alternates: { canonical: `/listings/${l.slug}/` },
    openGraph: {
      title: l.title,
      description: desc,
      images: heroImage ? [heroImage] : undefined,
      type: "article",
      url: `${SITE_URL}/listings/${l.slug}/`,
    },
  };
}

function priceNumber(s: string | null | undefined): number | null {
  if (!s) return null;
  const m = s.match(/€?\s*([\d.,]+)/);
  if (!m) return null;
  const n = Number(m[1].replace(/[.,]/g, ""));
  return Number.isFinite(n) && n > 1000 ? n : null;
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) notFound();

  const offers = l.offers ?? [];
  const beds = Array.from(
    new Set(
      offers
        .map((o) => Number(o.bedrooms ?? o.features?.bedrooms))
        .filter((n) => Number.isFinite(n) && n > 0),
    ),
  );
  const lowPrice = priceNumber(l.priceRange);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: l.title,
    description: l.description,
    image: (l.images ?? []).map((u) => `${SITE_URL}${BASE}${u}`),
    brand: l.developer?.name
      ? { "@type": "Organization", name: l.developer.name }
      : undefined,
    offers: lowPrice
      ? {
          "@type": "Offer",
          price: lowPrice,
          priceCurrency: "EUR",
          url: `${SITE_URL}/listings/${l.slug}/`,
          availability: "https://schema.org/InStock",
        }
      : undefined,
    additionalProperty: [
      ...(beds.length
        ? [{ "@type": "PropertyValue", name: "bedrooms", value: beds.join(", ") }]
        : []),
      ...Object.entries(l.specs ?? {}).map(([k, v]) => ({
        "@type": "PropertyValue",
        name: k,
        value: v,
      })),
    ],
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        ›{" "}
        <Link
          href={`/regions/${l.regionCity.toLowerCase().replace(/\s+/g, "-")}/`}
          className="hover:text-slate-900"
        >
          {l.regionCity}
        </Link>{" "}
        › <span className="text-slate-900">{l.title}</span>
      </nav>

      <header>
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
          {l.regionCity} · {l.location ?? ""}
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">
          {l.title}
        </h1>
        <p className="mt-3 text-lg text-slate-700">{l.priceRange ?? "—"}</p>
      </header>

      {l.images && l.images.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
          {l.images.slice(0, 6).map((src, i) => (
            <img
              // biome-ignore lint/performance/noImgElement: static export
              key={src}
              src={`${BASE}${src}`}
              alt={`${l.title} — view ${i + 1}`}
              className={
                i === 0
                  ? "w-full rounded-lg col-span-1 md:col-span-2 aspect-[16/9] object-cover"
                  : "w-full rounded-lg aspect-[4/3] object-cover"
              }
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      ) : null}

      {l.description ? (
        <section className="mt-8 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold mb-3">About this development</h2>
          <p className="whitespace-pre-line text-slate-700 leading-relaxed">
            {l.description}
          </p>
        </section>
      ) : null}

      {Object.keys(l.specs ?? {}).length > 0 ? (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-3">Specs</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {Object.entries(l.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-slate-100 py-1">
                <dt className="text-slate-500">{k}</dt>
                <dd className="text-slate-900 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {offers.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-3">Available units ({offers.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-2 pr-3">Unit</th>
                  <th className="py-2 pr-3">Beds</th>
                  <th className="py-2 pr-3">Baths</th>
                  <th className="py-2 pr-3">Living</th>
                  <th className="py-2 pr-3">Floor</th>
                  <th className="py-2 pr-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((o, idx) => {
                  const f = o.features ?? {};
                  return (
                    <tr
                      key={`${o.unit ?? o.title ?? "u"}-${idx}`}
                      className="border-b border-slate-100"
                    >
                      <td className="py-2 pr-3 font-medium">
                        {o.unit ?? o.title ?? "—"}
                      </td>
                      <td className="py-2 pr-3">
                        {String(o.bedrooms ?? f.bedrooms ?? "—")}
                      </td>
                      <td className="py-2 pr-3">
                        {String(o.bathrooms ?? f.bathrooms ?? "—")}
                      </td>
                      <td className="py-2 pr-3">
                        {String(o["living area"] ?? f.living_area ?? "—")}
                      </td>
                      <td className="py-2 pr-3">
                        {String(o.floor ?? f.floor ?? "—")}
                      </td>
                      <td className="py-2 pr-3 text-right font-semibold">
                        {o.price ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {Object.keys(l.nearby ?? {}).length > 0 ? (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-3">Nearby</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {Object.entries(l.nearby).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-slate-100 py-1">
                <dt className="text-slate-500">{k}</dt>
                <dd className="text-slate-900 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {l.developer?.name ? (
        <section className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h2 className="text-base font-semibold mb-1">Developer</h2>
          <p className="text-sm text-slate-700">{l.developer.name}</p>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              `${l.developer.name} Cyprus real estate`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs font-semibold text-amber-700 hover:text-amber-900"
          >
            Find developer ↗
          </a>
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
