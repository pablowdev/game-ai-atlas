const rawBase = import.meta.env.BASE_URL || "/";

export const basePath = rawBase.endsWith("/")
  ? rawBase.slice(0, -1)
  : rawBase;

export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}` || "/";
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  const base = site ?? new URL("http://localhost:4321");
  return new URL(withBase(path), base).toString();
}
