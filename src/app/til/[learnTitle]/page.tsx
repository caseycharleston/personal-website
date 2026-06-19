import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { formatTilDate, getTILBySlug, getTILs, TILMdxContent } from '@/lib/mdx-content';

export async function generateStaticParams() {
  const tils = await getTILs();
  return tils.map(til => ({ learnTitle: til.slug }));
}

export default async function TILPage({ params }: { params: Promise<{ learnTitle: string }> }) {
  const { learnTitle } = await params;
  const til = await getTILBySlug(learnTitle);

  if (!til) {
    notFound();
  }

  const { meta, Content } = til;

  return (
    <main className="bg-background text-foreground">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted">
            <Link
              href="/til"
              className="underline underline-offset-2 decoration-muted transition-colors hover:text-accent hover:decoration-accent"
            >
              TIL
            </Link>{' '}
            / {meta.title}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-foreground sm:text-4xl">
            {meta.title}
          </h1>
          <p className="text-xs font-mono uppercase tracking-wide text-muted">
            {formatTilDate(meta.date)}
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <article className="min-w-0 max-w-3xl space-y-6">
            <TILMdxContent Content={Content} />
          </article>
        </div>
      </section>
    </main>
  );
}
