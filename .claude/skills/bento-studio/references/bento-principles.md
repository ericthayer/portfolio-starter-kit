# Bento dashboard principles (shared by all three styles)

## 1. Content before cells
Before drawing a grid, list the dashboard's content as a table of *cells*, each with one job:

| Role | What it holds | Typical size |
|---|---|---|
| **Hero stat** | the one number the page is about, plus a sentence of context | wide (6–8 of 12 cols) |
| **Status** | a limit, quota or health reading with a reset/deadline | square (3 cols) |
| **Trend** | a time series with a toggle (count vs volume) and a week-over-week delta | 5–7 cols |
| **Rhythm** | distribution across hours/days (radial clock, 24-bar strip, heat strip) | 3–4 cols |
| **Mix** | share of a whole (stacked bar + legend, never a pie with >4 slices) | 3–4 cols |
| **Work list** | pending items as a checklist with kind tags and a progress bar | 6–7 cols |
| **Action** | a helper the user operates: generator, timer, copyable commands | 4–5 cols |
| **Shelf** | recent output, suggestions, links (list, carousel or ticker) | 5–12 cols |

A good dashboard has one hero, 2–4 stats, one trend, one work list, one or two actions.
If a cell has no real data behind it, cut it. Never ship lorem ipsum or invented numbers;
label sample data as sample.

## 2. Grid mechanics
- 12 columns at desktop (≥1180px), 6 at tablet, 1 (or 2 for small stats) at phone.
- `grid-auto-flow: dense` so mixed spans pack without holes.
- Give every cell `container-type: inline-size` and switch *internal* layout with
  `@container` queries. A container query cannot restyle the container itself; change a
  cell's own grid template with a media query.
- Spans live on role classes (`.c-trend { grid-column: span 5 }`); re-declare them in each
  breakpoint rather than relying on cascade order.
- Fluid type: define `--step--1 … --step-5` with `clamp()` once; use only those.
- No horizontal page scroll at 390px. Test it.

## 3. Motion budget
- One signature motion per page (orbit, ticker, fiber pulses). Everything else is
  micro-feedback: hover lift, magnetic primary button, check pop, count-up.
- Entrances: cards in the first screen are visible at rest. Only below-the-fold cards rise
  in, staggered by `--i * 60ms` (`Bento.reveal()` does this).
- Count-ups render the final value at rest and replay on scroll-in.
- Charts grow from their baseline (`transform: scaleX/scaleY`), never animate width/height.
- `prefers-reduced-motion: reduce` turns all of it off and must still read completely.

## 4. Interaction patterns that earn their place
- **Segmented toggles** on charts (turns / tokens), `aria-pressed` on each button.
- **Checklist** with persistence (`Bento.checklist`) and a "next action" echoed in the header.
- **Generator** with lockable reels and copy-as-prompt (`Bento.generator`), hotkey G.
- **Copy chips** for commands (`data-copy`), with a toast confirmation.
- **Readouts** instead of tooltips: hovering/focusing a bar writes the value to a line below
  the chart (`aria-live="polite"`), so keyboard and touch users get it too.

## 5. Accessibility floor
- 4.5:1 for body text, 3:1 for text ≥24px. Muted grays only on display-size text.
- No functional text under 11px (micro-labels at ≥0.7rem mono).
- 44px minimum hit targets; visible `:focus-visible` ring from a token.
- Icon-only buttons get `aria-label`; decorative SVG gets `aria-hidden="true"`.
- Charts: `role="img"` + `aria-label` summarising the finding, plus per-mark `<title>`.

## 6. Publishing as a claude.ai Artifact
- Inline all CSS/JS/data into one file; drop doctype/html/head/body (host adds them).
- Google Fonts is the only font host; give every face a fallback stack.
- `localStorage` works per viewer — wrap in try/catch (bento-core does).
- `claude://`, `mailto:` and localhost links may do nothing for viewers; show the text too.
- Each style here commits to one look (light or dark) by design: set `color-scheme` on
  `:root` and an explicit `body` background rather than adding a second theme.
