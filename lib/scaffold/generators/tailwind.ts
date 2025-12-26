import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

// Tailwind v4 uses CSS-based configuration, not config files
// This generates the proper PostCSS config for v4

export function generateTailwindConfig(manifest: ScaffoldManifest): GeneratedFile | null {
  // Tailwind v4 doesn't use tailwind.config.js anymore
  // Configuration is done in CSS with @theme directive
  return null
}

export function generatePostcssConfig(manifest: ScaffoldManifest): GeneratedFile | null {
  if (manifest.styling !== "tailwind" || manifest.framework === "static") {
    return null
  }

  // Tailwind v4 uses @tailwindcss/postcss plugin
  const config = `export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
`

  return {
    path: "postcss.config.mjs",
    content: config
  }
}

export function generateGlobalsCss(manifest: ScaffoldManifest): GeneratedFile | null {
  let content: string
  let path: string

  switch (manifest.styling) {
    case "tailwind":
      // Tailwind v4 CSS-based configuration
      content = `@import "tailwindcss";

/* Tailwind v4 Theme Configuration */
@theme {
  /* Colors */
  --color-primary: oklch(0.6 0.2 260);
  --color-primary-foreground: oklch(0.98 0.01 260);
  --color-secondary: oklch(0.7 0.1 200);
  --color-secondary-foreground: oklch(0.2 0.02 200);
  --color-accent: oklch(0.85 0.15 180);
  --color-accent-foreground: oklch(0.2 0.02 180);
  --color-muted: oklch(0.95 0.01 260);
  --color-muted-foreground: oklch(0.45 0.02 260);
  --color-background: oklch(0.99 0.005 260);
  --color-foreground: oklch(0.1 0.02 260);
  --color-card: oklch(0.99 0.005 260);
  --color-card-foreground: oklch(0.1 0.02 260);
  --color-border: oklch(0.9 0.01 260);
  --color-input: oklch(0.9 0.01 260);
  --color-ring: oklch(0.6 0.2 260);
  --color-destructive: oklch(0.55 0.25 30);
  --color-destructive-foreground: oklch(0.98 0.01 30);

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Fonts */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-primary: oklch(0.7 0.2 260);
    --color-primary-foreground: oklch(0.1 0.02 260);
    --color-secondary: oklch(0.35 0.05 260);
    --color-secondary-foreground: oklch(0.95 0.01 260);
    --color-muted: oklch(0.2 0.02 260);
    --color-muted-foreground: oklch(0.65 0.02 260);
    --color-background: oklch(0.12 0.02 260);
    --color-foreground: oklch(0.95 0.01 260);
    --color-card: oklch(0.15 0.02 260);
    --color-card-foreground: oklch(0.95 0.01 260);
    --color-border: oklch(0.25 0.02 260);
    --color-input: oklch(0.25 0.02 260);
  }
}

/* Base styles */
body {
  font-family: var(--font-sans);
  background-color: var(--color-background);
  color: var(--color-foreground);
}
`
      break

    case "css":
      content = `/* CSS Reset & Variables */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Colors - HSL for easy theming */
  --color-primary: hsl(221 83% 53%);
  --color-primary-dark: hsl(221 83% 43%);
  --color-secondary: hsl(215 20% 45%);
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(222 47% 11%);
  --color-muted: hsl(210 40% 96%);
  --color-muted-foreground: hsl(215 16% 47%);
  --color-border: hsl(214 32% 91%);
  --color-card: hsl(0 0% 100%);
  --color-destructive: hsl(0 84% 60%);

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;

  /* Typography */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: hsl(221 83% 63%);
    --color-background: hsl(222 47% 8%);
    --color-foreground: hsl(210 40% 98%);
    --color-muted: hsl(217 33% 17%);
    --color-muted-foreground: hsl(215 20% 65%);
    --color-border: hsl(217 33% 17%);
    --color-card: hsl(222 47% 11%);
  }
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-foreground);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
}

/* Utility classes */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
}

.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}
`
      break

    case "scss":
    case "sass":
      content = `// SCSS Variables & Mixins

// Colors
$primary: hsl(221, 83%, 53%);
$primary-dark: hsl(221, 83%, 43%);
$secondary: hsl(215, 20%, 45%);
$background: hsl(0, 0%, 100%);
$foreground: hsl(222, 47%, 11%);
$muted: hsl(210, 40%, 96%);
$muted-foreground: hsl(215, 16%, 47%);
$border: hsl(214, 32%, 91%);
$card: hsl(0, 0%, 100%);
$destructive: hsl(0, 84%, 60%);

// Dark mode colors
$dark-background: hsl(222, 47%, 8%);
$dark-foreground: hsl(210, 40%, 98%);
$dark-muted: hsl(217, 33%, 17%);
$dark-border: hsl(217, 33%, 17%);
$dark-card: hsl(222, 47%, 11%);

// Spacing
$spacing: (
  1: 0.25rem,
  2: 0.5rem,
  3: 0.75rem,
  4: 1rem,
  6: 1.5rem,
  8: 2rem,
  12: 3rem
);

// Typography
$font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
$font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

$text-sizes: (
  xs: 0.75rem,
  sm: 0.875rem,
  base: 1rem,
  lg: 1.125rem,
  xl: 1.25rem,
  2xl: 1.5rem,
  3xl: 1.875rem,
  4xl: 2.25rem
);

// Radius
$radius-sm: 0.25rem;
$radius-md: 0.5rem;
$radius-lg: 0.75rem;
$radius-full: 9999px;

// Breakpoints
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  2xl: 1536px
);

// Mixins
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin card {
  background: $card;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: map-get($spacing, 6);
}

// Reset
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// Base
body {
  font-family: $font-sans;
  font-size: map-get($text-sizes, base);
  line-height: 1.6;
  color: $foreground;
  background-color: $background;
  -webkit-font-smoothing: antialiased;

  @media (prefers-color-scheme: dark) {
    color: $dark-foreground;
    background-color: $dark-background;
  }
}

// Utility classes
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 map-get($spacing, 4);
  
  @include respond-to(lg) {
    padding: 0 map-get($spacing, 6);
  }
}

.btn {
  @include flex-center;
  padding: map-get($spacing, 2) map-get($spacing, 4);
  font-size: map-get($text-sizes, sm);
  font-weight: 500;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  &-primary {
    background: $primary;
    color: white;
    
    &:hover {
      background: $primary-dark;
    }
  }
}

.card {
  @include card;
}
`
      break

    default:
      return null
  }

  // Determine path based on framework
  switch (manifest.framework) {
    case "next":
      path = manifest.styling === "scss" || manifest.styling === "sass"
        ? "app/globals.scss"
        : "app/globals.css"
      break
    case "react":
      path = manifest.styling === "scss" || manifest.styling === "sass"
        ? "src/index.scss"
        : "src/index.css"
      break
    default:
      path = manifest.styling === "scss" || manifest.styling === "sass"
        ? "src/styles.scss"
        : "src/styles.css"
  }

  return {
    path,
    content
  }
}
