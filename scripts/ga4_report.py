"""Pull a structured GA4 report for realcy.app and print it as plain text.

Auth: uses the service-account JSON at ~/.config/realcy/ga4-sa.json
(grant the service account Viewer access on the GA4 property —
Admin → Property access management → Add users → paste the
client_email → role Viewer).

Run:
  scripts/.venv/bin/python scripts/ga4_report.py            # last 7 days
  scripts/.venv/bin/python scripts/ga4_report.py --days 30  # custom
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import Iterable

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    OrderBy,
    RunReportRequest,
)
from google.oauth2 import service_account


KEY_PATH = os.path.expanduser("~/.config/realcy/ga4-sa.json")
PROPERTY_ID_FILE = os.path.expanduser("~/.config/realcy/ga4-property-id.txt")


def get_property_id() -> str:
    """Return the GA4 numeric property ID. Read from a sidecar file if present
    (so we don't hard-code), else fall back to env var, else error out."""
    if os.path.exists(PROPERTY_ID_FILE):
        return open(PROPERTY_ID_FILE).read().strip()
    pid = os.environ.get("GA4_PROPERTY_ID", "").strip()
    if pid:
        return pid
    sys.stderr.write(
        "ERROR: GA4 property ID not configured. Find it in GA4 → Admin → "
        "Property details → Property ID (a number like 502123456). Then:\n"
        f"  echo 502123456 > {PROPERTY_ID_FILE}\n"
    )
    sys.exit(1)


def client() -> BetaAnalyticsDataClient:
    if os.environ.get("GA4_USE_SERVICE_ACCOUNT") and os.path.exists(KEY_PATH):
        creds = service_account.Credentials.from_service_account_file(KEY_PATH)
        return BetaAnalyticsDataClient(credentials=creds)
    return BetaAnalyticsDataClient()  # uses ADC (gcloud auth application-default login)


def run_report(
    cli: BetaAnalyticsDataClient,
    property_id: str,
    dimensions: Iterable[str],
    metrics: Iterable[str],
    days: int,
    order_metric: str | None = None,
    limit: int = 100,
):
    req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        dimensions=[Dimension(name=d) for d in dimensions],
        metrics=[Metric(name=m) for m in metrics],
        order_bys=(
            [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order_metric), desc=True)]
            if order_metric
            else []
        ),
        limit=limit,
    )
    return cli.run_report(req)


def format_table(rows: list[list[str]], headers: list[str]) -> str:
    widths = [max(len(h), *(len(r[i]) for r in rows)) for i, h in enumerate(headers)] if rows else [len(h) for h in headers]
    fmt = "  ".join(f"{{:<{w}}}" for w in widths)
    out = [fmt.format(*headers), fmt.format(*("-" * w for w in widths))]
    for r in rows:
        out.append(fmt.format(*r))
    return "\n".join(out)


def section(title: str) -> None:
    print()
    print("=" * 72)
    print(f"  {title}")
    print("=" * 72)


def report_overview(cli, pid: str, days: int) -> None:
    section(f"OVERVIEW — last {days} days")
    res = run_report(cli, pid, [], ["activeUsers", "newUsers", "sessions", "engagementRate", "averageSessionDuration"], days)
    if not res.rows:
        print("  (no data)")
        return
    r = res.rows[0]
    users = r.metric_values[0].value
    new_users = r.metric_values[1].value
    sessions = r.metric_values[2].value
    engagement = float(r.metric_values[3].value or 0)
    avg_duration = float(r.metric_values[4].value or 0)
    print(f"  Active users:        {users}")
    print(f"  New users:           {new_users}")
    print(f"  Sessions:            {sessions}")
    print(f"  Engagement rate:     {engagement:.1%}")
    print(f"  Avg session length:  {avg_duration:.0f}s")


def report_events(cli, pid: str, days: int) -> None:
    section(f"EVENTS — last {days} days")
    res = run_report(cli, pid, ["eventName"], ["eventCount"], days, order_metric="eventCount", limit=50)
    rows = [[r.dimension_values[0].value, r.metric_values[0].value] for r in res.rows]
    if not rows:
        print("  (no events)")
        return
    print(format_table(rows, ["event_name", "count"]))


