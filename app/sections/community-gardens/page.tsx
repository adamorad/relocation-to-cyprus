import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GARDEN_TIPS } from "@/lib/community-gardens";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import CommunityGardensClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Community Gardens & Urban Farming in Cyprus";
const description =
	"Allotment schemes and urban farming initiatives: plus growing calendar tips for Cyprus's climate.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/community-gardens/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/community-gardens/`,
		type: "website",
	},
};

export default function CommunityGardensPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: GARDEN_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["community-gardens"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Community Gardens" },
				],
				eyebrow: "Cyprus Community",
				title: title,
				intro:
					"An emerging scene on the island. Community gardens, allotments, urban farms and rooftop growing projects across Cyprus, with honest notes on availability and access.",
			}}
			info={GARDEN_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Good to know"
			notice={{
				tone: "info",
				content: (
					<>
						<p>
							This is a growing movement: many schemes are small, volunteer-run,
							or municipality pilots. Verify details directly before visiting.
						</p>
						<p className="mt-2">
							Community garden availability, fees, and membership status change
							frequently. Always contact the organisation directly for current
							information.
						</p>
					</>
				),
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
			<CommunityGardensClient />
		</DirectoryTemplate>
	);
}
