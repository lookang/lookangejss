#!/usr/bin/env python3
"""
Enrich EJSS simulation pages with unique SEO content via Claude Haiku API.

For each EJSS index.html the script:
  1. Extracts title, subject area, topic, authors from the HTML
  2. Calls Claude Haiku to generate a unique meta description, keywords,
     and educational paragraph
  3. Injects the content into the HTML

BEFORE RUNNING:
  set ANTHROPIC_API_KEY=your_key_here   (Windows)
  export ANTHROPIC_API_KEY=your_key_here (Mac/Linux)

MODES:
  SAMPLE_N = 5      Process only first N files (0 = all)
  DRY_RUN  = True   Call API + print output, do NOT write files
  DRY_RUN  = False  Write files to disk
"""

import os
import re
import json
import time

import anthropic

# ── CONFIG ────────────────────────────────────────────────────────────────────
ROOT_DIR  = os.path.dirname(os.path.abspath(__file__))
DRY_RUN   = False  # Set False to write files
SAMPLE_N  = 0      # 0 = all files
DELAY     = 0.3    # seconds between API calls
MODEL     = "claude-haiku-4-5-20251001"
PROGRESS_FILE = os.path.join(ROOT_DIR, "enrichment_progress.json")
OUTPUT_LIST   = os.path.join(ROOT_DIR, "enriched_files_to_upload.txt")
# ─────────────────────────────────────────────────────────────────────────────

# Generic variable names to skip when extracting sim-specific vars
GENERIC_VARS = {
    "xmin","xmax","ymin","ymax","zmin","zmax","rangex","rangey","rangez",
    "sizex","sizey","sizez","width","height","pi","t","dt","n","m","x","y",
    "z","vx","vy","vz","r","g","i","j","k","print","font","fontb","ep","dp",
    "Width","Height","world","graph","graph2","disabled","disabledworld",
}

# Map folder prefix patterns to human-readable subject labels
SUBJECT_MAP = [
    ("01_measurement",                   "Measurement"),
    ("02_newtonianmechanics_2kinematics","Kinematics"),
    ("02_newtonianmechanics_3dynamics",  "Dynamics"),
    ("02_newtonianmechanics_4mass",      "Mass, Weight and Density"),
    ("02_newtonianmechanics_5turning",   "Turning Effects of Forces"),
    ("02_newtonianmechanics_6circle",    "Circular Motion"),
    ("02_newtonianmechanics_6pressure",  "Pressure"),
    ("02_newtonianmechanics_7energy",    "Energy, Work and Power"),
    ("02_newtonianmechanics_7gravity",   "Gravitation"),
    ("02_newtonianmechanics_8oscillat",  "Oscillations"),
    ("02_newtonianmechanics_10rotation", "Rotational Motion"),
    ("02_newtonianmechanics",            "Newtonian Mechanics"),
    ("03thermalphysics_08kinetic",       "Kinetic Model of Matter"),
    ("03thermalphysics_09transfer",      "Transfer of Thermal Energy"),
    ("03thermalphysics_10temperature",   "Temperature"),
    ("03thermalphysics_11thermal",       "Thermal Properties of Matter"),
    ("03thermalphysics",                 "Thermal Physics"),
    ("04waves_11superposition",          "Superposition of Waves"),
    ("04waves_12general",                "General Wave Properties"),
    ("04waves_13electromagnetic",        "Electromagnetic Spectrum"),
    ("04waves_13light",                  "Light"),
    ("04waves_14sound",                  "Sound"),
    ("04waves",                          "Waves"),
    ("05electricitynmagnetism_11efield", "Electric Fields"),
    ("05electricitynmagnetism_16static", "Static Electricity"),
    ("05electricitynmagnetism_17AC",     "AC Circuits"),
    ("05electricitynmagnetism_17current","Current of Electricity"),
    ("05electricitynmagnetism_18DC",     "DC Circuits"),
    ("05electricitynmagnetism_19pract",  "Practical Electricity"),
    ("05electricitynmagnetism_20magnet", "Magnetism"),
    ("05electricitynmagnetism_21electro","Electromagnetism"),
    ("05electricitynmagnetism_22induct", "Electromagnetic Induction"),
    ("05electricitynmagnetism",          "Electricity and Magnetism"),
    ("06QuantumPhysics_19lasers",        "Lasers and Semiconductors"),
    ("06QuantumPhysics_20nuclear",       "Nuclear Physics"),
    ("06QuantumPhysics_Special",         "Special Relativity"),
    ("06QuantumPhysics",                 "Quantum Physics"),
    ("biology",                          "Biology"),
    ("chemistry",                        "Chemistry"),
    ("math",                             "Mathematics"),
    ("physicaleducation",                "Physical Education"),
    ("computing",                        "Computing"),
    ("economics",                        "Economics"),
    ("geography",                        "Geography"),
    ("english",                          "English Language"),
    ("chinese",                          "Chinese Language"),
    ("malay",                            "Malay Language"),
    ("tamil",                            "Tamil Language"),
    ("socialStudies",                    "Social Studies"),
    ("arts",                             "Arts"),
]


