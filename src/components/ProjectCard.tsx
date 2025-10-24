import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  image?: {
    src: string;
    alt: string;
  };
}

export default function ProjectCard({
  title,
  description,
  technologies,
  href,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171738] hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20"
    >
      <article className="flex h-full flex-col">
        {image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171738]/60 via-[#171738]/10 to-transparent" />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-6 px-6 py-8">
          <header className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-white">
              {title}
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-100/90">
              {description}
            </p>
          </header>

          {technologies.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-3">
              {technologies.map(tech => (
                <li
                  key={tech}
                  className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-1.5 text-sm md:text-base text-emerald-100"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Link>
  );
}
