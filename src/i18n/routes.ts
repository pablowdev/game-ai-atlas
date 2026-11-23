import type { Lang } from "./types";

export const routes = {
  home: { es: "/es/", en: "/en/" },
  games: { es: "/es/juegos/", en: "/en/games/" },
  game: (lang: Lang, slug: string) =>
    `${lang === "es" ? "/es/juegos" : "/en/games"}/${slug}/`,
  project: (lang: Lang, slug: string) =>
    `${lang === "es" ? "/es/proyectos" : "/en/projects"}/${slug}/`,
  tools: { es: "/es/herramientas/", en: "/en/tools/" },
  about: { es: "/es/acerca/", en: "/en/about/" },
  contribute: { es: "/es/contribuir/", en: "/en/contribute/" }
} as const;
