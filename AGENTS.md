# Repository Guidelines

## Structure
- Site content: `docs/`
- VitePress config/theme: `docs/.vitepress/`
- Posts: `docs/posts/<category>/<slug>.md`
- Pages: `docs/pages/`
- Assets: `docs/public/`
- Scripts: `scripts/`

## Commands
- `pnpm dev` — local dev server
- `pnpm build` — build site
- `pnpm preview` — preview build
- `pnpm lint` — lint theme code
- `pnpm new` or `pnpm new -- <category> <title> [slug]` — new post

## Style & Naming
- TypeScript/Vue for theme, Markdown for content.
- Follow existing 2-space indentation.
- Post slugs are kebab-case.

## Testing
- No automated tests currently.

## Commits & PRs
- Use short, imperative commits; often `feat:`, `fix:`, `chore:`, `style:`.
- PRs: brief summary + screenshots for UI changes.

## Notes
- RSS generated at build time from frontmatter.
- `date` should be `YYYY-MM-DD` or `YYYY-MM-DD HH:mm:ss`.
