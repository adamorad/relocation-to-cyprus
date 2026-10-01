"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, PRIMARY_NAV } from "@/lib/nav-links";
import { Icon } from "./icons/Icon";
import { MoreMenu, TopicsMenu } from "./MoreMenu";

/**
 * Desktop header navigation (hidden below md; mobile uses MobileMenu):
 * Topics menu, Cities, Guides, Tools, search, More.
 */
export function PrimaryNav() {
	const pathname = usePathname() ?? "/";
	return (
		<nav
			aria-label="Primary"
			className="hidden items-center gap-0.5 md:flex lg:gap-2"
		>
			<TopicsMenu />
			{PRIMARY_NAV.map((item) => {
				const active = isActive(pathname, item.href);
				return (
					<Link
						key={item.href}
						href={item.href}
						aria-current={active ? "page" : undefined}
						className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-field px-2.5 text-base lg:px-3 font-semibold hover:bg-sky hover:text-ink ${
							active
								? "bg-sky text-ink underline decoration-primary decoration-2 underline-offset-8"
								: "text-muted"
						}`}
					>
						{item.label}
					</Link>
				);
			})}
			<Link
				href="/explore/"
				aria-label="Search the site"
				aria-current={isActive(pathname, "/explore/") ? "page" : undefined}
				className={`inline-flex h-11 w-11 items-center justify-center rounded-field text-ink hover:bg-sky ${
					isActive(pathname, "/explore/") ? "bg-sky" : ""
				}`}
			>
				<Icon name="search" size={22} />
			</Link>
			<MoreMenu />
		</nav>
	);
}
