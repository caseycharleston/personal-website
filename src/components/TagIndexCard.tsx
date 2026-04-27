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
      className="block rounded-2xl border border-black/10 bg-[#F2F0E5] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFCF0]"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-mono font-semibold text-emerald-600">{tag}</h2>
        <p className="shrink-0 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm text-black/70">
          {countLabel}
        </p>
      </div>
    </Link>
  );
}
