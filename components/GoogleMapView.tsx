"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Map as GMap, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { LISTINGS, type EnrichedListing } from "@/lib/listingsData";
import {
  BED_OPTIONS,
  BATH_OPTIONS,
  ENERGY_OPTIONS,
  type BedFilter,
  type BathFilter,
  type Tri,
  listingMinPrice,
  listingMaxPrice,
  listingMaxLivingArea,
  listingMinPricePerM2,
  listingBuildingType,
  specVal,
  matchesBeds,
  matchesBaths,
  uniqueSpec,
} from "@/lib/listingFilters";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatMinPrice(l: EnrichedListing): string {
  const min = listingMinPrice(l);
  if (!min) return l.title.split(" ").slice(0, 2).join(" ");
  if (min >= 1_000_000) return `€${(min / 1_000_000).toFixed(1)}M`;
  return `€${Math.round(min / 1000)}k`;
}

// Tight bounds around Cyprus only
const CYPRUS_BOUNDS = { south: 34.45, west: 32.15, north: 35.75, east: 34.65 };

// ── Clusterer wiring ──────────────────────────────────────────────────────────
type ClusteredMarkersProps = {
  listings: EnrichedListing[];
  onPick: (l: EnrichedListing) => void;
};

function ClusteredMarkers({ listings, onPick }: ClusteredMarkersProps) {
  const map = useMap();
  const markerLib = useMapsLibrary("marker");
  const clustererRef = useRef<MarkerClusterer | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: google.maps types only available at runtime
  const markersRef = useRef<globalThis.Map<string, any>>(new globalThis.Map());

  useEffect(() => {
    if (!map) return;
    clustererRef.current = new MarkerClusterer({ map });
    return () => {
      clustererRef.current?.clearMarkers();
      clustererRef.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (!clustererRef.current || !markerLib) return;
    const clusterer = clustererRef.current;
    const slugSet = new Set(listings.map((l) => l.slug));

    for (const [slug, marker] of markersRef.current) {
      if (!slugSet.has(slug)) {
        clusterer.removeMarker(marker);
        markersRef.current.delete(slug);
      }
    }

    // biome-ignore lint/suspicious/noExplicitAny: google.maps types only available at runtime
    const toAdd: any[] = [];
    for (const l of listings) {
      if (!l.lat || !l.lng || markersRef.current.has(l.slug)) continue;
      const el = document.createElement("div");
      el.className =
        "cursor-pointer bg-slate-900 text-white rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-md hover:bg-amber-600 transition-colors whitespace-nowrap select-none";
      el.textContent = formatMinPrice(l);

      const marker = new markerLib.AdvancedMarkerElement({
        position: { lat: l.lat, lng: l.lng },
        content: el,
        title: l.title,
      });
      marker.addListener("click", () => onPick(l));
      markersRef.current.set(l.slug, marker);
      toAdd.push(marker);
    }
    if (toAdd.length > 0) clusterer.addMarkers(toAdd);
  }, [listings, onPick, markerLib]);

  return null;
}

// ── Sub-components ────────────────────────────────────────────────────────────

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
            className={`flex-1 text-xs font-medium px-1.5 py-1 rounded transition-colors ${
              value === b
                ? "bg-slate-900 text-white"
                : "bg-white/50 text-slate-700 hover:bg-white/80"
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
        className="w-full bg-white/50 border border-white/60 rounded px-2 py-1.5 text-xs backdrop-blur-sm"
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
            className={`flex-1 text-xs font-medium px-1 py-1 rounded transition-colors ${
              value === v
                ? "bg-slate-900 text-white"
                : "bg-white/50 text-slate-700 hover:bg-white/80"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
type Props = {
  onPickListing: (listing: EnrichedListing) => void;
  onToggleMode: () => void;
};

export default function GoogleMapView({ onPickListing, onToggleMode }: Props) {
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [maxPricePerM2, setMaxPricePerM2] = useState<number | null>(null);
  const [bed, setBed] = useState<BedFilter>("any");
  const [bath, setBath] = useState<BathFilter>("any");
  const [type, setType] = useState<string>("any");
  const [view, setView] = useState<string>("any");
  const [locType, setLocType] = useState<string>("any");
  const [energy, setEnergy] = useState<string>("any");
  const [pool, setPool] = useState<Tri>("any");
  const [wheelchair, setWheelchair] = useState<Tri>("any");
  const [minArea, setMinArea] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const priceCeiling = useMemo(() => {
    let m = 0;
    for (const l of LISTINGS) {
      const p = listingMaxPrice(l);
      if (p > m) m = p;
    }
    return Math.ceil((m || 5_000_000) / 100_000) * 100_000;
  }, []);

  const areaCeiling = useMemo(() => {
    let m = 0;
    for (const l of LISTINGS) {
      const a = listingMaxLivingArea(l);
      if (a > m) m = a;
    }
    return m || 500;
  }, []);

  const ppmCeiling = useMemo(() => {
    let m = 0;
    for (const l of LISTINGS) {
      const v = listingMinPricePerM2(l);
      if (v > m) m = v;
    }
    return Math.ceil((m || 10_000) / 500) * 500;
  }, []);

  const types = useMemo(() => uniqueSpec(LISTINGS, "Building type"), []);
  const views = useMemo(() => uniqueSpec(LISTINGS, "View"), []);
  const locTypes = useMemo(() => uniqueSpec(LISTINGS, "Type of location"), []);

  const filtered = useMemo(
    () =>
      LISTINGS.filter((l) => {
        if (!l.lat || !l.lng) return false;
        if (bed !== "any" && !matchesBeds(l, bed)) return false;
        if (bath !== "any" && !matchesBaths(l, bath)) return false;
        if (type !== "any" && listingBuildingType(l) !== type) return false;
        if (view !== "any" && specVal(l, "View") !== view) return false;
        if (locType !== "any" && specVal(l, "Type of location") !== locType) return false;
        if (energy !== "any" && specVal(l, "Energy Efficiency") !== energy) return false;
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
      }),
    [maxPrice, maxPricePerM2, bed, bath, type, view, locType, energy, pool, wheelchair, minArea],
  );

  const filtersActive =
    maxPrice !== null || maxPricePerM2 !== null || bed !== "any" || bath !== "any" ||
    type !== "any" || view !== "any" || locType !== "any" || energy !== "any" ||
    pool !== "any" || wheelchair !== "any" || minArea > 0;

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

  return (
    <div className="absolute inset-0">
      {/* ── Map fills the entire container ── */}
      <GMap
        defaultBounds={CYPRUS_BOUNDS}
        mapId="cyprus_main"
        gestureHandling="greedy"
        disableDefaultUI
        style={{ width: "100%", height: "100%" }}
      >
        <ClusteredMarkers listings={filtered} onPick={onPickListing} />
      </GMap>

      {/* ── Mode toggle (Illustrated) — always left of sidebar ── */}
      <button
        type="button"
        onClick={onToggleMode}
        className={`absolute top-3 z-20 bg-white/70 backdrop-blur-xl border border-white/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg hover:bg-white/90 transition-all ${
          sidebarOpen ? "right-[268px]" : "right-3"
        }`}
      >
        🎨 Illustrated
      </button>

      {/* ── Sidebar toggle ── */}
      <button
        type="button"
        onClick={() => setSidebarOpen((v) => !v)}
        className={`absolute top-12 z-20 bg-white/70 backdrop-blur-xl border border-white/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg hover:bg-white/90 transition-all flex items-center gap-1.5 ${
          sidebarOpen ? "right-[268px]" : "right-3"
        }`}
      >
        {sidebarOpen ? "Hide filters" : "Filters"}
        {!sidebarOpen && filtersActive && (
          <span className="bg-slate-900 text-white text-[9px] font-bold rounded-full px-1.5 py-px leading-none">
            ●
          </span>
        )}
      </button>

      {/* ── Filter sidebar — overlaid on map so backdrop-blur shows map tiles ── */}
      {sidebarOpen && (
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/20 backdrop-blur-2xl border-l border-white/30 shadow-2xl flex flex-col overflow-hidden z-10">
          <div className="px-4 py-3 border-b border-white/30 flex items-center justify-between shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-slate-800 font-bold">
              Filters
            </span>
            <span className="text-xs text-slate-600 font-medium">
              {filtered.length} of {LISTINGS.length}
            </span>
          </div>

          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Max price */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                  Max price
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {maxPrice == null
                    ? `Up to €${Math.round(priceCeiling / 1000)}k`
                    : `≤ €${Math.round(maxPrice / 1000)}k`}
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

            {/* Bedrooms */}
            <ChipRow label="Bedrooms" options={BED_OPTIONS} value={bed} onChange={setBed} />

            {/* Bathrooms */}
            <ChipRow label="Bathrooms" options={BATH_OPTIONS} value={bath} onChange={setBath} />

            {/* Building type */}
            <Dropdown label="Type" value={type} options={types} onChange={setType} />

            <div className="border-t border-white/30 pt-4 space-y-4">
              {/* Min living area */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                    Min area
                  </span>
                  <span className="text-xs font-semibold text-slate-900">
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

              {/* Max price per m² */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                    Max €/m²
                  </span>
                  <span className="text-xs font-semibold text-slate-900">
                    {maxPricePerM2 == null
                      ? `Up to €${ppmCeiling.toLocaleString()}`
                      : `≤ €${maxPricePerM2.toLocaleString()}`}
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

              {/* View + Location */}
              <Dropdown label="View" value={view} options={views} onChange={setView} />
              <Dropdown label="Location" value={locType} options={locTypes} onChange={setLocType} />

              {/* Energy efficiency */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  Energy efficiency
                </div>
                <div className="flex gap-1">
                  {ENERGY_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEnergy(e)}
                      className={`flex-1 text-xs font-medium px-2 py-1 rounded transition-colors ${
                        energy === e
                          ? "bg-slate-900 text-white"
                          : "bg-white/50 text-slate-700 hover:bg-white/80"
                      }`}
                    >
                      {e === "any" ? "Any" : e}
                    </button>
                  ))}
                </div>
              </div>

              <TriToggle label="Pool" value={pool} onChange={setPool} />
              <TriToggle label="Wheelchair access" value={wheelchair} onChange={setWheelchair} />
            </div>
          </div>

          {filtersActive && (
            <div className="p-4 border-t border-white/30">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-white/40 bg-white/30 text-slate-800 hover:bg-white/50 flex items-center justify-center gap-1 transition-colors"
              >
                <span aria-hidden>↻</span> Reset filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
