import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const targets = [
  {
    name: 'blog',
    inputDir: path.join(process.cwd(), 'public', 'posts', 'blog'),
    outputDir: path.join(process.cwd(), 'src', 'generated', 'blog'),
    registryId: 'posts',
    loaderName: 'loadPost',
  },
  {
    name: 'projects',
    inputDir: path.join(process.cwd(), 'public', 'posts', 'projects'),
    outputDir: path.join(process.cwd(), 'src', 'generated', 'projects'),
    registryId: 'projects',
    loaderName: 'loadProject',
  },
];

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

async function compileTarget(target) {
  await fs.rm(target.outputDir, { recursive: true, force: true });
  await fs.mkdir(target.outputDir, { recursive: true });

  const entries = await safeReadDir(target.inputDir);
  const files = entries.filter(file => file.endsWith('.mdx')).sort();
  const manifest = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(target.inputDir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const orderValue =
      typeof data.order === 'number'
        ? data.order
        : typeof data.order === 'string'
          ? Number(data.order)
          : NaN;

    const meta = {
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      tags: Array.isArray(data.tags) ? data.tags : undefined,
      imageSrc: data.imageSrc ?? '',
      imageAlt: data.imageAlt ?? '',
      order: Number.isFinite(orderValue) ? orderValue : undefined,
    };

    const compiled = await compile(content, {
      outputFormat: 'program',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    });

    const code = String(compiled);
    const output = `export const meta = ${JSON.stringify(meta, null, 2)};\n${code}`;
    await fs.writeFile(path.join(target.outputDir, `${slug}.mjs`), output);

    manifest.push({ slug, meta });
  }

  const registry =
    `export const ${target.registryId} = ${JSON.stringify(manifest, null, 2)};\n` +
    `export async function ${target.loaderName}(slug) {\n` +
    `  switch (slug) {\n` +
    manifest
      .map(
        entry =>
          `    case ${JSON.stringify(entry.slug)}:\n      return import('./${entry.slug}.mjs');`
      )
      .join('\n') +
    `\n    default:\n      return null;\n  }\n}\n`;

  await fs.writeFile(path.join(target.outputDir, 'registry.mjs'), registry);
}

function resolveTargets() {
  const args = new Set(process.argv.slice(2));
  if (args.size === 0) {
    return targets;
  }
  return targets.filter(target => args.has(`--${target.name}`));
}

async function buildAll() {
  const selected = resolveTargets();
  for (const target of selected) {
    await compileTarget(target);
  }
}

buildAll().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
