import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { z } from "zod";
import {
  GameSchema,
  GitHubMetaSchema,
  MetaSchema,
  ProjectSchema,
  type ActivityStatus,
  type Game,
  type GameScope,
  type GitHubMeta,
  type Meta,
  type Project
} from "./schema";
import { statusFromDate, statusPriority } from "./format";

export type ProjectView = Omit<Project, "license"> & {
  repoKey: string;
  repoUrl: string;
  stars: number | null;
  forks: number | null;
  openIssues: number | null;
  archived: boolean;
  license: string | null;
  language: string | null;
  lastCommitAt: string | null;
  status: ActivityStatus;
  homepageUrl: string | null;
  hasDemo: boolean;
  fetchedAt: string | null;
  gameScope: GameScope;
  gameTitles: string[];
};

export type GameView = Game & {
  specificProjects: ProjectView[];
  compatibleProjects: ProjectView[];
  allProjects: ProjectView[];
  projectCount: number;
  specificCount: number;
  compatibleCount: number;
  activeCount: number;
  lastActivity: string | null;
  wanted: boolean;
};

export type SiteStats = {
  totalGames: number;
  totalProjects: number;
  gamesWithProjects: number;
  activeProjects: number;
  archivedProjects: number;
  totalStars: number;
  updatedAt: string | null;
  source: string;
};

export type SiteData = {
  games: GameView[];
  projects: ProjectView[];
  gamesById: Map<string, GameView>;
  projectsById: Map<string, ProjectView>;
  stats: SiteStats;
  meta: Meta;
  featuredGames: GameView[];
  popularGames: GameView[];
  recentProjects: ProjectView[];
  generalProjects: ProjectView[];
  multiProjects: ProjectView[];
  gamesByInitial: Map<string, GameView[]>;
};

const DATA_ROOT = path.join(process.cwd(), "src", "data");

function stripBom(value: string): string {
  return value.replace(/^\uFEFF/, "");
}

function readYamlDir<T>(directory: string, schema: z.ZodType<T>): T[] {
  const fullPath = path.join(DATA_ROOT, directory);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((file) => /\.ya?ml$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const raw = stripBom(
        fs.readFileSync(path.join(fullPath, file), "utf8")
      );
      let parsed: unknown;
      try {
        parsed = YAML.parse(raw);
      } catch (error) {
        throw new Error(`No se pudo leer ${directory}/${file}: ${String(error)}`);
      }
      const result = schema.safeParse(parsed);
      if (!result.success) {
        const issues = result.error.issues
          .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
          .join("; ");
        throw new Error(`Datos inválidos en ${directory}/${file}: ${issues}`);
      }
      return result.data;
    });
}

export function loadGames(): Game[] {
  return readYamlDir("games", GameSchema);
}

export function loadProjects(): Project[] {
  return readYamlDir("projects", ProjectSchema);
}

export function loadGitHubCache(): Record<string, GitHubMeta> {
  const file = path.join(DATA_ROOT, "generated", "github.json");
  if (!fs.existsSync(file)) return {};
  const raw = stripBom(fs.readFileSync(file, "utf8"));
  const parsed = JSON.parse(raw);
  const result = z.record(z.string(), GitHubMetaSchema).safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `Cache de GitHub inválida: ${result.error.issues
        .map((issue) => issue.message)
        .join("; ")}`
    );
  }
  return result.data;
}

export function loadMeta(): Meta {
  const file = path.join(DATA_ROOT, "generated", "meta.json");
  if (!fs.existsSync(file)) {
    return { updatedAt: null, source: "unknown", repoCount: 0 };
  }
  const raw = stripBom(fs.readFileSync(file, "utf8"));
  const parsed = JSON.parse(raw);
  return MetaSchema.parse(parsed);
}

export function normalizeRepo(repo: string): string {
  return repo
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\.git$/i, "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

function inferScope(project: Project): GameScope {
  if (project.game_scope) return project.game_scope;
  if (project.games.length === 0) return "general";
  return project.games.length === 1 ? "specific" : "multi";
}

function safeHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? value
      : null;
  } catch {
    return null;
  }
}

function maxIso(values: Array<string | null | undefined>): string | null {
  let best: string | null = null;
  let bestTime = -1;
  for (const value of values) {
    if (!value) continue;
    const time = Date.parse(value);
    if (Number.isNaN(time)) continue;
    if (time > bestTime) {
      best = value;
      bestTime = time;
    }
  }
  return best;
}

