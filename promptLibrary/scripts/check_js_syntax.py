"""Check JS syntax in inline <script> blocks inside a single HTML file.

Why:
  - This project is a single-file HTML app with inline JS.
  - We previously introduced a hard JS parse error by accidentally inserting CSS (`padding: 12px;`) into JS.
  - This helper provides a reliable, fast syntax check without regexing the entire file.

Usage:
  python scripts/check_js_syntax.py ai-prompt-library.html

Exit codes:
  0 = PASS
  1 = FAIL (syntax error or runtime error during parsing)
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from html.parser import HTMLParser


def _force_utf8_stdio() -> None:
    """Make console output robust on Windows (avoid cp1252 charmap crashes)."""

    # Python 3.7+ supports reconfigure(). This prevents crashes when printing
    # unicode (the HTML/JS may contain emoji/symbols).
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
        except Exception:
            pass
    if hasattr(sys.stderr, "reconfigure"):
        try:
            sys.stderr.reconfigure(encoding="utf-8", errors="backslashreplace")
        except Exception:
            pass


class ScriptCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self._in_script = False
        self._current_attrs: dict[str, str | None] = {}
        self.scripts: list[str] = []
        self._buf: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "script":
            return
        attr_map = {k.lower(): v for k, v in attrs}
        # Ignore external scripts
        if "src" in attr_map and attr_map["src"]:
            self._in_script = False
            return
        self._in_script = True
        self._current_attrs = attr_map
        self._buf = []

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() != "script":
            return
        if self._in_script:
            self.scripts.append("".join(self._buf))
        self._in_script = False
        self._current_attrs = {}
        self._buf = []

    def handle_data(self, data: str) -> None:
        if self._in_script:
            self._buf.append(data)


NODE_PARSE_SNIPPET = r"""
const fs = require('fs');
const code = fs.readFileSync(0, 'utf8');
// Parse-only check. If syntax is invalid, new Function() throws a SyntaxError.
new Function(code);
""".strip()


def check_script(script_text: str, index: int) -> None:
    # Skip empty scripts (common in templates)
    if not script_text.strip():
        return

    # Feed the script to Node via stdin to avoid quoting issues.
    # NOTE: Don't use text=True with input=str on Windows, because Python will
    # encode using the active code page (often cp1252) and crash on emoji.
    proc = subprocess.run(
        ["node", "-e", NODE_PARSE_SNIPPET],
        input=script_text.encode("utf-8"),
        capture_output=True,
        shell=False,
    )

    if proc.returncode != 0:
        # Node errors are typically in stderr.
        stderr = (proc.stderr or b"").decode("utf-8", errors="replace").strip()
        stdout = (proc.stdout or b"").decode("utf-8", errors="replace").strip()
        err = (stderr or stdout).strip()
        raise RuntimeError(f"Inline <script> block #{index} failed JS parse:\n{err}")


def main() -> int:
    _force_utf8_stdio()

    ap = argparse.ArgumentParser()
    ap.add_argument("html_file", help="Path to the HTML file to check")
    args = ap.parse_args()

    try:
        html = open(args.html_file, "r", encoding="utf-8").read()
    except UnicodeDecodeError:
        html = open(args.html_file, "r", encoding="utf-8", errors="replace").read()

    parser = ScriptCollector()
    parser.feed(html)

    try:
        for i, script in enumerate(parser.scripts, start=1):
            check_script(script, i)
    except Exception as e:
        print("FAIL")
        print(str(e))
        return 1

    print(f"PASS ({len(parser.scripts)} inline <script> blocks checked)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
