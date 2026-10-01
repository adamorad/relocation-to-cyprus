import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import DoubleTaxTreatyFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Double Tax Treaty Finder";
const description =
	"Look up Cyprus double tax treaties with 65+ countries , withholding rates on dividends, interest, and royalties.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/double-tax-treaty-finder/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/double-tax-treaty-finder/`,
		type: "website",
	},
};

export default function DoubleTaxTreatyFinderClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="double-tax-treaty-finder"
					exclude={["/guides/non-dom-status-guide/", "/sections/accountants/"]}
					cols={3}
				/>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "double-tax-treaty-finder"),
					{ label: "Double Tax Treaty Finder" },
				],
				eyebrow: getTopicForTool("double-tax-treaty-finder").name,
				title: "Cyprus Double Tax Treaty Finder",
				intro:
					"Search Cyprus's ~57 countries covered by double tax treaties. See withholding tax rates on dividends, interest and royalties, and which countries have no treaty at all.",
			}}
			nextSteps={[
				{
					href: "/guides/non-dom-status-guide/",
					label: "Read: Non-Dom Status Guide",
				},
				{ href: "/sections/accountants/", label: "Find a tax advisor" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="For general reference only. Tax treaty application depends on your specific situation, the type of income, holding structure, and residency status. Treaty rates shown are the treaty-reduced rates; domestic rates may apply if conditions are not met. Always verify with a qualified Cyprus tax accountant before making decisions."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("double-tax-treaty-finder")),
				}}
			/>
			<DoubleTaxTreatyFinderClient />
		</ToolTemplate>
	);
}
