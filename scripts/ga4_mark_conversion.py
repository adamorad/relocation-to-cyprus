"""Mark listing_open as a GA4 conversion event via the Admin API.

Auth: same ADC credentials as ga4_report.py
      (gcloud auth application-default login)

Run:
  scripts/.venv/bin/python scripts/ga4_mark_conversion.py
"""

from __future__ import annotations

import sys

from google.analytics.admin import AnalyticsAdminServiceClient
from google.analytics.admin_v1alpha.types import ConversionEvent

from analytics_lib import ga4_property_id

EVENT_NAME = "listing_open"


def main() -> None:
    pid = ga4_property_id()
    if not pid:
        sys.exit("ERROR: GA4 property ID not configured.")

    parent = f"properties/{pid}"
    client = AnalyticsAdminServiceClient()

    existing = client.list_conversion_events(parent=parent)
    already  = any(e.event_name == EVENT_NAME for e in existing)
    if already:
        print(f"'{EVENT_NAME}' is already marked as a conversion — nothing to do.")
        return

    result = client.create_conversion_event(
        parent=parent,
        conversion_event=ConversionEvent(event_name=EVENT_NAME),
    )
    print(f"Done. Conversion event created: {result.name}")
    print(f"Event '{EVENT_NAME}' will now count as an engaged session in GA4.")


if __name__ == "__main__":
    main()
