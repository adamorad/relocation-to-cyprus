"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
const INITIAL_LABELS: ReadonlyArray<RegionLabel> = [
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

const DRAG_THRESHOLD_PX = 3;

export default function IllustratedMap({
  selectedRegion,
  onSelectRegion,
  onHoverRegion,
}: Props) {
  // Dev-only label editor: drag labels around the map and the panel in the
  // bottom-right shows the live x/y. Hit "copy" to grab the new LABELS
  // array for pasting back into source.
  const [isDev, setIsDev] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hostname;
    setIsDev(h === "localhost" || h === "127.0.0.1");
  }, []);

  const [labels, setLabels] = useState<RegionLabel[]>(() => [...INITIAL_LABELS]);
  const [dragName, setDragName] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragMovedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dragName || !isDev) return;
    function onMove(e: PointerEvent) {
      const start = dragStartRef.current;
      const container = containerRef.current;
      if (!start || !container) return;
      const dx = Math.abs(e.clientX - start.x);
      const dy = Math.abs(e.clientY - start.y);
      if (!dragMovedRef.current && dx < DRAG_THRESHOLD_PX && dy < DRAG_THRESHOLD_PX) {
        return;
      }
      dragMovedRef.current = true;
      const rect = container.getBoundingClientRect();
      const newX = ((e.clientX - rect.left) / rect.width) * 100;
      const newY = ((e.clientY - rect.top) / rect.height) * 100;
      setLabels((prev) =>
        prev.map((l) =>
          l.name === dragName
            ? {
                ...l,
                x: Math.round(newX * 10) / 10,
                y: Math.round(newY * 10) / 10,
              }
            : l,
        ),
      );
    }
    function onUp() {
      setDragName(null);
      dragStartRef.current = null;
      // Defer clearing the "moved" flag so the synthetic click that fires
      // after pointerup can read it and bail out.
      setTimeout(() => {
        dragMovedRef.current = false;
      }, 0);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragName, isDev]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const l of labels) {
      m[l.name] = LISTINGS_BY_REGION[l.name]?.length ?? 0;
    }
    return m;
  }, [labels]);

  const codeSnippet = useMemo(
    () =>
      `const LABELS: ReadonlyArray<RegionLabel> = [\n${labels
        .map((l) => `  { name: "${l.name}", x: ${l.x}, y: ${l.y} },`)
        .join("\n")}\n];`,
    [labels],
  );

  function copySnippet() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeSnippet).catch(() => {});
    }
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-[#35cdc4] overflow-hidden">
      {/* Background click resets the selection. */}
      <button
        type="button"
        aria-label="Reset view"
        onClick={() => onSelectRegion(null)}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={containerRef}
        className="relative pointer-events-none w-full h-full @container"
      >
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

        {labels.map((r) => {
          const isActive = selectedRegion === r.name;
          const isDragging = dragName === r.name;
          return (
            <button
              key={r.name}
              type="button"
              onPointerDown={(e) => {
                if (!isDev) return;
                dragStartRef.current = { x: e.clientX, y: e.clientY };
                dragMovedRef.current = false;
                setDragName(r.name);
                try {
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                } catch {
                  /* setPointerCapture isn't supported everywhere */
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isDev && dragMovedRef.current) return;
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
              } ${isDev ? (isDragging ? "cursor-grabbing ring-2 ring-amber-400" : "cursor-grab") : ""} font-bold gap-[clamp(2px,0.48cqi,6px)] px-[clamp(3px,1.12cqi,13px)] py-[clamp(1px,0.4cqi,6px)] text-[clamp(7px,1.28cqi,15px)]`}
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
              {isDev ? (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono bg-slate-900/85 text-amber-200 px-1 rounded whitespace-nowrap">
                  {r.x.toFixed(1)}, {r.y.toFixed(1)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {isDev ? (
        <div className="pointer-events-auto fixed bottom-3 right-3 z-[200] bg-slate-900/95 text-white text-xs rounded-lg p-3 shadow-2xl font-mono max-w-sm max-w-[calc(100vw-1.5rem)]">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="font-bold text-amber-300 not-italic">
              Label editor — drag any pill
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-amber-300 hover:text-white text-[10px] font-bold uppercase tracking-wider"
                onClick={copySnippet}
              >
                copy
              </button>
              <button
                type="button"
                className="text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-wider"
                onClick={() => setLabels([...INITIAL_LABELS])}
              >
                reset
              </button>
            </div>
          </div>
          <pre className="text-[10px] leading-tight whitespace-pre overflow-x-auto select-text">
            {codeSnippet}
          </pre>
          <p className="mt-2 text-[9px] text-slate-400 leading-tight">
            dev only — shown when hostname is localhost
          </p>
        </div>
      ) : null}
    </div>
  );
}
