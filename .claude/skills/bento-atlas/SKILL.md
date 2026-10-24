---
name: bento-atlas
description: Build calm, editorial bento-grid dashboards in the "Atlas" style — warm stone ground, soft 28–44px cards, light-weight grotesk display type with gray-to-black headline fades, mono pill tags, an orbit motif, a ticked radial dial over a vivid textured field, a draggable dot globe, a huge outlined numeral, and one dark feature card with an amber accent. Use when the user asks for an Atlas-style, editorial, calm, soft, or "supply-chain / intelligence report" bento dashboard, insight overview, or stats page in vanilla HTML/CSS/JS.
---

# Bento · Atlas

Calm and editorial. Large soft cards on a warm mineral ground, quiet light-weight type, and
a few precise instruments (orbit, dial, globe) that make data feel observed rather than
shouted. Reference: `references/example.html` (a full Claude-usage dashboard) and the
published page https://claude.ai/artifact/3nw9R2uPNEVZek1XPP8rQt.

Read `references/bento-principles.md` first for the content-to-cell method, grid mechanics,
motion budget and accessibility floor shared by all bento styles.

## When it fits
Overviews meant to be *read* — reports, personal analytics, portfolio stats, research
summaries. Prefer `bento-ledger` for punchy KPI walls and `bento-studio` for app-like
tools with lots of controls.

## Build steps
1. Map content to cells (principles §1). Atlas wants 1 hero, 2 instrument squares, 1 work
   list, 1 dark feature, then a row of 3 supporting cards.
2. Copy `assets/atlas.css` into the page's `<style>` and `assets/bento-core.js` into a
   `<script>` at the end of `<body>` (or link them locally).
3. Lay out with the role classes below; fill each with real data.
4. Call `Bento.reveal(".reveal")`, `Bento.countUp()`, `Bento.spotlight(".card")`,
   `Bento.magnetic(".btn-amber")`, plus `generator/checklist/timer` for the cells that use them.
5. Check 1440px and 390px; no horizontal scroll; reduced motion still complete.

## Tokens (keep these, retune values only)
```css
--bg:#d9d6cc  --card:#f1f0ec  --card-hi:#fff  --ink:#0e0e0c  --ink-2:#57554e  --ink-3:#7b786f
--orange:#f0490d (fills)  --orange-ink:#c4380a (text)  --amber:#f7a928  --blue:#1f5bff
--dark:#0b0b0a  --r-card:clamp(24px,2.6vw,44px)  --gap:clamp(10px,1.2vw,18px)  --pad:clamp(20px,2.4vw,40px)
```
Type: **Inter Tight** 300/400/500 for everything, **JetBrains Mono** 500 uppercase for pills
and micro-labels. Display sizes are weight 300–400 with −0.03 to −0.05em tracking.
One accent per card: orange for attention, blue for data highlight, amber only on dark.

## Signature cells (class → role → span at 12 cols)
| Class | Role | Span | Anatomy |
|---|---|---|---|
| `.c-orbit` | count of things in a system | 3, square | white face, 1px ring, dots orbit along the ring (one per item, sized by weight), centered big number; pauses on hover |
| `.c-dial` | a % reading with reset | 3, square | vivid green crop-row field, 72 radial ticks, ticks light up blue to the %, mono pill label, segmented switch between windows |
| `.c-globe` | hero thesis | 6 | pill eyebrow, 3-line headline fading `--ink-3 → #6c6a63 → --ink`, small footnote bottom-left, canvas dot-globe bleeding off the right edge, draggable |
| `.c-pending` | work list | 7 | white card, giant outlined numeral watermark, headline with one orange word, mono pill, progress bar, round checkboxes that fill orange and strike through |
| `.c-gen` | dark feature / action | 5 | near-black, faceted amber "gem" blob top-left that spins faster while spinning, headline with amber phrase, reels with mono labels + lock buttons, amber Spin button |
| `.c-trend` | time series | 5 | 21 rounded bars, today in orange, hover readout line, segmented metric toggle, 3-up delta row |
| `.c-clock` | 24h rhythm | 4 | radial bars around an inner ring, peak hour in orange, labels outside the bars, % in the center |
| `.c-models` | mix | 3 | big % + stacked 54px bar + legend |
| `.c-timer` | helper | 3 | full orange card, dark progress ring, preset chips |

## Rules of the look
- The ground is warm stone, cards are a half-step lighter, the hero/work card is pure white,
  and exactly one card is near-black. Never add a second dark card in the same row.
- Pills: 1px currentColor border, 6px radius, mono uppercase, a 6px dot; a "live" dot pings.
- Hover: card lifts 3px with a long soft shadow and a radial white spotlight at the pointer.
- Big numerals and watermarks are decorative: `aria-hidden="true"`.
- Corner radius is the same on every card; inner controls use 999px pills or 14–20px.
- Avoid: cream (#F4F1EA) instead of stone, gradients on light cards, more than one textured
  "photo" card, centered layouts.

## Data hooks
The example uses `data-text="path"` bindings and `data-count` numbers; with `Bento` alone,
set `textContent` and `data-count` directly from your data object before calling
`Bento.countUp()`.
