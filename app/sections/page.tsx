import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import SectionsIndexClient from "./client";

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
				breadcrumbs: [{ label: "Home", href: "/" }, { label: "Directories" }],
				eyebrow: `${DIR_COUNT} directories`,
				title,
				intro:
					"Curated, researched directories covering practical needs in Cyprus, from property lawyers to expat communities.",
			}}
		>
			<SectionsIndexClient />
		</HubTemplate>
	);
}
