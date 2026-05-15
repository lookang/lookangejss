"""
make_tutorial_video.py
Generates the Knight Star-to-Star tutorial video using Kokoro TTS + moviepy.
Run from the project folder:
    python make_tutorial_video.py
Output: knight_tutorial.mp4 (~6-7 min)
"""
import sys, os, textwrap
sys.path.insert(0, r"C:\Users\weelo\.claude\tools")

from kokoro_tts import narrate_batch
from video_pipeline import slideshow_to_mp4

# ── OUTPUT FOLDER ──────────────────────────────────────────────────────────────
OUT = "tutorial_build"
os.makedirs(OUT, exist_ok=True)

SCREENSHOT = r"knight_star_to_star\Screenshot 2021-05-05 at 3.53.49 PM (2).png"

# ── SECTION DATA ───────────────────────────────────────────────────────────────
# Each entry: (section_label, narration_text, action_label_for_slide)
SECTIONS = [
    (
        "S1 — Hook",
        (
            "What if I told you a chess piece could teach you one of the most powerful "
            "problem-solving strategies in mathematics and computer science? "
            "Welcome to Knight: Star to Star — an interactive simulation where the "
            "humble knight's L-shaped hop unlocks deep ideas about planning ahead, "
            "avoiding dead ends, and thinking like a mathematician. "
            "By the end of this video, you'll understand Warnsdorff's rule — a "
            "two-hundred-year-old algorithm that still powers modern path-finding today."
        ),
        "Hook | 0:00 – 0:25",
    ),
    (
        "S2 — The Knight's Move",
        (
            "First — how does a knight move in chess? "
            "The knight travels in an L-shape: two squares in one direction, "
            "then one square at a right angle. From any position it can reach up to "
            "eight different squares, jumping cleanly over everything in between. "
            "This is what makes the knight unique — it doesn't travel in straight lines. "
            "It hops. It sees the board differently from every other piece. "
            "From a corner, the knight has only two possible moves. "
            "From an edge square, maybe three or four. "
            "From the very centre of the board, a full eight. "
            "That difference will matter a great deal in a moment."
        ),
        "The Knight's L-shaped Move | 0:25 – 1:05",
    ),
    (
        "S3 — The Board & Goal",
        (
            "Now look at the board. You see two kinds of squares. "
            "The starred squares — those are the only landing zones. "
            "The plain blue squares are blocked; the knight cannot land there. "
            "Your mission: click any star to place the knight. "
            "Then hop from star to star using only valid knight moves. "
            "Each star you land on gets numbered in sequence — one, two, three — "
            "counting your path. "
            "The goal? Visit as many stars as possible before you run out of legal moves. "
            "On this board there are twenty-five stars in total. "
            "Can you visit all of them in a single connected path? "
            "That is the puzzle."
        ),
        "The Board & Goal | 1:05 – 1:45",
    ),
    (
        "S4 — Playing Your First Game",
        (
            "Let's play. I'll click a star near the centre — and there's the knight, "
            "move number one. "
            "Now — where can I go next? Only squares reachable by a valid knight jump from here. "
            "I'll pick this one — move two. And this one — move three. "
            "Watch the score counting up at the top. "
            "Every time you land on a star, it's filled with green and stamped with its number. "
            "Visited squares are gone — you can't revisit them. "
            "So the question isn't just 'where can I go?' "
            "The question is: where should I go to stay alive the longest? "
            "That distinction — can versus should — is the heart of all strategic thinking."
        ),
        "Playing Your First Game | 1:45 – 2:25",
    ),
    (
        "S5 — Dead Ends",
        (
            "And here it happens — stuck. There are no more possible moves. "
            "What went wrong? The knight is sitting on a star, but every square it "
            "could reach next has already been visited. A dead end. "
            "This is the fundamental difficulty of this puzzle. "
            "Each move you make closes off future options. "
            "The choices you make in move three ripple forward to determine "
            "whether you survive to move fifteen. "
            "This is called a Hamiltonian path problem — finding a route that visits "
            "every node exactly once. "
            "It's one of the classic hard problems in mathematics, and the knight's tour "
            "is its most famous instance. "
            "So how do we do better? We need a smarter strategy."
        ),
        "Dead Ends & The Hamiltonian Path Problem | 2:25 – 3:05",
    ),
    (
        "S6 — Hint & Warnsdorff's Rule",
        (
            "Let me show you a smarter way to think. Press Hint. "
            "See the orange star? That is the recommended starting square, chosen using "
            "a rule discovered by the German mathematician H. C. von Warnsdorff in 1823. "
            "The rule is beautifully simple: "
            "Always move to the square that has the fewest onward moves available. "
            "Read the message at the bottom. It tells you exactly how many onward moves "
            "each candidate has. We pick the one with the smallest number. "
            "Why does this work? Think of it this way: if a square is hard to reach — "
            "if it only has one or two ways in — then it will be very hard to visit it "
            "later without getting trapped. So visit those constrained squares first, "
            "while you still can. Leave the easy, well-connected squares for later. "
            "This is called the greedy heuristic for the most-constrained variable. "
            "The same idea appears in Sudoku solving, in scheduling problems, and in "
            "artificial intelligence planners worldwide."
        ),
        "Hint & Warnsdorff's Rule (1823) | 3:05 – 3:55",
    ),
    (
        "S7 — Watching Auto Solve",
        (
            "Now let's let the computer show us its best. Press Auto Solve. "
            "Watch the knight move. No hesitation. No backtracking. "
            "It flows through the board, visiting star after star. "
            "The pedagogical message at the bottom updates in real time, "
            "explaining the strategy at every step. "
            "Notice the pattern: the computer tends to visit corner stars and edge stars "
            "early — the constrained positions — and works its way toward the centre "
            "as more options remain. "
            "And look at the final score. How many stars did it visit? "
            "That is Warnsdorff's rule performing in real time. "
            "Here is the key lesson: the computer is not smarter than you in any deep sense. "
            "It is simply applying a consistent rule that you can learn and apply yourself. "
            "The simulation is your window into how that rule works, step by step. "
            "Press Auto Solve again to stop the animation early and take over manually."
        ),
        "Watching Auto Solve | 3:55 – 4:45",
    ),
    (
        "S8 — Undo & Explore",
        (
            "One of the most powerful ways to learn is to experiment and undo. "
            "Make a few moves. Now press Undo. "
            "The knight steps back, the board rewinds, and you can try a different path "
            "from the same point. "
            "This is your time machine for decision-making. "
            "Use it to ask: what if I had gone there instead? Compare the outcomes. "
            "Try starting from a corner star — notice how quickly you get stuck. "
            "Then try starting from a central star. Different result? "
            "This is scientific thinking: vary one thing, hold everything else constant, "
            "observe what changes. "
            "The simulation gives you infinite patience to test every hypothesis."
        ),
        "Undo & Explore | 4:45 – 5:15",
    ),
    (
        "S9 — Problem-Solving Framework",
        (
            "Let me summarise the problem-solving framework that this simulation teaches. "
            "Principle one: Think forward, not just sideways. "
            "Don't only ask 'can I move here?' Ask 'if I move here, what does my situation "
            "look like three moves from now?' This is look-ahead thinking, and it separates "
            "good decisions from great ones. "
            "Principle two: Tackle constraints early. "
            "Warnsdorff's rule is a concrete example of the general idea: when you face a "
            "problem with many sub-tasks, solve the most difficult or most restricted ones "
            "first. If they're going to fail, fail fast — before you've invested effort in "
            "everything else. "
            "Principle three: Use tools to extend your thinking. "
            "The Hint and Auto Solve buttons are not shortcuts — they are teachers. "
            "Use them to verify your instincts, to see what you missed, and to build a "
            "mental model of the algorithm. "
            "Principle four: Failure is data. "
            "Every dead end tells you something. Systematic failure leads to systematic "
            "improvement. "
            "These four principles apply far beyond chess — to scheduling, logistics, "
            "coding, design — any situation where you must sequence decisions under constraints."
        ),
        "4 Principles of Problem Solving | 5:15 – 6:05",
    ),
    (
        "S10 — Call to Action",
        (
            "Now it's your turn. Open the simulation, try to beat the computer's score, "
            "and use the Hint button as a pedagogical partner, not a crutch — "
            "read the explanation, understand the rule, then see if you can apply it yourself. "
            "What's your highest score? Leave it in the comments — I read every one. "
            "If this video helped you think differently about problem solving, "
            "give it a thumbs up — it really helps this channel reach more learners. "
            "And if you want more simulations like this every week, subscribe "
            "and hit the bell so you don't miss the next one. "
            "Until then — good luck, and happy hopping!"
        ),
        "Like | Subscribe | Comment | 6:05 – 6:20",
    ),
]

