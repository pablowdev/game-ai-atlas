export const prerender = true;

export function GET({ site }: { site: URL | undefined }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const origin = site ?? new URL("http://localhost:4321");
  const sitemap = new URL(`${base}/sitemap-index.xml`, origin).toString();

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
