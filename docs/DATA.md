# Data dictionary

The catalog is file-based. Each game and project is a YAML file validated with Zod at build time.

## Directory layout

```text
src/data/
  games/<slug>.yaml
  projects/<slug>.yaml
  generated/github.json   # generated cache, do not edit
  generated/meta.json     # generated sync metadata, do not edit
```

## Game

```yaml
id: doom
title: Doom
aliases: [DOOM, Doom 1993]
year: 1993
platforms: [PC]
genres: [FPS]
series: Doom
developers: [id Software]
publishers: []
description_es: Shooter en primera persona...
description_en: First-person shooter...
featured: true
wikidata: Q189960        # optional
igdb: 1234               # optional
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | Lowercase letters, numbers and hyphens. Used in URLs. |
| `title` | string | yes | Canonical title. |
| `aliases` | string[] | no | Alternative titles, Spanish names, abbreviations. |
| `year` | integer or null | no | Negative values mean BCE. |
| `platforms` | string[] | no | PC, NES, Game Boy, Web, Board, Cards... |
| `genres` | string[] | no | FPS, RPG, Puzzle, Strategy... |
| `series` | string | no | Franchise or series. |
| `developers` | string[] | no | Studios or authors. |
| `publishers` | string[] | no | Optional. |
| `description_es` | string | yes | Max 300 characters. |
| `description_en` | string | yes | Max 300 characters. |
| `featured` | boolean | no | Show on the home page when it has projects. |
| `wikidata` | string | no | Wikidata QID, for future enrichment. |
| `igdb` | string | no | IGDB identifier, for future enrichment. |

## Project

```yaml
id: farama-foundation-vizdoom
name: ViZDoom
repo: Farama-Foundation/ViZDoom
homepage: https://vizdoom.farama.org/
games: [doom]
game_scope: specific
relation: environment
fidelity: n/a
ai_role: research
tech: [reinforcement-learning]
description_es: Entornos de aprendizaje por refuerzo...
description_en: Reinforcement learning environments...
requires_original_game: true
uses_original_assets: true
playable_in_browser: false
license: MIT
links:
  docs: https://vizdoom.farama.org/
  paper: https://arxiv.org/abs/1605.02059
tags: [fps, research]
review_status: approved
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | Stable URL slug. |
| `name` | string | yes | Display name. |
| `repo` | `owner/repo` | yes | GitHub repository, no URL. |
| `homepage` | URL | no | Official site or docs. |
| `games` | slug[] | yes* | Game IDs. Empty only for `game_scope: general`. |
| `game_scope` | enum | no | `specific`, `multi`, `general`. Inferred from `games` if omitted. |
| `relation` | enum | yes | `agent`, `clone`, `mod`, `environment`, `world-model`, `tool`. |
| `fidelity` | enum | no | `exact`, `faithful`, `inspired`, `partial`, `n/a`. Only meaningful for clones. |
| `ai_role` | enum | yes | `built-with-ai`, `runtime`, `research`, `mixed`. |
| `tech` | string[] | no | Controlled tags, see `src/i18n/labels.ts`. |
| `description_es` | string | yes | Max 300 characters. |
| `description_en` | string | yes | Max 300 characters. |
| `requires_original_game` | boolean | no | Default false. |
| `uses_original_assets` | boolean | no | Default false. Legal caution. |
| `playable_in_browser` | boolean | no | Default false. |
| `license` | string | no | SPDX when known. The GitHub cache is used as fallback. |
| `links` | map of URLs | no | `demo`, `docs`, `paper`, `video`, etc. |
| `tags` | string[] | no | Free-form but short. |
| `review_status` | enum | no | `approved`, `pending`, `rejected`. Only `approved` is published. |

`repo` is normalized to lowercase for the GitHub cache lookup. The site generates `https://github.com/<repo>` and adds the metadata from `src/data/generated/github.json`.

## Enumerations

