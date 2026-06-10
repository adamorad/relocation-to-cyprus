"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// ── types ────────────────────────────────────────────────────────────────────

type OriginRegion =
  | "Europe"
  | "Middle East"
  | "North America"
  | "Asia/Oceania"
  | "Africa/South America";

type ShippingVolume = "None" | "Small" | "Medium" | "Large";
type RentBudget = "Under 800" | "800-1500" | "1500-2500" | "2500+";
type PetCount = 0 | 1 | 2;

interface CostRange {
  low: number;
  high: number;
}

interface CostItem {
  category: string;
  label: string;
  low: number;
  high: number;
}

// ── cost data ─────────────────────────────────────────────────────────────────

const FLIGHT_COSTS: Record<OriginRegion, CostRange> = {
  Europe: { low: 150, high: 400 },
  "Middle East": { low: 200, high: 500 },
  "North America": { low: 600, high: 1200 },
  "Asia/Oceania": { low: 800, high: 1500 },
  "Africa/South America": { low: 400, high: 900 },
};

const CONTAINER_20FT: Record<OriginRegion, CostRange> = {
  Europe: { low: 1500, high: 3500 },
  "Middle East": { low: 2000, high: 4000 },
  "North America": { low: 3500, high: 6000 },
  "Asia/Oceania": { low: 4000, high: 7000 },
  "Africa/South America": { low: 2500, high: 5000 },
};

const CAR_SHIPPING: Record<OriginRegion, CostRange> = {
  Europe: { low: 800, high: 1500 },
  "Middle East": { low: 1200, high: 2000 },
  "North America": { low: 2500, high: 4500 },
  "Asia/Oceania": { low: 3000, high: 5500 },
  "Africa/South America": { low: 1800, high: 3500 },
};

const RENT_MIDPOINTS: Record<RentBudget, number> = {
  "Under 800": 700,
  "800-1500": 1150,
  "1500-2500": 2000,
  "2500+": 3200,
};

const FURNITURE_COSTS: Record<RentBudget, CostRange> = {
  "Under 800": { low: 1000, high: 2000 },
  "800-1500": { low: 2500, high: 5500 },
  "1500-2500": { low: 6000, high: 12000 },
  "2500+": { low: 12000, high: 24000 },
};

// ── helpers ────────────────────────────────────────────────────────────────────

function mid(r: CostRange): number {
  return Math.round((r.low + r.high) / 2);
}

function fmt(n: number): string {
  return "€" + Math.round(n).toLocaleString("en-IE");
}

function addContingency(items: CostItem[]): {
  withContingency: CostItem[];
  contingencyItem: CostItem;
} {
  const totalLow = items.reduce((s, i) => s + i.low, 0);
  const totalHigh = items.reduce((s, i) => s + i.high, 0);
  const contingencyItem: CostItem = {
    category: "Contingency",
    label: "10% contingency buffer",
    low: Math.round(totalLow * 0.1),
    high: Math.round(totalHigh * 0.1),
  };
  return { withContingency: [...items, contingencyItem], contingencyItem };
}

// ── calculation ────────────────────────────────────────────────────────────────

