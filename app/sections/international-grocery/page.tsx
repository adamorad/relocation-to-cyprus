import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { GROCERY_TIPS } from "@/lib/international-grocery";
import { topicCrumb } from "@/lib/topic-map";
import InternationalGroceryClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "International & Specialty Food Stores in Cyprus";
const description =
	"Supermarkets and specialty stores carrying Asian, Middle Eastern, and other international foods.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/international-grocery/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/international-grocery/`,
		type: "website",
	},
};

export default function InternationalGroceryPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: GROCERY_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="international-grocery"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "international-grocery"),
					{ label: "International Grocery Stores" },
				],
				eyebrow: "Food & Dining",
				title: title,
				intro:
					"Where to find Asian, Middle Eastern, Indian, Eastern European and British food in Cyprus, with the specialty stores we could confirm.",
			}}
			info={GROCERY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Shopping tips"
			related={
				<MoreOnTopic type="directory" slug="international-grocery" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<InternationalGroceryClient />
		</DirectoryTemplate>
	);
}