### relation

| Value | Meaning | Example |
|---|---|---|
| `agent` | AI plays the game | Stockfish, Voyager |
| `clone` | Recreation or remake, often built with AI | Claude of Duty, Kart Royale |
| `mod` | AI added to the original game | Mantella, SkyrimNet |
| `environment` | Training/evaluation environment or API | ViZDoom, PySC2 |
| `world-model` | Generative model that simulates the game | GameNGen repro |
| `tool` | Framework or tooling for AI in the game | Mineflayer, RLBot |

### ai_role

| Value | Meaning |
|---|---|
| `built-with-ai` | The project was built with AI assistance (vibe coding, LLM-assisted development). |
| `runtime` | AI is part of the experience (NPCs, generation, bots). |
| `research` | AI is trained or evaluated for research. |
| `mixed` | More than one of the above is central. |

### fidelity

Only for `relation: clone`.

| Value | Meaning |
|---|---|
| `exact` | Exact copy or port that uses the original game/assets. |
| `faithful` | Same mechanics, new code/assets. |
| `inspired` | Inspired by the original, not a full recreation. |
| `partial` | A level, minigame or specific feature. |
| `n/a` | Not a clone. |

### game_scope

| Value | Meaning |
|---|---|
| `specific` | Built for one game or a small set of explicitly related games. |
| `multi` | A framework or environment that supports several games. Shown in a separate "Compatible tools" section. |
| `general` | Not tied to a specific game (Gymnasium, ML-Agents). Shown on the tools page. |

## Activity status

The site computes status from the last commit on the default branch (falling back to the last push):

- `active`: last commit ≤ 90 days.
- `maintenance`: ≤ 365 days.
- `dormant`: > 365 days.
- `archived`: GitHub reports the repository as archived.
- `unknown`: no date available.

## GitHub cache

`src/data/generated/github.json` is keyed by lowercase `owner/repo`:

```json
{
  "farama-foundation/vizdoom": {
    "fullName": "Farama-Foundation/ViZDoom",
    "stars": 2112,
    "forks": 460,
    "openIssues": 41,
    "archived": false,
    "license": "MIT",
    "language": "C++",
    "lastCommitAt": "2026-11-21T...",
    "pushedAt": "2026-11-22T...",
    "topics": ["reinforcement-learning", "doom"],
    "fetchedAt": "2026-11-23T..."
  }
}
```

Run `npm run sync:github` to refresh it. The scheduled workflow does this automatically. Never edit it manually.

## Generated public endpoints

`npm run build:search` writes:

- `public/search/games-{es,en}.json` — compact search index.
- `public/search/projects-{es,en}.json` — compact project search index.
- `public/api/games.json` — full game catalog.
- `public/api/projects.json` — full project catalog with GitHub metadata.
- `public/api/meta.json` — generation metadata.
- `public/llms.txt` — short context for AI agents.

These files are generated and gitignored. Use the API if you are building another tool or agent on top of the atlas.

## Adding a project

1. Pick a game ID from `src/data/games/` or add the game first.
2. Create `src/data/projects/<owner-repo>.yaml`.
3. Fill `description_es`, `description_en`, `relation`, `ai_role` and flags.
4. Run `npm run validate`.
5. Run `npm run build` and check the page.

## Adding a game

1. Create `src/data/games/<slug>.yaml`.
2. Add a short description in both languages.
3. Add aliases, year, platforms and genres when known.
4. Run `npm run validate`.
5. Optionally add projects pointing to the new ID.

## Validation rules

`npm run validate` checks:

- Unique game and project IDs.
- Unique repository per project.
- Every game reference exists.
- Scope and game list consistency.
- Clone/fidelity consistency.
- Known tech tags (warnings only).
- Missing GitHub metadata (warnings only).
- Unapproved projects (warning; they should not be published).

The build fails on schema errors. Do not bypass the schema with `any` or unvalidated data.
