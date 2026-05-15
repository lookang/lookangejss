"""
Pedagogical improvements — FINAL CLEAN VERSION
Architecture:
  - Static content (LOs, valence ref) in the html Panel (inline div, not iframe)
  - Dynamic content (molecule info, progress) via <div> placeholders in html Panel
  - Polling script in information.HTMLHead reads window._model._userSerialize() every 500ms
  - Model-side: computeStars() updates starsDisplay[] and streakcount (plain model vars)
  - NO HtmlArea view elements added (they render as iframes, appear multiple times)
  - NO _view.setProperty() calls for dynamic content
Reads from _source.json.bak, writes to _source.json
"""

import json

SRC = r'_source.json.bak'
OUT = r'_source.json'

# ── helpers ────────────────────────────────────────────────────────────────────

def make_var(name, value, typ, dim="", comment="null"):
    return {"Name": name, "Value": value, "Type": typ,
            "Dimension": dim, "Comment": comment, "Domain": "public"}

def make_lib_page(name, code):
    return {"Name": name, "Active": "true", "Internal": "false",
            "Type": "LIBRARY_EDITOR", "Comment": "", "Code": code}

def make_desc_page(name, content):
    return {"Name": name, "Active": "true", "Internal": "false",
            "Type": "HTML_EDITOR", "Comment": "", "Content": content}

def find_element_in_view(tree, name):
    for el in tree:
        if el.get('Name') == name:
            return el
        found = find_element_in_view(el.get('Children', []), name)
        if found:
            return found
    return None

# ── per-molecule data ──────────────────────────────────────────────────────────

