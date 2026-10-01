import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { DIETARY_TIPS } from "@/lib/halal-kosher";
import { topicCrumb } from "@/lib/topic-map";
import HalalKosherClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Halal & Kosher Food in Cyprus";
const description =
	"Certified halal and kosher restaurants, butchers, and grocery suppliers.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/halal-kosher/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/halal-kosher/`,
		type: "website",
	},
};

export default function HalalKosherPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: DIETARY_TIPS.map((t) => ({
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
					topicCrumb("directory", "halal-kosher"),
					{ label: "Halal & Kosher Food" },
				],
				eyebrow: "Food & Dining",
				title,
				intro:
					"Certified halal restaurants, butchers, and grocery stores, and kosher dining, meat suppliers, and certified products across Cyprus. A guide for Muslim and Jewish residents finding food that meets their dietary requirements.",
			}}
			info={DIETARY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know before you search"
			notice={{
				tone: "warning",
				content:
					"Always verify current certification directly with the venue before relying on it for religious requirements. Certifications can change.",
			}}
			related={<MoreOnTopic type="directory" slug="halal-kosher" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<HalalKosherClient />
		</DirectoryTemplate>
	);
}
