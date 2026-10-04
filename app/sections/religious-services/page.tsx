import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { RELIGIOUS_TIPS } from "@/lib/religious-services";
import { topicCrumb } from "@/lib/topic-map";
import ReligiousServicesClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Religious Services in Cyprus";
const description =
	"English-language churches, mosques, synagogues, and temples across all districts.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/religious-services/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/religious-services/`,
		type: "website",
	},
};

export default function ReligiousServicesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: RELIGIOUS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="religious-services"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "religious-services"),
					{ label: "Religious Services" },
				],
				eyebrow: "Community",
				title: "Religious Services in Cyprus",
				intro:
					"English-language and multilingual worship services across Cyprus: Anglican, Catholic, Protestant, Jewish, Muslim, and more.",
			}}
			info={RELIGIOUS_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			related={
				<MoreOnTopic type="directory" slug="religious-services" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<ReligiousServicesClient />
		</DirectoryTemplate>
	);
}
