import Link from 'next/link';
import { normalizeTagSlug } from '@/lib/tags';

interface TagLinkProps {
  tag: string;
  hrefBase: string;
}

export default function TagLink({ tag, hrefBase }: TagLinkProps) {
  return (
    <Link
      href={`${hrefBase}/${normalizeTagSlug(tag)}`}
      className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs text-foreground transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {tag}
    </Link>
  );
}
