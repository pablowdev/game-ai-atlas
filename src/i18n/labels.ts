import type {
  ActivityStatus,
  AiRole,
  Fidelity,
  GameScope,
  Relation
} from "../lib/schema";
import type { Lang } from "./types";

type LabelMap<T extends string> = Record<T, Record<Lang, string>>;

export const relationLabels: LabelMap<Relation> = {
  agent: { es: "Agente", en: "Agent" },
  clone: { es: "Clon / remake", en: "Clone / remake" },
  mod: { es: "Mod", en: "Mod" },
  environment: { es: "Entorno", en: "Environment" },
  "world-model": { es: "World model", en: "World model" },
  tool: { es: "Herramienta", en: "Tool" }
};

export const aiRoleLabels: LabelMap<AiRole> = {
  "built-with-ai": { es: "Construido con IA", en: "Built with AI" },
  runtime: { es: "IA en runtime", en: "AI at runtime" },
  research: { es: "Investigación", en: "Research" },
  mixed: { es: "Mixto", en: "Mixed" }
};

export const fidelityLabels: LabelMap<Fidelity> = {
  exact: { es: "Copia exacta", en: "Exact copy" },
  faithful: { es: "Remake fiel", en: "Faithful remake" },
  inspired: { es: "Inspirado", en: "Inspired" },
  partial: { es: "Parcial", en: "Partial" },
  "n/a": { es: "No aplica", en: "N/A" }
};

export const statusLabels: LabelMap<ActivityStatus> = {
  active: { es: "Activo", en: "Active" },
  maintenance: { es: "Mantenimiento", en: "Maintenance" },
  dormant: { es: "Inactivo", en: "Dormant" },
  archived: { es: "Archivado", en: "Archived" },
  unknown: { es: "Sin datos", en: "Unknown" }
};

export const scopeLabels: LabelMap<GameScope> = {
  specific: { es: "Un juego", en: "Single game" },
  multi: { es: "Varios juegos", en: "Multi-game" },
  general: { es: "General", en: "General" }
};

export const techLabels: Record<string, Record<Lang, string>> = {
  "reinforcement-learning": {
    es: "Aprendizaje por refuerzo",
    en: "Reinforcement learning"
  },
  llm: { es: "LLM", en: "LLM" },
  diffusion: { es: "Difusión", en: "Diffusion" },
  "world-model": { es: "World model", en: "World model" },
  mcts: { es: "MCTS", en: "MCTS" },
  "self-play": { es: "Self-play", en: "Self-play" },
  "neural-network": { es: "Red neuronal", en: "Neural network" },
  "imitation-learning": {
    es: "Aprendizaje por imitación",
    en: "Imitation learning"
  },
  "classical-ai": { es: "IA clásica", en: "Classical AI" },
  "multi-agent": { es: "Multiagente", en: "Multi-agent" },
  evolutionary: { es: "Evolutivo", en: "Evolutionary" },
  search: { es: "Búsqueda", en: "Search" },
  nlp: { es: "NLP", en: "NLP" },
  speech: { es: "Voz", en: "Speech" },
  threejs: { es: "Three.js", en: "Three.js" },
  "bot-framework": { es: "Framework de bots", en: "Bot framework" },
  "game-theory": { es: "Teoría de juegos", en: "Game theory" },
  planning: { es: "Planificación", en: "Planning" },
  exploration: { es: "Exploración", en: "Exploration" },
  "deep-learning": { es: "Deep learning", en: "Deep learning" },
  "contrastive-learning": {
    es: "Aprendizaje contrastivo",
    en: "Contrastive learning"
  },
  multimodal: { es: "Multimodal", en: "Multimodal" },
  "bot-api": { es: "API de bots", en: "Bot API" },
  pathfinding: { es: "Pathfinding", en: "Pathfinding" },
  expectimax: { es: "Expectimax", en: "Expectimax" },
  torch: { es: "Torch", en: "Torch" }
};

export function labelFor<T extends string>(
  map: Record<T, Record<Lang, string>>,
  key: T,
  lang: Lang
): string {
  return map[key]?.[lang] ?? key;
}

export function humanizeTech(tech: string): string {
  const spaced = tech.replace(/[-_]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
