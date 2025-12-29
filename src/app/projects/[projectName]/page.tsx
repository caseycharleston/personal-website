import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

const projectsDir = path.join(process.cwd(), 'src', 'posts', 'projects');

export async function generateStaticParams() {
  const entries = await fs.readdir(projectsDir);
  return entries
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => ({ projectName: file.replace(/\.(mdx|md)$/, '') }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;
  const mdxPath = path.join(projectsDir, `${projectName}.mdx`);
  const mdPath = path.join(projectsDir, `${projectName}.md`);

  try {
    await fs.access(mdxPath);
  } catch {
    try {
      await fs.access(mdPath);
    } catch {
      notFound();
    }
  }

  return <div>hello this is my {projectName}</div>;
}
