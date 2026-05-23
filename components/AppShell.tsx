"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ListingPanel from "./ListingPanel";
import RegionListingsPanel from "./RegionListingsPanel";
import {
  LISTINGS,
  LISTINGS_BY_REGION,
  type EnrichedListing,
} from "@/lib/listingsData";

// The 3D map is browser-only — no SSR.
const CyprusMap = dynamic(() => import("./CyprusMap"), { ssr: false });

function parsePriceEuros(s: string | null | undefined): number[] {
  if (!s) return [];
  return Array.from(s.matchAll(/€?\s*([\d.,]+)/g))
    .map((m) => Number(m[1].replace(/[.,]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 1000);
}

function regionPriceFrom(listings: EnrichedListing[]): number | null {
  let lo = Number.POSITIVE_INFINITY;
  for (const l of listings) {
    const nums = parsePriceEuros(l.priceRange);
    for (const n of nums) {
      if (n < lo) lo = n;
    }
  }
  return Number.isFinite(lo) ? lo : null;
}

function formatEuros(n: number): string {
  if (n >= 1_000_000)
    return `€${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  return `€${Math.round(n / 1000)}k`;
}

const ZOOM_DELAY_MS = 750;

export default function AppShell() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [modalRegion, setModalRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<EnrichedListing | null>(
    null,
  );
  const [cameraResetTick, setCameraResetTick] = useState(0);
  const [viewMode, setViewMode] = useState<"default" | "top">("default");

  useEffect(() => {
    if (selectedRegion === null) {
      setModalRegion(null);
      return;
    }
    if (modalRegion === selectedRegion) return;
    // Let the 3D camera zoom land before the modal slides in.
    const t = setTimeout(() => setModalRegion(selectedRegion), ZOOM_DELAY_MS);
    return () => clearTimeout(t);
  }, [selectedRegion, modalRegion]);

  const regionListings = modalRegion
    ? LISTINGS_BY_REGION[modalRegion] ?? []
    : [];

  const hoverPreview = useMemo(() => {
    if (!hoveredRegion) return null;
    const list = LISTINGS_BY_REGION[hoveredRegion] ?? [];
    return {
      name: hoveredRegion,
      count: list.length,
      from: regionPriceFrom(list),
    };
  }, [hoveredRegion]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-stone-50 text-slate-900">
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <CyprusMap
            selectedRegion={selectedRegion}
            selectedListing={selectedListing}
            cameraResetTick={cameraResetTick}
            viewMode={viewMode}
            onSelectRegion={(c) => {
              setSelectedRegion(c);
              if (!c) {
                setSelectedListing(null);
                setCameraResetTick((t) => t + 1);
              }
            }}
            onSelectListing={setSelectedListing}
            onHoverRegion={setHoveredRegion}
          />
        </Suspense>
      </div>

      {selectedRegion ? null : (
        <div className="pointer-events-none absolute top-0 left-0 right-0 p-3 md:p-10 flex items-start justify-between gap-2">
          <div className="max-w-md bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-xl transition-all">
            {hoverPreview ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                  Region
                </p>
                <h1 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
                  {hoverPreview.name}
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {hoverPreview.count}
                  </span>{" "}
                  new development{hoverPreview.count === 1 ? "" : "s"}
                  {hoverPreview.from
                    ? ` · from ${formatEuros(hoverPreview.from)}`
                    : ""}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-900">
                  Click to view listings
                  <span aria-hidden>→</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                  For people relocating
                </p>
                <h1 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Cyprus New Developments
                </h1>
                <p className="mt-2 text-xs md:text-sm text-slate-600">
                  New-build apartments, residences and villas across the island
                  — by region, price and developer.
                </p>
                <p className="mt-3 text-[11px] md:text-xs text-slate-500">
                  {LISTINGS.length} listings · click a region to explore
                </p>
              </>
            )}
          </div>
          <div className="hidden md:block text-right text-xs text-slate-600 bg-white/90 rounded-xl p-3 border border-slate-200 shadow-md">
            <p>Drag to rotate · Scroll to zoom</p>
            <p className="mt-1">Click a region · click sea to reset</p>
          </div>
        </div>
      )}

      <RegionListingsPanel
        region={modalRegion}
        listings={regionListings}
        pushedAside={selectedListing !== null}
        onClose={() => {
          setSelectedRegion(null);
          setModalRegion(null);
          setSelectedListing(null);
          setCameraResetTick((t) => t + 1);
        }}
        onPick={setSelectedListing}
      />

      <ListingPanel
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      <button
        type="button"
        onClick={() => {
          setViewMode((m) => (m === "default" ? "top" : "default"));
          setCameraResetTick((t) => t + 1);
        }}
        className="pointer-events-auto fixed bottom-3 right-3 md:bottom-8 md:right-8 z-20 bg-white/95 hover:bg-white border border-slate-200 shadow-lg rounded-full px-3 md:px-4 py-2 text-[11px] md:text-xs font-semibold text-slate-900 flex items-center gap-1.5 md:gap-2 transition-colors min-h-[44px]"
        aria-label={`Switch to ${viewMode === "default" ? "top" : "default"} view`}
      >
        <span aria-hidden className="text-sm md:text-base leading-none">
          {viewMode === "default" ? "⬒" : "⬔"}
        </span>
        {viewMode === "default" ? "Top view" : "3D view"}
      </button>
    </main>
  );
}
