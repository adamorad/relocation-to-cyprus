import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { STARTUP_TIPS } from "@/lib/startup-ecosystem";
import { topicCrumb } from "@/lib/topic-map";
import StartupEcosystemClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Startup Ecosystem: Coworking, Incubators & Tech Hubs";
const description =
	"Co-working spaces, incubators, accelerators, and tech hubs across Cyprus.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/startup-ecosystem/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/startup-ecosystem/`,
		type: "website",
	},
};

export default function StartupEcosystemPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: STARTUP_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="startup-ecosystem"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "startup-ecosystem"),
					{ label: "Startup Ecosystem" },
				],
				eyebrow: "Startup Ecosystem",
				title: "Cyprus Startup Ecosystem",
				intro:
					"Coworking spaces, incubators, accelerators and tech hubs across Cyprus, with focus areas and membership pricing.",
			}}
			info={STARTUP_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			related={
				<MoreOnTopic type="directory" slug="startup-ecosystem" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<StartupEcosystemClient />
		</DirectoryTemplate>
	);
}
