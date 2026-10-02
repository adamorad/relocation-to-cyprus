"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ChipGroup } from "@/components/ui/Chip";

type EventType =
	| "carnival"
	| "wine"
	| "music"
	| "religious"
	| "food"
	| "cultural"
	| "sports";
type City = "Limassol" | "Paphos" | "Larnaca" | "Ayia Napa" | "Island-wide";

type CyprusEvent = {
	name: string;
	city: City;
	month: number;
	dateDescription: string;
	type: EventType;
	description: string;
	website?: string;
	free: boolean;
	highlight?: boolean;
};

const EVENTS: CyprusEvent[] = [
	// January
	{
		name: "Epiphany (Theophania)",
		city: "Island-wide",
		month: 1,
		dateDescription: "6 January",
		type: "religious",
		description:
			"The Christian feast of Epiphany is celebrated across Cyprus with special church services and the blessing of the waters ceremony. In coastal towns, a cross is thrown into the sea and young men dive to retrieve it. Limassol's harbour and Larnaca's seafront draw the biggest crowds.",
		free: true,
	},
	// February
	{
		name: "Limassol Carnival",
		city: "Limassol",
		month: 2,
		dateDescription:
			"Last two weeks of February (date varies by Easter calendar)",
		type: "carnival",
		description:
			"The biggest and most exuberant event in the Cyprus calendar. The Limassol Carnival features ten days of costumed parades, themed balls, street parties, and a Grand Parade on the final Sunday that draws over 100,000 spectators to the coastal avenue. Dating back to the Middle Ages, it is one of the most colourful carnivals in the Eastern Mediterranean. Free to watch the parades; some ticketed events.",
		website: "https://www.limassolmunicipal.com.cy",
		free: true,
		highlight: true,
	},
	{
		name: "Paphos Carnival",
		city: "Paphos",
		month: 2,
		dateDescription: "Last week of February (follows Limassol dates)",
		type: "carnival",
		description:
			"Paphos holds its own carnival celebrations in parallel with Limassol, featuring costumed parades through Kato Paphos, live music, and street entertainment. Smaller and more family-friendly than the Limassol version, making it a good alternative for families with young children.",
		free: true,
	},
	// March
	{
		name: "Green Monday (Kathara Deftera)",
		city: "Island-wide",
		month: 2,
		dateDescription: "First Monday of Lent (date varies, February or March)",
		type: "cultural",
		description:
			"The start of Orthodox Lent, celebrated as a public holiday with picnics in the countryside, kite-flying, and traditional Lenten food (lagana bread, tahini, olives, seafood). It is one of Cyprus's most beloved outdoor celebrations, hills and parks across the island fill with families.",
		free: true,
	},
	{
		name: "Limassol International Spring Flower Festival",
		city: "Limassol",
		month: 3,
		dateDescription: "Late March / early April",
		type: "cultural",
		description:
			"The Municipal Gardens in Limassol are transformed for this annual flower festival celebrating the arrival of spring. Thousands of varieties of flowers are displayed, and the event coincides with open-air concerts and cultural performances. One of the most photogenic events of the year.",
		free: true,
	},
	// April
	{
		name: "Orthodox Easter",
		city: "Island-wide",
		month: 4,
		dateDescription: "April or May (date varies)",
		type: "religious",
		description:
			"Orthodox Easter is Cyprus's most important religious event. The midnight Anastasi service on Holy Saturday, when the lights are extinguished and the holy flame is passed through darkened churches, is one of the most moving sights in Cyprus. The following day, families gather for the traditional lamb spit-roast (souvla). Platres, Omodos, and other villages host the most atmospheric celebrations.",
		free: true,
	},
	// May
	{
		name: "Anthestiria Flower Festival (Larnaca)",
		city: "Larnaca",
		month: 5,
		dateDescription: "Second week of May",
		type: "cultural",
		description:
			"Larnaca's version of the ancient Greek flower festival features decorated floats, costumed parade participants, and flower-strewn streets through the old city. The parade along the Finikoudes promenade is the centrepiece, followed by music and dancing in the town square.",
		free: true,
	},
	{
		name: "Paphos Aphrodite Cultural Festival",
		city: "Paphos",
		month: 5,
		dateDescription: "May",
		type: "cultural",
		description:
			"Open-air cultural performances in and around the ancient Paphos archaeological sites, using the natural backdrop of the Tombs of the Kings and the Paphos harbour castle as stages. A mix of theatre, dance, and music drawing both local and international performers.",
		free: false,
	},
	// June
	{
		name: "Kataklysmos Festival (Festival of the Flood)",
		city: "Larnaca",
		month: 6,
		dateDescription:
			"50 days after Orthodox Easter, typically second or third week of June",
		type: "religious",
		description:
			"Unique to Cyprus, Kataklysmos is a joyful water festival coinciding with Pentecost Sunday. Larnaca hosts the largest celebration on its seafront promenade, a week of open-air concerts, folk dancing, traditional food stalls, games, and water-throwing. Limassol, Paphos, and Ayia Napa all hold their own Kataklysmos events. One of the most distinctly Cypriot experiences on the calendar.",
		website: "https://www.visitcyprus.com",
		free: true,
		highlight: true,
	},
	{
		name: "Limassol International Documentary Festival",
		city: "Limassol",
		month: 6,
		dateDescription: "Mid-June",
		type: "cultural",
		description:
			"A focused documentary film festival held annually in Limassol, screening international and Cypriot documentaries across several venues. The festival has grown significantly since its founding and now includes workshops and panel discussions.",
		free: false,
	},
	// July
	{
		name: "Limassol Summer Festival",
		city: "Limassol",
		month: 7,
		dateDescription: "July and August",
		type: "music",
		description:
			"A summer-long programme of open-air concerts, theatrical performances, and dance events held at the Limassol Municipal Amphitheatre and other open-air venues. International and Cypriot artists feature across genres including classical, pop, and traditional music.",
		free: false,
	},
	{
		name: "Larnaca International Summer Festival",
		city: "Larnaca",
		month: 7,
		dateDescription: "July",
		type: "music",
		description:
			"Larnaca's summer arts festival features performances at the Larnaca Fort and other open-air venues around the city. Theatre, music, and dance events from local and international artists, often set against the backdrop of the medieval fort and the salt lake.",
		free: false,
	},
	{
		name: "Paphos Ancient Greek Drama Festival",
		city: "Paphos",
		month: 7,
		dateDescription: "July and August",
		type: "cultural",
		description:
			"Performances of ancient Greek plays staged at the Paphos Odeon, a second-century Roman amphitheatre in the Archaeological Park, and at Kourion's ancient theatre. Among the most atmospheric theatre settings in the entire Mediterranean. Tickets required; international productions and local companies both feature.",
		free: false,
	},
	// August
	{
		name: "Kourion Ancient Theatre Festival",
		city: "Limassol",
		month: 8,
		dateDescription: "August",
		type: "cultural",
		description:
			"Theatrical and musical performances at the magnificent Kourion amphitheatre, perched on the clifftops west of Limassol with views over the sea. The summer evenings make this one of the most memorable performance venues in Cyprus. Tickets sell out quickly, book well in advance.",
		free: false,
	},
	{
		name: "Cyprus Motorcycle Festival",
		city: "Limassol",
		month: 8,
		dateDescription: "Late August",
		type: "sports",
		description:
			"One of the largest motorcycle gatherings in the Eastern Mediterranean, held annually near Limassol. Thousands of bikes and riders from across Europe and the Middle East participate, with scenic coastal and mountain routes forming the backbone of the event.",
		free: false,
	},
	// September
	{
		name: "Limassol Wine Festival",
		city: "Limassol",
		month: 9,
		dateDescription:
			"Late September to early October (2026: 26 September to 4 October)",
		type: "wine",
		description:
			"The most famous wine festival in Cyprus, held annually in the Limassol Municipal Gardens since 1961. For a modest entry fee, visitors receive unlimited tastings of Cypriot wines from all the major producers, including KEO, SODAP, ETKO and Loel. Live music, traditional food, and dancing complete the evenings. An unmissable event for wine lovers and a genuine local tradition.",
		website: "https://www.limassolmunicipal.com.cy",
		free: false,
		highlight: true,
	},
	{
		name: "Commandaria Wine Festival (Kyperounta)",
		city: "Limassol",
		month: 9,
		dateDescription: "Mid-September",
		type: "wine",
		description:
			"A celebration of Commandaria, Cyprus's ancient dessert wine, one of the oldest named wines in the world, continuously produced since at least the 12th century. The festival takes place in the Troodos foothills villages and includes tastings, traditional music, and local food.",
		free: true,
	},
	{
		name: "Paphos Wine Festival",
		city: "Paphos",
		month: 9,
		dateDescription: "Late September",
		type: "wine",
		description:
			"A smaller but growing wine festival in Paphos, celebrating the wines of the Paphos district including those from the Akamas and Xeros valley vineyards. Held in the Paphos Municipal Gardens with tastings from regional producers, traditional music, and Cypriot mezze.",
		free: false,
	},
	// October
	{
		name: "Larnaca Jazz & World Music Festival",
		city: "Larnaca",
		month: 10,
		dateDescription: "October",
		type: "music",
		description:
			"An annual jazz and world music festival held at venues around Larnaca, bringing international and regional artists to the city. A more intimate festival than the summer events, with a focus on quality of performance over scale.",
		free: false,
	},
	// November
	// December
	{
		name: "Christmas Markets (Limassol)",
		city: "Limassol",
		month: 12,
		dateDescription: "December",
		type: "cultural",
		description:
			"Festive Christmas markets in Limassol Old Town offer crafts, seasonal food, and mulled wine. Cyprus's warm winter climate makes these outdoor markets genuinely pleasant: typical December temperatures of 18-20°C mean outdoor events are comfortable without heavy coats.",
		free: true,
	},
	{
		name: "Ayia Napa New Year Celebrations",
		city: "Ayia Napa",
		month: 12,
		dateDescription: "31 December",
		type: "music",
		description:
			"Ayia Napa hosts large-scale New Year's Eve parties and outdoor concerts at the town square and local venues. While quieter than its summer peak, December in Ayia Napa is mild and the New Year festivities draw visitors from across Cyprus.",
		free: true,
	},
];

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const EVENT_TYPE_LABEL: Record<EventType, string> = {
	carnival: "Carnival",
	wine: "Wine",
	music: "Music",
	religious: "Religious",
	food: "Food",
	cultural: "Cultural & Arts",
	sports: "Sports",
};

