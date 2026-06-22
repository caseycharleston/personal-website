'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const GISCUS_ORIGIN = 'https://giscus.app';

const GISCUS_CONFIG: Record<string, string> = {
  'data-repo': 'caseycharleston/personal-website',
  'data-repo-id': 'R_kgDOM9jerw',
  'data-category': 'Announcements',
  'data-category-id': 'DIC_kwDOM9jer84C_ghm',
  'data-mapping': 'pathname',
  'data-strict': '0',
  'data-reactions-enabled': '1',
  'data-emit-metadata': '0',
  'data-input-position': 'top',
  'data-lang': 'en',
};

export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  // (Re)load the widget on mount and whenever the post changes, so navigating
  // between posts swaps to the right discussion (mapped by pathname).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.replaceChildren();

    const script = document.createElement('script');
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    for (const [key, value] of Object.entries(GISCUS_CONFIG)) {
      script.setAttribute(key, value);
    }
    // Read the live theme off <html> rather than React state to avoid loading
    // with a stale value before the ThemeProvider has hydrated.
    const isDark = document.documentElement.classList.contains('dark');
    script.setAttribute('data-theme', isDark ? 'dark' : 'light');
    container.appendChild(script);
  }, [pathname]);

  // Keep giscus in step with the header's light/dark toggle.
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, GISCUS_ORIGIN);
  }, [theme]);

  return (
    <section aria-label="Comments" className="border-t border-border pt-10">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">Comments</h2>
      <div ref={containerRef} />
    </section>
  );
}
