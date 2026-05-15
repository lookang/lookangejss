#!/usr/bin/env python3
"""Generate a JSON catalogue of remote interactives hosted on iwant2study.org.

This script crawls the Apache-style directory listings under
    https://iwant2study.org/lookangejss/slsMasterPrompt/

and discovers HTML interactives to expose in the same catalogue format used by
`generate_prompt_catalogue.py`, but with **absolute URLs** for `indexPath`.

Output:
    catalogue_remote.json

Usage (from this folder):
    python generate_remote_catalogue.py

Notes / Design choices
----------------------
- To avoid overloading the server, the script:
  * Uses only the Python standard library (no extra dependencies).
  * Has a small delay between directory requests.
  * Limits the total number of recorded items via MAX_ITEMS.
- By default, it starts at the root `lookangejss/slsMasterPrompt/` directory and recurses.
  You can narrow the crawl to selected subtrees by editing START_PATHS below,
  e.g. START_PATHS = ["promptLibrary/"] or ["physics/", "math/"]
- For now, we only record the HTML entry itself (indexPath and basic metadata).
  We **do not** try to detect remote prompt.txt / ZIP / prompt_image files to
  keep the number of HTTP calls reasonable.
"""

from __future__ import annotations

import json
import time
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import PurePosixPath
from typing import List, Set
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, unquote
from urllib.request import urlopen

BASE_URL = "https://iwant2study.org/lookangejss/slsMasterPrompt/"
# Relative paths (from BASE_URL) to start crawling. Empty string means root.
START_PATHS = [""]  # you can change to ["promptLibrary/"] to restrict scope

# Additional targeted iwant2study.org roots that are explicitly labelled "ai".
# These live outside the slsMasterPrompt/ tree and are kept as a small,
# manually-curated list so we don't need to crawl the entire /lookangejss/ site.
LOOKANGE_ROOT = "https://iwant2study.org/lookangejss/"
AI_ROOT_URLS = [
    "https://iwant2study.org/lookangejss/geography/ai/",
    "https://iwant2study.org/lookangejss/02_newtonianmechanics_2kinematics/ai/",
    "https://iwant2study.org/lookangejss/02_newtonianmechanics_7energyworkpower/ai/",
    "https://iwant2study.org/lookangejss/04waves_12generalwaves/ai/",
    "https://iwant2study.org/lookangejss/04waves_13electromagneticspectrum/ai/",
    "https://iwant2study.org/lookangejss/05electricitynmagnetism_21electromagnetism/ai/",
    "https://iwant2study.org/lookangejss/06QuantumPhysics/ai/",
    "https://iwant2study.org/lookangejss/biology/ai/",
    "https://iwant2study.org/lookangejss/chemistryejss/ai/",
    "https://iwant2study.org/lookangejss/english/ai/",
    "https://iwant2study.org/lookangejss/jinSheng/",
    "https://iwant2study.org/lookangejss/math/AI/",
    "https://iwant2study.org/lookangejss/quiz/",
    "https://iwant2study.org/lookangejss/sarah_ell/",
    "https://iwant2study.org/lookangejss/slsTimeTable/",
    "https://iwant2study.org/lookangejss/slsURLConverter/",
    "https://iwant2study.org/lookangejss/slshtml5score/",
    "https://iwant2study.org/lookangejss/socialStudies/",
    "https://iwant2study.org/lookangejss/Apertus/",
    "https://iwant2study.org/lookangejss/chinese/ai/",
    # Add more /subject/ai/ roots here as needed, e.g.:
    # "https://iwant2study.org/lookangejss/physics/ai/",
    # "https://iwant2study.org/lookangejss/math/ai/",
]

# Some AI roots (like english/ai/) contain "collection" folders which in turn
# hold multiple HTML5 versions. We treat those inner folders as separate
# interactives.
NESTED_AI_COLLECTIONS = {
    "https://iwant2study.org/lookangejss/english/ai/": [
        "englishVocaGame",
    ],
}

# Prompt Library roots: these contain multiple HTML interactives per folder
PROMPT_LIBRARY_ROOTS = [
    "https://iwant2study.org/lookangejss/promptLibrary/",
]

