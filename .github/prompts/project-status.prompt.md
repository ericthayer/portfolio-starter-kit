---
name: project-status
description: "Research Yofolio implementation and GitHub PR history against the README roadmap, without changing files or publishing anything."
argument-hint: "Roadmap area, feature, or PR number to investigate"
agent: ask
---

# Evidence-based project status

Follow the shared [agent guide](../../AGENTS.md). This is read-only research: do not edit files, install dependencies, switch branches, or create/update issues, PRs, releases, or deployments.

1. Read the current [README roadmap](../../README.md#roadmap), [package scripts](../../package.json), [Vite entries](../../vite.config.js), and relevant implementation. Establish the checked-out branch/commit when available; do not assume it contains every merged change.
2. Use the available GitHub integration to search pull requests in `ericthayer/portfolio-starter-kit`, scoped to the requested topic or sorted by recent updates in pages of 5–10. Inspect relevant PR details, changed files, and merge state; a closed PR is not necessarily merged. If GitHub access is unavailable, state that and use local evidence without inventing remote status.
3. Classify each relevant capability as implemented in this checkout, merged remotely but absent locally, in an open PR, planned, or unknown. Verify PR claims against code where possible. Do not infer completion or deadlines from historical roadmap quarters.
4. Treat the saved February 2025 Lighthouse report and manually maintained PR figures as dated evidence, not current measurements. Do not repeat release/commit/PR counts without checking their source and collection date.
5. Return a concise table with capability, status, local path or linked PR evidence, and uncertainty. Finish with the smallest actionable next steps and any conflicts with parallel/open work. Do not execute those steps without a separate request.
