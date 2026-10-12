# Bootstrap 5 → 6 migration log

Working notes for the `feat/upgrade-v6` branch. Scope: `src/index.html` and its Sass/JS only (`src/patterns.html` and `src/lighthouse/index.html` are out of scope for this PR).

Decisions: theming is rewritten on v6 `$root-tokens`; v5 spacing is preserved by remapping spacer classes.

## Phase 0 — v5 baseline (bootstrap 5.3.3, sass 1.81.0, vite 5.4.11)

`npx vite build`:

| Asset | Size | gzip |
| --- | --- | --- |
| `assets/css/main-*.css` | 264.63 kB | 33.03 kB |
| `assets/js/main-*.js` | 85.96 kB | 26.20 kB |
| `index.html` | 140.42 kB | 20.96 kB |

`src/index.html` rendered in the dev server (light theme), page `scrollHeight`:

| Viewport | Height |
| --- | --- |
| 1280px | 5342px |
| 768px | 6325px |
| 375px | 7752px |

Body at 1280px light: background `rgb(252, 252, 252)`, text `rgb(63, 69, 75)`, `h1` 64px, font DM Sans.

DOM inventory: 2 modals, 2 offcanvas panels, 2 dropdown toggles, 6 accordion items, 3 carousel items, 8 tab triggers, 9 `.btn`.

Baseline screenshots are not stored: the sandbox blocks headless Chrome and local port binding for shell commands, so visual checks run in the in-app browser against `npm start` (port 8080, see `.claude/launch.json`).
