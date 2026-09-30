"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActive, SECONDARY_NAV } from "@/lib/nav-links";

const PANEL_ID = "site-more";

/** Desktop "More" disclosure holding the secondary links. */
export function MoreMenu() {
	const pathname = usePathname() ?? "/";
	const [open, setOpen] = useState(false);
	const wrapRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const hasActive = SECONDARY_NAV.some((l) => isActive(pathname, l.href));

	// Close after navigation without stealing focus.
	// biome-ignore lint/correctness/useExhaustiveDependencies: close when pathname changes
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setOpen(false);
				buttonRef.current?.focus();
			}
		};
		const onPointerDown = (e: MouseEvent | TouchEvent) => {
			if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onFocusIn = (e: FocusEvent) => {
			if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("touchstart", onPointerDown);
		document.addEventListener("focusin", onFocusIn);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("touchstart", onPointerDown);
			document.removeEventListener("focusin", onFocusIn);
		};
	}, [open]);

	return (
		<div ref={wrapRef} className="relative">
			<button
				ref={buttonRef}
				type="button"
				aria-expanded={open}
				aria-controls={open ? PANEL_ID : undefined}
				onClick={() => setOpen((v) => !v)}
				className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-field px-3 text-base font-semibold hover:bg-sky hover:text-ink ${
					hasActive || open ? "bg-sky text-ink" : "text-muted"
				}`}
			>
				More
				<svg
					aria-hidden="true"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={open ? "rotate-180" : ""}
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>
			{open ? (
				<ul
					id={PANEL_ID}
					aria-label="More"
					className="absolute right-0 top-full z-50 mt-2 w-60 rounded-card border border-line bg-white p-2 shadow-rc"
				>
					{SECONDARY_NAV.map((item) => {
						const active = isActive(pathname, item.href);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									aria-current={active ? "page" : undefined}
									onClick={() => setOpen(false)}
									className={`flex min-h-11 items-center rounded-field px-3 text-base font-medium hover:bg-sky hover:text-ink ${
										active ? "bg-sky text-ink" : "text-muted"
									}`}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}
