import Link from 'next/link';
import { getProjectPosts } from '@/lib/mdx-content';
import PostCard from './PostCard';

export default async function ProjectsSection() {
  const projects = await getProjectPosts();

  return (
    <section id="projects" className="section-shell py-24">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="section-title mb-0">Projects</h2>
        <p className="mx-auto max-w-3xl text-base text-muted">
          A collection of things I&apos;ve worked on throughout college and as a side project. View
          projects by tag{' '}
          <Link
            href="/projects/tags"
            className="underline text-accent transition-colors duration-200 hover:text-accent"
          >
            here
          </Link>
          .
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => (
          <PostCard
            key={project.slug}
            title={project.meta.title}
            description={project.meta.description}
            tags={project.meta.tags ?? []}
            href={`/projects/${project.slug}`}
            tagHrefBase="/projects/tags"
            date={project.meta.date}
            imageSrc={project.meta.imageSrc}
            imageAlt={project.meta.imageAlt}
          />
        ))}
      </div>
    </section>
  );
}
