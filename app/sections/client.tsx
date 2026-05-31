"use client";

import Link from "next/link";
import { useState } from "react";
import { SECTIONS_INDEX, SECTION_CATEGORIES, type SectionCategory } from "@/lib/sections-index";

export default function SectionsIndexPage() {
  const [active, setActive] = useState<SectionCategory | "all">("all");

  const visible =
    active === "all"
      ? SECTIONS_INDEX
      : SECTIONS_INDEX.filter((s) => s.category === active);

  const countFor = (cat: SectionCategory) =>
    SECTIONS_INDEX.filter((s) => s.category === cat).length;

  return (
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        &rsaquo;{" "}
        <Link href="/explore/" className="hover:text-slate-900">Explore</Link>{" "}
        &rsaquo; <span className="text-slate-900">Directories</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Curated Directories
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Cyprus Directories
        </h1>
        <p className="mt-3 text-slate-700 leading-relaxed">
          Curated, researched directories covering every practical need for your Cyprus relocation — from property lawyers to expat communities.
        </p>
      </header>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
            active === "all"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          All ({SECTIONS_INDEX.length})
        </button>
        {SECTION_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
              active === cat
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            {cat} ({countFor(cat)})
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((s) => (
          <Link
            key={s.slug}
            href={`/sections/${s.slug}`}
            className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-[#35cdc4] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 mb-2">
                  {s.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">
                  {s.name}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {s.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors text-xl mt-1">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/explore/" className="underline hover:text-slate-900">
          &larr; Back to Explore
        </Link>
      </p>
    </main>
  );
}
