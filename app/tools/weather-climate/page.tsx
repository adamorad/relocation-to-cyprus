import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import WeatherClimateClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Weather & Climate";
const description =
	"Explore Cyprus weather month by month, temperatures, sea warmth, rain days, and UV index. Compare Cyprus climate against London, Amsterdam, Berlin, New York, Toronto, and more.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/weather-climate/" },
	openGraph: {
		title,
		description,
		url: SITE_URL + "/tools/weather-climate/",
		type: "website",
	},
};

export default function WeatherClimatePage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Cyprus Weather & Climate" },
				],
				eyebrow: "Lifestyle",
				title: "Cyprus Weather & Climate",
				intro:
					"340+ sunny days a year, warm summers, and mild winters. Explore Cyprus month by month and compare against cities you know.",
			}}
			nextSteps={[
				{ href: "/guides/cost-of-living/", label: "Cost of Living Guide" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"Climate data represents long-term historical averages and is for general guidance only, not a forecast. Actual conditions vary by year, elevation, and location within Cyprus."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("weather-climate")),
				}}
			/>
			<WeatherClimateClient />
		</ToolTemplate>
	);
}
