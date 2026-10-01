import type { ReactNode } from "react";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { directoryCityCounts } from "@/lib/directory-cities";
import { itemsForTopic, type TopicItem } from "@/lib/topic-map";
import { CITY_NAME, CITY_SLUGS, hubHref, type Topic } from "@/lib/topics";
import { HubTemplate } from "./HubTemplate";
import { type HubCard, TopicHubClient } from "./TopicHubClient";

const toCard = (i: TopicItem): HubCard => {
	const counts =
		i.type === "directory" ? directoryCityCounts(i.slug) : undefined;
	return {
		href: i.href,
		title: i.title,
		description: i.description,
		cities: i.cities,
		...(counts ? { counts } : {}),
	};
};

/** Item counts for a topic hub (used in metadata descriptions). */
export function topicCounts(topic: Topic) {
	const items = itemsForTopic(topic);
	return {
		guides: items.guides.length,
		directories: items.directories.length,
		tools: items.tools.length,
	};
}

/**
 * Topic hub page body (the seven /{topic}/ hubs and /moving-to-cyprus/):
 * band header, city filter, Guides, Local directories, Tools, then
 * "Explore by city". Marked for Pagefind as type "topic".
 */
export function TopicHub({
	topic,
	intro,
}: {
	topic: Topic;
	/** Intro under the H1; defaults to the topic description. */
	intro?: ReactNode;
}) {
	const items = itemsForTopic(topic);
	const path = hubHref(topic);
	return (
		<HubTemplate
			pagefindType="topic"
			headerImage={topic.image}
			header={{
				breadcrumbs: [{ label: "Home", href: "/" }, { label: topic.name }],
				eyebrow: "Topic",
				title: topic.name,
				intro: intro ?? topic.description,
			}}
			after={
				<Section
					id="cities"
					title="Explore by city"
					description="Everyday life, areas and local listings in each city."
				>
					<CardGrid cols={4}>
						{CITY_SLUGS.map((c) => (
							<CardGridItem key={c}>
								<Card
									variant="row"
									icon="pin"
									href={`/regions/${c}/`}
									title={CITY_NAME[c]}
								/>
							</CardGridItem>
						))}
					</CardGrid>
				</Section>
			}
		>
			<TopicHubClient
				path={path}
				guides={items.guides.map(toCard)}
				directories={items.directories.map(toCard)}
				tools={items.tools.map(toCard)}
			/>
		</HubTemplate>
	);
}
