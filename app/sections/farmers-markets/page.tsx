import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { MARKET_TIPS } from "@/lib/farmers-markets";
import { topicCrumb } from "@/lib/topic-map";
import FarmersMarketsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Farmers Markets & Local Produce in Cyprus";
const description =
	"Municipal and weekly produce markets in Limassol, Larnaca and Paphos, with operating days.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/farmers-markets/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/farmers-markets/`,
		type: "website",
	},
};

export default function FarmersMarketsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: MARKET_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="farmers-markets"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "farmers-markets"),
					{ label: "Farmers Markets" },
				],
				eyebrow: "Food & Dining",
				title: title,
				intro:
					"Municipal covered markets and weekly laiki agorai in Limassol, Larnaca and Paphos: the best places to buy directly from local growers. Seasonal produce, fresh halloumi, village honey, and artisan food products at prices that reflect Cyprus's agricultural heritage.",
			}}
			info={MARKET_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Market tips"
			related={
				<>
					<SourcesNote
						lastChecked="2026-10-02"
						sources={[
							{
								label: "Larnaka Tourism Board: Larnaca Municipal Market",
								url: "https://larnakaregion.com/en/directory/product/municipal-market",
							},
							{
								label: "Larnaca Salt Lake (Wikipedia)",
								url: "https://en.wikipedia.org/wiki/Larnaca_Salt_Lake",
							},
						]}
					/>
					<div className="mt-12">
						<MoreOnTopic type="directory" slug="farmers-markets" cols={3} />
					</div>
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<FarmersMarketsClient />
		</DirectoryTemplate>
	);
}
