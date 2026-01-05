import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getProjectPostBySlug, getProjectPosts } from '@/lib/posts';
import type { ReactNode } from 'react';

export async function generateStaticParams() {
  const projects = await getProjectPosts();
  return projects.map(project => ({ projectName: project.slug }));
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }
    const text = paragraph.join(' ');
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-base leading-relaxed text-black/90">
        {text}
      </p>
    );
    paragraph = [];
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      return;
    }

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      if (level === 1) {
        blocks.push(
          <h1 key={`h1-${blocks.length}`} className="text-3xl font-mono font-semibold text-black">
            {text}
          </h1>
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={`h2-${blocks.length}`} className="text-2xl font-mono font-semibold text-black">
            {text}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={`h3-${blocks.length}`} className="text-xl font-mono font-semibold text-black">
            {text}
          </h3>
        );
      }
      return;
    }

    const imageMatch = /^!\[(.*)\]\((.*)\)$/.exec(trimmed);
    if (imageMatch) {
      flushParagraph();
      blocks.push(
        <Image
          key={`img-${blocks.length}`}
          src={imageMatch[2]}
          alt={imageMatch[1]}
          width="0"
          height="0"
          sizes="100vw"
          unoptimized
          className="w-full rounded-2xl border border-black/10 bg-black/5"
        />
      );
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  return blocks;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;
  const project = await getProjectPostBySlug(projectName);

  if (!project) {
    notFound();
  }

  const { meta, content } = project;

  return (
    <main className="bg-[#FEFCF0] text-black">
      <Header />
      <section className="section-shell space-y-10">
        <div className="space-y-4 mt-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-black/60">
            <Link href="/projects" className="transition-colors hover:text-emerald-600">
              Projects
            </Link>{' '}
            / {meta.title}
          </p>
          <h1 className="text-3xl font-mono font-semibold text-black sm:text-4xl">{meta.title}</h1>
          <p className="text-base text-black/80">{meta.description}</p>
          <p className="text-xs font-mono uppercase tracking-wide text-black/60">{meta.date}</p>
          {meta.tags && meta.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {meta.tags.map(tag => (
                <li
                  key={tag}
                  className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center">
          <Image
            src={meta.image.src}
            alt={meta.image.alt}
            width="0"
            height="0"
            sizes="100vw"
            unoptimized
            className="w-2/3 rounded-2xl border border-black/10 bg-black/5"
          />
        </div>
        <div className="space-y-6 border-t border-black/10 pt-10">{renderContent(content)}</div>
      </section>
    </main>
  );
}
