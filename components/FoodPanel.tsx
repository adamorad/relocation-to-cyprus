"use client";

import { useEffect, useState } from "react";
import {
  ALL_CATEGORIES,
  ALL_CITIES,
  CATEGORY_LABEL,
  CYPRIOT_FOODS,
  FOOD_CREATORS,
  FOOD_EVENTS,
  LIFESTYLE_CREATORS,
  NAME_GUIDE,
  PITA_COMPARISON,
  PLACES,
  PRICE_TABLE,
  type City,
} from "@/lib/food";
import { trackEvent } from "@/lib/analytics";

type Props = {
  open: boolean;
  onClose: () => void;
};

function priceBand(p: 1 | 2 | 3 | 4): string {
  return "€".repeat(p);
}

/**
 * Google Maps deep-link that searches for the place. Works on mobile (opens
 * the Maps app) and desktop (opens maps.google.com), and avoids hard-coding
 * fragile place-specific URLs per restaurant.
 */
function googleMapsUrl(
  name: string,
  city: string,
  neighbourhood?: string,
): string {
  const q = neighbourhood
    ? `${name} ${neighbourhood} ${city} Cyprus`
    : `${name} ${city} Cyprus`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
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

export default function FoodPanel({ open, onClose }: Props) {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const visibleCities: ReadonlyArray<City> =
    cityFilter === "All" ? ALL_CITIES : [cityFilter];

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
        aria-labelledby="food-title"
      >
        <header className="px-5 pt-5 pb-3 border-b border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
                RealCy section
              </p>
              <h2
                id="food-title"
                className="mt-0.5 text-2xl font-bold leading-snug"
              >
                Food in Cyprus
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Pita, naming, prices, events, who to follow, and where locals
                actually eat.
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
              ["eat", "Where to eat"],
              ["events", "Events 2026"],
              ["follow", "Who to follow"],
              ["about", "About the food"],
              ["prices", "Prices"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#food-${id}`}
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 font-semibold text-slate-700 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 space-y-10" style={{ scrollBehavior: "smooth" }}>
          {/* WHERE TO EAT — leads with actionable content */}
          <section id="food-eat">
            <div className="flex items-end justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold">Where to eat</h3>
              <span className="text-[10px] text-slate-500 font-semibold">
                Editorial picks. Not affiliated.
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["All", ...ALL_CITIES] as const).map((c) => (
                <CityChip
                  key={c}
                  city={c}
                  selected={cityFilter === c}
                  onClick={() => {
                    setCityFilter(c);
                    trackEvent("food_city_filter", { city: c });
                  }}
                />
              ))}
            </div>

            <div className="space-y-6">
              {visibleCities.map((city) => (
                <div key={city}>
                  <h4 className="text-base font-bold text-slate-900">
                    {city}
                  </h4>
                  <div className="mt-2 space-y-4">
                    {ALL_CATEGORIES.map((cat) => {
                      const items = PLACES[city][cat];
                      if (!items || items.length === 0) return null;
                      return (
                        <div key={cat}>
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                            {CATEGORY_LABEL[cat]}
                          </p>
                          <ul className="mt-1.5 space-y-2">
                            {items.map((p) => (
                              <li
                                key={p.name}
                                className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-bold text-slate-900">
                                    {p.name}
                                    {p.neighbourhood ? (
                                      <span className="font-normal text-slate-500">
                                        {" "}
                                        — {p.neighbourhood}
                                      </span>
                                    ) : null}
                                  </p>
                                  <span className="text-slate-500 font-semibold whitespace-nowrap">
                                    {priceBand(p.price)}
                                  </span>
                                </div>
                                <p className="mt-1 text-slate-700 leading-relaxed">
                                  {p.why}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  <a
                                    href={googleMapsUrl(
                                      p.name,
                                      city,
                                      p.neighbourhood,
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() =>
                                      trackEvent("food_place_maps_click", {
                                        place: p.name,
                                        city,
                                      })
                                    }
                                    className="inline-flex items-center gap-1 rounded bg-slate-900 hover:bg-slate-700 text-white text-[10px] font-semibold px-2 py-1 transition-colors"
                                  >
                                    View on Maps ↗
                                  </a>
                                  {p.instagram ? (
                                    <a
                                      href={`https://www.instagram.com/${p.instagram}/`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() =>
                                        trackEvent(
                                          "food_place_instagram_click",
                                          { place: p.name, city },
                                        )
                                      }
                                      className="text-[10px] font-semibold text-amber-700 hover:text-amber-900"
                                    >
                                      @{p.instagram} ↗
                                    </a>
                                  ) : null}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EVENTS */}
          <section id="food-events">
            <h3 className="text-lg font-bold mb-3">Food events 2026</h3>
            <p className="text-xs text-slate-600 mb-3">
              Dates confirmed where possible. For festivals with annual but
              not-yet-announced dates, the month is given; verify nearer the
              time via the linked source.
            </p>
            <ul className="space-y-2">
              {FOOD_EVENTS.map((e) => (
                <li
                  key={e.name}
                  className="rounded-md border border-slate-200 bg-white p-3 text-xs"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-sm text-slate-900">
                      {e.name}
                    </p>
                    <p className="text-slate-700 font-semibold whitespace-nowrap">
                      {e.dates}
                    </p>
                  </div>
                  <p className="mt-0.5 text-slate-500">{e.city}</p>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {e.description}
                  </p>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("food_event_click", { event_name: e.name })
                    }
                    className="mt-1.5 inline-block text-[11px] font-semibold text-amber-700 hover:text-amber-900"
                  >
                    More info ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* CREATORS */}
          <section id="food-follow">
            <h3 className="text-lg font-bold mb-3">Who to follow</h3>

            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-2 mb-2">
              Cyprus food creators
            </p>
            <ul className="space-y-2">
              {FOOD_CREATORS.map((c) => (
                <li
                  key={c.url}
                  className="rounded-md border border-slate-100 bg-slate-50 p-3 text-xs"
                >
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <p className="font-bold text-sm text-slate-900">
                      {c.name}{" "}
                      <span className="font-normal text-slate-500 text-xs">
                        · {c.platform}
                      </span>
                    </p>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("food_creator_click", {
                          creator: c.name,
                          platform: c.platform,
                        })
                      }
                      className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap"
                    >
                      {c.handle} ↗
                    </a>
                  </div>
                  <p className="mt-1 text-slate-700 leading-relaxed">
                    {c.focus}
                  </p>
                </li>
              ))}
            </ul>

            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-5 mb-2">
              Cyprus lifestyle (not strictly food)
            </p>
            <ul className="space-y-2">
              {LIFESTYLE_CREATORS.map((c) => (
                <li
                  key={c.url}
                  className="rounded-md border border-slate-100 bg-slate-50 p-3 text-xs"
                >
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <p className="font-bold text-sm text-slate-900">
                      {c.name}{" "}
                      <span className="font-normal text-slate-500 text-xs">
                        · {c.platform}
                      </span>
                    </p>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("food_creator_click", {
                          creator: c.name,
                          platform: c.platform,
                        })
                      }
                      className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap"
                    >
                      {c.handle} ↗
                    </a>
                  </div>
                  <p className="mt-1 text-slate-700 leading-relaxed">
                    {c.focus}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ABOUT THE FOOD */}
          <section id="food-about">
            <h3 className="text-lg font-bold mb-3">About the food</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-4 mb-2">
              Greek vs Cypriot pita (and Israeli, for reference)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                PITA_COMPARISON.greek,
                PITA_COMPARISON.cypriot,
                PITA_COMPARISON.israeli,
              ].map((p) => (
                <div
                  key={p.name}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"
                >
                  <p className="font-bold text-sm text-slate-900">{p.name}</p>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {p.description}
                  </p>
                  <p className="mt-2 text-slate-600">
                    <span className="font-semibold text-slate-700">
                      Texture.{" "}
                    </span>
                    {p.texture}
                  </p>
                  <p className="mt-1 text-slate-600">
                    <span className="font-semibold text-slate-700">
                      Used for.{" "}
                    </span>
                    {p.uses}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-6 mb-2">
              Naming guide — souvlaki / gyros / sheftalia / kebab / döner / shawarma
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-700">
                    <th className="px-3 py-2 font-semibold">Term</th>
                    <th className="px-3 py-2 font-semibold">Origin</th>
                    <th className="px-3 py-2 font-semibold">What it is</th>
                    <th className="px-3 py-2 font-semibold">In Cyprus</th>
                  </tr>
                </thead>
                <tbody>
                  {NAME_GUIDE.map((row) => (
                    <tr
                      key={row.term}
                      className="border-t border-slate-100 align-top"
                    >
                      <td className="px-3 py-2 font-bold text-slate-900 whitespace-nowrap">
                        {row.term}
                      </td>
                      <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                        {row.origin}
                      </td>
                      <td className="px-3 py-2 text-slate-700 leading-relaxed">
                        {row.whatItIs}
                      </td>
                      <td className="px-3 py-2 text-slate-700 leading-relaxed">
                        {row.inCyprus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-6 mb-2">
              Signature Cypriot foods you'll see everywhere
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CYPRIOT_FOODS.map((f) => (
                <div
                  key={f.name}
                  className="rounded-lg border border-slate-200 bg-white p-3 text-xs"
                >
                  <p className="font-bold text-sm text-slate-900">{f.name}</p>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PRICES */}
          <section id="food-prices">
            <h3 className="text-lg font-bold mb-3">Prices cheat sheet</h3>
            <p className="text-xs text-slate-600 mb-3">
              Typical 2026 prices for common street food and café items
              across Cyprus. Limassol tends to be at the higher end of each
              range; Larnaca and inland villages at the lower.
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-700">
                    <th className="px-3 py-2 font-semibold">Dish</th>
                    <th className="px-3 py-2 font-semibold whitespace-nowrap">
                      Typical range
                    </th>
                    <th className="px-3 py-2 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TABLE.map((p) => (
                    <tr
                      key={p.dish}
                      className="border-t border-slate-100 align-top"
                    >
                      <td className="px-3 py-2 font-semibold text-slate-900">
                        {p.dish}
                      </td>
                      <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                        €{p.minEuros} – €{p.maxEuros}
                      </td>
                      <td className="px-3 py-2 text-slate-600">
                        {p.note ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
