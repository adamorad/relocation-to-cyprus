import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { CookieConsentManager } from "@/components/CookieConsentManager";
import { EmailCapture } from "@/components/EmailCapture";
import { SiteHeader } from "@/components/SiteHeader";
import { GUIDES } from "@/lib/guides";
import { LISTINGS_BY_REGION } from "@/lib/listingsData";
import { NAV_REGIONS } from "@/lib/regions";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";

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

function SiteFooter() {
	const featured = NAV_REGIONS.flatMap((r) =>
		(LISTINGS_BY_REGION[r.name] ?? []).slice(0, 4),
	);
	return (
		<footer className="bg-ink text-slate-300 mt-0">
			<div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
				<div className="col-span-2 md:col-span-2">
					<p className="font-bold text-white text-lg">RealCy.app</p>
					<p className="mt-2 text-slate-400 leading-relaxed text-xs">
						Your guide to living in Cyprus: practical guides, curated
						directories, interactive tools and new-build real estate.
					</p>
					<div className="mt-4 flex flex-wrap gap-2">
						<Link
							href="/explore/"
							className="text-xs text-[#35cdc4] hover:text-white transition-colors font-semibold"
						>
							Explore all →
						</Link>
						<Link
							href="/guides/"
							className="text-xs text-slate-400 hover:text-white transition-colors"
						>
							{GUIDES.length} guides
						</Link>
						<Link
							href="/sections/"
							className="text-xs text-slate-400 hover:text-white transition-colors"
						>
							{SECTIONS_INDEX.length} directories
						</Link>
						<Link
							href="/tools/"
							className="text-xs text-slate-400 hover:text-white transition-colors"
						>
							{TOOL_COUNT} tools
						</Link>
					</div>
				</div>
				<nav aria-label="Regions">
					<p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
						Regions
					</p>
					<ul className="mt-3 space-y-2">
						{NAV_REGIONS.map((r) => (
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
					<p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
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
								<Link
									href={`/guides/${g.slug}/`}
									className="hover:text-white transition-colors"
								>
									{g.label}
								</Link>
							</li>
						))}
						<li>
							<Link
								href="/guides/"
								className="text-[#35cdc4] hover:text-white transition-colors text-xs"
							>
								All {GUIDES.length} guides →
							</Link>
						</li>
					</ul>
				</nav>
				<nav aria-label="Directories">
					<p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
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
								<Link
									href={`/sections/${s.slug}/`}
									className="hover:text-white transition-colors"
								>
									{s.label}
								</Link>
							</li>
						))}
						<li>
							<Link
								href="/sections/"
								className="text-[#35cdc4] hover:text-white transition-colors text-xs"
							>
								All {SECTIONS_INDEX.length} directories →
							</Link>
						</li>
					</ul>
				</nav>
				<nav aria-label="Tools and company">
					<p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
						Tools
					</p>
					<ul className="mt-3 space-y-2">
						{[
							{ slug: "rent-vs-buy-calculator", label: "Rent vs Buy" },
							{ slug: "tax-residency-tracker", label: "Tax Residency" },
							{ slug: "visa-pathway-finder", label: "Visa Finder" },
							{ slug: "banking-fee-comparison", label: "Banking Fees" },
						].map((t) => (
							<li key={t.slug}>
								<Link
									href={`/tools/${t.slug}/`}
									className="hover:text-white transition-colors"
								>
									{t.label}
								</Link>
							</li>
						))}
						<li>
							<Link
								href="/tools/"
								className="text-[#35cdc4] hover:text-white transition-colors text-xs"
							>
								All {TOOL_COUNT} tools →
							</Link>
						</li>
					</ul>
					<p className="mt-6 text-xs uppercase tracking-wider text-slate-400 font-semibold">
						RealCy.app
					</p>
					<ul className="mt-3 space-y-2">
						<li>
							<Link
								href="/moving-to-cyprus/"
								className="hover:text-white transition-colors"
							>
								Moving to Cyprus
							</Link>
						</li>
						<li>
							<Link
								href="/listings/"
								className="hover:text-white transition-colors"
							>
								New developments
							</Link>
						</li>
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
								href="/advertise/"
								className="hover:text-white transition-colors"
							>
								Advertise
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
								href="/explore/"
								className="hover:text-white transition-colors"
							>
								Explore
							</Link>
						</li>
						<li>
							<Link
								href="/privacy/"
								className="hover:text-white transition-colors"
							>
								Privacy
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
						<li>
							<Link
								href="/my-shortlist/"
								className="hover:text-white transition-colors"
							>
								Saved Shortlist
							</Link>
						</li>
						<li>
							<Link
								href="/developers/"
								className="hover:text-white transition-colors"
							>
								Developers
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="border-t border-white/10">
				<div className="max-w-6xl mx-auto px-6 py-6">
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
				<div className="max-w-6xl mx-auto px-6 py-6">
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
				<div className="max-w-6xl mx-auto px-6 py-4 text-xs text-slate-400">
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
