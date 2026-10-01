import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { HEALTH_TRANSPORT_CHECKED, SRC } from "@/lib/facts/health-transport";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import GrantsFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Business Grants Finder";
const description =
	"Search available grants, subsidies, and incentives for businesses in Cyprus , filterable by sector and eligibility.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/grants-finder/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/grants-finder/`,
		type: "website",
	},
};

export default function GrantsFinderClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="grants-finder"
					exclude={["/guides/trade-licenses-cyprus/", "/sections/accountants/"]}
					cols={3}
				/>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "grants-finder"),
					{ label: "Business Grants Finder" },
				],
				eyebrow: getTopicForTool("grants-finder").name,
				title: "Cyprus Business Grants Finder",
				intro:
					"Browse active and recently active grant programmes for businesses in Cyprus. Filter by sector, company size, and status.",
			}}
			nextSteps={[
				{
					href: "/guides/trade-licenses-cyprus/",
					label: "Read: Trade Licences in Cyprus",
				},
				{ href: "/sections/accountants/", label: "Find an accountant" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Grant programmes open and close frequently. Amounts, coverage percentages and deadlines change. Always verify current status and eligibility criteria directly at the official source before investing time in an application. This directory is for research purposes and was last checked on 2 October 2026."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("grants-finder")),
				}}
			/>
			<GrantsFinderClient />
			<SourcesNote
				lastChecked={HEALTH_TRANSPORT_CHECKED}
				sources={[SRC.rifCalls, SRC.fundingPortal, SRC.investEu]}
			/>
		</ToolTemplate>
	);
}
