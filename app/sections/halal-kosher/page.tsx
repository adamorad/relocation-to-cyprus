import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { DIETARY_TIPS } from "@/lib/halal-kosher";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import HalalKosherClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Halal & Kosher Food in Cyprus";
const description =
	"Certified halal and kosher restaurants, butchers, and grocery suppliers.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/halal-kosher/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/halal-kosher/`,
		type: "website",
	},
};

export default function HalalKosherPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: DIETARY_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["halal-kosher"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Halal & Kosher Food" },
				],
				eyebrow: "Food & Dining",
				title,
				intro:
					"Certified halal restaurants, butchers, and grocery stores, and kosher dining, meat suppliers, and certified products across Cyprus. A guide for Muslim and Jewish residents finding food that meets their dietary requirements.",
			}}
			info={DIETARY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know before you search"
			notice={{
				tone: "warning",
				content:
					"Always verify current certification directly with the venue before relying on it for religious requirements. Certifications can change.",
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
			<HalalKosherClient />
		</DirectoryTemplate>
	);
}