# Safety limits
REQUEST_DELAY_SEC = 0.15  # polite delay between directory requests
MAX_ITEMS = 2000          # hard cap on total interactives recorded
MAX_DEPTH = 10            # max directory depth from BASE_URL


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
    hasXapi: bool = False

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
            "hasXapi": self.hasXapi,
        }


class LinkParser(HTMLParser):
    """Very simple HTML anchor parser for Apache directory listings."""

    def __init__(self) -> None:
        super().__init__()
        self.links: List[str] = []

    def handle_starttag(self, tag: str, attrs):  # type: ignore[override]
        if tag.lower() != "a":
            return
        href = None
        for k, v in attrs:
            if k.lower() == "href":
                href = v
                break
        if href:
            self.links.append(href)


def is_apache_index_page(html: str) -> bool:
    """Heuristically detect an Apache-style directory index page.

    We look for the typical "Index of /path" header and sort links like
    `?C=N;O=D` which should not appear on content pages.
    """
    return "Index of /" in html and "?C=N;O=" in html


def fetch_directory_html(url: str) -> str | None:
    """Fetch a directory listing page as text. Returns None on error."""
    try:
        with urlopen(url) as resp:
            # Some servers may not set a status attribute, fall back to getcode().
            status = getattr(resp, "status", None) or resp.getcode()
            if status >= 400:
                print(f"[WARN] HTTP {status} on {url}")
                return None
            content_bytes = resp.read()
            return content_bytes.decode("utf-8", errors="ignore")
    except (HTTPError, URLError) as e:
        print(f"[WARN] Error fetching {url}: {e}")
        return None


def is_subdirectory_href(href: str) -> bool:
    href = href.strip()
    if not href:
        return False
    # Ignore absolute paths that escape the BASE_URL subtree
    if href.startswith("/"):
        return False
    if href.startswith("?"):
        # Sorting / query links like ?C=N;O=D
        return False
    if href in {"/", "../"}:
        return False
    if "#" in href:
        return False
    return href.endswith("/")


def is_html_file_href(href: str) -> bool:
    href = href.strip()
    if not href:
        return False
    # Ignore absolute paths that escape the BASE_URL subtree
    if href.startswith("/"):
        return False
    if href.startswith("?"):
        return False
    if href.endswith("/"):
        return False
    lower = href.lower()
    return lower.endswith(".html")


def depth_from_root(rel_path: str) -> int:
    rel_path = rel_path.strip("/")
    if not rel_path:
        return 0
    return rel_path.count("/") + 1


def crawl_directory(rel_path: str, items: List[CatalogueItem], visited: Set[str]) -> None:
    """Recursively crawl a directory under BASE_URL.

    rel_path: path relative to BASE_URL, e.g. "02_newtonianmechanics_7energyworkpower/".
    """
    if len(items) >= MAX_ITEMS:
        return

    # Normalise rel_path to always end with '/'
    if rel_path and not rel_path.endswith("/"):
        rel_path = rel_path + "/"

    url = urljoin(BASE_URL, rel_path)
    if url in visited:
        return
    visited.add(url)

    if depth_from_root(rel_path) > MAX_DEPTH:
        print(f"[INFO] Skipping {url} (depth>{MAX_DEPTH})")
        return

    print(f"[INFO] Crawling directory: {url}")
    html = fetch_directory_html(url)
    if html is None:
        return

    # Special handling for slsMasterPrompt: each *top-level* directory is an
    # interactive whose content is served directly at the directory URL
    # (typically via an underlying index.html). These pages are not Apache
    # index listings, so they would otherwise produce no .html links.
    if BASE_URL.endswith("slsMasterPrompt/") and rel_path and depth_from_root(rel_path) == 1:
        if not is_apache_index_page(html):
            # Treat this directory URL itself as the interactive entry point.
            # Use the folder name as the title (underscores -> spaces).
            p = PurePosixPath(rel_path.strip("/"))
            folder_name = p.name
            title = folder_name.replace("_", " ")

            # Avoid duplicates
            existing_paths = {it.indexPath for it in items}
            if url not in existing_paths:
                # Compute a matching ZIP path if it exists (same name + .zip
                # at the slsMasterPrompt root). We don't verify existence
                # here to keep requests minimal.
                zip_url = urljoin(BASE_URL, f"{folder_name}.zip")

                item = CatalogueItem(
                    id="remote:" + str(p),
                    title=title,
                    folder=folder_name,
                    folderPath=str(p) + "/",
                    indexPath=url,
                    hasZip=True,
                    zipPath=zip_url,
                )
                items.append(item)
                print(f"  [ADD] {title} -> {url}")

            # We still continue to parse this page for any additional
            # subdirectories/links, but we skip the normal HTML-file loop
            # because the directory URL itself is the main entry point.

    parser = LinkParser()
    parser.feed(html)

    # First process HTML files in this directory
    for href in parser.links:
        if not is_html_file_href(href):
            continue
        rel_file = rel_path + href.strip()
        add_html_item(rel_file, items)
        if len(items) >= MAX_ITEMS:
            print(f"[INFO] Reached MAX_ITEMS={MAX_ITEMS}, stopping crawl.")
            return

    # Then recurse into subdirectories
    for href in parser.links:
        if not is_subdirectory_href(href):
            continue
        sub_rel_path = rel_path + href.strip()
        crawl_directory(sub_rel_path, items, visited)
        if len(items) >= MAX_ITEMS:
            return

    # Be polite to the server
    time.sleep(REQUEST_DELAY_SEC)


