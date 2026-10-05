export interface ItemListEntry {
	name: string;
	url?: string;
	telephone?: string;
}

/** schema.org ItemList of directory entries. Only pass fields visible on the page. */
export function itemListJsonLd(
	listName: string,
	entries: ReadonlyArray<ItemListEntry>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: listName,
		numberOfItems: entries.length,
		itemListElement: entries.map((e, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: {
				"@type": "LocalBusiness",
				name: e.name,
				...(e.url ? { url: e.url } : {}),
				...(e.telephone ? { telephone: e.telephone } : {}),
			},
		})),
	};
}
