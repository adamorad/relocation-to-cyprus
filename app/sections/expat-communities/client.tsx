"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ALL_CITIES,
  ALL_PLATFORMS,
  COMMUNITY_TIPS,
  EXPAT_COMMUNITIES,
  PLATFORM_LABEL,
  type City,
  type Platform,
} from "@/lib/expat-communities";

function CityChip({
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
          aria-pressed={selected}
      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
        selected
          ? "bg-slate-900 text-white border border-slate-900"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

const PLATFORM_EMOJI: Record<Platform, string> = {
  Facebook: "📘",
  WhatsApp: "💬",
  Meetup: "🤝",
  Telegram: "✈️",
  Forum: "📋",
};

export default function ExpatCommunitiesPage() {
  const [cityFilter, setCityFilter] = useState<City | "Island-wide" | "All">(
    "All"
  );
  const [platformFilter, setPlatformFilter] = useState<Platform | "All">("All");

  const filtered = EXPAT_COMMUNITIES.filter((c) => {
    const cityOk = cityFilter === "All" || c.city === cityFilter;
    const platformOk =
      platformFilter === "All" || c.platform === platformFilter;
    return cityOk && platformOk;
  });

  return (
    <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Back nav */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">← Home</Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Community
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Expat Community Groups in Cyprus
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
          Facebook groups, WhatsApp chats, Meetup events and forums for
          English-speaking expats across Cyprus — organised by city and platform.
        </p>
      </header>

      {/* Tips */}
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMMUNITY_TIPS.map((tip) => (
          <div
            key={tip.heading}
            className="rounded-xl border border-amber-200 bg-amber-50 p-4"
          >
            <p className="text-sm font-semibold text-slate-900 mb-1">
              {tip.heading}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </section>

      {/* City filter */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          City
        </p>
        <div className="flex flex-wrap gap-2">
          <CityChip
            label="All cities"
            selected={cityFilter === "All"}
            onClick={() => setCityFilter("All")}
          />
          <CityChip
            label="Island-wide"
            selected={cityFilter === "Island-wide"}
            onClick={() => setCityFilter("Island-wide")}
          />
          {ALL_CITIES.map((c) => (
            <CityChip
              key={c}
              label={c}
              selected={cityFilter === c}
              onClick={() => setCityFilter(c)}
            />
          ))}
        </div>
      </div>

      {/* Platform filter */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          Platform
        </p>
        <div className="flex flex-wrap gap-2">
          <CityChip
            label="All platforms"
            selected={platformFilter === "All"}
            onClick={() => setPlatformFilter("All")}
          />
          {ALL_PLATFORMS.map((p) => (
            <CityChip
              key={p}
              label={PLATFORM_LABEL[p]}
              selected={platformFilter === p}
              onClick={() => setPlatformFilter(p)}
            />
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        {filtered.length} {filtered.length === 1 ? "community" : "communities"}{" "}
        found
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((community) => (
          <article
            key={community.name}
            className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="font-bold text-slate-900 text-sm leading-snug">
                  {community.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{community.city}</p>
              </div>
              <span
                className="text-lg flex-shrink-0"
                aria-label={community.platform}
              >
                {PLATFORM_EMOJI[community.platform]}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {PLATFORM_LABEL[community.platform]}
              </span>
              {community.nationalityFocus && (
                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700 border border-teal-200">
                  {community.nationalityFocus}
                </span>
              )}
              {community.sizeApprox && (
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {community.sizeApprox}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {community.why}
            </p>

            {community.url && (
              <a
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#35cdc4] hover:underline"
              >
                Join group →
              </a>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500">
            <p className="text-lg font-medium">No communities match these filters.</p>
            <p className="text-sm mt-1">Try broadening your city or platform selection.</p>
          </div>
        )}
      </div>

      {/* Back link */}
      <p className="mt-12 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
