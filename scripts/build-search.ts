import fs from "node:fs/promises";
import path from "node:path";
import { buildData } from "../src/lib/data";
import {
  formatCompact,
  formatRelative,
  relationLabel,
  relationTones,
  statusLabel,
  statusTones
} from "../src/lib/format";
import type { Lang } from "../src/i18n/types";

const LANGS: Lang[] = ["es", "en"];
const base = (process.env.BASE_PATH ?? "/").replace(/\/$/, "");
const site = process.env.SITE_URL ?? "http://localhost:4321";
const withBase = (route: string) => `${base}${route}`;
const absolute = (route: string) => new URL(withBase(route), site).toString();

const data = buildData();
const now = new Date();
const outputDir = path.join(process.cwd(), "public", "search");
const apiDir = path.join(process.cwd(), "public", "api");
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(apiDir, { recursive: true });

for (const lang of LANGS) {
  const games = data.games.map((game) => {
    const lastActivityLabel = formatRelative(game.lastActivity, lang, now);
    return {
      id: game.id,
      slug: game.id,
      title: game.title,
      aliases: [game.title, ...game.aliases, game.series ?? ""].join(" "),
      year: game.year ?? null,
      platforms: game.platforms.join(" "),
      genres: game.genres.join(" "),
      description:
        lang === "es" ? game.description_es : game.description_en,
      projectCount: game.projectCount,
      activeCount: game.activeCount,
      lastActivity: game.lastActivity,
      lastActivityLabel: lastActivityLabel ?? "—",
      wanted: game.wanted,
      url: withBase(
        lang === "es" ? `/es/juegos/${game.id}/` : `/en/games/${game.id}/`
      )
    };
  });

  const projects = data.projects.map((project) => {
    const lastActivityLabel = formatRelative(
      project.lastCommitAt,
      lang,
      now
    );
    const nameTokens = [
      project.name,
      ...project.name
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
        .split(/[\s\-_/]+/)
        .filter(Boolean)
    ].join(" ");
    return {
      id: project.id,
      slug: project.id,
      name: project.name,
      nameTokens,
      repo: project.repo,
      description:
        lang === "es" ? project.description_es : project.description_en,
      games: project.gameTitles.join(", "),
      gameIds: project.games,
      relation: project.relation,
      relationLabel: relationLabel(project.relation, lang),
      relationTone: relationTones[project.relation],
      status: project.status,
      statusLabel: statusLabel(project.status, lang),
      statusTone: statusTones[project.status],
      tags: project.tags.join(" "),
      tech: project.tech.join(" "),
      stars: project.stars,
      starsLabel: formatCompact(project.stars, lang),
      lastActivity: project.lastCommitAt,
      lastActivityLabel: lastActivityLabel ?? "—",
      archived: project.archived,
      hasDemo: project.hasDemo,
      url: withBase(
        lang === "es"
          ? `/es/proyectos/${project.id}/`
          : `/en/projects/${project.id}/`
      )
    };
  });

  await fs.writeFile(
    path.join(outputDir, `games-${lang}.json`),
    JSON.stringify(games),
    "utf8"
  );
  await fs.writeFile(
    path.join(outputDir, `projects-${lang}.json`),
    JSON.stringify(projects),
    "utf8"
  );
}

const meta = {
  generatedAt: new Date().toISOString(),
  games: data.stats.totalGames,
  projects: data.stats.totalProjects,
  updatedAt: data.stats.updatedAt,
  source: data.stats.source,
  license: "CC BY 4.0",
  endpoints: {
    games: absolute("/api/games.json"),
    projects: absolute("/api/projects.json"),
    meta: absolute("/api/meta.json"),
    searchEs: absolute("/search/games-es.json"),
    searchEn: absolute("/search/games-en.json")
  }
};

await fs.writeFile(
  path.join(outputDir, "meta.json"),
  JSON.stringify(meta, null, 2),
  "utf8"
);

