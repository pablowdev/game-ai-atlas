# Plan de producto

## Visión

Un directorio abierto, bilingüe y muy rápido de proyectos de IA basados en videojuegos existentes. La unidad principal es el juego: al entrar en su página se ven todos los proyectos, su relación con el original, su última actividad en GitHub y sus requisitos.

No es una lista Markdown más. El valor está en:

1. **Búsqueda instantánea** por juego, saga, alias o proyecto.
2. **Datos vivos** de GitHub: último commit, estrellas, licencia, estado.
3. **Taxonomía clara** para saber si un proyecto juega, recrea, modifica o entrena.
4. **Curación humana** para evitar falsos positivos y enlaces muertos.
5. **Datos abiertos** y fáciles de consumir por otras IA.

## Decisiones tomadas

- **Alcance:** todos los tipos de proyecto (agentes, clones, mods, entornos, world models y herramientas), con filtros.
- **Idioma:** interfaz y contenido bilingües desde el inicio (español e inglés).
- **MVP:** 50 juegos y 200 proyectos; el seed actual tiene 50 juegos y 70 proyectos curados.
- **Curación:** descubrimiento automático + revisión humana antes de publicar.
- **Stack:** Astro + TypeScript + Tailwind + MiniSearch + GitHub Actions + GitHub Pages.
- **Datos:** YAML en el repositorio, metadata de GitHub en caché generada.

## Principios de producto

- La búsqueda debe responder en menos de 100 ms.
- La página debe ser útil sin JavaScript; la búsqueda y los filtros son mejoras.
- Una página de juego con cero proyectos debe explicar qué falta y cómo contribuir.
- No mostrar rankings subjetivos de calidad. Mostrar señales: actividad, estrellas, licencia, requisitos.
- No añadir cuentas, comentarios, ratings ni gamificación en el MVP.
- No alojar ROMs, ISOs, assets ni código de terceros. Solo enlaces.
- Cada dato debe tener una fuente verificable.

## Fases

### Fase 0 · Definición

- [x] Taxonomía y schema.
- [x] Seed de 50 juegos.
- [x] Seed de 70 proyectos.
- [x] Búsqueda, páginas de juego y páginas de proyecto.
- [x] Sincronización de GitHub.
- [x] Documentación para contribuir y para otras IA.

### Fase 1 · MVP público

- [x] Sitio estático bilingüe.
- [x] Búsqueda instantánea.
- [x] Filtros por relación, estado, requisitos y orden.
- [x] Páginas de juego y proyecto.
- [x] Datos de GitHub con fecha de actualización.
- [x] Formularios de contribución.
- [x] Configurar el deploy en GitHub Pages.
- [ ] Publicar el repositorio y el sitio.
- [ ] Revisar Lighthouse y accesibilidad en producción.
- [ ] Añadir dominio propio si se decide.

### Fase 2 · Escala

- [ ] Importar juegos desde Wikidata con filtro de notoriedad.
- [ ] Alias en español e inglés para todos los juegos.
- [ ] Pipeline de descubrimiento de repositorios con confianza.
- [ ] Cola de revisión de candidatos.
- [ ] Más filtros: tecnología, licencia, plataforma, año.
- [ ] Estadísticas: juegos con más proyectos, tecnologías, actividad.
- [ ] Llegar a 500 juegos y 2.000 proyectos.

### Fase 3 · Comunidad e inteligencia

- [ ] Clasificación y resúmenes asistidos por LLM con evidencia y revisión.
- [x] API JSON pública y `llms.txt`.
- [ ] RSS y watchlist local.
- [ ] Comparador de proyectos.
- [ ] Timeline de actividad por juego.
- [ ] Huecos de cobertura y "juegos buscados".
- [ ] Badge embebible para los proyectos.
- [ ] Digest semanal.
- [ ] Búsqueda semántica y recomendaciones.
- [ ] Leaderboards de benchmarks, solo con datos fiables.

## Métricas de éxito

- 50 juegos y 200 proyectos publicados en el MVP.
- Búsqueda percibida como instantánea.
- Lighthouse ≥ 95 en rendimiento, accesibilidad y SEO.
- Menos del 2% de falsos positivos en la base publicada.
- Al menos 10 contribuciones externas en los primeros tres meses.
- Datos de GitHub actualizados semanalmente como mínimo.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Scope creep | Criterios de inclusión y fases. |
| Falsos positivos | Revisión humana, confianza y evidencia. |
| Enlaces muertos | Link checker y estado de actividad. |
| Copyright | Solo enlaces, sin assets, disclaimer. |
| EULA y trampas | Etiquetar multijugador y no promocionar cheats. |
| Alucinaciones de IA | Descripciones revisadas y fuentes enlazadas. |
| Límites de GitHub | Caché, lotes, PAT si hace falta. |
| Escala de búsqueda | Índice estático; backend solo si supera 50k registros. |

## Cómo trabajar con otras IA

- `AGENTS.md` contiene las reglas del repositorio.
- `docs/DATA.md` y `docs/TAXONOMY.md` son la fuente de verdad para datos.
- Los scripts `validate`, `build:search` y `sync:github` son deterministas.
- No se debe editar la caché generada ni inventar metadata.
- Cada cambio debe pasar `npm run validate`, `npm run check` y `npm run build`.
