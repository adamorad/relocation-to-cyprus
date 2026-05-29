/**
 * Long-form relocation guides. Written for search engines + real readers
 * deciding whether to move to Cyprus. Each guide is ~1000 words.
 *
 * Disclaimer: this is general information, not legal or tax advice. Specific
 * thresholds, deadlines and fees change frequently — always verify with the
 * Cyprus Tax Department, Civil Registry & Migration Department, and a local
 * accountant or lawyer before acting.
 */

export type GuideInfo = {
  slug: string;
  title: string;
  /** URL: /guides/{slug}. */
  description: string;
  sections: Array<{ heading: string; body: string }>;
};

export const GUIDES: ReadonlyArray<GuideInfo> = [
  {
    slug: "residency-and-visas",
    title: "Cyprus residency and visa options for relocators (2026 guide)",
    description:
      "What kind of permit you actually need to move to Cyprus — Permanent Residency by Investment, the Digital Nomad Visa, EU registration, and more.",
    sections: [
      {
        heading: "Why Cyprus has multiple paths",
        body: "Cyprus offers an unusually wide spread of residency options because it has tried hard, for the last decade, to attract residents in three distinct buckets: wealthy non-EU buyers (the Permanent Residency by Investment route), remote workers and freelancers (the Digital Nomad Visa), and EU citizens moving for work or lifestyle (which technically isn't a visa at all, just a registration). Each route has its own minimum thresholds and trade-offs, and the right one depends almost entirely on your passport and what you intend to do with your days. The good news: Cyprus is one of the easier EU member states to relocate to legally, and the immigration department in Nicosia is broadly responsive to well-prepared applications.",
      },
      {
        heading: "Permanent Residency by Investment (the property route)",
        body: "The most common path for non-EU buyers is the Permanent Residency by Investment programme — historically called Category F, currently regulated under Regulation 6(2) of the Aliens and Immigration Regulations. The headline requirement is a real-estate purchase of at least €300,000 (excluding VAT) in a newly-built residential property, paid via bank transfer from a Cypriot account. You also need to demonstrate annual income of at least €50,000 from sources outside Cyprus, plus an additional €15,000 for a spouse and €10,000 per dependent child. There is no minimum stay requirement once granted — you only need to visit Cyprus once every two years to keep the permit alive — which is what makes it popular with families who plan to keep one foot somewhere else for tax or schooling reasons. The permit covers spouse and unmarried children up to 25 if financially dependent, and it does not directly lead to citizenship: that's a separate naturalisation track that requires seven years of legal residence with most of the time physically spent in Cyprus.",
      },
      {
        heading: "Digital Nomad Visa",
        body: "Cyprus introduced its Digital Nomad Visa in late 2021 and significantly expanded it in 2024. It targets non-EU nationals who work remotely for foreign employers or as freelancers serving non-Cyprus clients. The minimum income requirement is €3,500 per month net (after tax, social contributions and any other deductions), increased by 20% for a spouse and 15% per dependent child. The visa is issued for one year, renewable for up to three years, and gives you full residency rights including the ability to bring family members. Crucially, after 183 days in Cyprus during a tax year, you become a Cyprus tax resident — which can be either an advantage (Cyprus has favourable tax treatment for foreign-sourced income and a tax-free dividend regime for non-domiciled residents) or a disadvantage (you may have new filing obligations in Cyprus), depending on your home country's tax treaty and your specific situation. The application is processed through the Civil Registry and Migration Department; expect about 5–8 weeks if your documents are clean.",
      },
      {
        heading: "EU citizens and family members",
        body: "If you hold an EU passport, you do not need a visa to live in Cyprus. After 90 days of continuous presence, you must register your residence with the Civil Registry — they issue a Registration Certificate (often called an MEU1 or yellow slip, though the slip itself is now blue). The requirements are minimal: proof of accommodation (a rental contract or property deed), proof of health insurance or registration with the General Healthcare System (GeSY), and either proof of employment or proof of sufficient funds (typically the same €30,000–€40,000 per year as a self-supporting resident). EU registration is permanent — there is no expiry date — and after five years of continuous legal residence you qualify for the Long-term Residence permit, which carries near-identical rights to citizenship.",
      },
      {
        heading: "Practical advice",
        body: "Three pieces of advice that come up consistently in expat forums. First, do not rely on a tourist entry to scout property and then formalise the residency later — both the PR and digital nomad visas require you to apply from outside Cyprus or via a specific in-country procedure, and people get bounced back to their home country surprisingly often if they apply wrong. Second, work with a local lawyer for any property-based application — fees of €1,500–€3,000 are normal, the paperwork is genuinely intricate, and a botched application can delay things by a year. Third, keep originals of every document you used in the application. Cyprus immigration is paper-heavy and a request to re-prove your income from three years ago is not unusual at renewal.",
      },
    ],
  },
  {
    slug: "cost-of-living",
    title: "Cost of living in Cyprus — what relocators actually spend (2026)",
    description:
      "Realistic monthly budgets for Limassol, Paphos, Larnaca and Nicosia — rent, utilities, food, schooling, healthcare and transport.",
    sections: [
      {
        heading: "How the regions compare",
        body: "Cost of living in Cyprus splits sharply by region. Limassol is the most expensive city by a meaningful margin — about 30 to 50 percent more expensive than Larnaca, Paphos or Nicosia for equivalent housing. The other three cities are surprisingly close to each other on most metrics, with Paphos slightly cheaper for property purchase, Larnaca slightly cheaper for groceries and Nicosia slightly cheaper for everything except restaurants. Rural villages can be a third cheaper again, with the trade-off of needing two cars per household and longer drives to schools and hospitals. The cheapest region overall is the Famagusta free area outside the summer months, when resort pricing inflates everything from coffee to taxis.",
      },
      {
        heading: "Rent and utilities",
        body: "A two-bedroom apartment in a modern building (built in the last ten years, balcony, parking, walking distance to amenities) runs roughly: Limassol €1,400–€2,200, Larnaca €900–€1,400, Paphos €850–€1,400, Nicosia €900–€1,500. Sea-view tower apartments in Limassol's seafront strip push past €3,000 easily. Electricity in Cyprus is notoriously expensive — the EAC (Electricity Authority) is a state monopoly and a hot Cypriot summer with the AC on can produce a €350–€450 bill for a two-bedroom flat, billed every two months. Water is comparatively cheap (under €30 per month for most households). Internet is fast and reliable — 1 Gbps fibre packages run €40 to €60 per month with most providers — and mobile data is among the cheapest in the EU at €15 to €25 for an unlimited plan.",
      },
      {
        heading: "Food, restaurants and groceries",
        body: "A weekly supermarket shop for a family of four lands around €120 to €180. The main chains — Sklavenitis, Lidl, Alphamega, Metro — cover the spectrum from value to premium. Imported brands carry a real premium (think 30–50% over equivalent UK or German pricing) but Cypriot produce is cheap and excellent: tomatoes, courgettes, watermelon, halloumi, olive oil and most fish are roughly half what you'd pay in northern Europe. Restaurant prices are reasonable but trending up: a sit-down meze dinner for two with a bottle of wine is €60 to €90 outside the touristy areas, €100 to €150 inside them. The lunch menus, where they exist, are exceptional value — €10 to €15 for two courses including coffee at a normal weekday restaurant in any of the four cities.",
      },
      {
        heading: "Healthcare and schooling",
        body: "Cyprus's public General Healthcare System (GeSY) covers all residents and is genuinely usable — primary care, specialists, prescriptions and most hospital procedures are free or have small co-payments. Most relocators also keep a private health insurance plan (€800 to €2,500 per adult per year depending on age and coverage) for faster access to specialists and private hospitals. Private hospitalisation is meaningfully cheaper than the UK or US — a normal childbirth runs around €2,500–€4,000 at a top private hospital, MRIs around €350, dental cleanings around €60. International schooling is where the budget gets serious: expect €5,000–€10,000 per child per year at the cheaper end (Paphos, Larnaca), and €10,000–€18,000 at the established Limassol and Nicosia schools. Public school is free and rapidly improving its English-medium programming, but most established relocators still default to private for secondary years.",
      },
      {
        heading: "Transport and the realistic monthly budget",
        body: "Cyprus is a car culture. Public transport is functional within Limassol and Nicosia and almost non-existent everywhere else; outside the cities a car is essentially mandatory. Used cars are cheap by EU standards (a 2018 Toyota Yaris is €7,000–€9,000) but new cars carry significant registration tax. Petrol runs around €1.40 per litre. Putting it all together, a realistic monthly budget for a family of four living comfortably (two-bed apartment in a non-towering complex, one car, private school for one child, both adults working): Limassol €4,500–€6,000, Larnaca/Paphos/Nicosia €3,200–€4,500. A retired couple in Paphos or Larnaca living modestly can do well on €2,500–€3,000 per month. Add €500–€1,000 if you want to eat out frequently or run a second car.",
      },
    ],
  },
  {
    slug: "taxes-for-expats",
    title: "Taxes for relocators in Cyprus — the non-dom regime and what it means",
    description:
      "How Cyprus's tax system works for new residents — the famous non-domiciled rules, the tax-free income band, capital gains and crypto.",
    sections: [
      {
        heading: "The headline: why Cyprus attracts tax migrants",
        body: "Cyprus's tax system has become a quietly important reason that wealthy non-EU and EU professionals consider relocating to the island. The headline features are three: a 0% personal income tax band on the first €19,500 of annual income, a flat 12.5% corporate tax rate (one of the lowest in the EU), and most importantly the non-domiciled (non-dom) regime, which exempts new residents from any tax on dividends, interest income, and most foreign-sourced passive income for up to 17 years. For someone whose income is largely derived from investments, dividends or a foreign company, Cyprus can plausibly be the most tax-efficient EU country to be tax resident in, by a wide margin. The catch is that you need to actually become tax resident, and the recent rules around tax residency are stricter than the marketing brochures suggest.",
      },
      {
        heading: "Becoming a Cyprus tax resident",
        body: "There are two ways to qualify as a Cyprus tax resident. The classic test is the 183-day rule: if you spend more than 183 days in Cyprus during a calendar year, you are tax resident for that year. The second is the 60-day rule introduced in 2017, designed specifically to attract high earners who travel: you can be tax resident with only 60 days in Cyprus provided you (a) do not spend more than 183 days in any other country in the same year, (b) are not tax resident anywhere else, (c) have a permanent residence in Cyprus (rented or owned), and (d) carry on business or employment in Cyprus, including holding an office in a Cyprus-resident company. The 60-day rule is what makes Cyprus genuinely attractive to globally mobile entrepreneurs, but it is also where most tax-residency disputes happen — the Cyprus Tax Department has tightened audit on the 60-day applications, and you need real substance to defend it.",
      },
      {
        heading: "The non-dom regime in detail",
        body: "Non-dom status is automatic for tax residents who have been domiciled outside Cyprus, which in practice means almost every relocator. Once you are a Cyprus tax resident and a non-dom, the following income types are completely exempt from Cyprus tax: dividends received from anywhere in the world, interest received from anywhere, rental income from properties outside Cyprus (though you still pay Cyprus's GeSY healthcare contribution on it — 2.65%), capital gains on shares and securities, and most types of capital gains on property outside Cyprus. The non-dom regime lasts for 17 of the 20 tax years following your relocation, so it is genuinely long-term. For employment income earned in Cyprus, you pay regular Cypriot income tax (0% on the first €19,500, scaling up progressively to 35% above €60,000), and for self-employment income earned in Cyprus the same. There is a special 50% income tax exemption for new residents earning more than €100,000 per year from Cypriot employment for the first 17 years.",
      },
      {
        heading: "Capital gains, property and crypto",
        body: "Cyprus capital gains tax applies only to gains on Cypriot real estate and on shares of companies that hold Cypriot real estate. The rate is 20% on the gain, with several lifetime exemptions (€85,430 for a primary residence sold once in your lifetime, smaller exemptions for agricultural land and gifts to family). All other capital gains — including foreign property, all listed shares, all private company shares (unless they hold Cypriot real estate), gold, crypto — are completely tax-free. Crypto is the source of significant uncertainty: Cyprus has not yet released formal guidance on whether crypto trading by individuals is taxable income (most accountants currently treat occasional disposals as exempt capital gains, and active day-trading as taxable self-employment income), and this is the single biggest tax question relocators should pin down with a local accountant before assuming the position.",
      },
      {
        heading: "Filing, deadlines and getting it right",
        body: "Cyprus's tax year is the calendar year. Individual tax returns (Form TD1) are due by 31 July of the following year if you file electronically — the deadline used to be later but was tightened in 2024. The forms are not complex by EU standards, but the non-dom and 60-day declarations need to be made affirmatively each year, and the Tax Department has increasingly asked for travel-day records, accommodation contracts and economic-substance evidence to support 60-day claims. An accountant fee for a non-dom individual return runs €400–€900 per year, which is money well spent — DIY filing is technically possible but the cost of getting the non-dom claim wrong is large. The final pragmatic note: Cyprus has double-tax treaties with over 65 countries including the UK, Germany, France, India, Russia, South Africa and most of the EU, so relocators rarely face actual double-taxation; they face complexity. The cleanest move is to settle your prior-country tax exit properly before claiming Cyprus residency, rather than trying to do both at once.",
      },
    ],
  },
  {
    slug: "arrival-checklist",
    title: "Moving to Cyprus: your first-month checklist (2026)",
    description:
      "The exact steps to take in weeks 1–4 after arriving in Cyprus — in the right order, with the dependency logic explained so you don't hit each bureaucratic wall by surprise.",
    sections: [
      {
        heading: "Week 1: SIM card, temporary address, and booking your registration appointment",
        body: "The moment you land, buy a Cypriot SIM from the airport arrivals hall — Epic and Cyta both have desks there, and €15 gets you a 30-day unlimited data plan. You need a local number for almost every next step. Your temporary address — a hotel, serviced apartment, or a friend's address — matters too: it's the address on your first official documents, and several later steps require a document sent there. Book your Civil Registry appointment immediately. EU citizens need this for the MEU1 registration (the Yellow Slip); non-EU citizens need it to start the Alien Registration Certificate (ARC) process. Appointment slots at crmd.moi.gov.cy typically fill 2–3 weeks out, so booking on day one means you won't lose three weeks waiting. You can book before you arrive.",
      },
      {
        heading: "Week 1–2: Opening your bank account",
        body: "A Cypriot bank account is the hardest practical step in the first month, and the one that blocks the most other things — landlords require a local IBAN, utility direct debits require one, and some tax filings do too. Bank of Cyprus and Hellenic Bank are the main retail options; both require proof of address, proof of income or source of funds, and a valid immigration document (Yellow Slip, ARC, or a letter confirming your application is in progress). Bring every financial document you own to your first appointment. Expect 2–4 weeks from first contact to a functioning account. In the meantime: Revolut and Wise work as a bridge for day-to-day spending and EUR transfers, but they cannot substitute for a CY-prefix IBAN for deposits and bills. Non-EU applicants with complex fund sources should also look at AstroBank, which has historically been more accommodating for non-standard profiles. See our full Banking Guide for a decision tree by profile.",
      },
      {
        heading: "Week 2–3: Civil Registry appointment — Yellow Slip or ARC",
        body: "EU citizens: bring your passport, proof of accommodation, proof of health insurance (or a note that you're registering for GeSY), and proof of income or employment (or sufficient funds — typically bank statements showing €30,000+ per year). The officer issues the Registration Certificate, sometimes still called the Yellow Slip. It's permanent and does not expire. Non-EU citizens: the ARC (Alien Registration Certificate) process is longer and requires your immigration permit document (tourist visa stamp, approved DNV, or PR permit letter), two passport photos, and proof of address. Depending on your permit type, the ARC takes 4–10 weeks to issue; you receive a receipt that serves as your interim document. Either way, the Civil Registry appointment is the single most important step in month one — everything downstream (bank, GeSY, utilities) becomes smoother once you have a registration number.",
      },
      {
        heading: "Week 3–4: GeSY, utilities, and broadband",
        body: "Register with GeSY (General Healthcare System) at hio.org.cy — you need your ARC or Yellow Slip number. Registration gives you access to free or subsidised primary care, GP referrals, and most hospital procedures with small co-payments. It's worth registering even if you also carry private health insurance, since it costs nothing and provides emergency coverage. Electricity (EAC) and water are set up through your landlord's transfer — your letting agent handles the paperwork, but you provide your passport and ARC/Yellow Slip. Plan ahead: EAC connections take 2–5 working days. Broadband: Cablenet, Primetel, Epic and Cyta all offer 300–1000 Mbps fibre for €40–60/month; order on your first day in the apartment since installation typically takes 5–10 working days. For the gap period, your mobile data SIM (from week one) and most landlords' existing WiFi get you through.",
      },
      {
        heading: "Month 1–2: Driving licence, Tax Identification Number, and getting settled",
        body: "EU licence holders: your EU driving licence is valid in Cyprus indefinitely — no exchange needed, though you may want to record it with the Traffic Department eventually. Non-EU licence holders must exchange within 6 months of becoming a Cyprus resident. The Traffic Department offices in Nicosia and Limassol handle this; book the appointment alongside your Civil Registry appointment since both have similar wait times. Your Tax Identification Number (TIC) can be obtained at any Tax Department district office; bring your passport and ARC/Yellow Slip. You'll need it for employment, self-employment, and for filing as a non-dom resident. Separately: if you're bringing a car from abroad, the import process involves the Customs Department and Vehicle Registration Office and typically takes 3–8 weeks — budget this into your timeline if you're shipping a vehicle rather than buying locally.",
      },
    ],
  },
  {
    slug: "moving-to-cyprus-with-pets",
    title: "Moving to Cyprus with your pet: import rules by country (2026)",
    description:
      "The exact requirements for bringing a dog or cat to Cyprus — covering EU passport holders, post-Brexit UK residents, and non-EU countries including Israel, the US and the UAE — with backwards-planning timelines so you don't miss a step.",
    sections: [
      {
        heading: "Why Cyprus pet import is stricter than most EU entry",
        body: "Cyprus is an island, and like all island EU member states (Ireland, Malta, Finland for ferries) it enforces stricter border biosecurity than most continental EU countries. All animals must enter via an approved port of entry — Larnaca International Airport, Paphos International Airport, or Limassol Port — and must be presented to the Veterinary Services of Cyprus officer on arrival, who checks microchip, documentation and (where applicable) serology records. The process at Larnaca typically takes 30–60 minutes and is routine if your paperwork is complete. The rules have not changed materially since Cyprus's EU accession, but the UK's post-Brexit status and the growing number of non-EU relocators (particularly from Israel, the UAE, and the US) have made the non-EU routes more commonly navigated. Start early — the most common mistake is discovering a 3-month waiting period after the titre test when you are already committed to a move date.",
      },
      {
        heading: "EU pet passport holders: the simplest route",
        body: "If your pet has a valid EU pet passport issued in any EU member state (including Cyprus), entry is straightforward: the passport must show a microchip implanted before or on the same day as the first rabies vaccination, a valid rabies vaccination (within the manufacturer's stated validity period, typically 1–3 years), and the vet's stamp confirming the pet is fit to travel. No titre test, no waiting period, no quarantine. At the arrival counter, the Veterinary Services officer scans the microchip, checks the passport matches, and clears the animal. If your EU passport has expired (e.g. the rabies booster is overdue), get the booster at least 21 days before travel — the 21-day post-vaccination waiting period applies even within the EU if the animal has been unvaccinated for a period.",
      },
      {
        heading: "Post-Brexit UK pets: the 21-day trap",
        body: "UK-issued pet passports have not been valid for EU entry since January 2021. UK pets now need an Animal Health Certificate (AHC) instead. The AHC is issued by a UK government-authorised vet (RCVS-listed), must be issued within 10 days of the travel date, and the rabies vaccination recorded in the AHC must have been administered at least 21 days before the AHC issue date. This creates the trap: if your pet's rabies booster is due or you are getting a new vaccination, you cannot travel within 21 days of that vaccination. Many UK residents preparing a last-minute move — especially those making the decision in September for a Christmas arrival — get caught by this. Build 21 days of post-vaccination time into your timeline before you book flights. The AHC also records the microchip number; the chip must have been implanted before or on the vaccination date. Your vet in Cyprus will re-issue an EU pet passport at the first routine appointment, which then serves for future travel.",
      },
      {
        heading: "Non-EU countries (Israel, UAE, US and others): titre test and timeline",
        body: "The EU classifies third countries into listed and unlisted categories; most non-EU countries relocators come from fall into Part 2 (listed, additional requirements apply). These requirements typically include: microchip (implanted first), a valid rabies vaccination administered after the microchip was implanted, a rabies antibody titre test (blood test confirming the vaccination is effective, conducted at an EU-approved laboratory), and a waiting period of at least 3 months from the date the titre test result meets the required threshold (≥0.5 IU/ml) before the animal can enter the EU. For Israel specifically: Israel is a listed Part 2 country. The titre test is required. The 3-month wait after a qualifying titre test result is mandatory — there is no way to shorten it. A health certificate issued by an Israeli government vet replaces the EU pet passport for entry; Cyprus's Veterinary Services check the certificate and titre test documentation at arrival. For US and UAE pets: same requirements apply. Titre tests must be done at an EU-approved laboratory (the list is maintained by the European Commission — search 'approved serology laboratories EU pet travel'); results take 2–4 weeks to process. Start the process at minimum 4–5 months before your planned move date.",
      },
      {
        heading: "Backwards-planning timeline and arrival at Cyprus",
        body: "Here is how to plan backwards from a target move date. For UK residents: confirm your pet's rabies vaccination status → if a booster is needed, book it at least 21 days before you want the AHC issued → book the AHC appointment within 10 days of your travel date → book an approved port of entry arrival and notify Veterinary Services of Cyprus at least 24 hours in advance via vetservices.gov.cy. For non-EU residents (Israel, US, UAE): confirm microchip exists → confirm rabies vaccination is current and was administered after the microchip → book titre test at an approved lab → wait for result (allow 4 weeks) → if result passes, note that date → you cannot enter Cyprus until 3 months after that date → within that window, arrange the government-issued health certificate → notify Veterinary Services of Cyprus 24–48 hours before arrival. Cyprus Veterinary Services (vetservices.gov.cy) publishes the current import declaration forms; download and complete them before travel. The officer at Larnaca or Paphos will check: microchip (physical scan), vaccination record, titre test documentation if applicable, and health certificate. The process is methodical and takes 30–90 minutes depending on traffic. Keep all original documents — do not submit originals to the officer, only copies; the officer signs your copies.",
      },
    ],
  },
  {
    slug: "banking-in-cyprus",
    title: "Opening a bank account in Cyprus — the practical reality (2026)",
    description:
      "Which banks take new residents, what documents you actually need, realistic timelines, and why Revolut is a bridge not a replacement.",
    sections: [
      {
        heading: "Why bank accounts take longer than you expect",
        body: "Every relocator to Cyprus underestimates the bank account. The common assumption is that it takes a week — you show up with your passport, they open an account, you get a card. The reality, since the post-2022 KYC and AML tightening across Cypriot banking, is materially different. The Central Bank of Cyprus and the European Banking Authority have significantly increased compliance requirements on all retail banks, meaning every new account requires a full know-your-customer file: verified identity, verified address, verified source of funds, and a completed anti-money-laundering questionnaire. From first appointment to a functioning account with a card, 2–4 weeks is the realistic timeline. Some applicants take 6–8 weeks. The document list is longer than any bank's website advertises, the branch staff are often helpful but constrained by compliance rules they cannot override, and the most common bottleneck is incomplete documentation at the first meeting — which resets the clock. Set your expectations before you arrive, not after.",
      },
      {
        heading: "What documents you actually need",
        body: "Banks in Cyprus will ask for, at minimum: a valid passport, your ARC (Alien Registration Certificate) or Yellow Slip (EU citizens), TWO separate proofs of address — a utility bill or signed and stamped lease agreement; hotel invoices and serviced apartment confirmations are explicitly rejected by most branches — and documented proof of source of funds, typically three months of payslips from an employer, or three months of company bank statements if self-employed. You will also complete an AML questionnaire at the branch, which asks about the nature of your income, expected transaction volumes, and business relationships. The practical tip most relocators learn too late: bring original documents AND certified copies of everything. Banks are required to copy and verify originals but cannot keep originals, so if you bring only originals you will be asked to return with copies, which adds another week. Certifications can be done by a local notary in Cyprus for €15–€25 per document.",
      },
      {
        heading: "Bank of Cyprus and Hellenic Bank: the standard path",
        body: "Bank of Cyprus and Hellenic Bank are the two main retail banks and the default recommendation for most new residents. Both offer full English-language service, online banking in English, and standard retail products (current account, debit card, online transfers). For expats, the most highly regarded branches are the Limassol Marina branch of Bank of Cyprus and the Makarios Avenue branch of Hellenic Bank in Limassol — both have staff experienced with international account openings and shorter average processing times for new-resident applications. Outbound wire transfer fees run €15–€25 per transfer at both banks; SEPA transfers within the Eurozone are cheaper at around €2–€5. Account opening typically takes 2–4 weeks from your first appointment to account activation, and debit cards are issued and shipped separately — typically 1–2 weeks after account activation. Do not assume you will have a card on the day the account activates. Plan for two separate waits.",
      },
      {
        heading: "AstroBank: worth knowing for non-EU and complex profiles",
        body: "AstroBank — formerly Arab Jordan Investment Bank Cyprus, rebranded in 2016 — is the third name that experienced relocators mention, and it is specifically relevant if you have a non-EU passport or a complex source-of-funds profile. Historically, AstroBank has been more accommodating for applicants from MENA, CIS, and South Asian countries whose profiles Bank of Cyprus or Hellenic may decline at the compliance stage. This is not a reflection on the legitimacy of those profiles — it is a reflection of each bank's risk appetite and their established compliance frameworks for different geographic profiles. AstroBank has a smaller branch network than the main two (Limassol, Nicosia, Larnaca are covered), but the account-opening success rate for applications that the bigger banks reject is meaningfully higher. Fees are broadly comparable. If your profile is non-standard — dual nationality, foreign company income, source-of-funds documentation in a non-EU context — contact AstroBank in parallel with your other applications, not as a fallback after the others decline.",
      },
      {
        heading: "Revolut and Wise as a bridge — but not a substitute",
        body: "Revolut and Wise both work from day one for day-to-day spending, receiving EUR transfers, and saving on exchange rates versus bank wire fees. Many relocators lean heavily on one or both during the 2–4 week account-opening period. However, they cannot substitute for a Cypriot bank account in three important ways: landlords require a CY-prefix IBAN for deposit payments and often for ongoing rent — a LT-prefix (Revolut Lithuania) or BE-prefix (Wise Belgium) IBAN is frequently rejected; utility direct debits require a domestic IBAN in many cases; and certain tax and non-dom filings require a verifiable Cypriot bank account on record. Use Revolut and Wise as your spending account while the traditional account application processes — they are genuinely useful for that — but treat them as a bridge, not a destination. For sign-up: Revolut's referral link (revolut.com/referral) and Wise's referral (wise.com/invite) both offer fee-free transfers for the first period after sign-up, which is worth using given you will likely be making international transfers during your relocation.",
      },
    ],
  },
];

export function guideBySlug(slug: string): GuideInfo | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