def add_html_item(rel_index: str, items: List[CatalogueItem]) -> None:
    """Add a CatalogueItem for a discovered HTML file.

    rel_index is the path *relative to BASE_URL*, e.g.
        "02_newtonianmechanics_7energyworkpower/ejss_model_projectileprimary/index.html"
    """
    p = PurePosixPath(rel_index)
    if p.suffix.lower() != ".html":
        return

    # Avoid duplicates
    existing_paths = {it.indexPath for it in items}
    full_url = urljoin(BASE_URL, rel_index)
    if full_url in existing_paths:
        return

    if p.name == "index.html":
        folder_path = str(p.parent)  # e.g. "02_newtonian.../ejss_model_projectileprimary"
        folder_name = p.parent.name or "index"
        title = folder_name.replace("_", " ")
    else:
        folder_path = str(p.parent)
        folder_name = p.stem
        title = folder_name.replace("_", " ")

    if folder_path and not folder_path.endswith("/"):
        folder_path = folder_path + "/"

    # Prefix id with "remote:" to avoid collisions with local catalogue ids
    item_id = "remote:" + str(PurePosixPath(rel_index).with_suffix(""))

    item = CatalogueItem(
        id=item_id,
        title=title,
        folder=folder,
        folderPath=folder_path,
        indexPath=full_url,
    )

    items.append(item)
    print(f"  [ADD] {title} -> {full_url}")


