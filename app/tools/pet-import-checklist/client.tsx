"use client";

import Link from "next/link";
import { useState } from "react";

// ── types ────────────────────────────────────────────────────────────────────

type PetType = "dog" | "cat" | "ferret" | "bird" | "rabbit";
type OriginRegion = "eu" | "listed2" | "unlisted";

interface ChecklistItem {
  id: string;
  text: string;
  timing: "now" | "weeks" | "days" | "arrival";
  critical?: boolean;
  note?: string;
}

// ── checklist data ────────────────────────────────────────────────────────────

function getChecklist(
  pet: PetType,
  origin: OriginRegion,
): ChecklistItem[] {
  if (pet === "bird") {
    return [
      {
        id: "bird-cites",
        text: "Obtain CITES permit (required for most parrots and protected species)",
        timing: "now",
        critical: true,
        note: "Most parrot species are CITES Appendix II — check before purchasing or travelling.",
      },
      {
        id: "bird-import-permit",
        text: "Apply for import permit from Cyprus Veterinary Services (minimum 60 days in advance)",
        timing: "weeks",
        critical: true,
        note: "Apply at least 60 days before planned travel.",
      },
      {
        id: "bird-ai-test",
        text: "Avian influenza (H5N1) test — must be negative within 10 days before travel",
        timing: "days",
      },
      {
        id: "bird-health-cert",
        text: "Health certificate issued by an official vet within 10 days of travel",
        timing: "days",
      },
      {
        id: "bird-quarantine",
        text: "Arrange minimum 30-day quarantine in an approved facility on arrival (at your expense)",
        timing: "arrival",
        critical: true,
        note: "Book in advance — approved facilities are limited.",
      },
      {
        id: "bird-border",
        text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
        timing: "arrival",
      },
    ];
  }

  if (pet === "rabbit") {
    return [
      {
        id: "rabbit-health-cert",
        text: "Health certificate from an official vet",
        timing: "days",
      },
      {
        id: "rabbit-declare",
        text: "Declare your pet at the border on arrival",
        timing: "arrival",
      },
      {
        id: "rabbit-border",
        text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
        timing: "arrival",
      },
    ];
  }

  if (pet === "ferret") {
    // Ferrets follow similar rules to dogs/cats for EU/UK, and stricter for others
    const base = getDogCatChecklist(origin);
    return base;
  }

  // dog or cat
  return getDogCatChecklist(origin);
}

