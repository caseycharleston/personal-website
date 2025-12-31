import { promises as fs } from 'fs';
import path from 'path';

export interface PostImage {
  src: string;
  alt: string;
}

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  href: string;
  tags?: string[];
  image?: PostImage;
}

export interface PostEntry {
  slug: string;
  meta: PostMeta;
  content: string;
}

const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;

function stripQuotes(value: string) {
  return value.replace(/^['"]|['"]$/g, '');
}

function parseFrontmatter(raw: string): { meta: Partial<PostMeta>; content: string } {
  const match = raw.match(frontmatterPattern);
  if (!match) {
    return { meta: {}, content: raw };
  }

  const metaBlock = match[1];
  const content = raw.slice(match[0].length);
  const lines = metaBlock.split('\n');
  const meta: Partial<PostMeta> = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();
    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith('tags:')) {
      const tags: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].startsWith('  - ')) {
        tags.push(stripQuotes(lines[i].slice(4).trim()));
        i += 1;
      }
      meta.tags = tags;
      continue;
    }

    if (line.startsWith('image:')) {
      const image: PostImage = { src: '', alt: '' };
      i += 1;
      while (i < lines.length && lines[i].startsWith('  ')) {
        const trimmed = lines[i].trim();
        const [key, ...rest] = trimmed.split(':');
        const value = stripQuotes(rest.join(':').trim());
        if (key === 'src' || key === 'alt') {
          image[key] = value;
        }
        i += 1;
      }
      if (image.src && image.alt) {
        meta.image = image;
      }
      continue;
    }

    const [key, ...rest] = line.split(':');
    const value = stripQuotes(rest.join(':').trim());
    const trimmedKey = key.trim();
    if (trimmedKey) {
      (meta as Record<string, string>)[trimmedKey] = value;
    }
    i += 1;
  }

  return { meta, content };
}

async function readPostsFromDir(dir: string): Promise<PostEntry[]> {
  const entries = await fs.readdir(dir);
  const files = entries
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .sort();

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      const filePath = path.join(dir, file);
      const raw = await fs.readFile(filePath, 'utf8');
      const { meta, content } = parseFrontmatter(raw);
      return {
        slug,
        meta: meta as PostMeta,
        content: content.trim(),
      };
    })
  );

  return posts;
}

export async function getProjectPosts() {
  const projectsDir = path.join(process.cwd(), 'src', 'posts', 'projects');
  return readPostsFromDir(projectsDir);
}
