import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import HomeIntroSection from '@/components/HomeIntroSection';

export default function Home() {
  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <HomeIntroSection />
      <ContactSection className="pt-8" />
    </main>
  );
}
