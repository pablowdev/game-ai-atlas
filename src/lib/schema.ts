import { z } from "zod";

export const RELATIONS = [
  "agent",
  "clone",
  "mod",
  "environment",
  "world-model",
  "tool"
] as const;

export const AI_ROLES = ["built-with-ai", "runtime", "research", "mixed"] as const;

export const FIDELITIES = ["exact", "faithful", "inspired", "partial", "n/a"] as const;

export const GAME_SCOPES = ["specific", "multi", "general"] as const;

export const REVIEW_STATUSES = ["approved", "pending", "rejected"] as const;

export const ACTIVITY_STATUSES = [
  "active",
  "maintenance",
  "dormant",
  "archived",
  "unknown"
] as const;

const slug = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers and hyphens only"
  );

const httpUrl = z
  .url()
  .refine(
    (value) => /^https?:\/\//i.test(value),
    "Use an http or https URL"
  );

export const GameSchema = z.object({
  id: slug,
  title: z.string().min(1),
  aliases: z.array(z.string().min(1)).default([]),
  year: z.number().int().nullable().optional(),
  platforms: z.array(z.string().min(1)).default([]),
  genres: z.array(z.string().min(1)).default([]),
  series: z.string().min(1).optional(),
  developers: z.array(z.string().min(1)).default([]),
  publishers: z.array(z.string().min(1)).default([]),
  description_es: z.string().min(1).max(300),
  description_en: z.string().min(1).max(300),
  featured: z.boolean().default(false),
  wikidata: z.string().min(1).optional(),
  igdb: z.string().min(1).optional()
});

export const ProjectSchema = z.object({
  id: slug,
  name: z.string().min(1),
  repo: z
    .string()
    .regex(
      /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
      "Use the owner/repo form, without the GitHub URL"
    ),
  homepage: httpUrl.optional(),
  games: z.array(slug).default([]),
  game_scope: z.enum(GAME_SCOPES).optional(),
  relation: z.enum(RELATIONS),
  fidelity: z.enum(FIDELITIES).optional(),
  ai_role: z.enum(AI_ROLES),
  tech: z.array(z.string().min(1)).default([]),
  description_es: z.string().min(1).max(300),
  description_en: z.string().min(1).max(300),
  requires_original_game: z.boolean().default(false),
  uses_original_assets: z.boolean().default(false),
  playable_in_browser: z.boolean().default(false),
  license: z.string().min(1).optional(),
  links: z.record(z.string(), httpUrl).optional(),
  tags: z.array(z.string().min(1)).default([]),
  review_status: z.enum(REVIEW_STATUSES).default("approved")
});

export const GitHubMetaSchema = z.object({
  fullName: z.string().min(1),
  stars: z.number().int().nonnegative().nullable().optional(),
  forks: z.number().int().nonnegative().nullable().optional(),
  openIssues: z.number().int().nonnegative().nullable().optional(),
  archived: z.boolean().default(false),
  license: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  lastCommitAt: z.iso.datetime().nullable().optional(),
  pushedAt: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime().nullable().optional(),
  defaultBranch: z.string().nullable().optional(),
  topics: z.array(z.string()).default([]),
  homepage: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  fetchedAt: z.iso.datetime().optional()
});

export const MetaSchema = z.object({
  updatedAt: z.iso.datetime().nullable().optional(),
  source: z.string().default("unknown"),
  repoCount: z.number().int().nonnegative().default(0)
});

export type Game = z.infer<typeof GameSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type GitHubMeta = z.infer<typeof GitHubMetaSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Relation = (typeof RELATIONS)[number];
export type AiRole = (typeof AI_ROLES)[number];
export type Fidelity = (typeof FIDELITIES)[number];
export type GameScope = (typeof GAME_SCOPES)[number];
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];
