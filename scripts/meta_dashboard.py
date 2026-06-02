"""Local Meta Ads dashboard for realcy.app.

Auth: save your Meta access token to ~/.config/realcy/meta-access-token.txt
      Get a long-lived token at: https://developers.facebook.com/tools/explorer/
      (select your app → get token → extend to long-lived in Graph API Explorer)

Run:
  scripts/.venv/bin/python scripts/meta_dashboard.py
  Then open: http://localhost:8765
"""

from __future__ import annotations

import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlencode, urlparse, parse_qs
from urllib.request import urlopen
from urllib.error import HTTPError

TOKEN_PATH = os.path.expanduser("~/.config/realcy/meta-access-token.txt")
CAMPAIGN_ID = "6989003237139"
ADSET_ID   = "6989006567539"
AD_ID      = "6989212684739"
PORT       = 8765
API_VER    = "v21.0"
BASE       = f"https://graph.facebook.com/{API_VER}"


def get_token() -> str:
    if os.path.exists(TOKEN_PATH):
        return open(TOKEN_PATH).read().strip()
    t = os.environ.get("META_ACCESS_TOKEN", "").strip()
    if t:
        return t
    print(f"ERROR: No Meta access token found.\n"
          f"  Save it to:  {TOKEN_PATH}\n"
          f"  Or export:   META_ACCESS_TOKEN=your_token\n"
          f"  Get one at:  https://developers.facebook.com/tools/explorer/")
    sys.exit(1)


def api(path: str, params: dict) -> dict:
    params["access_token"] = get_token()
    url = f"{BASE}/{path}?{urlencode(params)}"
    try:
        with urlopen(url) as r:
            return json.loads(r.read())
    except HTTPError as e:
        body = e.read().decode()
        raise RuntimeError(f"Meta API error {e.code}: {body}") from e


def fetch_insights(time_range: str = "maximum") -> dict:
    fields = ",".join([
        "impressions", "reach", "frequency", "spend",
        "clicks", "unique_clicks", "ctr", "cpc", "cpm",
        "actions", "cost_per_action_type",
    ])
    data = api(f"{AD_ID}/insights", {
        "fields": fields,
        "time_range": json.dumps({"since": "2026-05-31", "until": "2099-12-31"})
        if time_range == "maximum" else time_range,
        "level": "ad",
    })
    return data.get("data", [{}])[0] if data.get("data") else {}


def fetch_daily() -> list[dict]:
    fields = "impressions,reach,spend,clicks,ctr,cpc,actions"
    data = api(f"{CAMPAIGN_ID}/insights", {
        "fields": fields,
        "time_increment": 1,
        "time_range": json.dumps({"since": "2026-05-31", "until": "2099-12-31"}),
        "level": "campaign",
    })
    return data.get("data", [])


def action_value(actions: list[dict], action_type: str) -> str:
    for a in (actions or []):
        if a.get("action_type") == action_type:
            return a.get("value", "0")
    return "0"


def cost_per(cost_list: list[dict], action_type: str) -> str:
    for a in (cost_list or []):
        if a.get("action_type") == action_type:
            v = float(a.get("value", 0))
            return f"₪{v:.2f}"
    return "—"


HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RealCy · Ad Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         background: #0f172a; color: #e2e8f0; padding: 24px; min-height: 100vh; }}
  h1 {{ font-size: 1.25rem; font-weight: 700; color: #38bdf8; margin-bottom: 4px; }}
  .sub {{ font-size: 0.75rem; color: #64748b; margin-bottom: 24px; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px; margin-bottom: 24px; }}
  .card {{ background: #1e293b; border-radius: 10px; padding: 16px; }}
  .card .label {{ font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-bottom: 4px; }}
  .card .value {{ font-size: 1.7rem; font-weight: 700; color: #f1f5f9; line-height: 1.1; }}
  .card .explain {{ font-size: 0.7rem; color: #475569; margin-top: 5px; line-height: 1.4; }}
  .card.green .value {{ color: #4ade80; }}
  .card.amber .value {{ color: #fbbf24; }}
  .card.blue  .value {{ color: #38bdf8; }}
  .chart-wrap {{ background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 24px; }}
  .chart-wrap h2 {{ font-size: 0.85rem; font-weight: 600; color: #94a3b8; margin-bottom: 16px; }}
  canvas {{ max-height: 220px; }}
  .status {{ font-size: 0.7rem; color: #475569; text-align: right; }}
  a {{ color: #38bdf8; text-decoration: none; }}
</style>
</head>
<body>
<h1>RealCy · Facebook Ad</h1>
<p class="sub">Targeting: Israel, UK, Germany, Ukraine, USA — ages 28–60 &nbsp;·&nbsp;
Budget: ₪10/day &nbsp;·&nbsp; Auto-refresh every 60s &nbsp;·&nbsp;
<a href="https://www.facebook.com/adsmanager" target="_blank">Open Ads Manager ↗</a></p>

<div class="grid">
  <div class="card blue">
    <div class="label">💸 Total Spent</div>
    <div class="value">{spend}</div>
    <div class="explain">How much money has been charged so far</div>
  </div>
  <div class="card">
    <div class="label">👁 Times Ad Was Shown</div>
    <div class="value">{impressions}</div>
    <div class="explain">Each time your ad appeared on someone's screen (same person can see it multiple times)</div>
  </div>
  <div class="card">
    <div class="label">🧑 Unique People Reached</div>
    <div class="value">{reach}</div>
    <div class="explain">How many different people saw the ad at least once</div>
  </div>
  <div class="card">
    <div class="label">🔁 Times Per Person</div>
    <div class="value">{frequency}</div>
    <div class="explain">On average, each person saw the ad this many times. Keep under 3 to avoid ad fatigue.</div>
  </div>
  <div class="card green">
    <div class="label">👆 People Who Clicked</div>
    <div class="value">{unique_clicks}</div>
    <div class="explain">Unique people who clicked on the ad</div>
  </div>
  <div class="card green">
    <div class="label">🌐 Visited the Website</div>
    <div class="value">{lpv}</div>
    <div class="explain">People who actually landed on realcy.app after clicking (some clicks don't load the page)</div>
  </div>
  <div class="card amber">
    <div class="label">📊 Click Rate</div>
    <div class="value">{ctr}</div>
    <div class="explain">What % of people who saw the ad clicked it. Above 1% is good. Average is 0.5–0.9%.</div>
  </div>
  <div class="card">
    <div class="label">💰 Cost Per Visitor</div>
    <div class="value">{cost_lpv}</div>
    <div class="explain">How much you paid for each person who actually visited the site</div>
  </div>
</div>

<div class="chart-wrap">
  <h2>Daily spend &amp; clicks over time</h2>
  <canvas id="chart"></canvas>
</div>

<p class="status">Last updated: {updated}</p>

<script>
const labels = {labels};
const spendData = {spend_data};
const clickData = {click_data};

new Chart(document.getElementById('chart'), {{
  type: 'bar',
  data: {{
    labels,
    datasets: [
      {{ label: 'Spend (₪)', data: spendData, backgroundColor: 'rgba(56,189,248,0.6)', yAxisID: 'y' }},
      {{ label: 'Clicks', data: clickData, backgroundColor: 'rgba(74,222,128,0.6)', type: 'line',
         borderColor: '#4ade80', pointBackgroundColor: '#4ade80', tension: 0.3, yAxisID: 'y1' }},
    ]
  }},
  options: {{
    responsive: true, maintainAspectRatio: true,
    scales: {{
      y:  {{ position: 'left',  grid: {{ color: '#1e293b' }}, ticks: {{ color: '#64748b' }} }},
      y1: {{ position: 'right', grid: {{ drawOnChartArea: false }}, ticks: {{ color: '#64748b' }} }},
      x:  {{ ticks: {{ color: '#64748b' }} }},
    }},
    plugins: {{ legend: {{ labels: {{ color: '#94a3b8' }} }} }},
  }}
}});

// Auto-refresh
setTimeout(() => location.reload(), 60000);
</script>
</body>
</html>"""


def render(stats: dict, daily: list[dict]) -> str:
    from datetime import datetime

    def fmt_num(v: str) -> str:
        try: return f"{int(v):,}"
        except: return v or "0"

    def fmt_pct(v: str) -> str:
        try: return f"{float(v):.2f}%"
        except: return v or "0%"

    def fmt_ils(v: str) -> str:
        try: return f"₪{float(v):.2f}"
        except: return v or "₪0"

    actions    = stats.get("actions", [])
    cost_list  = stats.get("cost_per_action_type", [])
    lpv        = action_value(actions, "landing_page_view")
    labels     = json.dumps([d["date_start"] for d in daily])
    spend_data = json.dumps([float(d.get("spend", 0)) for d in daily])
    click_data = json.dumps([int(d.get("clicks", 0)) for d in daily])

    return HTML_TEMPLATE.format(
        spend       = fmt_ils(stats.get("spend", "0")),
        impressions = fmt_num(stats.get("impressions", "0")),
        reach       = fmt_num(stats.get("reach", "0")),
        ctr         = fmt_pct(stats.get("ctr", "0")),
        clicks      = fmt_num(stats.get("clicks", "0")),
        unique_clicks = fmt_num(stats.get("unique_clicks", "0")),
        cpm         = fmt_ils(stats.get("cpm", "0")),
        cpc         = fmt_ils(stats.get("cpc", "0")),
        lpv         = fmt_num(lpv),
        cost_lpv    = cost_per(cost_list, "landing_page_view"),
        frequency   = f"{float(stats.get('frequency', 0)):.2f}",
        labels      = labels,
        spend_data  = spend_data,
        click_data  = click_data,
        updated     = datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    )


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_): pass  # suppress request logs

    def do_GET(self):
        try:
            stats = fetch_insights()
            daily = fetch_daily()
            html  = render(stats, daily).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(html)))
            self.end_headers()
            self.wfile.write(html)
        except Exception as e:
            msg = f"<pre style='color:red;background:#111;padding:20px'>{e}</pre>".encode()
            self.send_response(500)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(msg)


def main() -> None:
    print(f"RealCy Meta Dashboard → http://localhost:{PORT}")
    print("Ctrl+C to stop. Page auto-refreshes every 60s.\n")
    server = HTTPServer(("localhost", PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
