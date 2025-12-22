import { notFound } from 'next/navigation';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;

  try {
    const data = await import(`../../../../public/project-pages/${projectName}`);
  } catch (err) {
    notFound();
  }

  return <div>hello this is my {projectName}</div>;
}
