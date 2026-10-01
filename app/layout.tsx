import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { CookieConsentManager } from "@/components/CookieConsentManager";
import { EmailCapture } from "@/components/EmailCapture";
import { SiteHeader } from "@/components/SiteHeader";
import { GUIDES } from "@/lib/guides";
import { LISTINGS_BY_REGION } from "@/lib/listingsData";
import { REGIONS } from "@/lib/regions";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";
import { hubHref, TOPICS } from "@/lib/topics";

const TOOL_COUNT = TOOLS.length;
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

const FOOTER_SITE_LINKS: ReadonlyArray<{ label: string; href: string }> = [
	{ label: "Guides", href: "/guides/" },
	{ label: "Tools", href: "/tools/" },
	{ label: "Local directories", href: "/sections/" },
	{ label: "New developments", href: "/listings/" },
	{ label: "About", href: "/about/" },
	{ label: "Advertise", href: "/advertise/" },
	{ label: "Contact", href: "/contact/" },
	{ label: "Privacy", href: "/privacy/" },
	{ label: "Sitemap", href: "/sitemap.xml" },
];

const FOOTER_HEADING =
	"text-xs uppercase tracking-wider text-slate-400 font-semibold";
const FOOTER_LINK = "hover:text-white transition-colors";

function SiteFooter() {
	const featured = REGIONS.flatMap((r) =>
		(LISTINGS_BY_REGION[r.name] ?? []).slice(0, 4),
	);
	return (
		<footer data-pagefind-ignore className="bg-ink text-slate-300 mt-0">
			<div className="mx-auto max-w-[1280px] px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
				<div className="col-span-2 md:col-span-2">
					<p className="font-bold text-white text-lg">RealCy.app</p>
					<p className="mt-2 text-slate-400 leading-relaxed text-xs">
						Your guide to living in Cyprus: practical guides, curated
						directories, interactive tools and new-build real estate.
					</p>
					<p className="mt-4 text-xs text-slate-400">
						{GUIDE_COUNT} guides · {SECTIONS_INDEX.length} directories ·{" "}
						{TOOL_COUNT} tools
					</p>
				</div>
				<nav aria-label="Topics">
					<p className={FOOTER_HEADING}>Topics</p>
					<ul className="mt-3 space-y-2">
						{TOPICS.map((t) => (
							<li key={t.slug}>
								<Link href={hubHref(t)} className={FOOTER_LINK}>
									{t.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<nav aria-label="Cities">
					<p className={FOOTER_HEADING}>Cities</p>
					<ul className="mt-3 space-y-2">
						{REGIONS.map((r) => (
							<li key={r.slug}>
								<Link href={`/regions/${r.slug}/`} className={FOOTER_LINK}>
									{r.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<nav aria-label="Site">
					<p className={FOOTER_HEADING}>Site</p>
					<ul className="mt-3 space-y-2">
						{FOOTER_SITE_LINKS.map((l) => (
							<li key={l.href}>
								<Link href={l.href} className={FOOTER_LINK}>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="border-t border-white/10">
				<div className="mx-auto max-w-[1280px] px-5 md:px-8 py-6">
					<p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
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
										<span className="text-slate-400"> · {l.regionCity}</span>
									) : null}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="border-t border-white/10">
				<div className="mx-auto max-w-[1280px] px-5 md:px-8 py-6">
					<p className="text-sm font-semibold text-white mb-1">
						Get the free Cyprus Relocation Checklist
					</p>
					<p className="text-xs text-slate-400 mb-3">
						Week-by-week guide for your first month in Cyprus.
					</p>
					<EmailCapture compact />
				</div>
			</div>
			<div className="border-t border-white/10">
				<div className="mx-auto max-w-[1280px] px-5 md:px-8 py-4 text-xs text-slate-400">
					© {new Date().getFullYear()} RealCy.app, independent guide to living
					in Cyprus.
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
