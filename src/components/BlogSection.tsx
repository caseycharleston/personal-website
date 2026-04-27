import Link from 'next/link';
import PostCard from './PostCard';
import { getBlogPosts } from '@/lib/mdx-content';

export default async function BlogSection() {
  const posts = await getBlogPosts();
  return (
    <section id="blog" className="section-shell py-24">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="section-title mb-0">Blog</h2>
        <p className="mx-auto max-w-3xl text-base text-black/80">
          My written down thoughts, opinions, and ideas -- now all in one place! View posts by tag{' '}
          <Link
            href="/blog/tags"
            className="underline text-emerald-600 transition-colors duration-200 hover:text-emerald-800"
          >
            here
          </Link>
          .
        </p>
      </div>
      <div className="py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
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
      </div>
    </section>
  );
}
