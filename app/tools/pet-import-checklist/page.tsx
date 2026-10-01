import type { Metadata } from "next";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import PetImportChecklistClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Pet Import Checklist";
const description =
	"Generate a personalised checklist for importing your dog, cat, bird, or other pet into Cyprus. Covers microchipping, rabies titre tests, health certificates, and arrival procedures based on your pet type and country of origin.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/pet-import-checklist/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/pet-import-checklist/`,
		type: "website",
	},
};

export default function PetImportChecklistPage() {
	return (
		<ToolTemplate
			pagefindType="tool"
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Tools", href: "/tools/" },
					{ label: "Cyprus Pet Import Checklist" },
				],
				eyebrow: "Lifestyle",
				title: "Cyprus Pet Import Checklist",
				intro:
					"Answer two questions and get a personalised checklist of every step required to bring your pet into Cyprus, with timing guidance so nothing catches you off guard.",
			}}
			nextSteps={[{ href: "/tools/", label: "All tools" }]}
			disclaimer={
				<>
					General information only, not veterinary or legal advice. Always
					verify current requirements with{" "}
					<strong>Cyprus Veterinary Services (Ktiniatrikí Ypiresia)</strong>{" "}
					before travelling. Import rules can change without notice.
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(toolWebAppJsonLd("pet-import-checklist")),
				}}
			/>
			<PetImportChecklistClient />
		</ToolTemplate>
	);
}
