import type { Metadata } from "next";
import { AreaPanel } from "@/components/home/AreaPanel";
import { GuideCards } from "@/components/home/GuideCards";
import { HomeHero } from "@/components/home/HomeHero";
import { ToolsStrip } from "@/components/home/ToolsStrip";
import { TopicGrid } from "@/components/home/TopicGrid";
import { GUIDES } from "@/lib/guides";
import { LISTINGS } from "@/lib/listingsData";

const GUIDE_COUNT = GUIDES.length;

export const metadata: Metadata = {
	title: {
		absolute: "RealCy.app: Living in Cyprus, Guides, Tools & New Builds",
	},
	description: `Practical help for life in Cyprus: pharmacies, ferries, car rental, GESY, recycling and more. Plus new-build listings, planning tools and ${GUIDE_COUNT} guides.`,
	alternates: { canonical: "/" },
};

const SITE_URL = "https://realcy.app";

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
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify([websiteJsonLd, orgJsonLd, itemList]),
				}}
			/>
			<main id="main">
				<HomeHero />
				<p className="sr-only">
					Living in Cyprus: Guides, Directories, New Developments and Tax Tools
					| RealCy.app
				</p>
				<TopicGrid />
				<div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-8 md:px-8 md:py-10 desk:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] desk:gap-6">
					<GuideCards />
					<AreaPanel />
				</div>
				<ToolsStrip />
			</main>
		</>
	);
}
