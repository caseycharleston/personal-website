'use client';

import dynamic from 'next/dynamic';

// Defer framer-motion off the home page's initial bundle. The fallback mirrors
// the animated word's box dimensions (max word length + 2 ch, 2.4rem tall) so
// there is no layout shift, and shows the first word so there is no blank flash.
const AnimatedWordClient = dynamic(() => import('./AnimatedWord'), {
  ssr: false,
  loading: () => (
    <span className="relative inline-flex align-middle">
      <span
        className="inline-flex items-center justify-center overflow-hidden text-center bg-surface border border-border rounded-full px-3 font-mono font-semibold text-foreground"
        style={{ width: '11ch', height: '2.4rem' }}
      >
        developer
      </span>
    </span>
  ),
});

export default AnimatedWordClient;
