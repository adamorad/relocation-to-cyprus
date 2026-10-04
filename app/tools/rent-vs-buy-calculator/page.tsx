import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { TAX_SRC } from "@/lib/facts/tax";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import RentVsBuyCalculatorClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Rent vs Buy Calculator: Cyprus";
const description =
	"Should you rent or buy in Cyprus? Compare total cost over 1–10 years including mortgage, appreciation, and opportunity cost of your deposit.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/rent-vs-buy-calculator/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/tools/rent-vs-buy-calculator/`,
		type: "website",
	},
};

export default function RentVsBuyCalculatorPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<>
					<SourcesNote
						className="mb-12"
						lastChecked="2026-10-02"
						sources={[
							TAX_SRC.transferFees,
							TAX_SRC.reducedVat,
							TAX_SRC.vatRates,
							{
								label: "Advocates Law, Cap. 2 (CyLaw)",
								url: "https://www.cylaw.org/nomoi/enop/non-ind/0_2/full.html",
							},
							{
								label: "Judicare: Cyprus residential purchase pricing",
								url: "https://www.judicaregroup.com/pricing/cyprus-res-purchase-pricing/",
							},
						]}
					/>
					<MoreOnTopic
						type="tool"
						slug="rent-vs-buy-calculator"
						exclude={[
							"/sections/property-lawyers/",
							"/guides/buying-process/",
							"/guides/rental-transition-guide/",
						]}
						cols={2}
					/>
				</>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "rent-vs-buy-calculator"),
					{ label: "Rent vs Buy Calculator" },
				],
				eyebrow: getTopicForTool("rent-vs-buy-calculator").name,
				title: "Rent vs Buy Calculator",
				intro:
					"Compare the true cost of renting versus buying property in Cyprus over your chosen time horizon, accounting for mortgage costs, investment returns on your down payment, and property appreciation.",
			}}
			nextSteps={[
				{ href: "/", label: "Browse the property map" },
				{
					href: "/sections/property-lawyers/",
					label: "Find a property lawyer",
				},
				{
					href: "/guides/buying-process/",
					label: "Read: Buying Process Guide",
				},
				{
					href: "/guides/rental-transition-guide/",
					label: "Read: Short-Term to Long-Term Rental",
				},
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("rent-vs-buy-calculator")),
				}}
			/>
			<RentVsBuyCalculatorClient />
		</ToolTemplate>
	);
}
