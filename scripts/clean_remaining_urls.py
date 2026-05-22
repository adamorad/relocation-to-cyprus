"""Final pass: remove all remaining bazaraki references in listings.json.

  - developer.logo, agents[].logo  →  download + self-host under public/logos/
  - offers[].images                →  drop (UI doesn't use them)
  - brochures                      →  drop (brochure button removed from UI)
  - any .url field still pointing to bazaraki  →  clear

Logos don't carry watermarks so we just self-host them as-is.
"""
from __future__ import annotations

import io
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha1
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import httpx
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LISTINGS_JSON = ROOT / "src" / "data" / "listings.json"
LOGOS_DIR = ROOT / "public" / "logos"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
)

BAZARAKI_RE = re.compile(r"https?://[^\"\s]*bazaraki\.com[^\"\s]*", re.I)


def fetch_logo(url: str, dest: Path, client: httpx.Client) -> bool:
    if dest.exists() and dest.stat().st_size > 200:
        return True
    try:
        r = client.get(url, timeout=20)
        if r.status_code != 200:
            return False
        im = Image.open(io.BytesIO(r.content)).convert("RGB")
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, format="WEBP", quality=85)
        return True
    except Exception as e:
        print(f"  [error] {url}: {e}")
        return False


def local_url(p: Path) -> str:
    rel = p.relative_to(ROOT / "public")
    return "/" + str(rel).replace("\\", "/")


def hashed_logo_path(url: str) -> Path:
    h = sha1(url.encode()).hexdigest()[:12]
    suffix = Path(urlparse(url).path).suffix.lower() or ".webp"
    if suffix not in {".webp", ".jpg", ".jpeg", ".png"}:
        suffix = ".webp"
    return LOGOS_DIR / f"{h}.webp"


def main() -> int:
    LOGOS_DIR.mkdir(parents=True, exist_ok=True)
    data = json.loads(LISTINGS_JSON.read_text(encoding="utf-8"))

    # Pass 1: collect all logo URLs that need fetching.
    logo_urls: set[str] = set()
    for l in data:
        dev = l.get("developer") or {}
        if dev.get("logo"):
            logo_urls.add(dev["logo"])
        for a in l.get("agents") or []:
            if isinstance(a, dict) and a.get("logo"):
                logo_urls.add(a["logo"])

    bazaraki_logos = sorted(u for u in logo_urls if "bazaraki" in u)
    print(f"{len(bazaraki_logos)} unique logos to self-host")

    headers = {"User-Agent": UA, "Referer": "https://www.bazaraki.com/"}
    client = httpx.Client(headers=headers, follow_redirects=True)
    ok = 0
    fail = 0
    started = time.time()
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {
            pool.submit(fetch_logo, u, hashed_logo_path(u), client): u
            for u in bazaraki_logos
        }
        for i, f in enumerate(as_completed(futures), 1):
            if f.result():
                ok += 1
            else:
                fail += 1
    client.close()
    print(f"logos: ok={ok} fail={fail} in {(time.time()-started):.1f}s")

    # Pass 2: rewrite listings.json
    def rewrite_logo(url: str | None) -> str | None:
        if not url or "bazaraki" not in url:
            return url
        p = hashed_logo_path(url)
        return local_url(p) if p.exists() else None

    for l in data:
        dev = l.get("developer") or {}
        if dev:
            dev["logo"] = rewrite_logo(dev.get("logo"))
            # Strip url_slug — it's a bazaraki path slug; UI now uses google search
            dev.pop("url_slug", None)
        for a in l.get("agents") or []:
            if isinstance(a, dict):
                a["logo"] = rewrite_logo(a.get("logo"))
                # Agent contacts often empty / not used in UI; drop entirely.
                a.pop("contacts", None)

        # Drop fields the UI doesn't use that still leak the source.
        if isinstance(l.get("offers"), list):
            for o in l["offers"]:
                if isinstance(o, dict):
                    o.pop("images", None)
        # Brochure button is removed from UI; URLs are on bazaraki CDN.
        l["brochures"] = []

        # The listing's bazaraki detail URL — also no longer shown in UI.
        if isinstance(l.get("url"), str) and "bazaraki" in l["url"]:
            l["url"] = None

    serialized = json.dumps(data, ensure_ascii=False, indent=2)
    remaining = len(BAZARAKI_RE.findall(serialized))
    LISTINGS_JSON.write_text(serialized, encoding="utf-8")
    print(f"\nwrote {LISTINGS_JSON.relative_to(ROOT)}")
    print(f"remaining bazaraki URLs: {remaining}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
