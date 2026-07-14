"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isActive } from "@/lib/nav-links";
import { useMapNav } from "./MapNavContext";

type CatKey = "new" | "food" | "shopping" | "healthcare" | "hotels" | "schools";

/** Items shown directly in the header bar. */
const BAR: { label: string; key: CatKey }[] = [
	{ label: "New Developments", key: "new" },
	{ label: "Food", key: "food" },
	{ label: "Shopping", key: "shopping" },
	{ label: "Healthcare", key: "healthcare" },
];

/** Map categories shown inside the "More" drawer. */
const DRAWER_CATS: { label: string; key: CatKey }[] = [
	{ label: "New Developments", key: "new" },
	{ label: "Hotels", key: "hotels" },
	{ label: "Food", key: "food" },
	{ label: "Shopping", key: "shopping" },
	{ label: "Schools", key: "schools" },
	{ label: "Healthcare", key: "healthcare" },
];

/** Site links shown inside the "More" drawer. */
const DRAWER_LINKS: { label: string; href: string }[] = [
	{ label: "Guides", href: "/guides/" },
	{ label: "Tools", href: "/tools/" },
	{ label: "Directories", href: "/sections/" },
	{ label: "Explore", href: "/explore/" },
];

export function PrimaryNav() {
	const pathname = usePathname() ?? "/";
	const router = useRouter();
	const nav = useMapNav();
	const onHome = pathname === "/";
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;
		const trigger = triggerRef.current;
		closeRef.current?.focus();
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = prev;
			trigger?.focus();
		};
	}, [open]);

	/** On the homepage, drive the map directly; elsewhere, navigate to the map. */
	function selectCat(key: CatKey) {
		setOpen(false);
		if (onHome && nav) {
			if (key === "new") {
				nav.closeFood();
				nav.closeHotels();
				nav.closeShopping();
				nav.closeSchools();
				nav.closeHealthcare();
			} else {
				const openers: Record<Exclude<CatKey, "new">, () => void> = {
					food: nav.openFood,
					shopping: nav.openShopping,
					healthcare: nav.openHealthcare,
					hotels: nav.openHotels,
					schools: nav.openSchools,
				};
				openers[key]();
			}
			return;
		}
		router.push(key === "new" ? "/" : `/?open=${key}`);
	}

	function isCatActive(key: CatKey): boolean {
		if (!onHome || !nav) return false;
		const state: Record<CatKey, boolean> = {
			new:
				!nav.foodOpen &&
				!nav.hotelsOpen &&
				!nav.shoppingOpen &&
				!nav.schoolsOpen &&
				!nav.healthcareOpen,
			food: nav.foodOpen,
			shopping: nav.shoppingOpen,
			healthcare: nav.healthcareOpen,
			hotels: nav.hotelsOpen,
			schools: nav.schoolsOpen,
		};
		return state[key];
	}

	return (
		<>
			{/* Desktop bar */}
			<nav
				className="hidden md:flex items-center gap-3 text-xs text-slate-500"
				aria-label="Primary"
			>
				{BAR.map((item) => {
					const active = isCatActive(item.key);
					return (
						<button
							key={item.key}
							type="button"
							onClick={() => selectCat(item.key)}
							aria-current={active ? "true" : undefined}
							className={`transition-colors whitespace-nowrap px-2 py-1 ${
								active ? "text-slate-900 font-semibold" : "hover:text-slate-900"
							}`}
						>
							{item.label}
						</button>
					);
				})}
				<span className="text-slate-300 select-none" aria-hidden>
					·
				</span>
				{[
					{ label: "Guides", href: "/guides/" },
					{ label: "Tools", href: "/tools/" },
				].map((item) => {
					const active = isActive(pathname, item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							aria-current={active ? "page" : undefined}
							className={`transition-colors whitespace-nowrap px-2 py-1 ${
								active ? "text-slate-900 font-semibold" : "hover:text-slate-900"
							}`}
						>
							{item.label}
						</Link>
					);
				})}
				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-haspopup="dialog"
					aria-expanded={open}
					className="ml-1 text-xs px-3 py-1.5 rounded-full bg-[#35cdc4] text-slate-900 font-semibold hover:bg-teal-400 transition-colors whitespace-nowrap"
				>
					More
				</button>
			</nav>

			{/* Mobile trigger */}
			<button
				ref={triggerRef}
				type="button"
				className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
				aria-label={open ? "Close menu" : "Open menu"}
				aria-haspopup="dialog"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					{open ? (
						<path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
					) : (
						<path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
					)}
				</svg>
			</button>

			{/* Shared "More" drawer — portaled to <body> so the header's
			    backdrop-filter doesn't trap the drawer's fixed positioning */}
			{open &&
				createPortal(
					<div
						role="dialog"
						aria-modal="true"
						aria-label="Menu"
						className="fixed inset-0 z-50"
					>
						<button
							type="button"
							aria-label="Close menu"
							className="absolute inset-0 bg-black/40 cursor-default"
							onClick={() => setOpen(false)}
						/>
						<nav
							className="absolute right-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-xl p-6 flex flex-col gap-1 overflow-y-auto"
							aria-label="All sections"
						>
							<button
								ref={closeRef}
								type="button"
								className="self-end mb-2 rounded-md p-2 text-slate-700 hover:bg-slate-100"
								aria-label="Close menu"
								onClick={() => setOpen(false)}
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
								</svg>
							</button>

							<p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
								On the map
							</p>
							{DRAWER_CATS.map((c) => (
								<button
									key={c.key}
									type="button"
									onClick={() => selectCat(c.key)}
									className="text-left rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
								>
									{c.label}
								</button>
							))}

							<p className="mt-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
								Browse
							</p>
							{DRAWER_LINKS.map((l) => (
								<Link
									key={l.href}
									href={l.href}
									onClick={() => setOpen(false)}
									className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
								>
									{l.label}
								</Link>
							))}
							<Link
								href="/my-shortlist/"
								onClick={() => setOpen(false)}
								className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
							>
								Saved Shortlist
							</Link>
						</nav>
					</div>,
					document.body,
				)}
		</>
	);
}
