import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { posts, loadPost } from '@/generated/blog/registry.mjs';
import { projects, loadProject } from '@/generated/projects/registry.mjs';
import { tils, loadTil } from '@/generated/til/registry.mjs';
import { useMDXComponents } from '@/app/mdx-components';

export interface MdxMeta {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  imageSrc: string;
  imageAlt: string;
  order?: number;
}

export interface MdxEntry {
  slug: string;
  meta: MdxMeta;
}

export interface TocItem {
  depth: number;
  value: string;
  href: string;
}

export type MdxModule = {
  default: ComponentType<{ components?: MDXComponents }>;
  meta: MdxMeta;
  toc: TocItem[];
};

function imageAltFromFilename(filename: string) {
  const base = filename.replace(/\.[^/.]+$/, '');
  return base.replace(/[-_]+/g, ' ').trim() || base;
}

// Ensures image src is correctly pointed to the right directory
function normalizeMetaImageSrc(src: string) {
  const normalizedSrc = src.replace(/^\.\//, '');
  if (normalizedSrc.startsWith('/posts/')) {
    return normalizedSrc;
  }
  if (normalizedSrc.startsWith('posts/')) {
    return `/${normalizedSrc}`;
  }
  if (normalizedSrc.startsWith('images/')) {
    return `/posts/${normalizedSrc}`;
  }
  if (normalizedSrc.startsWith('/')) {
    return normalizedSrc;
  }
  return `/posts/images/${normalizedSrc}`;
}

export function parseBlogDate(date?: string | null) {
  if (typeof date !== 'string') {
    return Number.NaN;
  }

  const parts = date.split('/');
  if (parts.length !== 3) {
    return Number.NaN;
  }
  const [monthString, dayString, yearString] = parts;
  const month = Number(monthString) - 1;
  const day = Number(dayString);
  const year = Number(yearString);
  if (!Number.isInteger(month) || !Number.isInteger(day) || !Number.isInteger(year)) {
    return Number.NaN;
  }
  if (month < 0 || month > 11 || day < 1 || day > 31) {
    return Number.NaN;
  }
  return Date.UTC(year, month, day);
}

function MdxLink({ href = '', children, ...rest }: ComponentProps<'a'> & { children?: ReactNode }) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  return (
    <Link
      href={href}
      className="transition-colors duration-200 underline text-accent hover:text-accent"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}

function MdxImage({ src = '', alt = '' }: ComponentProps<'img'>) {
  if (typeof src !== 'string' || !src) {
    return null;
  }
  const normalizedSrc = `/${src}`;
  const resolvedAlt = alt || imageAltFromFilename(src);
  return (
    <Image
      src={normalizedSrc}
      alt={resolvedAlt}
      width="0"
      height="0"
      sizes="100vw"
      unoptimized
      className="mx-auto max-w-1/2 w-full rounded-2xl border border-border bg-foreground/5"
    />
  );
}

function joinClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

const baseMdxComponents: MDXComponents = {
  a: MdxLink,
  h1: ({ children, className, ...props }: ComponentProps<'h1'>) => (
    <h1
      {...props}
      className={joinClassName(
        'scroll-mt-24 text-3xl font-mono font-semibold text-foreground',
        className
      )}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: ComponentProps<'h2'>) => (
    <h2
      {...props}
      className={joinClassName(
        'scroll-mt-24 text-2xl font-mono font-semibold text-foreground',
        className
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: ComponentProps<'h3'>) => (
    <h3
      {...props}
      className={joinClassName(
        'scroll-mt-24 text-xl font-mono font-semibold text-foreground',
        className
      )}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="text-base leading-relaxed text-foreground/90">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc space-y-2 pl-6 text-base text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 pl-6 text-base text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-4 italic text-muted">
      {children}
    </blockquote>
  ),
};

const blogMdxComponents: MDXComponents = {
  ...baseMdxComponents,
  img: MdxImage,
};

const projectMdxComponents: MDXComponents = {
  ...baseMdxComponents,
  img: MdxImage,
};

const tilMdxComponents: MDXComponents = {
  ...baseMdxComponents,
  img: MdxImage,
};

const tilDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatTilDate(date: string) {
  const timestamp = parseBlogDate(date);
  return Number.isFinite(timestamp) ? tilDateFormatter.format(new Date(timestamp)) : date;
}

export async function getBlogPosts(): Promise<MdxEntry[]> {
  return (posts as MdxEntry[])
    .map(post => ({
      ...post,
      meta: {
        ...post.meta,
        imageSrc: normalizeMetaImageSrc(post.meta.imageSrc),
      },
    }))
    .sort((a, b) => {
      const aDate = parseBlogDate(a.meta.date);
      const bDate = parseBlogDate(b.meta.date);
      const aValue = Number.isFinite(aDate) ? aDate : Number.NEGATIVE_INFINITY;
      const bValue = Number.isFinite(bDate) ? bDate : Number.NEGATIVE_INFINITY;
      return bValue - aValue;
    });
}

export async function getBlogPostBySlug(slug: string) {
  const mod = (await loadPost(slug)) as MdxModule | null;
  if (!mod) {
    return null;
  }

  return {
    slug,
    meta: {
      ...mod.meta,
      imageSrc: normalizeMetaImageSrc(mod.meta.imageSrc),
    },
    Content: mod.default,
    toc: mod.toc,
  };
}

export async function getProjectPosts(): Promise<MdxEntry[]> {
  return (projects as MdxEntry[])
    .map(project => ({
      ...project,
      meta: {
        ...project.meta,
        imageSrc: normalizeMetaImageSrc(project.meta.imageSrc),
      },
    }))
    .sort((a, b) => {
      const aOrder = typeof a.meta.order === 'number' ? a.meta.order : Number.NEGATIVE_INFINITY;
      const bOrder = typeof b.meta.order === 'number' ? b.meta.order : Number.NEGATIVE_INFINITY;
      return bOrder - aOrder;
    });
}

export async function getProjectPostBySlug(slug: string) {
  const mod = (await loadProject(slug)) as MdxModule | null;
  if (!mod) {
    return null;
  }

  return {
    slug,
    meta: {
      ...mod.meta,
      imageSrc: normalizeMetaImageSrc(mod.meta.imageSrc),
    },
    Content: mod.default,
    toc: mod.toc,
  };
}

export async function getTILs(): Promise<MdxEntry[]> {
  return (tils as MdxEntry[]).slice().sort((a, b) => {
    const aDate = parseBlogDate(a.meta.date);
    const bDate = parseBlogDate(b.meta.date);
    const aValue = Number.isFinite(aDate) ? aDate : Number.NEGATIVE_INFINITY;
    const bValue = Number.isFinite(bDate) ? bDate : Number.NEGATIVE_INFINITY;
    return bValue - aValue;
  });
}

export async function getTILBySlug(slug: string) {
  const mod = (await loadTil(slug)) as MdxModule | null;
  if (!mod) {
    return null;
  }

  return {
    slug,
    meta: mod.meta,
    Content: mod.default,
    toc: mod.toc,
  };
}

export function TILMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(tilMdxComponents)} />;
}

export function BlogMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(blogMdxComponents)} />;
}

export function ProjectMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(projectMdxComponents)} />;
}
