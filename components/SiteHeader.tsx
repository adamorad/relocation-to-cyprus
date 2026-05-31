import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
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
    </header>
  );
}
