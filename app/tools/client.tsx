"use client";

import { useState } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools-index";

type Filter = ToolCategory | "all";

const CATEGORY_ICON: Record<ToolCategory, IconName> = {
	"Visa & Residency": "paperwork",
	"Tax & Contributions": "legal",
	"Work & Business": "building",
	"Property & Rent": "home",
	"Cost & Budget": "budget",
	"Location & Living": "map",
	"Trackers & Calendars": "checklist",
};

const OPTIONS: ChipOption<Filter>[] = [
	{ value: "all", label: "All", count: TOOLS.length },
	...TOOL_CATEGORIES.map((cat) => ({
		value: cat,
		label: cat,
		count: TOOLS.filter((t) => t.category === cat).length,
	})),
];

/** Category filter chips and tool card grid for /tools/. */
export default function ToolsIndexClient() {
	const [active, setActive] = useState<Filter>("all");

	const visible =
		active === "all" ? TOOLS : TOOLS.filter((t) => t.category === active);

	return (
		<>
			<ChipGroup
				label="Filter by topic"
				options={OPTIONS}
				value={active}
				onChange={setActive}
			/>
			<h2 className="sr-only">{active === "all" ? "All tools" : active}</h2>
			<CardGrid className="mt-6">
				{visible.map((tool) => (
					<CardGridItem key={tool.href}>
						<Card
							variant="icon"
							icon={CATEGORY_ICON[tool.category as ToolCategory] ?? "checklist"}
							href={tool.href}
							title={tool.title}
							text={<span className="line-clamp-3">{tool.description}</span>}
							meta={<Badge>{tool.tag}</Badge>}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</>
	);
}
