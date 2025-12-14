'use client';

import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps';
import React, { createContext, useContext, useState } from 'react';
import geoData from '../../public/maps/north-america-minus-islands.json';

interface MapChartProps {
  children?: React.ReactNode;
  className?: string;
  scale?: number;
  center?: [number, number];
}

interface MapPopupContextValue {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

const MapPopupContext = createContext<MapPopupContextValue | null>(null);

export function useMapPopup() {
  const context = useContext(MapPopupContext);
  if (!context) {
    throw new Error('useMapPopup must be used within a MapChart');
  }
  return context;
}

export default function MapChart({
  children,
  className = '',
  scale = 600,
  center = [-100, 45],
}: MapChartProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-black/10 bg-blue-200 ${className}`}>
      <MapPopupContext.Provider value={{ openId, setOpenId }}>
        <ComposableMap
          className="h-full w-full"
          projection="geoMercator"
          projectionConfig={{
            scale,
            center,
          }}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  key={`${geo.rsmKey}-${index}`}
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
      </MapPopupContext.Provider>
    </div>
  );
}
