"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isActive, PRIMARY_NAV } from "@/lib/nav-links";

export function PrimaryNav() {
	const pathname = usePathname() ?? "/";
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Desktop links */}
			<nav
				className="hidden md:flex items-center gap-3 text-xs text-slate-500"
				aria-label="Primary"
			>
				{PRIMARY_NAV.map((item) => {
					const active = isActive(pathname, item.href);
					const isExplore = item.href === "/explore/";
					if (isExplore) {
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={active ? "page" : undefined}
								className="ml-1 text-xs px-3 py-1.5 rounded-full bg-[#35cdc4] text-slate-900 font-semibold hover:bg-teal-400 transition-colors whitespace-nowrap"
							>
								{item.label}
							</Link>
						);
					}
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
			</nav>

			{/* Mobile hamburger */}
			<button
				type="button"
				className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
				aria-label={open ? "Close menu" : "Open menu"}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls="primary-mobile-drawer"
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

			{/* Mobile drawer */}
			{open && (
				<div
					id="primary-mobile-drawer"
					role="dialog"
					aria-modal="true"
					aria-label="Site navigation"
					className="md:hidden fixed inset-0 z-50"
				>
					<button
						type="button"
						aria-label="Close menu"
						className="absolute inset-0 bg-black/40 cursor-default"
						onClick={() => setOpen(false)}
					/>
					<nav
						className="absolute right-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-xl p-6 flex flex-col gap-1"
						aria-label="Primary mobile"
					>
						<button
							type="button"
							className="self-end mb-4 rounded-md p-2 text-slate-700 hover:bg-slate-100"
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
						{PRIMARY_NAV.map((item) => {
							const active = isActive(pathname, item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									aria-current={active ? "page" : undefined}
									onClick={() => setOpen(false)}
									className={`rounded-md px-3 py-2 text-sm font-medium ${
										active
											? "bg-slate-100 text-slate-900"
											: "text-slate-700 hover:bg-slate-50"
									}`}
								>
									{item.label}
								</Link>
							);
						})}
						<Link
							href="/my-shortlist/"
							onClick={() => setOpen(false)}
							className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Saved Shortlist
						</Link>
					</nav>
				</div>
			)}
		</>
	);
}
