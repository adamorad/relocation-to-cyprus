"""RealCy unified analytics dashboard — Meta Ads + GA4.

Auth:
  Meta  → save token to ~/.config/realcy/meta-access-token.txt
  GA4   → uses gcloud ADC (same as ga4_report.py)

Run:
  scripts/.venv/bin/python scripts/dashboard.py
  Then open: http://localhost:8765
"""

from __future__ import annotations

import html
import json
import os
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from analytics_lib import (
    ga4_client, ga4_property_id, run_ga4_report,
    meta_token, meta_api,
    META_AD_ID, META_CAMPAIGN_ID, META_CAMPAIGN_START,
)

PORT = 8765


# ── GA4 ───────────────────────────────────────────────────────────────────────

def fetch_ga4(days: int) -> dict:
    cli = ga4_client()
    pid = ga4_property_id()
    if not pid:
        return {"error": "GA4 property ID not configured"}

    try:
        ov = run_ga4_report(cli, pid, [], [
            "activeUsers", "newUsers", "sessions",
            "engagementRate", "averageSessionDuration", "screenPageViews",
        ], days)
        overview = {}
        if ov.rows:
            r = ov.rows[0]
            overview = {
                "users":      r.metric_values[0].value,
                "new_users":  r.metric_values[1].value,
                "sessions":   r.metric_values[2].value,
                "engagement": f"{float(r.metric_values[3].value or 0):.0%}",
                "avg_dur":    f"{float(r.metric_values[4].value or 0):.0f}s",
                "pageviews":  r.metric_values[5].value,
            }

        pg = run_ga4_report(cli, pid, ["pagePath"], ["screenPageViews", "activeUsers"], days,
                            order="screenPageViews", limit=8)
        pages = [{"path": r.dimension_values[0].value[:50],
                  "views": r.metric_values[0].value,
                  "users": r.metric_values[1].value} for r in pg.rows]

        src = run_ga4_report(cli, pid, ["sessionSourceMedium"], ["sessions", "engagedSessions"], days,
                             order="sessions", limit=7)
        sources = []
        for r in src.rows:
            s = int(r.metric_values[0].value or 0)
            e = int(r.metric_values[1].value or 0)
            sources.append({"source": r.dimension_values[0].value[:35],
                             "sessions": s, "rate": f"{e/s*100:.0f}%" if s else "0%"})

        daily = run_ga4_report(cli, pid, ["date"], ["activeUsers"], days, limit=90)
        trend = sorted([{"date": r.dimension_values[0].value,
                         "users": int(r.metric_values[0].value)} for r in daily.rows],
                       key=lambda x: x["date"])

        return {"overview": overview, "pages": pages, "sources": sources, "trend": trend}
    except Exception as e:
        return {"error": str(e)}


# ── Meta ──────────────────────────────────────────────────────────────────────

def fetch_meta() -> dict:
    if not meta_token():
        return {"error": "No Meta access token"}
    fields = ",".join([
        "impressions", "reach", "frequency", "spend",
        "clicks", "unique_clicks", "ctr", "cpc", "cpm",
        "actions", "cost_per_action_type",
    ])
    time_range = json.dumps({"since": META_CAMPAIGN_START, "until": "2099-12-31"})
    try:
        data = meta_api(f"{META_AD_ID}/insights", {
            "fields": fields,
            "time_range": time_range,
            "level": "ad",
        })
        daily_data = meta_api(f"{META_CAMPAIGN_ID}/insights", {
            "fields": "impressions,spend,clicks",
            "time_increment": 1,
            "time_range": time_range,
            "level": "campaign",
        })
    except RuntimeError as e:
        return {"error": str(e)}

    stats = (data.get("data") or [{}])[0]
    daily = daily_data.get("data", [])

    def av(lst, t):
        return next((a["value"] for a in (lst or []) if a.get("action_type") == t), "0")

    def cp(lst, t):
        v = next((float(a["value"]) for a in (lst or []) if a.get("action_type") == t), 0)
        return f"₪{v:.2f}" if v else "—"

    actions   = stats.get("actions", [])
    cost_list = stats.get("cost_per_action_type", [])

    return {
        "spend":    f"₪{float(stats.get('spend', 0)):.2f}",
        "impr":     f"{int(stats.get('impressions', 0)):,}",
        "reach":    f"{int(stats.get('reach', 0)):,}",
        "freq":     f"{float(stats.get('frequency', 0)):.2f}",
        "clicks":   stats.get("unique_clicks", "0"),
        "ctr":      f"{float(stats.get('ctr', 0)):.2f}%",
        "cpm":      f"₪{float(stats.get('cpm', 0)):.2f}",
        "cpc":      f"₪{float(stats.get('cpc', 0)):.3f}",
        "lpv":      av(actions, "landing_page_view"),
        "cost_lpv": cp(cost_list, "landing_page_view"),
        "daily":    daily,
    }


