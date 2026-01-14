import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { posts, loadPost } from '@/generated/blog/registry.mjs';
import { projects, loadProject } from '@/generated/projects/registry.mjs';
import { useMDXComponents } from '@/app/mdx-components';

export interface MdxMeta {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface MdxEntry {
  slug: string;
  meta: MdxMeta;
}

export type MdxModule = {
  default: ComponentType<{ components?: MDXComponents }>;
  meta: MdxMeta;
};

function imageAltFromFilename(filename: string) {
  const base = filename.replace(/\.[^/.]+$/, '');
  return base.replace(/[-_]+/g, ' ').trim() || base;
}

// Ensures image src is correctly pointed to the right directory
function normalizeMetaImageSrc(src: string) {
  if (src.startsWith('images/')) {
    return `/posts/${src}`;
  }
  return `/posts/images/${src}`;
}

function MdxLink({ href = '', children, ...rest }: ComponentProps<'a'> & { children?: ReactNode }) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  return (
    <Link
      href={href}
      className="transition-colors duration-200 underline text-emerald-600 hover:text-emerald-800"
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
  const normalizedSrc = `/posts/${src}`;
  const resolvedAlt = alt || imageAltFromFilename(src);
  return (
    <Image
      src={normalizedSrc}
      alt={resolvedAlt}
      width="0"
      height="0"
      sizes="100vw"
      unoptimized
      className="w-full rounded-2xl border border-black/10 bg-black/5"
    />
  );
}

const baseMdxComponents: MDXComponents = {
  a: MdxLink,
  h1: ({ children }) => <h1 className="text-3xl font-mono font-semibold text-black">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-mono font-semibold text-black">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-mono font-semibold text-black">{children}</h3>,
  p: ({ children }) => <p className="text-base leading-relaxed text-black/90">{children}</p>,
  ul: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-base text-black/90">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-base text-black/90">{children}</ol>,
  li: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-black/20 pl-4 italic text-black/70">{children}</blockquote>
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

export async function getBlogPosts(): Promise<MdxEntry[]> {
  return (posts as MdxEntry[]).map(post => ({
    ...post,
    meta: {
      ...post.meta,
      imageSrc: normalizeMetaImageSrc(post.meta.imageSrc),
    },
  }));
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
  };
}

export async function getProjectPosts(): Promise<MdxEntry[]> {
  return (projects as MdxEntry[]).map(project => ({
    ...project,
    meta: {
      ...project.meta,
      imageSrc: normalizeMetaImageSrc(project.meta.imageSrc),
    },
  }));
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
  };
}

export function BlogMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(blogMdxComponents)} />;
}

export function ProjectMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(projectMdxComponents)} />;
}
