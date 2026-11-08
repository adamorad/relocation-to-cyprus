#!/usr/bin/env node
// Usage: node scripts/ga4-stats.mjs [days]
// Defaults to last 30 days. Example: node scripts/ga4-stats.mjs 7

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "538719276";

const days = parseInt(process.argv[2] ?? "30", 10);
const dateRange = { startDate: `${days}daysAgo`, endDate: "today" };

// Uses Application Default Credentials (gcloud auth application-default login)
const client = new BetaAnalyticsDataClient();

async function run() {
  const [overview] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [dateRange],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
      { name: "newUsers" },
      { name: "screenPageViews" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
    ],
  });

  const [topPages] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10,
  });

  const [topSources] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 10,
  });

  const [countries] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "country" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 8,
  });

  const m = (row, i) => row.metricValues[i].value;
  const d = (row, i) => row.dimensionValues[i].value;
  const ov = overview.rows?.[0];

  console.log(`\n=== GA4 — last ${days} days ===\n`);

  if (ov) {
    const dur = parseFloat(m(ov, 5));
    const mins = Math.floor(dur / 60);
    const secs = Math.round(dur % 60);
    console.log("Overview");
    console.log(`  Sessions:          ${Number(m(ov, 0)).toLocaleString()}`);
    console.log(`  Total users:       ${Number(m(ov, 1)).toLocaleString()}`);
    console.log(`  New users:         ${Number(m(ov, 2)).toLocaleString()}`);
    console.log(`  Page views:        ${Number(m(ov, 3)).toLocaleString()}`);
    console.log(`  Bounce rate:       ${(parseFloat(m(ov, 4)) * 100).toFixed(1)}%`);
    console.log(`  Avg session:       ${mins}m ${secs}s`);
  }

  console.log("\nTop pages");
  for (const row of topPages.rows ?? []) {
    console.log(`  ${d(row, 0).padEnd(45)} ${Number(m(row, 0)).toLocaleString()} views  ${Number(m(row, 1)).toLocaleString()} users`);
  }

  console.log("\nTop sources");
  for (const row of topSources.rows ?? []) {
    console.log(`  ${(d(row, 0) + " / " + d(row, 1)).padEnd(30)} ${Number(m(row, 0)).toLocaleString()} sessions`);
  }

  console.log("\nTop countries");
  for (const row of countries.rows ?? []) {
    console.log(`  ${d(row, 0).padEnd(25)} ${Number(m(row, 0)).toLocaleString()} sessions`);
  }

  console.log("");
}

run().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
