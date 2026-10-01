"use client";
import Link from "next/link";

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
