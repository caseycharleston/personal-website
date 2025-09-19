import Card from './Card';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen container mx-auto py-20">
      <h2 className="text-xl lg:text-4xl font-mono font-medium mb-8">About Me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <p className="text-lg leading-relaxed mb-4">
            Hi there! I&apos;m Casey, a software engineer with a passion for building scalable and
            efficient software solutions.
          </p>
          <p className="text-lg leading-relaxed">
            When I&apos;m not coding, you can find me gaming, writing blog posts, or cheering on the
            Longhorns! I believe in continuous learning and sharing knowledge with the community.
          </p>
        </Card>
        <Card>
          <div className="flex flex-col items-center">
            <div className="w-60 h-60 bg-gray-700 rounded-full mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Headshot Placeholder</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