function sortProjects(a: ProjectView, b: ProjectView): number {
  const status = statusPriority[a.status] - statusPriority[b.status];
  if (status !== 0) return status;

  const aTime = a.lastCommitAt ? Date.parse(a.lastCommitAt) : 0;
  const bTime = b.lastCommitAt ? Date.parse(b.lastCommitAt) : 0;
  if (aTime !== bTime) return bTime - aTime;

  const aStars = a.stars ?? -1;
  const bStars = b.stars ?? -1;
  if (aStars !== bStars) return bStars - aStars;

  return a.name.localeCompare(b.name, "es");
}

function resolveProject(
  project: Project,
  cache: Record<string, GitHubMeta>
): ProjectView {
  const repoKey = normalizeRepo(project.repo);
  const meta = cache[repoKey];
  const lastCommitAt = meta?.lastCommitAt ?? meta?.pushedAt ?? null;
  const archived = meta?.archived ?? false;
  const gameScope = inferScope(project);
  const rawLicense = project.license ?? meta?.license ?? null;
  const license =
    rawLicense && rawLicense !== "NOASSERTION" ? rawLicense : null;
  const homepageUrl = safeHttpUrl(
    project.homepage ?? meta?.homepage ?? null
  );

  return {
    ...project,
    repoKey,
    repoUrl: `https://github.com/${project.repo}`,
    stars: meta?.stars ?? null,
    forks: meta?.forks ?? null,
    openIssues: meta?.openIssues ?? null,
    archived,
    license,
    language: meta?.language ?? null,
    lastCommitAt,
    status: statusFromDate(lastCommitAt, archived),
    homepageUrl: homepageUrl || null,
    hasDemo: Boolean(project.links?.demo),
    fetchedAt: meta?.fetchedAt ?? null,
    gameScope,
    gameTitles: []
  };
}

function resolveGame(game: Game, projects: ProjectView[]): GameView {
  const specific = projects
    .filter(
      (project) =>
        project.gameScope === "specific" && project.games.includes(game.id)
    )
    .sort(sortProjects);
  const compatible = projects
    .filter(
      (project) =>
        project.gameScope === "multi" && project.games.includes(game.id)
    )
    .sort(sortProjects);
  const all = [...specific, ...compatible];

  return {
    ...game,
    specificProjects: specific,
    compatibleProjects: compatible,
    allProjects: all,
    projectCount: all.length,
    specificCount: specific.length,
    compatibleCount: compatible.length,
    activeCount: all.filter((project) => project.status === "active").length,
    lastActivity: maxIso(all.map((project) => project.lastCommitAt)),
    wanted: all.length === 0
  };
}

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`${label} duplicado: ${value}`);
    }
    seen.add(value);
  }
}

function firstLetter(title: string): string {
  const normalized = title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .charAt(0)
    .toUpperCase();
  return /^[A-Z]$/.test(normalized) ? normalized : "#";
}

