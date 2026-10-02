import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { topicCrumb } from "@/lib/topic-map";
import { WINE_TIPS } from "@/lib/wineries";
import WineriesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Wineries & Wine Tourism in Cyprus";
const description =
	"Wine-producing villages and tasting rooms across the Troodos foothills.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/wineries/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/wineries/`,
		type: "website",
	},
};

export default function WineriesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: WINE_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="wineries"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "wineries"),
					{ label: "Wineries & Wine Tourism" },
				],
				eyebrow: "Wine Tourism",
				title: "Wineries & Wine Tourism in Cyprus: From Commandaria Country",
				intro:
					"The Troodos foothills produce some of the Mediterranean's most distinctive wines. Indigenous varieties, ancient traditions, and a wine route through some of Cyprus's most beautiful villages.",
			}}
			info={WINE_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			related={<MoreOnTopic type="directory" slug="wineries" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<WineriesClient />
		</DirectoryTemplate>
	);
}
