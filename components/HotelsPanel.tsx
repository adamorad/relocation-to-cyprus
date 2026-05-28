"use client";

import { useEffect, useState } from "react";
import {
  ALL_CITIES,
  ALL_HOTEL_CATEGORIES,
  HOTEL_CATEGORY_LABEL,
  HOTEL_TIPS,
  HOTELS,
  bookingUrl,
  hotelsComUrl,
  type City,
  type HotelCategory,
} from "@/lib/hotels";
import { trackEvent } from "@/lib/analytics";

type Props = {
  open: boolean;
  onClose: () => void;
};

function starStr(n?: 3 | 4 | 5): string {
  return n ? "★".repeat(n) : "";
}

function CityChip({
  city,
  selected,
  onClick,
}: {
  city: City | "All";
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pointer-events-auto rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-slate-900 text-white border border-slate-900"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {city}
    </button>
  );
}

const CATEGORY_HASH: Record<HotelCategory, string> = {
  "adults-only": "adults-only",
  family: "family",
  boutique: "boutique",
  luxury: "luxury",
  budget: "budget",
  beach: "beach",
};

export default function HotelsPanel({ open, onClose }: Props) {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center p-2 md:p-8 transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto bg-slate-900/40 backdrop-blur-[2px]"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <aside
        className={`relative w-full max-w-[960px] max-h-[92vh] md:max-h-[88vh] bg-white text-slate-900 shadow-2xl rounded-xl md:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal={open}
        aria-labelledby="hotels-title"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="px-5 pt-5 pb-3 border-b border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
                RealCy section
              </p>
              <h2
                id="hotels-title"
                className="mt-0.5 text-2xl font-bold leading-snug"
              >
                Hotels in Cyprus
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Adults only, family, boutique, luxury, budget, and beach
                resorts — with direct booking links.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 text-slate-500 hover:text-slate-900 text-2xl leading-none w-11 h-11 rounded-full hover:bg-slate-100 flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <nav className="mt-3 flex flex-wrap gap-1.5 text-xs">
            {[
              ["about", "About"],
              ["adults-only", "Adults Only"],
              ["family", "Family"],
              ["boutique", "Boutique"],
              ["luxury", "Luxury"],
              ["budget", "Budget"],
              ["beach", "Beach"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#hotels-${id}`}
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 font-semibold text-slate-700 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 space-y-10">
          {/* ABOUT */}
          <section id="hotels-about">
            <h3 className="text-lg font-bold mb-3">Staying in Cyprus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {HOTEL_TIPS.map((tip) => (
                <div
                  key={tip.heading}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"
                >
                  <p className="font-bold text-sm text-slate-900">
                    {tip.heading}
                  </p>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {tip.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CITY FILTER — shared across all category sections */}
          <div className="flex flex-wrap gap-1.5">
            {(["All", ...ALL_CITIES] as const).map((c) => (
              <CityChip
                key={c}
                city={c}
                selected={cityFilter === c}
                onClick={() => {
                  setCityFilter(c);
                  if (c !== "All")
                    trackEvent("hotels_city_filter", { city: c });
                }}
              />
            ))}
          </div>

          {/* CATEGORY SECTIONS */}
          {ALL_HOTEL_CATEGORIES.map((cat) => {
            const visible = HOTELS.filter(
              (h) =>
                h.category === cat &&
                (cityFilter === "All" || h.city === cityFilter),
            );
            return (
              <section key={cat} id={`hotels-${CATEGORY_HASH[cat]}`}>
                <h3 className="text-lg font-bold mb-3">
                  {HOTEL_CATEGORY_LABEL[cat]}
                </h3>
                {visible.length === 0 ? (
                  <p className="text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-100 px-4 py-3">
                    No {HOTEL_CATEGORY_LABEL[cat].toLowerCase()} hotels listed
                    for {cityFilter} yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {visible.map((hotel) => (
                      <HotelCard key={hotel.name} hotel={hotel} />
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: (typeof HOTELS)[number] }) {
  return (
    <li className="rounded-md border border-slate-200 bg-white p-3 text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-sm text-slate-900">{hotel.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {hotel.city}
            {hotel.neighbourhood ? ` · ${hotel.neighbourhood}` : ""}
            {hotel.stars ? (
              <span className="ml-1.5 text-amber-500">
                {starStr(hotel.stars)}
              </span>
            ) : null}
          </p>
        </div>
      </div>
      <p className="mt-1.5 text-slate-700 leading-relaxed">{hotel.why}</p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold">
        {hotel.bookingCom && (
          <a
            href={bookingUrl(hotel.bookingCom)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("hotels_booking_click", {
                hotel: hotel.name,
                city: hotel.city,
                category: hotel.category,
              })
            }
            className="text-blue-700 hover:text-blue-900"
          >
            Booking.com ↗
          </a>
        )}
        {hotel.hotelsCom && (
          <a
            href={hotelsComUrl(hotel.hotelsCom)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("hotels_hotelsCom_click", {
                hotel: hotel.name,
                city: hotel.city,
                category: hotel.category,
              })
            }
            className="text-red-700 hover:text-red-900"
          >
            Hotels.com ↗
          </a>
        )}
        {hotel.website && (
          <a
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("hotels_website_click", { hotel: hotel.name })
            }
            className="text-amber-700 hover:text-amber-900"
          >
            Website ↗
          </a>
        )}
      </div>
    </li>
  );
}
