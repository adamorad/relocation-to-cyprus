import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { CookieConsentManager } from "@/components/CookieConsentManager";
import { EmailCapture } from "@/components/EmailCapture";
import { SiteHeader } from "@/components/SiteHeader";
import { GUIDES } from "@/lib/guides";
import { NEWSLETTER_ENABLED } from "@/lib/newsletter";
import { REGIONS } from "@/lib/regions";
import { hubHref, TOPICS } from "@/lib/topics";

const GUIDE_COUNT = GUIDES.length;
import "./globals.css";

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	display: "swap",
	weight: ["500", "600", "700", "800"],
});

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
	themeColor: "#ffffff",
};

const SITE_NAME = "RealCy.app";
const SITE_TAGLINE = "Living in Cyprus: Guides, Directories & New Builds";

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
	description: `Practical help for life in Cyprus: guides, 30+ service directories, ${GUIDE_COUNT} in-depth guides, planning tools and new-build listings.`,
	keywords: [
		"Cyprus real estate",
		"Cyprus new developments",
		"Cyprus apartments for sale",
		"Cyprus villas",
		"Paphos apartments",
		"Limassol new builds",
		"Larnaca real estate",
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
		description: `Your guide to living in Cyprus: practical guides, 30+ service directories, planning tools, and new-build real estate.`,
		images: [
			{
				url: "https://realcy.app/og-default.webp",
				width: 1200,
				height: 630,
				alt: "RealCy.app: Living in Cyprus",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${SITE_NAME} - ${SITE_TAGLINE}`,
		description: `Your guide to living in Cyprus: practical guides, 30+ service directories, planning tools, and new-build real estate.`,
		images: ["https://realcy.app/og-default.webp"],
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

/** Everyday browsing; property sits last, outside the main frame (Phase 4). */
const FOOTER_EXPLORE_LINKS: ReadonlyArray<{ label: string; href: string }> = [
	{ label: "All guides", href: "/guides/" },
	{ label: "Local directories", href: "/sections/" },
	{ label: "Practical tools", href: "/tools/" },
	{ label: "Search", href: "/explore/" },
	{ label: "New developments", href: "/listings/" },
];

/** Small print row: who we are and the legal pages. */
const FOOTER_SITE_LINKS: ReadonlyArray<{ label: string; href: string }> = [
	{ label: "About", href: "/about/" },
	{ label: "Advertise", href: "/advertise/" },
	{ label: "Contact", href: "/contact/" },
	{ label: "Privacy", href: "/privacy/" },
	{ label: "Sitemap", href: "/sitemap.xml" },
];

const FOOTER_HEADING =
	"text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold";
const FOOTER_LINK =
	"inline-flex min-h-8 items-center rounded hover:text-white transition-colors";

function FooterLinkList({
	links,
}: {
	links: ReadonlyArray<{ label: string; href: string }>;
}) {
	return (
		<ul className="mt-3 space-y-0.5">
			{links.map((l) => (
				<li key={l.href}>
					<Link href={l.href} className={FOOTER_LINK}>
						{l.label}
					</Link>
				</li>
			))}
		</ul>
	);
}

const CITY_NAMES = REGIONS.map((r) => r.name);
const CITY_LIST = `${CITY_NAMES.slice(0, -1).join(", ")} and ${CITY_NAMES.at(-1)}`;

function SiteFooter() {
	return (
		<footer data-pagefind-ignore className="bg-ink text-slate-300 mt-0">
			<div className="mx-auto max-w-[1280px] px-5 md:px-8 py-12 md:py-16 grid gap-10 md:grid-cols-12 md:gap-8 text-sm">
				<div className="md:col-span-5 lg:col-span-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2.5 rounded text-white"
					>
						{/* biome-ignore lint/performance/noImgElement: static export, tiny decorative SVG */}
						<img
							src="/brand/logo-mark.svg"
							alt=""
							width={32}
							height={32}
							className="h-8 w-8"
						/>
						<span className="text-xl leading-none tracking-tight">
							<span className="font-extrabold">RealCy</span>
							<span className="font-medium">.app</span>
						</span>
					</Link>
					<p className="mt-4 max-w-sm text-slate-300 leading-relaxed">
						Everyday life in Cyprus, made easier. Practical guides, local
						directories and tools for {CITY_LIST}.
					</p>
					{NEWSLETTER_ENABLED ? (
						<div className="mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5">
							<p className="font-semibold text-white">New to Cyprus?</p>
							<p className="mt-1 mb-4 text-slate-400">
								Get the free week-by-week checklist for your first month.
							</p>
							<EmailCapture compact source="footer" />
						</div>
					) : null}
				</div>
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-7 lg:col-start-6">
					<nav aria-label="Topics" className="col-span-2 sm:col-span-1">
						<p className={FOOTER_HEADING}>Topics</p>
						<FooterLinkList
							links={TOPICS.map((t) => ({ label: t.name, href: hubHref(t) }))}
						/>
					</nav>
					<nav aria-label="Cities">
						<p className={FOOTER_HEADING}>Cities</p>
						<FooterLinkList
							links={[
								...REGIONS.map((r) => ({
									label: r.name,
									href: `/regions/${r.slug}/`,
								})),
								{ label: "All cities", href: "/regions/" },
							]}
						/>
					</nav>
					<nav aria-label="Explore">
						<p className={FOOTER_HEADING}>Explore</p>
						<FooterLinkList links={FOOTER_EXPLORE_LINKS} />
					</nav>
				</div>
			</div>
			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
					<p>
						© {new Date().getFullYear()} RealCy.app. An independent guide, not
						legal, tax or medical advice.
					</p>
					<nav aria-label="Site">
						<ul className="flex flex-wrap gap-x-5 gap-y-1">
							{FOOTER_SITE_LINKS.map((l) => (
								<li key={l.href}>
									{l.href.endsWith(".xml") ? (
										// Plain link: next/link would prefetch /sitemap.xml as a route (404).
										<a href={l.href} className={FOOTER_LINK}>
											{l.label}
										</a>
									) : (
										<Link href={l.href} className={FOOTER_LINK}>
											{l.label}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>
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
		<html lang="en" className={manrope.variable}>
			<body className="antialiased text-ink font-[family-name:var(--font-manrope)]">
				<a href="#main" className="skip-to-content">
					Skip to content
				</a>
				<SiteHeader />
				{children}
				<SiteFooter />
				<CookieConsentManager gaId={GA_ID} pixelId={META_PIXEL_ID} />
			</body>
		</html>
	);
}
