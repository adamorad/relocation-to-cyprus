import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { topicCrumb } from "@/lib/topic-map";
import NeighbourhoodExplorerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Neighbourhood Explorer";
const description =
	"Explore and compare neighbourhoods across Cyprus cities. Filter by vibe, beach access, expat density, schools, and value for money to find your ideal area.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/neighbourhood-explorer/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/neighbourhood-explorer/`,
		type: "website",
	},
};

export default function NeighbourhoodExplorerPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic type="tool" slug="neighbourhood-explorer" cols={3} />
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "neighbourhood-explorer"),
					{ label: "Neighbourhood Explorer" },
				],
				eyebrow: "Research",
				title: "Neighbourhood Explorer",
				intro:
					"Browse neighbourhoods across Cyprus and find the area that fits your lifestyle. Filter by city and vibe, then compare up to 3 areas side by side.",
			}}
			nextSteps={[{ href: "/tools/", label: "All tools" }]}
			disclaimer="Rent ranges and neighbourhood descriptions are indicative only, based on general market knowledge as of early 2025. Actual rents vary by property type, condition, and season. This is not real-estate or financial advice: always verify with local agents."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("neighbourhood-explorer")),
				}}
			/>
			<NeighbourhoodExplorerClient />
		</ToolTemplate>
	);
}
