"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_FAITHS,
	type City,
	FAITH_LABEL,
	type Faith,
	RELIGIOUS_SERVICES,
} from "@/lib/religious-services";

/** Filters first, then the service cards. Header and tips live in page.tsx. */
export default function ReligiousServicesClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [faithFilter, setFaithFilter] = useState<Faith | "All">("All");

	const filtered = RELIGIOUS_SERVICES.filter((s) => {
		const cityOk = cityFilter === "All" || s.city === cityFilter;
		const faithOk = faithFilter === "All" || s.faith === faithFilter;
		return cityOk && faithOk;
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
					label="Faith"
					value={faithFilter}
					onChange={setFaithFilter}
					options={[
						{ value: "All", label: "All faiths" },
						...ALL_FAITHS.map((f) => ({ value: f, label: FAITH_LABEL[f] })),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} {filtered.length === 1 ? "service" : "services"} found
			</h2>

			{filtered.length === 0 ? (
				<Callout
					tone="info"
					title="No services match these filters."
					className="mt-5"
				>
					Try broadening your city or faith selection.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((service) => (
						<CardGridItem key={service.name}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{FAITH_LABEL[service.faith]}</Badge>
										<Badge>{service.serviceFrequency}</Badge>
									</span>
								}
								title={service.name}
								meta={service.city}
								text={service.why}
								footer={
									<>
										{service.languagesOffered.length > 0 ? (
											<p className="text-muted">
												<span className="font-semibold text-ink">
													Languages:{" "}
												</span>
												{service.languagesOffered.join(", ")}
											</p>
										) : null}
										{service.address ? (
											<p className="mt-1 text-muted">{service.address}</p>
										) : null}
										{service.website ? (
											<a
												href={service.website}
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
