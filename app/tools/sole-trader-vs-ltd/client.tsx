"use client";

import { useState } from "react";
import FreelancerVsCompanyPage from "@/app/tools/freelancer-vs-company/client";
import LtdSetupCalculatorClient from "@/app/tools/ltd-setup-calculator/client";
import { ChipGroup } from "@/components/ui/Chip";

type Tab = "takehome" | "setup";

export default function SoleTraderVsLtdClient() {
	const [tab, setTab] = useState<Tab>("takehome");

	return (
		<div className="flex flex-col gap-6">
			<ChipGroup
				label="Choose a tool"
				options={[
					{ value: "takehome" as Tab, label: "Take-home comparison" },
					{ value: "setup" as Tab, label: "Ltd setup costs" },
				]}
				value={tab}
				onChange={setTab}
			/>

			{tab === "takehome" ? (
				<FreelancerVsCompanyPage />
			) : (
				<LtdSetupCalculatorClient />
			)}
		</div>
	);
}
