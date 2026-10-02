import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { CULTURE_TIPS } from "@/lib/art-culture";
import { topicCrumb } from "@/lib/topic-map";
import ArtCultureClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Art Galleries, Museums & Cultural Venues in Cyprus";
const description =
	"Galleries, museums, and cultural venues with English signage and exhibition schedules.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/art-culture/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/art-culture/`,
		type: "website",
	},
};

export default function ArtCulturePage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: CULTURE_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="art-culture"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "art-culture"),
					{ label: "Art & Culture" },
				],
				eyebrow: "Art & Culture",
				title: title,
				intro:
					"From the Cyprus Museum's 8,000 years of artefacts to Limassol's thriving contemporary galleries: the cultural institutions worth knowing as a new resident.",
			}}
			info={CULTURE_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Good to know"
			related={
				<>
					<SourcesNote
						lastChecked="2026-10-02"
						sources={[
							{
								label: "My Mall Limassol: contact and address",
								url: "https://www.mymall.com.cy/contact-us/",
							},
						]}
					/>
					<div className="mt-12">
						<MoreOnTopic type="directory" slug="art-culture" cols={3} />
					</div>
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<ArtCultureClient />
		</DirectoryTemplate>
	);
}
