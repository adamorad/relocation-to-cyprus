import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import EventsCalendarClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Annual Events & Festivals Calendar";
const description =
	"Cyprus annual events and festivals calendar , 30+ events across all districts, filterable by city and month.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/events-calendar/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/events-calendar/`,
		type: "website",
	},
};

export default function EventsCalendarClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Events Calendar" },
				],
				eyebrow: "Interactive tool",
				title: "Cyprus Annual Events & Festivals",
				intro:
					"Discover festivals, cultural events, and celebrations across Cyprus. Browse by month, filter by type or city.",
			}}
			nextSteps={[
				{
					href: "/guides/cultural-etiquette-guide/",
					label: "Read: Cultural Etiquette in Cyprus",
				},
				{ href: "/guides/", label: "Explore Cyprus guides" },
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("events-calendar")),
				}}
			/>
			<EventsCalendarClient />
		</ToolTemplate>
	);
}
