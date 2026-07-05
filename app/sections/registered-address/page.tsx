import type { Metadata } from "next";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";
import { REGISTERED_ADDRESS_TIPS } from "@/lib/registered-address";
import RegisteredAddressClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Registered Address Providers in Cyprus";
const description =
	"Registered address & virtual office providers in Cyprus — vetted services for Cyprus-incorporated companies across Limassol, Paphos & Nicosia.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/registered-address/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/registered-address/`,
		type: "website",
	},
};

export default function RegisteredAddressPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: REGISTERED_ADDRESS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
			{
				"@type": "ListItem",
				position: 2,
				name: "Directories",
				item: `${SITE_URL}/sections/`,
			},
			{ "@type": "ListItem", position: 3, name: title },
		],
	};
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]),
				}}
			/>
			<RegisteredAddressClient />
			<SectionRelatedGuides sectionSlug="registered-address" />
		</>
	);
}
