import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SPORTS_TIPS } from "@/lib/sports-clubs";
import { topicCrumb } from "@/lib/topic-map";
import SportsClubsClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Sports & Recreation Clubs in Cyprus";
const description =
	"Tennis, golf, sailing, padel, hiking groups, and more, with membership fees.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/sports-clubs/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/sports-clubs/`,
		type: "website",
	},
};

export default function SportsClubsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: SPORTS_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="sports-clubs"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "sports-clubs"),
					{ label: "Sports & Recreation Clubs" },
				],
				eyebrow: "Sports & Recreation",
				title: "Sports & Recreation Clubs in Cyprus",
				intro:
					"Tennis, padel, golf, sailing, running, rugby and more, across all four cities. Most clubs have strong expat memberships and English-speaking coaches.",
			}}
			info={SPORTS_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			related={<MoreOnTopic type="directory" slug="sports-clubs" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<SportsClubsClient />
		</DirectoryTemplate>
	);
}
