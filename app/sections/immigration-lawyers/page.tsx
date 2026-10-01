import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { IMMIGRATION_LAWYER_TIPS } from "@/lib/immigration-lawyers";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import ImmigrationLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Immigration Lawyers in Cyprus";
const description =
	"Immigration lawyers in Cyprus for relocators: specialists in digital nomad visas, PR by investment & work permits across Limassol & Paphos.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/immigration-lawyers/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/immigration-lawyers/`,
		type: "website",
	},
};

export default function ImmigrationLawyersPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: IMMIGRATION_LAWYER_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["immigration-lawyers"] ?? []
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
					{ label: "Immigration Lawyers" },
				],
				eyebrow: "Professional Services",
				title: title,
				intro:
					"Specialists in the Digital Nomad Visa, Permanent Residency by Investment, work permits, and citizenship applications across all Cyprus cities.",
			}}
			info={IMMIGRATION_LAWYER_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="Before you engage an immigration lawyer"
			notice={{
				tone: "legal",
				content:
					"This is a directory, not legal advice. Always verify Bar Association registration and fee structures directly with the firm.",
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
			<ImmigrationLawyersClient />
		</DirectoryTemplate>
	);
}
