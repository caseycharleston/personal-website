import Card from './Card';

export default function BlogSection() {
  return (
    <section id="blog" className="min-h-screen container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium mb-16">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold">Getting Started with Next.js</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100">
              A comprehensive guide to building modern web applications with Next.js. Learn about
              server-side rendering, static generation, and more.
            </p>
            <p className="text-sm md:text-base text-gray-300">Published: December 2024</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold">The Art of Clean Code</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100">
              Exploring principles and practices for writing maintainable, readable code. Tips and
              tricks from years of development experience.
            </p>
            <p className="text-sm md:text-base text-gray-300">Published: November 2024</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold">Building Responsive UIs</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100">
              Best practices for creating user interfaces that work seamlessly across all devices.
              From mobile-first design to advanced CSS techniques.
            </p>
            <p className="text-sm md:text-base text-gray-300">Published: October 2024</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold">TypeScript Tips and Tricks</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100">
              Advanced TypeScript patterns and techniques to improve your development workflow. Learn
              about utility types, generics, and more.
            </p>
            <p className="text-sm md:text-base text-gray-300">Published: September 2024</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
