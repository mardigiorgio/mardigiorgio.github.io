# Marco DiGiorgio — Portfolio

A fast, static-exported personal site built with Next.js (App Router), MDX content, and Tailwind CSS. It features project pages with GitHub links, an MDX blog with syntax highlighting and reading time, an About page, a skills section, and a Formspree-powered contact form.

## Features
- Projects: MDX frontmatter with tech, tags, year, cover, and `repo` link button
- Blog: MDX posts with reading time and pretty code blocks
- About: Headshot with wrapped bio text
- Skills: Simple skills grid and filters
- Contact: Formspree integration with client-side submit + states
- Static export: Optimized to deploy anywhere (GitHub Pages, Netlify, etc.)

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (+ Typography plugin)
- MDX via `next-mdx-remote` + `rehype-pretty-code`/Shiki
- Gray-matter for frontmatter and `reading-time`

## Quick Start

Using pnpm (recommended):

```bash
pnpm install
pnpm dev
```

Using npm:

```bash
npm install
npm run dev
```

## Build and Preview (Static Export)

```bash
# Builds RSS and exports to ./out (see next.config.mjs)
pnpm build

# Preview the static build locally
pnpm dlx serve -s out
# or: npx serve -s out
```

## Content Authoring

- Projects live in `content/projects/*.mdx`
  - Required frontmatter: `title`, `summary`, `tech[]`, `year`, `tags[]`
  - Optional: `slug` (recommended when `output: 'export'`), `repo`, `demo`, `cover`, `gallery[]`
  - The project page shows a “Source” button on the right of the title when `repo` is set.

- Blog posts live in `content/blog/*.mdx`
  - Required: `title`, `date`, `tags[]`
  - Recommended for static export: `slug`
  - Optional: `excerpt`, `cover`

## Configuration

- Base path: set `NEXT_PUBLIC_BASE_PATH` or `BASE_PATH` for subfolder deploys (GitHub Pages).
- Social links: edit `data/socials.json` (GitHub, LinkedIn for the navbar icons).
- Contact form: update the Formspree endpoint in `components/ContactForm.tsx`.
  - Current endpoint: `https://formspree.io/f/xyzdogoz`
  - Add your production domain in Formspree Allowed Domains and verify the form email.

## Useful Scripts

- `pnpm dev` – run local dev server
- `pnpm rss` – generate `public/rss.xml`
- `pnpm build` – generate RSS then static export to `out/`
- `npm run start` – serve `out/` (requires `serve` or use `pnpm dlx serve -s out`)

## Deploy

Because this site uses `output: 'export'`, deployment is a matter of serving the static `out/` directory.
- GitHub Pages: push `out/` to `gh-pages` branch or use an action to deploy after build
- Netlify/Vercel/Cloudflare: configure build to run `pnpm build` and publish `out/`

---

If you’d like me to add CI (GitHub Actions) for automatic static deploys, say the word and I’ll wire it up.
