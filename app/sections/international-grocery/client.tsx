"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_SPECIALTIES,
	type City,
	INTERNATIONAL_STORES,
	type Specialty,
} from "@/lib/international-grocery";

const PRICE_LABEL: Record<1 | 2 | 3, string> = {
	1: "€",
	2: "€€",
	3: "€€€",
};

/** Only offer filter values that at least one listed store has. */
const CITIES = ALL_CITIES.filter((c) =>
	INTERNATIONAL_STORES.some((s) => s.city === c),
);
const SPECIALTIES = ALL_SPECIALTIES.filter((sp) =>
	INTERNATIONAL_STORES.some((s) => s.specializes.includes(sp)),
);

/** Filters first, then the store cards. Header and info live in page.tsx. */
export default function InternationalGroceryClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | "All">(
		"All",
	);

	const visible = INTERNATIONAL_STORES.filter((s) => {
		const matchCity = cityFilter === "All" || s.city === cityFilter;
		const matchSpecialty =
			specialtyFilter === "All" ||
			s.specializes.includes(specialtyFilter as Specialty);
		return matchCity && matchSpecialty;
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
						...CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="Specialty"
					value={specialtyFilter}
					onChange={setSpecialtyFilter}
					options={[
						{ value: "All", label: "All types" },
						...SPECIALTIES.map((s) => ({ value: s, label: s })),
					]}
				/>
			</div>

			<p className="mt-6 text-base text-muted">
				We list only stores we could confirm in a public business listing. Most
				earlier entries could not be found and were removed, so this list is
				short for now. The supermarket chains and the tips below cover most
				imported staples.
			</p>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No stores match your filters"
					: `${visible.length} store${visible.length === 1 ? "" : "s"} found`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid className="mt-5">
					{visible.map((store) => (
						<CardGridItem key={`${store.name}-${store.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										{store.specializes.map((spec) => (
											<Badge key={spec}>{spec}</Badge>
										))}
									</span>
								}
								title={store.name}
								meta={
									<>
										{store.city}
										{store.neighbourhood ? ` · ${store.neighbourhood}` : ""}
										{" · "}
										<span className="font-semibold text-ink">
											{PRICE_LABEL[store.priceLevel]}
										</span>
									</>
								}
								text={store.why}
								footer={
									store.openingHours || store.website ? (
										<div className="flex flex-wrap items-center gap-x-5 text-muted">
											{store.openingHours ? (
												<span>
													<span className="font-semibold text-ink">Hours:</span>{" "}
													{store.openingHours}
												</span>
											) : null}
											{store.website ? (
												<a
													href={store.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Website
												</a>
											) : null}
										</div>
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
