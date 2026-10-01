import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { REGISTERED_ADDRESS_TIPS } from "@/lib/registered-address";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import RegisteredAddressClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Registered Address Providers in Cyprus";
const description =
	"Registered address & virtual office providers in Cyprus: vetted services for Cyprus-incorporated companies across Limassol & Paphos.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/registered-address/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/registered-address/`,
		type: "website",
	},
};

export default function RegisteredAddressPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: REGISTERED_ADDRESS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (
		SECTION_RELATED_GUIDE_SLUGS["registered-address"] ?? []
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
					{ label: "Registered Address Providers" },
				],
				eyebrow: "Business Setup",
				title: "Registered Address Providers in Cyprus",
				intro:
					"Every Cyprus company legally needs a registered address. These providers offer the registered office service, with or without mail forwarding.",
			}}
			info={REGISTERED_ADDRESS_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="What to know first"
			notice={{
				tone: "legal",
				title: "Disclaimer",
				content:
					"This is a general directory, not legal advice. Prices and service inclusions change frequently. Always verify directly with the provider before signing. For company formation or ongoing compliance, consult a Cyprus-licensed advocate or accountant.",
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
			<RegisteredAddressClient />
		</DirectoryTemplate>
	);
}