const ALL_TYPES: EventType[] = [
	"carnival",
	"wine",
	"music",
	"religious",
	"food",
	"cultural",
	"sports",
];
const ALL_CITIES: City[] = [
	"Limassol",
	"Paphos",
	"Larnaca",
	"Ayia Napa",
	"Island-wide",
];

export default function EventsCalendarPage() {
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [typeFilter, setTypeFilter] = useState<EventType | null>(null);
	const [cityFilter, setCityFilter] = useState<City | null>(null);

	const filtered = useMemo(() => {
		return EVENTS.filter((e) => {
			if (selectedMonth !== null && e.month !== selectedMonth) return false;
			if (typeFilter && e.type !== typeFilter) return false;
			if (cityFilter && e.city !== cityFilter) return false;
			return true;
		});
	}, [selectedMonth, typeFilter, cityFilter]);

	const monthOptions = [
		{ value: "all", label: "All year" },
		...MONTHS.map((m, i) => ({
			value: String(i + 1),
			label: m.slice(0, 3),
			count: EVENTS.filter((e) => e.month === i + 1).length,
		})),
	];

	return (
		<>
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-sm font-semibold text-ink">Highlights:</span>
				<Badge>Limassol Carnival (February)</Badge>
				<Badge>Kataklysmos (June)</Badge>
				<Badge>Limassol Wine Festival (September)</Badge>
			</div>

			{/* Filters */}
			<div className="space-y-5 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="Month"
					options={monthOptions}
					value={selectedMonth === null ? "all" : String(selectedMonth)}
					onChange={(v) => setSelectedMonth(v === "all" ? null : Number(v))}
				/>
				<ChipGroup
					label="Event type"
					options={[
						{ value: "all", label: "All types" },
						...ALL_TYPES.map((t) => ({ value: t, label: EVENT_TYPE_LABEL[t] })),
					]}
					value={typeFilter ?? "all"}
					onChange={(v) => setTypeFilter(v === "all" ? null : (v as EventType))}
				/>
				<ChipGroup
					label="City"
					options={[
						{ value: "all", label: "All cities" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
					value={cityFilter ?? "all"}
					onChange={(v) => setCityFilter(v === "all" ? null : (v as City))}
				/>
			</div>

			<p className="text-sm text-muted" aria-live="polite">
				{filtered.length} event{filtered.length !== 1 ? "s" : ""}
				{selectedMonth !== null ? ` in ${MONTHS[selectedMonth - 1]}` : ""}
			</p>

			{/* Events list grouped by month */}
			{selectedMonth !== null ? (
				<ul className="grid gap-4 md:grid-cols-2">
					{filtered.map((e) => (
						<EventCard key={e.name} event={e} />
					))}
				</ul>
			) : (
				<div className="space-y-8">
					{MONTHS.map((m, i) => {
						const monthEvents = filtered.filter((e) => e.month === i + 1);
						if (monthEvents.length === 0) return null;
						return (
							<section key={m} aria-label={m}>
								<h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-ink">
									{m}
									<span className="text-sm font-normal text-muted">
										{monthEvents.length} event
										{monthEvents.length !== 1 ? "s" : ""}
									</span>
								</h2>
								<ul className="grid gap-4 md:grid-cols-2">
									{monthEvents.map((e) => (
										<EventCard key={e.name} event={e} />
									))}
								</ul>
							</section>
						);
					})}
				</div>
			)}

			{filtered.length === 0 && (
				<div className="py-16 text-center text-muted">
					No events match your filters.
				</div>
			)}
		</>
	);
}

function EventCard({ event }: { event: CyprusEvent }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<li
			className={`rounded-card border border-line p-4 ${
				event.highlight ? "bg-sky" : "bg-white"
			}`}
		>
			<div className="flex flex-wrap items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<h3 className="font-bold text-ink">{event.name}</h3>
					<p className="mt-0.5 text-sm text-muted">
						{event.city} &middot; {event.dateDescription}
					</p>
				</div>
				<div className="flex flex-shrink-0 flex-wrap items-center gap-2">
					{event.highlight && <Badge>Highlight</Badge>}
					<Badge>{EVENT_TYPE_LABEL[event.type]}</Badge>
					<Badge>{event.free ? "Free" : "Ticketed"}</Badge>
				</div>
			</div>

			<p
				className={`mt-2 text-sm leading-relaxed text-ink ${expanded ? "" : "line-clamp-2"}`}
			>
				{event.description}
			</p>
			<div className="mt-1 flex flex-wrap items-center gap-x-2">
				<button
					type="button"
					onClick={() => setExpanded(!expanded)}
					aria-expanded={expanded}
					className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline"
				>
					{expanded ? "Show less" : "Read more"}
				</button>
				{event.website && (
					<a
						href={event.website}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline"
					>
						Official website
					</a>
				)}
			</div>
		</li>
	);
}
