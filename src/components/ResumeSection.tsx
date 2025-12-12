import Card from './Card';

export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="min-h-screen container mx-auto px-4 sm:px-8 lg:px-12 py-24 lg:py-32"
    >
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-mono font-medium text-black mb-16">
        Resume
      </h2>
      <Card>
        <div className="space-y-10 text-black">
          <div>
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-black mb-3">
              Education
            </h3>
            <p className="text-lg md:text-xl">University of Texas at Austin - Computer Science</p>
            <p className="text-sm md:text-base text-black mt-2">Expected Graduation: 2025</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-black mb-3">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <span className="px-4 py-1.5 bg-black/5 text-black border border-black/10 rounded-full text-sm md:text-base">
                JavaScript
              </span>
              <span className="px-4 py-1.5 bg-black/5 text-black border border-black/10 rounded-full text-sm md:text-base">
                TypeScript
              </span>
              <span className="px-4 py-1.5 bg-black/5 text-black border border-black/10 rounded-full text-sm md:text-base">
                React
              </span>
              <span className="px-4 py-1.5 bg-black/5 text-black border border-black/10 rounded-full text-sm md:text-base">
                Node.js
              </span>
              <span className="px-4 py-1.5 bg-black/5 text-black border border-black/10 rounded-full text-sm md:text-base">
                Python
              </span>
              <span className="px-4 py-1.5 bg-black/5 text-black border border-black/10 rounded-full text-sm md:text-base">
                SQL
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-black mb-3">
              Experience
            </h3>
            <p className="text-lg md:text-xl">Software Development Intern - Summer 2024</p>
            <p className="text-sm md:text-base text-black mt-2 leading-relaxed">
              Worked on full-stack web applications and gained experience with modern development
              practices.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
