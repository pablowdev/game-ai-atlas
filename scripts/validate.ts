import {
  buildData,
  loadGitHubCache,
  loadProjects,
  normalizeRepo
} from "../src/lib/data";
import { techLabels } from "../src/i18n/labels";

const warnings: string[] = [];

function warn(message: string) {
  warnings.push(message);
}

try {
  const data = buildData();
  const cache = loadGitHubCache();

  for (const project of data.projects) {
    const cached = cache[project.repoKey];
    if (!cached) {
      warn(`Sin metadata de GitHub para ${project.repo} (${project.name})`);
    }

    if (project.gameScope === "specific" && project.games.length > 1) {
      warn(
        `${project.id} está marcado como "specific" pero tiene ${project.games.length} juegos`
      );
    }
    if (project.gameScope === "multi" && project.games.length < 2) {
      warn(
        `${project.id} está marcado como "multi" pero tiene menos de 2 juegos`
      );
    }
    if (project.relation === "clone" && project.fidelity === "n/a") {
      warn(`${project.id} es un clon pero no tiene fidelidad definida`);
    }
    if (
      project.relation !== "clone" &&
      project.fidelity &&
      project.fidelity !== "n/a"
    ) {
      warn(
        `${project.id} no es un clon pero tiene fidelidad "${project.fidelity}"`
      );
    }
    for (const tech of project.tech) {
      if (!(tech in techLabels)) {
        warn(`${project.id} usa una tecnología no catalogada: ${tech}`);
      }
    }
  }

  const allProjects = loadProjects();
  const pending = allProjects.filter(
    (project) => project.review_status !== "approved"
  );
  if (pending.length > 0) {
    warn(
      `${pending.length} proyecto(s) no aprobados no se publican: ${pending
        .map((project) => project.id)
        .join(", ")}`
    );
  }

  const missingGames = Array.from(
    new Set(
      data.projects.flatMap((project) =>
        project.games.filter((gameId) => !data.gamesById.has(gameId))
      )
    )
  );
  if (missingGames.length > 0) {
    warn(`Juegos referenciados pero inexistentes: ${missingGames.join(", ")}`);
  }

  console.log("");
  console.log("Game AI Atlas · validación de datos");
  console.log("───────────────────────────────────");
  console.log(`Juegos:            ${data.stats.totalGames}`);
  console.log(`Proyectos:         ${data.stats.totalProjects}`);
  console.log(`Con proyectos:     ${data.stats.gamesWithProjects}`);
  console.log(`Proyectos activos: ${data.stats.activeProjects}`);
  console.log(`Archivados:        ${data.stats.archivedProjects}`);
  console.log(`Repos en caché:    ${Object.keys(cache).length}`);
  console.log(`Actualizado:       ${data.stats.updatedAt ?? "sin fecha"}`);
  console.log("");

  if (warnings.length > 0) {
    console.log(`Avisos (${warnings.length}):`);
    for (const warning of warnings) console.log(`  · ${warning}`);
    console.log("");
  } else {
    console.log("Sin avisos.");
    console.log("");
  }

  const duplicateRepos = new Set<string>();
  const seen = new Set<string>();
  for (const project of data.projects) {
    const key = normalizeRepo(project.repo);
    if (seen.has(key)) duplicateRepos.add(key);
    seen.add(key);
  }
  if (duplicateRepos.size > 0) {
    console.error(
      `Repositorios duplicados: ${Array.from(duplicateRepos).join(", ")}`
    );
    process.exitCode = 1;
  }
} catch (error) {
  console.error("");
  console.error("La validación ha fallado:");
  console.error(error instanceof Error ? error.message : String(error));
  console.error("");
  process.exitCode = 1;
}
