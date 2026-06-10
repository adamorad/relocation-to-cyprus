"use client";

import { useState } from "react";
import Link from "next/link";

type City = "Limassol" | "Paphos" | "Larnaca" | "Ayia Napa";
type Household = "Solo" | "Couple" | "Family";
type Transport = "Own car" | "No car" | "Motorbike";
type Dining = "Home-cooked" | "Mix" | "Restaurants";
type Lifestyle = "Budget" | "Comfortable" | "Luxury";

// --- Cost data ---

const RENT: Record<City, Record<Lifestyle, number>> = {
  Limassol: { Budget: 750, Comfortable: 1300, Luxury: 2500 },
  Paphos: { Budget: 550, Comfortable: 900, Luxury: 1700 },
  Larnaca: { Budget: 500, Comfortable: 800, Luxury: 1500 },
  "Ayia Napa": { Budget: 600, Comfortable: 1000, Luxury: 2000 },
};

const GROCERIES_PER_PERSON: Record<Lifestyle, number> = {
  Budget: 180,
  Comfortable: 320,
  Luxury: 550,
};

// Dining-out multiplier per person, scaled by dining preference
const DINING_BASE_PER_PERSON: Record<Lifestyle, number> = {
  Budget: 120,
  Comfortable: 280,
  Luxury: 550,
};

const DINING_MULTIPLIER: Record<Dining, number> = {
  "Home-cooked": 0.3,
  Mix: 0.65,
  Restaurants: 1.0,
};

const TRANSPORT: Record<Transport, Record<Lifestyle, number>> = {
  "Own car": { Budget: 200, Comfortable: 350, Luxury: 600 },
  "No car": { Budget: 60, Comfortable: 100, Luxury: 180 },
  Motorbike: { Budget: 80, Comfortable: 130, Luxury: 220 },
};

const UTILITIES: Record<"Solo" | "Couple" | "Family", Record<Lifestyle, number>> = {
  Solo: { Budget: 90, Comfortable: 150, Luxury: 260 },
  Couple: { Budget: 90, Comfortable: 150, Luxury: 260 },
  Family: { Budget: 140, Comfortable: 220, Luxury: 400 },
};

const ENTERTAINMENT_PER_PERSON: Record<Lifestyle, number> = {
  Budget: 80,
  Comfortable: 180,
  Luxury: 380,
};

const HEALTHCARE_PER_PERSON: Record<Lifestyle, number> = {
  Budget: 40,
  Comfortable: 90,
  Luxury: 200,
};

const CITY_TIPS: Record<City, string> = {
  Limassol:
    "Cyprus's most cosmopolitan city — higher rents but the strongest expat infrastructure.",
  Paphos:
    "Best value on the coast. Slower pace, smaller expat scene, great for families.",
  Larnaca:
    "Most affordable city with an international airport. Up-and-coming.",
  "Ayia Napa":
    "Resort town — summer prices spike, off-season bargains available.",
};

function personCount(household: Household): number {
  if (household === "Solo") return 1;
  return 2; // Couple and Family both = 2 adults
}

function rentMultiplier(household: Household): number {
  if (household === "Family") return 1.2;
  return 1.0;
}

