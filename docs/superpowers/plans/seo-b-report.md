# SEO Tier 1–2 — Batch B Report

**Date:** 2026-07-05  
**Branch:** feat/seo-tier1-2  
**Commit:** e3b51b2

---

## 1. Retargeted Pages

### `/sections/mental-health-services/`

| Field | Old | New |
|-------|-----|-----|
| `title` | Mental Health Services in Cyprus | Mental Health Services in Cyprus — Private Clinics & Therapists |
| `description` | English-speaking therapists, psychologists, and psychiatrists across Cyprus. *(73 chars)* | Private mental health clinics in Cyprus — vetted English-speaking therapists and psychiatrists across Limassol, Paphos, Nicosia & Larnaca. *(138 chars)* |
| H1 subtitle (client.tsx) | English-Speaking Therapists | Private Clinics & English-Speaking Therapists |

Target queries: **"cyprus mental health services"** / **"private mental health clinic cyprus"**

---

### `/sections/property-management/`

| Field | Old | New |
|-------|-----|-----|
| `title` | Property Management Companies in Cyprus | Property Management in Cyprus — Vetted Companies & Services |
| `description` | Licensed property managers for non-resident owners renting out their Cyprus property. *(84 chars)* | Property management service in Cyprus for landlords — vetted companies across Limassol, Paphos, Larnaca & Nicosia. English-speaking managers. *(141 chars)* |
| H1 (client.tsx) | Property Management Companies in Cyprus | Property Management in Cyprus |

Target queries: **"property management in cyprus"** / **"property management service in cyprus"**

---

## 2. Meta Descriptions Expanded (8 pages)

| Page | Old chars | New chars | New description |
|------|-----------|-----------|-----------------|
| `property-lawyers` | 72 | 145 | Property lawyers in Cyprus for relocators — vetted conveyancing solicitors across Limassol, Paphos, Larnaca & Nicosia. Foreign buyer specialists. |
| `immigration-lawyers` | 87 | 149 | Immigration lawyers in Cyprus for relocators — specialists in digital nomad visas, PR by investment & work permits across Limassol, Paphos & Nicosia. |
| `accountants` | 85 | 151 | Accountants & tax advisors in Cyprus for relocators — ICPAC-registered firms across Limassol, Paphos, Larnaca & Nicosia. Non-dom filings & company tax. |
| `specialist-doctors` | 76 | 146 | Specialist doctors in Cyprus for relocators — English-speaking consultants with GeSY & private options across Limassol, Paphos, Larnaca & Nicosia. |
| `coworking` | 83 | 152 | Coworking spaces in Cyprus for relocators — vetted venues across Limassol, Paphos, Larnaca & Nicosia. Day-pass prices, WiFi speeds & noise levels rated. |
| `long-term-rentals` | 81 | 155 | Long-term rentals in Cyprus for relocators — verified apartments, villas & studios across Limassol, Paphos, Larnaca & Nicosia. Honest city-by-city pricing. |
| `childcare-nurseries` | 82 | 135 | Childcare & nurseries in Cyprus for relocators — registered venues with English instruction across Limassol, Paphos, Larnaca & Nicosia. |
| `registered-address` | 78 | 142 | Registered address & virtual office providers in Cyprus — vetted services for Cyprus-incorporated companies across Limassol, Paphos & Nicosia. |

All openGraph `title` and `description` are kept in sync with the metadata export via the shared `title`/`description` constants.

---

## 3. Build Result

```
✓ Compiled successfully in 18.1s
✓ Generating static pages using 9 workers (484/484) in 1153ms
```

No errors. `biome check --write app/sections/` fixed formatting across 46 files (import ordering, trailing whitespace) with no lint violations.

---

## 4. Commit

```
e3b51b2  seo: retarget mental-health & property-management pages, expand section meta descriptions
47 files changed (biome also reformatted existing sections during the same pass)
```

---

## 5. Concerns

- `long-term-rentals` hits exactly 155 chars — at the upper limit Google accepts before rewriting. Monitor impressions after indexing; trim one word if Google rewrites it in Search Console.
- Biome reformatted 47 files (import ordering, whitespace) in the same commit. The diff is large; all changes are purely cosmetic and do not affect runtime behaviour.
- `property-management` H1 was simplified from "Property Management Companies in Cyprus" to "Property Management in Cyprus" — omitting "Companies". This better matches the head query but loses a minor keyword; trade-off is acceptable given query volume.
