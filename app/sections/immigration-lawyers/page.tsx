import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { IMMIGRATION_LAWYER_TIPS } from "@/lib/immigration-lawyers";
import { topicCrumb } from "@/lib/topic-map";
import ImmigrationLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Immigration Lawyers in Cyprus";
const description =
	"Immigration lawyers in Cyprus for relocators: specialists in digital nomad visas, PR by investment & work permits across Limassol & Paphos.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/immigration-lawyers/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/immigration-lawyers/`,
		type: "website",
	},
};

export default function ImmigrationLawyersPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: IMMIGRATION_LAWYER_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="immigration-lawyers"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "immigration-lawyers"),
					{ label: "Immigration Lawyers" },
				],
				eyebrow: "Professional Services",
				title: title,
				intro:
					"Specialists in the Digital Nomad Visa, Permanent Residency by Investment, work permits, and citizenship applications across all Cyprus cities.",
			}}
			info={IMMIGRATION_LAWYER_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="Before you engage an immigration lawyer"
			notice={{
				tone: "legal",
				content:
					"This is a directory, not legal advice. Always verify Bar Association registration and fee structures directly with the firm.",
			}}
			related={
				<>
					<SourcesNote
						className="mb-12"
						lastChecked="2026-10-02"
						sources={[
							{
								label:
									"Migration Department: Digital nomads and family members",
								url: "https://www.gov.cy/mip-md/en/documents/digital-nomads-and-family-members/",
							},
							{
								label:
									"Migration Department: Immigration permits for investors",
								url: "https://www.gov.cy/mip-md/en/documents/companies-investors-permanent-residence-3/immigration-permits-for-investors/",
							},
							{
								label:
									"Migration Department: frequent questions (EU citizens' permanent residence, MEU3)",
								url: "https://www.gov.cy/mip-md/en/documents/frequent-questions/",
							},
						]}
					/>
					<MoreOnTopic type="directory" slug="immigration-lawyers" cols={3} />
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<ImmigrationLawyersClient />
		</DirectoryTemplate>
	);
}
