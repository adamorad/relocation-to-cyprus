import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import IspComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title =
	"Best Broadband & Mobile Plans in Cyprus 2026: Cyta, Epic, Primetel, Cablenet";
const description =
	"Compare home broadband and mobile plans from all four Cyprus providers. Monthly costs, speeds, contract lengths, and coverage by city, with 2026 pricing.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/isp-comparison/" },
	openGraph: {
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
			width="wide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "ISP Comparison" },
				],
				eyebrow: "Interactive tool",
				title: "Internet & Mobile Providers in Cyprus",
				intro:
					"Compare home broadband and mobile carriers. Cyprus has fast internet: 1 Gbps fibre is available in urban areas for under €50/month.",
			}}
			nextSteps={[
				{
					href: "/guides/utilities-setup-guide/",
					label: "Setting Up Utilities in Cyprus",
				},
				{ href: "/guides/", label: "Explore Cyprus guides" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer="Plans and prices change frequently. Verify at provider websites before signing. Prices shown are indicative for 2025 entry-level packages at the highest advertised speed tier. Actual available speeds depend on your specific address and infrastructure type."
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
