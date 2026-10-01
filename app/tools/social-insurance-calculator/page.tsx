import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
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
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Social Insurance Calculator" },
				],
				eyebrow: "Interactive tool",
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
