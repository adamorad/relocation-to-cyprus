"use client";
import { Brand } from "./HeaderParts";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
	return (
		<header
			data-pagefind-ignore
			className="sticky top-0 z-40 border-b border-line bg-white"
		>
			<div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
				<Brand />
				<PrimaryNav />
				<MobileMenu />
			</div>
		</header>
	);
}