def report_pages(cli, pid: str, days: int) -> None:
    section(f"PAGES — last {days} days (top 15 by views)")
    res = run_report(
        cli, pid, ["pagePath"], ["screenPageViews", "userEngagementDuration"], days,
        order_metric="screenPageViews", limit=15,
    )
    rows = []
    for r in res.rows:
        path = r.dimension_values[0].value
        views = r.metric_values[0].value
        dur = float(r.metric_values[1].value or 0)
        rows.append([path[:60], views, f"{dur:.0f}s"])
    if not rows:
        print("  (no data)")
        return
    print(format_table(rows, ["path", "views", "engaged_dur"]))


def report_acquisition(cli, pid: str, days: int) -> None:
    section(f"TRAFFIC ACQUISITION — last {days} days")
    res = run_report(
        cli, pid, ["sessionSourceMedium"], ["sessions", "engagedSessions"], days,
        order_metric="sessions", limit=20,
    )
    rows = []
    for r in res.rows:
        sm = r.dimension_values[0].value
        sessions = int(r.metric_values[0].value or 0)
        engaged = int(r.metric_values[1].value or 0)
        rate = (engaged / sessions * 100) if sessions else 0
        rows.append([sm[:40], str(sessions), str(engaged), f"{rate:.0f}%"])
    if not rows:
        print("  (no data)")
        return
    print(format_table(rows, ["source/medium", "sessions", "engaged", "rate"]))


def report_geography(cli, pid: str, days: int) -> None:
    section(f"GEOGRAPHY — last {days} days (top 10)")
    res = run_report(
        cli, pid, ["country"], ["activeUsers", "sessions"], days,
        order_metric="activeUsers", limit=10,
    )
    rows = [[r.dimension_values[0].value, r.metric_values[0].value, r.metric_values[1].value] for r in res.rows]
    if not rows:
        print("  (no data)")
        return
    print(format_table(rows, ["country", "users", "sessions"]))


def report_funnel(cli, pid: str, days: int) -> None:
    section(f"MAP-UI FUNNEL — last {days} days")
    funnel = ["page_view", "region_select", "listing_open", "developer_click"]
    counts: dict[str, int] = {e: 0 for e in funnel}
    res = run_report(cli, pid, ["eventName"], ["eventCount"], days, limit=200)
    for r in res.rows:
        name = r.dimension_values[0].value
        if name in counts:
            counts[name] = int(r.metric_values[0].value or 0)
    rows = []
    prev = None
    for e in funnel:
        c = counts[e]
        rate = f"{(c / prev * 100):.1f}%" if prev else "—"
        rows.append([e, str(c), rate])
        prev = c if c else prev
    print(format_table(rows, ["step", "count", "→ rate"]))


def report_food_section(cli, pid: str, days: int) -> None:
    section(f"FOOD SECTION ENGAGEMENT — last {days} days")
    food_events = [
        "food_section_open",
        "food_section_close",
        "food_city_filter",
        "food_event_click",
        "food_creator_click",
        "food_place_maps_click",
        "food_place_instagram_click",
    ]
    counts: dict[str, int] = {e: 0 for e in food_events}
    res = run_report(cli, pid, ["eventName"], ["eventCount"], days, limit=200)
    for r in res.rows:
        name = r.dimension_values[0].value
        if name in counts:
            counts[name] = int(r.metric_values[0].value or 0)
    rows = [[e, str(counts[e])] for e in food_events]
    print(format_table(rows, ["event", "count"]))


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--days", type=int, default=7)
    args = p.parse_args()

    cli = client()
    pid = get_property_id()
    days = args.days

    print(f"GA4 property: {pid}")
    print(f"Window: last {days} days")

    report_overview(cli, pid, days)
    report_geography(cli, pid, days)
    report_acquisition(cli, pid, days)
    report_pages(cli, pid, days)
    report_events(cli, pid, days)
    report_funnel(cli, pid, days)
    report_food_section(cli, pid, days)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
