#!/usr/bin/env python3
"""Generate a JSON catalogue of remote interactives hosted on
https://physicstjc.github.io/sls/

This script parses the main SLS apps page (a normal content page, not a
filesystem-style index) and discovers interactives based on the structure:

    <h3>Title of Interactive</h3>
    ...
    <a>Test it out</a>  --> link to the interactive (HTML)
    <a>Download for SLS</a> --> link to a ZIP package
    ...
    <h3>Prompts</h3>
    ... prompt text ...

For each such block we generate a CatalogueItem in the same shape as
`generate_prompt_catalogue.py`, but with **absolute URLs** for `indexPath`
(and `zipPath` where available) and with the "Prompts" section captured as
`promptText`.

Output:
    catalogue_remote_physicstjc.json

Usage (from this folder):
    python generate_remote_catalogue_physicstjc.py

Notes / Design choices
----------------------
- Uses only the Python standard library.
- Makes a single HTTP request to the main page, then parses its HTML.
- Relies on fairly stable text markers:
  * Anchor text "Test it out" for the interactive link
  * Anchor text starting with "Download for SLS" for the ZIP link
  * A heading <h3>Prompts</h3> immediately before the list of prompts.
- We associate each "Prompts" block with the most recent interactive title
  that had a "Test it out" link.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from html.parser import HTMLParser
from typing import List, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import urlopen


BASE_URL = "https://physicstjc.github.io/sls/"
OUTPUT_PATH = "catalogue_remote_physicstjc.json"


@dataclass
class CatalogueItem:
    id: str
    title: str
    folder: str
    folderPath: str
    indexPath: str
    hasPrompt: bool = False
    promptText: str = ""
    hasZip: bool = False
    zipPath: str | None = None
    hasPromptImage: bool = False
    promptImagePath: str | None = None
    promptImageExt: str | None = None
    hasKnowledgeBase: bool = False
    knowledgeBasePath: str | None = None
    knowledgeBaseExt: str | None = None

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "folder": self.folder,
            "folderPath": self.folderPath,
            "indexPath": self.indexPath,
            "hasPrompt": self.hasPrompt,
            "promptText": self.promptText,
            "hasZip": self.hasZip,
            "zipPath": self.zipPath,
            "hasPromptImage": self.hasPromptImage,
            "promptImagePath": self.promptImagePath,
            "promptImageExt": self.promptImageExt,
            "hasKnowledgeBase": self.hasKnowledgeBase,
            "knowledgeBasePath": self.knowledgeBasePath,
            "knowledgeBaseExt": self.knowledgeBaseExt,
        }


@dataclass
class _TjcItem:
    """Intermediate representation while parsing the HTML page."""

    title: str
    index_href: Optional[str] = None
    zip_href: Optional[str] = None
    prompt_lines: List[str] = field(default_factory=list)


class TjcPageParser(HTMLParser):
    """HTML parser tuned to the structure of physicstjc.github.io/sls/.

    Strategy:
    - Each <h3> (except those whose text is exactly "Prompts") starts a new
      potential interactive item (title only at this stage).
    - An <a> whose text is "Test it out" is taken as the interactive URL for
      the *current* item.
    - An <a> whose text starts with "Download for SLS" is taken as the ZIP URL
      for the *current* item.
    - The next <h3> with text "Prompts" starts a prompts block for the current
      item; all text until the next <h3> is captured as promptText.
    """

    def __init__(self) -> None:
        super().__init__()
        self.items: List[_TjcItem] = []
        self.current_item: Optional[_TjcItem] = None

        self._in_h3: bool = False
        self._h3_text_parts: List[str] = []

        self._in_a: bool = False
        self._current_href: Optional[str] = None

        self._in_prompts_section: bool = False

    # Tag handlers -----------------------------------------------------

    def handle_starttag(self, tag: str, attrs):  # type: ignore[override]
        tag = tag.lower()
        if tag == "h3":
            # Any new <h3> ends a prompts block, if one is active.
            if self._in_prompts_section:
                self._in_prompts_section = False
            self._in_h3 = True
            self._h3_text_parts = []
        elif tag == "a":
            self._in_a = True
            href = None
            for k, v in attrs:
                if k.lower() == "href":
                    href = v
                    break
            self._current_href = href

    def handle_endtag(self, tag: str):  # type: ignore[override]
        tag = tag.lower()
        if tag == "h3" and self._in_h3:
            text = "".join(self._h3_text_parts).strip()
            self._in_h3 = False
            self._h3_text_parts = []

            if not text:
                return

            if text == "Prompts":
                # Start prompts for current item (if any)
                if self.current_item is not None:
                    self.current_item.prompt_lines = []
                    self._in_prompts_section = True
            else:
                # New interactive (or top-level heading). We'll keep only
                # those that later get a "Test it out" link.
                item = _TjcItem(title=text)
                self.items.append(item)
                self.current_item = item

        elif tag == "a":
            self._in_a = False
            self._current_href = None

    def handle_data(self, data: str):  # type: ignore[override]
        text = data.strip()
        if not text:
            return

        if self._in_h3:
            self._h3_text_parts.append(text)
            return

        # Anchor text handling
        if self._in_a and self._current_href and self.current_item is not None:
            if text == "Test it out":
                if self.current_item.index_href is None:
                    self.current_item.index_href = urljoin(BASE_URL, self._current_href)
            elif text.startswith("Download for SLS"):
                if self.current_item.zip_href is None:
                    self.current_item.zip_href = urljoin(BASE_URL, self._current_href)
            return

        # Prompts text handling
        if self._in_prompts_section and self.current_item is not None:
            # Accumulate any textual content between the Prompts <h3> and the
            # next <h3> as the prompt text.
            self.current_item.prompt_lines.append(text)


def fetch_page(url: str) -> str:
    """Fetch the main page HTML. Raise on HTTP errors."""
    try:
        with urlopen(url) as resp:
            status = getattr(resp, "status", None) or resp.getcode()
            if status >= 400:
                raise RuntimeError(f"HTTP {status} on {url}")
            return resp.read().decode("utf-8", errors="ignore")
    except (HTTPError, URLError) as e:
        raise RuntimeError(f"Error fetching {url}: {e}") from e


def crawl_physicstjc() -> List[CatalogueItem]:
    html = fetch_page(BASE_URL)
    parser = TjcPageParser()
    parser.feed(html)

    items: List[CatalogueItem] = []

    for src in parser.items:
        # Keep only entries that have at least an interactive URL.
        if not src.index_href:
            continue

        # Derive a folder name/path from the index URL relative to BASE_URL.
        # Example: BASE_URL + "kinematics-graph/index.html" or
        #          BASE_URL + "projectile-simulator/"
        rel = src.index_href[len(BASE_URL) :]
        # Strip query/fragment if any
        rel = rel.split("?")[0].split("#")[0]

        if rel.endswith("index.html"):
            folder_path = rel[: -len("index.html")]
        elif rel.endswith("/"):
            folder_path = rel
        else:
            # Some links may be to a bare HTML file (rare here), treat its
            # directory as the folder.
            parts = rel.rsplit("/", 1)
            folder_path = parts[0] + "/" if len(parts) == 2 else ""

        folder_path = folder_path or ""
        folder = folder_path.strip("/") or "index"

        title = src.title

        # Build prompt text
        prompt_text = "\n".join(src.prompt_lines).strip()

        item = CatalogueItem(
            id="remote:physicstjc:" + folder,
            title=title,
            folder=folder,
            folderPath=folder_path,
            indexPath=src.index_href,
            hasPrompt=bool(prompt_text),
            promptText=prompt_text,
            hasZip=bool(src.zip_href),
            zipPath=src.zip_href,
        )
        items.append(item)

    # Sort by title for consistency
    items.sort(key=lambda x: x.title.lower())
    return items


def main() -> None:
    items = crawl_physicstjc()
    data = [it.to_dict() for it in items]
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(items)} remote items to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
