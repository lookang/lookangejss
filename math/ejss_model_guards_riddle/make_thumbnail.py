"""
make_thumbnail.py — Generates a YouTube thumbnail (1280x720) for the Guards Riddle video.
Requires: pip install Pillow
Place your avatar as: avatar.png in the same folder, then run:
    python make_thumbnail.py
Output: thumbnail.png
"""
import os, sys, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

DIR  = os.path.dirname(os.path.abspath(__file__))
BG   = os.path.join(DIR, "thumb_bg.png")
AVT  = os.path.join(DIR, "avatar.png")
OUT  = os.path.join(DIR, "thumbnail.png")
W, H = 1280, 720

# ---------- fonts (system fonts on Windows) ----------
def load_font(size, bold=True):
    candidates = [
        "C:/Windows/Fonts/ariblk.ttf",   # Arial Black
        "C:/Windows/Fonts/arialbd.ttf",  # Arial Bold
        "C:/Windows/Fonts/impact.ttf",   # Impact
        "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try: return ImageFont.truetype(path, size)
            except: pass
    return ImageFont.load_default()

# ---------- helpers ----------
def circle_crop(img, size):
    """Crop image to a circle of given diameter."""
    img = img.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    out  = Image.new("RGBA", (size, size), (0,0,0,0))
    out.paste(img, mask=mask)
    return out

def draw_text_with_shadow(draw, pos, text, font, fill, shadow_offset=4, shadow_color=(0,0,0,180)):
    sx, sy = pos[0]+shadow_offset, pos[1]+shadow_offset
    draw.text((sx, sy), text, font=font, fill=shadow_color)
    draw.text(pos, text, font=font, fill=fill)

def centered_x(draw, text, font, y, canvas_w):
    bb = draw.textbbox((0,0), text, font=font)
    tw = bb[2]-bb[0]
    return (canvas_w - tw)//2

# =========================================================
def make_thumbnail(avatar_path=None):
    # -- 1. Load & crop background to 1280×720 --
    bg = Image.open(BG).convert("RGBA")
    bg = bg.resize((W, H), Image.LANCZOS)

    canvas = Image.new("RGBA", (W, H))
    canvas.paste(bg)
    draw = ImageDraw.Draw(canvas)

    # -- 2. Dark gradient overlay (left half + bottom strip) --
    grad = Image.new("RGBA", (W, H), (0,0,0,0))
    gd   = ImageDraw.Draw(grad)
    # left-to-right gradient strip: fully dark on left, transparent at 55%
    for x in range(int(W*0.62)):
        alpha = int(210 * (1 - x/(W*0.62)))
        gd.line([(x,0),(x,H)], fill=(10,14,40,alpha))
    # bottom strip for readability
    for y in range(H-90, H):
        alpha = int(160 * (y-(H-90))/90)
        gd.line([(0,y),(W,y)], fill=(10,14,40,alpha))
    canvas = Image.alpha_composite(canvas, grad)
    draw   = ImageDraw.Draw(canvas)

    # -- 3. Accent bar (left edge) --
    draw.rectangle([0, 0, 8, H], fill="#FFD700")

    # -- 4. Main headline text (left side) --
    fnt_huge  = load_font(130)
    fnt_large = load_font(88)
    fnt_med   = load_font(52)
    fnt_small = load_font(34)
    fnt_tag   = load_font(30)

    YELLOW = "#FFD700"
    WHITE  = "#FFFFFF"
    GREEN  = "#2ecc71"
    NAVY   = "#0d1b2a"

    # "HOW A"
    draw_text_with_shadow(draw, (42, 60), "HOW A", fnt_large, YELLOW)
    # "COMPUTER"
    draw_text_with_shadow(draw, (42, 155), "COMPUTER", fnt_huge, YELLOW)
    # "THINKS"  — slightly smaller to fit
    fnt_thinks = load_font(118)
    draw_text_with_shadow(draw, (42, 285), "THINKS", fnt_thinks, WHITE)

    # Divider rule
    draw.rectangle([42, 422, 560, 428], fill=YELLOW)

    # subtitle line 1
    draw_text_with_shadow(draw, (44, 440), "Backtracking Search Explained", fnt_med, WHITE)
    # subtitle line 2
    draw_text_with_shadow(draw, (44, 498), "Guards Riddle  ·  n = 3 → 8", fnt_small, "#aad4f5")

    # -- 5. Solution badge (bottom-left) --
    badge_x, badge_y = 44, 575
    # pill background
    draw.rounded_rectangle([badge_x, badge_y, badge_x+280, badge_y+54], radius=27, fill=GREEN)
    draw.text((badge_x+20, badge_y+10), "✓ Solved at n = 4, 5, 8", font=fnt_tag, fill=NAVY)

    # -- 6. Avatar (right side) --
    avt_size = 420
    avt_x    = W - avt_size - 48
    avt_y    = (H - avt_size) // 2 - 20

    if avatar_path and os.path.exists(avatar_path):
        avt_img = Image.open(avatar_path).convert("RGBA")
        avt_circ = circle_crop(avt_img, avt_size)

        # Glow ring (yellow)
        glow = Image.new("RGBA", (avt_size+30, avt_size+30), (0,0,0,0))
        gd2  = ImageDraw.Draw(glow)
        for i in range(12, 0, -1):
            alpha = int(120 * i/12)
            gd2.ellipse([15-i, 15-i, avt_size+15+i, avt_size+15+i], outline=(255,215,0,alpha), width=3)
        canvas.alpha_composite(glow, (avt_x-15, avt_y-15))

        # Avatar circle
        canvas.alpha_composite(avt_circ, (avt_x, avt_y))

        # White ring border
        draw = ImageDraw.Draw(canvas)
        draw.ellipse([avt_x-4, avt_y-4, avt_x+avt_size+4, avt_y+avt_size+4],
                     outline="white", width=4)
    else:
        # placeholder
        draw.ellipse([avt_x, avt_y, avt_x+avt_size, avt_y+avt_size],
                     fill=(40,50,80), outline=YELLOW, width=4)
        draw.text((avt_x+100, avt_y+180), "avatar\n.png", font=fnt_med, fill=YELLOW)
        print("WARNING: avatar.png not found - placeholder used. Save your avatar and re-run.")

    draw = ImageDraw.Draw(canvas)

    # -- 7. Channel brand tag (@lookang) bottom-right --
    fnt_brand = load_font(30)
    brand_text = "@lookang"
    bb = draw.textbbox((0,0), brand_text, font=fnt_brand)
    bw = bb[2]-bb[0]
    draw.text((W - bw - 20, H - 42), brand_text, font=fnt_brand, fill="#cccccc")

    # -- 8. Save --
    final = canvas.convert("RGB")
    final.save(OUT, quality=97)
    size_kb = os.path.getsize(OUT)//1024
    print(f"Saved: {OUT}  ({W}x{H}, {size_kb} KB)")
    return OUT


if __name__ == "__main__":
    avt = AVT if os.path.exists(AVT) else None
    make_thumbnail(avt)
