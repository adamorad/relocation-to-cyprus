"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

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
  return Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

type StatusBand = "expired" | "urgent" | "soon" | "ok";

function getStatus(days: number): StatusBand {
  if (days < 0) return "expired";
  if (days <= 30) return "urgent";
  if (days <= 90) return "soon";
  return "ok";
}

const STATUS_STYLES: Record<StatusBand, { badge: string; row: string; label: string }> = {
  expired: {
    badge: "bg-red-600 text-white",
    row: "border-red-300 bg-red-50",
    label: "EXPIRED",
  },
  urgent: {
    badge: "bg-red-100 text-red-800",
    row: "border-red-200 bg-red-50",
    label: "URGENT: Renew now",
  },
  soon: {
    badge: "bg-amber-100 text-amber-800",
    row: "border-amber-200 bg-amber-50",
    label: "Renew soon",
  },
  ok: {
    badge: "bg-green-100 text-green-800",
    row: "border-slate-200 bg-white",
    label: "OK",
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

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/tools/" className="hover:text-slate-900">Tools</Link>
        {" "}&rsaquo;{" "}
        <span className="text-slate-900">Visa Renewal Reminder</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">Interactive Tool</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Visa & Document Renewal Reminder
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Track expiry dates for your important documents — visas, ARC, passport, insurance, and more. Color-coded alerts so nothing sneaks up on you.
        </p>
        <div className="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600">
          This tool stores data locally in your browser. It is not backed up to any server.
        </div>
      </header>

      {/* Status legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["expired", "urgent", "soon", "ok"] as StatusBand[]).map((s) => (
          <span key={s} className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_STYLES[s].badge}`}>
            {s === "expired" && "Expired"}
            {s === "urgent" && "≤ 30 days — Urgent"}
            {s === "soon" && "31–90 days — Renew soon"}
            {s === "ok" && "90+ days — OK"}
          </span>
        ))}
      </div>

      {/* Document dashboard */}
      {loaded && sortedDocs.length === 0 && !showForm && (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm mb-4">No documents yet. Add your first document to start tracking.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-[#35cdc4] text-white rounded-lg font-medium text-sm hover:bg-[#2ab5ac] transition-colors"
          >
            + Add document
          </button>
        </div>
      )}

      {loaded && sortedDocs.length > 0 && (
        <div className="space-y-3 mb-6">
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
              <div
                key={doc.id}
                className={`border rounded-xl p-4 flex items-start justify-between gap-4 ${styles.row}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{doc.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles.badge}`}>
                      {styles.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {DOC_TYPE_LABEL[doc.type]} &middot; Expires {expiryFormatted}
                    {" · "}
                    {days < 0
                      ? `${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} ago`
                      : days === 0
                      ? "today"
                      : `${days} day${days !== 1 ? "s" : ""} remaining`}
                  </p>
                  {doc.notes && (
                    <p className="text-xs text-slate-600 mt-1 italic">{doc.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors text-xs font-medium flex-shrink-0 mt-0.5"
                  aria-label="Delete document"
                >
                  Delete
                </button>
              </div>
            );
          })}

          <button
            onClick={() => setShowForm(true)}
            className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-[#35cdc4] hover:text-[#35cdc4] transition-colors font-medium"
          >
            + Add another document
          </button>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">Add document</h2>

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {formError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Cyprus ARC, UK Passport, GeSY Card"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as DocumentType }))}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#35cdc4] bg-white"
              >
                {DOC_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{DOC_TYPE_LABEL[t]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expiry date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Renewal requires in-person appointment"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#35cdc4]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={addDocument}
                className="px-5 py-2.5 bg-[#35cdc4] text-white rounded-lg font-medium text-sm hover:bg-[#2ab5ac] transition-colors"
              >
                Add document
              </button>
              <button
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setFormError(null); }}
                className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium text-sm hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick reference */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h2 className="font-bold text-slate-900 mb-3">Documents to track for Cyprus relocation</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li><span className="font-medium text-slate-800">ARC / Yellow Slip</span> — EU registration certificate (no expiry) or Alien Registration Certificate (period-limited)</li>
          <li><span className="font-medium text-slate-800">Passport</span> — Must be valid throughout your residency period; banks and officials check this frequently</li>
          <li><span className="font-medium text-slate-800">Visa / Digital Nomad Visa</span> — DNV is issued for 1 year, renewable up to 3 years</li>
          <li><span className="font-medium text-slate-800">Health insurance</span> — Required for residency applications; check annual renewal dates</li>
          <li><span className="font-medium text-slate-800">Driving licence</span> — Non-EU licences must be exchanged within 6 months of becoming a Cyprus resident</li>
        </ul>
      </div>

      <p className="mt-6 text-sm">
        <Link href="/tools/" className="text-[#35cdc4] hover:underline">
          &larr; Back to tools
        </Link>
      </p>
    </main>
  );
}
