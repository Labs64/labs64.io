#!/usr/bin/env python3
"""Generate the Open Graph / Twitter share cards (1200x630) into img/og/ and list them in _data/og.yml.

Run from the repository root:  python3 scripts/generate-og.py
Needs Pillow. Module names, taglines, status and versions come from _data/modules.yml, so a card
never says something the module data does not. Re-run after changing a module or adding a page.
"""
import os
import re
import sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "fonts", "roboto-v30-latin")
OUT = os.path.join(ROOT, "img", "og")
W, H = 1200, 630
CREAM, APRICOT, EMBER, EMBER_T, UMBER, INK, MUT = "#FFF8EF", "#F9E1C4", "#E14817", "#C23A0E", "#7B2A10", "#333333", "#6F5F56"


def font(weight, size):
    return ImageFont.truetype(os.path.join(FONT, f"roboto-v30-latin-{weight}.ttf"), size)


def modules():
    text = open(os.path.join(ROOT, "_data", "modules.yml")).read()
    out = []
    for block in re.split(r"\n(?=- id: )", text):
        m = re.match(r"- id: (\S+)", block)
        if not m:
            continue
        get = lambda k: (re.search(rf'^\s+{k}: "?([^"\n]*)"?\s*$', block, re.M) or [None, ""])[1]
        out.append({"id": m.group(1), "name": get("name"), "tagline": get("tagline"), "status": get("status"), "version": get("version"), "url": get("url")})
    return out


def wrap(draw, text, fnt, width):
    lines, cur = [], ""
    for word in text.split():
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= width:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def card(slug, eyebrow, title, subtitle):
    img = Image.new("RGB", (W, H), CREAM)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((700, -260, 1400, 440), fill=(242, 149, 28, 70))
    g.ellipse((880, 120, 1500, 720), fill=(225, 72, 23, 55))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    d = ImageDraw.Draw(img)
    logo = Image.open(os.path.join(ROOT, "img", "labs64-logo.png")).convert("RGBA")
    lh = 64
    logo = logo.resize((int(logo.width * lh / logo.height), lh))
    img.paste(logo, (72, 60), logo)
    d.text((72, 176), eyebrow.upper(), font=font("500", 24), fill=EMBER_T)
    size = 76
    while True:
        tf = font("300", size)
        lines = wrap(d, title, tf, 1020)
        if len(lines) <= 3 or size <= 52:
            break
        size -= 4
    y = 222
    for ln in lines[:3]:
        d.text((72, y), ln, font=tf, fill=INK)
        y += int(size * 1.12)
    sf = font("300", 32)
    y += 18
    for ln in wrap(d, subtitle, sf, 960)[:2]:
        d.text((72, y), ln, font=sf, fill=MUT)
        y += 44
    d.text((72, H - 84), "labs64.io", font=font("500", 28), fill=UMBER)
    d.rectangle((0, H - 16, W, H), fill=EMBER)
    d.rectangle((W // 2, H - 16, W, H), fill="#F2951C")
    os.makedirs(OUT, exist_ok=True)
    img.quantize(colors=96, method=Image.Quantize.MEDIANCUT).save(os.path.join(OUT, slug + ".png"), optimize=True)


def slug_of(url):
    return "home" if url == "/" else url.strip("/").replace("/", "-")


def main():
    cards = [
        ("/", "Open core · API-first · Kubernetes", "Open-core microservices for business workflows", "AuditFlow, Auth Gateway, Checkout, Payment Gateway, Reporting and more. Start with one module."),
        ("/products/", "Modules", "Every module, one place", "Status and latest release from the repositories, and a real request from each OpenAPI contract."),
        ("/architecture/", "Architecture", "How the modules fit together", "The request path, the module map, tenancy and the extension points available today."),
        ("/why-labs64io/", "Why Labs64.IO", "Building blocks you can adopt one at a time", "Open core, OpenAPI-first and honest about what works today."),
        ("/pricing/", "Editions", "Apache 2.0 forever, Enterprise add-ons", "Community Edition is free forever. Enterprise only adds."),
        ("/enterprise/", "Editions", "Enterprise Edition", "Dedicated SLAs, a managed option and architecture consulting on top of the open core."),
        ("/open-source/", "Editions", "Built in the open", "Apache 2.0 code, public repositories and pull requests welcome."),
        ("/platform/polyglot/", "Architecture", "Polyglot Microservices", "Java, Python and Vue 3, each where it fits."),
        ("/platform/api-first/", "Architecture", "API-First and Contract-Driven", "The OpenAPI spec comes first and code is generated from it."),
        ("/platform/scalability/", "Architecture", "Stateless Scalability", "Stateless services, autoscaling and a database per service."),
        ("/platform/kubernetes/", "Architecture", "Cloud-Native Kubernetes", "One chart library, ArgoCD and self-healing pods."),
        ("/platform/zero-trust/", "Architecture", "Zero-Trust Edge Proxy", "Every request is checked at the edge before a module sees it."),
        ("/platform/identity/", "Architecture", "Federated Identity Management", "Keycloak OIDC and short-lived, stateless tokens."),
        ("/platform/authorization/", "Architecture", "Policy-as-Code Authorization", "Cerbos policies that are reviewed, tested and versioned."),
        ("/platform/telemetry/", "Architecture", "Business Telemetry Abstraction", "Auto-instrumented traces, metrics and logs."),
    ]
    for m in modules():
        eyebrow = "Module · " + m["status"].capitalize() + (" · v" + m["version"] if m["version"] else "")
        cards.append((m["url"], eyebrow, m["name"], m["tagline"]))
    slugs = []
    for url, eyebrow, title, sub in cards:
        s = slug_of(url)
        card(s, eyebrow, title, sub)
        slugs.append(s)
    with open(os.path.join(ROOT, "_data", "og.yml"), "w") as f:
        f.write("# Pages that have a share card in img/og/. Generated by scripts/generate-og.py.\n")
        for s in slugs:
            f.write(f"- {s}\n")
    print(f"{len(slugs)} cards written to img/og/")


if __name__ == "__main__":
    sys.exit(main())
