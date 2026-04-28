import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import HomeIndexTables from '@/components/HomeIndexTables';
import HomeIntroSection from '@/components/HomeIntroSection';

export default function Home() {
  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <HomeIntroSection />
      <HomeIndexTables />
      <ContactSection className="pt-8" />
    </main>
  );
}
