# Customize the theme using SCSS

The site is themed on Bootstrap 6 (`6.0.0-alpha.1`). Bootstrap 6 is configured through Sass token maps passed to `@use ... with (...)`, not through v5-style variable overrides and `@import`. See the [Bootstrap 6 Sass customization docs](https://getbootstrap.com/docs/6.0/customize/sass/) for the full list of configurable variables.

Building requires `sass` (`package.json` pins `^1.105.1`).

## File layout

```
src/scss/
├── styles.scss                  # entry point: configures and loads Bootstrap
├── config/
│   ├── _palette.scss            # raw colors + Sass helper functions (no CSS output)
│   └── _tokens.scss             # token maps handed to Bootstrap (no CSS output)
└── theme/
    └── _theme-overrides.scss    # site CSS, inside the `custom` cascade layer
```

`src/js/main.js` imports `../scss/styles.scss`, so Vite compiles it with the JavaScript entry.

## How `styles.scss` works

`styles.scss` loads the site's tokens, then loads all of Bootstrap in one `@use` and passes the site's maps as configuration:

```scss
@use "config/tokens" as site;

@use "bootstrap/scss/bootstrap" with (
  $white: site.$white,
  $black: site.$black,
  $color-tokens: site.$color-tokens,
  $theme-colors: site.$theme-colors,
  $theme-bgs: site.$theme-bgs,
  $theme-fgs: site.$theme-fgs,
  $theme-borders: site.$theme-borders,

  $color-mode-type: "data",

  $radius: site.$radius,
  $radii: site.$radii,
  $breakpoints: site.$breakpoints,
  $container-max-widths: site.$container-max-widths,
  $font-sizes: site.$font-sizes,
  $font-weights: site.$font-weights,

  $enable-smooth-scroll: true,

  $root-tokens: site.$root-tokens,
  $type-tokens: site.$type-tokens,
  $button-tokens: site.$button-tokens,
  // ...also $btn-close-tokens, $drawer-tokens, $accordion-tokens, $carousel-tokens
);

@use "theme/theme-overrides";
```

`config/_tokens.scss` only lists the keys the site changes; Bootstrap merges them into its defaults. Neither `_tokens.scss` nor `_palette.scss` emits CSS.

Bootstrap declares its cascade layers in this order: `colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities`.

## Palette helpers (`config/_palette.scss`)

`_palette.scss` holds the raw values and four Sass helpers:

- Primitives: `$white`, `$black`, `$dark`, the `$neutral`, `$blue-gray` and `$brand` step maps (`"0"` to `"900"`), `$pink`, `$purple`, and the `$success`, `$info`, `$warning`, `$danger` families (base, `-dark`, `-light`, `-soft`).
- `tint($color, $weight)` and `shade($color, $weight)` mix toward white or black.
- `blend($a, $b, $weight)` mixes two colors.
- `fluid($size)` returns a fixed `rem` size up to `1.25`, and a `clamp()` that scales between roughly 375px and 1200px above that. It replaces RFS, which v6 removed.

`_tokens.scss` turns the `$neutral`, `$blue-gray` and `$brand` maps into `--neutral-*`, `--blue-gray-*` and `--brand-*` custom properties (via `$color-tokens`), and builds each entry of `$theme-colors` with its local `theme-color()` function. That function returns the nine roles Bootstrap 6 expects per theme color: `base`, `fg`, `fg-emphasis`, `bg`, `bg-subtle`, `bg-muted`, `border`, `focus-ring` and `contrast`. Light and dark values are paired with `light-dark()`.

## Overrides (`theme/_theme-overrides.scss`)

All site CSS is wrapped in `@layer custom { ... }`. Because `custom` comes after Bootstrap's `components` layer, these rules win over Bootstrap components, reboot and forms without needing higher specificity. Because `helpers` and `utilities` come after `custom`, utility classes such as `.fw-medium` still win over element selectors written here.

```scss
@layer custom {
  .card {
    transition: box-shadow .3s ease;

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
}
```

## Light and dark mode

`$color-mode-type: "data"` makes Bootstrap switch modes on the `data-bs-theme` attribute. `src/index.html` starts with `data-bs-theme="light"` on `<html>`, and `src/js/bs-color-picker.js` sets the attribute to `light` or `dark` (resolving `auto` from `prefers-color-scheme`) and stores the choice in `localStorage` under `theme`. The toggle buttons are the elements with `data-bs-theme-value`.

Colors that differ between modes are written with `light-dark(<light>, <dark>)` in the token maps. Mode-specific rules in the overrides use `[data-bs-theme="dark"]`:

```scss
[data-bs-theme="dark"] .app-logo img {
  filter: none;
}
```

## Common changes

### Change the brand color

Edit the raw values in `config/_palette.scss`. `$pink` is the base of the `primary` theme color and is also the `"600"` step of `$brand`:

```scss
$pink: #c9057e;
$brand: (
  "0": #fff5fb,
  // ...
  "600": $pink,
  "700": #a00063,
  // ...
);
```

`primary` is built in `_tokens.scss` as `theme-color($pink, $emphasis: map.get($brand, "900"), $bg-dark: map.get($brand, "700"))`. Update the `$brand` steps too, since `--brand-*` is used for the dark-mode solid fill, `--code-color`, nav link hover and carousel indicators. The `accent` color is `theme-color($purple)`.

### Change a component token

Component tokens live in the `$*-tokens` maps in `config/_tokens.scss`. For example, the button border width and the accordion's active colors:

```scss
$button-tokens: (
  --btn-border-width: .12rem,
  --btn-disabled-opacity: 1,
);

$accordion-tokens: (
  --accordion-active-bg: var(--primary-bg-subtle),
  --accordion-active-color: var(--primary-fg-emphasis),
);
```

A new map must also be passed to Bootstrap in `styles.scss` (as `$accordion-tokens: site.$accordion-tokens` is). Site-wide values such as the body font stack or the `--heading-1` to `--heading-6` sizes go in `$root-tokens`.

To change a token on one component only in a specific place, set it in `_theme-overrides.scss`, as the nav pills do with `--nav-link-padding-x`.

### Change the radius

`$radius` is the base radius; `$radii` overrides numbered steps of the radius scale:

```scss
$radius: .375rem;

$radii: (
  3: .25rem,
  7: .5rem,
  8: 1rem,
  9: 2rem,
);
```

The step keys are chosen so that v5 `.rounded-{1..5}` correspond to `.rounded-{3,5,7,8,9}` in v6.

### Change the breakpoints

`$breakpoints` and `$container-max-widths` in `config/_tokens.scss`:

```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  2xl: 1400px,
);

$container-max-widths: (
  xl: 1140px,
  2xl: 1320px,
);
```

Each extra breakpoint adds a full set of responsive utility classes, so the v5 `xxs`/`xs` (325px) and `wide` (2000px) steps were dropped. Update any `.col-*` or `.d-*` classes in the HTML if a key is renamed or removed (`xxl` is `2xl` in v6).

## JavaScript

`src/js/main.js` imports individual Bootstrap components from `bootstrap/js/dist/` (carousel, collapse, dialog, drawer, menu, tab, tooltip) instead of the `bootstrap` root entry. The root entry also pulls in Datepicker, which needs the optional `vanilla-calendar-pro` peer dependency. Add an import line there when you start using another component.
