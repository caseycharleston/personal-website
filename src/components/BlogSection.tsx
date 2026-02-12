import PostCard from './PostCard';
import { getBlogPosts } from '@/lib/mdx-content';

export default async function BlogSection() {
  const posts = await getBlogPosts();
  return (
    <section id="blog" className="section-shell py-24">
      <h2 className="section-title mb-16">Blog</h2>
      <div className="py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard
              key={post.slug}
              title={post.meta.title}
              description={post.meta.description}
              tags={post.meta.tags ?? []}
              href={`/blog/${post.slug}`}
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
