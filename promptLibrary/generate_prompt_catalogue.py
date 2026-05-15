#!/usr/bin/env python3
"""Generate a JSON catalogue of all interactive prompt folders in this directory.

Usage (from this folder):
    python generate_prompt_catalogue.py

This scans for subfolders that contain an index.html file. For each such folder it:
- Reads prompt.txt if present
- Looks for a ZIP file with the same base name in the current directory
- Records paths that are relative to this HTML file (ai-prompt-library-community.html)

It outputs a `catalogue.json` file in the same directory, which can be loaded
by the HTML page using fetch().
"""

import json
import os
import re
import html as html_lib
from pathlib import Path
from datetime import datetime
import zipfile
from typing import Optional, Dict

ROOT = Path(__file__).parent

catalogue = []

# File-type groups used throughout
IMAGE_EXTS = ("png", "jpg", "jpeg", "gif", "webp", "svg")
KB_EXTS = ("txt", "md", "pdf", "docx", "doc", "rtf")


def extract_metadata_from_prompt(text: str) -> Dict[str, Optional[str]]:
    """Extract Topic, Grade Level, Subject from the standard prompt.txt header.

    The generator writes headers like:
        📚 Topic: Chinese Text to Speech with Hanyu Pinyin
        🎯 Grade Level: Primary 3-4
        📖 Subject Area: Science (General)

    This helper is tolerant to missing emojis and "Not specified" values.
    """
    meta: Dict[str, Optional[str]] = {
        "topic": None,
        "gradeLevel": None,
        "subject": None,
    }
    if not text:
        return meta

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        # Normalise away leading emojis if present
        if line.startswith("📚"):
            line = line[1:].lstrip()
        if line.startswith("🎯"):
            line = line[1:].lstrip()
        if line.startswith("📖"):
            line = line[1:].lstrip()

        if line.lower().startswith("topic:"):
            meta["topic"] = line.split(":", 1)[1].strip() or None
        elif line.lower().startswith("grade level:"):
            meta["gradeLevel"] = line.split(":", 1)[1].strip() or None
        elif line.lower().startswith("subject area:"):
            value = line.split(":", 1)[1].strip()
            if value and value.lower() != "not specified":
                meta["subject"] = value
    return meta


def clean_html_text(value: str) -> str:
    """Strip HTML tags, normalize whitespace, and decode entities."""
    if not value:
        return ""
    no_tags = re.sub(r"<[^>]+>", " ", value)
    normalized = re.sub(r"\s+", " ", no_tags).strip()
    return html_lib.unescape(normalized)


def extract_html_signals(html_path: Path) -> Dict[str, Optional[str]]:
    """Extract simple text signals (title/h1/h2) from an HTML file."""
    data: Dict[str, Optional[str]] = {"title": None, "h1": None, "h2": None}
    if not html_path or not html_path.is_file():
        return data
    try:
        raw = html_path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return data

    title_match = re.search(r"<title[^>]*>(.*?)</title>", raw, flags=re.IGNORECASE | re.DOTALL)
    if title_match:
        data["title"] = clean_html_text(title_match.group(1)) or None

    h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", raw, flags=re.IGNORECASE | re.DOTALL)
    if h1_match:
        data["h1"] = clean_html_text(h1_match.group(1)) or None

    h2_match = re.search(r"<h2[^>]*>(.*?)</h2>", raw, flags=re.IGNORECASE | re.DOTALL)
    if h2_match:
        data["h2"] = clean_html_text(h2_match.group(1)) or None

    return data


