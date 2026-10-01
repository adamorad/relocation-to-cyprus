import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { RENTAL_TIPS } from "@/lib/long-term-rentals";
import { topicCrumb } from "@/lib/topic-map";
import LongTermRentalsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Long-Term Rentals in Cyprus";
const description =
	"Long-term rentals in Cyprus for relocators: verified apartments, villas & studios across Limassol, Paphos & Larnaca. Honest city-by-city pricing.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/long-term-rentals/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/long-term-rentals/`,
		type: "website",
	},
};

export default function LongTermRentalsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: RENTAL_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "long-term-rentals"),
					{ label: "Long-Term Rentals" },
				],
				eyebrow: "Long-Term Rentals",
				title: title,
				intro:
					"Monthly furnished and unfurnished rentals across all four cities, from city-centre studios to seafront villas. Real areas, real price ranges, and links to the main Cypriot rental portals.",
			}}
			info={RENTAL_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you search"
			related={
				<MoreOnTopic type="directory" slug="long-term-rentals" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<LongTermRentalsClient />
		</DirectoryTemplate>
	);
}
