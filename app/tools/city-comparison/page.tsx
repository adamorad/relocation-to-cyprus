import type { Metadata } from "next";
import CityComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus City Comparison Tool";
const description =
	"Compare all 5 Cyprus cities side by side — rent, property prices, international schools, beach access, expat community, and more.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/city-comparison/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/city-comparison/`,
		type: "website",
	},
};

export default function CityComparisonPage() {
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
			{
				"@type": "ListItem",
				position: 2,
				name: "Tools",
				item: `${SITE_URL}/tools/`,
			},
			{ "@type": "ListItem", position: 3, name: title },
		],
	};
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CityComparisonClient />
		</>
	);
}