MOL_DATA = {
    1:  {"shape":"Linear","angle":"180 degrees","polarity":"Non-polar",
         "shapedesc":"No lone pairs - perfect symmetry along the bond axis.",
         "why":"H2 is the lightest gas and a future clean-energy carrier. Fuel cells in electric vehicles use it to generate electricity with zero CO2 emissions."},
    2:  {"shape":"Linear","angle":"180 degrees","polarity":"Non-polar",
         "shapedesc":"3 lone pairs on each Cl; symmetrical single bond gives a linear shape.",
         "why":"Cl2 purifies drinking water and swimming pools. It also manufactures PVC plastic, one of the most widely used materials in construction."},
    3:  {"shape":"Linear","angle":"180 degrees","polarity":"Non-polar",
         "shapedesc":"2 lone pairs on each O; the double bond and symmetry give a linear shape.",
         "why":"Every breath you take uses O2. Your mitochondria split its double bond to release energy that powers every cell in your body."},
    4:  {"shape":"Linear","angle":"180 degrees","polarity":"Non-polar",
         "shapedesc":"1 lone pair on each N; triple bond + symmetry give a linear shape.",
         "why":"N2's triple bond is one of the strongest in chemistry. That is why 78% of the air you breathe does not react, keeping atmospheric conditions stable for life."},
    5:  {"shape":"Linear","angle":"180 degrees","polarity":"Polar",
         "shapedesc":"3 lone pairs on Cl, none on H. Cl is more electronegative, so the bond dipole points toward Cl.",
         "why":"HCl dissolves in water to form hydrochloric acid, the same acid your stomach uses to digest food and kill harmful bacteria."},
    6:  {"shape":"Bent (~109 degrees)","angle":"~109 degrees","polarity":"Ion (charged)",
         "shapedesc":"3 lone pairs on O push away from H, giving a bent-like geometry around O.",
         "why":"OH- is what makes bases like bleach (NaOH solution) corrosive. It is the ion responsible for all alkaline properties in aqueous solution."},
    7:  {"shape":"Linear","angle":"180 degrees","polarity":"Ion (charged)",
         "shapedesc":"1 lone pair on each atom; triple bond + symmetry give a linear shape.",
         "why":"Cyanide (CN-) binds to haemoglobin over 200 times more strongly than O2. That is why even tiny amounts are lethal."},
    8:  {"shape":"Bent","angle":"104.5 degrees","polarity":"Polar",
         "shapedesc":"2 lone pairs on O repel more strongly than bonding pairs, compressing the bond angle to 104.5 degrees and causing the bent shape.",
         "why":"Water's bent, polar shape creates hydrogen bonds - giving it a high boiling point, surface tension, and making it the solvent of life."},
    9:  {"shape":"Linear","angle":"180 degrees","polarity":"Non-polar",
         "shapedesc":"2 C=O double bonds are symmetrical; their dipoles cancel so the molecule is linear and non-polar overall.",
         "why":"CO2's linear, non-polar shape allows it to accumulate in the atmosphere and absorb infrared radiation, making it a key greenhouse gas driving climate change."},
    10: {"shape":"Bent (~115 degrees)","angle":"~115 degrees","polarity":"Ion (charged)",
         "shapedesc":"1 lone pair on N + 2 bonds gives a bent shape (less compressed than H2O).",
         "why":"Nitrite ions (NO2-) are used as food preservatives (E250) in cured meats like bacon. They prevent deadly botulism bacteria from growing."},
    11: {"shape":"Trigonal pyramidal","angle":"107 degrees","polarity":"Polar",
         "shapedesc":"1 lone pair on N pushes the 3 H atoms downward, creating a pyramidal shape rather than a flat triangular one.",
         "why":"Ammonia feeds half the world's population. The Haber process makes NH3 from N2 and H2, enabling nitrogen fertiliser production at global scale."},
    12: {"shape":"Tetrahedral","angle":"109.5 degrees","polarity":"Non-polar",
         "shapedesc":"4 identical bonding pairs and no lone pairs give perfect tetrahedral geometry with equal 109.5 degree angles.",
         "why":"Methane is natural gas. Its non-polar tetrahedral structure makes it a stable, energy-dense fuel. It is also 25 times more potent as a greenhouse gas than CO2."},
    13: {"shape":"Trigonal planar","angle":"120 degrees","polarity":"Ion (charged)",
         "shapedesc":"3 equivalent bonds due to resonance, with no lone pairs on C, giving a flat structure with 120 degree angles.",
         "why":"Carbonate (CO3 2-) is in limestone, chalk, and marble. In antacid tablets it neutralises excess stomach acid: CO3 2- + 2H+ gives H2O + CO2."},
    14: {"shape":"Non-linear chain","angle":"~100 degrees","polarity":"Polar",
         "shapedesc":"2 lone pairs on each O plus the O-O single bond create a skewed, non-linear chain structure.",
         "why":"Hydrogen peroxide bleaches hair and disinfects wounds. Its weak O-O single bond makes it a powerful oxidising agent that decomposes to water plus O2."},
    15: {"shape":"Trigonal pyramidal","angle":"~106 degrees","polarity":"Ion (charged)",
         "shapedesc":"1 lone pair on S + 3 S-O bonds gives a pyramidal shape, similar to NH3 but with S as the central atom.",
         "why":"Sulfite (SO3 2-) is food preservative E221. It keeps wine and dried fruit from browning by scavenging oxygen before it can oxidise the food."},
}

def extra_lines(q):
    d = MOL_DATA[q]
    # Escape backslashes and single quotes for JS string literals
    def esc(s):
        return s.replace('\\', '\\\\').replace("'", "\\'")
    return (
        f"\n  whythismatters = '{esc(d['why'])}';\n"
        f"  moleculeshape = '{esc(d['shape'])}';\n"
        f"  bondangle = '{esc(d['angle'])}';\n"
        f"  shapedescription = '{esc(d['shapedesc'])}';\n"
        f"  moleculepolarity = '{esc(d['polarity'])}';\n"
    )

# ── computeStars (uses starsCSV scalar string — reliably serialized) ───────────

