import Header from '@/components/Header';
import TagIndexSection from '@/components/TagIndexSection';
import { getProjectPosts } from '@/lib/mdx-content';
import { getTagSummaries, getTagSummaryGroups } from '@/lib/tags';

export default async function ProjectTagsPage() {
  const projects = await getProjectPosts();
  const tagGroups = getTagSummaryGroups(getTagSummaries(projects));

  return (
    <main className="bg-background text-foreground">
      <Header />
      <TagIndexSection
        title="Project Tags"
        subtitle="Browse projects by tag."
        tagGroups={tagGroups}
        tagHrefBase="/projects/tags"
        singularLabel="project"
        pluralLabel="projects"
      />
    </main>
  );
}
