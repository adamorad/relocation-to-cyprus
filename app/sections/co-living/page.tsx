import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { CO_LIVING_TIPS } from "@/lib/co-living";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import CoLivingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Co-Living & Serviced Apartments in Cyprus";
const description =
	"Month-to-month co-living options for digital nomads and new arrivals.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/co-living/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/co-living/`,
		type: "website",
	},
};

export default function CoLivingPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: CO_LIVING_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["co-living"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Co-Living" },
				],
				eyebrow: "Co-Living",
				title: title,
				intro:
					"Month-to-month furnished spaces with utilities and WiFi included, for digital nomads, relocators, and professionals who want flexibility before committing to a long-term lease.",
			}}
			info={CO_LIVING_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Co-living vs renting"
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
			<CoLivingClient />
		</DirectoryTemplate>
	);
}
