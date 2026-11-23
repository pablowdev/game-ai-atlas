// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL ?? "http://localhost:4321";
const rawBase = process.env.BASE_PATH ?? "/";
const base = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}`;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
