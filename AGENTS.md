# AGENTS.md

Instructions for AI coding agents and human contributors working on Game AI Atlas.

## What this project is

A static, bilingual directory of open-source AI projects based on existing video games. The site is built with Astro and deployed to GitHub Pages. Data is curated in YAML and GitHub metadata is synced into a generated cache.

Read these first:

- `README.md`
- `docs/DATA.md`
- `docs/TAXONOMY.md`
- `docs/DESIGN.md`
- `docs/PLAN.md`

## Commands

```bash
npm install
npm run dev
npm run validate
npm run check
npm run build
npm run sync:github
```

Run `npm run validate` and `npm run build` before proposing changes. `npm run check` should stay at zero errors.

## Data rules

- The source of truth is `src/data/games/*.yaml` and `src/data/projects/*.yaml`.
- Do not edit `src/data/generated/github.json` or `src/data/generated/meta.json` by hand. They are produced by the sync script.
- Do not edit generated search files in `public/search/`, the generated API in `public/api/`, or `public/llms.txt`.
- One YAML file per game or project. Use stable slugs.
- `repo` is always `owner/repo`, not a full URL.
- Descriptions must be short, factual and available in both `description_es` and `description_en`.
- Do not invent stars, commit dates, licenses, papers or project relationships. If you are not sure, leave the project out or mark `review_status: pending` and explain why in the PR.
- Every project must reference at least one existing game, except `game_scope: general` tools.
- Use `game_scope: multi` only when a project genuinely supports multiple games.
- Never add ROMs, ISOs, original assets, piracy links or malware.
- Keep the legal disclaimer and the "links only" policy.

## Classification rules

Read `docs/TAXONOMY.md`. In short:

- `agent`: AI plays the game.
- `clone`: AI-built or AI-assisted recreation/remake of the game.
- `mod`: AI added to the original game.
- `environment`: training/evaluation environment or benchmark.
- `world-model`: generative model that simulates the game.
- `tool`: framework or tooling for AI in the game.
- `ai_role`: `built-with-ai`, `runtime`, `research` or `mixed`.
- `fidelity`: only for clones; `exact`, `faithful`, `inspired`, `partial` or `n/a`.

## Code conventions

- TypeScript strict mode. Avoid `any`; add types for new data shapes.
- Keep Astro components small and composable. Page views live in `src/components/pages`.
- UI strings go in `src/i18n/ui.ts`. Taxonomy labels go in `src/i18n/labels.ts`.
- Follow `docs/DESIGN.md`: Fraunces for display, IBM Plex Sans for body, IBM Plex Mono for labels, warm paper/ink/vermilion palette, hairlines and index numbers. Do not add gradients, glassmorphism, purple SaaS styling or generic rounded card grids.
- Use the existing CSS variables and utility classes. Keep the design minimal and accessible.
- Client scripts are plain JavaScript with `// @ts-nocheck` only where DOM typing would add noise. Prefer extracting real logic to typed modules if it grows.
- Use `withBase()` for internal links and assets so GitHub Pages project paths work.
- Keep the site static. Do not add a backend, database, auth or client-side framework without a strong reason.
- Do not add tracking, ads or third-party scripts.

## Bilingual checklist

For every user-facing change:

- Add Spanish and English strings.
- Add `description_es` and `description_en` for new data.
- Check the language switch on the affected page.
- Check `hreflang` and canonical paths on new routes.

## Testing checklist

1. `npm run validate`
2. `npm run check`
3. `npm run build`
4. Open `/es/` and `/en/`.
5. Search for a game and a project.
6. Open a game with specific projects and one with only compatible tools.
7. Test the game filters and sort.
8. Check the 404 page.
9. Check mobile width around 360 px.

## Pull request style

- Keep PRs focused: one data batch or one feature.
- Explain the source of every new project and the relationship with the game.
- Mention any unverified metadata.
- Include screenshots or a short description for UI changes.
- Do not reformat unrelated files.

## Deployment

The `Deploy` workflow publishes on pushes to `main`. The `Sync GitHub data` workflow runs daily, updates the cache, commits it and redeploys. If scheduled workflows stop after a long period of repo inactivity, run the sync manually with `workflow_dispatch`.

## When in doubt

Prefer fewer, better-curated entries over a large list of false positives. The product's value is trust, clarity and a fast search, not raw volume.
