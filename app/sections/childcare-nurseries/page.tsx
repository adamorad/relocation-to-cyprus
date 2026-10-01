import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { CHILDCARE_TIPS } from "@/lib/childcare";
import { topicCrumb } from "@/lib/topic-map";
import ChildcareNurseriesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Childcare & Nurseries in Cyprus";
const description =
	"Childcare & nurseries in Cyprus for relocators: registered venues with English instruction across Limassol, Paphos & Larnaca.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/childcare-nurseries/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/childcare-nurseries/`,
		type: "website",
	},
};

export default function ChildcareNurseriesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: CHILDCARE_TIPS.map((t) => ({
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
					topicCrumb("directory", "childcare-nurseries"),
					{ label: "Childcare & Nurseries" },
				],
				eyebrow: "Family & Children",
				title: title,
				intro:
					"English-speaking and bilingual nurseries across Limassol, Paphos and Larnaca, with fees, age ranges and what makes each one stand out for expat families.",
			}}
			info={CHILDCARE_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know before you choose"
			notice={{
				tone: "info",
				content:
					"Fees and availability change frequently, so always verify directly with the nursery before enrolling. Regulatory oversight is by the Cyprus Ministry of Education, Culture, Sport and Youth (MOEC) and Social Welfare Services.",
			}}
			related={
				<MoreOnTopic type="directory" slug="childcare-nurseries" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<ChildcareNurseriesClient />
		</DirectoryTemplate>
	);
}
