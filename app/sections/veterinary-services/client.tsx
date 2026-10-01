"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_VET_SERVICES,
	type City,
	VET_CLINICS,
	VET_SERVICE_LABEL,
	type VetService,
} from "@/lib/veterinary";

/** Filters first, then the clinic cards. Header, tips and note live in page.tsx. */
export default function VeterinaryServicesClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [serviceFilter, setServiceFilter] = useState<VetService | "All">("All");

	const filtered = VET_CLINICS.filter(
		(c) =>
			(cityFilter === "All" || c.city === cityFilter) &&
			(serviceFilter === "All" || c.services.includes(serviceFilter)),
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
					label="Service"
					value={serviceFilter}
					onChange={setServiceFilter}
					options={[
						{ value: "All", label: "All services" },
						...ALL_VET_SERVICES.map((s) => ({
							value: s,
							label: VET_SERVICE_LABEL[s],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} clinic{filtered.length !== 1 ? "s" : ""} listed
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{serviceFilter !== "All"
					? ` · ${VET_SERVICE_LABEL[serviceFilter]}`
					: ""}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No clinics match the current filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((clinic) => (
						<CardGridItem key={`${clinic.name}-${clinic.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										{clinic.emergency24h ? <Badge>24h emergency</Badge> : null}
										{clinic.englishSpoken ? (
											<Badge>English spoken</Badge>
										) : null}
										{clinic.services.map((s) => (
											<Badge key={s}>{VET_SERVICE_LABEL[s]}</Badge>
										))}
									</span>
								}
								title={clinic.name}
								meta={`${clinic.city}${clinic.neighbourhood ? ` · ${clinic.neighbourhood}` : ""}`}
								text={clinic.why}
								footer={
									clinic.phone || clinic.website ? (
										<div className="flex flex-wrap gap-x-5 gap-y-1">
											{clinic.phone ? (
												<a
													href={`tel:${clinic.phone.replace(/\s/g, "")}`}
													className="inline-flex min-h-11 items-center font-semibold text-ink underline-offset-2 hover:underline"
												>
													{clinic.phone}
												</a>
											) : null}
											{clinic.website ? (
												<a
													href={clinic.website}
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
			)}
		</>
	);
}
