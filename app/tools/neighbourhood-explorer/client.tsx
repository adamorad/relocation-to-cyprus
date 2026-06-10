"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── data ─────────────────────────────────────────────────────────────────────

interface Neighbourhood {
  name: string;
  city: string;
  rent1br: string;
  rent2br: string;
  vibe: string[];
  beach: string;
  walkability: number;
  expatDensity: number;
  schoolsNearby: number;
  valueForMoney: number;
  description: string;
}

const NEIGHBOURHOODS: Neighbourhood[] = [
  // LIMASSOL
  {
    name: "Marina / Enaerios",
    city: "Limassol",
    rent1br: "EUR1,200–2,500",
    rent2br: "EUR2,000–4,500",
    vibe: ["Luxury", "Seafront", "Expat hub", "New builds"],
    beach: "0 min walk",
    walkability: 5,
    expatDensity: 5,
    schoolsNearby: 3,
    valueForMoney: 2,
    description:
      "Limassol's most prestigious seafront district. New towers, high-end restaurants and marina. Popular with tech workers and high-net-worth relocators.",
  },
  {
    name: "Germasogeia / Tourist Area",
    city: "Limassol",
    rent1br: "EUR700–1,400",
    rent2br: "EUR1,100–2,200",
    vibe: ["Expat hub", "Restaurants", "Beach access", "Active nightlife"],
    beach: "5 min walk",
    walkability: 4,
    expatDensity: 5,
    schoolsNearby: 4,
    valueForMoney: 3,
    description:
      "The original expat strip. Dense with international restaurants, cafes, and bars. Easy beach access. Popular with Israeli, Russian and UK communities.",
  },
  {
    name: "Mouttayiaka / Ag. Athanasios",
    city: "Limassol",
    rent1br: "EUR600–1,200",
    rent2br: "EUR900–1,800",
    vibe: ["Up-and-coming", "Quiet", "Families", "New builds"],
    beach: "15 min drive",
    walkability: 3,
    expatDensity: 3,
    schoolsNearby: 4,
    valueForMoney: 4,
    description:
      "Quieter residential neighbourhood east of the tourist area. Growing expat presence. Good international schools nearby. More local feel.",
  },
  {
    name: "Limassol Old Town / Agora",
    city: "Limassol",
    rent1br: "EUR550–950",
    rent2br: "EUR850–1,500",
    vibe: ["Character", "Walkable", "Arts & culture", "Cafes"],
    beach: "10 min walk",
    walkability: 5,
    expatDensity: 3,
    schoolsNearby: 2,
    valueForMoney: 4,
    description:
      "Charming historic centre with medieval castle, markets, and boutiques. Walking distance to the seafront. Older building stock but great atmosphere.",
  },
  {
    name: "Mesa Geitonia",
    city: "Limassol",
    rent1br: "EUR480–850",
    rent2br: "EUR750–1,300",
    vibe: ["Residential", "Local feel", "Central", "Good transport"],
    beach: "20 min drive",
    walkability: 3,
    expatDensity: 2,
    schoolsNearby: 3,
    valueForMoney: 4,
    description:
      "Central residential area. Mainly local Cypriots. Good access to the city centre. More affordable than coastal areas.",
  },
  {
    name: "Polemidia",
    city: "Limassol",
    rent1br: "EUR450–750",
    rent2br: "EUR650–1,100",
    vibe: ["Quiet", "Families", "Suburban", "Good value"],
    beach: "25 min drive",
    walkability: 2,
    expatDensity: 2,
    schoolsNearby: 3,
    valueForMoney: 5,
    description:
      "Suburban neighbourhood away from the coast. Larger apartments at lower prices. Families and couples. Less convenient for beach lovers.",
  },
  // PAPHOS
  {
    name: "Kato Paphos / Harbour",
    city: "Paphos",
    rent1br: "EUR500–950",
    rent2br: "EUR750–1,400",
    vibe: ["Tourist hub", "Seafront", "Restaurants", "Historic"],
    beach: "5 min walk",
    walkability: 4,
    expatDensity: 4,
    schoolsNearby: 2,
    valueForMoney: 4,
    description:
      "Paphos town centre around the famous harbour and mosaics. Tourist-centric but pleasant to live in. Good dining and nightlife.",
  },
  {
    name: "Peyia / Coral Bay",
    city: "Paphos",
    rent1br: "EUR550–1,000",
    rent2br: "EUR800–1,600",
    vibe: ["Expat village", "Stunning views", "Quiet", "Coastal"],
    beach: "5 min walk",
    walkability: 3,
    expatDensity: 5,
    schoolsNearby: 2,
    valueForMoney: 4,
    description:
      "Clifftop expat community north of Paphos. Stunning sea views, British-dominated community. Very popular with UK retirees. Quieter than Limassol.",
  },
  {
    name: "Chlorakas",
    city: "Paphos",
    rent1br: "EUR480–850",
    rent2br: "EUR700–1,300",
    vibe: ["Residential", "Families", "British school", "Quiet"],
    beach: "15 min drive",
    walkability: 2,
    expatDensity: 3,
    schoolsNearby: 5,
    valueForMoney: 4,
    description:
      "Popular with families. Close to ISP (International School of Paphos). Residential feel with amenities. Mix of locals and expats.",
  },
  {
    name: "Universal / Paphos Centre",
    city: "Paphos",
    rent1br: "EUR430–780",
    rent2br: "EUR650–1,100",
    vibe: ["Up-and-coming", "Central", "Good value", "Mixed"],
    beach: "10 min drive",
    walkability: 3,
    expatDensity: 2,
    schoolsNearby: 3,
    valueForMoney: 5,
    description:
      "Central Paphos area with good amenities. More local feel. Good value compared to coastal areas. Growing number of new builds.",
  },
  {
    name: "Tala",
    city: "Paphos",
    rent1br: "EUR450–800",
    rent2br: "EUR700–1,250",
    vibe: ["Hilltop village", "Views", "Expat community", "Peaceful"],
    beach: "20 min drive",
    walkability: 2,
    expatDensity: 4,
    schoolsNearby: 2,
    valueForMoney: 4,
    description:
      "Beautiful hilltop village with panoramic views. Popular with British expats. Peaceful and green. Worth the drive to the beach.",
  },
  // LARNACA
  {
    name: "Finikoudes / Seafront",
    city: "Larnaca",
    rent1br: "EUR550–1,000",
    rent2br: "EUR800–1,500",
    vibe: ["Seafront promenade", "Palm trees", "Restaurants", "Central"],
    beach: "0 min walk",
    walkability: 5,
    expatDensity: 3,
    schoolsNearby: 2,
    valueForMoney: 4,
    description:
      "Larnaca's iconic seafront with palm-lined promenade. Central, walkable, and vibrant. Best beach access in the city.",
  },
  {
    name: "McKenzie / Makenzy",
    city: "Larnaca",
    rent1br: "EUR500–900",
    rent2br: "EUR750–1,350",
    vibe: ["Beach bars", "Young crowd", "Lively", "Up-and-coming"],
    beach: "2 min walk",
    walkability: 4,
    expatDensity: 3,
    schoolsNearby: 2,
    valueForMoney: 4,
    description:
      "Popular beach area near the airport (surprisingly quiet). Known for beach bars and cafes. Young, international crowd. One of Larnaca's most desirable areas.",
  },
  {
    name: "Drosia",
    city: "Larnaca",
    rent1br: "EUR550–950",
    rent2br: "EUR800–1,400",
    vibe: ["Residential", "Expat enclave", "Villas", "Quiet"],
    beach: "15 min drive",
    walkability: 2,
    expatDensity: 4,
    schoolsNearby: 3,
    valueForMoney: 3,
    description:
      "Premium residential suburb. Popular with expat families and professionals. Mix of villas and apartments. Quiet and green.",
  },
  {
    name: "Aradippou / Livadia",
    city: "Larnaca",
    rent1br: "EUR380–650",
    rent2br: "EUR550–950",
    vibe: ["Affordable", "Families", "Suburban", "Local"],
    beach: "20 min drive",
    walkability: 2,
    expatDensity: 1,
    schoolsNearby: 3,
    valueForMoney: 5,
    description:
      "Budget-friendly suburb. Primarily local Cypriot community. Larger properties at lower prices. Less convenient for beach lovers and city life.",
  },
  // AYIA NAPA
  {
    name: "Town Centre",
    city: "Ayia Napa",
    rent1br: "EUR400–700",
    rent2br: "EUR600–1,000",
    vibe: ["Party hub", "Seasonal", "Cheap off-season", "Beach nearby"],
    beach: "10 min walk",
    walkability: 4,
    expatDensity: 2,
    schoolsNearby: 1,
    valueForMoney: 5,
    description:
      "Party capital of Cyprus May–September. Very quiet off-season with great deals on rent. Only suitable as year-round base for those who embrace the seasonal swings.",
  },
  {
    name: "Protaras / Fig Tree Bay",
    city: "Ayia Napa",
    rent1br: "EUR450–800",
    rent2br: "EUR650–1,100",
    vibe: ["Family-friendly", "Beautiful beaches", "Quieter", "Seasonal"],
    beach: "5 min walk",
    walkability: 3,
    expatDensity: 2,
    schoolsNearby: 1,
    valueForMoney: 4,
    description:
      "Home to one of the best beaches in the Mediterranean. Quieter than Ayia Napa town. Family-friendly in summer but very seasonal — limited services in winter.",
  },
];

