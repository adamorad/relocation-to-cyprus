import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { COWORK_TIPS } from "@/lib/coworking";
import { topicCrumb } from "@/lib/topic-map";
import CoworkingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Coworking Spaces in Cyprus";
const description =
	"Coworking spaces in Cyprus for relocators: vetted venues across Limassol, Paphos & Larnaca. Day-pass prices, WiFi speeds & noise levels rated.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/coworking/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/coworking/`,
		type: "website",
	},
};

export default function CoworkingPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: COWORK_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="coworking"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "coworking"),
					{ label: "Coworking Spaces" },
				],
				eyebrow: "Coworking",
				title: title,
				intro:
					"Directory with day-pass prices, monthly rates and WiFi speeds. Covers coworking, managed offices and café-friendly workspaces.",
			}}
			info={COWORK_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you book"
			related={<MoreOnTopic type="directory" slug="coworking" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<CoworkingClient />
		</DirectoryTemplate>
	);
}
