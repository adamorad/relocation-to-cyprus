import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { STARTUP_TIPS } from "@/lib/startup-ecosystem";
import StartupEcosystemClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Startup Ecosystem: Coworking, Incubators & Tech Hubs";
const description =
	"Co-working spaces, incubators, accelerators, and tech hubs across Cyprus.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/startup-ecosystem/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/startup-ecosystem/`,
		type: "website",
	},
};

export default function StartupEcosystemPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: STARTUP_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS["startup-ecosystem"] ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Startup Ecosystem" },
				],
				eyebrow: "Startup Ecosystem",
				title: "Cyprus Startup Ecosystem",
				intro:
					"Coworking spaces, incubators, accelerators and tech hubs across Cyprus, with focus areas and membership pricing.",
			}}
			info={STARTUP_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
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
			<StartupEcosystemClient />
		</DirectoryTemplate>
	);
}
