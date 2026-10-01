"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";

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
	{
		country: "United Kingdom",
		flag: "🇬🇧",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Comprehensive treaty. UK-sourced dividends generally 0% WHT when received by Cyprus company.",
	},
	{
		country: "Germany",
		flag: "🇩🇪",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"5% WHT on dividends applies when holding ≥25% capital; 15% otherwise.",
	},
	{
		country: "France",
		flag: "🇫🇷",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "10% WHT on dividends; nil on interest and royalties.",
	},
	{
		country: "Italy",
		flag: "🇮🇹",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "Highly favourable. 0% on all three withholding categories.",
	},
	{
		country: "Spain",
		flag: "🇪🇸",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% WHT on dividends (≥10% holding), interest and royalties.",
	},
	{
		country: "Netherlands",
		flag: "🇳🇱",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Very favourable terms. Both the Netherlands and Cyprus have favourable holding company regimes.",
	},
	{
		country: "Belgium",
		flag: "🇧🇪",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "10% WHT on dividends; 0% on interest and royalties.",
	},
	{
		country: "Poland",
		flag: "🇵🇱",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "0% on dividends (≥10% holding for 24 months); 5% WHT on royalties.",
	},
	{
		country: "Czech Republic",
		flag: "🇨🇿",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "Very favourable. 0% on dividends, interest and royalties.",
	},
	{
		country: "Hungary",
		flag: "🇭🇺",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% across all WHT categories.",
	},
	{
		country: "Romania",
		flag: "🇷🇴",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 10,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "10% on dividends and interest; 5% on royalties.",
	},
	{
		country: "Bulgaria",
		flag: "🇧🇬",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 7,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "5% on dividends; 7% on interest; 10% on royalties.",
	},
	{
		country: "Greece",
		flag: "🇬🇷",
		hasTreaty: true,
		dividendsWHT: 25,
		interestWHT: 10,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Higher WHT on dividends (25%). Royalties exempt. Cyprus-Greece treaty updated 2013.",
	},
	{
		country: "Austria",
		flag: "🇦🇹",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "10% on dividends; 0% on interest and royalties.",
	},
	{
		country: "Sweden",
		flag: "🇸🇪",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"5% on dividends (≥25% participation); 0% on interest and royalties.",
	},
	{
		country: "Denmark",
		flag: "🇩🇰",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% across all WHT categories.",
	},
	{
		country: "Norway",
		flag: "🇳🇴",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% across all WHT categories.",
	},
	{
		country: "Finland",
		flag: "🇫🇮",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "5% on dividends (≥25% holding); 0% on interest and royalties.",
	},
	{
		country: "Portugal",
		flag: "🇵🇹",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 10,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "10% WHT applies to all three categories.",
	},
	{
		country: "Ireland",
		flag: "🇮🇪",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% on dividends, interest and royalties.",
	},
	{
		country: "Luxembourg",
		flag: "🇱🇺",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% across all WHT categories.",
	},
	{
		country: "Malta",
		flag: "🇲🇹",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 10% on royalties.",
	},
	{
		country: "Switzerland",
		flag: "🇨🇭",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "Very favourable. 0% on all three categories.",
	},
	// Eastern Europe / CIS
	{
		country: "Russia",
		flag: "🇷🇺",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Treaty suspended by Russia in August 2023. Verify current status with accountant before relying on it.",
	},
	{
		country: "Ukraine",
		flag: "🇺🇦",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 2,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "5% on dividends (≥25% holding); 2% on interest; 5% on royalties.",
	},
	{
		country: "Belarus",
		flag: "🇧🇾",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 5,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "5% on all three categories. Verify applicability given sanctions.",
	},
	{
		country: "Kazakhstan",
		flag: "🇰🇿",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 10,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes:
			"5% on dividends (≥10% holding for 12 months); 10% on interest and royalties.",
	},
	{
		country: "Armenia",
		flag: "🇦🇲",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "Very favourable. 0% on dividends and interest; 5% on royalties.",
	},
	{
		country: "Georgia",
		flag: "🇬🇪",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% across all WHT categories.",
	},
	{
		country: "Azerbaijan",
		flag: "🇦🇿",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 5% on royalties.",
	},
	{
		country: "Moldova",
		flag: "🇲🇩",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 5,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "5% on dividends, interest and royalties.",
	},
	{
		country: "Serbia",
		flag: "🇷🇸",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 10,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "10% on all three categories.",
	},
	// Middle East
	{
		country: "Israel",
		flag: "🇮🇱",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Excellent treaty. 0% on all three categories. Popular structure for Israeli tech entrepreneurs.",
	},
	{
		country: "UAE",
		flag: "🇦🇪",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Signed 2015; in force. Very favourable, 0% on all three categories.",
	},
	{
		country: "Qatar",
		flag: "🇶🇦",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 5% on royalties.",
	},
	{
		country: "Saudi Arabia",
		flag: "🇸🇦",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 8,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 8% on royalties.",
	},
	{
		country: "Jordan",
		flag: "🇯🇴",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% across all WHT categories.",
	},
	{
		country: "Egypt",
		flag: "🇪🇬",
		hasTreaty: true,
		dividendsWHT: 15,
		interestWHT: 15,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "Higher WHT rates. 15% on dividends and interest; 10% on royalties.",
	},
	{
		country: "Lebanon",
		flag: "🇱🇧",
		hasTreaty: true,
		dividendsWHT: 5,
		interestWHT: 5,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "5% on dividends and interest; 0% on royalties.",
	},
	{
		country: "Kuwait",
		flag: "🇰🇼",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 5% on royalties.",
	},
	{
		country: "Bahrain",
		flag: "🇧🇭",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "0% on all three categories.",
	},
	{
		country: "Oman",
		flag: "🇴🇲",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 8,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 8% on royalties.",
	},
	// Asia
	{
		country: "India",
		flag: "🇮🇳",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 10,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes:
			"10% on all three categories. Important treaty for Indian tech sector and diaspora.",
	},
	{
		country: "China",
		flag: "🇨🇳",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 10,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "10% on all three categories.",
	},
	{
		country: "Singapore",
		flag: "🇸🇬",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 10% on royalties.",
	},
	{
		country: "Hong Kong",
		flag: "🇭🇰",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes: "Very favourable, 0% on all three categories.",
	},
	{
		country: "Thailand",
		flag: "🇹🇭",
		hasTreaty: true,
		dividendsWHT: 10,
		interestWHT: 10,
		royaltiesWHT: 5,
		treatyType: "Full DTC",
		notes: "10% on dividends and interest; 5% on royalties.",
	},
	{
		country: "Malaysia",
		flag: "🇲🇾",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 10,
		treatyType: "Full DTC",
		notes: "0% on dividends and interest; 10% on royalties.",
	},
	// Africa
	{
		country: "South Africa",
		flag: "🇿🇦",
		hasTreaty: true,
		dividendsWHT: 0,
		interestWHT: 0,
		royaltiesWHT: 0,
		treatyType: "Full DTC",
		notes:
			"Very favourable, 0% on all three categories. Used by SA entrepreneurs expanding to EU.",
	},
	// Americas / Oceania, no treaty (important)
	{
		country: "USA",
		flag: "🇺🇸",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes:
			"NO DOUBLE TAX TREATY between Cyprus and the USA. US persons and US-connected income require specialist US-Cyprus tax advice. Check with a Cyprus accountant and US CPA.",
	},
	{
		country: "Canada",
		flag: "🇨🇦",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes:
			"NO DOUBLE TAX TREATY between Cyprus and Canada. Each country taxes independently. Verify with a qualified accountant before structuring.",
	},
	{
		country: "Australia",
		flag: "🇦🇺",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes:
			"NO DOUBLE TAX TREATY between Cyprus and Australia. Australian-source income may face withholding in Australia and potential Cyprus tax. Get specialist advice.",
	},
	{
		country: "New Zealand",
		flag: "🇳🇿",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes:
			"No treaty exists. Verify tax treatment with a qualified accountant.",
	},
	{
		country: "Brazil",
		flag: "🇧🇷",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes:
			"No double tax treaty. Brazil's complex IRRF withholding rules apply independently.",
	},
	{
		country: "Japan",
		flag: "🇯🇵",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes:
			"No double tax treaty between Cyprus and Japan. Japanese domestic withholding rates apply.",
	},
	{
		country: "South Korea",
		flag: "🇰🇷",
		hasTreaty: false,
		dividendsWHT: null,
		interestWHT: null,
		royaltiesWHT: null,
		treatyType: "No treaty",
		notes: "No treaty exists. Korean domestic withholding applies.",
	},
];

