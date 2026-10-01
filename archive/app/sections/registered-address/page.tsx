import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { REGISTERED_ADDRESS_TIPS } from "@/lib/registered-address";
import { topicCrumb } from "@/lib/topic-map";
import RegisteredAddressClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Registered Address Providers in Cyprus";
const description =
	"Registered address & virtual office providers in Cyprus: vetted services for Cyprus-incorporated companies across Limassol & Paphos.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/registered-address/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/registered-address/`,
		type: "website",
	},
};

export default function RegisteredAddressPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: REGISTERED_ADDRESS_TIPS.map((t) => ({
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
					topicCrumb("directory", "registered-address"),
					{ label: "Registered Address Providers" },
				],
				eyebrow: "Business Setup",
				title: "Registered Address Providers in Cyprus",
				intro:
					"Every Cyprus company legally needs a registered address. These providers offer the registered office service, with or without mail forwarding.",
			}}
			info={REGISTERED_ADDRESS_TIPS.map((t) => ({
				heading: t.heading,
				body: t.body,
			}))}
			infoTitle="What to know first"
			notice={{
				tone: "legal",
				title: "Disclaimer",
				content:
					"This is a general directory, not legal advice. Prices and service inclusions change frequently. Always verify directly with the provider before signing. For company formation or ongoing compliance, consult a Cyprus-licensed advocate or accountant.",
			}}
			related={
				<MoreOnTopic type="directory" slug="registered-address" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<RegisteredAddressClient />
		</DirectoryTemplate>
	);
}
