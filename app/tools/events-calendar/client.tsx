"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type EventType = "carnival" | "wine" | "music" | "religious" | "food" | "cultural" | "sports";
type City = "Limassol" | "Paphos" | "Larnaca" | "Nicosia" | "Ayia Napa" | "Island-wide";

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
    description: "The Christian feast of Epiphany is celebrated across Cyprus with special church services and the blessing of the waters ceremony. In coastal towns, a cross is thrown into the sea and young men dive to retrieve it. Limassol's harbour and Larnaca's seafront draw the biggest crowds.",
    free: true,
  },
  // February
  {
    name: "Limassol Carnival",
    city: "Limassol",
    month: 2,
    dateDescription: "Last two weeks of February (date varies by Easter calendar)",
    type: "carnival",
    description: "The biggest and most exuberant event in the Cyprus calendar. The Limassol Carnival features ten days of costumed parades, themed balls, street parties, and a Grand Parade on the final Sunday that draws over 100,000 spectators to the coastal avenue. Dating back to the Middle Ages, it is one of the most colourful carnivals in the Eastern Mediterranean. Free to watch the parades; some ticketed events.",
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
    description: "Paphos holds its own carnival celebrations in parallel with Limassol, featuring costumed parades through Kato Paphos, live music, and street entertainment. Smaller and more family-friendly than the Limassol version, making it a good alternative for families with young children.",
    free: true,
  },
  // March
  {
    name: "Green Monday (Kathara Deftera)",
    city: "Island-wide",
    month: 2,
    dateDescription: "First Monday of Lent (date varies — February or March)",
    type: "cultural",
    description: "The start of Orthodox Lent, celebrated as a public holiday with picnics in the countryside, kite-flying, and traditional Lenten food (lagana bread, tahini, olives, seafood). It is one of Cyprus's most beloved outdoor celebrations — hills and parks across the island fill with families.",
    free: true,
  },
  {
    name: "Limassol International Spring Flower Festival",
    city: "Limassol",
    month: 3,
    dateDescription: "Late March / early April",
    type: "cultural",
    description: "The Municipal Gardens in Limassol are transformed for this annual flower festival celebrating the arrival of spring. Thousands of varieties of flowers are displayed, and the event coincides with open-air concerts and cultural performances. One of the most photogenic events of the year.",
    free: true,
  },
  // April
  {
    name: "Cyprus International Film Festival",
    city: "Nicosia",
    month: 4,
    dateDescription: "April (week-long)",
    type: "cultural",
    description: "An annual film festival showcasing international and local Cypriot cinema across multiple venues in Nicosia and occasionally Limassol. Screenings include features, documentaries, and short films from across Europe and the Middle East. Industry events and Q&As with directors are part of the programme.",
    free: false,
  },
  {
    name: "Orthodox Easter",
    city: "Island-wide",
    month: 4,
    dateDescription: "April or May (date varies)",
    type: "religious",
    description: "Orthodox Easter is Cyprus's most important religious event. The midnight Anastasi service on Holy Saturday, when the lights are extinguished and the holy flame is passed through darkened churches, is one of the most moving sights in Cyprus. The following day, families gather for the traditional lamb spit-roast (souvla). Platres, Omodos, and other villages host the most atmospheric celebrations.",
    free: true,
  },
  // May
  {
    name: "Anthestiria Flower Festival (Larnaca)",
    city: "Larnaca",
    month: 5,
    dateDescription: "Second week of May",
    type: "cultural",
    description: "Larnaca's version of the ancient Greek flower festival features decorated floats, costumed parade participants, and flower-strewn streets through the old city. The parade along the Finikoudes promenade is the centrepiece, followed by music and dancing in the town square.",
    free: true,
  },
  {
    name: "Paphos Aphrodite Cultural Festival",
    city: "Paphos",
    month: 5,
    dateDescription: "May",
    type: "cultural",
    description: "Open-air cultural performances in and around the ancient Paphos archaeological sites, using the natural backdrop of the Tombs of the Kings and the Paphos harbour castle as stages. A mix of theatre, dance, and music drawing both local and international performers.",
    free: false,
  },
  // June
  {
    name: "Kataklysmos Festival (Festival of the Flood)",
    city: "Larnaca",
    month: 6,
    dateDescription: "50 days after Orthodox Easter — typically second or third week of June",
    type: "religious",
    description: "Unique to Cyprus, Kataklysmos is a joyful water festival coinciding with Pentecost Sunday. Larnaca hosts the largest celebration on its seafront promenade — a week of open-air concerts, folk dancing, traditional food stalls, games, and water-throwing. Limassol, Paphos, and Ayia Napa all hold their own Kataklysmos events. One of the most distinctly Cypriot experiences on the calendar.",
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
    description: "A focused documentary film festival held annually in Limassol, screening international and Cypriot documentaries across several venues. The festival has grown significantly since its founding and now includes workshops and panel discussions.",
    free: false,
  },
  // July
  {
    name: "Limassol Summer Festival",
    city: "Limassol",
    month: 7,
    dateDescription: "July and August",
    type: "music",
    description: "A summer-long programme of open-air concerts, theatrical performances, and dance events held at the Limassol Municipal Amphitheatre and other open-air venues. International and Cypriot artists feature across genres including classical, pop, and traditional music.",
    free: false,
  },
  {
    name: "Larnaca International Summer Festival",
    city: "Larnaca",
    month: 7,
    dateDescription: "July",
    type: "music",
    description: "Larnaca's summer arts festival features performances at the Larnaca Fort and other open-air venues around the city. Theatre, music, and dance events from local and international artists, often set against the backdrop of the medieval fort and the salt lake.",
    free: false,
  },
  {
    name: "Paphos Ancient Greek Drama Festival",
    city: "Paphos",
    month: 7,
    dateDescription: "July and August",
    type: "cultural",
    description: "Performances of ancient Greek plays staged at the Paphos Odeon — a second-century Roman amphitheatre in the Archaeological Park — and at Kourion's ancient theatre. Among the most atmospheric theatre settings in the entire Mediterranean. Tickets required; international productions and local companies both feature.",
    free: false,
  },
  // August
  {
    name: "Kourion Ancient Theatre Festival",
    city: "Limassol",
    month: 8,
    dateDescription: "August",
    type: "cultural",
    description: "Theatrical and musical performances at the magnificent Kourion amphitheatre, perched on the clifftops west of Limassol with views over the sea. The summer evenings make this one of the most memorable performance venues in Cyprus. Tickets sell out quickly — book well in advance.",
    free: false,
  },
  {
    name: "Cyprus Motorcycle Festival",
    city: "Limassol",
    month: 8,
    dateDescription: "Late August",
    type: "sports",
    description: "One of the largest motorcycle gatherings in the Eastern Mediterranean, held annually near Limassol. Thousands of bikes and riders from across Europe and the Middle East participate, with scenic coastal and mountain routes forming the backbone of the event.",
    free: false,
  },
  // September
  {
    name: "Limassol Wine Festival",
    city: "Limassol",
    month: 9,
    dateDescription: "First two weeks of September",
    type: "wine",
    description: "The most famous wine festival in Cyprus, held annually in the Limassol Municipal Gardens since 1961. For a modest entry fee, visitors receive unlimited tastings of Cypriot wines from all the major producers — including KEO, SODAP, ETKO and Loel. Live music, traditional food, and dancing complete the evenings. An unmissable event for wine lovers and a genuine local tradition.",
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
    description: "A celebration of Commandaria, Cyprus's ancient dessert wine — one of the oldest named wines in the world, continuously produced since at least the 12th century. The festival takes place in the Troodos foothills villages and includes tastings, traditional music, and local food.",
    free: true,
  },
  {
    name: "Paphos Wine Festival",
    city: "Paphos",
    month: 9,
    dateDescription: "Late September",
    type: "wine",
    description: "A smaller but growing wine festival in Paphos, celebrating the wines of the Paphos district including those from the Akamas and Xeros valley vineyards. Held in the Paphos Municipal Gardens with tastings from regional producers, traditional music, and Cypriot mezze.",
    free: false,
  },
  // October
  {
    name: "Cyprus Rally",
    city: "Nicosia",
    month: 10,
    dateDescription: "October",
    type: "sports",
    description: "A major rally racing event held on the challenging mountain roads of Cyprus, forming part of the European Rally Championship. Spectator stages in the Troodos mountain region offer free vantage points. One of the few major motor sport events in the Eastern Mediterranean.",
    free: true,
  },
  {
    name: "Larnaca Jazz & World Music Festival",
    city: "Larnaca",
    month: 10,
    dateDescription: "October",
    type: "music",
    description: "An annual jazz and world music festival held at venues around Larnaca, bringing international and regional artists to the city. A more intimate festival than the summer events, with a focus on quality of performance over scale.",
    free: false,
  },
  // November
  {
    name: "Nicosia International Film Festival",
    city: "Nicosia",
    month: 11,
    dateDescription: "November",
    type: "cultural",
    description: "A film festival focused on international cinema, held in Nicosia with screenings at multiple venues across the city. The festival has developed a strong reputation for programming from underrepresented cinemas alongside mainstream European releases.",
    free: false,
  },
  {
    name: "Cyprus Beer Festival",
    city: "Nicosia",
    month: 11,
    dateDescription: "November",
    type: "food",
    description: "Annual beer festival celebrating local and international craft beers, held in Nicosia. Local microbreweries including Aphrodite Hills Brewery and Archangelos showcase their products alongside imported European craft beers. Live music, street food, and a growing craft beer scene make this event increasingly popular.",
    free: false,
    highlight: false,
  },
  // December
  {
    name: "Christmas Markets (Limassol & Nicosia)",
    city: "Island-wide",
    month: 12,
    dateDescription: "December",
    type: "cultural",
    description: "Festive Christmas markets in Limassol Old Town and Nicosia's town square offer crafts, seasonal food, and mulled wine. Cyprus's warm winter climate makes these outdoor markets genuinely pleasant — typical December temperatures of 18-20°C mean outdoor events are comfortable without heavy coats.",
    free: true,
  },
  {
    name: "Ayia Napa New Year Celebrations",
    city: "Ayia Napa",
    month: 12,
    dateDescription: "31 December",
    type: "music",
    description: "Ayia Napa hosts large-scale New Year's Eve parties and outdoor concerts at the town square and local venues. While quieter than its summer peak, December in Ayia Napa is mild and the New Year festivities draw visitors from across Cyprus.",
    free: true,
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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

const EVENT_TYPE_COLOR: Record<EventType, string> = {
  carnival: "bg-pink-100 text-pink-800",
  wine: "bg-purple-100 text-purple-800",
  music: "bg-blue-100 text-blue-800",
  religious: "bg-amber-100 text-amber-800",
  food: "bg-orange-100 text-orange-800",
  cultural: "bg-teal-100 text-teal-800",
  sports: "bg-green-100 text-green-800",
};

const ALL_TYPES: EventType[] = ["carnival", "wine", "music", "religious", "food", "cultural", "sports"];
const ALL_CITIES: City[] = ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa", "Island-wide"];

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

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/tools/" className="hover:text-slate-900">Tools</Link>
        {" "}&rsaquo;{" "}
        <span className="text-slate-900">Events Calendar</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">Interactive Tool</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Annual Events & Festivals
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Discover festivals, cultural events, and celebrations across Cyprus. Browse by month, filter by type or city.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded font-medium">
            ★ Limassol Carnival — February
          </span>
          <span className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded font-medium">
            ★ Kataklysmos — June
          </span>
          <span className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded font-medium">
            ★ Limassol Wine Festival — September
          </span>
        </div>
      </header>

      {/* Month selector */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Month</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
          {MONTHS.map((m, i) => {
            const count = EVENTS.filter((e) => e.month === i + 1).length;
            const active = selectedMonth === i + 1;
            return (
              <button
                key={m}
                onClick={() => setSelectedMonth(active ? null : i + 1)}
                className={`rounded-lg py-2 px-1 text-xs font-medium border transition-colors flex flex-col items-center gap-0.5 ${
                  active
                    ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
              >
                <span>{m.slice(0, 3)}</span>
                <span className={`text-[10px] ${active ? "text-white/80" : "text-slate-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Type + city filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Event type</h2>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTypeFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                typeFilter === null
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              All types
            </button>
            {ALL_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(typeFilter === t ? null : t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  typeFilter === t
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
              >
                {EVENT_TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:w-56">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">City</h2>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setCityFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                cityFilter === null
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              All cities
            </button>
            {ALL_CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(cityFilter === c ? null : c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  cityFilter === c
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        {filtered.length} event{filtered.length !== 1 ? "s" : ""}
        {selectedMonth !== null ? ` in ${MONTHS[selectedMonth - 1]}` : ""}
      </p>

      {/* Events list grouped by month */}
      {selectedMonth !== null ? (
        <div className="space-y-4">
          {filtered.map((e) => (
            <EventCard key={e.name} event={e} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {MONTHS.map((m, i) => {
            const monthEvents = filtered.filter((e) => e.month === i + 1);
            if (monthEvents.length === 0) return null;
            return (
              <section key={m}>
                <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  {m}
                  <span className="text-sm font-normal text-slate-400">{monthEvents.length} event{monthEvents.length !== 1 ? "s" : ""}</span>
                </h2>
                <div className="space-y-3">
                  {monthEvents.map((e) => (
                    <EventCard key={e.name} event={e} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No events match your filters.
        </div>
      )}

      <p className="mt-6 text-sm">
        <Link href="/tools/" className="text-[#35cdc4] hover:underline">
          &larr; Back to tools
        </Link>
      </p>

      <aside className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Next steps</p>
        <div className="flex flex-wrap gap-3">

<Link href="/guides/cultural-etiquette-guide/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Read: Cultural Etiquette in Cyprus →</Link>          <Link href="/guides/" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors">Explore Cyprus guides →</Link>
        </div>
      </aside>
    </main>
  );
}

function EventCard({ event }: { event: CyprusEvent }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`bg-white border rounded-xl p-4 transition-colors ${
        event.highlight ? "border-amber-300 bg-amber-50" : "border-slate-200 hover:border-slate-400"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {event.highlight && (
              <span className="text-xs bg-amber-400 text-white px-2 py-0.5 rounded-full font-semibold">Highlight</span>
            )}
            <h3 className="font-bold text-slate-900">{event.name}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {event.city} &middot; {event.dateDescription}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${EVENT_TYPE_COLOR[event.type]}`}>
            {EVENT_TYPE_LABEL[event.type]}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${event.free ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}`}>
            {event.free ? "Free" : "Ticketed"}
          </span>
        </div>
      </div>

      <p className={`mt-2 text-sm text-slate-600 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
        {event.description}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-[#35cdc4] hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
        {event.website && (
          <a
            href={event.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-700 hover:underline"
          >
            Official website &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
