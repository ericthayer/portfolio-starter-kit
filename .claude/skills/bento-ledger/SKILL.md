---
name: bento-ledger
description: Build bold, gapless color-block bento dashboards in the "Ledger" style — a black frame of flat yellow, sky, lime, coral, charcoal and gray blocks with no gaps or radius, oversized high-contrast serif numerals that gain weight on hover, caret (^) deltas, line-art corner icons, a phone-mockup cell, stepped area charts, bar silhouettes and a pausable ticker. Use when the user asks for a Ledger-style, color-block, Swiss/editorial KPI wall, annual-report, "big numbers" or healthcare/finance-style stats dashboard in vanilla HTML/CSS/JS.
---

# Bento · Ledger

Loud numbers, flat color, no gaps. Every block is a single fact set huge in a serif, with
a short sans label and a hairline footer. Reference: `references/example.html` and the
published page https://claude.ai/artifact/TNtjVvjKW1o9r5WccsM6H5.

Read `references/bento-principles.md` first for the shared cell method, grid mechanics,
motion budget and accessibility floor.

## When it fits
KPI walls, impact reports, "year in numbers", investor or board summaries — anything where
a handful of figures should land instantly. Prefer `bento-atlas` for quiet reading and
`bento-studio` for control-heavy tools.

## Build steps
1. Pick 6–10 facts. Each block gets one number, one label (≤ 8 words), optional footer row.
2. Assign colors *before* layout so no two touching blocks share a color.
3. Copy `assets/ledger.css` and `assets/bento-core.js`; lay out with the classes below.
4. Init: `Bento.reveal()`, `Bento.countUp()`, `Bento.magnetic(".btn-ink", .15)`, plus
   `checklist / generator / timer` where used.
5. Check 1440px and 390px (small stat pairs go 2-up on phones).

## Tokens
```css
color-scheme:dark  --black:#000  --char:#1d1d1c  --char-2:#262625  --yellow:#ffd12e  --yellow-2:#ffe27a
--sky:#5bc5ea  --lime:#c3c95a  --coral:#f2664a  --gray:#9b9a94  --gray-2:#8b8a84  --ink:#0d0d0c  --paper:#f4f2ea
--num-s:clamp(2.8rem,1.8rem+4vw,5.2rem)  --num-m:clamp(3.6rem,2rem+6vw,7.6rem)  --num-l:clamp(4.4rem,2rem+9vw,10.5rem)
```
Type: **Fraunces** (opsz 144, weight 300–480) for numerals and block titles; **Hanken
Grotesk** 400–600 for labels and body. Numerals: `line-height:.9; letter-spacing:-.035em`,
and on block hover `font-weight` rises to ~480 with tighter tracking (variable-font morph).
Text on color blocks is always `--ink`; text on charcoal is `--paper`. Muted text uses ink
at ≥0.72 alpha.

## Signature blocks (span at 12 cols)
| Class | Role | Span | Anatomy |
|---|---|---|---|
| `.b-phone` | "today" summary | 3 × 2 rows | gray block, black phone mockup bleeding off the bottom, serif title + menu icon, right-aligned meta, `+29^` numeral, two mini color cards with icon squares and hairline footers |
| `.b-tokens` | hero total | 3 × 2 rows | yellow, `--num-m` numeral, two-line label, stepped cumulative area along the bottom in two lighter yellows with serif date labels |
| `.b-sess` / `.b-turns` | small stats | 3 | charcoal, numeral + label, line icon top-right that rotates on hover, three dots that wave |
| `.b-limit` | ratio | 6 | sky, `71/100` with dimmed denominator, label with caret, 3 thin bar rows |
| `.b-peak` | peak/record | 6 | lime, label row, `--num-l` numeral beside a black bar silhouette of the series |
| `.b-night` / `.b-proj` | callouts | 3 | coral / gray, `^94%` numeral or serif name, hairline footer with arrow that rotates 45° |
| `.b-pend` | work list | 7 | charcoal, serif 01–NN counters (a real order), square checkboxes that fill yellow |
| `.b-gen` | generator | 5 | yellow, the prompt written as one serif sentence where each phrase is a lockable button |
| `.b-ticker` | shelf | 12 | yellow marquee of shipped items separated by spinning ✳, pause button, pauses on hover/focus |

## Rules of the look
- `gap:0`, `border-radius:0`, black page. Blocks touch; color is the divider.
- Carets (`^`, `×`) are superscript serif glyphs that nudge up on hover.
- Icons are thin line art (1.6px stroke), top-right, `aria-hidden`.
- Buttons are square-cornered with a 1.5px ink border; primary is ink with a yellow label.
- Never put a gradient on a block or round a corner (the phone mockup is the one exception).
- The marquee must have a visible pause control (WCAG 2.2.2).
