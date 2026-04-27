import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentResultCard from '@/components/ContentResultCard';
import Header from '@/components/Header';
import { getProjectPosts } from '@/lib/mdx-content';
import { getEntriesForTag, getTagSummaries, getTagSummary } from '@/lib/tags';

export async function generateStaticParams() {
  const projects = await getProjectPosts();
  return getTagSummaries(projects).map(tag => ({ tag: tag.slug }));
}

export default async function ProjectTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const projects = await getProjectPosts();
  const tagSummary = getTagSummary(projects, tag);

  if (!tagSummary) {
    notFound();
  }

  const matchingProjects = getEntriesForTag(projects, tagSummary.slug);

  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-black/60">
            <Link
              href="/projects/tags"
              className="underline underline-offset-2 decoration-black/60 transition-colors hover:text-emerald-600 hover:decoration-emerald-600"
            >
              Project Tags
            </Link>{' '}
            / {tagSummary.tag}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-black sm:text-4xl">
            Results for projects tagged with {tagSummary.tag}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {matchingProjects.map(project => (
            <ContentResultCard
              key={project.slug}
              title={project.meta.title}
              date={project.meta.date}
              tags={project.meta.tags ?? []}
              href={`/projects/${project.slug}`}
              tagHrefBase="/projects/tags"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
