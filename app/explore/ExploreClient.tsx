"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	type FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Icon } from "@/components/icons/Icon";
import { Chip } from "@/components/ui/Chip";

/** Content types written to the index as data-type on each page's main element. */
const TYPES = [
	{ id: "guide", label: "Guides" },
	{ id: "directory", label: "Directories" },
	{ id: "tool", label: "Tools" },
	{ id: "city", label: "Cities" },
	{ id: "listing", label: "Listings" },
	{ id: "developer", label: "Developers" },
	{ id: "page", label: "Pages" },
] as const;
type TypeId = (typeof TYPES)[number]["id"];
type Filter = "all" | TypeId;

const PREVIEW_PER_TYPE = 5;
const PAGE_SIZE = 20;
const MIN_CHARS = 2;
const PAGEFIND_URL = "/pagefind/pagefind.js";

type PagefindData = {
	url: string;
	excerpt: string;
	meta: { title?: string };
	filters: Record<string, string[]>;
};
type PagefindHit = { id: string; data: () => Promise<PagefindData> };
type PagefindApi = {
	search: (
		term: string,
		opts?: { filters?: Record<string, string> },
	) => Promise<{ results: PagefindHit[] }>;
};

type Item = {
	url: string;
	title: string;
	excerpt: string;
};
type Group = {
	type: TypeId;
	total: number;
	items: Item[];
	hits: PagefindHit[];
};

type State =
	| { kind: "idle" }
	| { kind: "loading" }
	| { kind: "unavailable" }
	| { kind: "error" }
	| { kind: "results"; groups: Group[]; total: number };

let pagefindPromise: Promise<PagefindApi> | null = null;
function loadPagefind(): Promise<PagefindApi> {
	if (!pagefindPromise) {
		pagefindPromise = import(
			/* webpackIgnore: true */ /* turbopackIgnore: true */ PAGEFIND_URL
		).catch((e) => {
			pagefindPromise = null;
			throw e;
		});
	}
	return pagefindPromise;
}

async function toItems(hits: PagefindHit[]): Promise<Item[]> {
	const data = await Promise.all(hits.map((h) => h.data()));
	return data.map((d) => ({
		url: d.url,
		title: d.meta.title ?? d.url,
		excerpt: d.excerpt,
	}));
}

async function searchByType(
	pf: PagefindApi,
	term: string,
): Promise<Record<TypeId, PagefindHit[]>> {
	const searches = await Promise.all(
		TYPES.map((t) => pf.search(term, { filters: { type: t.id } })),
	);
	return Object.fromEntries(
		TYPES.map((t, i) => [t.id, searches[i].results]),
	) as Record<TypeId, PagefindHit[]>;
}

const FALLBACK_BELOW = 3;

/**
 * Searches every type. When the whole query finds fewer than three results and
 * its last word has four or more letters, the word is probably a prefix that the
 * index does not match ("movi"), so also search with the last letter dropped and
 * merge by id.
 */
async function searchAllTypes(
	pf: PagefindApi,
	term: string,
): Promise<Record<TypeId, PagefindHit[]>> {
	const base = await searchByType(pf, term);
	const total = TYPES.reduce((n, t) => n + base[t.id].length, 0);
	const lastWord = term.split(/\s+/).pop() ?? "";
	if (total >= FALLBACK_BELOW || !/^\p{L}{4,}$/u.test(lastWord)) return base;
	const extra = await searchByType(pf, term.slice(0, -1));
	return Object.fromEntries(
		TYPES.map((t) => {
			const seen = new Set(base[t.id].map((h) => h.id));
			return [
				t.id,
				[...base[t.id], ...extra[t.id].filter((h) => !seen.has(h.id))],
			];
		}),
	) as Record<TypeId, PagefindHit[]>;
}

