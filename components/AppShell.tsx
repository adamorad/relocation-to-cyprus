"use client";

import { useEffect, useMemo, useState } from "react";
import IllustratedMap from "./IllustratedMap";
import ListingPanel from "./ListingPanel";
import RegionListingsPanel from "./RegionListingsPanel";
import {
  LISTINGS,
  LISTINGS_BY_REGION,
  type EnrichedListing,
} from "@/lib/listingsData";

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

  useEffect(() => {
    if (selectedRegion === null) {
      setModalRegion(null);
      return;
    }
    if (modalRegion === selectedRegion) return;
    // Small delay so the click feels intentional, not jarring.
    const t = setTimeout(() => setModalRegion(selectedRegion), 250);
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
        <IllustratedMap
          selectedRegion={selectedRegion}
          onSelectRegion={(c) => {
            setSelectedRegion(c);
            if (!c) setSelectedListing(null);
          }}
          onHoverRegion={setHoveredRegion}
        />
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
                  Tap to view listings
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
                  {LISTINGS.length} listings · tap a region to explore
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
        }}
        onPick={setSelectedListing}
      />

      <ListingPanel
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </main>
  );
}
