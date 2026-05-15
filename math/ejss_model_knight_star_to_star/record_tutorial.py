"""
record_tutorial.py — Records Knight Star-to-Star tutorial at 1366x768
(upscaled to 1920x1080 in post) with cursor spotlight overlay,
timed to Kokoro narration audio.
Run from the project folder:  python record_tutorial.py
"""
import sys, os, time, subprocess, glob
sys.path.insert(0, r"C:\Users\weelo\.claude\tools")
from playwright.sync_api import sync_playwright

# ── PATHS ──────────────────────────────────────────────────────────────────────
abs_path = os.path.abspath('index.html').replace(chr(92), '/')
SIM_URL  = 'file:///' + abs_path
REC_DIR  = os.path.abspath('tutorial_build/recording')
AUD_DIR  = os.path.abspath('tutorial_build')
os.makedirs(REC_DIR, exist_ok=True)

# ── SECTION AUDIO DURATIONS (from Kokoro TTS output) ──────────────────────────
DURS = [27.1, 31.7, 32.6, 32.6, 36.2, 54.5, 51.3, 36.6, 65.7, 33.3]
TOTAL = sum(DURS)  # 401.6 s

# ── ELEMENT COORDINATES @ 70% CSS zoom in 1366x768 viewport ───────────────────
# All values = original 1920x1080 coords * 0.70, rounded to int.
BTN = dict(hint=(233,73), auto=(672,73), undo=(1111,73),
           reset=(1111,33), ok=(673,24))

# (row,col) -> center (x,y) at 70% zoom -- only star squares listed
SQ = {
    (0,1):(531,150),(0,2):(644,150),(0,3):(757,150),(0,4):(870,150),
    (1,0):(417,263),(1,2):(644,263),(1,3):(757,263),(1,4):(870,263),
    (2,0):(417,376),(2,1):(531,376),(2,2):(644,376),(2,3):(757,376),(2,5):(984,376),
    (3,0):(417,489),(3,1):(531,489),(3,2):(644,489),(3,3):(757,489),
    (3,4):(870,489),(3,5):(984,489),
    (4,1):(531,603),(4,2):(644,603),(4,3):(757,603),
    (5,0):(417,716),(5,3):(757,716),(5,4):(870,716),
}

# ── CURSOR SPOTLIGHT (injected DOM element) ────────────────────────────────────
SPOTLIGHT_JS = r"""(function(){
  if(document.getElementById('_cspot')) return;
  var d=document.createElement('div');
  d.id='_cspot';
  d.style.cssText='position:fixed;width:62px;height:62px;border:4px solid rgba(255,210,0,0.95);'
    +'border-radius:50%;pointer-events:none;z-index:2147483647;'
    +'box-shadow:0 0 18px rgba(255,210,0,0.55),0 0 6px rgba(255,210,0,0.9) inset;'
    +'background:rgba(255,210,0,0.07);transform:translate(-50%,-50%);'
    +'transition:left .055s linear,top .055s linear;left:-200px;top:-200px;';
  document.body.appendChild(d);
  document.addEventListener('mousemove',function(e){
    d.style.left=e.clientX+'px'; d.style.top=e.clientY+'px';
  },true);
})();"""

# ── MOUSE HELPER ──────────────────────────────────────────────────────────────
class Mouse:
    def __init__(self, page):
        self.page = page
        self.x = 672; self.y = 378  # center of 1366x768 at 70% zoom origin

    def to(self, x, y, steps=22, ms=55):
        """Smooth eased move."""
        x0, y0 = self.x, self.y
        for i in range(1, steps+1):
            t = i/steps; t2 = t*t*(3-2*t)
            self.page.mouse.move(x0+(x-x0)*t2, y0+(y-y0)*t2)
            self.page.wait_for_timeout(ms)
        self.x, self.y = x, y

    def click(self, x, y, dwell=700):
        self.to(x, y)
        self.page.wait_for_timeout(dwell)
        self.page.mouse.click(x, y)
        self.x, self.y = x, y

    def wait(self, ms): self.page.wait_for_timeout(ms)

    def fill(self, dur_s):
        """Idle wait to fill remaining time."""
        self.wait(int(dur_s * 1000))


