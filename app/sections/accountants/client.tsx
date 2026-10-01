"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ACCOUNTANT_SPEC_LABEL,
	ACCOUNTANTS,
	type AccountantSpecialization,
	ALL_ACCOUNTANT_SPECIALIZATIONS,
	ALL_CITIES,
	type City,
} from "@/lib/accountants";

/** Filters first, then the accountant cards. Header and info live in page.tsx. */
export default function AccountantsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specFilter, setSpecFilter] = useState<
		AccountantSpecialization | "All"
	>("All");

	const visible = ACCOUNTANTS.filter((a) => {
		const cityMatch = cityFilter === "All" || a.city === cityFilter;
		const specMatch =
			specFilter === "All" || a.specializations.includes(specFilter);
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
					label="Specialization"
					value={specFilter}
					onChange={(v) => setSpecFilter(v === specFilter ? "All" : v)}
					options={[
						{ value: "All", label: "All specializations" },
						...ALL_ACCOUNTANT_SPECIALIZATIONS.map((s) => ({
							value: s,
							label: ACCOUNTANT_SPEC_LABEL[s],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No accountants match the selected filters"
					: `${visible.length} accountant${visible.length === 1 ? "" : "s"}${
							cityFilter !== "All" ? ` in ${cityFilter}` : ""
						}${
							specFilter !== "All"
								? ` · ${ACCOUNTANT_SPEC_LABEL[specFilter]}`
								: ""
						}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid cols={2} className="mt-5">
					{visible.map((a) => (
						<CardGridItem key={`${a.name}-${a.firm}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{a.city}</Badge>}
								title={a.name}
								meta={a.firm}
								text={a.why}
								footer={
									<div className="space-y-2">
										<div className="flex flex-wrap gap-1.5">
											{a.specializations.map((s) => (
												<Badge key={s}>{ACCOUNTANT_SPEC_LABEL[s]}</Badge>
											))}
										</div>
										<div className="flex flex-wrap items-center gap-x-5 text-muted">
											<span>
												<span className="font-semibold text-ink">
													Languages:
												</span>{" "}
												{a.languages.join(", ")}
											</span>
											{a.website ? (
												<a
													href={a.website}
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
