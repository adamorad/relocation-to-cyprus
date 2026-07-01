"use client";
import Link from "next/link";
import { useMapNav } from "./MapNavContext";
import { PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
	const nav = useMapNav();
	const mapActive = nav?.mapActive ?? false;

	return (
		<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
			<div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between gap-4">
				<Link
					href="/"
					className="font-bold text-slate-900 text-sm hover:text-[#35cdc4] transition-colors flex-shrink-0"
				>
					RealCy.app
				</Link>
				<PrimaryNav />
			</div>

			{mapActive && nav && (
				/* Homepage map quick-filters — secondary sub-bar, desktop only */
				<div className="hidden md:block border-t border-slate-100 bg-white">
					<div className="max-w-6xl mx-auto px-4 md:px-6 h-9 flex items-center gap-1 overflow-x-auto">
						<span className="rounded-md bg-amber-400 text-slate-900 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap flex-shrink-0">
							New Developments
						</span>
						{(
							[
								{ name: "Hotels", handler: nav.openHotels },
								{ name: "Food", handler: nav.openFood },
								{ name: "Shopping", handler: nav.openShopping },
								{ name: "Schools", handler: nav.openSchools },
								{ name: "Healthcare", handler: nav.openHealthcare },
							] as const
						).map(({ name, handler }) => (
							<button
								key={name}
								type="button"
								onClick={handler}
								className="rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap flex-shrink-0 transition-colors"
							>
								{name}
							</button>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
