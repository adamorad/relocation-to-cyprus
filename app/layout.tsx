import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { REGIONS } from "@/lib/regions";
import { GUIDES } from "@/lib/guides";
import { LISTINGS_BY_REGION } from "@/lib/listingsData";
import "./globals.css";

// Google Analytics 4 — measurement ID. Set via NEXT_PUBLIC_GA_ID at build
// time so we can swap it without code changes; falls back to "" which
// silently no-ops the tag.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

// Meta Pixel — set via NEXT_PUBLIC_META_PIXEL_ID at build time.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c8d5dc",
};

const SITE_NAME = "RealCy.app";
const SITE_TAGLINE = "Cyprus New Developments & Relocation Guide";

export const metadata: Metadata = {
  metadataBase: new URL("https://realcy.app"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "RealCy.app — your portal for anything Cyprus. Browse new-build apartments and villas on an interactive map. Rentals, hotels, food, shopping and more coming soon.",
  keywords: [
    "Cyprus real estate",
    "Cyprus new developments",
    "Cyprus apartments for sale",
    "Cyprus villas",
    "Paphos apartments",
    "Limassol new builds",
    "Larnaca real estate",
    "Nicosia property",
    "Ayia Napa apartments",
    "relocate to Cyprus",
    "Cyprus residency real estate",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description:
      "Your portal to Cyprus. New-build real estate today; rentals, hotels, food and more coming soon.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description:
      "Your portal to Cyprus. New-build real estate today; rentals, hotels, food and more coming soon.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function SiteFooter() {
  const featured = REGIONS.flatMap((r) =>
    (LISTINGS_BY_REGION[r.name] ?? []).slice(0, 4),
  );
  return (
    <footer className="bg-slate-900 text-slate-300 mt-0">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
        <div className="col-span-2 md:col-span-2">
          <p className="font-bold text-white text-lg">RealCy.app</p>
          <p className="mt-2 text-slate-400 leading-relaxed text-xs">
            Your portal for anything Cyprus — new-build real estate, relocation
            guides, curated directories, and interactive tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/explore/" className="text-xs text-[#35cdc4] hover:text-white transition-colors font-semibold">
              Explore all →
            </Link>
            <Link href="/guides/" className="text-xs text-slate-400 hover:text-white transition-colors">
              63 guides
            </Link>
            <Link href="/sections/" className="text-xs text-slate-400 hover:text-white transition-colors">
              28 directories
            </Link>
            <Link href="/tools/" className="text-xs text-slate-400 hover:text-white transition-colors">
              16 tools
            </Link>
          </div>
        </div>
        <nav aria-label="Regions">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Regions
          </p>
          <ul className="mt-3 space-y-2">
            {REGIONS.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/regions/${r.slug}/`}
                  className="hover:text-white transition-colors"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Popular guides">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Guides
          </p>
          <ul className="mt-3 space-y-2">
            {[
              { slug: "residency-and-visas", label: "Residency & Visas" },
              { slug: "taxes-for-expats", label: "Taxes for Expats" },
              { slug: "cost-of-living", label: "Cost of Living" },
              { slug: "arrival-checklist", label: "First Month Checklist" },
              { slug: "banking-in-cyprus", label: "Banking in Cyprus" },
              { slug: "gesy-registration-guide", label: "GeSY Registration" },
            ].map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}/`} className="hover:text-white transition-colors">
                  {g.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides/" className="text-[#35cdc4] hover:text-white transition-colors text-xs">
                All 63 guides →
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Directories">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Directories
          </p>
          <ul className="mt-3 space-y-2">
            {[
              { slug: "property-lawyers", label: "Property Lawyers" },
              { slug: "immigration-lawyers", label: "Immigration Lawyers" },
              { slug: "accountants", label: "Accountants" },
              { slug: "specialist-doctors", label: "Specialist Doctors" },
              { slug: "coworking", label: "Coworking Spaces" },
              { slug: "expat-communities", label: "Expat Communities" },
            ].map((s) => (
              <li key={s.slug}>
                <Link href={`/sections/${s.slug}`} className="hover:text-white transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sections/" className="text-[#35cdc4] hover:text-white transition-colors text-xs">
                All 28 directories →
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Tools and company">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Tools
          </p>
          <ul className="mt-3 space-y-2">
            {[
              { slug: "rent-vs-buy-calculator", label: "Rent vs Buy" },
              { slug: "tax-residency-planner", label: "Tax Residency" },
              { slug: "visa-pathway-finder", label: "Visa Finder" },
              { slug: "banking-fee-comparison", label: "Banking Fees" },
            ].map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="hover:text-white transition-colors">
                  {t.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tools/" className="text-[#35cdc4] hover:text-white transition-colors text-xs">
                All 16 tools →
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            RealCy.app
          </p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/about/" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact/" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/explore/" className="hover:text-white transition-colors">Explore</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Featured developments
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
            {featured.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/listings/${l.slug}/`}
                  className="hover:text-white transition-colors"
                >
                  {l.title}
                  {l.regionCity ? (
                    <span className="text-slate-600"> · {l.regionCity}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} RealCy.app — your portal for anything
          Cyprus.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        {children}
        <SiteFooter />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
        {META_PIXEL_ID ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
