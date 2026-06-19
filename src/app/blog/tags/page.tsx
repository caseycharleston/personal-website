import Header from '@/components/Header';
import TagIndexSection from '@/components/TagIndexSection';
import { getBlogPosts } from '@/lib/mdx-content';
import { getTagSummaries, getTagSummaryGroups } from '@/lib/tags';

export default async function BlogTagsPage() {
  const posts = await getBlogPosts();
  const tagGroups = getTagSummaryGroups(getTagSummaries(posts));

  return (
    <main className="bg-background text-foreground">
      <Header />
      <TagIndexSection
        title="Blog Tags"
        subtitle="Browse blog posts by tag."
        tagGroups={tagGroups}
        tagHrefBase="/blog/tags"
        singularLabel="post"
        pluralLabel="posts"
      />
    </main>
  );
}
