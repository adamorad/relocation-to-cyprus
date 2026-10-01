import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { HEALTHCARE_TIPS } from "@/lib/healthcare";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { SPECIALIST_TIPS } from "@/lib/specialist-doctors";
import SpecialistDoctorsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Specialist Doctors in Cyprus";
const description =
	"Specialist doctors in Cyprus for relocators: English-speaking consultants with GeSY & private options across Limassol, Paphos & Larnaca.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/specialist-doctors/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/specialist-doctors/`,
		type: "website",
	},
};

export default function SpecialistDoctorsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: HEALTHCARE_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["specialist-doctors"] ?? []
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
					{ label: "Specialist Doctors" },
				],
				eyebrow: "Healthcare",
				title: "Specialist Doctors in Cyprus",
				intro:
					"English-speaking specialists across cardiology, oncology, orthopaedics, dermatology, fertility, paediatrics and more, covering private and GeSY providers in all major cities.",
			}}
			info={SPECIALIST_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			notice={{
				tone: "legal",
				content:
					"This directory is general information for relocators, not medical advice. Always verify GeSY acceptance status, clinic availability, and consultation fees directly with the provider before attending.",
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
			<SpecialistDoctorsClient />
		</DirectoryTemplate>
	);
}
