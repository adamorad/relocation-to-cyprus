import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import VisaPathwayFinderClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Visa Pathway Finder 2026: Find Your Route in 2 Questions";
const description =
	"Two questions to your Cyprus visa route: EU MEU1 registration, Digital Nomad Visa, Yellow Slip, or Permanent Residency by Investment. Updated 2026 income thresholds and requirements.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/visa-pathway-finder/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
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
				<>
					<SourcesNote
						className="mb-12"
						lastChecked="2026-10-02"
						sources={[
							{
								label:
									"Migration Department: Immigration permits for investors",
								url: "https://www.gov.cy/mip-md/en/documents/companies-investors-permanent-residence-3/immigration-permits-for-investors/",
							},
							{
								label:
									"Migration Department: Digital nomads and family members",
								url: "https://www.gov.cy/mip-md/en/documents/digital-nomads-and-family-members/",
							},
							{
								label: "Migration Department: Visitors and family members",
								url: "https://www.gov.cy/mip-md/en/documents/visitors-and-family-members/",
							},
							{
								label:
									"Migration Department: Registration of EU citizens (MEU1)",
								url: "https://www.gov.cy/mip-md/en/documents/e-u-e-e-a-citizens-and-family-members-2/e-u-e-e-a-citizens-family-member/registration-of-e-u-citizens-and-members-of-their-families-who-are-also-e-u-e-e-a-citizens-meu1/",
							},
						]}
					/>
					<MoreOnTopic
						type="tool"
						slug="visa-pathway-finder"
						exclude={[
							"/guides/residency-and-visas/",
							"/sections/immigration-lawyers/",
						]}
						cols={2}
					/>
				</>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "visa-pathway-finder"),
					{ label: "Visa Pathway Finder" },
				],
				eyebrow: getTopicForTool("visa-pathway-finder").name,
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
				"This tool provides general guidance only. Immigration rules change frequently. Always verify current requirements with the Migration Department (gov.cy/mip-md) or a qualified immigration lawyer before making decisions."
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
