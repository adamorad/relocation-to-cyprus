"use client";

import { useMemo } from "react";
import { LISTINGS_BY_REGION } from "@/lib/listingsData";
import { asset } from "@/lib/url";

type RegionLabel = {
  name: string;
  /** Centre of the region as % of the underlying image (1280×675). */
  x: number;
  y: number;
};

const LABELS: ReadonlyArray<RegionLabel> = [
  { name: "Paphos", x: 15, y: 50 },
  { name: "Limassol", x: 39, y: 73 },
  { name: "Nicosia", x: 45, y: 38 },
  { name: "Larnaca", x: 60, y: 60 },
  { name: "Ayia Napa", x: 77, y: 49 },
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
    <div className="absolute inset-0 grid place-items-center bg-[#c8d5dc] overflow-hidden">
      {/* Background click resets the selection. */}
      <button
        type="button"
        aria-label="Reset view"
        onClick={() => onSelectRegion(null)}
        className="absolute inset-0 cursor-default"
      />

      {/* Inner box sized to the image aspect ratio — fills the viewport
        as far as possible while preserving 1280×675. Labels position in %
        of this box so they track with the image at any size. */}
      <div
        className="relative pointer-events-none"
        style={{
          width: "min(100vw, calc(100vh * 1280 / 675))",
          height: "min(100vh, calc(100vw * 675 / 1280))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/cyprus-illustrated.png")}
          alt="Map of Cyprus regions"
          className="absolute inset-0 w-full h-full object-contain select-none"
          draggable={false}
        />

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
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-lg transition-all backdrop-blur-sm flex items-center gap-1.5 md:gap-2 ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 scale-110"
                  : "bg-white/95 hover:bg-white text-slate-900 border-slate-200 hover:scale-110 hover:shadow-xl"
              } px-2.5 py-1 md:px-3.5 md:py-1.5 text-xs md:text-sm font-bold`}
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              aria-label={`View ${r.name} listings (${counts[r.name] ?? 0})`}
            >
              <span>{r.name}</span>
              <span
                className={`text-[10px] md:text-xs font-semibold ${
                  isActive ? "text-amber-300" : "text-slate-500"
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
