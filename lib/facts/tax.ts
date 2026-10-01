/**
 * Single source of truth for tax, social insurance, GeSY, residence-permit
 * thresholds, property VAT and transfer fees quoted across RealCy guides and
 * tools. Every figure was checked against the named primary source on
 * 2026-10-02. Update the constant here and every guide and tool follows.
 *
 * This file has no imports on purpose: guides and tools both import it.
 */

/** Date the figures in this file were last checked. */
export const TAX_FACTS_CHECKED = "2026-10-02";

// One euro formatter for every facts file ("€5,000", or "€66.90" with cents).
export { eur } from "./health-transport";

/** Formats a rate (0.088) as "8.8%". */
export function pct(rate: number): string {
	return `${Number((rate * 100).toFixed(2))}%`;
}

// ---------------------------------------------------------------------------
// Personal income tax
// ---------------------------------------------------------------------------

/**
 * Personal income tax bands from tax year 2026 (upper limit of each band, rate).
 * Source: Tax Department, "Φορολογική Μεταρρύθμιση 2026, φυσικά πρόσωπα" (11.05.2026). Checked 2026-10-02.
 */
export const INCOME_TAX_BANDS_2026: ReadonlyArray<{
	upTo: number;
	rate: number;
}> = [
	{ upTo: 22000, rate: 0 },
	{ upTo: 32000, rate: 0.2 },
	{ upTo: 42000, rate: 0.25 },
	{ upTo: 72000, rate: 0.3 },
	{ upTo: Number.POSITIVE_INFINITY, rate: 0.35 },
];

/** Personal income tax due on a taxable income, using the 2026 bands. */
export function personalIncomeTax2026(income: number): number {
	let tax = 0;
	let lower = 0;
	for (const band of INCOME_TAX_BANDS_2026) {
		if (income <= lower) break;
		tax += (Math.min(income, band.upTo) - lower) * band.rate;
		lower = band.upTo;
	}
	return tax;
}

/**
 * Foreign pension: amount a year exempt before the optional 5% flat rate, from tax year 2026 (was €3,420).
 * Source: Tax Department presentation on Income Tax (Amending) Law N.244(I)/2025, Article 20. Checked 2026-10-02.
 */
export const FOREIGN_PENSION_THRESHOLD = 5000;

/**
 * Foreign pension threshold for tax year 2025 and earlier.
 * Source: as FOREIGN_PENSION_THRESHOLD. Checked 2026-10-02.
 */
export const FOREIGN_PENSION_THRESHOLD_2025 = 3420;

/**
 * Optional flat rate on foreign pension above the threshold.
 * Source: as FOREIGN_PENSION_THRESHOLD. Checked 2026-10-02.
 */
export const FOREIGN_PENSION_FLAT_RATE = 0.05;

/**
 * First employment in Cyprus: salary above which 50% of it is exempt (circulars 2022/10 and 2024/04).
 * Source: Tax Department, Form T.D.59 2026 notes, note 7. Checked 2026-10-02.
 */
export const FIRST_EMPLOYMENT_50PCT_THRESHOLD = 55000;

/**
 * First employment in Cyprus: yearly cap on the alternative 20% exemption.
 * Source: Tax Department, Form T.D.59 2026 notes, note 7. Checked 2026-10-02.
 */
export const FIRST_EMPLOYMENT_20PCT_CAP = 8550;

// ---------------------------------------------------------------------------
// Corporate tax and Special Defence Contribution (SDC)
// ---------------------------------------------------------------------------

/**
 * Corporate income tax rate from 1 January 2026.
 * Source: Tax Department presentation on Income Tax (Amending) Law N.244(I)/2025. Checked 2026-10-02.
 */
export const CORPORATE_TAX_RATE = 0.15;

/**
 * IP Box effective rate: 80% of qualifying profit deducted, 20% taxed at 15%.
 * Source: computed from CORPORATE_TAX_RATE and the 80% IP Box deduction (Income Tax Law, section 9). Checked 2026-10-02.
 */
export const IP_BOX_EFFECTIVE_RATE = 0.03;

/**
 * SDC on dividends for Cyprus-domiciled residents, on dividends paid out of profits from 2026 onwards.
 * Source: Tax Department presentation on the SDC (Amending) (No. 4) Law of 2025. Checked 2026-10-02.
 */
