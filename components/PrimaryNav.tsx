"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, PRIMARY_NAV } from "@/lib/nav-links";
import { SavedLink } from "./HeaderParts";

/** Desktop header navigation (hidden below md; mobile uses MobileMenu). */
export function PrimaryNav() {
	const pathname = usePathname() ?? "/";
	return (
		<nav
			aria-label="Primary"
			className="hidden items-center gap-1 md:flex lg:gap-3"
		>
			{PRIMARY_NAV.map((item) => {
				const active = isActive(pathname, item.href);
				return (
					<Link
						key={item.href}
						href={item.href}
						aria-current={active ? "page" : undefined}
						className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-field px-3 text-base font-semibold hover:bg-sky hover:text-ink ${
							active
								? "bg-sky text-ink underline decoration-primary decoration-2 underline-offset-8"
								: "text-muted"
						}`}
					>
						{item.label}
					</Link>
				);
			})}
			<SavedLink className="ml-2" />
		</nav>
	);
}
