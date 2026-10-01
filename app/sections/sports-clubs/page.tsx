import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { SPORTS_TIPS } from "@/lib/sports-clubs";
import SportsClubsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Sports & Recreation Clubs in Cyprus";
const description =
	"Tennis, golf, sailing, padel, hiking groups, and more, with membership fees.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/sports-clubs/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/sports-clubs/`,
		type: "website",
	},
};

export default function SportsClubsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: SPORTS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["sports-clubs"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Sports & Recreation Clubs" },
				],
				eyebrow: "Sports & Recreation",
				title: "Sports & Recreation Clubs in Cyprus",
				intro:
					"Tennis, padel, golf, sailing, running, rugby and more, across all four cities. Most clubs have strong expat memberships and English-speaking coaches.",
			}}
			info={SPORTS_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
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
			<SportsClubsClient />
		</DirectoryTemplate>
	);
}
