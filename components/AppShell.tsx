"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FoodPanel from "./FoodPanel";
import HotelsPanel from "./HotelsPanel";
import ShoppingPanel from "./ShoppingPanel";
import SchoolsPanel from "./SchoolsPanel";
import HealthcarePanel from "./HealthcarePanel";
import IllustratedMap from "./IllustratedMap";
import ListingPanel from "./ListingPanel";
import RegionListingsPanel from "./RegionListingsPanel";
import { trackEvent } from "@/lib/analytics";
import {
  LISTINGS,
  LISTINGS_BY_REGION,
  type EnrichedListing,
} from "@/lib/listingsData";

type Section = {
  name: string;
  emoji: string;
  /** `current` = the page the user is already on (the map). `available` =
   * real section that opens in a popup. `soon` = placeholder.
   * `link` = navigates to a URL. */
  kind: "current" | "available" | "soon" | "link";
  href?: string;
};

const SECTIONS: ReadonlyArray<Section> = [
  { name: "New Developments", emoji: "🗺️", kind: "current" },
  { name: "Rentals",          emoji: "🏠", kind: "soon" },
  { name: "Hotels",           emoji: "🏨", kind: "available" },
  { name: "Food",             emoji: "🍽️", kind: "available" },
  { name: "Shopping",         emoji: "🛍️", kind: "available" },
  { name: "Schools",          emoji: "🏫", kind: "available" },
  { name: "Healthcare",       emoji: "🏥", kind: "available" },
  { name: "Guides",           emoji: "📚", kind: "link", href: "/guides/" },
  { name: "Explore",          emoji: "🔍", kind: "link", href: "/explore/" },
  { name: "More",             emoji: "⭐", kind: "soon" },
];

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

