# Yofolio agent guide

## Scope and sources

- Keep this a static HTML, vanilla JavaScript, and SCSS site built with Vite and Bootstrap 6. Do not introduce an application framework, CMS, backend, or admin interface without an explicit task.
- Use the checked-out files as the implementation source of truth. The [README roadmap](README.md#roadmap) is intent, not proof of shipped features; distinguish open PRs from merged work.
- Read [THEME.md](THEME.md) for theme architecture and [MIGRATION-v6.md](MIGRATION-v6.md) for migration decisions, historical measurements, and known follow-ups. Do not duplicate those documents here.
- Inspect the working tree before editing; preserve unrelated changes. Do not commit, push, merge, deploy, or rewrite history unless requested.

## Development commands

Run from the repository root; the service-worker build uses `process.cwd()`.

| Purpose | Command | Notes |
| --- | --- | --- |
| Install | `npm ci` | Uses the tracked `package-lock.json`; keep it aligned with intentional dependency changes. |
| Develop | `npm start` | Vite serves `src/`, normally on port 8080; use the actual URL it reports. |
| Production build | `npm run build` | Writes ignored `dist/` and bundles the root service worker. |
| Preview build | `npm exec -- vite preview --host 127.0.0.1 --port 8081` | Run after building; this is not a deployment. |

- There is no `dev`, `lint`, `typecheck`, or `preview` npm script. `npm test` is an intentional failing placeholder, not a test suite. Report these gaps rather than claiming tests passed or weakening checks.
- Bootstrap is pinned to `6.0.0-alpha.1`; retain the `sass` requirement `^1.105.1`. Older Sass cannot parse this alpha's inline `if()` syntax.

## Working boundaries

- [vite.config.js](vite.config.js) explicitly builds `src/index.html` and `src/lighthouse/index.html`. `src/patterns.html` is available in development but is not a production entry. Register new pages deliberately.
- [src/js/main.js](src/js/main.js) loads site SCSS, individual Bootstrap plugins, the theme picker, and service-worker registration. Keep plugin imports selective; the `bootstrap` root entry also loads Datepicker and its `vanilla-calendar-pro` peer dependency.
- Before markup, browser JS, or SCSS changes, read the [Bootstrap 6 rules](.github/instructions/bootstrap6.instructions.md). Before build, manifest, or worker changes, read the [build/PWA rules](.github/instructions/build-pwa.instructions.md). These apply regardless of the agent client.
- Treat `src/lighthouse/index.html` as a saved February 2025 audit, not app markup or a fresh quality gate. Do not reformat it or migrate the HTML snippets quoted inside it.
- Follow adjacent formatting; avoid whole-file formatting churn in the large HTML files. Preserve third-party attribution notices and existing portfolio content unless the task changes them.
- Do not edit generated `dist/` or `node_modules/`. Keep secrets out of tracked files; this static site currently requires no application API keys.

## Skills and verification

- Reuse the Bootstrap skills in [.agents/skills/](.agents/skills/) instead of reinstalling them. Existing `.claude/skills/` links point there; preserve those links and `skills-lock.json` for installed skills.
- Select only the relevant skill: [colors](.agents/skills/bootstrap-color-system/SKILL.md), [components](.agents/skills/bootstrap-component/SKILL.md), [JavaScript](.agents/skills/bootstrap-component-js/SKILL.md), [utilities](.agents/skills/bootstrap-utility-api/SKILL.md), or [Vite](.agents/skills/bootstrap-vite/SKILL.md). Their starter examples are not replacements for this project's configuration.
- Use [verify-yofolio](.agents/skills/verify-yofolio/SKILL.md) for the build and focused browser checklist after application changes. A successful build alone does not prove interactions, accessibility, offline behavior, or performance.
- Finish with changed files, checks actually performed, and remaining limitations. Separate known baseline issues from regressions; do not silently fix unrelated migration follow-ups.

## Maintaining these customizations

- Keep shared guidance here. `.github/copilot-instructions.md` and `CLAUDE.md` are entry points, not independent copies of the rules.
- Keep specialized conventions in the linked scoped instructions and repeatable verification in the skill. Do not add hooks, dependencies, permissions, or model pins just to make instructions discoverable.
- For evidence-based roadmap research in VS Code Local sessions, use [project-status](.github/prompts/project-status.prompt.md); do not treat its output as authorization to implement or publish changes.
