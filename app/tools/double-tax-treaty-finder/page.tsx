"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Treaty = {
  country: string;
  flag: string;
  hasTreaty: boolean;
  dividendsWHT: number | null;
  interestWHT: number | null;
  royaltiesWHT: number | null;
  treatyType: string;
  notes: string;
};

const TREATIES: ReadonlyArray<Treaty> = [
  // Europe
  { country: "United Kingdom", flag: "🇬🇧", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Comprehensive treaty. UK-sourced dividends generally 0% WHT when received by Cyprus company." },
  { country: "Germany", flag: "🇩🇪", hasTreaty: true, dividendsWHT: 5, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "5% WHT on dividends applies when holding ≥25% capital; 15% otherwise." },
  { country: "France", flag: "🇫🇷", hasTreaty: true, dividendsWHT: 10, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "10% WHT on dividends; nil on interest and royalties." },
  { country: "Italy", flag: "🇮🇹", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Highly favourable. 0% on all three withholding categories." },
  { country: "Spain", flag: "🇪🇸", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% WHT on dividends (≥10% holding), interest and royalties." },
  { country: "Netherlands", flag: "🇳🇱", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Very favourable terms. Both the Netherlands and Cyprus have favourable holding company regimes." },
  { country: "Belgium", flag: "🇧🇪", hasTreaty: true, dividendsWHT: 10, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "10% WHT on dividends; 0% on interest and royalties." },
  { country: "Poland", flag: "🇵🇱", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 5, treatyType: "Full DTC", notes: "0% on dividends (≥10% holding for 24 months); 5% WHT on royalties." },
  { country: "Czech Republic", flag: "🇨🇿", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Very favourable. 0% on dividends, interest and royalties." },
  { country: "Hungary", flag: "🇭🇺", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% across all WHT categories." },
  { country: "Romania", flag: "🇷🇴", hasTreaty: true, dividendsWHT: 10, interestWHT: 10, royaltiesWHT: 5, treatyType: "Full DTC", notes: "10% on dividends and interest; 5% on royalties." },
  { country: "Bulgaria", flag: "🇧🇬", hasTreaty: true, dividendsWHT: 5, interestWHT: 7, royaltiesWHT: 10, treatyType: "Full DTC", notes: "5% on dividends; 7% on interest; 10% on royalties." },
  { country: "Greece", flag: "🇬🇷", hasTreaty: true, dividendsWHT: 25, interestWHT: 10, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Higher WHT on dividends (25%). Royalties exempt. Cyprus-Greece treaty updated 2013." },
  { country: "Austria", flag: "🇦🇹", hasTreaty: true, dividendsWHT: 10, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "10% on dividends; 0% on interest and royalties." },
  { country: "Sweden", flag: "🇸🇪", hasTreaty: true, dividendsWHT: 5, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "5% on dividends (≥25% participation); 0% on interest and royalties." },
  { country: "Denmark", flag: "🇩🇰", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% across all WHT categories." },
  { country: "Norway", flag: "🇳🇴", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% across all WHT categories." },
  { country: "Finland", flag: "🇫🇮", hasTreaty: true, dividendsWHT: 5, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "5% on dividends (≥25% holding); 0% on interest and royalties." },
  { country: "Portugal", flag: "🇵🇹", hasTreaty: true, dividendsWHT: 10, interestWHT: 10, royaltiesWHT: 10, treatyType: "Full DTC", notes: "10% WHT applies to all three categories." },
  { country: "Ireland", flag: "🇮🇪", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% on dividends, interest and royalties." },
  { country: "Luxembourg", flag: "🇱🇺", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% across all WHT categories." },
  { country: "Malta", flag: "🇲🇹", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 10, treatyType: "Full DTC", notes: "0% on dividends and interest; 10% on royalties." },
  { country: "Switzerland", flag: "🇨🇭", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Very favourable. 0% on all three categories." },
  // Eastern Europe / CIS
  { country: "Russia", flag: "🇷🇺", hasTreaty: true, dividendsWHT: 5, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Treaty suspended by Russia in August 2023. Verify current status with accountant before relying on it." },
  { country: "Ukraine", flag: "🇺🇦", hasTreaty: true, dividendsWHT: 5, interestWHT: 2, royaltiesWHT: 5, treatyType: "Full DTC", notes: "5% on dividends (≥25% holding); 2% on interest; 5% on royalties." },
  { country: "Belarus", flag: "🇧🇾", hasTreaty: true, dividendsWHT: 5, interestWHT: 5, royaltiesWHT: 5, treatyType: "Full DTC", notes: "5% on all three categories. Verify applicability given sanctions." },
  { country: "Kazakhstan", flag: "🇰🇿", hasTreaty: true, dividendsWHT: 5, interestWHT: 10, royaltiesWHT: 10, treatyType: "Full DTC", notes: "5% on dividends (≥10% holding for 12 months); 10% on interest and royalties." },
  { country: "Armenia", flag: "🇦🇲", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 5, treatyType: "Full DTC", notes: "Very favourable. 0% on dividends and interest; 5% on royalties." },
  { country: "Georgia", flag: "🇬🇪", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% across all WHT categories." },
  { country: "Azerbaijan", flag: "🇦🇿", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 5, treatyType: "Full DTC", notes: "0% on dividends and interest; 5% on royalties." },
  { country: "Moldova", flag: "🇲🇩", hasTreaty: true, dividendsWHT: 5, interestWHT: 5, royaltiesWHT: 5, treatyType: "Full DTC", notes: "5% on dividends, interest and royalties." },
  { country: "Serbia", flag: "🇷🇸", hasTreaty: true, dividendsWHT: 10, interestWHT: 10, royaltiesWHT: 10, treatyType: "Full DTC", notes: "10% on all three categories." },
  // Middle East
  { country: "Israel", flag: "🇮🇱", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Excellent treaty. 0% on all three categories. Popular structure for Israeli tech entrepreneurs." },
  { country: "UAE", flag: "🇦🇪", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Signed 2015; in force. Very favourable — 0% on all three categories." },
  { country: "Qatar", flag: "🇶🇦", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 5, treatyType: "Full DTC", notes: "0% on dividends and interest; 5% on royalties." },
  { country: "Saudi Arabia", flag: "🇸🇦", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 8, treatyType: "Full DTC", notes: "0% on dividends and interest; 8% on royalties." },
  { country: "Jordan", flag: "🇯🇴", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% across all WHT categories." },
  { country: "Egypt", flag: "🇪🇬", hasTreaty: true, dividendsWHT: 15, interestWHT: 15, royaltiesWHT: 10, treatyType: "Full DTC", notes: "Higher WHT rates. 15% on dividends and interest; 10% on royalties." },
  { country: "Lebanon", flag: "🇱🇧", hasTreaty: true, dividendsWHT: 5, interestWHT: 5, royaltiesWHT: 0, treatyType: "Full DTC", notes: "5% on dividends and interest; 0% on royalties." },
  { country: "Kuwait", flag: "🇰🇼", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 5, treatyType: "Full DTC", notes: "0% on dividends and interest; 5% on royalties." },
  { country: "Bahrain", flag: "🇧🇭", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "0% on all three categories." },
  { country: "Oman", flag: "🇴🇲", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 8, treatyType: "Full DTC", notes: "0% on dividends and interest; 8% on royalties." },
  // Asia
  { country: "India", flag: "🇮🇳", hasTreaty: true, dividendsWHT: 10, interestWHT: 10, royaltiesWHT: 10, treatyType: "Full DTC", notes: "10% on all three categories. Important treaty for Indian tech sector and diaspora." },
  { country: "China", flag: "🇨🇳", hasTreaty: true, dividendsWHT: 10, interestWHT: 10, royaltiesWHT: 10, treatyType: "Full DTC", notes: "10% on all three categories." },
  { country: "Singapore", flag: "🇸🇬", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 10, treatyType: "Full DTC", notes: "0% on dividends and interest; 10% on royalties." },
  { country: "Hong Kong", flag: "🇭🇰", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Very favourable — 0% on all three categories." },
  { country: "Thailand", flag: "🇹🇭", hasTreaty: true, dividendsWHT: 10, interestWHT: 10, royaltiesWHT: 5, treatyType: "Full DTC", notes: "10% on dividends and interest; 5% on royalties." },
  { country: "Malaysia", flag: "🇲🇾", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 10, treatyType: "Full DTC", notes: "0% on dividends and interest; 10% on royalties." },
  // Africa
  { country: "South Africa", flag: "🇿🇦", hasTreaty: true, dividendsWHT: 0, interestWHT: 0, royaltiesWHT: 0, treatyType: "Full DTC", notes: "Very favourable — 0% on all three categories. Used by SA entrepreneurs expanding to EU." },
  // Americas / Oceania — no treaty (important)
  { country: "USA", flag: "🇺🇸", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "NO DOUBLE TAX TREATY between Cyprus and the USA. US persons and US-connected income require specialist US-Cyprus tax advice. Check with a Cyprus accountant and US CPA." },
  { country: "Canada", flag: "🇨🇦", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "NO DOUBLE TAX TREATY between Cyprus and Canada. Each country taxes independently. Verify with a qualified accountant before structuring." },
  { country: "Australia", flag: "🇦🇺", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "NO DOUBLE TAX TREATY between Cyprus and Australia. Australian-source income may face withholding in Australia and potential Cyprus tax. Get specialist advice." },
  { country: "New Zealand", flag: "🇳🇿", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "No treaty exists. Verify tax treatment with a qualified accountant." },
  { country: "Brazil", flag: "🇧🇷", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "No double tax treaty. Brazil's complex IRRF withholding rules apply independently." },
  { country: "Japan", flag: "🇯🇵", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "No double tax treaty between Cyprus and Japan. Japanese domestic withholding rates apply." },
  { country: "South Korea", flag: "🇰🇷", hasTreaty: false, dividendsWHT: null, interestWHT: null, royaltiesWHT: null, treatyType: "No treaty", notes: "No treaty exists. Korean domestic withholding applies." },
];

export default function DoubleTaxTreatyFinderPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "treaty" | "no-treaty">("all");

  const filtered = useMemo(() => {
    return TREATIES.filter((t) => {
      const matchesSearch = t.country.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "treaty" && t.hasTreaty) ||
        (filterStatus === "no-treaty" && !t.hasTreaty);
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Map</Link>
        {" › "}
        <span className="text-slate-900">Cyprus Double Tax Treaty Finder</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
          Tools
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Double Tax Treaty Finder
        </h1>
        <p className="mt-3 text-lg text-slate-600 leading-relaxed">
          Search Cyprus&apos;s ~65 double tax treaties. See withholding tax rates on dividends,
          interest and royalties — and which countries have no treaty at all.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#35cdc4] focus:border-transparent bg-white"
        />
        <div className="flex gap-2">
          {(["all", "treaty", "no-treaty"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                filterStatus === s
                  ? "bg-[#35cdc4] text-white border-[#35cdc4]"
                  : "bg-white text-slate-600 border-slate-300 hover:border-[#35cdc4]"
              }`}
            >
              {s === "all" ? "All" : s === "treaty" ? "Has Treaty" : "No Treaty"}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        Showing {filtered.length} of {TREATIES.length} entries
      </p>

      {/* Treaty Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No results for &quot;{search}&quot;. Try a different country name.
          </div>
        )}
        {filtered.map((t) => (
          <div
            key={t.country}
            className={`rounded-xl border p-4 ${
              t.hasTreaty
                ? "bg-white border-slate-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              {/* Country name + treaty status */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.flag}</span>
                <div>
                  <h2 className="font-bold text-slate-900">{t.country}</h2>
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${
                      t.hasTreaty
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.treatyType}
                  </span>
                </div>
              </div>

              {/* WHT rates */}
              {t.hasTreaty && (
                <div className="flex gap-4 sm:gap-6 text-center">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Dividends</p>
                    <p className="text-xl font-bold text-[#35cdc4]">
                      {t.dividendsWHT !== null ? `${t.dividendsWHT}%` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Interest</p>
                    <p className="text-xl font-bold text-[#35cdc4]">
                      {t.interestWHT !== null ? `${t.interestWHT}%` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Royalties</p>
                    <p className="text-xl font-bold text-[#35cdc4]">
                      {t.royaltiesWHT !== null ? `${t.royaltiesWHT}%` : "—"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            {t.notes && (
              <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {t.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <aside className="mt-10 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          For general reference only. Tax treaty application depends on your specific situation,
          the type of income, holding structure, and residency status. Treaty rates shown are
          the treaty-reduced rates — domestic rates may apply if conditions are not met.
          Always verify with a qualified Cyprus tax accountant before making decisions.
        </p>
      </aside>

      {/* Back link */}
      <p className="mt-8 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
