import { notFound } from 'next/navigation';
import ContentPageHeader from '@/components/ContentPageHeader';
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
        <ContentPageHeader
          breadcrumb={{ label: 'TIL', href: '/til' }}
          title={meta.title}
          date={formatTilDate(meta.date)}
        />

        <div className="border-t border-border pt-10">
          <article className="min-w-0 max-w-3xl space-y-6">
            <TILMdxContent Content={Content} />
          </article>
        </div>
      </section>
    </main>
  );
}
