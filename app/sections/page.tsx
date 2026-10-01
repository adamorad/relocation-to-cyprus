import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { TopicIndexClient } from "@/components/templates/TopicIndexClient";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { primaryTopic } from "@/lib/topic-map";

const DIR_COUNT = SECTIONS_INDEX.length;
const title = "Local directories";
const DIR_DESC = `${DIR_COUNT} curated directories for everyday life in Cyprus: property lawyers, immigration specialists, accountants, coworking spaces, specialist doctors, expat communities, and more.`;

export const metadata: Metadata = {
	title,
	description: DIR_DESC,
	alternates: { canonical: "/sections/" },
	openGraph: {
		title,
		description: DIR_DESC,
		url: "https://realcy.app/sections/",
		type: "website",
	},
};

export default function SectionsIndexPage() {
	return (
		<HubTemplate
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Local directories" },
				],
				eyebrow: `${DIR_COUNT} directories`,
				title,
				intro:
					"Curated, researched directories covering practical needs in Cyprus, from property lawyers to expat communities.",
			}}
		>
			<TopicIndexClient
				path="/sections/"
				noun="directories"
				variant="icon"
				items={SECTIONS_INDEX.map((s) => ({
					href: `/sections/${s.slug}/`,
					title: s.name,
					description: s.description,
					topic: primaryTopic("directory", s.slug),
				}))}
			/>
		</HubTemplate>
	);
}
