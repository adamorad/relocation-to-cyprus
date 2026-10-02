import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import RelocationTrackerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Relocation Progress Tracker: 32 Tasks, Plan to Settled";
const description =
	"Track your relocation journey from planning to settling in. Your progress is saved in your browser. Four phases: pre-move planning, arrival week, month one, and settling in.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/relocation-checklist/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/relocation-checklist/`,
		type: "website",
	},
};

export default function RelocationChecklistPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="relocation-checklist"
					exclude={[
						"/tools/visa-pathway-finder/",
						"/tools/budget-builder/",
						"/tools/city-comparison/",
					]}
					cols={2}
				/>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "relocation-checklist"),
					{ label: "Relocation Progress Tracker" },
				],
				eyebrow: getTopicForTool("relocation-checklist").name,
				title: "Cyprus Relocation Progress Tracker",
				intro:
					"Track your relocation journey from planning to settling in. Check off each task as you complete it. Progress is saved in your browser.",
			}}
			nextSteps={[
				{ href: "/tools/visa-pathway-finder/", label: "Find your visa route" },
				{ href: "/tools/budget-builder/", label: "Build your budget" },
				{ href: "/tools/city-comparison/", label: "Compare cities" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="This tracker provides general guidance only and is not legal, tax, or financial advice. Requirements vary by nationality and residency route. Always verify with the Cyprus Tax Department, the Migration Department, and a qualified local adviser before making decisions."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("relocation-checklist")),
				}}
			/>
			<RelocationTrackerClient />
		</ToolTemplate>
	);
}
