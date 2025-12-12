import Image from 'next/image';
import Card from './Card';
import MapChart from './MapChart';
import MapMarker from './MapMarker';

export default function AboutSection() {
  const markerLabelSize = 18;

  return (
    <section id="about" className="container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium text-black mb-16">
        About Me
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
        <Card>
          <div className="flex flex-col justify-center h-full p-8 space-y-6">
            <p className="text-lg leading-relaxed text-black">
              Hi there! I&apos;m Casey, a computer science student at UT Austin. I&apos;m orignally
              from the Dallas-Fort Worth area, though I&apos;ve lived all over the US + Canada.
            </p>
            <p className="text-lg leading-relaxed text-black">
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
      </div>
    </section>
  );
}
