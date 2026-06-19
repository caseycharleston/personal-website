import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentResultCard from '@/components/ContentResultCard';
import Header from '@/components/Header';
import { getBlogPosts } from '@/lib/mdx-content';
import { getEntriesForTag, getTagSummaries, getTagSummary } from '@/lib/tags';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return getTagSummaries(posts).map(tag => ({ tag: tag.slug }));
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getBlogPosts();
  const tagSummary = getTagSummary(posts, tag);

  if (!tagSummary) {
    notFound();
  }

  const matchingPosts = getEntriesForTag(posts, tagSummary.slug);

  return (
    <main className="bg-background text-foreground">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted">
            <Link
              href="/blog/tags"
              className="underline underline-offset-2 decoration-muted lnk hover:text-accent hover:decoration-accent"
            >
              Blog Tags
            </Link>{' '}
            / {tagSummary.tag}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-foreground sm:text-4xl">
            Results for blogs tagged with {tagSummary.tag}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {matchingPosts.map(post => (
            <ContentResultCard
              key={post.slug}
              title={post.meta.title}
              date={post.meta.date}
              tags={post.meta.tags ?? []}
              href={`/blog/${post.slug}`}
              tagHrefBase="/blog/tags"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
