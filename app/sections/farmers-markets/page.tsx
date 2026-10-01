import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { MARKET_TIPS } from "@/lib/farmers-markets";
import { topicCrumb } from "@/lib/topic-map";
import FarmersMarketsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Farmers Markets & Local Produce in Cyprus";
const description =
	"Weekly markets and local produce stalls across all districts with operating days.";

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
					"Weekly laiki agorai, municipal covered markets, and organic farmers markets across Cyprus: the best places to buy directly from local growers. Seasonal produce, fresh halloumi, village honey, and artisan food products at prices that reflect Cyprus's agricultural heritage.",
			}}
			info={MARKET_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Market tips"
			related={<MoreOnTopic type="directory" slug="farmers-markets" cols={3} />}
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
