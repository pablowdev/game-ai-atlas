# Contributing

Thanks for helping build Game AI Atlas. The catalog is only as good as its curation.

## Ways to contribute

- **Add a project** with the [Add project](https://github.com/pablowdev/game-ai-atlas/issues/new?template=add-project.yml) issue form.
- **Add a game** with the [Add game](https://github.com/pablowdev/game-ai-atlas/issues/new?template=add-game.yml) issue form.
- **Send a pull request** with the YAML and, if needed, the UI change.
- **Fix data**: stale links, wrong license, wrong classification, missing aliases.
- **Improve the site**: accessibility, search, performance, bilingual copy.

## Before you add a project

Check that:

1. The repository is public and open source.
2. The license is visible.
3. AI is central to the project.
4. The relationship with the game is verifiable from the README, the demo or a paper.
5. It is not a fork without meaningful changes.
6. It does not distribute ROMs, ISOs, original assets or malware.
7. The project is not already listed under another repository.

If the project is borderline, open an issue and explain the doubt. It is better to discuss than to add a false positive.

## Add a project with a pull request

1. Find the game ID in `src/data/games/`. If the game does not exist, add it first.
2. Create `src/data/projects/<owner-repo>.yaml`. Use lowercase and hyphens.
3. Copy this template and fill it:

```yaml
id: owner-repo
name: Project name
repo: owner/repo
homepage: https://example.com
games: [doom]
game_scope: specific
relation: environment
fidelity: n/a
ai_role: research
tech: [reinforcement-learning]
description_es: Una descripción breve y objetiva en español.
description_en: A short, objective description in English.
requires_original_game: true
uses_original_assets: true
playable_in_browser: false
license: MIT
links:
  docs: https://example.com/docs
  paper: https://arxiv.org/abs/...
tags: [fps, research]
review_status: approved
```

4. Run:

```bash
npm run validate
npm run check
npm run build
```

5. Open a pull request. Explain the source of the project, the relationship with the game and any unverified field.

## Add a game

1. Create `src/data/games/<slug>.yaml`.
2. Add the title, year, platforms, genres, aliases and descriptions in both languages.
3. If you have a Wikidata or IGDB ID, add it.
4. Run `npm run validate`.
5. Add projects that reference the new game ID.

## Classification

Read [docs/TAXONOMY.md](./docs/TAXONOMY.md). The most common mistakes are:

- Using `agent` for an environment that only exposes the game. Use `environment`.
- Using `clone` for a mod. Use `mod`.
- Using `specific` for a framework that supports many games. Use `multi`.
- Claiming `exact` fidelity for an inspired remake. Use `inspired`.
- Marking `built-with-ai` when AI runs inside the game. Use `runtime`.

## Descriptions

- Spanish and English are required.
- Maximum 300 characters per description.
- Start with what the project does, not with marketing.
- Mention the AI technique when it is central.
- Do not copy the GitHub description verbatim if it is vague; write a clear summary.
- Link the original source for claims.

## GitHub metadata

Do not edit `src/data/generated/github.json`. The sync script fetches:

- Stars, forks and open issues.
- Archived status and detected license.
- Primary language.
- Last commit on the default branch.
- Topics, homepage and description.

If the metadata is wrong, open an issue. If the repository moved, update `repo` in the project YAML.

## Code changes

- Use TypeScript strict mode.
- Keep the site static. No backend, database or auth.
- Add UI strings in `src/i18n/ui.ts` for both languages.
- Use `withBase()` for internal links.
- Keep the visual design minimal and accessible.
- Do not add tracking or third-party scripts.

## Review checklist

- [ ] The YAML validates.
- [ ] The project is open source and the license is visible.
- [ ] The game relationship is clear.
- [ ] The description is factual and bilingual.
- [ ] No ROMs, ISOs, assets or piracy links.
- [ ] The repository is not a duplicate.
- [ ] The page builds and the language switch works.
- [ ] The data is not presented as guaranteed or endorsed.

## Code of conduct

Be respectful, assume good faith and focus on the data. Harassment, discrimination and spam are not welcome. Maintainers may close contributions that do not meet the inclusion criteria.
