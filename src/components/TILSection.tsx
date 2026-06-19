import Link from 'next/link';
import { formatTilDate, getTILBySlug, getTILs, TILMdxContent } from '@/lib/mdx-content';

export default async function TILSection() {
  const list = await getTILs();
  const entries = (await Promise.all(list.map(til => getTILBySlug(til.slug)))).filter(
    (entry): entry is NonNullable<typeof entry> => entry !== null
  );

  return (
    <section id="til" className="section-shell">
      <div className="mb-16 text-center">
        <h2 className="section-title mb-0">TIL (Today I Learned)</h2>
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-base text-muted">Nothing here yet -- check back soon.</p>
      ) : (
        <ul className="mx-auto max-w-4xl divide-y divide-border">
          {entries.map(entry => (
            <li
              key={entry.slug}
              className="py-10 md:grid md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
            >
              <p className="mb-3 text-xs font-mono uppercase tracking-wide text-muted md:mb-0 md:pt-1">
                {formatTilDate(entry.meta.date)}
              </p>
              <div className="min-w-0 space-y-4">
                <Link
                  href={`/til/${entry.slug}`}
                  className="block text-xl font-mono font-semibold text-accent underline-offset-4 transition-colors hover:underline"
                >
                  <h3>{entry.meta.title}</h3>
                </Link>
                <div className="space-y-4">
                  <TILMdxContent Content={entry.Content} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
