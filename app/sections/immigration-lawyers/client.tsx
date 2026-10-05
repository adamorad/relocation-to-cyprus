"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_IMMIGRATION_SPECIALIZATIONS,
	type City,
	IMMIGRATION_LAWYERS,
	IMMIGRATION_SPEC_LABEL,
	type ImmigrationSpecialization,
} from "@/lib/immigration-lawyers";

/** Filters first, then the lawyer cards. Header and info live in page.tsx. */
export default function ImmigrationLawyersClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specFilter, setSpecFilter] = useState<
		ImmigrationSpecialization | "All"
	>("All");

	const visible = IMMIGRATION_LAWYERS.filter((l) => {
		const cityMatch = cityFilter === "All" || l.city === cityFilter;
		const specMatch =
			specFilter === "All" || l.specializations.includes(specFilter);
		return cityMatch && specMatch;
	});

	return (
		<>
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="City"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All cities" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="Visa type"
					value={specFilter}
					onChange={(v) => setSpecFilter(v === specFilter ? "All" : v)}
					options={[
						{ value: "All", label: "All visa types" },
						...ALL_IMMIGRATION_SPECIALIZATIONS.map((s) => ({
							value: s,
							label: IMMIGRATION_SPEC_LABEL[s],
						})),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No lawyers match the selected filters"
					: `${visible.length} lawyer${visible.length === 1 ? "" : "s"}${
							cityFilter !== "All" ? ` in ${cityFilter}` : ""
						}${
							specFilter !== "All"
								? ` · ${IMMIGRATION_SPEC_LABEL[specFilter]}`
								: ""
						}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid cols={2} className="mt-5">
					{visible.map((l) => (
						<CardGridItem key={`${l.name}-${l.firm}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{l.city}</Badge>}
								title={l.name}
								meta={l.firm}
								text={l.why}
								footer={
									<div className="space-y-2">
										<div className="flex flex-wrap gap-1.5">
											{l.specializations.map((s) => (
												<Badge key={s}>{IMMIGRATION_SPEC_LABEL[s]}</Badge>
											))}
										</div>
										<div className="flex flex-wrap items-center gap-x-5 text-muted">
											{l.languages?.length ? (
												<span>
													<span className="font-semibold text-ink">
														Languages:
													</span>{" "}
													{l.languages.join(", ")}
												</span>
											) : null}
											{l.website ? (
												<a
													href={l.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Website
												</a>
											) : null}
										</div>
									</div>
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			) : null}
		</>
	);
}
