import BlogSection from '@/components/BlogSection';
import Header from '@/components/Header';

export default function BlogPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <BlogSection />
    </main>
  );
}