def add_ai_directories_from_root(root_url: str, items: List[CatalogueItem]) -> None:
    """Discover AI-labelled interactives under a single /.../ai/ root.

    We assume each immediate subdirectory under ``root_url`` is an interactive.
    This lets us include AI projects that live outside ``slsMasterPrompt/``
    without crawling the entire ``/lookangejss/`` tree.
    """
    if len(items) >= MAX_ITEMS:
        return

    html = fetch_directory_html(root_url)
    if html is None:
        print(f"[WARN] Could not fetch AI root {root_url}")
        return

    parser = LinkParser()
    parser.feed(html)

    # Collect available ZIP filenames in this directory for optional pairing.
    zip_files = set()
    for href in parser.links:
        href = href.strip()
        if not href:
            continue
        if href.startswith("/") or href.startswith("?"):
            continue
        if href.lower().endswith(".zip"):
            zip_files.add(href)

    existing_paths = {it.indexPath for it in items}

    for href in parser.links:
        if not is_subdirectory_href(href):
            continue
        name = href.strip().rstrip("/")
        if not name:
            continue

        # Special case: some AI roots have a "collection" folder which in turn
        # contains multiple HTML5 versions (e.g. englishVocaGame). For those,
        # we add one item per inner folder instead of treating the collection
        # itself as the interactive.
        nested_for_root = NESTED_AI_COLLECTIONS.get(root_url, [])
        if name in nested_for_root:
            add_nested_ai_collection_items(root_url, name, items, existing_paths)
            if len(items) >= MAX_ITEMS:
                return
            continue

        full_url = urljoin(root_url, href.strip())
        if full_url in existing_paths:
            continue

        # Derive a folderPath relative to the generic iwant2study.org root.
        folder_path_prefix = ""
        if root_url.startswith(LOOKANGE_ROOT):
            # Example: root_url = "https://iwant2study.org/lookangejss/geography/ai/"
            # We want folderPath like "geography/ai/volcano-simulation-GPT41/".
            root_rel = root_url[len(LOOKANGE_ROOT) :]
            folder_path_prefix = root_rel
        folder_path = (folder_path_prefix + name + "/").lstrip("/")

        folder = name
        # Use a human-friendly title by decoding any %xx sequences (e.g. %20)
        # while keeping the underlying URLs encoded.
        decoded_name = unquote(name)
        title = decoded_name.replace("_", " ")

        zip_name = name + ".zip"
        zip_url = urljoin(root_url, zip_name) if zip_name in zip_files else None

        item = CatalogueItem(
            id="remote:ai:" + folder_path.rstrip("/"),
            title=title,
            folder=folder,
            folderPath=folder_path,
            indexPath=full_url,
            hasZip=zip_url is not None,
            zipPath=zip_url,
            # All interactives under the slshtml5score root are purpose-built
            # xAPI scoring HTML5 apps, so we mark them as scorable.
            hasXapi="slshtml5score/" in root_url,
        )
        items.append(item)
        print(f"  [ADD AI] {title} -> {full_url}")

        if len(items) >= MAX_ITEMS:
            print(f"[INFO] Reached MAX_ITEMS={MAX_ITEMS} while adding AI items, stopping.")
            return


def add_nested_ai_collection_items(
    root_url: str,
    coll_name: str,
    items: List[CatalogueItem],
    existing_paths: Set[str],
) -> None:
    """Handle AI roots where a collection folder contains multiple versions.

    Example: english/ai/englishVocaGame/ has subfolders like
    html5_content_20250422_030552Claude37/ each representing a distinct
    interactive. We add one CatalogueItem per such inner folder.
    """
    if len(items) >= MAX_ITEMS:
        return

    coll_url = urljoin(root_url, coll_name.rstrip("/") + "/")
    html = fetch_directory_html(coll_url)
    if html is None:
        print(f"[WARN] Could not fetch nested AI collection {coll_url}")
        return

    parser = LinkParser()
    parser.feed(html)

    zip_files: Set[str] = set()
    subdirs: List[str] = []
    for href in parser.links:
        href = href.strip()
        if not href or href.startswith("/") or href.startswith("?"):
            continue
        if href.lower().endswith(".zip"):
            zip_files.add(href)
        elif is_subdirectory_href(href):
            subdirs.append(href)

    # Derive a base folderPath prefix like "english/ai/englishVocaGame/".
    if root_url.startswith(LOOKANGE_ROOT):
        root_rel = root_url[len(LOOKANGE_ROOT) :]
        folder_path_prefix = root_rel + coll_name.rstrip("/") + "/"
    else:
        folder_path_prefix = coll_name.rstrip("/") + "/"

    for sub_href in subdirs:
        sub_name = sub_href.strip().rstrip("/")
        if not sub_name:
            continue

        full_url = urljoin(coll_url, sub_href.strip())
        if full_url in existing_paths:
            continue

        decoded_name = unquote(sub_name)
        title = decoded_name.replace("_", " ")

        folder_path = (folder_path_prefix + sub_name + "/").lstrip("/")
        folder = decoded_name

        zip_name = sub_name + ".zip"
        zip_url = urljoin(coll_url, zip_name) if zip_name in zip_files else None

        item = CatalogueItem(
            id="remote:ai:" + folder_path.rstrip("/"),
            title=title,
            folder=folder,
            folderPath=folder_path,
            indexPath=full_url,
            hasZip=zip_url is not None,
            zipPath=zip_url,
        )
        items.append(item)
        existing_paths.add(full_url)
        print(f"  [ADD AI] {title} -> {full_url}")

        if len(items) >= MAX_ITEMS:
            print(f"[INFO] Reached MAX_ITEMS={MAX_ITEMS} while adding nested AI items, stopping.")
            return