function calcCosts(inputs: {
  origin: OriginRegion;
  adults: number;
  children: number;
  shipping: ShippingVolume;
  bringCar: boolean;
  pets: string;
  rentBudget: RentBudget;
  useAgent: boolean;
  buying: boolean;
  propertyPrice: number;
}): CostItem[] {
  const {
    origin,
    adults,
    children,
    shipping,
    bringCar,
    pets: petsStr,
    rentBudget,
    useAgent,
    buying,
    propertyPrice,
  } = inputs;
  const pets = Number(petsStr) as PetCount;

  const items: CostItem[] = [];
  const totalPeople = adults + children;

  // Travel
  const flight = FLIGHT_COSTS[origin];
  items.push({
    category: "Travel",
    label: `Flights (${totalPeople} person${totalPeople > 1 ? "s" : ""})`,
    low: flight.low * totalPeople,
    high: flight.high * totalPeople,
  });

  // Shipping
  if (shipping === "Small") {
    items.push({
      category: "Shipping & Moving",
      label: "Excess baggage / small shipment",
      low: 300,
      high: 900,
    });
  } else if (shipping === "Medium") {
    const c = CONTAINER_20FT[origin];
    items.push({
      category: "Shipping & Moving",
      label: "20ft container (~25 m³)",
      low: c.low,
      high: c.high,
    });
  } else if (shipping === "Large") {
    const c = CONTAINER_20FT[origin];
    items.push({
      category: "Shipping & Moving",
      label: "40ft container (~55 m³)",
      low: Math.round(c.low * 1.7),
      high: Math.round(c.high * 1.7),
    });
  }

  // Packing / local transport (always if shipping goods)
  if (shipping !== "None") {
    items.push({
      category: "Shipping & Moving",
      label: "Packing materials & local transport",
      low: 200,
      high: 600,
    });
  }

  // Car
  if (bringCar) {
    const car = CAR_SHIPPING[origin];
    items.push({
      category: "Vehicle",
      label: "Car shipping",
      low: car.low,
      high: car.high,
    });
    items.push({
      category: "Vehicle",
      label: "Re-registration / import duty",
      low: 200,
      high: 1500,
    });
  }

  // Pets
  if (pets > 0) {
    items.push({
      category: "Pets",
      label: `Pet import costs (${pets} pet${pets > 1 ? "s" : ""})`,
      low: 300 * pets,
      high: 600 * pets,
    });
  }

  // Cyprus arrival — rent vs buy
  if (buying) {
    const solicitorsLow = Math.round(propertyPrice * 0.015);
    items.push({
      category: "Property Purchase",
      label: "Solicitor / notary fees (~1.5% of price)",
      low: solicitorsLow,
      high: Math.round(solicitorsLow * 1.2),
    });
    items.push({
      category: "Property Purchase",
      label: "Stamp duty & transfer fees",
      low: 500,
      high: 2000,
    });
  } else {
    const rentMid = RENT_MIDPOINTS[rentBudget];
    const depositLow = rentMid * 1.8;
    const depositHigh = rentMid * 2.2;
    items.push({
      category: "Rental Setup",
      label: "Security deposit (≈2x monthly rent)",
      low: Math.round(depositLow),
      high: Math.round(depositHigh),
    });
    items.push({
      category: "Rental Setup",
      label: "First month rent",
      low: Math.round(rentMid * 0.85),
      high: Math.round(rentMid * 1.15),
    });
    items.push({
      category: "Rental Setup",
      label: "Agency fee (≈1x monthly rent)",
      low: Math.round(rentMid * 0.8),
      high: Math.round(rentMid * 1.2),
    });
  }

  // Utility connections
  items.push({
    category: buying ? "Property Purchase" : "Rental Setup",
    label: "Utility connection deposits",
    low: 200,
    high: 500,
  });

  // Furniture (only if no container or supplementing)
  if (shipping === "None" || shipping === "Small") {
    const furn = FURNITURE_COSTS[rentBudget];
    items.push({
      category: "Furnishing",
      label: "Furniture & household items",
      low: furn.low,
      high: furn.high,
    });
    items.push({
      category: "Furnishing",
      label: "Appliances (if needed)",
      low: 500,
      high: 1500,
    });
  }

  // Legal / admin
  items.push({
    category: "Legal & Admin",
    label: "MEU1 / ARC / TIN registration (govt. fees)",
    low: 70,
    high: 150,
  });
  items.push({
    category: "Legal & Admin",
    label: "Driving licence exchange",
    low: 30,
    high: 80,
  });

  if (useAgent) {
    items.push({
      category: "Legal & Admin",
      label: "Professional relocation agent",
      low: 1500,
      high: 3000,
    });
  }

  return items;
}

// ── select component ───────────────────────────────────────────────────────────

function SelectRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StepperRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:border-[#35cdc4] transition-colors text-lg leading-none"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-6 text-center font-bold text-slate-900 text-sm">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:border-[#35cdc4] transition-colors text-lg leading-none"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex-1">
        {label}
      </label>
      <div className="flex gap-1">
        {(["Yes", "No"] as const).map((opt) => {
          const active = opt === "Yes" ? value : !value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt === "Yes")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#35cdc4] text-slate-900"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-[#35cdc4]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── cost table ─────────────────────────────────────────────────────────────────

function CostSection({
  category,
  items,
  open,
  onToggle,
}: {
  category: string;
  items: CostItem[];
  open: boolean;
  onToggle: () => void;
}) {
  const catLow = items.reduce((s, i) => s + i.low, 0);
  const catHigh = items.reduce((s, i) => s + i.high, 0);
  const catMid = Math.round((catLow + catHigh) / 2);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="text-sm font-bold text-slate-800">{category}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            {fmt(catLow)} – {fmt(catHigh)}
          </span>
          <span
            className="text-slate-400 text-sm"
            aria-hidden="true"
          >
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white border-t border-slate-100 text-slate-400 uppercase tracking-wide">
                <th className="px-4 py-2 text-left font-semibold">Item</th>
                <th className="px-4 py-2 text-right font-semibold">Low</th>
                <th className="px-4 py-2 text-right font-semibold">
                  Midpoint
                </th>
                <th className="px-4 py-2 text-right font-semibold">High</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.label}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-2 text-slate-700">{item.label}</td>
                  <td className="px-4 py-2 text-right text-slate-600">
                    {fmt(item.low)}
                  </td>
                  <td
                    className="px-4 py-2 text-right font-semibold"
                    style={{ color: "#35cdc4" }}
                  >
                    {fmt(Math.round((item.low + item.high) / 2))}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-600">
                    {fmt(item.high)}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-4 py-2 font-semibold text-slate-700">
                  Subtotal
                </td>
                <td className="px-4 py-2 text-right font-semibold text-slate-700">
                  {fmt(catLow)}
                </td>
                <td
                  className="px-4 py-2 text-right font-semibold"
                  style={{ color: "#35cdc4" }}
                >
                  {fmt(catMid)}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-slate-700">
                  {fmt(catHigh)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const ORIGIN_OPTIONS: { value: OriginRegion; label: string }[] = [
  { value: "Europe", label: "Europe" },
  { value: "Middle East", label: "Middle East" },
  { value: "North America", label: "North America" },
  { value: "Asia/Oceania", label: "Asia / Oceania" },
  { value: "Africa/South America", label: "Africa / South America" },
];

const SHIPPING_OPTIONS: { value: ShippingVolume; label: string }[] = [
  { value: "None", label: "None (suitcases only)" },
  { value: "Small", label: "Small (few boxes / excess baggage)" },
  { value: "Medium", label: "Medium (20ft container ~25 m³)" },
  { value: "Large", label: "Large (40ft container ~55 m³)" },
];

const RENT_BUDGET_OPTIONS: { value: RentBudget; label: string }[] = [
  { value: "Under 800", label: "Under €800 / month" },
  { value: "800-1500", label: "€800 – €1,500 / month" },
  { value: "1500-2500", label: "€1,500 – €2,500 / month" },
  { value: "2500+", label: "€2,500+ / month" },
];

const PET_OPTIONS: { value: string; label: string }[] = [
  { value: "0", label: "No pets" },
  { value: "1", label: "1 pet" },
  { value: "2", label: "2+ pets" },
];

export default function RelocationCostEstimatorClient() {
  // inputs
  const [origin, setOrigin] = useState<OriginRegion>("Europe");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [shipping, setShipping] = useState<ShippingVolume>("None");
  const [bringCar, setBringCar] = useState(false);
  const [pets, setPets] = useState<string>("0");
  const [rentBudget, setRentBudget] = useState<RentBudget>("800-1500");
  const [useAgent, setUseAgent] = useState(false);
  const [buying, setBuying] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState(250000);

  // UI
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (cat: string) =>
    setOpenSections((prev) => ({ ...prev, [cat]: !prev[cat] }));

  // compute
  const rawItems = useMemo(
    () =>
      calcCosts({
        origin,
        adults,
        children,
        shipping,
        bringCar,
        pets,
        rentBudget,
        useAgent,
        buying,
        propertyPrice,
      }),
    [
      origin,
      adults,
      children,
      shipping,
      bringCar,
      pets,
      rentBudget,
      useAgent,
      buying,
      propertyPrice,
    ],
  );

  const { withContingency } = useMemo(
    () => addContingency(rawItems),
    [rawItems],
  );

  const categories = useMemo(() => {
    const map = new Map<string, CostItem[]>();
    for (const item of withContingency) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return map;
  }, [withContingency]);

  const grandLow = useMemo(
    () => withContingency.reduce((s, i) => s + i.low, 0),
    [withContingency],
  );
  const grandHigh = useMemo(
    () => withContingency.reduce((s, i) => s + i.high, 0),
    [withContingency],
  );
  const grandMid = Math.round((grandLow + grandHigh) / 2);

  return (
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      {/* breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">Relocation Cost Estimator</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Finance
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Relocation Cost Estimator
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Estimate your total one-time moving costs to Cyprus — from flights and
          shipping to deposits, furniture, and legal fees. Adjust the inputs and
          see a full itemised breakdown instantly.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        {/* ── inputs panel ── */}
        <aside>
          <section className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-5 sticky top-6">
            <h2 className="text-sm font-bold text-slate-800">Your situation</h2>

            <SelectRow
              label="Origin region"
              value={origin}
              options={ORIGIN_OPTIONS}
              onChange={setOrigin}
            />

            <StepperRow
              label="Adults"
              value={adults}
              min={1}
              max={5}
              onChange={setAdults}
            />

            <StepperRow
              label="Children"
              value={children}
              min={0}
              max={5}
              onChange={setChildren}
            />

            <SelectRow
              label="Shipping volume"
              value={shipping}
              options={SHIPPING_OPTIONS}
              onChange={setShipping}
            />

            <ToggleRow
              label="Bringing a car"
              value={bringCar}
              onChange={setBringCar}
            />

            <SelectRow
              label="Pets"
              value={pets}
              options={PET_OPTIONS}
              onChange={(v) => setPets(v)}
            />

            <div className="border-t border-slate-200 pt-4 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Cyprus setup
              </h3>

              <ToggleRow
                label="Buying (not renting)"
                value={buying}
                onChange={setBuying}
              />

              {buying ? (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Property price (€)
                  </label>
                  <input
                    type="number"
                    min={50000}
                    max={5000000}
                    step={10000}
                    value={propertyPrice}
                    onChange={(e) =>
                      setPropertyPrice(Math.max(50000, Number(e.target.value)))
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
                  />
                </div>
              ) : (
                <SelectRow
                  label="Monthly rent budget"
                  value={rentBudget}
                  options={RENT_BUDGET_OPTIONS}
                  onChange={setRentBudget}
                />
              )}

              <ToggleRow
                label="Using relocation agent"
                value={useAgent}
                onChange={setUseAgent}
              />
            </div>
          </section>
        </aside>

        {/* ── results panel ── */}
        <section>
          {/* grand total highlight */}
          <div className="mb-6 p-5 rounded-xl border-2 border-[#35cdc4] bg-teal-50">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
              Estimated total (incl. 10% contingency)
            </p>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-1">
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#35cdc4" }}
              >
                {fmt(grandMid)}
              </span>
              <span className="text-sm text-slate-500 pb-1">
                Range: {fmt(grandLow)} – {fmt(grandHigh)}
              </span>
            </div>
          </div>

          {/* collapsible cost sections */}
          <div className="flex flex-col gap-3">
            {Array.from(categories.entries()).map(([cat, items]) => (
              <CostSection
                key={cat}
                category={cat}
                items={items}
                open={openSections[cat] ?? true}
                onToggle={() => toggleSection(cat)}
              />
            ))}
          </div>

          {/* grand total table row */}
          <div className="mt-4 border-2 border-slate-300 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-slate-800 text-white">
                    <td className="px-4 py-3 font-bold">
                      Grand Total (incl. contingency)
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      {fmt(grandLow)}
                    </td>
                    <td
                      className="px-4 py-3 text-right font-bold text-lg"
                      style={{ color: "#35cdc4" }}
                    >
                      {fmt(grandMid)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      {fmt(grandHigh)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* print note */}
          <p className="mt-3 text-[10px] text-slate-400 italic print:text-slate-600">
            Costs shown are indicative estimates based on typical 2024–2025
            market rates. Actual costs vary significantly.
          </p>

          {/* print button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-4 px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-[#35cdc4] transition-colors print:hidden"
          >
            Print / Save as PDF
          </button>
        </section>
      </div>

      {/* next steps */}
      <aside className="mt-10 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Related tools
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/budget-builder/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Monthly Budget Builder →
          </Link>
          <Link
            href="/tools/rent-vs-buy-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Rent vs Buy Calculator →
          </Link>
          <Link
            href="/tools/mortgage-calculator/"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Mortgage Calculator →
          </Link>
        </div>
      </aside>

      {/* disclaimer */}
      <aside className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          General information only — not legal, tax, or financial advice. Cost
          ranges are indicative and based on publicly available market data for
          2024–2025. Always obtain multiple quotes and consult qualified
          professionals before making financial decisions.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          &larr; Back to Tools
        </Link>
      </p>
    </main>
  );
}
