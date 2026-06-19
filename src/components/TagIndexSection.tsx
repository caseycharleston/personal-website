import TagIndexCard from './TagIndexCard';
import type { TagSummaryGroup } from '@/lib/tags';

interface TagIndexSectionProps {
  title: string;
  subtitle: string;
  tagGroups: TagSummaryGroup[];
  tagHrefBase: string;
  singularLabel: string;
  pluralLabel: string;
}

export default function TagIndexSection({
  title,
  subtitle,
  tagGroups,
  tagHrefBase,
  singularLabel,
  pluralLabel,
}: TagIndexSectionProps) {
  return (
    <section className="section-shell space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-mono font-semibold text-foreground sm:text-4xl">{title}</h1>
        <p className="text-base text-muted">{subtitle}</p>
      </div>
      <div className="space-y-12">
        {tagGroups.map(group => (
          <section key={group.label} className="space-y-4">
            <h2 className="border-b border-border pb-2 text-2xl font-mono font-semibold text-foreground">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.tags.map(tag => (
                <TagIndexCard
                  key={tag.slug}
                  tag={tag.tag}
                  countLabel={`${tag.count} ${tag.count === 1 ? singularLabel : pluralLabel}`}
                  href={`${tagHrefBase}/${tag.slug}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
