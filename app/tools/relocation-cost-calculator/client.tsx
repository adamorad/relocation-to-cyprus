"use client";

import { type ReactNode, useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";
import { LICENCE_FEE } from "@/lib/facts/health-transport";
import {
	ALIENS_REGISTER_FEE,
	DNV_PERMIT_FEE,
	eur,
	MEU1_FEE,
	transferFees,
} from "@/lib/facts/tax";

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
	newBuild: boolean;
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
		newBuild,
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

	// Cyprus arrival: rent vs buy
	if (buying) {
		const solicitorsLow = Math.round(propertyPrice * 0.015);
		items.push({
			category: "Property Purchase",
			label: "Solicitor / notary fees (~1.5% of price)",
			low: solicitorsLow,
			high: Math.round(solicitorsLow * 1.2),
		});
		// Land Registry transfer fees after the 50% reduction; none are due
		// when the purchase itself is subject to VAT (lib/facts/tax.ts)
		const fees = newBuild ? 0 : Math.round(transferFees(propertyPrice).reduced);
		items.push({
			category: "Property Purchase",
			label: newBuild
				? "Transfer fees (none: purchase subject to VAT)"
				: "Land Registry transfer fees (after the 50% reduction)",
			low: fees,
			high: fees,
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
	// Low: MEU1 for EU citizens. High: a non-EU permit such as the Digital
	// Nomad permit plus first registration in the Aliens' Register.
	items.push({
		category: "Legal & Admin",
		label: `Residence registration, per adult (${eur(MEU1_FEE)} MEU1 to ${eur(DNV_PERMIT_FEE + ALIENS_REGISTER_FEE)} non-EU permit)`,
		low: MEU1_FEE * adults,
		high: (DNV_PERMIT_FEE + ALIENS_REGISTER_FEE) * adults,
	});
	items.push({
		category: "Legal & Admin",
		label: `Driving licence exchange (${eur(LICENCE_FEE)} per licence)`,
		low: LICENCE_FEE,
		high: LICENCE_FEE * adults,
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

const FIELD =
	"min-h-11 w-full rounded-xl border border-line bg-white px-3 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus";

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
	const id = useId();
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className="text-sm font-semibold text-ink">
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value as T)}
				className={FIELD}
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
	const id = useId();
	return (
		<fieldset className="flex min-w-0 items-center justify-between gap-2 border-0 p-0">
			<legend className="sr-only">{label}</legend>
			<span
				id={id}
				aria-hidden="true"
				className="flex-1 text-sm font-semibold text-ink"
			>
				{label}
			</span>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onChange(Math.max(min, value - 1))}
					className="h-11 w-11 rounded-xl border border-line bg-white text-lg font-bold leading-none text-ink transition-colors hover:border-primary hover:bg-sky"
					aria-label={`Decrease ${label}`}
				>
					−
				</button>
				<span className="w-6 text-center text-sm font-bold text-ink">
					{value}
				</span>
				<button
					type="button"
					onClick={() => onChange(Math.min(max, value + 1))}
					className="h-11 w-11 rounded-xl border border-line bg-white text-lg font-bold leading-none text-ink transition-colors hover:border-primary hover:bg-sky"
					aria-label={`Increase ${label}`}
				>
					+
				</button>
			</div>
		</fieldset>
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
		<ChipGroup
			label={label}
			options={[
				{ value: "Yes", label: "Yes" },
				{ value: "No", label: "No" },
			]}
			value={value ? "Yes" : "No"}
			onChange={(v) => onChange(v === "Yes")}
		/>
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
	const id = useId();
	const catLow = items.reduce((s, i) => s + i.low, 0);
	const catHigh = items.reduce((s, i) => s + i.high, 0);
	const catMid = Math.round((catLow + catHigh) / 2);

	return (
		<div className="overflow-hidden rounded-xl border border-line bg-white">
			<h3 className="m-0">
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={open}
					aria-controls={id}
					className="flex min-h-11 w-full items-center justify-between gap-3 bg-sky px-4 py-3 text-left transition-colors hover:bg-sky-strong"
				>
					<span className="text-base font-bold text-ink">{category}</span>
					<span className="flex items-center gap-3">
						<span className="text-sm text-muted">
							{fmt(catLow)} to {fmt(catHigh)}
						</span>
						<svg
							aria-hidden="true"
							className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</span>
				</button>
			</h3>
			{open && (
				<div id={id}>
					<DataTable
						caption={`${category} costs`}
						hideCaption
						className="rounded-none border-0 border-t"
						columns={[
							{ header: "Item" },
							{ header: "Low", align: "right" },
							{ header: "Midpoint", align: "right" },
							{ header: "High", align: "right" },
						]}
						rows={items.map((item): ReactNode[] => [
							item.label,
							fmt(item.low),
							<span key="m" className="font-semibold text-primary-hover">
								{fmt(Math.round((item.low + item.high) / 2))}
							</span>,
							fmt(item.high),
						])}
						footer={["Subtotal", fmt(catLow), fmt(catMid), fmt(catHigh)]}
					/>
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
	{ value: "800-1500", label: "€800 to €1,500 / month" },
	{ value: "1500-2500", label: "€1,500 to €2,500 / month" },
	{ value: "2500+", label: "€2,500+ / month" },
];

const PET_OPTIONS: { value: string; label: string }[] = [
	{ value: "0", label: "No pets" },
	{ value: "1", label: "1 pet" },
	{ value: "2", label: "2+ pets" },
];

export default function RelocationCostCalculatorClient() {
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
	const [newBuild, setNewBuild] = useState(false);
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
				newBuild,
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
			newBuild,
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
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
			<ToolPanel
				title="Your situation"
				className="lg:sticky lg:top-24 lg:self-start"
			>
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

				<div className="flex flex-col gap-4 border-t border-line pt-4">
					<h3 className="text-sm font-bold text-ink">Cyprus setup</h3>

					<ToggleRow
						label="Buying (not renting)"
						value={buying}
						onChange={setBuying}
					/>

					{buying ? (
						<>
							<PropertyPriceField
								value={propertyPrice}
								onChange={setPropertyPrice}
							/>
							<ToggleRow
								label="New build from a developer (VAT charged)"
								value={newBuild}
								onChange={setNewBuild}
							/>
						</>
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
			</ToolPanel>

			<section aria-labelledby="cost-results" className="min-w-0 space-y-4">
				<h2
					id="cost-results"
					className="text-2xl font-bold tracking-tight text-ink"
				>
					Itemised costs
				</h2>
				<StatCard
					highlight
					label="Estimated total (incl. 10% contingency)"
					value={fmt(grandMid)}
					hint={`Range: ${fmt(grandLow)} to ${fmt(grandHigh)}`}
				/>

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

				<DataTable
					caption="Grand total"
					hideCaption
					columns={[
						{ header: "Total" },
						{ header: "Low", align: "right" },
						{ header: "Midpoint", align: "right" },
						{ header: "High", align: "right" },
					]}
					rows={[]}
					footer={[
						"Grand total (incl. contingency)",
						fmt(grandLow),
						fmt(grandMid),
						fmt(grandHigh),
					]}
				/>

				{buying && newBuild ? (
					<p className="text-sm text-muted print:text-slate-600">
						A new build bought from a developer carries VAT (19%, or 5% on a
						qualifying primary residence) instead of transfer fees. This
						estimate leaves out the price and its VAT.
					</p>
				) : null}

				<p className="text-sm text-muted print:text-slate-600">
					Transfer fees, residence registration and licence fees use official
					figures checked in October 2026. The other costs are indicative
					estimates from 2024 to 2025, not yet re-checked. Actual costs vary
					significantly.
				</p>

				<Button
					type="button"
					variant="secondary"
					className="print:hidden"
					onClick={() => window.print()}
				>
					Print / Save as PDF
				</Button>
			</section>
		</div>
	);
}

function PropertyPriceField({
	value,
	onChange,
}: {
	value: number;
	onChange: (v: number) => void;
}) {
	const id = useId();
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className="text-sm font-semibold text-ink">
				Property price (€)
			</label>
			<input
				id={id}
				type="number"
				min={50000}
				max={5000000}
				step={10000}
				value={value}
				onChange={(e) => onChange(Math.max(50000, Number(e.target.value)))}
				className={FIELD}
			/>
		</div>
	);
}