// ── Mobile bottom-sheet drawer ────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
  handlers,
}: {
  open: boolean;
  onClose: () => void;
  handlers: Record<string, (() => void) | undefined>;
}) {
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    /* sm:hidden — only renders on mobile; on desktop it's display:none */
    <div
      className={`sm:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(15,23,42,0.55)" }}
      onClick={onClose}
      aria-hidden={!open}
    >
      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl
          max-h-[82vh] overflow-y-auto shadow-2xl
          transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal={open}
        aria-label="Site sections"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <p className="font-bold text-slate-900">Sections</p>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 text-xl leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Section rows */}
        <ul className="py-2 pb-8">
          {SECTIONS.map((s) => {
            const isSoon = s.kind === "soon";
            const isLink = s.kind === "link";
            const isCurrent = s.kind === "current";
            const handler = handlers[s.name];

            const rowContent = (
              <div className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-xl w-7 text-center leading-none" aria-hidden>
                  {s.emoji}
                </span>
                <span
                  className={`flex-1 text-sm font-semibold ${
                    isSoon ? "text-slate-400" : "text-slate-900"
                  }`}
                >
                  {s.name}
                </span>
                {isSoon && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                    Soon
                  </span>
                )}
                {isCurrent && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5">
                    Here
                  </span>
                )}
              </div>
            );

            if (isSoon) {
              return (
                <li key={s.name} className="opacity-50">
                  {rowContent}
                </li>
              );
            }
            if (isLink) {
              return (
                <li key={s.name}>
                  <Link
                    href={s.href!}
                    onClick={onClose}
                    className="block hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    {rowContent}
                  </Link>
                </li>
              );
            }
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => {
                    handler?.();
                    onClose();
                  }}
                  className="w-full text-left hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  {rowContent}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ── Desktop pill bar + mobile trigger ─────────────────────────────────────────

function SectionTiles({
  onOpenFood,
  foodOpen,
  onOpenShopping,
  shoppingOpen,
  onOpenHotels,
  hotelsOpen,
  onOpenSchools,
  schoolsOpen,
  onOpenHealthcare,
  healthcareOpen,
  onOpenMobileMenu,
}: {
  onOpenFood: () => void;
  foodOpen: boolean;
  onOpenShopping: () => void;
  shoppingOpen: boolean;
  onOpenHotels: () => void;
  hotelsOpen: boolean;
  onOpenSchools: () => void;
  schoolsOpen: boolean;
  onOpenHealthcare: () => void;
  healthcareOpen: boolean;
  onOpenMobileMenu: () => void;
}) {
  const handlers: Record<string, () => void> = {
    Food: onOpenFood,
    Shopping: onOpenShopping,
    Hotels: onOpenHotels,
    Schools: onOpenSchools,
    Healthcare: onOpenHealthcare,
  };
  const expanded: Record<string, boolean> = {
    Food: foodOpen,
    Shopping: shoppingOpen,
    Hotels: hotelsOpen,
    Schools: schoolsOpen,
    Healthcare: healthcareOpen,
  };

  return (
    <>
      {/* ── Desktop pill bar (hidden on mobile) ─────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-1 md:gap-1.5 bg-white/95 backdrop-blur-sm border border-slate-200 border-t-0 rounded-b-xl shadow-md px-1.5 md:px-2.5 py-1 md:py-1.5 max-w-[calc(100vw-0.75rem)] overflow-x-auto"
        aria-label="RealCy.app sections"
        role="navigation"
      >
        <span className="text-[10px] md:text-xs font-bold text-slate-900 tracking-tight pr-1.5 mr-0.5 border-r border-slate-200 whitespace-nowrap select-none">
          RealCy
        </span>
        {SECTIONS.map((s) => {
          if (s.kind === "soon") {
            return (
              <div
                key={s.name}
                className="relative rounded-md bg-slate-50 border border-slate-100 hidden sm:block px-1.5 md:px-2.5 py-1 md:py-1.5 text-[10px] md:text-xs font-bold text-slate-700 whitespace-nowrap"
                title={`${s.name} — coming soon`}
              >
                {s.name}
                <span
                  className="absolute -top-1.5 -right-1.5 text-[7px] md:text-[8px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1 py-px leading-tight"
                  aria-label="Coming soon"
                >
                  Soon
                </span>
              </div>
            );
          }
          if (s.kind === "available") {
            return (
              <button
                key={s.name}
                type="button"
                onClick={handlers[s.name]}
                aria-haspopup="dialog"
                aria-expanded={expanded[s.name] ?? false}
                className="rounded-md bg-slate-900 hover:bg-slate-700 px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-bold text-white whitespace-nowrap transition-colors cursor-pointer"
                title={`${s.name} — click to open`}
              >
                {s.name}
              </button>
            );
          }
          if (s.kind === "link") {
            return (
              <Link
                key={s.name}
                href={s.href!}
                className="rounded-md bg-slate-900 hover:bg-slate-700 px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-bold text-white whitespace-nowrap transition-colors"
                title={`${s.name}`}
              >
                {s.name}
              </Link>
            );
          }
          // current page
          return (
            <div
              key={s.name}
              className="rounded-md bg-amber-400 text-slate-900 px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-bold whitespace-nowrap"
              aria-current="page"
              title={`${s.name} — current section`}
            >
              {s.name}
            </div>
          );
        })}
      </div>

      {/* ── Mobile trigger button (visible only on mobile) ───────────────── */}
      <div className="sm:hidden absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-sm border border-slate-200 border-t-0 rounded-b-xl shadow-md">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-900"
          aria-label="Open sections menu"
          aria-haspopup="dialog"
        >
          <span className="text-sm leading-none" aria-hidden>
            ≡
          </span>
          <span>Sections</span>
        </button>
      </div>
    </>
  );
}

// ── Main shell ────────────────────────────────────────────────────────────────

export default function AppShell() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [modalRegion, setModalRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<EnrichedListing | null>(
    null,
  );
  const [foodOpen, setFoodOpen] = useState(false);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [healthcareOpen, setHealthcareOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const mobileHandlers: Record<string, (() => void) | undefined> = {
    "New Developments": undefined,
    Hotels: () => {
      setHotelsOpen(true);
      trackEvent("hotels_section_open");
    },
    Food: () => {
      setFoodOpen(true);
      trackEvent("food_section_open");
    },
    Shopping: () => {
      setShoppingOpen(true);
      trackEvent("shopping_section_open");
    },
    Schools: () => {
      setSchoolsOpen(true);
      trackEvent("schools_section_open");
    },
    Healthcare: () => {
      setHealthcareOpen(true);
      trackEvent("healthcare_section_open");
    },
  };

  return (
    <main
      id="main"
      className="relative md:h-screen w-full md:overflow-hidden bg-[#35cdc4] text-slate-900"
    >
      <SectionTiles
        foodOpen={foodOpen}
        onOpenFood={() => {
          setFoodOpen(true);
          trackEvent("food_section_open");
        }}
        shoppingOpen={shoppingOpen}
        onOpenShopping={() => {
          setShoppingOpen(true);
          trackEvent("shopping_section_open");
        }}
        hotelsOpen={hotelsOpen}
        onOpenHotels={() => {
          setHotelsOpen(true);
          trackEvent("hotels_section_open");
        }}
        schoolsOpen={schoolsOpen}
        onOpenSchools={() => {
          setSchoolsOpen(true);
          trackEvent("schools_section_open");
        }}
        healthcareOpen={healthcareOpen}
        onOpenHealthcare={() => {
          setHealthcareOpen(true);
          trackEvent("healthcare_section_open");
        }}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        handlers={mobileHandlers}
      />

      {/* The map is always rendered at the illustration's native aspect
        (1672:941 ≈ 16:9). On wider/taller viewports the surrounding area
        keeps the sea-teal so the page reads as a continuous illustration —
        and labels positioned at % of this container always land on the
        correct image pixel regardless of viewport. */}
      <div className="relative w-full aspect-[1672/941] md:absolute md:inset-0 md:m-auto md:max-h-screen md:max-w-[177.78vh]">
        {selectedRegion === null && (
          <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full px-3 py-1.5 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2"/>
                <path d="M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v2"/>
                <path d="M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8"/>
                <path d="M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15"/>
              </svg>
              Tap a region to explore
            </span>
          </div>
        )}
        <IllustratedMap
          selectedRegion={selectedRegion}
          onSelectRegion={(c) => {
            setSelectedRegion(c);
            if (c) {
              trackEvent("region_select", {
                region: c,
                listings_in_region: LISTINGS_BY_REGION[c]?.length ?? 0,
              });
            } else {
              trackEvent("map_reset");
              setSelectedListing(null);
            }
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
        onPick={(listing) => {
          setSelectedListing(listing);
          trackEvent("listing_open", {
            slug: listing.slug,
            region: listing.regionCity ?? modalRegion ?? "unknown",
            title: listing.title,
            has_price: Boolean(listing.priceRange),
            has_developer: Boolean(listing.developer?.name),
          });
        }}
      />

      <ListingPanel
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      <FoodPanel
        open={foodOpen}
        onClose={() => {
          setFoodOpen(false);
          trackEvent("food_section_close");
        }}
      />

      <ShoppingPanel
        open={shoppingOpen}
        onClose={() => {
          setShoppingOpen(false);
          trackEvent("shopping_section_close");
        }}
      />

      <HotelsPanel
        open={hotelsOpen}
        onClose={() => {
          setHotelsOpen(false);
          trackEvent("hotels_section_close");
        }}
      />

      <SchoolsPanel
        open={schoolsOpen}
        onClose={() => {
          setSchoolsOpen(false);
          trackEvent("schools_section_close");
        }}
      />

      <HealthcarePanel
        open={healthcareOpen}
        onClose={() => {
          setHealthcareOpen(false);
          trackEvent("healthcare_section_close");
        }}
      />
    </main>
  );
}
