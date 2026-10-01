import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ACTIVITY_TIPS } from "@/lib/after-school";
import { topicCrumb } from "@/lib/topic-map";
import AfterSchoolActivitiesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "After-School Activities for Children in Cyprus";
const description =
	"Sports clubs, music academies, language classes, and arts programs for children aged 4–18.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/after-school-activities/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/after-school-activities/`,
		type: "website",
	},
};

export default function AfterSchoolActivitiesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: ACTIVITY_TIPS.map((t) => ({
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
					topicCrumb("directory", "after-school-activities"),
					{ label: "After-School Activities" },
				],
				eyebrow: "Family & Children",
				title: title,
				intro:
					"Swimming, sports, music, dance, coding and more, with English or bilingual coaching across Limassol, Paphos and Larnaca.",
			}}
			info={ACTIVITY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Good to know"
			notice={{
				tone: "info",
				content:
					"Fees and schedules change seasonally, so always verify directly with the club or academy before enrolling. For competitive sports, look for affiliation with the Cyprus Sports Organisation (KOA) or the relevant national federation.",
			}}
			related={
				<MoreOnTopic type="directory" slug="after-school-activities" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<AfterSchoolActivitiesClient />
		</DirectoryTemplate>
	);
}
