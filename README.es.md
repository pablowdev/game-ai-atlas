# Game AI Atlas

Directorio abierto y bilingüe de proyectos de código abierto que usan IA y están basados en videojuegos existentes.

Busca un juego y descubre agentes, remakes, mods, entornos de entrenamiento, world models y herramientas creadas a su alrededor, con la última actividad de GitHub, licencia y requisitos.

- **Sitio:** [pablowdev.github.io/game-ai-atlas](https://pablowdev.github.io/game-ai-atlas/) (cuando esté publicado)
- **English:** [README.md](./README.md)
- **Datos:** YAML curado + metadata de GitHub sincronizada automáticamente
- **Stack:** Astro, TypeScript, Tailwind CSS, MiniSearch, GitHub Pages

## Qué hace

- Búsqueda instantánea por título, alias o nombre de proyecto, sin importar acentos.
- Páginas de juego con proyectos específicos y herramientas compatibles con varios juegos.
- Relación clara: agente, clon/remake, mod, entorno, world model o herramienta.
- Último commit, estrellas, licencia, lenguaje y estado de archivo desde GitHub.
- Filtros prácticos: requiere el juego original, usa assets originales, jugable en navegador, demo disponible.
- Interfaz y contenido en español e inglés.
- Sitio estático, rápido y accesible: sin login, sin base de datos, sin tracking.

## Inicio rápido

Requisitos: Node.js 22.23+ y npm.

```bash
npm install
npm run dev
```

Abre <http://localhost:4321/es/>.

Comandos útiles:

```bash
npm run validate      # valida el YAML y las referencias
npm run check         # comprobaciones de Astro/TypeScript
npm run build         # valida, genera el índice y construye el sitio
npm run sync:github   # actualiza metadata de GitHub (requiere GH_TOKEN)
npm run preview       # previsualiza el build de producción
```

Para sincronizar en local:

```powershell
$env:GH_TOKEN = (gh auth token)
npm run sync:github
```

## Estructura

```text
src/data/games/        # un YAML por juego
src/data/projects/     # un YAML por proyecto
src/data/generated/    # caché de GitHub y metadata (generado)
src/components/        # componentes y vistas
src/i18n/              # textos, etiquetas y rutas
src/lib/               # schema, carga de datos, formato y URLs
src/pages/             # rutas es/ y en/
scripts/               # validación, índice y sincronización
docs/                  # plan, datos y taxonomía
.github/               # workflows y plantillas de issues
```

## Modelo de datos en un minuto

Cada juego vive en `src/data/games/<slug>.yaml`. Cada proyecto en `src/data/projects/<slug>.yaml`.

```yaml
id: farama-foundation-vizdoom
name: ViZDoom
repo: Farama-Foundation/ViZDoom
games: [doom]
game_scope: specific
relation: environment
ai_role: research
tech: [reinforcement-learning]
description_es: Entornos de RL para crear bots que juegan a Doom usando solo píxeles.
description_en: RL environments for building bots that play Doom using only pixels.
requires_original_game: true
uses_original_assets: true
playable_in_browser: false
license: MIT
tags: [fps, research]
review_status: approved
```

La metadata de GitHub (estrellas, último commit, archivado, licencia detectada) la genera `scripts/sync-github.mjs` en `src/data/generated/github.json`. No edites ese archivo a mano.

Consulta [docs/DATA.md](./docs/DATA.md) y [docs/TAXONOMY.md](./docs/TAXONOMY.md).

## Datos abiertos

El build genera endpoints estáticos legibles por máquinas:

- `/api/games.json` — catálogo de juegos con conteos, alias y URLs.
- `/api/projects.json` — proyectos curados, metadata de GitHub, enlaces y flags.
- `/api/meta.json` — fecha de generación e índice de endpoints.
- `/llms.txt` — contexto compacto para agentes de IA.

Los archivos generados no se commitean; se producen con `npm run build:search` durante el build.

## Publicar en GitHub Pages

1. Crea un repositorio público (por ejemplo `game-ai-atlas`).
2. Sube el proyecto a la rama `main`.
3. En **Settings → Pages**, selecciona **GitHub Actions** como fuente.
4. El workflow `Deploy` construye y publica el sitio.
5. El workflow programado `Sync GitHub data` actualiza la metadata y vuelve a desplegar a diario.

Los workflows detectan automáticamente si es un project page (`/repo-name`) o un user page (`/`). Si usas un dominio propio, cambia `SITE_URL` en los workflows y `site` en `astro.config.mjs`.

## Contribuir

Lee [CONTRIBUTING.md](./CONTRIBUTING.md). En resumen:

1. Abre un issue con el formulario **Añadir proyecto** o **Añadir juego**, o envía un pull request.
2. Añade un archivo YAML siguiendo el schema.
3. Ejecuta `npm run validate` y `npm run build`.
4. Una persona revisa la relación con el juego, la licencia y los enlaces.

Las contribuciones asistidas por IA son bienvenidas. Consulta [AGENTS.md](./AGENTS.md).

## Criterios de inclusión

- Repositorio público y open source con licencia visible.
- La IA es central, no un uso anecdótico.
- Relación verificable con un juego existente.
- Sin ROMs, ISOs, assets originales, enlaces a piratería ni malware.
- Sin forks sin cambios relevantes.
- Descripción breve, objetiva y con enlaces a la fuente.

Este sitio enlaza proyectos de terceros. No alojamos juegos, assets ni código ajeno. Algunos proyectos requieren una copia legal del juego original.

## Licencias

- Código: [MIT](./LICENSE)
- Datos curados: [CC BY 4.0](./LICENSE-DATA)
- Metadata de GitHub: obtenida de la API pública; nombres, descripciones y marcas pertenecen a sus dueños.

## Roadmap

- Importar un catálogo más amplio de juegos desde Wikidata.
- Pipeline de descubrimiento con confianza y cola de revisión.
- RSS, watchlist y digest semanal.
- Comparador de proyectos, timelines de actividad y huecos de cobertura.
- Más juegos, más proyectos y una pequeña comunidad de revisión.

El seed inicial contiene 50 juegos y 70 proyectos curados. La arquitectura está preparada para crecer a miles de registros.
