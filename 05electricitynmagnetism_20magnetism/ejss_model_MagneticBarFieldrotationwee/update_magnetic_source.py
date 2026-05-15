"""
update_magnetic_source.py
Adds pedagogical features to the Bar Magnet & Compass simulation _source.json:
  1. Slider for ca (magnet angle, -180 to 180)
  2. Slider for m (dipole moment, 0.01 to 0.2)
  3. Slider for damp (compass damping, 0 to 10)
  4. New variables: r_distance, r_display, theta_deg_display
  5. Fixed_relations: compute r_distance, theta_deg_display
  6. Oscillation graph panel (theta vs t)
  7. Rich HTML panel with guided inquiry
Run: python update_magnetic_source.py
"""
import sys, json, os, copy
sys.stdout.reconfigure(encoding='utf-8')

SRC = os.path.join(os.path.dirname(__file__), '_source.json')
BAK = SRC + '.bak'

# ── helpers ─────────────────────────────────────────────────────────────────

def prop(name, value):
    return {"name": name, "value": value}

def slider_node(node_name, variable, min_val, max_val, fmt, tooltip, on_change=""):
    props = [
        prop("Variable", variable),
        prop("Minimum", str(min_val)),
        prop("Maximum", str(max_val)),
        prop("Format", fmt),
        prop("Tooltip", f'"{tooltip}"'),
        prop("Font", "font"),
    ]
    if on_change:
        props.append(prop("OnChange", on_change))
    return {"Name": node_name, "Type": "Slider", "Properties": props, "Children": []}

def find_node(nodes, name):
    for node in nodes:
        if node.get('Name','') == name:
            return node, nodes
        result = find_node(node.get('Children',[]), name)
        if result[0]:
            return result
    return None, None

def find_var_page(model, page_name):
    for pg in model['variables']['pages']:
        if pg.get('Name','') == page_name:
            return pg
    return None

# ── load ─────────────────────────────────────────────────────────────────────
with open(SRC, encoding='utf-16') as f:
    src = json.load(f)
import shutil; shutil.copy(SRC, BAK)
print(f"Backed up to {BAK}")

model = src['model']
view  = src['view']
tree  = view['Tree']

# ═══════════════════════════════════════════════════════════════════════════
# 1. NEW VARIABLES
# ═══════════════════════════════════════════════════════════════════════════
display_page = find_var_page(model, 'Display Vars')
field_page   = find_var_page(model, 'Field Vars')

def var(name, typ, value, dim='', comment=''):
    return {"Name": name, "Value": value, "Type": typ,
            "Dimension": dim, "Comment": comment, "Domain": "public"}

new_display_vars = [
    var("r_distance",      "double", "0",   "", "distance from compass to magnet1 centre"),
    var("r_display",       "String", '""',  "", "formatted distance string"),
    var("theta_deg_display","String", '"θ compass = 0°"', "", "compass angle in degrees"),
    var("Bmag_display",    "String", '""',  "", "formatted |B| display"),
]

# append after last existing variable in Display Vars
existing_names = {v['Name'] for v in display_page.get('Variables',[])}
for v in new_display_vars:
    if v['Name'] not in existing_names:
        display_page['Variables'].append(v)
        print(f"  Added variable: {v['Name']}")

# ═══════════════════════════════════════════════════════════════════════════
# 2. FIXED_RELATIONS additions
# ═══════════════════════════════════════════════════════════════════════════
ADDITIONAL_FIXREL = """
// ── Pedagogical additions ──────────────────────────────────────────────────
// Distance from compass to magnet centre (for inverse-cube-law exploration)
r_distance = Math.sqrt((xCompass-xMagnet)*(xCompass-xMagnet)+(yCompass-yMagnet)*(yCompass-yMagnet));
r_display   = "r = "+_view._format(r_distance,"0.000")+" m";

// Compass angle in degrees for readout
theta_deg_display = "\\u03b8 compass = "+_view._format(theta*180/pi,"0.0")+"\\u00b0";

// Nice |B| display
Bmag_display = "|B| = "+_view._format(Math.sqrt(bxField*bxField+byField*byField),"0.000")+" T";
"""

fixrel_pages = model.get('fixed_relations', {}).get('pages', [])
main_fixrel = None
for pg in fixrel_pages:
    if 'FixRel Page 2' in pg.get('Name', '') or ('cta' in pg.get('Code','') and len(pg.get('Code','')) > 100):
        main_fixrel = pg
        break
