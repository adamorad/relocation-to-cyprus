"use client";

import { useState } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import {
	SECTION_CATEGORIES,
	SECTIONS_INDEX,
	type SectionCategory,
} from "@/lib/sections-index";

type Filter = SectionCategory | "all";

const CATEGORY_ICON: Record<SectionCategory, IconName> = {
	"Property & Housing": "home",
	"Legal & Professional": "legal",
	Business: "building",
	"Family & Education": "community",
	Healthcare: "healthcare",
	"Active Living": "heart",
	"Getting Around": "transport",
	Community: "community",
	"Arts & Culture": "pin",
	"Food & Drink": "shopping",
};

const OPTIONS: ChipOption<Filter>[] = [
	{ value: "all", label: "All", count: SECTIONS_INDEX.length },
	...SECTION_CATEGORIES.map((cat) => ({
		value: cat,
		label: cat,
		count: SECTIONS_INDEX.filter((s) => s.category === cat).length,
	})),
];

/** Category filter chips and directory card grid for /sections/. */
export default function SectionsIndexClient() {
	const [active, setActive] = useState<Filter>("all");

	const visible =
		active === "all"
			? SECTIONS_INDEX
			: SECTIONS_INDEX.filter((s) => s.category === active);

	return (
		<>
			<ChipGroup
				label="Filter by category"
				options={OPTIONS}
				value={active}
				onChange={setActive}
			/>
			<h2 className="sr-only">
				{active === "all" ? "All directories" : active}
			</h2>
			<CardGrid className="mt-6">
				{visible.map((s) => (
					<CardGridItem key={s.slug}>
						<Card
							variant="icon"
							icon={CATEGORY_ICON[s.category as SectionCategory] ?? "pin"}
							href={`/sections/${s.slug}`}
							title={s.name}
							text={<span className="line-clamp-3">{s.description}</span>}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</>
	);
}
