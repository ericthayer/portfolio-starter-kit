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

## Result (bootstrap 6.0.0-alpha.1, sass 1.105.1)

`npx vite build`:

| Asset | v5 | v6 |
| --- | --- | --- |
| `main-*.css` | 264.63 kB (33.03 kB gzip) | 375.39 kB (52.57 kB gzip) |
| `main-*.js` | 85.96 kB (26.20 kB gzip) | 93.76 kB (27.69 kB gzip) |
| `index.html` | 140.42 kB (20.96 kB gzip) | 134.37 kB (20.73 kB gzip) |

The CSS grew because v6 compiles every component, where the v5 entry imported only a subset.

`index.html` page height, light theme (v5 → v6): 1280px 5342 → 5300, 768px 6325 → 6322, 375px 7752 → 7820. No horizontal overflow at 768 or 375px.

### Phases

| Phase | Commit |
| --- | --- |
| 0 Baseline | `c2366ae` |
| 1 Dependencies (plus the Sass bump v6 needs) | `0666b96`, `f887f43` |
| 2 Sass rewrite on token maps | `fbf3d3b`, `d96ba57` |
| 3 `index.html` markup | `a2da689` |
| 4 JS imports | `a02223a` |
| 5 Other pages | `patterns.html` migrated (`a2d333c` adds ScrollSpy to `main.js`, then the markup commit); `lighthouse/index.html` left as is, see below |
| 6 Verify and docs | this commit |

### Verified in the in-app browser (dev server, light and dark)

- Theme toggle menu opens, and `data-bs-theme` switches the whole page (body `rgb(63, 69, 75)` in dark, matching v5).
- Resume dialog opens from the nav link, the nav drawer link and the hero button, and closes (`dialog-open` is set and cleared on `<html>`).
- Mobile nav drawer opens flush full-width and hands off to the Resume dialog.
- Carousel next and indicator controls, tab switching, native `<details>` accordions and the tooltip all work.
- v5-pattern grep checklist over `src/index.html`, `src/scss` and `src/js` is clean, apart from the pre-existing no-op class typos listed below.

### Known follow-ups

- `src/lighthouse/index.html` is a recorded Lighthouse audit (February 2025) with its own `lh-*` styles and no Bootstrap. The `lead` and `d-lg-none` strings in it are quoted snippets of the audited page, so it was not edited. It is a Vite build input and is embedded in the Resume dialog; it logs two console errors from its own inline scripts, unrelated to Bootstrap.
- `src/patterns.html` is migrated, but it is not a Vite build input, so `vite build` does not include it. Its 12 CodePen embeds are external and still show v5 markup; they need re-saving on v6. Its pre-existing quirks were kept: duplicate `id="collapseActions"` (sidebar and drawer), sidebar triggers with `aria-expanded="false"` on blocks that start open, and sidebar anchors with no matching section.
- If the ScrollSpy active link looks off on `patterns.html`, add `data-bs-top-margin="96px"` to its `<body>`.
- Pre-existing typos kept so behaviour is unchanged: `d-sm-fle` / `d-md-fle` (the testimonial captions and the table-of-contents button stay hidden), `text-md-left`, the duplicate `id="lighthouseModalLabel"`, the `aria-labelledby` pointing at a missing `drawerNavbarLabel`, and the `#2005-2010` tab with no pane.
- Accordion `<summary>` content keeps its `<div>`/`<a>` children and has no `<h2>` wrapper. Items are independent (no `name` attribute), as in v5.
- `.carousel-fade` is kept: the alpha still ships it.
- Images in `ratio-16x9` boxes got `w-100 h-100`, because v6 ratios no longer position children absolutely.
- `mt-n*` negative margins have no v6 utility and became inline `margin-block-start` styles.
- Visual regression was checked by eye in the in-app browser. No pixel diff or Lighthouse run was possible: the sandbox blocks headless Chrome and local ports for shell commands.
