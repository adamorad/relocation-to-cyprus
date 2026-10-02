import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { COMMUNITY_TIPS } from "@/lib/expat-communities";
import { topicCrumb } from "@/lib/topic-map";
import ExpatCommunitiesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Expat Community Groups in Cyprus";
const description =
	"Active Facebook groups, WhatsApp communities, and Meetup events by city and nationality.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/expat-communities/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/expat-communities/`,
		type: "website",
	},
};

export default function ExpatCommunitiesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: COMMUNITY_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="expat-communities"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "expat-communities"),
					{ label: "Expat Community Groups" },
				],
				eyebrow: "Community",
				title: title,
				intro:
					"Facebook groups, WhatsApp chats, Meetup events and forums for English-speaking expats across Cyprus, organised by city and platform.",
			}}
			info={COMMUNITY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Good to know"
			related={
				<MoreOnTopic type="directory" slug="expat-communities" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<ExpatCommunitiesClient />
		</DirectoryTemplate>
	);
}
