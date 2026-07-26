import { marked } from "marked";

export interface LogEntryData {
  slug: string;
  day: number;
  title: string;
  date: string; // ISO, e.g. 2026-07-16
  summary: string;
  html: string;
}

/**
 * Parses the `--- key: value ---` frontmatter block at the top of a log file.
 * Values are plain strings; no YAML nesting — keep entries simple on purpose,
 * so adding a day is just writing prose.
 */
function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: raw.slice(match[0].length) };
}

const files = import.meta.glob("../content/log/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function toEntry(raw: string): LogEntryData {
  const { meta, body } = parseFrontmatter(raw);
  const day = Number(meta.day ?? 0);
  return {
    slug: meta.slug ?? `day-${day}`,
    day,
    title: meta.title ?? `Day ${day}`,
    date: meta.date ?? "",
    summary: meta.summary ?? "",
    html: marked.parse(body, { async: false, gfm: true }),
  };
}

export const logEntries: LogEntryData[] = Object.values(files)
  .map(toEntry)
  .sort((a, b) => b.day - a.day); // newest first

export function entryBySlug(slug: string): LogEntryData | undefined {
  return logEntries.find((e) => e.slug === slug);
}