def get_subject(path):
    """Derive human-readable subject from file path."""
    rel = os.path.relpath(path, ROOT_DIR).replace("\\", "/").lower()
    for prefix, label in SUBJECT_MAP:
        if prefix.lower() in rel:
            return label
    return "Science and Mathematics"


def get_topic(path):
    """Extract simulation topic from folder name."""
    folder = os.path.basename(os.path.dirname(path))
    topic = folder
    for prefix in ("ejss_model_", "webejs_model_", "ejss_", "webejs_"):
        if topic.lower().startswith(prefix):
            topic = topic[len(prefix):]
            break
    # Convert camelCase / underscores to spaces
    topic = re.sub(r'([a-z])([A-Z])', r'\1 \2', topic)
    topic = topic.replace("_", " ").strip()
    return topic


def extract_context(path):
    """Extract title, subject, topic, authors, key vars from an EJSS file."""
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()

    # Title
    m = re.search(r'<title[^>]*>(.*?)</title>', content, re.S)
    title = m.group(1).strip() if m else get_topic(path)

    # Authors — from title_author div
    m = re.search(
        r'<div[^>]+id=["\']title_author["\'][^>]*>(.*?)</div>',
        content, re.S | re.I
    )
    authors_raw = m.group(1) if m else ""
    authors = re.sub(r'<[^>]+>', ' ', authors_raw)
    authors = re.sub(r'\s+', ' ', authors).strip()
    # keep only the text after any <hr> (which usually precedes the author names)
    if "weelookang" in authors.lower() or "francisco" in authors.lower():
        authors = "weelookang, Francisco Esquembre"
    else:
        authors = authors[:120] if authors else "weelookang"

    # Key variable names (non-generic, likely physics/subject variables)
    var_names = re.findall(r'\bvar\s+(\w+)\s*;', content)
    key_vars = [v for v in var_names if v not in GENERIC_VARS][:8]

    subject = get_subject(path)
    topic   = get_topic(path)

    return {
        "title":   title,
        "subject": subject,
        "topic":   topic,
        "authors": authors,
        "vars":    key_vars,
    }


def build_prompt(ctx):
    vars_hint = (", ".join(ctx["vars"])) if ctx["vars"] else "N/A"
    return f"""You write SEO content for interactive physics/science simulation web pages used by students and teachers.

Simulation title: {ctx["title"]}
Subject area: {ctx["subject"]}
Topic/keyword hint: {ctx["topic"]}
Authors: {ctx["authors"]}
Key simulation variables: {vars_hint}

Write exactly three items:

META_DESCRIPTION: One sentence, 140-155 characters, Google-optimised. Start with an action verb (Simulate, Explore, Model, Visualise). Include the topic and educational level (primary/secondary/JC) only if clearly implied.

META_KEYWORDS: 12 comma-separated keyword phrases. Mix broad (e.g. "physics simulation") and specific (e.g. "projectile motion interactive"). No hashtags.

EDUCATIONAL_TEXT: An HTML snippet containing:
  <h2 style="font-size:18px;">About this Simulation</h2>
  <p>[60-80 words explaining what the simulation models and what learners can explore]</p>
  <p><strong>Learning objectives:</strong> [2-3 concise bullet-style objectives as a single sentence each, separated by " | "]</p>

Respond ONLY in this exact format — no extra commentary:
META_DESCRIPTION: ...
META_KEYWORDS: ...
EDUCATIONAL_TEXT: ...
"""


def parse_response(text):
    """Parse the three fields from Haiku's response."""
    desc = kw = edu = ""
    m = re.search(r'META_DESCRIPTION:\s*(.+?)(?=META_KEYWORDS:|$)', text, re.S)
    if m: desc = m.group(1).strip()
    m = re.search(r'META_KEYWORDS:\s*(.+?)(?=EDUCATIONAL_TEXT:|$)', text, re.S)
    if m: kw = m.group(1).strip()
    m = re.search(r'EDUCATIONAL_TEXT:\s*(.+)', text, re.S)
    if m: edu = m.group(1).strip()
    return desc, kw, edu


