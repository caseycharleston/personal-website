import Header from '@/components/Header';
import TagIndexCard from '@/components/TagIndexCard';
import { getBlogPosts } from '@/lib/mdx-content';
import { getTagSummaries, getTagSummaryGroups } from '@/lib/tags';

export default async function BlogTagsPage() {
  const posts = await getBlogPosts();
  const tags = getTagSummaries(posts);
  const tagGroups = getTagSummaryGroups(tags);

  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-mono font-semibold text-black sm:text-4xl">Blog Tags</h1>
          <p className="text-base text-black/80">Browse blog posts by tag.</p>
        </div>
        <div className="space-y-12">
          {tagGroups.map(group => (
            <section key={group.label} className="space-y-4">
              <h2 className="border-b border-black/10 pb-2 text-2xl font-mono font-semibold text-black">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.tags.map(tag => (
                  <TagIndexCard
                    key={tag.slug}
                    tag={tag.tag}
                    countLabel={`${tag.count} ${tag.count === 1 ? 'post' : 'posts'}`}
                    href={`/blog/tags/${tag.slug}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
