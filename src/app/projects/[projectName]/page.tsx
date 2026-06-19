import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import TableOfContents from '@/components/TableOfContents';
import TagLink from '@/components/TagLink';
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
        <div className="space-y-4 mt-10">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted">
            <Link
              href="/projects"
              className="underline underline-offset-2 decoration-muted lnk hover:text-accent hover:decoration-accent"
            >
              Projects
            </Link>{' '}
            / {meta.title}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-foreground sm:text-4xl">{meta.title}</h1>
          <p className="text-base text-foreground/80">{meta.description}</p>
          <p className="text-xs font-mono uppercase tracking-wide text-muted">{meta.date}</p>
          {meta.tags && meta.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {meta.tags.map(tag => (
                <li key={tag}>
                  <TagLink tag={tag} hrefBase="/projects/tags" />
                </li>
              ))}
            </ul>
          )}
        </div>
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