COMPUTE_STARS_CODE = r"""function computeStars() {
  var q = question - 1;
  if (q < 0 || q >= 15) return;
  // Determine star rating based on wrong attempts before correct answer
  var newStars = (attemptq === 0) ? 3 : (attemptq === 1) ? 2 : 1;
  // Parse the CSV, upgrade if new rating is higher (never downgrade)
  var parts = starsCSV.split(',');
  while (parts.length < 15) parts.push('0');
  var current = parseInt(parts[q]) || 0;
  if (newStars > current) {
    parts[q] = String(newStars);
    starsCSV = parts.join(',');
  }
  // Streak: increment on first-attempt correct, reset otherwise
  streakcount = (attemptq === 0) ? streakcount + 1 : 0;
}"""

# ── Polling script for HTMLHead ────────────────────────────────────────────────
# Runs entirely in browser context; reads window._model._userSerialize() every 500ms
# and updates the two named <div> elements inside the html Panel.

POLLING_SCRIPT = r"""
<script>
(function() {
  // Molecule names in order (questions 1-15)
  var _dcMols = ["H\u2082","Cl\u2082","O\u2082","N\u2082","HCl","OH\u207b","CN\u207b","H\u2082O","CO\u2082","NO\u2082\u207b","NH\u2083","CH\u2084","CO\u2083\u00b2\u207b","H\u2082O\u2082","SO\u2083\u00b2\u207b"];

  function _dcUpdate() {
    try {
      var s = window._model._userSerialize();

      // ── Molecule info panel ──────────────────────────────────────────────
      var mi = document.getElementById('dc-molinfo');
      if (mi) {
        var h = '';
        h += '<div style="background:#fff8e1;border-left:4px solid #FF9800;padding:8px 10px;border-radius:4px;margin:6px 0;font-family:Georgia,serif">';
        h += '<b>\uD83D\uDD2C Molecule Info</b><br>';
        h += '<b>Shape:</b> ' + (s.moleculeshape || '\u2014');
        h += ' &nbsp;|&nbsp; <b>Angle:</b> ' + (s.bondangle || '\u2014');
        h += ' &nbsp;|&nbsp; <b>Polarity:</b> ' + (s.moleculepolarity || '\u2014') + '<br>';
        h += '<span style="font-size:0.9em;color:#555"><i>' + (s.shapedescription || '') + '</i></span>';
        h += '</div>';
        h += '<div style="background:#fce4ec;border-left:4px solid #e91e63;padding:8px 10px;border-radius:4px;margin:6px 0;font-family:Georgia,serif">';
        h += '<b>\uD83C\uDF0D Why This Matters</b><br>';
        h += '<span style="font-size:0.95em">' + (s.whythismatters || 'Select a molecule from the dropdown above.') + '</span>';
        h += '</div>';
        mi.innerHTML = h;
      }

      // ── Progress panel ───────────────────────────────────────────────────
      var pr = document.getElementById('dc-progress');
      if (pr) {
        var _csv    = (s.starsCSV || '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0').split(',');
        var streak  = parseInt(s.streakcount) || 0;
        var curQ    = s.question     || 1;
        var h = '';
        h += '<div style="background:#f3e5f5;border-left:4px solid #9C27B0;padding:8px 10px;border-radius:4px;margin:6px 0;font-family:Georgia,serif">';
        if (streak >= 2) {
          h += '<div style="background:#fff3e0;border:1px solid #FF9800;padding:4px 8px;border-radius:4px;margin-bottom:6px;font-size:0.92em">';
          h += '&#x1F525; <b>Streak: ' + streak + ' in a row!</b></div>';
        }
        h += '<b>&#x1F4CA; My Progress</b>';
        h += '<table style="border-collapse:collapse;width:100%;margin-top:5px;font-size:0.88em">';
        h += '<tr style="background:#9C27B0;color:white"><th style="padding:3px 8px">Q</th><th style="padding:3px 8px">Molecule</th><th style="padding:3px 8px">Stars</th></tr>';
        for (var i = 0; i < 15; i++) {
          var bg  = (i % 2 === 0) ? '#f9f0ff' : '#fff';
          var fw  = ((i + 1) === curQ) ? 'font-weight:bold' : '';
          var cur = ((i + 1) === curQ) ? ' \u25C0' : '';   // triangle marks current Q
          h += '<tr style="background:' + bg + ';' + fw + '">';
          h += '<td style="text-align:center;padding:2px 6px">' + (i+1) + '</td>';
          h += '<td style="padding:2px 8px">' + _dcMols[i] + cur + '</td>';
          var _n = parseInt(_csv[i]) || 0;
          var _star = _n >= 3 ? '&#x2B50;&#x2B50;&#x2B50;' : _n === 2 ? '&#x2B50;&#x2B50;' : _n === 1 ? '&#x2B50;' : '&#x25CB;';
          h += '<td style="text-align:center;padding:2px 6px">' + _star + '</td>';
          h += '</tr>';
        }
        h += '</table>';
        h += '<p style="font-size:0.78em;margin:5px 0 0 0">&#x2B50;&#x2B50;&#x2B50;=1st attempt &nbsp; &#x2B50;&#x2B50;=1 wrong &nbsp; &#x2B50;=2+ wrong &nbsp; &#x25CB;=not yet</p>';
        h += '</div>';
        pr.innerHTML = h;
      }
    } catch(e) {}
  }

  function _dcStart() {
    if (!window._model) { setTimeout(_dcStart, 300); return; }
    setInterval(_dcUpdate, 500);   // poll every 500ms
    setTimeout(_dcUpdate, 800);    // first update shortly after load
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _dcStart);
  } else {
    _dcStart();
  }
})();
</script>
"""

