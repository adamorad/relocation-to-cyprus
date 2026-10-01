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
        <Link href="/" className="hover:text-ink">Home</Link>{" "}
        › <span className="text-ink">Guides</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Relocation guides</h1>
      <p className="mt-3 text-slate-600">
        Practical reading for anyone considering Cyprus — written for people
        deciding whether and how to move.
      </p>

      {/* Category filter chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full px-3 py-2 min-h-11 inline-flex items-center text-xs font-semibold border transition-colors ${
            active === "all"
              ? "bg-primary text-white border-primary"
              : "bg-white text-ink border-line hover:bg-sky"
          }`}
        >
          All ({GUIDES.length})
        </button>
        {ALL_GUIDE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-3 py-2 min-h-11 inline-flex items-center text-xs font-semibold border transition-colors ${
              active === cat
                ? "bg-primary text-white border-primary"
                : "bg-white text-ink border-line hover:bg-sky"
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
              className="border border-line rounded-2xl p-4 hover:border-primary transition-colors"
            >
              <Link href={`/guides/${g.slug}/`} className="block">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-ink bg-sky-strong rounded-full px-2.5 py-0.5 mb-1.5">
                      {GUIDE_CATEGORY_LABEL[g.category]}
                    </span>
                    <h2 className="text-base font-bold text-ink leading-snug">
                      {g.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                      {g.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-ink">
          Back to home
        </Link>
      </p>
    </main>
  );
}
