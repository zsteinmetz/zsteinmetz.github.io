<div align="center">
  <img src="./logo.png" alt="PRISM Logo" height="100"/>
</div>

# PRISM

[Demo](https://prism-demo.pages.dev)  · [Changelog](CHANGELOG.md)

**If you like this project, please give it a star ⭐️**

PRISM stands for **P**ortfolio & **R**esearch **I**nterface **S**ite **M**aker. It is a modern, configurable, and high-performance personal website template built with Next.js, Tailwind CSS, and TypeScript. It is designed for researchers, developers, and academics to showcase their work, publications, and portfolio with ease.

Feel free to customize your own version of PRISM with coding agents.

![PRISM Preview](screenshot.png)

## ✨ Features

*   **📄 Configuration-Driven**: Manage your entire site's content using simple `TOML`, `Markdown`, and `BibTeX` files in the `content/` directory. No code changes required for content updates!
*   **📚 BibTeX Support**: Directly render your publications from a `.bib` file. Includes search, filtering (Year, Type), and automatic citation generation.
*   **🎨 Modern Design**: Clean, responsive UI with a beautiful serif/sans-serif typography pairing, smooth animations (Framer Motion), and Dark Mode support.
*   **⚡️ High Performance**: Built on Next.js 15 with Turbopack. Static export ensures blazing fast load times and easy deployment.
*   **🔍 SEO Optimized**: Dynamic metadata generation for every page, plus automatic `sitemap.xml` and `robots.txt` when `site.url` is set.
*   **🧩 Dynamic Routing**: Easily add new pages by simply creating a config file.

## 🚀 Getting Started

### Prerequisites

*   Node.js 22 or later
    *   **Important**: Please download and install Node.js manually from [https://nodejs.org/en/download](https://nodejs.org/en/download).
    *   Better not to use the pre-installed version on your system, as it may be outdated or incompatible.
*   npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/xyjoey/PRISM.git
    cd PRISM
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Configuration

All content lives in the `content/` directory.

### 1. Global Site Config (`content/config.toml`)
Configure your site title, author details, social links, and navigation menu here.

```toml
[site]
title = "Your Name"
description = "Personal website of Your Name"
url = "https://your-website.com"

[author]
name = "Your Name"
title = "PhD Student / Researcher"
# ...
```

Setting `url` enables automatic `sitemap.xml` and `robots.txt` generation (emitted at build time): the sitemap lists the homepage, all navigation pages, `[[subpages]]` targets, and `[legal]` slugs, while `robots.txt` allows all crawlers and links the sitemap. The URL is also used as the `metadataBase` so OpenGraph metadata resolves to absolute URLs. Leave `url` unset to skip both files.

### 2. Homepage (`content/about.toml`)
Customize the "About" section, "News", and "Selected Publications" on the homepage.

### 3. Publications (`content/publications.bib`)
Export your publications from Google Scholar, Zotero, or Mendeley to `content/publications.bib`. PRISM automatically parses this file to generate your Publications page. Customize the display of publications by changing `selected`, `preview` and `description` keys in the bib file. 

Publication titles support a subset of BibTeX inline formatting commands, including `\textit{}`, `\emph{}`, `\textbf{}`, `\textsc{}`, `\textsuperscript{}` and `\textsubscript{}`.

### 4. Academic CV (`content/cv.toml`)
The CV page (`/cv`) is a narrative academic portfolio rather than a plain list. It supports an academic profile with narrative, appointments as an expandable vertical timeline, education, research projects, publications (reusing `publications.bib`), teaching & supervision, grants & awards, academic service, and skills. A sticky section index and a print/PDF action are built in. See **[docs/cv.md](docs/cv.md)** for the full schema and editing guide.

### 5. Adding New Pages
To add a new page (e.g., "Projects"), create a TOML file in `content/` (e.g., `content/projects.toml`) and add it to the `navigation` list in `content/config.toml`.

Supported page types:
*   `text`: Renders Markdown content (Great for short notes).
*   `card`: Renders a list of cards (Great for Projects, Awards). Content of each card item supports Markdown. Each item optionally supports a teaser image: set `image = "/my-image.png"` (a path inside `public/`) and optionally `imageAlt = "..."` for alt text.
*   `publication`: Renders the full publications list with filters.
*   `cv`: Renders the narrative academic CV page (see `docs/cv.md`).

#### Pages outside the navigation menu
To add a page that should be reachable at its own URL but **not** appear in the main nav menu (e.g., a colophon or legal page), add it to the `[[subpages]]` list in `content/config.toml` instead:

```toml
[[subpages]]
# The page is rendered at /{target}; content comes from content/<target>.toml
target = "colophon"
```

Such pages can be linked from any other page (e.g., `[Colophon](/colophon)` in Markdown) or from the footer (see section 8).

### 6. I18N Support (`content_<locale>/`)
PRISM now supports i18n, i.e., multi-language.

*   Default language lives in `content/`.
*   Additional languages live in `content_<locale>/` (for example: `content_de/`, `content_en/`).
*   Keep the same filenames across directories. Example:
    *   `content/cv.toml` (default)
    *   `content_de/cv.toml`
*   If a localized file is missing, PRISM automatically falls back to the default `content/` version.

Configure language behavior in `content/config.toml`:

### 7. Analytics (Matomo)
PRISM supports privacy-friendly, self-hosted Matomo analytics. Enable it in the `[analytics]` section of `content/config.toml`:

```toml
[analytics]
# Set enabled = true to turn on Matomo analytics
enabled = true
# URL of your Matomo instance, e.g. "https://matomo.example.com/"
matomo_url = "https://matomo.example.com/"
# The Site ID from your Matomo instance, e.g. "1"
matomo_site_id = "1"
```

*   Tracking is only active when `enabled = true` and both `matomo_url` and `matomo_site_id` are set; otherwise the tracker is not rendered at all.
*   The standard Matomo JavaScript tracker is embedded in `<head>` of every page.
*   A `<noscript>` tracking-pixel fallback (`matomo.php?idsite=...&rec=1`) is rendered at the end of `<body>`, so visits from browsers with JavaScript disabled are still counted.

### 8. Legal pages (Imprint / Privacy Policy)
PRISM ships with imprint and privacy policy templates (`content/imprint.toml` + `content/imprint.md`, `content/privacy.toml` + `content/privacy.md`, plus German versions in `content_de/`). Configure which pages appear as footer links in the `[legal]` section of `content/config.toml`:

```toml
[legal]
# Slugs of legal pages shown in the footer; leave blank or delete a key to hide
imprint = "imprint"
privacy = "privacy"
```

*   Values are page slugs, so the footer links point to `/{slug}`; the footer labels are localized (Imprint / Impressum, Privacy Policy / Datenschenschutzerklärung).
*   Fill in the placeholder legal details (responsible party, address, contact) in the Markdown files. The templates do not constitute legal advice.
*   The "Built with PRISM" reference now lives in the imprint template.
*   The `[legal]` section is always sourced from the default `content/config.toml` and cannot be overridden per locale.

## 📦 Deployment

PRISM is optimized for static deployment.

```bash
npm run build
```

This generates a static `out/` directory that can be hosted anywhere.

👉 **[Read the full Deployment Guide](docs/deployment.md)** for instructions on deploying to **GitHub Pages** and **Cloudflare Pages**.

## 📂 Project Structure

```
PRISM/
├── content/              # All user-editable content (TOML, BibTeX, MD)
├── public/               # Static assets (images, papers)
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/              # Utility functions (parsers, config loaders)
│   └── types/            # TypeScript definitions
├── next.config.ts        # Next.js configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
