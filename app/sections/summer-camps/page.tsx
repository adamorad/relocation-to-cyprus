import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SUMMER_CAMP_TIPS } from "@/lib/summer-camps";
import { topicCrumb } from "@/lib/topic-map";
import SummerCampsClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Summer Camps in Cyprus: Day and Residential";
const description =
	"Residential and day camps for children: language immersion, sports, STEM, and arts.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/summer-camps/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/summer-camps/`,
		type: "website",
	},
};

export default function SummerCampsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: SUMMER_CAMP_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="summer-camps"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "summer-camps"),
					{ label: "Summer Camps" },
				],
				eyebrow: "Family & Children",
				title: "Summer Camps in Cyprus: Day and Residential",
				intro:
					"Day camps and residential programmes for children across Cyprus: sports, watersports, STEM, arts, and adventure, from June through August.",
			}}
			info={SUMMER_CAMP_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Planning tips"
			notice={{
				tone: "warning",
				content:
					"Prices, dates and availability change each year, so always verify directly with the camp before booking. Cyprus temperatures in July and August regularly exceed 38°C; check each camp's heat management policy before enrolling young children.",
			}}
			related={<MoreOnTopic type="directory" slug="summer-camps" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<SummerCampsClient />
		</DirectoryTemplate>
	);
}
