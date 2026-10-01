import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import SocialInsuranceCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title =
	"Cyprus Social Insurance Calculator 2026: Employee and Self-Employed Contributions";
const description =
	"Calculate 2026 Cyprus social insurance and GeSY contributions for employed and self-employed. Shows employee rate, employer rate, and annual totals for any income level.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/social-insurance-calculator/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/social-insurance-calculator/`,
		type: "website",
	},
};

export default function SocialInsuranceCalculatorPage() {
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
									"Business in Cyprus: Social insurance registration and contributions",
								url: "https://www.businessincyprus.gov.cy/social-insurance-registration-and-contributions/",
							},
							{
								label:
									"Social Insurance Services: Basic insurable earnings 1981-2026",
								url: "https://www.mlsi.gov.cy/mlsi/sid/sidv2.nsf/All/9AD159715525E49CC22584D90030E8FF?OpenDocument",
							},
							{
								label:
									"Tax Department: Guide to the 2025 tax return (Greek, PDF)",
								url: "https://www.gov.cy/media/sites/167/2026/06/Guide-for-completion-of-tax-return-2025-EL.pdf",
							},
						]}
					/>
					<MoreOnTopic
						type="tool"
						slug="social-insurance-calculator"
						exclude={["/guides/hiring-in-cyprus/", "/sections/accountants/"]}
						cols={2}
					/>
				</>
			}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "social-insurance-calculator"),
					{ label: "Social Insurance Calculator" },
				],
				eyebrow: getTopicForTool("social-insurance-calculator").name,
				title: "Cyprus Social Insurance Calculator",
				intro:
					"Calculate your Social Insurance and GeSY contributions based on 2026 rates. Adjust your salary and employment type to see a full breakdown.",
			}}
			nextSteps={[
				{ href: "/guides/hiring-in-cyprus/", label: "Read: Hiring in Cyprus" },
				{ href: "/sections/accountants/", label: "Find an accountant" },
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						toolWebAppJsonLd("social-insurance-calculator"),
					),
				}}
			/>
			<SocialInsuranceCalculatorClient />
		</ToolTemplate>
	);
}
