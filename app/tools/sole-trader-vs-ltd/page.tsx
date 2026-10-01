import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
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
			related={
				<>
					<SourcesNote
						className="mb-12"
						lastChecked="2026-10-02"
						sources={[
							{
								label:
									"Tax Department: Tax reform 2026 for individuals (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/05/Φορολογική-Μεταρρύθμιση-2026-φυσικά-πρόσωπα-11.05.2026.pdf",
							},
							{
								label:
									"Tax Department: Special Defence Contribution reform 2026 (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/03/EEA-ΦΚΚ-ΜΕΤΑΡΡΥΘΜΙΣΗ-06032026.pdf",
							},
							{
								label:
									"Tax Department: Income Tax Law amendments 2026 (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/03/2026-ΦορΜεταρρύθμιση-Φόρος-Εισοδήματος.pdf",
							},
							{
								label:
									"Tax Department: Guide to the 2025 tax return (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/06/Guide-for-completion-of-tax-return-2025-EL.pdf",
							},
						]}
					/>
					<MoreOnTopic
						type="tool"
						slug="sole-trader-vs-ltd"
						exclude={[
							"/sections/accountants/",
							"/guides/company-types-comparison/",
							"/guides/taxes-for-expats/",
							"/tools/social-insurance-calculator/",
							"/tools/tax-residency-tracker/",
						]}
						cols={3}
					/>
				</>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "sole-trader-vs-ltd"),
					{ label: "Sole Trader vs Ltd" },
				],
				eyebrow: getTopicForTool("sole-trader-vs-ltd").name,
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
					assumptions, and setup fees are market estimates gathered in 2025, not
					yet re-checked. Your actual position depends on your income mix,
					deductions, residency status, home-country obligations and the
					structure of your business, and costs vary by service provider.
					Confirm with a qualified Cyprus accountant (and, where relevant, a tax
					adviser in your home country), and request quotes from 2 to 3 licensed
					fiduciaries before making decisions.
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
