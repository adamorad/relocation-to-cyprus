import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { LAWYER_TIPS } from "@/lib/property-lawyers";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import PropertyLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Property Lawyers in Cyprus: Vetted Directory";
const description =
	"Property lawyers in Cyprus for relocators: vetted conveyancing solicitors across Limassol, Paphos & Larnaca. Foreign buyer specialists.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/property-lawyers/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/property-lawyers/`,
		type: "website",
	},
};

export default function PropertyLawyersPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: LAWYER_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["property-lawyers"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Property Lawyers" },
				],
				eyebrow: "Professional Services",
				title: "Property Lawyers in Cyprus: Vetted Directory",
				intro:
					"Conveyancing solicitors experienced with foreign buyers, title deed transfers, and new-build contracts across all Cyprus cities.",
			}}
			info={LAWYER_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you engage a property lawyer"
			notice={{
				tone: "legal",
				content:
					"This is a directory, not legal advice. Always verify Bar Association registration and fee structures directly with the firm.",
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
			<PropertyLawyersClient />
		</DirectoryTemplate>
	);
}
