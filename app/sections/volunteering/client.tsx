"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_FOCUS_AREAS,
	type City,
	FOCUS_LABEL,
	TIME_COMMITMENT_LABEL,
	VOLUNTEER_ORGS,
	type VolunteerFocus,
} from "@/lib/volunteering";

/** Filters first, then the organisation cards. Header and tips live in page.tsx. */
export default function VolunteeringClient() {
	const [cityFilter, setCityFilter] = useState<City | "Island-wide" | "All">(
		"All",
	);
	const [focusFilter, setFocusFilter] = useState<VolunteerFocus | "All">("All");

	const filtered = VOLUNTEER_ORGS.filter((org) => {
		const cityOk = cityFilter === "All" || org.city === cityFilter;
		const focusOk = focusFilter === "All" || org.focus === focusFilter;
		return cityOk && focusOk;
	});

	return (
		<>
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup<City | "Island-wide" | "All">
					label="City"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All cities" },
						{ value: "Island-wide", label: "Island-wide" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="Focus area"
					value={focusFilter}
					onChange={setFocusFilter}
					options={[
						{ value: "All", label: "All areas" },
						...ALL_FOCUS_AREAS.map((f) => ({
							value: f,
							label: FOCUS_LABEL[f],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length}{" "}
				{filtered.length === 1 ? "organisation" : "organisations"} found
			</h2>

			{filtered.length === 0 ? (
				<Callout
					tone="info"
					title="No organisations match these filters."
					className="mt-5"
				>
					Try broadening your city or focus area selection.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((org) => (
						<CardGridItem key={org.name}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{FOCUS_LABEL[org.focus]}</Badge>
										<Badge>{TIME_COMMITMENT_LABEL[org.timeCommitment]}</Badge>
									</span>
								}
								title={org.name}
								meta={org.city}
								text={org.why}
								footer={
									<>
										{org.languages.length > 0 ? (
											<p className="text-muted">
												<span className="font-semibold text-ink">
													Languages:{" "}
												</span>
												{org.languages.join(", ")}
											</p>
										) : null}
										{org.website ? (
											<a
												href={org.website}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
											>
												Visit website
											</a>
										) : null}
									</>
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			)}
		</>
	);
}
