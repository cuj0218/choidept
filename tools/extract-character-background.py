from collections import deque
from pathlib import Path
from statistics import median

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CHARACTER_DIR = ROOT / "assets" / "characters"
NAMES = ("dark", "field", "hood", "neutral")


def distance(pixel, background):
    return sum((channel - base) ** 2 for channel, base in zip(pixel, background)) ** 0.5


def background_like(pixel, background):
    grayscale = max(pixel) - min(pixel) <= 8 and max(pixel) >= 70
    return distance(pixel, background) <= 26 or grayscale


def background_color(image):
    pixels = []
    width, height = image.size
    for x, y in ((0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)):
        for dx in range(12):
            for dy in range(12):
                pixels.append(image.getpixel((min(x + dx, width - 1), min(y + dy, height - 1))))
    return tuple(int(median(channel)) for channel in zip(*pixels))


def cutout(source, destination):
    image = Image.open(source).convert("RGB")
    width, height = image.size
    pixels = image.load()
    background = background_color(image)
    visited = bytearray(width * height)
    queue = deque()

    def enqueue(x, y):
        index = y * width + x
        if not visited[index] and background_like(pixels[x, y], background):
            visited[index] = 1
            queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height:
                enqueue(nx, ny)

    result = image.convert("RGBA")
    output = result.load()
    for y in range(height):
        for x in range(width):
            index = y * width + x
            if visited[index]:
                output[x, y] = (*output[x, y][:3], 0)
                continue
            if distance(pixels[x, y], background) < 54:
                touches_background = any(
                    0 <= nx < width
                    and 0 <= ny < height
                    and visited[ny * width + nx]
                    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1))
                )
                if touches_background:
                    alpha = max(0, min(255, int((distance(pixels[x, y], background) - 26) * 255 / 28)))
                    output[x, y] = (*output[x, y][:3], alpha)

    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, "WEBP", lossless=True, method=6)
    return background


for name in NAMES:
    source = CHARACTER_DIR / f"{name}.webp"
    destination = CHARACTER_DIR / f"{name}-transparent.webp"
    color = cutout(source, destination)
    print(f"{name}: background={color} -> {destination.name}")
