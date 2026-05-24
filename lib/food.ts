/**
 * Food section content. Consumed by components/FoodPanel.tsx.
 *
 * Curation philosophy: places are sourced from local Cypriot food blogs
 * and press (cypruseats, artandthensome, mycyprustravel, Cyprus Mail
 * lifestyle, in-cyprus), not TripAdvisor top-tourist lists. Prices and
 * event dates reflect 2026 settings. Verify before publishing — this is
 * editorial recommendation, not a directory.
 */

export type City =
  | "Limassol"
  | "Paphos"
  | "Larnaca"
  | "Nicosia"
  | "Ayia Napa";

export type Category =
  | "breakfast"
  | "snack"
  | "lunch"
  | "dinner"
  | "sweets";

export type Place = {
  name: string;
  neighbourhood?: string;
  why: string;
  /** Price band: 1=€ (<€10pp), 2=€€ (€10–25), 3=€€€ (€25–50), 4=€€€€ (>€50). */
  price: 1 | 2 | 3 | 4;
  instagram?: string;
};

export type FoodEvent = {
  name: string;
  dates: string;
  city: string;
  description: string;
  url: string;
};

export type Creator = {
  name: string;
  handle: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "Blog";
  url: string;
  focus: string;
};

export type PriceRow = {
  dish: string;
  minEuros: number;
  maxEuros: number;
  note?: string;
};

export type PitaInfo = {
  name: string;
  description: string;
  texture: string;
  uses: string;
};

export const PITA_COMPARISON: {
  greek: PitaInfo;
  cypriot: PitaInfo;
  israeli: PitaInfo;
} = {
  greek: {
    name: "Greek pita",
    description:
      "Pillowy flatbread, no pocket. Around 8–10 mm thick. Wrapped around the meat rather than stuffed into it. The topping side gets oiled and finished on a plancha so it picks up a little colour before serving.",
    texture: "Soft, slightly chewy, mildly sweet from a touch of yeast.",
    uses: "Wrapping souvlaki and gyros. Sometimes torn and used to mop tzatziki.",
  },
  cypriot: {
    name: "Cypriot pita",
    description:
      "Pocket bread — smaller, drier, with a hollow interior designed to be slit open and stuffed. Closer to a Lebanese/Levantine pita than to a Greek one. Sold in supermarkets as 'arabikies' alongside the round Greek ones.",
    texture: "Drier than Greek pita, slightly crisp at the edges, holds shape when filled.",
    uses: "The standard vehicle for souvlaki and sheftalia in Cyprus. Also stuffed at home for cold lunches.",
  },
  israeli: {
    name: "Israeli pita",
    description:
      "Closest cousin to Cypriot pita — pocket bread, slightly larger, sometimes wholewheat. Included as a reference point for Israeli readers: if you know Israeli pita, you basically know Cypriot pita.",
    texture: "Similar to Cypriot; slightly softer crumb in the wholewheat version.",
    uses: "Falafel, sabich, schwarma. Doesn't appear on Cypriot menus but you'll find it in the larger supermarkets.",
  },
};

export type NameRow = {
  term: string;
  origin: string;
  whatItIs: string;
  inCyprus: string;
};

