import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import {
	PROPERTY_MANAGEMENT_TIPS,
	PROPERTY_MANAGERS,
} from "@/lib/property-management";
import { topicCrumb } from "@/lib/topic-map";
import PropertyManagementClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = `${PROPERTY_MANAGERS.length} Property Managers in Cyprus: Limassol, Paphos, Larnaca`;
const description = `Directory of ${PROPERTY_MANAGERS.length} property management companies in Cyprus. Filter by Limassol, Paphos or Larnaca, see what each offers, and what to check before you sign.`;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/property-management/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/property-management/`,
		type: "website",
	},
};

export default function PropertyManagementPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: PROPERTY_MANAGEMENT_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="property-management"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "property-management"),
					{ label: "Property Management" },
				],
				eyebrow: "Property Management",
				title: "Property Management in Cyprus",
				intro:
					"Licensed property managers across Limassol, Paphos, and Larnaca, for non-resident owners who need trusted local management of their Cyprus investment.",
			}}
			info={PROPERTY_MANAGEMENT_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="What to check before you engage"
			notice={{
				tone: "warning",
				title: "Verify any agent",
				content: (
					<>
						The Cyprus Real Estate Agents Registration Council (RERA) register
						is searchable at{" "}
						<a
							href="https://realestate.gov.cy"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold underline"
						>
							realestate.gov.cy
						</a>
						. Always cross-check the company AND individual agent name before
						signing any management agreement.
					</>
				),
			}}
			related={
				<MoreOnTopic type="directory" slug="property-management" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<PropertyManagementClient />
		</DirectoryTemplate>
	);
}
