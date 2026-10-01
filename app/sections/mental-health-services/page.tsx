import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { MENTAL_HEALTH_TIPS } from "@/lib/mental-health";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import MentalHealthServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Mental Health Services in Cyprus: Private Clinics & Therapists";
const description =
	"Private mental health clinics in Cyprus: vetted English-speaking therapists and psychiatrists across Limassol, Paphos & Larnaca.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/mental-health-services/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/mental-health-services/`,
		type: "website",
	},
};

export default function MentalHealthServicesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: MENTAL_HEALTH_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["mental-health-services"] ?? []
	)
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Mental Health Services" },
				],
				eyebrow: "Healthcare",
				title: "Mental Health Services in Cyprus",
				intro:
					"Psychologists, psychotherapists, psychiatrists, and counsellors across Cyprus who work in English, including those experienced with expat adjustment issues and relocation.",
			}}
			info={MENTAL_HEALTH_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="What to know first"
			related={
				<div className="space-y-8" data-pagefind-ignore>
					<Callout tone="legal">
						{
							"This directory is general information. Always verify availability, session fees, and provider credentials directly. For medical emergencies call 112."
						}
					</Callout>
					{relatedGuides.length > 0 ? (
						<Section id="related" title="Related guides">
							<CardGrid cols={2}>
								{relatedGuides.map((g) => (
									<CardGridItem key={g.slug}>
										<Card
											variant="text"
											href={`/guides/${g.slug}/`}
											title={g.title}
											text={
												<span className="line-clamp-2">{g.description}</span>
											}
										/>
									</CardGridItem>
								))}
							</CardGrid>
						</Section>
					) : null}
				</div>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<MentalHealthServicesClient />
		</DirectoryTemplate>
	);
}
