import Card from './Card';

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="min-h-screen section-shell"
    >
      <h2 className="section-title mb-16">
        Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline underline-offset-4">
              Getting Started with Next.js
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-black">
              A comprehensive guide to building modern web applications with Next.js. Learn about
              server-side rendering, static generation, and more.
            </p>
            <p className="text-sm md:text-base text-black">Published: December 2024</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline underline-offset-4">
              The Art of Clean Code
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-black">
              Exploring principles and practices for writing maintainable, readable code. Tips and
              tricks from years of development experience.
            </p>
            <p className="text-sm md:text-base text-black">Published: November 2024</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline underline-offset-4">
              Building Responsive UIs
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-black">
              Best practices for creating user interfaces that work seamlessly across all devices.
              From mobile-first design to advanced CSS techniques.
            </p>
            <p className="text-sm md:text-base text-black">Published: October 2024</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline underline-offset-4">
              TypeScript Tips and Tricks
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-black">
              Advanced TypeScript patterns and techniques to improve your development workflow.
              Learn about utility types, generics, and more.
            </p>
            <p className="text-sm md:text-base text-black">Published: September 2024</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
