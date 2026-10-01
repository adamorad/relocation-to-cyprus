import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import Meu1TrackerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "MEU1 Registration Tracker: Cyprus EU Residency Checklist";
const description =
	"Interactive checklist for EU citizens registering their residence in Cyprus (MEU1). Track required documents and steps to completion.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/meu1-tracker/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/meu1-tracker/`,
		type: "website",
	},
};

export default function Meu1TrackerPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="meu1-tracker"
					exclude={[
						"/guides/residency-and-visas/",
						"/sections/immigration-lawyers/",
					]}
					cols={2}
				/>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "meu1-tracker"),
					{ label: "MEU1 Registration Tracker" },
				],
				eyebrow: getTopicForTool("meu1-tracker").name,
				title: "MEU1 Registration Tracker",
				intro:
					"An interactive checklist for EU citizens registering their residence in Cyprus (MEU1 / EU Registration Certificate). Check off each step as you complete it. Progress is saved in your browser.",
			}}
			nextSteps={[
				{
					href: "/guides/residency-and-visas/",
					label: "Cyprus Residency & Visas Guide",
				},
				{
					href: "/sections/immigration-lawyers/",
					label: "Find an immigration lawyer",
				},
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("meu1-tracker")),
				}}
			/>
			<Meu1TrackerClient />
		</ToolTemplate>
	);
}
