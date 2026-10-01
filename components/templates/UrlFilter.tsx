"use client";

import { useEffect, useRef, useState } from "react";

/**
 * URL-readable filters (`?topic=` on the indexes, `?city=` on Food and
 * Shopping) without a layout jump.
 *
 * The static HTML lists every item. `<UrlPrefilter>` is an inline script plus
 * an unlayered style, rendered as the first child of the filter's wrapper: the
 * script runs while the page is parsed, reads the query and sets
 * `data-url-filter` on the wrapper, and the style hides the items
 * (`data-filter-item`) that do not match, so the first paint already shows
 * the filtered list. After hydration `useUrlFilter` applies the same filter in
 * React state; the attribute is removed as soon as the visitor changes the
 * filter, so React alone decides from then on. The attribute lives on the
 * wrapper (not <html>), so a client-side navigation never inherits it.
 */

const ATTR = "data-url-filter";

export function UrlPrefilter({
	param,
	values,
	unknown,
	empty = [],
}: {
	/** Query parameter, e.g. "topic". */
	param: string;
	/** Recognised values (slugs). */
	values: ReadonlyArray<string>;
	/** Attribute value for an unrecognised query value; omit to ignore it. */
	unknown?: string;
	/** Recognised values that match no item (they show the empty note). */
	empty?: ReadonlyArray<string>;
}) {
	const script = `(function(){var s=document.currentScript,q=new URLSearchParams(location.search).get(${JSON.stringify(param)});if(!s||!q)return;q=${JSON.stringify(values)}.indexOf(q)>-1?q:${JSON.stringify(unknown ?? null)};if(q)s.parentElement.setAttribute(${JSON.stringify(ATTR)},q)})()`;
	const rules = values.map(
		(v) =>
			`[${ATTR}="${v}"] [data-filter-item]:not([data-filter-item~="${v}"]){display:none}`,
	);
	const emptyValues = unknown ? [...empty, unknown] : [...empty];
	if (unknown)
		rules.push(`[${ATTR}="${unknown}"] [data-filter-item]{display:none}`);
	for (const v of emptyValues)
		rules.push(`[${ATTR}="${v}"] [data-empty-note]{display:block}`);
	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, built from slugs */}
			<script dangerouslySetInnerHTML={{ __html: script }} />
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, built from slugs */}
			<style dangerouslySetInnerHTML={{ __html: rules.join("") }} />
		</>
	);
}

/**
 * Filter state read from `?{param}=` after hydration and written back with
 * replaceState. `parse` must be a stable (module-level) function returning the
 * state for a query value, or undefined to keep `initial`. Put `scopeRef` on
 * the element that contains `<UrlPrefilter>`.
 */
export function useUrlFilter<T extends string>({
	param,
	path,
	initial,
	parse,
}: {
	param: string;
	path: string;
	initial: T;
	parse: (q: string) => T | undefined;
}) {
	const [value, setValue] = useState<T>(initial);
	const scopeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const q = new URLSearchParams(window.location.search).get(param);
		const next = q ? parse(q) : undefined;
		if (next !== undefined) setValue(next);
	}, [param, parse]);

	function set(next: T) {
		setValue(next);
		scopeRef.current?.removeAttribute(ATTR);
		window.history.replaceState(
			null,
			"",
			next === initial ? path : `${path}?${param}=${next}`,
		);
	}

	return { value, set, scopeRef };
}
