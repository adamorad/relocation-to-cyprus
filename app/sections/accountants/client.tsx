"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ACCOUNTANT_SPEC_LABEL,
	ACCOUNTANTS,
	type AccountantFilter,
	ALL_ACCOUNTANT_SPECIALIZATIONS,
	ALL_CITIES,
	type City,
	REGISTERED_OFFICE_PROVIDERS,
} from "@/lib/accountants";

/**
 * Filters first, then the accountant cards, then registered office providers
 * (merged from the retired registered-address directory). The "Registered
 * office" chip shows only the providers. Header and info live in page.tsx.
 */
export default function AccountantsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specFilter, setSpecFilter] = useState<AccountantFilter | "All">("All");

	const officeOnly = specFilter === "registered-office";
	const visible = officeOnly
		? []
		: ACCOUNTANTS.filter((a) => {
				const cityMatch = cityFilter === "All" || a.city === cityFilter;
				const specMatch =
					specFilter === "All" || a.specializations.includes(specFilter);
				return cityMatch && specMatch;
			});
	const offices =
		specFilter === "All" || officeOnly
			? REGISTERED_OFFICE_PROVIDERS.filter(
					(p) => cityFilter === "All" || p.city === cityFilter,
				)
			: [];

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
					label="Specialization"
					value={specFilter}
					onChange={(v) => setSpecFilter(v === specFilter ? "All" : v)}
					options={[
						{ value: "All", label: "All specializations" },
						...ALL_ACCOUNTANT_SPECIALIZATIONS.map((s) => ({
							value: s as AccountantFilter,
							label: ACCOUNTANT_SPEC_LABEL[s],
						})),
						{
							value: "registered-office" as AccountantFilter,
							label: ACCOUNTANT_SPEC_LABEL["registered-office"],
						},
					]}
				/>
			</div>

			<DirectoryFeatured />

			{officeOnly ? null : (
				<h2
					className="mt-8 text-2xl font-bold tracking-tight text-ink"
					aria-live="polite"
				>
					{visible.length === 0
						? "No accountants match the selected filters"
						: `${visible.length} accountant${visible.length === 1 ? "" : "s"}${
								cityFilter !== "All" ? ` in ${cityFilter}` : ""
							}${
								specFilter !== "All"
									? ` · ${ACCOUNTANT_SPEC_LABEL[specFilter]}`
									: ""
							}`}
				</h2>
			)}

			{visible.length > 0 ? (
				<CardGrid cols={2} className="mt-5">
					{visible.map((a) => (
						<CardGridItem key={`${a.name}-${a.firm}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{a.city}</Badge>}
								title={a.name}
								meta={a.firm}
								text={a.why}
								footer={
									<div className="space-y-2">
										<div className="flex flex-wrap gap-1.5">
											{a.specializations.map((s) => (
												<Badge key={s}>{ACCOUNTANT_SPEC_LABEL[s]}</Badge>
											))}
										</div>
										<div className="flex flex-wrap items-center gap-x-5 text-muted">
											<span>
												<span className="font-semibold text-ink">
													Languages:
												</span>{" "}
												{a.languages.join(", ")}
											</span>
											{a.website ? (
												<a
													href={a.website}
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
			{offices.length > 0 || officeOnly ? (
				<>
					<h2
						className="mt-10 text-2xl font-bold tracking-tight text-ink"
						aria-live="polite"
					>
						{offices.length === 0
							? "No registered office providers in this city"
							: `${offices.length} registered office provider${offices.length === 1 ? "" : "s"}${
									cityFilter !== "All" ? ` in ${cityFilter}` : ""
								}`}
					</h2>
					<p className="mt-2 max-w-prose text-muted">
						Every Cyprus company needs a registered office in Cyprus. These
						corporate service providers offer the address, often with mail
						handling and company secretary services.
					</p>
					{offices.length > 0 ? (
						<CardGrid cols={2} className="mt-5">
							{offices.map((provider) => (
								<CardGridItem key={provider.name}>
									<Card
										variant="text"
										eyebrow={<Badge>{provider.city}</Badge>}
										title={provider.name}
										meta={`${
											provider.pricePerYear != null
												? `€${provider.pricePerYear} / year`
												: "Price on request"
										}${provider.neighbourhood ? ` · ${provider.neighbourhood}` : ""}`}
										text={provider.why}
										footer={
											<>
												<ul className="list-disc space-y-0.5 pb-1 pl-5 text-muted">
													{provider.includes.map((item) => (
														<li key={item}>{item}</li>
													))}
												</ul>
												{provider.website ? (
													<a
														href={provider.website}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
													>
														Website
													</a>
												) : null}
											</>
										}
									/>
								</CardGridItem>
							))}
						</CardGrid>
					) : null}
				</>
			) : null}
		</>
	);
}
