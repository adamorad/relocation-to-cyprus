import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { VOLUNTEER_TIPS } from "@/lib/volunteering";
import VolunteeringClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Volunteering in Cyprus";
const description =
	"NGOs, animal shelters, environmental groups, and community orgs welcoming expat volunteers.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/volunteering/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/volunteering/`,
		type: "website",
	},
};

export default function VolunteeringPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: VOLUNTEER_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["volunteering"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Volunteering Opportunities" },
				],
				eyebrow: "Community",
				title: "Volunteering in Cyprus",
				intro:
					"Opportunities for expats to give back: animal welfare, environment, children, refugees, arts, and more. Filter by city and focus area.",
			}}
			info={VOLUNTEER_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			related={
				<div className="space-y-8" data-pagefind-ignore>
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
			<VolunteeringClient />
		</DirectoryTemplate>
	);
}
