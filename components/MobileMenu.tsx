"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isActive, PRIMARY_NAV, SECONDARY_NAV } from "@/lib/nav-links";
import { useSavedCount } from "./HeaderParts";
import { Icon } from "./icons/Icon";

const MENU_ID = "site-menu";
const FOCUSABLE =
	'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

const ROW =
	"flex min-h-12 items-center gap-3 rounded-field px-4 text-lg font-semibold text-ink hover:bg-sky";

/** Mobile header menu button + full-height dialog. Hidden from md up. */
export function MobileMenu() {
	const pathname = usePathname() ?? "/";
	const savedCount = useSavedCount();
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setOpen(false), []);

	// Close on route change (link taps).
	// biome-ignore lint/correctness/useExhaustiveDependencies: close when pathname changes
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) return;
		const trigger = triggerRef.current;
		closeRef.current?.focus();

		// Make the rest of the page inert while the dialog is open.
		const inerted: Element[] = [];
		for (const el of Array.from(document.body.children)) {
			if (el.id !== `${MENU_ID}-root` && !el.hasAttribute("inert")) {
				el.setAttribute("inert", "");
				inerted.push(el);
			}
		}

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setOpen(false);
				return;
			}
			if (e.key !== "Tab") return;
			const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
			if (!nodes || nodes.length === 0) return;
			const first = nodes[0];
			const last = nodes[nodes.length - 1];
			const active = document.activeElement;
			if (e.shiftKey && active === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && active === last) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", onKeyDown);

		const mq = window.matchMedia("(min-width: 768px)");
		const onMq = () => {
			if (mq.matches) setOpen(false);
		};
		mq.addEventListener("change", onMq);

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			mq.removeEventListener("change", onMq);
			document.body.style.overflow = prevOverflow;
			for (const el of inerted) el.removeAttribute("inert");
			trigger?.focus();
		};
	}, [open]);

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				aria-label="Open menu"
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={MENU_ID}
				onClick={() => setOpen(true)}
				className="inline-flex h-11 w-11 items-center justify-center rounded-field border border-line text-ink hover:bg-sky md:hidden"
			>
				<Icon name="menu" size={24} />
			</button>

			{open &&
				createPortal(
					<div id={`${MENU_ID}-root`}>
						<div
							id={MENU_ID}
							role="dialog"
							aria-modal="true"
							aria-label="Site menu"
							className="fixed inset-0 z-50 md:hidden"
						>
							<button
								type="button"
								tabIndex={-1}
								aria-hidden="true"
								className="absolute inset-0 cursor-default bg-ink/40"
								onClick={close}
							/>
							<div
								ref={panelRef}
								className="absolute right-0 top-0 flex h-full w-[min(22rem,88%)] flex-col overflow-y-auto bg-white p-5 shadow-rc motion-safe:animate-[rc-menu-in_180ms_ease-out]"
							>
								<div className="mb-4 flex items-center justify-between">
									<span className="text-lg font-extrabold text-ink">Menu</span>
									<button
										ref={closeRef}
										type="button"
										aria-label="Close menu"
										onClick={close}
										className="inline-flex h-11 w-11 items-center justify-center rounded-field border border-line text-ink hover:bg-sky"
									>
										<Icon name="close" size={24} />
									</button>
								</div>
								<nav aria-label="Main menu">
									<ul className="flex flex-col gap-1">
										{PRIMARY_NAV.map((item) => {
											const active = isActive(pathname, item.href);
											return (
												<li key={item.href}>
													<Link
														href={item.href}
														aria-current={active ? "page" : undefined}
														className={`${ROW} ${active ? "bg-sky" : ""}`}
													>
														{item.label}
													</Link>
												</li>
											);
										})}
										<li>
											<Link
												href="/my-shortlist/"
												aria-current={
													pathname.startsWith("/my-shortlist")
														? "page"
														: undefined
												}
												className={`${ROW} ${
													pathname.startsWith("/my-shortlist") ? "bg-sky" : ""
												}`}
											>
												<Icon name="heart" size={22} />
												Saved
												{savedCount > 0 ? (
													<span className="rounded-full bg-primary px-2 text-sm font-bold leading-6 text-white">
														{savedCount}
													</span>
												) : null}
											</Link>
										</li>
									</ul>
									<hr className="my-4 border-line" />
									<ul className="flex flex-col gap-1">
										{SECONDARY_NAV.map((item) => {
											const active = isActive(pathname, item.href);
											return (
												<li key={item.href}>
													<Link
														href={item.href}
														aria-current={active ? "page" : undefined}
														className={`flex min-h-11 items-center rounded-field px-4 text-base font-medium text-muted hover:bg-sky hover:text-ink ${
															active ? "bg-sky text-ink" : ""
														}`}
													>
														{item.label}
													</Link>
												</li>
											);
										})}
									</ul>
								</nav>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
