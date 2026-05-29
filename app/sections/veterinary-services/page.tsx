"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_VET_SERVICES,
  VET_CLINICS,
  VET_TIPS,
  VET_SERVICE_LABEL,
  type City,
  type VetService,
} from "@/lib/veterinary";

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
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-slate-900 text-white border border-slate-900"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {city}
    </button>
  );
}

function ServiceChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-teal-600 text-white border border-teal-600"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

function ClinicCard({ clinic }: { clinic: (typeof VET_CLINICS)[number] }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 text-sm flex flex-col gap-2">
      <div>
        <p className="font-bold text-slate-900">{clinic.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {clinic.city}
          {clinic.neighbourhood ? ` · ${clinic.neighbourhood}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {clinic.emergency24h && (
          <span className="rounded-full bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 text-[10px] font-semibold">
            24h emergency
          </span>
        )}
        {clinic.englishSpoken && (
          <span className="rounded-full bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold">
            English spoken
          </span>
        )}
        {clinic.services.map((s) => (
          <span
            key={s}
            className="rounded-full bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 text-[10px] font-semibold"
          >
            {VET_SERVICE_LABEL[s]}
          </span>
        ))}
      </div>

      <p className="text-slate-700 leading-relaxed text-xs">{clinic.why}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold mt-1">
        {clinic.phone && (
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="text-slate-700 hover:text-slate-900"
          >
            {clinic.phone}
          </a>
        )}
        {clinic.website && (
          <a
            href={clinic.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 hover:text-teal-900"
          >
            Website ↗
          </a>
        )}
      </div>
    </li>
  );
}

export default function VeterinaryServicesPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [serviceFilter, setServiceFilter] = useState<VetService | "All">(
    "All"
  );

  const filtered = VET_CLINICS.filter(
    (c) =>
      (cityFilter === "All" || c.city === cityFilter) &&
      (serviceFilter === "All" || c.services.includes(serviceFilter))
  );

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
      {/* Back nav */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          ← Map
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Services
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Veterinary Services in Cyprus
          <br />
          <span className="text-2xl md:text-3xl font-semibold text-slate-600">
            Clinics and Emergency Care
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-700 leading-relaxed max-w-2xl">
          English-friendly vet clinics across all five major cities — routine
          care, emergency cover, specialist referrals, and exotic animal
          services. Includes 24/7 emergency locations.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          What to know first
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {VET_TIPS.map((tip) => (
            <div
              key={tip.heading}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs"
            >
              <p className="font-bold text-sm text-slate-900">{tip.heading}</p>
              <p className="mt-1.5 text-slate-700 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* City filter */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          City
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...ALL_CITIES] as const).map((c) => (
            <CityChip
              key={c}
              city={c}
              selected={cityFilter === c}
              onClick={() => setCityFilter(c)}
            />
          ))}
        </div>
      </div>

      {/* Service filter */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Service
        </p>
        <div className="flex flex-wrap gap-1.5">
          <ServiceChip
            label="All services"
            selected={serviceFilter === "All"}
            onClick={() => setServiceFilter("All")}
          />
          {ALL_VET_SERVICES.map((s) => (
            <ServiceChip
              key={s}
              label={VET_SERVICE_LABEL[s]}
              selected={serviceFilter === s}
              onClick={() => setServiceFilter(s)}
            />
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} clinic{filtered.length !== 1 ? "s" : ""} listed
        {cityFilter !== "All" ? ` in ${cityFilter}` : ""}
        {serviceFilter !== "All"
          ? ` · ${VET_SERVICE_LABEL[serviceFilter]}`
          : ""}
      </p>

      {/* Clinic grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
          No clinics match the current filters.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((clinic) => (
            <ClinicCard key={`${clinic.name}-${clinic.city}`} clinic={clinic} />
          ))}
        </ul>
      )}

      <p className="mt-12 text-xs text-slate-500 leading-relaxed max-w-2xl">
        Opening hours, emergency cover arrangements, and staff availability
        change — always confirm directly with the clinic before travelling.
        For a genuine pet emergency, call ahead even if the clinic is listed as
        24/7.
      </p>
    </main>
  );
}
