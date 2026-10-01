"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { isTopicSlug, TOPICS, type TopicSlug, topicBySlug } from "@/lib/topics";

export type IndexCard = {
	href: string;
	title: string;
	description: string;
	topic: TopicSlug;
};

type Filter = TopicSlug | "all";

/**
 * Topic filter chips (URL-readable `?topic=`) and a card grid for the
 * /guides/, /sections/ and /tools/ indexes. The static HTML lists every item
 * under "All"; the URL filter is applied after hydration.
 */
export function TopicIndexClient({
	path,
	items,
	noun,
	variant,
}: {
	/** Index path, e.g. "/guides/", used to write `?topic=` back to the URL. */
	path: string;
	items: IndexCard[];
	/** Plural noun for the hidden heading, e.g. "guides". */
	noun: string;
	/** `text`: topic badge above the title; `icon`: the topic's icon tile. */
	variant: "text" | "icon";
}) {
	const [active, setActive] = useState<Filter>("all");

	useEffect(() => {
		const q = new URLSearchParams(window.location.search).get("topic");
		if (isTopicSlug(q) && items.some((i) => i.topic === q)) setActive(q);
	}, [items]);

	function onChange(next: Filter) {
		setActive(next);
		const url = next === "all" ? path : `${path}?topic=${next}`;
		window.history.replaceState(null, "", url);
	}

	const options: ChipOption<Filter>[] = [
		{ value: "all", label: "All", count: items.length },
		...TOPICS.map((t) => ({
			value: t.slug,
			label: t.shortName,
			count: items.filter((i) => i.topic === t.slug).length,
		})).filter((o) => o.count > 0),
	];

	const visible =
		active === "all" ? items : items.filter((i) => i.topic === active);
	const activeTopic = active === "all" ? undefined : topicBySlug(active);

	return (
		<>
			<ChipGroup
				label="Filter by topic"
				options={options}
				value={active}
				onChange={onChange}
			/>
			<h2 className="sr-only">
				{activeTopic ? `${activeTopic.name} ${noun}` : `All ${noun}`}
			</h2>
			<CardGrid className="mt-6">
				{visible.map((i) => {
					const topic = topicBySlug(i.topic);
					return (
						<CardGridItem key={i.href}>
							{variant === "text" ? (
								<Card
									variant="text"
									href={i.href}
									eyebrow={topic ? <Badge>{topic.name}</Badge> : undefined}
									title={i.title}
									text={<span className="line-clamp-3">{i.description}</span>}
								/>
							) : (
								<Card
									variant="icon"
									icon={topic?.icon ?? "pin"}
									href={i.href}
									title={i.title}
									text={<span className="line-clamp-3">{i.description}</span>}
									meta={topic ? <Badge>{topic.name}</Badge> : undefined}
								/>
							)}
						</CardGridItem>
					);
				})}
			</CardGrid>
		</>
	);
}
