import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ACTIVITY_TIPS } from "@/lib/after-school";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import AfterSchoolActivitiesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "After-School Activities for Children in Cyprus";
const description =
	"Sports clubs, music academies, language classes, and arts programs for children aged 4–18.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/after-school-activities/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/after-school-activities/`,
		type: "website",
	},
};

export default function AfterSchoolActivitiesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: ACTIVITY_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["after-school-activities"] ?? []
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
					{ label: "After-School Activities" },
				],
				eyebrow: "Family & Children",
				title: title,
				intro:
					"Swimming, sports, music, dance, coding and more, with English or bilingual coaching across Limassol, Paphos and Larnaca.",
			}}
			info={ACTIVITY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Good to know"
			notice={{
				tone: "info",
				content:
					"Fees and schedules change seasonally, so always verify directly with the club or academy before enrolling. For competitive sports, look for affiliation with the Cyprus Sports Organisation (KOA) or the relevant national federation.",
			}}
			related={
				relatedGuides.length > 0 ? (
					<div data-pagefind-ignore>
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
					</div>
				) : null
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<AfterSchoolActivitiesClient />
		</DirectoryTemplate>
	);
}
