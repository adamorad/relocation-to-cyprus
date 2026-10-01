import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ACCOUNTANT_TIPS } from "@/lib/accountants";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";
import AccountantsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Accountants & Tax Advisors in Cyprus";
const description =
	"Accountants & tax advisors in Cyprus for relocators: ICPAC-registered firms across Limassol, Paphos & Larnaca. Non-dom filings & company tax.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/accountants/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/accountants/`,
		type: "website",
	},
};

export default function AccountantsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: ACCOUNTANT_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};
	const relatedGuides = (SECTION_RELATED_GUIDE_SLUGS.accountants ?? [])
		.map((slug) => GUIDES.find((g) => g.slug === slug))
		.filter((g) => g !== undefined);

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Accountants & Tax Advisors" },
				],
				eyebrow: "Professional Services",
				title: title,
				intro:
					"ICPAC-registered accountants with proven experience in the non-domiciled regime, expat individual returns, corporate tax, VAT, and crypto.",
			}}
			info={ACCOUNTANT_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you engage an accountant"
			notice={{
				tone: "legal",
				content:
					"This is a directory, not tax advice. Always verify ICPAC membership and fee structures directly with the firm.",
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
			<AccountantsClient />
		</DirectoryTemplate>
	);
}
