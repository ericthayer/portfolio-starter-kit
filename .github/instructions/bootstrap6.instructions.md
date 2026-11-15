---
description: "Use when changing Yofolio Bootstrap 6 markup, SCSS tokens, color modes, utilities, or browser JavaScript. Prevents Bootstrap 5 and CDN-token regressions."
applyTo: "src/scss/**/*.scss,src/js/**/*.js,src/index.html,src/patterns.html"
---

# Bootstrap 6 implementation rules

- Follow [THEME.md](../../THEME.md) for palette → token maps → `styles.scss` → `custom` layer boundaries. Keep config partials free of emitted CSS; do not restore Sass `@import` or v5 variable overrides.
- Compile from Bootstrap's Sass source using the existing `@use ... with (...)`. Site CSS variables are unprefixed (`--bg-body`, `--primary-bg`, `--btn-border-width`); do not paste `--bs-*` variables from dist/CDN examples. `data-bs-*` attributes still retain their prefix.
- Add component token overrides in `config/_tokens.scss` and pass any newly introduced map through `styles.scss`. Use scoped CSS token overrides for local exceptions, not specificity escalation or blanket `!important`.
- Verify utilities and plugin APIs against the installed `node_modules/bootstrap/` alpha source before adopting examples from newer documentation. Preserve this site's custom font, radius, and spacing scales; stock migration tables are not authoritative for them.
- Use v6 patterns already present in `src/index.html`: responsive prefixes such as `md:col-6`, `btn-solid theme-primary`, native `<dialog>`, drawers, menus, and `<details>/<summary>` accordions. Do not reintroduce v5 modal/offcanvas/dropdown markup.
- Keep Bootstrap imports on `bootstrap/js/dist/<component>.js` in `main.js`; importing a plugin registers its data API. Tooltip instances are initialized explicitly. Do not add duplicate initialization or import the package root.
- Preserve the `data-bs-theme` and `localStorage` key `theme` contract in `bs-color-picker.js`. The UI offers light/dark; system preference is the fallback, and legacy `auto` handling is not authorization to add an Auto option.
- Keep trigger/target IDs, ARIA relationships, keyboard focus, and drawer-to-dialog handoff consistent. For touched controls, verify accessible names and visible focus in both color modes.
- Preserve the `.enhanced`/`.show` startup contract between HTML and `main.js`; a module failure can leave the page hidden.
- Consult [migration follow-ups](../../MIGRATION-v6.md#known-follow-ups) before broad class or ID replacements. External CodePen examples are not local v6 fixtures; the saved Lighthouse report is not a Bootstrap page.