# ── STEP 1: GENERATE AUDIO ────────────────────────────────────────────────────
print("=" * 60)
print("STEP 1 — Generating Kokoro TTS narration (af_heart voice)")
print("=" * 60)

tts_items = []
audio_paths = []
for i, (label, text, _) in enumerate(SECTIONS, 1):
    path = os.path.join(OUT, f"s{i:02d}.wav")
    audio_paths.append(path)
    if os.path.exists(path):
        print(f"  Skip (exists): {path}")
    else:
        tts_items.append((text, path))

if tts_items:
    narrate_batch(tts_items, voice="af_heart", speed=0.95)  # slightly slower = clearer

print(f"  All {len(SECTIONS)} audio clips ready.\n")

# ── STEP 2: CREATE SLIDE IMAGES WITH SECTION TITLES ───────────────────────────
print("=" * 60)
print("STEP 2 — Creating slide images with section overlays")
print("=" * 60)

try:
    from PIL import Image, ImageDraw, ImageFont
    USE_PIL = True
    print("  PIL available — creating styled title cards.")
except ImportError:
    USE_PIL = False
    print("  PIL not available — using simulation screenshot for all slides.")

W, H = 1280, 720
BG_COLOR   = (13, 13, 26)   # dark navy
GOLD_COLOR = (226, 185, 107)
WHITE      = (240, 240, 240)
DIM_GRAY   = (60, 60, 80)

