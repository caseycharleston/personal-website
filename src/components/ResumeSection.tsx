import Card from './Card';

export default function ResumeSection() {
  return (
    <section id="resume" className="container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium text-black mb-12">
        Resume
      </h2>
      <Card className="max-w-3xl mx-auto text-center py-16">
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-black">Coming soon</h3>
          <p className="text-lg leading-relaxed text-black">
            I&apos;m putting the finishing touches on this section. Check back later for a full
            rundown of my experience and accolades.
          </p>
        </div>
      </Card>
    </section>
  );
}
