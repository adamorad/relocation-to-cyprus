import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { FITNESS_TIPS } from "@/lib/fitness-wellness";
import { topicCrumb } from "@/lib/topic-map";
import FitnessWellnessClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Gyms, Fitness Studios & Wellness in Cyprus";
const description =
	"Gyms, yoga, CrossFit, Pilates, and wellness centres with pricing and language flags.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/fitness-wellness/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/fitness-wellness/`,
		type: "website",
	},
};

export default function FitnessWellnessPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FITNESS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="fitness-wellness"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "fitness-wellness"),
					{ label: "Fitness & Wellness Studios" },
				],
				eyebrow: "Fitness & Wellness",
				title: title,
				intro:
					"From CrossFit boxes to yoga studios, padel clubs, and hotel spas: a curated directory of fitness and wellness venues for relocators across all four cities.",
			}}
			info={FITNESS_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Fitness in Cyprus: what to know"
			related={
				<MoreOnTopic type="directory" slug="fitness-wellness" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<FitnessWellnessClient />
		</DirectoryTemplate>
	);
}
