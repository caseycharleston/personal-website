import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkFlexibleToc from 'remark-flexible-toc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

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
  {
    name: 'til',
    inputDir: path.join(process.cwd(), 'public', 'posts', 'TIL'),
    outputDir: path.join(process.cwd(), 'src', 'generated', 'til'),
    registryId: 'tils',
    loaderName: 'loadTil',
  },
];

// Recursively collect every .mdx file under rootDir, returning paths relative
// to rootDir. Subfolders are an authoring convenience only — the slug is always
// the bare filename, so /<section>/<slug> URLs are independent of nesting.
async function collectMdxFiles(rootDir) {
  const results = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        return;
      }
      throw error;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) {
        continue; // skip dotfiles/dotdirs (e.g. .obsidian)
      }
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        results.push(path.relative(rootDir, fullPath));
      }
    }
  }

  await walk(rootDir);
  return results.sort();
}

async function compileTarget(target) {
  await fs.rm(target.outputDir, { recursive: true, force: true });
  await fs.mkdir(target.outputDir, { recursive: true });

  const files = await collectMdxFiles(target.inputDir);
  const slugToFile = new Map();
  const manifest = [];

  for (const file of files) {
    const slug = path.basename(file).replace(/\.mdx$/, '');
    if (slugToFile.has(slug)) {
      throw new Error(
        `Duplicate slug "${slug}" in "${target.name}": both "${slugToFile.get(slug)}" and ` +
          `"${file}" map to /${target.name}/${slug}. Rename one of them.`
      );
    }
    slugToFile.set(slug, file);
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

    const toc = [];
    const compiled = await compile(content, {
      outputFormat: 'program',
      remarkPlugins: [remarkGfm, [remarkFlexibleToc, { tocRef: toc, skipLevels: [] }]],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    });

    const code = String(compiled);
    const normalizedToc = toc.map(item => ({
      depth: item.depth,
      value: item.value,
      href: item.href,
    }));
    const output =
      `export const meta = ${JSON.stringify(meta, null, 2)};\n` +
      `export const toc = ${JSON.stringify(normalizedToc, null, 2)};\n` +
      code;
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
