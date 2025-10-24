import Image from 'next/image';
import Card from './Card';

interface TimelineEntry {
  date: string;
  title: string;
  image?: string;
  side: 'left' | 'right';
}

const timelineData: TimelineEntry[] = [
  { date: '2022', title: 'UT Austin Freshman', side: 'left' },
  { date: 'Summer 2023', title: 'Robotics Research Assistant', side: 'right' },
  { date: 'Summer 2024', title: 'Meta SWE Intern', side: 'left' },
  { date: 'Fall 2024', title: 'Discover ServiceNow', side: 'right' },
  { date: 'Summer 2025', title: 'Meta SWE Intern', side: 'left' },
  { date: 'Spring 2026', title: 'UT Austin Graduation', side: 'right' },
  { date: 'Summer 2026', title: 'Meta New Grad', side: 'left' },
];

function TimelineItem({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) {
  const isLeft = entry.side === 'left';

  return (
    <div className="relative flex items-center justify-center">
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : ''}`}>
        {isLeft && (
          <div className="inline-block">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{entry.title}</h3>
            <p className="text-sm md:text-base text-emerald-100/80">{entry.date}</p>
            {entry.image && (
              <div className="mt-3 inline-block">
                <Image
                  src={entry.image}
                  width={140}
                  height={140}
                  alt={entry.title}
                  className="rounded-xl object-cover shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`absolute top-1/2 w-30 h-0.5 bg-emerald-500 ${
            isLeft ? 'right-full' : 'left-full'
          }`}
        />

        <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#043528] z-10" />

        {!isLast && (
          <div className="absolute top-1/2 w-0.5 h-28 bg-emerald-500 translate-y-2" />
        )}

        {isLast && (
          <div className="absolute w-0.5 h-30 translate-y-10.5 bg-gradient-to-b from-emerald-500 to-transparent" />
        )}
      </div>

      <div className={`w-5/12 ${!isLeft ? 'pl-8' : ''}`}>
        {!isLeft && (
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{entry.title}</h3>
            <p className="text-sm md:text-base text-emerald-100/80">{entry.date}</p>
            {entry.image && (
              <div className="mt-3">
                <Image
                  src={entry.image}
                  width={140}
                  height={140}
                  alt={entry.title}
                  className="rounded-xl object-cover shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium mb-16">About Me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
        <Card>
          <div className="flex flex-col justify-center h-full p-8 space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-slate-100">
              Hi there! I&apos;m Casey, a software engineer with a passion for building scalable and
              efficient software solutions.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-slate-100">
              When I&apos;m not coding, you can find me gaming, writing blog posts, or cheering on
              the Longhorns! I believe in continuous learning and sharing knowledge with the
              community.
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-center p-8">
            <div className="relative rounded-full overflow-hidden shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-400/30 ring-offset-8 ring-offset-[#12122b] w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
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
      </div>

      <div className="max-w-4xl mx-auto mt-20">
        <h3 className="text-3xl md:text-4xl font-mono font-medium mb-12 text-center">
          My Journey
        </h3>
        <div className="space-y-0 pb-8">
          {timelineData.map((entry, index) => (
            <TimelineItem
              key={entry.title}
              entry={entry}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
        <div className="relative flex items-center justify-center pt-4">
          <p className="text-lg md:text-xl text-emerald-100/80 italic text-center">
            coming soon...
          </p>
        </div>
      </div>
    </section>
  );
}
