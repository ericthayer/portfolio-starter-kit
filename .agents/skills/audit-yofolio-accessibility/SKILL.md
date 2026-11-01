---
name: audit-yofolio-accessibility
description: "Audit Yofolio web accessibility in HTML, Bootstrap 6 controls, or browser behavior. Use when asked for an accessibility audit, WCAG review, keyboard or screen-reader checks, contrast review, or accessibility findings for a page or component."
argument-hint: "Route, component, or all in-scope pages"
---

# Audit Yofolio accessibility

Produce an evidence-based accessibility audit of the requested Yofolio route or component. Do not change application files unless the user explicitly asks you to fix findings. An audit is not a conformance certification.

## 1. Establish scope and baseline

- Read [AGENTS.md](../../../AGENTS.md), inspect `git status --short`, and preserve unrelated edits.
- Identify the target route and relevant source files. If the user requests a site-wide audit, cover `src/index.html`, `src/js/main.js`, `src/js/bs-color-picker.js`, and `src/scss/styles.scss` with its relevant theme overrides; include `src/patterns.html` as a development-only page and clearly label that it is not a production build entry. Inspect additional CSS/JS when behavior or styling affects access.
- Use an available browser on the relevant local route; use the existing `npm start` workflow if a local source server is needed. Do not install packages, alter browser/site storage, or test against the live site without authorization. If browser access is unavailable, finish a source-only audit and label runtime checks **not run**.
- Check the initial visibility/startup contract on a fresh load and whether a module or initialization failure could leave the page hidden. Verify the usable state appears after successful initialization; do not deliberately break or edit production code to simulate failure.
- Treat `src/lighthouse/index.html` as a saved February 2025 report, not an application page or a current audit. Do not report its quoted audited markup as current defects.
- Read [Bootstrap 6 implementation rules](../../../.github/instructions/bootstrap6.instructions.md) before reviewing site controls. Keep the Bootstrap 6 alpha APIs and this repository's custom theme scales in mind.
- Record the current working tree and any existing build/browser limitations; do not attribute pre-existing issues to the requested target without evidence.

## 2. Inspect source semantics

Review the relevant rendered markup and its behavior for:

- Document language and page title; landmarks and page structure; a meaningful heading hierarchy; skip navigation where needed.
- Native HTML semantics before ARIA. Check accessible names, descriptions, label associations, required/error state, and instructions for interactive controls and any forms in scope.
- Link purpose and button names; distinguish navigation from actions; flag ambiguous repeated links only when context does not disambiguate them.
- Images and icons: verify informative image alternatives communicate equivalent purpose; decorative images/icons are ignored by assistive technology; icon-only controls have an accessible name.
- Component relationships and state: correct trigger/target association, accessible name, expanded/selected/pressed state, and live updates where needed. Avoid recommending redundant or conflicting ARIA.
- Visible focus styling, reading order, keyboard operability, and that color is not the only way information is conveyed.
- Text and control contrast in both light and dark themes. Check the actual computed colors for the active state where a browser is available; do not infer contrast from token names or the saved Lighthouse report.

## 3. Exercise interactions in a browser when available

Use an available browser on the relevant local route; use the existing `npm start` workflow if a local source server is needed. Do not install packages, alter browser/site storage, or test against the live site without authorization. If browser access is unavailable, finish a source-only audit and label runtime checks **not run**.

- Navigate using only the keyboard. Check logical Tab/Shift+Tab order, visible focus, Enter/Space activation, Escape behavior where applicable, and that focus is not trapped or lost.
- Check dialogs and drawers for accessible naming, initial focus, modal containment, Escape/close behavior, and sensible focus return. Exercise the Resume dialog from the navigation, hero, and mobile drawer when those flows are in scope.
- Check menus and theme controls for keyboard access, exposed current state, and light/dark appearance. If persistence is in scope, verify the selected theme after reload without clearing or rewriting storage.
- Check tabs for selected state, panel association, and keyboard interaction; if a carousel auto-rotates, verify it can be paused and that changes do not create an unexpected announcement burden; check its controls and indicators at relevant viewport sizes. Check tooltips for keyboard/focus access and nonessential content, and `<details>` accordions for native keyboard operation and understandable summaries.
- Inspect responsive behavior and zoom/reflow at narrow and wide viewports when layout is in scope. Check `prefers-reduced-motion` when animated content is present; report what was and was not exercised.
- Inspect the browser accessibility tree, console, and failed requests if the available tooling supports it. Attribute errors in the saved Lighthouse document or external CodePen embeds separately from the app under audit.

## 4. Use automation carefully

- Use an accessibility scanner only if already available in the project or browser environment. Do not add dependencies, alter project configuration, or install extensions for an audit unless the user asks.
- Report the scanner, route, theme, and state tested. An automated scan complements manual keyboard and assistive-technology checks; it does not establish conformance or prove the absence of barriers.
- Do not claim to have tested screen readers unless a screen reader was actually used. If it was not, list it as a limitation or recommended follow-up.

## 5. Report actionable findings

- Prioritize each finding as **Blocker**, **High**, **Medium**, or **Low** based on impact and reach; keep unverified concerns separate as **Needs confirmation**.
- For every finding, include the exact route and source file/line or identifiable control, user impact, reproducible steps or state, evidence, and a concrete remediation direction. Cite a WCAG 2.2 criterion only when the evidence supports that mapping; avoid using a criterion number as a substitute for explaining the barrier.
- Group duplicates that share one root cause. Separate confirmed barriers from manual checks that remain incomplete. Do not report generic recommendations as defects.
- Summarize scope, routes, themes, viewports, keyboard/browser/scanner checks actually completed, and limitations. If no findings were confirmed, say so and state which checks were not run; do not claim the site is fully accessible.
- Offer implementation as a separate next step; do not make fixes as part of the audit.
