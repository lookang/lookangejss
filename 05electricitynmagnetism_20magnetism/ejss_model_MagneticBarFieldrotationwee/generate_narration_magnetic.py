"""
generate_narration_magnetic.py - Bar Magnet & Compass simulation narration (Kokoro-ONNX)
Fully offline, neural quality.

Requires:
  pip install kokoro-onnx soundfile
  Model files in the SAME folder (or adjust MODEL_PATH / VOICES_PATH):
    kokoro-v1.0.onnx   (310 MB)
    voices-v1.0.bin    (27 MB)

Run:    python generate_narration_magnetic.py
Output: narration_magnetic.wav  +  narration_magnetic.mp3
"""

import os
import numpy as np
import soundfile as sf

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))

# Kokoro model files - try local first, then guards riddle folder
_GUARDS = os.path.join(os.path.dirname(SCRIPT_DIR),
                       "..","math","ejss_model_guards_riddle")
_GUARDS = os.path.normpath(_GUARDS)

MODEL_PATH  = os.path.join(SCRIPT_DIR, "kokoro-v1.0.onnx")
if not os.path.exists(MODEL_PATH):
    MODEL_PATH  = os.path.join(_GUARDS, "kokoro-v1.0.onnx")

VOICES_PATH = os.path.join(SCRIPT_DIR, "voices-v1.0.bin")
if not os.path.exists(VOICES_PATH):
    VOICES_PATH = os.path.join(_GUARDS, "voices-v1.0.bin")

OUT_WAV = os.path.join(SCRIPT_DIR, "narration_magnetic.wav")
OUT_MP3 = os.path.join(SCRIPT_DIR, "narration_magnetic.mp3")

VOICE = "am_michael"
SPEED = 1.0
LANG  = "en-us"

# ---------------------------------------------------------------------------
SECTIONS = [
    ("01_intro", """\
Welcome to the Bar Magnet and Compass simulation.
This interactive model lets you explore the magnetic field produced by a bar magnet,
visualise how the field fills space, and see how a compass needle responds to it.

Everything you're about to see is built on real physics — dipole field equations
and a damped harmonic oscillator for the compass needle.\
"""),

    ("02_field_vectors", """\
The coloured arrows filling the canvas are field vectors.
Each arrow points in the direction that the north pole of a tiny compass would face
if placed at that position.

Notice the pattern: arrows emerge from the red north pole on the right,
curve outward in arcs, and converge into the blue south pole on the left.
This closed-loop pattern is the signature of a magnetic dipole.

The field is strongest close to the poles — the arrows are longest there.
Further away the arrows shrink, showing that field strength falls off
as one over r cubed.\
"""),

    ("03_rotate_magnet_presets", """\
Let's rotate the magnet using the first dropdown menu.

Selecting "magnet points right" resets the magnet to the horizontal position —
north pole to the right, south pole to the left.

Now select "magnet points up" — watch the entire field pattern rotate ninety degrees.
The north pole is now at the top, and all the field vectors rotate with it.

"Magnet points left" — the field flips completely.
The poles have swapped sides, and the arrows reverse direction.

"Magnet points down" — field now points downward from the south pole.

The field pattern is always symmetric about the magnet axis.\
"""),

    ("04_drag_and_rotate", """\
The magnet can also be positioned and rotated freely.

Click and drag the bar magnet to move it anywhere on the canvas.
The field vectors update instantly — you're seeing the field recalculate in real time.

To rotate to a precise angle, use the second dropdown which steps
through angles in ten-degree increments from minus one-eighty to plus one-eighty degrees.

You can also grab the small rotation handle — the circular arrow symbol
on the magnet itself — and drag it to rotate to any angle you choose.

Try placing the magnet off-centre and notice how the field pattern
shifts but keeps the same dipole shape around the magnet.\
"""),

    ("05_compass_probe", """\
Now let's add a compass needle. Tick the "show Compass" checkbox.

A compass appears on the canvas, oriented to the local field direction.
The readout shows the field components: B-x, B-y, the magnitude, and the angle theta.

Drag the compass to directly above the magnet centre.
Here the field points upward — parallel to the magnet axis. The compass follows.

Now drag to the equatorial position — directly to the side of the magnet.
The field points in the opposite direction to the magnet's moment here.
The compass flips around.

Move the compass along the axis — closer to the north pole, further away.
Watch the magnitude reading climb steeply as you approach. That's the one over r cubed relationship.\
"""),

    ("06_oscillation", """\
When the compass is placed in a field, clicking Play starts the physics simulation.

The needle is modelled as a damped harmonic oscillator.
It swings past equilibrium, overshoots, swings back, and gradually settles
aligned with the field — just like a real compass on a table.

The equation of motion is: d-omega over d-t equals minus k times B-magnitude
times sine of delta-theta, minus b times omega.
The first term is the restoring torque from the field;
the second is the damping that bleeds energy away.

Move the compass to a weaker region of the field and repeat.
The oscillation is slower — less field strength means a weaker restoring force.\
"""),

    ("07_earth_field", """\
The "show Earth" checkbox adds Earth's background magnetic field to the simulation.

Now the compass is responding to TWO fields superimposed:
the bar magnet and Earth's uniform geomagnetic field.

Far from the bar magnet, the bar magnet's contribution becomes negligible,
and the compass simply points north — exactly like a real compass in the open.

Close to the north pole of the bar magnet, the magnet dominates
and the compass is pulled away from north.

Explore the region between — find the neutral point where the bar magnet's field
exactly cancels Earth's field in one direction.
At that point the compass will spin freely, because the net field is nearly zero.\
"""),

    ("08_second_magnet", """\
Finally, let's enable the second magnet using the second dropdown.
Select "magnet two on".

Now two bar magnets contribute to the field.
The vectors show the superposition of both dipole fields.

When the magnets are aligned with north poles facing each other,
you can see a region of repulsion — field lines being pushed aside between them.

Drag the second magnet so its south pole faces the first magnet's north pole.
The field lines now connect between them, forming a single long field arc.
This is magnetic attraction.

Rotate one magnet to explore anti-parallel configurations —
the field becomes far more complex, with neutral points appearing
in unexpected locations.\
"""),

    ("09_conclusion", """\
In summary, this simulation lets you:
visualise the complete dipole field of one or two bar magnets,
probe the field direction and magnitude at any point using the compass,
watch real-time field rotation as you change the magnet orientation,
observe the physics of compass oscillation and damping,
and see how Earth's field interacts with the bar magnet.

Use the guided exploration in the information panel for structured activities.
Try predicting the compass direction before you drag it — build your intuition.

Good luck exploring!\
"""),
]
# ---------------------------------------------------------------------------


