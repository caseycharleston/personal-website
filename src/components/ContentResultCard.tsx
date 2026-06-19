import Link from 'next/link';
import TagList from './TagList';

interface ContentResultCardProps {
  title: string;
  date: string;
  tags?: string[];
  href: string;
  tagHrefBase: string;
}

export default function ContentResultCard({
  title,
  date,
  tags = [],
  href,
  tagHrefBase,
}: ContentResultCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-black/10">
      <div className="space-y-3">
        <Link
          href={href}
          className="block text-lg font-mono font-semibold text-accent underline-offset-4 lnk hover:text-accent hover:underline"
        >
          {title}
        </Link>
        <p className="text-xs font-mono uppercase tracking-wide text-muted">{date}</p>
        <TagList tags={tags} hrefBase={tagHrefBase} />
      </div>
    </article>
  );
}
