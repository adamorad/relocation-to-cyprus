"""Parse listings/new_developments/*.txt → src/data/listings.json

The .txt format is the one written by scrape_new_developments.py. We re-parse
our own format here rather than re-fetching every page from bazaraki: the .txt
files already contain everything the web app needs (title, location, coords,
price range, developer, per-unit offers, etc.).
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
TXT_DIR = ROOT / "listings" / "new_developments"
OUT_PATH = ROOT / "src" / "data" / "listings.json"

# A line like "KEY:   value" inside the header block. The value can be empty
# or "—" (em-dash placeholder we used for missing fields).
HEADER_RE = re.compile(r"^([A-Z][A-Z0-9 ²/]+?):\s{2,}(.*)$")
COORDS_RE = re.compile(r"lat=([-\d.]+)\s+lng=([-\d.]+)")
UNIT_RE = re.compile(r"^\s{2}Unit (.+):$")
UNIT_FIELD_RE = re.compile(r"^\s{4}([a-z][a-z /²]+?):\s+(.+)$")


def empty_to_none(s: str) -> str | None:
    s = (s or "").strip()
    if not s or s == "—":
        return None
    return s


def parse_listing(text: str) -> dict[str, Any]:
    rec: dict[str, Any] = {
        "title": None,
        "id": None,
        "slug": None,
        "url": None,
        "priceRange": None,
        "pricePerM2": None,
        "location": None,
        "lat": None,
        "lng": None,
        "developer": None,
        "agents": [],
        "specs": {},
        "features": [],
        "offers": [],
        "nearby": {},
        "brochures": [],
        "description": None,
    }

    lines = text.splitlines()
    i = 0
    n = len(lines)

    # Header key-value lines, up to first blank.
    while i < n and lines[i].strip():
        line = lines[i]
        m = HEADER_RE.match(line)
        if m:
            key, val = m.group(1).strip(), m.group(2).strip()
            v = empty_to_none(val)
            if key == "TITLE":
                rec["title"] = v
            elif key == "ID":
                rec["id"] = int(v) if v and v.isdigit() else v
            elif key == "SLUG":
                rec["slug"] = v
            elif key == "URL":
                rec["url"] = v
            elif key == "PRICE RANGE":
                rec["priceRange"] = v
            elif key == "PRICE PER M²":
                rec["pricePerM2"] = v
            elif key == "LOCATION":
                rec["location"] = v
            elif key == "COORDINATES":
                if v:
                    cm = COORDS_RE.search(v)
                    if cm:
                        rec["lat"] = float(cm.group(1))
                        rec["lng"] = float(cm.group(2))
        i += 1

    # Section parsing
    while i < n:
        line = lines[i]
        stripped = line.strip()
        if not stripped:
            i += 1
            continue

        if stripped == "DEVELOPER:":
            dev: dict[str, str] = {}
            i += 1
            while i < n and lines[i].startswith("  ") and ":" in lines[i]:
                k, _, v = lines[i].strip().partition(":")
                dev[k.strip()] = v.strip()
                i += 1
            rec["developer"] = dev or None
            continue

        if stripped == "AGENTS:":
            i += 1
            while i < n and lines[i].startswith("  - "):
                rec["agents"].append(lines[i][4:].strip())
                i += 1
            continue

        if stripped == "SPECS:":
            i += 1
            while i < n and lines[i].startswith("  ") and not lines[i].strip().endswith(":"):
                k, _, v = lines[i].strip().partition(":")
                rec["specs"][k.strip()] = v.strip()
                i += 1
            continue

        if stripped == "FEATURES & AMENITIES:":
            i += 1
            while i < n and lines[i].startswith("  - "):
                rec["features"].append(lines[i][4:].strip())
                i += 1
            continue

        if stripped == "OFFERS (per unit):":
            i += 1
            current: dict[str, Any] | None = None
            while i < n:
                um = UNIT_RE.match(lines[i])
                fm = UNIT_FIELD_RE.match(lines[i])
                if um:
                    if current:
                        rec["offers"].append(current)
                    current = {"unit": um.group(1).strip()}
                    i += 1
                    continue
                if fm and current is not None:
                    key = fm.group(1).strip()
                    val = empty_to_none(fm.group(2))
                    current[key] = val
                    i += 1
                    continue
                # Any non-matching, non-blank line ends the section.
                if lines[i].strip() and not lines[i].startswith(" "):
                    break
                if not lines[i].strip():
                    i += 1
                    continue
                # Unrecognized inside-section line — skip.
                i += 1
            if current:
                rec["offers"].append(current)
            continue

        if stripped == "NEARBY:":
            i += 1
            while i < n and lines[i].startswith("  - "):
                kv = lines[i][4:].strip()
                k, _, v = kv.partition(":")
                rec["nearby"][k.strip()] = v.strip()
                i += 1
            continue

        if stripped == "BROCHURES:":
            i += 1
            while i < n and lines[i].startswith("  - "):
                rec["brochures"].append(lines[i][4:].strip())
                i += 1
            continue

        if stripped == "DESCRIPTION:":
            i += 1
            rec["description"] = "\n".join(lines[i:]).strip() or None
            break

        i += 1

    return rec


def main() -> int:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    records: list[dict[str, Any]] = []
    skipped_no_coords = 0

    for txt_path in sorted(TXT_DIR.glob("*.txt")):
        try:
            rec = parse_listing(txt_path.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"  [parse error] {txt_path.name}: {e}")
            continue
        if rec.get("lat") is None or rec.get("lng") is None:
            skipped_no_coords += 1
            # Still include — the app filters when projecting.
        records.append(rec)

    OUT_PATH.write_text(
        json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(
        f"wrote {len(records)} listings → {OUT_PATH.relative_to(ROOT)}"
        f"  ({skipped_no_coords} missing coords)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
