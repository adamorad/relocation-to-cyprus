import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { RENT_SAMPLED_LABEL, RENT_SOURCES } from "@/lib/facts/rents";
import { RENTAL_TIPS } from "@/lib/long-term-rentals";
import { topicCrumb } from "@/lib/topic-map";
import LongTermRentalsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Long-Term Rentals in Cyprus";
const description =
	"Long-term rentals in Cyprus for relocators: apartments, villas and studios by area across Limassol, Paphos, Larnaca and Ayia Napa, with district asking rents from Bazaraki listings.";

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
				intro: `Monthly furnished and unfurnished rentals across all four cities, from city-centre studios to seafront villas, with links to the main Cypriot rental portals. Apartment price ranges show the middle half of district asking rents on Bazaraki, sampled ${RENT_SAMPLED_LABEL}; agreed rents are often lower. Villas, townhouses and studios were not sampled.`,
			}}
			info={RENTAL_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you search"
			related={
				<>
					<SourcesNote lastChecked="2026-10-02" sources={[...RENT_SOURCES]} />
					<div className="mt-12">
						<MoreOnTopic type="directory" slug="long-term-rentals" cols={3} />
					</div>
				</>
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
