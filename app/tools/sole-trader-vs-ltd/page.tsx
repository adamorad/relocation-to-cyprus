import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import SoleTraderVsLtdClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Sole Trader vs Ltd";
const description =
	"Compare operating as a Cyprus sole trader versus a Cyprus Ltd. Tab between take-home pay comparison and Ltd formation cost calculator, all in one place.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/sole-trader-vs-ltd/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/sole-trader-vs-ltd/`,
		type: "website",
	},
};

export default function SoleTraderVsLtdPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Sole Trader vs Ltd" },
				],
				eyebrow: "Business",
				title: "Sole Trader vs Ltd",
				intro:
					"Two tools in one: compare take-home pay as a sole trader versus a Cyprus Ltd, then estimate what it actually costs to set up and run a limited company.",
			}}
			nextSteps={[
				{ href: "/sections/accountants/", label: "Find an accountant" },
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("sole-trader-vs-ltd")),
				}}
			/>
			<SoleTraderVsLtdClient />
		</ToolTemplate>
	);
}
