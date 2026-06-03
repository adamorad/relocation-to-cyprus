"""Shared analytics helpers for RealCy dashboard scripts.

Imported by dashboard.py, ga4_dashboard.py, meta_dashboard.py,
and ga4_mark_conversion.py so each helper lives in one place.
"""

from __future__ import annotations

import json
import os
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import urlopen

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange, Dimension, Metric, OrderBy, RunReportRequest,
)
from google.oauth2 import service_account

# ── File paths ────────────────────────────────────────────────────────────────

GA4_KEY_PATH      = os.path.expanduser("~/.config/realcy/ga4-sa.json")
GA4_PROPERTY_FILE = os.path.expanduser("~/.config/realcy/ga4-property-id.txt")
META_TOKEN_FILE   = os.path.expanduser("~/.config/realcy/meta-access-token.txt")

# ── Meta campaign identifiers ─────────────────────────────────────────────────

META_AD_ID          = "6989212684739"  # RealCy — Cyprus Relocation v1
META_CAMPAIGN_ID    = "6989003237139"  # RealCy — Cyprus Relocation Traffic
META_CAMPAIGN_START = "2026-05-31"     # date the campaign launched
META_API_VER        = "v21.0"
META_BASE           = f"https://graph.facebook.com/{META_API_VER}"


# ── GA4 helpers ───────────────────────────────────────────────────────────────

def ga4_client() -> BetaAnalyticsDataClient:
    if os.environ.get("GA4_USE_SERVICE_ACCOUNT") and os.path.exists(GA4_KEY_PATH):
        creds = service_account.Credentials.from_service_account_file(GA4_KEY_PATH)
        return BetaAnalyticsDataClient(credentials=creds)
    return BetaAnalyticsDataClient()


def ga4_property_id() -> str:
    """Return the GA4 property ID or empty string if not configured."""
    if os.path.exists(GA4_PROPERTY_FILE):
        with open(GA4_PROPERTY_FILE) as f:
            return f.read().strip()
    return os.environ.get("GA4_PROPERTY_ID", "").strip()


def run_ga4_report(cli, pid: str, dims, metrics, days: int, order=None, limit: int = 20):
    req = RunReportRequest(
        property=f"properties/{pid}",
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in metrics],
        order_bys=(
            [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order), desc=True)]
            if order else []
        ),
        limit=limit,
    )
    return cli.run_report(req)


# ── Meta helpers ──────────────────────────────────────────────────────────────

def meta_token() -> str:
    """Return the Meta access token or empty string if not configured."""
    if os.path.exists(META_TOKEN_FILE):
        with open(META_TOKEN_FILE) as f:
            return f.read().strip()
    return os.environ.get("META_ACCESS_TOKEN", "")


def meta_api(path: str, params: dict) -> dict:
    """Call the Meta Graph API. Raises RuntimeError on HTTP errors."""
    params["access_token"] = meta_token()
    url = f"{META_BASE}/{path}?{urlencode(params)}"
    try:
        with urlopen(url) as r:
            return json.loads(r.read())
    except HTTPError as e:
        raise RuntimeError(f"Meta API {e.code}: {e.read().decode()}") from e
