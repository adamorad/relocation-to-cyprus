import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { EV_TIPS } from "@/lib/ev-charging";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import EvChargingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "EV Charging Stations in Cyprus: Directory";
const description =
	"Public EV charging points by city with charger type and operator details.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/ev-charging/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/ev-charging/`,
		type: "website",
	},
};

export default function EvChargingPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: EV_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["ev-charging"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "EV Charging Stations" },
				],
				eyebrow: "EV Charging",
				title: "EV Charging Stations in Cyprus: Directory",
				intro:
					"Public charge points across all four cities. Operators, speeds, costs, and practical notes for EV drivers relocating to Cyprus.",
			}}
			info={EV_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="EV charging in Cyprus: key facts"
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
			<EvChargingClient />
		</DirectoryTemplate>
	);
}
