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
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-black/60">
            <Link
              href="/blog/tags"
              className="underline underline-offset-2 decoration-black/60 transition-colors hover:text-emerald-600 hover:decoration-emerald-600"
            >
              Blog Tags
            </Link>{' '}
            / {tagSummary.tag}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-black sm:text-4xl">
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
