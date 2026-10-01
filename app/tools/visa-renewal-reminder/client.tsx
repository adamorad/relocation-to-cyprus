"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";

type DocumentType =
	| "visa"
	| "ARC"
	| "yellow-slip"
	| "passport"
	| "health-insurance"
	| "driving-licence"
	| "other";

type Document = {
	id: string;
	name: string;
	type: DocumentType;
	expiryDate: string; // ISO date string
	notes: string;
};

const DOC_TYPE_LABEL: Record<DocumentType, string> = {
	visa: "Visa",
	ARC: "ARC (Alien Registration Certificate)",
	"yellow-slip": "Yellow Slip (EU Registration)",
	passport: "Passport",
	"health-insurance": "Health Insurance",
	"driving-licence": "Driving Licence",
	other: "Other",
};

const DOC_TYPE_OPTIONS: DocumentType[] = [
	"visa",
	"ARC",
	"yellow-slip",
	"passport",
	"health-insurance",
	"driving-licence",
	"other",
];

const STORAGE_KEY = "realcy_visa_reminder_docs";

function daysUntil(dateStr: string): number {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const expiry = new Date(dateStr);
	expiry.setHours(0, 0, 0, 0);
	return Math.round(
		(expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	);
}

type StatusBand = "expired" | "urgent" | "soon" | "ok";

function getStatus(days: number): StatusBand {
	if (days < 0) return "expired";
	if (days <= 30) return "urgent";
	if (days <= 90) return "soon";
	return "ok";
}

const STATUS_STYLES: Record<
	StatusBand,
	{ tone: BadgeTone; row: string; label: string; legend: string }
> = {
	expired: {
		tone: "danger",
		row: "border-red-300 bg-red-50",
		label: "Expired",
		legend: "Expired",
	},
	urgent: {
		tone: "danger",
		row: "border-red-200 bg-red-50",
		label: "Urgent: renew now",
		legend: "30 days or less: urgent",
	},
	soon: {
		tone: "warning",
		row: "border-amber-200 bg-amber-50",
		label: "Renew soon",
		legend: "31 to 90 days: renew soon",
	},
	ok: {
		tone: "success",
		row: "border-line bg-white",
		label: "OK",
		legend: "More than 90 days: OK",
	},
};

const EMPTY_FORM: Omit<Document, "id"> = {
	name: "",
	type: "visa",
	expiryDate: "",
	notes: "",
};

function generateId(): string {
	return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function VisaRenewalReminderPage() {
	const nameId = useId();
	const typeId = useId();
	const expiryId = useId();
	const notesId = useId();
	const [docs, setDocs] = useState<Document[]>([]);
	const [form, setForm] = useState<Omit<Document, "id">>(EMPTY_FORM);
	const [showForm, setShowForm] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [loaded, setLoaded] = useState(false);

	// Load from localStorage on mount
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as Document[];
				setDocs(parsed);
			}
		} catch {
			// ignore parse errors
		}
		setLoaded(true);
	}, []);

	// Save to localStorage when docs change (only after load)
	useEffect(() => {
		if (!loaded) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
	}, [docs, loaded]);

	const addDocument = useCallback(() => {
		setFormError(null);
		if (!form.name.trim()) {
			setFormError("Document name is required.");
			return;
		}
		if (!form.expiryDate) {
			setFormError("Expiry date is required.");
			return;
		}
		const newDoc: Document = { ...form, id: generateId() };
		setDocs((prev) => [...prev, newDoc]);
		setForm(EMPTY_FORM);
		setShowForm(false);
	}, [form]);

	const deleteDocument = useCallback((id: string) => {
		setDocs((prev) => prev.filter((d) => d.id !== id));
	}, []);

	const sortedDocs = [...docs].sort((a, b) => {
		const da = daysUntil(a.expiryDate);
		const db = daysUntil(b.expiryDate);
		return da - db;
	});

	const fieldClass =
		"min-h-11 w-full rounded-field border border-line bg-white px-4 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus";
	const labelClass = "mb-1 block text-sm font-semibold text-ink";

	return (
		<div className="flex flex-col gap-6">
			<Callout tone="info">
				This tool stores data locally in your browser. It is not backed up to
				any server.
			</Callout>

			<ul aria-label="Status legend" className="flex flex-wrap gap-2">
				{(["expired", "urgent", "soon", "ok"] as StatusBand[]).map((s) => (
					<li key={s}>
						<Badge tone={STATUS_STYLES[s].tone}>
							{STATUS_STYLES[s].legend}
						</Badge>
					</li>
				))}
			</ul>

			{loaded && sortedDocs.length === 0 && !showForm && (
				<div className="rounded-card border-2 border-dashed border-line p-8 text-center">
					<p className="mb-4 text-base text-muted">
						No documents yet. Add your first document to start tracking.
					</p>
					<Button onClick={() => setShowForm(true)}>+ Add document</Button>
				</div>
			)}

			{loaded && sortedDocs.length > 0 && (
				<ul className="space-y-3">
					{sortedDocs.map((doc) => {
						const days = daysUntil(doc.expiryDate);
						const status = getStatus(days);
						const styles = STATUS_STYLES[status];
						const expiry = new Date(doc.expiryDate);
						const expiryFormatted = expiry.toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
						});
						return (
							<li
								key={doc.id}
								className={`flex items-start justify-between gap-4 rounded-card border p-4 ${styles.row}`}
							>
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<h2 className="text-base font-bold text-ink">{doc.name}</h2>
										<Badge tone={styles.tone}>{styles.label}</Badge>
									</div>
									<p className="mt-1 text-sm text-muted">
										{DOC_TYPE_LABEL[doc.type]} &middot; Expires{" "}
										{expiryFormatted}
										{" · "}
										{days < 0
											? `${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} ago`
											: days === 0
												? "today"
												: `${days} day${days !== 1 ? "s" : ""} remaining`}
									</p>
									{doc.notes && (
										<p className="mt-1 text-sm italic text-muted">
											{doc.notes}
										</p>
									)}
								</div>
								<Button
									variant="ghost"
									onClick={() => deleteDocument(doc.id)}
									aria-label={`Delete ${doc.name}`}
								>
									Delete
								</Button>
							</li>
						);
					})}
					<li>
						<Button
							variant="secondary"
							fullWidth
							onClick={() => setShowForm(true)}
						>
							+ Add another document
						</Button>
					</li>
				</ul>
			)}

			{showForm && (
				<section
					aria-labelledby="add-doc"
					className="rounded-card border border-line bg-white p-5 shadow-rc"
				>
					<h2 id="add-doc" className="mb-4 text-lg font-bold text-ink">
						Add document
					</h2>

					{formError && (
						<div
							role="alert"
							className="mb-4 rounded-field border border-red-200 bg-red-50 p-3 text-base text-red-800"
						>
							{formError}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label htmlFor={nameId} className={labelClass}>
								Document name <span aria-hidden="true">*</span>
							</label>
							<input
								id={nameId}
								type="text"
								placeholder="e.g. Cyprus ARC, UK Passport, GeSY Card"
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({ ...f, name: e.target.value }))
								}
								className={fieldClass}
							/>
						</div>

						<div>
							<label htmlFor={typeId} className={labelClass}>
								Document type <span aria-hidden="true">*</span>
							</label>
							<select
								id={typeId}
								value={form.type}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										type: e.target.value as DocumentType,
									}))
								}
								className={fieldClass}
							>
								{DOC_TYPE_OPTIONS.map((t) => (
									<option key={t} value={t}>
										{DOC_TYPE_LABEL[t]}
									</option>
								))}
							</select>
						</div>

						<div>
							<label htmlFor={expiryId} className={labelClass}>
								Expiry date <span aria-hidden="true">*</span>
							</label>
							<input
								id={expiryId}
								type="date"
								value={form.expiryDate}
								onChange={(e) =>
									setForm((f) => ({ ...f, expiryDate: e.target.value }))
								}
								className={fieldClass}
							/>
						</div>

						<div>
							<label htmlFor={notesId} className={labelClass}>
								Notes (optional)
							</label>
							<input
								id={notesId}
								type="text"
								placeholder="e.g. Renewal requires in-person appointment"
								value={form.notes}
								onChange={(e) =>
									setForm((f) => ({ ...f, notes: e.target.value }))
								}
								className={fieldClass}
							/>
						</div>

						<div className="flex gap-3 pt-2">
							<Button onClick={addDocument}>Add document</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setShowForm(false);
									setForm(EMPTY_FORM);
									setFormError(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				</section>
			)}

			<section
				aria-labelledby="doc-reference"
				className="rounded-card border border-line bg-sky p-5"
			>
				<h2 id="doc-reference" className="mb-3 text-lg font-bold text-ink">
					Documents to track for Cyprus relocation
				</h2>
				<ul className="space-y-2 text-base text-ink">
					<li>
						<span className="font-semibold">ARC / Yellow Slip</span>: EU
						registration certificate (no expiry) or Alien Registration
						Certificate (period-limited)
					</li>
					<li>
						<span className="font-semibold">Passport</span>: Must be valid
						throughout your residency period; banks and officials check this
						frequently
					</li>
					<li>
						<span className="font-semibold">Visa / Digital Nomad Visa</span>:
						DNV is issued for 1 year, renewable up to 3 years
					</li>
					<li>
						<span className="font-semibold">Health insurance</span>: Required
						for residency applications; check annual renewal dates
					</li>
					<li>
						<span className="font-semibold">Driving licence</span>: Non-EU
						licences must be exchanged within 6 months of becoming a Cyprus
						resident
					</li>
				</ul>
			</section>
		</div>
	);
}
