import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { topicCrumb } from "@/lib/topic-map";
import { itemListJsonLd } from "@/lib/item-list-jsonld";
import { VET_CLINICS, VET_TIPS } from "@/lib/veterinary";
import VeterinaryServicesClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Veterinary Services in Cyprus";
const description =
	"English-speaking vet clinics with emergency care and specialist referrals.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/veterinary-services/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/veterinary-services/`,
		type: "website",
	},
};

export default function VeterinaryServicesPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: VET_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	const listJsonLd = itemListJsonLd(
		"Veterinary Services in Cyprus",
		VET_CLINICS.map((c) => ({
			name: c.name,
			url: c.website,
			telephone: c.phone,
		})),
	);

	return (
		<DirectoryTemplate
			slug="veterinary-services"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "veterinary-services"),
					{ label: "Veterinary Services" },
				],
				eyebrow: "Services",
				title: "Veterinary Services in Cyprus",
				intro:
					"English-friendly vet clinics across all four major cities, routine care, emergency cover, specialist referrals, and exotic animal services. Includes 24/7 emergency locations.",
			}}
			info={VET_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			notice={{
				tone: "info",
				content:
					"Opening hours, emergency cover arrangements, and staff availability change. Always confirm directly with the clinic before travelling. For a genuine pet emergency, call ahead even if the clinic is listed as 24/7.",
			}}
			related={
				<MoreOnTopic type="directory" slug="veterinary-services" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
			/>
			<VeterinaryServicesClient />
		</DirectoryTemplate>
	);
}