# ── html Panel static content (inline div, NOT iframe) ────────────────────────
# Contains: learning objectives, valence reference, dynamic div placeholders, links.

STATIC_HTML_PANEL = """<style>
.dc-s{margin:8px 0;padding:8px 10px;border-radius:5px;font-family:Georgia,serif}
.dc-obj{background:#e8f4fd;border-left:4px solid #2196F3}
.dc-ref{background:#f0fdf4;border-left:4px solid #4CAF50}
.dc-ref table{border-collapse:collapse;font-size:0.85em;width:100%}
.dc-ref td,.dc-ref th{padding:2px 7px;border:1px solid #ccc;text-align:center}
.dc-ref th{background:#4CAF50;color:white}
summary{cursor:pointer;font-weight:bold;font-size:0.95em}
details{margin:2px 0}
</style>

<div class="dc-s dc-obj">
<details open><summary>&#x1F3AF; Learning Objectives</summary>
<ol style="font-size:0.9em;margin:4px 0;line-height:1.5">
<li>State that a covalent bond is a <b>shared pair of electrons</b></li>
<li>Draw dot-and-cross diagrams for simple covalent molecules and ions</li>
<li>Identify <b>bonding pairs</b> and <b>lone pairs</b> in a structure</li>
<li>Link the number of bonding pairs to bond type (single / double / triple)</li>
<li>Connect the electron structure to the molecule&#39;s <b>shape</b> and <b>polarity</b></li>
</ol>
</details>
</div>

<div class="dc-s dc-ref">
<details><summary>&#x1F4CB; Valence Electron Quick Reference</summary>
<table>
<tr><th>Atom</th><th>Group</th><th>Valence e&#x207b;</th><th>Needs</th><th>Rule</th></tr>
<tr><td>H</td><td>1</td><td>1</td><td>1 more</td><td>Duplet (2)</td></tr>
<tr><td>C</td><td>14</td><td>4</td><td>4 more</td><td>Octet (8)</td></tr>
<tr><td>N</td><td>15</td><td>5</td><td>3 more</td><td>Octet (8)</td></tr>
<tr><td>O</td><td>16</td><td>6</td><td>2 more</td><td>Octet (8)</td></tr>
<tr><td>F</td><td>17</td><td>7</td><td>1 more</td><td>Octet (8)</td></tr>
<tr><td>Cl</td><td>17</td><td>7</td><td>1 more</td><td>Octet (8)</td></tr>
<tr><td>S</td><td>16</td><td>6</td><td>2 more</td><td>Octet (8)</td></tr>
</table>
<p style="font-size:0.85em;margin:4px 0"><b>Ions:</b> each extra negative charge = 1 extra electron to place on atoms.</p>
</details>
</div>

<!-- Dynamic panels — content injected by polling script in page head -->
<div id="dc-molinfo" style="font-family:Georgia,serif;padding:4px 0">
  <p style="color:#888;font-size:0.9em">Select a molecule from the dropdown to see shape and real-world context.</p>
</div>
<div id="dc-progress" style="font-family:Georgia,serif;padding:4px 0">
  <p style="color:#888;font-size:0.9em">Your progress will appear here after you complete molecules.</p>
</div>

<hr style="border:1px solid #ddd;margin:8px 0">
Periodic Table from SEAB O level Chemistry Syllabus page 30
<center>&#x1F4F8; <a href="https://www.seab.gov.sg/files/O%20Lvl%20Syllabus%20Sch%20Cddts/2026/6092_y26_sy.pdf">https://www.seab.gov.sg/files/O%20Lvl%20Syllabus%20Sch%20Cddts/2026/6092_y26_sy.pdf</a></center>
<center><a href="https://www.seab.gov.sg/files/O%20Lvl%20Syllabus%20Sch%20Cddts/2025/6092_y25_sy.pdf">https://www.seab.gov.sg/files/O%20Lvl%20Syllabus%20Sch%20Cddts/2025/6092_y25_sy.pdf</a></center>
<center>&#x1F9EA; More Chemistry Interactives: <a href="https://sg.iwant2study.org/ospsg/index.php/interactive-resources/chemistry/03-chemistry-of-reactions">sg.iwant2study.org</a></center>"""

