"use client";

import { useEffect, useState } from "react";
import {
  ALL_CITIES,
  ALL_SCHOOL_CURRICULA,
  SCHOOL_CURRICULUM_LABEL,
  SCHOOL_TIPS,
  SCHOOLS,
  type City,
  type SchoolCurriculum,
} from "@/lib/schools";
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

function CurriculumChip({
  curriculum,
  selected,
  onClick,
}: {
  curriculum: SchoolCurriculum | "All";
  selected: boolean;
  onClick: () => void;
}) {
  const label =
    curriculum === "All" ? "All" : SCHOOL_CURRICULUM_LABEL[curriculum];
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

export default function SchoolsPanel({ open, onClose }: Props) {
  const [cityFilter, setCityFilter] = useState<City | "All">("All");
  const [curriculumFilter, setCurriculumFilter] = useState<
    SchoolCurriculum | "All"
  >("All");

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
        aria-labelledby="schools-title"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="px-5 pt-5 pb-3 border-b border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-teal-700 font-semibold">
                RealCy section
              </p>
              <h2
                id="schools-title"
                className="mt-0.5 text-2xl font-bold leading-snug"
              >
                International &amp; Private Schools in Cyprus
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                British, IB, bilingual and private schools across all five
                cities — curated for relocating families.
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
              ["british", "British"],
              ["ib", "IB"],
              ["american", "American"],
              ["bilingual", "Bilingual"],
              ["greek-private", "Greek Private"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#schools-${id}`}
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
          <section id="schools-about">
            <h3 className="text-lg font-bold mb-3">
              Choosing a school in Cyprus
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SCHOOL_TIPS.map((tip) => (
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
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...ALL_CITIES] as const).map((c) => (
                <CityChip
                  key={c}
                  city={c}
                  selected={cityFilter === c}
                  onClick={() => {
                    setCityFilter(c);
                    if (c !== "All")
                      trackEvent("schools_city_filter", { city: c });
                  }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...ALL_SCHOOL_CURRICULA] as const).map((cur) => (
                <CurriculumChip
                  key={cur}
                  curriculum={cur}
                  selected={curriculumFilter === cur}
                  onClick={() => setCurriculumFilter(cur)}
                />
              ))}
            </div>
          </div>

          {/* CURRICULUM SECTIONS */}
          {ALL_SCHOOL_CURRICULA.map((cur) => {
            // Skip sections entirely filtered out by the curriculum chip
            if (curriculumFilter !== "All" && curriculumFilter !== cur)
              return null;

            const visible = SCHOOLS.filter(
              (s) =>
                s.curriculum === cur &&
                (cityFilter === "All" || s.city === cityFilter),
            );

            return (
              <section key={cur} id={`schools-${cur}`}>
                <h3 className="text-lg font-bold mb-3">
                  {SCHOOL_CURRICULUM_LABEL[cur]}
                </h3>
                {visible.length === 0 ? (
                  <p className="text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-100 px-4 py-3">
                    No {SCHOOL_CURRICULUM_LABEL[cur].toLowerCase()} schools
                    listed for {cityFilter} yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {visible.map((school) => (
                      <SchoolCard key={school.name} school={school} />
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

function SchoolCard({ school }: { school: (typeof SCHOOLS)[number] }) {
  return (
    <li className="rounded-md border border-slate-200 bg-white p-3 text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-sm text-slate-900">{school.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {school.city}
            {school.neighbourhood ? ` · ${school.neighbourhood}` : ""}
            {" · "}
            <span className="font-medium">Ages {school.ageRange}</span>
            {" · "}
            <span>
              €{school.annualFeeFrom.toLocaleString()}–
              {school.annualFeeTo.toLocaleString()}/yr
            </span>
            {" · "}
            <span className="capitalize">
              {school.languageOfInstruction === "bilingual"
                ? "Bilingual (Greek/English)"
                : school.languageOfInstruction === "english"
                  ? "English"
                  : "Greek"}
            </span>
          </p>
        </div>
      </div>
      {school.studentBody && (
        <p className="mt-1 text-[10px] text-teal-700 font-medium">
          {school.studentBody}
        </p>
      )}
      <p className="mt-1.5 text-slate-700 leading-relaxed">{school.why}</p>
      {school.tip && (
        <p className="mt-1.5 text-[10px] text-amber-700 bg-amber-50 rounded px-2 py-1 leading-relaxed">
          <span className="font-semibold">Tip: </span>
          {school.tip}
        </p>
      )}
      {school.website && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold">
          <a
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("schools_website_click", {
                school: school.name,
                city: school.city,
                curriculum: school.curriculum,
              })
            }
            className="text-teal-700 hover:text-teal-900"
          >
            Website ↗
          </a>
        </div>
      )}
    </li>
  );
}
