import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { VIEW_BAR_TIPS, VIEW_BARS } from "@/lib/rooftop-bars";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import RooftopBarsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Rooftop & Sea View Bars in Cyprus";
const description =
	"Rooftop and sea-view venues across the island with price ranges and reservation notes.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/rooftop-bars/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/rooftop-bars/`,
		type: "website",
	},
};

export default function RooftopBarsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: VIEW_BAR_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["rooftop-bars"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Rooftop & Sea View Bars" },
				],
				eyebrow: "Cyprus Lifestyle",
				title: "Rooftop & Sea View Bars in Cyprus",
				intro: (
					<>
						The best elevated and waterfront bars across Cyprus, for sundowners,
						cocktail evenings, and getting a feel for the city from above.{" "}
						{VIEW_BARS.length} venues across all four cities.
					</>
				),
			}}
			info={VIEW_BAR_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			notice={{
				tone: "info",
				content:
					"Prices and reservation policies change seasonally. Always verify directly with the venue before visiting.",
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
			<RooftopBarsClient />
		</DirectoryTemplate>
	);
}