# ── SECTION ROUTINES ──────────────────────────────────────────────────────────
def s1_hook(m, dur):
    t0=time.time()
    m.click(*BTN['ok'], dwell=300)
    m.wait(1000)
    # Pan diagonally across the full board
    m.to(417,150,steps=50,ms=80)
    m.wait(1500)
    for sq in [(0,4),(2,2),(3,5),(5,4),(2,3),(0,1)]:
        m.to(*SQ[sq],steps=22,ms=65); m.wait(1800)
    m.to(672,378,steps=25,ms=70)
    m.fill(max(0, dur-(time.time()-t0)))

def s2_knight_move(m, dur):
    t0=time.time()
    # Trace L-shapes from (3,1) showing three different directions
    m.to(*SQ[(3,1)],steps=25,ms=70); m.wait(2000)
    # L1: up-2 right-1 -> (1,2)
    m.to(*SQ[(1,2)],steps=30,ms=70); m.wait(1800)
    m.to(*SQ[(3,1)],steps=20,ms=65); m.wait(1000)
    # L2: right-2 up-1 -> (2,3)
    m.to(*SQ[(2,3)],steps=30,ms=70); m.wait(1800)
    m.to(*SQ[(3,1)],steps=20,ms=65); m.wait(1000)
    # L3: down-2 right-1 -> row 5 col 2 area (no star, just hover)
    m.to(644,716,steps=30,ms=70); m.wait(1500)
    m.to(*SQ[(3,1)],steps=20,ms=70); m.wait(1000)
    # Corner demo: hover (0,1) - only 2 moves available
    m.to(*SQ[(0,1)],steps=25,ms=70); m.wait(2000)
    m.to(*SQ[(2,2)],steps=22,ms=70); m.wait(1500)  # centre
    m.fill(max(0, dur-(time.time()-t0)))

def s3_board_goal(m, dur):
    t0=time.time()
    # Hover over several star squares
    for sq in [(0,1),(0,4),(3,5),(2,5)]:
        m.to(*SQ[sq],steps=20,ms=65); m.wait(2000)
    # Hover over empty/blocked squares (non-star areas in row 4)
    m.to(417,603,steps=20,ms=65); m.wait(2000)
    m.to(531,603,steps=15,ms=65); m.wait(1500)
    # Point to score counters near top
    m.to(176,33,steps=25,ms=65); m.wait(2000)
    m.to(504,33,steps=15,ms=65); m.wait(2000)
    m.to(672,378,steps=25,ms=70)
    m.fill(max(0, dur-(time.time()-t0)))

def s4_first_game(m, dur):
    t0=time.time()
    # Verified dead-end sequence: (2,2)->(4,3)->(3,1)->(5,0)
    m.to(*SQ[(2,2)],steps=25,ms=70); m.wait(1000)
    m.click(*SQ[(2,2)], dwell=400)   # MOVE 1
    m.wait(3000)
    m.to(504,33,steps=20,ms=70); m.wait(1000)  # show score=1
    m.click(*SQ[(4,3)], dwell=600)   # MOVE 2
    m.wait(2500)
    m.to(504,33,steps=20,ms=70); m.wait(800)   # score=2
    m.click(*SQ[(3,1)], dwell=600)   # MOVE 3
    m.wait(2500)
    m.to(504,33,steps=20,ms=70); m.wait(800)   # score=3
    # Hover over possible next moves before committing
    m.to(*SQ[(5,0)],steps=20,ms=70); m.wait(1500)
    m.to(*SQ[(1,2)],steps=20,ms=70); m.wait(1500)
    m.to(*SQ[(2,3)],steps=20,ms=70); m.wait(1000)
    m.click(*SQ[(5,0)], dwell=600)   # MOVE 4
    m.wait(2500)
    m.to(504,33,steps=20,ms=70); m.wait(1500)  # score=4
    m.fill(max(0, dur-(time.time()-t0)))

