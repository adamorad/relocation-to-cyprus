import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { topicCrumb } from "@/lib/topic-map";
import PriceBenchmarkerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Property Price Benchmarker";
const description =
	"See how your property's asking price compares to similar developments in the same region. Based on real listings data from across Cyprus.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/price-benchmarker/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/price-benchmarker/`,
		type: "website",
	},
};

export default function PriceBenchmarkerPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="price-benchmarker"
					exclude={[
						"/tools/rent-vs-buy-calculator/",
						"/tools/city-comparison/",
					]}
					cols={2}
				/>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "price-benchmarker"),
					{ label: "Property Price Benchmarker" },
				],
				eyebrow: "Research",
				title: "Cyprus Property Price Benchmarker",
				intro:
					"See how your property's asking price compares to similar developments in the same region.",
			}}
			nextSteps={[
				{
					href: "/tools/rent-vs-buy-calculator/",
					label: "Rent vs Buy Calculator",
				},
				{ href: "/tools/city-comparison/", label: "City Comparison" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Prices are extracted from publicly listed development data and are indicative only. Prices vary by unit, floor, and negotiation. This tool does not constitute financial or investment advice. Always verify directly with the developer or agent."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("price-benchmarker")),
				}}
			/>
			<PriceBenchmarkerClient />
		</ToolTemplate>
	);
}