if not main_fixrel and fixrel_pages:
    main_fixrel = fixrel_pages[0]

if main_fixrel:
    existing_code = main_fixrel.get('Code', '')
    if 'r_distance' not in existing_code:
        main_fixrel['Code'] = existing_code + ADDITIONAL_FIXREL
        print("  Updated fixed_relations with r_distance, theta_deg_display")

# ═══════════════════════════════════════════════════════════════════════════
# 3. VIEW — add sliders + oscillation graph + improved html
# ═══════════════════════════════════════════════════════════════════════════

# 3a. Find controlPanel and add sliders after resetButton
ctrl_node, ctrl_siblings = find_node(tree, 'controlPanel')
if ctrl_node:
    ctrl_children = ctrl_node.get('Children', [])
    existing_child_names = {c.get('Name','') for c in ctrl_children}

    # Slider: magnet angle ca (-180 to 180)
    if 'sliderAngle' not in existing_child_names:
        slider_ca = slider_node(
            'sliderAngle', 'ca', '-180', '180',
            '"\\u03b8\\u2081 = 0\\u00b0"',
            'Magnet 1 angle \\u03b8\\u2081 (degrees) — drag to rotate the bar magnet continuously',
            on_change='cta=ca*a2c;cs=Math.cos(cta);sc=Math.sin(cta);cs1=Math.cos(-cta);sc1=Math.sin(-cta);computeField();'
        )
        ctrl_children.append(slider_ca)
        print("  Added slider: sliderAngle (ca)")

    # Slider: dipole moment m (0.01 to 0.20)
    if 'sliderM' not in existing_child_names:
        slider_m = slider_node(
            'sliderM', 'm', '0.01', '0.20',
            '"m = 0.000"',
            'Magnetic dipole moment m — larger m → stronger field (B \\u221d m)',
            on_change='computeField();'
        )
        ctrl_children.append(slider_m)
        print("  Added slider: sliderM (m)")

    # Slider: damping damp (0 to 10)
    if 'sliderDamp' not in existing_child_names:
        slider_damp = slider_node(
            'sliderDamp', 'damp', '0', '10',
            '"b = 0.0"',
            'Compass damping b — 0 = undamped, ~2 = critical, >4 = overdamped'
        )
        ctrl_children.append(slider_damp)
        print("  Added slider: sliderDamp (damp)")

    # Checkbox: show field vectors
    if 'checkBoxField' not in existing_child_names:
        cb_field = {
            "Name": "checkBoxField",
            "Type": "CheckBox",
            "Properties": [
                prop("Checked", "FieldFlag"),
                prop("Text", '"Show field vectors"'),
                prop("Font", "font"),
                prop("Tooltip", '"Toggle the magnetic field arrow vectors on/off"'),
            ],
            "Children": []
        }
        ctrl_children.append(cb_field)
        print("  Added checkBox: checkBoxField (FieldFlag)")

    ctrl_node['Children'] = ctrl_children

# 3b. Find displayPanel and add oscillation graph after it
display_node, display_siblings = find_node(tree, 'displayPanel')
fullscreen_node = tree[0] if tree else None

if fullscreen_node and display_node:
    fullscreen_children = fullscreen_node.get('Children', [])
    child_names = {c.get('Name','') for c in fullscreen_children}

    if 'oscillationPanel' not in child_names:
        osc_panel = {
            "Name": "oscillationPanel",
            "Type": "PlottingPanel",
            "Properties": [
                prop("Title",   '"Compass \\u03b8(t) — Damped Oscillation"'),
                prop("TitleX",  '"time t (s)"'),
                prop("TitleY",  '"\\u03b8 (degrees)"'),
                prop("Ymin",    "-200"),
                prop("Ymax",    "200"),
                prop("Visible", "showCompass"),
                prop("Size",    '"100%,180"'),
                prop("AutoScaleX", "true"),
                prop("Grid",    "true"),
            ],
            "Children": [
                {
                    "Name": "compassTrace",
                    "Type": "Trace2D",
                    "Properties": [
                        prop("InputX", "t"),
                        prop("InputY", "theta*180/pi"),
                        prop("Memory", "300"),
                        prop("Color",  "Color.RED"),
                        prop("LineWidth", "2"),
                        prop("NoRepeat", "false"),
                        prop("Connected", "true"),
                    ],
                    "Children": []
                },
                {
                    "Name": "equilibriumLine",
                    "Type": "Trace2D",
                    "Properties": [
                        prop("InputX", "t"),
                        prop("InputY", "equilibriumTheta*180/pi"),
                        prop("Memory", "300"),
                        prop("Color",  "Color.BLUE"),
                        prop("LineWidth", "1"),
                        prop("Connected", "true"),
                    ],
                    "Children": []
                }
            ]
        }
        # insert after displayPanel
        idx = next((i for i,c in enumerate(fullscreen_children) if c.get('Name','')=='displayPanel'), -1)
        if idx >= 0:
            fullscreen_children.insert(idx+1, osc_panel)
        else:
            fullscreen_children.append(osc_panel)
        print("  Added oscillationPanel (theta vs t graph)")

