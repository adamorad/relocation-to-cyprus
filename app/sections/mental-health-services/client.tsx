"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_PROVIDER_TYPES,
	type City,
	MENTAL_HEALTH_PROVIDERS,
	PROVIDER_TYPE_LABEL,
	type ProviderType,
} from "@/lib/mental-health";

/** Filters first, then the provider cards. Header, tips and notes live in page.tsx. */
export default function MentalHealthServicesClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<ProviderType | "All">("All");

	const filtered = MENTAL_HEALTH_PROVIDERS.filter(
		(p) =>
			(cityFilter === "All" || p.city === cityFilter) &&
			(typeFilter === "All" || p.type === typeFilter),
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
					label="Provider type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_PROVIDER_TYPES.map((t) => ({
							value: t,
							label: PROVIDER_TYPE_LABEL[t],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} provider{filtered.length !== 1 ? "s" : ""} listed
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{typeFilter !== "All" ? ` · ${PROVIDER_TYPE_LABEL[typeFilter]}` : ""}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No providers match the current filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((provider) => (
						<CardGridItem key={`${provider.name}-${provider.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{PROVIDER_TYPE_LABEL[provider.type]}</Badge>
										{provider.onlineAvailable ? (
											<Badge>Online available</Badge>
										) : null}
										{provider.sessionFrom ? (
											<Badge>From €{provider.sessionFrom}/session</Badge>
										) : null}
									</span>
								}
								title={provider.name}
								meta={`${provider.title} · ${provider.city}`}
								text={provider.why}
								footer={
									<>
										<div className="space-y-1 text-muted">
											{provider.approaches.length > 0 ? (
												<p>
													<span className="font-semibold text-ink">
														Approaches:{" "}
													</span>
													{provider.approaches.join(" · ")}
												</p>
											) : null}
											<p>
												<span className="font-semibold text-ink">
													Languages:{" "}
												</span>
												{provider.languages.join(", ")}
											</p>
										</div>
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

			<Callout tone="warning" title="Crisis support in Cyprus" className="mt-8">
				EAPN Cyprus crisis line:{" "}
				<a href="tel:1480" className="font-semibold underline">
					1480
				</a>{" "}
				(free, 24/7). Lifeline Cyprus:{" "}
				<a
					href="https://www.lifeline.org.cy"
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold underline"
				>
					lifeline.org.cy
				</a>
				. In acute crisis, go to Nicosia General Hospital or Limassol General
				Hospital psychiatric emergency.
			</Callout>
		</>
	);
}