const CITIES = ["All", "Limassol", "Paphos", "Larnaca", "Ayia Napa"] as const;
type City = (typeof CITIES)[number];

const VIBE_FILTERS = [
  "Expat hub",
  "Families",
  "Beach access",
  "Quiet",
  "Up-and-coming",
  "Good value",
  "Walkable",
] as const;
type VibeFilter = (typeof VIBE_FILTERS)[number];

// Map filter chips to vibe tags that appear in data
const VIBE_MAP: Record<VibeFilter, string[]> = {
  "Expat hub": ["Expat hub", "Expat village", "Expat community", "Expat enclave"],
  Families: ["Families", "Family-friendly"],
  "Beach access": ["Seafront", "Coastal", "Beach nearby", "Beach bars", "Beautiful beaches"],
  Quiet: ["Quiet", "Peaceful"],
  "Up-and-coming": ["Up-and-coming"],
  "Good value": ["Good value", "Affordable", "Cheap off-season"],
  Walkable: ["Walkable"],
};

// ── sub-components ────────────────────────────────────────────────────────────

function RatingDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-2 h-2 rounded-full ${
            i < value ? "bg-[#35cdc4]" : "bg-slate-200"
          }`}
        />
      ))}
    </span>
  );
}

function CityBadge({ city }: { city: string }) {
  const colours: Record<string, string> = {
    Limassol: "bg-teal-100 text-teal-800",
    Paphos: "bg-blue-100 text-blue-800",
    Larnaca: "bg-violet-100 text-violet-800",
    "Ayia Napa": "bg-orange-100 text-orange-800",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colours[city] ?? "bg-slate-100 text-slate-700"}`}
    >
      {city}
    </span>
  );
}

