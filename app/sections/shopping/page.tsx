import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
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
			related={<MoreOnTopic type="directory" slug="shopping" cols={3} />}
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
