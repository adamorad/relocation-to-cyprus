import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Callout } from "@/components/ui/Callout";
import {
	MENTAL_HEALTH_PROVIDERS,
	MENTAL_HEALTH_TIPS,
} from "@/lib/mental-health";
import { topicCrumb } from "@/lib/topic-map";
import MentalHealthServicesClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = `${MENTAL_HEALTH_PROVIDERS.length} Therapists, Psychologists and Psychiatrists in Cyprus`;
const description = `Directory of ${MENTAL_HEALTH_PROVIDERS.length} psychologists, psychotherapists, psychiatrists and counsellors in Limassol, Paphos and Larnaca. Filter by city and type; see languages, approaches and online availability.`;

export const metadata: Metadata = {
	title,
	description,
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
					"Psychologists, psychotherapists, psychiatrists, and counsellors across Cyprus who work in English, including those experienced with expat adjustment issues and relocation.",
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
