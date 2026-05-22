"use client";

import { useMemo, useState } from "react";
import type { EnrichedListing, Offer } from "@/lib/listingsData";
import { asset } from "@/lib/url";

type Props = {
  region: string | null;
  listings: EnrichedListing[];
  pushedAside?: boolean;
  onClose: () => void;
  onPick: (listing: EnrichedListing) => void;
};

type SortKey = "price-asc" | "price-desc" | "title";
type BedFilter = "any" | "1" | "2" | "3" | "4+";
type BathFilter = "any" | "1" | "2" | "3+";
type Tri = "any" | "yes" | "no";

const BED_OPTIONS: ReadonlyArray<BedFilter> = ["any", "1", "2", "3", "4+"];
const BATH_OPTIONS: ReadonlyArray<BathFilter> = ["any", "1", "2", "3+"];
const ENERGY_OPTIONS = ["any", "A", "B", "C", "D"] as const;

function parsePriceRange(s: string | null | undefined): [number, number] | null {
  if (!s) return null;
  const nums = Array.from(s.matchAll(/€?\s*([\d.,]+)/g))
    .map((m) => Number(m[1].replace(/[.,]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 1000);
  if (nums.length === 0) return null;
  return [Math.min(...nums), Math.max(...nums)];
}

function offerBedCounts(offers: Offer[]): number[] {
  const out: number[] = [];
  for (const o of offers) {
    const b = Number(o.bedrooms ?? (o as { features?: Record<string, string> }).features?.bedrooms);
    if (Number.isFinite(b) && b > 0) out.push(b);
  }
  return out;
}

function offerBathCounts(offers: Offer[]): number[] {
  const out: number[] = [];
  for (const o of offers) {
    const b = Number(o.bathrooms ?? (o as { features?: Record<string, string> }).features?.bathrooms);
    if (Number.isFinite(b) && b > 0) out.push(b);
  }
  return out;
}

function offerLivingAreas(offers: Offer[]): number[] {
  const out: number[] = [];
  for (const o of offers) {
    const v =
      (o["living area"] as string | null | undefined) ??
      (o as { features?: Record<string, string> }).features?.living_area;
    const n = v ? Number((v.match(/[\d.]+/) ?? [""])[0]) : NaN;
    if (Number.isFinite(n) && n > 0) out.push(n);
  }
  return out;
}

function listingBuildingType(l: EnrichedListing): string {
  return (l.specs?.["Building type"] ?? "").trim();
}

function specVal(l: EnrichedListing, key: string): string {
  return (l.specs?.[key] ?? "").trim();
}

function matchesBeds(l: EnrichedListing, bed: BedFilter): boolean {
  if (bed === "any") return true;
  const counts = offerBedCounts(l.offers);
  if (counts.length === 0) return false;
  if (bed === "4+") return counts.some((c) => c >= 4);
  return counts.includes(Number(bed));
}

function matchesBaths(l: EnrichedListing, bath: BathFilter): boolean {
  if (bath === "any") return true;
  const counts = offerBathCounts(l.offers);
  if (counts.length === 0) return false;
  if (bath === "3+") return counts.some((c) => c >= 3);
  return counts.includes(Number(bath));
}

function listingMinPrice(l: EnrichedListing): number {
  const range = parsePriceRange(l.priceRange);
  if (range) return range[0];
  let min = Number.POSITIVE_INFINITY;
  for (const o of l.offers) {
    const p = parsePriceRange(o.price);
    if (p && p[0] < min) min = p[0];
  }
  return Number.isFinite(min) ? min : 0;
}

function listingMaxPrice(l: EnrichedListing): number {
  const range = parsePriceRange(l.priceRange);
  if (range) return range[1];
  let max = 0;
  for (const o of l.offers) {
    const p = parsePriceRange(o.price);
    if (p && p[1] > max) max = p[1];
  }
  return max;
}

function listingMaxLivingArea(l: EnrichedListing): number {
  const areas = offerLivingAreas(l.offers);
  return areas.length ? Math.max(...areas) : 0;
}

function formatEuros(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return `€${(n / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })}k`;
}

function firstImage(l: EnrichedListing): string | null {
  if (l.headerImage) return l.headerImage;
  if (l.images && l.images.length > 0) return l.images[0];
  return null;
}

export default function RegionListingsPanel({
  region,
  listings,
  pushedAside = false,
  onClose,
  onPick,
}: Props) {
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [bed, setBed] = useState<BedFilter>("any");
  const [bath, setBath] = useState<BathFilter>("any");
  const [type, setType] = useState<string>("any");
  const [view, setView] = useState<string>("any");
  const [locType, setLocType] = useState<string>("any");
  const [energy, setEnergy] = useState<string>("any");
  const [pool, setPool] = useState<Tri>("any");
  const [wheelchair, setWheelchair] = useState<Tri>("any");
  const [minArea, setMinArea] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [moreOpen, setMoreOpen] = useState(false);

  const types = useMemo(
    () => uniqueSpec(listings, "Building type"),
    [listings],
  );
  const views = useMemo(() => uniqueSpec(listings, "View"), [listings]);
  const locTypes = useMemo(
    () => uniqueSpec(listings, "Type of location"),
    [listings],
  );

  const priceCeiling = useMemo(() => {
    let m = 0;
    for (const l of listings) {
      const p = listingMaxPrice(l);
      if (p > m) m = p;
    }
    return m || 5_000_000;
  }, [listings]);

  const areaCeiling = useMemo(() => {
    let m = 0;
    for (const l of listings) {
      const a = listingMaxLivingArea(l);
      if (a > m) m = a;
    }
    return m || 500;
  }, [listings]);

  const filtered = useMemo(() => {
    const f = listings.filter((l) => {
      if (bed !== "any" && !matchesBeds(l, bed)) return false;
      if (bath !== "any" && !matchesBaths(l, bath)) return false;
      if (type !== "any" && listingBuildingType(l) !== type) return false;
      if (view !== "any" && specVal(l, "View") !== view) return false;
      if (locType !== "any" && specVal(l, "Type of location") !== locType)
        return false;
      if (energy !== "any" && specVal(l, "Energy Efficiency") !== energy)
        return false;
      if (pool !== "any") {
        const p = specVal(l, "Pool").toLowerCase();
        const has = p && p !== "no";
        if (pool === "yes" && !has) return false;
        if (pool === "no" && has) return false;
      }
      if (wheelchair !== "any") {
        const w = specVal(l, "Wheelchair Accessible").toLowerCase();
        const has = w === "yes";
        if (wheelchair === "yes" && !has) return false;
        if (wheelchair === "no" && has) return false;
      }
      if (maxPrice != null && listingMinPrice(l) > maxPrice) return false;
      if (minArea > 0 && listingMaxLivingArea(l) < minArea) return false;
      return true;
    });
    const sorted = [...f];
    sorted.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "price-desc") return listingMinPrice(b) - listingMinPrice(a);
      return listingMinPrice(a) - listingMinPrice(b);
    });
    return sorted;
  }, [
    listings,
    bed,
    bath,
    type,
    view,
    locType,
    energy,
    pool,
    wheelchair,
    maxPrice,
    minArea,
    sort,
  ]);

  const resetFilters = () => {
    setMaxPrice(null);
    setBed("any");
    setBath("any");
    setType("any");
    setView("any");
    setLocType("any");
    setEnergy("any");
    setPool("any");
    setWheelchair("any");
    setMinArea(0);
  };

  const filtersActive =
    maxPrice !== null ||
    bed !== "any" ||
    bath !== "any" ||
    type !== "any" ||
    view !== "any" ||
    locType !== "any" ||
    energy !== "any" ||
    pool !== "any" ||
    wheelchair !== "any" ||
    minArea > 0;

  const visible = region !== null;

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center transition-all duration-300 ${
        pushedAside
          ? "md:justify-start md:pl-3 md:pr-2 md:right-[568px] md:left-0 md:pointer-events-none -translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
          : "justify-center p-2 md:p-8"
      } ${
        visible && !pushedAside
          ? "opacity-100 pointer-events-auto bg-slate-900/30 backdrop-blur-[2px]"
          : visible && pushedAside
            ? ""
            : "opacity-0 pointer-events-none"
      }`}
      onClick={pushedAside ? undefined : onClose}
      aria-hidden={!visible}
    >
      <aside
        className={`relative w-full h-full ${pushedAside ? "md:pointer-events-auto" : "max-w-[960px] max-h-[92vh] md:max-h-[88vh]"} bg-white text-slate-900 shadow-2xl rounded-xl md:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
      <div className="px-5 pt-5 pb-3 border-b border-slate-200 bg-white">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-700 font-semibold">
              Region
            </p>
            <h2 className="mt-0.5 text-2xl font-bold leading-snug">
              {region ?? ""}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-slate-700 font-semibold">
                {filtered.length}
              </span>{" "}
              of {listings.length} listings
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-slate-900 text-2xl leading-none w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {/* Max price */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Max price
              </span>
              <span className="text-xs text-slate-900 font-semibold">
                {maxPrice == null
                  ? `Up to ${formatEuros(priceCeiling)}`
                  : `≤ ${formatEuros(maxPrice)}`}
              </span>
            </div>
            <input
              type="range"
              min={100_000}
              max={priceCeiling}
              step={50_000}
              value={maxPrice ?? priceCeiling}
              onChange={(e) => {
                const v = Number(e.target.value);
                setMaxPrice(v >= priceCeiling ? null : v);
              }}
              className="w-full accent-slate-900"
            />
          </div>

          {/* Bedrooms + Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <ChipRow
              label="Bedrooms"
              options={BED_OPTIONS}
              value={bed}
              onChange={setBed}
            />
            <ChipRow
              label="Bathrooms"
              options={BATH_OPTIONS}
              value={bath}
              onChange={setBath}
            />
          </div>

          {/* Type + Sort always visible */}
          <div className="grid grid-cols-2 gap-2">
            <Dropdown
              label="Type"
              value={type}
              options={types}
              onChange={setType}
            />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Sort
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs"
              >
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="title">Name A–Z</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="text-xs font-semibold text-slate-900 hover:text-slate-700"
            >
              {moreOpen ? "Hide" : "More"} filters{" "}
              <span aria-hidden>{moreOpen ? "▴" : "▾"}</span>
            </button>
            {filtersActive ? (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold px-2 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1"
              >
                <span aria-hidden>↻</span> Reset filters
              </button>
            ) : null}
          </div>

          {moreOpen ? (
            <div className="space-y-3 pt-1 border-t border-slate-200">
              <div>
                <div className="flex items-baseline justify-between mb-1 mt-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Min living area
                  </span>
                  <span className="text-xs text-slate-900 font-semibold">
                    {minArea === 0 ? "Any" : `≥ ${minArea} m²`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={areaCeiling}
                  step={10}
                  value={minArea}
                  onChange={(e) => setMinArea(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Dropdown
                  label="View"
                  value={view}
                  options={views}
                  onChange={setView}
                />
                <Dropdown
                  label="Location"
                  value={locType}
                  options={locTypes}
                  onChange={setLocType}
                />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                  Energy efficiency
                </div>
                <div className="flex gap-1">
                  {ENERGY_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEnergy(e)}
                      className={`flex-1 text-xs font-medium px-2 py-1 rounded ${
                        energy === e
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {e === "any" ? "Any" : e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <TriToggle label="Pool" value={pool} onChange={setPool} />
                <TriToggle
                  label="Wheelchair access"
                  value={wheelchair}
                  onChange={setWheelchair}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-4 bg-stone-50/60">
        {filtered.length === 0 ? (
          <div className="text-center text-sm text-slate-500 py-12">
            No listings match these filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
            {filtered.map((l) => (
              <ListingCard key={l.slug} listing={l} onPick={onPick} />
            ))}
          </div>
        )}
      </div>
      </aside>
    </div>
  );
}

function ChipRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ReadonlyArray<T>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
        {label}
      </div>
      <div className="flex gap-1">
        {options.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onChange(b)}
            className={`flex-1 text-xs font-medium px-1.5 py-1 rounded ${
              value === b
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {b === "any" ? "Any" : b}
          </button>
        ))}
      </div>
    </div>
  );
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs"
      >
        <option value="any">Any</option>
        {options.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}

function TriToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Tri;
  onChange: (v: Tri) => void;
}) {
  const opts: Array<[Tri, string]> = [
    ["any", "Any"],
    ["yes", "Yes"],
    ["no", "No"],
  ];
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
        {label}
      </div>
      <div className="flex gap-1">
        {opts.map(([v, lbl]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 text-xs font-medium px-1 py-1 rounded ${
              value === v
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

function uniqueSpec(listings: EnrichedListing[], key: string): string[] {
  const set = new Set<string>();
  for (const l of listings) {
    const v = specVal(l, key);
    if (v) set.add(v);
  }
  return Array.from(set).sort();
}

function ListingCard({
  listing,
  onPick,
}: {
  listing: EnrichedListing;
  onPick: (l: EnrichedListing) => void;
}) {
  const beds = useMemo(() => {
    const c = offerBedCounts(listing.offers);
    if (c.length === 0) return null;
    const min = Math.min(...c);
    const max = Math.max(...c);
    return min === max ? `${min}` : `${min}–${max}`;
  }, [listing.offers]);
  const type = listingBuildingType(listing) || "—";
  const thumb = firstImage(listing);

  return (
    <button
      type="button"
      onClick={() => onPick(listing)}
      className="w-full h-full text-left rounded-lg border border-slate-200 bg-white hover:border-slate-900 hover:shadow-md transition-all overflow-hidden group flex flex-col"
    >
      <div className="aspect-[16/9] bg-slate-100 overflow-hidden flex-shrink-0">
        {thumb ? (
          <img
            src={asset(thumb)}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : null}
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1">
        <div
          className="font-semibold text-sm leading-snug group-hover:text-slate-900 line-clamp-2"
          style={{ minHeight: "2.5em" }}
        >
          {listing.title}
        </div>
        <div className="text-[11px] text-slate-500 truncate">
          {listing.location ?? listing.regionCity}
        </div>
        <div className="mt-auto pt-1.5">
          <div className="text-slate-900 text-sm font-semibold">
            {listing.priceRange ?? "—"}
          </div>
          <div className="flex gap-1.5 mt-1.5 text-[11px] text-slate-600 flex-wrap">
            <span className="bg-slate-100 px-1.5 py-0.5 rounded">{type}</span>
            {beds ? (
              <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                {beds} bed{beds === "1" ? "" : "s"}
              </span>
            ) : null}
            <span className="bg-slate-100 px-1.5 py-0.5 rounded">
              {listing.offers.length} unit{listing.offers.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
