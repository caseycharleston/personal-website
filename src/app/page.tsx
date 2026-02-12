import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
