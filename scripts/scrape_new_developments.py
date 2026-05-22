"""Scrape every new-building listing from bazaraki.com.

Strategy: bazaraki is a Next.js app, so each page embeds the full JSON payload in
a `<script id="__NEXT_DATA__">` element. We use CloakBrowser to get past
Cloudflare, then parse the JSON directly instead of scraping the DOM. One .txt
per listing is written to listings/new_developments/, named by slug.

Resumable: a listing whose file already exists is skipped.
"""
from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path
from typing import Any

from cloakbrowser import launch

BASE = "https://www.bazaraki.com"
INDEX_PATH = "/new-buildings/"
OUT_DIR = Path(__file__).resolve().parent.parent / "listings" / "new_developments"
NEXT_DATA_RE = re.compile(
    r'<script[^>]+id="__NEXT_DATA__"[^>]*>(.+?)</script>', re.S
)
PAGE_DELAY_SECONDS = 1.2


def get_next_data(html: str) -> dict[str, Any]:
    m = NEXT_DATA_RE.search(html)
    if not m:
        raise RuntimeError("__NEXT_DATA__ block not found")
    return json.loads(m.group(1))


def fetch(page, url: str) -> str:
    page.goto(url, wait_until="domcontentloaded", timeout=60_000)
    # Brief settle to let any post-load JS run; Next.js content is SSR'd so the
    # __NEXT_DATA__ blob is already there, but this also lets the CF challenge
    # finish if it triggered.
    page.wait_for_timeout(1500)
    return page.content()


def collect_all_slugs(page) -> list[str]:
    """Page through /new-buildings/ until the `list` array comes back empty."""
    slugs: list[str] = []
    seen: set[str] = set()
    for page_num in range(1, 50):
        url = f"{BASE}{INDEX_PATH}?page={page_num}"
        print(f"[index] page {page_num} → {url}")
        html = fetch(page, url)
        data = get_next_data(html)
        listings = data["props"]["pageProps"].get("list") or []
        total = data["props"]["pageProps"].get("count")
        if not listings:
            print(f"[index] empty page, stopping. total reported by site = {total}")
            break
        new_count = 0
        for item in listings:
            slug = item.get("slug")
            if slug and slug not in seen:
                seen.add(slug)
                slugs.append(slug)
                new_count += 1
        print(f"[index] +{new_count} new, {len(slugs)} total (site count={total})")
        time.sleep(PAGE_DELAY_SECONDS)
    return slugs


def safe_get(d: dict, *keys: str, default: Any = None) -> Any:
    cur: Any = d
    for k in keys:
        if not isinstance(cur, dict):
            return default
        cur = cur.get(k)
        if cur is None:
            return default
    return cur


def format_offer(o: dict[str, Any]) -> str:
    feats = {f.get("slug"): f.get("value") for f in o.get("features", []) or []}
    parts = [
        f"  Unit {o.get('title') or o.get('id')}:",
        f"    price:          {o.get('price', '') or '—'}",
        f"    price per m²:   {o.get('square_meter_price', '') or '—'}",
        f"    bedrooms:       {feats.get('bedrooms', '—')}",
        f"    bathrooms:      {feats.get('bathrooms', '—')}",
        f"    living area:    {feats.get('living_area', '—')}",
        f"    plot/land:      {feats.get('land_area', '—')}",
        f"    floor:          {feats.get('floor', '—')}",
        f"    parking:        {feats.get('parking', '—')}",
    ]
    note = (o.get("description") or "").strip()
    if note:
        parts.append(f"    note:           {note}")
    return "\n".join(parts)


