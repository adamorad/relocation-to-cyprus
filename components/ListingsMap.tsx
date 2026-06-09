"use client";

import { useEffect } from "react";
import { Map, AdvancedMarker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import type { EnrichedListing } from "@/lib/listingsData";

type Props = {
  listings: EnrichedListing[];
  onPick: (l: EnrichedListing) => void;
};

const CYPRUS_CENTER = { lat: 34.85, lng: 33.1 };

function FitBounds({ listings }: { listings: EnrichedListing[] }) {
  const map = useMap();
  const mapsLib = useMapsLibrary("maps");
  useEffect(() => {
    if (!map || !mapsLib || listings.length === 0) return;
    const bounds = new mapsLib.LatLngBounds();
    for (const l of listings) {
      if (l.lat && l.lng) bounds.extend({ lat: l.lat, lng: l.lng });
    }
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 60);
    }
  }, [map, mapsLib, listings]);
  return null;
}

export default function ListingsMap({ listings, onPick }: Props) {
  return (
    <div style={{ height: "100%", minHeight: 320 }}>
      <Map
        defaultCenter={CYPRUS_CENTER}
        defaultZoom={10}
        mapId="cyprus_listings"
        gestureHandling="greedy"
        disableDefaultUI
        style={{ width: "100%", height: "100%" }}
      >
        <FitBounds listings={listings} />
        {listings.map((l) => {
          if (!l.lat || !l.lng) return null;
          return (
            <AdvancedMarker
              key={l.slug}
              position={{ lat: l.lat, lng: l.lng }}
              onClick={() => onPick(l)}
            >
              <div className="cursor-pointer bg-slate-900 text-white rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-md hover:bg-slate-700 transition-colors whitespace-nowrap max-w-[140px] truncate">
                {l.priceRange
                  ? l.priceRange.replace(/\s*\+VAT/i, "")
                  : l.title.split(" ").slice(0, 3).join(" ")}
              </div>
            </AdvancedMarker>
          );
        })}
      </Map>
    </div>
  );
}
