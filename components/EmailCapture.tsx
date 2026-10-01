"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
	compact?: boolean;
	region?: string;
	source?: string;
	/** Use light text + a dark input for placement on a dark background. */
	onDark?: boolean;
};

export function EmailCapture({
	compact = false,
	region,
	source,
	onDark = false,
}: Props) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

	useEffect(() => {
		try {
			const existing = JSON.parse(
				localStorage.getItem("realcy_subscribers") ?? "[]",
			);
			if (existing.length > 0) setStatus("success");
		} catch {}
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !email.includes("@")) {
			setStatus("error");
			return;
		}
		let isNew = false;
		try {
			const existing = JSON.parse(
				localStorage.getItem("realcy_subscribers") ?? "[]",
			);
			if (!existing.includes(email)) {
				localStorage.setItem(
					"realcy_subscribers",
					JSON.stringify([...existing, email]),
				);
				isNew = true;
			}
		} catch {}
		if (isNew)
			trackEvent("email_signup", {
				source: source ?? "unknown",
				region: region ?? "unknown",
			});
		setStatus("success");
		setEmail("");
	};

	const headline = region
		? `Eyeing ${region} properties?`
		: "Get the free Cyprus Relocation Checklist";

	if (status === "success") {
		return (
			<p
				data-pagefind-ignore
				className={`text-sm font-semibold py-2 ${compact || onDark ? "text-sky-strong" : "text-primary"}`}
			>
				✓ You're on the list, checklist coming your way.
			</p>
		);
	}

	if (compact) {
		return (
			<form
				data-pagefind-ignore
				onSubmit={handleSubmit}
				className="flex gap-2 max-w-sm"
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="your@email.com"
					aria-label="Email address"
					className="min-w-0 flex-1 min-h-11 text-base px-3 rounded-field bg-white/10 border border-white/25 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
				/>
				<button
					type="submit"
					className="min-h-11 text-sm px-4 rounded-field bg-white text-ink font-semibold hover:bg-sky-strong transition-colors whitespace-nowrap"
				>
					Get it free
				</button>
			</form>
		);
	}

	return (
		<form data-pagefind-ignore onSubmit={handleSubmit}>
			<p
				className={`text-sm font-semibold mb-1 ${onDark ? "text-white" : "text-ink"}`}
			>
				{headline}
			</p>
			<p className={`text-xs mb-3 ${onDark ? "text-white/70" : "text-muted"}`}>
				Free Cyprus Relocation Checklist: visas, taxes, banking, and more.
			</p>
			<div className="flex flex-col sm:flex-row gap-2">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="your@email.com"
					aria-label="Email address"
					className={`flex-1 min-h-11 text-base px-4 rounded-field focus:outline-none focus:ring-2 ${
						onDark
							? "bg-white/10 border border-white/30 text-white placeholder-white/60 focus:ring-white"
							: "border border-line bg-white text-ink placeholder-slate-500 focus:ring-focus focus:border-focus"
					}`}
				/>
				<button
					type="submit"
					className={`min-h-11 text-sm px-5 rounded-xl font-semibold transition-colors whitespace-nowrap ${
						onDark
							? "bg-white text-ink hover:bg-sky-strong"
							: "bg-primary text-white hover:bg-primary-hover"
					}`}
				>
					Get the checklist
				</button>
			</div>
			{status === "error" && (
				<p className="text-xs text-red-600 mt-1">
					Please enter a valid email address.
				</p>
			)}
		</form>
	);
}