export const NAME_GUIDE: ReadonlyArray<NameRow> = [
  {
    term: "Souvlaki",
    origin: "Greek",
    whatItIs:
      "In northern Greece: the whole wrapped pita with the meat + tomato + onion + tzatziki + chips inside. In Athens: just the meat skewer itself, and the wrapped pita is called 'pita-souvlaki' or 'kalamaki'.",
    inCyprus:
      "Always the wrapped Cypriot-pita parcel with chunks of grilled pork or chicken, plus tomato, onion, parsley and a small drizzle of yoghurt. No chips inside unless you ask.",
  },
  {
    term: "Gyros",
    origin: "Greek",
    whatItIs:
      "Shaved spit-roasted meat (usually pork or chicken) carved off a vertical rotisserie. Greek cousin of döner and shawarma. Wrapped in a Greek-style pita.",
    inCyprus:
      "Common in Cyprus, especially in Limassol and Nicosia. Served in Cypriot pocket pita rather than the Greek flatbread, so it looks more like a sandwich than a wrap.",
  },
  {
    term: "Sheftalia",
    origin: "Cypriot",
    whatItIs:
      "Cypriot-specific. Hand-rolled minced pork (sometimes mixed with lamb) wrapped in caul fat and grilled over charcoal. Loose-textured, herbal, smoky from the fat melting.",
    inCyprus:
      "The single most Cypriot street-food item. If you only try one local thing, try this. Almost always served as 'sheftalia pita' alongside or instead of souvlaki.",
  },
  {
    term: "Kebab",
    origin: "Middle Eastern / Turkish",
    whatItIs:
      "Confusing word — internationally means a lot of different things. In Cyprus 'kebab' on a menu usually means the same wrapped-pita parcel as souvlaki, but with the meat in larger chunks or minced (köfte-style).",
    inCyprus:
      "Order 'kebab' and you'll usually get the same Cypriot-pita format. If you want the Turkish-style döner shaved meat, ask for 'döner' or 'gyros'.",
  },
  {
    term: "Döner",
    origin: "Turkish",
    whatItIs:
      "Shaved spit-roasted meat from a vertical rotisserie. Same physical preparation as gyros and shawarma — just the Turkish name for it.",
    inCyprus:
      "You'll see it on menus near Larnaca and the north (and in the Turkish-administered area). Functionally identical to gyros in most Cypriot kitchens.",
  },
  {
    term: "Shawarma",
    origin: "Levantine (Lebanese / Israeli / Syrian)",
    whatItIs:
      "The Arabic-tradition version of the same shaved-spit meat. Usually leaner cuts, often with tahini or amba sauce, different spice profile (cumin / sumac / cardamom).",
    inCyprus:
      "Found in Lebanese and Israeli restaurants in Limassol and Nicosia. Authentic spots use Lebanese flatbread or a wrap, not Cypriot pita.",
  },
];

export const PRICE_TABLE: ReadonlyArray<PriceRow> = [
  { dish: "Souvlaki pita (pork or chicken)", minEuros: 3.5, maxEuros: 5.5 },
  { dish: "Sheftalia pita", minEuros: 4, maxEuros: 6 },
  { dish: "Gyros pita", minEuros: 3.5, maxEuros: 5 },
  {
    dish: "Mixed grill plate (kebab + sheftalia + chips + salad)",
    minEuros: 12,
    maxEuros: 18,
  },
  { dish: "Halloumi & lountza sandwich", minEuros: 4, maxEuros: 7 },
  {
    dish: "Frappe (iced coffee)",
    minEuros: 2.5,
    maxEuros: 4.5,
    note: "Cheaper inland, dearer on the seafront",
  },
  { dish: "Freddo cappuccino", minEuros: 3, maxEuros: 5 },
  {
    dish: "Loukoumades (8–10 pieces)",
    minEuros: 4,
    maxEuros: 7,
    note: "More with chocolate / pistachio toppings",
  },
  { dish: "Koupes (2 pieces)", minEuros: 2, maxEuros: 4 },
  {
    dish: "Full meze for two at a tavern",
    minEuros: 50,
    maxEuros: 90,
    note: "20+ small plates, often with wine included",
  },
];

export type CypriotFood = {
  name: string;
  description: string;
};

export const CYPRIOT_FOODS: ReadonlyArray<CypriotFood> = [
  {
    name: "Halloumi",
    description:
      "The famous one. PDO-protected since 2021, traditionally made from a mix of sheep and goat milk (look for 'παραδοσιακό' / 'traditional' on the label — the supermarket cow-milk version is a different product). Squeaky when cooked, holds its shape on a grill, brined to keep. Eaten grilled in salads, fried in halloumi-bread, melted onto pasta, or sliced cold for breakfast.",
  },
  {
    name: "Sheftalia",
    description:
      "Already in the naming guide above, but worth repeating: hand-rolled minced pork (often with parsley, onion, cinnamon) wrapped in caul fat and charcoal-grilled. The caul fat melts as it cooks, basting the meat from inside out. Loose-textured, smoky, herbal. Best eaten freshly off the grill at a roadside ψησταριά.",
  },
  {
    name: "Koupes",
    description:
      "Bulgur-shell torpedoes stuffed with spiced minced meat (or, in the Lent version, with sautéed mushroom and onion). Deep-fried. Cypriot answer to Lebanese kibbeh, slightly smaller and with more cracked wheat. Sold by the piece in bakeries from 8am onward; locals eat them as a mid-morning snack with lemon.",
  },
  {
    name: "Loukoumades",
    description:
      "Small fried-dough balls, crisp outside, custardy inside, soaked in honey syrup and sprinkled with cinnamon (and increasingly chocolate, pistachio, lotus, etc.). Cyprus has a strong loukoumades tradition — every city has at least one dedicated specialist who fries them to order. Eat them while they're still hot; they don't keep.",
  },
  {
    name: "Kleftiko",
    description:
      "Slow-cooked lamb (sometimes goat), traditionally baked overnight in a wood-fired clay oven sealed shut so the meat steams in its own juices. The name comes from κλέφτης (thief) — the dish supposedly originated with Greek bandits who'd cook stolen lamb underground without smoke. Tender to falling-apart, lemon-and-oregano forward. Order in advance at proper Cypriot tavernas; the good ones still seal the oven door with bread dough.",
  },
];

