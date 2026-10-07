import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import IspComparisonClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Internet & Mobile Plans: Cyta, Epic, Primetel, Cablenet";
const description =
	"Compare 4 broadband providers and 3 mobile carriers in Cyprus side by side: coverage by city, technology and links to each provider's current plans. Verify prices before signing.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/isp-comparison/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/tools/isp-comparison/`,
		type: "website",
	},
};

export default function IspComparisonPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<MoreOnTopic
					type="tool"
					slug="isp-comparison"
					exclude={["/guides/utilities-setup-guide/"]}
					cols={3}
				/>
			}
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "isp-comparison"),
					{ label: "ISP Comparison" },
				],
				eyebrow: getTopicForTool("isp-comparison").name,
				title: "Internet & Mobile Providers in Cyprus",
				intro:
					"Compare home broadband and mobile carriers. Prices vary by provider, contract and bundle; check each provider's page.",
			}}
			nextSteps={[
				{
					href: "/guides/utilities-setup-guide/",
					label: "Setting Up Utilities in Cyprus",
				},
				{ href: "/guides/", label: "Explore Cyprus guides" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Plans and prices change frequently. Verify at provider websites before signing. Prices and speeds are not quoted here because they were not verified against provider pages as of 2026-10-07. Actual available speeds depend on your specific address and infrastructure type."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("isp-comparison")),
				}}
			/>
			<IspComparisonClient />
		</ToolTemplate>
	);
}
