"""
make_video.py - Render a screen-recording of the Guards Riddle simulation
                with a visible cursor, synchronised to narration_full.mp3.

Requires: playwright (with chromium installed), ffmpeg on PATH, narration_full.mp3
Run:      python make_video.py
Output:   guards_riddle_video.mp4   (~5 min, 1280x720, 30fps)
"""
import os, subprocess, sys, time, shutil
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_URL  = "file:///" + (SCRIPT_DIR + "/index.html").replace("\\", "/")
NARRATION  = os.path.join(SCRIPT_DIR, "narration_full.mp3")
VIDEO_DIR  = os.path.join(SCRIPT_DIR, "video_recording")
FINAL_MP4  = os.path.join(SCRIPT_DIR, "guards_riddle_video.mp4")

VIEWPORT = {"width": 1280, "height": 720}

# Per-section narration durations (from kokoro output) + 0.5s gap each
GAP = 0.5
DUR = {
    "intro":      23.6,
    "rules":      42.6,
    "n3":         40.3,
    "n4":         41.3,
    "n5":         31.0,
    "n6_n7":      38.1,
    "n8":         38.4,
    "conclusion": 27.4,
}

# ---------------------------------------------------------------------------
# Helper: JS injection for visible cursor + force-show solver panel
# ---------------------------------------------------------------------------
INIT_JS = r"""
(function(){
    // 1. Override alert() AND EJSS _tools.showOkDialog with a non-blocking toast
    function showToast(msg) {
        const t = document.createElement('div');
        t.style.cssText = `
            position: fixed; top: 110px; left: 50%; transform: translateX(-50%);
            background: linear-gradient(135deg,#27ae60,#2ecc71); color: #fff;
            padding: 14px 32px; border-radius: 10px; font: bold 18px Arial;
            box-shadow: 0 6px 20px rgba(0,0,0,0.4); z-index: 99995;
            max-width: 70%; text-align: center; pointer-events: none;`;
        if (/no solution/i.test(msg)) {
            t.style.background = 'linear-gradient(135deg,#c0392b,#e74c3c)';
        }
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => { t.style.transition='opacity .5s'; t.style.opacity='0'; }, 4500);
        setTimeout(() => t.remove(), 5100);
    }
    window.alert = showToast;
    // Auto-dismiss EJSS BoxPanel dialogs and show toast instead
    const dialogObserver = new MutationObserver(muts => {
        for (const m of muts) {
            for (const n of m.addedNodes) {
                if (n.nodeType !== 1) continue;
                const panel = n.classList?.contains('BoxPanel') ? n : n.querySelector?.('.BoxPanel');
                if (panel) {
                    const msg = panel.querySelector('span')?.textContent || '';
                    panel.style.display = 'none';
                    if (msg.trim()) showToast(msg);
                    setTimeout(() => {
                        const btn = panel.querySelector('button');
                        if (btn) btn.click();
                    }, 50);
                }
            }
        }
    });
    dialogObserver.observe(document.body, {childList: true, subtree: true});

    // 2. Inject custom Auto-Solve / Reset buttons (visible & cursor-targetable)
    const bar = document.createElement('div');
    bar.id = 'demoBar';
    bar.style.cssText = `
        position: fixed; top: 8px; right: 12px; z-index: 99980;
        display: flex; gap: 10px; align-items: center;
        background: rgba(255,255,255,0.95); padding: 8px 12px;
        border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        font-family: Arial; border: 2px solid #34495e;`;
    bar.innerHTML = `
        <button id="demoAutoSolve" style="
            background:linear-gradient(135deg,#27ae60,#229954);color:#fff;border:none;
            padding:10px 22px;border-radius:8px;font:bold 16px Arial;cursor:pointer;
            box-shadow:0 2px 6px rgba(0,0,0,0.2);">🤖 Auto-Solve</button>
        <button id="demoReset" style="
            background:linear-gradient(135deg,#7f8c8d,#95a5a6);color:#fff;border:none;
            padding:10px 18px;border-radius:8px;font:bold 16px Arial;cursor:pointer;">↻ Reset</button>
        <span id="demoStatus" style="font:bold 14px Arial;color:#34495e;min-width:140px;"></span>
    `;
    document.body.appendChild(bar);
    document.getElementById('demoAutoSolve').onclick = () => {
        if (window._solver) window._solver.start();
    };
    document.getElementById('demoReset').onclick = () => {
        if (window._solver) window._solver.reset();
    };

    // status updater - hooks into solver step counter
    setInterval(() => {
        const s = document.getElementById('solverStatus');
        const out = document.getElementById('demoStatus');
        if (s && out) out.textContent = (s.textContent || '').trim().slice(0,80);
    }, 200);

    // hide the hidden EJSS solver panel just to be safe
    const sp = document.getElementById('solverPanel');
    if (sp) sp.style.cssText = 'display:none !important;';

    // 2. Inject a visible mouse cursor (svg arrow)
    const c = document.createElement('div');
    c.id = 'fakeCursor';
    c.style.cssText = `
        position: fixed; left: 100px; top: 100px;
        width: 30px; height: 36px; pointer-events: none; z-index: 99999;
        transition: left .8s cubic-bezier(.4,.0,.2,1), top .8s cubic-bezier(.4,.0,.2,1);
        filter: drop-shadow(0 2px 3px rgba(0,0,0,0.4));`;
    c.innerHTML = `<svg width="30" height="36" viewBox="0 0 30 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2 L2 26 L8 22 L12 30 L16 28 L12 20 L20 20 Z"
              fill="#fff" stroke="#000" stroke-width="2" stroke-linejoin="round"/></svg>`;
    document.body.appendChild(c);

    // 3. Click ripple effect
    function ripple(x, y) {
        const r = document.createElement('div');
        r.style.cssText = `
            position: fixed; left: ${x-25}px; top: ${y-25}px;
            width: 50px; height: 50px; border-radius: 50%;
            background: rgba(255,80,80,0.5); pointer-events: none; z-index: 99998;
            animation: rippleAnim 0.6s ease-out forwards;`;
        document.body.appendChild(r);
        setTimeout(() => r.remove(), 700);
    }
    if (!document.getElementById('rippleStyle')) {
        const s = document.createElement('style'); s.id='rippleStyle';
        s.textContent = `@keyframes rippleAnim {
            0% { transform: scale(0.4); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }}`;
        document.head.appendChild(s);
    }

    // 4. Cursor highlight ring (for hovering over things)
    function highlight(x, y) {
        const r = document.createElement('div');
        r.style.cssText = `
            position: fixed; left: ${x-30}px; top: ${y-30}px;
            width: 60px; height: 60px; border-radius: 50%;
            border: 3px solid #FFD700; pointer-events: none; z-index: 99997;
            animation: highlightAnim 1.2s ease-out forwards;`;
        document.body.appendChild(r);
        setTimeout(() => r.remove(), 1300);
    }
    if (!document.getElementById('highlightStyle')) {
        const s = document.createElement('style'); s.id='highlightStyle';
        s.textContent = `@keyframes highlightAnim {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }}`;
        document.head.appendChild(s);
    }

    // 5. Caption banner (shown above sim during section transitions)
    const cap = document.createElement('div');
    cap.id = 'caption';
    cap.style.cssText = `
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.85); color: #FFD700; padding: 10px 28px;
        border-radius: 10px; font: bold 22px Arial; pointer-events: none;
        z-index: 99990; opacity: 0; transition: opacity .4s;
        max-width: 70%; text-align: center;`;
    document.body.appendChild(cap);

    // 6. Expose helper API
    window._cursor = {
        moveTo(x, y, ms) {
            return new Promise(res => {
                c.style.transition = `left ${ms}ms cubic-bezier(.4,.0,.2,1), top ${ms}ms cubic-bezier(.4,.0,.2,1)`;
                c.style.left = (x - 4) + 'px';
                c.style.top  = (y - 4) + 'px';
                setTimeout(res, ms + 30);
            });
        },
        moveToEl(selector, ms = 800, offsetX = 0, offsetY = 0) {
            const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
            if (!el) { console.warn('moveToEl: not found', selector); return Promise.resolve(); }
            const r = el.getBoundingClientRect();
            return this.moveTo(r.x + r.width/2 + offsetX, r.y + r.height/2 + offsetY, ms);
        },
        click() { ripple(parseFloat(c.style.left)+15, parseFloat(c.style.top)+15); },
        highlightHere() { highlight(parseFloat(c.style.left)+15, parseFloat(c.style.top)+15); },
        caption(text) {
            cap.textContent = text;
            cap.style.opacity = text ? '1' : '0';
        },
        getPos() { return { x: parseFloat(c.style.left)+15, y: parseFloat(c.style.top)+15 }; },
    };
})();
"""

