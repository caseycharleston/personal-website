import type { ReactNode } from 'react';
import Card from './Card';
import MapChart from './MapChart';
import MapMarker from './MapMarker';
import ContactSection from './ContactSection';

function AboutDetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-5">
      <div>
        <h3 className="text-2xl md:text-3xl font-mono font-medium text-foreground">{title}</h3>
        <hr className="mt-3 border-border" />
      </div>
      <div className="space-y-4 text-lg leading-relaxed text-foreground">{children}</div>
    </section>
  );
}

function StubList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function AboutSection() {
  const markerLabelSize = 18;

  return (
    <section id="about" className="section-shell">
      <h2 className="section-title mt-24 mb-16">About</h2>
      <div className="mx-auto mb-20 max-w-4xl space-y-6 text-lg leading-relaxed text-foreground">
        <p>
          Hi, I&apos;m Casey! Welcome to my personal website. I house my projects, blog posts, and
          social links to stay in touch here. I&apos;m currently working as a software engineer. I
          enjoy playing video games, bouldering, hiking, and watching long YouTube videos. I also
          really enjoy writing down my thoughts and having an organized productivity system.
        </p>
        <p>
          All of the content on the website is my own. None of the writing is AI-generated and is
          purely from my own thoughts. If you&apos;d like to contact me or want to get back in
          touch, feel free to reach out! My socials and email are found below.
        </p>
        <ContactSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
        <Card className="lg:col-span-2">
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-mono font-medium text-foreground mb-2">
                Where I&apos;ve Lived
              </h3>
            </div>
            <div className="h-90 lg:w-3xl md:w-xl sm:w-lg mx-auto">
              <MapChart
                className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                scale={800}
                center={[-100, 40]}
              >
                <MapMarker
                  id="prosper"
                  coordinates={[-96.8019, 33.2362]}
                  popupLabel="Prosper, TX"
                  labelFontSize={markerLabelSize}
                />
                <MapMarker
                  id="austin"
                  coordinates={[-97.7431, 30.2672]}
                  popupLabel="Austin, TX"
                  labelFontSize={markerLabelSize}
                />
                <MapMarker
                  id="san-mateo"
                  coordinates={[-122.3255, 37.5629]}
                  popupLabel="San Mateo, CA"
                  labelFontSize={markerLabelSize}
                />
                <MapMarker
                  id="bellevue"
                  coordinates={[-122.2015, 47.6101]}
                  popupLabel="Bellevue, WA"
                  labelFontSize={markerLabelSize}
                />
                <MapMarker
                  id="toronto"
                  coordinates={[-79.3832, 43.6532]}
                  popupLabel="Toronto, ON"
                  labelFontSize={markerLabelSize}
                />
                <MapMarker
                  id="grafton"
                  coordinates={[-71.6856, 42.207]}
                  popupLabel="Grafton, MA"
                  labelFontSize={markerLabelSize}
                />
              </MapChart>
            </div>
          </div>
        </Card>
      </div>
      <div className="mx-auto max-w-5xl space-y-16">
        <AboutDetailSection title="What I'm Doing Now">
          <p className="italic">Updated June 2026</p>
          <StubList
            items={[
              'Starting my new grad job as a SWE at Meta',
              'Learning (and vibe coding) iOS apps',
              'Moving to the bay area',
            ]}
          />
        </AboutDetailSection>
        <AboutDetailSection title="Website Plans">
          <p className="italic">Updated June 2026</p>
          <StubList items={['Daily TIL', 'Apple Music tracker', 'Making dumb little websites']} />
        </AboutDetailSection>

        <AboutDetailSection title="Tools">
          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="text-xl md:text-2xl font-mono font-medium text-foreground">Software</h4>
              <p>This website is hosted on Vercel and uses the Next.js framework.</p>
              <StubList
                items={[
                  'Coding: Visual Studio Code',
                  'Notes: Obsidian',
                  'Spotlight replacement: Raycast',
                  'Todo List: Things 3',
                  'Time tracking: Timery',
                  'Other fav apps: Dockdoor, Shottr, Cotypist, Thaw',
                ]}
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-xl md:text-2xl font-mono font-medium text-foreground">Hardware</h4>
              <StubList
                items={[
                  'Laptop: 16" MacBook M2 Pro',
                  'PC Specs: CPU, Motherboard, Memory, Storage, GPU, PSU, Case',
                  'Keyboard(s): Keychron K2 w/ Keychron Banana Switches | Keychron Q10 Pro w/ Holy Panda Switches',
                  'Headphones: DROP PC38X',
                  'Mouse: Logitech G PRO X Superlight 2',
                ]}
              />
            </div>
          </div>
        </AboutDetailSection>
        <AboutDetailSection title="Food">
          <StubList
            items={[
              "Austin: Cabo Bob's, Guppy's, Two Goose, Paprika",
              'Bay Area: Bay Burgers, Taqueria San Bruno',
              'Seatte: FOB Sushi, FOB Poke, Pike Place Chowder',
            ]}
          />
        </AboutDetailSection>
        <AboutDetailSection title="Coffee">
          <StubList
            items={[
              'Austin: Bennu Coffee, Noble Joe Coffee, Hometown Coffee, BRB Coffee, Stouthaus Coffee',
              'Bay Area: Finjan Qahwa, Kaizen & Coffee',
            ]}
          />
        </AboutDetailSection>
        <AboutDetailSection title="Movie/TV Shows">
          <StubList
            items={[
              'Fantastic Mr. Fox',
              'The Truman Show',
              'Kubo and the Two Strings',
              'Adventure Time',
              'Breaking Bad/Better Call Saul',
              'Severance',
              'Silo',
            ]}
          />
        </AboutDetailSection>
        <AboutDetailSection title="Video Games">
          <StubList
            items={[
              "Baldur's Gate 3",
              'The Bindinf of Isaac',
              'Hades 1 and 2',
              'Hollow Knight and Hollow Knight: Silksong',
              'Overwatch',
              'Battlefield 1',
            ]}
          />
        </AboutDetailSection>
      </div>
    </section>
  );
}