# ── description pages ──────────────────────────────────────────────────────────

DESC_HOW_TO_USE = """<h2>How to Use This Simulation</h2>
<h3>Step-by-step guide:</h3>
<ol>
<li><b>Select a molecule</b> from the dropdown menu at the top.</li>
<li>Read the <b>electron count</b> shown next to each atom symbol (e.g. "O has 6 valence electrons").</li>
<li>Drag the <b>coloured electron symbols</b> (dots and crosses) from the tray onto the atom diagram:
  <ul><li>Place <b>shared electrons</b> in the overlapping region between atoms (these form the bond)</li>
  <li>Place <b>lone pair electrons</b> on the outer positions of each atom</li></ul>
</li>
<li>Click <b>Check</b> to verify your diagram and get instant feedback.</li>
<li>If you need help, the two-level hint system will guide you step by step.</li>
<li>After getting the diagram correct, answer the conceptual question to deepen your understanding.</li>
</ol>
<h3>Tips:</h3>
<ul>
<li><b>Electron colours:</b> Black/dark = Atom 1 | Green = Atom 2 | Orange = Atom 3 | Cyan circle = extra ion electron</li>
<li>Use <b>Reveal</b> if stuck, but always try your best first!</li>
<li>Use <b>Reset</b> to clear and start fresh.</li>
<li>Check your <b>progress table</b> in the panel below the simulation.</li>
</ul>"""

