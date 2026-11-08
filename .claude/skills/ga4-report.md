---
name: ga4-report
description: Pull a GA4 traffic report for RealCy.app — overview, weekly trend, acquisition sources, top pages, tools breakdown, devices, new vs returning, and countries.
---

# GA4 Traffic Report

Pull a comprehensive GA4 report for RealCy.app using the service account credentials.

## Setup

Credentials are stored at `~/.config/realcy/ga4-key.json`. Always prefix the node command with:

```
GOOGLE_APPLICATION_CREDENTIALS=~/.config/realcy/ga4-key.json
```

GA4 Property ID: `538719276` (also set in `.env.local` as `GA4_PROPERTY_ID`).

If you get `invalid_grant`, the ADC token has expired — but the service account key at `~/.config/realcy/ga4-key.json` does not expire. Always use the service account, not `gcloud auth application-default login`.

## Quick report (last 7 or 30 days)

```bash
GOOGLE_APPLICATION_CREDENTIALS=~/.config/realcy/ga4-key.json node scripts/ga4-stats.mjs 30
```

## Full report (inline script)

Run this to get overview + weekly trend + acquisition + new/returning + devices + top pages + tools breakdown + countries:

```bash
GOOGLE_APPLICATION_CREDENTIALS=~/.config/realcy/ga4-key.json node - <<'EOF'
import { BetaAnalyticsDataClient } from "@google-analytics/data";
const client = new BetaAnalyticsDataClient();
const PROPERTY_ID = "538719276";

const [weekly] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "56daysAgo", endDate: "today" }],
  dimensions: [{ name: "isoYearIsoWeek" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
  orderBys: [{ dimension: { dimensionName: "isoYearIsoWeek" } }],
});

const [sources] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "bounceRate" }, { name: "averageSessionDuration" }],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 10,
});

const [pages] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }, { name: "averageSessionDuration" }, { name: "bounceRate" }],
  orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  limit: 20,
});

const [countries] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  dimensions: [{ name: "country" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 12,
});

const [devices] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  dimensions: [{ name: "deviceCategory" }],
  metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "averageSessionDuration" }],
});

const [newVsReturn] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  dimensions: [{ name: "newVsReturning" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "averageSessionDuration" }],
});

const [toolPages] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }, { name: "averageSessionDuration" }],
  dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/tools/" } } },
  orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  limit: 15,
});

const m = (row, i) => row.metricValues[i].value;
const d = (row, i) => row.dimensionValues[i].value;
const dur = v => { const s = parseFloat(v); return `${Math.floor(s/60)}m${Math.round(s%60)}s`; };
const pct = v => `${(parseFloat(v)*100).toFixed(0)}%`;

console.log("\n========== TRAFFIC REPORT — last 30 days ==========\n");

console.log("── WEEKLY TREND (last 8 weeks) ──");
for (const row of weekly.rows ?? []) {
  const w = d(row,0);
  const label = `W${w.slice(4)} ${w.slice(0,4)}`;
  const bar = "█".repeat(Math.round(parseInt(m(row,0))/3));
  console.log(`  ${label}  ${bar} ${m(row,0)} sessions  ${m(row,1)} users  ${m(row,2)} views`);
}

console.log("\n── ACQUISITION (last 30 days) ──");
for (const row of sources.rows ?? []) {
  const src = `${d(row,0)} / ${d(row,1)}`;
  console.log(`  ${src.padEnd(32)} ${String(m(row,0)).padStart(4)} sessions  bounce ${pct(m(row,2))}  avg ${dur(m(row,3))}`);
}

console.log("\n── NEW vs RETURNING ──");
for (const row of newVsReturn.rows ?? []) {
  console.log(`  ${d(row,0).padEnd(12)} ${String(m(row,0)).padStart(4)} sessions  avg ${dur(m(row,2))}`);
}

console.log("\n── DEVICES ──");
for (const row of devices.rows ?? []) {
  console.log(`  ${d(row,0).padEnd(12)} ${String(m(row,0)).padStart(4)} sessions  bounce ${pct(m(row,1))}  avg ${dur(m(row,2))}`);
}

console.log("\n── TOP PAGES (last 30 days) ──");
for (const row of pages.rows ?? []) {
  console.log(`  ${d(row,0).padEnd(50)} ${String(m(row,0)).padStart(4)} views  ${String(m(row,1)).padStart(3)} users  ${dur(m(row,3))} avg`);
}

console.log("\n── TOOLS BREAKDOWN ──");
if ((toolPages.rows ?? []).length === 0) {
  console.log("  (no tool page views yet)");
} else {
  for (const row of toolPages.rows ?? []) {
    console.log(`  ${d(row,0).padEnd(50)} ${String(m(row,0)).padStart(4)} views  ${String(m(row,1)).padStart(3)} users  ${dur(m(row,2))} avg`);
  }
}

console.log("\n── COUNTRIES ──");
for (const row of countries.rows ?? []) {
  console.log(`  ${d(row,0).padEnd(25)} ${String(m(row,0)).padStart(4)} sessions  ${m(row,1)} users`);
}
EOF
```

## Google Organic deep-dive

```bash
GOOGLE_APPLICATION_CREDENTIALS=~/.config/realcy/ga4-key.json node - <<'EOF'
import { BetaAnalyticsDataClient } from "@google-analytics/data";
const client = new BetaAnalyticsDataClient();
const PROPERTY_ID = "538719276";
const dateRange = { startDate: "90daysAgo", endDate: "today" };
const filter = {
  andGroup: { expressions: [
    { filter: { fieldName: "sessionSource", stringFilter: { value: "google" } } },
    { filter: { fieldName: "sessionMedium", stringFilter: { value: "organic" } } },
  ]}
};

const [pages] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [dateRange],
  dimensions: [{ name: "landingPagePlusQueryString" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "bounceRate" }, { name: "averageSessionDuration" }],
  dimensionFilter: filter,
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 20,
});

const [trend] = await client.runReport({
  property: `properties/${PROPERTY_ID}`,
  dateRanges: [dateRange],
  dimensions: [{ name: "yearMonth" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }],
  dimensionFilter: filter,
  orderBys: [{ dimension: { dimensionName: "yearMonth" } }],
});

const m = (row, i) => row.metricValues[i].value;
const d = (row, i) => row.dimensionValues[i].value;
const dur = v => { const s = parseFloat(v); return `${Math.floor(s/60)}m${Math.round(s%60)}s`; };

console.log("\n=== Google Organic — last 90 days ===\n");
console.log("Monthly trend");
for (const row of trend.rows ?? []) {
  const ym = d(row, 0);
  console.log(`  ${ym.slice(0,4)}-${ym.slice(4)}   ${m(row,0)} sessions   ${m(row,1)} users`);
}
console.log("\nLanding pages");
for (const row of pages.rows ?? []) {
  console.log(`  ${d(row,0).padEnd(50)} ${m(row,0)} sessions  ${(parseFloat(m(row,2))*100).toFixed(0)}% bounce  ${dur(m(row,3))}`);
}
EOF
```
