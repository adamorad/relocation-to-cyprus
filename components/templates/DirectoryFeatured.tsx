"use client";

import { createContext, type ReactNode, useContext } from "react";

const FeaturedContext = createContext<ReactNode>(null);

/**
 * Carries the server-rendered "Featured" sponsor unit from DirectoryTemplate
 * into the directory's client component, so it can sit after the filters and
 * above the entries.
 */
export function DirectoryFeaturedProvider({
	unit,
	children,
}: {
	unit: ReactNode;
	children: ReactNode;
}) {
	return (
		<FeaturedContext.Provider value={unit}>{children}</FeaturedContext.Provider>
	);
}

/** Place once in each directory client, between the filters and the entries. */
export function DirectoryFeatured() {
	const unit = useContext(FeaturedContext);
	return unit ? <div className="mt-6">{unit}</div> : null;
}
