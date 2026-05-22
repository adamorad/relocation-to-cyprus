"""Take v2 sidecars and:

  - download + dewatermark all image_gallery images       → public/images/<slug>/gN_NN.webp
  - download + dewatermark all per-offer big_thumbnails  → public/images/<slug>/uN_NN.webp
  - download brochure PDFs                                → public/brochures/<hash>.pdf
  - merge enriched fields into src/data/listings.json
"""
from __future__ import annotations

import io
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha1
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import cv2
import httpx
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
V2_DIR = ROOT / "listings" / "new_developments_v2"
LISTINGS_JSON = ROOT / "src" / "data" / "listings.json"
IMAGES_DIR = ROOT / "public" / "images"
BROCHURES_DIR = ROOT / "public" / "brochures"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
)
MASK_Y_FRAC = 0.85
MASK_X_FRAC = 0.76


def local_url(p: Path) -> str:
    rel = p.relative_to(ROOT / "public")
    return "/" + str(rel).replace("\\", "/")


def fetch_and_inpaint(url: str, dest: Path, client: httpx.Client) -> bool:
    if dest.exists() and dest.stat().st_size > 1000:
        return True
    try:
        r = client.get(url, timeout=30)
        if r.status_code != 200:
            return False
        im = Image.open(io.BytesIO(r.content)).convert("RGB")
        arr = np.array(im)
        h, w = arr.shape[:2]
        mask = np.zeros((h, w), dtype=np.uint8)
        mask[int(h * MASK_Y_FRAC):, int(w * MASK_X_FRAC):] = 255
        bgr = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)
        out = cv2.inpaint(bgr, mask, 6, cv2.INPAINT_TELEA)
        rgb = cv2.cvtColor(out, cv2.COLOR_BGR2RGB)
        dest.parent.mkdir(parents=True, exist_ok=True)
        Image.fromarray(rgb).save(dest, format="WEBP", quality=82, method=6)
        return True
    except Exception as e:
        print(f"  [err] {url}: {e}")
        return False


def fetch_pdf(url: str, dest: Path, client: httpx.Client) -> bool:
    if dest.exists() and dest.stat().st_size > 1000:
        return True
    try:
        r = client.get(url, timeout=60)
        if r.status_code != 200:
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(r.content)
        return True
    except Exception as e:
        print(f"  [err pdf] {url}: {e}")
        return False


def brochure_dest(url: str) -> Path:
    h = sha1(url.encode()).hexdigest()[:14]
    suffix = Path(urlparse(url).path).suffix.lower() or ".pdf"
    if suffix not in {".pdf", ".jpg", ".png"}:
        suffix = ".pdf"
    return BROCHURES_DIR / f"{h}{suffix}"


def main() -> int:
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    BROCHURES_DIR.mkdir(parents=True, exist_ok=True)

    # ── Collect work from v2 sidecars ────────────────────────────────────
    sidecars = sorted(V2_DIR.glob("*.json"))
    print(f"reading {len(sidecars)} v2 sidecars")
    per_slug: dict[str, dict[str, Any]] = {}
    img_jobs: list[tuple[str, Path]] = []
    pdf_jobs: list[tuple[str, Path]] = []

    for f in sidecars:
        rec = json.loads(f.read_text())
        slug = rec["slug"]
        per_slug[slug] = rec

        for gi, g in enumerate(rec.get("image_galleries") or []):
            for ii, url in enumerate(g.get("images") or []):
                if isinstance(url, str) and "bazaraki" in url:
                    dest = IMAGES_DIR / slug / f"g{gi}_{ii:02d}.webp"
                    img_jobs.append((url, dest))

        for oi, o in enumerate(rec.get("offers") or []):
            for ii, im in enumerate(o.get("images") or []):
                url = im.get("big") if isinstance(im, dict) else None
                if isinstance(url, str) and "bazaraki" in url:
                    dest = IMAGES_DIR / slug / f"u{oi}_{ii:02d}.webp"
                    img_jobs.append((url, dest))

        for b in rec.get("brochures") or []:
            url = b.get("url")
            if isinstance(url, str) and "bazaraki" in url:
                pdf_jobs.append((url, brochure_dest(url)))

    img_jobs = [j for j in img_jobs if not j[1].exists()]
    pdf_jobs = [j for j in pdf_jobs if not j[1].exists()]
    print(f"  → {len(img_jobs)} images, {len(pdf_jobs)} pdfs to fetch")

    if img_jobs or pdf_jobs:
        headers = {"User-Agent": UA, "Referer": "https://www.bazaraki.com/"}
        client = httpx.Client(headers=headers, follow_redirects=True)
        ok = fail = 0
        started = time.time()
        with ThreadPoolExecutor(max_workers=8) as pool:
            futures = {}
            for u, d in img_jobs:
                futures[pool.submit(fetch_and_inpaint, u, d, client)] = ("img", u)
            for u, d in pdf_jobs:
                futures[pool.submit(fetch_pdf, u, d, client)] = ("pdf", u)
            for i, f in enumerate(as_completed(futures), 1):
                if f.result():
                    ok += 1
                else:
                    fail += 1
                if i % 100 == 0:
                    rate = i / (time.time() - started)
                    print(f"  [{i}/{len(futures)}] ok={ok} fail={fail} ~{rate:.1f}/s")
        client.close()
        print(f"download done. ok={ok} fail={fail} in {(time.time()-started)/60:.1f} min")

    # ── Merge into listings.json ─────────────────────────────────────────
    listings = json.loads(LISTINGS_JSON.read_text(encoding="utf-8"))
    by_slug = {l["slug"]: l for l in listings if l.get("slug")}
    enriched = 0
    for slug, rec in per_slug.items():
        l = by_slug.get(slug)
        if not l:
            continue

        # image_galleries → list of {title, images: [local URLs]}
        galleries: list[dict[str, Any]] = []
        for gi, g in enumerate(rec.get("image_galleries") or []):
            imgs: list[str] = []
            for ii, url in enumerate(g.get("images") or []):
                p = IMAGES_DIR / slug / f"g{gi}_{ii:02d}.webp"
                if p.exists():
                    imgs.append(local_url(p))
            if imgs:
                galleries.append({"title": g.get("title", ""), "images": imgs})
        if galleries:
            l["imageGalleries"] = galleries

        # per-offer images + pricePerM2 — merge into offers by index
        v2_offers = rec.get("offers") or []
        for oi, o in enumerate(l.get("offers") or []):
            if oi >= len(v2_offers):
                continue
            v2 = v2_offers[oi]
            imgs: list[str] = []
            for ii, im in enumerate(v2.get("images") or []):
                p = IMAGES_DIR / slug / f"u{oi}_{ii:02d}.webp"
                if p.exists():
                    imgs.append(local_url(p))
            if imgs:
                o["images"] = imgs
            if v2.get("pricePerM2"):
                o["pricePerM2"] = v2["pricePerM2"]

        # brochures → list of {name, url: local}
        brochures: list[dict[str, Any]] = []
        for b in rec.get("brochures") or []:
            url = b.get("url")
            if not url or "bazaraki" not in url:
                continue
            p = brochure_dest(url)
            if p.exists():
                brochures.append({"name": b.get("name") or "Brochure", "url": local_url(p)})
        if brochures:
            l["brochures"] = brochures

        enriched += 1

    LISTINGS_JSON.write_text(
        json.dumps(listings, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"merged {enriched} listings → {LISTINGS_JSON.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
