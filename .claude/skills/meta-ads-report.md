---
name: meta-ads-report
description: Pull a Meta Ads performance report for RealCy.app — campaigns, spend, CTR, landing page views, and country breakdown. Uses the Pipeboard MCP.
---

# Meta Ads Report

Pull Meta Ads performance data for RealCy.app using the Pipeboard MCP tools.

## Account details

- **Account ID:** `act_26534315` (Adam Morad)
- **Currency:** ILS (Israeli Shekels)
- **Active campaign:** "RealCy — Cyprus Relocation Traffic" (ID: `6989003237139`)
- **Paused campaign:** "RealCy — UK Relocation" (ID: `6987391501739`)

## Steps

### 1. List all campaigns and status

Use `mcp__claude_ai_Pipeboard__get_campaigns` with `account_id: "act_26534315"`.

### 2. Get campaign-level insights (overall performance)

Use `mcp__claude_ai_Pipeboard__get_insights` with:
- `object_id`: campaign ID
- `level`: `"campaign"`
- `time_range`: `"last_30d"` or `"maximum"`

Key metrics to report: impressions, reach, frequency, clicks, CTR, spend, CPC, landing_page_view (from actions), cost per landing_page_view.

### 3. Get country breakdown (critical — reveals budget routing issues)

Use `mcp__claude_ai_Pipeboard__get_insights` with:
- `object_id`: campaign ID
- `level`: `"adset"`
- `time_range`: `"last_30d"`
- `breakdown`: `"country"`

**Known issue:** The adset "Cyprus Relocation Intent — IL, UK, DE, UA, US" routes ~98% of budget to Ukraine because CPMs there (~₪1.63) are 10–15x cheaper than UK/US/DE. IL, UK, DE, US get almost zero impressions. This is a Meta auction arbitrage problem.

**Fix:** Exclude Ukraine from targeting, OR create separate adsets per country with individual budgets so Meta can't route between them.

### 4. Interpret the numbers

Cross-reference Meta "landing page views" against GA4 sessions by source `fb / paid` and `facebook.com / referral`. If Meta reports hundreds of landing page views but GA4 shows only 1–2 sessions from Facebook paid, the traffic is low quality (near-bot Ukrainian Facebook inventory).

## Key benchmarks (from campaign history)

| Metric | Ukraine (cheap) | UK/DE/US (target) |
|---|---|---|
| CPM | ₪1.63 | ₪15–25 |
| CPC | ₪0.14 | N/A (0 clicks) |
| Cost per landing page view | ₪0.19 | N/A |

## Recommendation

Israel (IL) is the highest-value target — it's already the #2 organic country in GA4 (37 sessions/month), CPMs are moderate (~₪5), and the audience has genuine Cyprus relocation intent. Consider an Israel-only adset with a separate budget before expanding to UK/US.
