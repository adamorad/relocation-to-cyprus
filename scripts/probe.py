"""One-off probe: fetch page 1 of /new-buildings/ and dump HTML for analysis."""
from pathlib import Path
from cloakbrowser import launch

OUT = Path("/tmp/bazaraki")
OUT.mkdir(exist_ok=True, parents=True)


def main() -> None:
    browser = launch(headless=True)
    page = browser.new_page()
    page.goto("https://www.bazaraki.com/new-buildings/", wait_until="domcontentloaded", timeout=60_000)
    # Give CF challenge a moment to resolve if needed.
    page.wait_for_timeout(5_000)
    html = page.content()
    (OUT / "page1.html").write_text(html, encoding="utf-8")
    print(f"wrote {len(html)} bytes to {OUT / 'page1.html'}")
    print("title:", page.title())
    print("url:", page.url)
    browser.close()


if __name__ == "__main__":
    main()
