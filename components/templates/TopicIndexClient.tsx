"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import {
	isItemTopicSlug,
	type ItemTopicSlug,
	itemTopicBySlug,
	PROPERTY_AREA,
	TOPIC_SLUGS,
	TOPICS,
} from "@/lib/topics";
import { UrlPrefilter, useUrlFilter } from "./UrlFilter";

export type IndexCard = {
	href: string;
	title: string;
	description: string;
	/** Primary topic, or "property" for the Property area. */
	topic: ItemTopicSlug;
};

/** "none" = an unknown `?topic=` value: shows the empty note, not every item. */
type Filter = ItemTopicSlug | "all" | "none";

/** The eight topics, then the Property area (`?topic=property`). */
const HOMES = [...TOPICS, PROPERTY_AREA];
const HOME_SLUGS: ReadonlyArray<ItemTopicSlug> = [
	...TOPIC_SLUGS,
	PROPERTY_AREA.slug,
];

const parseTopic = (q: string): Filter => (isItemTopicSlug(q) ? q : "none");

/**
 * Topic filter chips (URL-readable `?topic=`) and a card grid for the
 * /guides/, /sections/ and /tools/ indexes. Indexes filter by primary topic
 * only (hubs also list secondary items). The static HTML lists every item;
 * `UrlPrefilter` applies a preset `?topic=` before first paint, so there is
 * no layout jump. A topic with no items here, or an unknown one, shows an
 * empty note with a link back to everything.
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
	const {
		value: active,
		set: onChange,
		scopeRef,
	} = useUrlFilter<Filter>({
		param: "topic",
		path,
		initial: "all",
		parse: parseTopic,
	});

	const options: ChipOption<Filter>[] = [
		{ value: "all", label: "All", count: items.length },
		...HOMES.map((t) => ({
			value: t.slug,
			label: t.shortName,
			count: items.filter((i) => i.topic === t.slug).length,
		})).filter((o) => o.count > 0),
	];

	const visible =
		active === "all" ? items : items.filter((i) => i.topic === active);
	const activeTopic = isItemTopicSlug(active)
		? itemTopicBySlug(active)
		: undefined;
	const emptyTopics = HOME_SLUGS.filter(
		(t) => !items.some((i) => i.topic === t),
	);

	return (
		<div ref={scopeRef} suppressHydrationWarning>
			<UrlPrefilter
				param="topic"
				values={HOME_SLUGS}
				unknown="none"
				empty={emptyTopics}
			/>
			<ChipGroup
				label="Filter by topic"
				options={options}
				value={active}
				onChange={onChange}
			/>
			<h2 className="sr-only">
				{activeTopic
					? `${activeTopic.name} ${noun}`
					: active === "none"
						? `No ${noun}`
						: `All ${noun}`}
			</h2>
			{/* Always in the DOM (text never changes) so the pre-paint filter can show it. */}
			<div
				data-empty-note
				data-show={visible.length === 0 ? "" : undefined}
				className="mt-6 hidden rounded-card border border-line bg-sky p-5 data-show:block"
			>
				<p className="text-base text-ink">No {noun} match this topic yet.</p>
				<a
					href={path}
					onClick={(e) => {
						e.preventDefault();
						onChange("all");
					}}
					className="mt-2 inline-flex min-h-11 items-center font-semibold text-primary-hover underline underline-offset-2"
				>
					Show all {noun}
				</a>
			</div>
			<CardGrid className="mt-6">
				{visible.map((i) => {
					const topic = itemTopicBySlug(i.topic);
					return (
						<CardGridItem key={i.href} filter={i.topic}>
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
		</div>
	);
}
