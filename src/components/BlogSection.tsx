import Link from 'next/link';
import PostCard from './PostCard';
import { getBlogPosts, parseBlogDate, type MdxEntry } from '@/lib/mdx-content';

type BlogPostGroup = {
  key: string;
  label: string;
  posts: MdxEntry[];
  sortValue: number;
};

const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function getBlogPostGroups(posts: MdxEntry[]) {
  const groups = new Map<string, BlogPostGroup>();
  const otherPosts: MdxEntry[] = [];

  for (const post of posts) {
    const timestamp = parseBlogDate(post.meta.date);

    if (!Number.isFinite(timestamp)) {
      otherPosts.push(post);
      continue;
    }

    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const key = `${year}-${month}`;

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: monthYearFormatter.format(date),
        posts: [],
        sortValue: Date.UTC(year, month, 1),
      });
    }

    groups.get(key)?.posts.push(post);
  }

  const datedGroups = Array.from(groups.values()).sort((a, b) => b.sortValue - a.sortValue);

  if (otherPosts.length === 0) {
    return datedGroups;
  }

  return [
    ...datedGroups,
    {
      key: 'other',
      label: 'Other',
      posts: otherPosts,
      sortValue: Number.NEGATIVE_INFINITY,
    },
  ];
}

export default async function BlogSection() {
  const posts = await getBlogPosts();
  const postGroups = getBlogPostGroups(posts);

  return (
    <section id="blog" className="section-shell py-24">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="section-title mb-0">Blog</h2>
        <p className="mx-auto max-w-3xl text-base text-muted">
          My written down thoughts, opinions, and ideas -- now all in one place! View posts by tag{' '}
          <Link
            href="/blog/tags"
            className="underline text-accent lnk hover:text-accent"
          >
            here
          </Link>
          .
        </p>
      </div>
      <div className="space-y-16 py-24">
        {postGroups.map(group => (
          <section key={group.key} className="space-y-6">
            <h3 className="font-mono text-2xl font-semibold text-foreground">{group.label}</h3>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.posts.map(post => (
                <PostCard
                  key={post.slug}
                  title={post.meta.title}
                  description={post.meta.description}
                  tags={post.meta.tags ?? []}
                  href={`/blog/${post.slug}`}
                  tagHrefBase="/blog/tags"
                  date={post.meta.date}
                  imageSrc={post.meta.imageSrc}
                  imageAlt={post.meta.imageAlt}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
