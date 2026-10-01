import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { SUMMER_CAMP_TIPS } from "@/lib/summer-camps";
import SummerCampsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Summer Camps in Cyprus: Day and Residential";
const description =
	"Residential and day camps for children: language immersion, sports, STEM, and arts.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/summer-camps/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/summer-camps/`,
		type: "website",
	},
};

export default function SummerCampsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: SUMMER_CAMP_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["summer-camps"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Summer Camps" },
				],
				eyebrow: "Family & Children",
				title: "Summer Camps in Cyprus: Day and Residential",
				intro:
					"Day camps and residential programmes for children across Cyprus: sports, watersports, STEM, arts, and adventure, from June through August.",
			}}
			info={SUMMER_CAMP_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Planning tips"
			notice={{
				tone: "warning",
				content:
					"Prices, dates and availability change each year, so always verify directly with the camp before booking. Cyprus temperatures in July and August regularly exceed 38°C; check each camp's heat management policy before enrolling young children.",
			}}
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
			<SummerCampsClient />
		</DirectoryTemplate>
	);
}
