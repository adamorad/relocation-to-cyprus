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
const title = `Property Management Cyprus: ${PROPERTY_MANAGERS.length} Companies by City`;
const description = `Property management in Cyprus: ${PROPERTY_MANAGERS.length} companies in Limassol, Paphos and Larnaca, what each offers, and what to check in a management agreement before you sign.`;

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
					`Property management in Cyprus means a local company that finds tenants, collects rent, handles repairs and looks after the property while you are abroad. This directory lists ${PROPERTY_MANAGERS.length} property management companies in Limassol, Paphos and Larnaca. If a company also arranges lets or finds tenants, ask whether it is registered with the Council of Real Estate Agents (ktimatomesites.com).`,
			}}
			info={[
				{
					heading: "What property managers in Cyprus usually do",
					body: "Tenant search, rent collection, maintenance and repairs, and regular property inspections. Services differ by company, so ask for the list in writing.",
				},
				...PROPERTY_MANAGEMENT_TIPS.map((t) => ({
					heading: t.heading,
					body: t.body,
				})),
			]}
			infoTitle="What to check before you engage"
			notice={{
				tone: "warning",
				title: "Verify any agent",
				content: (
					<>
						The Council of Real Estate Agents register is searchable at{" "}
						<a
							href="https://ktimatomesites.com/agents/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold underline"
						>
							ktimatomesites.com
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
