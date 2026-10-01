import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import SoleTraderVsLtdClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Sole Trader vs Ltd";
const description =
	"Compare operating as a Cyprus sole trader versus a Cyprus Ltd. Tab between take-home pay comparison and Ltd formation cost calculator, all in one place.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/sole-trader-vs-ltd/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/sole-trader-vs-ltd/`,
		type: "website",
	},
};

export default function SoleTraderVsLtdPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Sole Trader vs Ltd" },
				],
				eyebrow: "Business",
				title: "Sole Trader vs Ltd",
				intro:
					"Two tools in one: compare take-home pay as a sole trader versus a Cyprus Ltd, then estimate what it actually costs to set up and run a limited company.",
			}}
			nextSteps={[
				{ href: "/sections/accountants/", label: "Find an accountant" },
				{
					href: "/guides/company-types-comparison/",
					label: "Company types in Cyprus",
				},
				{ href: "/guides/taxes-for-expats/", label: "Taxes for expats" },
				{
					href: "/tools/social-insurance-calculator/",
					label: "Social insurance calculator",
				},
				{
					href: "/tools/tax-residency-tracker/",
					label: "Tax residency planner",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				<>
					This page provides a general orientation only, not legal, tax or
					financial advice. Tax rates shown are estimates based on simplified
					assumptions, and setup fees are market estimates for 2025. Your actual
					position depends on your income mix, deductions, residency status,
					home-country obligations and the structure of your business, and costs
					vary by service provider. Confirm with a qualified Cyprus accountant
					(and, where relevant, a tax adviser in your home country), and request
					quotes from 2 to 3 licensed fiduciaries before making decisions.
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("sole-trader-vs-ltd")),
				}}
			/>
			<SoleTraderVsLtdClient />
		</ToolTemplate>
	);
}
