export type NavLink = { label: string; href: string };

export const PRIMARY_NAV: ReadonlyArray<NavLink> = [
	{ label: "Guides", href: "/guides/" },
	{ label: "Tools", href: "/tools/" },
	{ label: "Directories", href: "/sections/" },
	{ label: "Explore", href: "/explore/" },
];

/** True when the current pathname is within the nav item's section. */
export function isActive(pathname: string, href: string): boolean {
	const clean = href.replace(/\/$/, "");
	if (clean === "") return pathname === "/";
	return pathname === clean || pathname.startsWith(`${clean}/`);
}