export const FOOD_EVENTS: ReadonlyArray<FoodEvent> = [
  {
    name: "Limassol Carnival (Tsiknopempti)",
    dates: "12–22 Feb 2026",
    city: "Limassol",
    description:
      "Ten days of parades culminating in the Grand Parade on Makarios III Avenue. Tsiknopempti — 'Smoky Thursday' — is the carnival's defining food ritual, a final blowout of grilled meat before Lent.",
    url: "https://www.visitcyprus.com/event/limassol-carnival-12-22-2-2026/",
  },
  {
    name: "Traditional Sheep & Goat Halloumi Festival",
    dates: "3 May 2026",
    city: "Prastio Avdimou (Limassol district)",
    description:
      "Thematic halloumi festival in a Limassol-district village. Cheese-making demos, trachanas-making, tastings of authentic sheep/goat-milk halloumi (PDO).",
    url: "https://www.cyprusfoodmuseum.com/en/events/12th-traditional-goat-sheep-halloumi-festival",
  },
  {
    name: "Anthestiria — Flower Festival",
    dates: "6–10 May 2026 (Limassol leg)",
    city: "Limassol, Paphos, Larnaca, Geroskipou",
    description:
      "Ancient Dionysian spring festival revived as flower parades. Food stalls, traditional sweets, local-product markets. Each city runs its own weekend in May.",
    url: "https://www.limassol.org.cy/en/Anthestiria",
  },
  {
    name: "Seaside Street Food Festival",
    dates: "29–31 May 2026",
    city: "Limassol Municipal Garden",
    description:
      "Three-day live-cooking street-food event launched in recent years, rotating between Limassol and Paphos. Free entry, evenings 18:00–24:00.",
    url: "https://allaboutlimassol.com/en/street-food-festival",
  },
  {
    name: "Larnaka Kataklysmos — Festival of the Flood",
    dates: "29 May – 3 Jun 2026 (Pentecost long weekend)",
    city: "Foinikoudes Promenade, Larnaca",
    description:
      "Cyprus's biggest Pentecost fair, UNESCO-listed intangible heritage. Stalls of loukoumades, shoushoukos, grilled seafood, plus tsiatista rhyming contests and Karagiozis shadow theatre.",
    url: "https://larnakaregion.com/event-detail/-kataklysmos-2026-festival-flood",
  },
  {
    name: "Ayia Napa Kataklysmos — Fish & Water Festival",
    dates: "30 May – 1 Jun 2026",
    city: "Ayia Napa Harbour",
    description:
      "Pentecost-weekend seafood festival at the fishing harbour. Grilled fish, meze stalls, live music. Smaller and more village-feeling than Larnaca's.",
    url: "https://www.loveayianapa.com/festivals-in-ayia-napa.html",
  },
  {
    name: "Foini Loukoumi Festival",
    dates: "Annual, June (date TBA)",
    city: "Foini village, Limassol mountains",
    description:
      "Mountain village dedicated to traditional Cyprus loukoumi (the local Turkish-delight-style sweet), made the artisanal way with rosewater and starch.",
    url: "https://mycypruslife.com/2026-list-of-events-in-cyprus-festivals-and-concerts-all-year/",
  },
  {
    name: "Ayia Napa Traditional Flavours Festival",
    dates: "Annual, summer (3 days, dates TBA)",
    city: "Ayia Napa town centre",
    description:
      "Meze-style celebration of traditional Cypriot recipes, homemade delicacies and local products. Now in its 8th year.",
    url: "https://cyprus-mail.com/2026/03/08/ayia-napa-festivals-to-look-forward-to",
  },
  {
    name: "Village Grape Harvest & Palouzes Festivals",
    dates: "Annual, September (dates vary by village)",
    city: "Vouni, Vasa, Pissouri, Omodos (Limassol wine villages)",
    description:
      "Late-summer grape-stomping festivals with palouzes (must-pudding), souvla, vine-wood-grilled halloumi and indigenous Xynisteri / Maratheftiko wines.",
    url: "https://cyprusdiscovery.com/cyprus-grape-harvest-festivals/",
  },
  {
    name: "Limassol Wine Festival (65th edition)",
    dates: "26 Sep – 4 Oct 2026",
    city: "Municipal Gardens, Limassol",
    description:
      "Flagship Cypriot wine festival since 1961. Tastings from KEO, SODAP, ETKO, LOEL plus food stalls, dancing, zivania shots. Nine evenings, 18:00–24:00.",
    url: "https://evoinos.com/limassol-wine-festival/",
  },
  {
    name: "Commandaria Festival",
    dates: "Annual, October (date TBA)",
    city: "Kalo Chorio / Monagri, Limassol wine villages",
    description:
      "Celebration of Commandaria — the world's oldest named wine, still produced in its PDO-protected zone north of Limassol.",
    url: "https://mycypruslife.com/2026-list-of-events-in-cyprus-festivals-and-concerts-all-year/",
  },
  {
    name: "Anogyra Pasteli & Olive Festival",
    dates: "Annual, October/November (date TBA)",
    city: "Anogyra village, Limassol district",
    description:
      "Cyprus's 'olive village' celebrates the olive harvest and traditional pasteli (carob-and-sesame sweet) with food stalls and craft demos.",
    url: "https://heartlandoflegends.com/grape-festivals/",
  },
];

