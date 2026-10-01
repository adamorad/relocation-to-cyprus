"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	type City,
	PROPERTY_MANAGERS,
} from "@/lib/property-management";

/** Filter first, then the company cards. Header, tips and RERA note live in page.tsx. */
export default function PropertyManagementClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const filtered = PROPERTY_MANAGERS.filter(
		(m) => cityFilter === "All" || m.cities.includes(cityFilter),
	);

	return (
		<>
			<div className="rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="Filter by city served"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All cities" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} compan{filtered.length !== 1 ? "ies" : "y"}
				{cityFilter !== "All" ? ` serving ${cityFilter}` : " island-wide"}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No property managers listed for {cityFilter} yet. Check back soon.
				</Callout>
			) : (
				<CardGrid cols={2} className="mt-5">
					{filtered.map((manager) => (
						<CardGridItem key={manager.name}>
							<Card
								variant="text"
								eyebrow={
									manager.licensedByRERA ? <Badge>RERA Licensed</Badge> : null
								}
								title={manager.name}
								meta={manager.cities.join(" · ")}
								text={manager.why}
								footer={
									manager.website ? (
										<a
											href={manager.website}
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
			)}
		</>
	);
}
