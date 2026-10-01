import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { RENT_SOURCES } from "@/lib/facts/rents";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import BudgetBuilderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Monthly Cost of Living Calculator 2026: Budget by City";
const description =
	"Build a realistic monthly budget for living in Cyprus: choose your city (Limassol, Paphos, Larnaca, Ayia Napa), household size, and lifestyle. Rent from October 2026 median asking rents; food, transport and health insurance are estimates from 2025.";

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
				<>
					<SourcesNote lastChecked="2026-10-02" sources={RENT_SOURCES} />
					<div className="mt-12">
						<MoreOnTopic
							type="tool"
							slug="budget-builder"
							exclude={[
								"/tools/rent-vs-buy-calculator/",
								"/guides/cost-of-living/",
							]}
							cols={2}
						/>
					</div>
				</>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "budget-builder"),
					{ label: "Monthly Budget Builder" },
				],
				eyebrow: getTopicForTool("budget-builder").name,
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
			disclaimer="Rent uses median asking rents from October 2026 (Bazaraki); other costs are estimates from 2025, not yet re-checked. Asking rents are often above agreed rents. Actual costs vary by neighbourhood, landlord, season, and personal habits. This tool is for planning purposes only and is not financial advice. Always verify current market rates locally."
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
