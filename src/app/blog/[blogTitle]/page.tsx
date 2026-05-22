import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import TableOfContents from '@/components/TableOfContents';
import TagLink from '@/components/TagLink';
import { getBlogPostBySlug, getBlogPosts, BlogMdxContent } from '@/lib/mdx-content';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ blogTitle: post.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ blogTitle: string }> }) {
  const { blogTitle } = await params;
  const post = await getBlogPostBySlug(blogTitle);

  if (!post) {
    notFound();
  }

  const { meta, Content, toc } = post;

  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-black/60">
            <Link
              href="/blog"
              className="underline underline-offset-2 decoration-black/60 transition-colors hover:text-emerald-600 hover:decoration-emerald-600"
            >
              Blog
            </Link>{' '}
            / {meta.title}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-black sm:text-4xl">{meta.title}</h1>
          <p className="text-base text-black/80">{meta.description}</p>
          <p className="text-xs font-mono uppercase tracking-wide text-black/60">{meta.date}</p>
          {meta.tags && meta.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {meta.tags.map(tag => (
                <li key={tag}>
                  <TagLink tag={tag} hrefBase="/blog/tags" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <article className="min-w-0 space-y-6">
            <BlogMdxContent Content={Content} />
          </article>
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </section>
    </main>
  );
}
