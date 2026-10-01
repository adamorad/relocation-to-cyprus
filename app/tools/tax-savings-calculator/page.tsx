import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import TaxSavingsCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Non-Dom Tax Calculator 2026: See Your Annual Tax Saving";
const description =
	"Enter your income and source country to calculate your exact tax saving under Cyprus's Non-Dom regime. Side-by-side comparison of income tax, dividend tax, and social insurance vs your current country.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/tax-savings-calculator/" },
	openGraph: {
		title,
		description,
		url: SITE_URL + "/tools/tax-savings-calculator/",
		type: "website",
	},
};

export default function TaxSavingsCalculatorPage() {
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
									"Tax Department: Special Defence Contribution reform 2026 (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/03/EEA-ΦΚΚ-ΜΕΤΑΡΡΥΘΜΙΣΗ-06032026.pdf",
							},
							{
								label:
									"Tax Department: Tax reform 2026 for individuals (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/05/Φορολογική-Μεταρρύθμιση-2026-φυσικά-πρόσωπα-11.05.2026.pdf",
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
						slug="tax-savings-calculator"
						exclude={[
							"/tools/tax-residency-tracker/",
							"/tools/double-tax-treaty-finder/",
							"/tools/sole-trader-vs-ltd/",
						]}
						cols={2}
					/>
				</>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "tax-savings-calculator"),
					{ label: "Cyprus Tax Savings Calculator" },
				],
				eyebrow: getTopicForTool("tax-savings-calculator").name,
				title: "Cyprus Tax Savings Calculator",
				intro:
					"Compare your current country's tax burden against Cyprus Standard and Non-Dom regimes. See your estimated annual saving at a glance.",
			}}
			nextSteps={[
				{
					href: "/tools/tax-residency-tracker/",
					label: "Tax Residency Planner",
				},
				{
					href: "/tools/double-tax-treaty-finder/",
					label: "Double Tax Treaty Finder",
				},
				{ href: "/tools/sole-trader-vs-ltd/", label: "Sole Trader vs Ltd" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"General information only, not legal, tax, or financial advice."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("tax-savings-calculator")),
				}}
			/>
			<TaxSavingsCalculatorClient />
		</ToolTemplate>
	);
}
