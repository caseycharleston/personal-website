import Card from './Card';

export default function BlogSection() {
  return (
    <section id="blog" className="min-h-screen container mx-auto py-20">
      <h2 className="text-xl lg:text-4xl font-mono font-medium mb-8">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-mono font-medium mb-3">Getting Started with Next.js</h3>
          <p className="text-lg leading-relaxed mb-4">
            A comprehensive guide to building modern web applications with Next.js. Learn about
            server-side rendering, static generation, and more.
          </p>
          <p className="text-gray-300 text-sm">Published: December 2024</p>
        </Card>
        <Card>
          <h3 className="text-xl font-mono font-medium mb-3">The Art of Clean Code</h3>
          <p className="text-lg leading-relaxed mb-4">
            Exploring principles and practices for writing maintainable, readable code. Tips and
            tricks from years of development experience.
          </p>
          <p className="text-gray-300 text-sm">Published: November 2024</p>
        </Card>
        <Card>
          <h3 className="text-xl font-mono font-medium mb-3">Building Responsive UIs</h3>
          <p className="text-lg leading-relaxed mb-4">
            Best practices for creating user interfaces that work seamlessly across all devices.
            From mobile-first design to advanced CSS techniques.
          </p>
          <p className="text-gray-300 text-sm">Published: October 2024</p>
        </Card>
        <Card>
          <h3 className="text-xl font-mono font-medium mb-3">TypeScript Tips and Tricks</h3>
          <p className="text-lg leading-relaxed mb-4">
            Advanced TypeScript patterns and techniques to improve your development workflow. Learn
            about utility types, generics, and more.
          </p>
          <p className="text-gray-300 text-sm">Published: September 2024</p>
        </Card>
      </div>
    </section>
  );
}
