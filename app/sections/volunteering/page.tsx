import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { topicCrumb } from "@/lib/topic-map";
import { VOLUNTEER_TIPS } from "@/lib/volunteering";
import VolunteeringClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Volunteering in Cyprus";
const description =
	"NGOs, animal shelters, environmental groups, and community orgs welcoming expat volunteers.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/volunteering/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/volunteering/`,
		type: "website",
	},
};

export default function VolunteeringPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: VOLUNTEER_TIPS.map((t) => ({
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
					topicCrumb("directory", "volunteering"),
					{ label: "Volunteering Opportunities" },
				],
				eyebrow: "Community",
				title: "Volunteering in Cyprus",
				intro:
					"Opportunities for expats to give back: animal welfare, environment, children, refugees, arts, and more. Filter by city and focus area.",
			}}
			info={VOLUNTEER_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			related={<MoreOnTopic type="directory" slug="volunteering" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<VolunteeringClient />
		</DirectoryTemplate>
	);
}
