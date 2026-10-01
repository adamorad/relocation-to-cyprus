import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { topicCrumb } from "@/lib/topic-map";
import BudgetBuilderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Monthly Cost of Living Calculator 2026: Budget by City";
const description =
	"Build a realistic monthly budget for living in Cyprus: choose your city (Limassol, Paphos, Larnaca, Ayia Napa), household size, and lifestyle. Rent, food, transport, and health insurance with 2026 market prices.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/budget-builder/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/budget-builder/`,
		type: "website",
	},
};

export default function BudgetBuilderPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="budget-builder"
					exclude={[
						"/tools/rent-vs-buy-calculator/",
						"/guides/cost-of-living/",
					]}
					cols={2}
				/>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "budget-builder"),
					{ label: "Monthly Budget Builder" },
				],
				eyebrow: "Interactive tool",
				title: "Cyprus Monthly Budget Builder",
				intro:
					"Estimate your monthly living costs in Cyprus. Adjust the options below and the budget updates instantly.",
			}}
			nextSteps={[
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{ href: "/guides/cost-of-living/", label: "Cost of Living Guide" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Figures are indicative estimates based on typical costs as of 2025. Actual costs vary by neighbourhood, landlord, season, and personal habits. This tool is for planning purposes only and is not financial advice. Always verify current market rates locally."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("budget-builder")),
				}}
			/>
			<BudgetBuilderClient />
		</ToolTemplate>
	);
}
