'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TocItem } from '@/lib/mdx-content';

function idFromHref(href: string) {
  return href.replace(/^#/, '');
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(() => (items[0] ? idFromHref(items[0].href) : ''));
  const minDepth = useMemo(
    () => items.reduce((min, item) => Math.min(min, item.depth), Number.POSITIVE_INFINITY),
    [items]
  );

  useEffect(() => {
    const headings = items
      .map(item => document.getElementById(idFromHref(item.href)))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto border-l border-border pl-4 text-sm"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">Contents</p>
      <ol className="space-y-2">
        {items.map(item => {
          const id = idFromHref(item.href);
          const isActive = id === activeId;
          return (
            <li
              key={item.href}
              style={{
                paddingLeft: `${Math.max(0, item.depth - minDepth) * 0.75}rem`,
              }}
            >
              <a
                href={item.href}
                className={`block leading-snug lnk ${
                  isActive ? 'font-medium text-accent' : 'text-muted hover:text-accent'
                }`}
              >
                {item.value}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
