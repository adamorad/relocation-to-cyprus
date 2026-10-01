import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import TaxFilingCalendarClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Annual Tax Filing Calendar";
const description =
	"All key Cyprus annual tax deadlines colour-coded by urgency, IR1, IR4, VIES, VAT, and employer submissions.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/tax-filing-calendar/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/tax-filing-calendar/`,
		type: "website",
	},
};

export default function TaxFilingCalendarPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Tax Filing Calendar" },
				],
				eyebrow: "Interactive tool",
				title: "Cyprus Annual Tax Filing Calendar",
				intro:
					"All key Cyprus tax deadlines for the current year. The current month is highlighted and deadlines are marked by urgency.",
			}}
			nextSteps={[
				{
					href: "/guides/taxes-for-expats/",
					label: "Read: Taxes for Expats in Cyprus",
				},
				{ href: "/sections/accountants/", label: "Find a tax advisor" },
				{ href: "/tools/", label: "All tools" },
			]}
			disclaimer={
				"Deadlines change year to year and depend on your specific tax situation. Verify all deadlines with a Cyprus accountant. Late filing penalties apply, typically 5% of the tax due, with additional interest. Dates shown apply to electronic submissions where applicable; paper deadlines may differ."
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("tax-filing-calendar")),
				}}
			/>
			<TaxFilingCalendarClient />
		</ToolTemplate>
	);
}
