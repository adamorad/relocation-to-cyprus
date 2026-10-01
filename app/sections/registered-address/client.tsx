"use client";

import { useState } from "react";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	type City,
	REGISTERED_ADDRESS_PROVIDERS,
} from "@/lib/registered-address";

/** Filter first, then the provider cards. Header, tips and disclaimer live in page.tsx. */
export default function RegisteredAddressClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const visible = REGISTERED_ADDRESS_PROVIDERS.filter(
		(p) => cityFilter === "All" || p.city === cityFilter,
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

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No providers found for this city"
					: `${visible.length} provider${visible.length === 1 ? "" : "s"}`}
			</h2>

			{visible.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No providers found for this city.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{visible.map((provider) => (
						<CardGridItem key={provider.name}>
							<Card
								variant="text"
								eyebrow={
									provider.pricePerYear != null ? (
										<span className="text-sm font-semibold text-primary-hover">
											€{provider.pricePerYear} / year
										</span>
									) : null
								}
								title={provider.name}
								meta={`${provider.city}${provider.neighbourhood ? ` · ${provider.neighbourhood}` : ""}`}
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
			)}
		</>
	);
}
