"use client";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Desktop header disclosure (button + panel) shared by the Topics and More
 * menus: aria-expanded/aria-controls, Escape closes and returns focus to the
 * button, a click or focus outside closes, and navigation closes it without
 * moving focus. The panel content gets a `close` callback for link clicks.
 */
export function NavDisclosure({
	label,
	panelId,
	align = "right",
	active = false,
	panelClassName = "w-60",
	children,
}: {
	label: string;
	panelId: string;
	/** Which edge of the button the panel lines up with. */
	align?: "left" | "right";
	/** Highlight the button (the current page is inside the menu). */
	active?: boolean;
	panelClassName?: string;
	children: (close: () => void) => ReactNode;
}) {
	const pathname = usePathname() ?? "/";
	const [open, setOpen] = useState(false);
	const wrapRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

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
				aria-controls={open ? panelId : undefined}
				onClick={() => setOpen((v) => !v)}
				className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-field px-2.5 text-base font-semibold hover:bg-sky hover:text-ink lg:px-3 ${
					active || open ? "bg-sky text-ink" : "text-muted"
				}`}
			>
				{label}
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
				<div
					id={panelId}
					className={`absolute top-full z-50 mt-2 rounded-card border border-line bg-white p-2 shadow-rc ${
						align === "left" ? "left-0" : "right-0"
					} ${panelClassName}`}
				>
					{children(() => setOpen(false))}
				</div>
			) : null}
		</div>
	);
}
