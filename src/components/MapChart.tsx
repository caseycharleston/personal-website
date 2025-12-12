'use client';

import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps';
import React from 'react';
import geoData from '../../public/maps/north-america-minus-islands.json';

interface MapChartProps {
  children?: React.ReactNode;
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
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-black/10 ${className}`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale,
          center,
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
                style={{
                  default: { outline: 'none' },
                  hover: {
                    fill: '#3B82F6',
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#1E40AF',
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>

        {children}
      </ComposableMap>
    </div>
  );
}
