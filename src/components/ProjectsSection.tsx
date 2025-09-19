import Card from './Card';

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen container mx-auto py-20">
      <h2 className="text-xl lg:text-4xl font-mono font-medium mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-mono font-medium mb-3">Personal Website</h3>
          <p className="text-lg leading-relaxed mb-4">
            A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.
            Features animated components and a clean, minimalist design.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              Next.js
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              Tailwind CSS
            </span>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-mono font-medium mb-3">E-commerce Platform</h3>
          <p className="text-lg leading-relaxed mb-4">
            A full-stack e-commerce solution with user authentication, payment processing, and
            inventory management. Built with modern web technologies.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              React
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              Node.js
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              MongoDB
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}
