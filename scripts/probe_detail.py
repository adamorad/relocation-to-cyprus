"""Probe a single detail page to find selectors for fields we care about."""
from pathlib import Path
from cloakbrowser import launch

OUT = Path("/tmp/bazaraki")
OUT.mkdir(exist_ok=True, parents=True)


def main() -> None:
    browser = launch(headless=True)
    page = browser.new_page()
    page.goto(
        "https://www.bazaraki.com/new-buildings/118-serenity_residences_block_c/",
        wait_until="domcontentloaded",
        timeout=60_000,
    )
    page.wait_for_timeout(4_000)
    html = page.content()
    (OUT / "detail.html").write_text(html, encoding="utf-8")
    print(f"wrote {len(html)} bytes")
    print("title:", page.title())
    browser.close()


if __name__ == "__main__":
    main()