export const FOOD_CREATORS: ReadonlyArray<Creator> = [
  {
    name: "Cyprus Insight",
    handle: "@CyprusInsight",
    platform: "YouTube",
    url: "https://www.youtube.com/@CyprusInsight",
    focus:
      "English-language expat reviewing taverns and restaurants island-wide. The 'where locals really eat' POV.",
  },
  {
    name: "Eddy Nassar",
    handle: "@eddynassar",
    platform: "TikTok",
    url: "https://www.tiktok.com/@eddynassar",
    focus:
      "Long-term Limassol resident. Traditional Cypriot dishes, farmers' markets, food culture deep-dives. Also @eddynassar on Instagram (~26k).",
  },
  {
    name: "Cyprus Eats",
    handle: "@cypruseats",
    platform: "Instagram",
    url: "https://www.instagram.com/cypruseats/",
    focus:
      "The largest Cyprus restaurant-guide account (~81k). Brunch, dinners, desserts. Backs the cypruseats.com directory.",
  },
  {
    name: "Cyprus Foodies",
    handle: "@cyprus_foodies",
    platform: "Instagram",
    url: "https://www.instagram.com/cyprus_foodies/",
    focus:
      "Trio reviewing cafés and restaurants in Cyprus and abroad. Approachable, mid-market focus.",
  },
  {
    name: "Christina Loucas — Afrodite's Kitchen",
    handle: "@afroditeskitchen",
    platform: "Instagram",
    url: "https://www.instagram.com/afroditeskitchen/",
    focus:
      "Greek-Cypriot cookbook author preserving traditional recipes. Long-form content at afroditeskitchen.com.",
  },
  {
    name: "Nikoulis Nikiforos",
    handle: "@nikoulisnikiforos",
    platform: "TikTok",
    url: "https://www.tiktok.com/@nikoulisnikiforos",
    focus:
      "Authentic Cypriot cooking demos in Greek and English. Short-form, recipe-focused.",
  },
];

export const LIFESTYLE_CREATORS: ReadonlyArray<Creator> = [
  {
    name: "Rico Go (Ricardo Gorski)",
    handle: "@RicoGo",
    platform: "YouTube",
    url: "https://www.youtube.com/@RicoGo",
    focus:
      "Cyprus lifestyle / relocation vlogger. Business, tax, daily life — not strictly food, but food shows up often. ~1M cross-platform.",
  },
];

