import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import MortgageCalculatorClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Mortgage Calculator";
const description =
	"Calculate your monthly mortgage payment and total cost for a Cyprus property purchase.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/mortgage-calculator/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/tools/mortgage-calculator/`,
		type: "website",
	},
};

export default function MortgageCalculatorPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="mortgage-calculator"
					exclude={[
						"/tools/rent-vs-buy-calculator/",
						"/tools/tax-residency-tracker/",
					]}
					cols={2}
				/>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "mortgage-calculator"),
					{ label: "Mortgage Calculator" },
				],
				eyebrow: getTopicForTool("mortgage-calculator").name,
				title: "Cyprus Mortgage Calculator",
				intro:
					"Estimate your monthly repayment, total interest, and amortization schedule for a Cyprus property purchase.",
			}}
			nextSteps={[
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{ href: "/", label: "Browse the property map" },
				{
					href: "/tools/tax-residency-tracker/",
					label: "Tax Residency Planner",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="This calculator is for illustrative purposes only and does not constitute financial advice. Actual mortgage rates, LTV limits, fees, and eligibility criteria vary by bank and applicant profile. Always consult a licensed mortgage adviser and your chosen bank before making financial decisions."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("mortgage-calculator")),
				}}
			/>
			<MortgageCalculatorClient />
		</ToolTemplate>
	);
}
