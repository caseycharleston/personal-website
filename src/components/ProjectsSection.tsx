import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  image?: {
    src: string;
    alt: string;
  };
  id: string;
}

const projects: Project[] = [];

export default function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium mb-16">Projects</h2>
      {projects.length === 0 ? (
        <p className="text-lg md:text-xl text-slate-200/80 leading-relaxed">
          I&apos;m curating a new set of builds—check back soon for featured projects.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              href={project.href}
              image={project.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}
