"use client";

import { useState } from "react";
import FreelancerVsCompanyPage from "@/app/tools/freelancer-vs-company/client";
import LtdSetupCalculatorClient from "@/app/tools/ltd-setup-calculator/client";

type Tab = "takehome" | "setup";

export default function SoleTraderVsLtdClient() {
	const [tab, setTab] = useState<Tab>("takehome");

	return (
		<div>
			<div className="flex flex-wrap gap-2 mb-8">
				<button
					type="button"
					onClick={() => setTab("takehome")}
					className={`rounded-full px-4 py-1.5 min-h-11 text-sm font-semibold border transition-colors ${
						tab === "takehome"
							? "bg-primary text-white border-primary"
							: "bg-white text-ink border-line hover:bg-sky"
					}`}
				>
					Take-home comparison
				</button>
				<button
					type="button"
					onClick={() => setTab("setup")}
					className={`rounded-full px-4 py-1.5 min-h-11 text-sm font-semibold border transition-colors ${
						tab === "setup"
							? "bg-primary text-white border-primary"
							: "bg-white text-ink border-line hover:bg-sky"
					}`}
				>
					Ltd setup costs
				</button>
			</div>

			{tab === "takehome" ? (
				<FreelancerVsCompanyPage />
			) : (
				<LtdSetupCalculatorClient />
			)}
		</div>
	);
}