const apiGames = data.games.map((game) => ({
  id: game.id,
  title: game.title,
  aliases: game.aliases,
  year: game.year ?? null,
  platforms: game.platforms,
  genres: game.genres,
  series: game.series ?? null,
  developers: game.developers,
  publishers: game.publishers,
  descriptions: {
    es: game.description_es,
    en: game.description_en
  },
  projectCount: game.projectCount,
  specificCount: game.specificCount,
  compatibleCount: game.compatibleCount,
  activeCount: game.activeCount,
  lastActivity: game.lastActivity,
  wanted: game.wanted,
  urls: {
    es: absolute(`/es/juegos/${game.id}/`),
    en: absolute(`/en/games/${game.id}/`)
  }
}));

const apiProjects = data.projects.map((project) => ({
  id: project.id,
  name: project.name,
  repo: project.repo,
  repoUrl: project.repoUrl,
  homepage: project.homepageUrl,
  gameIds: project.games,
  gameTitles: project.gameTitles,
  gameScope: project.gameScope,
  relation: project.relation,
  fidelity: project.fidelity ?? "n/a",
  aiRole: project.ai_role,
  tech: project.tech,
  tags: project.tags,
  descriptions: {
    es: project.description_es,
    en: project.description_en
  },
  requiresOriginalGame: project.requires_original_game,
  usesOriginalAssets: project.uses_original_assets,
  playableInBrowser: project.playable_in_browser,
  hasDemo: project.hasDemo,
  license: project.license,
  links: project.links ?? {},
  stars: project.stars,
  forks: project.forks,
  openIssues: project.openIssues,
  archived: project.archived,
  language: project.language,
  lastCommitAt: project.lastCommitAt,
  status: project.status,
  reviewStatus: project.review_status,
  urls: {
    es: absolute(`/es/proyectos/${project.id}/`),
    en: absolute(`/en/projects/${project.id}/`)
  }
}));

await fs.writeFile(
  path.join(apiDir, "games.json"),
  JSON.stringify(
    {
      generatedAt: meta.generatedAt,
      license: meta.license,
      count: apiGames.length,
      games: apiGames
    },
    null,
    2
  ),
  "utf8"
);

await fs.writeFile(
  path.join(apiDir, "projects.json"),
  JSON.stringify(
    {
      generatedAt: meta.generatedAt,
      license: meta.license,
      count: apiProjects.length,
      projects: apiProjects
    },
    null,
    2
  ),
  "utf8"
);

await fs.writeFile(
  path.join(apiDir, "meta.json"),
  JSON.stringify(meta, null, 2),
  "utf8"
);

const llms = `# Game AI Atlas

> Open, bilingual directory of open-source AI projects based on existing video games.

Game AI Atlas indexes agents, clones, mods, training environments, world models and tools, with the latest GitHub activity, license and practical requirements.

## Start here

- Spanish: ${absolute("/es/")}
- English: ${absolute("/en/")}
- All games: ${absolute("/es/juegos/")}
- Tools and frameworks: ${absolute("/es/herramientas/")}

## Machine-readable data

- Games JSON: ${absolute("/api/games.json")}
- Projects JSON: ${absolute("/api/projects.json")}
- Metadata: ${absolute("/api/meta.json")}
- Search index (Spanish): ${absolute("/search/games-es.json")}
- Search index (English): ${absolute("/search/games-en.json")}
- Search projects (Spanish): ${absolute("/search/projects-es.json")}
- Search projects (English): ${absolute("/search/projects-en.json")}

## Data notes

- Curated data license: CC BY 4.0.
- GitHub metadata is fetched from the public API and may be stale by up to one day.
- The site links to third-party projects and does not host ROMs, ISOs, game assets or third-party code.
- Some projects require a legal copy of the original game.

## Source

https://github.com/pablowdev/game-ai-atlas
`;

await fs.writeFile(path.join(process.cwd(), "public", "llms.txt"), llms, "utf8");

console.log(
  `Search index + API: ${data.stats.totalGames} games, ${data.stats.totalProjects} projects, ${LANGS.length} languages.`
);
