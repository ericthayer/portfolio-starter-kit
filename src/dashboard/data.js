// Project facts for the Yofolio dashboard, collected 2026-10-24.
// Sources: `git log origin/main`, `git tag`, README roadmap, package.json,
// src/js/main.js imports, and the Lighthouse report in src/lighthouse/index.html.
// Update by hand, or regenerate the git numbers with:
//   git rev-list --count origin/main
//   git log origin/main --format=%ad --date=format:%Y-%m | sort | uniq -c
export default {
  name: "Yofolio",
  site: "https://yofolio.design/",
  repo: "https://github.com/ericthayer/portfolio-starter-kit",
  collectedAt: "2026-10-24",

  git: {
    commits: 153,
    firstCommit: "2024-11-27",
    lastCommit: "2026-10-11",
    mergedPRs: 22,
    releases: [
      { tag: "0.40.0", note: "Q4 2024 landing page, theme, Lighthouse, PWA, Netlify" },
      { tag: "v1.0.0-alpha", note: "Latest tag" },
    ],
    // Commits per month, oldest first. Months with no commits are 0.
    monthly: [
      ["2024-11", 5], ["2024-12", 29], ["2025-01", 8], ["2025-02", 49], ["2025-03", 3], ["2025-04", 0],
      ["2025-05", 0], ["2025-06", 5], ["2025-07", 0], ["2025-08", 4], ["2025-09", 0], ["2025-10", 0],
      ["2025-11", 0], ["2025-12", 0], ["2026-01", 49], ["2026-02", 0], ["2026-03", 0], ["2026-04", 0],
      ["2026-05", 0], ["2026-06", 0], ["2026-07", 0], ["2026-08", 0], ["2026-09", 0], ["2026-10", 1],
    ],
  },

  lighthouse: {
    url: "https://67ab8a646c46d500089b345a--portfolio-starter-kit.netlify.app/",
    runAt: "2025-02-11",
    version: "9.6.8",
    scores: [
      { id: "performance", label: "Performance", value: 98 },
      { id: "accessibility", label: "Accessibility", value: 100 },
      { id: "best-practices", label: "Best practices", value: 100 },
      { id: "seo", label: "SEO", value: 100 },
      { id: "pwa", label: "PWA", value: 100 },
    ],
    vitals: [
      { label: "Largest Contentful Paint", short: "LCP", value: "1.6 s" },
      { label: "Total Blocking Time", short: "TBT", value: "0 ms" },
      { label: "Cumulative Layout Shift", short: "CLS", value: "0.081" },
    ],
  },

  migration: {
    title: "Bootstrap 6 migration",
    pr: 20,
    href: "https://github.com/ericthayer/portfolio-starter-kit/pull/20",
    mergedAt: "2026-10-11",
    detail: "6.0.0-alpha.1 · Sass token maps · data-attribute color modes",
    jsComponents: ["Carousel", "Collapse", "Dialog", "Drawer", "Menu", "ScrollSpy", "Tab", "Tooltip"],
  },

  stack: [
    ["Bootstrap", "6.0.0-alpha.1"],
    ["Vite", "^5.0.12"],
    ["Sass", "^1.105.1"],
    ["@floating-ui/dom", "^1.8.0"],
    ["register-service-worker", "^1.7.2"],
  ],

  pages: ["Home · index.html", "Patterns · patterns.html", "Lighthouse report · lighthouse/", "Dashboard · dashboard.html"],

  commands: [
    { label: "Dev server", cmd: "npm start" },
    { label: "Production build", cmd: "npm run build" },
  ],

  // From the README roadmap. Only Q4 2024 has a release tag (0.40.0); the rest
  // are planned, so they start unticked. Ticks persist per browser.
  roadmap: [
    { id: "q424", quarter: "Q4 2024", title: "Landing page, theme, Lighthouse, PWA, Netlify deploys", note: "Released as 0.40.0.", shipped: true },
    { id: "q125-resume", quarter: "Q1 2025", title: "Resume templates", note: "HTML and Word/PDF." },
    { id: "q125-examples", quarter: "Q1 2025", title: "Example templates", note: "Case study, brochure, cover letter, postcard." },
    { id: "q225-admin", quarter: "Q2 2025", title: "Admin panel (view-only)", note: "App metadata, theme info, export as .zip. This dashboard is a first step." },
    { id: "q225-onboard", quarter: "Q2 2025", title: "Onboarding docs and media" },
    { id: "q325-config", quarter: "Q3 2025", title: "App config: update metadata and deploy" },
    { id: "q325-cms", quarter: "Q3 2025", title: "CMS for content types" },
    { id: "q325-theme", quarter: "Q3 2025", title: "Theme builder UI" },
    { id: "q425-beta", quarter: "Q4 2025", title: "v1.0.0-beta" },
  ],
};
