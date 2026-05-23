import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c8d5dc",
};

const SITE_NAME = "RealCy.app";
const SITE_TAGLINE = "Your Portal To Cyprus";

export const metadata: Metadata = {
  metadataBase: new URL("https://realcy.app"),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "RealCy.app — your portal to Cyprus. Browse 260+ new-build apartments and villas on an interactive map. Rentals, hotels, food and more coming soon.",
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
