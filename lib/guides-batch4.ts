import {
	eur,
	FIRST_EMPLOYMENT_50PCT_THRESHOLD,
	pct,
	SDC_DIVIDEND_RATE,
} from "./facts/tax";
import {
	SRC as HT_SRC,
	INTERCITY_FARE,
	LARNACA_BUS,
	LIMASSOL_BUS,
	PAPHOS_BUS,
} from "./facts/health-transport";
import type { GuideInfo } from "./guides";

/**
 * SEO content batch 4 (July 2026) — research-backed guides.
 * Uses the 2026 tax reform consistently with the rest of the site.
 */
export const GUIDES_BATCH4: GuideInfo[] = [
	{
		slug: "rental-income-tax-cyprus",
		datePublished: "2026-07-14",
		dateModified: "2026-07-14",
		category: "tax",
		title: "Cyprus Rental Income Tax 2026: Landlord Guide",
		description:
			"Cyprus landlord tax 2026: how rental income is taxed after SDC abolition, GHS obligations, non-resident rules and the new cashless-rent requirement.",
		sections: [
			{
				heading: "How Cyprus Taxes Long-Term Rental Income",
				body: "Rental income from long-term residential and commercial lets in Cyprus is treated as ordinary income and pooled with all other Cyprus-source income for personal income tax purposes. Before the tax bands apply, you receive a statutory 20 per cent deemed wear-and-tear deduction on gross rent — no receipts required. Only 80 per cent of your gross rental receipts form the taxable base.\n\nFrom 1 January 2026, the progressive income tax bands are: 0 per cent on taxable income up to €22,000; 20 per cent on €22,001–€32,000; 25 per cent on €32,001–€42,000; 30 per cent on €42,001–€72,000; and 35 per cent on income above €72,000. These bands apply to your total taxable income — rental, employment, self-employment and other — not to rental income in isolation.\n\nAs a worked example: a landlord whose sole income is €30,000 gross annual rent has a taxable base of €24,000 (80 per cent of €30,000). The first €22,000 is taxed at 0 per cent; the remaining €2,000 at 20 per cent, giving a tax liability of €400 — an effective rate of roughly 1.3 per cent on gross rent.\n\nThis guide focuses on long-term letting. Short-term holiday rentals and Airbnb-style letting are treated differently — see the airbnb-short-term-rental-cyprus guide for those rules. To model your net rental yield after all taxes, use the rental-yield calculator at /tools/rental-yield-calculator.",
			},
			{
				heading: "The 2026 SDC Abolition: What You Save",
				body: "The most significant change for Cyprus landlords in 2026 is the abolition of the Special Defence Contribution (SDC) on rental income, effective 1 January 2026. Under the previous regime, Cyprus-domiciled tax residents paid SDC at 3 per cent on 75 per cent of gross rent (an effective rate of 2.25 per cent of gross rent) on top of their normal income tax. This created a dual-layer tax on every euro of rental income.\n\nFrom 2026, SDC on rental income is gone for all individual landlords. Non-domiciled Cyprus tax residents (non-doms) were already exempt from SDC before 2026, as were non-resident landlords. The abolition primarily benefits domiciled residents, but it also eliminates the compliance burden of tracking SDC separately for everyone.\n\nTo illustrate the saving: on €30,000 gross annual rent, a domiciled resident would previously have owed approximately €675 in SDC (2.25 per cent × €30,000) each year, in addition to income tax. That saving is now permanent from 2026 onwards.\n\nThe abolition is part of the broader 2025–2026 Cyprus tax reform package, which also revised the personal income tax bands and introduced the cashless-rent obligation described below. Rental income is now taxed solely through personal income tax for individuals. For a broader picture of the reform, including changes to dividend SDC, see the taxes-for-expats guide.",
			},
			{
				heading: "GHS Healthcare Contribution: Still Applies in 2026",
				body: "Abolishing SDC does not mean rental income escapes all charges beyond income tax. The General Healthcare System contribution (GHS, also known as GeSY) continues to apply at 2.65 per cent on gross rental income for individual Cyprus tax-resident landlords. Unlike the 20 per cent wear-and-tear deduction, the GHS contribution is calculated on the full gross rent before any deductions.\n\nThe annual income cap for GHS across all sources is €180,000, meaning the maximum annual GHS liability on rental income alone is approximately €4,770. Income above this cap attracts no further GHS charge.\n\nThe payment mechanism depends on your tenant. Where your tenant is an individual, you self-assess and pay GHS directly to the Tax Department in two instalments: by 30 June for income received in the first half of the year, and by 31 December for the second half. Where your tenant is a company or partnership, that business is required to withhold GHS at 2.65 per cent at source and remit it to the Tax Department on your behalf — check your rental statements to confirm this is happening correctly.\n\nCompanies that own rental property are not themselves subject to GHS on that income — the contribution applies only to individual landlords.\n\nThe position for non-resident landlords on GHS is not uniformly settled across published sources. If you are a non-resident landlord, obtain specific written advice from a Cyprus-registered accountant or tax adviser before filing.",
			},
			{
				heading: "Non-Resident Landlords: Your Cyprus Tax Position",
				body: "If you own property in Cyprus but do not qualify as a Cyprus tax resident — broadly, spending fewer than 60 days in Cyprus per tax year under the 60-day rule, or fewer than 183 days under the standard rule — you remain liable to Cyprus income tax on rental income from that property. Cyprus exercises source-based taxation on immovable property: non-residents pay tax on Cyprus-source income only, and rent from a Cyprus property is firmly within that scope.\n\nNon-resident landlords benefit from the same reliefs as residents: the €22,000 nil-rate income tax band, the 20 per cent statutory wear-and-tear deduction, and full exemption from SDC (non-residents were exempt even before the 2026 abolition). Non-residents should register with the Cyprus Tax Department, obtain a tax identification code (TIC), and file an annual TD1 income tax return via TAXISnet.\n\nWhere your tenant is a company or partnership, the tenant must withhold 10 per cent of each rent payment at source as a prepayment against your income tax liability. This credit is offset against your final liability when you file your annual return — you pay the shortfall if more is due, or claim a refund if withholding exceeded your liability.\n\nCyprus has a wide network of double taxation treaties. Your country of tax residence may also have taxing rights over the same income, so review the applicable treaty to avoid double taxation, and keep a current tax residency certificate from your home jurisdiction on file. For property-transfer and capital gains considerations, see the property-taxes-2026 guide.",
			},
			{
				heading: "The Cashless-Rent Rule: Electronic Payments from 1 July 2026",
				body: "From 1 July 2026, all rent payments relating to Cyprus immovable property must be made by traceable electronic means. This obligation applies regardless of the rent amount and regardless of property type — residential, commercial, or other. Permitted methods include bank transfers, debit or credit card payments, and other recognised electronic payment systems. Note that early market commentary referenced a €500 threshold below which cash was said to remain permissible; the Cyprus Tax Department confirmed in mid-2026 that no such threshold applies — the rule covers all rent from 1 July 2026.\n\nAs landlord, you are prohibited from accepting cash rent after the effective date. A handwritten receipt acknowledging a cash payment does not bring it into compliance.\n\nThe main tax consequence falls on the tenant: rent paid by non-compliant means may be disallowed as a deductible expense in the tenant's tax return, effectively increasing their taxable profit. Commercial tenants therefore have a strong independent incentive to insist on electronic payment. For individual tenants, non-compliant payments may also affect any rental-expense deduction they may be entitled to.\n\nFor landlords, electronic payment makes record-keeping more straightforward: bank statements and card-payment records provide a dated, verifiable audit trail of all receipts. Update your tenancy agreements before or at renewal to specify the approved electronic payment method, and retain payment records, agreements, and related documents for at least six years to meet Cyprus tax-record retention obligations.",
			},
			{
				heading: "Filing, Allowable Deductions and Year-Round Compliance",
				body: "Individual Cyprus income tax returns (form TD1, submitted online via TAXISnet) covering the prior tax year are due by 31 October for electronic filers, though the Tax Department has extended this deadline in recent years — always confirm the current date. If you expect taxable income in the current year, provisional tax instalments — each equal to half the estimated annual liability — are payable by 31 July and 31 December. GHS self-assessment payments are due separately, by 30 June and 31 December. For the step-by-step filing process, see the cyprus-tax-return-filing guide.\n\nBeyond the automatic 20 per cent wear-and-tear deduction, individual landlords may deduct: loan interest on borrowings used to acquire, construct, or improve the rented property; maintenance and repair costs supported by VAT invoices or official receipts (note that capital improvements are not deductible as repairs); insurance premiums directly attributable to the rental property; and professional property management fees.\n\nKeep all rental agreements, bank statements, invoices, and receipts for a minimum of six years. For a full picture of your investment economics after all taxes and costs, use the rental-yield calculator at /tools/rental-yield-calculator, and to weigh a purchase against renting, see the buying-vs-renting-cyprus guide. For a complete view of Cyprus property ownership costs beyond income tax, see the property-taxes-2026 guide.",
			},
		],
		faqs: [
			{
				q: "Do I still pay SDC on my Cyprus rental income in 2026?",
				a: "No. The Special Defence Contribution on rental income was abolished from 1 January 2026. All individual landlords — including domiciled Cyprus residents who previously paid an effective 2.25 per cent SDC on gross rent — are now fully exempt. From 2026, only personal income tax and the 2.65 per cent GHS contribution apply to rental income for individuals. Non-doms and non-residents were already exempt from SDC before 2026.",
			},
			{
				q: "How much rental income can I earn in Cyprus before paying income tax?",
				a: "The nil-rate band is €22,000 of taxable income. Because you receive a 20 per cent wear-and-tear deduction, your taxable base is 80 per cent of gross rent — meaning gross annual rent of up to €27,500 falls entirely within the nil-rate band (€27,500 × 80 per cent = €22,000). Note that GHS at 2.65 per cent is calculated on gross rent regardless of where your income falls in the tax bands, so a landlord earning €27,500 gross rent would still owe roughly €729 in GHS. There is no GHS if the landlord is a company.",
			},
			{
				q: "Can I accept cash rent from my tenant after 1 July 2026?",
				a: "No. From 1 July 2026, all Cyprus rent payments must be made by traceable electronic means — bank transfer, card payment, or equivalent — regardless of amount and regardless of property type. Landlords are prohibited from accepting cash rent, and issuing a receipt does not make a cash payment compliant. The main consequence is that non-compliant rent may be disallowed as a tax-deductible expense in the tenant's return. Update tenancy agreements to specify the required payment method.",
			},
			{
				q: "I am not a Cyprus tax resident but I let out an apartment there. Do I need to file a Cyprus tax return?",
				a: "Yes. Non-residents are subject to Cyprus income tax on rental income arising from Cyprus property and must file an annual TD1 return via TAXISnet. Register with the Cyprus Tax Department and obtain a Tax Identification Code. You benefit from the same €22,000 nil-rate band and 20 per cent wear-and-tear deduction as residents. If your tenant is a company, 10 per cent income tax is withheld at source as a prepayment, credited against your final liability. Check your home country's double tax treaty with Cyprus to avoid double taxation, keep a current tax residency certificate, and take specific advice from a Cyprus-registered tax adviser — particularly on whether GHS applies to you as a non-resident.",
			},
		],
	},
	{
		slug: "cyprus-tax-return-filing",
		datePublished: "2026-07-14",
		dateModified: "2026-10-02",
		lastChecked: "2026-10-02",
		sources: [
			{
				label: "Tax Department: Individual income tax return",
				url: "https://www.gov.cy/mof-tax/en/documents/forologiki-dilosi-eisodimatos-atomoy/",
			},
			{
				label: "Tax Department: Form T.D.59 2026 notes (PDF)",
				url: "https://www.gov.cy/media/sites/167/2026/02/IR59_2026_English__.pdf",
			},
			{
				label:
					"Tax Department: Special Defence Contribution reform 2026 (Greek, PDF)",
				url: "https://www.gov.cy/media/sites/167/2026/03/EEA-ΦΚΚ-ΜΕΤΑΡΡΥΘΜΙΣΗ-06032026.pdf",
			},
			{
				label: "Tax Department: Income Tax Law amendments 2026 (Greek, PDF)",
				url: "https://www.gov.cy/media/sites/167/2026/03/2026-ΦορΜεταρρύθμιση-Φόρος-Εισοδήματος.pdf",
			},
		],
		category: "tax",
		title: "Cyprus Tax Return 2026: Filing Your TD1 Form",
		description:
			"How to file your Cyprus TD1 personal income tax return via TAXISnet — who must file, the 2026 deadline, non-dom relief, and the 50% expat exemption.",
		sections: [
			{
				heading: "Who Must File — and the Deadline for Tax Year 2025",
				body: "For the 2025 tax year, you are required to submit a TD1 personal income tax return if your gross income from all sources exceeded €19,500. This covers employment income, self-employment profits, rental income, foreign pensions, and investment income. Employees whose only income comes from a single Cyprus employer operating payroll, and whose total gross income is below the threshold, are generally not required to file, though specific circumstances can change this. Seek advice if you are at all unsure.\n\nThe statutory deadline for the 2025 TD1 is 31 July 2026. A decree published in mid-2026 extended this to 31 October 2026 for the individual return (TD1 without accounts). Crucially, the extension covers both the submission of the return and the payment of any tax due: no penalties or interest apply if you file and settle in full by the extended date. Always verify the current deadline at taxisnet.mof.gov.cy, as the Tax Department may issue further updates.\n\nFrom tax year 2026, every Cyprus tax resident with income must file, and so must every resident aged 25 to 70 even with no income. Returns for 2026 onwards are filed through Tax For All.\n\nTrack your upcoming filing obligations with the tax-filing-calendar tool at /tools/tax-filing-calendar.",
			},
			{
				heading: "TAXISnet Registration and the Tax For All Transition",
				body: "The 2025 tax year TD1 is submitted through the existing TAXISnet portal at taxisnet.mof.gov.cy. In 2026 the Cyprus Tax Department confirmed that the Tax For All (TFA) system, originally intended to replace TAXISnet for income tax filings, will not be used for personal income tax returns until 2027, when it will cover the 2026 tax year. For the return you are filing now, use TAXISnet.\n\nBefore you can use TAXISnet you need a Cyprus Tax Identification Code (TIC): a nine-character identifier comprising eight digits and one letter. If you do not already have a TIC, apply in person at a Cyprus Tax District Office using form TD2001. EU citizens typically present their Registration Certificate (the yellow slip); non-EU citizens present their residence documentation from the Migration Department. Processing usually takes two to eight weeks, though some applicants receive their TIC within a fortnight.\n\nOnce you have a TIC, registering for TAXISnet is a separate step completed online. Visit taxisnet.mof.gov.cy, select Registration, enter your TIC and date of birth, create a username and password, then verify your email address. The process takes around fifteen minutes and is free. The portal defaults to Greek: toggle to English using the language selector before you begin. TAXISnet is accessible worldwide; you do not need to be physically in Cyprus to file or pay.\n\nNote that VAT, PAYE, and VIES obligations have already migrated to TFA, so use the correct portal for each obligation type. See the taxes-for-expats guide for a full walkthrough of obtaining your TIC.",
			},
			{
				heading: "Completing the TD1: Key Income Sections",
				body: "The TD1 covers your worldwide income for the 2025 calendar year. TAXISnet pre-populates some fields from employer PAYE submissions and Social Insurance data, but you remain responsible for verifying every figure before you submit.\n\nEmployment income appears in the first major section. Cross-check any pre-populated figures against your payslips and employment contract. If you are claiming the 50 per cent high-earner exemption (see below), you declare it here.\n\nRental income from Cyprus property is reported net of allowable expenses, which may include mortgage interest, routine maintenance costs, and a 20 per cent wear-and-tear allowance. For the 2025 tax year, net rental income was also subject to Special Defence Contribution (SDC) at an effective rate of 2.25 per cent. SDC on rental income is abolished from 1 January 2026, so the 2025 return is the last year it features — see the rental-income-tax-cyprus guide for the new position.\n\nForeign dividends and passive interest are declared in a dedicated section. Non-dom residents claim their SDC exemption here; domiciled residents paid 17 per cent SDC on these amounts for the 2025 tax year.\n\nForeign pensions for services rendered outside Cyprus may attract a 5 per cent flat rate on amounts exceeding €3,420 for the 2025 tax year (this threshold rises to €5,000 from the 2026 tax year). Whether this treatment applies automatically or requires an election in your particular circumstances is worth clarifying with a tax adviser before you finalise the return.\n\nFor those with self-employment or business profits, see the self-employed-tax-cyprus guide.",
			},
			{
				heading: "Non-Dom Status and the 50% Employment Exemption",
				body: `Non-domicile (non-dom) status is the most widely used expat tax advantage in Cyprus. Broadly, a Cyprus tax resident who was not born domiciled in Cyprus and who has not established a permanent home here qualifies. Non-dom status exempts you from Special Defence Contribution (SDC) on worldwide dividends and passive interest income for up to 17 years. For the 2025 tax year, SDC on dividends stood at 17 per cent for domiciled residents, making the non-dom exemption a substantial saving for those holding investment income. From 2026 the rate is ${pct(SDC_DIVIDEND_RATE)} on dividends paid out of 2026 and later profits. For full eligibility details, see the non-dom section of /guides/taxes-for-expats/.\n\nTo claim the SDC exemption on your TD1, you must have previously submitted form TD38 to the Tax Department, typically at the point you first receive income that would otherwise attract SDC. Once on record, the exemption carries into subsequent TD1 returns automatically. If you have not yet submitted your TD38, do so before or alongside your current TD1. Non-dom status does not exempt employment, rental, or self-employment income from standard income tax.\n\nThe 50 per cent employment income exemption is a separate income tax relief from non-dom status. To qualify, broadly you must not have been a Cyprus tax resident for a defined run of years immediately before your first Cyprus employment, your first employment in Cyprus must have begun on or after 1 January 2022, and your annual remuneration must exceed the qualifying threshold (more than ${eur(FIRST_EMPLOYMENT_50PCT_THRESHOLD)} a year). The exemption runs for up to 17 tax years and is claimed in the employment income section of the TD1. Retain your employment contract and evidence of the look-back period, as these may be requested during an audit. Verify your residency position using the tax-residency-tracker tool at /tools/tax-residency-tracker.`,
			},
			{
				heading: "Provisional Tax: Advance Payments",
				body: "Provisional tax (sometimes called advance tax) applies to self-employed individuals and company directors whose taxable income is not fully covered by PAYE withholding at source. Employees whose only income comes from a single Cyprus employer operating payroll generally have no separate provisional tax obligation on that salary. However, if you also receive rental income, business profits, or other untaxed amounts, you may need to make provisional payments on those additional amounts — confirm this with a tax adviser.\n\nFor the current tax year you file your estimated taxable income via TAXISnet, with tax due in two equal instalments: the first by 31 July and the second by 31 December. If you have not yet filed your estimate or paid the first instalment, act promptly to limit any exposure.\n\nIf your actual taxable income turns out to exceed your provisional estimate by more than 25 per cent, a 10 per cent surcharge is imposed on the entire tax liability for the year — not merely on the underestimated portion. Estimating conservatively is therefore prudent, and you may revise your estimate before the December instalment if your income expectations change materially.\n\nWhen preparing your 2026 provisional estimate, apply the new 2026 income tax bands: 0 per cent up to €22,000; 20 per cent on €22,001–€32,000; 25 per cent on €32,001–€42,000; 30 per cent on €42,001–€72,000; and 35 per cent above €72,000. These higher thresholds are part of Cyprus's 2026 tax reform and do not affect the 2025 return you are filing now. The tax-filing-calendar tool at /tools/tax-filing-calendar includes reminders for both provisional instalments.",
			},
			{
				heading: "Penalties, Late Filing, and Where to Get Help",
				body: "Filing the TD1 after the deadline carries immediate financial consequences. The administrative penalty for late submission was increased during 2026 to around €150. Additional monthly penalties then accrue on the outstanding obligation, historically in the region of €200 per month up to a statutory maximum cap. Penalty amounts were updated in 2026, so confirm the precise current figures with the Cyprus Tax Department or a licensed tax adviser rather than relying solely on this guide.\n\nSeparately, any tax that remains unpaid after the deadline attracts a late-payment surcharge (in the region of 5 per cent, with a further charge if the balance is still outstanding after two months), plus interest at the official rate calculated monthly on the outstanding amount. These amounts compound quickly on larger liabilities, so confirm the current surcharge and interest rate before relying on any figure.\n\nThe safest approach is always to file on time, even if you are uncertain whether you owe any tax. A nil return filed by the deadline attracts no administrative penalty. If you have already missed the deadline, submit and pay as soon as possible to minimise further charges.\n\nFor self-service guidance, TAXISnet provides tutorials and worked examples within the portal, and the Cyprus Tax Department runs a public helpline for straightforward procedural questions. For anything involving multiple income sources, the 50 per cent exemption, non-dom relief, foreign-sourced income, or a dispute, engage a Cyprus-registered chartered accountant or tax consultant; qualified practitioners can be found through the Institute of Certified Public Accountants of Cyprus (ICPAC). For a broader overview of your position, see the taxes-for-expats guide and the self-employed-tax-cyprus guide.",
			},
		],
		faqs: [
			{
				q: "Do I need to file a TD1 if my income is below €19,500?",
				a: "For the 2025 tax year, the general threshold for mandatory filing is gross income above €19,500. However, individuals with rental property and those with certain types of foreign-source income may be required to file regardless of total income. From the 2026 tax year, every Cyprus tax resident with income must file, and so must every resident aged 25 to 70 even with no income. If in doubt, seek advice. Filing an unnecessary return costs little, while a missed filing can trigger penalties.",
			},
			{
				q: "Is the filing deadline 31 July 2026 or 31 October 2026?",
				a: "The statutory deadline is 31 July 2026, but a decree published in mid-2026 extended it to 31 October 2026 for the individual return (TD1 without accounts). Both the return submission and any associated tax payment are covered by the extension. Always verify the current deadline at taxisnet.mof.gov.cy, as the Tax Department may issue further updates.",
			},
			{
				q: "Do I file the 2025 return on TAXISnet or Tax For All (TFA)?",
				a: "You use the existing TAXISnet portal at taxisnet.mof.gov.cy. The Tax For All system has been delayed for personal income tax filings and is not expected to be used until 2027, when it will cover the 2026 tax year. For the 2025 return, TAXISnet is the platform.",
			},
			{
				q: "Can I claim both non-dom status and the 50% employment exemption?",
				a: "No — these are mutually exclusive. Non-dom status exempts you from SDC on dividends and passive interest but leaves your employment income fully subject to income tax. The 50 per cent exemption halves your taxable employment income but does not affect SDC on investment income. The right choice depends on your overall income profile, so obtain qualified tax advice before committing to either.",
			},
			{
				q: "Which income tax bands apply to my 2025 return?",
				a: "The 2025 bands are: 0 per cent up to €19,500; 20 per cent on €19,501–€28,000; 25 per cent on €28,001–€36,300; 30 per cent on €36,301–€60,000; and 35 per cent above €60,000. These apply to the return you are filing now. The revised 2026 reform bands — with a higher tax-free threshold of €22,000 — apply to the 2026 tax year and feature in next year's return.",
			},
		],
	},
	{
		slug: "getting-around-cyprus-no-car",
		image: {
			src: "/images/guides/getting-around-cyprus-no-car-1600.webp",
			srcSmall: "/images/guides/getting-around-cyprus-no-car-800.webp",
			width: 1600,
			height: 901,
			alt: "Painting of a turquoise city bus at a shaded seaside bus stop where two passengers wait",
		},
		datePublished: "2026-07-14",
		dateModified: "2026-10-02",
		lastChecked: "2026-10-02",
		sources: [
			HT_SRC.intercity,
			HT_SRC.larnacaBuses,
			HT_SRC.limassolBuses,
			HT_SRC.paphosBuses,
			HT_SRC.paphosAirportBuses,
		],
		category: "transport",
		title: "Getting Around Cyprus Without a Car (2026)",
		description:
			"Honest guide to Cyprus public transport for expats: intercity buses, city routes, Bolt, shared taxis, and which cities work without a car.",
		sections: [
			{
				heading: "The Honest Reality: Cyprus Is Car-Centric",
				body: "Cyprus has no railway network and never has had one. The island developed almost entirely around the private car, and that legacy shapes daily life in ways that surprise many newly arrived expats. Roads between cities are fast and well-maintained; pavements in suburban and rural areas, less so. Villages, mountain communities, and the majority of beaches are effectively inaccessible by public transport alone.\n\nThat said, the situation in the three main cities, Limassol, Larnaca, and Paphos, has improved meaningfully over the past decade. City bus networks have been expanded and modernised, intercity coaches now run on reliable timetables, and Bolt has transformed the cost of spontaneous trips. A growing number of remote workers and urban-based expats do manage without a car, provided they choose their neighbourhood carefully and accept a degree of compromise on spontaneity.\n\nThe honest answer is: it depends almost entirely on where you live and how you spend your time. If you are office-bound in a central suburb, work from home, or reach weekend beaches via a short Bolt ride, car-free life is genuinely viable. If you want to explore the Troodos mountains at the weekend or live in a village, a car remains close to non-negotiable. Cross-reference the best-areas-to-live-cyprus guide to understand which districts sit closest to walkable amenities and strong bus corridors. If you decide you need a car but are not ready to buy, see [long-term car rental in Cyprus](/guides/long-term-car-rental-cyprus/) for monthly rates and contract terms.",
			},
			{
				heading: "City-by-City: How Far You Can Get on Buses and Bolt",
				body: "Limassol is the most liveable city in Cyprus without a car. The coastal strip from the old port to the tourist area stretches several kilometres and is reasonably walkable or cyclable. The city bus network covers most residential districts, and Bolt is well established with short wait times across the day. The seafront, main supermarkets, and much of the bar and restaurant scene are reachable on foot or by bus from central addresses, and the city is large enough to sustain decent Bolt driver supply even in the evening.\n\nLarnaca is a smaller city with a compact tourist strip and a functioning bus network. Bolt operates here, though the driver pool is thinner than in Limassol, and many expats find themselves relying on Bolt more heavily than buses, which can add up.\n\nPaphos is the most challenging of the three. It is spread across a wide area, Paphos town, Kato Paphos, and the hotel zone, with substantial walking distances between key areas. The bus network covers the main corridors, but frequencies outside peak tourist hours are limited and last services run early. Bolt is available but supply can be patchy. Expats relocating to Paphos with children, or those needing reliable commutes, should think carefully before forgoing a car. See the best-areas-to-live-cyprus guide for neighbourhood-level detail, and [long-term car rental in Cyprus](/guides/long-term-car-rental-cyprus/) if you want a car without buying one.",
			},
			{
				heading: "Intercity Buses and Shared Taxis",
				body: `Getting between cities by public transport is far more practical than getting around within them. InterCity Buses operates the main coach network connecting Limassol, Larnaca, Paphos, and the Famagusta/Ayia Napa area, with comfortable air-conditioned coaches on fixed timetables. One-way fares between major cities are ${eur(INTERCITY_FARE.min)} to ${eur(INTERCITY_FARE.max)} depending on the route. Timetables are published at intercity-buses.com; always check before travelling, as frequency drops significantly in the evenings and on Sundays.\n\nAlongside regular coaches, Cyprus has a traditional shared taxi service (sometimes called a service taxi), running 8-seater minibuses between the three main cities and both airports. These operate roughly Monday to Friday 06:00–18:00 and reduced hours at weekends. Fares start at around €11 per person, and the service picks up and drops off at or near your address along the route, giving door-to-door flexibility that regular buses cannot match.\n\nFor airport arrivals, public buses serve both Larnaca and Paphos airports. At Larnaca, Route 425 runs frequently into the city centre at ${eur(LARNACA_BUS.singleCash)} cash or ${eur(LARNACA_BUS.singleCard)} by Motion card (${eur(LARNACA_BUS.nightCash)} cash after 21:00). Paphos airport is served by routes 612 and 613 (${eur(PAPHOS_BUS.single)}). See the airport-transfers-guide for a full comparison of bus, shared taxi, and private transfer options, and the ferry-routes-guide for sea connections onward to Greece or the eastern Mediterranean.`,
			},
			{
				heading: "City Buses: Routes, Passes, and the Motion Bus Card",
				body: `Each district has its own operator: EMEL in Limassol, OSYPA in Paphos, Cyprus Public Transport in Larnaca and OSEA around Ayia Napa. The Motion card works on all of them. Each operator publishes its own routes and timetables; the public-transport directory at /sections/public-transport lists each operator with direct links.\n\nA single costs ${eur(LIMASSOL_BUS.single)} in Limassol and Paphos and ${eur(LARNACA_BUS.singleCash)} cash (${eur(LARNACA_BUS.singleCard)} by card) in Larnaca. Night fares after 21:00 are ${eur(LIMASSOL_BUS.night)} in Limassol and Paphos and ${eur(LARNACA_BUS.nightCash)} cash in Larnaca. A 30-day pass costs ${eur(LIMASSOL_BUS.monthly)} in Limassol, ${eur(PAPHOS_BUS.monthlyPersonalised)} in Paphos and ${eur(LARNACA_BUS.monthlyPersonalised)} in Larnaca (personalised card). Monthly passes for heavy users cost broadly the same as a few Bolt rides per week. Pricing differs between card types and cities and has been revised more than once in recent years, so check each operator's ticket page for current figures before buying.\n\nA practical caveat: most city bus routes stop running by 21:00–22:00, and Sunday frequency is markedly lower than on weekdays. If your social life regularly runs past 10 pm, budget for Bolt or taxis to fill the gap.`,
			},
			{
				heading: "Bolt, Taxi Apps, and When to Book Ahead",
				body: "Bolt is the dominant ride-hailing platform in Cyprus, operating in all three main cities: Limassol, Larnaca, and Paphos. Uber does not operate on the island. The app works identically to what most expats know from elsewhere in Europe — set a pickup, choose a category, pay in-app or cash. In-city rides typically range from €5 to €15 depending on distance; a cross-town ride in Limassol usually falls around €6–10. Surge pricing applies during busy periods and late at night, so an after-midnight ride can cost noticeably more.\n\nYango, another app-based ride service, has a presence in Cyprus and can serve as a backup, particularly in Limassol. CABCY is a locally developed taxi app operating in Larnaca and Limassol, popular with residents who prefer local operators. Traditional metered taxis remain available island-wide and can be hailed or booked by phone; metered fares run at roughly a €3.40 flag fall plus around €0.73 per kilometre, making them slightly more expensive than Bolt for most in-city journeys.\n\nFor airport pickups, Bolt allows advance scheduling well ahead of time — useful for early flights or late arrivals when driver availability is less certain. The airport-transfers-guide covers airport-specific options in detail, and for all intercity fixed-price journeys the shared taxi service generally undercuts Bolt significantly over longer distances.",
			},
			{
				heading: "E-Scooters, Cycling, and the No-Car Decision",
				body: "Bolt operates electric scooter sharing in Cyprus, with availability concentrated in the main tourist and seafront areas, coverage is strongest in Limassol and parts of Larnaca. Private scooter and e-bike hire is available through local operators for longer-term daily or weekly rental. Dedicated cycling infrastructure is thin: a seafront path in Limassol is the most consistently pleasant cycling route on the island, while Paphos lacks protected lanes on most roads. See the cycling-guide for a detailed assessment of routes and equipment hire.\n\nFor the no-car or one-car decision: if you are relocating as a couple or family, the question is rarely car versus no car, it is usually one car versus two. Limassol is the strongest case for a one-car household, where Bolt handles the second person's commute or evening trip without breaking the budget. Paphos and rural areas anywhere push strongly toward one car per driving adult. A household spending €150–250 per month on Bolt and taxis may still come out ahead of the all-in cost of a second car (insurance, fuel, maintenance, and depreciation) if both partners live and work centrally, but the arithmetic shifts the moment one person needs a car daily for a commute outside the centre.\n\nFor long-stay expats considering whether to import or buy, our [long-term car rental in Cyprus](/guides/long-term-car-rental-cyprus/) guide and the driving-licence-conversion guide cover the practical steps. And if you are choosing a city partly on transport grounds, the best-areas-to-live-cyprus guide includes walkability notes for each major city.",
			},
		],
		faqs: [
			{
				q: "Is it realistic to live in Cyprus without a car?",
				a: "Yes, but mainly in specific neighbourhoods of Limassol, and only if your work and social life stay within that area. Limassol is the most car-free-friendly city: Bolt is reliable, city buses cover most districts, and the seafront is walkable. Everywhere else — Paphos, rural areas, villages, mountains — a car is a strong practical necessity.",
			},
			{
				q: "Does Bolt work in all cities in Cyprus?",
				a: "Yes. Bolt operates in Limassol, Larnaca, and Paphos. It is the only major ride-hailing app on the island; Uber is not present. CABCY and Yango also operate in some cities as alternatives. Driver supply is strongest in Limassol, and thinner in Paphos, especially late at night.",
			},
			{
				q: "How much does a city bus cost in Cyprus?",
				a: `A single costs ${eur(LIMASSOL_BUS.single)} in Limassol and Paphos and ${eur(LARNACA_BUS.singleCash)} cash (${eur(LARNACA_BUS.singleCard)} by Motion card) in Larnaca. After 21:00, night fares are ${eur(LIMASSOL_BUS.night)} in Limassol and Paphos and ${eur(LARNACA_BUS.nightCash)} cash in Larnaca. A 30-day pass costs ${eur(LIMASSOL_BUS.monthly)} in Limassol, ${eur(PAPHOS_BUS.monthlyPersonalised)} in Paphos and ${eur(LARNACA_BUS.monthlyPersonalised)} in Larnaca (personalised card). Fares change, so check each operator's ticket page before buying.`,
			},
			{
				q: "How do I get between cities without a car?",
				a: `Two main options: InterCity Buses, which run air-conditioned coaches between Limassol, Larnaca, Paphos, and Ayia Napa on published timetables (fares ${eur(INTERCITY_FARE.min)} to ${eur(INTERCITY_FARE.max)} one way), and shared taxis, which run 8-seater minibuses with near-door-to-door pickup from around €11 per person. Check intercity-buses.com for current schedules.`,
			},
			{
				q: "Can I get a bus from Larnaca or Paphos airport?",
				a: `Yes, from both. Larnaca Airport is served by Route 425 into the city centre (${eur(LARNACA_BUS.singleCash)} cash, ${eur(LARNACA_BUS.singleCard)} by Motion card), and Paphos Airport by routes 612 and 613 (${eur(PAPHOS_BUS.single)}). Night services at both airports carry a surcharge. The airport-transfers-guide covers private shuttle and taxi options alongside the buses.`,
			},
		],
	},
];
