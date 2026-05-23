"use client";

import { useState } from "react";
import type { EnrichedListing } from "@/lib/listingsData";
import { asset } from "@/lib/url";

type Region = {
  name: string;
  // Bounding boxes in % of the image (Cyprus illustrated is 1280×675).
  // Approximate, hand-traced over the supplied reference.
  // Each defines a polygon as percentage points [x, y].
  polygon: ReadonlyArray<[number, number]>;
};

const REGIONS: ReadonlyArray<Region> = [
  {
    name: "Paphos",
    polygon: [
      [6, 30],
      [22, 22],
      [27, 30],
      [28, 50],
      [29, 65],
      [25, 75],
      [18, 75],
      [10, 60],
      [6, 45],
    ],
  },
  {
    name: "Nicosia",
    polygon: [
      [27, 22],
      [55, 22],
      [62, 35],
      [60, 50],
      [52, 55],
      [40, 56],
      [29, 50],
      [27, 35],
    ],
  },
  {
    name: "Limassol",
    polygon: [
      [27, 55],
      [40, 56],
      [52, 56],
      [55, 70],
      [50, 85],
      [37, 88],
      [28, 78],
      [27, 65],
    ],
  },
  {
    name: "Larnaca",
    polygon: [
      [52, 55],
      [70, 50],
      [73, 60],
      [71, 70],
      [60, 76],
      [55, 70],
      [50, 65],
    ],
  },
  {
    name: "Ayia Napa",
    polygon: [
      [70, 38],
      [82, 35],
      [85, 45],
      [82, 55],
      [73, 60],
      [70, 50],
    ],
  },
];

type Props = {
  selectedRegion: string | null;
  onSelectRegion: (city: string | null) => void;
  onHoverRegion: (city: string | null) => void;
};

export default function IllustratedMap({
  selectedRegion: _selectedRegion,
  onSelectRegion,
  onHoverRegion,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#c8d5dc] select-none">
      {/* Click on empty area resets */}
      <button
        type="button"
        onClick={() => onSelectRegion(null)}
        className="absolute inset-0 cursor-default"
        aria-label="Reset view"
      />

      <div
        className="relative w-full h-full max-w-[1400px] max-h-full"
        style={{ aspectRatio: "1280 / 675" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/cyprus-illustrated.png")}
          alt="Map of Cyprus regions"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          draggable={false}
        />

        {/* SVG overlay with one clickable polygon per region. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <title>Cyprus region hotspots</title>
          {REGIONS.map((r) => {
            const points = r.polygon.map(([x, y]) => `${x},${y}`).join(" ");
            const isHovered = hovered === r.name;
            return (
              <polygon
                key={r.name}
                points={points}
                fill={isHovered ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0)"}
                stroke={isHovered ? "rgba(15,23,42,0.45)" : "transparent"}
                strokeWidth="0.4"
                style={{
                  cursor: "pointer",
                  transition: "fill 120ms, stroke 120ms",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRegion(r.name);
                }}
                onMouseEnter={() => {
                  setHovered(r.name);
                  onHoverRegion(r.name);
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  onHoverRegion(null);
                }}
              >
                <title>{r.name}</title>
              </polygon>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
