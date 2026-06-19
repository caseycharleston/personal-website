import Image from 'next/image';
import AnimatedWord from './AnimatedWord';

export default function HomeIntroSection() {
  return (
    <section id="about" className="section-shell pb-8">
      <h2 className="section-title mt-24">Hi, I&apos;m Casey</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 text-black">
        <span className="text-xl font-mono">I&apos;m a</span>
        <span className="text-xl font-mono">
          <AnimatedWord />
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-8">
        <div className="flex flex-col justify-center h-full p-6 sm:p-8 space-y-6">
          <p className="text-lg leading-relaxed text-black">
            I&apos;m a computer science student at UT Austin. I&apos;m originally from the
            Dallas-Fort Worth area, though I&apos;ve lived all over the US + Canada.
          </p>
          <p className="text-lg leading-relaxed text-black">
            My career is mostly software engineering-related. My favorite parts of engineering are
            the collaborative problem-solving and knowledge-sharing. I&apos;ve also been a teaching
            assistant. If it were not for software engineering, I&apos;d happily look into getting
            my Master&apos;s and becoming a teacher.
          </p>
        </div>
        <div className="flex items-center justify-center p-6 sm:p-8">
          <div className="relative rounded-3xl shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-600 ring-offset-8 ring-offset-[#FEFCF0] w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <div
              className="absolute inset-0 overflow-hidden rounded-3xl"
              style={{ transform: 'translateZ(0)' }}
            >
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
        </div>
      </div>
    </section>
  );
}
