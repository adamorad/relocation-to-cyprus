import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#52b2cf",
};

const SITE_NAME = "Cyprus New Developments";
const SITE_TAGLINE = "Find your new build in Cyprus — interactive map by region";

export const metadata: Metadata = {
  metadataBase: new URL("https://adamorad.github.io/relocation-to-cyprus"),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Explore 260+ new-build apartments, residences, and villas across Cyprus on an interactive 3D map. Filter by region, price, bedrooms, view and developer.",
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
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Interactive 3D map of every new-build development across Cyprus, filterable by region, price and features.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Interactive 3D map of every new-build development across Cyprus.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900">{children}</body>
    </html>
  );
}
