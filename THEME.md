# Customize the theme using SCSS

<img width="240" alt="scss-config" src="https://github.com/user-attachments/assets/3bdc9142-4910-4bab-8f90-af47b136be8a" />

## Current Import Configuration

By organizing your SCSS files in this way, you can easily manage and override Bootstrap's default styles to create a custom theme that fits your project's design requirements

Here is a summary of the relevant parts of your `styles.scss` file:

```scss
// Include functions and variables first
@import "../node_modules/bootstrap/scss/functions";

// Define custom Bootstrap variable overrides
@import "./theme/theme-map";

@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/variables-dark";

// Required
@import "../node_modules/bootstrap/scss/maps";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/utilities";

// Custom Bootstrap theme and variable mappings
@import "./config/root";

// Foundation (optional)
@import "../node_modules/bootstrap/scss/reboot";
@import "../node_modules/bootstrap/scss/type";
@import "../node_modules/bootstrap/scss/images";
@import "../node_modules/bootstrap/scss/containers";
@import "../node_modules/bootstrap/scss/grid";

// Components (full list)
@import "../node_modules/bootstrap/scss/buttons";
@import '../node_modules/bootstrap/scss/transitions';
@import "../node_modules/bootstrap/scss/dropdown";
@import "../node_modules/bootstrap/scss/button-group";
@import '../node_modules/bootstrap/scss/nav';
@import "../node_modules/bootstrap/scss/navbar";
@import '../node_modules/bootstrap/scss/modal';
@import '../node_modules/bootstrap/scss/carousel';
@import "../node_modules/bootstrap/scss/offcanvas";

// Component theme overrides
@import './theme/theme-overrides';

// Helper classes
@import "../node_modules/bootstrap/scss/helpers";

// Utilities API
@import "../node_modules/bootstrap/scss/utilities/api";
```

## Customize theme

To customize the Bootstrap theme, you can override various SCSS variables to change colors, fonts, spacing, and more. Here are some common variables you might want to override:

### Color Variables

- `$primary`: Primary color used throughout the theme.
- `$secondary`: Secondary color used for accents.
- `$success`: Color used for success messages and indicators.
- `$info`: Color used for informational messages.
- `$warning`: Color used for warnings.
- `$danger`: Color used for errors and danger messages.
- `$light`: Light background color.
- `$dark`: Dark background color.

### Typography Variables

- `$font-family-base`: Base font family for the body text.
- `$font-size-base`: Base font size for the body text.
- `$font-weight-base`: Base font weight for the body text.
- `$line-height-base`: Base line height for the body text.
- `$headings-font-family`: Font family for headings.
- `$headings-font-weight`: Font weight for headings.

### Spacing Variables

- `$spacer`: Base spacer unit used for margin and padding.
- `$spacers`: Map of spacer values for different sizes (e.g., `1`, `2`, `3`, etc.).

### Border Variables

- `$border-radius`: Base border radius for rounded elements.
- `$border-width`: Base border width.

#### Example of `theme.scss`

```scss

// Import Bootstrap's SCSS files
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

// Override Bootstrap variables
$primary: #f76c6c;
$secondary: #6c757d;
$success: #28a745;
$info: #17a2b8;
$warning: #ffc107;
$danger: #dc3545;
$light: #f8f9fa;
$dark: #343a40;

$font-family-base: 'DM Sans', sans-serif;
$font-size-base: 1rem;
$font-weight-base: 400;
$line-height-base: 1.5;
$headings-font-family: 'DM Sans', sans-serif;
$headings-font-weight: 700;

$spacer: 1rem;
$spacers: (
  0: 0,
  1: 0.25rem,
  2: 0.5rem,
  3: 1rem,
  4: 1.5rem,
  5: 3rem
);

$border-radius: 0.25rem;
$border-width: 1px;

// Import Bootstrap to apply the custom variables
@import "~bootstrap/scss/bootstrap";
```

### Theme Overrides

The `theme-overrides.scss` file is where you can define custom styles and override Bootstrap's default styles. This is imported after the Bootstrap components, ensuring that your custom styles take precedence.

#### Example of `theme-overrides.scss`

```scss
// Override Bootstrap variables
$primary: #f76c6c;
$secondary: #6c757d;
$font-family-base: 'DM Sans', sans-serif;

// Custom button styles
.btn-primary {
  background-color: $primary;
  border-color: $primary;
  &:hover {
    background-color: darken($primary, 10%);
    border-color: darken($primary, 10%);
  }
}

// Custom navbar styles
.navbar {
  background-color: $secondary;
  .navbar-brand {
    color: #fff;
  }
  .nav-link {
    color: #fff;
    &:hover {
      color: lighten($secondary, 20%);
    }
  }
}

// Custom modal styles
.modal-content {
  background-color: $light;
  border-radius: $border-radius;
}
```

### Custom Variables

The `theme-map.scss` file is used to define custom variables that can be used throughout your SCSS files. This file is imported before the Bootstrap variables, allowing you to use these custom variables in your overrides.

#### Example of `theme-map.scss`

```scss
// Custom color variables
$custom-primary: #f76c6c;
$custom-secondary: #6c757d;

// Custom font variables
$custom-font-family: 'DM Sans', sans-serif;

// Map custom variables to Bootstrap variables
$primary: $custom-primary;
$secondary: $custom-secondary;
$font-family-base: $custom-font-family;
```

### Custom Root Configuration

The `root.scss` file in the `config` directory is used to create a custom Bootstrap theme and map SCSS variables to custom variables. This file is imported after the Bootstrap variables and before the Bootstrap components.

#### Example of `root.scss`

```scss
// Custom root styles
:root {
  --bs-primary: #f76c6c;
  --bs-secondary: #6c757d;
  --bs-font-family-base: 'DM Sans', sans-serif;
}

// Map custom variables to CSS variables
$primary: var(--bs-primary);
$secondary: var(--bs-secondary);
$font-family-base: var(--bs-font-family-base);
```
