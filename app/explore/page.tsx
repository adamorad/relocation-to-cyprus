import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { allTopicItems } from "@/lib/topic-map";
import { hubHref, TOPICS } from "@/lib/topics";
import ExploreClient from "./ExploreClient";

const SITE_URL = "https://realcy.app";
const title = "Search guides, directories and tools";
const description =
	"Search every guide, directory, tool, city page and new development on RealCy.app, or browse by topic.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/explore/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/explore/`,
		type: "website",
	},
};

type BrowseGroup = {
	title: string;
	href?: string;
	items: { name: string; href: string }[];
};

/**
 * One group per topic: the heading links to the topic hub, then the listed
 * directories whose primary topic it is (de-listed directories never
 * appear). Built from lib/topics.ts and lib/topic-map.ts, so it follows the
 * topic structure. Replaces the old private category list (archived at
 * archive/app/explore/categories.ts).
 */
const directories = allTopicItems().filter(
	(i) => i.type === "directory" && i.listed,
);
const BROWSE: BrowseGroup[] = [
	...TOPICS.map((t) => ({
		title: t.name,
		href: hubHref(t),
		items: directories
			.filter((d) => d.topic === t.slug)
			.map((d) => ({ name: d.title, href: d.href })),
	})),
	{
		title: "More ways to browse",
		items: [
			{ name: "All guides", href: "/guides/" },
			{ name: "All tools", href: "/tools/" },
			{ name: "All local directories", href: "/sections/" },
			{ name: "Cities", href: "/regions/" },
			{ name: "New developments", href: "/listings/" },
		],
	},
];

export default function ExplorePage() {
	return (
		<TemplateMain>
			<PageHeader
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
				eyebrow="Search"
				title="Search RealCy.app"
				intro="Find guides, directories, tools, city pages and new developments."
			/>
			<Container width="wide" className="pt-8">
				<Suspense fallback={<div className="min-h-11" aria-hidden="true" />}>
					<ExploreClient />
				</Suspense>

				<Section title="Browse by topic" className="mt-12">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{BROWSE.map((group) => (
							<div
								key={group.title}
								className="rounded-card border border-line bg-white p-5"
							>
								<h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
									{group.href ? (
										<Link
											href={group.href}
											className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:text-primary-hover hover:underline"
										>
											{group.title}
										</Link>
									) : (
										group.title
									)}
								</h3>
								<ul className="space-y-1.5">
									{group.items.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className="flex min-h-11 items-center py-1 text-sm text-ink transition-colors hover:text-primary-hover"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</Section>
			</Container>
		</TemplateMain>
	);
}
