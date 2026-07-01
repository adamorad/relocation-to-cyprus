import type { Metadata } from "next";
import RelocationTrackerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Relocation Progress Tracker — 32-Task Checklist";
const description =
	"Track your relocation journey from planning to settling in. Persistent checklist saved in your browser. Four phases: pre-move planning, arrival week, month one, and settling in.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/relocation-checklist/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/relocation-checklist/`,
		type: "website",
	},
};

export default function RelocationChecklistPage() {
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
			<RelocationTrackerClient />
		</>
	);
}
