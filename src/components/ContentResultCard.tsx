import Link from 'next/link';
import TagLink from './TagLink';

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
    <article className="rounded-2xl border border-black/10 bg-[#F2F0E5] p-5 transition-shadow hover:shadow-lg hover:shadow-black/10">
      <div className="space-y-3">
        <Link
          href={href}
          className="block text-lg font-mono font-semibold text-emerald-600 underline-offset-4 transition-colors hover:text-emerald-700 hover:underline"
        >
          {title}
        </Link>
        <p className="text-xs font-mono uppercase tracking-wide text-black/60">{date}</p>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <li key={tag}>
                <TagLink tag={tag} hrefBase={tagHrefBase} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