DESC_BACKGROUND = """<h2>Covalent Bonding - Key Theory</h2>
<h3>What is a Covalent Bond?</h3>
<p>A <b>covalent bond</b> is formed when two atoms <b>share a pair of electrons</b>. Each atom contributes one electron, allowing both to achieve a full outer shell.</p>
<h3>The Octet and Duplet Rules</h3>
<ul>
<li>Most atoms are stable with <b>8 electrons</b> in their outer shell (the <b>octet rule</b>)</li>
<li>Hydrogen is stable with just <b>2 electrons</b> (the <b>duplet rule</b>), like helium</li>
</ul>
<h3>Types of Covalent Bonds</h3>
<table border="1" cellpadding="4" style="border-collapse:collapse">
<tr><th>Bond Type</th><th>Shared Pairs</th><th>Example</th></tr>
<tr><td>Single bond</td><td>1 pair (2 electrons)</td><td>H2, HCl, H2O</td></tr>
<tr><td>Double bond</td><td>2 pairs (4 electrons)</td><td>O2, CO2</td></tr>
<tr><td>Triple bond</td><td>3 pairs (6 electrons)</td><td>N2, CN-</td></tr>
</table>
<h3>Dot-and-Cross Diagrams</h3>
<ul>
<li>Dots (.) = electrons from atom 1 | Crosses (x) = electrons from atom 2</li>
<li>Both symbols in the overlap zone = a <b>shared pair (bond)</b></li>
<li>Symbols outside the overlap = <b>lone pairs</b></li>
</ul>
<h3>Polyatomic Ions</h3>
<p>A negative charge means extra electrons have been added (1- charge = 1 extra electron). These go on the most electronegative atom as additional lone pairs.</p>"""

DESC_MOLECULE_GUIDE = """<h2>Molecule Guide - All 15 Structures</h2>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%;font-size:0.9em">
<tr style="background:#1565C0;color:white">
  <th>Q</th><th>Formula</th><th>Name</th><th>Bonds</th><th>Lone pairs</th><th>Shape</th><th>Polarity</th>
</tr>
<tr><td>1</td><td>H2</td><td>Hydrogen</td><td>1 single (H-H)</td><td>None</td><td>Linear 180</td><td>Non-polar</td></tr>
<tr><td>2</td><td>Cl2</td><td>Chlorine</td><td>1 single (Cl-Cl)</td><td>3 per Cl</td><td>Linear 180</td><td>Non-polar</td></tr>
<tr><td>3</td><td>O2</td><td>Oxygen</td><td>1 double (O=O)</td><td>2 per O</td><td>Linear 180</td><td>Non-polar</td></tr>
<tr><td>4</td><td>N2</td><td>Nitrogen</td><td>1 triple</td><td>1 per N</td><td>Linear 180</td><td>Non-polar</td></tr>
<tr><td>5</td><td>HCl</td><td>Hydrogen chloride</td><td>1 single (H-Cl)</td><td>0 on H, 3 on Cl</td><td>Linear 180</td><td>Polar</td></tr>
<tr><td>6</td><td>OH-</td><td>Hydroxide ion</td><td>1 single (O-H)</td><td>3 on O</td><td>Bent ~109</td><td>Ion</td></tr>
<tr><td>7</td><td>CN-</td><td>Cyanide ion</td><td>1 triple (C=N)</td><td>1 per atom</td><td>Linear 180</td><td>Ion</td></tr>
<tr><td>8</td><td>H2O</td><td>Water</td><td>2 single (O-H)</td><td>2 on O</td><td>Bent 104.5</td><td>Polar</td></tr>
<tr><td>9</td><td>CO2</td><td>Carbon dioxide</td><td>2 double (C=O)</td><td>2 per O, 0 on C</td><td>Linear 180</td><td>Non-polar</td></tr>
<tr><td>10</td><td>NO2-</td><td>Nitrite ion</td><td>1 single + 1 double</td><td>1 on N</td><td>Bent ~115</td><td>Ion</td></tr>
<tr><td>11</td><td>NH3</td><td>Ammonia</td><td>3 single (N-H)</td><td>1 on N</td><td>Trig. pyramidal 107</td><td>Polar</td></tr>
<tr><td>12</td><td>CH4</td><td>Methane</td><td>4 single (C-H)</td><td>None</td><td>Tetrahedral 109.5</td><td>Non-polar</td></tr>
<tr><td>13</td><td>CO3 2-</td><td>Carbonate ion</td><td>1 double + 2 single</td><td>varies on O</td><td>Trig. planar 120</td><td>Ion</td></tr>
<tr><td>14</td><td>H2O2</td><td>Hydrogen peroxide</td><td>2 O-H + 1 O-O</td><td>2 per O</td><td>Non-linear chain</td><td>Polar</td></tr>
<tr><td>15</td><td>SO3 2-</td><td>Sulfite ion</td><td>3 S-O bonds</td><td>1 on S</td><td>Trig. pyramidal ~106</td><td>Ion</td></tr>
</table>
<h3>Difficulty Tiers</h3>
<ul>
<li><b>Tier 1 - Basics:</b> Q1 (H2) - duplet rule, simplest possible</li>
<li><b>Tier 2 - Single bonds + lone pairs:</b> Q2 (Cl2), Q5 (HCl)</li>
<li><b>Tier 3 - Multiple bonds:</b> Q3 (O2 double), Q4 (N2 triple)</li>
<li><b>Tier 4 - Polar triatomic:</b> Q8 (H2O), Q9 (CO2)</li>
<li><b>Tier 5 - Larger molecules:</b> Q11 (NH3), Q12 (CH4), Q14 (H2O2)</li>
<li><b>Tier 6 - Polyatomic ions:</b> Q6, Q7, Q10, Q13, Q15</li>
</ul>"""

