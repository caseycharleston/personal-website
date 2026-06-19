'use client';

import dynamic from 'next/dynamic';

// Defer the maps library and the large geography JSON off the initial bundle;
// the map is decorative and below the fold, so client-only rendering is fine.
const MapChartClient = dynamic(() => import('./MapChart'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-2xl border border-black/10 bg-blue-200" />
  ),
});

export default MapChartClient;