function formatEur(value: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

type PillGroupProps<T extends string> = {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labelMap?: Partial<Record<T, string>>;
};

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  labelMap,
}: PillGroupProps<T>) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              value === opt
                ? "bg-[#35cdc4] text-slate-900 border-[#35cdc4]"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#35cdc4] hover:text-slate-900"
            }`}
          >
            {labelMap?.[opt] ?? opt}
          </button>
        ))}
      </div>
    </div>
  );
}

type BudgetRow = { label: string; amount: number };

export default function BudgetBuilderClient() {
  const [city, setCity] = useState<City>("Limassol");
  const [household, setHousehold] = useState<Household>("Solo");
  const [transport, setTransport] = useState<Transport>("Own car");
  const [dining, setDining] = useState<Dining>("Mix");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("Comfortable");

  const persons = personCount(household);

  const rent = Math.round(RENT[city][lifestyle] * rentMultiplier(household));
  const groceries = Math.round(GROCERIES_PER_PERSON[lifestyle] * persons);
  const diningOut = Math.round(
    DINING_BASE_PER_PERSON[lifestyle] * DINING_MULTIPLIER[dining] * persons,
  );
  const transportCost = TRANSPORT[transport][lifestyle];
  const utilities = UTILITIES[household][lifestyle];
  const entertainment = Math.round(ENTERTAINMENT_PER_PERSON[lifestyle] * persons);
  const healthcare = Math.round(HEALTHCARE_PER_PERSON[lifestyle] * persons);

  const rows: BudgetRow[] = [
    { label: "Rent", amount: rent },
    { label: "Groceries", amount: groceries },
    { label: "Dining out", amount: diningOut },
    { label: "Transport", amount: transportCost },
    { label: "Utilities", amount: utilities },
    { label: "Entertainment", amount: entertainment },
    { label: "Healthcare", amount: healthcare },
  ];

  const total = rows.reduce((s, r) => s + r.amount, 0);

  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        ›{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        › <span className="text-slate-900">Monthly Budget Builder</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Interactive Tool
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Cyprus Monthly Budget Builder
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Estimate your monthly living costs in Cyprus. Adjust the options below
          and the budget updates instantly.
        </p>
      </header>

      {/* Inputs */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 space-y-5">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
          Your Situation
        </h2>

        <PillGroup
          label="City"
          options={["Limassol", "Paphos", "Larnaca", "Ayia Napa"] as City[]}
          value={city}
          onChange={setCity}
        />

        <PillGroup
          label="Household"
          options={["Solo", "Couple", "Family"] as Household[]}
          value={household}
          onChange={setHousehold}
          labelMap={{ Family: "Family with kids" }}
        />

        <PillGroup
          label="Transport"
          options={["Own car", "No car", "Motorbike"] as Transport[]}
          value={transport}
          onChange={setTransport}
          labelMap={{ "No car": "No car / taxis" }}
        />

        <PillGroup
          label="Dining"
          options={["Home-cooked", "Mix", "Restaurants"] as Dining[]}
          value={dining}
          onChange={setDining}
          labelMap={{
            "Home-cooked": "Mostly home-cooked",
            Restaurants: "Mostly restaurants",
          }}
        />

        <PillGroup
          label="Lifestyle tier"
          options={["Budget", "Comfortable", "Luxury"] as Lifestyle[]}
          value={lifestyle}
          onChange={setLifestyle}
        />
      </div>

      {/* City tip */}
      <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
        <span className="font-semibold">{city}: </span>
        {CITY_TIPS[city]}
      </div>

      {/* Budget table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Monthly Budget Breakdown
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-2 font-medium text-slate-500 text-xs">
                Category
              </th>
              <th className="text-right px-5 py-2 font-medium text-slate-500 text-xs">
                Est. / month
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td className="px-5 py-3 text-slate-700">{row.label}</td>
                <td className="px-5 py-3 text-right font-medium text-slate-800">
                  {formatEur(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#35cdc4]/10 border-t-2 border-[#35cdc4]">
              <td className="px-5 py-4 font-bold text-slate-900 text-base">
                Total
              </td>
              <td className="px-5 py-4 text-right font-bold text-slate-900 text-base">
                {formatEur(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Next steps */}
      <aside className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Next steps
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/rent-vs-buy-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Rent vs Buy Calculator →
          </Link>
          <Link
            href="/guides/cost-of-living/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Cost of Living Guide →
          </Link>
        </div>
      </aside>

      <aside className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          Figures are indicative estimates based on typical costs as of 2025.
          Actual costs vary by neighbourhood, landlord, season, and personal
          habits. This tool is for planning purposes only and is not financial
          advice. Always verify current market rates locally.
        </p>
      </aside>

      <p className="mt-2 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          ← Back to Tools
        </Link>
      </p>
    </main>
  );
}
