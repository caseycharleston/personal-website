import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import HomeIndexTables from '@/components/HomeIndexTables';
import HomeIntroSection from '@/components/HomeIntroSection';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <HomeIntroSection />
      <HomeIndexTables />
      <ContactSection className="pt-8" />
    </main>
  );
}
