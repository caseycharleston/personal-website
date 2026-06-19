import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContentPageHeader from '@/components/ContentPageHeader';
import Header from '@/components/Header';
import TableOfContents from '@/components/TableOfContents';
import { getProjectPostBySlug, getProjectPosts, ProjectMdxContent } from '@/lib/mdx-content';

export async function generateStaticParams() {
  const projects = await getProjectPosts();
  return projects.map(project => ({ projectName: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;
  const project = await getProjectPostBySlug(projectName);

  if (!project) {
    notFound();
  }

  const { meta, Content, toc } = project;

  return (
    <main className="bg-background text-foreground">
      <Header />
      <section className="section-shell space-y-10">
        <ContentPageHeader
          breadcrumb={{ label: 'Projects', href: '/projects' }}
          title={meta.title}
          description={meta.description}
          date={meta.date}
          tags={meta.tags}
          tagHrefBase="/projects/tags"
          className="mt-10"
        />
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <article className="min-w-0 space-y-6">
            <div className="flex justify-center">
              <Image
                src={meta.imageSrc}
                alt={meta.imageAlt}
                width="0"
                height="0"
                sizes="100vw"
                unoptimized
                className="w-2/3 rounded-2xl border border-border bg-foreground/5"
              />
            </div>
            <ProjectMdxContent Content={Content} />
          </article>
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </section>
    </main>
  );
}
