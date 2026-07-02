"use client";
import Link from "next/link";
import { PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
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
		</header>
	);
}