export default function ExploreClient() {
	const searchParams = useSearchParams();
	const initial = searchParams.get("q") ?? "";
	const [input, setInput] = useState(initial);
	const [query, setQuery] = useState(initial.trim());
	const [filter, setFilter] = useState<Filter>("all");
	const [state, setState] = useState<State>(
		initial.trim().length >= MIN_CHARS ? { kind: "loading" } : { kind: "idle" },
	);
	const [shown, setShown] = useState(PAGE_SIZE);
	const inputRef = useRef<HTMLInputElement>(null);
	const runId = useRef(0);
	const [attempt, setAttempt] = useState(0);
	const focusGroup = useRef<TypeId | null>(null);

	// The desktop header search is an icon link, so open ready to type.
	// biome-ignore lint/correctness/useExhaustiveDependencies: runs once on mount
	useEffect(() => {
		if (!initial) inputRef.current?.focus();
	}, []);

	// "See all" removes itself; move focus to the group's heading instead of
	// dropping it on the page.
	useEffect(() => {
		if (state.kind === "results" && focusGroup.current) {
			document.getElementById(`grp-${focusGroup.current}`)?.focus();
			focusGroup.current = null;
		}
	}, [state]);

	// Follow ?q= changes (back/forward navigation).
	const q = searchParams.get("q");
	// biome-ignore lint/correctness/useExhaustiveDependencies: sync only when the URL param changes
	useEffect(() => {
		if (q !== null && q.trim() !== query) {
			setInput(q);
			setQuery(q.trim());
			setFilter("all");
		}
	}, [q]);

	// Debounce typing into the active query.
	useEffect(() => {
		const t = setTimeout(() => {
			const next = input.trim();
			if (next !== query) {
				setQuery(next);
				setFilter("all");
			}
		}, 250);
		return () => clearTimeout(t);
	}, [input, query]);

	// Keep the address bar shareable without a navigation.
	useEffect(() => {
		const url = new URL(window.location.href);
		if (query) url.searchParams.set("q", query);
		else url.searchParams.delete("q");
		if (url.href !== window.location.href) {
			window.history.replaceState(null, "", url.href);
		}
	}, [query]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: shown resets with the query and filter
	useEffect(() => {
		setShown(PAGE_SIZE);
	}, [query, filter]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: attempt re-runs the search after a failure
	useEffect(() => {
		if (query.length < MIN_CHARS) {
			runId.current++;
			setState({ kind: "idle" });
			return;
		}
		const id = ++runId.current;
		setState({ kind: "loading" });
		(async () => {
			let pf: PagefindApi;
			try {
				pf = await loadPagefind();
			} catch {
				if (id === runId.current) setState({ kind: "unavailable" });
				return;
			}
			try {
				// One filtered search per type: grouped results need each hit's
				// type, and a single unfiltered search would force loading every
				// hit's data (hundreds of fragments) to sort them into groups.
				const byType = await searchAllTypes(pf, query);
				const types =
					filter === "all" ? TYPES : TYPES.filter((t) => t.id === filter);
				const groups: Group[] = await Promise.all(
					types.map(async (t) => {
						const hits = byType[t.id];
						const first = filter === "all" ? PREVIEW_PER_TYPE : PAGE_SIZE;
						return {
							type: t.id,
							total: hits.length,
							hits,
							items: await toItems(hits.slice(0, first)),
						};
					}),
				);
				if (id !== runId.current) return;
				const total = groups.reduce((n, g) => n + g.total, 0);
				setState({ kind: "results", groups, total });
			} catch {
				if (id === runId.current) setState({ kind: "error" });
			}
		})();
	}, [query, filter, attempt]);

	// Counts for the type filter come from an "all" search; keep them while a filter is active.
	const [counts, setCounts] = useState<Record<TypeId, number> | null>(null);
	useEffect(() => {
		if (state.kind === "results" && filter === "all") {
			setCounts(
				Object.fromEntries(
					state.groups.map((g) => [g.type, g.total]),
				) as Record<TypeId, number>,
			);
		}
		if (state.kind === "idle") setCounts(null);
	}, [state, filter]);

	const showMore = useCallback(async () => {
		if (state.kind !== "results" || filter === "all") return;
		const g = state.groups[0];
		const next = shown + PAGE_SIZE;
		const more = await toItems(g.hits.slice(g.items.length, next));
		setState((s) =>
			s.kind === "results" && s.groups[0]
				? {
						...s,
						groups: [
							{ ...s.groups[0], items: [...s.groups[0].items, ...more] },
						],
					}
				: s,
		);
		setShown(next);
	}, [state, filter, shown]);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		setQuery(input.trim());
		setFilter("all");
	}

	const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;
	const tooShort = input.trim().length > 0 && input.trim().length < MIN_CHARS;

	let status = "";
	if (state.kind === "loading") status = "Searching";
	else if (state.kind === "results")
		status =
			state.total === 0
				? `No results for ${query}`
				: `${state.total} ${state.total === 1 ? "result" : "results"} for ${query}`;
	else if (state.kind === "error") status = "Search failed";
	else if (state.kind === "unavailable") status = "Search is not available";

	return (
		<section aria-label="Site search">
			<search>
				<form onSubmit={onSubmit} className="relative">
					<label htmlFor="explore-search" className="sr-only">
						Search guides, directories, tools, cities and listings
					</label>
					<Icon
						name="search"
						size={20}
						className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
					/>
					<input
						ref={inputRef}
						id="explore-search"
						type="search"
						name="q"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						autoComplete="off"
						enterKeyHint="search"
						placeholder="Search guides, directories, tools..."
						className="h-12 w-full min-w-0 rounded-xl border border-line bg-white pl-11 pr-12 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus"
					/>
					{input ? (
						<button
							type="button"
							aria-label="Clear search"
							onClick={() => {
								setInput("");
								setQuery("");
								setFilter("all");
								inputRef.current?.focus();
							}}
							className="absolute right-1.5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-muted hover:bg-sky hover:text-ink"
						>
							<Icon name="close" size={20} />
						</button>
					) : null}
				</form>
			</search>

			<p role="status" aria-live="polite" className="sr-only">
				{status}
			</p>

			{tooShort ? (
				<p className="mt-3 text-sm text-muted">
					Type at least {MIN_CHARS} characters to search.
				</p>
			) : null}

			{counts && total > 0 ? (
				<fieldset className="m-0 mt-4 flex min-w-0 flex-wrap gap-2 border-0 p-0">
					<legend className="sr-only">Filter results by type</legend>
					<Chip
						count={total}
						selected={filter === "all"}
						onClick={() => setFilter("all")}
					>
						All
					</Chip>
					{TYPES.filter((t) => (counts[t.id] ?? 0) > 0).map((t) => (
						<Chip
							key={t.id}
							count={counts[t.id]}
							selected={filter === t.id}
							onClick={() => setFilter(t.id)}
						>
							{t.label}
						</Chip>
					))}
				</fieldset>
			) : null}

			<div data-search-state={state.kind} className="mt-6">
				{state.kind === "loading" ? (
					<p className="text-sm text-muted">Searching...</p>
				) : null}

				{state.kind === "unavailable" ? (
					<div className="rounded-2xl border border-line bg-sky p-5 text-sm text-ink">
						<p className="font-semibold">Search is not available here yet.</p>
						<p className="mt-1 text-muted">
							The search index is created when the site is built. In
							development, run <code>pnpm build</code> and serve the{" "}
							<code>out</code> folder to try search. You can still browse by
							category below.
						</p>
					</div>
				) : null}

				{state.kind === "error" ? (
					<div className="rounded-2xl border border-line bg-white p-5 text-sm">
						<p className="font-semibold text-ink">Search failed.</p>
						<p className="mt-1 text-muted">
							Please try again, or browse by category below.
						</p>
						<button
							type="button"
							onClick={() => {
								pagefindPromise = null;
								setAttempt((n) => n + 1);
							}}
							className="mt-3 inline-flex min-h-11 items-center rounded-field bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
						>
							Try again
						</button>
					</div>
				) : null}

				{state.kind === "results" && state.total === 0 ? (
					<div className="rounded-2xl border border-line bg-white p-5 text-sm">
						<p className="font-semibold text-ink">
							No results for &ldquo;{query}&rdquo;
						</p>
						<p className="mt-1 text-muted">
							Check the spelling, try fewer or more general words, or browse by
							category below.
						</p>
					</div>
				) : null}

				{state.kind === "results" && state.total > 0 ? (
					<div className="space-y-8">
						{state.groups
							.filter((g) => g.total > 0)
							.map((g) => {
								const meta = TYPES.find((t) => t.id === g.type);
								return (
									<section
										key={g.type}
										aria-labelledby={`grp-${g.type}`}
										data-result-type={g.type}
									>
										<h2
											id={`grp-${g.type}`}
											tabIndex={-1}
											className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
										>
											{meta?.label} ({g.total})
										</h2>
										<ul className="space-y-2">
											{g.items.map((r) => (
												<li key={r.url}>
													<Link
														href={r.url}
														className="group block rounded-2xl border border-line p-3.5 transition-all hover:border-primary hover:shadow-sm"
													>
														<span className="block text-sm font-semibold leading-snug text-ink group-hover:text-primary">
															{r.title}
														</span>
														<span
															className="mt-1 block text-xs leading-relaxed text-slate-600 [&_mark]:rounded-sm [&_mark]:bg-sky-strong [&_mark]:px-0.5 [&_mark]:text-ink"
															// biome-ignore lint/security/noDangerouslySetInnerHtml: Pagefind returns an escaped excerpt with <mark> highlights
															dangerouslySetInnerHTML={{ __html: r.excerpt }}
														/>
													</Link>
												</li>
											))}
										</ul>
										{filter === "all" && g.total > g.items.length ? (
											<button
												type="button"
												onClick={() => {
													focusGroup.current = g.type;
													setFilter(g.type);
												}}
												className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4"
											>
												See all {g.total} {meta?.label.toLowerCase()}
											</button>
										) : null}
										{filter !== "all" && g.total > g.items.length ? (
											<button
												type="button"
												onClick={showMore}
												className="mt-3 inline-flex min-h-11 items-center rounded-field border border-line px-4 text-sm font-semibold text-ink hover:bg-sky"
											>
												Show more ({g.total - g.items.length} left)
											</button>
										) : null}
									</section>
								);
							})}
					</div>
				) : null}
			</div>
		</section>
	);
}
