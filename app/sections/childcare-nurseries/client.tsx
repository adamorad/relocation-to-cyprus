"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import { ListingContact } from "@/components/ui/ListingContact";
import { ALL_CITIES, type City, NURSERIES } from "@/lib/childcare";
import { listingId } from "@/lib/food";

/** Filters first, then the nursery cards. Header and info live in page.tsx. */
export default function ChildcareNurseriesClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const visible = NURSERIES.filter(
		(n) => cityFilter === "All" || n.city === cityFilter,
	);

	return (
		<>
			<div className="rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="City"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All cities" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? `No nurseries listed for ${cityFilter} yet`
					: `${visible.length} nurser${visible.length === 1 ? "y" : "ies"}${
							cityFilter !== "All" ? ` in ${cityFilter}` : " across Cyprus"
						}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid cols={2} className="mt-5">
					{visible.map((n) => (
						<CardGridItem key={`${n.name}-${n.city}`} id={listingId(n.name)}>
							<Card
								variant="text"
								eyebrow={
									n.fullDay !== undefined ? (
										<Badge>{n.fullDay ? "Full day" : "Morning only"}</Badge>
									) : undefined
								}
								title={n.name}
								meta={
									<>
										{n.city}
										{n.neighbourhood ? ` · ${n.neighbourhood}` : ""}
										{n.ageRangeFrom !== undefined &&
										n.ageRangeTo !== undefined ? (
											<span className="mt-1 block">
												Ages{" "}
												{n.ageRangeFrom < 24
													? `${n.ageRangeFrom} months`
													: `${Math.floor(n.ageRangeFrom / 12)} yrs`}
												{" – "}
												{n.ageRangeTo} yrs
												{n.annualFeeFrom !== undefined
													? ` · from €${n.annualFeeFrom.toLocaleString()}/yr`
													: ""}
											</span>
										) : null}
										{n.languagesOffered?.length ? (
											<span className="block">
												Languages: {n.languagesOffered.join(", ")}
											</span>
										) : null}
									</>
								}
								text={n.why}
								footer={
									n.address || n.phone || n.email || n.website ? (
										<ListingContact
											address={n.address}
											phone={n.phone}
											email={n.email}
											website={n.website}
										/>
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
