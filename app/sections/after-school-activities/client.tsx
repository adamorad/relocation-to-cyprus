"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ACTIVITY_TYPE_LABEL,
	type ActivityType,
	AFTER_SCHOOL_ACTIVITIES,
	ALL_ACTIVITY_TYPES,
	ALL_CITIES,
	type City,
} from "@/lib/after-school";

/** Filters first, then the activity cards. Header and info live in page.tsx. */
export default function AfterSchoolActivitiesClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<ActivityType | "All">("All");

	const visible = AFTER_SCHOOL_ACTIVITIES.filter(
		(a) =>
			(cityFilter === "All" || a.city === cityFilter) &&
			(typeFilter === "All" || a.type === typeFilter),
	);

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
					label="Activity type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_ACTIVITY_TYPES.map((t) => ({
							value: t,
							label: ACTIVITY_TYPE_LABEL[t],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No activities match your filters"
					: `${visible.length} activit${visible.length === 1 ? "y" : "ies"}${
							cityFilter !== "All" ? ` in ${cityFilter}` : " across Cyprus"
						}${
							typeFilter !== "All"
								? ` · ${ACTIVITY_TYPE_LABEL[typeFilter]}`
								: ""
						}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid cols={2} className="mt-5">
					{visible.map((a) => (
						<CardGridItem key={`${a.name}-${a.city}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{ACTIVITY_TYPE_LABEL[a.type]}</Badge>}
								title={a.name}
								meta={
									<>
										{a.city}
										{a.neighbourhood ? ` · ${a.neighbourhood}` : ""}
										<span className="mt-1 block">
											Ages {a.ageRangeFrom}–{a.ageRangeTo} yrs
											{a.weeklyFeeApprox !== undefined
												? ` · ~€${a.weeklyFeeApprox}/week`
												: ""}
										</span>
										<span className="block">
											Languages: {a.languagesOffered.join(", ")}
										</span>
									</>
								}
								text={a.why}
								footer={
									a.website ? (
										<a
											href={a.website}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											Website
										</a>
									) : undefined
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			) : null}
		</>
	);
}
