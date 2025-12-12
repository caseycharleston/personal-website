import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  date: string;
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
  date,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-3xl bg-[#F2F0E5] border border-black/10 overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFCF0] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/15"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEFCF0]/80 via-[#FEFCF0]/40 to-transparent" />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-6 px-6 py-8">
          <header className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-mono font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700 group-hover:underline underline-offset-4">
              {title}
            </h3>
            <p className="text-sm md:text-base text-black font-mono uppercase tracking-wide">
              {date}
            </p>
            <p className="text-md leading-relaxed text-black">{description}</p>
          </header>

          {technologies.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-3">
              {technologies.map(tech => (
                <li
                  key={tech}
                  className="rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm md:text-base text-black"
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
