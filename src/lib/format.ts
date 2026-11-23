import type { ActivityStatus } from "./schema";
import {
  aiRoleLabels,
  fidelityLabels,
  humanizeTech,
  relationLabels,
  scopeLabels,
  statusLabels,
  techLabels
} from "../i18n/labels";
import type { Lang } from "../i18n/types";
import type { AiRole, Fidelity, GameScope, Relation } from "./schema";

const locale = (lang: Lang) => (lang === "es" ? "es-ES" : "en-US");

export function formatYear(year: number | null | undefined, lang: Lang): string | null {
  if (year == null) return null;
  if (year < 0) {
    return lang === "es"
      ? `${Math.abs(year)} a. C.`
      : `${Math.abs(year)} BCE`;
  }
  return String(year);
}

export function formatDate(
  iso: string | Date | null | undefined,
  lang: Lang
): string | null {
  if (!iso) return null;
  const date = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function formatRelative(
  iso: string | Date | null | undefined,
  lang: Lang,
  now: Date = new Date()
): string | null {
  if (!iso) return null;
  const date = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const diffMs = date.getTime() - now.getTime();
  const absMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat(locale(lang), { numeric: "auto" });

  if (absMs < 60_000) {
    return lang === "es" ? "ahora mismo" : "just now";
  }

  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (absMs < hour) {
    return rtf.format(Math.round(diffMs / minute), "minute");
  }
  if (absMs < day) {
    return rtf.format(Math.round(diffMs / hour), "hour");
  }
  if (absMs < 30 * day) {
    return rtf.format(Math.round(diffMs / day), "day");
  }
  if (absMs < 365 * day) {
    return rtf.format(Math.round(diffMs / (30 * day)), "month");
  }
  return rtf.format(Math.round(diffMs / (365 * day)), "year");
}

export function formatNumber(value: number | null | undefined, lang: Lang): string {
  if (value == null) return "—";
  return new Intl.NumberFormat(locale(lang)).format(value);
}

export function formatCompact(
  value: number | null | undefined,
  lang: Lang
): string {
  if (value == null) return "—";
  return new Intl.NumberFormat(locale(lang), {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function statusFromDate(
  iso: string | null | undefined,
  archived: boolean,
  now: Date = new Date()
): ActivityStatus {
  if (archived) return "archived";
  if (!iso) return "unknown";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  const days = (now.getTime() - date.getTime()) / 86_400_000;
  if (days <= 90) return "active";
  if (days <= 365) return "maintenance";
  return "dormant";
}

export const statusPriority: Record<ActivityStatus, number> = {
  active: 0,
  maintenance: 1,
  dormant: 2,
  archived: 3,
  unknown: 4
};

export const relationLabel = (relation: Relation, lang: Lang) =>
  relationLabels[relation][lang];
export const aiRoleLabel = (role: AiRole, lang: Lang) =>
  aiRoleLabels[role][lang];
export const fidelityLabel = (fidelity: Fidelity, lang: Lang) =>
  fidelityLabels[fidelity][lang];
export const statusLabel = (status: ActivityStatus, lang: Lang) =>
  statusLabels[status][lang];
export const scopeLabel = (scope: GameScope, lang: Lang) =>
  scopeLabels[scope][lang];

export function techLabel(tech: string, lang: Lang): string {
  return techLabels[tech]?.[lang] ?? humanizeTech(tech);
}

export function projectsCount(n: number, lang: Lang): string {
  return lang === "es"
    ? `${n} ${n === 1 ? "proyecto" : "proyectos"}`
    : `${n} ${n === 1 ? "project" : "projects"}`;
}

export const relationTones: Record<Relation, string> = {
  agent: "blue",
  clone: "violet",
  mod: "orange",
  environment: "emerald",
  "world-model": "pink",
  tool: "slate"
};

export const aiRoleTones: Record<AiRole, string> = {
  "built-with-ai": "violet",
  runtime: "orange",
  research: "blue",
  mixed: "slate"
};

export const fidelityTones: Record<Fidelity, string> = {
  exact: "rose",
  faithful: "amber",
  inspired: "violet",
  partial: "blue",
  "n/a": "slate"
};

export const statusTones: Record<ActivityStatus, string> = {
  active: "emerald",
  maintenance: "amber",
  dormant: "slate",
  archived: "rose",
  unknown: "slate"
};
