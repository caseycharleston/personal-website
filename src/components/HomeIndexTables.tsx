import Link from 'next/link';
import { getBlogPosts, getProjectPosts, type MdxEntry } from '@/lib/mdx-content';

type HomeTableProps = {
  title: string;
  entries: MdxEntry[];
  hrefBase: string;
  formatDate?: (date: string) => string;
};

function formatBlogDate(date: string) {
  const [monthString, dayString, yearString] = date.split('/');
  const month = Number(monthString);
  const day = Number(dayString);
  const year = Number(yearString);

  if (!month || !day || !year) {
    return date;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function HomeTable({ title, entries, hrefBase, formatDate = date => date }: HomeTableProps) {
  return (
    <section className="section-shell py-12">
      <h2 className="section-title mb-8 text-left">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-black">
          <colgroup>
            <col className="w-32 sm:w-48" />
            <col />
          </colgroup>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.slug} className="border-b border-black/15 last:border-b-0">
                <td className="py-3 pr-4 align-middle text-left text-xs text-black/70 sm:text-sm">
                  <time>{formatDate(entry.meta.date)}</time>
                </td>
                <td className="py-3 text-left align-middle">
                  <Link
                    href={`${hrefBase}/${entry.slug}`}
                    className="font-mono text-sm font-semibold text-emerald-600 underline-offset-4 transition-colors duration-200 hover:text-emerald-800 hover:underline sm:text-base"
                  >
                    {entry.meta.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HomeProjectGrid({ projects }: { projects: MdxEntry[] }) {
  return (
    <section className="section-shell py-12">
      <h2 className="section-title mb-8 text-left">Projects</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => (
          <article
            key={project.slug}
            className="flex h-full flex-col rounded-lg border-2 border-[#ded3ad] bg-[#FEFCF0] p-6 shadow-sm"
          >
            <time className="mb-4 block text-sm text-black/60">{project.meta.date}</time>
            <Link
              href={`/projects/${project.slug}`}
              className="mb-4 font-mono text-lg font-semibold leading-snug text-emerald-600 underline-offset-4 transition-colors duration-200 hover:text-emerald-800 hover:underline"
            >
              {project.meta.title}
            </Link>
            <p className="text-sm leading-relaxed text-black/85">{project.meta.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function HomeIndexTables() {
  const [blogPosts, projects] = await Promise.all([getBlogPosts(), getProjectPosts()]);

  return (
    <>
      <HomeTable title="Blog" entries={blogPosts} hrefBase="/blog" formatDate={formatBlogDate} />
      <HomeProjectGrid projects={projects} />
    </>
  );
}
