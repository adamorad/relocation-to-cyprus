import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { RENT_SOURCES } from "@/lib/facts/rents";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import CityComparisonClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus City Comparison Tool";
const description =
	"Compare all 4 Cyprus cities side by side , rent, property prices, international schools, beach access, expat community, and more.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/city-comparison/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/tools/city-comparison/`,
		type: "website",
	},
};

export default function CityComparisonClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<>
					<SourcesNote lastChecked="2026-10-02" sources={RENT_SOURCES} />
					<div className="mt-12">
						<MoreOnTopic
							type="tool"
							slug="city-comparison"
							exclude={[
								"/sections/property-lawyers/",
								"/guides/best-areas-to-live-cyprus/",
								"/guides/cost-of-living/",
							]}
							cols={3}
						/>
					</div>
				</>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "city-comparison"),
					{ label: "City Comparison" },
				],
				eyebrow: getTopicForTool("city-comparison").name,
				title: "City Comparison",
				intro:
					"Compare key metrics across Cyprus cities side by side. Select 2 to 4 cities to compare.",
			}}
			nextSteps={[
				{ href: "/listings/", label: "Browse new developments" },
				{
					href: "/sections/property-lawyers/",
					label: "Find a property lawyer",
				},
				{
					href: "/guides/best-areas-to-live-cyprus/",
					label: "Read: Best Places to Live",
				},
				{
					href: "/guides/cost-of-living/",
					label: "Read: Cost of Living by City",
				},
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("city-comparison")),
				}}
			/>
			<CityComparisonClient />
		</ToolTemplate>
	);
}
