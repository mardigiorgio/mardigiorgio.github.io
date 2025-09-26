# Portfolio Site — Personal Portfolio & Blog

## Overview
A clean, fast personal portfolio focused on showcasing projects, writing, and skills. Built with Next.js + MDX and styled with Tailwind, the site highlights work with clear project pages, useful tech tags, and direct GitHub links.

## Features
- **Projects**: Dedicated pages sourced from MDX with title, summary, tech stack, tags, year, cover image, and a GitHub "Source" button beside the title
- **Project Listing**: Filterable grid by tag for quick discovery across work
- **Blog**: MDX posts with reading time and code highlighting for technical write‑ups
- **About**: Headshot with readable bio layout; text wraps around the image on desktop
- **Skills**: Compact overview of tools and languages used
- **Contact**: Formspree form with client‑side validation and success/error states

## Technical Architecture
- **Projects**: Content in `content/projects/*.mdx` with frontmatter including `title`, `summary`, `tech[]`, `year`, `tags[]`, optional `slug`, `repo`, `demo`, `cover`, `gallery[]`
- **Blog Posts**: Content in `content/blog/*.mdx` with `title`, `date`, `tags[]`, optional `slug`, `excerpt`, `cover`
- **GitHub Integration**: When `repo` is present, pages show a GitHub link next to the title

## Links
- Site code: this repository
- GitHub profile: https://github.com/mardigiorgio
