import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { HEALTHCARE_TIPS } from "@/lib/healthcare";
import { SPECIALIST_TIPS } from "@/lib/specialist-doctors";
import { topicCrumb } from "@/lib/topic-map";
import SpecialistDoctorsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Specialist Doctors in Cyprus";
const description =
	"Specialist doctors in Cyprus for relocators: English-speaking consultants with GeSY & private options across Limassol, Paphos & Larnaca.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/specialist-doctors/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/specialist-doctors/`,
		type: "website",
	},
};

export default function SpecialistDoctorsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: HEALTHCARE_TIPS.map((t) => ({
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
					topicCrumb("directory", "specialist-doctors"),
					{ label: "Specialist Doctors" },
				],
				eyebrow: "Healthcare",
				title: "Specialist Doctors in Cyprus",
				intro:
					"English-speaking specialists across cardiology, oncology, orthopaedics, dermatology, fertility, paediatrics and more, covering private and GeSY providers in all major cities.",
			}}
			info={SPECIALIST_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know first"
			notice={{
				tone: "legal",
				content:
					"This directory is general information for relocators, not medical advice. Always verify GeSY acceptance status, clinic availability, and consultation fees directly with the provider before attending.",
			}}
			related={
				<MoreOnTopic type="directory" slug="specialist-doctors" cols={3} />
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<SpecialistDoctorsClient />
		</DirectoryTemplate>
	);
}
