import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
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
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Driver’s Licence Exchange" },
				],
				eyebrow: "Bureaucracy",
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
		</ToolTemplate>
	);
}
