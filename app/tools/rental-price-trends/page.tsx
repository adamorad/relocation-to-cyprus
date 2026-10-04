import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { RENT_SOURCES } from "@/lib/facts/rents";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import RentalPriceTrendsClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Rental Price Trends";
const description =
	"Median asking rents for 1, 2 and 3-bedroom apartments in Limassol, Paphos, Larnaca and Ayia Napa from a dated Bazaraki sample (1 October 2026), plus labelled earlier estimates.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/rental-price-trends/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
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
				<>
					<SourcesNote lastChecked="2026-10-02" sources={RENT_SOURCES} />
					<div className="mt-12">
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
					</div>
				</>
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
					"Median asking rents by city, from a dated Bazaraki sample (latest: 1 October 2026). Select a bedroom type; earlier estimates from 2021 to early 2025 are shown separately and labelled.",
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
				"Current figures are median asking rents from Bazaraki listings sampled on 1 October 2026; agreed rents are often lower. The 2021 to 2025 figures are unsourced estimates. Actual rents depend heavily on exact location, condition, furnishing, and negotiation. General information only, not legal, tax, or financial advice."
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
