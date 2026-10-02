import type { Metadata } from "next";
import { AreaPanel } from "@/components/home/AreaPanel";
import { GuideCards } from "@/components/home/GuideCards";
import { HomeHero } from "@/components/home/HomeHero";
import { ToolsStrip } from "@/components/home/ToolsStrip";
import { TopicGrid } from "@/components/home/TopicGrid";
import { GUIDES } from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";

const GUIDE_COUNT = GUIDES.length;
const DIRECTORY_COUNT = SECTIONS_INDEX.length;
const TOOL_COUNT = TOOLS.length;

export const metadata: Metadata = {
	title: {
		absolute: "RealCy.app: Everyday life in Cyprus, made easier",
	},
	description: `Practical help for life in Cyprus: pharmacies, ferries, car rental, GESY, recycling and more, with ${GUIDE_COUNT} guides, ${DIRECTORY_COUNT} local directories and ${TOOL_COUNT} tools.`,
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
			"Independent guide to everyday life in Cyprus: practical guides, local directories and planning tools.",
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
		description: `Independent guide to everyday life in Cyprus: ${GUIDE_COUNT} guides, ${DIRECTORY_COUNT} local directories and ${TOOL_COUNT} planning tools.`,
		sameAs: [],
	};
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify([websiteJsonLd, orgJsonLd]),
				}}
			/>
			<main id="main">
				<HomeHero />
				<TopicGrid />
				<div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-8 md:px-8 md:py-10 desk:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] desk:items-stretch desk:gap-6">
					<GuideCards />
					<AreaPanel />
				</div>
				<ToolsStrip />
			</main>
		</>
	);
}
