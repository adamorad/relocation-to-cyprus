import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import RentalYieldCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Rental Yield Calculator";
const description =
	"Calculate gross yield, net yield, and return on investment for a Cyprus buy-to-let property.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/rental-yield-calculator/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/rental-yield-calculator/`,
		type: "website",
	},
};

export default function RentalYieldCalculatorPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="rental-yield-calculator"
					exclude={[
						"/sections/property-management/",
						"/guides/buying-process/",
						"/tools/rent-vs-buy-calculator/",
					]}
					cols={2}
				/>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "rental-yield-calculator"),
					{ label: "Rental Yield Calculator" },
				],
				eyebrow: getTopicForTool("rental-yield-calculator").name,
				title: "Cyprus Rental Yield Calculator",
				intro:
					"Calculate gross yield, net yield, annual cash flow, and total return for a Cyprus buy-to-let investment. Models appreciation and expenses over up to 15 years.",
			}}
			nextSteps={[
				{
					href: "/sections/property-management/",
					label: "Find a property manager",
				},
				{
					href: "/guides/buying-process/",
					label: "Read: Buying Process Guide",
				},
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"This calculator provides general estimates for illustrative purposes only and does not constitute financial or tax advice. Yields, expenses, and appreciation rates vary significantly by location and property type. Always verify IPT rates, rental income tax obligations, and market conditions with a qualified Cyprus accountant before making investment decisions."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("rental-yield-calculator")),
				}}
			/>
			<RentalYieldCalculatorClient />
		</ToolTemplate>
	);
}
