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

const LABELS: ReadonlyArray<RegionLabel> = [
  { name: "Paphos", x: 33.2, y: 47 },
  { name: "Limassol", x: 46.1, y: 44.8 },
  { name: "Larnaca", x: 56, y: 63.7 },
  { name: "Ayia Napa", x: 69.3, y: 59 },
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
    <div className="absolute inset-0 grid place-items-center bg-[#35cdc4] overflow-hidden">
      {/* Background click resets the selection. */}
      <button
        type="button"
        aria-label="Reset view"
        onClick={() => onSelectRegion(null)}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative pointer-events-none w-full h-full @container">
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
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border shadow transition-all backdrop-blur-sm flex items-center whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 scale-110"
                  : "bg-white/95 hover:bg-white text-slate-900 border-slate-200 hover:scale-110 hover:shadow-xl"
              } font-bold gap-[clamp(2px,0.48cqi,6px)] px-[clamp(3px,1.12cqi,13px)] py-[clamp(1px,0.4cqi,6px)] text-[clamp(7px,1.28cqi,15px)]`}
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              aria-label={`View ${r.name} listings (${counts[r.name] ?? 0})`}
            >
              <span>{r.name}</span>
              <span
                className={`hidden @[32rem]:inline font-semibold text-[clamp(6px,0.96cqi,12px)] ${
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
