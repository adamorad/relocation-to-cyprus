import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { RELIGIOUS_TIPS } from "@/lib/religious-services";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import ReligiousServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Religious Services in Cyprus";
const description =
	"English-language churches, mosques, synagogues, and temples across all districts.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/religious-services/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/religious-services/`,
		type: "website",
	},
};

export default function ReligiousServicesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: RELIGIOUS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["religious-services"] ?? []
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
					{ label: "Religious Services" },
				],
				eyebrow: "Community",
				title: "Religious Services in Cyprus",
				intro:
					"English-language and multilingual worship services across Cyprus: Anglican, Catholic, Protestant, Jewish, Muslim, and more.",
			}}
			info={RELIGIOUS_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
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
			<ReligiousServicesClient />
		</DirectoryTemplate>
	);
}