def infer_subject_from_text(*chunks: Optional[str]) -> Optional[str]:
    """Infer subject area from combined prompt/title/folder text."""
    text = " ".join([c for c in chunks if c]).lower()
    if not text:
        return None

    # Character & Citizenship Education (CCE)
    if re.search(r"character\s*&\s*citizenship education|\bcce\b|empathy|bystander|values-based|values based|unity|harmony heroes|online safety|deepfake|misinformation|decision making", text):
        return "Character & Citizenship Education"

    if re.search(r"physics|newtonian|projectile|refraction|reflection|wave|optics|electric|magnet|kinematics", text):
        return "Physics"
    if re.search(r"\bchemistry\b|chemical|titration|stoichiometry|electrolysis|periodic table|\bmolar\b|\bmolarity\b|\bacidic\b|\bacid\b|\balkali\b|\bph\b", text):
        return "Chemistry"
    if re.search(r"biology|cell|ecosystem|photosynthesis|respiration|organism|digestion|reproduction|life cycle", text):
        return "Biology"
    if re.search(r"science \(general\)|science lesson|science topic|shadow formation|light ray|plant growth|light intensity|general science", text):
        return "Science (General)"
    if re.search(r"mathematics|maths|math\b|algebra|fraction|trigonometry|geometry|graph|equation|unit circle|linear function|bar chart|addition|subtraction", text):
        return "Mathematics"
    if re.search(r"english language|literature in english|comprehension|grammar|vocabulary|writing", text):
        return "English Language"
    if re.search(r"chinese language|\bchinese\b|拼音|pinyin|汉字|成语|idiom", text):
        return "Chinese Language"
    if re.search(r"malay language|bahasa melayu|peribahasa|imbuhan|kata kerja", text):
        return "Malay Language"
    if re.search(r"tamil language|tamil", text):
        return "Tamil Language"
    if re.search(r"geography|population|climate|river|map|geomorphology", text):
        return "Geography"
    if re.search(r"\bhistory\b|world war|cold war|historical", text):
        return "History"
    if re.search(r"social studies|citizenship|governance|community", text):
        return "Social Studies"
    if re.search(r"economics|demand|supply|inflation|market", text):
        return "Economics"
    if re.search(r"principles of accounts|accounts|accounting|impairment|receivables|depreciation", text):
        return "Principles of Accounts"
    if re.search(r"computer science|computing|programming|coding|algorithm", text):
        return "Computing"
    if re.search(r"\bart\b|drawing|painting|colour wheel|color wheel", text):
        return "Art"
    if re.search(r"music|rhythm|melody|pitch|note value|fender rhodes|synth|sequencer|drum", text):
        return "Music"
    if re.search(r"physical education|\bpe\b|fitness|exercise|sports|softball|volleyball|football|fielding|drills?", text):
        return "Physical Education"

    return None


def detect_xapi_in_folder(folder: Path) -> bool:
    """Return True if any JavaScript file under this folder looks like an xAPI helper.

    Heuristic: any *.js file whose name contains "xapi", e.g. "xapiwrapper.min.js".
    Scans recursively but is restricted to the interactive's own folder tree.
    """
    try:
        for js_file in folder.rglob("*.js"):
            if "xapi" in js_file.name.lower():
                return True
    except Exception:
        # If anything goes wrong (permissions, etc.), fail gracefully
        return False
    return False


def detect_xapi_in_zip(zip_path: Path) -> bool:
    """Return True if the given ZIP archive appears to contain xAPI-related JS."""
    if not zip_path or not zip_path.is_file():
        return False
    try:
        with zipfile.ZipFile(zip_path, "r") as zf:
            for info in zf.infolist():
                name = info.filename.lower()
                if name.endswith(".js") and "xapi" in name:
                    return True
    except Exception:
        # Ignore corrupt ZIPs or other issues; treat as no xAPI
        return False
    return False

