import Link from 'next/link';
import TagList from './TagList';

interface ContentPageHeaderProps {
  breadcrumb: { label: string; href: string };
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  tagHrefBase?: string;
  className?: string;
}

export default function ContentPageHeader({
  breadcrumb,
  title,
  date,
  description,
  tags,
  tagHrefBase,
  className,
}: ContentPageHeaderProps) {
  return (
    <div className={['space-y-4', className].filter(Boolean).join(' ')}>
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted">
        <Link
          href={breadcrumb.href}
          className="underline underline-offset-2 decoration-muted lnk hover:text-accent hover:decoration-accent"
        >
          {breadcrumb.label}
        </Link>{' '}
        / {title}
      </p>
      <h1 className="text-3xl font-mono font-semibold text-foreground sm:text-4xl">{title}</h1>
      {description && <p className="text-base text-foreground/80">{description}</p>}
      <p className="text-xs font-mono uppercase tracking-wide text-muted">{date}</p>
      {tags && tags.length > 0 && tagHrefBase && <TagList tags={tags} hrefBase={tagHrefBase} />}
    </div>
  );
}