export const SDC_DIVIDEND_RATE = 0.05;

/**
 * SDC on dividends paid up to 31/12/2031 out of profits of tax years up to 2025.
 * Source: as SDC_DIVIDEND_RATE. Checked 2026-10-02.
 */
export const SDC_DIVIDEND_RATE_PRE_2026_PROFITS = 0.17;

/**
 * SDC on interest received by Cyprus-domiciled residents from 2026 (was 30%).
 * Source: as SDC_DIVIDEND_RATE. Checked 2026-10-02.
 */
export const SDC_INTEREST_RATE = 0.17;

/**
 * Non-dom extension: lump sum per five-year extension period (two periods possible).
 * Source: as SDC_DIVIDEND_RATE, Article 3Δ. Checked 2026-10-02.
 */
export const NON_DOM_EXTENSION_FEE = 250000;

// ---------------------------------------------------------------------------
// Social insurance and GeSY
// ---------------------------------------------------------------------------

/**
 * Employee social insurance contribution (employer pays the same).
 * Source: Business in Cyprus, "Social Insurance Registration and Contributions". Checked 2026-10-02.
 */
export const SI_EMPLOYEE_RATE = 0.088;

/**
 * Employer social insurance contribution.
 * Source: Business in Cyprus, "Social Insurance Registration and Contributions". Checked 2026-10-02.
 */
export const SI_EMPLOYER_RATE = 0.088;

/**
 * Self-employed social insurance contribution (21.8% total, 5.2% paid by the state).
 * Source: Business in Cyprus, "Social Insurance Registration and Contributions". Checked 2026-10-02.
 */
export const SI_SELF_EMPLOYED_RATE = 0.166;

/**
 * Maximum insurable earnings for 2026, yearly (monthly-paid).
 * Source: Social Insurance Services, "Basic Insurable Earnings 1981-2026". Checked 2026-10-02.
 */
export const SI_MAX_INSURABLE_ANNUAL = 68904;

/**
 * Maximum insurable earnings for 2026, monthly.
 * Source: Social Insurance Services, "Basic Insurable Earnings 1981-2026". Checked 2026-10-02.
 */
export const SI_MAX_INSURABLE_MONTHLY = 5742;

/**
 * Employer on-cost: SI 8.8% + GeSY 2.9% + Redundancy Fund 1.2% + HRDA 0.5% + Social Cohesion Fund 2%.
 * Source: computed from Business in Cyprus contribution rates. Checked 2026-10-02.
 */
export const EMPLOYER_ON_COST_RATE = 0.154;

/**
 * GeSY contribution on employment, pension, dividend, interest and rental income.
 * Source: Tax Department, Guide for completion of tax return 2025 (June 2026). Checked 2026-10-02.
 */
export const GESY_RATE = 0.0265;

/**
 * GeSY contribution on self-employed profits.
 * Source: Tax Department, Guide for completion of tax return 2025 (June 2026). Checked 2026-10-02.
 */
export const GESY_SELF_EMPLOYED_RATE = 0.04;

/**
 * Yearly income ceiling for GeSY contributions.
 * Source: Tax Department, Guide for completion of tax return 2025 (June 2026). Checked 2026-10-02.
 */
export const GESY_INCOME_CAP = 180000;

/**
 * National minimum wage from 1 January 2026, gross a month, after six months' continuous employment.
 * Source: Ministry of Labour and Social Insurance statement, 27/12/2025. Checked 2026-10-02.
 */
export const MINIMUM_WAGE = 1088;

/**
 * National minimum wage from 1 January 2026 for the first six months of employment.
 * Source: Ministry of Labour and Social Insurance statement, 27/12/2025. Checked 2026-10-02.
 */
export const MINIMUM_WAGE_FIRST_SIX_MONTHS = 979;

// ---------------------------------------------------------------------------
// Property: reduced VAT and transfer fees
// ---------------------------------------------------------------------------

/**
 * 5% VAT on a primary residence: applies to the first 130 m² of buildable area.
 * Source: Tax Department Circular ΕΕ 11/2023. Checked 2026-10-02.
 */
export const REDUCED_VAT_AREA_M2 = 130;