# Recursively find every folder that contains an index.html
for index_file in ROOT.rglob("index.html"):
    entry = index_file.parent
    # Skip tooling/library directories (e.g. node_modules) that are not real interactives
    if "node_modules" in entry.parts:
        continue
    if not entry.is_dir():
        continue

    # Paths relative to ROOT, so the HTML page can reference them directly
    rel_folder = entry.relative_to(ROOT)
    rel_index = index_file.relative_to(ROOT)

    folder_name = entry.name

    # Use the index.html modified time as the folder's modified timestamp
    try:
        modified_time = datetime.fromtimestamp(index_file.stat().st_mtime).isoformat()
    except OSError:
        modified_time = None

    prompt_file = entry / "prompt.txt"

    # Prefer a ZIP with the same folder name in the same directory;
    # if not found, fall back to a ZIP with that name at the ROOT.
    zip_candidates = [
        entry.parent / f"{folder_name}.zip",
        ROOT / f"{folder_name}.zip",
    ]
    zip_file = next((z for z in zip_candidates if z.is_file()), None)

    # Optional prompt.txt (text prompt)
    prompt_text = ""
    if prompt_file.is_file():
        try:
            prompt_text = prompt_file.read_text(encoding="utf-8")
        except Exception:
            # Fallback: try default encoding
            prompt_text = prompt_file.read_text(errors="ignore")

    meta = extract_metadata_from_prompt(prompt_text)
    html_signals = extract_html_signals(index_file)
    if not meta.get("subject"):
        inferred_subject = infer_subject_from_text(
            prompt_text,
            html_signals.get("title"),
            html_signals.get("h1"),
            html_signals.get("h2"),
            folder_name,
        )
        if inferred_subject:
            meta["subject"] = inferred_subject

    # Optional prompt_image.* (image prompt reference)
    prompt_image = None
    for ext in IMAGE_EXTS:
        candidate = entry / f"prompt_image.{ext}"
        if candidate.is_file():
            prompt_image = candidate
            break

    # Next best: generated thumbnail_320x180.* if present
    if prompt_image is None:
        for ext in IMAGE_EXTS:
            candidate = entry / f"thumbnail_320x180.{ext}"
            if candidate.is_file():
                prompt_image = candidate
                break

    # Fallback: any other image file in the folder
    if prompt_image is None:
        for child in sorted(entry.iterdir()):
            if not child.is_file():
                continue
            if child.name.lower() == "prompt.txt":
                continue
            if child.suffix.lower().lstrip(".") in IMAGE_EXTS:
                prompt_image = child
                break

    # Optional prompt_knowledge_base.* (doc / text knowledge base)
    knowledge_base = None
    for ext in KB_EXTS:
        candidate = entry / f"prompt_knowledge_base.{ext}"
        if candidate.is_file():
            knowledge_base = candidate
            break

    # Fallback: any other document/text file in the folder (except prompt.txt)
    if knowledge_base is None:
        for child in sorted(entry.iterdir()):
            if not child.is_file():
                continue
            if child.name.lower() == "prompt.txt":
                continue
            if child.suffix.lower().lstrip(".") in KB_EXTS:
                knowledge_base = child
                break

    # Detect presence of xAPI helper files either in the folder tree or ZIP payload
    has_xapi_folder = detect_xapi_in_folder(entry)
    has_xapi_zip = detect_xapi_in_zip(zip_file) if zip_file is not None else False
    has_xapi = has_xapi_folder or has_xapi_zip

    item = {
        # Use the relative folder path as a stable id, e.g. "ACPcookout2025/SomeInteractive_2025".
        "id": rel_folder.as_posix(),
        # Human-readable title: base folder name with underscores turned into spaces.
        "title": folder_name.replace("_", " "),
        # Base folder name (kept for backward compatibility)
        "folder": folder_name,
        # Full folder path relative to ROOT (new field)
        "folderPath": rel_folder.as_posix(),
        # Path to index.html relative to ROOT
        "indexPath": rel_index.as_posix(),
        # ISO 8601 modified time for sorting/filtering in the UI (local only)
        "modifiedTime": modified_time,
        # Optional metadata parsed from prompt.txt header (if present)
        "topic": meta.get("topic"),
        "gradeLevel": meta.get("gradeLevel"),
        "subject": meta.get("subject"),
        "hasPrompt": prompt_file.is_file(),
        "promptText": prompt_text,
        "hasZip": zip_file is not None,
        "zipPath": zip_file.relative_to(ROOT).as_posix() if zip_file is not None else None,
        "hasPromptImage": prompt_image is not None,
        "promptImagePath": prompt_image.relative_to(ROOT).as_posix() if prompt_image is not None else None,
        "promptImageExt": (prompt_image.suffix.lstrip(".").lower() if prompt_image is not None else None),
        "hasKnowledgeBase": knowledge_base is not None,
        "knowledgeBasePath": knowledge_base.relative_to(ROOT).as_posix() if knowledge_base is not None else None,
        "knowledgeBaseExt": (knowledge_base.suffix.lstrip(".").lower() if knowledge_base is not None else None),
        "hasXapi": has_xapi,
    }

    catalogue.append(item)

