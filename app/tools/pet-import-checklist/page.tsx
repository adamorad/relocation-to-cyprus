import type { Metadata } from "next";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ToolTemplate } from "@/components/templates/ToolTemplate";
import { toolWebAppJsonLd } from "@/lib/tool-schema";
import { getTopicForTool, topicCrumb } from "@/lib/topic-map";
import PetImportChecklistClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Pet Import Checklist";
const description =
	"Generate a personalised checklist for importing your dog, cat, bird, or other pet into Cyprus. Covers microchipping, rabies titre tests, health certificates, and arrival procedures based on your pet type and country of origin.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/pet-import-checklist/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
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
			related={<MoreOnTopic type="tool" slug="pet-import-checklist" cols={2} />}
			width="reading"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("tool", "pet-import-checklist"),
					{ label: "Cyprus Pet Import Checklist" },
				],
				eyebrow: getTopicForTool("pet-import-checklist").name,
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
