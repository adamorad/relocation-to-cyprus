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
  faqs?: Array<{ q: string; a: string }>;
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
    faqs: [
      {
        q: "Can I get Cyprus residency by buying property?",
        a: "Yes. The standard route is the Category F permanent residency permit, which requires purchasing property worth at least €300,000 (VAT included) and proving a secured annual income from abroad of at least €30,000. The permit is granted within 2–3 months and grants permanent residency — not citizenship — to the buyer and immediate family.",
      },
      {
        q: "How long does the Cyprus Digital Nomad Visa take to process?",
        a: "The Digital Nomad Visa (MEU1 temporary residency) typically takes 4–8 weeks to process once a complete application is submitted to the Civil Registry and Migration Department. You must apply from within Cyprus on a valid tourist entry, and your income must be at least €3,500/month net from clients outside Cyprus.",
      },
      {
        q: "Do I need to physically live in Cyprus to keep my residency?",
        a: "For permanent residency under Category F, you must visit Cyprus at least once every two years to avoid the permit being considered abandoned. EU citizens under the MEU1 system must not be absent for more than 12 consecutive months. Digital Nomad Visa holders must maintain active residency during their permit period.",
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
    faqs: [
      {
        q: "How much does it cost to rent a 2-bedroom flat in Limassol?",
        a: "A modern 2-bedroom apartment in Limassol city ranges from €1,400–€2,200/month depending on proximity to the seafront and building quality. New-build developments in Limassol's prime areas (Germasogeia, Neapolis) typically start at €1,600/month. Older stock further inland can be found from €1,000/month.",
      },
      {
        q: "Is Cyprus more expensive than Portugal for expats?",
        a: "Cyprus and Portugal are broadly similar in overall cost, but differ by category. Rent in Limassol and Paphos is typically 15–25% higher than Lisbon outside the city centre. Groceries and dining are cheaper in Cyprus. Healthcare is comparable. Tax treatment differs significantly: Cyprus's non-dom regime exempts foreign-source dividends and interest, making it more attractive than Portugal's NHR scheme for investment income.",
      },
      {
        q: "What is a realistic monthly budget for a couple relocating to Cyprus?",
        a: "A comfortable lifestyle for two people in Limassol — 2-bedroom apartment, eating out 3–4 times per week, a car, and private health insurance — costs €4,500–€6,000/month all-in. In Paphos or Larnaca the same lifestyle runs €3,500–€4,500/month. These figures exclude mortgage payments and school fees.",
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
    faqs: [
      {
        q: "What is the Cyprus non-dom regime?",
        a: "The non-domiciled (non-dom) resident status exempts qualifying individuals from the Special Defence Contribution (SDC) — a 17% tax on dividends and 30% tax on interest — for 17 years from becoming a Cyprus tax resident. To qualify you must become a Cyprus tax resident and must not have been a Cyprus tax resident for 20 or more of the preceding 25 years. Effectively, foreign-source dividends and interest are received entirely tax-free.",
      },
      {
        q: "How do I become a Cyprus tax resident?",
        a: "You become a Cyprus tax resident either by spending more than 183 days in Cyprus in a calendar year, or under the '60-day rule': spending at least 60 days in Cyprus, not spending more than 183 days in any other single country, and having a permanent home and business or employment in Cyprus. The 60-day rule was introduced specifically to accommodate internationally mobile entrepreneurs and investors.",
      },
      {
        q: "Does Cyprus tax foreign pension or employment income?",
        a: "Foreign pension income remitted to Cyprus is taxed at a flat 5% rate above a €3,420 annual exemption (alternatively taxed at normal rates if lower). Foreign employment income earned for work performed outside Cyprus by a non-dom resident is exempt from Cyprus income tax. Cyprus has double-tax treaties with over 65 countries, which further reduce withholding taxes on cross-border income.",
      },
    ],
  },
];

export function guideBySlug(slug: string): GuideInfo | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
