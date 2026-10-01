"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_RENTAL_TYPES,
	type City,
	FURNISHED_LABEL,
	type FurnishedStatus,
	RENTAL_LISTINGS,
	RENTAL_TYPE_LABEL,
	type RentalType,
} from "@/lib/long-term-rentals";

const ALL_FURNISHED: ReadonlyArray<FurnishedStatus> = [
	"furnished",
	"unfurnished",
	"both",
];

/** Filters first, then the rental cards. Header and info live in page.tsx. */
export default function LongTermRentalsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<RentalType | "All">("All");
	const [furnishedFilter, setFurnishedFilter] = useState<
		FurnishedStatus | "All"
	>("All");

	const filtered = RENTAL_LISTINGS.filter((r) => {
		if (cityFilter !== "All" && r.city !== cityFilter) return false;
		if (typeFilter !== "All" && r.type !== typeFilter) return false;
		if (furnishedFilter !== "All") {
			if (furnishedFilter === "furnished" && r.furnished === "unfurnished")
				return false;
			if (furnishedFilter === "unfurnished" && r.furnished === "furnished")
				return false;
		}
		return true;
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
					label="Property type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_RENTAL_TYPES.map((t) => ({
							value: t,
							label: RENTAL_TYPE_LABEL[t],
						})),
					]}
				/>
				<ChipGroup
					label="Furnished"
					value={furnishedFilter}
					onChange={setFurnishedFilter}
					options={[
						{ value: "All", label: "All" },
						...ALL_FURNISHED.map((f) => ({
							value: f,
							label: FURNISHED_LABEL[f],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No listings match the current filters"
					: `${filtered.length} listing${filtered.length === 1 ? "" : "s"}${
							cityFilter !== "All" ? ` in ${cityFilter}` : " across all cities"
						}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((listing) => (
						<CardGridItem
							key={`${listing.name}-${listing.neighbourhood ?? ""}`}
						>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge className="capitalize">
											{RENTAL_TYPE_LABEL[listing.type]}
										</Badge>
										<Badge>
											{listing.bedroomsFrom === 0 && listing.bedroomsTo <= 1
												? "Studio / 1-bed"
												: listing.bedroomsFrom === listing.bedroomsTo
													? `${listing.bedroomsFrom} bed`
													: `${listing.bedroomsFrom}–${listing.bedroomsTo} bed`}
										</Badge>
										<Badge>{FURNISHED_LABEL[listing.furnished]}</Badge>
										{listing.petFriendly ? <Badge>Pet-friendly</Badge> : null}
									</span>
								}
								title={listing.name}
								meta={
									<>
										{listing.city}
										{listing.neighbourhood ? ` · ${listing.neighbourhood}` : ""}
									</>
								}
								text={listing.why}
								footer={
									<div className="flex items-center justify-between gap-3">
										{listing.monthlyFrom !== undefined &&
										listing.monthlyTo !== undefined ? (
											<p className="font-bold text-ink">
												€{listing.monthlyFrom.toLocaleString("en-GB")}
												{listing.monthlyTo !== listing.monthlyFrom
													? `–€${listing.monthlyTo.toLocaleString("en-GB")}`
													: ""}
												<span className="text-sm font-normal text-muted">
													{" "}
													/ month
												</span>
												<span className="block text-xs font-normal text-muted">
													District asking rents, 25th to 75th percentile
												</span>
											</p>
										) : (
											<p className="text-sm text-muted">
												Not sampled: check current listings
											</p>
										)}
										{listing.website ? (
											<a
												href={listing.website}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
											>
												Browse listings
											</a>
										) : null}
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
