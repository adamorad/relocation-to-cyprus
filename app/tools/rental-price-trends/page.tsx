import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import RentalPriceTrendsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Rental Price Trends";
const description =
	"Track how apartment rents have changed across Limassol, Paphos, Larnaca, and Ayia Napa since 2021. Interactive charts for 1BR, 2BR, and 3BR units with year-on-year comparisons.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/rental-price-trends/" },
	openGraph: {
		title,
		description,
		url: SITE_URL + "/tools/rental-price-trends/",
		type: "website",
	},
};

export default function RentalPriceTrendsPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="rental-price-trends"
					exclude={[
						"/tools/rent-vs-buy-calculator/",
						"/tools/rental-yield-calculator/",
						"/tools/mortgage-calculator/",
					]}
					cols={3}
				/>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "rental-price-trends"),
					{ label: "Cyprus Rental Price Trends" },
				],
				eyebrow: getTopicForTool("rental-price-trends").name,
				title: "Cyprus Rental Price Trends",
				intro:
					"Monthly asking rents across Limassol, Paphos, Larnaca, and Ayia Napa from 2021 to 2025. Select a bedroom type and toggle cities to explore the data.",
			}}
			nextSteps={[
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{
					href: "/tools/rental-yield-calculator/",
					label: "Rental Yield Calculator",
				},
				{ href: "/tools/mortgage-calculator/", label: "Mortgage Calculator" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"Figures are estimates based on aggregated public market data. Actual rents depend heavily on exact location, condition, furnishing, and negotiation. General information only, not legal, tax, or financial advice."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("rental-price-trends")),
				}}
			/>
			<RentalPriceTrendsClient />
		</ToolTemplate>
	);
}
