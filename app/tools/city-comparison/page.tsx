import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import CityComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus City Comparison Tool";
const description =
	"Compare all 4 Cyprus cities side by side , rent, property prices, international schools, beach access, expat community, and more.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/city-comparison/" },
	openGraph: {
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
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "City Comparison" },
				],
				eyebrow: "Interactive tool",
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
					href: "/guides/family-neighborhoods-guide/",
					label: "Read: Family Neighbourhoods Guide",
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
