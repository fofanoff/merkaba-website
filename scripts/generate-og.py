#!/usr/bin/env python3
"""Generate OG image for Merkaba Digital website."""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1200
HEIGHT = 630
BG_COLOR = (11, 14, 26)  # #0B0E1A
TEXT_COLOR = (255, 255, 255)

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
merkaba_root = os.path.dirname(project_root)

logo_path = os.path.join(merkaba_root, "logo", "merkaba_digital.png")
output_path = os.path.join(project_root, "public", "og-image.png")

img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# Load and center the logo
logo = Image.open(logo_path).convert("RGBA")

# Scale logo to fit nicely (max 300px height, keeping aspect ratio)
max_logo_h = 300
ratio = max_logo_h / logo.height
new_w = int(logo.width * ratio)
new_h = int(logo.height * ratio)
logo = logo.resize((new_w, new_h), Image.LANCZOS)

# Paste logo centered, offset up a bit to leave room for text
logo_x = (WIDTH - new_w) // 2
logo_y = (HEIGHT - new_h) // 2 - 60

# Create a temporary RGBA image for compositing
tmp = Image.new("RGBA", (WIDTH, HEIGHT), BG_COLOR + (255,))
tmp.paste(logo, (logo_x, logo_y), logo)
img = tmp.convert("RGB")
draw = ImageDraw.Draw(img)

# Text below logo
text = "Generative Engine Optimization"

# Try to use a nice font, fall back to default
font_size = 36
try:
    # Try common macOS fonts
    for font_name in [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSMono.ttf",
        "/Library/Fonts/Arial.ttf",
    ]:
        if os.path.exists(font_name):
            font = ImageFont.truetype(font_name, font_size)
            break
    else:
        font = ImageFont.load_default()
except Exception:
    font = ImageFont.load_default()

bbox = draw.textbbox((0, 0), text, font=font)
text_w = bbox[2] - bbox[0]
text_x = (WIDTH - text_w) // 2
text_y = logo_y + new_h + 40

draw.text((text_x, text_y), text, fill=TEXT_COLOR, font=font)

img.save(output_path, "PNG")
print(f"OG image saved to {output_path}")
