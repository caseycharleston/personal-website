import { notFound } from 'next/navigation';
import ContentPageHeader from '@/components/ContentPageHeader';
import Header from '@/components/Header';
import TableOfContents from '@/components/TableOfContents';
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
    <main className="bg-background text-foreground">
      <Header />
      <section className="section-shell space-y-10">
        <ContentPageHeader
          breadcrumb={{ label: 'Blog', href: '/blog' }}
          title={meta.title}
          description={meta.description}
          date={meta.date}
          tags={meta.tags}
          tagHrefBase="/blog/tags"
        />

        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
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
