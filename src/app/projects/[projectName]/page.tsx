import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
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

  const { meta, Content } = project;

  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4 mt-10">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-black/60">
            <Link
              href="/projects"
              className="underline underline-offset-2 decoration-black/60 transition-colors hover:text-emerald-600 hover:decoration-emerald-600"
            >
              Projects
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
                  <TagLink tag={tag} hrefBase="/projects/tags" />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center">
          <Image
            src={meta.imageSrc}
            alt={meta.imageAlt}
            width="0"
            height="0"
            sizes="100vw"
            unoptimized
            className="w-2/3 rounded-2xl border border-black/10 bg-black/5"
          />
        </div>
        <div className="space-y-6 border-t border-black/10 pt-10">
          <ProjectMdxContent Content={Content} />
        </div>
      </section>
    </main>
  );
}
