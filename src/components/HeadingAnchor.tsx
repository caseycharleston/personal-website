'use client';

import { Check, Link as LinkIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function HeadingAnchor({ id }: { id: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, '', `#${id}`);
      setIsCopied(true);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy heading link', error);
    }
  };

  // Non-breaking space keeps the icon on the same line as the heading's last word.
  return (
    <>
      {'\u00A0'}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={isCopied ? 'Link copied' : 'Copy link to this section'}
        title={isCopied ? 'Link copied' : 'Copy link to this section'}
        className={`inline-flex translate-y-[-0.1em] items-center align-middle transition-[color,opacity] duration-200 hover:text-accent focus-visible:opacity-100 focus-visible:outline-none focus-visible:text-accent [@media(hover:none)]:opacity-100 ${
          isCopied ? 'text-accent opacity-100' : 'text-muted opacity-0 group-hover:opacity-100'
        }`}
      >
        {isCopied ? <Check className="size-[0.8em]" /> : <LinkIcon className="size-[0.8em]" />}
      </button>
    </>
  );
}
