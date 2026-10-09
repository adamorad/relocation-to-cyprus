import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Callout } from "@/components/ui/Callout";
import { MENTAL_HEALTH_TIPS } from "@/lib/mental-health";
import { topicCrumb } from "@/lib/topic-map";
import MentalHealthServicesClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Mental Health Services in Cyprus: What to Know First";
const description =
	"How mental health care works in Cyprus: psychologist vs psychiatrist, online sessions, indicative costs and crisis support. Provider listings are paused while credentials are verified.";

export const metadata: Metadata = {
	title,
	description,
	robots: { index: false, follow: true },
	alternates: { canonical: "/sections/mental-health-services/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/mental-health-services/`,
		type: "website",
	},
};

export default function MentalHealthServicesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: MENTAL_HEALTH_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="mental-health-services"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "mental-health-services"),
					{ label: "Mental Health Services" },
				],
				eyebrow: "Healthcare",
				title: "Mental Health Services in Cyprus",
				intro:
					"How mental health care works in Cyprus for English speakers. Our provider listings are paused while we verify each clinician's credentials with the official registers.",
			}}
			info={MENTAL_HEALTH_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="What to know first"
			related={
				<div className="space-y-8" data-pagefind-ignore>
					<Callout tone="legal">
						{
							"This directory is general information. Always verify availability, session fees, and provider credentials directly. For medical emergencies call 112."
						}
					</Callout>
					<MoreOnTopic
						type="directory"
						slug="mental-health-services"
						cols={3}
					/>
				</div>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<MentalHealthServicesClient />
		</DirectoryTemplate>
	);
}
