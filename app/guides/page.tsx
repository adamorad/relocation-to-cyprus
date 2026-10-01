import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { GUIDES } from "@/lib/guides";
import GuidesClient from "./GuidesClient";

const SITE_URL = "https://realcy.app";
const title = "Guides for living in Cyprus";
const description =
	"Practical Cyprus guides: healthcare, transport, food, everyday admin, plus visas, tax, property and business setup for people planning a move.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/guides/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/guides/`,
		type: "website",
	},
};

export default function GuidesPage() {
	return (
		<HubTemplate
			header={{
				breadcrumbs: [{ label: "Home", href: "/" }, { label: "Guides" }],
				eyebrow: `${GUIDES.length} guides`,
				title,
				intro: description,
			}}
		>
			<GuidesClient />
		</HubTemplate>
	);
}
