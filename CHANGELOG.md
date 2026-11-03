# CHANGELOG

## Unreleased
- Added a general "hide the heading" convention: setting `title = ""` (an explicitly empty string) on homepage sections (`markdown`, `publications`, `list`, `highlight`) or on page configs (`text`, `card`, `publication`, `cv`) hides the on-page heading while everything else renders unchanged; omitting the key keeps the previous behavior (localized defaults for homepage sections, configured titles for pages). The Selected Publications section keeps its "View All" link (right-aligned) when its heading is hidden, and the browser tab title of dynamic pages falls back to the site title when the page heading is hidden. Documented in `README.md`.
- Added `highlight` sections for easy-to-grasp overview cards (e.g., research areas): a new `type = "highlight"` section in page TOML files (such as `content/about.toml`) renders a responsive grid of tinted cards with a colored top bar, a serif heading, and short Markdown content. `columns` controls how many cards appear per row (1–4, default 3), and `color` customizes the box color either as a theme token (`accent` — the copper default, `primary`, `success`, `warning`, `info`, `error`, all light/dark-mode aware) or as any raw CSS color applied as a soft tint; a per-item `color` overrides the section color. The cards deliberately stand out from the plain white card boxes while staying within the theme. The same `[highlights]` block can also be added to `content/cv.toml` (rendered after the academic profile). Item content supports `{{ section.key }}` config variables. Documented in `README.md` and `docs/cv.md`.
- The email tooltip on the homepage profile now shows the plain email address (with `@`) instead of the ` (at) ` spelling, since the address is public via the imprint and repository anyway.
- Added variables in Markdown: Markdown files (page `source` files such as `content/imprint.md`) and string values in page TOML files (e.g., card item content) now support `{{ section.key }}` placeholders that are replaced at build time with the corresponding value from `content/config.toml` (merged with `content_<locale>/config.toml` for localized pages), so details like the email address only need to be defined once. Array items are addressable by index (`social.location_details.0`), unknown variables are left unchanged with a build-time warning, and BibTeX files are not substituted. The imprint templates now use `{{ author.name }}` and `{{ social.email }}`. Documented in `README.md`.
- Added automatic `sitemap.xml` and `robots.txt` generation: setting `url` in the `[site]` section of `content/config.toml` emits a sitemap listing the homepage, navigation pages, `[[subpages]]` targets, and `[legal]` slugs (with trailing slashes matching the site's links), plus a `robots.txt` allowing all crawlers and pointing to the sitemap. `site.url` is also used as the `metadataBase` so OpenGraph metadata resolves to absolute URLs. Both files are skipped gracefully when `url` is unset. Documented in `README.md`.
- Replaced the "Built with PRISM 🚀" footer link with configurable links to legal pages: set `imprint` and `privacy` slugs in the new `[legal]` section of `content/config.toml` (leave blank or delete a key to hide a link). Footer labels are localized (Imprint/Impressum, Privacy Policy/Datenschutzerklärung). Added imprint and privacy policy page templates (including German versions) with placeholder legal details, and the "Built with PRISM" reference now lives in the imprint template. Documented in `README.md`.
- Added support for pages outside the main navigation: new `[[subpages]]` entries in `content/config.toml` render a page at `/{target}` (content from `content/<target>.toml`) without adding it to the nav menu, so it can be linked from any page or the footer. `generateStaticParams` now registers navigation pages, `[[subpages]]` targets, and `[legal]` slugs. Documented in `README.md`.
- Code cleanup with no visual or behavioral changes: removed unused dependencies (`lightningcss` and the linux-only `lightningcss-linux-x64-gnu` binary, both already provided transitively by Tailwind), unused glass-morphism styles and custom line-height properties, the unused `.no-print` / `text-balance` / `text-pretty` utilities, and redundant `Publication`/`Author` type fields (unused fields such as `arxivId`, `impactFactor` and `awards` were removed; `keywords`, `status`, `venue`, `location` and `pdfUrl` were kept for future use, and the duplicate `tags` field was merged into `keywords` for BibTeX consistency). Also removed a redundant favicon `<link>` (Next.js metadata already emits it), deduplicated the publications-with-metrics loading on dynamic pages, and simplified BibTeX month parsing.
- Added optional teaser images for card items: each `card` page item can now set `image = "/my-image.png"` (a path inside `public/`) and optionally `imageAlt = "..."` for alt text. The image is rendered as a responsive thumbnail beside the card content (stacking above it on mobile), following the same layout pattern as publication preview images. Cards without an image are rendered exactly as before. Documented in `README.md`.
- Redesigned the navigation language and theme toggles to blend in with the menu links: both are now borderless, transparent buttons instead of boxed controls. The language toggle shows a globe icon plus a compact locale code (EN/DE) with click-to-cycle switching (replacing the dropdown menu), and the theme toggle resolves the system preference to a sun/moon icon and toggles between light and dark with a single click (replacing the system/light/dark three-state cycle). Added a localized "Click to switch to {locale}" tooltip message.
- Redesigned the theme from Deep Navy & Gold to Forest & Copper: a warm forest-green primary with copper accents in light and dark modes, a gray-green neutral ramp, muted semantic colors, and an updated print palette.
- Switched the site fonts to self-hosted Lora for headings and IBM Plex Sans for body text (both variable, 400–700, with italics), plus IBM Plex Mono for code and BibTeX snippets. Inter and Georgia were removed.
- Rebuilt the CV page as a narrative academic portfolio: a new `cv` page type driven by a structured `content/cv.toml` with an academic profile, expandable appointments timeline, education, research project cards, publications (reusing `publications.bib`), teaching & supervision, grants & awards, academic service, and skills. Includes a sticky section index with scroll-spy, a print/PDF action, print-friendly styles, and i18n support via localized section headings. See `docs/cv.md` for the schema. The old `content/cv.md` text page was replaced by this content model.
- Added citation metrics from OpenAlex on the publications page: an author summary strip (citations, h-index, works count) and per-publication "Cited by" badges. Metrics are fetched at build time via `scripts/fetch-metrics.mjs` using the ORCID from `content/config.toml`, with a committed fallback in `data/openalex-metrics.json` so fresh clones and offline builds always have data. The deploy workflow now refreshes metrics weekly.
- Added optional Matomo analytics: configure `enabled`, `matomo_url`, and `matomo_site_id` in the new `[analytics]` section of `content/config.toml`. The standard Matomo JS tracker is embedded in `<head>` and a `<noscript>` tracking pixel is rendered at the end of `<body>` as a fallback for visitors with JavaScript disabled. Tracking is fully disabled (no tracker rendered) unless all values are set.

## v1.3.3 on May 13, 2026
- Fixed disabled i18n mode so browser language and stored locale preferences cannot override the default locale.
- Added inline formatting for BibTeX publication titles, including `\textit`, `\emph`, `\textbf`, `\textsc`, superscript, and subscript commands.

## v1.3.2 on Mar 19, 2026
- Added Markdown rendering for card items.

## v1.3.1 on Feb 24, 2026
- Fixed SSR/client mismatch from font stylesheet toggling. Updated font settings to be deterministic.

## v1.3.0 on Feb 22, 2026
- Added support for i18n. Set `enabled = true` in config.toml to enable this feature.
- Fixed some cases where the navigation bar indicator not working correctly.

## v1.2.1 on Feb 19, 2026
- Updated the navigation bar implementation to make it more responsive, dynamic, and natural.
- The demo site is updated as well.

## v1.2.0 on Dec 6, 2025

- Added GitHub Actions workflow for automatic deployment to GitHub Pages.
- Fixed publication highlighting with site owner name.
- Fixed co-author underline.
- Fixed broken "view all" link when one-page mode is disabled.
- Updated docs and deployment guide.

## v1.1.0 on Nov 23, 2025

- Added support for one-page mode. Set `enable_one_page_mode = true` in config.toml to enable this feature. All subpages will be rendered on the same page.
- Added more flexible settings for social icons. You may leave the config blank to hide the display of any social icon.

## v1.0.0 on Nov 18, 2025

- Initial release
