"use client";

import { useEffect, useState } from "react";
import {
  ALL_CITIES,
  ALL_HEALTHCARE_TYPES,
  HEALTHCARE_TYPE_LABEL,
  HEALTHCARE_TIPS,
  HEALTHCARE_VENUES,
  type City,
  type HealthcareType,
  type HealthcareVenue,
} from "@/lib/healthcare";
import { trackEvent } from "@/lib/analytics";

type Props = {
  open: boolean;
  onClose: () => void;
};

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

function TypeChip({
  type,
  selected,
  onClick,
}: {
  type: HealthcareType | "All";
  selected: boolean;
  onClick: () => void;
}) {
  const label =
    type === "All" ? "All Types" : HEALTHCARE_TYPE_LABEL[type as HealthcareType];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pointer-events-auto rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-teal-700 text-white border border-teal-700"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

const TYPE_HASH: Record<HealthcareType, string> = {
  hospital: "hospital",
  "gp-clinic": "gp-clinic",
  dental: "dental",
  specialist: "specialist",
  pharmacy: "pharmacy",
};

export default function HealthcarePanel({ open, onClose }: Props) {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [typeFilter, setTypeFilter] = useState<HealthcareType | "All">("All");

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
        aria-labelledby="healthcare-title"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="px-5 pt-5 pb-3 border-b border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-teal-700 font-semibold">
                RealCy section
              </p>
              <h2
                id="healthcare-title"
                className="mt-0.5 text-2xl font-bold leading-snug"
              >
                Healthcare in Cyprus
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Hospitals, GP clinics, dentists, and specialists — GeSY public
                system and private options for relocators.
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
              ["hospital", "Hospitals"],
              ["gp-clinic", "GP Clinics"],
              ["dental", "Dental"],
              ["specialist", "Specialists"],
              ["pharmacy", "Pharmacy"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#healthcare-${id}`}
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
          <section id="healthcare-about">
            <h3 className="text-lg font-bold mb-3">
              Healthcare as a Cyprus relocator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {HEALTHCARE_TIPS.map((tip) => (
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

          {/* FILTERS */}
          <div className="space-y-2">
            {/* City filter */}
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...ALL_CITIES] as const).map((c) => (
                <CityChip
                  key={c}
                  city={c}
                  selected={cityFilter === c}
                  onClick={() => {
                    setCityFilter(c);
                    if (c !== "All")
                      trackEvent("healthcare_city_filter", { city: c });
                  }}
                />
              ))}
            </div>
            {/* Type filter */}
            <div className="flex flex-wrap gap-1.5">
              <TypeChip
                type="All"
                selected={typeFilter === "All"}
                onClick={() => setTypeFilter("All")}
              />
              {ALL_HEALTHCARE_TYPES.map((t) => (
                <TypeChip
                  key={t}
                  type={t}
                  selected={typeFilter === t}
                  onClick={() => setTypeFilter(t)}
                />
              ))}
            </div>
          </div>

          {/* TYPE SECTIONS */}
          {ALL_HEALTHCARE_TYPES.filter(
            (t) => typeFilter === "All" || typeFilter === t,
          ).map((type) => {
            const visible = HEALTHCARE_VENUES.filter(
              (v) =>
                v.type === type &&
                (cityFilter === "All" || v.city === cityFilter),
            );
            return (
              <section key={type} id={`healthcare-${TYPE_HASH[type]}`}>
                <h3 className="text-lg font-bold mb-3">
                  {HEALTHCARE_TYPE_LABEL[type]}
                </h3>
                {visible.length === 0 ? (
                  <p className="text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-100 px-4 py-3">
                    No{" "}
                    {HEALTHCARE_TYPE_LABEL[type].toLowerCase()} venues listed
                    for {cityFilter} yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {visible.map((venue) => (
                      <HealthcareCard key={venue.name} venue={venue} />
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

function HealthcareCard({ venue }: { venue: HealthcareVenue }) {
  return (
    <li className="rounded-md border border-slate-200 bg-white p-3 text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-sm text-slate-900">{venue.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {venue.city}
            {venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
            {venue.specialty ? (
              <span className="ml-1.5 text-teal-700 font-semibold">
                {venue.specialty}
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 flex-shrink-0">
          {venue.gesyAccepted && (
            <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap">
              GeSY
            </span>
          )}
          {venue.englishSpoken && (
            <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap">
              EN
            </span>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-slate-700 leading-relaxed">{venue.why}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-semibold">
        {venue.consultationFrom !== undefined && (
          <span className="text-slate-500">
            From €{venue.consultationFrom} / consultation
          </span>
        )}
        {venue.phone && (
          <a
            href={`tel:${venue.phone}`}
            className="text-slate-600 hover:text-slate-900"
          >
            {venue.phone}
          </a>
        )}
        {venue.website && (
          <a
            href={venue.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("healthcare_website_click", {
                venue: venue.name,
                city: venue.city,
                type: venue.type,
              })
            }
            className="text-teal-700 hover:text-teal-900"
          >
            Website ↗
          </a>
        )}
      </div>
    </li>
  );
}
