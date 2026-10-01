import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { topicCrumb } from "@/lib/topic-map";
import VisaPathwayFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Visa Pathway Finder 2026: Find Your Route in 2 Questions";
const description =
	"Two questions to your Cyprus visa route: EU MEU1 registration, Digital Nomad Visa, Yellow Slip, or Permanent Residency by Investment. Updated 2026 income thresholds and requirements.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/visa-pathway-finder/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/visa-pathway-finder/`,
		type: "website",
	},
};

export default function VisaPathwayFinderPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="visa-pathway-finder"
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
					topicCrumb("tool", "visa-pathway-finder"),
					{ label: "Visa Pathway Finder" },
				],
				eyebrow: "Interactive tool",
				title: "Cyprus Visa Pathway Finder",
				intro:
					"Answer two questions to find the recommended visa or registration route for your situation. Each result includes the key requirement, processing time, and a link to the relevant guide.",
			}}
			nextSteps={[
				{
					href: "/guides/residency-and-visas/",
					label: "Residency and Visas guide",
				},
				{
					href: "/sections/immigration-lawyers/",
					label: "Find an immigration lawyer",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"This tool provides general guidance only. Immigration rules change frequently. Always verify current requirements with the Cyprus Civil Registry and Migration Department (crmd.moi.gov.cy) or a qualified immigration lawyer before making decisions."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("visa-pathway-finder")),
				}}
			/>
			<VisaPathwayFinderClient />
		</ToolTemplate>
	);
}
