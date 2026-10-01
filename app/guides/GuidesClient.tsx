"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import {
	ALL_GUIDE_CATEGORIES,
	GUIDE_CATEGORY_LABEL,
	GUIDES,
	type GuideCategory,
} from "@/lib/guides";

type Filter = GuideCategory | "all";

const OPTIONS: ChipOption<Filter>[] = [
	{ value: "all", label: "All", count: GUIDES.length },
	...ALL_GUIDE_CATEGORIES.map((cat) => ({
		value: cat,
		label: GUIDE_CATEGORY_LABEL[cat],
		count: GUIDES.filter((g) => g.category === cat).length,
	})),
];

/** Category filter chips and the guide card grid for /guides/. */
export default function GuidesClient() {
	const [active, setActive] = useState<Filter>("all");
	const visible =
		active === "all" ? GUIDES : GUIDES.filter((g) => g.category === active);

	return (
		<>
			<ChipGroup
				label="Filter by topic"
				options={OPTIONS}
				value={active}
				onChange={setActive}
			/>
			<h2 className="sr-only">
				{active === "all" ? "All guides" : GUIDE_CATEGORY_LABEL[active]}
			</h2>
			{visible.length === 0 ? (
				<p className="mt-8 text-base text-muted">
					No guides in this category yet.
				</p>
			) : (
				<CardGrid className="mt-6">
					{visible.map((g) => (
						<CardGridItem key={g.slug}>
							<Card
								variant="text"
								href={`/guides/${g.slug}/`}
								eyebrow={<Badge>{GUIDE_CATEGORY_LABEL[g.category]}</Badge>}
								title={g.title}
								text={<span className="line-clamp-3">{g.description}</span>}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			)}
		</>
	);
}