def s5_dead_ends(m, dur):
    t0=time.time()
    # Continue same game: (5,0)->(4,2)->(3,0) -> DEAD END
    m.to(*SQ[(4,2)],steps=20,ms=70); m.wait(1500)
    m.click(*SQ[(4,2)], dwell=600)   # MOVE 5
    m.wait(2500)
    m.to(*SQ[(3,0)],steps=20,ms=70); m.wait(1500)
    m.click(*SQ[(3,0)], dwell=600)   # MOVE 6 -> STUCK!
    m.wait(3500)  # wait for end-of-game message
    # Dismiss any overlay / click EJS play control
    m.to(*BTN['ok'],steps=15,ms=60); m.wait(1000)
    m.click(*BTN['ok'], dwell=300)
    m.wait(2000)
    # Show stuck board: hover over each visited square
    for sq in [(2,2),(4,3),(3,1),(5,0),(4,2),(3,0)]:
        m.to(*SQ[sq],steps=15,ms=60); m.wait(1200)
    m.to(672,378,steps=20,ms=70)
    m.fill(max(0, dur-(time.time()-t0)))

def s6_hint_warnsdorff(m, page, dur):
    t0=time.time()
    # Reset board
    m.click(*BTN['reset'], dwell=400); m.wait(1200)
    # Click Hint
    m.click(*BTN['hint'], dwell=500); m.wait(2500)
    # Find hinted square via JS model variable
    h1 = page.evaluate("(typeof hintIdx!=='undefined'&&hintIdx>=0)?hintIdx:-1")
    if h1 >= 0:
        pos = page.evaluate(f"""()=>{{
            var e=document.getElementById('shapeSet[{h1}]');
            if(!e) return null;
            var r=e.getBoundingClientRect();
            return {{x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)}};
        }}""")
        if pos:
            m.to(pos['x'],pos['y'],steps=22,ms=70); m.wait(3000)
            # Point to pedagogical message panel
            msg = page.evaluate("""()=>{
                var e=document.getElementById('pedagogical-message');
                if(!e) return null;
                var r=e.getBoundingClientRect();
                return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};
            }""")
            if msg:
                m.to(msg['x'],msg['y'],steps=25,ms=70); m.wait(4000)
            # Click the hinted square
            m.click(pos['x'],pos['y'],dwell=400); m.wait(2000)
    # Second hint
    m.click(*BTN['hint'], dwell=500); m.wait(2000)
    h2 = page.evaluate("(typeof hintIdx!=='undefined'&&hintIdx>=0)?hintIdx:-1")
    if h2 >= 0:
        pos2 = page.evaluate(f"""()=>{{
            var e=document.getElementById('shapeSet[{h2}]');
            if(!e) return null;
            var r=e.getBoundingClientRect();
            return {{x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)}};
        }}""")
        if pos2:
            m.to(pos2['x'],pos2['y'],steps=22,ms=70); m.wait(2500)
            m.click(pos2['x'],pos2['y'],dwell=400); m.wait(2000)
    # Third hint
    m.click(*BTN['hint'], dwell=500); m.wait(1500)
    m.to(672,378,steps=20,ms=70)
    m.fill(max(0, dur-(time.time()-t0)))

def s7_auto_solve(m, page, dur):
    t0=time.time()
    m.click(*BTN['reset'], dwell=400); m.wait(1200)
    m.to(*BTN['auto'],steps=20,ms=65); m.wait(1000)
    m.click(*BTN['auto'], dwell=400); m.wait(2000)
    # Brief orbit while solver animates — faster to stay inside dur=51s
    orbit = [(417,263),(644,150),(984,376),(870,603),(531,603),(417,489),(672,378)]
    for ox,oy in orbit:
        m.to(ox,oy,steps=25,ms=80); m.wait(500)
    m.wait(8000)   # let solver finish
    # Point to score counters
    m.to(504,33,steps=20,ms=70); m.wait(2500)
    m.to(176,33,steps=15,ms=70); m.wait(2000)
    m.to(672,378,steps=20,ms=70)
    m.fill(max(0, dur-(time.time()-t0)))