function getDogCatChecklist(origin: OriginRegion): ChecklistItem[] {
  if (origin === "eu") {
    return [
      {
        id: "eu-microchip",
        text: "ISO 15-digit microchip — must be implanted BEFORE or on the same day as the first rabies vaccine",
        timing: "now",
      },
      {
        id: "eu-rabies-vax",
        text: "Rabies vaccination (primary + booster if required; must be within validity period)",
        timing: "now",
      },
      {
        id: "eu-passport",
        text: "EU Pet Passport or Animal Health Certificate (AHC) issued by an official vet",
        timing: "weeks",
      },
      {
        id: "eu-tapeworm",
        text: "Tapeworm (Praziquantel) treatment by vet — required 24–120 hours before entering Cyprus",
        timing: "days",
        note: "Dogs only. Treatment must be recorded in the pet passport / AHC.",
      },
      {
        id: "eu-border",
        text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
        timing: "arrival",
      },
      {
        id: "eu-declaration",
        text: "Notify Cyprus Veterinary Services on arrival — complete declaration form",
        timing: "arrival",
      },
    ];
  }

  if (origin === "listed2") {
    return [
      {
        id: "l2-microchip",
        text: "ISO 15-digit microchip — must be implanted FIRST, before any vaccines",
        timing: "now",
        critical: true,
        note: "If microchip is implanted after a rabies vaccine, that vaccine does not count.",
      },
      {
        id: "l2-rabies-vax",
        text: "Primary rabies vaccination (administered AFTER microchip; pet must be at least 12 weeks old)",
        timing: "now",
      },
      {
        id: "l2-titre-test",
        text: "Rabies Neutralising Antibody Titre Test (RNATT) — done 30+ days after primary vaccination at an EU-approved lab; titre must be ≥ 0.5 IU/ml",
        timing: "now",
        critical: true,
        note: "If the titre fails, you must give a booster and wait 30+ days, then retest. Book an EU-approved lab in advance.",
      },
      {
        id: "l2-wait",
        text: "MANDATORY 3-month wait after a successful titre test result before travelling to Cyprus",
        timing: "weeks",
        critical: true,
        note: "This is non-negotiable. The 3-month clock starts from the date of the blood sample, not the result date.",
      },
      {
        id: "l2-health-cert",
        text: "Veterinary health certificate issued within 10 days of travel, endorsed by official authority (APHIS — USA; CFIA — Canada; AQIS — Australia)",
        timing: "days",
      },
      {
        id: "l2-tapeworm",
        text: "Tapeworm (Praziquantel) treatment by vet — 24–120 hours before entry (dogs only)",
        timing: "days",
        note: "Must be recorded in the health certificate.",
      },
      {
        id: "l2-border",
        text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
        timing: "arrival",
      },
      {
        id: "l2-declaration",
        text: "Notify Cyprus Veterinary Services on arrival — complete declaration form",
        timing: "arrival",
      },
    ];
  }

  // unlisted
  return [
    {
      id: "ul-microchip",
      text: "ISO 15-digit microchip — must be implanted FIRST, before any vaccines",
      timing: "now",
      critical: true,
      note: "If microchip is implanted after a rabies vaccine, that vaccine does not count.",
    },
    {
      id: "ul-rabies-vax",
      text: "Primary rabies vaccination (administered AFTER microchip; pet must be at least 12 weeks old)",
      timing: "now",
    },
    {
      id: "ul-titre-test",
      text: "Rabies Neutralising Antibody Titre Test (RNATT) — done 30+ days after primary vaccination at an EU-approved lab; titre must be ≥ 0.5 IU/ml",
      timing: "now",
      critical: true,
      note: "If the titre fails, you must give a booster and wait 30+ days, then retest.",
    },
    {
      id: "ul-wait",
      text: "MANDATORY 3-month wait after a successful titre test result before travelling to Cyprus",
      timing: "weeks",
      critical: true,
      note: "This is non-negotiable. The 3-month clock starts from the date of the blood sample.",
    },
    {
      id: "ul-confirm",
      text: "Contact Cyprus Veterinary Services directly to confirm current requirements for your specific country",
      timing: "now",
      critical: true,
      note: "Unlisted countries may face additional quarantine requirements on arrival at owner's cost.",
    },
    {
      id: "ul-health-cert",
      text: "Veterinary health certificate issued within 10 days of travel, endorsed by your country's official veterinary authority",
      timing: "days",
    },
    {
      id: "ul-tapeworm",
      text: "Tapeworm (Praziquantel) treatment by vet — 24–120 hours before entry (dogs only)",
      timing: "days",
      note: "Must be recorded in the health certificate.",
    },
    {
      id: "ul-quarantine",
      text: "Be prepared for possible isolation or quarantine on arrival at your expense — confirm with Cyprus Veterinary Services",
      timing: "arrival",
      critical: true,
    },
    {
      id: "ul-border",
      text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
      timing: "arrival",
    },
    {
      id: "ul-declaration",
      text: "Notify Cyprus Veterinary Services on arrival — complete declaration form",
      timing: "arrival",
    },
  ];
}

// ── timeline data (Part 2 countries) ─────────────────────────────────────────

const TIMELINE_STEPS = [
  { label: "Microchip", sub: "Day 0", color: "bg-slate-700" },
  { label: "Rabies vaccine", sub: "Day 0+", color: "bg-blue-600" },
  { label: "Titre test", sub: "30+ days after vaccine", color: "bg-amber-500" },
  { label: "3-month wait", sub: "Starts from blood draw", color: "bg-rose-500" },
  { label: "Health cert", sub: "10 days before travel", color: "bg-teal-600" },
  { label: "Travel day", sub: "Tapeworm (dogs)", color: "bg-slate-400" },
  { label: "Cyprus", sub: "Declare at border", color: "bg-[#35cdc4]" },
];

// ── constants ─────────────────────────────────────────────────────────────────

const PET_OPTIONS: { id: PetType; label: string; emoji: string }[] = [
  { id: "dog", label: "Dog", emoji: "🐕" },
  { id: "cat", label: "Cat", emoji: "🐈" },
  { id: "ferret", label: "Ferret", emoji: "🐾" },
  { id: "bird", label: "Bird / Parrot", emoji: "🦜" },
  { id: "rabbit", label: "Rabbit / Small animal", emoji: "🐇" },
];

