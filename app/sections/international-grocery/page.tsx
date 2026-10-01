import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { GROCERY_TIPS } from "@/lib/international-grocery";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import InternationalGroceryClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "International & Specialty Food Stores in Cyprus";
const description =
	"Supermarkets and specialty stores carrying Asian, Middle Eastern, and other international foods.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/international-grocery/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/international-grocery/`,
		type: "website",
	},
};

export default function InternationalGroceryPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: GROCERY_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["international-grocery"] ?? []
	)
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "International Grocery Stores" },
				],
				eyebrow: "Food & Dining",
				title: title,
				intro:
					"Asian grocery stores, Middle Eastern supermarkets, Indian spice shops, Russian food stores, and British import shops across Cyprus: wherever you are relocating from, this is where to find the taste of home.",
			}}
			info={GROCERY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Shopping tips"
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
			<InternationalGroceryClient />
		</DirectoryTemplate>
	);
}
