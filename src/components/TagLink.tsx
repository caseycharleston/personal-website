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
      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black transition-colors hover:border-emerald-600/30 hover:bg-emerald-600/10 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFCF0]"
    >
      {tag}
    </Link>
  );
}
