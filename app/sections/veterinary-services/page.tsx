import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import { VET_TIPS } from "@/lib/veterinary";
import VeterinaryServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Veterinary Services in Cyprus";
const description =
	"English-speaking vet clinics with emergency care and specialist referrals.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/veterinary-services/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/veterinary-services/`,
		type: "website",
	},
};

export default function VeterinaryServicesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: VET_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["veterinary-services"] ?? []
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
					{ label: "Veterinary Services" },
				],
				eyebrow: "Services",
				title: "Veterinary Services in Cyprus",
				intro:
					"English-friendly vet clinics across all four major cities, routine care, emergency cover, specialist referrals, and exotic animal services. Includes 24/7 emergency locations.",
			}}
			info={VET_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			notice={{
				tone: "info",
				content:
					"Opening hours, emergency cover arrangements, and staff availability change. Always confirm directly with the clinic before travelling. For a genuine pet emergency, call ahead even if the clinic is listed as 24/7.",
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
			<VeterinaryServicesClient />
		</DirectoryTemplate>
	);
}