slide_paths = []

def make_slide(idx, label, caption, screenshot_path):
    """Create a styled slide PNG combining screenshot + title overlay."""
    out_img = os.path.join(OUT, f"slide{idx:02d}.png")
    if os.path.exists(out_img):
        slide_paths.append(out_img)
        return out_img

    if USE_PIL:
        # Load or create base image
        if os.path.exists(screenshot_path):
            base = Image.open(screenshot_path).convert("RGB").resize((W, H))
            # Darken it to 50% for readability
            overlay = Image.new("RGBA", (W, H), (0, 0, 0, 128))
            base = base.convert("RGBA")
            base = Image.alpha_composite(base, overlay).convert("RGB")
        else:
            base = Image.new("RGB", (W, H), BG_COLOR)

        draw = ImageDraw.Draw(base)

        # Gold top bar
        draw.rectangle([(0, 0), (W, 6)], fill=GOLD_COLOR)
        # Gold bottom bar
        draw.rectangle([(0, H - 6), (W, H)], fill=GOLD_COLOR)

        # Section label (top left)
        try:
            fn_bold = ImageFont.truetype("arialbd.ttf", 28)
            fn_norm = ImageFont.truetype("arial.ttf", 22)
            fn_cap  = ImageFont.truetype("arial.ttf", 26)
        except:
            fn_bold = ImageFont.load_default()
            fn_norm = fn_bold
            fn_cap  = fn_bold

        # Label badge
        draw.rectangle([(20, 16), (20 + len(label) * 14 + 20, 52)], fill=GOLD_COLOR)
        draw.text((30, 20), label, font=fn_bold, fill=(13, 13, 26))

        # Caption at bottom (wrapped)
        wrapped = textwrap.fill(caption, 60)
        cap_lines = wrapped.split("\n")
        y = H - 60 - len(cap_lines) * 32
        for line in cap_lines:
            w_line = draw.textlength(line, font=fn_cap) if hasattr(draw, 'textlength') else len(line) * 14
            draw.rectangle([(W//2 - w_line//2 - 10, y - 4), (W//2 + w_line//2 + 10, y + 30)], fill=(0, 0, 0, 180) if False else (20, 20, 40))
            draw.text((W//2 - w_line//2, y), line, font=fn_cap, fill=GOLD_COLOR)
            y += 34

        base.save(out_img)
    else:
        # Just copy the screenshot
        import shutil
        if os.path.exists(screenshot_path):
            shutil.copy(screenshot_path, out_img)
        else:
            # Create a plain dark image
            img = Image.new("RGB", (W, H), BG_COLOR) if USE_PIL else None
            if img:
                img.save(out_img)
            else:
                # Fallback: write minimal PPM
                with open(out_img.replace('.png','.ppm'), 'wb') as f:
                    f.write(f"P6\n{W} {H}\n255\n".encode())
                    f.write(bytes([13, 13, 26] * W * H))
                out_img = out_img.replace('.png','.ppm')

    slide_paths.append(out_img)
    return out_img

for i, (label, _, caption) in enumerate(SECTIONS, 1):
    p = make_slide(i, label, caption, SCREENSHOT)
    print(f"  Slide {i:02d}: {p}")

print(f"  {len(slide_paths)} slides ready.\n")

# ── STEP 3: MEASURE AUDIO DURATIONS ──────────────────────────────────────────
print("=" * 60)
print("STEP 3 — Assembling slideshow MP4")
print("=" * 60)

slides = []
for i, (label, _, caption) in enumerate(SECTIONS, 1):
    slides.append({
        "image":   slide_paths[i - 1],
        "audio":   audio_paths[i - 1],
        "caption": "",  # caption already baked into image
    })

out_video = "knight_tutorial.mp4"
print(f"  Output: {out_video}")
print("  This may take 2–4 minutes...")

result = slideshow_to_mp4(slides, out=out_video, resolution=f"{W}x{H}")

size_mb = os.path.getsize(result) / 1024 / 1024
print(f"\nDONE: {result}  ({size_mb:.1f} MB)")
print("You can open it with any video player or upload to YouTube.")
