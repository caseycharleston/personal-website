import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import ProjectsSection from '@/components/ProjectsSection';
import ResumeSection from '@/components/ResumeSection';

export default function Home() {
  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <AboutSection />
      <ProjectsSection />
      <ResumeSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
