import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import CountryComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus vs Europe , Relocation Country Comparison";
const description =
	"Compare Cyprus against Portugal, Malta, Greece, Spain and Italy across tax, property, cost of living, healthcare and visa routes.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/country-comparison/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/country-comparison/`,
		type: "website",
	},
};

export default function CountryComparisonClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Country Comparison" },
				],
				eyebrow: "Research",
				title: "Cyprus vs Europe",
				intro:
					"Compare Cyprus against Portugal, Malta, Greece, Spain and Italy across corporate tax, income tax, special regimes, property prices, cost of living, and visa options. All figures are indicative. Verify with a local advisor.",
			}}
			nextSteps={[
				{
					href: "/tools/tax-residency-tracker/",
					label: "Cyprus Tax Residency Planner",
				},
				{ href: "/tools/visa-pathway-finder/", label: "Visa Pathway Finder" },
				{
					href: "/tools/double-tax-treaty-finder/",
					label: "Double Tax Treaty Finder",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="All data is indicative and based on publicly available information as of 2025 to 2026. Tax rates, regime conditions, and visa rules change frequently. Always verify with a qualified local tax advisor or lawyer before making relocation decisions."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("country-comparison")),
				}}
			/>
			<CountryComparisonClient />
		</ToolTemplate>
	);
}
