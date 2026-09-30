import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import HomeHub from "@/components/HomeHub";
import { GUIDES } from "@/lib/guides";
import { LISTINGS } from "@/lib/listingsData";
import { SECTIONS_INDEX } from "@/lib/sections-index";

const GUIDE_COUNT = GUIDES.length;

export const metadata: Metadata = {
	title: {
		absolute:
			"RealCy.app: Living in Cyprus, Guides, Tools & New Builds",
	},
	description: `Practical help for life in Cyprus: pharmacies, ferries, car rental, GESY, recycling and more. Plus new-build listings, planning tools and ${GUIDE_COUNT} guides.`,
	alternates: { canonical: "/" },
};

const SITE_URL = "https://realcy.app";

const FEATURED_GUIDE_SLUGS = [
	"taxes-for-expats",
	"residency-and-visas",
	"best-areas-to-live-cyprus",
	"retiring-in-cyprus",
	"cost-of-living",
	"digital-nomad-visa-guide",
];

export default function Home() {
	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "RealCy.app",
		alternateName: "RealCy",
		url: SITE_URL,
		description:
			"Independent guide to everyday life in Cyprus: practical guides, service directories, new-build listings and planning tools.",
		publisher: { "@type": "Organization", name: "RealCy.app" },
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SITE_URL}/explore/?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
	const orgJsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "RealCy.app",
		url: SITE_URL,
		logo: `${SITE_URL}/apple-touch-icon.png`,
		description: `Independent guide to living in Cyprus: new-build real estate, 30+ service directories, 31 planning tools, and ${GUIDE_COUNT} in-depth guides.`,
		sameAs: [],
	};
	const itemList = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Cyprus new developments",
		numberOfItems: LISTINGS.length,
		itemListElement: LISTINGS.slice(0, 50).map((l, i) => ({
			"@type": "ListItem",
			position: i + 1,
			url: `${SITE_URL}/listings/${l.slug}/`,
			name: l.title,
		})),
	};
	const featuredGuides = FEATURED_GUIDE_SLUGS.map((slug) => {
		const g = GUIDES.find((g) => g.slug === slug);
		return g
			? {
					slug: g.slug,
					title: g.title,
					category: g.category,
					description: g.description,
				}
			: null;
	}).filter((g): g is NonNullable<typeof g> => g !== null);

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify([websiteJsonLd, orgJsonLd, itemList]),
				}}
			/>
			<AppShell />
			<p className="sr-only">
				Living in Cyprus: Guides, Directories, New Developments and Tax Tools |
				RealCy.app
			</p>
			<HomeHub
				totalListings={LISTINGS.length}
				totalGuides={GUIDES.length}
				totalSections={SECTIONS_INDEX.length}
				featuredGuides={featuredGuides}
			/>
		</>
	);
}
