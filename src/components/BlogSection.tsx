import PostCard from './PostCard';

const posts = [
  {
    id: 'getting-started-nextjs',
    title: 'Getting Started with Next.js',
    description:
      'A concise guide to building modern web applications with Next.js, from routing to deployment.',
    date: 'Dec 2024',
    href: '#',
    tags: ['Next.js', 'Routing', 'Deployment'],
    image: {
      src: '/images/texas-acm.jpeg',
      alt: 'Laptop with code editor open',
    },
  },
  {
    id: 'clean-code',
    title: 'The Art of Clean Code',
    description:
      'Principles and habits that make codebases easier to read, maintain, and extend.',
    date: 'Nov 2024',
    href: '#',
    tags: ['Engineering', 'Best Practices', 'Refactoring'],
    image: {
      src: '/images/firecracker.png',
      alt: 'Abstract developer workspace',
    },
  },
  {
    id: 'responsive-ui',
    title: 'Building Responsive UIs',
    description:
      'Patterns and layouts that keep interfaces consistent across mobile, tablet, and desktop.',
    date: 'Oct 2024',
    href: '#',
    tags: ['CSS', 'Responsive', 'Design Systems'],
    image: {
      src: '/images/ur5-arm.png',
      alt: 'Responsive layout sketches',
    },
  },
  {
    id: 'typescript-tricks',
    title: 'TypeScript Tips and Tricks',
    description:
      'Advanced TypeScript patterns to tighten your types and speed up your workflow.',
    date: 'Sep 2024',
    href: '#',
    tags: ['TypeScript', 'Types', 'Tooling'],
    image: {
      src: '/images/blockchain-collage.jpeg',
      alt: 'TypeScript code on screen',
    },
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="section-shell py-24">
      <h2 className="section-title mb-16">Blog</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            tags={post.tags}
            href={post.href}
            date={post.date}
            image={post.image}
          />
        ))}
      </div>
    </section>
  );
}
