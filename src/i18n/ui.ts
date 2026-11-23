const es = {
  siteName: "Game AI Atlas",
  tagline: "Proyectos de IA para videojuegos",
  description:
    "Directorio abierto de proyectos de IA basados en videojuegos, con actividad en GitHub y búsqueda instantánea.",
  nav: {
    main: "Navegación principal",
    breadcrumb: "Miga de pan",
    games: "Juegos",
    tools: "Herramientas",
    contribute: "Contribuir",
    about: "Acerca",
    github: "GitHub"
  },
  search: {
    placeholder: "Busca un juego, saga o proyecto…",
    label: "Buscar juegos y proyectos",
    hint: "Prueba con Doom, Minecraft, ajedrez o Pokémon.",
    games: "Juegos",
    projects: "Proyectos",
    noResults: "No encontramos resultados.",
    noResultsHint: "Prueba con otro título, alias o nombre del proyecto.",
    loading: "Cargando buscador…",
    clear: "Limpiar búsqueda",
    shortcut: "Ctrl K",
    summary: (games: number, projects: number) =>
      `${games} ${games === 1 ? "juego" : "juegos"} · ${projects} ${
        projects === 1 ? "proyecto" : "proyectos"
      }`,
    viewGame: "Ver juego",
    viewProject: "Ver proyecto",
    suggest: "¿Falta algo? Sugiérelo",
    minChars: "Escribe al menos 2 caracteres."
  },
  home: {
    heroTitle: "Encuentra proyectos de IA para tus juegos favoritos.",
    heroSubtitle:
      "Un mapa abierto de agentes, remakes, mods, entornos y world models, con la última actividad de GitHub.",
    statsGames: "juegos",
    statsProjects: "proyectos",
    statsActive: "activos",
    statsUpdated: "Datos actualizados",
    featured: "Juegos destacados",
    featuredSubtitle: "Puntos de entrada con más proyectos y actividad.",
    recent: "Recién actualizados",
    recentSubtitle: "Proyectos con commits recientes en GitHub.",
    exploreAll: "Ver todos los juegos",
    how: "Cómo leer el atlas",
    howSubtitle:
      "Cada proyecto se clasifica por su relación con el juego original.",
    howRelationTitle: "Relación",
    howRelation: "Agente que juega, clon, mod, entorno o herramienta.",
    howStatusTitle: "Actividad",
    howStatus:
      "Último commit, estado y licencia directamente desde GitHub.",
    howFlagsTitle: "Requisitos",
    howFlags:
      "Si necesita el juego original, assets o funciona en el navegador.",
    tools: "Herramientas generales",
    toolsSubtitle:
      "Frameworks que sirven para muchos juegos y experimentos.",
    toolsCta: "Ver herramientas",
    contributeTitle: "¿Conoces un proyecto que falta?",
    contributeText:
      "La base se construye entre todos. Puedes añadir un juego o un proyecto con un issue o un pull request.",
    contributeCta: "Cómo contribuir",
    wantedBadge: "Buscamos proyectos",
    updated: (date: string) => `Datos actualizados: ${date}`
  },
  game: {
    projects: "Proyectos",
    specificProjects: "Proyectos específicos",
    compatible: "Herramientas compatibles",
    compatibleNote:
      "Funcionan con varios juegos; aparecen aquí por compatibilidad.",
    noProjects: "Todavía no hay proyectos específicos para este juego.",
    noProjectsHint:
      "Si conoces uno, puedes añadirlo y ayudar a completar el atlas.",
    addProject: "Añadir proyecto",
    filters: "Filtros",
    filterRelation: "Tipo",
    filterStatus: "Estado",
    filterRequires: "Requiere juego original",
    filterBrowser: "Jugable en navegador",
    sort: "Ordenar",
    sortActivity: "Actividad reciente",
    sortStars: "Más estrellas",
    sortName: "Nombre",
    clearFilters: "Limpiar filtros",
    showing: (n: number, total: number) =>
      `${n} de ${total} ${total === 1 ? "proyecto" : "proyectos"}`,
    related: "Juegos relacionados",
    about: "Sobre el juego",
    lastActivity: "Última actividad",
    activeProjects: "proyectos activos",
    wantedTitle: "Este juego aún no tiene proyectos",
    wantedText:
      "Puede ser el primero. Busca agentes, remakes, mods o entornos y envíalos.",
    aliases: "También conocido como",
    allProjects: "Todos los proyectos",
    toolsForGame: "Herramientas generales",
    noFilterResults: "No hay proyectos con estos filtros.",
    clear: "Quitar filtros",
    projectLabel: (n: number) => (n === 1 ? "Proyecto" : "Proyectos"),
    activeProjectLabel: (n: number) =>
      n === 1 ? "proyecto activo" : "proyectos activos",
    specificProjectLabel: (n: number) =>
      n === 1 ? "proyecto específico" : "proyectos específicos",
    compatibleLabel: (n: number) =>
      n === 1 ? "herramienta compatible" : "herramientas compatibles"
  },
  project: {
    about: "Sobre el proyecto",
    links: "Enlaces",
    repo: "Repositorio",
    homepage: "Web",
    demo: "Demo",
    docs: "Documentación",
    paper: "Paper",
    video: "Vídeo",
    metadata: "Datos de GitHub",
    stars: "Estrellas",
    forks: "Forks",
    issues: "Issues abiertas",
    language: "Lenguaje",
    license: "Licencia",
    lastCommit: "Último commit",
    status: "Estado",
    games: "Juegos relacionados",
    related: "Otros proyectos del juego",
    dataNote:
      "Los datos de GitHub se actualizan automáticamente. La descripción está curada.",
    viewOnGithub: "Ver en GitHub",
    noData: "Sin datos de GitHub todavía",
    archived: "Archivado",
    requiresOriginal: "Requiere el juego original",
    usesAssets: "Usa assets originales",
    browser: "Jugable en navegador",
    demoAvailable: "Demo disponible",
    aiRole: "Rol de la IA",
    fidelity: "Fidelidad",
    scope: "Alcance",
    classification: "Clasificación",
    lastUpdated: "Última actualización de datos"
  },
  badges: {
    requiresOriginal: "Requiere juego original",
    usesAssets: "Usa assets originales",
    browser: "Jugable en navegador",
    demo: "Demo",
    archived: "Archivado",
    wanted: "Sin proyectos",
    tool: "Herramienta"
  },
  gamesIndex: {
    title: "Todos los juegos",
    intro:
      "Explora el atlas por juego. Los que aún no tienen proyectos son buenos candidatos para contribuir.",
    all: "Todos",
    withProjects: "Con proyectos",
    wanted: "Sin proyectos",
    search: "Filtrar juegos…",
    noResults: "No hay juegos que coincidan.",
    count: (n: number) => `${n} ${n === 1 ? "juego" : "juegos"}`
  },
  tools: {
    title: "Herramientas y frameworks",
    intro:
      "Infraestructura de IA que no pertenece a un solo juego: entornos, librerías y frameworks de investigación.",
    general: "Frameworks generales",
    multi: "Entornos multijuego",
    note:
      "No aparecen en el recuento principal de cada juego, pero son la base de muchos proyectos.",
    count: (n: number) => `${n} ${n === 1 ? "herramienta" : "herramientas"}`
  },
  about: {
    title: "Acerca de Game AI Atlas",
    intro:
      "Game AI Atlas es un directorio abierto de proyectos de código abierto que usan IA para jugar, recrear, modificar o estudiar videojuegos existentes.",
    scopeTitle: "Qué incluimos",
    scope: [
      "Proyectos open source con licencia visible y repositorio público.",
      "Agentes que juegan, clones y remakes, mods, entornos de entrenamiento, world models y herramientas.",
      "Proyectos donde la IA es una parte central, no un uso anecdótico.",
      "Solo enlaces: no alojamos ROMs, ISOs, assets ni código de terceros."
    ],
    taxonomyTitle: "Cómo clasificamos",
    taxonomy:
      "Cada proyecto tiene una relación con el juego (agente, clon, mod, entorno, world model o herramienta), un rol de la IA (construido con IA, IA en runtime o investigación) y una fidelidad cuando es un remake. También mostramos si requiere el juego original, si usa assets originales y si se puede jugar en el navegador.",
    dataTitle: "De dónde salen los datos",
    data:
      "La lista de juegos y proyectos está curada en archivos YAML del repositorio. Los datos de GitHub (estrellas, último commit, licencia, estado) se sincronizan automáticamente con la API de GitHub. Los juegos se pueden enriquecer con Wikidata e IGDB en el futuro.",
    updatesTitle: "Actualización",
    updates:
      "El catálogo se actualiza mediante pull requests y el metadata de GitHub se refresca de forma programada. Cada página muestra la fecha de la última actualización de datos.",
    legalTitle: "Aviso legal",
    legal:
      "Este sitio solo enlaza a proyectos de terceros. Las marcas, juegos y assets pertenecen a sus respectivos dueños. Algunos proyectos requieren una copia legal del juego original. No promovemos trampas en juegos online ni la distribución de material con copyright.",
    contributeTitle: "Contribuir",
    contribute:
      "Puedes proponer un juego o un proyecto mediante los formularios de GitHub. Revisamos la relación con el juego, la licencia y que el enlace sea público antes de publicarlo."
  },
  contribute: {
    title: "Contribuir al atlas",
    intro:
      "La base de datos vive en el repositorio. Añadir un proyecto es tan simple como abrir un issue o enviar un pull request con un archivo YAML.",
    addProjectTitle: "Añadir un proyecto",
    addProject:
      "Abre el formulario de proyecto e indica el repositorio, el juego o juegos, la relación, una descripción breve y los enlaces. Si puedes, añade el YAML directamente.",
    addGameTitle: "Añadir un juego",
    addGame:
      "Si el juego no existe, abre el formulario de juego con el título, año, plataformas, géneros y alias. Los juegos sin proyectos también son bienvenidos.",
    criteriaTitle: "Criterios de inclusión",
    criteria: [
      "Repositorio público con licencia visible.",
      "La IA es central en el proyecto.",
      "Relación verificable con un juego existente.",
      "Sin ROMs, ISOs, assets ni enlaces a piratería.",
      "Sin forks sin cambios relevantes ni malware.",
      "Descripción breve, objetiva y con enlaces a la fuente."
    ],
    schemaTitle: "Formato de datos",
    schema:
      "Cada proyecto es un archivo YAML en src/data/projects y cada juego uno en src/data/games. El esquema está documentado en docs/DATA.md y validado automáticamente en cada pull request.",
    reviewTitle: "Revisión",
    review:
      "Las propuestas pasan por una revisión humana. El metadata de GitHub se obtiene automáticamente; la descripción y la clasificación se revisan antes de publicar.",
    cta: "Abrir un issue en GitHub",
    prCta: "Enviar un pull request"
  },
  footer: {
    disclaimer:
      "Sitio de enlaces. No alojamos ROMs, ISOs, assets ni código de terceros.",
    dataUpdated: "Datos de GitHub actualizados",
    code: "Código",
    data: "Datos",
    github: "GitHub",
    methodology: "Metodología",
    explore: "Explorar",
    resources: "Recursos",
    madeWith: "Hecho con Astro y datos abiertos."
  },
  common: {
    loading: "Cargando…",
    error: "Algo salió mal.",
    back: "Volver",
    seeAll: "Ver todo",
    updated: "Actualizado",
    noData: "Sin datos",
    unknown: "Desconocido",
    language: "Idioma",
    spanish: "Español",
    english: "English",
    home: "Inicio",
    projects: "proyectos",
    games: "juegos",
    year: "Año",
    platforms: "Plataformas",
    genres: "Géneros",
    developers: "Desarrolladores",
    series: "Saga",
    aliases: "Alias",
    projectsCount: (n: number) =>
      `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
    gamesCount: (n: number) => `${n} ${n === 1 ? "juego" : "juegos"}`,
    activeProjects: (n: number) =>
      `${n} ${n === 1 ? "activo" : "activos"}`,
    relation: "Relación",
    status: "Estado",
    stars: "estrellas",
    license: "Licencia",
    all: "Todos",
    none: "Ninguno",
    filter: "Filtrar",
    close: "Cerrar",
    open: "Abrir",
    share: "Compartir",
    lastUpdated: "Última actualización",
    languageSwitch: "View in English",
    skipToContent: "Saltar al contenido",
    noResults: "Sin resultados"
  }
};

const en = {
  siteName: "Game AI Atlas",
  tagline: "AI projects for video games",
  description:
    "An open directory of AI projects based on video games, with GitHub activity and instant search.",
  nav: {
    main: "Main navigation",
    breadcrumb: "Breadcrumb",
    games: "Games",
    tools: "Tools",
    contribute: "Contribute",
    about: "About",
    github: "GitHub"
  },
  search: {
    placeholder: "Search a game, series or project…",
    label: "Search games and projects",
    hint: "Try Doom, Minecraft, chess or Pokémon.",
    games: "Games",
    projects: "Projects",
    noResults: "No results found.",
    noResultsHint: "Try another title, alias or project name.",
    loading: "Loading search…",
    clear: "Clear search",
    shortcut: "Ctrl K",
    summary: (games: number, projects: number) =>
      `${games} ${games === 1 ? "game" : "games"} · ${projects} ${
        projects === 1 ? "project" : "projects"
      }`,
    viewGame: "View game",
    viewProject: "View project",
    suggest: "Missing something? Suggest it",
    minChars: "Type at least 2 characters."
  },
  home: {
    heroTitle: "Find AI projects for your favorite games.",
    heroSubtitle:
      "An open map of agents, remakes, mods, environments and world models, with the latest GitHub activity.",
    statsGames: "games",
    statsProjects: "projects",
    statsActive: "active",
    statsUpdated: "Data updated",
    featured: "Featured games",
    featuredSubtitle: "Entry points with the most projects and activity.",
    recent: "Recently updated",
    recentSubtitle: "Projects with recent commits on GitHub.",
    exploreAll: "Browse all games",
    how: "How to read the atlas",
    howSubtitle:
      "Every project is classified by its relationship with the original game.",
    howRelationTitle: "Relationship",
    howRelation: "Playing agent, clone, mod, environment or tool.",
    howStatusTitle: "Activity",
    howStatus:
      "Last commit, status and license pulled directly from GitHub.",
    howFlagsTitle: "Requirements",
    howFlags:
      "Whether it needs the original game, original assets or runs in the browser.",
    tools: "General tools",
    toolsSubtitle:
      "Frameworks that work across many games and experiments.",
    toolsCta: "View tools",
    contributeTitle: "Know a missing project?",
    contributeText:
      "The database is built by the community. You can add a game or project through an issue or a pull request.",
    contributeCta: "How to contribute",
    wantedBadge: "Looking for projects",
    updated: (date: string) => `Data updated: ${date}`
  },
  game: {
    projects: "Projects",
    specificProjects: "Specific projects",
    compatible: "Compatible tools",
    compatibleNote:
      "These work across multiple games and appear here for compatibility.",
    noProjects: "There are no specific projects for this game yet.",
    noProjectsHint:
      "If you know one, add it and help complete the atlas.",
    addProject: "Add project",
    filters: "Filters",
    filterRelation: "Type",
    filterStatus: "Status",
    filterRequires: "Requires original game",
    filterBrowser: "Playable in browser",
    sort: "Sort",
    sortActivity: "Recent activity",
    sortStars: "Most stars",
    sortName: "Name",
    clearFilters: "Clear filters",
    showing: (n: number, total: number) =>
      `${n} of ${total} ${total === 1 ? "project" : "projects"}`,
    related: "Related games",
    about: "About the game",
    lastActivity: "Last activity",
    activeProjects: "active projects",
    wantedTitle: "This game has no projects yet",
    wantedText:
      "It could be the first. Look for agents, remakes, mods or environments and submit them.",
    aliases: "Also known as",
    allProjects: "All projects",
    toolsForGame: "General tools",
    noFilterResults: "No projects match these filters.",
    clear: "Clear filters",
    projectLabel: (n: number) => (n === 1 ? "Project" : "Projects"),
    activeProjectLabel: (n: number) =>
      n === 1 ? "active project" : "active projects",
    specificProjectLabel: (n: number) =>
      n === 1 ? "specific project" : "specific projects",
    compatibleLabel: (n: number) =>
      n === 1 ? "compatible tool" : "compatible tools"
  },
  project: {
    about: "About the project",
    links: "Links",
    repo: "Repository",
    homepage: "Website",
    demo: "Demo",
    docs: "Documentation",
    paper: "Paper",
    video: "Video",
    metadata: "GitHub data",
    stars: "Stars",
    forks: "Forks",
    issues: "Open issues",
    language: "Language",
    license: "License",
    lastCommit: "Last commit",
    status: "Status",
    games: "Related games",
    related: "Other projects for this game",
    dataNote:
      "GitHub data is refreshed automatically. The description is curated.",
    viewOnGithub: "View on GitHub",
    noData: "No GitHub data yet",
    archived: "Archived",
    requiresOriginal: "Requires the original game",
    usesAssets: "Uses original assets",
    browser: "Playable in browser",
    demoAvailable: "Demo available",
    aiRole: "AI role",
    fidelity: "Fidelity",
    scope: "Scope",
    classification: "Classification",
    lastUpdated: "Data last updated"
  },
  badges: {
    requiresOriginal: "Requires original game",
    usesAssets: "Uses original assets",
    browser: "Playable in browser",
    demo: "Demo",
    archived: "Archived",
    wanted: "No projects",
    tool: "Tool"
  },
  gamesIndex: {
    title: "All games",
    intro:
      "Browse the atlas by game. Games without projects are good candidates for contributions.",
    all: "All",
    withProjects: "With projects",
    wanted: "Without projects",
    search: "Filter games…",
    noResults: "No games match.",
    count: (n: number) => `${n} ${n === 1 ? "game" : "games"}`
  },
  tools: {
    title: "Tools and frameworks",
    intro:
      "AI infrastructure that does not belong to a single game: environments, libraries and research frameworks.",
    general: "General frameworks",
    multi: "Multi-game environments",
    note:
      "They are not counted in each game's main list, but they power many projects.",
    count: (n: number) => `${n} ${n === 1 ? "tool" : "tools"}`
  },
  about: {
    title: "About Game AI Atlas",
    intro:
      "Game AI Atlas is an open directory of open-source projects that use AI to play, recreate, modify or study existing video games.",
    scopeTitle: "What we include",
    scope: [
      "Open-source projects with a visible license and public repository.",
      "Playing agents, clones and remakes, mods, training environments, world models and tools.",
      "Projects where AI is central, not an anecdotal use.",
      "Links only: we do not host ROMs, ISOs, assets or third-party code."
    ],
    taxonomyTitle: "How we classify",
    taxonomy:
      "Every project has a relationship with the game (agent, clone, mod, environment, world model or tool), an AI role (built with AI, AI at runtime or research) and a fidelity score when it is a remake. We also show whether it requires the original game, uses original assets or runs in the browser.",
    dataTitle: "Where the data comes from",
    data:
      "The game and project list is curated in YAML files in the repository. GitHub data (stars, last commit, license, status) is synced automatically through the GitHub API. Games can be enriched with Wikidata and IGDB in the future.",
    updatesTitle: "Updates",
    updates:
      "The catalog is updated through pull requests and GitHub metadata is refreshed on a schedule. Every page shows the date of the last data update.",
    legalTitle: "Legal notice",
    legal:
      "This site only links to third-party projects. Trademarks, games and assets belong to their respective owners. Some projects require a legal copy of the original game. We do not promote cheating in online games or the distribution of copyrighted material.",
    contributeTitle: "Contribute",
    contribute:
      "You can suggest a game or project through the GitHub forms. We review the relationship with the game, the license and that the link is public before publishing."
  },
  contribute: {
    title: "Contribute to the atlas",
    intro:
      "The database lives in the repository. Adding a project is as simple as opening an issue or sending a pull request with a YAML file.",
    addProjectTitle: "Add a project",
    addProject:
      "Open the project form and provide the repository, the game or games, the relationship, a short description and links. If you can, add the YAML directly.",
    addGameTitle: "Add a game",
    addGame:
      "If the game does not exist, open the game form with the title, year, platforms, genres and aliases. Games without projects are welcome too.",
    criteriaTitle: "Inclusion criteria",
    criteria: [
      "Public repository with a visible license.",
      "AI is central to the project.",
      "Verifiable relationship with an existing game.",
      "No ROMs, ISOs, assets or piracy links.",
      "No forks without meaningful changes or malware.",
      "Short, objective description with links to the source."
    ],
    schemaTitle: "Data format",
    schema:
      "Each project is a YAML file in src/data/projects and each game one in src/data/games. The schema is documented in docs/DATA.md and validated automatically on every pull request.",
    reviewTitle: "Review",
    review:
      "Submissions go through human review. GitHub metadata is fetched automatically; descriptions and classifications are reviewed before publishing.",
    cta: "Open an issue on GitHub",
    prCta: "Send a pull request"
  },
  footer: {
    disclaimer:
      "Link directory. We do not host ROMs, ISOs, assets or third-party code.",
    dataUpdated: "GitHub data updated",
    code: "Code",
    data: "Data",
    github: "GitHub",
    methodology: "Methodology",
    explore: "Explore",
    resources: "Resources",
    madeWith: "Built with Astro and open data."
  },
  common: {
    loading: "Loading…",
    error: "Something went wrong.",
    back: "Back",
    seeAll: "See all",
    updated: "Updated",
    noData: "No data",
    unknown: "Unknown",
    language: "Language",
    spanish: "Español",
    english: "English",
    home: "Home",
    projects: "projects",
    games: "games",
    year: "Year",
    platforms: "Platforms",
    genres: "Genres",
    developers: "Developers",
    series: "Series",
    aliases: "Aliases",
    projectsCount: (n: number) =>
      `${n} ${n === 1 ? "project" : "projects"}`,
    gamesCount: (n: number) => `${n} ${n === 1 ? "game" : "games"}`,
    activeProjects: (n: number) =>
      `${n} ${n === 1 ? "active" : "active"}`,
    relation: "Relationship",
    status: "Status",
    stars: "stars",
    license: "License",
    all: "All",
    none: "None",
    filter: "Filter",
    close: "Close",
    open: "Open",
    share: "Share",
    lastUpdated: "Last updated",
    languageSwitch: "Ver en español",
    skipToContent: "Skip to content",
    noResults: "No results"
  }
};

export const ui = { es, en };
export type UI = typeof es;
