import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { EV_TIPS } from "@/lib/ev-charging";
import { topicCrumb } from "@/lib/topic-map";
import EvChargingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "EV Charging Stations in Cyprus: Directory";
const description =
	"Public EV charging points by city with charger type and operator details.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/ev-charging/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/ev-charging/`,
		type: "website",
	},
};

export default function EvChargingPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: EV_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "ev-charging"),
					{ label: "EV Charging Stations" },
				],
				eyebrow: "EV Charging",
				title: "EV Charging Stations in Cyprus: Directory",
				intro:
					"Public charge points across all four cities. Operators, speeds, costs, and practical notes for EV drivers relocating to Cyprus.",
			}}
			info={EV_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="EV charging in Cyprus: key facts"
			related={
				<>
					<SourcesNote
						lastChecked="2026-10-02"
						sources={[
							{
								label: "My Mall Limassol: contact and address",
								url: "https://www.mymall.com.cy/contact-us/",
							},
							{
								label: "Aphrodite Hills Resort: contact and address",
								url: "https://www.aphroditehills.com/contact/",
							},
						]}
					/>
					<div className="mt-12">
						<MoreOnTopic type="directory" slug="ev-charging" cols={3} />
					</div>
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<EvChargingClient />
		</DirectoryTemplate>
	);
}
