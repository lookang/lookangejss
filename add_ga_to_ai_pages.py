"""
add_ga_to_ai_pages.py

Injects Google Analytics (GA4) into all *.html files inside ai/AI folders.
Does NOT add AdSense — these pages are for tracking only, not monetisation.

Usage:
  Set DRY_RUN = True  to preview (no files written)
  Set DRY_RUN = False to write changes
"""

import os
from pathlib import Path

# ── Config ──────────────────────────────────────────────────────────────────
ROOT_DIR   = Path(__file__).parent
GA_ID      = "G-S9EWRY1CPJ"
DRY_RUN    = False         # ← set False to write files
OUTPUT_LIST = ROOT_DIR / "ai_ga_files_to_upload.txt"

GA_BLOCK = """\
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-S9EWRY1CPJ"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-S9EWRY1CPJ');
  </script>
"""

ANCHOR = "</head>"

# ── Helpers ──────────────────────────────────────────────────────────────────

def is_ai_path(path: Path) -> bool:
    """Return True if any path component is exactly 'ai' (case-insensitive)."""
    return any(p.lower() == "ai" for p in path.parts)


def has_ga(content: str) -> bool:
    return GA_ID in content or "googletagmanager.com/gtag" in content


def collect_html_files():
    files = []
    for root, dirs, filenames in os.walk(ROOT_DIR):
        # Skip hidden / node_modules / dist
        dirs[:] = [d for d in dirs if not d.startswith(".") and d not in ("node_modules", "dist", "__pycache__")]
        for fn in filenames:
            if fn.lower().endswith(".html"):
                path = Path(root) / fn
                if is_ai_path(path):
                    files.append(path)
    return sorted(files)

# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    files = collect_html_files()
    print(f"\n{'='*60}")
    print(f"DRY_RUN={DRY_RUN}  AI HTML files found: {len(files)}")
    print(f"{'='*60}\n")

    updated  = []
    skipped_ga   = []
    skipped_head = []

    for i, path in enumerate(files, 1):
        try:
            content = path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            print(f"  ERROR reading {path}: {e}")
            continue

        safe_name = str(path)[-70:]
        print(f"[{i}/{len(files)}] ...{safe_name}")

        if has_ga(content):
            print(f"  SKIP (already has GA)")
            skipped_ga.append(path)
            continue

        if ANCHOR not in content:
            print(f"  SKIP (no </head> found)")
            skipped_head.append(path)
            continue

        new_content = content.replace(ANCHOR, GA_BLOCK + ANCHOR, 1)

        if DRY_RUN:
            print(f"  DRY-RUN: would inject GA before </head>")
        else:
            path.write_text(new_content, encoding="utf-8")
            print(f"  WRITTEN.")

        updated.append(path)

    print(f"\n{'='*60}")
    print(f"Done.")
    print(f"  Updated:              {len(updated)}")
    print(f"  Skipped (had GA):     {len(skipped_ga)}")
    print(f"  Skipped (no </head>): {len(skipped_head)}")
    print(f"{'='*60}\n")

    if not DRY_RUN and updated:
        with open(OUTPUT_LIST, "w", encoding="utf-8") as f:
            f.write(f"# AI pages with GA added ({len(updated)} files)\n\n")
            for p in updated:
                f.write(os.path.relpath(p, ROOT_DIR) + "\n")
        print(f"Upload list written to: {OUTPUT_LIST}")


if __name__ == "__main__":
    main()
