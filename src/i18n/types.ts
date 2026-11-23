export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}
