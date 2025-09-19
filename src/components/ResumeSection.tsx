import Card from './Card';

export default function ResumeSection() {
  return (
    <section id="resume" className="min-h-screen container mx-auto py-20">
      <h2 className="text-xl lg:text-4xl font-mono font-medium mb-8">Resume</h2>
      <Card>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-mono font-medium mb-2">Education</h3>
            <p className="text-lg">University of Texas at Austin - Computer Science</p>
            <p className="text-gray-300">Expected Graduation: 2025</p>
          </div>
          <div>
            <h3 className="text-xl font-mono font-medium mb-2">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                JavaScript
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                Node.js
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                Python
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                SQL
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-mono font-medium mb-2">Experience</h3>
            <p className="text-lg">Software Development Intern - Summer 2024</p>
            <p className="text-gray-300">
              Worked on full-stack web applications and gained experience with modern development
              practices.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
