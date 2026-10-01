import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { topicCrumb } from "@/lib/topic-map";
import RelocationCostCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Relocation Cost Calculator 2026: What It Costs to Move";
const description =
	"Calculate your one-time costs to relocate to Cyprus: international shipping, car import, visa fees, tenancy deposit, pet import, and more. Itemised low-to-high estimate with 2026 prices.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/relocation-cost-calculator/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/relocation-cost-calculator/`,
		type: "website",
	},
};

export default function RelocationCostCalculatorPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="relocation-cost-calculator"
					exclude={[
						"/tools/budget-builder/",
						"/tools/rent-vs-buy-calculator/",
						"/tools/mortgage-calculator/",
					]}
					cols={3}
				/>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "relocation-cost-calculator"),
					{ label: "Relocation Cost Estimator" },
				],
				eyebrow: "Finance",
				title: "Relocation Cost Estimator",
				intro:
					"Estimate your total one-time moving costs to Cyprus, from flights and shipping to deposits, furniture, and legal fees. Adjust the inputs and see a full itemised breakdown instantly.",
			}}
			nextSteps={[
				{ href: "/tools/budget-builder/", label: "Monthly Budget Builder" },
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{ href: "/tools/mortgage-calculator/", label: "Mortgage Calculator" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="General information only, not legal, tax, or financial advice. Cost ranges are indicative and based on publicly available market data for 2024-2025. Always obtain multiple quotes and consult qualified professionals before making financial decisions."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						toolWebAppJsonLd("relocation-cost-calculator"),
					),
				}}
			/>
			<RelocationCostCalculatorClient />
		</ToolTemplate>
	);
}
