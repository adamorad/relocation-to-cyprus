import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { GUIDES, guideBySlug } from "@/lib/guides";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RealCy.app guide";

export function generateStaticParams() {
	return GUIDES.map((g) => ({ slug: g.slug }));
}

const CATEGORY: Record<string, string> = {
	immigration: "Residency and visas",
	tax: "Tax",
	business: "Business",
	property: "Home and property",
	family: "Family",
	healthcare: "Health",
	transport: "Getting around",
	lifestyle: "Living in Cyprus",
	environment: "Environment",
};

const asset = (p: string) => readFile(join(process.cwd(), p));

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	const title = guide?.title ?? "RealCy.app";
	const label = (guide && CATEGORY[guide.category]) ?? "Guide";
	const [bold, medium, island, logo] = await Promise.all([
		asset("assets/fonts/Manrope-800.ttf"),
		asset("assets/fonts/Manrope-500.ttf"),
		asset("assets/og-island.jpg"),
		asset("public/brand/logo-mark.svg"),
	]);
	const fontSize = title.length <= 40 ? 64 : title.length <= 70 ? 54 : 46;
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				fontFamily: "Manrope",
				color: "#0b2145",
				background: "linear-gradient(180deg, #ffffff 0%, #e8f8ff 100%)",
			}}
		>
			<div
				style={{
					width: 760,
					padding: "60px 56px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
					<img
						src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
						width={64}
						height={64}
						alt=""
					/>
					<div style={{ display: "flex", fontSize: 36 }}>
						<span style={{ fontWeight: 800 }}>RealCy</span>
						<span style={{ fontWeight: 500 }}>.app</span>
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							fontSize: 24,
							fontWeight: 800,
							color: "#087f98",
							textTransform: "uppercase",
							letterSpacing: 3,
							marginBottom: 18,
						}}
					>
						{label}
					</div>
					<div
						style={{
							fontSize,
							fontWeight: 800,
							lineHeight: 1.1,
							letterSpacing: -1,
						}}
					>
						{title}
					</div>
				</div>
				<div style={{ fontSize: 24, fontWeight: 800, color: "#087f98" }}>
					realcy.app/guides
				</div>
			</div>
			<img
				src={`data:image/jpeg;base64,${island.toString("base64")}`}
				width={440}
				height={630}
				alt=""
			/>
		</div>,
		{
			...size,
			fonts: [
				{ name: "Manrope", data: bold, weight: 800, style: "normal" },
				{ name: "Manrope", data: medium, weight: 500, style: "normal" },
			],
		},
	);
}