def s8_undo(m, dur):
    t0=time.time()
    m.click(*BTN['reset'], dwell=400); m.wait(1200)
    # Make 3 moves: (2,3)->(3,5)->(1,4)
    m.click(*SQ[(2,3)], dwell=600); m.wait(2500)
    m.click(*SQ[(3,5)], dwell=600); m.wait(2500)
    m.click(*SQ[(1,4)], dwell=600); m.wait(2500)
    # Undo twice
    m.to(*BTN['undo'],steps=20,ms=65); m.wait(800)
    m.click(*BTN['undo'], dwell=300); m.wait(2500)
    m.click(*BTN['undo'], dwell=300); m.wait(2500)
    # Try different path from (2,3): go to (4,2) instead
    m.to(*SQ[(4,2)],steps=20,ms=70); m.wait(1000)
    m.click(*SQ[(4,2)], dwell=500); m.wait(2000)
    m.click(*SQ[(3,0)], dwell=500); m.wait(2000)
    # Show corner experiment: reset then start from corner
    m.click(*BTN['reset'], dwell=300); m.wait(1000)
    m.click(*SQ[(5,0)], dwell=400); m.wait(1500)
    m.to(672,73,steps=20,ms=70)
    m.fill(max(0, dur-(time.time()-t0)))

def s9_framework(m, dur):
    t0=time.time()
    m.click(*BTN['reset'], dwell=300); m.wait(1000)
    # P1: Look ahead -- sweep top of board
    m.to(672,150,steps=35,ms=120); m.wait(5000)
    m.to(417,263,steps=25,ms=120); m.wait(3000)
    # P2: Constraints early -- visit corners
    m.to(*SQ[(0,1)],steps=30,ms=120); m.wait(4000)
    m.to(*SQ[(5,4)],steps=40,ms=130); m.wait(4000)
    # P3: Use tools -- hover button bar
    m.to(*BTN['hint'],steps=25,ms=100); m.wait(4000)
    m.to(*BTN['auto'],steps=20,ms=100); m.wait(3000)
    m.to(*BTN['undo'],steps=20,ms=100); m.wait(3000)
    # P4: Failure is data -- centre of board
    m.to(672,489,steps=30,ms=120); m.wait(5000)
    m.to(*SQ[(3,3)],steps=20,ms=120); m.wait(3000)
    m.to(672,378,steps=25,ms=120)
    m.fill(max(0, dur-(time.time()-t0)))

def s10_cta(m, dur):
    t0=time.time()
    m.to(*BTN['hint'],steps=25,ms=100); m.wait(2500)
    m.to(*BTN['auto'],steps=20,ms=100); m.wait(2500)
    m.to(*BTN['undo'],steps=20,ms=100); m.wait(2500)
    m.to(*SQ[(2,2)],steps=30,ms=100); m.wait(2000)
    m.to(672,33,steps=20,ms=100); m.wait(1500)   # score area
    m.to(672,378,steps=25,ms=100)
    m.fill(max(0, dur-(time.time()-t0)))


