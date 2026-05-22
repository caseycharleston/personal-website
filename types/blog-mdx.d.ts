declare module '@/generated/blog/registry.mjs' {
  import type { ComponentType } from 'react';
  import type { MDXComponents } from 'mdx/types';

  export interface BlogMeta {
    title: string;
    description: string;
    date: string;
    tags?: string[];
    imageSrc: string;
    imageAlt: string;
    order?: number;
  }

  export interface TocItem {
    depth: number;
    value: string;
    href: string;
  }

  export const posts: { slug: string; meta: BlogMeta }[];
  export function loadPost(slug: string): Promise<{
    default: ComponentType<{ components?: MDXComponents }>;
    meta: BlogMeta;
    toc: TocItem[];
  } | null>;
}
