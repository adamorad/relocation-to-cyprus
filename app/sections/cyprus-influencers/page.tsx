import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SEO_DESCRIPTION, SEO_TITLE } from "@/lib/cyprus-influencers";
import { topicCrumb } from "@/lib/topic-map";
import CyprusInfluencersClient from "./client";

const SITE_URL = "https://realcy.app";

export const metadata: Metadata = {
	title: SEO_TITLE,
	description: SEO_DESCRIPTION,
	alternates: { canonical: "/sections/cyprus-influencers/" },
	openGraph: {
		title: SEO_TITLE,
		description: SEO_DESCRIPTION,
		url: `${SITE_URL}/sections/cyprus-influencers/`,
		type: "website",
	},
};

export default function CyprusInfluencersPage() {
	return (
		<DirectoryTemplate
			slug="cyprus-influencers"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "cyprus-influencers"),
					{ label: "Cyprus Influencers" },
				],
				eyebrow: "Community",
				title: SEO_TITLE,
				intro:
					"Instagram and TikTok accounts worth following for news, places, expat life, language, food and cooking in Cyprus.",
			}}
			related={
				<MoreOnTopic type="directory" slug="cyprus-influencers" cols={3} />
			}
		>
			<CyprusInfluencersClient />
		</DirectoryTemplate>
	);
}
