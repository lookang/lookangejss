#!/usr/bin/env python3
"""Generate a JSON catalogue of remote interactives hosted in
https://github.com/lekuajames/Claude.AI-Stash and served via GitHub Pages.

Each top-level directory in the repo that contains an ``index.html`` file is
treated as a standalone interactive, with its live URL assumed to be:

    https://lekuajames.github.io/Claude.AI-Stash/<folder>/

The output JSON uses the same basic CatalogueItem shape as the other
remote-* generators in this folder, but adds richer, search-friendly
``promptText`` that encodes subject and topic keywords inferred from
the folder name. This makes it easier to search by subject text and
keywords in downstream tools.

Output:
    catalogue_remote_claudestash.json

Usage (from this folder):
    python generate_remote_catalogue_claudestash.py

Design notes
------------
- Uses only the Python standard library (urllib + json).
- Talks to the GitHub REST API at:
    https://api.github.com/repos/lekuajames/Claude.AI-Stash/contents
- For each *top-level* directory that contains ``index.html``, we create
  one CatalogueItem with:
    * id:        "remote:claudestash:<folder>"
    * title:     humanised version of the folder name
    * folder:    original folder name
    * folderPath:"<folder>/"
    * indexPath: GitHub Pages URL for that folder
    * promptText: subject / topics / keywords derived from folder name
- Tagging is heuristic and based on simple keyword matching in the
  folder name. This can be refined later as the collection grows.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import List
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import urlopen


BASE_API_URL = "https://api.github.com/repos/lekuajames/Claude.AI-Stash/contents/"
BASE_PAGES_URL = "https://lekuajames.github.io/Claude.AI-Stash/"
OUTPUT_PATH = "catalogue_remote_claudestash.json"


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


def _fetch_json(url: str):
    """Fetch JSON from the given URL, returning the decoded Python object.

    Raises RuntimeError on HTTP/network errors.
    """

    try:
        with urlopen(url) as resp:  # nosec: B310 - controlled, read-only URL
            status = getattr(resp, "status", None) or resp.getcode()
            if status >= 400:
                raise RuntimeError(f"HTTP {status} on {url}")
            data = resp.read().decode("utf-8", errors="ignore")
    except (HTTPError, URLError) as e:  # pragma: no cover - network failure
        raise RuntimeError(f"Error fetching {url}: {e}") from e

    return json.loads(data)


def _list_dir(path: str = "") -> list[dict]:
    """List a directory in the Claude.AI-Stash repo via GitHub API.

    ``path`` is interpreted relative to the repo root. An empty string
    lists the top-level contents.
    """

    url = BASE_API_URL + path.lstrip("/")
    return _fetch_json(url)


def _has_index_html(entries: list[dict]) -> bool:
    """Return True if any of the entries is a file named index.html."""

    for entry in entries:
        if entry.get("type") != "file":
            continue
        if entry.get("name", "").lower() == "index.html":
            return True
    return False


def _humanise_title(folder_name: str) -> str:
    """Convert a folder name like 'ForcesMotion' or 'digestivesystem'
    into a more human-readable title.
    """

    # Replace common separators with spaces
    s = folder_name.replace("_", " ").replace("-", " ")
    # Insert spaces before internal capitals: "ForcesMotion" -> "Forces Motion"
    s = re.sub(r"(?<!^)(?=[A-Z])", " ", s)
    # Collapse multiple spaces
    s = re.sub(r"\s+", " ", s).strip()
    if not s:
        return folder_name
    # Simple sentence-style capitalisation
    return s[0].upper() + s[1:]


def _infer_prompt_text(folder_name: str) -> str:
    """Infer a subject / topics / keywords string from the folder name.

    This is intentionally heuristic but should give reasonably useful
    search text. It can be refined later without changing the overall
    catalogue structure.
    """

    lower = folder_name.lower()

    subject = "Science"
    topics: list[str] = []

    # Physics: radiation / radioactivity / half-life
    if any(k in lower for k in ["radiation", "radioactivity", "half life", "halflife", "half-life"]):
        subject = "Physics"
        topics.extend(["Radioactivity", "Nuclear physics"])

    # Physics: forces and motion, kinematics, dynamics
    if any(k in lower for k in ["force", "forces", "motion", "velocity", "acceleration", "newton"]):
        subject = "Physics"
        topics.extend(["Forces", "Motion", "Kinematics", "Dynamics"])

    # Physics: energy, GPE, work done, power
    if any(k in lower for k in ["gpe", "energy", "workdone", "work_done", "work-done", "power"]):
        subject = "Physics"
        topics.extend(["Energy", "Gravitational potential energy", "Work done", "Power"])

    # Physics: pressure, hydraulics, fluids
    if any(k in lower for k in ["pressure", "hydraulic", "hydraulics", "fluid"]):
        subject = "Physics"
        topics.extend(["Pressure", "Fluids", "Hydraulics"])

    # Electricity / electrostatics
    if any(k in lower for k in ["static", "electro", "charge", "induction"]):
        subject = "Physics"
        topics.extend(["Electric fields", "Electrostatics"])

    # Biology: body systems, digestion, circulation, ecology
    if any(k in lower for k in ["digest", "stomach", "intestine", "blood", "heart", "lung", "respiratory"]):
        subject = "Biology"
        topics.extend(["Human body systems", "Digestive system", "Circulatory system", "Respiratory system"])

    if any(k in lower for k in ["foodweb", "food_web", "food-web", "ecosystem", "population"]):
        subject = "Biology"
        topics.extend(["Ecology", "Food webs", "Ecosystems"])

    # Generic STEM / math tags if nothing more specific fires
    if subject == "Science" and any(k in lower for k in ["graph", "function", "equation", "probability", "statistics", "algebra"]):
        subject = "Mathematics"
        topics.extend(["Algebra", "Graphs", "Functions"])

    # Fallback generic topic if we did not infer anything specific
    if not topics:
        topics.append("Interactive simulation")

    human_title = _humanise_title(folder_name)

    # Compose a single search-friendly text field
    topics_str = ", ".join(dict.fromkeys(topics))  # de-duplicate while preserving order
    keywords = ", ".join({folder_name, human_title})

    return f"Subject: {subject}; Topics: {topics_str}; Keywords: {keywords}"


def crawl_claudestash() -> List[CatalogueItem]:
    """Discover interactives in the Claude.AI-Stash repo.

    We only look at top-level directories that contain an ``index.html``
    file. Each such directory becomes one CatalogueItem.
    """

    items: List[CatalogueItem] = []

    top_level = _list_dir("")
    for entry in top_level:
        if entry.get("type") != "dir":
            continue

        folder = entry.get("name", "").strip()
        if not folder:
            continue

        contents = _list_dir(folder)
        if not _has_index_html(contents):
            continue

        title = _humanise_title(folder)
        prompt_text = _infer_prompt_text(folder)

        folder_path = f"{folder}/"
        index_url = urljoin(BASE_PAGES_URL, folder + "/")

        item = CatalogueItem(
            id=f"remote:claudestash:{folder}",
            title=title,
            folder=folder,
            folderPath=folder_path,
            indexPath=index_url,
            hasPrompt=bool(prompt_text),
            promptText=prompt_text,
        )
        items.append(item)

    # Sort by human-readable title for consistency with other catalogues
    items.sort(key=lambda x: x.title.lower())
    return items


def main() -> None:
    items = crawl_claudestash()
    data = [it.to_dict() for it in items]
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(items)} remote items to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
