"""
make_thumbnail.py - YouTube thumbnail (1280x720) for the Bar Magnet & Compass video.

Requires:  pip install Pillow

Inputs (in this folder):
  thumb_bg.png   - background frame extracted from the video
  avatar.png     - your AI avatar (or fallback to C:/Users/weelo/Downloads/avartar.jpg)

Output:  thumbnail.png   (~1280x720, ~450 KB - well under YouTube's 2 MB limit)

Run:     python make_thumbnail.py
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

DIR = os.path.dirname(os.path.abspath(__file__))
BG  = os.path.join(DIR, "thumb_bg.png")
AVT = os.path.join(DIR, "avatar.png")
if not os.path.exists(AVT):
    AVT = "C:/Users/weelo/Downloads/avartar.jpg"   # user's saved avatar
OUT = os.path.join(DIR, "thumbnail.png")
W, H = 1280, 720


# ---------- fonts ----------
def load_font(size):
    for path in ["C:/Windows/Fonts/ariblk.ttf",
                 "C:/Windows/Fonts/arialbd.ttf",
                 "C:/Windows/Fonts/impact.ttf",
                 "C:/Windows/Fonts/arial.ttf"]:
        if os.path.exists(path):
            try: return ImageFont.truetype(path, size)
            except: pass
    return ImageFont.load_default()


def circle_crop(img, size):
    img = img.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    out  = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, mask=mask)
    return out


def shadow_text(draw, pos, text, font, fill, dx=4, dy=4, sh=(0, 0, 0, 200)):
    draw.text((pos[0]+dx, pos[1]+dy), text, font=font, fill=sh)
    draw.text(pos, text, font=font, fill=fill)


# ----------------------------------------------------------------
def make_thumbnail(avatar_path=None):
    # 1. Background
    bg = Image.open(BG).convert("RGBA").resize((W, H), Image.LANCZOS)
    canvas = Image.new("RGBA", (W, H))
    canvas.paste(bg)

    # 2. Dark left-side gradient overlay for text readability
    grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    for x in range(int(W*0.62)):
        a = int(220 * (1 - x/(W*0.62)))
        gd.line([(x, 0), (x, H)], fill=(8, 18, 50, a))
    # bottom strip
    for y in range(H-90, H):
        a = int(170 * (y-(H-90))/90)
        gd.line([(0, y), (W, y)], fill=(8, 18, 50, a))
    canvas = Image.alpha_composite(canvas, grad)
    draw = ImageDraw.Draw(canvas)

    # 3. Yellow accent bar
    draw.rectangle([0, 0, 8, H], fill="#FFD700")

    # 4. Headline - sized to fit left of avatar (avatar starts ~x=804)
    fnt_huge  = load_font(112)   # MAGNETIC (shrunk so it fits)
    fnt_big   = load_font(86)    # SEE THE  (slightly smaller for hierarchy)
    fnt_field = load_font(124)   # FIELD    (big punchy)
    fnt_sub1  = load_font(40)    # subtitle
    fnt_sub2  = load_font(28)    # bullet sub
    fnt_badge = load_font(26)    # badge text

    YEL  = "#FFD700"
    WHT  = "#FFFFFF"
    GRN  = "#2ecc71"
    BLU  = "#42a5f5"
    NVY  = "#0d1b2a"

    shadow_text(draw, (42,  60), "SEE THE",  fnt_big,   YEL)
    shadow_text(draw, (42, 165), "MAGNETIC", fnt_huge,  YEL)
    shadow_text(draw, (42, 295), "FIELD",    fnt_field, WHT)

    # divider rule
    draw.rectangle([42, 445, 560, 451], fill=YEL)

    # subtitle 1 (description)
    shadow_text(draw, (44, 462), "Interactive Bar Magnet + Compass", fnt_sub1, WHT)
    shadow_text(draw, (44, 515), "Dipole Field  ·  Earth Field  ·  2 Magnets", fnt_sub2, "#aad4f5")

    # 5. Green pill badge - bottom-left
    bx, by = 44, 575
    bw = 280
    draw.rounded_rectangle([bx, by, bx+bw, by+48], radius=24, fill=GRN)
    draw.text((bx+18, by+10), "Step-by-Step Tutorial", font=fnt_badge, fill=NVY)

    # blue pill badge next to it
    bx2 = bx + bw + 12
    bw2 = 180
    draw.rounded_rectangle([bx2, by, bx2+bw2, by+48], radius=24, fill=BLU)
    draw.text((bx2+30, by+10), "5+ minutes", font=fnt_badge, fill=NVY)

    # 6. Avatar - right side (slightly smaller, anchored further right)
    avt_size = 400
    avt_x = W - avt_size - 36
    avt_y = (H - avt_size)//2 - 10

    if avatar_path and os.path.exists(avatar_path):
        avt = Image.open(avatar_path).convert("RGBA")
        avt_circ = circle_crop(avt, avt_size)

        # gold glow ring
        glow = Image.new("RGBA", (avt_size+30, avt_size+30), (0, 0, 0, 0))
        gd2  = ImageDraw.Draw(glow)
        for i in range(12, 0, -1):
            a = int(120 * i/12)
            gd2.ellipse([15-i, 15-i, avt_size+15+i, avt_size+15+i],
                        outline=(255, 215, 0, a), width=3)
        canvas.alpha_composite(glow, (avt_x-15, avt_y-15))

        # avatar circle
        canvas.alpha_composite(avt_circ, (avt_x, avt_y))

        # white ring border
        draw = ImageDraw.Draw(canvas)
        draw.ellipse([avt_x-4, avt_y-4, avt_x+avt_size+4, avt_y+avt_size+4],
                     outline="white", width=4)
    else:
        draw.ellipse([avt_x, avt_y, avt_x+avt_size, avt_y+avt_size],
                     fill=(40, 50, 80), outline=YEL, width=4)
        draw.text((avt_x+100, avt_y+180), "avatar\n.png", font=fnt_med, fill=YEL)
        print(f"WARNING: avatar not found at {avatar_path} - placeholder used")

    draw = ImageDraw.Draw(canvas)

    # 7. Channel branding (bottom-right)
    fnt_brand = load_font(30)
    txt = "@lookang"
    bb = draw.textbbox((0, 0), txt, font=fnt_brand)
    bw = bb[2]-bb[0]
    draw.text((W - bw - 22, H - 44), txt, font=fnt_brand, fill="#cccccc")

    # 8. Save
    final = canvas.convert("RGB")
    final.save(OUT, quality=97)
    kb = os.path.getsize(OUT)//1024
    print(f"Saved: {OUT}  ({W}x{H}, {kb} KB)")
    return OUT


if __name__ == "__main__":
    avt = AVT if os.path.exists(AVT) else None
    make_thumbnail(avt)
