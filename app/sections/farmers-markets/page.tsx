import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { MARKET_TIPS } from "@/lib/farmers-markets";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import FarmersMarketsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Farmers Markets & Local Produce in Cyprus";
const description =
	"Weekly markets and local produce stalls across all districts with operating days.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/farmers-markets/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/farmers-markets/`,
		type: "website",
	},
};

export default function FarmersMarketsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: MARKET_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["farmers-markets"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Farmers Markets" },
				],
				eyebrow: "Food & Dining",
				title: title,
				intro:
					"Weekly laiki agorai, municipal covered markets, and organic farmers markets across Cyprus: the best places to buy directly from local growers. Seasonal produce, fresh halloumi, village honey, and artisan food products at prices that reflect Cyprus's agricultural heritage.",
			}}
			info={MARKET_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Market tips"
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
			<FarmersMarketsClient />
		</DirectoryTemplate>
	);
}
