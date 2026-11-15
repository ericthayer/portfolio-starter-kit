---
name: verify-yofolio
description: "Verify Yofolio after HTML, SCSS, Bootstrap, JavaScript, Vite, or PWA changes. Use for build validation, responsive and light/dark smoke testing, theme persistence, and service-worker regression checks."
argument-hint: "Changed area or behavior to verify"
---

# Verify Yofolio

Use this workflow for application changes; for customization-only edits, validate their paths, frontmatter, links, and scope without implying browser behavior was tested.

## 1. Establish scope

- Read [AGENTS.md](../../../AGENTS.md), inspect `git status --short`, and identify the requested behavior and touched files. Preserve unrelated work.
- Read the applicable linked instructions and [known migration follow-ups](../../../MIGRATION-v6.md#known-follow-ups). Compare with the pre-change baseline when investigating an apparent regression.
- Inspect current `package.json` scripts. Install with `npm ci` from the repository root if dependencies are missing or changed; do not reinstall a working environment unnecessarily.

## 2. Check build and output

- Run `npm run build` from the repository root and record its actual result and relevant warnings. Do not fix an unrelated baseline failure under the guise of verification.
- Check `dist/index.html`, `dist/lighthouse/index.html`, and `dist/service-worker.js`, plus any deliberately added entry, manifest, icons, or downloads affected by the change.
- Do not count `npm test` as coverage: it is a failing placeholder. There is currently no configured lint, typecheck, unit, E2E, or visual-regression suite. Recheck this if tooling has since been added.

## 3. Run focused browser checks

- Reuse an appropriate local server when available; otherwise run `npm start` for source checks or `npm exec -- vite preview --host 127.0.0.1 --port 8081` after a build. Use the URL actually reported, and stop only processes you started.
- For layout or shared-theme changes, inspect 375px, 768px, and 1280px widths in both light and dark modes; check overflow, readable text, contrast, and visible focus. For narrowly scoped behavior changes, test the affected flow and its responsive variant.
- For navigation/plugin changes, exercise applicable flows: theme menu and reload persistence, Resume dialog from nav/hero/drawer, drawer-to-dialog handoff, Escape/focus return, carousel controls, tabs, independent accordions, and tooltip.
- For `patterns.html` changes, check its collapse, ScrollSpy, and drawer in development. It is not currently a production entry, and its CodePen embeds are external examples.
- Inspect console and failed network requests. Attribute saved Lighthouse iframe errors separately rather than hiding them or claiming the entire app is error-free.
- If no browser is available, report the checks as not run; do not substitute historical screenshots or audit scores.

## 4. Check PWA changes only when applicable

- Use the production preview on an isolated localhost origin and inspect worker registration, manifest/icon URLs, initial load, reload/update, and offline navigation.
- Inspect both worker fetch handlers and activation/cache cleanup before interpreting results. Test with and without an existing local worker/cache; report failures rather than assuming the current implementation is correct.
- Clear storage or unregister workers only on the isolated test origin. Do not touch live-site storage or claim installation/offline support from a manifest alone.

## 5. Report evidence

- Inspect the final diff and run `git diff --check`. Keep generated output and unrelated user edits out of the change.
- Return a compact table: check, result (`passed`, `failed`, or `not run`), and evidence/limitation. Name the checked routes, viewports, and color modes when browser checks ran.
- Identify baseline issues separately from new regressions. The February 2025 Lighthouse report and migration measurements are historical, not results of this verification. Do not commit, publish, or deploy as part of this workflow.
