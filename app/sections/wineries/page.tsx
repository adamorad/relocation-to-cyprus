import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { WINE_TIPS } from "@/lib/wineries";
import WineriesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Wineries & Wine Tourism in Cyprus";
const description =
	"Wine-producing villages and tasting rooms across the Troodos foothills.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/wineries/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/wineries/`,
		type: "website",
	},
};

export default function WineriesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: WINE_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["wineries"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Wineries & Wine Tourism" },
				],
				eyebrow: "Wine Tourism",
				title: "Wineries & Wine Tourism in Cyprus: From Commandaria Country",
				intro:
					"The Troodos foothills produce some of the Mediterranean's most distinctive wines. Indigenous varieties, ancient traditions, and a wine route through some of Cyprus's most beautiful villages.",
			}}
			info={WINE_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
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
			<WineriesClient />
		</DirectoryTemplate>
	);
}
