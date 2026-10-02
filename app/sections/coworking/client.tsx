"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_COWORK_TYPES,
	type City,
	COWORK_SPACES,
	COWORK_TYPE_LABEL,
	type CoworkSpaceType,
	NOISE_LEVEL_LABEL,
} from "@/lib/coworking";

/** Filters first, then the space cards. Header and info live in page.tsx. */
export default function CoworkingClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<CoworkSpaceType | "All">("All");

	const visible = COWORK_SPACES.filter(
		(s) =>
			(cityFilter === "All" || s.city === cityFilter) &&
			(typeFilter === "All" || s.type === typeFilter),
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
					label="Type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_COWORK_TYPES.map((t) => ({
							value: t,
							label: COWORK_TYPE_LABEL[t],
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
					? "No spaces match these filters"
					: `${visible.length} space${visible.length === 1 ? "" : "s"}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid className="mt-5">
					{visible.map((space) => (
						<CardGridItem key={space.name}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{COWORK_TYPE_LABEL[space.type]}</Badge>
										<Badge>{NOISE_LEVEL_LABEL[space.noiseLevel]}</Badge>
									</span>
								}
								title={space.name}
								meta={
									<>
										{space.city}
										{space.neighbourhood ? ` · ${space.neighbourhood}` : ""}
										<span className="mt-1 flex flex-wrap gap-x-3">
											{space.dayPassEuros != null ? (
												<span>
													Day:{" "}
													<span className="font-semibold text-ink">
														€{space.dayPassEuros}
													</span>
												</span>
											) : null}
											{space.monthlyHotDesk != null ? (
												<span>
													Hot desk:{" "}
													<span className="font-semibold text-ink">
														€{space.monthlyHotDesk}/mo
													</span>
												</span>
											) : null}
											{space.monthlyDedicatedDesk != null ? (
												<span>
													Dedicated:{" "}
													<span className="font-semibold text-ink">
														€{space.monthlyDedicatedDesk}/mo
													</span>
												</span>
											) : null}
											{space.wifiMbps != null ? (
												<span>
													WiFi:{" "}
													<span className="font-semibold text-ink">
														{space.wifiMbps} Mbps
													</span>
												</span>
											) : null}
										</span>
									</>
								}
								text={space.why}
								footer={
									<div className="space-y-2">
										{space.amenities.length > 0 ? (
											<div className="flex flex-wrap gap-1.5">
												{space.amenities.map((a) => (
													<Badge key={a}>{a}</Badge>
												))}
											</div>
										) : null}
										<div className="flex items-center justify-between gap-3">
											<p className="text-xs text-muted">
												Verified {space.verifiedDate}
											</p>
											{space.website ? (
												<a
													href={space.website}
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
