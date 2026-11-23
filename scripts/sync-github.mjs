import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

/**
 * Refreshes src/data/generated/github.json from the GitHub REST API.
 *
 * Local usage:
 *   $env:GH_TOKEN = (gh auth token); npm run sync:github
 *
 * In GitHub Actions, GITHUB_TOKEN is provided automatically. For a few
 * thousand repositories, use a read-only PAT to get a higher rate limit.
 */

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  console.error(
    "Falta GH_TOKEN o GITHUB_TOKEN. Ejecuta: $env:GH_TOKEN = (gh auth token)"
  );
  process.exit(1);
}

const root = process.cwd();
const projectsDir = path.join(root, "src", "data", "projects");
const generatedDir = path.join(root, "src", "data", "generated");
const cachePath = path.join(generatedDir, "github.json");
const metaPath = path.join(generatedDir, "meta.json");

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "game-ai-atlas-sync",
  "X-GitHub-Api-Version": "2022-11-28"
};

function normalizeRepo(repo) {
  return repo
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\.git$/i, "")
    .replace(/^\/+|\/+$/g, "");
}

async function readProjectRepos() {
  const files = (await fs.readdir(projectsDir)).filter((file) =>
    /\.ya?ml$/i.test(file)
  );
  const repos = new Map();
  for (const file of files) {
    const raw = (await fs.readFile(path.join(projectsDir, file), "utf8")).replace(
      /^\uFEFF/,
      ""
    );
    const project = YAML.parse(raw);
    if (!project?.repo) continue;
    const repo = normalizeRepo(project.repo);
    if (!repos.has(repo.toLowerCase())) {
      repos.set(repo.toLowerCase(), repo);
    }
  }
  return [...repos.values()];
}

async function readExistingCache() {
  try {
    const raw = (await fs.readFile(cachePath, "utf8")).replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, attempt = 0) {
  const res = await fetch(url, { headers });
  if (res.ok) return res.json();

  if (res.status === 404) {
    const error = new Error(`404 ${url}`);
    error.status = 404;
    throw error;
  }

  if ((res.status === 403 || res.status === 429 || res.status >= 500) && attempt < 3) {
    const retryAfter = Number(res.headers.get("retry-after"));
    const wait = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 1000 * 2 ** attempt + Math.random() * 500;
    console.error(`  retry ${res.status} in ${Math.round(wait)}ms: ${url}`);
    await sleep(wait);
    return fetchJson(url, attempt + 1);
  }

  const body = await res.text();
  throw new Error(`${res.status} ${url}: ${body.slice(0, 200)}`);
}

async function fetchRepo(repo) {
  const data = await fetchJson(`https://api.github.com/repos/${repo}`);
  let lastCommitAt = null;

  try {
    const commits = await fetchJson(
      `https://api.github.com/repos/${data.full_name}/commits?per_page=1&sha=${encodeURIComponent(
        data.default_branch
      )}`
    );
    lastCommitAt = commits[0]?.commit?.committer?.date ?? null;
  } catch (error) {
    console.error(`  no se pudo leer el último commit de ${repo}: ${error.message}`);
  }

  return {
    fullName: data.full_name,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    archived: Boolean(data.archived),
    license: data.license?.spdx_id ?? null,
    language: data.language ?? null,
    lastCommitAt: lastCommitAt ?? data.pushed_at ?? null,
    pushedAt: data.pushed_at ?? null,
    createdAt: data.created_at ?? null,
    defaultBranch: data.default_branch ?? null,
    topics: data.topics ?? [],
    homepage: data.homepage ?? null,
    description: data.description ?? null,
    fetchedAt: new Date().toISOString()
  };
}

const repos = await readProjectRepos();
const existing = await readExistingCache();
const cache = { ...existing };
const workers = Math.min(5, Math.max(1, repos.length));
let index = 0;
let ok = 0;
let failed = 0;

async function work() {
  while (index < repos.length) {
    const repo = repos[index++];
    const key = repo.toLowerCase();
    try {
      const entry = await fetchRepo(repo);
      const entryKey = entry.fullName.toLowerCase();
      cache[entryKey] = entry;
      if (entryKey !== key) delete cache[key];
      ok++;
      console.error(`[${ok + failed}/${repos.length}] ${entry.fullName}`);
    } catch (error) {
      failed++;
      console.error(
        `[${ok + failed}/${repos.length}] ERROR ${repo}: ${error.message}`
      );
    }
  }
}

await fs.mkdir(generatedDir, { recursive: true });
console.error(`Sincronizando ${repos.length} repositorios…`);
await Promise.all(Array.from({ length: workers }, () => work()));

const sorted = Object.fromEntries(
  Object.entries(cache)
    .filter(([, value]) => value && value.fullName)
    .sort(([a], [b]) => a.localeCompare(b))
);

await fs.writeFile(cachePath, JSON.stringify(sorted, null, 2), "utf8");
await fs.writeFile(
  metaPath,
  JSON.stringify(
    {
      updatedAt: new Date().toISOString(),
      source: process.env.GITHUB_ACTIONS ? "github-actions" : "local",
      repoCount: Object.keys(sorted).length
    },
    null,
    2
  ),
  "utf8"
);

console.log(
  `GitHub metadata: ${ok} actualizados, ${failed} fallidos, ${Object.keys(sorted).length} en caché.`
);
// Individual failures are logged but do not abort the deploy: the previous
// cache entry is kept, and the validation step reports missing metadata.