# ── HTML ──────────────────────────────────────────────────────────────────────

HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>RealCy Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
* {{ box-sizing:border-box; margin:0; padding:0; }}
body {{ font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
       background:#0f172a; color:#e2e8f0; padding:24px; min-height:100vh; }}
header {{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }}
h1 {{ font-size:1.15rem; font-weight:700; color:#f1f5f9; }}
.refresh-btn {{ background:#38bdf8; color:#0f172a; border:none; border-radius:8px;
               padding:8px 18px; font-size:0.8rem; font-weight:700; cursor:pointer;
               display:flex; align-items:center; gap:6px; }}
.refresh-btn:hover {{ background:#7dd3fc; }}
.refresh-btn.loading {{ opacity:.6; pointer-events:none; }}
.ts {{ font-size:0.72rem; color:#475569; margin-bottom:24px; }}

/* Section headers */
.section-head {{ font-size:0.65rem; text-transform:uppercase; letter-spacing:.1em;
                color:#475569; font-weight:700; margin:28px 0 12px; }}
.section-head span {{ background:#1e293b; padding:4px 10px; border-radius:20px; }}

/* Metric cards */
.grid {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(175px,1fr)); gap:10px; }}
.card {{ background:#1e293b; border-radius:10px; padding:15px; }}
.card .lbl {{ font-size:0.78rem; font-weight:600; color:#94a3b8; margin-bottom:4px; }}
.card .val {{ font-size:1.6rem; font-weight:700; color:#f1f5f9; line-height:1.1; }}
.card .hint {{ font-size:0.68rem; color:#475569; margin-top:5px; line-height:1.4; }}
.card.g .val {{ color:#4ade80; }}
.card.a .val {{ color:#fbbf24; }}
.card.b .val {{ color:#38bdf8; }}
.card.p .val {{ color:#a78bfa; }}

/* Charts */
.charts {{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; }}
.chart-box {{ background:#1e293b; border-radius:10px; padding:18px; }}
.chart-box h3 {{ font-size:0.78rem; font-weight:600; color:#94a3b8; margin-bottom:14px; }}
canvas {{ max-height:180px; }}

/* Tables */
.tables {{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; }}
.tbl-box {{ background:#1e293b; border-radius:10px; padding:18px; }}
.tbl-box h3 {{ font-size:0.78rem; font-weight:600; color:#94a3b8; margin-bottom:12px; }}
table {{ width:100%; border-collapse:collapse; font-size:0.75rem; }}
th {{ text-align:left; color:#475569; padding:0 0 7px; font-weight:600;
     font-size:0.68rem; text-transform:uppercase; }}
td {{ padding:5px 0; border-top:1px solid #0f172a; color:#cbd5e1; }}
td:last-child {{ text-align:right; color:#94a3b8; }}

.days-bar {{ display:flex; gap:7px; margin-bottom:14px; }}
.days-bar a {{ background:#0f172a; color:#64748b; border-radius:6px;
               padding:4px 12px; font-size:0.72rem; font-weight:600; text-decoration:none; }}
.days-bar a.on {{ background:#a78bfa; color:#0f172a; }}
.err {{ color:#f87171; font-size:0.8rem; padding:16px; background:#1e293b;
        border-radius:10px; margin-bottom:12px; }}
@media(max-width:640px) {{ .charts,.tables {{ grid-template-columns:1fr; }} }}
</style>
</head>
<body>

<header>
  <h1>🇨🇾 RealCy Dashboard</h1>
  <button class="refresh-btn" onclick="refresh()">&#x21BB; Refresh</button>
</header>
<p class="ts">Last updated: {updated}</p>

<!-- META ADS -->
<div class="section-head"><span>📢 Facebook Ad Performance</span></div>
{meta_error}
<div class="grid">
  <div class="card b"><div class="lbl">💸 Total Spent</div><div class="val">{m_spend}</div><div class="hint">₪10/day budget</div></div>
  <div class="card"><div class="lbl">👁 Times Shown</div><div class="val">{m_impr}</div><div class="hint">Reach: {m_reach} people</div></div>
  <div class="card g"><div class="lbl">👆 Clicked the Ad</div><div class="val">{m_clicks}</div><div class="hint">Cost per click: {m_cpc}</div></div>
  <div class="card g"><div class="lbl">🌐 Visited Website</div><div class="val">{m_lpv}</div><div class="hint">Cost per visit: {m_cost_lpv}</div></div>
  <div class="card a"><div class="lbl">📊 Click Rate</div><div class="val">{m_ctr}</div><div class="hint">Above 1% is good. Avg: 0.5–0.9%</div></div>
  <div class="card"><div class="lbl">🔁 Avg Views / Person</div><div class="val">{m_freq}</div><div class="hint">Keep under 3 to avoid fatigue</div></div>
</div>
<div class="charts">
  <div class="chart-box"><h3>Daily Ad Spend (₪)</h3><canvas id="metaSpend"></canvas></div>
  <div class="chart-box"><h3>Daily Clicks</h3><canvas id="metaClicks"></canvas></div>
</div>

<!-- GA4 -->
<div class="section-head"><span>📈 Website Traffic (Google Analytics)</span></div>
<div class="days-bar">
  <a href="/?days=1" class="{d1}">Today</a>
  <a href="/?days=7" class="{d7}">7 days</a>
  <a href="/?days=30" class="{d30}">30 days</a>
  <a href="/?days=90" class="{d90}">90 days</a>
</div>
{ga4_error}
<div class="grid">
  <div class="card p"><div class="lbl">🧑 Visitors</div><div class="val">{g_users}</div><div class="hint">Unique people</div></div>
  <div class="card"><div class="lbl">✨ First-Timers</div><div class="val">{g_new}</div><div class="hint">Never visited before</div></div>
  <div class="card"><div class="lbl">🔄 Total Visits</div><div class="val">{g_sessions}</div><div class="hint">Same person can visit multiple times</div></div>
  <div class="card"><div class="lbl">📄 Pages Viewed</div><div class="val">{g_pv}</div><div class="hint">Total pages opened</div></div>
  <div class="card a"><div class="lbl">⏱ Avg Time on Site</div><div class="val">{g_dur}</div><div class="hint">Over 60s is good</div></div>
  <div class="card g"><div class="lbl">💬 Engaged Visits</div><div class="val">{g_eng}</div><div class="hint">Scrolled/clicked/stayed 10s+</div></div>
</div>
<div class="charts">
  <div class="chart-box"><h3>Daily Visitors</h3><canvas id="ga4Users"></canvas></div>
  <div class="tbl-box"><h3>📄 Top Pages</h3>
    <table><tr><th>Page</th><th>Views</th></tr>{pages_rows}</table>
  </div>
</div>
<div class="tables">
  <div class="tbl-box"><h3>🔗 Where Visitors Came From</h3>
    <table><tr><th>Source</th><th>Visits</th><th>Engaged</th></tr>{source_rows}</table>
  </div>
</div>

<script>
function refresh() {{
  const btn = document.querySelector('.refresh-btn');
  btn.classList.add('loading');
  btn.textContent = 'Loading…';
  location.reload();
}}

// Meta charts
const mDates  = {m_dates};
const mSpend  = {m_spend_arr};
const mClicks = {m_clicks_arr};
const opts = (color) => ({{
  responsive:true, maintainAspectRatio:true,
  scales:{{
    y:{{grid:{{color:'#0f172a'}}, ticks:{{color:'#64748b'}}, beginAtZero:true}},
    x:{{ticks:{{color:'#64748b', maxRotation:45}}}}
  }},
  plugins:{{legend:{{display:false}}}}
}});

new Chart(document.getElementById('metaSpend'), {{
  type:'bar',
  data:{{ labels:mDates, datasets:[{{data:mSpend, backgroundColor:'rgba(56,189,248,0.6)'}}] }},
  options: opts('#38bdf8')
}});
new Chart(document.getElementById('metaClicks'), {{
  type:'bar',
  data:{{ labels:mDates, datasets:[{{data:mClicks, backgroundColor:'rgba(74,222,128,0.6)'}}] }},
  options: opts('#4ade80')
}});

// GA4 chart
const gDates = {g_dates};
const gUsers = {g_users_arr};
new Chart(document.getElementById('ga4Users'), {{
  type:'line',
  data:{{ labels:gDates, datasets:[{{
    data:gUsers, borderColor:'#a78bfa', backgroundColor:'rgba(167,139,250,0.1)',
    fill:true, tension:0.3, pointBackgroundColor:'#a78bfa'
  }}] }},
  options: opts('#a78bfa')
}});
</script>
</body>
</html>"""


def render(meta: dict, ga4: dict, days: int) -> str:
    meta_err = (
        f'<p class="err">⚠️ Meta error: {html.escape(meta["error"])}</p>'
        if "error" in meta else ""
    )
    ga4_err = (
        f'<p class="err">⚠️ GA4 error: {html.escape(ga4["error"])}</p>'
        if "error" in ga4 else ""
    )

    daily    = meta.get("daily", [])
    m_dates  = json.dumps([d.get("date_start", "") for d in daily])
    m_spends = json.dumps([float(d.get("spend", 0)) for d in daily])
    m_clicks = json.dumps([int(d.get("clicks", 0)) for d in daily])

    trend   = ga4.get("trend", [])
    g_dates = json.dumps([t["date"][4:6] + "/" + t["date"][6:] for t in trend])
    g_uarr  = json.dumps([t["users"] for t in trend])

    ov = ga4.get("overview", {})

    pages_rows = "".join(
        f"<tr><td>{html.escape(p['path'])}</td><td>{p['views']}</td></tr>"
        for p in ga4.get("pages", [])
    ) or "<tr><td colspan='2' style='color:#475569'>No data</td></tr>"

    source_rows = "".join(
        f"<tr><td>{html.escape(s['source'])}</td><td>{s['sessions']}</td><td>{s['rate']}</td></tr>"
        for s in ga4.get("sources", [])
    ) or "<tr><td colspan='3' style='color:#475569'>No data</td></tr>"

    return HTML.format(
        updated      = datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        meta_error   = meta_err,
        m_spend      = meta.get("spend", "—"),
        m_impr       = meta.get("impr", "—"),
        m_reach      = meta.get("reach", "—"),
        m_clicks     = meta.get("clicks", "—"),
        m_cpc        = meta.get("cpc", "—"),
        m_lpv        = meta.get("lpv", "—"),
        m_cost_lpv   = meta.get("cost_lpv", "—"),
        m_ctr        = meta.get("ctr", "—"),
        m_freq       = meta.get("freq", "—"),
        m_dates      = m_dates,
        m_spend_arr  = m_spends,
        m_clicks_arr = m_clicks,
        ga4_error    = ga4_err,
        g_users      = ov.get("users", "—"),
        g_new        = ov.get("new_users", "—"),
        g_sessions   = ov.get("sessions", "—"),
        g_pv         = ov.get("pageviews", "—"),
        g_dur        = ov.get("avg_dur", "—"),
        g_eng        = ov.get("engagement", "—"),
        g_dates      = g_dates,
        g_users_arr  = g_uarr,
        pages_rows   = pages_rows,
        source_rows  = source_rows,
        days         = days,
        d1           = "on" if days == 1  else "",
        d7           = "on" if days == 7  else "",
        d30          = "on" if days == 30 else "",
        d90          = "on" if days == 90 else "",
    )


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_): pass

    def do_GET(self):
        qs = parse_qs(urlparse(self.path).query)
        try:
            days = int(qs.get("days", ["7"])[0])
        except ValueError:
            days = 7
        try:
            meta     = fetch_meta()
            ga4      = fetch_ga4(days)
            html_out = render(meta, ga4, days).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(html_out)))
            self.end_headers()
            self.wfile.write(html_out)
        except Exception as e:
            msg = f"<pre style='color:red;background:#111;padding:20px'>{html.escape(str(e))}</pre>".encode()
            self.send_response(500)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(msg)


def main():
    print(f"RealCy Dashboard → http://localhost:{PORT}")
    print("Ctrl+C to stop.\n")
    HTTPServer(("localhost", PORT), Handler).serve_forever()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped.")
