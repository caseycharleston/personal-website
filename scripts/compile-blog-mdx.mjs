import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const blogDir = path.join(process.cwd(), 'public', 'posts', 'blog');
const outDir = path.join(process.cwd(), 'src', 'generated', 'blog');

async function safeReadDir(dir) {
  try {
    return await fs.readdir(dir);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function build() {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const entries = await safeReadDir(blogDir);
  const files = entries.filter(file => file.endsWith('.mdx')).sort();

  const manifest = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(blogDir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);

    const meta = {
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      tags: Array.isArray(data.tags) ? data.tags : undefined,
      imageSrc: data.imageSrc ?? '',
      imageAlt: data.imageAlt ?? '',
    };

    const compiled = await compile(content, {
      outputFormat: 'program',
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    });

    const code = String(compiled);
    const output = `export const meta = ${JSON.stringify(meta, null, 2)};\n${code}`;
    await fs.writeFile(path.join(outDir, `${slug}.mjs`), output);

    manifest.push({ slug, meta });
  }

  const registry =
    `export const posts = ${JSON.stringify(manifest, null, 2)};\n` +
    `export async function loadPost(slug) {\n` +
    `  switch (slug) {\n` +
    manifest
      .map(
        entry =>
          `    case ${JSON.stringify(entry.slug)}:\n      return import('./${entry.slug}.mjs');`
      )
      .join('\n') +
    `\n    default:\n      return null;\n  }\n}\n`;

  await fs.writeFile(path.join(outDir, 'registry.mjs'), registry);
}

build().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
