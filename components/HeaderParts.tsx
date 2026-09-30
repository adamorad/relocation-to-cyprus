"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getShortlist, SHORTLIST_EVENT } from "@/lib/shortlist";
import { Icon } from "./icons/Icon";

/** Saved-count, read after mount so server and first client render match. */
export function useSavedCount(): number {
	const pathname = usePathname();
	const [count, setCount] = useState(0);
	// biome-ignore lint/correctness/useExhaustiveDependencies: re-read on route change
	useEffect(() => {
		setCount(getShortlist().length);
		const onStorage = () => setCount(getShortlist().length);
		window.addEventListener("storage", onStorage);
		window.addEventListener(SHORTLIST_EVENT, onStorage);
		return () => {
			window.removeEventListener("storage", onStorage);
			window.removeEventListener(SHORTLIST_EVENT, onStorage);
		};
	}, [pathname]);
	return count;
}

export function Brand() {
	return (
		<Link
			href="/"
			className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-field text-ink"
		>
			{/* biome-ignore lint/performance/noImgElement: static export, tiny decorative SVG */}
			<img
				src="/brand/logo-mark.svg"
				alt=""
				width={38}
				height={38}
				className="h-[38px] w-[38px]"
			/>
			<span className="text-[22px] leading-none tracking-tight">
				<span className="font-extrabold">RealCy</span>
				<span className="font-medium">.app</span>
			</span>
		</Link>
	);
}

export function SavedLink({ className = "" }: { className?: string }) {
	const count = useSavedCount();
	const pathname = usePathname() ?? "/";
	const active = pathname.startsWith("/my-shortlist");
	return (
		<Link
			href="/my-shortlist/"
			aria-current={active ? "page" : undefined}
			aria-label={
				count > 0
					? `Saved, ${count} ${count === 1 ? "listing" : "listings"}`
					: "Saved"
			}
			className={`inline-flex min-h-11 items-center gap-2 rounded-field px-3 text-base font-semibold text-ink hover:bg-sky ${
				active ? "bg-sky" : ""
			} ${className}`}
		>
			<Icon name="heart" size={22} />
			<span>Saved</span>
			{count > 0 ? (
				<span
					aria-hidden="true"
					className="min-w-6 rounded-full bg-primary px-1.5 text-center text-xs font-bold leading-6 text-white"
				>
					{count}
				</span>
			) : null}
		</Link>
	);
}
