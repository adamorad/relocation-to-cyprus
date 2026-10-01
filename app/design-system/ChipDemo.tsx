"use client";

import { useState } from "react";
import { Chip, ChipGroup } from "@/components/ui/Chip";

export function ChipDemo() {
	const [city, setCity] = useState("all");
	return (
		<div className="space-y-4">
			<ChipGroup
				label="City (ChipGroup)"
				value={city}
				onChange={setCity}
				options={[
					{ value: "all", label: "All cities", count: 24 },
					{ value: "limassol", label: "Limassol", count: 9 },
					{ value: "paphos", label: "Paphos", count: 7 },
					{ value: "larnaca", label: "Larnaca", count: 5 },
					{ value: "ayia-napa", label: "Ayia Napa", count: 3 },
				]}
			/>
			<div className="flex flex-wrap gap-2">
				<Chip selected>Selected chip</Chip>
				<Chip>Unselected chip</Chip>
			</div>
		</div>
	);
}

export function ToolDemo() {
	const [tier, setTier] = useState("comfortable");
	return (
		<ChipGroup
			label="Lifestyle tier"
			value={tier}
			onChange={setTier}
			options={[
				{ value: "budget", label: "Budget" },
				{ value: "comfortable", label: "Comfortable" },
				{ value: "luxury", label: "Luxury" },
			]}
		/>
	);
}
