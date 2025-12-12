import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  href: string;
  date: string;
  image?: {
    src: string;
    alt: string;
  };
}

const projects: Project[] = [
  {
    id: 'aos-lab-project',
    title: 'AWS Firecracker/GCP gVisor Comparison Study',
    description:
      'As part of my Advanced OS class, a partner and I ran a small comparison study against the AWS/GCP solution to serverless functions in a simulated environment.',
    technologies: ['gVisor', 'Firecracker', 'Docker', 'Python/FastAPI'],
    href: '#',
    date: 'Oct 2025 - Dec 2025',
  },
  {
    id: 'texas-acm-website',
    title: 'Texas ACM Website',
    description:
      "Roadmapped and implemented a redesign of Texas ACM's website, UT Austin's chapter of ACM",
    technologies: ['React', 'Next.js', 'Vercel', 'Typescript', 'TailwindCSS'],
    href: 'https://www.texasacm.org/',
    date: 'Apr 2025 - Present',
  },
  {
    id: 'treasury-crypto',
    title: 'On Transforming the US Treasury to use Cryptocurrency',
    description:
      'A research paper investigating the theoretical energy costs of transitioning the US Treasury to use cryptocurrency as a basis for transactions',
    technologies: ['Consensus Algorithms', 'Distributed Computing', 'Cryptocurrency'],
    href: '#',
    date: 'Feb 2025 - Apr 2025',
  },
  {
    id: 'ut-registration-plus',
    title: 'UT Registration Plus',
    description:
      'Worked on the frontend for the v2 release of a chrome extension used by 50K+ users helping UT Austin students register for classes',
    technologies: ['Chromium', 'React', 'Typescript', 'TailwindCSS'],
    href: 'https://chromewebstore.google.com/detail/ut-registration-plus/hboadpjkoaieogjimneceaahlppnipaa?hl=en&pli=1',
    date: 'Sep 2023 - Apr 2024',
  },
  {
    id: 'better-gaze-detection',
    title: 'Better Gaze Detection',
    description:
      'A research project for better gaze detection for 3D virtual agents on 2D screens from the perspective of humans.',
    technologies: ['Ceres Solver', 'Unity', 'C++', 'C#'],
    href: '#',
    date: 'Aug 2023 - Dec 2023',
  },
  {
    id: 'ur-v5-virtualized-arm',
    title: 'UR v5 Virtualized Arm',
    description:
      'Configured a Universal Robotics v5 arm virtual simulation to enable collision detection and motion planning.',
    technologies: ['ROS/RViz', 'Gazebo', 'C++', 'Embedded Programming'],
    href: 'https://github.com/caseycharleston/v5_ur5arm',
    date: 'May 2023 - Aug 2023',
  },
  {
    id: 'sugoroku',
    title: 'Sugoroku',
    description:
      'Built a multiplayer game in Unity based on the traditional Japanese game of Sugoroku.',
    technologies: ['Unity', 'C#'],
    href: 'https://www.utjapanlab.com/ready-set-yokohama',
    date: 'Jan 2023 - Apr 2023',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell">
      <h2 className="section-title mb-16">
        Projects
      </h2>
      {projects.length === 0 ? (
        <p className="text-lg md:text-xl text-black leading-relaxed">
          I&apos;m curating a new set of builds—check back soon for featured projects.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              href={project.href}
              date={project.date}
              image={project.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}
