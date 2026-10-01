import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { CO_LIVING_TIPS } from "@/lib/co-living";
import { topicCrumb } from "@/lib/topic-map";
import CoLivingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Co-Living & Serviced Apartments in Cyprus";
const description =
	"Month-to-month co-living options for digital nomads and new arrivals.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/co-living/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/co-living/`,
		type: "website",
	},
};

export default function CoLivingPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: CO_LIVING_TIPS.map((t) => ({
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
					topicCrumb("directory", "co-living"),
					{ label: "Co-Living" },
				],
				eyebrow: "Co-Living",
				title: title,
				intro:
					"Month-to-month furnished spaces with utilities and WiFi included, for digital nomads, relocators, and professionals who want flexibility before committing to a long-term lease.",
			}}
			info={CO_LIVING_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Co-living vs renting"
			related={<MoreOnTopic type="directory" slug="co-living" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<CoLivingClient />
		</DirectoryTemplate>
	);
}
