import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { TAX_SRC } from "@/lib/facts/tax";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import TaxResidencyPlannerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus 60-Day Tax Residency Planner";
const description =
	"Check if you qualify for Cyprus tax residency under the 60-day rule, track your days in Cyprus against the annual threshold.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/tax-residency-tracker/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/tax-residency-tracker/`,
		type: "website",
	},
};

export default function TaxResidencyTrackerPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<>
					<SourcesNote
						className="mb-12"
						lastChecked="2026-10-02"
						sources={[
							{
								label:
									"Tax Department: Income Tax Law amendments 2026 (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/03/2026-ΦορΜεταρρύθμιση-Φόρος-Εισοδήματος.pdf",
							},
							{
								label: "Tax Department: Tax Reform 2026",
								url: "https://www.gov.cy/mof-tax/en/documents/forologiki-metarrythmisi-2026/",
							},
							TAX_SRC.individualReturn,
						]}
					/>
					<MoreOnTopic
						type="tool"
						slug="tax-residency-tracker"
						exclude={["/guides/taxes-for-expats/", "/sections/accountants/"]}
						cols={2}
					/>
				</>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "tax-residency-tracker"),
					{ label: "Tax Residency Planner" },
				],
				eyebrow: getTopicForTool("tax-residency-tracker").name,
				title: "Cyprus 60-Day Tax Residency Planner",
				intro:
					"Adjust the sliders to see whether you qualify for Cyprus tax residency under the 183-day rule or the more complex 60-day rule. Results update instantly.",
			}}
			nextSteps={[
				{
					href: "/guides/taxes-for-expats/",
					label: "Read: Taxes for Expats in Cyprus",
				},
				{ href: "/sections/accountants/", label: "Find a tax advisor" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"Cyprus Tax Department has tightened audit on 60-day claims. Maintain a day diary with proof of presence (boarding passes, hotel receipts, card transactions). Consult a Cyprus tax accountant before filing. This tool provides general information only and is not tax advice."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("tax-residency-tracker")),
				}}
			/>
			<TaxResidencyPlannerClient />
		</ToolTemplate>
	);
}
