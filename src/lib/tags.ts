import type { MdxEntry } from './mdx-content';

export interface TagSummary {
  tag: string;
  slug: string;
  count: number;
}

export interface TagSummaryGroup {
  label: string;
  tags: TagSummary[];
}

export function normalizeTagSlug(tag: string) {
  const slug = tag
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || encodeURIComponent(tag.trim().toLowerCase());
}

export function getTagSummaries(entries: MdxEntry[]) {
  const summaries = new Map<string, TagSummary>();

  entries.forEach(entry => {
    const seenTags = new Set<string>();

    entry.meta.tags?.forEach(tag => {
      const slug = normalizeTagSlug(tag);

      if (seenTags.has(slug)) {
        return;
      }

      seenTags.add(slug);
      const current = summaries.get(slug);

      if (current) {
        current.count += 1;
      } else {
        summaries.set(slug, {
          tag,
          slug,
          count: 1,
        });
      }
    });
  });

  return Array.from(summaries.values()).sort((a, b) =>
    a.tag.localeCompare(b.tag, undefined, { sensitivity: 'base' })
  );
}

export function getTagSummaryGroups(tags: TagSummary[]) {
  const letterGroups = new Map<string, TagSummary[]>();
  const otherTags: TagSummary[] = [];

  tags.forEach(tag => {
    const firstLetter = tag.tag.trim().charAt(0).toUpperCase();

    if (/^[A-Z]$/.test(firstLetter)) {
      const existingTags = letterGroups.get(firstLetter) ?? [];
      existingTags.push(tag);
      letterGroups.set(firstLetter, existingTags);
    } else {
      otherTags.push(tag);
    }
  });

  const groups: TagSummaryGroup[] = Array.from(letterGroups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, groupedTags]) => ({
      label,
      tags: groupedTags,
    }));

  if (otherTags.length > 0) {
    groups.push({
      label: 'Other',
      tags: otherTags,
    });
  }

  return groups;
}

export function getEntriesForTag(entries: MdxEntry[], tagSlug: string) {
  return entries.filter(entry =>
    entry.meta.tags?.some(tag => normalizeTagSlug(tag) === tagSlug.toLowerCase())
  );
}

export function getTagSummary(entries: MdxEntry[], tagSlug: string) {
  return getTagSummaries(entries).find(tag => tag.slug === tagSlug.toLowerCase()) ?? null;
}