def format_listing(detail: dict[str, Any], url: str) -> str:
    project = detail.get("project", {}) or {}
    items = detail.get("items", []) or []

    offers_item = next((it for it in items if it.get("type") == "offers"), None)
    features_item = next((it for it in items if it.get("type") == "features"), None)
    location_item = next(
        (it for it in items if it.get("type") == "location_features"), None
    )

    lines: list[str] = []
    lines.append(f"TITLE:         {project.get('title', '')}")
    lines.append(f"ID:            {project.get('id', '')}")
    lines.append(f"SLUG:          {project.get('slug', '')}")
    lines.append(f"URL:           {url}")
    lines.append(f"PRICE RANGE:   {project.get('price', '') or '—'}")
    lines.append(f"PRICE PER M²:  {project.get('price_per_square', '') or '—'}")
    lines.append(f"LOCATION:      {project.get('location', '') or '—'}")

    coords = (location_item or {}).get("coordinates") or {}
    if coords:
        lines.append(
            f"COORDINATES:   lat={coords.get('lat')}  lng={coords.get('lng')}"
        )
    else:
        lines.append("COORDINATES:   —")

    dev = project.get("developer") or {}
    lines.append("")
    lines.append("DEVELOPER:")
    lines.append(f"  name:    {dev.get('name', '') or '—'}")
    if dev.get("address"):
        lines.append(f"  address: {dev.get('address')}")
    if dev.get("logo"):
        lines.append(f"  logo:    {dev.get('logo')}")

    agents = project.get("agents") or []
    if agents:
        lines.append("")
        lines.append("AGENTS:")
        for a in agents:
            lines.append(f"  - {a.get('name', '')}")

    info = project.get("info") or []
    if info:
        lines.append("")
        lines.append("SPECS:")
        for it in info:
            lines.append(
                f"  {it.get('title', '')}: {it.get('description', '')}"
            )

    if features_item and features_item.get("features"):
        lines.append("")
        lines.append("FEATURES & AMENITIES:")
        for f in features_item["features"]:
            lines.append(f"  - {f.get('name', '')}")

    if offers_item and offers_item.get("offers"):
        lines.append("")
        lines.append("OFFERS (per unit):")
        for o in offers_item["offers"]:
            lines.append(format_offer(o))

    if location_item and location_item.get("location_features"):
        lines.append("")
        lines.append("NEARBY:")
        for lf in location_item["location_features"]:
            lines.append(
                f"  - {lf.get('name', '')}: {lf.get('value', '')}"
            )

    files = project.get("files") or []
    if files:
        lines.append("")
        lines.append("BROCHURES:")
        for f in files:
            lines.append(f"  - {f.get('url', '')}")

    desc = (project.get("description") or "").strip()
    if desc:
        lines.append("")
        lines.append("DESCRIPTION:")
        lines.append(desc)

    return "\n".join(lines) + "\n"


def scrape_one(page, slug: str) -> tuple[str, dict[str, Any]] | None:
    url = f"{BASE}{INDEX_PATH}{slug}/"
    try:
        html = fetch(page, url)
        data = get_next_data(html)
        detail = data["props"]["pageProps"].get("detail")
        if not detail:
            print(f"  [warn] no detail block for {slug}")
            return None
        return url, detail
    except Exception as e:
        print(f"  [error] {slug}: {e}")
        return None


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    only = sys.argv[1] if len(sys.argv) > 1 else None

    browser = launch(headless=True)
    page = browser.new_page()
    try:
        if only:
            slugs = [only]
        else:
            slugs = collect_all_slugs(page)
            print(f"\n[index] collected {len(slugs)} unique listings\n")

        wrote = 0
        skipped = 0
        failed: list[str] = []
        for i, slug in enumerate(slugs, 1):
            out_path = OUT_DIR / f"{slug}.txt"
            if out_path.exists():
                skipped += 1
                continue
            print(f"[{i}/{len(slugs)}] {slug}")
            res = scrape_one(page, slug)
            if res is None:
                failed.append(slug)
                continue
            url, detail = res
            text = format_listing(detail, url)
            out_path.write_text(text, encoding="utf-8")
            wrote += 1
            time.sleep(PAGE_DELAY_SECONDS)

        print(
            f"\ndone. wrote={wrote}  skipped(existing)={skipped}  failed={len(failed)}"
        )
        if failed:
            print("failed slugs:", failed)
    finally:
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
