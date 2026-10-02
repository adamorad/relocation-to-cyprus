import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { SHOPPING_TIPS } from "@/lib/shopping";
import { topicCrumb } from "@/lib/topic-map";
import { topicBySlug, topicShareMetadata } from "@/lib/topics";
import ShoppingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Supermarkets, Markets & Malls in Cyprus";
const description =
	"Supermarket chains, municipal and farmers markets, and the main malls in Limassol, Paphos, Larnaca and Ayia Napa, with budget bands and market days.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/shopping/" },
	// Share image: the Food & shopping topic illustration.
	// biome-ignore lint/style/noNonNullAssertion: the topic is defined in lib/topics.ts
	...topicShareMetadata(topicBySlug("food-and-shopping")!, {
		title,
		description,
		url: `${SITE_URL}/sections/shopping/`,
	}),
};

export default function ShoppingPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: SHOPPING_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="shopping"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "shopping"),
					{ label: "Supermarkets & Markets" },
				],
				eyebrow: "Everyday Shopping",
				title,
				intro:
					"Where to do the weekly shop in Limassol, Paphos, Larnaca and Ayia Napa: the main supermarket chains by budget, the municipal and Laiki markets with their opening days, and each city's main mall.",
			}}
			info={SHOPPING_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know before you shop"
			notice={{
				tone: "warning",
				content:
					"Opening hours and market days change, especially around holidays. Check with the store or market before a special trip.",
			}}
			related={
				<>
					<SourcesNote
						lastChecked="2026-10-02"
						sources={[
							{
								label: "Visit Cyprus: working hours and Sunday opening",
								url: "https://www.visitcyprus.com/useful-info/time-working-hours-holidays/",
							},
							{
								label:
									"European Commission: e-commerce VAT package explanatory notes",
								url: "https://taxation-customs.ec.europa.eu/system/files/2020-12/vatecommerceexplanatory_28102020_en.pdf",
							},
							{
								label: "Larnaka Tourism Board: Larnaca Municipal Market",
								url: "https://larnakaregion.com/en/directory/product/municipal-market",
							},
							{
								label:
									"Cyprus Mail: Sklavenitis completes acquisition of Papantoniou (6 November 2024)",
								url: "https://cyprus-mail.com/2024/11/06/sklavenitis-completes-acquisition-of-papantoniou-supermarkets",
							},
							{
								label: "My Mall Limassol: contact and address",
								url: "https://www.mymall.com.cy/contact-us/",
							},
						]}
					/>
					<div className="mt-12">
						<MoreOnTopic type="directory" slug="shopping" cols={3} />
					</div>
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<ShoppingClient />
		</DirectoryTemplate>
	);
}
