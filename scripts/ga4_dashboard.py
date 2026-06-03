"""Local GA4 dashboard for realcy.app.

Auth: uses the service-account JSON at ~/.config/realcy/ga4-sa.json
      (same credentials as ga4_report.py — no extra setup needed)

Run:
  scripts/.venv/bin/python scripts/ga4_dashboard.py            # last 7 days
  scripts/.venv/bin/python scripts/ga4_dashboard.py --days 30  # custom range
  Then open: http://localhost:8766
"""

from __future__ import annotations

import argparse
import html
import json
import sys
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from analytics_lib import ga4_client, ga4_property_id, run_ga4_report

PORT = 8766
DAYS = 7  # default, overridden by --days


def fetch_all(days: int) -> dict:
    cli = ga4_client()
    pid = ga4_property_id()
    if not pid:
        sys.exit("ERROR: GA4 property ID not configured. See ga4_report.py for setup instructions.")

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
                        order="screenPageViews", limit=10)
    pages = [
        {"path": r.dimension_values[0].value[:55],
         "views": r.metric_values[0].value,
         "users": r.metric_values[1].value}
        for r in pg.rows
    ]

    src = run_ga4_report(cli, pid, ["sessionSourceMedium"], ["sessions", "engagedSessions"], days,
                         order="sessions", limit=8)
    sources = []
    for r in src.rows:
        s = int(r.metric_values[0].value or 0)
        e = int(r.metric_values[1].value or 0)
        sources.append({
            "source": r.dimension_values[0].value[:35],
            "sessions": s,
            "rate": f"{e/s*100:.0f}%" if s else "0%",
        })

    daily = run_ga4_report(cli, pid, ["date"], ["activeUsers", "sessions"], days, limit=60)
    trend = [
        {"date": r.dimension_values[0].value,
         "users": int(r.metric_values[0].value),
         "sessions": int(r.metric_values[1].value)}
        for r in daily.rows
    ]
    trend.sort(key=lambda x: x["date"])

    return {"overview": overview, "pages": pages, "sources": sources, "trend": trend, "days": days}


HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RealCy · Website Analytics</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         background: #0f172a; color: #e2e8f0; padding: 24px; min-height: 100vh; }}
  h1 {{ font-size: 1.25rem; font-weight: 700; color: #a78bfa; margin-bottom: 4px; }}
  .sub {{ font-size: 0.75rem; color: #64748b; margin-bottom: 24px; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; margin-bottom: 24px; }}
  .card {{ background: #1e293b; border-radius: 10px; padding: 16px; }}
  .card .label {{ font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-bottom: 4px; }}
  .card .value {{ font-size: 1.7rem; font-weight: 700; color: #f1f5f9; line-height: 1.1; }}
  .card .explain {{ font-size: 0.7rem; color: #475569; margin-top: 5px; line-height: 1.4; }}
  .card.green .value {{ color: #4ade80; }}
  .card.amber .value {{ color: #fbbf24; }}
  .card.purple .value {{ color: #a78bfa; }}
  .row {{ display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }}
  .panel {{ background: #1e293b; border-radius: 10px; padding: 20px; }}
  .panel h2 {{ font-size: 0.85rem; font-weight: 600; color: #94a3b8; margin-bottom: 14px; }}
  table {{ width: 100%; border-collapse: collapse; font-size: 0.78rem; }}
  th {{ text-align: left; color: #475569; padding: 0 0 8px; font-weight: 600; font-size: 0.7rem; text-transform: uppercase; }}
  td {{ padding: 6px 0; border-top: 1px solid #0f172a; color: #cbd5e1; }}
  td:last-child {{ text-align: right; color: #94a3b8; }}
  .chart-wrap {{ background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 24px; }}
  .chart-wrap h2 {{ font-size: 0.85rem; font-weight: 600; color: #94a3b8; margin-bottom: 16px; }}
  canvas {{ max-height: 200px; }}
  .days-bar {{ display: flex; gap: 8px; margin-bottom: 20px; }}
  .days-bar a {{ background: #1e293b; color: #94a3b8; border-radius: 6px; padding: 5px 12px;
                 font-size: 0.75rem; text-decoration: none; font-weight: 600; }}
  .days-bar a.active {{ background: #a78bfa; color: #0f172a; }}
  .status {{ font-size: 0.7rem; color: #475569; text-align: right; }}
  a {{ color: #a78bfa; text-decoration: none; }}
  @media (max-width: 640px) {{ .row {{ grid-template-columns: 1fr; }} }}
</style>
</head>
<body>
<h1>RealCy · Website Analytics</h1>
<p class="sub">Source: Google Analytics &nbsp;·&nbsp; Auto-refresh every 60s &nbsp;·&nbsp;
<a href="https://analytics.google.com" target="_blank">Open Google Analytics ↗</a></p>

<div class="days-bar">
  <a href="/?days=1" class="{d1}">Today</a>
  <a href="/?days=7" class="{d7}">7 days</a>
  <a href="/?days=30" class="{d30}">30 days</a>
  <a href="/?days=90" class="{d90}">90 days</a>
</div>

<div class="grid">
  <div class="card purple">
    <div class="label">🧑 Visitors</div>
    <div class="value">{users}</div>
    <div class="explain">Unique people who visited realcy.app</div>
  </div>
  <div class="card">
    <div class="label">✨ First-Time Visitors</div>
    <div class="value">{new_users}</div>
    <div class="explain">People who had never visited before</div>
  </div>
  <div class="card">
    <div class="label">🔄 Total Visits</div>
    <div class="value">{sessions}</div>
    <div class="explain">Total number of site visits (one person can visit multiple times)</div>
  </div>
  <div class="card">
    <div class="label">📄 Pages Viewed</div>
    <div class="value">{pageviews}</div>
    <div class="explain">Total number of pages opened across all visits</div>
  </div>
  <div class="card amber">
    <div class="label">⏱ Avg Time on Site</div>
    <div class="value">{avg_dur}</div>
    <div class="explain">How long visitors stay on average. Over 60s is good.</div>
  </div>
  <div class="card green">
    <div class="label">💬 Engagement Rate</div>
    <div class="value">{engagement}</div>
    <div class="explain">% of visits where someone actually read content (scrolled, clicked, stayed 10s+). Over 50% is healthy.</div>
  </div>
</div>

<div class="chart-wrap">
  <h2>Daily visitors over time</h2>
  <canvas id="chart"></canvas>
</div>

<div class="row">
  <div class="panel">
    <h2>📄 Most visited pages</h2>
    <table>
      <tr><th>Page</th><th>Views</th><th>Visitors</th></tr>
      {pages_rows}
    </table>
  </div>
  <div class="panel">
    <h2>🔗 Where visitors came from</h2>
    <table>
      <tr><th>Source</th><th>Visits</th><th>Engaged</th></tr>
      {source_rows}
    </table>
  </div>
</div>

<p class="status">Last updated: {updated} &nbsp;·&nbsp; Showing last {days} days</p>

<script>
const labels = {labels};
const userData = {user_data};

new Chart(document.getElementById('chart'), {{
  type: 'line',
  data: {{
    labels,
    datasets: [{{
      label: 'Visitors',
      data: userData,
      borderColor: '#a78bfa',
      backgroundColor: 'rgba(167,139,250,0.1)',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: '#a78bfa',
    }}]
  }},
  options: {{
    responsive: true, maintainAspectRatio: true,
    scales: {{
      y: {{ grid: {{ color: '#1e293b' }}, ticks: {{ color: '#64748b' }}, beginAtZero: true }},
      x: {{ ticks: {{ color: '#64748b', maxRotation: 45 }} }},
    }},
    plugins: {{ legend: {{ display: false }} }},
  }}
}});

setTimeout(() => location.reload(), 60000);
</script>
</body>
</html>"""


def render(data: dict, days: int) -> str:
    ov = data["overview"]

    pages_rows = "".join(
        f"<tr><td>{html.escape(p['path'])}</td><td>{p['views']}</td><td>{p['users']}</td></tr>"
        for p in data["pages"]
    ) or "<tr><td colspan='3' style='color:#475569'>No data yet</td></tr>"

    source_rows = "".join(
        f"<tr><td>{html.escape(s['source'])}</td><td>{s['sessions']}</td><td>{s['rate']}</td></tr>"
        for s in data["sources"]
    ) or "<tr><td colspan='3' style='color:#475569'>No data yet</td></tr>"

    trend  = data["trend"]
    labels = json.dumps([t["date"][4:6] + "/" + t["date"][6:] for t in trend])
    udata  = json.dumps([t["users"] for t in trend])

    return HTML.format(
        users       = ov.get("users", "0"),
        new_users   = ov.get("new_users", "0"),
        sessions    = ov.get("sessions", "0"),
        pageviews   = ov.get("pageviews", "0"),
        avg_dur     = ov.get("avg_dur", "0s"),
        engagement  = ov.get("engagement", "0%"),
        pages_rows  = pages_rows,
        source_rows = source_rows,
        labels      = labels,
        user_data   = udata,
        updated     = datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        days        = days,
        d1   = "active" if days == 1  else "",
        d7   = "active" if days == 7  else "",
        d30  = "active" if days == 30 else "",
        d90  = "active" if days == 90 else "",
    )


class Handler(BaseHTTPRequestHandler):
    days: int = DAYS

    def log_message(self, *_): pass

    def do_GET(self):
        qs = parse_qs(urlparse(self.path).query)
        try:
            days = int(qs.get("days", [str(self.days)])[0])
        except ValueError:
            days = self.days
        try:
            data     = fetch_all(days)
            html_out = render(data, days).encode()
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


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--days", type=int, default=DAYS)
    args = p.parse_args()
    Handler.days = args.days
    print(f"RealCy GA4 Dashboard → http://localhost:{PORT}")
    print("Ctrl+C to stop. Page auto-refreshes every 60s.\n")
    server = HTTPServer(("localhost", PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
