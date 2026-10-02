import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { HEALTH_TRANSPORT_CHECKED, SRC } from "@/lib/facts/health-transport";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import DriversLicenceExchangeClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Driver's Licence Exchange";
const description =
	"Find out if you can directly exchange your foreign driving licence in Cyprus or whether you need to take theory and practical tests. Includes costs, required documents, and step-by-step guidance.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/drivers-licence-exchange/" },
	openGraph: {
		title,
		description,
		url: SITE_URL + "/tools/drivers-licence-exchange/",
		type: "website",
	},
};

export default function DriversLicenceExchangeClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic type="tool" slug="drivers-licence-exchange" cols={2} />
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "drivers-licence-exchange"),
					{ label: "Driver’s Licence Exchange" },
				],
				eyebrow: getTopicForTool("drivers-licence-exchange").name,
				title: "Driver’s Licence Exchange",
				intro:
					"Find out whether you can directly exchange your foreign driving licence in Cyprus or need to take tests. Get a personalised checklist and cost estimate.",
			}}
			nextSteps={[{ href: "/tools/", label: "All tools" }]}
			disclaimer="General information only, not legal, tax, or financial advice. Regulations and fees are subject to change. Always confirm current requirements with official Cyprus authorities before taking action."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("drivers-licence-exchange")),
				}}
			/>
			<DriversLicenceExchangeClient />
			<SourcesNote
				lastChecked={HEALTH_TRANSPORT_CHECKED}
				sources={[SRC.licenceConversion]}
			/>
		</ToolTemplate>
	);
}
