"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_SPECIALTIES,
	type City,
	SPECIALIST_DOCTORS,
	SPECIALTY_LABEL,
	type Specialty,
} from "@/lib/specialist-doctors";

/** Filters first, then the doctor cards. Header, tips and disclaimer live in page.tsx. */
export default function SpecialistDoctorsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | "All">(
		"All",
	);

	const filtered = SPECIALIST_DOCTORS.filter(
		(d) =>
			(cityFilter === "All" || d.city === cityFilter) &&
			(specialtyFilter === "All" || d.specialty === specialtyFilter),
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
					label="Specialty"
					value={specialtyFilter}
					onChange={setSpecialtyFilter}
					options={[
						{ value: "All", label: "All specialties" },
						...ALL_SPECIALTIES.map((s) => ({
							value: s,
							label: SPECIALTY_LABEL[s],
						})),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} listed
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{specialtyFilter !== "All"
					? ` · ${SPECIALTY_LABEL[specialtyFilter]}`
					: ""}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No specialists match the current filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((doctor) => (
						<CardGridItem key={`${doctor.name}-${doctor.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{SPECIALTY_LABEL[doctor.specialty]}</Badge>
										{doctor.gesyAccepted ? (
											<Badge tone="success">GeSY accepted</Badge>
										) : null}
										{doctor.englishSpoken ? (
											<Badge>English spoken</Badge>
										) : null}
										{doctor.consultationFrom ? (
											<Badge>From €{doctor.consultationFrom}</Badge>
										) : null}
									</span>
								}
								title={doctor.name}
								meta={`${doctor.title} · ${doctor.city}${doctor.hospital ? ` · ${doctor.hospital}` : ""}`}
								text={doctor.why}
								footer={
									doctor.phone || doctor.website ? (
										<div className="flex flex-wrap gap-x-5 gap-y-1">
											{doctor.phone ? (
												<a
													href={`tel:${doctor.phone.replace(/\s/g, "")}`}
													className="inline-flex min-h-11 items-center font-semibold text-ink underline-offset-2 hover:underline"
												>
													{doctor.phone}
												</a>
											) : null}
											{doctor.website ? (
												<a
													href={doctor.website}
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
