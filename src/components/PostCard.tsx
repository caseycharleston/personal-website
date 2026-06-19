import Image from 'next/image';
import Link from 'next/link';
import TagLink from './TagLink';

interface PostCardProps {
  title: string;
  description: string;
  tags?: string[];
  href: string;
  tagHrefBase: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
}

export default function PostCard({
  title,
  description,
  tags = [],
  href,
  tagHrefBase,
  date,
  imageSrc,
  imageAlt,
}: PostCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <div className="flex h-full flex-col">
        {imageSrc && imageAlt && (
          <Link
            href={href}
            className="relative block aspect-[4/3] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/35 to-transparent" />
          </Link>
        )}

        <div className="flex flex-1 flex-col gap-4 px-5 py-6">
          <header className="space-y-2">
            <Link
              href={href}
              className="block text-lg font-mono font-semibold text-accent underline-offset-4 transition-colors group-hover:hover:text-accent group-hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <h3>{title}</h3>
            </Link>
            <p className="text-xs font-mono uppercase tracking-wide text-muted">{date}</p>
            <p className="text-sm leading-relaxed text-foreground">{description}</p>
          </header>

          {tags.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-2">
              {tags.map(tag => (
                <li key={tag}>
                  <TagLink tag={tag} hrefBase={tagHrefBase} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
