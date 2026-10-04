import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { GARDEN_TIPS } from "@/lib/community-gardens";
import { topicCrumb } from "@/lib/topic-map";
import CommunityGardensClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Community Gardens & Urban Farming in Cyprus";
const description =
	"Allotment schemes and urban farming initiatives: plus growing calendar tips for Cyprus's climate.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/community-gardens/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/community-gardens/`,
		type: "website",
	},
};

export default function CommunityGardensPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: GARDEN_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="community-gardens"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "community-gardens"),
					{ label: "Community Gardens" },
				],
				eyebrow: "Cyprus Community",
				title: title,
				intro:
					"An emerging scene on the island. Community gardens, allotments, urban farms and rooftop growing projects across Cyprus, with honest notes on availability and access.",
			}}
			info={GARDEN_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Good to know"
			notice={{
				tone: "info",
				content: (
					<>
						<p>
							This is a growing movement: many schemes are small, volunteer-run,
							or municipality pilots. Verify details directly before visiting.
						</p>
						<p className="mt-2">
							Community garden availability, fees, and membership status change
							frequently. Always contact the organisation directly for current
							information.
						</p>
					</>
				),
			}}
			related={
				<MoreOnTopic type="directory" slug="community-gardens" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<CommunityGardensClient />
		</DirectoryTemplate>
	);
}
