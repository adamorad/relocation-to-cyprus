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

const COMING_SOON = ["Rentals", "Hotels", "Food", "Shopping", "More"] as const;

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

function ComingSoonTiles() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 md:gap-2 bg-white/95 backdrop-blur-sm border border-slate-200 border-t-0 rounded-b-xl shadow-md px-2 md:px-3 py-1.5 md:py-2"
      aria-label="Coming soon to RealCy.app"
    >
      {COMING_SOON.map((name) => (
        <div
          key={name}
          className="relative rounded-md bg-slate-50 border border-slate-100 px-2 md:px-2.5 py-1 md:py-1.5 text-[10px] md:text-xs font-bold text-slate-900 whitespace-nowrap"
          title={`${name} — coming soon`}
        >
          {name}
          <span
            className="absolute -top-1.5 -right-1.5 text-[7px] md:text-[8px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1 py-px leading-tight"
            aria-label="Coming soon"
          >
            Soon
          </span>
        </div>
      ))}
    </div>
  );
}

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
    <main
      id="main"
      className="relative min-h-screen md:h-screen w-full md:overflow-hidden bg-stone-50 text-slate-900"
    >
      <ComingSoonTiles />

      <div className="relative w-full aspect-[16/9] md:absolute md:inset-0 md:aspect-auto">
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
        <div className="px-4 pt-4 pb-8 md:p-10 md:pt-12 md:pointer-events-none md:absolute md:top-0 md:left-0 md:right-0 md:flex md:items-start md:justify-between md:gap-2">
          <div className="max-w-md bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-xl transition-all md:pointer-events-auto">
            {hoverPreview ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600 font-semibold">
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
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
                  RealCy.app
                </p>
                <h1 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Your Cyprus Portal
                </h1>
                <p className="mt-2 text-xs md:text-sm text-slate-600">
                  Everything Cyprus, in one place. Find a new-build home today —
                  rentals, hotels, food, shopping and more coming soon.
                </p>
                <p className="mt-3 text-[11px] md:text-xs text-slate-600">
                  {LISTINGS.length} new developments · click a region to start
                </p>
              </>
            )}
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
