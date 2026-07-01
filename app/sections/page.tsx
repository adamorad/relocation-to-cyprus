import type { Metadata } from "next";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import SectionsIndexClient from "./client";

const DIR_COUNT = SECTIONS_INDEX.length;
const DIR_DESC = `${DIR_COUNT} curated directories for Cyprus relocators — property lawyers, immigration specialists, accountants, coworking spaces, specialist doctors, expat communities, and more.`;

export const metadata: Metadata = {
	title: `Cyprus Relocation Directories — ${DIR_COUNT} Curated Service Guides | RealCy.app`,
	description: DIR_DESC,
	alternates: { canonical: "/sections/" },
	openGraph: {
		title: `Cyprus Relocation Directories — ${DIR_COUNT} Curated Service Guides`,
		description: DIR_DESC,
		url: "https://realcy.app/sections/",
		type: "website",
	},
};

const SITE_URL = "https://realcy.app";

export default function SectionsIndexPage() {
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
			{ "@type": "ListItem", position: 2, name: "Directories" },
		],
	};
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<SectionsIndexClient />
		</>
	);
}
