import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { TopicIndexClient } from "@/components/templates/TopicIndexClient";
import { GUIDES } from "@/lib/guides";
import { getAssignment } from "@/lib/topic-map";

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
			<TopicIndexClient
				path="/guides/"
				noun="guides"
				variant="text"
				items={GUIDES.map((g) => ({
					href: `/guides/${g.slug}/`,
					title: g.title,
					description: g.description,
					// biome-ignore lint/style/noNonNullAssertion: completeness is asserted at build
					topic: getAssignment("guide", g.slug)!.topic,
				}))}
			/>
		</HubTemplate>
	);
}
