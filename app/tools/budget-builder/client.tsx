"use client";

import { useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";

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

const UTILITIES: Record<
	"Solo" | "Couple" | "Family",
	Record<Lifestyle, number>
> = {
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
		"Cyprus's most cosmopolitan city, with higher rents but the strongest expat infrastructure.",
	Paphos:
		"Best value on the coast. Slower pace, smaller expat scene, great for families.",
	Larnaca: "Most affordable city with an international airport. Up-and-coming.",
	"Ayia Napa":
		"Resort town: summer prices spike, off-season bargains available.",
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
	const entertainment = Math.round(
		ENTERTAINMENT_PER_PERSON[lifestyle] * persons,
	);
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
		<>
			<ToolPanel title="Your situation">
				<ChipGroup
					label="City"
					options={opts([
						"Limassol",
						"Paphos",
						"Larnaca",
						"Ayia Napa",
					] as City[])}
					value={city}
					onChange={setCity}
				/>
				<ChipGroup
					label="Household"
					options={opts(["Solo", "Couple", "Family"] as Household[], {
						Family: "Family with kids",
					})}
					value={household}
					onChange={setHousehold}
				/>
				<ChipGroup
					label="Transport"
					options={opts(["Own car", "No car", "Motorbike"] as Transport[], {
						"No car": "No car / taxis",
					})}
					value={transport}
					onChange={setTransport}
				/>
				<ChipGroup
					label="Dining"
					options={opts(["Home-cooked", "Mix", "Restaurants"] as Dining[], {
						"Home-cooked": "Mostly home-cooked",
						Restaurants: "Mostly restaurants",
					})}
					value={dining}
					onChange={setDining}
				/>
				<ChipGroup
					label="Lifestyle tier"
					options={opts(["Budget", "Comfortable", "Luxury"] as Lifestyle[])}
					value={lifestyle}
					onChange={setLifestyle}
				/>
			</ToolPanel>

			<Callout tone="info" title={city}>
				{CITY_TIPS[city]}
			</Callout>

			<section aria-labelledby="budget-results" className="space-y-4">
				<h2
					id="budget-results"
					className="text-2xl font-bold tracking-tight text-ink"
				>
					Monthly budget breakdown
				</h2>
				<StatCard
					highlight
					label="Estimated monthly total"
					value={formatEur(total)}
					hint={`${city} · ${household === "Family" ? "Family with kids" : household} · ${lifestyle}`}
				/>
				<DataTable
					caption="Estimated monthly costs by category"
					hideCaption
					columns={[
						{ header: "Category" },
						{ header: "Est. / month", align: "right" },
					]}
					rows={rows.map((row) => [row.label, formatEur(row.amount)])}
					footer={["Total", formatEur(total)]}
					zebra
				/>
			</section>
		</>
	);
}

function opts<T extends string>(
	values: T[],
	labels: Partial<Record<T, string>> = {},
): ChipOption<T>[] {
	return values.map((v) => ({ value: v, label: labels[v] ?? v }));
}
