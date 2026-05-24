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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c8d5dc",
};

const SITE_NAME = "RealCy.app";
const SITE_TAGLINE = "Your Cyprus Portal";

export const metadata: Metadata = {
  metadataBase: new URL("https://realcy.app"),
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
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 md:col-span-2">
          <p className="font-bold text-white text-lg">RealCy.app</p>
          <p className="mt-2 text-slate-400 leading-relaxed text-xs">
            Your portal for anything Cyprus. New-build real estate today;
            rentals, hotels, food, shopping and more coming soon.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Coming soon
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Rentals · Hotels · Food · Shopping · More
          </p>
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
        <nav aria-label="Guides">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Guides
          </p>
          <ul className="mt-3 space-y-2">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}/`}
                  className="hover:text-white transition-colors"
                >
                  {g.title.replace(/\s*\(.*\)\s*$/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            RealCy.app
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/about/"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact/"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </li>
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
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
