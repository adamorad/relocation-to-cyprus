import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { type ItemType, moreOnTopic } from "@/lib/topic-map";
import { hubHref } from "@/lib/topics";

const KIND: Record<ItemType, string> = {
	guide: "Guide",
	directory: "Directory",
	tool: "Tool",
};

/**
 * "More on {Topic}": up to six guides, directories and tools that share the
 * item's primary topic (same city first, the item itself excluded), then a
 * link to the topic hub. Server component; pass it as a template's `related`.
 */
export function MoreOnTopic({
	type,
	slug,
	exclude,
	limit = 6,
	cols = 2,
}: {
	type: ItemType;
	slug: string;
	/** Hrefs already linked nearby (e.g. a tool's Next steps). */
	exclude?: string[];
	limit?: number;
	cols?: 2 | 3;
}) {
	const { topic, items } = moreOnTopic(type, slug, { limit, exclude });
	const hub = hubHref(topic);
	return (
		<div data-pagefind-ignore>
			<Section id="more-on-topic" title={`More on ${topic.name}`}>
				{items.length > 0 ? (
					<CardGrid cols={cols}>
						{items.map((i) => (
							<CardGridItem key={i.href}>
								<Card
									variant="text"
									href={i.href}
									eyebrow={<Badge>{KIND[i.type]}</Badge>}
									title={i.title}
									text={<span className="line-clamp-2">{i.description}</span>}
								/>
							</CardGridItem>
						))}
					</CardGrid>
				) : null}
				<p className={items.length > 0 ? "mt-6" : undefined}>
					<ButtonLink href={hub} variant="secondary">
						{`Browse ${topic.name}`}
					</ButtonLink>
				</p>
			</Section>
		</div>
	);
}
