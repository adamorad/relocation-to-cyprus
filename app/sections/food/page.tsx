import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { FOOD_PLACES } from "@/lib/food";
import { topicCrumb } from "@/lib/topic-map";
import { topicBySlug, topicShareMetadata } from "@/lib/topics";
import FoodClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Where to Eat in Cyprus";
const description =
	"Cafés, tavernas, grills, bakeries and dessert spots locals recommend in Limassol, Paphos, Larnaca and Ayia Napa, by meal and price band.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/food/" },
	// Share image: the Food & shopping topic illustration.
	// biome-ignore lint/style/noNonNullAssertion: the topic is defined in lib/topics.ts
	...topicShareMetadata(topicBySlug("food-and-shopping")!, {
		title,
		description,
		url: `${SITE_URL}/sections/food/`,
	}),
};

export default function FoodPage() {
	// No tips list in the data, so an ItemList of the places instead of FAQPage.
	const itemListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: title,
		numberOfItems: FOOD_PLACES.length,
		itemListElement: FOOD_PLACES.map((p, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: `${p.name}, ${p.city}`,
		})),
	};

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "food"),
					{ label: "Where to Eat" },
				],
				eyebrow: "Food & Dining",
				title,
				intro:
					"Breakfast cafés, souvlaki grills, village tavernas, dinner spots and sweet shops in Limassol, Paphos, Larnaca and Ayia Napa. The picks come from local Cypriot food blogs and press rather than tourist top-ten lists.",
			}}
			notice={{
				tone: "info",
				title: "Price bands",
				content:
					"Per person: € under €10, €€ €10 to €25, €€€ €25 to €50, €€€€ over €50. Opening times and menus change, so check with the place before you go.",
			}}
			related={<MoreOnTopic type="directory" slug="food" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>
			<FoodClient />
		</DirectoryTemplate>
	);
}
