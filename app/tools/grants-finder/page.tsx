import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { HEALTH_TRANSPORT_CHECKED, SRC } from "@/lib/facts/health-transport";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import GrantsFinderClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Business Grants Finder";
const description =
	"Search available grants, subsidies, and incentives for businesses in Cyprus , filterable by sector and eligibility.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/grants-finder/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
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
					"Browse grant programmes for businesses in Cyprus, filtered by sector, company size and status. Most programmes could not be confirmed as open, so check each one on the government funding programmes portal before you apply.",
			}}
			nextSteps={[
				{
					href: "/guides/trade-licenses-cyprus/",
					label: "Read: Trade Licences in Cyprus",
				},
				{ href: "/sections/accountants/", label: "Find an accountant" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Grant programmes open and close frequently. This list was last reviewed on 2 October 2026, but for most programmes the current status, amounts and dates could not be confirmed, so none are shown. Check live calls on the government funding programmes portal and verify eligibility with the programme body before investing time in an application."
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
