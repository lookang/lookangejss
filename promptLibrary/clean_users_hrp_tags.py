#!/usr/bin/env python3
"""Clean injected <__hrp__ ...> extension tags from ACPcookout2025/users HTML files.

The issue: some downloaded HTML files from SLS have extra markup like:

    <html lang="en"><__hrp__ data-ext-id="eanggfilgoajaocelnaflolkadkeghjp" ...>
        <link href="chrome-extension://.../nj.css" rel="stylesheet">
    </__hrp__><head>...

These <__hrp__> blocks come from a browser extension and should be removed so the
interactive looks clean and works consistently.

Usage (from repository root /Users/lookang/Documents/promptlibrary):

    python clean_users_hrp_tags.py

This script:
- Scans ACPcookout2025/users for *.html
- Removes any <__hrp__ ...>...</__hrp__> blocks
- Rewrites only files that changed, and prints a summary.
"""

from pathlib import Path
import re

ROOT = Path(__file__).parent
USERS_DIR = ROOT / "ACPcookout2025" / "users"

# Regex to match the injected <__hrp__ ...>...</__hrp__> block (non-greedy)
HRP_BLOCK_RE = re.compile(r"<__hrp__[^>]*>.*?</__hrp__>", re.DOTALL)


def clean_file(path: Path) -> bool:
    """Remove <__hrp__ ...>...</__hrp__> blocks from the given HTML file.

    Returns True if the file was modified.
    """
    try:
        original = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        # Fallback to a more forgiving read if encoding is odd
        original = path.read_text(errors="ignore")

    cleaned, count = HRP_BLOCK_RE.subn("", original)
    if count == 0:
        return False

    # Normalise simple '<html lang="en"><head>' case by collapsing any
    # accidental whitespace introduced between tags.
    cleaned = re.sub(r">\s+<head>", "><head>", cleaned, count=1)

    path.write_text(cleaned, encoding="utf-8")
    print(f"[cleaned] {path} — removed {count} <__hrp__> block(s)")
    return True


def main() -> None:
    if not USERS_DIR.is_dir():
        print(f"Users directory not found: {USERS_DIR}")
        return

    html_files = sorted(USERS_DIR.glob("*.html"))
    if not html_files:
        print(f"No HTML files found in {USERS_DIR}")
        return

    total = 0
    modified = 0
    for path in html_files:
        total += 1
        if clean_file(path):
            modified += 1

    print(f"\nScanned {total} HTML files in {USERS_DIR}")
    print(f"Modified {modified} file(s) containing <__hrp__> blocks.")


if __name__ == "__main__":
    main()
