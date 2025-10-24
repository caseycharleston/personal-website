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

function TimelineContent({
  entry,
  align = 'left',
}: {
  entry: TimelineEntry;
  align?: 'left' | 'right';
}) {
  return (
    <div
      className={`max-w-lg space-y-3 text-slate-200 ${
        align === 'right' ? 'md:text-right md:ml-auto' : 'md:mr-auto'
      }`}
    >
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-emerald-200/70">
        {entry.date}
      </p>
      <h3 className="text-2xl md:text-3xl font-semibold text-white">{entry.title}</h3>
      {entry.image && (
        <div className="pt-3">
          <Image
            src={entry.image}
            width={180}
            height={180}
            alt={entry.title}
            className="rounded-2xl object-cover shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30"
          />
        </div>
      )}
    </div>
  );
}

function TimelineItem({
  entry,
  isFirst,
  isLast,
}: {
  entry: TimelineEntry;
  isFirst: boolean;
  isLast: boolean;
}) {
  const isLeft = entry.side === 'left';
  const horizontalLineClass = isLeft
    ? 'hidden md:block absolute top-1/2 right-full h-0.5 w-32 bg-gradient-to-l from-emerald-300/0 via-emerald-400/70 to-emerald-400/0'
    : 'hidden md:block absolute top-1/2 left-full h-0.5 w-32 bg-gradient-to-r from-emerald-300/0 via-emerald-400/70 to-emerald-400/0';

  return (
    <div className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-16 py-12 md:py-16">
      {isLeft && (
        <div className="hidden md:flex md:justify-end">
          <TimelineContent entry={entry} align="right" />
        </div>
      )}

      <div className="relative flex flex-col items-center justify-center gap-6 md:gap-0">
        {!isFirst && (
          <div className="hidden md:block absolute top-0 -translate-y-full h-16 w-px bg-gradient-to-b from-emerald-500/5 via-emerald-500/40 to-emerald-400/80" />
        )}
        {!isLast && (
          <div className="hidden md:block absolute bottom-0 translate-y-full h-16 w-px bg-gradient-to-t from-emerald-500/5 via-emerald-500/40 to-emerald-400/80" />
        )}

        <div className={horizontalLineClass} />

        {!isFirst && (
          <div className="md:hidden h-16 w-px bg-gradient-to-t from-emerald-400/80 to-emerald-400/0" />
        )}

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 shadow-xl shadow-emerald-500/40 ring-4 ring-[#043528] ring-offset-4 ring-offset-[#171738]">
          <span className="font-mono text-sm md:text-base text-[#043528]">{entry.date}</span>
        </div>

        {!isLast && (
          <div className="md:hidden h-16 w-px bg-gradient-to-b from-emerald-400/80 to-emerald-400/0" />
        )}
      </div>

      {!isLeft && (
        <div className="hidden md:flex md:justify-start">
          <TimelineContent entry={entry} align="left" />
        </div>
      )}

      <div className="md:hidden mt-6">
        <TimelineContent entry={entry} align="left" />
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

      <div className="max-w-5xl mx-auto mt-24">
        <h3 className="text-3xl md:text-4xl font-mono font-medium mb-14 text-center">
          My Journey
        </h3>
        <div className="space-y-6 pb-16">
          {timelineData.map((entry, index) => (
            <TimelineItem
              key={entry.title}
              entry={entry}
              isFirst={index === 0}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
        <div className="relative flex items-center justify-center pt-4">
          <p className="text-lg md:text-xl text-emerald-100/80 italic text-center">
            guess i&apos;ll have to find out!
          </p>
        </div>
      </div>
    </section>
  );
}
