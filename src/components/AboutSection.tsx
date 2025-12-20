import Image from 'next/image';
import AnimatedWord from './AnimatedWord';
import Card from './Card';
import MapChart from './MapChart';
import MapMarker from './MapMarker';

export default function AboutSection() {
  const markerLabelSize = 18;

  return (
    <section id="about" className="section-shell">
      <h2 className="section-title mt-24 mb-16">Hi, I&apos;m Casey</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 text-black">
        <span className="text-xl font-mono">I&apos;m a</span>
        <span className="text-xl font-mono">
          <AnimatedWord />
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
        <Card>
          <div className="flex flex-col justify-center h-full p-8 space-y-6">
            <p className="text-lg leading-relaxed text-black">
              I&apos;m a computer science student at UT Austin. I&apos;m originally from the
              Dallas-Fort Worth area, though I&apos;ve lived all over the US + Canada.
            </p>
            <p className="leading-relaxed text-black">
              My career is mostly software engineering-related. My favorite parts of engineering are
              the collaborative problem-solving and knowledge-sharing. I&apos;ve also been a
              teaching assistant. If it were not for software engineering, I&apos;d happily look
              into getting my Master&apos;s and becoming a teacher.
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-center p-8">
            <div className="relative rounded-full overflow-hidden shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-400/30 ring-offset-8 ring-offset-[#FEFCF0] w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <Image
                src="/headshot.jpeg"
                width={1000}
                height={1000}
                alt="Headshot of Casey"
                className="object-cover w-full h-full"
                style={{ objectPosition: '55% 22%', transform: 'scale(1.4)' }}
              />
            </div>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-mono font-medium text-black mb-2">
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
        <Card className="lg:col-span-2">
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl md:text-3xl font-mono font-medium text-black">
              A Sample of My Favorite Things
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-lg text-black">
              <li>
                <span className="font-semibold">Sports Teams</span>: Longhorns, Seahawks, LAL (Los
                Angeles&apos; Luka)
              </li>
              <li>
                <span className="font-semibold">Movies</span>: <i>Fantastic Mr. Fox</i>,{' '}
                <i>Kubo and the Two Strings</i>, <i>The Truman Show</i>{' '}
              </li>
              <li>
                <span className="font-semibold">TV Shows</span>: <i>Adventure Time</i>,{' '}
                <i>Better Call Saul</i>, <i>Smiling Friends</i>, <i>Severance</i>, <i>Silo</i>
              </li>
              <li>
                <span className="font-semibold">Games</span>: <i>Baldur&apos;s Gate 3</i>,{' '}
                <i>The Binding of Isaac</i>, <i>Hades/Hades 2</i>, <i>Hollow Knight/Silksong</i>
              </li>

              <li>
                <span className="font-semibold">Coffee places</span>: Bennu Coffee (ATX), Stouthaus
                Coffee (ATX), Finjan Qahwa (SF)
              </li>
              <li>
                <span className="font-semibold">Food</span>: Cabo Bob&apos;s (ATX), Guppy&apos;s
                (ATX), FOB Sushi (Seattle), Bay Burgers (SF), Taqueria San Bruno{' '}
              </li>
              <li>
                <span className="font-semibold">Music</span>: Kendrick Lamar, SZA, Pusha T, Little
                Simz, Gorillaz, Tame Impala
              </li>
              <li>
                <span className="font-semibold">YouTubers</span>: CGP Grey, Lemmino, Nick Robinson,
                Super Eyepatch Wolf, Nexpo, RetroGamingNow, Paul Platt, Raycevick, Ludwig, mossbag,
                and plenty others. I watch too much YouTube
              </li>
              <li>
                <span className="font-semibold">Hobbies</span>: bouldering, biking, hiking,
                PC/keyboard building, writing, sharing my opinions, trying new things
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}