export function buildData(): SiteData {
  const games = loadGames();
  const allProjects = loadProjects();
  const cache = loadGitHubCache();
  const meta = loadMeta();

  assertUnique(games.map((game) => game.id), "Juego");
  assertUnique(allProjects.map((project) => project.id), "Proyecto");
  assertUnique(
    allProjects.map((project) => normalizeRepo(project.repo)),
    "Repositorio"
  );

  const gameById = new Map(games.map((game) => [game.id, game]));

  for (const project of allProjects) {
    for (const gameId of project.games) {
      if (!gameById.has(gameId)) {
        throw new Error(
          `El proyecto ${project.id} referencia un juego inexistente: ${gameId}`
        );
      }
    }
    const scope = inferScope(project);
    if (scope === "general" && project.games.length > 0) {
      throw new Error(
        `El proyecto ${project.id} es general pero tiene juegos asignados.`
      );
    }
    if (scope !== "general" && project.games.length === 0) {
      throw new Error(
        `El proyecto ${project.id} no tiene juegos asignados.`
      );
    }
  }

  const projects = allProjects.filter(
    (project) => project.review_status === "approved"
  );

  const projectViews = projects.map((project) =>
    resolveProject(project, cache)
  );

  for (const project of projectViews) {
    project.gameTitles = project.games.map(
      (gameId) => gameById.get(gameId)?.title ?? gameId
    );
  }

  const gamesWithProjects = games
    .map((game) => resolveGame(game, projectViews))
    .sort((a, b) => a.title.localeCompare(b.title, "es"));

  const gamesById = new Map(gamesWithProjects.map((game) => [game.id, game]));
  const projectsById = new Map(
    projectViews.map((project) => [project.id, project])
  );

  const totalStars = projectViews.reduce(
    (sum, project) => sum + (project.stars ?? 0),
    0
  );

  const stats: SiteStats = {
    totalGames: gamesWithProjects.length,
    totalProjects: projectViews.length,
    gamesWithProjects: gamesWithProjects.filter((game) => !game.wanted).length,
    activeProjects: projectViews.filter(
      (project) => project.status === "active"
    ).length,
    archivedProjects: projectViews.filter(
      (project) => project.status === "archived"
    ).length,
    totalStars,
    updatedAt: meta.updatedAt ?? null,
    source: meta.source
  };

  const sortedByActivity = [...projectViews].sort((a, b) => {
    const aTime = a.lastCommitAt ? Date.parse(a.lastCommitAt) : 0;
    const bTime = b.lastCommitAt ? Date.parse(b.lastCommitAt) : 0;
    return bTime - aTime;
  });

  const featuredGames = gamesWithProjects
    .filter((game) => game.featured)
    .sort(
      (a, b) =>
        b.activeCount - a.activeCount ||
        b.projectCount - a.projectCount ||
        a.title.localeCompare(b.title, "es")
    );

  for (const game of gamesWithProjects) {
    if (featuredGames.length >= 6) break;
    if (!game.wanted && !featuredGames.includes(game)) {
      featuredGames.push(game);
    }
  }

  const popularGames = [...gamesWithProjects]
    .sort(
      (a, b) =>
        b.projectCount - a.projectCount ||
        b.activeCount - a.activeCount ||
        a.title.localeCompare(b.title, "es")
    )
    .slice(0, 8);

  const recentProjects = sortedByActivity
    .filter((project) => project.lastCommitAt)
    .slice(0, 8);

  const generalProjects = projectViews
    .filter((project) => project.gameScope === "general")
    .sort(sortProjects);
  const multiProjects = projectViews
    .filter((project) => project.gameScope === "multi")
    .sort(sortProjects);

  const gamesByInitial = new Map<string, GameView[]>();
  for (const game of gamesWithProjects) {
    const letter = firstLetter(game.title);
    const list = gamesByInitial.get(letter) ?? [];
    list.push(game);
    gamesByInitial.set(letter, list);
  }

  return {
    games: gamesWithProjects,
    projects: projectViews,
    gamesById,
    projectsById,
    stats,
    meta,
    featuredGames: featuredGames.slice(0, 8),
    popularGames,
    recentProjects,
    generalProjects,
    multiProjects,
    gamesByInitial
  };
}

const isDev =
  typeof import.meta !== "undefined" &&
  Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);

let cached: SiteData | null = null;

export function getData(): SiteData {
  if (isDev) return buildData();
  if (!cached) cached = buildData();
  return cached;
}

export function getGame(slug: string): GameView | undefined {
  return getData().gamesById.get(slug);
}

export function getProject(slug: string): ProjectView | undefined {
  return getData().projectsById.get(slug);
}

export function getProjectGames(project: ProjectView): GameView[] {
  const data = getData();
  return project.games
    .map((gameId) => data.gamesById.get(gameId))
    .filter((game): game is GameView => Boolean(game));
}

export function getRelatedGames(game: GameView, limit = 3): GameView[] {
  const data = getData();
  return data.games
    .filter((candidate) => candidate.id !== game.id)
    .map((candidate) => {
      let score = 0;
      if (game.series && candidate.series === game.series) score += 5;
      const sharedGenres = candidate.genres.filter((genre) =>
        game.genres.includes(genre)
      ).length;
      score += sharedGenres * 2;
      const sharedDevelopers = candidate.developers.filter((developer) =>
        game.developers.includes(developer)
      ).length;
      score += sharedDevelopers * 2;
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.projectCount - a.candidate.projectCount ||
        a.candidate.title.localeCompare(b.candidate.title, "es")
    )
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getRelatedProjects(
  project: ProjectView,
  limit = 4
): ProjectView[] {
  const data = getData();
  const gameIds = new Set(project.games);
  return data.projects
    .filter(
      (candidate) =>
        candidate.id !== project.id &&
        candidate.games.some((gameId) => gameIds.has(gameId))
    )
    .sort(sortProjects)
    .slice(0, limit);
}