function RentBadge({ rent }: { rent: string }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
      {rent}
    </span>
  );
}

interface CardProps {
  n: Neighbourhood;
  selected: boolean;
  onToggle: () => void;
  compareCount: number;
}

function NeighbourhoodCard({ n, selected, onToggle, compareCount }: CardProps) {
  const canAdd = selected || compareCount < 3;
  return (
    <article className="relative flex flex-col bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* compare checkbox */}
      <label className="absolute top-4 right-4 flex items-center gap-1.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          disabled={!canAdd}
          className="w-3.5 h-3.5 accent-[#35cdc4] cursor-pointer disabled:cursor-not-allowed"
        />
        <span className="text-[10px] text-slate-500 font-medium">Compare</span>
      </label>

      {/* header */}
      <div className="pr-20 mb-3">
        <h3 className="font-bold text-slate-900 text-base leading-tight mb-2">{n.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          <CityBadge city={n.city} />
          <RentBadge rent={`1BR ${n.rent1br}`} />
        </div>
      </div>

      {/* vibe tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {n.vibe.map((v) => (
          <span key={v} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
            {v}
          </span>
        ))}
      </div>

      {/* beach */}
      <p className="text-xs text-slate-600 mb-3">
        <span className="mr-1">🏖</span>
        {n.beach}
      </p>

      {/* ratings */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
        {(
          [
            ["Walkability", n.walkability],
            ["Expat presence", n.expatDensity],
            ["Schools nearby", n.schoolsNearby],
            ["Value for money", n.valueForMoney],
          ] as [string, number][]
        ).map(([label, val]) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500">{label}</span>
            <RatingDots value={val} />
          </div>
        ))}
      </div>

      {/* description */}
      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{n.description}</p>
    </article>
  );
}

// ── comparison table ──────────────────────────────────────────────────────────

function CompareTable({ items }: { items: Neighbourhood[] }) {
  const RATING_ROWS: [string, keyof Neighbourhood][] = [
    ["Walkability", "walkability"],
    ["Expat presence", "expatDensity"],
    ["Schools nearby", "schoolsNearby"],
    ["Value for money", "valueForMoney"],
  ];

  return (
    <section className="mt-10 border border-teal-200 rounded-2xl overflow-hidden">
      <div className="bg-teal-50 px-5 py-3 border-b border-teal-200">
        <h2 className="text-sm font-bold text-slate-800">
          Comparing {items.length} neighbourhood{items.length > 1 ? "s" : ""}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wide w-32">
                Metric
              </th>
              {items.map((n) => (
                <th key={n.name} className="px-4 py-3 text-left font-semibold text-slate-800">
                  <div>{n.name}</div>
                  <CityBadge city={n.city} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* rent 1br */}
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-500 font-medium">1BR Rent</td>
              {items.map((n) => (
                <td key={n.name} className="px-4 py-3 text-slate-700 font-semibold">
                  {n.rent1br}
                </td>
              ))}
            </tr>
            {/* rent 2br */}
            <tr className="border-b border-slate-100 bg-slate-50">
              <td className="px-4 py-3 text-slate-500 font-medium">2BR Rent</td>
              {items.map((n) => (
                <td key={n.name} className="px-4 py-3 text-slate-700">
                  {n.rent2br}
                </td>
              ))}
            </tr>
            {/* vibe */}
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-500 font-medium">Vibe</td>
              {items.map((n) => (
                <td key={n.name} className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {n.vibe.map((v) => (
                      <span
                        key={v}
                        className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-full"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            {/* beach */}
            <tr className="border-b border-slate-100 bg-slate-50">
              <td className="px-4 py-3 text-slate-500 font-medium">Beach</td>
              {items.map((n) => (
                <td key={n.name} className="px-4 py-3 text-slate-700">
                  {n.beach}
                </td>
              ))}
            </tr>
            {/* rating rows */}
            {RATING_ROWS.map(([label, key], idx) => (
              <tr key={label} className={`border-b border-slate-100 ${idx % 2 === 0 ? "" : "bg-slate-50"}`}>
                <td className="px-4 py-3 text-slate-500 font-medium">{label}</td>
                {items.map((n) => (
                  <td key={n.name} className="px-4 py-3">
                    <RatingDots value={n[key] as number} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function NeighbourhoodExplorerClient() {
  const [city, setCity] = useState<City>("All");
  const [vibeFilters, setVibeFilters] = useState<Set<VibeFilter>>(new Set());
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set());

  const toggleVibe = (v: VibeFilter) => {
    setVibeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  };

  const toggleCompare = (name: string) => {
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else if (next.size < 3) next.add(name);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return NEIGHBOURHOODS.filter((n) => {
      if (city !== "All" && n.city !== city) return false;
      if (vibeFilters.size > 0) {
        const matchesAny = [...vibeFilters].some((filter) => {
          const tags = VIBE_MAP[filter];
          return tags.some((tag) => n.vibe.includes(tag));
        });
        if (!matchesAny) return false;
      }
      return true;
    });
  }, [city, vibeFilters]);

  const compareItems = useMemo(
    () => NEIGHBOURHOODS.filter((n) => compareSet.has(n.name)),
    [compareSet],
  );

  return (
    <main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
      {/* breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">Neighbourhood Explorer</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Research
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Neighbourhood Explorer
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Browse neighbourhoods across Cyprus and find the area that fits your lifestyle. Filter by
          city and vibe, then compare up to 3 areas side by side.
        </p>
      </header>

      {/* city tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CITIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              city === c
                ? "bg-[#35cdc4] text-slate-900"
                : "bg-white border border-slate-200 text-slate-700 hover:border-[#35cdc4]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* vibe filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {VIBE_FILTERS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => toggleVibe(v)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              vibeFilters.has(v)
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {v}
          </button>
        ))}
        {vibeFilters.size > 0 && (
          <button
            type="button"
            onClick={() => setVibeFilters(new Set())}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-800 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* result count + compare hint */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500">
          {filtered.length} neighbourhood{filtered.length !== 1 ? "s" : ""} shown
        </p>
        {compareSet.size > 0 && (
          <p className="text-xs text-teal-700 font-medium">
            {compareSet.size} selected — {compareSet.size < 3 ? "select up to " + (3 - compareSet.size) + " more or " : ""}
            <button
              type="button"
              className="underline"
              onClick={() => setCompareSet(new Set())}
            >
              clear
            </button>
          </p>
        )}
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500 text-sm">
          No neighbourhoods match your current filters.{" "}
          <button
            type="button"
            className="underline hover:text-slate-800"
            onClick={() => {
              setCity("All");
              setVibeFilters(new Set());
            }}
          >
            Reset all
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((n) => (
            <NeighbourhoodCard
              key={n.name}
              n={n}
              selected={compareSet.has(n.name)}
              onToggle={() => toggleCompare(n.name)}
              compareCount={compareSet.size}
            />
          ))}
        </div>
      )}

      {/* comparison table */}
      {compareItems.length >= 2 && <CompareTable items={compareItems} />}

      {/* disclaimer */}
      <aside className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          Rent ranges and neighbourhood descriptions are indicative only, based on general market
          knowledge as of early 2025. Actual rents vary by property type, condition, and season.
          This is not real-estate or financial advice — always verify with local agents.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          &larr; Back to Tools
        </Link>
      </p>
    </main>
  );
}
