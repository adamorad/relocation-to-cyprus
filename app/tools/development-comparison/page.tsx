import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import DevelopmentComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Compare Cyprus Developments";
const description =
	"Select up to 3 new-build developments and compare them side by side on price, location, specs, developer, and available bedrooms.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/development-comparison/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/development-comparison/`,
		type: "website",
	},
};

export default function DevelopmentComparisonClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Development Comparison" },
				],
				eyebrow: "Research",
				title: "Compare Cyprus Developments",
				intro:
					"Select up to 3 new-build developments and compare them side by side.",
			}}
			nextSteps={[
				{ href: "/listings/", label: "Browse all listings" },
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Development data is for general research only. Prices, specs, and availability change frequently. Always verify directly with the developer or agent before making any decisions."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("development-comparison")),
				}}
			/>
			<DevelopmentComparisonClient />
		</ToolTemplate>
	);
}
