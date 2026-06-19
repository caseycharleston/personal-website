import Link from 'next/link';

interface TagIndexCardProps {
  tag: string;
  countLabel: string;
  href: string;
}

export default function TagIndexCard({ tag, countLabel, href }: TagIndexCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-mono font-semibold text-accent">{tag}</h2>
        <p className="shrink-0 rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm text-muted">
          {countLabel}
        </p>
      </div>
    </Link>
  );
}
