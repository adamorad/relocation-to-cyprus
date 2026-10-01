import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { topicCrumb } from "@/lib/topic-map";
import FlightConnectivityClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Flight Connectivity";
const description =
	"Direct flight routes from Larnaca (LCA) and Paphos (PFO) airports , browse connections by destination country and airline.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/flight-connectivity/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/flight-connectivity/`,
		type: "website",
	},
};

export default function FlightConnectivityClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="flight-connectivity"
					exclude={["/guides/airport-transfers-guide/"]}
					cols={3}
				/>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "flight-connectivity"),
					{ label: "Flight Connectivity" },
				],
				eyebrow: "Interactive tool",
				title: "Cyprus Flight Connectivity",
				intro:
					"Explore direct routes from Larnaca (LCA) and Paphos (PFO) airports. Search by destination, filter by airport or schedule.",
			}}
			nextSteps={[
				{
					href: "/guides/airport-transfers-guide/",
					label: "Read: Getting Around Cyprus",
				},
				{ href: "/explore/", label: "Explore Cyprus by region" },
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("flight-connectivity")),
				}}
			/>
			<FlightConnectivityClient />
		</ToolTemplate>
	);
}
