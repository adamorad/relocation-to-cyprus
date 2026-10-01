import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NEW_PATH = "/tools/relocation-checklist/";

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
					<p className="text-muted">
						This tool has moved.{" "}
						<Link
							href={NEW_PATH}
							className="text-primary font-medium underline underline-offset-2 hover:text-primary-hover"
						>
							Continue to the new page
						</Link>
					</p>
				</Container>
			</main>
		</>
	);
}