def synthesize_all():
    from kokoro_onnx import Kokoro
    print("\nLoading Kokoro model ...")
    if not os.path.exists(MODEL_PATH):
        print(f"ERROR: Kokoro model not found at {MODEL_PATH}")
        print("Download kokoro-v1.0.onnx and voices-v1.0.bin to the script folder.")
        return
    kokoro = Kokoro(MODEL_PATH, VOICES_PATH)
    print(f"Voice: {VOICE}  |  Speed: {SPEED}  |  Lang: {LANG}")
    print("=" * 60)

    chunks = []
    sample_rate = None
    timings = []

    for sid, text in SECTIONS:
        print(f"  Synthesizing {sid} ...", end="", flush=True)
        samples, sr = kokoro.create(text, voice=VOICE, speed=SPEED, lang=LANG)
        chunks.append(samples)
        sample_rate = sr
        dur = len(samples) / sr
        timings.append((sid, dur))
        print(f" {dur:.1f}s")

    silence = np.zeros(int(sample_rate * 0.6), dtype=np.float32)
    combined = np.concatenate([x for chunk in chunks for x in (chunk, silence)])

    print("\nSaving WAV: " + OUT_WAV)
    sf.write(OUT_WAV, combined, sample_rate)
    total = len(combined) / sample_rate
    print(f"Total duration: {int(total//60)}:{int(total%60):02d}")

    print("\nSection timings (use in make_video_magnetic.py):")
    for sid, dur in timings:
        print(f"  {sid}: {dur:.1f}s")

    try:
        import subprocess
        result = subprocess.run(
            ["ffmpeg", "-y", "-i", OUT_WAV,
             "-codec:a", "libmp3lame", "-q:a", "3", OUT_MP3],
            capture_output=True, text=True
        )
        if result.returncode == 0:
            mp3_size = os.path.getsize(OUT_MP3) / 1024
            print(f"\nMP3 saved: {OUT_MP3}  ({mp3_size:.0f} KB)")
        else:
            print("ffmpeg not available - WAV saved.")
    except FileNotFoundError:
        print("ffmpeg not found - WAV saved only.")

    print("\nDone! Use narration_magnetic.mp3 for the video.")


if __name__ == "__main__":
    synthesize_all()
