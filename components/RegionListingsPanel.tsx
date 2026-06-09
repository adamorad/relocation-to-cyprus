"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { EnrichedListing } from "@/lib/listingsData";
import {
  BED_OPTIONS,
  BATH_OPTIONS,
  type BedFilter,
  type BathFilter,
  type SortKey,
  type Tri,
  offerBedCounts,
  listingMinPrice,
  listingMaxPrice,
  listingMaxLivingArea,
  listingMinPricePerM2,
  listingBuildingType,
  specVal,
  matchesBeds,
  matchesBaths,
  formatEuros,
  uniqueSpec,
} from "@/lib/listingFilters";

const ListingsMap = dynamic(() => import("./ListingsMap"), { ssr: false, loading: () => <div className="flex-1 flex items-center justify-center text-sm text-slate-500">Loading map…</div> });

type Props = {
  region: string | null;
  listings: EnrichedListing[];
  pushedAside?: boolean;
  onClose: () => void;
  onPick: (listing: EnrichedListing) => void;
};

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
  const [maxPricePerM2, setMaxPricePerM2] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [moreOpen, setMoreOpen] = useState(false);
  const [filtersCollapsed, setFiltersCollapsed] = useState(true);
  const [listView, setListView] = useState<"grid" | "map">("grid");

  const open = region !== null;
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    setListView("grid");
  }, [region]);

  const types = useMemo(
    () => uniqueSpec(listings, "Building type"),
    [listings],
  );
  const views = useMemo(() => uniqueSpec(listings, "View"), [listings]);
  const locTypes = useMemo(
    () => uniqueSpec(listings, "Type of location"),
    [listings],
  );
  const energyOptions = useMemo(
    () => ["any", ...uniqueSpec(listings, "Energy Efficiency")],
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

  const ppmCeiling = useMemo(() => {
    let m = 0;
    for (const l of listings) {
      const v = listingMinPricePerM2(l);
      if (v > m) m = v;
    }
    return Math.ceil((m || 10_000) / 500) * 500;
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
      if (maxPricePerM2 != null) {
        const ppm = listingMinPricePerM2(l);
        if (ppm > 0 && ppm > maxPricePerM2) return false;
      }
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
    maxPricePerM2,
    sort,
  ]);

  const resetFilters = () => {
    setMaxPrice(null);
    setMaxPricePerM2(null);
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
    maxPricePerM2 !== null ||
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
        !visible
          ? "opacity-0 pointer-events-none"
          : pushedAside
            ? "md:justify-start md:pl-3 md:pr-2 md:right-[568px] md:left-0 md:pointer-events-none -translate-x-full md:translate-x-0 md:opacity-100"
            : "justify-center p-2 md:p-8 opacity-100 pointer-events-auto bg-slate-900/30 backdrop-blur-[2px]"
      }`}
      onClick={pushedAside ? undefined : onClose}
      aria-hidden={!visible}
    >
      <aside
        className={`relative w-full h-full ${pushedAside ? "md:pointer-events-auto" : "max-w-[960px] max-h-[92vh] md:max-h-[88vh]"} bg-white text-slate-900 shadow-2xl rounded-xl md:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal={visible}
        aria-label={region ? `${region} new developments` : undefined}
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
            <p className="text-xs text-slate-600 mt-1">
              <span className="text-slate-700 font-semibold">
                {filtered.length}
              </span>{" "}
              of {listings.length} listings
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <button
              type="button"
              onClick={() => setFiltersCollapsed((v) => !v)}
              className="text-slate-500 hover:text-slate-900 text-xs font-semibold px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-50 flex items-center gap-1 transition-colors"
              aria-label={filtersCollapsed ? "Show filters" : "Hide filters"}
              title={filtersCollapsed ? "Show filters" : "Hide filters"}
            >
              <span aria-hidden>{filtersCollapsed ? "▾" : "▴"}</span>
              Filters
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-900 text-2xl leading-none w-11 h-11 rounded-full hover:bg-slate-100 flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {!filtersCollapsed && <div className="mt-3 space-y-3">
          {/* Max price */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
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
              <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                aria-expanded={moreOpen}
              >
                <span aria-hidden>{moreOpen ? "▴" : "▾"}</span>
                {moreOpen ? "Hide" : "More"} filters
                {(() => {
                  const n = [view !== "any", locType !== "any", energy !== "any", pool !== "any", wheelchair !== "any", minArea > 0, maxPricePerM2 !== null].filter(Boolean).length;
                  return n > 0 ? <span className="ml-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-full px-1.5 py-px leading-none">{n}</span> : null;
                })()}
              </button>
              <div className="flex gap-0.5 bg-slate-100 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setListView("grid")}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-md transition-colors ${listView === "grid" ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setListView("map")}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-md transition-colors ${listView === "map" ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Map
                </button>
              </div>
            </div>
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
                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
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
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                    Max price / m²
                  </span>
                  <span className="text-xs text-slate-900 font-semibold">
                    {maxPricePerM2 == null
                      ? `Up to €${ppmCeiling.toLocaleString()}/m²`
                      : `≤ €${maxPricePerM2.toLocaleString()}/m²`}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={ppmCeiling}
                  step={500}
                  value={maxPricePerM2 ?? ppmCeiling}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setMaxPricePerM2(v >= ppmCeiling ? null : v);
                  }}
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
                <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  Energy efficiency
                </div>
                <div className="flex gap-1">
                  {energyOptions.map((e) => (
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
        </div>}
      </div>

      {listView === "map" ? (
        <div className="flex-1 overflow-hidden">
          <ListingsMap listings={filtered} onPick={onPick} />
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 p-4 bg-stone-50/60">
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-slate-600 py-12 space-y-3">
              <p>No listings match these filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
              {filtered.map((l) => (
                <ListingCard key={l.slug} listing={l} onPick={onPick} />
              ))}
            </div>
          )}
        </div>
      )}
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
      <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
        {label}
      </div>
      <div className="flex gap-1">
        {options.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onChange(b)}
            aria-pressed={value === b}
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
      <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
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
      <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
        {label}
      </div>
      <div className="flex gap-1">
        {opts.map(([v, lbl]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={value === v}
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
            src={thumb}
            alt={listing.title}
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
        <div className="text-[11px] text-slate-600 truncate">
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
