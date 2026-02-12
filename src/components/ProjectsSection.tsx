import { getProjectPosts } from '@/lib/mdx-content';
import PostCard from './PostCard';

export default async function ProjectsSection() {
  const projects = await getProjectPosts();

  return (
    <section id="projects" className="section-shell py-24">
      <h2 className="section-title mb-16">Projects</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => (
          <PostCard
            key={project.slug}
            title={project.meta.title}
            description={project.meta.description}
            tags={project.meta.tags ?? []}
            href={`/projects/${project.slug}`}
            date={project.meta.date}
            imageSrc={project.meta.imageSrc}
            imageAlt={project.meta.imageAlt}
          />
        ))}
      </div>
    </section>
  );
}