export default function DoubleTaxTreatyFinderPage() {
	const [search, setSearch] = useState("");
	const [filterStatus, setFilterStatus] = useState<
		"all" | "treaty" | "no-treaty"
	>("all");

	const filtered = useMemo(() => {
		return TREATIES.filter((t) => {
			const matchesSearch = t.country
				.toLowerCase()
				.includes(search.toLowerCase());
			const matchesStatus =
				filterStatus === "all" ||
				(filterStatus === "treaty" && t.hasTreaty) ||
				(filterStatus === "no-treaty" && !t.hasTreaty);
			return matchesSearch && matchesStatus;
		});
	}, [search, filterStatus]);

	return (
		<>
			{/* Filters */}
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<div>
					<label
						htmlFor="treaty-search"
						className="mb-2 block text-sm font-semibold text-ink"
					>
						Search country
					</label>
					<input
						id="treaty-search"
						type="text"
						placeholder="Search country..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="min-h-11 w-full rounded-field border border-line bg-white px-4 py-2 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus"
					/>
				</div>
				<ChipGroup
					label="Treaty status"
					value={filterStatus}
					onChange={setFilterStatus}
					options={[
						{ value: "all", label: "All" },
						{ value: "treaty", label: "Has Treaty" },
						{ value: "no-treaty", label: "No Treaty" },
					]}
				/>
			</div>

			{/* Results count */}
			<h2
				className="text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				Showing {filtered.length} of {TREATIES.length} entries
			</h2>

			{filtered.length === 0 && (
				<div className="py-12 text-center text-muted">
					No results for &quot;{search}&quot;. Try a different country name.
				</div>
			)}
			<CardGrid cols={2}>
				{filtered.map((t) => (
					<CardGridItem key={t.country}>
						<article className="w-full rounded-card border border-line bg-white p-4">
							<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
								{/* Country name + treaty status */}
								<div>
									<h3 className="font-bold text-ink">{t.country}</h3>
									<Badge
										tone={t.hasTreaty ? "neutral" : "danger"}
										className="mt-1"
									>
										{t.treatyType}
									</Badge>
								</div>

								{/* WHT rates */}
								{t.hasTreaty && (
									<div className="flex gap-4 text-center sm:gap-5">
										{(
											[
												["Dividends", t.dividendsWHT],
												["Interest", t.interestWHT],
												["Royalties", t.royaltiesWHT],
											] as const
										).map(([label, v]) => (
											<div key={label}>
												<p className="text-xs uppercase tracking-wide text-muted">
													{label}
												</p>
												<p className="text-xl font-bold text-primary">
													{v !== null ? `${v}%` : "n/a"}
												</p>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Notes */}
							{t.notes && (
								<p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-muted">
									{t.notes}
								</p>
							)}
						</article>
					</CardGridItem>
				))}
			</CardGrid>
		</>
	);
}
