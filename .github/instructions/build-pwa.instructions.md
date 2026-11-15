---
description: "Use when changing Vite entries, asset output, dependencies, the manifest, or service-worker caching and registration in Yofolio."
applyTo: "vite.config.js,package.json,package-lock.json,service-worker.js,src/manifest.json,src/js/main.js"
---

# Build and PWA boundaries

- Inspect [vite.config.js](../../vite.config.js) before changing paths. `src/` is the Vite root, `dist/` is output, and the build plugin bundles the repository-root `service-worker.js` to `dist/service-worker.js` using the repository working directory.
- New HTML files are not automatically production pages; add requested entries to `build.rollupOptions.input` and verify their built URLs. Do not remove the saved Lighthouse entry merely because it is not app code.
- Preserve hashed asset output and existing image, CSS, JS, PDF, and DOCX handling unless the task explicitly changes it. Verify manifest, icon, download, and registration URLs in the built site, not just the dev server.
- Service-worker registration uses `/service-worker.js`. A production build is required to generate that worker; development-server behavior alone cannot validate offline support.
- Review the entire [worker](../../service-worker.js) before cache changes: it currently has multiple `activate` and `fetch` listeners, and cleanup names differ from the offline cache. Do not assume a safe single-handler strategy or a functioning offline fallback from a successful build.
- For worker fixes, verify exclusive `respondWith` ownership, install/activation/update behavior, cache retention, and offline navigation on an isolated local origin. Do not unregister workers or clear storage on the live site.
- Keep `package.json` and its npm lockfile synchronized for intentional dependency edits. Preserve the Bootstrap alpha pin and selective-plugin strategy; investigate accidental root imports before changing calendar dependencies to resolve an unexpected Datepicker error.
- Do not infer Netlify configuration, CI gates, or deployment success from the README. Check actual repository configuration and report what is unavailable.
