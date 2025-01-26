# Customize the theme using SCSS

1. **Create a SCSS file**: Create a new SCSS file (e.g., `theme.scss`) in your project directory.

2. **Import Bootstrap SCSS**: Import Bootstrap's SCSS files into your `theme.scss` file. This allows you to override Bootstrap variables before they are used in the framework.

3. **Override Bootstrap Variables**: Customize the Bootstrap variables to fit your theme. You can find a list of Bootstrap variables in the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/customize/sass/).

4. **Compile SCSS to CSS**: Use a tool like `sass` or `node-sass` to compile your SCSS file into a CSS file.

5. **Include the Compiled CSS**: Include the compiled CSS file in your HTML.

Here is an example of how you can do this:

## Step 1: Create `theme.scss`

```scss


// Import Bootstrap's SCSS files
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

// Override Bootstrap variables
$primary: #f76c6c;
$secondary: #6c757d;
$font-family-base: 'DM Sans', sans-serif;

// Import Bootstrap to apply the custom variables
@import "~bootstrap/scss/bootstrap";
```

## Step 2: Compile SCSS to CSS

Use a command like the following to compile your SCSS file to CSS:

```sh
sass /path/to/theme.scss /path/to/theme.css
```

## Step 3: Include the Compiled CSS in Your HTML

```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
  <head>
    <!-- Other head elements -->
    <link rel="stylesheet" href="/path/to/theme.css">
  </head>
  <body>
    <!-- Body content -->
  </body>
</html>
```

### Additional Notes

- Ensure you have `sass` or `node-sass` installed in your project. You can install it using npm:

  ```sh
  npm install sass
  ```

- You can add a script in your 

package.json

 to automate the SCSS compilation:

  ```json
  "scripts": {
    "build-css": "sass /path/to/theme.scss /path/to/theme.css"
  }
  ```

Now, you can run `npm run build-css` to compile your SCSS file whenever you make changes. This setup allows you to customize the Bootstrap theme using SCSS effectively.

EThayer_cobank: @workspace /explain What variables should I override?

Workspace: To customize the Bootstrap theme using SCSS, you can override various variables to change colors, fonts, spacing, and more. Here are some common variables you might want to override:

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

### Example of Overriding Variables

Here is an example of how you can override some of these variables in your `theme.scss` file:

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

### Compiling SCSS to CSS

After creating your `theme.scss` file, compile it to CSS using a tool like `sass` or `node-sass`:

```sh
sass /path/to/theme.scss /path/to/theme.css
```

### Including the Compiled CSS in Your HTML

Include the compiled CSS file in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Other head elements -->
    <link rel="stylesheet" href="/path/to/theme.css">
  </head>
  <body>
    <!-- Body content -->
  </body>
</html>
```

By overriding these variables, you can customize the Bootstrap theme to match your project's design requirements.

EThayer_cobank: /elaborate on the theme overrides based on current import configuration

Workspace: Collecting workspace information

Still building the workspace index, response may be less accurate.

Based on the current import configuration in your 

styles.scss

 file, the theme overrides are managed by the files in the 

theme

 directory. Specifically, the 

theme-overrides.scss

 file is used to set the base styles for your components.

### Current Import Configuration

Here is a summary of the relevant parts of your 

styles.scss

 file:

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

### Theme Overrides

The 

theme-overrides.scss

 file is where you can define custom styles and override Bootstrap's default styles. This file is imported after the Bootstrap components, ensuring that your custom styles take precedence.

#### Example of

theme-overrides.scss

Here is an example of what your

theme-overrides.scss

 file might look like:

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

#### Example

Here is an example of what your file might look like:

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

Here is an example of what your `root.scss` file might look like:

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

By organizing your SCSS files in this way, you can easily manage and override Bootstrap's default styles to create a custom theme that fits your project's design requirements