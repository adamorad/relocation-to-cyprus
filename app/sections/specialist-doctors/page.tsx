"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_SPECIALTIES,
  SPECIALIST_DOCTORS,
  SPECIALIST_TIPS,
  SPECIALTY_LABEL,
  type City,
  type Specialty,
} from "@/lib/specialist-doctors";

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

function SpecialtyChip({
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

function DoctorCard({
  doctor,
}: {
  doctor: (typeof SPECIALIST_DOCTORS)[number];
}) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 text-sm flex flex-col gap-2">
      <div>
        <p className="font-bold text-slate-900">{doctor.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {doctor.title}
          {" · "}
          {doctor.city}
          {doctor.hospital ? ` · ${doctor.hospital}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 text-[10px] font-semibold">
          {SPECIALTY_LABEL[doctor.specialty]}
        </span>
        {doctor.gesyAccepted && (
          <span className="rounded-full bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 text-[10px] font-semibold">
            GeSY accepted
          </span>
        )}
        {doctor.englishSpoken && (
          <span className="rounded-full bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold">
            English spoken
          </span>
        )}
        {doctor.consultationFrom && (
          <span className="rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold">
            From €{doctor.consultationFrom}
          </span>
        )}
      </div>

      <p className="text-slate-700 leading-relaxed text-xs">{doctor.why}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold mt-1">
        {doctor.phone && (
          <a
            href={`tel:${doctor.phone.replace(/\s/g, "")}`}
            className="text-slate-700 hover:text-slate-900"
          >
            {doctor.phone}
          </a>
        )}
        {doctor.website && (
          <a
            href={doctor.website}
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

export default function SpecialistDoctorsPage() {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | "All">(
    "All"
  );

  const filtered = SPECIALIST_DOCTORS.filter(
    (d) =>
      (cityFilter === "All" || d.city === cityFilter) &&
      (specialtyFilter === "All" || d.specialty === specialtyFilter)
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
          Healthcare
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Specialist Doctors in Cyprus
          <br />
          <span className="text-2xl md:text-3xl font-semibold text-slate-600">
            English-Speaking Directory
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-700 leading-relaxed max-w-2xl">
          English-speaking specialists across cardiology, oncology, orthopaedics,
          dermatology, fertility, paediatrics and more — covering private and GeSY
          providers in all major cities.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          What to know first
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SPECIALIST_TIPS.map((tip) => (
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

      {/* Specialty filter */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Specialty
        </p>
        <div className="flex flex-wrap gap-1.5">
          <SpecialtyChip
            label="All specialties"
            selected={specialtyFilter === "All"}
            onClick={() => setSpecialtyFilter("All")}
          />
          {ALL_SPECIALTIES.map((s) => (
            <SpecialtyChip
              key={s}
              label={SPECIALTY_LABEL[s]}
              selected={specialtyFilter === s}
              onClick={() => setSpecialtyFilter(s)}
            />
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} listed
        {cityFilter !== "All" ? ` in ${cityFilter}` : ""}
        {specialtyFilter !== "All"
          ? ` · ${SPECIALTY_LABEL[specialtyFilter]}`
          : ""}
      </p>

      {/* Doctor grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
          No specialists match the current filters.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doctor) => (
            <DoctorCard key={`${doctor.name}-${doctor.city}`} doctor={doctor} />
          ))}
        </ul>
      )}

      <p className="mt-12 text-xs text-slate-500 leading-relaxed max-w-2xl">
        This directory is general information for relocators, not medical advice.
        Always verify GeSY acceptance status, clinic availability, and consultation
        fees directly with the provider before attending.
      </p>
    </main>
  );
}
