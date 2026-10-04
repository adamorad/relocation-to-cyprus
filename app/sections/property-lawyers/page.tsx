import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { HEALTH_TRANSPORT_CHECKED, SRC } from "@/lib/facts/health-transport";
import { LAWYER_TIPS } from "@/lib/property-lawyers";
import { topicCrumb } from "@/lib/topic-map";
import PropertyLawyersClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Property Lawyers in Cyprus: Vetted Directory";
const description =
	"Property lawyers in Cyprus for relocators: vetted conveyancing solicitors across Limassol, Paphos & Larnaca. Foreign buyer specialists.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/property-lawyers/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/property-lawyers/`,
		type: "website",
	},
};

export default function PropertyLawyersPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: LAWYER_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="property-lawyers"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "property-lawyers"),
					{ label: "Property Lawyers" },
				],
				eyebrow: "Professional Services",
				title: "Property Lawyers in Cyprus: Vetted Directory",
				intro:
					"Conveyancing solicitors experienced with foreign buyers, title deed transfers, and new-build contracts across all Cyprus cities.",
			}}
			info={LAWYER_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you engage a property lawyer"
			notice={{
				tone: "legal",
				content:
					"This is a directory, not legal advice. Always verify Bar Association registration and fee structures directly with the firm.",
			}}
			related={
				<MoreOnTopic type="directory" slug="property-lawyers" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<PropertyLawyersClient />
			<SourcesNote
				className="mt-8"
				lastChecked={HEALTH_TRANSPORT_CHECKED}
				sources={[SRC.advocatesLaw]}
			/>
		</DirectoryTemplate>
	);
}