def add_promptlibrary_interactives(root_url: str, items: List[CatalogueItem]) -> None:
    """Discover interactives under /promptLibrary/ collections.

    Here each immediate subdirectory (e.g. ACPcookout2025/) is a *collection*
    that contains one or more standalone HTML files. We add one CatalogueItem
    per HTML file in those subdirectories, instead of treating the directory
    itself as the interactive.
    """
    if len(items) >= MAX_ITEMS:
        return

    # Fetch the /promptLibrary/ index page
    html = fetch_directory_html(root_url)
    if html is None:
        print(f"[WARN] Could not fetch promptLibrary root {root_url}")
        return

    root_parser = LinkParser()
    root_parser.feed(html)

    existing_paths = {it.indexPath for it in items}

    for href in root_parser.links:
        # Only consider immediate subdirectories like ACPcookout2025/
        if not is_subdirectory_href(href):
            continue
        coll_name = href.strip().rstrip("/")
        if not coll_name:
            continue

        coll_url = urljoin(root_url, href.strip())

        # Fetch collection directory listing (e.g. .../promptLibrary/ACPcookout2025/)
        coll_html = fetch_directory_html(coll_url)
        if coll_html is None:
            print(f"[WARN] Could not fetch promptLibrary collection {coll_url}")
            continue

        coll_parser = LinkParser()
        coll_parser.feed(coll_html)

        # Build ZIP lookup once per collection
        zip_files = set()
        html_files = []
        for h in coll_parser.links:
            h = h.strip()
            if not h or h.startswith("/") or h.startswith("?"):
                continue
            if h.lower().endswith(".zip"):
                zip_files.add(h)
            elif is_html_file_href(h):
                html_files.append(h)

        # Derive a base folderPath prefix like "promptLibrary/ACPcookout2025/"
        folder_path_prefix = ""
        if root_url.startswith(LOOKANGE_ROOT):
            root_rel = root_url[len(LOOKANGE_ROOT) :]
            folder_path_prefix = root_rel + coll_name + "/"
        else:
            folder_path_prefix = coll_name + "/"

        for html_name in html_files:
            full_url = urljoin(coll_url, html_name)
            if full_url in existing_paths:
                continue

            stem = PurePosixPath(html_name).stem
            decoded_stem = unquote(stem)
            title = decoded_stem.replace("_", " ")

            folder_path = (folder_path_prefix).lstrip("/")
            folder = decoded_stem

            # Try to match a ZIP with the same stem
            zip_candidate = stem + ".zip"
            zip_url = urljoin(coll_url, zip_candidate) if zip_candidate in zip_files else None

            item = CatalogueItem(
                id="remote:promptLibrary:" + folder_path.rstrip("/") + ":" + stem,
                title=title,
                folder=folder,
                folderPath=folder_path,
                indexPath=full_url,
                hasZip=zip_url is not None,
                zipPath=zip_url,
            )
            items.append(item)
            existing_paths.add(full_url)
            print(f"  [ADD AI] {title} -> {full_url}")

            if len(items) >= MAX_ITEMS:
                print(f"[INFO] Reached MAX_ITEMS={MAX_ITEMS} while adding promptLibrary items, stopping.")
                return


def main() -> None:
    items: List[CatalogueItem] = []
    visited: Set[str] = set()

    # Crawl the main slsMasterPrompt/ tree as before.
    for start in START_PATHS:
        crawl_directory(start, items, visited)

    # Then add targeted AI-labelled directories that live outside slsMasterPrompt.
    for root_url in AI_ROOT_URLS:
        add_ai_directories_from_root(root_url, items)

    # Special handling for /promptLibrary/ where each subfolder contains
    # multiple HTML interactives.
    for root_url in PROMPT_LIBRARY_ROOTS:
        add_promptlibrary_interactives(root_url, items)

    # Sort by title like the local generator does
    items.sort(key=lambda x: x.title.lower())

    data = [it.to_dict() for it in items]
    output_path = "catalogue_remote.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nWrote {len(items)} remote items to {output_path}")


if __name__ == "__main__":
    main()
