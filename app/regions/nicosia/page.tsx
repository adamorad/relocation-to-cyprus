import type { Metadata } from "next";
import Link from "next/link";

/**
 * Owner rule: this region is intentionally excluded from RealCy.app. The old
 * URL is kept only as a static redirect stub to the regions index so existing
 * links do not 404. It is noindex and is not in the sitemap or any list.
 */
const TARGET = "/regions/";

export const metadata: Metadata = {
	title: "Moved",
	robots: { index: false, follow: true },
	alternates: { canonical: TARGET },
};

export default function RegionRedirectPage() {
	return (
		<main id="main" className="max-w-xl mx-auto px-6 py-16 text-center">
			<meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static-export redirect
				dangerouslySetInnerHTML={{
					__html: `location.replace(${JSON.stringify(TARGET)});`,
				}}
			/>
			<p className="text-slate-600">
				This page has moved.{" "}
				<Link
					href={TARGET}
					className="text-primary font-medium underline underline-offset-2 hover:text-primary-hover"
				>
					Continue to all regions
				</Link>
			</p>
		</main>
	);
}
