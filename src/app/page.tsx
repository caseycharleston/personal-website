import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";

export default function Home() {
  return (
    <main>
      <Header />
      <section id="top">
        <Hero />
      </section>
      <AboutSection />
      <ProjectsSection />
      <ResumeSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
