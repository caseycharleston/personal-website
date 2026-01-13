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

function BlogImage({ src = '', alt = '' }: ComponentProps<'img'>) {
  if (typeof src !== 'string' || !src) {
    return null;
  }
  return (
    <img src={src} alt={alt} className="w-full rounded-2xl border border-black/10 bg-black/5" />
  );
}

function ProjectImage({ src = '', alt = '' }: ComponentProps<'img'>) {
  if (typeof src !== 'string' || !src) {
    return null;
  }
  const resolvedAlt = alt || imageAltFromFilename(src);
  return (
    <Image
      src={src}
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
};

const blogMdxComponents: MDXComponents = {
  ...baseMdxComponents,
  img: BlogImage,
};

const projectMdxComponents: MDXComponents = {
  ...baseMdxComponents,
  img: ProjectImage,
};

export async function getBlogPosts(): Promise<MdxEntry[]> {
  return posts as MdxEntry[];
}

export async function getBlogPostBySlug(slug: string) {
  const mod = (await loadPost(slug)) as MdxModule | null;
  if (!mod) {
    return null;
  }

  return {
    slug,
    meta: mod.meta,
    Content: mod.default,
  };
}

export async function getProjectPosts(): Promise<MdxEntry[]> {
  return projects as MdxEntry[];
}

export async function getProjectPostBySlug(slug: string) {
  const mod = (await loadProject(slug)) as MdxModule | null;
  if (!mod) {
    return null;
  }

  return {
    slug,
    meta: mod.meta,
    Content: mod.default,
  };
}

export function BlogMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(blogMdxComponents)} />;
}

export function ProjectMdxContent({ Content }: { Content: MdxModule['default'] }) {
  return <Content components={useMDXComponents(projectMdxComponents)} />;
}
