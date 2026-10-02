"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import { eur } from "@/lib/facts/health-transport";
import { ALL_CITIES, type City, TRANSPORT_INFO } from "@/lib/public-transport";

/** City chips first, then one section per city. Header and tips live in page.tsx. */
export default function PublicTransportClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const citiesToShow =
		cityFilter === "All" ? ALL_CITIES : ([cityFilter] as City[]);

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

			<div aria-live="polite" className="mt-8">
				{citiesToShow.map((city) => {
					const info = TRANSPORT_INFO[city];
					return (
						<Section
							key={city}
							id={`transport-${city.toLowerCase().replace(/\s+/g, "-")}`}
							title={city}
							description={info.verdict}
							action={
								<span className="flex flex-wrap gap-2">
									{info.boltAvailable ? <Badge>Bolt available</Badge> : null}
									{info.busMonthlyPass !== undefined ? (
										<Badge>Bus pass {eur(info.busMonthlyPass)}/mo</Badge>
									) : null}
								</span>
							}
						>
							<CardGrid cols={2}>
								<CardGridItem>
									<Card
										variant="text"
										title="Intercity bus"
										text={info.intercityBus}
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										title="Intra-city bus"
										text={info.intraCityBus}
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										title="Taxis & ride-hailing"
										text={info.taxiApp}
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										title="Key routes"
										meta={
											<ul className="list-disc space-y-1 pl-5 text-base">
												{info.keyRoutes.map((route) => (
													<li key={route}>{route}</li>
												))}
											</ul>
										}
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										title="Practical tips"
										meta={
											<ul className="list-disc space-y-1 pl-5 text-base">
												{info.tips.map((tip) => (
													<li key={tip}>{tip}</li>
												))}
											</ul>
										}
									/>
								</CardGridItem>
							</CardGrid>
						</Section>
					);
				})}
			</div>
		</>
	);
}
