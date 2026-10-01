import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NEW_PATH = "/tools/tax-residency-tracker/";

export const metadata = {
	title: "Moved",
	robots: { index: false, follow: true },
	alternates: { canonical: `https://realcy.app${NEW_PATH}` },
};

export default function MovedPage() {
	return (
		<>
			<meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />
			<main id="main">
				<Container width="reading" className="py-16 text-center">
					<h1 className="text-2xl font-bold text-ink">This tool has moved</h1>
					<p className="mt-3 text-base text-muted">
						<Link
							href={NEW_PATH}
							className="font-semibold text-primary-hover underline"
						>
							Continue to the new page
						</Link>
					</p>
				</Container>
			</main>
		</>
	);
}
