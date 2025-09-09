# Marco DiGiorgio — Portfolio

A clean, fast personal portfolio focused on showcasing projects, writing, and skills. Built with Next.js + MDX and styled with Tailwind, the site highlights your work with clear project pages, useful tech tags, and direct GitHub links.

## Features
- Projects: Dedicated pages sourced from MDX with title, summary, tech stack, tags, year, cover image, and a GitHub “Source” button beside the title.
- Project Listing: Filterable grid by tag for quick discovery across your work.
- Blog: MDX posts with reading time and pretty code highlighting for technical write‑ups.
- About: Headshot with a readable bio layout; text wraps around the image on desktop.
- Skills: Compact overview of tools and languages you use most.
- Contact: Simple Formspree form with client‑side validation and success/error states.

## Portfolio Content Model
- Projects live in `content/projects/*.mdx` with frontmatter like:
  - `title`, `summary`, `tech[]`, `year`, `tags[]`, optional `slug`, `repo`, `demo`, `cover`, `gallery[]`
  - When `repo` is present, the page shows a GitHub link next to the title.
- Blog posts live in `content/blog/*.mdx` with `title`, `date`, `tags[]`, optional `slug`, `excerpt`, `cover`.

## Links
- Site code: this repository
- GitHub profile: https://github.com/mardigiorgio