export const PLACES: Record<City, Record<Category, Place[]>> = {
  Limassol: {
    breakfast: [
      {
        name: "Nomad Bread & Coffee",
        neighbourhood: "Old Town + Germasogeia",
        why: "Bakery-café loved by locals and expats. Signature open salmon-avocado sandwich, proper sourdough.",
        price: 2,
        instagram: "nomadbreadandcoffee",
      },
      {
        name: "The Shopkeeper & Co.",
        neighbourhood: "Old Town / Saripolou",
        why: "Concept space in a restored shop. Brunch leans creative-healthy — coconut chia, Sticky Fingers bowl.",
        price: 2,
        instagram: "theshopkeeperandco",
      },
    ],
    snack: [
      {
        name: "Aristos & Kiki Kebab House",
        neighbourhood: "Mouttagiaka",
        why: "No-frills grill, plastic chairs, sheftalia and pork souvlaki straight off charcoal.",
        price: 1,
      },
      {
        name: "My Sweet's Loukoumades",
        neighbourhood: "Anexartisias / Old Town",
        why: "Open-late loukoumades specialist. Creative toppings. Locals stop in after dinner.",
        price: 1,
      },
    ],
    lunch: [
      {
        name: "Symposio Tavern",
        neighbourhood: "Omodos village (40-min drive)",
        why: "Stone-built village taverna under vines. Slow-cooked stews and charcoal grills.",
        price: 2,
      },
      {
        name: "Taverna Forsos",
        neighbourhood: "Mouttagiaka",
        why: "Unprepossessing from the street; leafy courtyard inside. Full Cypriot meze.",
        price: 2,
      },
    ],
    dinner: [
      {
        name: "Artima Bistro",
        neighbourhood: "Castle Square, Old Town",
        why: "Creative Mediterranean. Repeatedly cited as a local-and-discerning-tourist favourite.",
        price: 3,
      },
      {
        name: "Ousia Soulful Kitchen",
        neighbourhood: "Old Town, opp. the Medieval Castle",
        why: "Open terrace, organic-local sourcing, reinterpreted Cypriot dishes.",
        price: 3,
      },
    ],
    sweets: [
      {
        name: "Pentadromos Trigona & Bougatsa",
        neighbourhood: "Nicolaou Pentadromos Centre",
        why: "Thessaloniki-style trigona and bougatsa made daily. Honey-syrup-soaked pastry the way it should be.",
        price: 1,
      },
      {
        name: "Gelatofabio",
        neighbourhood: "Multiple Limassol locations",
        why: "Local-favourite gelato. Carob, basil-yoghurt, Cypriot-specific flavours alongside the usuals.",
        price: 1,
      },
    ],
  },
  Paphos: {
    breakfast: [
      {
        name: "Omikron Brunch",
        neighbourhood: "Kato Paphos",
        why: "Minimalist health-leaning brunch since 2015. A local mainstay rather than a tourist photo-op.",
        price: 2,
      },
      {
        name: "Grafico Café",
        neighbourhood: "Old Town, near the Agora",
        why: "Whitewashed walls, mural art, quiet music. Bohemian Paphos done well.",
        price: 2,
      },
    ],
    snack: [
      {
        name: "Artognosia Bakery",
        neighbourhood: "Paphos centre, side street",
        why: "Artisan bakery hidden off the main drag. Top-tier breads, savoury pies, koupes.",
        price: 1,
      },
      {
        name: "Gelamo Gelato Café",
        neighbourhood: "Near Paphos Castle",
        why: "Locally-run gelato, bubble waffles, crepes. Closer to a kid-friendly afternoon stop than a tourist trap.",
        price: 1,
      },
    ],
    lunch: [
      {
        name: "7 St George's Tavern",
        neighbourhood: "Geroskipou village",
        why: "Family taverna, organic-local meze, rustic-cosy. Reservations recommended for weekend lunch.",
        price: 2,
      },
      {
        name: "Stavros Taverna",
        neighbourhood: "Geroskipou village",
        why: "Fresh white fish, crisp batter, priced well below the Paphos harbour.",
        price: 2,
      },
    ],
    dinner: [
      {
        name: "Mandra Tavern",
        neighbourhood: "Kato Paphos, behind Theoskepasti church",
        why: "Operating since 1979. The local-elder meze choice.",
        price: 3,
      },
      {
        name: "Vrasidas Tavern",
        neighbourhood: "Tala village",
        why: "Rustic Tala-village meze with mountain hospitality. The drive up is half the experience.",
        price: 2,
      },
    ],
    sweets: [
      {
        name: "Toni Patisserie & Café",
        neighbourhood: "Central Paphos",
        why: "European-style patisserie locally regarded for cakes and viennoiserie. Strong almond croissant.",
        price: 2,
      },
      {
        name: "Artognosia Bakery (sweet side)",
        neighbourhood: "Paphos centre",
        why: "Flaouna, kourabiedes, seasonal Cypriot treats. Doubles as the morning bread stop above.",
        price: 1,
      },
    ],
  },
  Larnaca: {
    breakfast: [
      {
        name: "Mingle Café",
        neighbourhood: "Foinikoudes, base of QBIC Hotel",
        why: "Eclectic menu, Parisian-style interior. The local brunch default.",
        price: 2,
      },
      {
        name: "Edem's Yard",
        neighbourhood: "Larnaca centre",
        why: "Small, plant-filled independent café. Regularly tagged on Cyprus brunch Instagram accounts.",
        price: 2,
        instagram: "edems_yard",
      },
    ],
    snack: [
      {
        name: "Souvlakia Lakis",
        neighbourhood: "Larnaca centre",
        why: "Locals stop in at 2–3pm off-peak — the dead-giveaway that the kalamaki is the real thing.",
        price: 1,
      },
      {
        name: "Souvlaki Stou Feshia",
        neighbourhood: "Opposite Agios Lazaros church",
        why: "Cypriots eat there both at lunch and at dinner. Pork sheftalia is the move.",
        price: 1,
      },
    ],
    lunch: [
      {
        name: "To Kazani",
        neighbourhood: "Aradippou, just outside Larnaca",
        why: "Family-run quiet-neighbourhood meze. Reservations recommended even at lunch.",
        price: 2,
      },
      {
        name: "Militzis",
        neighbourhood: "Piale Pasha, near the Salt Lake",
        why: "Iconic for Cypriot soul food. Sheftalia, kleftiko, ofto. On every long-time-Larnaca list for a reason.",
        price: 2,
      },
    ],
    dinner: [
      {
        name: "Rous",
        neighbourhood: "Corner Stasandrou & Mpoumpoulinas, downtown",
        why: "Contemporary Cypriot, open cold kitchen. The 'modern Cypriot' address locals name first.",
        price: 3,
      },
      {
        name: "ALMAR Seafood Bar",
        neighbourhood: "Mackenzie Beach",
        why: "Modern seafood — ceviche, grilled octopus, on the water. The local date-night pick.",
        price: 3,
      },
    ],
    sweets: [
      {
        name: "StoArtos Coffee Bakery",
        neighbourhood: "Opposite Agios Lazaros",
        why: "Cyprus spoon sweets, loukoumia, traditional pies. Family-run, no Instagram polish.",
        price: 1,
      },
      {
        name: "Lokmakos",
        neighbourhood: "Larnaca centre",
        why: "Loukoumades specialist opened 2023. Lots of fillings and toppings to play with.",
        price: 1,
      },
    ],
  },
  Nicosia: {
    breakfast: [
      {
        name: "D.O.T Restaurant",
        neighbourhood: "Near Famagusta Gate",
        why: "Industrial-design space. The capital's brunch default for locals — go before 11am at weekends.",
        price: 2,
      },
      {
        name: "Kala Kathoumena",
        neighbourhood: "Phaneromeni square, old town",
        why: "Café-bar on Phaneromeni square. Students, artists, old-town locals. Greek coffee done properly.",
        price: 1,
      },
    ],
    snack: [
      {
        name: "Apantisi",
        neighbourhood: "Nicosia centre",
        why: "Since 1996. Won Best Souvlaki at the 2014 Cyprus Eating Awards and a perennial nominee since.",
        price: 1,
      },
      {
        name: "Piatsa Gourounaki",
        neighbourhood: "Nicosia centre",
        why: "Souvlaki in warm pita with fresh toppings. Regulars-friendly spot — recognise faces after one visit.",
        price: 1,
      },
    ],
    lunch: [
      {
        name: "Zanettos Cypriot Tavern",
        neighbourhood: "Trikoupi 65, old city",
        why: "Since 1938. Fixed-price meze. An 85-year-old local-elder institution.",
        price: 2,
      },
      {
        name: "Inga's Veggie Heaven",
        neighbourhood: "Dimonaktos street, old town",
        why: "Tiny vegetarian / vegan run by Icelandic chef Inga. Eight tables, a craft-studio street.",
        price: 2,
      },
    ],
    dinner: [
      {
        name: "Beba",
        neighbourhood: "Nicosia",
        why: "Wood-fire-oven pitta, locally-sourced ingredients, modern-sensibility Greek-Cypriot.",
        price: 3,
      },
      {
        name: "Tocayo",
        neighbourhood: "Nicosia",
        why: "Peruvian / Latin American ceviches and grilled meats, plus cocktails. Locally-driven and trendy.",
        price: 3,
      },
    ],
    sweets: [
      {
        name: "Elements Fine Desserts",
        neighbourhood: "Nicosia",
        why: "Modern-French patisserie playing with flavour and texture. Reservation-worthy plated desserts.",
        price: 2,
      },
      {
        name: "Melissa Confectionery",
        neighbourhood: "Old town",
        why: "Traditional family-run bakery & patisserie. Locals stop in daily for bread and weekend cakes.",
        price: 1,
      },
    ],
  },
  "Ayia Napa": {
    breakfast: [
      {
        name: "Alya All Day",
        neighbourhood: "Ayia Napa",
        why: "Beach-adjacent all-day brunch and cocktails. Minimalist, strong coffee, year-round.",
        price: 2,
        instagram: "alya.allday",
      },
      {
        name: "Liquid Café Bar",
        neighbourhood: "Ayia Napa",
        why: "One of the few Ayia Napa cafés open all year, so it has a real local crowd outside the summer rush.",
        price: 2,
      },
    ],
    snack: [
      {
        name: "Gyradiko & Grill by Vangelis",
        neighbourhood: "Paralimni + Protaras",
        why: "Greek-style gyros / souvlaki takeaway since 2020. Jumbo pork chops, sheftalia, loukaniko.",
        price: 1,
      },
      {
        name: "Sesoula Kalamaki",
        neighbourhood: "Ayia Napa",
        why: "Chicken and pork gyros and sheftalia in pita. Portion-and-value specifically praised by Cypriots.",
        price: 1,
      },
    ],
    lunch: [
      {
        name: "Hungry Horse Taverna",
        neighbourhood: "Ayia Napa (since 1976)",
        why: "Homemade daily-cooked Cypriot food, huge portions, low prices. A 50-year survivor for a reason.",
        price: 2,
      },
      {
        name: "Ttappis",
        neighbourhood: "Paralimni (next to Margarita bakery)",
        why: "Rich meze starting with warm bread. Firm local favourite, especially outside summer.",
        price: 2,
      },
    ],
    dinner: [
      {
        name: "Vassos Psarolimano",
        neighbourhood: "Ayia Napa harbour (since 1962)",
        why: "Fresh-off-the-boat fish, cooked simply. The Ayia Napa fish-meze institution.",
        price: 3,
      },
      {
        name: "Kafkaros Tavern",
        neighbourhood: "Protaras",
        why: "Checkered-tablecloth family tavern. 'Best fish meze in Protaras' on repeat across local reviews.",
        price: 3,
      },
    ],
    sweets: [
      {
        name: "Panikos Loukoumades",
        neighbourhood: "Protaras Avenue, Paralimni",
        why: "Five loukoumades variations including chocolate-praline. Afternoon onwards, seasonal.",
        price: 1,
      },
      {
        name: "Eurobakers",
        neighbourhood: "Paralimni / Protaras",
        why: "All-female-staffed local bakery. Traditional cakes, daktyla, baklava.",
        price: 1,
      },
    ],
  },
};

export const ALL_CITIES: ReadonlyArray<City> = [
  "Limassol",
  "Paphos",
  "Larnaca",
  "Nicosia",
  "Ayia Napa",
];

export const ALL_CATEGORIES: ReadonlyArray<Category> = [
  "breakfast",
  "snack",
  "lunch",
  "dinner",
  "sweets",
];

export const CATEGORY_LABEL: Record<Category, string> = {
  breakfast: "Breakfast & brunch",
  snack: "Snack & quick bite",
  lunch: "Lunch",
  dinner: "Dinner",
  sweets: "Sweets & desserts",
};
