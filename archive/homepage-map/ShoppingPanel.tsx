"use client";

import { useEffect, useState } from "react";
import {
  ALL_CITIES,
  MALLS,
  MARKETS,
  ONLINE_RESOURCES,
  SHOPPING_TIPS,
  SUPERMARKETS,
  type City,
  type OnlineResource,
} from "@/lib/shopping";
import { trackEvent } from "@/lib/analytics";

type Props = {
  open: boolean;
  onClose: () => void;
};

function tierBand(t: 1 | 2 | 3): string {
  return "€".repeat(t);
}

function googleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function storeGoogleMapsUrl(
  name: string,
  city: string,
  neighbourhood?: string,
): string {
  const q = neighbourhood
    ? `${name} ${neighbourhood} ${city} Cyprus`
    : `${name} ${city} Cyprus`;
  return googleMapsUrl(q);
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

const ONLINE_CATEGORY_LABEL: Record<OnlineResource["category"], string> = {
  delivery: "Delivery",
  comparison: "Price comparison",
  classifieds: "Classifieds",
  marketplace: "Marketplace",
};

const ONLINE_CATEGORY_ORDER: ReadonlyArray<OnlineResource["category"]> = [
  "delivery",
  "comparison",
  "classifieds",
  "marketplace",
];

export default function ShoppingPanel({ open, onClose }: Props) {
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

  const visibleMalls =
    cityFilter === "All"
      ? MALLS
      : MALLS.filter((m) => m.city === cityFilter);

  const visibleMarkets =
    cityFilter === "All"
      ? MARKETS
      : MARKETS.filter((m) => m.city === cityFilter);

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
        aria-labelledby="shopping-title"
      >
        <header className="px-5 pt-5 pb-3 border-b border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
                RealCy section
              </p>
              <h2
                id="shopping-title"
                className="mt-0.5 text-2xl font-bold leading-snug"
              >
                Shopping in Cyprus
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Supermarkets, malls, local markets, and where to shop online as
                a new resident.
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
              ["supermarkets", "Supermarkets"],
              ["malls", "Malls"],
              ["markets", "Markets"],
              ["online", "Online shopping"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#shopping-${id}`}
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 font-semibold text-slate-700 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 space-y-10">
          {/* ABOUT */}
          <section id="shopping-about">
            <h3 className="text-lg font-bold mb-3">About shopping in Cyprus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SHOPPING_TIPS.map((tip) => (
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

          {/* SUPERMARKETS */}
          <section id="shopping-supermarkets">
            <h3 className="text-lg font-bold mb-3">Supermarkets</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["All", ...ALL_CITIES] as const).map((c) => (
                <CityChip
                  key={c}
                  city={c}
                  selected={cityFilter === c}
                  onClick={() => {
                    setCityFilter(c);
                    if (c !== "All")
                      trackEvent("shopping_city_filter", { city: c });
                  }}
                />
              ))}
            </div>
            <div className="space-y-6">
              {visibleCities.map((city) => (
                <div key={city}>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                    {city}
                  </h4>
                  <ul className="space-y-2">
                    {SUPERMARKETS[city].map((store) => (
                      <li
                        key={store.name}
                        className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-slate-900">
                            {store.name}
                            {store.neighbourhood && (
                              <span className="font-normal text-slate-500">
                                {" "}
                                — {store.neighbourhood}
                              </span>
                            )}
                          </p>
                          <span className="text-slate-500 font-semibold whitespace-nowrap">
                            {tierBand(store.tier)}
                          </span>
                        </div>
                        <p className="mt-1 text-slate-700 leading-relaxed">
                          {store.why}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold">
                          <a
                            href={storeGoogleMapsUrl(
                              store.name,
                              city,
                              store.neighbourhood,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("shopping_store_maps_click", {
                                store: store.name,
                                city,
                              })
                            }
                            className="text-slate-700 hover:text-slate-900"
                          >
                            📍 Maps
                          </a>
                          {store.website && (
                            <a
                              href={store.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackEvent("shopping_store_website_click", {
                                  store: store.name,
                                })
                              }
                              className="text-amber-700 hover:text-amber-900"
                            >
                              Website ↗
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* MALLS */}
          <section id="shopping-malls">
            <h3 className="text-lg font-bold mb-3">Malls</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["All", ...ALL_CITIES] as const).map((c) => (
                <CityChip
                  key={c}
                  city={c}
                  selected={cityFilter === c}
                  onClick={() => {
                    setCityFilter(c);
                    if (c !== "All")
                      trackEvent("shopping_city_filter", { city: c });
                  }}
                />
              ))}
            </div>
            {visibleMalls.length === 0 ? (
              <p className="text-xs text-slate-600 bg-slate-50 rounded-lg border border-slate-200 px-4 py-3">
                {cityFilter === "Ayia Napa"
                  ? "No malls in Ayia Napa — the nearest is Metropolis Mall in Larnaca (~45 min drive) or small retail centres in Paralimni town."
                  : "No malls found for the selected area."}
              </p>
            ) : (
              <ul className="space-y-3">
                {visibleMalls.map((mall) => (
                  <li
                    key={mall.name}
                    className="rounded-md border border-slate-200 bg-white p-3 text-xs"
                  >
                    <p className="font-bold text-sm text-slate-900">
                      {mall.name}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {mall.city}
                      {mall.neighbourhood ? ` · ${mall.neighbourhood}` : ""}
                    </p>
                    <p className="mt-1.5 text-slate-600">
                      <span className="font-semibold text-slate-700">
                        Anchor stores:{" "}
                      </span>
                      <em>{mall.anchors}</em>
                    </p>
                    <p className="mt-1.5 text-slate-700 leading-relaxed">
                      {mall.why}
                    </p>
                    <a
                      href={googleMapsUrl(mall.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("shopping_store_maps_click", {
                          store: mall.name,
                          city: mall.city,
                        })
                      }
                      className="mt-1.5 inline-block text-[10px] font-semibold text-slate-700 hover:text-slate-900"
                    >
                      📍 Maps
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* MARKETS */}
          <section id="shopping-markets">
            <h3 className="text-lg font-bold mb-3">Local markets</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["All", ...ALL_CITIES] as const).map((c) => (
                <CityChip
                  key={c}
                  city={c}
                  selected={cityFilter === c}
                  onClick={() => {
                    setCityFilter(c);
                    if (c !== "All")
                      trackEvent("shopping_city_filter", { city: c });
                  }}
                />
              ))}
            </div>
            <ul className="space-y-2">
              {visibleMarkets.map((market) => (
                <li
                  key={market.name}
                  className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
                >
                  <p className="font-bold text-slate-900">{market.name}</p>
                  {market.neighbourhood && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {market.neighbourhood}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">
                    {market.when}
                  </p>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {market.what}
                  </p>
                  <a
                    href={googleMapsUrl(market.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("shopping_store_maps_click", {
                        store: market.name,
                        city: market.city,
                      })
                    }
                    className="mt-1.5 inline-block text-[10px] font-semibold text-slate-700 hover:text-slate-900"
                  >
                    📍 Maps
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ONLINE SHOPPING */}
          <section id="shopping-online">
            <h3 className="text-lg font-bold mb-1">Online shopping</h3>
            <p className="text-xs text-slate-600 mb-4">
              Cyprus has no domestic Amazon. Here&rsquo;s what relocators use.
            </p>
            <div className="space-y-5">
              {ONLINE_CATEGORY_ORDER.filter((cat) =>
                ONLINE_RESOURCES.some((r) => r.category === cat),
              ).map((cat) => (
                <div key={cat}>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
                    {ONLINE_CATEGORY_LABEL[cat]}
                  </p>
                  <ul className="space-y-2">
                    {ONLINE_RESOURCES.filter((r) => r.category === cat).map(
                      (resource) => (
                        <li
                          key={resource.name}
                          className="rounded-md border border-slate-100 bg-slate-50 p-3 text-xs"
                        >
                          <div className="flex items-baseline justify-between gap-2 flex-wrap">
                            <p className="font-bold text-sm text-slate-900">
                              {resource.name}
                            </p>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackEvent("shopping_online_resource_click", {
                                  resource: resource.name,
                                })
                              }
                              className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap"
                            >
                              Visit ↗
                            </a>
                          </div>
                          <p className="mt-1 text-slate-700 leading-relaxed">
                            {resource.tip}
                          </p>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
