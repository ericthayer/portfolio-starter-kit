---
name: bento-studio
description: Build tactile, product-style bento dashboards in the "Studio" style — light neutral panels, a floating pill nav with a sliding tab indicator that filters the grid via View Transitions, dark selected list rows, iOS-style switches, a thick semicircle gauge, a prev/next carousel with a big glyph tile, white tiles inside panels, chunky uppercase ink buttons, and an animated SVG hero. Use when the user asks for a Studio-style, app-like, SaaS, smart-home, e-commerce admin or control-panel bento dashboard in vanilla HTML/CSS/JS.
---

# Bento · Studio

A dashboard that feels like a product: everything is operable. Neutral gray panels hold
white tiles; the selected thing goes black; toggles and tabs drive what you see.
Reference: `references/example.html` and the published page
https://claude.ai/artifact/K8BVQHNsU3yGngUL4uJtrK.

Read `references/bento-principles.md` first for the shared cell method, grid mechanics,
motion budget and accessibility floor.

## When it fits
Tools people operate daily: admin panels, device/home controls, store back-offices, personal
productivity hubs. Prefer `bento-atlas` for reading and `bento-ledger` for KPI walls.

## Build steps
1. Map content to cells and give each cell a `data-tabs="work usage …"` list for the tab filter.
2. Copy `assets/studio.css` and `assets/bento-core.js`.
3. Build the nav, then the grid with the classes below. Use `Bento.svg`/`Bento.arc` for
   the gauge, `Bento.checklist` for the switch list, `Bento.generator` for the tiles.
4. Wire the tab filter (see "Tab filter" below), then `Bento.reveal()` and `Bento.countUp()`.
5. Check 1440px and 390px (tabs drop to a second nav row; grid goes single column).

## Tokens
```css
--bg:#f4f4f2  --panel:#ebebe9  --tile:#fff  --ink:#131313  --ink-2:#5b5b58  --line:#d9d9d5
--violet:#6a4dff (data + "on" state)  --violet-ink:#5a3cf0 (text)  --lime:#d6f84c  --orange:#e87722  --flame:#efd347
--r-lg:clamp(20px,1.8vw,28px)  --r-md:18px  --gap:clamp(10px,1.1vw,16px)  --pad:clamp(18px,1.8vw,28px)
```
Type: **Plus Jakarta Sans** 400–700 for everything, **JetBrains Mono** 500 for code-ish
names. Headline 600 weight, −0.045em. Buttons are UPPERCASE 500 with +0.02em tracking.
The hero is the only dark, saturated surface; swap the brand colors in its strands to fit
the subject.

## Signature cells (span at 12 cols)
| Class | Role | Span | Anatomy |
|---|---|---|---|
| `.nav` | header | — | sticky pill (`top: calc(12px + safe-area)`), logo, `role=tablist` with a white `.tab-pill` that slides/resizes to the selected tab, avatar button opening a popover |
| `.s-hero` | featured item | 8 | dark card, generated SVG strands with dashed glowing pulses (`stroke-dasharray` + `pathLength=1000`), pointer parallax on two layers, glass tags, title bottom-left, white "Resume" button |
| `.s-proj` | selectable list | 4 | rows of 44px icon tile + name + meta + chevron; selected row is ink with a shadow and reveals a detail line; full-width ink button at the bottom |
| `.s-stats` | KPI strip | 12 | 5 white tiles (not a card) with a round icon that turns violet and tilts on hover; one tile is solid violet |
| `.s-skills` | carousel | 4 | prev/next icon buttons around a big rotated glyph tile that slides in, auto-rotate switch, dot pager |
| `.s-gauge` | quota | 4 | 46px-thick semicircle (`stroke-linecap:round`), track in white, fill ink → violet past 70%, switch between windows, full-width action button |
| `.s-gen` | generator | 4 | three white tiles with small line illustrations (each a lockable reel), chip-style reels below, Spin + square icon buttons |
| `.s-trend` | chart | 7 | smooth area + line (draws on), dashed grid, hover/arrow-key cursor with a dark tooltip |
| `.s-pend` | checklist | 7 | rows with icon tile + text + an iOS switch as the checkbox (`role=switch`) |

## Tab filter
Give each grid child `style.viewTransitionName = "card-" + i`. On tab select, inside
`document.startViewTransition(() => …)` (skip when reduced motion or unsupported), toggle
`.is-filtered` on the grid and `.is-match` on children whose `data-tabs` contains the key;
CSS hides `.is-filtered > :not(.is-match)`. Arrow keys move between tabs.

## Rules of the look
- Three surface levels only: page `--bg`, panel `--panel`, tile `--tile`. Tiles go inside
  panels; panels never nest in panels.
- "On" states: ink for selection, violet for data and switches, lime for a single success pop.
- Radii: panels `--r-lg`, tiles 16px, buttons 14px, pills/switches 999px.
- Every interactive element has hover, active (`scale .97`) and focus-visible states.
- Avoid: purple gradient heroes, glassmorphism everywhere, centered hero text.