# ---------------------------------------------------------------------------
# Browser-side helper: run a chain of awaits in order, with a single eval
# ---------------------------------------------------------------------------

def js(page, script):
    """Execute async JS that uses window._cursor and window._solver."""
    page.evaluate(f"(async () => {{ {script} }})()")


def wait(page, seconds):
    page.wait_for_timeout(int(seconds * 1000))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    if not os.path.exists(NARRATION):
        print("ERROR: narration_full.mp3 not found. Run generate_narration_kokoro.py first.")
        sys.exit(1)

    if os.path.exists(VIDEO_DIR):
        shutil.rmtree(VIDEO_DIR)
    os.makedirs(VIDEO_DIR)

    print("Launching Chromium ...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport=VIEWPORT,
            record_video_dir=VIDEO_DIR,
            record_video_size=VIEWPORT,
        )
        page = ctx.new_page()
        page.goto(INDEX_URL)
        page.wait_for_timeout(3000)

        # Inject cursor + force-show solver panel
        page.evaluate(INIT_JS)
        page.wait_for_timeout(500)

        # ===== SECTION 1: Intro (23.6s) =====
        print("[01] Intro ...")
        js(page, """
            await window._cursor.caption('Guards Riddle — Backtracking Search');
            await window._cursor.moveTo(640, 360, 1500);
        """)
        wait(page, 4)
        js(page, "await window._cursor.caption('');")
        wait(page, DUR["intro"] - 4 + GAP)

        # ===== SECTION 2: Rules (42.6s) =====
        # Point at: top-row guards, yellow boxes, instruction table
        print("[02] Rules ...")
        js(page, """
            // point at first guard
            await window._cursor.moveToEl('canvas', 1200, -250, -350);
            window._cursor.highlightHere();
        """)
        wait(page, 3)
        js(page, """
            // sweep across guard row
            await window._cursor.moveToEl('canvas', 1500, 250, -350);
        """)
        wait(page, 3)
        js(page, """
            // point at yellow boxes
            await window._cursor.moveToEl('canvas', 1200, 0, -150);
            window._cursor.highlightHere();
        """)
        wait(page, 3)
        js(page, """
            await window._cursor.moveToEl('canvas', 1200, 200, -150);
        """)
        wait(page, 3)
        # point at instructions text below
        js(page, """
            await window._cursor.moveTo(640, 600, 1200);
            window._cursor.highlightHere();
        """)
        wait(page, DUR["rules"] - 12 + GAP)

        # ===== SECTION 3: n=3 NO SOLUTION (40.3s) =====
        print("[03] n=3 ...")
        js(page, """
            // ensure n=3, click Auto-Solve
            const cb = document.getElementById('comboBox');
            await window._cursor.moveToEl('#comboBox', 1200);
            window._cursor.highlightHere();
        """)
        wait(page, 2)
        # narration: "I'll click Auto-Solve" — give time then click
        js(page, """
            await window._cursor.moveToEl('#demoAutoSolve', 1500);
        """)
        wait(page, 2)
        js(page, """
            window._cursor.click();
            window._solver.setSpeed(3);  // Slow
            window._solver.start();
        """)
        # let solver run; cursor rests
        wait(page, DUR["n3"] - 6 + GAP)

        # ===== SECTION 4: n=4 SOLVED (41.3s) =====
        print("[04] n=4 ...")
        js(page, """
            await window._cursor.moveToEl('#comboBox', 1200);
        """)
        # change to n=4 — set value via JS and dispatch change
        js(page, """
            await new Promise(r => setTimeout(r, 300));
            window._cursor.click();
            const cb = document.getElementById('comboBox');
            cb.value = '4';
            cb.dispatchEvent(new Event('change', {bubbles:true}));
        """)
        wait(page, 2)
        js(page, """
            await window._cursor.moveToEl('#demoAutoSolve', 1200);
            window._cursor.click();
            window._solver.setSpeed(3);  // Slow
            window._solver.start();
        """)
        wait(page, DUR["n4"] - 4 + GAP)

        # ===== SECTION 5: n=5 SOLVED (31.0s) =====
        print("[05] n=5 ...")
        js(page, """
            await window._cursor.moveToEl('#comboBox', 1000);
            window._cursor.click();
            const cb = document.getElementById('comboBox');
            cb.value = '5';
            cb.dispatchEvent(new Event('change', {bubbles:true}));
        """)
        wait(page, 2)
        js(page, """
            await window._cursor.moveToEl('#demoAutoSolve', 900);
            window._cursor.click();
            window._solver.setSpeed(4);  // Medium
            window._solver.start();
        """)
        wait(page, DUR["n5"] - 3 + GAP)

        # ===== SECTION 6: n=6 + n=7 NO SOLUTION (38.1s) =====
        print("[06] n=6, n=7 ...")
        js(page, """
            await window._cursor.moveToEl('#comboBox', 800);
            window._cursor.click();
            const cb = document.getElementById('comboBox');
            cb.value = '6';
            cb.dispatchEvent(new Event('change', {bubbles:true}));
        """)
        wait(page, 1.5)
        js(page, """
            await window._cursor.moveToEl('#demoAutoSolve', 800);
            window._cursor.click();
            window._solver.setSpeed(6);  // Fast
            window._solver.start();
        """)
        wait(page, 18)  # let n=6 finish
        # switch to n=7
        js(page, """
            await window._cursor.moveToEl('#comboBox', 800);
            window._cursor.click();
            const cb = document.getElementById('comboBox');
            cb.value = '7';
            cb.dispatchEvent(new Event('change', {bubbles:true}));
        """)
        wait(page, 1.5)
        js(page, """
            await window._cursor.moveToEl('#demoAutoSolve', 800);
            window._cursor.click();
            window._solver.setSpeed(7);  // Very Fast
            window._solver.start();
        """)
        wait(page, DUR["n6_n7"] - 22 + GAP)

        # ===== SECTION 7: n=8 SOLVED (38.4s) =====
        print("[07] n=8 ...")
        js(page, """
            await window._cursor.moveToEl('#comboBox', 800);
            window._cursor.click();
            const cb = document.getElementById('comboBox');
            cb.value = '8';
            cb.dispatchEvent(new Event('change', {bubbles:true}));
        """)
        wait(page, 1.5)
        js(page, """
            await window._cursor.moveToEl('#demoAutoSolve', 800);
            window._cursor.click();
            window._solver.setSpeed(7);  // Very Fast
            window._solver.start();
        """)
        wait(page, DUR["n8"] - 3 + GAP)

        # ===== SECTION 8: Conclusion (27.4s) =====
        print("[08] Conclusion ...")
        js(page, """
            await window._cursor.caption('Solutions exist at n = 4, 5, 8');
            await window._cursor.moveTo(640, 200, 1200);
        """)
        wait(page, 5)
        js(page, """
            await window._cursor.caption('Try it yourself!');
            await window._cursor.moveToEl('#btnStep', 1200);
            window._cursor.highlightHere();
        """)
        wait(page, DUR["conclusion"] - 6)

        js(page, "window._cursor.caption('');")
        page.wait_for_timeout(500)

        # close & finalize video
        ctx.close()
        browser.close()

    # find the produced webm
    webm = None
    for f in os.listdir(VIDEO_DIR):
        if f.endswith(".webm"):
            webm = os.path.join(VIDEO_DIR, f); break
    if not webm:
        print("ERROR: no webm produced")
        sys.exit(1)
    print(f"\nVideo recorded: {webm}")

    # mux with audio + transcode to mp4
    print(f"Encoding final MP4 with narration ...")
    cmd = [
        "ffmpeg", "-y",
        "-i", webm,
        "-i", NARRATION,
        "-c:v", "libx264", "-preset", "medium", "-crf", "22",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        FINAL_MP4,
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("ffmpeg failed:")
        print(r.stderr[-2000:])
        sys.exit(1)

    size = os.path.getsize(FINAL_MP4) / 1024 / 1024
    print(f"\nDone! {FINAL_MP4}  ({size:.1f} MB)")


if __name__ == "__main__":
    main()