const ORIGIN_OPTIONS: {
  id: OriginRegion;
  label: string;
  sub: string;
  badge: string;
  badgeColor: string;
}[] = [
  {
    id: "eu",
    label: "EU / EEA / Switzerland / UK",
    sub: "Easiest route — Listed Part 1",
    badge: "Straightforward",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: "listed2",
    label: "USA, Canada, Australia, UAE, Israel, Japan, Singapore, NZ, South Korea, Chile…",
    sub: "Listed Part 2 — months-long process, start immediately",
    badge: "Plan months ahead",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "unlisted",
    label: "All other countries (Russia, China, India, Brazil, most of Africa, etc.)",
    sub: "Unlisted / high-risk — strictest rules, possible quarantine",
    badge: "Most complex",
    badgeColor: "bg-rose-100 text-rose-800",
  },
];

const TIMING_GROUPS: {
  key: "now" | "weeks" | "days" | "arrival";
  label: string;
  color: string;
  badgeBg: string;
}[] = [
  {
    key: "now",
    label: "Start now",
    color: "border-rose-300",
    badgeBg: "bg-rose-100 text-rose-800",
  },
  {
    key: "weeks",
    label: "Weeks before travel",
    color: "border-amber-300",
    badgeBg: "bg-amber-100 text-amber-800",
  },
  {
    key: "days",
    label: "Days before travel (within 10 days)",
    color: "border-blue-300",
    badgeBg: "bg-blue-100 text-blue-800",
  },
  {
    key: "arrival",
    label: "On arrival in Cyprus",
    color: "border-teal-300",
    badgeBg: "bg-teal-100 text-teal-800",
  },
];

// ── main component ────────────────────────────────────────────────────────────

