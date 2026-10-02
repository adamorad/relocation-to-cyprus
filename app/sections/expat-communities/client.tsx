"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_PLATFORMS,
	type City,
	EXPAT_COMMUNITIES,
	PLATFORM_LABEL,
	type Platform,
} from "@/lib/expat-communities";

/** Filters first, then the group cards. Header and info live in page.tsx. */
export default function ExpatCommunitiesClient() {
	const [cityFilter, setCityFilter] = useState<City | "Island-wide" | "All">(
		"All",
	);
	const [platformFilter, setPlatformFilter] = useState<Platform | "All">("All");

	const filtered = EXPAT_COMMUNITIES.filter((c) => {
		const cityOk = cityFilter === "All" || c.city === cityFilter;
		const platformOk =
			platformFilter === "All" || c.platform === platformFilter;
		return cityOk && platformOk;
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
						{ value: "Island-wide", label: "Island-wide" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="Platform"
					value={platformFilter}
					onChange={setPlatformFilter}
					options={[
						{ value: "All", label: "All platforms" },
						...ALL_PLATFORMS.map((p) => ({
							value: p,
							label: PLATFORM_LABEL[p],
						})),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No communities match these filters"
					: `${filtered.length} ${
							filtered.length === 1 ? "community" : "communities"
						} found`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((community) => (
						<CardGridItem key={community.name}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{PLATFORM_LABEL[community.platform]}</Badge>
										{community.nationalityFocus ? (
											<Badge>{community.nationalityFocus}</Badge>
										) : null}
										{community.sizeApprox ? (
											<Badge>{community.sizeApprox}</Badge>
										) : null}
									</span>
								}
								title={community.name}
								meta={community.city}
								text={community.why}
								footer={
									community.url ? (
										<a
											href={community.url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											Join group
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