# ── main ───────────────────────────────────────────────────────────────────────

def main():
    print("Reading from backup...")
    with open(SRC, encoding='utf-16') as f:
        data = json.load(f)

    # ── 1. Add variables to Var Table ──────────────────────────────────────────
    print("Adding variables...")
    vt_vars = data['model']['variables']['pages'][0]['Variables']
    existing_names = {v['Name'] for v in vt_vars}
    h2 = MOL_DATA[1]
    new_vars = [
        make_var("whythismatters",   f"'{h2['why']}'",      "String"),
        make_var("moleculeshape",    f"'{h2['shape']}'",    "String"),
        make_var("bondangle",        f"'{h2['angle']}'",    "String"),
        make_var("shapedescription", f"'{h2['shapedesc']}'","String"),
        make_var("moleculepolarity", f"'{h2['polarity']}'", "String"),
        make_var("streakcount",      "0", "int"),
        make_var("starsCSV", '"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"', "String"),
    ]
    for v in new_vars:
        if v['Name'] not in existing_names:
            vt_vars.append(v)
            print(f"  + {v['Name']}")

    # ── 2. Remove stale Stars & Progress variable page (array approach — broken) ─
    print("Removing stale 'Stars & Progress' variable page if present...")
    var_pages = data['model']['variables']['pages']
    before = len(var_pages)
    data['model']['variables']['pages'] = [
        p for p in var_pages if p['Name'] != 'Stars & Progress'
    ]
    if len(data['model']['variables']['pages']) < before:
        print("  Removed stale page")

    # ── 3. Add computeStars() (no view calls) ─────────────────────────────────
    print("Adding computeStars()...")
    cust_pages = data['model']['custom']['pages']
    existing_cust = {p['Name'] for p in cust_pages}
    if 'computeStars' in existing_cust:
        for p in cust_pages:
            if p['Name'] == 'computeStars':
                p['Code'] = COMPUTE_STARS_CODE
                print("  Updated")
    else:
        cust_pages.append(make_lib_page('computeStars', COMPUTE_STARS_CODE))
        print("  Added")

    # ── 4. Patch showCorrectWithMCQ ────────────────────────────────────────────
    print("Patching showCorrectWithMCQ...")
    for p in cust_pages:
        if p['Name'] == 'showCorrectWithMCQ':
            if 'computeStars()' not in p['Code']:
                p['Code'] = p['Code'].replace(
                    '_view.audio.play(); // good ding',
                    'computeStars(); // update stars + streak\n  _view.audio.play(); // good ding'
                )
                print("  Patched")
            break

    # ── 5. Patch option1-15 ────────────────────────────────────────────────────
    print("Patching option functions...")
    OPTION_MAP = {
        'option1':1,'option2':2,'option3':3,'option4':4,'option5':5,
        'option6':6,'option7':7,'option8':8,'option9':9,'option10':10,
        'option11':11,'option12':12,'option13 2':13,'option14':14,'option15':15,
    }
    for p in cust_pages:
        if p['Name'] in OPTION_MAP:
            q = OPTION_MAP[p['Name']]
            if 'whythismatters' not in p['Code']:
                code = p['Code'].rstrip()
                if code.endswith('}'):
                    p['Code'] = code[:-1] + extra_lines(q) + '}\n'
                else:
                    p['Code'] = code + extra_lines(q) + '\n'
                print(f"  Patched {p['Name']} (Q{q})")

    # ── 6. Add polling script to HTMLHead ─────────────────────────────────────
    print("Adding polling script to HTMLHead...")
    if 'dc-progress' not in data['information'].get('HTMLHead', ''):
        data['information']['HTMLHead'] = \
            data['information'].get('HTMLHead', '') + POLLING_SCRIPT
        print("  Added")
    else:
        print("  Already present")

    # ── 7. Update html Panel (static content + div placeholders) ──────────────
    print("Updating html Panel...")
    html_panel = data['view']['Tree'][0]['Children'][2]
    for prop in html_panel.get('Properties', []):
        if prop['name'] == 'Html':
            prop['value'] = STATIC_HTML_PANEL
            print("  Updated")
            break

    # ── 8. Remove any stray HtmlArea elements added by previous script runs ───
    print("Cleaning up stray HtmlArea view elements...")
    root_children = data['view']['Tree'][0]['Children']
    stray = {'moleculeInfoArea', 'progressArea'}
    before = len(root_children)
    data['view']['Tree'][0]['Children'] = [
        ch for ch in root_children if ch.get('Name') not in stray
    ]
    removed = before - len(data['view']['Tree'][0]['Children'])
    if removed:
        print(f"  Removed {removed} stray element(s)")
    else:
        print("  None found")

    # ── 9. Remove stray init + custom pages from previous runs ────────────────
    stray_cust = {'buildMoleculeInfoHtml', 'buildProgressHtml', 'updateDynamicPanels'}
    stray_init = {'dynamicPanelsInit'}
    before = len(cust_pages)
    data['model']['custom']['pages'] = [
        p for p in cust_pages if p['Name'] not in stray_cust
    ]
    removed = before - len(data['model']['custom']['pages'])
    if removed:
        print(f"  Removed {removed} stale custom function(s)")

    init_pages = data['model']['initialization']['pages']
    before = len(init_pages)
    data['model']['initialization']['pages'] = [
        p for p in init_pages if p['Name'] not in stray_init
    ]
    removed = before - len(data['model']['initialization']['pages'])
    if removed:
        print(f"  Removed {removed} stale init page(s)")

    # Also clean stale comboBox OnChange patch from previous runs
    cb = find_element_in_view(data['view']['Tree'], 'comboBox')
    if cb:
        for prop in cb['Properties']:
            if prop['name'] == 'OnChange':
                prop['value'] = prop['value'].replace(
                    '\n// Update dynamic info and progress panels\nupdateDynamicPanels();\n', ''
                )

    # ── 10. Add description pages ──────────────────────────────────────────────
    print("Adding description pages...")
    desc_pages = data['description']['pages']
    existing_desc = {p.get('Name','') for p in desc_pages}
    for name, content in [
        ('How to Use', DESC_HOW_TO_USE),
        ('Background Theory', DESC_BACKGROUND),
        ('Molecule Guide', DESC_MOLECULE_GUIDE),
    ]:
        if name not in existing_desc:
            desc_pages.append(make_desc_page(name, content))
            print(f"  + '{name}'")

    # ── 11. Write output ───────────────────────────────────────────────────────
    print(f"\nWriting to {OUT}...")
    with open(OUT, 'w', encoding='utf-16') as f:
        json.dump(data, f, ensure_ascii=True, indent=4)
    print("Done!")

if __name__ == '__main__':
    main()
