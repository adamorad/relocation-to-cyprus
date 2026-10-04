import type { Metadata } from "next";
import Link from "next/link";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { RENT_SOURCES } from "@/lib/facts/rents";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import NeighbourhoodExplorerClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Neighbourhood Explorer";
const description =
	"Explore and compare neighbourhoods across Cyprus cities. Filter by vibe, beach access, expat density, schools, and value for money to find your ideal area.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/neighbourhood-explorer/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
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
				<>
					<SourcesNote lastChecked="2026-10-02" sources={RENT_SOURCES} />
					<div className="mt-12">
						<MoreOnTopic type="tool" slug="neighbourhood-explorer" cols={3} />
					</div>
				</>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "neighbourhood-explorer"),
					{ label: "Neighbourhood Explorer" },
				],
				eyebrow: getTopicForTool("neighbourhood-explorer").name,
				title: "Neighbourhood Explorer",
				intro:
					"Browse neighbourhoods across Cyprus and find the area that fits your lifestyle. Filter by city and vibe, then compare up to 3 areas side by side.",
			}}
			nextSteps={[{ href: "/tools/", label: "All tools" }]}
			disclaimer={
				<>
					Rent ranges are unsourced estimates from early 2025. For current
					district medians, see{" "}
					<Link
						href="/tools/rental-price-trends/"
						className="underline underline-offset-2"
					>
						rent data, October 2026
					</Link>
					. Neighbourhood descriptions are indicative only. Actual rents vary by
					property type, condition, and season. This is not real-estate or
					financial advice: always verify with local agents.
				</>
			}
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