# ── MAIN RECORDING LOOP ───────────────────────────────────────────────────────
def record():
    print(f"Recording {TOTAL:.0f}s tutorial at 1366x768 (upscales to 1920x1080)...")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=False,
            args=['--disable-infobars','--no-default-browser-check']
        )
        ctx = browser.new_context(
            viewport={'width':1366,'height':768},
            record_video_dir=REC_DIR,
            record_video_size={'width':1366,'height':768},
        )
        page = ctx.new_page()
        page.goto(SIM_URL)
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        # 70% zoom: full board + all buttons fit inside 1366x768
        page.evaluate("document.documentElement.style.zoom='70%'")
        page.wait_for_timeout(500)

        # Inject cursor spotlight
        page.evaluate(SPOTLIGHT_JS)

        m = Mouse(page)

        sections = [
            ("S1  Hook",           lambda: s1_hook(m, DURS[0])),
            ("S2  Knight's Move",  lambda: s2_knight_move(m, DURS[1])),
            ("S3  Board & Goal",   lambda: s3_board_goal(m, DURS[2])),
            ("S4  First Game",     lambda: s4_first_game(m, DURS[3])),
            ("S5  Dead Ends",      lambda: s5_dead_ends(m, DURS[4])),
            ("S6  Hint",           lambda: s6_hint_warnsdorff(m, page, DURS[5])),
            ("S7  Auto Solve",     lambda: s7_auto_solve(m, page, DURS[6])),
            ("S8  Undo",           lambda: s8_undo(m, DURS[7])),
            ("S9  Framework",      lambda: s9_framework(m, DURS[8])),
            ("S10 CTA",            lambda: s10_cta(m, DURS[9])),
        ]

        try:
            for name, fn in sections:
                print(f"  >> {name}")
                page.evaluate(SPOTLIGHT_JS)  # re-inject if page soft-reset
                fn()
                print(f"     done")
        except Exception as e:
            print(f"  WARN: section aborted ({e})")
        finally:
            print("Closing browser (Playwright saves video)...")
            try: ctx.close()
            except: pass
            try: browser.close()
            except: pass

    # Find the most recent webm
    webm_files = glob.glob(os.path.join(REC_DIR, '*.webm'))
    if not webm_files:
        print("ERROR: no .webm found in", REC_DIR); sys.exit(1)
    webm = max(webm_files, key=os.path.getmtime)
    print(f"Video saved: {webm}")
    return webm


# ── POST-PROCESSING ───────────────────────────────────────────────────────────
def mix_audio(webm):
    # 1. Concatenate narration WAV clips into one MP3
    concat_list = os.path.join(AUD_DIR, 'concat_list.txt')
    with open(concat_list, 'w') as f:
        for i in range(1, 11):
            wav = os.path.join(AUD_DIR, f's{i:02d}.wav').replace('\\','/')
            f.write(f"file '{wav}'\n")

    narration_mp3 = os.path.join(AUD_DIR, 'narration_full.mp3')
    print("Concatenating narration audio...")
    subprocess.run([
        'ffmpeg','-y','-f','concat','-safe','0',
        '-i', concat_list,
        '-c:a','libmp3lame','-q:a','2',
        narration_mp3
    ], check=True)

    # 2. Convert webm -> mp4, upscale 1366x768 -> 1920x1080 (same 16:9 ratio)
    raw_mp4 = os.path.join(AUD_DIR, 'raw_screen.mp4')
    print("Upscaling 1366x768 -> 1920x1080 (lanczos)...")
    subprocess.run([
        'ffmpeg','-y','-i', webm,
        '-vf','scale=1920:1080:flags=lanczos',
        '-c:v','libx264','-crf','16','-preset','fast',
        '-pix_fmt','yuv420p',
        raw_mp4
    ], check=True)

    # 3. Mix video + narration, trim to exact narration length
    final = 'knight_tutorial_HD.mp4'
    print("Mixing video + narration...")
    subprocess.run([
        'ffmpeg','-y',
        '-i', raw_mp4,
        '-i', narration_mp3,
        '-c:v','copy','-c:a','aac','-b:a','192k',
        '-t', str(TOTAL),
        final
    ], check=True)

    sz = os.path.getsize(final)/1024/1024
    print(f"\nDONE: {final}  ({sz:.1f} MB)  {TOTAL:.0f}s  1920x1080 (from 1366x768)")
    return final


if __name__ == '__main__':
    webm = record()
    mix_audio(webm)