# 3c. Update html panel with rich pedagogical content
html_node, _ = find_node(tree, 'html')
NEW_HTML = """<div style="font-family:Arial,sans-serif;max-width:900px;padding:12px 16px;line-height:1.6">

<h2 style="color:#1a237e;margin-bottom:4px">&#x1F9ED; Bar Magnet &amp; Compass — Magnetic Field Explorer</h2>
<p style="color:#555;margin-top:0">An interactive model of the magnetic field around a bar magnet, based on dipole physics.</p>

<details open>
<summary style="font-weight:bold;color:#1565C0;cursor:pointer;font-size:1.05em">&#x1F3AF; Learning Objectives</summary>
<ul>
<li>Describe the shape and direction of the magnetic field around a bar magnet.</li>
<li>Predict the equilibrium direction of a compass needle placed at any point in the field.</li>
<li>Explain how field strength <strong>B</strong> varies with distance <strong>r</strong> from the magnet (B&nbsp;&prop;&nbsp;1/r&sup3;).</li>
<li>Relate the field components B<sub>x</sub>, B<sub>y</sub> to the resultant field angle &theta;.</li>
<li>Describe damped oscillatory motion of the compass needle using the equation<br>
&nbsp;&nbsp;&nbsp;<strong>d&omega;/dt = &minus;k|B|&middot;sin(&Delta;&theta;) &minus; b&omega;</strong></li>
</ul>
</details>

<details open>
<summary style="font-weight:bold;color:#1565C0;cursor:pointer;font-size:1.05em">&#x1F3AE; Interactive Controls</summary>
<table style="border-collapse:collapse;width:100%;font-size:0.95em">
<tr style="background:#e3f2fd"><th style="padding:6px;text-align:left;border:1px solid #90caf9">Control</th><th style="padding:6px;text-align:left;border:1px solid #90caf9">What it does</th></tr>
<tr><td style="padding:6px;border:1px solid #ddd"><strong>Magnet direction</strong> (ComboBox)</td><td style="padding:6px;border:1px solid #ddd">Quick-set to 0°, 90°, 180°, &minus;90°</td></tr>
<tr style="background:#f5f5f5"><td style="padding:6px;border:1px solid #ddd"><strong>&theta;&#8321; slider</strong></td><td style="padding:6px;border:1px solid #ddd">Continuously rotate magnet 1 from &minus;180° to 180°</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd"><strong>m slider</strong></td><td style="padding:6px;border:1px solid #ddd">Change dipole moment — observe how <em>field strength scales</em></td></tr>
<tr style="background:#f5f5f5"><td style="padding:6px;border:1px solid #ddd"><strong>b (damping) slider</strong></td><td style="padding:6px;border:1px solid #ddd">See underdamped ↔ overdamped compass oscillation</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd"><strong>show Compass</strong></td><td style="padding:6px;border:1px solid #ddd">Toggle the draggable compass needle + oscillation graph</td></tr>
<tr style="background:#f5f5f5"><td style="padding:6px;border:1px solid #ddd"><strong>show Earth</strong></td><td style="padding:6px;border:1px solid #ddd">Add Earth's background field</td></tr>
<tr><td style="padding:6px;border:1px solid #ddd"><strong>Drag compass</strong></td><td style="padding:6px;border:1px solid #ddd">Move compass to any point — readings update live</td></tr>
<tr style="background:#f5f5f5"><td style="padding:6px;border:1px solid #ddd"><strong>Rotate symbol (&#x21BB;)</strong></td><td style="padding:6px;border:1px solid #ddd">Drag the rotation handle on the magnet to rotate it</td></tr>
</table>
</details>

<details open>
<summary style="font-weight:bold;color:#1565C0;cursor:pointer;font-size:1.05em">&#x1F52C; Guided Exploration — Step by Step</summary>
<ol>
<li><strong>Reset</strong> the simulation (magnet horizontal, compass at right).</li>
<li>Tick <em>show Compass</em> and note the equilibrium angle shown at the compass.</li>
<li><strong>Predict:</strong> If you move the compass to a point <em>directly above</em> the magnet, which way will it point?&emsp;→ drag the compass there to verify.</li>
<li>Drag the compass along the <strong>axial line</strong> (horizontal through the centre): record |B| and r at 3 different distances. Does |B| halve when r doubles? (It should drop by factor 8!)</li>
<li>Use the <strong>&theta;&#8321; slider</strong> to rotate the magnet by 90°. Observe how the entire field pattern rotates with it. Does the compass equilibrium angle also rotate by exactly 90°?</li>
<li>Increase <strong>m</strong> from 0.05 to 0.10. Does the compass deflect more or less? By roughly what factor?</li>
<li>Show the <strong>damping graph</strong> (tick <em>show Compass</em>): set b = 0 (undamped) and then rapidly drag the compass to a new location. Describe the motion. Now set b = 5. What changes?</li>
<li>Enable <strong>show Earth</strong>. The compass now aligns with the <em>resultant</em> of the bar magnet field and Earth's field. Find a position where both cancel.</li>
</ol>
</details>

<details>
<summary style="font-weight:bold;color:#1565C0;cursor:pointer;font-size:1.05em">&#x1F4D0; Key Physics</summary>
<p><strong>Dipole field:</strong></p>
<ul>
<li>Along the axial line (end-on): B = &mu;&#8320;/(4&pi;) &middot; 2m/r&sup3;</li>
<li>Along the equatorial line (broadside): B = &mu;&#8320;/(4&pi;) &middot; m/r&sup3;</li>
<li>General: B = (&mu;&#8320;m/4&pi;r&sup3;)&radic;(1+3cos&sup2;&phi;) where &phi; is the polar angle from the dipole axis</li>
</ul>
<p><strong>Compass needle ODE (damped SHM analogy):</strong></p>
<blockquote style="background:#fff9c4;padding:8px 12px;border-left:4px solid #f9a825;margin:4px 0">
d&omega;/dt = &minus;k|B|&middot;sin(&theta;&minus;&theta;<sub>eq</sub>) &minus; b&omega;<br>
where &theta;<sub>eq</sub> = atan2(B<sub>y</sub>, B<sub>x</sub>)
</blockquote>
<p>This is exactly the equation of a <em>simple pendulum in a magnetic field</em>.</p>
</details>

<hr style="border:none;border-top:1px solid #ccc;margin:12px 0">
<p style="font-size:0.85em;color:#888">
Model by lookang (weelookang@gmail.com), Fu-Kwun Hwang, Wolfgang Christian, Francisco Esquembre, Anne Cox.<br>
Based on: <a href="http://www.phy.ntnu.edu.tw/ntnujava/index.php?topic=1602" target="_blank">NTNU Java Applet</a> &mdash; remixed at <a href="https://iwant2study.org" target="_blank">iwant2study.org</a><br>
Licence: CC BY-SA
</p>
</div>"""

if html_node:
    for prop_item in html_node.get('Properties', []):
        if prop_item.get('name','').lower() in ('html','code','value','text'):
            prop_item['value'] = NEW_HTML
            print("  Updated HTML panel with rich pedagogical content")
            break
    else:
        html_node.setdefault('Properties', []).append({"name": "Html", "value": NEW_HTML})
        print("  Added Html property to html panel")

# ═══════════════════════════════════════════════════════════════════════════
# 4. WRITE BACK
# ═══════════════════════════════════════════════════════════════════════════
with open(SRC, 'w', encoding='utf-16') as f:
    json.dump(src, f, ensure_ascii=False, indent=2)

size = os.path.getsize(SRC) // 1024
print(f"\nDone. Written: {SRC} ({size} KB)")
print("Open WebEJS and reload the project to see changes.")
