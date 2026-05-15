#!/usr/bin/env python3
"""Generate a JSON catalogue of remote interactives hosted on
https://limkimsze-maker.github.io/

This script parses the main HTML Labs page (a normal content page, not a
filesystem-style index) and discovers interactives based on the structure:

    <h3>Title of Interactive</h3>
    <p>Short description / metadata...</p>
    ...
    <a>Open</a>   --> link to the interactive (HTML)
    <a>Source</a> --> link to the source / repo (optional)

For each such block we generate a CatalogueItem in the same shape as
`generate_prompt_catalogue.py`, but with **absolute URLs** for `indexPath`
(and with the collected description text captured as `promptText`).

Output:
    catalogue_remote_lksmaker.json

Usage (from this folder):
    python generate_remote_catalogue_lksmaker.py

Notes / Design choices
----------------------
- Uses only the Python standard library.
- Makes a single HTTP request to the main page, then parses its HTML.
- Relies on fairly stable text markers:
  * Anchor text "Open" for the interactive link
  * Anchor text "Source" for the source link (optional)
- All free text between a title <h3> and the next <h3> is treated as
  a description / prompt and stored as `promptText`.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from html.parser import HTMLParser
from typing import List, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import urlopen


BASE_URL = "https://limkimsze-maker.github.io/"
OUTPUT_PATH = "catalogue_remote_lksmaker.json"


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
class _LksItem:
    """Intermediate representation while parsing the limkimsze-maker page."""

    title: str
    index_href: Optional[str] = None
    source_href: Optional[str] = None
    desc_lines: List[str] = field(default_factory=list)


class LksPageParser(HTMLParser):
    """HTML parser tuned to the structure of limkimsze-maker.github.io.

    Strategy:
    - Each <h3> starts a new potential interactive item (title only at
      this stage).
    - An <a> whose text is exactly "Open" is taken as the interactive URL
      for the *current* item.
    - An <a> whose text is exactly "Source" is taken as an optional
      source URL for the *current* item.
    - Any free text between the title <h3> and the next <h3> is
      accumulated as description / prompt text.
    """

    def __init__(self) -> None:
        super().__init__()
        self.items: List[_LksItem] = []
        self.current_item: Optional[_LksItem] = None

        self._in_h3: bool = False
        self._h3_text_parts: List[str] = []

        self._in_a: bool = False
        self._current_href: Optional[str] = None

    # Tag handlers -----------------------------------------------------

    def handle_starttag(self, tag: str, attrs):  # type: ignore[override]
        tag = tag.lower()
        if tag == "h3":
            # New title starts; end of any previous description block is
            # implicit when we later start a new h3.
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

            # Start a new interactive item
            item = _LksItem(title=text)
            self.items.append(item)
            self.current_item = item

        elif tag == "a":
            self._in_a = False
            self._current_href = None

    def handle_data(self, data: str):  # type: ignore[override]
        text = data.strip()
        if not text:
            return

        # Collect title text inside <h3>
        if self._in_h3:
            self._h3_text_parts.append(text)
            return

        # Anchor text handling for "Open" / "Source"
        if self._in_a and self._current_href and self.current_item is not None:
            if text == "Open":
                if self.current_item.index_href is None:
                    self.current_item.index_href = urljoin(BASE_URL, self._current_href)
            elif text == "Source":
                if self.current_item.source_href is None:
                    self.current_item.source_href = urljoin(BASE_URL, self._current_href)
            return

        # Free text between headings belongs to the current item
        if self.current_item is not None:
            self.current_item.desc_lines.append(text)


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


def crawl_lksmaker() -> List[CatalogueItem]:
    html = fetch_page(BASE_URL)
    parser = LksPageParser()
    parser.feed(html)

    items: List[CatalogueItem] = []

    for src in parser.items:
        # Keep only entries that have at least an interactive URL.
        if not src.index_href:
            continue

        # Derive a folder name/path from the index URL relative to BASE_URL.
        # Example: BASE_URL + "P3_Time_Duration/" or BASE_URL + "foo/index.html"
        rel = src.index_href[len(BASE_URL) :]
        # Strip query/fragment if any
        rel = rel.split("?", 1)[0].split("#", 1)[0]

        if rel.endswith("index.html"):
            folder_path = rel[: -len("index.html")]
        elif rel.endswith("/"):
            folder_path = rel
        else:
            # Bare HTML file: use its directory (if any) as folder.
            parts = rel.rsplit("/", 1)
            folder_path = parts[0] + "/" if len(parts) == 2 else ""

        folder_path = folder_path or ""
        folder = folder_path.strip("/") or "index"

        title = src.title

        # Build prompt/description text
        prompt_text = "\n".join(src.desc_lines).strip()

        item = CatalogueItem(
            id="remote:lksmaker:" + folder,
            title=title,
            folder=folder,
            folderPath=folder_path,
            indexPath=src.index_href,
            hasPrompt=bool(prompt_text),
            promptText=prompt_text,
            # For now we do not have ZIPs or prompt images advertised on the
            # page, but these fields can be extended later if the site
            # structure evolves.
        )
        items.append(item)

    # Sort by title for consistency
    items.sort(key=lambda x: x.title.lower())
    return items


def main() -> None:
    items = crawl_lksmaker()
    data = [it.to_dict() for it in items]
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(items)} remote items to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
