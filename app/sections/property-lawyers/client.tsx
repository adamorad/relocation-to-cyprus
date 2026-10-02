"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	type City,
	PROPERTY_LAWYERS,
} from "@/lib/property-lawyers";

const ALL_SPECIALIZATIONS = [
	"conveyancing",
	"title deed transfer",
	"new-build contracts",
	"foreign buyer representation",
	"mortgage assistance",
	"due diligence",
	"title deed disputes",
	"off-plan purchases",
	"PR by investment",
	"resale properties",
	"Council of Ministers approval",
	"commercial property",
	"inheritance and succession",
	"buy-to-let",
	"short-term rental registration",
] as const;

/** Filters first, then the lawyer cards. Header, tips and disclaimer live in page.tsx. */
export default function PropertyLawyersClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specFilter, setSpecFilter] = useState<string>("All");

	const visible = PROPERTY_LAWYERS.filter((l) => {
		const cityMatch = cityFilter === "All" || l.city === cityFilter;
		const specMatch =
			specFilter === "All" ||
			l.specializations.some((s) =>
				s.toLowerCase().includes(specFilter.toLowerCase()),
			);
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
				<ChipGroup<string>
					label="Specialization"
					value={specFilter}
					onChange={(v) => setSpecFilter(v === specFilter ? "All" : v)}
					options={[
						{ value: "All", label: "All specializations" },
						...ALL_SPECIALIZATIONS.map((s) => ({ value: s, label: s })),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				Showing {visible.length} lawyer{visible.length !== 1 ? "s" : ""}
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{specFilter !== "All" ? ` · ${specFilter}` : ""}
			</h2>

			{visible.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No lawyers match the selected filters. Try removing a filter.
				</Callout>
			) : (
				<CardGrid cols={2} className="mt-5">
					{visible.map((lawyer) => (
						<CardGridItem key={`${lawyer.name}-${lawyer.firm}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{lawyer.city}</Badge>}
								title={lawyer.name}
								meta={lawyer.firm}
								text={lawyer.why}
								footer={
									<>
										<p className="flex flex-wrap gap-1.5 pb-2">
											{lawyer.specializations.map((s) => (
												<Badge key={s}>{s}</Badge>
											))}
										</p>
										<p className="text-muted">
											<span className="font-semibold text-ink">
												Languages:{" "}
											</span>
											{lawyer.languages.join(", ")}
										</p>
										<div className="flex flex-wrap gap-x-5 gap-y-1">
											{lawyer.website ? (
												<a
													href={lawyer.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Website
												</a>
											) : null}
											{lawyer.phone ? (
												<a
													href={`tel:${lawyer.phone}`}
													className="inline-flex min-h-11 items-center font-semibold text-ink underline-offset-2 hover:underline"
												>
													{lawyer.phone}
												</a>
											) : null}
										</div>
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
