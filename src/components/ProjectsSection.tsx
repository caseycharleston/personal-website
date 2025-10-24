import Card from './Card';

export default function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium mb-16">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="h-full">
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold">Personal Website</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100">
              A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.
              Features animated components and a clean, minimalist design.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-sm md:text-base">
                Next.js
              </span>
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-sm md:text-base">
                TypeScript
              </span>
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-sm md:text-base">
                Tailwind CSS
              </span>
            </div>
          </div>
        </Card>
        <Card className="h-full">
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold">E-commerce Platform</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100">
              A full-stack e-commerce solution with user authentication, payment processing, and
              inventory management. Built with modern web technologies.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-green-500/20 text-green-200 rounded-full text-sm md:text-base">
                React
              </span>
              <span className="px-4 py-1.5 bg-green-500/20 text-green-200 rounded-full text-sm md:text-base">
                Node.js
              </span>
              <span className="px-4 py-1.5 bg-green-500/20 text-green-200 rounded-full text-sm md:text-base">
                MongoDB
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
