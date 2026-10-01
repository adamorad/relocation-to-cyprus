import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import BankingFeeComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Banking Fee Comparison";
const description =
	"Compare monthly fees, transfer costs, and account types at Bank of Cyprus, Hellenic, AstroBank, Revolut, and Wise for Cyprus residents.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/banking-fee-comparison/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/banking-fee-comparison/`,
		type: "website",
	},
};

export default function BankingFeeComparisonClientPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Banking Fee Comparison" },
				],
				eyebrow: "Interactive tool",
				title: "Cyprus Banking Fee Comparison",
				intro:
					"Compare fees and features across the main banks available to Cyprus residents.",
			}}
			nextSteps={[
				{
					href: "/guides/banking-in-cyprus/",
					label: "Read: Banking in Cyprus Guide",
				},
				{ href: "/sections/accountants/", label: "Find an accountant" },
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("banking-fee-comparison")),
				}}
			/>
			<BankingFeeComparisonClient />
		</ToolTemplate>
	);
}
