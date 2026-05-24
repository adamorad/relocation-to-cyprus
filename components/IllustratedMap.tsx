"use client";

import { useMemo } from "react";
import { LISTINGS_BY_REGION } from "@/lib/listingsData";

type RegionLabel = {
  name: string;
  /**
   * Centre of the label as % of the underlying image (1672×941, 16:9).
   * Tuned per region so labels sit in empty illustrated space (between the
   * region's painted props), not on top of buildings/landmarks.
   * Pure percentages — no pixel offsets — so they scale at any viewport.
   */
  x: number;
  y: number;
};

// Positions are % of the 1672:941 image and stable across viewports because
// the map container is locked to that aspect ratio in AppShell.
// Zigzag y values (down/up/down/up) prevent adjacent label overlap on the
// small mobile map without forcing the labels onto landmarks.
const LABELS: ReadonlyArray<RegionLabel> = [
  // Paphos — mid-red region, right of sun, above the temple/ruins.
  { name: "Paphos", x: 33, y: 53 },
  // Limassol — above the marina tower (high in the region).
  { name: "Limassol", x: 47, y: 45 },
  // Larnaca — between the church and the umbrella (low in the region).
  { name: "Larnaca", x: 60, y: 54 },
  // Ayia Napa — top of purple region, above the lighthouse (high).
  { name: "Ayia Napa", x: 75, y: 46 },
];

type Props = {
  selectedRegion: string | null;
  onSelectRegion: (city: string | null) => void;
  onHoverRegion: (city: string | null) => void;
};

export default function IllustratedMap({
  selectedRegion,
  onSelectRegion,
  onHoverRegion,
}: Props) {
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const l of LABELS) {
      m[l.name] = LISTINGS_BY_REGION[l.name]?.length ?? 0;
    }
    return m;
  }, []);

  return (
    <div className="absolute inset-0 grid place-items-center bg-[#3fc1bd] overflow-hidden">
      {/* Background click resets the selection. */}
      <button
        type="button"
        aria-label="Reset view"
        onClick={() => onSelectRegion(null)}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative pointer-events-none w-full h-full">
        <picture>
          <source srcSet="/cyprus-illustrated.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cyprus-illustrated.png"
            alt="Illustrated map of Cyprus showing Paphos, Limassol, Larnaca and Ayia Napa regions"
            width={1672}
            height={941}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover select-none"
            draggable={false}
          />
        </picture>

        {LABELS.map((r) => {
          const isActive = selectedRegion === r.name;
          return (
            <button
              key={r.name}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectRegion(r.name);
              }}
              onMouseEnter={() => onHoverRegion(r.name)}
              onMouseLeave={() => onHoverRegion(null)}
              onFocus={() => onHoverRegion(r.name)}
              onBlur={() => onHoverRegion(null)}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border shadow transition-all backdrop-blur-sm flex items-center gap-1 md:gap-1.5 whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 scale-110"
                  : "bg-white/95 hover:bg-white text-slate-900 border-slate-200 hover:scale-110 hover:shadow-xl"
              } px-1 py-px sm:px-2 sm:py-0.5 md:px-3 md:py-1 text-[8px] sm:text-[11px] md:text-sm font-bold`}
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              aria-label={`View ${r.name} listings (${counts[r.name] ?? 0})`}
            >
              <span>{r.name}</span>
              <span
                className={`hidden sm:inline text-[10px] md:text-xs font-semibold ${
                  isActive ? "text-amber-300" : "text-slate-600"
                }`}
              >
                · {counts[r.name] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
