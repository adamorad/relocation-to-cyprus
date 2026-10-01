import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { HEALTH_TRANSPORT_CHECKED, SRC } from "@/lib/facts/health-transport";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import SchoolFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "International School Finder: Cyprus";
const description =
	"Find and compare international schools in Cyprus. Filter by city, curriculum (British, IB), and age group. Includes fees and key details for expat families.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/school-finder/" },
	openGraph: {
		title,
		description,
		url: SITE_URL + "/tools/school-finder/",
		type: "website",
	},
};

export default function SchoolFinderPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={<MoreOnTopic type="tool" slug="school-finder" cols={3} />}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "school-finder"),
					{ label: "International School Finder" },
				],
				eyebrow: getTopicForTool("school-finder").name,
				title: "International School Finder",
				intro:
					"Find and compare international schools in Cyprus. Filter by city, curriculum, and age group to shortlist the right options for your family.",
			}}
			nextSteps={[
				{ href: "/guides/", label: "Browse guides" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"General information only, not legal, tax, or financial advice. This list is curated but not exhaustive. Several smaller and local private schools are not included. Always verify details directly with each school before making any decisions."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("school-finder")),
				}}
			/>
			<SchoolFinderClient />
			<SourcesNote
				lastChecked={HEALTH_TRANSPORT_CHECKED}
				sources={[
					SRC.schoolRegister,
					SRC.heritageFees,
					SRC.foleysFees,
					SRC.grammarFees,
					SRC.ispFees,
				]}
			/>
		</ToolTemplate>
	);
}
