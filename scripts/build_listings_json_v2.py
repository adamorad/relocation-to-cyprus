"""Aggregate listings/new_developments_json/*.json → src/data/listings.json

The JSON sidecars come from enrich_listings.py and contain everything the web
app needs: images, video, developer URL, contacts, etc. This script just
concatenates them in a deterministic order and writes the single bundle the
React app imports at build time.

For any slug that has a .txt cached but no .json sidecar yet, the old listing
record from src/data/listings.json (if present) is reused so the app doesn't
lose listings mid-rescrape.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_DIR = ROOT / "listings" / "new_developments_json"
TXT_DIR = ROOT / "listings" / "new_developments"
OUT_PATH = ROOT / "src" / "data" / "listings.json"


def main() -> int:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Load existing aggregate for fallback (in case some sidecars aren't ready).
    fallback: dict[str, dict] = {}
    if OUT_PATH.exists():
        try:
            for r in json.loads(OUT_PATH.read_text(encoding="utf-8")):
                if isinstance(r, dict) and r.get("slug"):
                    fallback[r["slug"]] = r
        except Exception:
            fallback = {}

    slugs = sorted(p.stem for p in TXT_DIR.glob("*.txt"))
    records: list[dict] = []
    used_sidecar = 0
    used_fallback = 0
    missing: list[str] = []

    for slug in slugs:
        sidecar = JSON_DIR / f"{slug}.json"
        if sidecar.exists():
            try:
                rec = json.loads(sidecar.read_text(encoding="utf-8"))
                records.append(rec)
                used_sidecar += 1
                continue
            except Exception as e:
                print(f"  [parse error] {slug}: {e}")
        if slug in fallback:
            records.append(fallback[slug])
            used_fallback += 1
        else:
            missing.append(slug)

    OUT_PATH.write_text(
        json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(
        f"wrote {len(records)} listings → {OUT_PATH.relative_to(ROOT)}\n"
        f"  sidecar={used_sidecar}  fallback={used_fallback}  missing={len(missing)}"
    )
    if missing:
        print("missing slugs:", missing[:10], "..." if len(missing) > 10 else "")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