# ---------------------------------
# Pass 2: standalone HTML files
# ---------------------------------
# Some interactives are single HTML files (e.g. "Acid-Base Indicator Testing Lab.html")
# accompanied by an asset folder like "..._files" but without their own index.html.
# We add them here as additional catalogue items.
existing_index_paths = {it["indexPath"] for it in catalogue}

for html_file in ROOT.rglob("*.html"):
    # Skip tooling/library HTML inside node_modules (e.g. Playwright recorder/trace viewers)
    if "node_modules" in html_file.parts:
        continue
    name = html_file.name
    if name == "index.html":
        continue
    # Skip this catalogue page itself or any other non-interactive library shells
    if name in {"ai-prompt-library.html", "ai-prompt-library-community.html"}:
        continue

    # Skip browser-saved artefacts like Chrome "saved_resource" copies which
    # live inside a "*_files" asset folder. These are not real interactives.
    parent = html_file.parent
    stem_lower = html_file.stem.lower()
    if parent.name.endswith("_files") or stem_lower in {"saved_resource", "saved resource"}:
        continue

    rel_index = html_file.relative_to(ROOT).as_posix()
    if rel_index in existing_index_paths:
        continue  # already covered by the index.html pass

    entry = parent
    rel_folder = entry.relative_to(ROOT)
    folder_name = html_file.stem  # use the file stem as the display name

    # Use this standalone HTML file's modified time
    try:
        modified_time = datetime.fromtimestamp(html_file.stat().st_mtime).isoformat()
    except OSError:
        modified_time = None

    # For ACP-style single HTML + *_files structure, many prompts/live assets
    # sit inside the "<Name>_files" folder, not next to the HTML itself.
    assets_dir = entry / f"{folder_name}_files"

    # Optional prompt.txt: prefer same folder; fall back to assets_dir
    prompt_file = entry / "prompt.txt"
    actual_prompt_file = None
    if prompt_file.is_file():
        actual_prompt_file = prompt_file
    elif assets_dir.is_dir() and (assets_dir / "prompt.txt").is_file():
        actual_prompt_file = assets_dir / "prompt.txt"

    zip_candidates = [
        entry / f"{folder_name}.zip",
        ROOT / f"{folder_name}.zip",
    ]
    zip_file = next((z for z in zip_candidates if z.is_file()), None)

    prompt_text = ""
    if actual_prompt_file is not None:
        try:
            prompt_text = actual_prompt_file.read_text(encoding="utf-8")
        except Exception:
            prompt_text = actual_prompt_file.read_text(errors="ignore")

    meta = extract_metadata_from_prompt(prompt_text)
    html_signals = extract_html_signals(html_file)
    if not meta.get("subject"):
        inferred_subject = infer_subject_from_text(
            prompt_text,
            html_signals.get("title"),
            html_signals.get("h1"),
            html_signals.get("h2"),
            folder_name,
        )
        if inferred_subject:
            meta["subject"] = inferred_subject

    # Optional prompt_image.*: prefer explicit prompt_image.* in assets_dir,
    # then in entry; otherwise fall back to any image in those locations.
    prompt_image = None
    search_dirs = []
    if assets_dir.is_dir():
        search_dirs.append(assets_dir)
    search_dirs.append(entry)

    for d in search_dirs:
        for ext in IMAGE_EXTS:
            candidate = d / f"prompt_image.{ext}"
            if candidate.is_file():
                prompt_image = candidate
                break
        if prompt_image is not None:
            break

    # Next best: generated thumbnail_320x180.* if present in assets or entry dir
    if prompt_image is None:
        for d in search_dirs:
            for ext in IMAGE_EXTS:
                candidate = d / f"thumbnail_320x180.{ext}"
                if candidate.is_file():
                    prompt_image = candidate
                    break
            if prompt_image is not None:
                break

    if prompt_image is None:
        for d in search_dirs:
            try:
                for child in sorted(d.iterdir()):
                    if not child.is_file():
                        continue
                    if child.name.lower() == "prompt.txt":
                        continue
                    if child.suffix.lower().lstrip(".") in IMAGE_EXTS:
                        prompt_image = child
                        break
            except FileNotFoundError:
                continue
            if prompt_image is not None:
                break

    # Optional knowledge-base file: prefer prompt_knowledge_base.* in assets_dir,
    # then in entry; otherwise fall back to any doc/text file in those locations.
    knowledge_base = None
    for d in search_dirs:
        for ext in KB_EXTS:
            candidate = d / f"prompt_knowledge_base.{ext}"
            if candidate.is_file():
                knowledge_base = candidate
                break
        if knowledge_base is not None:
            break

    if knowledge_base is None:
        for d in search_dirs:
            try:
                for child in sorted(d.iterdir()):
                    if not child.is_file():
                        continue
                    if child.name.lower() == "prompt.txt":
                        continue
                    if child.suffix.lower().lstrip(".") in KB_EXTS:
                        knowledge_base = child
                        break
            except FileNotFoundError:
                continue
            if knowledge_base is not None:
                break

    # Detect presence of xAPI helper files in this standalone HTML's assets folder or ZIP.
    # For downloaded SLS/promptLibrary HTML (e.g. ACPcookout2025), each interactive lives
    # in its own *_files directory, so scanning a shared parent folder (like "users/")
    # would incorrectly mark *all* interactives as xAPI if any one of them uses xAPI.
    if assets_dir.is_dir():
        # Prefer scanning the per-interactive assets folder only
        has_xapi_folder = detect_xapi_in_folder(assets_dir)
    else:
        # If there is no dedicated *_files folder locally, do NOT scan the parent
        # directory (to avoid cross-contamination between different HTML files).
        # In this case we only trust the ZIP payload (if any) for xAPI detection.
        has_xapi_folder = False
    has_xapi_zip = detect_xapi_in_zip(zip_file) if zip_file is not None else False
    has_xapi = has_xapi_folder or has_xapi_zip

    item = {
        # Stable id based on the HTML path without extension
        "id": str(Path(rel_index).with_suffix("")),
        "title": folder_name.replace("_", " "),
        "folder": folder_name,
        "folderPath": rel_folder.as_posix(),
        "indexPath": rel_index,
        "modifiedTime": modified_time,
        "topic": meta.get("topic"),
        "gradeLevel": meta.get("gradeLevel"),
        "subject": meta.get("subject"),
        "hasPrompt": actual_prompt_file is not None,
        "promptText": prompt_text,
        "hasZip": zip_file is not None,
        "zipPath": zip_file.relative_to(ROOT).as_posix() if zip_file is not None else None,
        "hasPromptImage": prompt_image is not None,
        "promptImagePath": prompt_image.relative_to(ROOT).as_posix() if prompt_image is not None else None,
        "promptImageExt": (prompt_image.suffix.lstrip(".").lower() if prompt_image is not None else None),
        "hasKnowledgeBase": knowledge_base is not None,
        "knowledgeBasePath": knowledge_base.relative_to(ROOT).as_posix() if knowledge_base is not None else None,
        "knowledgeBaseExt": (knowledge_base.suffix.lstrip(".").lower() if knowledge_base is not None else None),
        "hasXapi": has_xapi,
    }

    catalogue.append(item)

# Sort by title for a stable order
catalogue.sort(key=lambda x: x["title"].lower())

output_path = ROOT / "catalogue.json"
output_path.write_text(json.dumps(catalogue, indent=2, ensure_ascii=False), encoding="utf-8")

print(f"Wrote {len(catalogue)} items to {output_path}")
