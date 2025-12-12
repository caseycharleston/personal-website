import Card from './Card';

export default function ResumeSection() {
  return (
    <section id="resume" className="section-shell">
      <h2 className="section-title">
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
