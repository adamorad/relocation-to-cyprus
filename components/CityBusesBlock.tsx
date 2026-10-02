import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { CITY_BUSES, CITY_BUSES_ID, CITY_BUSES_TITLE } from "@/lib/city-buses";
import { TAXI_NIGHT_HOURS } from "@/lib/facts/health-transport";

const LINK =
	"text-primary font-medium underline underline-offset-2 hover:text-primary-hover";

/**
 * Per-city bus block for the getting-around guide. Rendered between guide
 * sections, outside `.guide-body > section[id]` so the guide's table and list
 * styles do not override the ui components.
 */
export function CityBusesBlock() {
	return (
		<div id={CITY_BUSES_ID} className="mt-9 scroll-mt-24">
			<h2 className="mb-3 text-2xl font-bold leading-tight tracking-[-0.01em] text-ink">
				{CITY_BUSES_TITLE}
			</h2>
			<p className="mb-5 text-base leading-relaxed text-ink">
				{`Each city's bus operator, the routes newcomers use most and how to get in from the airport. Airport taxi fares are fixed by law per taxi (up to 4 passengers, luggage included); night rates apply ${TAXI_NIGHT_HOURS}. Route numbers and timetables change, so check the operator's site before you travel.`}
			</p>

			<DataTable
				caption="City bus operators and airport links"
				className="hidden sm:block"
				columns={[
					{ header: "City" },
					{ header: "Bus operator" },
					{ header: "Airport by bus" },
					{ header: "Airport taxi (day / night)" },
				]}
				rows={CITY_BUSES.map((c) => [
					c.city,
					c.operatorSource ? (
						<a
							key="op"
							href={c.operatorSource.url}
							target="_blank"
							rel="noopener noreferrer"
							className={LINK}
						>
							{c.operator}
						</a>
					) : (
						c.operator
					),
					c.airportBus,
					c.airportTaxi,
				])}
			/>

			<CardGrid cols={2} className="sm:mt-6">
				{CITY_BUSES.map((c) => (
					<CardGridItem key={c.city}>
						<Card
							variant="text"
							title={c.city}
							meta={
								<div className="space-y-3 text-base leading-normal text-ink">
									<p>
										<span className="font-semibold">City buses:</span>{" "}
										{c.cityBus}
									</p>
									<p className="sm:hidden">
										<span className="font-semibold">Airport:</span>{" "}
										{c.airportBus}. Taxi: {c.airportTaxi}.
									</p>
									<p>
										<span className="font-semibold">Intercity:</span>{" "}
										{c.intercity}
									</p>
									<div>
										<p className="font-semibold">Key routes</p>
										<ul className="mt-1 list-disc space-y-1 pl-5">
											{c.keyRoutes.map((r) => (
												<li key={r}>{r}</li>
											))}
										</ul>
									</div>
									<div>
										<p className="font-semibold">Tips</p>
										<ul className="mt-1 list-disc space-y-1 pl-5">
											{c.tips.map((t) => (
												<li key={t}>{t}</li>
											))}
										</ul>
									</div>
								</div>
							}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</div>
	);
}
