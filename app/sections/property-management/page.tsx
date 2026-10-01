import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { PROPERTY_MANAGEMENT_TIPS } from "@/lib/property-management";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import PropertyManagementClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Property Management in Cyprus: Vetted Companies & Services";
const description =
	"Property management service in Cyprus for landlords: vetted companies across Limassol, Paphos & Larnaca. English-speaking managers.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/property-management/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/property-management/`,
		type: "website",
	},
};

export default function PropertyManagementPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: PROPERTY_MANAGEMENT_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["property-management"] ?? []
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
					{ label: "Property Management" },
				],
				eyebrow: "Property Management",
				title: "Property Management in Cyprus",
				intro:
					"Licensed property managers across Limassol, Paphos, and Larnaca, for non-resident owners who need trusted local management of their Cyprus investment.",
			}}
			info={PROPERTY_MANAGEMENT_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="What to check before you engage"
			notice={{
				tone: "warning",
				title: "Verify any agent",
				content: (
					<>
						The Cyprus Real Estate Agents Registration Council (RERA) register
						is searchable at{" "}
						<a
							href="https://realestate.gov.cy"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold underline"
						>
							realestate.gov.cy
						</a>
						. Always cross-check the company AND individual agent name before
						signing any management agreement.
					</>
				),
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
			<PropertyManagementClient />
		</DirectoryTemplate>
	);
}
