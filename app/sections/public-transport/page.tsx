import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { TRANSPORT_TIPS } from "@/lib/public-transport";
import { topicCrumb } from "@/lib/topic-map";
import PublicTransportClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Getting Around Cyprus: Public Transport Guide";
const description =
	"Bus routes, Bolt availability, taxi apps, and monthly pass costs by city.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/public-transport/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/public-transport/`,
		type: "website",
	},
};

export default function PublicTransportPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: TRANSPORT_TIPS.map((t) => ({
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
					topicCrumb("directory", "public-transport"),
					{ label: "Public Transport" },
				],
				eyebrow: "Getting Around",
				title: "Getting Around Cyprus: Public Transport Guide",
				intro:
					"What buses, taxis, and ride-hailing actually look like city by city. The honest answer: Cyprus is a car-first country, but the intercity network is better than most people expect.",
			}}
			info={TRANSPORT_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know before you arrive"
			related={
				<MoreOnTopic type="directory" slug="public-transport" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<PublicTransportClient />
		</DirectoryTemplate>
	);
}
