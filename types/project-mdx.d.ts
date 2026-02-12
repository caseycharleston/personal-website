declare module '@/generated/projects/registry.mjs' {
  import type { ComponentType } from 'react';
  import type { MDXComponents } from 'mdx/types';

  export interface ProjectMeta {
    title: string;
    description: string;
    date: string;
    tags?: string[];
    imageSrc: string;
    imageAlt: string;
    order?: number;
  }

  export const projects: { slug: string; meta: ProjectMeta }[];
  export function loadProject(
    slug: string
  ): Promise<{ default: ComponentType<{ components?: MDXComponents }>; meta: ProjectMeta } | null>;
}
