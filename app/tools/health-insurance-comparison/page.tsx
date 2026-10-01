import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import HealthInsuranceComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Private Health Insurance for Cyprus Residents";
const description =
	"Compare private health insurance for Cyprus residents from AXA, Bupa, Cigna, and Allianz , premiums, coverage, and GeSY compatibility.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/health-insurance-comparison/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/health-insurance-comparison/`,
		type: "website",
	},
};

export default function HealthInsuranceComparisonClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Health Insurance Comparison" },
				],
				eyebrow: "Health",
				title: "Private Health Insurance for Cyprus",
				intro:
					"Compare 8 insurance providers including GeSY as a baseline. Filter by your needs, then get a personal quote from your shortlist.",
			}}
			nextSteps={[
				{
					href: "/guides/gesy-registration-guide/",
					label: "Read: GeSY Registration Guide",
				},
				{
					href: "/sections/specialist-doctors/",
					label: "Find a specialist doctor",
				},
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Premiums shown are approximate 2025 estimates for a healthy non-smoker at indicated age brackets. Actual premiums depend on age, health history, chosen deductible, optional riders, and the specific plan tier. Waiting periods, exclusions and benefit limits vary significantly between plans. Always obtain a personal quote and read the policy terms before purchasing. We are not insurance brokers and do not receive commission from any provider listed here."
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						toolWebAppJsonLd("health-insurance-comparison"),
					),
				}}
			/>
			<HealthInsuranceComparisonClient />
		</ToolTemplate>
	);
}
