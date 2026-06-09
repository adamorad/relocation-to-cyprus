"use client";

import Link from "next/link";
import { useState } from "react";
import {
  GUIDES,
  ALL_GUIDE_CATEGORIES,
  GUIDE_CATEGORY_LABEL,
  type GuideCategory,
} from "@/lib/guides";

export default function GuidesClient() {
  const [active, setActive] = useState<GuideCategory | "all">("all");

  const visible =
    active === "all" ? GUIDES : GUIDES.filter((g) => g.category === active);

  const countFor = (cat: GuideCategory) =>
    GUIDES.filter((g) => g.category === cat).length;

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        › <span className="text-slate-900">Guides</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold">Relocation guides</h1>
      <p className="mt-3 text-slate-600">
        Practical reading for anyone considering Cyprus — written for people
        deciding whether and how to move.
      </p>

      {/* Category filter chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
            active === "all"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          All ({GUIDES.length})
        </button>
        {ALL_GUIDE_CATEGORIES.map((cat) => (
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
            {GUIDE_CATEGORY_LABEL[cat]} ({countFor(cat)})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">No guides in this category yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((g) => (
            <li
              key={g.slug}
              className="border border-slate-200 rounded-lg p-4 hover:border-slate-900 transition-colors"
            >
              <Link href={`/guides/${g.slug}/`} className="block">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 mb-1.5">
                      {GUIDE_CATEGORY_LABEL[g.category]}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 leading-snug">
                      {g.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                      {g.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-slate-300 text-xl mt-1">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
