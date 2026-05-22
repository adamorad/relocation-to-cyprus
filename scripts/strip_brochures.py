"""Set every listing's `brochures` to an empty array.

The PDF brochures (~2.4 GB under public/brochures/) won't be deployed to
GitHub Pages — they stay local for dev. The brochure button in the UI
already hides itself when the array is empty.
"""
from __future__ import annotations

import json
from pathlib import Path

LISTINGS_JSON = (
    Path(__file__).resolve().parent.parent / "src" / "data" / "listings.json"
)


def main() -> int:
    data = json.loads(LISTINGS_JSON.read_text(encoding="utf-8"))
    cleared = 0
    for l in data:
        if l.get("brochures"):
            cleared += 1
        l["brochures"] = []
    LISTINGS_JSON.write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"cleared brochures on {cleared}/{len(data)} listings")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
