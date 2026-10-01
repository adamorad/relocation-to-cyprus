import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { TAX_SRC } from "@/lib/facts/tax";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import VisaRenewalReminderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Visa & Document Renewal Reminder: Cyprus";
const description =
	"Track ARC card, passport, Cyprus visa, and driving licence expiry dates, see what needs renewing and when.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/visa-renewal-reminder/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/visa-renewal-reminder/`,
		type: "website",
	},
};

export default function VisaRenewalReminderPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			related={
				<>
					<SourcesNote
						className="mb-12"
						lastChecked="2026-10-02"
						sources={[TAX_SRC.digitalNomad, TAX_SRC.meu1]}
					/>
					<MoreOnTopic
						type="tool"
						slug="visa-renewal-reminder"
						exclude={[
							"/guides/permanent-residency-5year/",
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
					topicCrumb("tool", "visa-renewal-reminder"),
					{ label: "Visa Renewal Reminder" },
				],
				eyebrow: getTopicForTool("visa-renewal-reminder").name,
				title: "Visa & Document Renewal Reminder",
				intro:
					"Track expiry dates for your important documents: visas, ARC, passport, insurance, and more. Colour-coded alerts so nothing sneaks up on you.",
			}}
			nextSteps={[
				{
					href: "/guides/permanent-residency-5year/",
					label: "Read: Permanent Residency After 5 Years",
				},
				{
					href: "/sections/immigration-lawyers/",
					label: "Find an immigration lawyer",
				},
				{ href: "/tools/", label: "All tools" },
			]}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("visa-renewal-reminder")),
				}}
			/>
			<VisaRenewalReminderClient />
		</ToolTemplate>
	);
}
