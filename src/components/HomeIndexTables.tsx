import Link from 'next/link';
import type { IconType } from 'react-icons';
import {
  FaAws,
  FaBitcoin,
  FaCalendarCheck,
  FaDice,
  FaEye,
  FaLaptopCode,
  FaRobot,
} from 'react-icons/fa';
import { getBlogPosts, getProjectPosts, type MdxEntry } from '@/lib/mdx-content';

const projectIcons: Record<string, IconType> = {
  'aws-firecracker-gvisor': FaAws,
  'better-gaze-detection': FaEye,
  sugoroku: FaDice,
  'texas-acm-website': FaLaptopCode,
  'ur-v5-virtualized-arm': FaRobot,
  'us-treasury-crypto': FaBitcoin,
  'ut-registration-plus': FaCalendarCheck,
};

type HomeTableProps = {
  title: string;
  entries: MdxEntry[];
  hrefBase: string;
  formatDate?: (date: string) => string;
  viewAllHref?: string;
  viewAllLabel?: string;
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

function HomeTable({
  title,
  entries,
  hrefBase,
  formatDate = date => date,
  viewAllHref,
  viewAllLabel = 'View all',
}: HomeTableProps) {
  return (
    <section className="section-shell py-12">
      <h2 className="section-title mb-8 text-left">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-foreground">
          <colgroup>
            <col className="w-32 sm:w-48" />
            <col />
          </colgroup>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.slug} className="border-b border-border last:border-b-0">
                <td className="py-3 pr-4 align-middle text-left text-xs text-muted sm:text-sm">
                  <time>{formatDate(entry.meta.date)}</time>
                </td>
                <td className="py-3 text-left align-middle">
                  <Link
                    href={`${hrefBase}/${entry.slug}`}
                    className="font-mono text-sm font-semibold text-accent underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline sm:text-base"
                  >
                    {entry.meta.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewAllHref && (
        <div className="mt-6 text-left">
          <Link
            href={viewAllHref}
            className="font-mono text-sm font-semibold text-accent underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
          >
            {viewAllLabel} &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}

function HomeProjectGrid({ projects }: { projects: MdxEntry[] }) {
  return (
    <section className="section-shell py-12">
      <h2 className="section-title mb-8 text-left">Projects</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => {
          const Icon = projectIcons[project.slug];
          return (
            <article
              key={project.slug}
              className="flex h-full flex-col rounded-lg border-2 border-border bg-background p-6 shadow-sm"
            >
              <time className="mb-3 block text-sm text-muted">{project.meta.date}</time>
              {Icon && <Icon className="mb-3 text-2xl text-accent" aria-hidden="true" />}
              <Link
                href={`/projects/${project.slug}`}
                className="mb-4 font-mono text-lg font-semibold leading-snug text-accent underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
              >
                {project.meta.title}
              </Link>
              <p className="text-sm leading-relaxed text-foreground/85">{project.meta.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default async function HomeIndexTables() {
  const [blogPosts, projects] = await Promise.all([getBlogPosts(), getProjectPosts()]);

  return (
    <>
      <HomeTable
        title="Blog"
        entries={blogPosts.slice(0, 3)}
        hrefBase="/blog"
        formatDate={formatBlogDate}
        viewAllHref="/blog"
        viewAllLabel="View Blog"
      />
      <HomeProjectGrid projects={projects} />
    </>
  );
}