export default function PetImportChecklistClient() {
  const [pet, setPet] = useState<PetType | null>(null);
  const [origin, setOrigin] = useState<OriginRegion | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const showTimeline =
    (pet === "dog" || pet === "cat" || pet === "ferret") && origin === "listed2";

  const checklist =
    pet && origin ? getChecklist(pet, origin) : [];

  const hasCritical = checklist.some((i) => i.critical);

  function toggleItem(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const totalDone = checklist.filter((i) => checked[i.id]).length;
  const totalItems = checklist.length;

  return (
    <main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      {/* breadcrumb */}
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href="/tools/" className="hover:text-slate-900">
          Tools
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">Cyprus Pet Import Checklist</span>
      </nav>

      {/* header */}
      <header className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-rose-700 font-bold">
          Lifestyle
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Cyprus Pet Import Checklist
        </h1>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
          Answer two questions and get a personalised checklist of every step required to
          bring your pet into Cyprus — with timing guidance so nothing catches you off guard.
        </p>
      </header>

      {/* Step 1 — pet type */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
          Step 1 — What type of pet?
        </h2>
        <div className="flex flex-wrap gap-3">
          {PET_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setPet(opt.id);
                setChecked({});
              }}
              className={`flex flex-col items-center gap-1 px-5 py-4 rounded-xl border text-sm font-semibold transition-colors ${
                pet === opt.id
                  ? "bg-[#35cdc4] border-[#35cdc4] text-slate-900 shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#35cdc4]"
              }`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2 — origin */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
          Step 2 — Where are you travelling from?
        </h2>
        <div className="flex flex-col gap-3">
          {ORIGIN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setOrigin(opt.id);
                setChecked({});
              }}
              className={`text-left p-4 rounded-xl border transition-colors ${
                origin === opt.id
                  ? "bg-[#35cdc4]/10 border-[#35cdc4] shadow-sm"
                  : "bg-white border-slate-200 hover:border-[#35cdc4]"
              }`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {opt.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{opt.sub}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${opt.badgeColor}`}
                >
                  {opt.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      {pet && origin && checklist.length > 0 && (
        <>
          {/* Critical warning banner */}
          {origin === "listed2" && (pet === "dog" || pet === "cat" || pet === "ferret") && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl">
              <p className="text-sm font-bold text-amber-900 mb-1">
                Months-long process — start planning immediately
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                The titre test + mandatory 3-month wait means the minimum time from starting
                preparations to arriving in Cyprus is approximately 5–6 months.
                Begin as soon as possible.
              </p>
            </div>
          )}

          {origin === "unlisted" && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-300 rounded-xl">
              <p className="text-sm font-bold text-rose-900 mb-1">
                High-risk / unlisted country — contact Cyprus Veterinary Services first
              </p>
              <p className="text-xs text-rose-800 leading-relaxed">
                Requirements for unlisted countries include all Part 2 steps plus possible
                quarantine on arrival. Confirm the current rules for your specific country
                directly with the Cyprus Veterinary Services (Ktiniatrikí Ypiresia) before
                making any arrangements.
              </p>
            </div>
          )}

          {pet === "bird" && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl">
              <p className="text-sm font-bold text-amber-900 mb-1">
                Birds face significant import restrictions
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Very few exotic birds can enter Cyprus without substantial paperwork.
                A mandatory 30-day quarantine applies to all birds on arrival.
                Begin the import permit application at least 60 days in advance.
              </p>
            </div>
          )}

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-slate-600">
                Progress
              </p>
              <p className="text-xs text-slate-500">
                {totalDone} / {totalItems} complete
              </p>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#35cdc4] rounded-full transition-all duration-300"
                style={{
                  width:
                    totalItems > 0
                      ? `${(totalDone / totalItems) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          {/* Timeline visualiser (Part 2 only) */}
          {showTimeline && (
            <section className="mb-8 p-5 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">
                Timeline overview (Listed Part 2)
              </h2>
              <div className="flex items-start min-w-[600px]">
                {TIMELINE_STEPS.map((step, i) => (
                  <div key={i} className="flex items-start flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${step.color}`}
                      />
                      <p className="text-[10px] font-semibold text-slate-800 text-center mt-1 leading-tight">
                        {step.label}
                      </p>
                      <p className="text-[9px] text-slate-500 text-center mt-0.5 leading-tight">
                        {step.sub}
                      </p>
                    </div>
                    {i < TIMELINE_STEPS.length - 1 && (
                      <div className="flex-1 h-px bg-slate-300 mt-2 mx-1 min-w-[16px]" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Checklist grouped by timing */}
          <section className="mb-8">
            <h2 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">
              Step 3 — Your checklist
            </h2>
            <div className="flex flex-col gap-6">
              {TIMING_GROUPS.map((group) => {
                const items = checklist.filter((i) => i.timing === group.key);
                if (items.length === 0) return null;
                return (
                  <div key={group.key}>
                    <div
                      className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${group.color}`}
                    >
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${group.badgeBg}`}
                      >
                        {group.label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {items.map((item) => (
                        <ChecklistItemRow
                          key={item.id}
                          item={item}
                          checked={!!checked[item.id]}
                          onToggle={() => toggleItem(item.id)}
                          badgeBg={group.badgeBg}
                          badgeLabel={group.label}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Verification footer */}
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1">Approved entry points</p>
            <p>
              Pets may only enter Cyprus via <strong>Larnaca International Airport</strong> or{" "}
              <strong>Limassol Port</strong>. Entry via any other crossing is not permitted.
            </p>
          </div>
        </>
      )}

      {/* Empty state */}
      {(!pet || !origin) && (
        <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          Select your pet type and origin above to generate your personalised checklist.
        </div>
      )}

      {/* Disclaimer */}
      <aside className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">Disclaimer</p>
        <p>
          General information only — not veterinary or legal advice. Always verify
          current requirements with{" "}
          <strong>Cyprus Veterinary Services (Ktiniatrikí Ypiresia)</strong> before
          travelling. Import rules can change without notice.
        </p>
      </aside>

      <p className="mt-8 text-xs text-slate-500">
        <Link href="/tools/" className="underline hover:text-slate-900">
          &larr; Back to Tools
        </Link>
      </p>
    </main>
  );
}

// ── sub-component ─────────────────────────────────────────────────────────────

function ChecklistItemRow({
  item,
  checked,
  onToggle,
  badgeBg,
  badgeLabel,
}: {
  item: ChecklistItem;
  checked: boolean;
  onToggle: () => void;
  badgeBg: string;
  badgeLabel: string;
}) {
  return (
    <div
      className={`p-4 rounded-xl border transition-colors ${
        item.critical
          ? "border-amber-300 bg-amber-50"
          : "border-slate-200 bg-white"
      } ${checked ? "opacity-60" : ""}`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={checked ? "Mark as incomplete" : "Mark as complete"}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked
              ? "bg-[#35cdc4] border-[#35cdc4]"
              : "border-slate-300 hover:border-[#35cdc4]"
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium leading-snug ${
              checked ? "line-through text-slate-400" : "text-slate-900"
            }`}
          >
            {item.critical && (
              <span className="inline-block mr-1.5 text-amber-500 font-bold">!</span>
            )}
            {item.text}
          </p>
          {item.note && (
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              {item.note}
            </p>
          )}
        </div>
        <span
          className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${badgeBg}`}
        >
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}
