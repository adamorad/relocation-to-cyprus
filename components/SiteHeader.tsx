"use client";
import Link from "next/link";
import { useMapNav } from "./MapNavContext";

export function SiteHeader() {
  const mapNav = useMapNav();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      {/* ── Primary nav row ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-slate-900 text-sm hover:text-[#35cdc4] transition-colors flex-shrink-0"
        >
          RealCy.app
        </Link>
        <nav className="flex items-center gap-1 md:gap-3 text-xs text-slate-500 overflow-x-auto">
          <Link href="/guides/" className="hover:text-slate-900 transition-colors whitespace-nowrap px-2 py-1">
            Guides
          </Link>
          <Link href="/tools/" className="hover:text-slate-900 transition-colors whitespace-nowrap px-2 py-1">
            Tools
          </Link>
          <Link href="/sections/" className="hover:text-slate-900 transition-colors whitespace-nowrap px-2 py-1">
            Directories
          </Link>
          <Link
            href="/explore/"
            className="ml-1 md:ml-2 text-xs px-3 py-1.5 rounded-full bg-[#35cdc4] text-slate-900 font-semibold hover:bg-teal-400 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Explore
          </Link>
        </nav>
      </div>

      {/* ── Section tiles row (homepage only, via context) ──────────── */}
      {mapNav && (
        <div className="border-t border-slate-100 flex items-center gap-1 px-4 md:px-6 h-9 overflow-x-auto">
          <div
            className="rounded-md bg-amber-400 text-slate-900 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap flex-shrink-0"
            aria-current="page"
          >
            New Developments
          </div>
          {(
            [
              { name: "Hotels",     handler: mapNav.onOpenHotels },
              { name: "Food",       handler: mapNav.onOpenFood },
              { name: "Shopping",   handler: mapNav.onOpenShopping },
              { name: "Schools",    handler: mapNav.onOpenSchools },
              { name: "Healthcare", handler: mapNav.onOpenHealthcare },
            ] as const
          ).map(({ name, handler }) => (
            <button
              key={name}
              type="button"
              onClick={handler}
              className="rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap flex-shrink-0 transition-colors"
            >
              {name}
            </button>
          ))}
          <Link
            href="/guides/"
            className="rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap flex-shrink-0 transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/explore/"
            className="rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap flex-shrink-0 transition-colors"
          >
            More
          </Link>
        </div>
      )}
    </header>
  );
}