def inject_content(content, desc, kw, edu):
    """Inject meta tags and educational paragraph into HTML."""
    modified = False

    # 1. Meta description + keywords after </title>
    if "</title>" in content and '<meta name="description"' not in content:
        meta_block = (
            f'\n<meta name="description" content="{desc}" />'
            f'\n<meta name="keywords" content="{kw}" />'
        )
        content = content.replace("</title>", "</title>" + meta_block, 1)
        modified = True

    # 2. Educational paragraph — before the Below Simulation ad comment
    edu_div = (
        '\n    <div style="max-width:700px; margin:0 auto; padding:8px 16px;'
        ' font-family:sans-serif; font-size:14px; text-align:left; color:#333;">\n'
        f'      {edu}\n'
        '    </div>'
    )
    if "<!-- AdSense: Below Simulation -->" in content:
        content = content.replace(
            "<!-- AdSense: Below Simulation -->",
            edu_div + "\n    <!-- AdSense: Below Simulation -->",
            1
        )
        modified = True
    else:
        # Fallback: before metadata div
        for anchor in ("<div id='metadata'", '<div id="metadata"'):
            if anchor in content:
                content = content.replace(anchor, edu_div + "\n    " + anchor, 1)
                modified = True
                break

    return content, modified


def is_ejss_folder(path):
    folder = os.path.basename(os.path.dirname(path))
    return folder.startswith("ejss_") or folder.startswith("webejs_")


def collect_files():
    """Collect all EJSS index.html files."""
    files = []
    for dirpath, _dirs, filenames in os.walk(ROOT_DIR):
        for filename in filenames:
            if filename not in ("index.html",) and not filename.endswith("simulation.html"):
                continue
            fp = os.path.join(dirpath, filename)
            if not is_ejss_folder(fp):
                continue
            files.append(fp)
    return files


def main():
    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

    # Load progress
    progress = {}
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
            progress = json.load(f)

    files = collect_files()
    if SAMPLE_N:
        # For sampling, skip already-done files and take first SAMPLE_N
        files = [f for f in files if f not in progress][:SAMPLE_N]
    else:
        files = [f for f in files if f not in progress]

    print(f"\n{'='*60}")
    print(f"DRY_RUN={DRY_RUN}  SAMPLE_N={SAMPLE_N}  Files to process: {len(files)}")
    print(f"{'='*60}\n")

    updated = []
    skipped = []

    for i, filepath in enumerate(files, 1):
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        # Skip if already enriched
        if '<meta name="description"' in content:
            print(f"[{i}/{len(files)}] SKIP (has description): {os.path.relpath(filepath, ROOT_DIR)}")
            skipped.append(filepath)
            progress[filepath] = "skipped"
            continue

        ctx = extract_context(filepath)
        prompt = build_prompt(ctx)

        safe_title = ctx['title'][:60].encode('ascii', 'replace').decode('ascii')
        print(f"[{i}/{len(files)}] Processing: {safe_title}")

        try:
            response = client.messages.create(
                model=MODEL,
                max_tokens=600,
                messages=[{"role": "user", "content": prompt}]
            )
            raw = response.content[0].text
        except Exception as e:
            print(f"  ERROR calling API: {e}")
            continue

        desc, kw, edu = parse_response(raw)

        if not desc or not edu:
            print(f"  WARN: Could not parse response, skipping.")
            print(f"  Raw: {raw[:200]}")
            continue

        print(f"  DESC: {desc[:80].encode('ascii','replace').decode('ascii')}...")
        print(f"  KW:   {kw[:80].encode('ascii','replace').decode('ascii')}...")

        if not DRY_RUN:
            new_content, modified = inject_content(content, desc, kw, edu)
            if modified:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                updated.append(filepath)
                progress[filepath] = {"status": "done", "desc": desc}
                print(f"  WRITTEN.")
        else:
            print(f"  DRY-RUN: not written.")
            updated.append(filepath)
            progress[filepath] = {"status": "dry-run", "desc": desc}

        # Save progress after every file
        with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
            json.dump(progress, f, indent=2)

        time.sleep(DELAY)

    # Write upload list
    if not DRY_RUN and updated:
        with open(OUTPUT_LIST, "w", encoding="utf-8") as f:
            f.write(f"# Enriched files to upload ({len(updated)} files)\n\n")
            for p in updated:
                f.write(os.path.relpath(p, ROOT_DIR) + "\n")
        print(f"\nUpload list written to: {OUTPUT_LIST}")

    print(f"\n{'='*60}")
    print(f"Done. Updated: {len(updated)}  Skipped: {len(skipped)}")
    if DRY_RUN:
        print("WARNING: DRY_RUN=True -- no files were written.")
        print("Set DRY_RUN = False and re-run to apply.")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