/**
 * 5% VAT not available if the home's buildable area exceeds this.
 * Source: Tax Department Circular ΕΕ 11/2023. Checked 2026-10-02.
 */
export const REDUCED_VAT_MAX_AREA_M2 = 190;

/**
 * 5% VAT applies to value up to this amount.
 * Source: Tax Department Circular ΕΕ 11/2023. Checked 2026-10-02.
 */
export const REDUCED_VAT_VALUE_CAP = 350000;

/**
 * 5% VAT not available if the home's total value exceeds this.
 * Source: Tax Department Circular ΕΕ 11/2023. Checked 2026-10-02.
 */
export const REDUCED_VAT_MAX_VALUE = 475000;

/**
 * Land Registry transfer fee scale before the 50% reduction (upper limit, rate).
 * Source: Department of Lands and Surveys, "Rights and Fees". Checked 2026-10-02.
 */
export const TRANSFER_FEE_BANDS: ReadonlyArray<{ upTo: number; rate: number }> =
	[
		{ upTo: 85000, rate: 0.03 },
		{ upTo: 170000, rate: 0.05 },
		{ upTo: Number.POSITIVE_INFINITY, rate: 0.08 },
	];

/**
 * Reduction applied to all transfer fees (none are due where the purchase is subject to VAT).
 * Source: Department of Lands and Surveys, "Rights and Fees". Checked 2026-10-02.
 */
export const TRANSFER_FEE_REDUCTION = 0.5;

/** Transfer fees on a price, on the full scale and after the 50% reduction. */
export function transferFees(price: number): { full: number; reduced: number } {
	let full = 0;
	let lower = 0;
	for (const band of TRANSFER_FEE_BANDS) {
		if (price <= lower) break;
		full += (Math.min(price, band.upTo) - lower) * band.rate;
		lower = band.upTo;
	}
	return { full, reduced: full * (1 - TRANSFER_FEE_REDUCTION) };
}

// ---------------------------------------------------------------------------
// Residence permits
// ---------------------------------------------------------------------------

/**
 * Permanent residence by investment: minimum new-home price from a developer, plus VAT.
 * Source: Migration Department, "Immigration Permits for Investors", para 2.1(A). Checked 2026-10-02.
 */
export const PR_INVESTMENT_MIN = 300000;

/**
 * Permanent residence by investment: secured annual income from abroad.
 * Source: Migration Department, "Immigration Permits for Investors", para 2.2. Checked 2026-10-02.
 */
export const PR_INCOME_MIN = 50000;

/**
 * Permanent residence by investment: extra annual income for a spouse.
 * Source: Migration Department, "Immigration Permits for Investors", para 2.2. Checked 2026-10-02.
 */
export const PR_INCOME_SPOUSE = 15000;

/**
 * Permanent residence by investment: extra annual income per dependent child.
 * Source: Migration Department, "Immigration Permits for Investors", para 2.2. Checked 2026-10-02.
 */
export const PR_INCOME_CHILD = 10000;

/**
 * Digital Nomad permit: minimum net monthly income (after tax and contributions).
 * Source: Migration Department, "Digital nomads and family members". Checked 2026-10-02.
 */
export const DNV_NET_MONTHLY_INCOME = 3500;

/**
 * Digital Nomad permit: official examination time in weeks (from, to).
 * Source: Migration Department, "Digital nomads and family members". Checked 2026-10-02.
 */
export const DNV_EXAMINATION_WEEKS = { from: 5, to: 7 } as const;

/**
 * Visitor temporary residence permit: minimum transfers from abroad a month for one person.
 * Source: Migration Department, "SUPPORTING DOCUMENTS - VISITOR PERMIT". Checked 2026-10-02.
 */
export const VISITOR_PERMIT_MONTHLY_INCOME = 2000;

/**
 * Visitor permit for a couple: €2,000 plus 20% for a spouse.
 * Source: computed from VISITOR_PERMIT_MONTHLY_INCOME. Checked 2026-10-02.
 */
export const VISITOR_PERMIT_MONTHLY_INCOME_COUPLE = 2400;

/**
 * EU citizens: maximum fine for failing to register (MEU1).
 * Source: Migration Department, "Registration of E.U. citizens ... (MEU1)". Checked 2026-10-02.
 */
export const MEU1_MAX_FINE = 2500;
