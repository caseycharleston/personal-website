'use client';

import {
  ComposableMap,
  Geographies,
  Geography,
  createCoordinates,
} from '@vnedyalk0v/react19-simple-maps';
import type { ReactNode } from 'react';
import geoData from '../../public/maps/north-america-minus-islands.json';

interface MapChartProps {
  children?: ReactNode;
  className?: string;
  scale?: number;
  center?: [number, number];
}

export default function MapChart({
  children,
  className = '',
  scale = 600,
  center = [-100, 45],
}: MapChartProps) {
  const mapCenter = createCoordinates(center[0], center[1]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-black/10 bg-blue-200 ${className}`}
    >
      <ComposableMap
        className="h-full w-full"
        projection="geoMercator"
        projectionConfig={{
          scale,
          center: mapCenter,
        }}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E5E7EB"
                stroke="#9CA3AF"
                strokeWidth={0.5}
                className="outline-none transition-colors"
              />
            ))
          }
        </Geographies>

        {children}
      </ComposableMap>
    </div>
  );
}
